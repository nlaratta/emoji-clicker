export const clamp = (v: number, lo: number, hi: number): number => (v < lo ? lo : v > hi ? hi : v);
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
export const smoothstep = (e0: number, e1: number, x: number): number => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};

/** Largest value the economy is allowed to hold. Doubles reach ~1.8e308;
 *  content is designed to top out far below this, so this is purely a guard. */
export const ECON_MAX = 1e300;

/** Coerce any economy value to a finite, non-negative number. */
export function safe(v: number): number {
  if (!Number.isFinite(v)) return v > 0 ? ECON_MAX : 0;
  return v < 0 ? 0 : v > ECON_MAX ? ECON_MAX : v;
}

/** Round to `sig` significant figures, for pleasant-looking prices. */
export function niceRound(v: number, sig = 2): number {
  if (v <= 0 || !Number.isFinite(v)) return v;
  const mag = Math.pow(10, Math.floor(Math.log10(v)) - sig + 1);
  return Math.round(v / mag) * mag;
}
