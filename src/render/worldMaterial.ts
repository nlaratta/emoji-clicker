import * as THREE from 'three';

/**
 * Shared shader plumbing for everything built from the art kits.
 *
 * Every world material gets the same vertex/fragment injections:
 * - wind: vertices sway by `aSway` (0 = rigid, grows toward branch tips);
 * - reveal: era transitions are a ring sweeping out from the Freakmoji. An
 *   incoming era shows inside the ring, the outgoing era outside it, with a
 *   glowing seam. Props rise just behind the ring (`aRise` = pivot radius,
 *   sink depth) and sink just ahead of it when leaving.
 * Depth materials get the same deformation so shadows match.
 */
export interface WorldUniforms {
  uTime: THREE.IUniform<number>;
  /** xz wind direction, strength, gust frequency. */
  uWind: THREE.IUniform<THREE.Vector4>;
}

export interface RevealUniforms {
  /** x radius, y mode (+1 incoming / -1 outgoing / 0 off), z seam width, w rise width. */
  uReveal: THREE.IUniform<THREE.Vector4>;
  uRevealColor: THREE.IUniform<THREE.Color>;
}

export const sharedWorld: WorldUniforms = {
  uTime: { value: 0 },
  uWind: { value: new THREE.Vector4(0.8, 0.6, 1, 1) },
};

export function makeReveal(): RevealUniforms {
  return { uReveal: { value: new THREE.Vector4(1e4, 0, 0.6, 2.2) }, uRevealColor: { value: new THREE.Color(1, 0.8, 0.5) } };
}

const VERT_HEAD = /* glsl */ `
uniform float uTime;
uniform vec4 uWind;
uniform vec4 uReveal;
#ifdef USE_SWAY
attribute float aSway;
#endif
#ifdef USE_RISE
attribute vec2 aRise;
#endif
varying vec3 vWorldPos;
float easeOutBack(float x) { float c1 = 1.5; float c3 = c1 + 1.0; float y = x - 1.0; return 1.0 + c3 * y * y * y + c1 * y * y; }
vec3 windOffset(vec3 wp, float sway) {
  float ph = wp.x * 0.31 + wp.z * 0.23;
  float gust = 0.6 + 0.4 * sin(uTime * 0.37 * uWind.w + wp.x * 0.05);
  float w = sin(uTime * 1.6 * uWind.w + ph) * 0.7 + sin(uTime * 2.9 * uWind.w + ph * 1.7) * 0.3;
  vec2 d = uWind.xy * (w * gust * uWind.z);
  return vec3(d.x, -abs(w) * 0.15 * uWind.z, d.y) * sway;
}
`;

const VERT_PROJECT = /* glsl */ `
vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
mvPosition = instanceMatrix * mvPosition;
#endif
vec4 worldP = modelMatrix * mvPosition;
#ifdef USE_SWAY
worldP.xyz += windOffset(worldP.xyz, aSway);
#endif
#ifdef USE_RISE
if (uReveal.y > 0.5) {
  float k = clamp((uReveal.x - aRise.x) / uReveal.w, 0.0, 1.0);
  worldP.y -= aRise.y * (1.0 - (k <= 0.0 ? 0.0 : easeOutBack(k)));
} else if (uReveal.y < -0.5) {
  float k = clamp((uReveal.x - (aRise.x - uReveal.w)) / uReveal.w, 0.0, 1.0);
  worldP.y -= aRise.y * k * k;
}
#endif
vWorldPos = worldP.xyz;
mvPosition = viewMatrix * worldP;
gl_Position = projectionMatrix * mvPosition;
`;

const FRAG_HEAD = /* glsl */ `
uniform vec4 uReveal;
uniform vec3 uRevealColor;
varying vec3 vWorldPos;
`;

const FRAG_CLIP = /* glsl */ `
float revD = length(vWorldPos.xz);
if (uReveal.y > 0.5 && revD > uReveal.x) discard;
if (uReveal.y < -0.5 && revD < uReveal.x) discard;
`;

const FRAG_SEAM = /* glsl */ `
if (uReveal.y > 0.5) {
  float seam = 1.0 - smoothstep(0.0, uReveal.z, uReveal.x - revD);
  totalEmissiveRadiance += uRevealColor * seam * seam * 3.0;
}
`;

export interface PatchOpts {
  sway?: boolean;
  rise?: boolean;
  reveal: RevealUniforms;
}

/** Inject wind / rise / reveal into a built-in material (standard, lambert, basic or depth). */
export function patchWorldMaterial<T extends THREE.Material>(mat: T, opts: PatchOpts): T {
  const defines: Record<string, string> = {};
  if (opts.sway) defines.USE_SWAY = '';
  if (opts.rise) defines.USE_RISE = '';
  (mat as THREE.Material & { defines?: Record<string, string> }).defines = { ...((mat as { defines?: Record<string, string> }).defines ?? {}), ...defines };
  const prev = mat.onBeforeCompile;
  mat.onBeforeCompile = (shader, renderer) => {
    prev?.call(mat, shader, renderer);
    shader.uniforms.uTime = sharedWorld.uTime;
    shader.uniforms.uWind = sharedWorld.uWind;
    shader.uniforms.uReveal = opts.reveal.uReveal;
    shader.uniforms.uRevealColor = opts.reveal.uRevealColor;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\n${VERT_HEAD}`)
      .replace('#include <project_vertex>', VERT_PROJECT);
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `#include <common>\n${FRAG_HEAD}`);
    if (shader.fragmentShader.includes('#include <clipping_planes_fragment>')) {
      shader.fragmentShader = shader.fragmentShader.replace('#include <clipping_planes_fragment>', `#include <clipping_planes_fragment>\n${FRAG_CLIP}`);
    } else {
      shader.fragmentShader = shader.fragmentShader.replace('void main() {', `void main() {\n${FRAG_CLIP}`);
    }
    if (shader.fragmentShader.includes('#include <emissivemap_fragment>')) {
      shader.fragmentShader = shader.fragmentShader.replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>\n${FRAG_SEAM}`);
    }
  };
  mat.customProgramCacheKey = () => `world:${opts.sway ? 1 : 0}${opts.rise ? 1 : 0}:${mat.type}`;
  return mat;
}

/** Matching shadow-caster material so deformed / revealed geometry casts the right shadow. */
export function worldDepthMaterial(opts: PatchOpts): THREE.MeshDepthMaterial {
  const m = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking });
  return patchWorldMaterial(m, opts);
}
