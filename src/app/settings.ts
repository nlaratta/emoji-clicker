import type { Notation } from '../core/format';

export type Quality = 'auto' | 'low' | 'medium' | 'high';

export interface Settings {
  master: number;
  sfx: number;
  music: number;
  muted: boolean;
  quality: Quality;
  reducedMotion: boolean;
  flashes: boolean;
  shake: number;
  notation: Notation;
  floaters: boolean;
}

const KEY = 'freakmoji.settings';

export function defaultSettings(): Settings {
  const prefersReduced =
    typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  return {
    master: 0.8,
    sfx: 0.8,
    music: 0.5,
    muted: false,
    quality: 'auto',
    reducedMotion: prefersReduced,
    flashes: !prefersReduced,
    shake: prefersReduced ? 0 : 1,
    notation: 'suffix',
    floaters: true,
  };
}

const unit = (v: unknown, d: number): number =>
  typeof v === 'number' && Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : d;

export function loadSettings(): Settings {
  const d = defaultSettings();
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? 'null');
    if (!raw || typeof raw !== 'object') return d;
    return {
      master: unit(raw.master, d.master),
      sfx: unit(raw.sfx, d.sfx),
      music: unit(raw.music, d.music),
      muted: typeof raw.muted === 'boolean' ? raw.muted : d.muted,
      quality: ['auto', 'low', 'medium', 'high'].includes(raw.quality) ? raw.quality : d.quality,
      reducedMotion: typeof raw.reducedMotion === 'boolean' ? raw.reducedMotion : d.reducedMotion,
      flashes: typeof raw.flashes === 'boolean' ? raw.flashes : d.flashes,
      shake: unit(raw.shake, d.shake),
      notation: raw.notation === 'scientific' ? 'scientific' : 'suffix',
      floaters: typeof raw.floaters === 'boolean' ? raw.floaters : d.floaters,
    };
  } catch {
    return d;
  }
}

export function saveSettings(s: Settings): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* storage unavailable: settings stay session-only */
  }
}
