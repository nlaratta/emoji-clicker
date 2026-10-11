import * as THREE from 'three';

/**
 * Small hand-built light effects shared by the era scripts: soft additive
 * shafts (searchlights, holograms), pools of light on the ground and a
 * falling-rain field. All additive, depth-tested, no depth writes.
 */

/** Soft additive light shaft (searchlights): bright at the lamp, fading up the beam. */
export function beam(color: THREE.Color, length: number, radius: number): THREE.Mesh {
  const geo = new THREE.CylinderGeometry(radius, 0.18, length, 20, 1, true).translate(0, length / 2, 0);
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    uniforms: { uColor: { value: color }, uFade: { value: 1 } },
    vertexShader: 'varying float vY; varying vec3 vN; varying vec3 vV; void main(){ vY = uv.y; vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position,1.0); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }',
    fragmentShader: 'uniform vec3 uColor; uniform float uFade; varying float vY; varying vec3 vN; varying vec3 vV; void main(){ float edge = pow(abs(dot(vN, vV)), 1.5); gl_FragColor = vec4(uColor * pow(1.0 - vY, 1.6) * edge * 0.3 * uFade, 1.0); }',
  });
  return new THREE.Mesh(geo, mat);
}

/** A soft warm pool of lamplight on the pavement under a street lamp. */
export function pool(color: THREE.Color, radius: number): THREE.Mesh {
  const geo = new THREE.CircleGeometry(radius, 32).rotateX(-Math.PI / 2);
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    uniforms: { uColor: { value: color }, uFade: { value: 1 } },
    vertexShader: 'varying vec2 vP; void main(){ vP = position.xz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: `uniform vec3 uColor; uniform float uFade; varying vec2 vP; void main(){ float d = length(vP) / ${radius.toFixed(2)}; float k = pow(max(0.0, 1.0 - d), 2.2); gl_FragColor = vec4(uColor * k * 0.62 * uFade, 1.0); }`,
  });
  const m = new THREE.Mesh(geo, mat);
  m.renderOrder = 1;
  return m;
}

/**
 * Rain: streaks falling through a box that follows `center`, animated
 * entirely in the vertex shader (one draw call).
 */
export function rainField(count: number, center: THREE.Vector3, box = new THREE.Vector3(30, 16, 26), color = new THREE.Color(0.65, 0.7, 1.0)): THREE.LineSegments {
  const seed = new Float32Array(count * 2 * 3);
  const end = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    const s = [Math.random(), Math.random(), Math.random()];
    for (let k = 0; k < 2; k++) {
      seed.set(s, (i * 2 + k) * 3);
      end[i * 2 + k] = k;
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 2 * 3), 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 3));
  geo.setAttribute('aEnd', new THREE.BufferAttribute(end, 1));
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uCenter: { value: center }, uBox: { value: box }, uColor: { value: color }, uFade: { value: 1 } },
    vertexShader: `uniform float uTime; uniform vec3 uCenter; uniform vec3 uBox; attribute vec3 aSeed; attribute float aEnd; varying float vA;
      void main(){
        vec3 p = uCenter + (aSeed - 0.5) * uBox;
        float speed = 13.0 + aSeed.z * 5.0;
        p.y = uCenter.y - uBox.y * 0.5 + mod(aSeed.y * uBox.y - uTime * speed, uBox.y);
        p.x += (p.y - uCenter.y) * 0.12;
        p.y -= aEnd * (0.35 + aSeed.z * 0.25);
        p.x -= aEnd * 0.05;
        vA = (1.0 - aEnd) * (0.18 + aSeed.x * 0.22);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }`,
    fragmentShader: 'uniform vec3 uColor; uniform float uFade; varying float vA; void main(){ gl_FragColor = vec4(uColor * vA * uFade, 1.0); }',
  });
  const lines = new THREE.LineSegments(geo, mat);
  lines.frustumCulled = false;
  return lines;
}
