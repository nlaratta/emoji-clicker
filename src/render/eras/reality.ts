import * as THREE from 'three';
import type { EraKit } from '../eraKit';
import type { PropContext } from '../eraProps';
import { Shape } from '../particles';
import type { EraScript } from './index';
import { emitter } from './util';

/** A portal surface: an arch-shaped swirl of mint, pink and lilac over the doorway's own glow. */
function portalSurface(): THREE.Mesh {
  const W = 3.0;
  const H = 5.1;
  const geo = new THREE.PlaneGeometry(W, H).translate(0, H / 2, 0);
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    uniforms: { uTime: { value: 0 }, uFade: { value: 1 } },
    vertexShader: 'varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: `uniform float uTime; uniform float uFade; varying vec2 vP;
      void main(){
        // Arch mask: a rectangle capped by a half disc.
        vec2 c = vec2(0.0, 3.6);
        float inside = vP.y < c.y ? step(abs(vP.x), 1.5) : step(length(vP - c), 1.5);
        vec2 q = vP - vec2(0.0, 2.9);
        float r = length(q);
        float a = atan(q.y, q.x);
        float swirl = sin(a * 3.0 + r * 3.2 - uTime * 2.2) * 0.5 + 0.5;
        float rings = sin(r * 6.0 - uTime * 3.0) * 0.5 + 0.5;
        vec3 mint = vec3(0.42, 1.0, 0.85), pink = vec3(1.0, 0.48, 0.85), lilac = vec3(0.78, 0.6, 1.0);
        vec3 col = mix(mix(mint, pink, swirl), lilac, rings * 0.5);
        float glow = (0.35 + 0.65 * swirl * rings) * smoothstep(2.6, 0.0, r);
        gl_FragColor = vec4(col * glow * inside * 0.9 * uFade, 1.0);
      }`,
  });
  return new THREE.Mesh(geo, mat);
}

/** A rotating 4D hypercube, projected to 3D: 16 corners, 32 edges. */
class Tesseract {
  readonly lines: THREE.LineSegments;
  private readonly verts: number[][] = [];
  private readonly edges: [number, number][] = [];
  private readonly pos: Float32Array;

  constructor(size: number) {
    for (let i = 0; i < 16; i++) this.verts.push([i & 1 ? 1 : -1, i & 2 ? 1 : -1, i & 4 ? 1 : -1, i & 8 ? 1 : -1].map((v) => v * size));
    for (let i = 0; i < 16; i++) for (let b = 0; b < 4; b++) if (!(i & (1 << b))) this.edges.push([i, i | (1 << b)]);
    this.pos = new Float32Array(this.edges.length * 6);
    const col = new Float32Array(this.edges.length * 6);
    const mint = new THREE.Color(0.42, 1.0, 0.85).multiplyScalar(1.6);
    const pink = new THREE.Color(1.0, 0.48, 0.85).multiplyScalar(1.6);
    this.edges.forEach(([a, b], i) => {
      for (const [k, v] of [a, b].entries()) {
        const c = this.verts[v][3] > 0 ? pink : mint;
        col.set([c.r, c.g, c.b], i * 6 + k * 3);
      }
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    this.lines = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    this.lines.frustumCulled = false;
  }

  update(t: number): void {
    const a = t * 0.45;
    const b = t * 0.31;
    const p3: number[][] = this.verts.map(([x, y, z, w]) => {
      // Rotate in the XW and YZ planes, then perspective-project W away.
      const x1 = x * Math.cos(a) - w * Math.sin(a);
      const w1 = x * Math.sin(a) + w * Math.cos(a);
      const y1 = y * Math.cos(b) - z * Math.sin(b);
      const z1 = y * Math.sin(b) + z * Math.cos(b);
      const k = 2.6 / (3.6 - w1 / 1.2);
      return [x1 * k, y1 * k, z1 * k];
    });
    this.edges.forEach(([i, j], e) => {
      this.pos.set(p3[i], e * 6);
      this.pos.set(p3[j], e * 6 + 3);
    });
    (this.lines.geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
    this.lines.rotation.y = t * 0.2;
  }
}

/** Era VII: islands drift, the portal swirls, a waterfall falls upward, a tesseract turns, reality glitches. */
export function realityLeft(kit: EraKit, ctx: PropContext): EraScript {
  const p = ctx.particles;
  const isles = [...kit.anim.entries()].filter(([n]) => n.startsWith('isle')).map(([n, o], i) => ({
    o, base: o.position.clone(), phase: i * 1.9, yaw0: o.rotation.y, tree: n === 'isle_tree',
  }));
  const portalAt = kit.anchor('fx_portal')?.pos ?? new THREE.Vector3(0, 3.2, -13.6);
  const portal = portalSurface();
  portal.position.set(portalAt.x, portalAt.y - 3.2 + 0.6, portalAt.z + 0.08);
  kit.group.add(portal);
  const portalMat = portal.material as THREE.ShaderMaterial;
  const tessAt = kit.anchor('fx_tesseract')?.pos ?? new THREE.Vector3(5.5, 5.6, -15.5);
  const tess = new Tesseract(0.9);
  tess.lines.position.copy(tessAt);
  kit.group.add(tess.lines);
  const fallIsle = isles.find((i) => kit.anim.get('isle_stone') === i.o) ?? null;
  const tmp = new THREE.Vector3();
  const fall = emitter(ctx.lite ? 18 : 40, () => {
    if (!fallIsle) return;
    // From the island's lip, rising: water that has forgotten which way is down.
    const a = 2.2 + (Math.random() - 0.5) * 0.5;
    tmp.set(Math.cos(a) * 3.3, -0.2, Math.sin(a) * 3.3).add(fallIsle.o.position);
    const mist = Math.random() < 0.25;
    p.glow.spawn({
      x: tmp.x + (Math.random() - 0.5) * 0.4, y: tmp.y, z: tmp.z + (Math.random() - 0.5) * 0.4,
      vx: (Math.random() - 0.5) * 0.3, vy: 2.5 + Math.random() * 2, vz: (Math.random() - 0.5) * 0.3,
      life: 2.6 + Math.random(), size: mist ? 0.35 : 0.07, sizeEnd: mist ? 0.8 : 0.03,
      r: 0.5, g: 1.4, b: 1.3, shape: mist ? Shape.Glow : Shape.Spark, stretch: mist ? 0 : 0.06, drag: 0.2,
    });
  });
  let glitchT = 4;
  const glitchCols = [new THREE.Color(0x6affd8), new THREE.Color(0xff7ad8), new THREE.Color(0xc89aff)];

  return {
    update(dt, t, presence) {
      const on = presence > 0.6;
      for (const i of isles) {
        i.o.position.set(i.base.x + Math.sin(t * 0.09 + i.phase) * 0.8, i.base.y + Math.sin(t * 0.33 + i.phase) * 0.6, i.base.z + Math.cos(t * 0.07 + i.phase) * 0.6);
        i.o.rotation.y = i.yaw0 + t * (i.tree ? -0.05 : 0.025) + Math.sin(t * 0.2 + i.phase) * 0.1;
        i.o.rotation.z = Math.sin(t * 0.25 + i.phase) * 0.04;
      }
      portalMat.uniforms.uTime.value = t;
      portalMat.uniforms.uFade.value = presence;
      tess.update(t);
      (tess.lines.material as THREE.LineBasicMaterial).opacity = presence;
      if (on) fall(dt);
      glitchT -= dt;
      if (on && glitchT <= 0) {
        glitchT = 5 + Math.random() * 6;
        const a = Math.PI + (Math.random() - 0.5) * 2.4;
        const d = 7 + Math.random() * 9;
        tmp.set(Math.sin(a) * d, 1 + Math.random() * 3, Math.cos(a) * d);
        const c = glitchCols[Math.floor(Math.random() * 3)];
        p.ring(tmp, c, 2.2, 0.35, 2);
        for (let k = 0; k < 8; k++) {
          p.glow.spawn({
            x: tmp.x, y: tmp.y, z: tmp.z, vx: (Math.random() - 0.5) * 3, vy: (Math.random() - 0.5) * 3, vz: (Math.random() - 0.5) * 3,
            life: 0.5, size: 0.14, sizeEnd: 0.0, r: c.r * 3, g: c.g * 3, b: c.b * 3, shape: Shape.Chunk, drag: 3,
          });
        }
      }
    },
  };
}
