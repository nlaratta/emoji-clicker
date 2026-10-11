import type { Game } from '../sim/game';
import { SILENT, Voice, addBell, addNoise, addTone, sustain, type Kit, type Out } from './synth';
import { keyFor, makeRng, mtof, scaleMidi, snapPenta, type Key } from './theory';

/**
 * Generative, era-specific score.
 *
 * Timing: a lookahead step sequencer driven from the game loop. Each
 * `update` schedules every 16th-note step that falls within the next
 * LOOKAHEAD seconds of `ctx.currentTime` (no timers). After a long stall
 * the clock re-syncs instead of flooding catch-up notes.
 *
 * Arrangement: each era has a tempo, key, instrument palette, drum kit and
 * patterns. A seeded motif (rhythm + chord-relative melody) is varied every
 * bar and transposed over a 4-bar progression; sections run A A B A over
 * 32 bars so it never loops verbatim.
 *
 * Intensity layers, smoothed and gated at schedule time:
 *   base    always
 *   combo   lead/arp parts while the player is comboing (or freaking out)
 *   freak   extra percussion during Freak Out
 *   boss    darker key, faster tempo, pulsing bass, 16th hats, alarm ostinato
 *   sing    sub drone and glassy sparkles while Singularity runs
 *
 * Era changes crossfade over ~2 s between two players. A global cap keeps
 * at most MAX_VOICES music notes sounding at once.
 */

const LOOKAHEAD = 0.15;
const MAX_VOICES = 16;
const MAX_STEPS_PER_UPDATE = 16;
const BOSS_TEMPO = 1.07;

type Drum =
  | 'kick'
  | 'subKick'
  | 'tomLow'
  | 'tomHi'
  | 'log'
  | 'frame'
  | 'slap'
  | 'snare'
  | 'clap'
  | 'clank'
  | 'anvil'
  | 'hat'
  | 'openHat'
  | 'shaker'
  | 'tamb'
  | 'tick'
  | 'glitch';

type Inst =
  | 'marimba'
  | 'lute'
  | 'harpsi'
  | 'drone'
  | 'chug'
  | 'square'
  | 'synthBass'
  | 'saw'
  | 'gatedPad'
  | 'pad'
  | 'organ'
  | 'bell'
  | 'sub'
  | 'glitch'
  | 'warpPad';

type Layer = 'base' | 'combo';

/** Drum pattern chars: X accent, x normal, o ghost, ? maybe (seeded), . rest. */
interface DrumTrack {
  drum: Drum;
  pattern: string;
  gain: number;
}

interface Part {
  inst: Inst;
  /** Octave offset from the key root (octave 3). */
  oct: number;
  gain: number;
  layer: Layer;
}

interface Style {
  bpm: number;
  /** 16th steps per bar (16 = 4/4, 14 = 7/8). */
  steps: number;
  /** Delay of off-beat 16ths, as a fraction of a step. */
  swing: number;
  /** Chord per bar, as mode degrees. */
  progression: readonly number[];
  drums: readonly DrumTrack[];
  freak: readonly DrumTrack[];
  bossHat: Drum;
  /** Bass pattern chars: R/r root (accent/soft), 5 fifth, O octave, . hold, _ rest. */
  bass: Part & { pattern: string };
  pad: (Part & { gate?: string }) | null;
  lead: Part & { density: number; penta: boolean };
  arp: (Part & { every: number; shape: readonly number[] }) | null;
  /** Reverb send for this era's instruments. */
  verb: number;
  /** Random per-note detune in cents (Reality). */
  wobble: number;
}

const STYLES: readonly Style[] = [
  // 0 Primitive: tribal toms and log drums, plucky marimba, swung.
  {
    bpm: 96,
    steps: 16,
    swing: 0.12,
    progression: [0, 5, 3, 4],
    drums: [
      { drum: 'tomLow', pattern: 'X.....x.X.....x.', gain: 0.12 },
      { drum: 'log', pattern: '....x.......x..o', gain: 0.08 },
      { drum: 'shaker', pattern: 'o.x.o.x.o.x.o.x.', gain: 0.03 },
      { drum: 'tomHi', pattern: '.......o.....?..', gain: 0.06 },
    ],
    freak: [
      { drum: 'tomHi', pattern: 'x.oxx.ox..x.xxox', gain: 0.055 },
      { drum: 'shaker', pattern: 'xoxoxoxoxoxoxoxo', gain: 0.025 },
    ],
    bossHat: 'shaker',
    bass: { inst: 'marimba', oct: -1, gain: 0.14, layer: 'base', pattern: 'R.....5.R...O...' },
    pad: null,
    lead: { inst: 'marimba', oct: 1, gain: 0.085, layer: 'base', density: 0.45, penta: true },
    arp: { inst: 'marimba', oct: 2, gain: 0.035, layer: 'combo', every: 2, shape: [0, 1, 2, 1] },
    verb: 0.2,
    wobble: 0,
  },
  // 1 Medieval: frame drum and tambourine, hurdy-gurdy drone, lute melody, harpsichord runs.
  {
    bpm: 100,
    steps: 16,
    swing: 0.06,
    progression: [0, 6, 0, 3],
    drums: [
      { drum: 'frame', pattern: 'X......x..x.....', gain: 0.12 },
      { drum: 'slap', pattern: '....x.......x.o.', gain: 0.07 },
      { drum: 'tamb', pattern: '..x...x...x...x.', gain: 0.03 },
    ],
    freak: [
      { drum: 'tamb', pattern: 'xxxxxxxxxxxxxxxx', gain: 0.022 },
      { drum: 'slap', pattern: '.o.o.o.o.xoxoxox', gain: 0.05 },
    ],
    bossHat: 'tamb',
    bass: { inst: 'lute', oct: -1, gain: 0.09, layer: 'base', pattern: 'R.......5.......' },
    pad: { inst: 'drone', oct: -1, gain: 0.035, layer: 'base' },
    lead: { inst: 'lute', oct: 1, gain: 0.085, layer: 'base', density: 0.5, penta: false },
    arp: { inst: 'harpsi', oct: 1, gain: 0.035, layer: 'combo', every: 1, shape: [0, 1, 2, 3, 2, 1] },
    verb: 0.28,
    wobble: 0,
  },
  // 2 Industrial: clanky metal percussion, palm-muted chugging bass.
  {
    bpm: 110,
    steps: 16,
    swing: 0,
    progression: [0, 1, 0, 5],
    drums: [
      { drum: 'kick', pattern: 'X..x..X...X..x..', gain: 0.12 },
      { drum: 'clank', pattern: '....X.......X...', gain: 0.08 },
      { drum: 'tick', pattern: 'oxoxoxoxoxoxoxox', gain: 0.03 },
      { drum: 'anvil', pattern: '.......o......o.', gain: 0.04 },
    ],
    freak: [
      { drum: 'anvil', pattern: 'x.x.x.x.x.x.x.x.', gain: 0.03 },
      { drum: 'kick', pattern: '..x...x...x...x.', gain: 0.08 },
    ],
    bossHat: 'tick',
    bass: { inst: 'chug', oct: -1, gain: 0.095, layer: 'base', pattern: 'RrrRrrRrRrrRrr5r' },
    pad: null,
    lead: { inst: 'square', oct: 1, gain: 0.04, layer: 'base', density: 0.35, penta: true },
    arp: { inst: 'harpsi', oct: 1, gain: 0.03, layer: 'combo', every: 1, shape: [0, 1, 2, 1] },
    verb: 0.15,
    wobble: 0,
  },
  // 3 Modern: driving rock kit, synth bass, organ pad; lead joins on combos.
  {
    bpm: 120,
    steps: 16,
    swing: 0,
    progression: [0, 6, 3, 0],
    drums: [
      { drum: 'kick', pattern: 'X.....x.X.x.....', gain: 0.12 },
      { drum: 'snare', pattern: '....X.......X...', gain: 0.09 },
      { drum: 'hat', pattern: 'x.x.x.x.x.x.x.x.', gain: 0.03 },
      { drum: 'openHat', pattern: '..............o.', gain: 0.035 },
    ],
    freak: [
      { drum: 'hat', pattern: 'oxoxoxoxoxoxoxox', gain: 0.022 },
      { drum: 'tomHi', pattern: '..........x.x.x.', gain: 0.06 },
      { drum: 'tomLow', pattern: '.............x.x', gain: 0.07 },
    ],
    bossHat: 'hat',
    bass: { inst: 'synthBass', oct: -1, gain: 0.08, layer: 'base', pattern: 'R.R.O.R.R.R.O.5.' },
    pad: { inst: 'organ', oct: 0, gain: 0.025, layer: 'base' },
    lead: { inst: 'square', oct: 1, gain: 0.05, layer: 'combo', density: 0.45, penta: true },
    arp: null,
    verb: 0.15,
    wobble: 0,
  },
  // 4 Neon Future: synthwave: four-on-the-floor, octave bass, gated pad, 16th saw arp.
  {
    bpm: 118,
    steps: 16,
    swing: 0,
    progression: [0, 5, 2, 6],
    drums: [
      { drum: 'kick', pattern: 'X...X...X...X...', gain: 0.12 },
      { drum: 'clap', pattern: '....X.......X...', gain: 0.075 },
      { drum: 'hat', pattern: '..x...x...x...x.', gain: 0.035 },
    ],
    freak: [
      { drum: 'hat', pattern: 'oxoxoxoxoxoxoxox', gain: 0.02 },
      { drum: 'openHat', pattern: '..x...x...x...x.', gain: 0.025 },
      { drum: 'tomLow', pattern: '............xxxx', gain: 0.06 },
    ],
    bossHat: 'hat',
    bass: { inst: 'synthBass', oct: -1, gain: 0.075, layer: 'base', pattern: 'R.O.R.O.R.O.R.O.' },
    pad: { inst: 'gatedPad', oct: 0, gain: 0.03, layer: 'base', gate: 'xx.xx.x.xx.xx.x.' },
    lead: { inst: 'saw', oct: 1, gain: 0.04, layer: 'combo', density: 0.4, penta: true },
    arp: { inst: 'saw', oct: 1, gain: 0.028, layer: 'base', every: 1, shape: [0, 1, 2, 3] },
    verb: 0.3,
    wobble: 0,
  },
  // 5 Cosmic: spacious pads, slow bell arps, sparse sub pulses, lydian.
  {
    bpm: 90,
    steps: 16,
    swing: 0,
    progression: [0, 1, 5, 4],
    drums: [
      { drum: 'subKick', pattern: 'X.......x.......', gain: 0.1 },
      { drum: 'tick', pattern: '......o.......o?', gain: 0.02 },
    ],
    freak: [
      { drum: 'tick', pattern: 'oxoxoxoxoxoxoxox', gain: 0.018 },
      { drum: 'subKick', pattern: '....x.......x...', gain: 0.07 },
      { drum: 'shaker', pattern: 'xoxoxoxoxoxoxoxo', gain: 0.02 },
    ],
    bossHat: 'tick',
    bass: { inst: 'sub', oct: -1, gain: 0.08, layer: 'base', pattern: 'R...............' },
    pad: { inst: 'pad', oct: 0, gain: 0.035, layer: 'base' },
    lead: { inst: 'bell', oct: 2, gain: 0.035, layer: 'combo', density: 0.2, penta: true },
    arp: { inst: 'bell', oct: 1, gain: 0.035, layer: 'base', every: 2, shape: [0, 2, 1, 3] },
    verb: 0.45,
    wobble: 0,
  },
  // 6 Reality: 7/8, bitcrushed glitch voices, detuned warping pad.
  {
    bpm: 126,
    steps: 14,
    swing: 0,
    progression: [0, 5, 1, 4],
    drums: [
      { drum: 'kick', pattern: 'X...X...X..x..', gain: 0.12 },
      { drum: 'glitch', pattern: '....X.......X.', gain: 0.08 },
      { drum: 'hat', pattern: 'x.?.x.?.x.?.x.', gain: 0.028 },
      { drum: 'tick', pattern: '.?..?...?..?.?', gain: 0.03 },
    ],
    freak: [
      { drum: 'glitch', pattern: '?x?x?x?x?x?x?x', gain: 0.03 },
      { drum: 'tomLow', pattern: 'x..x..x...x...', gain: 0.07 },
    ],
    bossHat: 'tick',
    bass: { inst: 'glitch', oct: -1, gain: 0.048, layer: 'base', pattern: 'R..R..5.R._.O.' },
    pad: { inst: 'warpPad', oct: 0, gain: 0.028, layer: 'base' },
    lead: { inst: 'glitch', oct: 1, gain: 0.032, layer: 'base', density: 0.4, penta: true },
    arp: { inst: 'bell', oct: 1, gain: 0.03, layer: 'combo', every: 1, shape: [0, 2, 1, 3, 4, 2] },
    verb: 0.3,
    wobble: 18,
  },
];

/** Tense progressions used during boss fights (mode degrees). */
const BOSS_PROGRESSION = [0, 1, 0, 5];
const BOSS_PROGRESSION_REALITY = [0, 1, 0, 4];
const BOSS_BASS = 'RrRrRrRrRrRrRrRr';
const BOSS_HATS = 'xoxoxoxoxoxoxoxo';

/** How long each drum's sources run (s): used to claim voices accurately. */
const DRUM_LEN: Record<Drum, number> = {
  kick: 0.36,
  subKick: 0.63,
  tomLow: 0.38,
  tomHi: 0.28,
  log: 0.19,
  frame: 0.45,
  slap: 0.1,
  snare: 0.2,
  clap: 0.21,
  clank: 0.17,
  anvil: 0.38,
  hat: 0.06,
  openHat: 0.25,
  shaker: 0.08,
  tamb: 0.14,
  tick: 0.04,
  glitch: 0.12,
};

/** How long a note's sources run past its start (s), mirroring the envelopes in `note`. */
function noteTail(inst: Inst, len: number): number {
  switch (inst) {
    case 'marimba':
      return 0.58;
    case 'lute':
      return Math.min(0.9, len + 0.35) + 0.03;
    case 'harpsi':
      return 0.48;
    case 'chug':
      return 0.14;
    case 'square':
      return len * 0.6 + 0.21;
    case 'synthBass':
      return len * 0.7 + 0.15;
    case 'saw':
      return len * 0.5 + 0.23;
    case 'bell':
      return Math.max(0.8, len) + 0.03;
    case 'glitch':
      return Math.min(len, 0.3) + 0.1;
    case 'drone':
      return len + 0.55;
    case 'gatedPad':
      return len + 0.25;
    case 'pad':
      return len + 0.75;
    case 'organ':
      return len + 0.3;
    case 'sub':
      return len + 0.4;
    case 'warpPad':
      return len + 0.65;
  }
}

/** Chord-relative melody degrees favoured on strong beats. */
const CHORD_TONES = [0, 2, 4, 7];
/** Level the crusher trims to; glitch inputs are driven at gain / CRUSH_TRIM. */
const CRUSH_TRIM = 0.09;

const clamp = (v: number, lo: number, hi: number): number => (v < lo ? lo : v > hi ? hi : v);

type Line = (number | null)[];

/** Seeded motif: rhythm by density (stronger on beats), melody as a chord-relative walk. */
function makeMotif(r: () => number, steps: number, density: number): Line {
  const m: Line = [];
  let deg = CHORD_TONES[Math.floor(r() * 3)];
  for (let i = 0; i < steps; i++) {
    const strong = i % 4 === 0;
    const p = i === 0 ? 1 : strong ? density + 0.25 : i % 2 === 0 ? density : density * 0.45;
    if (r() >= p) {
      m.push(null);
      continue;
    }
    if (strong) deg = CHORD_TONES[Math.floor(r() * CHORD_TONES.length)];
    else deg = clamp(deg + (r() < 0.5 ? -1 : 1) * (r() < 0.75 ? 1 : 2), -3, 9);
    m.push(deg);
  }
  return m;
}

/** Per-bar variation of a motif; the 4th bar of each phrase resolves to the chord root. */
function varyMotif(m: Line, r: () => number, amount: number, cadence: boolean): Line {
  const out = m.slice();
  let prev = 0;
  for (let i = 0; i < out.length; i++) {
    const cur = out[i];
    if (i > 0 && r() < amount) {
      if (cur === null) {
        if (i % 2 === 0) out[i] = prev + (r() < 0.5 ? -1 : 1);
      } else if (i % 4 === 0) {
        out[i] = CHORD_TONES[Math.floor(r() * CHORD_TONES.length)];
      } else {
        out[i] = r() < 0.3 ? null : cur + (r() < 0.5 ? -1 : 1);
      }
    }
    const v = out[i];
    if (v !== null) prev = v;
  }
  if (cadence) {
    const c = Math.floor(out.length * 0.75);
    for (let i = c; i < out.length; i++) out[i] = null;
    out[c] = 0;
  }
  return out;
}

/** Steps from `i` until the next onset in a line (capped). */
function lineLength(line: Line, i: number, cap: number): number {
  let n = 1;
  while (i + n < line.length && line[i + n] === null && n < cap) n++;
  return n;
}

export class Music {
  readonly kit: Kit;
  /** Dry input (through the duck stage) and reverb send for all music. */
  readonly dest: Out;
  private duckGain: GainNode;
  private players: EraPlayer[] = [];
  private voices: number[] = [];
  private comboOn = false;
  private comboLowFor = 0;
  /** Smoothed layer levels 0–1. */
  combo = 0;
  freak = 0;
  boss = 0;
  sing = 0;
  bossActive = false;

  constructor(kit: Kit, dest: Out, duck: GainNode) {
    this.kit = kit;
    this.dest = dest;
    this.duckGain = duck;
  }

  update(now: number, dt: number, game: Game, audible: boolean): void {
    const s = game.state;
    const live = game.liveStreak;
    const step = Math.max(0, Math.min(dt, 0.25));

    // Combo layer with hysteresis: on above 20, off after ~1.5 s below 10.
    if (live > 20) {
      this.comboOn = true;
      this.comboLowFor = 0;
    } else if (live < 10) {
      this.comboLowFor += step;
      if (this.comboLowFor > 1.5) this.comboOn = false;
    } else {
      this.comboLowFor = 0;
    }
    const freakOut = s.time < s.freakOutEnd;
    this.bossActive = s.boss !== null;
    const sing = s.buffs.some((b) => b.id === 'singularity' && b.end > s.time);
    const k = 1 - Math.exp(-step / 0.6);
    this.combo += ((this.comboOn || freakOut ? 1 : 0) - this.combo) * k;
    this.freak += ((freakOut ? 1 : 0) - this.freak) * k;
    this.boss += ((this.bossActive ? 1 : 0) - this.boss) * k;
    this.sing += ((sing ? 1 : 0) - this.sing) * k;

    // Era (derived from state so loads and collapses also switch the score).
    const era = clamp(Math.floor(s.era) || 0, 0, STYLES.length - 1);
    const cur = this.players[this.players.length - 1];
    if (!cur || cur.era !== era) {
      const fade = cur ? 2 : 1.5;
      if (cur) cur.fadeOut(now, fade);
      this.players.push(new EraPlayer(this, era, now + 0.06, fade));
    }

    let v = 0;
    for (const e of this.voices) if (e > now) this.voices[v++] = e;
    this.voices.length = v;

    const until = now + LOOKAHEAD;
    for (const p of this.players) p.schedule(now, until, audible);

    if (this.players.length > 1) {
      this.players = this.players.filter((p, i) => {
        if (i === this.players.length - 1 || now < p.fadeEnd + 0.6) return true;
        p.dispose();
        return false;
      });
    }
  }

  /**
   * Reserve a music voice until `end`. Priorities: 0 core (kick, bass, pad),
   * 1 base parts, 2 intensity layers, 3 garnish. Lower priorities stop
   * short of the cap so the core is never starved.
   */
  claim(end: number, prio: number): boolean {
    const limit = MAX_VOICES - (prio <= 0 ? 0 : prio === 1 ? 1 : prio === 2 ? 3 : 5 + prio - 3);
    if (this.voices.length >= limit) return false;
    this.voices.push(end);
    return true;
  }

  /** Dip the music under a big sound effect. */
  duck(now: number, depth: number, hold: number, release: number): void {
    const p = this.duckGain.gain;
    if (typeof p.cancelAndHoldAtTime === 'function') p.cancelAndHoldAtTime(now);
    else {
      p.cancelScheduledValues(now);
      p.setValueAtTime(p.value, now);
    }
    p.linearRampToValueAtTime(1 - depth, now + 0.04);
    p.setValueAtTime(1 - depth, now + 0.04 + hold);
    p.linearRampToValueAtTime(1, now + 0.04 + hold + release);
  }
}

class EraPlayer {
  readonly era: number;
  fadeEnd = Infinity;
  private music: Music;
  private kit: Kit;
  private style: Style;
  private out: GainNode;
  private wet: GainNode;
  private dest: Out;
  private crush: WaveShaperNode | null;
  private grid: number;
  private stepIndex = 0;
  private stepDur = 0.125;
  private seed: number;
  private motifs: [Line, Line];
  private line: Line = [];
  private chord = 0;
  private key: Key;
  private arpIndex = 0;
  private bar = 0;
  private barRng: () => number = Math.random;

  constructor(music: Music, era: number, start: number, fadeIn: number) {
    this.music = music;
    this.kit = music.kit;
    this.era = era;
    this.style = STYLES[era];
    this.key = keyFor(era, false);
    const ctx = this.kit.ctx;
    this.out = ctx.createGain();
    this.wet = ctx.createGain();
    for (const g of [this.out, this.wet]) {
      g.gain.value = 0; // silent until the fade-in starts (also if faded out before it begins)
      g.gain.setValueAtTime(0, start);
      g.gain.linearRampToValueAtTime(1, start + fadeIn);
    }
    this.out.connect(music.dest.dry);
    if (music.dest.wet) this.wet.connect(music.dest.wet);
    this.dest = { dry: this.out, wet: this.wet };
    this.crush = era === 6 ? this.kit.crusher(this.out, CRUSH_TRIM) : null;
    this.grid = start;
    this.seed = (Math.random() * 0xffffffff) >>> 0;
    const r = makeRng(this.seed);
    const density = this.style.lead.density;
    this.motifs = [makeMotif(r, this.style.steps, density), makeMotif(r, this.style.steps, density * 0.85)];
  }

  fadeOut(now: number, dur: number): void {
    for (const g of [this.out, this.wet]) {
      const p = g.gain;
      if (typeof p.cancelAndHoldAtTime === 'function') p.cancelAndHoldAtTime(now);
      else {
        p.cancelScheduledValues(now);
        p.setValueAtTime(p.value, now);
      }
      p.linearRampToValueAtTime(0, now + dur);
    }
    this.fadeEnd = now + dur;
  }

  dispose(): void {
    for (const n of [this.out, this.wet, this.crush]) {
      try {
        n?.disconnect();
      } catch {
        /* ignore */
      }
    }
  }

  schedule(now: number, until: number, audible: boolean): void {
    // Re-sync after a stall rather than playing a burst of late notes.
    if (this.grid < now - 0.02) this.grid = now + 0.03;
    const st = this.style;
    let n = 0;
    while (this.grid < until && n++ < MAX_STEPS_PER_UPDATE) {
      const bossOn = this.music.bossActive;
      this.stepDur = 60 / (st.bpm * (bossOn ? BOSS_TEMPO : 1)) / 4;
      const i = this.stepIndex % st.steps;
      if (i === 0) this.newBar(bossOn);
      const t = this.grid + (i % 2 === 1 ? st.swing * this.stepDur : 0);
      if (audible && this.grid < this.fadeEnd) this.playStep(i, t, bossOn);
      this.grid += this.stepDur;
      this.stepIndex++;
    }
  }

  private newBar(bossOn: boolean): void {
    const st = this.style;
    this.bar = Math.floor(this.stepIndex / st.steps);
    this.key = keyFor(this.era, bossOn);
    const prog = bossOn ? (this.era === 6 ? BOSS_PROGRESSION_REALITY : BOSS_PROGRESSION) : st.progression;
    this.chord = prog[this.bar % prog.length];
    const r = makeRng(this.seed ^ Math.imul(this.bar + 1, 0x9e3779b1));
    this.barRng = r;
    const section = Math.floor(this.bar / 8) % 4; // A A B A
    const motif = this.motifs[section === 2 ? 1 : 0];
    const amount = this.bar % 8 >= 4 ? 0.3 : 0.15;
    this.line = varyMotif(motif, r, amount, this.bar % 4 === 3);
  }

  /** MIDI of chord-relative degree `deg` at octave `oct`, folded to stay near the part's centre. */
  private chordNote(deg: number, oct: number): number {
    const base = this.key.root + 12 * oct;
    let m = scaleMidi(base, this.key.mode, this.chord + deg);
    const centre = base + 5;
    while (m > centre + 10) m -= 12;
    while (m < centre - 10) m += 12;
    return m;
  }

  private playStep(i: number, t: number, bossOn: boolean): void {
    const st = this.style;
    const m = this.music;
    const dur = this.stepDur;
    const fading = this.fadeEnd < Infinity;
    const pr = (p: number): number => p + (fading ? 1 : 0);
    const level = (layer: Layer): number => (layer === 'base' ? 1 : m.combo);

    // Order matters under the voice cap: core and melodic parts claim
    // voices before the intensity percussion and garnish.
    for (const d of st.drums) this.drumHit(d, i, t, 1, pr(d.drum === 'kick' || d.drum === 'subKick' ? 0 : 1));

    // Bass (boss: pulsing 16ths).
    const bp = bossOn ? BOSS_BASS : st.bass.pattern;
    const c = bp[i % bp.length];
    if (c !== '.' && c !== '_') {
      let len = 1;
      while (i + len < st.steps && bp[(i + len) % bp.length] === '.' && len < 16) len++;
      const root = this.chordNote(0, st.bass.oct);
      const midi = c === '5' ? this.chordNote(4, st.bass.oct) : c === 'O' ? root + 12 : root;
      const accent = c === 'r' ? 0.65 : 1;
      this.note(st.bass.inst, t, midi, len * dur * (bossOn ? 0.7 : 0.92), st.bass.gain * accent * (bossOn ? 0.85 : 1), pr(0));
    }

    // Pad (chord at the top of the bar; the drone holds the key's root and fifth).
    const pad = st.pad;
    if (pad && i === 0) {
      const barLen = st.steps * dur;
      const notes =
        pad.inst === 'drone'
          ? [this.key.root + 12 * pad.oct, this.key.root + 12 * pad.oct + 7]
          : [0, 2, 4].map((d) => this.chordNote(d, pad.oct));
      for (const n of notes) this.note(pad.inst, t, n, barLen, pad.gain, pr(0));
    }

    // Lead: the varied motif.
    const lv = level(st.lead.layer);
    const ld = this.line[i];
    if (lv > 0.05 && ld !== null && ld !== undefined) {
      let midi = this.chordNote(ld, st.lead.oct);
      if (st.lead.penta) midi = snapPenta(this.key, midi);
      const len = lineLength(this.line, i, 4) * dur * 0.9;
      this.note(st.lead.inst, t, midi, len, st.lead.gain * lv, pr(st.lead.layer === 'base' ? 1 : 2));
    }

    // Arpeggio over the current chord.
    if (st.arp) {
      const av = level(st.arp.layer);
      if (av > 0.05 && i % st.arp.every === 0) {
        const tones = [0, 2, 4, 7, 9];
        const deg = tones[st.arp.shape[this.arpIndex++ % st.arp.shape.length]];
        const midi = scaleMidi(this.key.root + 12 * st.arp.oct, this.key.mode, this.chord + deg);
        this.note(st.arp.inst, t, midi, st.arp.every * dur * 0.9, st.arp.gain * av, pr(st.arp.layer === 'base' ? 1 : 2));
      }
    }

    // Freak Out: extra percussion. Boss: 16th hats.
    if (m.freak > 0.05) for (const d of st.freak) this.drumHit(d, i, t, m.freak, pr(2));
    if (m.boss > 0.05) {
      const h = BOSS_HATS[i % BOSS_HATS.length];
      this.drum(st.bossHat, t, 0.022 * m.boss * (h === 'x' ? 1 : 0.5), pr(3));
    }

    // Boss layer: a high two-note alarm ostinato on every beat.
    if (m.boss > 0.05 && i % 4 === 0) {
      const a = this.key.root + 24;
      const b = a + this.key.mode[1];
      this.note('square', t, (i / 4) % 2 ? b : a, dur * 1.5, 0.022 * m.boss, pr(2));
    }

    // Singularity layer: sub drone per bar plus sparse glassy sparkles.
    if (m.sing > 0.05) {
      if (i === 0) this.note('sub', t, this.key.root - 12, st.steps * dur, 0.07 * m.sing, pr(2));
      if (this.barRng() < 0.12) {
        const deg = Math.floor(this.barRng() * 8);
        let root = this.key.root;
        while (root < 79) root += 12;
        this.note('bell', t, scaleMidi(root, this.key.penta, deg), 1.2, 0.02 * m.sing, pr(3), 2);
      }
    }
  }

  private drumHit(d: DrumTrack, i: number, t: number, level: number, prio: number): void {
    const c = d.pattern[i % d.pattern.length];
    let vel = 0;
    if (c === 'X') vel = 1;
    else if (c === 'x') vel = 0.7;
    else if (c === 'o') vel = 0.4;
    else if (c === '?') vel = this.barRng() < 0.5 ? 0.35 : 0;
    if (vel > 0) this.drum(d.drum, t, d.gain * vel * level, prio);
  }

  private drum(kind: Drum, t: number, gain: number, prio: number): void {
    if (gain < 0.002) return;
    if (!this.music.claim(t + DRUM_LEN[kind], prio)) return;
    const v = new Voice(this.kit, this.dest, this.style.verb * 0.5);
    const d = v.out;
    switch (kind) {
      case 'kick':
        addTone(v, d, t, { freq: 155, to: 45, glide: 0.11, gain, decay: 0.32 });
        addNoise(v, d, t, { type: 'lowpass', freq: 2500, gain: gain * 0.15, decay: 0.012 });
        break;
      case 'subKick':
        addTone(v, d, t, { freq: 85, to: 40, glide: 0.25, gain, attack: 0.006, decay: 0.6 });
        break;
      case 'tomLow':
        addTone(v, d, t, { freq: 115, to: 62, glide: 0.18, gain, decay: 0.35 });
        break;
      case 'tomHi':
        addTone(v, d, t, { freq: 200, to: 125, glide: 0.14, gain, decay: 0.25 });
        break;
      case 'log': // Slit drum: hollow triangle with a quick upper partial.
        addTone(v, d, t, { type: 'triangle', freq: 440, to: 340, glide: 0.03, gain, decay: 0.16 });
        addTone(v, d, t, { freq: 1190, gain: gain * 0.2, decay: 0.03 });
        break;
      case 'frame':
        addTone(v, d, t, { freq: 96, to: 68, glide: 0.15, gain, decay: 0.42 });
        addNoise(v, d, t, { type: 'bandpass', freq: 900, q: 1, gain: gain * 0.5, decay: 0.05 });
        break;
      case 'slap':
        addNoise(v, d, t, { type: 'bandpass', freq: 1700, q: 1.2, gain, decay: 0.07 });
        addTone(v, d, t, { type: 'triangle', freq: 270, to: 200, glide: 0.05, gain: gain * 0.5, decay: 0.08 });
        break;
      case 'snare':
        addNoise(v, d, t, { type: 'bandpass', freq: 1900, q: 0.7, gain, decay: 0.17, lowpass: 7000 });
        addTone(v, d, t, { type: 'triangle', freq: 210, to: 160, glide: 0.05, gain: gain * 0.5, decay: 0.1 });
        break;
      case 'clap': // Three fast bursts then a short tail.
        for (let k = 0; k < 3; k++) addNoise(v, d, t + k * 0.011, { type: 'bandpass', freq: 1300, q: 1.1, gain: gain * 0.8, decay: 0.01 });
        addNoise(v, d, t + 0.03, { type: 'bandpass', freq: 1300, q: 1.1, gain, decay: 0.16 });
        break;
      case 'clank': { // Two inharmonic squares through a resonant band: struck sheet metal.
        const bp = v.filter('bandpass', 2700, 3);
        bp.connect(d);
        addTone(v, bp, t, { type: 'square', freq: 587, gain: gain * 1.4, decay: 0.14 });
        addTone(v, bp, t, { type: 'square', freq: 829, gain: gain * 1.4, decay: 0.12 });
        addNoise(v, d, t, { type: 'highpass', freq: 4500, gain: gain * 0.4, decay: 0.03, lowpass: 9000 });
        break;
      }
      case 'anvil':
        addBell(v, d, t, 1250, gain, 0.35, 1.41, 3);
        break;
      case 'hat':
        addNoise(v, d, t, { type: 'highpass', freq: 7500, gain, decay: 0.04 });
        break;
      case 'openHat':
        addNoise(v, d, t, { type: 'highpass', freq: 7000, gain, decay: 0.22 });
        break;
      case 'shaker':
        addNoise(v, d, t, { type: 'bandpass', freq: 5500, q: 1.4, gain, attack: 0.012, decay: 0.05 });
        break;
      case 'tamb':
        addNoise(v, d, t, { type: 'highpass', freq: 6000, gain, decay: 0.09 });
        addNoise(v, d, t, { type: 'bandpass', freq: 9000, q: 4, gain: gain * 0.6, decay: 0.12 });
        break;
      case 'tick':
        addTone(v, d, t, { type: 'square', freq: 3100, gain: gain * 0.5, decay: 0.018 });
        addNoise(v, d, t, { type: 'highpass', freq: 6000, gain: gain * 0.5, decay: 0.015 });
        break;
      case 'glitch': { // Bitcrushed noise burst, sometimes stuttering.
        const dest = this.crush ? v.tap(this.crush) : d;
        const drive = this.crush ? Math.min(0.95, gain / CRUSH_TRIM) : gain;
        addNoise(v, dest, t, { type: 'bandpass', freq: 2500, q: 0.6, gain: drive, decay: 0.05 });
        if (this.barRng() < 0.3) addNoise(v, dest, t + this.stepDur / 2, { type: 'bandpass', freq: 3500, q: 0.6, gain: drive * 0.7, decay: 0.03 });
        break;
      }
    }
  }

  /** One pitched note. `len` is the gate length; tails ring past it. */
  private note(inst: Inst, t: number, midi: number, len: number, gain: number, prio: number, verbMul = 1): void {
    if (gain < 0.002) return;
    if (!this.music.claim(t + noteTail(inst, len), prio)) return;
    const st = this.style;
    const v = new Voice(this.kit, this.dest, Math.min(0.9, st.verb * verbMul));
    const d = v.out;
    const det = st.wobble ? (Math.random() - 0.5) * 2 * st.wobble : 0;
    const f = mtof(midi);
    switch (inst) {
      case 'marimba': // Sine + quickly-decaying 4th partial.
        addTone(v, d, t, { freq: f, gain, decay: 0.55, detune: det });
        addTone(v, d, t, { freq: f * 4, gain: gain * 0.22, decay: 0.07, detune: det });
        break;
      case 'lute': { // Plucked saw through a closing lowpass.
        const lp = v.filter('lowpass', 3200, 1.6);
        lp.frequency.setValueAtTime(3200, t);
        lp.frequency.exponentialRampToValueAtTime(520, t + 0.28);
        lp.connect(d);
        addTone(v, lp, t, { type: 'sawtooth', freq: f, gain, decay: Math.min(0.9, len + 0.35), detune: det });
        break;
      }
      case 'harpsi': { // Bright square pluck, thinned with a highpass.
        const hp = v.filter('highpass', 250, 0.7);
        const lp = v.filter('lowpass', 5200, 0.9);
        lp.frequency.setValueAtTime(5200, t);
        lp.frequency.exponentialRampToValueAtTime(1600, t + 0.3);
        hp.connect(lp);
        lp.connect(d);
        addTone(v, hp, t, { type: 'square', freq: f, gain, attack: 0.002, decay: 0.45, detune: det });
        break;
      }
      case 'drone': { // Bowed hurdy-gurdy drone: soft saw, slow swell.
        const lp = v.filter('lowpass', 650, 0.8);
        lp.connect(d);
        const g = v.gain(0);
        sustain(g.gain, t, gain, 0.4, t + len, 0.5);
        g.connect(lp);
        v.osc('sawtooth', f, t, t + len + 0.55, det - 5).connect(g);
        break;
      }
      case 'chug': { // Palm-muted square.
        const lp = v.filter('lowpass', 420, 2);
        lp.connect(d);
        addTone(v, lp, t, { type: 'square', freq: f, gain, attack: 0.002, decay: 0.11, detune: det });
        break;
      }
      case 'square': {
        const lp = v.filter('lowpass', 2400, 0.8);
        lp.connect(d);
        addTone(v, lp, t, { type: 'square', freq: f, gain, attack: 0.008, hold: len * 0.6, decay: 0.18, detune: det });
        break;
      }
      case 'synthBass': { // Saw with a plucky resonant filter envelope.
        const lp = v.filter('lowpass', 1500, 5);
        lp.frequency.setValueAtTime(1500, t);
        lp.frequency.exponentialRampToValueAtTime(320, t + 0.15);
        lp.connect(d);
        addTone(v, lp, t, { type: 'sawtooth', freq: f, gain, attack: 0.004, hold: len * 0.7, decay: 0.12, detune: det });
        break;
      }
      case 'saw': { // Two detuned saws (synthwave lead/arp).
        const lp = v.filter('lowpass', 2600, 1);
        lp.connect(d);
        for (const c of [-8, 8]) addTone(v, lp, t, { type: 'sawtooth', freq: f, gain: gain * 0.6, attack: 0.005, hold: len * 0.5, decay: 0.2, detune: det + c });
        break;
      }
      case 'gatedPad': { // Detuned saw chord tone, chopped by the 16th gate pattern.
        const lp = v.filter('lowpass', 1500, 0.8);
        lp.connect(d);
        const g = v.gain(0);
        const gate = st.pad?.gate ?? 'x';
        g.gain.setValueAtTime(0, t);
        for (let j = 0; j < st.steps; j++) {
          const on = gate[j % gate.length] === 'x';
          g.gain.setTargetAtTime(on ? gain : 0, t + j * this.stepDur, 0.008);
        }
        g.gain.setTargetAtTime(0, t + len, 0.03);
        g.connect(lp);
        for (const c of [-10, 10]) v.osc('sawtooth', f, t, t + len + 0.25, det + c).connect(g);
        break;
      }
      case 'pad': { // Warm triangle + quiet saw, slow attack and release.
        const lp = v.filter('lowpass', 1100, 0.7);
        lp.connect(d);
        const g = v.gain(0);
        sustain(g.gain, t, gain, 0.45, t + len, 0.7);
        g.connect(lp);
        v.osc('triangle', f, t, t + len + 0.75, det).connect(g);
        const s = v.gain(0.35);
        v.osc('sawtooth', f, t, t + len + 0.75, det + 6).connect(s);
        s.connect(g);
        break;
      }
      case 'organ': {
        const lp = v.filter('lowpass', 1800, 0.7);
        lp.connect(d);
        const g = v.gain(0);
        sustain(g.gain, t, gain, 0.04, t + len, 0.25);
        g.connect(lp);
        v.osc('triangle', f, t, t + len + 0.3, det).connect(g);
        const h = v.gain(0.35);
        v.osc('triangle', f * 2, t, t + len + 0.3, det).connect(h);
        h.connect(g);
        break;
      }
      case 'bell':
        addBell(v, d, t, f * Math.pow(2, det / 1200), gain, Math.max(0.8, len), 3.5, 1.6);
        break;
      case 'sub': {
        const g = v.gain(0);
        sustain(g.gain, t, gain, 0.08, t + len, 0.35);
        g.connect(d);
        v.osc('sine', f, t, t + len + 0.4).connect(g);
        break;
      }
      case 'glitch': { // Bitcrushed square; sometimes flips an octave mid-note.
        const dest = this.crush ? v.tap(this.crush) : d;
        const drive = this.crush ? Math.min(0.95, gain / CRUSH_TRIM) : gain;
        const end = t + Math.min(len, 0.3) + 0.08;
        const o = v.osc('square', f, t, end + 0.02, det);
        if (Math.random() < 0.3) o.frequency.setValueAtTime(f * (Math.random() < 0.5 ? 2 : 0.5), t + Math.min(len, 0.3) * 0.5);
        const g = v.gain(0);
        g.gain.setValueAtTime(SILENT, t);
        g.gain.linearRampToValueAtTime(drive, t + 0.003);
        g.gain.setValueAtTime(drive, t + Math.min(len, 0.3));
        g.gain.exponentialRampToValueAtTime(SILENT, end);
        o.connect(g);
        g.connect(dest);
        break;
      }
      case 'warpPad': { // Wide detuned saws with a slowly wandering filter.
        const lp = v.filter('lowpass', 1000, 1.5);
        lp.connect(d);
        const end = t + len + 0.65;
        const lfo = v.osc('sine', 0.4 + Math.random() * 0.5, t, end);
        const depth = v.gain(450);
        lfo.connect(depth);
        depth.connect(lp.frequency);
        const g = v.gain(0);
        sustain(g.gain, t, gain, 0.5, t + len, 0.6);
        g.connect(lp);
        for (const c of [-22, 22]) v.osc('sawtooth', f, t, end, det + c).connect(g);
        break;
      }
    }
  }
}
