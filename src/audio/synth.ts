/**
 * Low-level synthesis toolkit. Everything takes a `BaseAudioContext`, so the
 * same code runs live or inside an OfflineAudioContext for level checks.
 *
 * A `Voice` owns every node one sound creates. Its sources all have a stop
 * time; when the last one ends the whole graph is disconnected. Each voice
 * outputs through a "kill" gain that is never automated, so stealing a
 * voice is a short ramp on that gain (no snap-back clicks from cancelled
 * envelopes).
 */

/** Smallest value exponential ramps start from / decay to (−80 dB). */
export const SILENT = 1e-4;

/** Where a sound goes: a dry destination and an optional reverb send input. */
export interface Out {
  dry: AudioNode;
  wet: AudioNode | null;
}

/** Shared buffers for one AudioContext. */
export class Kit {
  readonly ctx: BaseAudioContext;
  /** 2 s of mono white noise; voices loop it from a random offset. */
  readonly noise: AudioBuffer;
  /** Staircase transfer curve: amplitude quantisation for the "bitcrushed" sound. */
  readonly crushCurve: Float32Array<ArrayBuffer>;

  constructor(ctx: BaseAudioContext) {
    this.ctx = ctx;
    const len = Math.floor(ctx.sampleRate * 2);
    this.noise = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const n = 2048;
    const levels = 6;
    this.crushCurve = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const x = (i / (n - 1)) * 2 - 1;
      this.crushCurve[i] = Math.round(x * levels) / levels;
    }
  }

  /**
   * A shared bitcrusher stage feeding `dest` through a trim gain. Inputs
   * should be driven hot (~0.5–0.9) so the quantiser has steps to bite on.
   */
  crusher(dest: AudioNode, trim: number): WaveShaperNode {
    const ws = this.ctx.createWaveShaper();
    ws.curve = this.crushCurve;
    ws.oversample = 'none';
    const g = this.ctx.createGain();
    g.gain.value = trim;
    ws.connect(g);
    g.connect(dest);
    return ws;
  }
}

/**
 * Procedural reverb impulse: decaying stereo noise with a pre-delay. A
 * one-pole lowpass closes as the tail decays, so the reverb darkens
 * naturally instead of hissing.
 */
export function makeImpulse(ctx: BaseAudioContext, seconds = 1.8): AudioBuffer {
  const rate = ctx.sampleRate;
  const len = Math.max(1, Math.floor(rate * seconds));
  const buf = ctx.createBuffer(2, len, rate);
  const pre = Math.floor(rate * 0.012);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    let lp = 0;
    for (let i = pre; i < len; i++) {
      const x = (i - pre) / (len - pre);
      const k = 0.8 - 0.68 * x;
      lp += k * (Math.random() * 2 - 1 - lp);
      d[i] = lp * Math.exp(-6.5 * x);
    }
  }
  return buf;
}

export class Voice {
  readonly ctx: BaseAudioContext;
  readonly kit: Kit;
  /** Kill gain (no automation except `kill`). Connect the voice's signal here. */
  readonly out: GainNode;
  /** Latest scheduled stop time of any source. */
  end = 0;
  private nodes: AudioNode[] = [];
  private taps: GainNode[] = [];
  private sources: AudioScheduledSourceNode[] = [];
  private live = 0;
  private dead = false;

  constructor(kit: Kit, dest: Out, wet = 0) {
    this.kit = kit;
    this.ctx = kit.ctx;
    this.out = this.ctx.createGain();
    this.nodes.push(this.out);
    this.taps.push(this.out);
    this.out.connect(dest.dry);
    if (wet > 0 && dest.wet) {
      const s = this.ctx.createGain();
      s.gain.value = wet;
      this.out.connect(s);
      s.connect(dest.wet);
      this.nodes.push(s);
    }
  }

  /** An extra kill-gain output into another destination (e.g. a bitcrusher). */
  tap(dest: AudioNode): GainNode {
    const g = this.ctx.createGain();
    g.connect(dest);
    this.nodes.push(g);
    this.taps.push(g);
    return g;
  }

  gain(v = 1): GainNode {
    const g = this.ctx.createGain();
    g.gain.value = v;
    this.nodes.push(g);
    return g;
  }

  filter(type: BiquadFilterType, freq: number, q = 0.7): BiquadFilterNode {
    const f = this.ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    this.nodes.push(f);
    return f;
  }

  osc(type: OscillatorType, freq: number, t: number, stop: number, detune = 0): OscillatorNode {
    const o = this.ctx.createOscillator();
    o.type = type;
    // setValueAtTime (not .value) so later ramps start at `t`, not "now".
    o.frequency.setValueAtTime(freq, t);
    if (detune) o.detune.setValueAtTime(detune, t);
    this.track(o, t, stop);
    return o;
  }

  /** Looping white noise from a random offset (so repeated hits differ). */
  noise(t: number, stop: number, rate = 1): AudioBufferSourceNode {
    const n = this.ctx.createBufferSource();
    n.buffer = this.kit.noise;
    n.loop = true;
    n.playbackRate.value = rate;
    this.track(n, t, stop, Math.random() * (this.kit.noise.duration - 0.05));
    return n;
  }

  private track(s: AudioScheduledSourceNode, t: number, stop: number, offset?: number): void {
    const start = Math.max(t, 0);
    const end = Math.max(stop, start + 0.01);
    if (offset !== undefined && s instanceof AudioBufferSourceNode) s.start(start, offset);
    else s.start(start);
    s.stop(end);
    this.end = Math.max(this.end, end);
    this.sources.push(s);
    this.live++;
    s.onended = () => {
      this.live--;
      if (this.live <= 0) this.dispose();
    };
  }

  /** Fade out over ~12 ms and stop everything (voice stealing / early release). */
  kill(now: number): void {
    if (this.dead) return;
    for (const g of this.taps) {
      try {
        g.gain.setValueAtTime(g.gain.value, now);
        g.gain.linearRampToValueAtTime(0, now + 0.012);
      } catch {
        /* node already gone */
      }
    }
    for (const s of this.sources) {
      try {
        s.stop(now + 0.03);
      } catch {
        /* already stopped (older Safari throws) */
      }
    }
    this.end = Math.min(this.end, now + 0.03);
  }

  dispose(): void {
    if (this.dead) return;
    this.dead = true;
    for (const s of this.sources) {
      try {
        s.disconnect();
      } catch {
        /* ignore */
      }
    }
    for (const n of this.nodes) {
      try {
        n.disconnect();
      } catch {
        /* ignore */
      }
    }
    this.sources = [];
    this.nodes = [];
    this.taps = [];
  }
}

// ── Envelopes ──

/** Percussive envelope: linear attack to `peak`, exponential decay. Returns end time. */
export function perc(p: AudioParam, t: number, peak: number, attack: number, decay: number): number {
  p.setValueAtTime(SILENT, t);
  p.linearRampToValueAtTime(Math.max(peak, SILENT), t + attack);
  p.exponentialRampToValueAtTime(SILENT, t + attack + decay);
  return t + attack + decay;
}

/** Sustained envelope: attack to `peak`, hold until `off`, exponential release. Returns end time. */
export function sustain(p: AudioParam, t: number, peak: number, attack: number, off: number, release: number): number {
  const top = Math.max(peak, SILENT);
  const holdAt = Math.max(t + attack, off);
  p.setValueAtTime(SILENT, t);
  p.linearRampToValueAtTime(top, t + attack);
  p.setValueAtTime(top, holdAt);
  p.exponentialRampToValueAtTime(SILENT, holdAt + release);
  return holdAt + release;
}

// ── Layers (add into an existing voice) ──

export interface ToneOpts {
  type?: OscillatorType;
  freq: number;
  /** Glide target frequency (exponential). */
  to?: number;
  /** Seconds to reach `to` (defaults to the decay). */
  glide?: number;
  gain: number;
  attack?: number;
  hold?: number;
  decay: number;
  detune?: number;
}

/** An oscillator with a percussive (or held) envelope and optional pitch glide. */
export function addTone(v: Voice, dest: AudioNode, t: number, o: ToneOpts): number {
  const a = o.attack ?? 0.003;
  const h = o.hold ?? 0;
  const end = t + a + h + o.decay;
  const osc = v.osc(o.type ?? 'sine', o.freq, t, end + 0.02, o.detune ?? 0);
  if (o.to !== undefined) osc.frequency.exponentialRampToValueAtTime(Math.max(1, o.to), t + (o.glide ?? o.decay));
  const g = v.gain(0);
  g.gain.setValueAtTime(SILENT, t);
  g.gain.linearRampToValueAtTime(Math.max(o.gain, SILENT), t + a);
  if (h > 0) g.gain.setValueAtTime(Math.max(o.gain, SILENT), t + a + h);
  g.gain.exponentialRampToValueAtTime(SILENT, end);
  osc.connect(g);
  g.connect(dest);
  return end;
}

export interface NoiseOpts {
  type: BiquadFilterType;
  freq: number;
  /** Filter sweep target (exponential). */
  to?: number;
  /** Seconds to reach `to` (defaults to the decay). */
  sweep?: number;
  q?: number;
  gain: number;
  attack?: number;
  hold?: number;
  decay: number;
  /** Extra lowpass to keep noise from getting fizzy. */
  lowpass?: number;
}

/** Filtered white noise with an envelope and optional filter sweep. */
export function addNoise(v: Voice, dest: AudioNode, t: number, o: NoiseOpts): number {
  const a = o.attack ?? 0.002;
  const h = o.hold ?? 0;
  const end = t + a + h + o.decay;
  const src = v.noise(t, end + 0.02);
  const f = v.filter(o.type, o.freq, o.q ?? 0.8);
  f.frequency.setValueAtTime(o.freq, t);
  if (o.to !== undefined) f.frequency.exponentialRampToValueAtTime(Math.max(20, o.to), t + (o.sweep ?? o.decay));
  const g = v.gain(0);
  g.gain.setValueAtTime(SILENT, t);
  g.gain.linearRampToValueAtTime(Math.max(o.gain, SILENT), t + a);
  if (h > 0) g.gain.setValueAtTime(Math.max(o.gain, SILENT), t + a + h);
  g.gain.exponentialRampToValueAtTime(SILENT, end);
  src.connect(f);
  if (o.lowpass) {
    const lp = v.filter('lowpass', o.lowpass, 0.7);
    f.connect(lp);
    lp.connect(g);
  } else {
    f.connect(g);
  }
  g.connect(dest);
  return end;
}

/**
 * FM bell: a sine carrier modulated at an inharmonic ratio. The modulation
 * index decays faster than the amplitude, so the strike is bright and the
 * tail is pure. Ratio 3.5 ≈ tubular bell, 1.41 ≈ clangy metal.
 */
export function addBell(
  v: Voice,
  dest: AudioNode,
  t: number,
  freq: number,
  gain: number,
  decay: number,
  ratio = 3.5,
  index = 2.5,
): number {
  const end = t + decay + 0.01;
  const car = v.osc('sine', freq, t, end + 0.02);
  const mod = v.osc('sine', freq * ratio, t, end + 0.02);
  const depth = v.gain(0);
  depth.gain.setValueAtTime(freq * index, t);
  depth.gain.exponentialRampToValueAtTime(Math.max(1, freq * index * 0.04), t + decay * 0.7);
  mod.connect(depth);
  depth.connect(car.frequency);
  const g = v.gain(0);
  perc(g.gain, t, gain, 0.002, decay);
  car.connect(g);
  g.connect(dest);
  return end;
}

/**
 * Brass-ish chord: two detuned saws per note through a lowpass whose cutoff
 * "blats" open on the attack and settles. Level is normalised by voice
 * count so bigger chords are not louder.
 */
export function addBrass(v: Voice, dest: AudioNode, t: number, midis: readonly number[], dur: number, gain: number): number {
  const end = t + dur + 0.35;
  const lp = v.filter('lowpass', 500, 1.4);
  lp.frequency.setValueAtTime(450, t);
  lp.frequency.linearRampToValueAtTime(3400, t + 0.035);
  lp.frequency.exponentialRampToValueAtTime(1300, t + 0.3);
  const pre = v.gain(1.6 / (midis.length * 2));
  for (const m of midis) {
    for (const d of [-8, 8]) v.osc('sawtooth', 440 * Math.pow(2, (m - 69) / 12), t, end + 0.02, d).connect(pre);
  }
  const g = v.gain(0);
  sustain(g.gain, t, gain, 0.018, t + dur, 0.3);
  pre.connect(lp);
  lp.connect(g);
  g.connect(dest);
  return end;
}

// ── Standalone conveniences (one voice each) ──

export function tone(kit: Kit, out: Out, t: number, o: ToneOpts, wet = 0): Voice {
  const v = new Voice(kit, out, wet);
  addTone(v, v.out, t, o);
  return v;
}

export function noiseHit(kit: Kit, out: Out, t: number, o: NoiseOpts, wet = 0): Voice {
  const v = new Voice(kit, out, wet);
  addNoise(v, v.out, t, o);
  return v;
}

export function bell(kit: Kit, out: Out, t: number, freq: number, gain: number, decay: number, wet = 0.25, ratio = 3.5, index = 2.5): Voice {
  const v = new Voice(kit, out, wet);
  addBell(v, v.out, t, freq, gain, decay, ratio, index);
  return v;
}

export function brass(kit: Kit, out: Out, t: number, midis: readonly number[], dur: number, gain: number, wet = 0.2): Voice {
  const v = new Voice(kit, out, wet);
  addBrass(v, v.out, t, midis, dur, gain);
  return v;
}
