import * as THREE from 'three';

/**
 * Per-era art direction. Every number here is interpolated during era
 * transitions, so the world morphs rather than cuts.
 */
export interface Theme {
  skyTop: number;
  skyHorizon: number;
  skyBottom: number;
  sunDir: [number, number, number];
  sunColor: number;
  sunSize: number;
  sunStripes: number;
  stars: number;
  nebula: number;
  nebA: number;
  nebB: number;
  clouds: number;
  cloudColor: number;
  ridge: number;
  ridgeColor: number;
  skyline: number;
  warp: number;
  /** grass, cobble, metal, asphalt */
  groundA4: [number, number, number, number];
  /** neon grid, void, glowing cracks, (unused) */
  groundB4: [number, number, number, number];
  groundA: number;
  groundB: number;
  gridColor: number;
  fog: number;
  hemiSky: number;
  hemiGround: number;
  hemiInt: number;
  keyColor: number;
  keyInt: number;
  rimColor: number;
  rimInt: number;
  platform: number;
  platformRim: number;
  bloom: number;
  /** UI accent, mirrored to CSS. */
  accent: string;
}

export const THEMES: Theme[] = [
  // I — Primitive dusk
  {
    skyTop: 0x2a1b4a, skyHorizon: 0xff8a4c, skyBottom: 0x3b2433,
    sunDir: [-0.55, 0.12, -0.83], sunColor: 0xffb060, sunSize: 0.1, sunStripes: 0,
    stars: 0.25, nebula: 0, nebA: 0x000000, nebB: 0x000000,
    clouds: 0.35, cloudColor: 0xff9e7a, ridge: 1, ridgeColor: 0x2b1830, skyline: 0, warp: 0,
    groundA4: [1, 0, 0, 0], groundB4: [0, 0, 0, 0], groundA: 0x5a6b2c, groundB: 0x7a5a32, gridColor: 0xffffff,
    fog: 0x8a4a4a,
    hemiSky: 0xffd2a8, hemiGround: 0x4a2c3a, hemiInt: 0.64, keyColor: 0xffe0b8, keyInt: 1.68, rimColor: 0xff7a3c, rimInt: 1.6,
    platform: 0x7a6248, platformRim: 0xff9b4a, bloom: 0.7, accent: '#ff9b4a',
  },
  // II — Medieval overcast
  {
    skyTop: 0x3c5a8a, skyHorizon: 0xc8d2dc, skyBottom: 0x4a5560,
    sunDir: [0.4, 0.45, -0.8], sunColor: 0xfff2d0, sunSize: 0.07, sunStripes: 0,
    stars: 0, nebula: 0, nebA: 0x000000, nebB: 0x000000,
    clouds: 0.8, cloudColor: 0xf2f2ee, ridge: 0.6, ridgeColor: 0x4c5a6a, skyline: 0, warp: 0,
    groundA4: [0.15, 0.85, 0, 0], groundB4: [0, 0, 0, 0], groundA: 0x6c6a64, groundB: 0x4a4844, gridColor: 0xffffff,
    fog: 0x9aa8b6,
    hemiSky: 0xdfe8f2, hemiGround: 0x4a4a52, hemiInt: 0.72, keyColor: 0xfff6e6, keyInt: 1.6, rimColor: 0x9cc4ff, rimInt: 1.4,
    platform: 0x8a8680, platformRim: 0x7fb2ff, bloom: 0.6, accent: '#7fb2ff',
  },
  // III — Industrial smog
  {
    skyTop: 0x4a3a2a, skyHorizon: 0xd09050, skyBottom: 0x3a2a20,
    sunDir: [0.2, 0.25, -0.95], sunColor: 0xff9a40, sunSize: 0.09, sunStripes: 0,
    stars: 0, nebula: 0, nebA: 0x000000, nebB: 0x000000,
    clouds: 0.9, cloudColor: 0x8a6a50, ridge: 0.2, ridgeColor: 0x3a2a22, skyline: 0.35, warp: 0,
    groundA4: [0, 0, 1, 0], groundB4: [0, 0, 0, 0], groundA: 0x5a5048, groundB: 0x3a342e, gridColor: 0xffaa55,
    fog: 0x6a5040,
    hemiSky: 0xffd8a0, hemiGround: 0x3a2a20, hemiInt: 0.68, keyColor: 0xffd090, keyInt: 1.6, rimColor: 0xffaa40, rimInt: 1.7,
    platform: 0x6a5a40, platformRim: 0xffb347, bloom: 0.75, accent: '#ffb347',
  },
  // IV — Modern night city
  {
    skyTop: 0x060c22, skyHorizon: 0x2a3a6a, skyBottom: 0x080a14,
    sunDir: [-0.3, 0.6, -0.75], sunColor: 0xd8e4ff, sunSize: 0.035, sunStripes: 0,
    stars: 0.5, nebula: 0.1, nebA: 0x1a2a6a, nebB: 0x6a2a6a,
    clouds: 0.25, cloudColor: 0x3a3a5a, ridge: 0, ridgeColor: 0x000000, skyline: 1, warp: 0,
    groundA4: [0, 0, 0, 1], groundB4: [0, 0, 0, 0], groundA: 0x2a2c34, groundB: 0x1a1c22, gridColor: 0xffd23f,
    fog: 0x141a34,
    hemiSky: 0x9ab4ff, hemiGround: 0x1a1a2a, hemiInt: 0.55, keyColor: 0xdfe8ff, keyInt: 1.76, rimColor: 0x4ab0ff, rimInt: 2.2,
    platform: 0x3a3c44, platformRim: 0x4ab0ff, bloom: 0.9, accent: '#4ab0ff',
  },
  // V — Neon future (synthwave)
  {
    skyTop: 0x12002a, skyHorizon: 0xff2a8a, skyBottom: 0x0a0018,
    sunDir: [0, 0.16, -1], sunColor: 0xffc23a, sunSize: 0.22, sunStripes: 1,
    stars: 0.7, nebula: 0.2, nebA: 0x4a00aa, nebB: 0xff0088,
    clouds: 0, cloudColor: 0x000000, ridge: 0.5, ridgeColor: 0x1a0030, skyline: 0, warp: 0,
    groundA4: [0, 0, 0, 0], groundB4: [1, 0, 0, 0], groundA: 0x0a0018, groundB: 0x12002a, gridColor: 0xff3ad0,
    fog: 0x3a0050,
    hemiSky: 0xff8ae0, hemiGround: 0x2a0050, hemiInt: 0.59, keyColor: 0xffe0f4, keyInt: 1.6, rimColor: 0x3af0ff, rimInt: 2.6,
    platform: 0x1a1030, platformRim: 0x3af0ff, bloom: 1.15, accent: '#ff3ad0',
  },
  // VI — Cosmic void
  {
    skyTop: 0x02020a, skyHorizon: 0x0a0a24, skyBottom: 0x02020a,
    sunDir: [0.7, 0.3, -0.65], sunColor: 0xfff0d0, sunSize: 0.03, sunStripes: 0,
    stars: 1, nebula: 1, nebA: 0x2a0a6a, nebB: 0x0a6a8a,
    clouds: 0, cloudColor: 0x000000, ridge: 0, ridgeColor: 0x000000, skyline: 0, warp: 0,
    groundA4: [0, 0, 0, 0], groundB4: [0, 1, 0, 0], groundA: 0x000000, groundB: 0x000000, gridColor: 0x7a8aff,
    fog: 0x05051a,
    hemiSky: 0xa0b4ff, hemiGround: 0x1a0a2a, hemiInt: 0.51, keyColor: 0xfff2e0, keyInt: 1.92, rimColor: 0x9a6aff, rimInt: 2.6,
    platform: 0x4a4250, platformRim: 0x9a6aff, bloom: 1.1, accent: '#9a6aff',
  },
  // VII — Reality breaks
  {
    skyTop: 0x04121c, skyHorizon: 0x5a1aa8, skyBottom: 0x1a0030,
    sunDir: [0, 0.5, -0.85], sunColor: 0xffffff, sunSize: 0.05, sunStripes: 0,
    stars: 0.8, nebula: 0.4, nebA: 0x00c890, nebB: 0xc8008a,
    clouds: 0, cloudColor: 0x000000, ridge: 0, ridgeColor: 0x000000, skyline: 0, warp: 1,
    groundA4: [0, 0, 0, 0], groundB4: [0, 0.35, 1, 0], groundA: 0x0a0a14, groundB: 0x14142a, gridColor: 0x6affd8,
    fog: 0x1a1a3a,
    hemiSky: 0xd0fff0, hemiGround: 0x3a0a4a, hemiInt: 0.64, keyColor: 0xffffff, keyInt: 1.76, rimColor: 0xff3ae0, rimInt: 2.6,
    platform: 0x2a2a3a, platformRim: 0x6affd8, bloom: 1.2, accent: '#6affd8',
  },
];

/** Interpolated theme values in renderer-friendly form. */
export class ThemeState {
  readonly c: Record<string, THREE.Color> = {};
  readonly n: Record<string, number> = {};
  readonly v: Record<string, THREE.Vector3> = {};
  readonly v4: Record<string, THREE.Vector4> = {};
  accent = '#ff9b4a';

  private static colorKeys = [
    'skyTop', 'skyHorizon', 'skyBottom', 'sunColor', 'nebA', 'nebB', 'cloudColor', 'ridgeColor', 'groundA', 'groundB',
    'gridColor', 'fog', 'hemiSky', 'hemiGround', 'keyColor', 'rimColor', 'platform', 'platformRim',
  ] as const;
  private static numKeys = ['sunSize', 'sunStripes', 'stars', 'nebula', 'clouds', 'ridge', 'skyline', 'warp', 'hemiInt', 'keyInt', 'rimInt', 'bloom'] as const;

  constructor(t: Theme) {
    for (const k of ThemeState.colorKeys) this.c[k] = new THREE.Color();
    for (const k of ThemeState.numKeys) this.n[k] = 0;
    this.v.sunDir = new THREE.Vector3();
    this.v4.groundA4 = new THREE.Vector4();
    this.v4.groundB4 = new THREE.Vector4();
    this.set(t, t, 0);
  }

  set(a: Theme, b: Theme, t: number): void {
    const tmp = new THREE.Color();
    for (const k of ThemeState.colorKeys) {
      this.c[k].set(a[k]).lerp(tmp.set(b[k]), t);
    }
    for (const k of ThemeState.numKeys) this.n[k] = a[k] + (b[k] - a[k]) * t;
    this.v.sunDir.set(...a.sunDir).lerp(new THREE.Vector3(...b.sunDir), t).normalize();
    this.v4.groundA4.set(...a.groundA4).lerp(new THREE.Vector4(...b.groundA4), t);
    this.v4.groundB4.set(...a.groundB4).lerp(new THREE.Vector4(...b.groundB4), t);
    this.accent = t < 0.5 ? a.accent : b.accent;
  }
}
