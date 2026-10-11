/**
 * Shared musical vocabulary for the audio system. Music and SFX both read
 * their pitches from `keyFor`, so a rapid run of pokes always lands in the
 * same key (and mode) as whatever the generative score is playing.
 */

export interface Key {
  /** MIDI note of the tonic, in octave 3 (47–59). */
  root: number;
  /** Seven semitone offsets: the mode used for harmony and melody. */
  mode: readonly number[];
  /** Five semitone offsets, a subset of `mode`: used for poke melodies. */
  penta: readonly number[];
}

const AEOLIAN = [0, 2, 3, 5, 7, 8, 10];
const DORIAN = [0, 2, 3, 5, 7, 9, 10];
const PHRYGIAN = [0, 1, 3, 5, 7, 8, 10];
const MIXOLYDIAN = [0, 2, 4, 5, 7, 9, 10];
const LYDIAN = [0, 2, 4, 6, 7, 9, 11];
const HARMONIC_MINOR = [0, 2, 3, 5, 7, 8, 11];
const MINOR_PENTA = [0, 3, 5, 7, 10];
const MAJOR_PENTA = [0, 2, 4, 7, 9];
/** Japanese "hirajoshi": consonant but strange; fits harmonic minor. */
const HIRAJOSHI = [0, 2, 3, 7, 8];

/** One key per era (index = era). */
const ERA_KEYS: readonly Key[] = [
  { root: 57, mode: AEOLIAN, penta: MINOR_PENTA }, // Primitive: A minor
  { root: 50, mode: DORIAN, penta: MINOR_PENTA }, // Medieval: D dorian
  { root: 52, mode: PHRYGIAN, penta: MINOR_PENTA }, // Industrial: E phrygian
  { root: 48, mode: MIXOLYDIAN, penta: MAJOR_PENTA }, // Modern: C mixolydian
  { root: 53, mode: AEOLIAN, penta: MINOR_PENTA }, // Neon Future: F minor
  { root: 55, mode: LYDIAN, penta: MAJOR_PENTA }, // Cosmic: G lydian
  { root: 47, mode: HARMONIC_MINOR, penta: HIRAJOSHI }, // Reality: B harmonic minor
];

const BOSS_KEY_CACHE = new Map<number, Key>();

/**
 * The key for an era. Boss fights darken it: every era except the already
 * tense Reality era switches to phrygian on the same tonic, with minor
 * pentatonic pokes so the SFX stay in tune with the tense score.
 */
export function keyFor(era: number, boss: boolean): Key {
  const i = Math.max(0, Math.min(ERA_KEYS.length - 1, Math.floor(era) || 0));
  const k = ERA_KEYS[i];
  if (!boss || i === 6) return k;
  let b = BOSS_KEY_CACHE.get(i);
  if (!b) {
    b = { root: k.root, mode: PHRYGIAN, penta: MINOR_PENTA };
    BOSS_KEY_CACHE.set(i, b);
  }
  return b;
}

export const mtof = (m: number): number => 440 * Math.pow(2, (m - 69) / 12);

/** MIDI note of scale degree `deg` (any integer, negative allowed) above `root`. */
export function scaleMidi(root: number, scale: readonly number[], deg: number): number {
  const n = scale.length;
  const oct = Math.floor(deg / n);
  return root + oct * 12 + scale[deg - oct * n];
}

/** Triad (root, third, fifth) built on mode degree `degree`, from octave base `root`. */
export function triad(key: Key, degree: number, root = key.root): number[] {
  return [0, 2, 4].map((o) => scaleMidi(root, key.mode, degree + o));
}

/** Snap a MIDI note to the nearest pentatonic pitch of the key (ties go down). */
export function snapPenta(key: Key, midi: number): number {
  let best = midi;
  let bestDist = 99;
  for (let d = 0; d <= 6; d++) {
    for (const m of [midi - d, midi + d]) {
      const pc = (((m - key.root) % 12) + 12) % 12;
      if (key.penta.includes(pc) && d < bestDist) {
        best = m;
        bestDist = d;
      }
    }
    if (bestDist < 99) break;
  }
  return best;
}

/**
 * Root of a major triad that belongs to the key: the tonic if the mode is
 * major, otherwise the relative major (bIII), then VI or V. Used for
 * triumphant stabs so "victory" never clashes with the score.
 */
export function majorRoot(key: Key): number {
  const m = key.mode;
  for (const d of [0, 2, 5, 4, 3]) {
    const third = (m[(d + 2) % 7] - m[d] + 12) % 12;
    const fifth = (m[(d + 4) % 7] - m[d] + 12) % 12;
    if (third === 4 && fifth === 7) return key.root + m[d];
  }
  return key.root;
}

/** Shape of each 8-poke group: a rising zigzag that reads as a melody. */
const POKE_MOTIF = [0, 2, 1, 3, 2, 4, 3, 5];

/**
 * Poke pitch for a combo streak. Every 8 hits the motif climbs one
 * pentatonic step; past two octaves the register wraps down an octave and
 * keeps climbing, so the melody rises forever without leaving a pleasant
 * band (roughly 200 Hz – 1.4 kHz).
 */
export function pokeMidi(key: Key, streak: number): number {
  const s = Math.max(0, Math.floor(streak) - 1);
  const reg = Math.floor(s / 8);
  const r = reg <= 5 ? reg : ((reg - 1) % 5) + 1;
  let base = key.root;
  while (base < 55) base += 12;
  while (base > 66) base -= 12;
  return scaleMidi(base, key.penta, r + POKE_MOTIF[s % 8]);
}

/** Small seeded PRNG (mulberry32) for repeatable musical variation. */
export function makeRng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
