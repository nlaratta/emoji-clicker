import type { WeaponFamily } from '../content/weapons';
import type { UiSound } from './engine';
import {
  SILENT,
  Voice,
  addBell,
  addBrass,
  addNoise,
  addTone,
  bell,
  brass,
  noiseHit,
  perc,
  sustain,
  tone,
  type Kit,
  type Out,
} from './synth';
import { majorRoot, mtof, scaleMidi, triad, type Key } from './theory';

/**
 * One-shot sound effects. Every function schedules at audio time `t` and
 * returns the Voice it built. Peak levels are budgeted for the sfx bus:
 * a poke peaks around 0.25, big moments around 0.5 (the music is ducked
 * underneath those by the engine).
 */

const rand = (a: number, b: number): number => a + Math.random() * (b - a);
const cents = (c: number): number => Math.pow(2, c / 1200);

/** Pentatonic note `deg` of the key, starting from the key root raised to at least `floor`. */
export function pentaNote(key: Key, deg: number, floor = 60): number {
  let base = key.root;
  while (base < floor) base += 12;
  return scaleMidi(base, key.penta, deg);
}

/** Major triad + octave that fits the key, around `floor`. */
function majorChord(key: Key, floor: number): number[] {
  let r = majorRoot(key);
  while (r < floor) r += 12;
  return [r, r + 4, r + 7, r + 12];
}

/** Tonic triad + octave of the key (minor or major per mode), around `floor`. */
export function tonicChord(key: Key, floor: number): number[] {
  let r = key.root;
  while (r < floor) r += 12;
  const t = triad(key, 0, r);
  return [...t, r + 12];
}

// ── Poke ──

export interface PokeOpts {
  family: WeaponFamily;
  midi: number;
  /** Level multiplier (rate-normalised by the engine; auto pokes are lower). */
  gain: number;
  crit: boolean;
  /** Level of the crit bell + punch (normalised by the engine's crit rate). */
  critGain: number;
  /** Shared bitcrusher input for the `reality` family. */
  crush: AudioNode | null;
}

/**
 * The core sound, played up to ~20×/s. Three layers:
 *  - a short triangle "note" at the streak pitch (the melody),
 *  - a body thump (sine with a fast pitch drop) for impact,
 *  - a filtered noise burst for texture.
 * The weapon family reshapes all three. Pitch jitter stays within ±6
 * cents (in tune with the score); the rest of the per-hit variety comes
 * from filter cutoffs, body pitch and the random noise offset.
 */
export function poke(kit: Kit, out: Out, t: number, o: PokeOpts): Voice {
  const v = new Voice(kit, out, o.crit ? 0.22 : 0.07);
  const d = v.out;
  const g = o.gain;
  const f = mtof(o.midi) * cents(rand(-6, 6));
  const vary = rand(0.85, 1.15);

  switch (o.family) {
    case 'blunt': // Thuddy: big low body, dull lowpassed noise.
      addTone(v, d, t, { freq: 170 * vary, to: 55, glide: 0.07, gain: 0.15 * g, decay: 0.13 });
      addNoise(v, d, t, { type: 'lowpass', freq: 900 * vary, gain: 0.09 * g, decay: 0.04 });
      addTone(v, d, t, { type: 'triangle', freq: f, gain: 0.07 * g, decay: 0.1 });
      break;
    case 'blade': // Swish + ring: falling bandpass noise, inharmonic metallic partial.
      addNoise(v, d, t, { type: 'bandpass', freq: 5200 * vary, to: 1700, q: 1.3, gain: 0.11 * g, attack: 0.008, decay: 0.08, lowpass: 6000 });
      addTone(v, d, t, { freq: 260 * vary, to: 110, glide: 0.05, gain: 0.07 * g, decay: 0.06 });
      addTone(v, d, t, { freq: f, gain: 0.065 * g, decay: 0.24 });
      addTone(v, d, t, { freq: f * 2.76, gain: 0.022 * g, decay: 0.18 });
      break;
    case 'arrow': // Thwip: rising resonant noise + a bowstring twang settling onto the note.
      addNoise(v, d, t, { type: 'bandpass', freq: 1200 * vary, to: 4200, q: 3, gain: 0.2 * g, attack: 0.004, decay: 0.07, lowpass: 6000 });
      addTone(v, d, t, { type: 'triangle', freq: f * 1.5, to: f, glide: 0.03, gain: 0.09 * g, decay: 0.12 });
      addTone(v, d, t, { freq: 200 * vary, to: 90, glide: 0.04, gain: 0.1 * g, decay: 0.06 });
      break;
    case 'bullet': // Crack: very short bright noise snap over a tight body.
      addNoise(v, d, t, { type: 'bandpass', freq: 3000 * vary, q: 0.7, gain: 0.16 * g, attack: 0.001, decay: 0.022, lowpass: 6000 });
      addTone(v, d, t, { freq: 240 * vary, to: 60, glide: 0.04, gain: 0.14 * g, decay: 0.08 });
      addTone(v, d, t, { type: 'triangle', freq: f, gain: 0.06 * g, decay: 0.07 });
      break;
    case 'explosive': // Low boom: long sub drop, darkening noise, note an octave down.
      addTone(v, d, t, { freq: 130 * vary, to: 38, glide: 0.18, gain: 0.15 * g, decay: 0.26 });
      addNoise(v, d, t, { type: 'lowpass', freq: 1500 * vary, to: 250, q: 0.9, gain: 0.09 * g, decay: 0.22 });
      addTone(v, d, t, { type: 'triangle', freq: f / 2, gain: 0.07 * g, decay: 0.13 });
      break;
    case 'fire': // Whoosh: soft-attack rising bandpass noise, gentle body.
      addNoise(v, d, t, { type: 'bandpass', freq: 700 * vary, to: 2600, q: 0.9, gain: 0.17 * g, attack: 0.02, decay: 0.16 });
      addTone(v, d, t, { freq: 140 * vary, to: 70, glide: 0.06, gain: 0.1 * g, decay: 0.09 });
      addTone(v, d, t, { type: 'triangle', freq: f, gain: 0.075 * g, attack: 0.008, decay: 0.14 });
      break;
    case 'energy': { // Zap: saw sweeping down onto the note through a resonant closing filter.
      const lp = v.filter('lowpass', 6000, 8);
      lp.frequency.setValueAtTime(6000 * vary, t);
      lp.frequency.exponentialRampToValueAtTime(900, t + 0.08);
      lp.connect(d);
      addTone(v, lp, t, { type: 'sawtooth', freq: f * 3, to: f, glide: 0.06, gain: 0.07 * g, decay: 0.1 });
      addTone(v, d, t, { freq: f, gain: 0.065 * g, decay: 0.12 });
      addTone(v, d, t, { freq: 180 * vary, to: 80, glide: 0.05, gain: 0.11 * g, decay: 0.07 });
      break;
    }
    case 'cosmic': { // Deep sub + shimmer partials + airy noise.
      let sub = f / 4;
      while (sub < 45) sub *= 2;
      addTone(v, d, t, { freq: sub * 1.5, to: sub, glide: 0.05, gain: 0.16 * g, decay: 0.28 });
      addTone(v, d, t, { type: 'triangle', freq: f, gain: 0.05 * g, decay: 0.15 });
      addTone(v, d, t, { freq: f * 2, gain: 0.022 * g, attack: 0.01, decay: 0.35 });
      addTone(v, d, t, { freq: f * 3.01, gain: 0.016 * g, attack: 0.015, decay: 0.32 });
      addNoise(v, d, t, { type: 'highpass', freq: 4000, gain: 0.025 * g, decay: 0.06, lowpass: 9000 });
      break;
    }
    case 'reality': { // Glitch: bitcrushed square that hops pitch, crushed noise ticks, clean body.
      const crushed = o.crush ? v.tap(o.crush) : d;
      const drive = o.crush ? 0.85 : 0.06;
      const end = t + 0.12;
      const sq = v.osc('square', f, t, end + 0.02);
      const hop = [1.5, 0.5, 2, 1.5][Math.floor(Math.random() * 4)];
      sq.frequency.setValueAtTime(f * hop, t + 0.022);
      sq.frequency.setValueAtTime(f, t + 0.045);
      const eg = v.gain(0);
      perc(eg.gain, t, drive * g, 0.002, 0.11);
      sq.connect(eg);
      eg.connect(crushed);
      addNoise(v, crushed, t, { type: 'bandpass', freq: 2500, q: 0.6, gain: (o.crush ? 0.8 : 0.05) * g, decay: 0.015 });
      addNoise(v, crushed, t + 0.03, { type: 'bandpass', freq: 4000, q: 0.6, gain: (o.crush ? 0.6 : 0.04) * g, decay: 0.012 });
      addTone(v, d, t, { freq: 160 * vary, to: 50, glide: 0.06, gain: 0.12 * g, decay: 0.1 });
      addTone(v, d, t, { type: 'triangle', freq: f, gain: 0.04 * g, decay: 0.09 });
      break;
    }
  }

  if (o.crit) {
    // Crit: bright FM bell ping two octaves up + extra low punch. The engine
    // keeps crits prominent over fast clicking but normalises by crit rate.
    const cg = o.critGain;
    let bf = f * 4;
    while (bf > 3600) bf /= 2;
    addBell(v, d, t + 0.004, bf, 0.06 * cg, 0.45, 3.5, 1.8);
    addTone(v, d, t, { freq: 120, to: 42, glide: 0.1, gain: 0.12 * cg, decay: 0.18 });
  }
  return v;
}

/** Weak-spot hit: a high, sparkly strummed tonic chord (separate voice so it is never stolen). */
export function weakDing(kit: Kit, out: Out, t: number, key: Key): Voice {
  const v = new Voice(kit, out, 0.35);
  tonicChord(key, 76).forEach((m, i) => {
    addTone(v, v.out, t + i * 0.018, { freq: mtof(m), gain: 0.04, decay: 0.85 });
    addTone(v, v.out, t + i * 0.018, { freq: mtof(m) * 2, gain: 0.01, decay: 0.4 });
  });
  return v;
}

/** Weak spot appears: a quiet glassy two-note ping, just enough to draw the eye. */
export function weakSpot(kit: Kit, out: Out, t: number, key: Key): void {
  bell(kit, out, t, mtof(pentaNote(key, 2, 84)), 0.025, 0.4, 0.3, 2, 1);
  bell(kit, out, t + 0.07, mtof(pentaNote(key, 4, 84)), 0.022, 0.5, 0.3, 2, 1);
}

// ── Freak Out ──

/** Freak Out start: a wobbling two-oscillator siren sweeping up. */
export function siren(kit: Kit, out: Out, t: number): Voice {
  const v = new Voice(kit, out, 0.25);
  const end = t + 1;
  const lp = v.filter('lowpass', 2600, 1);
  const pre = v.gain(0.5);
  const env = v.gain(0);
  sustain(env.gain, t, 0.08, 0.05, t + 0.72, 0.22);
  const wob = v.osc('sine', 11, t, end);
  const depth = v.gain(35);
  wob.connect(depth);
  for (const [type, k] of [['sawtooth', 1], ['square', 1.006]] as const) {
    const o = v.osc(type, 380 * k, t, end);
    o.frequency.exponentialRampToValueAtTime(1150 * k, t + 0.7);
    depth.connect(o.frequency);
    o.connect(pre);
  }
  pre.connect(lp);
  lp.connect(env);
  env.connect(v.out);
  return v;
}

/** Freak Out end: a soft descending glide in parallel fifths and a breathy "phew". */
export function relief(kit: Kit, out: Out, t: number, key: Key): void {
  const top = mtof(pentaNote(key, 5, 66));
  tone(kit, out, t, { type: 'triangle', freq: top, to: top / 2.5, glide: 0.6, gain: 0.06, attack: 0.02, decay: 0.65 }, 0.25);
  tone(kit, out, t, { type: 'triangle', freq: top / 1.5, to: top / 3.75, glide: 0.6, gain: 0.035, attack: 0.02, decay: 0.65 }, 0.25);
  noiseHit(kit, out, t + 0.05, { type: 'lowpass', freq: 1400, to: 500, q: 0.6, gain: 0.035, attack: 0.08, decay: 0.35 });
}

// ── Haymaker ──

export interface Riser {
  voice: Voice;
  end: number;
}

/**
 * Haymaker wind-up: detuned saws climbing two octaves through an opening
 * resonant filter, with breathy noise and a tremolo that speeds up. It
 * swells for 2 s, holds, and its sources are scheduled to stop at +3 s
 * (the safety net), so it can never drone on if the release is missed.
 */
export function riser(kit: Kit, out: Out, t: number, key: Key): Riser {
  const v = new Voice(kit, out, 0.2);
  const end = t + 3;
  const f = mtof(key.root - 12);
  const lp = v.filter('lowpass', 300, 5);
  lp.frequency.setValueAtTime(300, t);
  lp.frequency.exponentialRampToValueAtTime(5000, t + 2);
  const pre = v.gain(0.45);
  for (const det of [-12, 12]) {
    const o = v.osc('sawtooth', f, t, end, det);
    o.frequency.exponentialRampToValueAtTime(f * 4, t + 2);
    o.connect(pre);
  }
  const n = v.noise(t, end);
  const bp = v.filter('bandpass', 400, 2);
  bp.frequency.setValueAtTime(400, t);
  bp.frequency.exponentialRampToValueAtTime(6000, t + 2);
  const ng = v.gain(0.9);
  n.connect(bp);
  bp.connect(ng);
  ng.connect(lp);
  pre.connect(lp);

  const trem = v.gain(0.6);
  const lfo = v.osc('sine', 5, t, end);
  lfo.frequency.exponentialRampToValueAtTime(16, t + 2);
  const lfoDepth = v.gain(0.4);
  lfo.connect(lfoDepth);
  lfoDepth.connect(trem.gain);

  const env = v.gain(0);
  env.gain.setValueAtTime(SILENT, t);
  env.gain.exponentialRampToValueAtTime(0.1, t + 2);
  env.gain.setValueAtTime(0.1, t + 2.6);
  env.gain.linearRampToValueAtTime(0, t + 2.95);
  lp.connect(trem);
  trem.connect(env);
  env.connect(v.out);
  return { voice: v, end };
}

/** Haymaker release: sub drop + punch + darkening blast + crack, scaled by charge. Perfect adds a triumphant stab. */
export function haymaker(kit: Kit, out: Out, t: number, charge: number, perfect: boolean, key: Key): void {
  const s = 0.5 + 0.5 * Math.max(0, Math.min(1, charge));
  const v = new Voice(kit, out, 0.35);
  addTone(v, v.out, t, { freq: 120, to: 28, glide: 0.5, gain: 0.26 * s, decay: 0.75 });
  addTone(v, v.out, t, { type: 'triangle', freq: 240, to: 60, glide: 0.12, gain: 0.1 * s, decay: 0.2 });
  addNoise(v, v.out, t, { type: 'lowpass', freq: 4000, to: 250, sweep: 0.5, q: 0.9, gain: 0.17 * s, decay: 0.65 });
  addNoise(v, v.out, t, { type: 'bandpass', freq: 2500, q: 1, gain: 0.1 * s, decay: 0.05, lowpass: 6000 });
  if (perfect) {
    brass(kit, out, t + 0.05, majorChord(key, 55), 0.5, 0.13, 0.35);
    sparkle(kit, out, t + 0.12, key, 6, 0.04, 0.03);
  }
}

// ── Golden Freakmoji ──

/** Ascending FM-bell sparkle through the pentatonic scale, high register. */
export function sparkle(kit: Kit, out: Out, t: number, key: Key, count = 7, step = 0.045, gain = 0.04): void {
  const v = new Voice(kit, out, 0.4);
  const start = Math.floor(Math.random() * 3);
  for (let i = 0; i < count; i++) {
    addBell(v, v.out, t + i * step, mtof(pentaNote(key, start + i, 79)), gain * (1 - i * 0.05), 0.35, 2, 1.1);
  }
}

/** Golden spawn: magical shimmer: a sparkle run over a soft airy noise swell. */
export function goldenSpawn(kit: Kit, out: Out, t: number, key: Key): void {
  sparkle(kit, out, t, key, 8, 0.05, 0.055);
  noiseHit(kit, out, t, { type: 'bandpass', freq: 7000, q: 2, gain: 0.035, attack: 0.15, decay: 0.45, lowpass: 9000 }, 0.4);
}

/** Golden caught: coin-like square arpeggio (filtered), then a sparkle. */
export function goldenCaught(kit: Kit, out: Out, t: number, key: Key): void {
  const v = new Voice(kit, out, 0.25);
  const lp = v.filter('lowpass', 4500, 0.7);
  lp.connect(v.out);
  const notes = [0, 2, 3, 5].map((d) => pentaNote(key, d, 72));
  notes.forEach((m, i) => {
    const last = i === notes.length - 1;
    addTone(v, lp, t + i * 0.055, { type: 'square', freq: mtof(m), gain: 0.05, hold: last ? 0.08 : 0.02, decay: last ? 0.35 : 0.08 });
  });
  sparkle(kit, out, t + 0.2, key, 6, 0.04, 0.03);
}

/** Golden missed: a soft descending two-note "aww" with drooping bends. */
export function goldenMissed(kit: Kit, out: Out, t: number, key: Key): void {
  const a = mtof(pentaNote(key, 2, 67));
  const b = mtof(pentaNote(key, 0, 67));
  tone(kit, out, t, { type: 'triangle', freq: a, to: a * cents(-100), glide: 0.18, gain: 0.055, attack: 0.02, hold: 0.08, decay: 0.15 }, 0.2);
  tone(kit, out, t + 0.22, { type: 'triangle', freq: b, to: b * cents(-250), glide: 0.4, gain: 0.05, attack: 0.02, hold: 0.12, decay: 0.3 }, 0.2);
}

// ── Shop ──

/** Weapon equip: metallic FM clang + a rising two-note (root → fifth). */
export function equip(kit: Kit, out: Out, t: number, key: Key): void {
  const v = new Voice(kit, out, 0.25);
  addBell(v, v.out, t, 880 * rand(0.95, 1.05), 0.08, 0.5, 1.41, 4);
  addNoise(v, v.out, t, { type: 'bandpass', freq: 3200, q: 1.2, gain: 0.07, decay: 0.03, lowpass: 6000 });
  const r = pentaNote(key, 0, 64);
  addTone(v, v.out, t + 0.07, { type: 'triangle', freq: mtof(r), gain: 0.06, decay: 0.14 });
  addTone(v, v.out, t + 0.15, { type: 'triangle', freq: mtof(r + 7), gain: 0.065, hold: 0.04, decay: 0.3 });
}

/** Producer purchase: a cheerful upward "bloop"; bigger bulk buys pop a little higher. */
export function pop(kit: Kit, out: Out, t: number, key: Key, amount: number): void {
  const deg = Math.min(4, Math.round(Math.log10(Math.max(1, amount)) * 2));
  const f = mtof(pentaNote(key, deg + 2, 67));
  const v = new Voice(kit, out, 0.1);
  addTone(v, v.out, t, { freq: f * 0.55, to: f, glide: 0.03, gain: 0.11, decay: 0.09 });
  addTone(v, v.out, t + 0.03, { type: 'triangle', freq: f * 2, gain: 0.02, decay: 0.06 });
  addNoise(v, v.out, t, { type: 'bandpass', freq: 2000, q: 1, gain: 0.03, decay: 0.01 });
}

/** Upgrade purchase: sparkly three-note arpeggio with bell overtones. */
export function upgrade(kit: Kit, out: Out, t: number, key: Key): void {
  const v = new Voice(kit, out, 0.3);
  [0, 2, 4].forEach((d, i) => {
    const f = mtof(pentaNote(key, d + 5, 67));
    addTone(v, v.out, t + i * 0.065, { type: 'triangle', freq: f, gain: 0.06, decay: i === 2 ? 0.4 : 0.15 });
    addBell(v, v.out, t + i * 0.065, f * 2, 0.018, 0.3, 2, 1);
  });
}

/** Paranoia node: dark, mysterious low bells a tritone apart over a sub hum. */
export function darkChime(kit: Kit, out: Out, t: number, key: Key): void {
  const r = key.root;
  bell(kit, out, t, mtof(r), 0.07, 1.6, 0.5, 3.5, 2);
  bell(kit, out, t + 0.12, mtof(r + 6), 0.05, 1.8, 0.5, 3.5, 2);
  tone(kit, out, t, { freq: mtof(r - 12), gain: 0.06, attack: 0.15, decay: 1.4 }, 0.2);
}

/** Can't afford / not allowed: a soft, low "bonk". */
export function denied(kit: Kit, out: Out, t: number): void {
  const v = new Voice(kit, out, 0);
  addTone(v, v.out, t, { freq: 190, to: 110, glide: 0.1, gain: 0.1, decay: 0.14 });
  addTone(v, v.out, t, { type: 'triangle', freq: 95, gain: 0.04, decay: 0.1 });
}

// ── Abilities ──

/** Minion Rally: a short-long brass fanfare ("ba-DAAH"). */
export function rally(kit: Kit, out: Out, t: number, key: Key): void {
  const c = majorChord(key, 55);
  brass(kit, out, t, c.slice(0, 3), 0.08, 0.1, 0.25);
  brass(kit, out, t + 0.15, c, 0.55, 0.12, 0.3);
}

/** Flurry: an accelerating woodblock tick roll. */
export function flurry(kit: Kit, out: Out, t: number): void {
  const v = new Voice(kit, out, 0.12);
  let at = t;
  for (let i = 0; i < 18; i++) {
    const k = i / 17;
    addTone(v, v.out, at, { type: 'triangle', freq: 1100 + 900 * k, to: 800 + 700 * k, glide: 0.015, gain: 0.08 + 0.03 * k, decay: 0.03 });
    addNoise(v, v.out, at, { type: 'bandpass', freq: 3500, q: 2, gain: 0.05, decay: 0.012 });
    at += 0.06 - 0.038 * k;
  }
}

/** Time Warp: tape-style speed-up: a warbling saw and noise band racing upward, then a snap. */
export function timewarp(kit: Kit, out: Out, t: number): void {
  const v = new Voice(kit, out, 0.3);
  const end = t + 0.9;
  const osc = v.osc('sawtooth', 110, t, end);
  osc.frequency.exponentialRampToValueAtTime(2400, t + 0.8);
  const lfo = v.osc('sine', 6, t, end);
  lfo.frequency.exponentialRampToValueAtTime(32, t + 0.8);
  const depth = v.gain(15);
  depth.gain.setValueAtTime(15, t);
  depth.gain.exponentialRampToValueAtTime(400, t + 0.8);
  lfo.connect(depth);
  depth.connect(osc.frequency);
  const bp = v.filter('bandpass', 400, 1.5);
  bp.frequency.setValueAtTime(400, t);
  bp.frequency.exponentialRampToValueAtTime(5000, t + 0.8);
  const env = v.gain(0);
  env.gain.setValueAtTime(SILENT, t);
  env.gain.exponentialRampToValueAtTime(0.12, t + 0.7);
  env.gain.linearRampToValueAtTime(0, t + 0.82);
  osc.connect(bp);
  bp.connect(env);
  env.connect(v.out);
  addNoise(v, v.out, t, { type: 'bandpass', freq: 300, to: 6000, sweep: 0.8, q: 1.5, gain: 0.09, attack: 0.6, decay: 0.2, lowpass: 7000 });
  addNoise(v, v.out, t + 0.8, { type: 'highpass', freq: 2500, gain: 0.08, decay: 0.03, lowpass: 7000 });
}

/** Singularity: a deep cosmic "whoom": swelling sub, a filtered saw drone, and a long reverb tail. */
export function singularity(kit: Kit, out: Out, t: number, key: Key): void {
  const v = new Voice(kit, out, 0.6);
  addTone(v, v.out, t, { freq: 70, to: 32, glide: 2.2, gain: 0.16, attack: 0.35, hold: 0.4, decay: 1.8 });
  const lp = v.filter('lowpass', 200, 2);
  lp.frequency.setValueAtTime(200, t);
  lp.frequency.exponentialRampToValueAtTime(1400, t + 0.6);
  lp.frequency.exponentialRampToValueAtTime(180, t + 2.4);
  lp.connect(v.out);
  const r = mtof(key.root - 12);
  for (const det of [-15, 0, 15]) {
    addTone(v, lp, t, { type: 'sawtooth', freq: r, gain: 0.035, attack: 0.4, hold: 0.5, decay: 1.6, detune: det });
  }
  addNoise(v, v.out, t, { type: 'lowpass', freq: 300, to: 3000, sweep: 0.5, q: 3, gain: 0.05, attack: 0.4, decay: 1.2 });
}

/** A buff running out: subtle soft wind-down glide. */
export function windDown(kit: Kit, out: Out, t: number): void {
  tone(kit, out, t, { type: 'triangle', freq: 700, to: 280, glide: 0.45, gain: 0.04, attack: 0.01, decay: 0.45 }, 0.15);
  noiseHit(kit, out, t, { type: 'lowpass', freq: 1500, to: 300, gain: 0.02, attack: 0.05, decay: 0.4 });
}

// ── Era gates and bosses ──

/** Era gate is open: an attention-grabbing "ding-DING" (root then fifth). */
export function gateReady(kit: Kit, out: Out, t: number, key: Key): void {
  const r = pentaNote(key, 0, 72);
  bell(kit, out, t, mtof(r), 0.06, 0.6, 0.3);
  bell(kit, out, t + 0.14, mtof(r + 7), 0.07, 0.9, 0.35);
}

/** Boss arrives: ominous low hit (sub + noise + tom) under a two-tone alarm. */
export function bossStart(kit: Kit, out: Out, t: number, key: Key): void {
  const v = new Voice(kit, out, 0.35);
  addTone(v, v.out, t, { freq: 90, to: 32, glide: 0.6, gain: 0.24, decay: 0.9 });
  addTone(v, v.out, t, { freq: 140, to: 70, glide: 0.2, gain: 0.1, decay: 0.35 });
  addNoise(v, v.out, t, { type: 'lowpass', freq: 1800, to: 200, q: 0.8, gain: 0.12, decay: 0.6 });
  const alarm = new Voice(kit, out, 0.15);
  const lp = alarm.filter('lowpass', 2800, 1);
  lp.connect(alarm.out);
  const a = key.root + 24;
  const b = a + key.mode[1];
  for (let i = 0; i < 6; i++) {
    addTone(alarm, lp, t + 0.35 + i * 0.12, { type: 'square', freq: mtof(i % 2 ? a : b), gain: 0.04, attack: 0.005, hold: 0.06, decay: 0.04 });
  }
}

/** Boss beaten: glass shatter (scattered high pings + hiss), an explosion, and a victory chord. */
export function bossWin(kit: Kit, out: Out, t: number, key: Key): void {
  const glass = new Voice(kit, out, 0.3);
  let at = t;
  for (let i = 0; i < 14; i++) {
    addTone(glass, glass.out, at, { freq: rand(2500, 7500), gain: rand(0.012, 0.024), attack: 0.001, decay: rand(0.08, 0.25) });
    at += 0.004 + Math.random() * 0.03 * (i / 14);
  }
  addNoise(glass, glass.out, t, { type: 'highpass', freq: 5000, gain: 0.06, decay: 0.4, lowpass: 10000 });
  const boom = new Voice(kit, out, 0.35);
  addTone(boom, boom.out, t, { freq: 100, to: 30, glide: 0.6, gain: 0.2, decay: 0.7 });
  addNoise(boom, boom.out, t, { type: 'lowpass', freq: 2000, to: 200, q: 0.8, gain: 0.13, decay: 0.7 });
  brass(kit, out, t + 0.12, majorChord(key, 55), 1.1, 0.12, 0.35);
}

/** Boss timed out: a deflating "wah wah wah wahhh" trombone (plunger-muted saw). */
export function bossFail(kit: Kit, out: Out, t: number, key: Key): void {
  const v = new Voice(kit, out, 0.2);
  const start = key.root + 7;
  for (let i = 0; i < 4; i++) {
    const last = i === 3;
    const at = t + i * 0.36;
    const len = last ? 0.95 : 0.3;
    const f = mtof(start - i);
    const lp = v.filter('lowpass', 400, 3);
    lp.frequency.setValueAtTime(350, at);
    lp.frequency.linearRampToValueAtTime(1600, at + 0.08);
    lp.frequency.exponentialRampToValueAtTime(450, at + len);
    lp.connect(v.out);
    const osc = v.osc('sawtooth', f, at, at + len + 0.1);
    if (last) {
      const vib = v.osc('sine', 5.5, at, at + len + 0.1);
      const depth = v.gain(f * 0.03);
      vib.connect(depth);
      depth.connect(osc.frequency);
      osc.frequency.setValueAtTime(f, at + 0.3);
      osc.frequency.exponentialRampToValueAtTime(f * cents(-60), at + len);
    }
    const g = v.gain(0);
    sustain(g.gain, at, 0.09, 0.03, at + len - 0.06, 0.08);
    osc.connect(g);
    g.connect(lp);
  }
}

/** Era change: a swelling whoosh that lands on an impact and a chord in the new era's key. */
export function eraChange(kit: Kit, out: Out, t: number, key: Key): void {
  noiseHit(kit, out, t, { type: 'bandpass', freq: 300, to: 4500, sweep: 0.7, q: 1.2, gain: 0.09, attack: 0.62, decay: 0.12, lowpass: 7000 }, 0.3);
  const hit = t + 0.7;
  const v = new Voice(kit, out, 0.4);
  addTone(v, v.out, hit, { freq: 110, to: 35, glide: 0.5, gain: 0.22, decay: 0.7 });
  addNoise(v, v.out, hit, { type: 'lowpass', freq: 3000, to: 250, q: 0.8, gain: 0.13, decay: 0.6 });
  const chord = tonicChord(key, 55);
  const pad = new Voice(kit, out, 0.45);
  addBrass(pad, pad.out, hit + 0.02, chord, 1.2, 0.11);
  sparkle(kit, out, hit + 0.1, key, 6, 0.05, 0.03);
}

/** Achievement: a pleasant, quiet two-bell chime. */
export function achievement(kit: Kit, out: Out, t: number, key: Key): void {
  bell(kit, out, t, mtof(pentaNote(key, 2, 72)), 0.05, 0.6, 0.3, 2, 1.2);
  bell(kit, out, t + 0.09, mtof(pentaNote(key, 4, 72)), 0.05, 0.9, 0.35, 2, 1.2);
}

/**
 * Timeline collapse: a reverse-swell (noise + chord rising exponentially),
 * a sharp implosion (sub drop + sucked-in noise), then a choir-like pad:
 * saws through "ah" formant filters with a slow attack and a long tail.
 */
export function collapse(kit: Kit, out: Out, t: number, key: Key): void {
  const swellEnd = t + 1.6;
  const swell = new Voice(kit, out, 0.4);
  const sg = swell.gain(0);
  sg.gain.setValueAtTime(SILENT, t);
  sg.gain.exponentialRampToValueAtTime(0.1, swellEnd - 0.02);
  sg.gain.linearRampToValueAtTime(0, swellEnd);
  sg.connect(swell.out);
  const sn = swell.noise(t, swellEnd + 0.05);
  const sbp = swell.filter('bandpass', 500, 1);
  sbp.frequency.setValueAtTime(500, t);
  sbp.frequency.exponentialRampToValueAtTime(5000, swellEnd);
  sn.connect(sbp);
  sbp.connect(sg);
  const chord = tonicChord(key, 55);
  const spre = swell.gain(0.25);
  for (const m of chord) swell.osc('sawtooth', mtof(m), t, swellEnd + 0.05).connect(spre);
  const slp = swell.filter('lowpass', 2000, 1);
  spre.connect(slp);
  slp.connect(sg);

  const imp = new Voice(kit, out, 0.5);
  addTone(imp, imp.out, swellEnd, { freq: 140, to: 25, glide: 0.8, gain: 0.25, decay: 0.9 });
  addNoise(imp, imp.out, swellEnd, { type: 'bandpass', freq: 4000, to: 200, sweep: 0.25, q: 1, gain: 0.14, decay: 0.3 });

  const choir = new Voice(kit, out, 0.55);
  const at = swellEnd + 0.1;
  const off = at + 2.5;
  const env = choir.gain(0);
  sustain(env.gain, at, 0.11, 0.7, off, 1.6);
  const src = choir.gain(1 / chord.length);
  for (const m of chord) {
    for (const det of [-9, 9]) {
      const o = choir.osc('sawtooth', mtof(m - 12), at, off + 1.7, det);
      o.connect(src);
    }
  }
  const vib = choir.osc('sine', 5, at, off + 1.7);
  const vibDepth = choir.gain(4);
  vib.connect(vibDepth);
  for (const [fc, q, lvl] of [[800, 5, 1], [1150, 6, 0.6], [2900, 8, 0.2]] as const) {
    const bp = choir.filter('bandpass', fc, q);
    const lg = choir.gain(lvl * 1.8);
    src.connect(bp);
    bp.connect(lg);
    lg.connect(env);
  }
  env.connect(choir.out);
}

// ── Interface ──

/** Subtle interface feedback; these sit well under everything else. */
export function ui(kit: Kit, out: Out, t: number, kind: UiSound): void {
  switch (kind) {
    case 'hover':
      tone(kit, out, t, { freq: 2300, to: 2500, glide: 0.02, gain: 0.012, attack: 0.002, decay: 0.025 });
      break;
    case 'click': {
      const v = new Voice(kit, out, 0);
      addTone(v, v.out, t, { type: 'triangle', freq: 1300, to: 900, glide: 0.02, gain: 0.045, attack: 0.001, decay: 0.035 });
      addNoise(v, v.out, t, { type: 'highpass', freq: 4000, gain: 0.015, decay: 0.008, lowpass: 8000 });
      break;
    }
    case 'tab': {
      const v = new Voice(kit, out, 0);
      addTone(v, v.out, t, { freq: 880, gain: 0.03, decay: 0.05 });
      addTone(v, v.out, t + 0.035, { freq: 1320, gain: 0.028, decay: 0.07 });
      break;
    }
    case 'deny': {
      const v = new Voice(kit, out, 0);
      addTone(v, v.out, t, { type: 'triangle', freq: 150, to: 120, glide: 0.1, gain: 0.025, decay: 0.11 });
      addTone(v, v.out, t, { type: 'triangle', freq: 158, to: 126, glide: 0.1, gain: 0.02, decay: 0.11 });
      break;
    }
    case 'toggle':
      tone(kit, out, t, { type: 'triangle', freq: 900, to: 1400, glide: 0.025, gain: 0.035, attack: 0.001, decay: 0.035 });
      break;
    case 'open': {
      const v = new Voice(kit, out, 0);
      addTone(v, v.out, t, { freq: 420, to: 840, glide: 0.08, gain: 0.03, decay: 0.1 });
      addNoise(v, v.out, t, { type: 'bandpass', freq: 800, to: 3000, q: 1, gain: 0.012, attack: 0.02, decay: 0.08 });
      break;
    }
    case 'close': {
      const v = new Voice(kit, out, 0);
      addTone(v, v.out, t, { freq: 840, to: 420, glide: 0.08, gain: 0.03, decay: 0.1 });
      addNoise(v, v.out, t, { type: 'bandpass', freq: 3000, to: 800, q: 1, gain: 0.012, attack: 0.02, decay: 0.08 });
      break;
    }
  }
}
