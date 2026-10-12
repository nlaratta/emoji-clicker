import * as THREE from 'three';
import { THEMES, ThemeState } from './themes';
import { buildEraProps, type EraProps, type PropContext } from './eraProps';
import { EraKit, type KitQuality } from './eraKit';
import { forgetModel, hasModel, loadModel } from './assets';
import { attachEraScript, type EraScript } from './eras/index';

const NOISE = /* glsl */ `
float hash13(vec3 p) { p = fract(p * 0.1031); p += dot(p, p.zyx + 31.32); return fract((p.x + p.y) * p.z); }
float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float vnoise3(vec3 p) {
  vec3 i = floor(p); vec3 f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash13(i), hash13(i + vec3(1,0,0)), f.x), mix(hash13(i + vec3(0,1,0)), hash13(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hash13(i + vec3(0,0,1)), hash13(i + vec3(1,0,1)), f.x), mix(hash13(i + vec3(0,1,1)), hash13(i + vec3(1,1,1)), f.x), f.y), f.z);
}
float vnoise2(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1,0)), f.x), mix(hash12(i + vec2(0,1)), hash12(i + vec2(1,1)), f.x), f.y);
}
float fbm3(vec3 p) { float a = 0.5, s = 0.0; for (int i = 0; i < 5; i++) { s += a * vnoise3(p); p *= 2.03; a *= 0.5; } return s; }
float fbm2(vec2 p) { float a = 0.5, s = 0.0; for (int i = 0; i < 4; i++) { s += a * vnoise2(p); p *= 2.07; a *= 0.5; } return s; }
vec2 voronoi(vec2 x) {
  vec2 n = floor(x), f = fract(x); float md = 8.0, md2 = 8.0;
  for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
    vec2 g = vec2(float(i), float(j));
    vec2 o = vec2(hash12(n + g), hash12(n + g + 17.0));
    float d = length(g + o - f);
    if (d < md) { md2 = md; md = d; } else if (d < md2) md2 = d;
  }
  return vec2(md, md2 - md);
}
`;

const SKY_FRAG = /* glsl */ `
uniform vec3 uTop, uHorizon, uBottom, uSunDir, uSunColor, uNebA, uNebB, uCloudColor, uRidgeColor;
uniform float uSunSize, uSunStripes, uStars, uNebula, uClouds, uRidge, uSkyline, uWarp, uTime;
varying vec3 vDir;
${NOISE}
void main() {
  vec3 d = normalize(vDir);
  if (uWarp > 0.0) {
    float a = atan(d.x, d.z);
    float seg = 6.2831 / 8.0;
    float k = abs(mod(a + uTime * 0.05, seg) - seg * 0.5);
    vec3 kd = normalize(vec3(sin(k) * length(d.xz), d.y, cos(k) * length(d.xz)));
    d = normalize(mix(d, kd, uWarp * 0.7));
    d.y += sin(a * 3.0 + uTime * 0.4) * 0.05 * uWarp;
    d = normalize(d);
  }
  float e = d.y;
  float az = atan(d.x, d.z);
  vec3 col = e > 0.0 ? mix(uHorizon, uTop, pow(clamp(e, 0.0, 1.0), 0.55)) : mix(uHorizon, uBottom, pow(clamp(-e, 0.0, 1.0), 0.4));

  // Nebula
  if (uNebula > 0.0) {
    float n = fbm3(d * 2.6 + vec3(uTime * 0.004, 0.0, 0.0));
    float n2 = fbm3(d * 5.0 - 3.0);
    vec3 neb = mix(uNebA, uNebB, smoothstep(0.35, 0.75, n2));
    col += neb * pow(smoothstep(0.38, 0.85, n), 1.6) * uNebula * 1.6;
  }

  // Stars
  if (uStars > 0.0) {
    vec3 sp = d * 180.0;
    vec3 cell = floor(sp);
    float h = hash13(cell);
    float tw = 0.65 + 0.35 * sin(uTime * (1.0 + h * 3.0) + h * 40.0);
    float star = step(0.9965, h) * smoothstep(0.42, 0.0, length(fract(sp) - 0.5));
    col += vec3(star * tw * 2.4 * uStars) * smoothstep(-0.1, 0.15, e + uNebula);
  }

  // Sun (optionally synthwave-striped)
  vec3 sd3 = normalize(uSunDir);
  float sd = dot(d, sd3);
  float disc = smoothstep(cos(uSunSize), cos(uSunSize * 0.92), sd);
  if (uSunStripes > 0.0) {
    float local = (d.y - sd3.y) / uSunSize;
    float band = step(0.5, fract(local * 7.0 - uTime * 0.3)) + step(0.15, local);
    disc *= mix(1.0, clamp(band, 0.0, 1.0), uSunStripes);
    col += mix(uSunColor, vec3(1.0, 0.2, 0.6), clamp(-local * 0.8 + 0.5, 0.0, 1.0)) * disc * 1.6 * uSunStripes;
    disc *= 1.0 - uSunStripes;
  }
  col += uSunColor * (disc * 2.2 + pow(max(sd, 0.0), 10.0) * 0.45 + pow(max(sd, 0.0), 80.0) * 0.6);

  // Clouds: drifting fbm bands above the horizon
  if (uClouds > 0.0 && e > -0.05) {
    vec2 cp = d.xz / (d.y + 0.25) * 1.6 + vec2(uTime * 0.02, 0.0);
    float c = fbm2(cp);
    float m = smoothstep(0.45, 0.8, c) * smoothstep(-0.05, 0.12, e) * (1.0 - smoothstep(0.5, 0.95, e));
    col = mix(col, uCloudColor * (0.75 + 0.35 * fbm2(cp * 2.0)), m * uClouds);
  }

  // Mountain ridge silhouette
  if (uRidge > 0.0) {
    float h = 0.04 + 0.05 * (0.5 + 0.5 * sin(az * 3.0 + 1.3)) + 0.03 * sin(az * 7.0 + 0.4) + 0.025 * vnoise2(vec2(az * 9.0, 0.0));
    h *= uRidge;
    float far = 0.03 + 0.03 * vnoise2(vec2(az * 5.0 + 9.0, 1.0));
    col = mix(col, mix(uRidgeColor, uHorizon, 0.45), step(e, far * uRidge) * 0.8);
    col = mix(col, uRidgeColor, step(e, h));
  }

  // City skyline with lit windows
  if (uSkyline > 0.0 && e < 0.2) {
    float cols = 70.0;
    float bi = floor((az + 3.1416) / 6.2832 * cols);
    float bh = (0.02 + 0.1 * pow(hash12(vec2(bi, 3.0)), 2.0)) * uSkyline;
    if (e < bh && e > -0.02) {
      vec3 b = mix(vec3(0.02, 0.025, 0.05), uRidgeColor, 0.3);
      vec2 w = vec2(fract((az + 3.1416) / 6.2832 * cols * 6.0), fract(e * 160.0));
      float lit = step(0.55, hash12(floor(vec2((az + 3.1416) / 6.2832 * cols * 6.0, e * 160.0))));
      float win = step(0.3, w.x) * step(w.x, 0.75) * step(0.35, w.y) * step(w.y, 0.8) * lit;
      col = b + vec3(1.0, 0.8, 0.45) * win * 1.4;
    }
  }

  gl_FragColor = vec4(col, 1.0);
}
`;

const GROUND_FRAG = /* glsl */ `
uniform vec3 uA, uB, uGrid, uFog, uKey;
uniform vec4 uPatA, uPatB;
uniform float uTime;
varying vec3 vWorld;
${NOISE}
void main() {
  vec2 p = vWorld.xz;
  float dist = length(p);
  vec3 col = vec3(0.0);
  float glow = 0.0;

  // Grass / dirt
  if (uPatA.x > 0.0) {
    float n = fbm2(p * 0.35);
    float blades = vnoise2(p * 9.0);
    vec3 g = mix(uA, uB, smoothstep(0.35, 0.75, n)) * (0.8 + 0.3 * blades);
    col += g * uPatA.x;
  }
  // Cobblestone
  if (uPatA.y > 0.0) {
    vec2 v = voronoi(p * 1.6);
    float stone = smoothstep(0.02, 0.12, v.y);
    vec3 c = mix(uB * 0.5, uA * (0.85 + 0.3 * hash12(floor(p * 1.6))), stone);
    col += c * uPatA.y;
  }
  // Riveted metal plates
  if (uPatA.z > 0.0) {
    vec2 g = fract(p / 2.2);
    vec2 e = min(g, 1.0 - g);
    float seam = smoothstep(0.0, 0.03, min(e.x, e.y));
    vec2 rv = abs(fract(p / 2.2 + 0.5) - 0.5);
    float rivet = smoothstep(0.06, 0.04, length(min(e, vec2(0.08)) - 0.08) );
    vec3 c = mix(uB * 0.6, uA * (0.85 + 0.25 * vnoise2(p * 3.0)), seam) + rivet * 0.12;
    col += c * uPatA.z;
    glow += 0.0 * rv.x;
  }
  // Asphalt with road markings
  if (uPatA.w > 0.0) {
    vec3 c = mix(uB, uA, vnoise2(p * 6.0) * 0.6 + 0.3);
    float ang = atan(p.y, p.x);
    float spoke = smoothstep(0.03, 0.0, abs(fract(ang / 6.2832 * 8.0) - 0.5) * dist * 0.6 - 0.02);
    float dash = step(0.5, fract(dist * 0.5));
    c += uGrid * spoke * dash * step(3.0, dist) * 0.35;
    col += c * uPatA.w;
  }
  // Neon grid (scrolling)
  if (uPatB.x > 0.0) {
    vec2 g = abs(fract(vec2(p.x, p.y + uTime * 1.2) / 1.6) - 0.5);
    float line = smoothstep(0.035, 0.0, min(g.x, g.y) * 1.6 / max(1.0, dist * 0.08));
    vec3 c = uA + uGrid * line * 2.2;
    col += c * uPatB.x;
  }
  // Glowing cracks
  if (uPatB.z > 0.0) {
    vec2 v = voronoi(p * 0.9 + vec2(0.0, uTime * 0.05));
    float crack = smoothstep(0.06, 0.0, v.y);
    vec3 c = mix(uA, uB, v.x) + uGrid * crack * (1.6 + 0.8 * sin(uTime * 2.0 + v.x * 10.0));
    col += c * uPatB.z;
  }

  // Key-light pool and ambient occlusion around the platform.
  col *= 0.75 + 0.45 * smoothstep(9.0, 1.5, dist) ;
  col *= mix(0.55, 1.0, smoothstep(1.6, 3.2, dist));

  // Fade to the horizon.
  float fog = smoothstep(8.0, 60.0, dist);
  col = mix(col, uFog, fog);
  float alpha = 1.0 - uPatB.y * (1.0 - smoothstep(60.0, 90.0, dist) * 0.0);
  alpha *= 1.0 - smoothstep(70.0, 90.0, dist);
  gl_FragColor = vec4(col, alpha);
}
`;

/** Seconds for the reveal ring to sweep the whole world. */
const REVEAL_TIME = 3.2;
const REVEAL_MAX = 150;
const revealRadius = (k: number): number => REVEAL_MAX * Math.pow(k, 2.1);

/**
 * Everything that isn't the Freakmoji: sky, ground and the era diorama.
 * Eras with an art kit (src/assets/models/eraN.glb) are built from it and
 * swap in with a reveal ring sweeping out from the star; eras still on the
 * procedural props use the legacy ground and platform.
 */
/** Practical lights in the scene at any time (constant, so shaders never recompile). */
const LIGHT_POOL = 4;

export class World {
  readonly group = new THREE.Group();
  readonly theme: ThemeState;
  private sky: THREE.Mesh;
  private skyU: Record<string, THREE.IUniform>;
  private ground: THREE.Mesh;
  private groundU: Record<string, THREE.IUniform>;
  private platform: THREE.Group;
  private platformMat: THREE.MeshStandardMaterial;
  private rimMat: THREE.MeshBasicMaterial;
  private platformRim: THREE.Mesh;
  readonly shadow: THREE.Mesh;
  private props: (EraProps | null)[] = [];
  private kits: (EraKit | null)[] = [];
  private scripts: (EraScript | null)[] = [];
  private loading = new Set<number>();
  /** Which model each loaded kit came from (full or lite variant). */
  private kitKeys: (string | null)[] = [];
  private ctx: PropContext;
  private quality: KitQuality = { grass: 1, shadows: true };
  era = 0;
  private fromEra = 0;
  /** 0 → 1 transition progress (1 = settled). */
  private transition = 1;
  private transitionDur = REVEAL_TIME;
  private time = 0;
  private seam = new THREE.Color();
  /** Fired when an era's kit finishes loading (so minions can re-plan). */
  onKitReady: ((era: number) => void) | null = null;
  /** Compiles a subtree's shaders ahead of time (set by the scene; avoids a hitch at reveal). */
  precompile: ((root: THREE.Object3D) => Promise<unknown>) | null = null;
  /** Fixed pool of practical lights, fed from the visible kits' light descriptions. */
  private readonly lightPool: THREE.PointLight[] = [];

  constructor(ctx: PropContext, startEra: number) {
    this.ctx = ctx;
    this.era = startEra;
    this.fromEra = startEra;
    this.theme = new ThemeState(THEMES[startEra]);
    for (let i = 0; i < LIGHT_POOL; i++) {
      const l = new THREE.PointLight(0xffffff, 0, 8, 1.6);
      this.lightPool.push(l);
      this.group.add(l);
    }

    this.skyU = {
      uTop: { value: new THREE.Color() }, uHorizon: { value: new THREE.Color() }, uBottom: { value: new THREE.Color() },
      uSunDir: { value: new THREE.Vector3() }, uSunColor: { value: new THREE.Color() },
      uNebA: { value: new THREE.Color() }, uNebB: { value: new THREE.Color() },
      uCloudColor: { value: new THREE.Color() }, uRidgeColor: { value: new THREE.Color() },
      uSunSize: { value: 0.1 }, uSunStripes: { value: 0 }, uStars: { value: 0 }, uNebula: { value: 0 },
      uClouds: { value: 0 }, uRidge: { value: 0 }, uSkyline: { value: 0 }, uWarp: { value: 0 }, uTime: { value: 0 },
    };
    this.sky = new THREE.Mesh(
      new THREE.SphereGeometry(180, 48, 24),
      new THREE.ShaderMaterial({
        uniforms: this.skyU,
        vertexShader: `varying vec3 vDir; void main(){ vDir = position; vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_Position = p.xyww; }`,
        fragmentShader: SKY_FRAG,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    );
    this.sky.renderOrder = -10;
    this.sky.frustumCulled = false;

    this.groundU = {
      uA: { value: new THREE.Color() }, uB: { value: new THREE.Color() }, uGrid: { value: new THREE.Color() },
      uFog: { value: new THREE.Color() }, uKey: { value: new THREE.Color() },
      uPatA: { value: new THREE.Vector4() }, uPatB: { value: new THREE.Vector4() }, uTime: { value: 0 },
    };
    this.ground = new THREE.Mesh(
      new THREE.CircleGeometry(90, 72),
      new THREE.ShaderMaterial({
        uniforms: this.groundU,
        vertexShader: `varying vec3 vWorld; void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vWorld = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
        fragmentShader: GROUND_FRAG,
        transparent: true,
        depthWrite: true,
      }),
    );
    this.ground.rotation.x = -Math.PI / 2;
    this.ground.renderOrder = -5;

    // Legacy platform: a chunky pedestal with a glowing rim.
    this.platform = new THREE.Group();
    this.platformMat = new THREE.MeshStandardMaterial({ color: 0x7a6248, roughness: 0.8, metalness: 0.1 });
    const top = new THREE.Mesh(new THREE.CylinderGeometry(1.75, 1.95, 0.34, 64, 1), this.platformMat);
    top.position.y = 0.03;
    const step = new THREE.Mesh(new THREE.CylinderGeometry(2.25, 2.4, 0.16, 64, 1), this.platformMat);
    step.position.y = -0.1;
    this.rimMat = new THREE.MeshBasicMaterial({ color: 0xff9b4a });
    this.platformRim = new THREE.Mesh(new THREE.TorusGeometry(1.76, 0.025, 8, 96), this.rimMat);
    this.platformRim.rotation.x = Math.PI / 2;
    this.platformRim.position.y = 0.2;
    this.platform.add(top, step, this.platformRim);

    // Soft contact shadow under the star (the shadow map adds the real one on higher tiers).
    const sc = document.createElement('canvas');
    sc.width = sc.height = 128;
    const g = sc.getContext('2d')!;
    const grad = g.createRadialGradient(64, 64, 4, 64, 64, 64);
    grad.addColorStop(0, 'rgba(0,0,0,0.55)');
    grad.addColorStop(0.5, 'rgba(0,0,0,0.25)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    this.shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(2.6, 2.6),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sc), transparent: true, depthWrite: false, opacity: 0.8 }),
    );
    this.shadow.rotation.x = -Math.PI / 2;
    this.shadow.position.y = 0.225;
    this.shadow.renderOrder = 1;

    this.group.add(this.sky, this.ground, this.platform, this.shadow);
    this.props = Array.from({ length: THEMES.length }, () => null);
    this.kits = Array.from({ length: THEMES.length }, () => null);
    this.scripts = Array.from({ length: THEMES.length }, () => null);
    this.requestKit(startEra);
    if (!hasModel(`era${startEra}`)) this.ensureProps(startEra).setPresence(1);
    this.applyTheme();
    this.syncLegacy();
  }

  private ensureProps(era: number): EraProps {
    let p = this.props[era];
    if (!p) {
      p = buildEraProps(era, this.ctx);
      this.props[era] = p;
      this.group.add(p.group);
    }
    return p;
  }

  /** Start loading an era's kit (no-op if there isn't one, or it's loaded). */
  requestKit(era: number): void {
    if (era < 0 || era >= THEMES.length || this.kits[era] || this.loading.has(era) || !hasModel(`era${era}`)) return;
    this.loading.add(era);
    // Deferred a tick: the quality tier is applied right after construction
    // and decides which variant (full or lite) to fetch.
    queueMicrotask(() => this.loadKit(era));
  }

  /**
   * Build an era's kit ahead of time, while the main thread is idle, so it
   * is ready (and its shaders compiled) long before that era arrives.
   */
  private prefetch(era: number): void {
    const go = (): void => this.requestKit(era);
    if (typeof requestIdleCallback === 'function') requestIdleCallback(go, { timeout: 4000 });
    else setTimeout(go, 1000);
  }

  /** The kit variant for the current tier. */
  private kitKeyFor(era: number): string {
    const lite = `era${era}.lo`;
    return this.quality.lite && hasModel(lite) ? lite : `era${era}`;
  }

  private loadKit(era: number): void {
    const key = this.kitKeyFor(era);
    loadModel(key)
      .then((gltf) => {
        forgetModel(key);
        return EraKit.build(gltf, this.quality);
      })
      .then((kit) => {
        // The tier may have changed while it was being built.
        kit.setGrassDensity(this.quality.grass);
        kit.setShadows(this.quality.shadows);
        const old = this.kits[era];
        this.kitKeys[era] = key;
        if (old) {
          // A tier change swapped variants: replace in place, keep the era's state.
          this.group.remove(old.group);
          old.dispose();
          this.kits[era] = kit;
          this.scripts[era] = attachEraScript(era, kit, this.ctx);
          this.group.add(kit.group);
          void this.precompile?.(kit.group);
          this.syncKits();
          this.onKitReady?.(era);
          return;
        }
        this.kits[era] = kit;
        this.scripts[era] = attachEraScript(era, kit, this.ctx);
        this.group.add(kit.group);
        void this.precompile?.(kit.group);
        // Arriving late: if it's the current era, sweep it in over the legacy look.
        if (era === this.era) {
          if (this.transition >= 1) {
            this.fromEra = era;
            this.transition = 0;
          }
          this.props[era]?.setPresence(0);
          this.prefetch(era + 1);
        } else kit.group.visible = false;
        this.onKitReady?.(era);
      })
      .catch((err) => console.warn(`era ${era} kit failed to load`, err))
      .finally(() => this.loading.delete(era));
  }

  setQuality(q: KitQuality): void {
    const liteChanged = !!q.lite !== !!this.quality.lite;
    this.quality = q;
    for (const k of this.kits) {
      k?.setGrassDensity(q.grass);
      k?.setShadows(q.shadows);
    }
    if (!liteChanged) return;
    // Swap loaded kits to the other variant (each keeps showing until its replacement is ready).
    this.kits.forEach((k, era) => {
      if (!k || this.loading.has(era) || this.kitKeys[era] === this.kitKeyFor(era)) return;
      this.loading.add(era);
      this.loadKit(era);
    });
  }

  /** Begin the morph into a new era. */
  setEra(era: number, instant = false): void {
    if (era === this.era && this.transition >= 1) return;
    this.requestKit(era);
    // The next era's kit is prefetched once this one has settled, not now:
    // building it during the reveal would cost frames at the showcase moment.
    if (instant) this.prefetch(era + 1);
    this.fromEra = instant ? era : this.era;
    this.era = era;
    this.transition = instant ? 1 : 0;
    if (!this.kits[era] && !hasModel(`era${era}`)) this.ensureProps(era);
    if (instant) {
      this.props.forEach((p, i) => p?.setPresence(i === era && !this.kits[era] ? 1 : 0));
      this.applyTheme();
    }
    this.syncKits();
    this.syncLegacy();
  }

  get transitioning(): boolean {
    return this.transition < 1;
  }

  /** The kit currently under the star (null while an era is still on legacy props). */
  get kit(): EraKit | null {
    return this.kits[this.era];
  }

  /** Ground height for anything walking at (x, z). */
  heightAt(x: number, z: number): number {
    const r = Math.hypot(x, z);
    const R = this.transition < 1 ? revealRadius(this.transition) : Infinity;
    const k = r < R ? this.kits[this.era] : this.kits[this.fromEra];
    return k ? k.height(x, z) : this.kits[this.era]?.height(x, z) ?? 0;
  }

  /** Copy the brightest practical lights of the visible kits into the fixed pool. */
  private feedLights(): void {
    const cands: THREE.PointLight[] = [];
    for (const k of this.kits) if (k?.group.visible) for (const { light } of k.lights) if (light.intensity > 0.01) cands.push(light);
    cands.sort((a, b) => b.intensity - a.intensity);
    this.lightPool.forEach((p, i) => {
      const src = cands[i];
      if (!src) {
        p.intensity = 0;
        return;
      }
      p.position.copy(src.position);
      p.color.copy(src.color);
      p.intensity = src.intensity;
      p.distance = src.distance;
      p.decay = src.decay;
    });
  }

  /** Platform visibility (cosmic eras float on an asteroid instead). */
  private platformPresence(era: number): number {
    return era >= 5 ? 0 : 1;
  }

  private syncKits(): void {
    const R = revealRadius(this.transition);
    const settled = this.transition >= 1;
    this.seam.set(THEMES[this.era].accent).multiplyScalar(1.2);
    this.kits.forEach((k, i) => {
      if (!k) return;
      if (i === this.era) {
        k.group.visible = true;
        k.setReveal(R, settled || this.fromEra === this.era ? 0 : 1, this.seam);
      } else if (i === this.fromEra && !settled) {
        k.group.visible = true;
        k.setReveal(R, -1, this.seam);
      } else k.group.visible = false;
    });
  }

  /** The legacy ground only shows for eras without a kit. */
  private syncLegacy(): void {
    this.ground.visible = !this.kits[this.era];
  }

  private applyTheme(): void {
    const k = this.transition;
    const e = k * k * (3 - 2 * k);
    this.theme.set(THEMES[this.fromEra], THEMES[this.era], e);
    const T = this.theme;
    const s = this.skyU;
    (s.uTop.value as THREE.Color).copy(T.c.skyTop);
    (s.uHorizon.value as THREE.Color).copy(T.c.skyHorizon);
    (s.uBottom.value as THREE.Color).copy(T.c.skyBottom);
    (s.uSunDir.value as THREE.Vector3).copy(T.v.sunDir);
    (s.uSunColor.value as THREE.Color).copy(T.c.sunColor);
    (s.uNebA.value as THREE.Color).copy(T.c.nebA);
    (s.uNebB.value as THREE.Color).copy(T.c.nebB);
    (s.uCloudColor.value as THREE.Color).copy(T.c.cloudColor);
    (s.uRidgeColor.value as THREE.Color).copy(T.c.ridgeColor);
    s.uSunSize.value = T.n.sunSize;
    s.uSunStripes.value = T.n.sunStripes;
    s.uStars.value = T.n.stars;
    s.uNebula.value = T.n.nebula;
    s.uClouds.value = T.n.clouds;
    s.uRidge.value = T.n.ridge;
    s.uSkyline.value = T.n.skyline;
    s.uWarp.value = T.n.warp;
    const g = this.groundU;
    (g.uA.value as THREE.Color).copy(T.c.groundA);
    (g.uB.value as THREE.Color).copy(T.c.groundB);
    (g.uGrid.value as THREE.Color).copy(T.c.gridColor);
    (g.uFog.value as THREE.Color).copy(T.c.fog);
    (g.uPatA.value as THREE.Vector4).copy(T.v4.groundA4);
    (g.uPatB.value as THREE.Vector4).copy(T.v4.groundB4);
    this.platformMat.color.copy(T.c.platform);
    this.rimMat.color.copy(T.c.platformRim).multiplyScalar(3);
  }

  update(dt: number): void {
    this.time += dt;
    if (this.transition < 1) {
      this.transition = Math.min(1, this.transition + dt / this.transitionDur);
      const k = this.transition;
      // Legacy props: old ones sink during the first half; new ones rise in the second.
      this.props.forEach((p, i) => {
        if (!p) return;
        if (i === this.era && !this.kits[i]) p.setPresence(Math.max(0, (k - 0.35) / 0.65));
        else if (i === this.fromEra && i !== this.era) p.setPresence(Math.max(0, 1 - k / 0.45));
        else p.setPresence(0);
      });
      this.applyTheme();
      this.syncKits();
      if (k >= 1) {
        this.fromEra = this.era;
        this.syncKits();
        this.prefetch(this.era + 1);
      }
    }
    this.syncLegacy();
    const legacyEra = !this.kits[this.era];
    const pp = legacyEra ? this.platformPresence(this.fromEra) + (this.platformPresence(this.era) - this.platformPresence(this.fromEra)) * this.transition : 0;
    this.platform.visible = pp > 0.01;
    this.platform.position.y = (pp - 1) * 3;
    this.platform.scale.setScalar(0.6 + 0.4 * pp);
    this.shadow.visible = legacyEra ? pp > 0.5 : this.era < 5;
    this.skyU.uTime.value = this.time;
    this.groundU.uTime.value = this.time;
    for (const p of this.props) if (p && p.presence > 0) p.update(dt, this.time);
    this.scripts.forEach((s, i) => {
      if (!s || !this.kits[i]?.group.visible) return;
      const presence = i === this.era ? (this.transition >= 1 ? 1 : this.transition) : 1 - this.transition;
      s.update(dt, this.time, presence);
    });
    this.feedLights();
  }
}
