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
  /** Direction toward the key (shadow-casting) light. */
  keyDir: [number, number, number];
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
  /** Linear fog distances (world units). */
  fogNear: number;
  fogFar: number;
  /** UI accent, mirrored to CSS. */
  accent: string;
}

export const THEMES: Theme[] = [
  // I — Primitive dusk: low apricot sun from the left, violet shadows, warm haze.
  {
    skyTop: 0x2c2350, skyHorizon: 0xff9a5c, skyBottom: 0x3b2433,
    sunDir: [-0.62, 0.1, -0.78], keyDir: [-0.74, 0.4, 0.42], sunColor: 0xffb466, sunSize: 0.11, sunStripes: 0,
    stars: 0.18, nebula: 0, nebA: 0x000000, nebB: 0x000000,
    clouds: 0.45, cloudColor: 0xffa98a, ridge: 0.45, ridgeColor: 0x6a3e52, skyline: 0, warp: 0,
    groundA4: [1, 0, 0, 0], groundB4: [0, 0, 0, 0], groundA: 0x5a6b2c, groundB: 0x7a5a32, gridColor: 0xffffff,
    fog: 0xe0946c,
    hemiSky: 0xffcfae, hemiGround: 0x5a3c4c, hemiInt: 0.5, keyColor: 0xffd3a2, keyInt: 2.6, rimColor: 0xff8a4a, rimInt: 1.3,
    platform: 0x7a6248, platformRim: 0xff9b4a, bloom: 0.55, fogNear: 18, fogFar: 230, accent: '#ff9b4a',
  },
  // II — A crisp spring morning: high warm sun, blue sky, cool shadows.
  {
    skyTop: 0x3a74c6, skyHorizon: 0xcfe3f2, skyBottom: 0x6f8fae,
    sunDir: [0.42, 0.55, -0.72], keyDir: [-0.5, 0.74, 0.46], sunColor: 0xfff4d8, sunSize: 0.07, sunStripes: 0,
    stars: 0, nebula: 0, nebA: 0x000000, nebB: 0x000000,
    clouds: 0.8, cloudColor: 0xffffff, ridge: 0.25, ridgeColor: 0x7a96b0, skyline: 0, warp: 0,
    groundA4: [0.15, 0.85, 0, 0], groundB4: [0, 0, 0, 0], groundA: 0x6c6a64, groundB: 0x4a4844, gridColor: 0xffffff,
    fog: 0xc9dcea,
    hemiSky: 0xd2e4ff, hemiGround: 0x5a6a3e, hemiInt: 0.6, keyColor: 0xfff2dc, keyInt: 2.5, rimColor: 0xbcd8ff, rimInt: 0.9,
    platform: 0x8a8680, platformRim: 0x7fb2ff, bloom: 0.38, fogNear: 30, fogFar: 230, accent: '#7fb2ff',
  },
  // III — Smoggy amber afternoon: a low orange sun through soot, sepia haze.
  {
    skyTop: 0x5a4636, skyHorizon: 0xe4a564, skyBottom: 0x4a382a,
    sunDir: [0.25, 0.2, -0.95], keyDir: [-0.55, 0.55, 0.6], sunColor: 0xffb060, sunSize: 0.1, sunStripes: 0,
    stars: 0, nebula: 0, nebA: 0x000000, nebB: 0x000000,
    clouds: 0.9, cloudColor: 0x9a7a5a, ridge: 0.12, ridgeColor: 0x5a4234, skyline: 0.35, warp: 0,
    groundA4: [0, 0, 1, 0], groundB4: [0, 0, 0, 0], groundA: 0x5a5048, groundB: 0x3a342e, gridColor: 0xffaa55,
    fog: 0xb88a62,
    hemiSky: 0xffd8a8, hemiGround: 0x3a2a20, hemiInt: 0.56, keyColor: 0xffc890, keyInt: 2.35, rimColor: 0xff9a50, rimInt: 1.25,
    platform: 0x6a5a40, platformRim: 0xffb347, bloom: 0.5, fogNear: 14, fogFar: 125, accent: '#ffb347',
  },
  // IV — Blue hour downtown: cool moonlight, warm sodium lamps, lit windows.
  {
    skyTop: 0x0a1230, skyHorizon: 0x3c4c86, skyBottom: 0x0a0c18,
    sunDir: [-0.3, 0.55, -0.78], keyDir: [-0.4, 0.75, 0.5], sunColor: 0xd8e4ff, sunSize: 0.035, sunStripes: 0,
    stars: 0.45, nebula: 0.08, nebA: 0x1a2a6a, nebB: 0x6a2a6a,
    clouds: 0.25, cloudColor: 0x3a3a5a, ridge: 0, ridgeColor: 0x000000, skyline: 0.6, warp: 0,
    groundA4: [0, 0, 0, 1], groundB4: [0, 0, 0, 0], groundA: 0x2a2c34, groundB: 0x1a1c22, gridColor: 0xffd23f,
    fog: 0x1e2648,
    hemiSky: 0x6a80c4, hemiGround: 0x1c1c2c, hemiInt: 0.36, keyColor: 0xb4c8ff, keyInt: 1.05, rimColor: 0x4ab0ff, rimInt: 1.6,
    platform: 0x3a3c44, platformRim: 0x4ab0ff, bloom: 0.85, fogNear: 22, fogFar: 150, accent: '#4ab0ff',
  },
  // V — Neon Overdrive: rain-slick night, magenta city-glow on low cloud, cyan and amber signage.
  {
    skyTop: 0x0a0a22, skyHorizon: 0x7a2a6a, skyBottom: 0x0a0814,
    sunDir: [0.35, 0.5, -0.8], keyDir: [-0.35, 0.7, 0.55], sunColor: 0xd8c8ff, sunSize: 0.02, sunStripes: 0,
    stars: 0.08, nebula: 0.12, nebA: 0x3a1a6a, nebB: 0xff2a8a,
    clouds: 0.55, cloudColor: 0x6a2a6a, ridge: 0, ridgeColor: 0x000000, skyline: 0, warp: 0,
    groundA4: [0, 0, 0, 1], groundB4: [0, 0, 0, 0], groundA: 0x16161e, groundB: 0x101016, gridColor: 0xff3ad0,
    fog: 0x2a1438,
    hemiSky: 0x8a6ad8, hemiGround: 0x1a1024, hemiInt: 0.42, keyColor: 0xc8b8ff, keyInt: 1.0, rimColor: 0x3af0ff, rimInt: 2.2,
    platform: 0x1e1e2a, platformRim: 0x3af0ff, bloom: 1.0, fogNear: 18, fogFar: 125, accent: '#ff3ad0',
  },
  // VI — An asteroid outpost: hard white sunlight, deep violet shadow, nebula and a ringed giant overhead.
  {
    skyTop: 0x04030c, skyHorizon: 0x24124a, skyBottom: 0x04030a,
    sunDir: [0.5, 0.55, 0.65], keyDir: [0.5, 0.55, 0.65], sunColor: 0xfff4e0, sunSize: 0.025, sunStripes: 0,
    stars: 1, nebula: 0.95, nebA: 0x5a2a9a, nebB: 0x1a7aa8,
    clouds: 0, cloudColor: 0x000000, ridge: 0, ridgeColor: 0x000000, skyline: 0, warp: 0,
    groundA4: [0, 0, 0, 1], groundB4: [0, 0, 0, 0], groundA: 0x3a3448, groundB: 0x2a2436, gridColor: 0x9a6aff,
    fog: 0x120c24,
    hemiSky: 0x8a80d8, hemiGround: 0x2a1a3a, hemiInt: 0.36, keyColor: 0xfff2e0, keyInt: 2.3, rimColor: 0x9a6aff, rimInt: 2.2,
    platform: 0x4a4250, platformRim: 0x9a6aff, bloom: 0.85, fogNear: 70, fogFar: 380, accent: '#9a6aff',
  },
  // VII — Reality breaks
  {
    skyTop: 0x04121c, skyHorizon: 0x5a1aa8, skyBottom: 0x1a0030,
    sunDir: [0, 0.5, -0.85], keyDir: [-0.45, 0.62, 0.62], sunColor: 0xffffff, sunSize: 0.05, sunStripes: 0,
    stars: 0.8, nebula: 0.4, nebA: 0x00c890, nebB: 0xc8008a,
    clouds: 0, cloudColor: 0x000000, ridge: 0, ridgeColor: 0x000000, skyline: 0, warp: 1,
    groundA4: [0, 0, 0, 0], groundB4: [0, 0.35, 1, 0], groundA: 0x0a0a14, groundB: 0x14142a, gridColor: 0x6affd8,
    fog: 0x1a1a3a,
    hemiSky: 0xd0fff0, hemiGround: 0x3a0a4a, hemiInt: 0.64, keyColor: 0xffffff, keyInt: 1.76, rimColor: 0xff3ae0, rimInt: 2.6,
    platform: 0x2a2a3a, platformRim: 0x6affd8, bloom: 1.2, fogNear: 60, fogFar: 260, accent: '#6affd8',
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
  private static numKeys = ['sunSize', 'sunStripes', 'stars', 'nebula', 'clouds', 'ridge', 'skyline', 'warp', 'hemiInt', 'keyInt', 'rimInt', 'bloom', 'fogNear', 'fogFar'] as const;

  constructor(t: Theme) {
    for (const k of ThemeState.colorKeys) this.c[k] = new THREE.Color();
    for (const k of ThemeState.numKeys) this.n[k] = 0;
    this.v.sunDir = new THREE.Vector3();
    this.v.keyDir = new THREE.Vector3();
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
    this.v.keyDir.set(...a.keyDir).lerp(new THREE.Vector3(...b.keyDir), t).normalize();
    this.v4.groundA4.set(...a.groundA4).lerp(new THREE.Vector4(...b.groundA4), t);
    this.v4.groundB4.set(...a.groundB4).lerp(new THREE.Vector4(...b.groundB4), t);
    this.accent = t < 0.5 ? a.accent : b.accent;
  }
}
