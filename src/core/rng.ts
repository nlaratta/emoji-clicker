/**
 * Deterministic PRNG (mulberry32). The 32-bit state lives inside the save
 * file so reloading can never re-roll a crit, a golden spawn or a reward.
 */
export interface RngHolder {
  rng: number;
}

export function nextRandom(holder: RngHolder): number {
  let t = (holder.rng = (holder.rng + 0x6d2b79f5) >>> 0);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export function randomRange(holder: RngHolder, min: number, max: number): number {
  return min + (max - min) * nextRandom(holder);
}

export function newSeed(): number {
  return (Math.random() * 0xffffffff) >>> 0;
}
