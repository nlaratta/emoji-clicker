import { SILENT, Voice, type Kit, type Out } from './synth';

/**
 * The Freakmoji's voice: a short cartoon gasp ("HAH!").
 *
 * Source-filter synthesis: a breathy noise burst (the "H") and a sawtooth
 * glottal source (the "AH") both feed three parallel bandpass filters
 * tuned to vowel formants. The formants are shifted up ~25% for a small,
 * squeaky character; the pitch leaps up on the exclamation, wobbles, and
 * cuts off with a glottal stop. Every gasp randomises pitch, vowel,
 * formant shift and length so repeats never sound copy-pasted.
 */

/** Formant centre frequencies (Hz) for an adult voice. */
const VOWELS: readonly (readonly [number, number, number])[] = [
  [800, 1200, 2500], // "HAH"
  [800, 1200, 2500], // "HAH" (weighted)
  [700, 1650, 2500], // "HAA" (as in "cat")
  [560, 1750, 2550], // "HEH"
  [570, 950, 2400], // "HOH"
];
const FORMANT_Q = [7, 9, 11];
const FORMANT_LEVEL = [1, 0.62, 0.3];

export interface GaspOpts {
  /** Bigger, longer, lower gasp for major moments. */
  big?: boolean;
  /** Overall level multiplier (default 1). */
  level?: number;
}

export function gasp(kit: Kit, out: Out, t: number, o: GaspOpts = {}): Voice {
  const big = o.big ?? false;
  const level = o.level ?? 1;
  const v = new Voice(kit, out, big ? 0.3 : 0.18);
  const shift = 1.12 + Math.random() * 0.26;
  const f0 = (big ? 270 : 330) * (0.88 + Math.random() * 0.3);
  const vowel = VOWELS[Math.floor(Math.random() * VOWELS.length)];
  const len = (big ? 0.34 : 0.2) * (0.85 + Math.random() * 0.3);

  const voiceAt = t + 0.035; // the "H" leads the vowel
  const peakAt = voiceAt + 0.05;
  const cut = voiceAt + len;
  const end = cut + 0.05;

  // Glottal source: leaps up on the exclamation, sags at the end.
  const glottis = v.osc('sawtooth', f0 * 0.82, voiceAt, end);
  glottis.frequency.exponentialRampToValueAtTime(f0 * 1.3, peakAt);
  glottis.frequency.exponentialRampToValueAtTime(f0 * (Math.random() < 0.3 ? 1.45 : 0.92), cut);
  // Comic wobble.
  const wob = v.osc('sine', 9 + Math.random() * 4, voiceAt, end);
  const wobDepth = v.gain(f0 * 0.035);
  wob.connect(wobDepth);
  wobDepth.connect(glottis.frequency);

  const voiced = v.gain(0);
  voiced.gain.setValueAtTime(SILENT, voiceAt);
  voiced.gain.linearRampToValueAtTime(1, voiceAt + 0.022);
  voiced.gain.setValueAtTime(1, cut - 0.04);
  voiced.gain.linearRampToValueAtTime(0.0, cut); // glottal stop: abrupt but de-clicked
  glottis.connect(voiced);

  // Aspiration: sharp breath in, then a breathy layer under the vowel.
  const breath = v.noise(t, end);
  const breathGain = v.gain(0);
  breathGain.gain.setValueAtTime(SILENT, t);
  breathGain.gain.linearRampToValueAtTime(3.2, t + 0.012);
  breathGain.gain.exponentialRampToValueAtTime(0.7, voiceAt + 0.03);
  breathGain.gain.exponentialRampToValueAtTime(SILENT, cut + 0.04);
  breath.connect(breathGain);

  // Formant bank. F1 opens slightly as the "mouth" opens.
  const mix = v.gain(big ? 0.34 : 0.28);
  for (let i = 0; i < 3; i++) {
    const fc = vowel[i] * shift;
    const bp = v.filter('bandpass', fc, FORMANT_Q[i]);
    if (i === 0) {
      bp.frequency.setValueAtTime(fc * 0.75, t);
      bp.frequency.exponentialRampToValueAtTime(fc, peakAt);
    }
    const lvl = v.gain(FORMANT_LEVEL[i]);
    voiced.connect(bp);
    breathGain.connect(bp);
    bp.connect(lvl);
    lvl.connect(mix);
  }

  const master = v.gain(level);
  mix.connect(master);
  master.connect(v.out);
  return v;
}
