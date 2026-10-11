import * as THREE from 'three';

export const MAX_WAVES = 4;

/**
 * Final full-screen pass: shockwave distortion, chromatic aberration,
 * a white/colour flash, vignette, glitch slicing and film grain.
 * All effects are driven by uniforms from Effects (render/effects.ts).
 */
export const FinalShader = {
  name: 'FreakFinal',
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
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
      col.r = texture2D(tDiffuse, uv + off).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - off).b;

      float l = dot(col, vec3(0.299, 0.587, 0.114));
      col = mix(vec3(l), col, uSaturation);
      col = mix(col, col * uTint.rgb, uTint.a);

      col = mix(col, uFlash.rgb, clamp(uFlash.a, 0.0, 1.0));

      float v = smoothstep(0.95, 0.25, length(c * vec2(uAspect * 0.85, 1.0)));
      col *= mix(1.0, v, uVignette);

      col += (hash(vUv * 731.0 + fract(uTime)) - 0.5) * uGrain;
      gl_FragColor = vec4(col, 1.0);
    }
  `,
};
