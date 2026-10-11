import * as THREE from 'three';
import { FullScreenQuad, Pass } from 'three/examples/jsm/postprocessing/Pass.js';

export const MAX_WAVES = 4;

/**
 * Final full-screen pass, and the only one at full resolution after the
 * scene: adds the bloom, then shockwave distortion, chromatic aberration,
 * a white/colour flash, vignette, glitch slicing and film grain, then tone
 * maps and converts to the output colour space (the renderer supplies both
 * chunks when this pass draws to the screen). Effects are driven by
 * uniforms from ScreenFX (render/fx.ts).
 */
export const FinalShader = {
  name: 'FreakFinal',
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    tBloom: { value: null as THREE.Texture | null },
    uBloom: { value: 0 },
    uTime: { value: 0 },
    uAspect: { value: 1 },
    uWaves: { value: Array.from({ length: MAX_WAVES }, () => new THREE.Vector4(0.5, 0.5, -1, 0)) },
    uAberration: { value: 0.004 },
    uFlash: { value: new THREE.Vector4(1, 1, 1, 0) },
    uVignette: { value: 0.35 },
    uGlitch: { value: 0 },
    uGrain: { value: 0.035 },
    uSaturation: { value: 1 },
    uTint: { value: new THREE.Vector4(1, 1, 1, 0) },
    uLens: { value: new THREE.Vector4(0.5, 0.5, 0, 0.15) },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform sampler2D tBloom;
    uniform float uBloom;
    uniform float uTime, uAspect, uAberration, uVignette, uGlitch, uGrain, uSaturation;
    uniform vec4 uWaves[${MAX_WAVES}];
    uniform vec4 uFlash, uTint, uLens;
    varying vec2 vUv;

    float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

    void main() {
      vec2 uv = vUv;

      // Glitch: horizontal slice offsets.
      if (uGlitch > 0.0) {
        float band = floor(uv.y * 24.0 + floor(uTime * 18.0) * 7.0);
        float r = hash(vec2(band, floor(uTime * 18.0)));
        if (r < uGlitch * 0.5) uv.x += (hash(vec2(band, 3.0)) - 0.5) * 0.12 * uGlitch;
      }

      // Gravitational lens (black holes, singularities): pull pixels toward a point.
      if (uLens.z > 0.0) {
        vec2 d = uv - uLens.xy; d.x *= uAspect;
        float r = length(d);
        float pull = uLens.z * uLens.w * uLens.w / max(r * r, 0.0004);
        uv -= normalize(d + 1e-5) * vec2(1.0 / uAspect, 1.0) * min(pull, 0.25) * 0.08;
      }

      // Shockwaves: xy = centre (uv), z = age (s, <0 inactive), w = strength.
      for (int i = 0; i < ${MAX_WAVES}; i++) {
        vec4 w = uWaves[i];
        if (w.z < 0.0) continue;
        vec2 d = uv - w.xy; d.x *= uAspect;
        float dist = length(d);
        float radius = w.z * 1.25;
        float ring = smoothstep(0.12, 0.0, abs(dist - radius));
        float fade = exp(-w.z * 2.6);
        uv -= normalize(d + 1e-5) * vec2(1.0 / uAspect, 1.0) * ring * fade * w.w * 0.035;
      }

      vec2 c = uv - 0.5;
      // Lateral chromatic aberration, growing toward the edges.
      vec2 off = c * uAberration * (0.6 + dot(c, c) * 2.0);
      vec3 col;
      col.r = texture2D(tDiffuse, uv + off).r + texture2D(tBloom, uv + off).r * uBloom;
      col.g = texture2D(tDiffuse, uv).g + texture2D(tBloom, uv).g * uBloom;
      col.b = texture2D(tDiffuse, uv - off).b + texture2D(tBloom, uv - off).b * uBloom;

      float l = dot(col, vec3(0.299, 0.587, 0.114));
      col = mix(vec3(l), col, uSaturation);
      col = mix(col, col * uTint.rgb, uTint.a);

      col = mix(col, uFlash.rgb, clamp(uFlash.a, 0.0, 1.0));

      float v = smoothstep(0.95, 0.25, length(c * vec2(uAspect * 0.85, 1.0)));
      col *= mix(1.0, v, uVignette);

      col += (hash(vUv * 731.0 + fract(uTime)) - 0.5) * uGrain;
      gl_FragColor = vec4(max(col, 0.0), 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `,
};

const QUAD_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;

/** Dual-filter downsample (4 diagonal taps + centre), optionally keeping only what's over the threshold. */
const DOWN_FRAG = /* glsl */ `
  uniform sampler2D tSrc;
  uniform vec2 uHalf;
  uniform float uThreshold, uKnee, uPrefilter;
  varying vec2 vUv;
  vec3 tap(vec2 o) {
    vec3 c = texture2D(tSrc, vUv + o).rgb;
    if (uPrefilter > 0.5) c *= smoothstep(uThreshold, uThreshold + uKnee, dot(c, vec3(0.2126, 0.7152, 0.0722)));
    return c;
  }
  void main() {
    vec3 s = tap(vec2(0.0)) * 4.0 + tap(-uHalf) + tap(uHalf) + tap(vec2(uHalf.x, -uHalf.y)) + tap(vec2(-uHalf.x, uHalf.y));
    gl_FragColor = vec4(s / 8.0, 1.0);
  }
`;

/** Dual-filter upsample (8-tap tent), added onto the same-sized downsample level. */
const UP_FRAG = /* glsl */ `
  uniform sampler2D tSrc;
  uniform sampler2D tAdd;
  uniform vec2 uHalf;
  varying vec2 vUv;
  vec3 tap(vec2 o) { return texture2D(tSrc, vUv + o).rgb; }
  void main() {
    vec3 s = tap(vec2(-uHalf.x * 2.0, 0.0)) + tap(vec2(uHalf.x * 2.0, 0.0)) + tap(vec2(0.0, uHalf.y * 2.0)) + tap(vec2(0.0, -uHalf.y * 2.0))
      + (tap(vec2(-uHalf.x, uHalf.y)) + tap(vec2(uHalf.x, uHalf.y)) + tap(vec2(uHalf.x, -uHalf.y)) + tap(vec2(-uHalf.x, -uHalf.y))) * 2.0;
    gl_FragColor = vec4(s / 12.0 + texture2D(tAdd, vUv).rgb, 1.0);
  }
`;

/**
 * Bloom as a dual-filter pyramid: the bright parts of the scene are
 * downsampled through LEVELS shrinking targets (a few taps each), then
 * upsampled back, each level adding its own detail. Nine small passes in
 * total, against a separable blur per level plus a full-screen blend; the
 * result is sampled by the final pass instead of being blended in.
 */
export class Bloom {
  /** Overall glow (themes drive it per era). */
  strength = 0.7;
  /** HDR luminance above which things glow (emissive materials). */
  threshold = 2.4;
  private static readonly LEVELS = 5;
  private down: THREE.WebGLRenderTarget[] = [];
  private up: THREE.WebGLRenderTarget[] = [];
  private readonly downMat: THREE.ShaderMaterial;
  private readonly upMat: THREE.ShaderMaterial;
  private readonly quad = new FullScreenQuad();

  constructor() {
    this.downMat = new THREE.ShaderMaterial({
      uniforms: { tSrc: { value: null }, uHalf: { value: new THREE.Vector2() }, uThreshold: { value: 2.4 }, uKnee: { value: 0.6 }, uPrefilter: { value: 0 } },
      vertexShader: QUAD_VERT,
      fragmentShader: DOWN_FRAG,
      depthTest: false,
      depthWrite: false,
    });
    this.upMat = new THREE.ShaderMaterial({
      uniforms: { tSrc: { value: null }, tAdd: { value: null }, uHalf: { value: new THREE.Vector2() } },
      vertexShader: QUAD_VERT,
      fragmentShader: UP_FRAG,
      depthTest: false,
      depthWrite: false,
    });
    this.setSize(256, 256);
  }

  /** The bloom, at the size of the first level. */
  get texture(): THREE.Texture {
    return (this.up[0] ?? this.down[0]).texture;
  }

  /** Size of the first (largest) level, in pixels. */
  setSize(w: number, h: number): void {
    for (const t of [...this.down, ...this.up]) t.dispose();
    this.down = [];
    this.up = [];
    const opts = { type: THREE.HalfFloatType, depthBuffer: false };
    for (let i = 0; i < Bloom.LEVELS; i++) {
      const lw = Math.max(1, Math.round(w / 2 ** i));
      const lh = Math.max(1, Math.round(h / 2 ** i));
      this.down.push(new THREE.WebGLRenderTarget(lw, lh, opts));
      if (i < Bloom.LEVELS - 1) this.up.push(new THREE.WebGLRenderTarget(lw, lh, opts));
    }
  }

  render(renderer: THREE.WebGLRenderer, source: THREE.WebGLRenderTarget): void {
    const d = this.downMat.uniforms;
    d.uThreshold.value = this.threshold;
    let src = source.texture;
    let sw = source.width;
    let sh = source.height;
    for (let i = 0; i < this.down.length; i++) {
      d.tSrc.value = src;
      d.uHalf.value.set(0.5 / sw, 0.5 / sh);
      d.uPrefilter.value = i === 0 ? 1 : 0;
      this.draw(renderer, this.downMat, this.down[i]);
      src = this.down[i].texture;
      sw = this.down[i].width;
      sh = this.down[i].height;
    }
    const u = this.upMat.uniforms;
    for (let i = this.up.length - 1; i >= 0; i--) {
      const lower = i === this.up.length - 1 ? this.down[i + 1] : this.up[i + 1];
      u.tSrc.value = lower.texture;
      u.tAdd.value = this.down[i].texture;
      u.uHalf.value.set(0.5 / lower.width, 0.5 / lower.height);
      this.draw(renderer, this.upMat, this.up[i]);
    }
  }

  private draw(renderer: THREE.WebGLRenderer, mat: THREE.ShaderMaterial, target: THREE.WebGLRenderTarget): void {
    this.quad.material = mat;
    renderer.setRenderTarget(target);
    this.quad.render(renderer);
  }

  dispose(): void {
    for (const t of [...this.down, ...this.up]) t.dispose();
    this.downMat.dispose();
    this.upMat.dispose();
    this.quad.dispose();
  }
}

/** Composer pass that builds the bloom from the scene and hands it to the final pass. */
export class BloomPass extends Pass {
  private readonly bloom: Bloom;
  private readonly finalUniforms: Record<string, THREE.IUniform>;

  constructor(bloom: Bloom, finalUniforms: Record<string, THREE.IUniform>) {
    super();
    this.bloom = bloom;
    this.finalUniforms = finalUniforms;
    this.needsSwap = false;
  }

  override render(renderer: THREE.WebGLRenderer, _write: THREE.WebGLRenderTarget, read: THREE.WebGLRenderTarget): void {
    this.bloom.render(renderer, read);
    // Matches the old bloom's weighting: five normalised levels at 0.6 each.
    this.finalUniforms.uBloom.value = this.bloom.strength * 0.6;
    this.finalUniforms.tBloom.value = this.bloom.texture;
  }
}
