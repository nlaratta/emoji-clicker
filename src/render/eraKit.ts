import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { makeReveal, patchWorldMaterial, worldDepthMaterial, type RevealUniforms } from './worldMaterial';

/**
 * One era's diorama, assembled from its glTF kit (art/blender/eraN.py):
 * - static props are merged into a couple of draw calls (opaque + glow) with
 *   per-vertex wind and rise attributes;
 * - the terrain keeps its own mesh and becomes a heightfield for minions;
 * - grass is scattered from the terrain's `_grass` density attribute;
 * - `role: anim` nodes stay live for era scripts; `role: anchor` empties
 *   become named gameplay points.
 */
export interface Anchor {
  name: string;
  pos: THREE.Vector3;
  data: Record<string, unknown>;
}

export interface Collider {
  x: number;
  z: number;
  r: number;
}

const HF_HALF = 26;
const HF_RES = 0.25;
const HF_N = Math.round((HF_HALF * 2) / HF_RES) + 1;

export interface KitQuality {
  grass: number;
  shadows: boolean;
}

/** Read any (possibly interleaved / normalized) attribute into plain floats. */
function floats(attr: THREE.BufferAttribute | THREE.InterleavedBufferAttribute, size: number): Float32Array {
  const out = new Float32Array(attr.count * size);
  for (let i = 0; i < attr.count; i++) {
    out[i * size] = attr.getX(i);
    if (size > 1) out[i * size + 1] = attr.getY(i);
    if (size > 2) out[i * size + 2] = attr.getZ(i);
    if (size > 3) out[i * size + 3] = attr.itemSize > 3 ? attr.getW(i) : 1;
  }
  return out;
}

/**
 * Copy a mesh's geometry into a clean float geometry with the attributes the
 * world material expects. With `rise` it's baked into world space for merging;
 * without, it stays local for instancing (rise then comes per instance).
 */
function bakeGeometry(mesh: THREE.Mesh, sway: number, rise: [number, number] | null): THREE.BufferGeometry {
  const src = mesh.geometry;
  const g = new THREE.BufferGeometry();
  const pos = floats(src.getAttribute('position'), 3);
  const nrm = src.getAttribute('normal') ? floats(src.getAttribute('normal'), 3) : null;
  const col = src.getAttribute('color') ? floats(src.getAttribute('color'), 4) : null;
  const n = pos.length / 3;
  // Sway weight grows with height above the object's base (squared, so roots stay planted).
  let minY = Infinity;
  let maxY = -Infinity;
  for (let i = 0; i < n; i++) {
    minY = Math.min(minY, pos[i * 3 + 1]);
    maxY = Math.max(maxY, pos[i * 3 + 1]);
  }
  const swayA = new Float32Array(n);
  if (sway > 0) {
    const hgt = Math.max(0.01, maxY - minY);
    const amp = sway * Math.min(0.12, 0.03 * hgt);
    for (let i = 0; i < n; i++) {
      const k = (pos[i * 3 + 1] - minY) / hgt;
      swayA[i] = amp * k * k;
    }
  }
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.BufferAttribute(nrm ?? new Float32Array(n * 3), 3));
  g.setAttribute('color', new THREE.BufferAttribute(col ?? new Float32Array(n * 4).fill(1), 4));
  g.setAttribute('aSway', new THREE.BufferAttribute(swayA, 1));
  if (src.index) g.setIndex(src.index.clone());
  if (!nrm) g.computeVertexNormals();
  if (rise) {
    const riseA = new Float32Array(n * 2);
    for (let i = 0; i < n; i++) {
      riseA[i * 2] = rise[0];
      riseA[i * 2 + 1] = rise[1];
    }
    g.setAttribute('aRise', new THREE.BufferAttribute(riseA, 2));
    // applyMatrix4 leaves the custom attributes alone, which is what we want.
    g.applyMatrix4(mesh.matrixWorld);
  }
  return g;
}

/** One small tuft of grass blades, root dark → tip light (vertex colour), for instancing. */
function tuftGeometry(): THREE.BufferGeometry {
  const pos: number[] = [];
  const col: number[] = [];
  const sway: number[] = [];
  const idx: number[] = [];
  const blades = 5;
  for (let b = 0; b < blades; b++) {
    const a = (b / blades) * Math.PI * 2 + b * 0.7;
    const lean = 0.3 + (b % 3) * 0.15;
    const h = 0.26 + (b % 2) * 0.1;
    const w = 0.035;
    const dx = Math.cos(a);
    const dz = Math.sin(a);
    const px = -dz;
    const pz = dx;
    const ox = Math.cos(a * 3) * 0.05;
    const oz = Math.sin(a * 3) * 0.05;
    const base = pos.length / 3;
    const segs = 2;
    for (let s = 0; s <= segs; s++) {
      const t = s / segs;
      const ww = w * (1 - t * 0.92);
      const cx = ox + dx * lean * h * t * t;
      const cz = oz + dz * lean * h * t * t;
      const cy = h * t;
      pos.push(cx + px * ww, cy, cz + pz * ww, cx - px * ww, cy, cz - pz * ww);
      const shade = 0.45 + 0.75 * t;
      col.push(shade, shade, shade, shade, shade, shade);
      sway.push(t * t, t * t);
    }
    for (let s = 0; s < segs; s++) {
      const i0 = base + s * 2;
      idx.push(i0, i0 + 1, i0 + 3, i0, i0 + 3, i0 + 2);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(new Array(pos.length).fill(0).map((_, i) => (i % 3 === 1 ? 1 : 0)), 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setAttribute('aSway', new THREE.Float32BufferAttribute(sway.map((s) => s * 0.09), 1));
  g.setIndex(idx);
  return g;
}

let tuft: THREE.BufferGeometry | null = null;

export class EraKit {
  readonly group = new THREE.Group();
  readonly reveal: RevealUniforms = makeReveal();
  readonly anchors = new Map<string, Anchor>();
  readonly anim = new Map<string, THREE.Object3D>();
  readonly colliders: Collider[] = [];
  /** Point lights owned by this era (intensity scaled with presence). */
  readonly lights: { light: THREE.PointLight; base: number }[] = [];
  private heights = new Float32Array(HF_N * HF_N);
  /** Terrain colour on the same grid (tints the grass). */
  private ground = new Float32Array(HF_N * HF_N * 3);
  private hasHeights = false;
  private terrain: THREE.Mesh | null = null;
  private grass: THREE.InstancedMesh | null = null;
  private grassTotal = 0;
  private materials: THREE.Material[] = [];

  constructor(gltf: GLTF, quality: KitQuality) {
    const root = gltf.scene;
    root.updateMatrixWorld(true);
    const opaque: THREE.BufferGeometry[] = [];
    const glow: THREE.BufferGeometry[] = [];
    const animRoots: THREE.Object3D[] = [];

    root.traverse((o) => {
      const role = o.userData.role as string | undefined;
      if (role === 'anchor') {
        this.anchors.set(o.name, { name: o.name, pos: o.getWorldPosition(new THREE.Vector3()), data: { ...o.userData } });
      }
      if (role === 'anim') animRoots.push(o);
    });
    const inAnim = (o: THREE.Object3D): boolean => {
      for (let p: THREE.Object3D | null = o; p; p = p.parent) if (p.userData.role === 'anim') return true;
      return false;
    };

    // Static props: repeated templates become instanced meshes, one-offs are merged.
    interface Placed { mesh: THREE.Mesh; sway: number; rise: [number, number] }
    const byGeo = new Map<THREE.BufferGeometry, Placed[]>();
    let grassmap: THREE.Mesh | null = null;
    const walkable: THREE.Mesh[] = [];
    root.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh || inAnim(mesh)) return;
      // Props live on the node (or its parent, when glTF split a multi-material mesh).
      const node = mesh.userData.role !== undefined || mesh.userData.sway !== undefined || mesh.userData.col !== undefined ? mesh : (mesh.parent ?? mesh);
      const ud = { ...node.userData, ...mesh.userData };
      if (ud.role === 'terrain') {
        this.setupTerrain(mesh);
        return;
      }
      if (ud.role === 'grassmap') {
        grassmap = mesh;
        return;
      }
      const wp = node.getWorldPosition(new THREE.Vector3());
      mesh.geometry.computeBoundingBox();
      const bb = mesh.geometry.boundingBox!.clone().applyMatrix4(mesh.matrixWorld);
      const placed: Placed = { mesh, sway: Number(ud.sway ?? 0), rise: [Math.hypot(wp.x, wp.z), bb.max.y - bb.min.y + 0.4] };
      if (ud.walk) walkable.push(mesh);
      if ((mesh.material as THREE.Material).name === 'Glow') glow.push(bakeGeometry(mesh, 0, placed.rise));
      else {
        const list = byGeo.get(mesh.geometry) ?? [];
        list.push(placed);
        byGeo.set(mesh.geometry, list);
      }
      if (typeof ud.col === 'number' && ud.col > 0 && node === mesh) {
        this.colliders.push({ x: wp.x, z: wp.z, r: ud.col * node.getWorldScale(new THREE.Vector3()).x });
      }
    });
    // Colliders on multi-material groups.
    root.traverse((o) => {
      if (!(o as THREE.Mesh).isMesh && typeof o.userData.col === 'number' && o.userData.col > 0 && o.userData.role !== 'anchor') {
        const wp = o.getWorldPosition(new THREE.Vector3());
        if (!this.colliders.some((c) => Math.abs(c.x - wp.x) < 1e-3 && Math.abs(c.z - wp.z) < 1e-3)) {
          this.colliders.push({ x: wp.x, z: wp.z, r: o.userData.col * o.getWorldScale(new THREE.Vector3()).x });
        }
      }
    });

    const rev = this.reveal;
    const propMat = patchWorldMaterial(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.86, metalness: 0, envMapIntensity: 0.6 }), { sway: true, rise: true, reveal: rev });
    const propDepth = worldDepthMaterial({ sway: true, rise: true, reveal: rev });
    this.materials.push(propMat, propDepth);
    for (const list of byGeo.values()) {
      if (list.length === 1) {
        opaque.push(bakeGeometry(list[0].mesh, list[0].sway, list[0].rise));
        continue;
      }
      const geo = bakeGeometry(list[0].mesh, list[0].sway, null);
      const rise = new Float32Array(list.length * 2);
      const inst = new THREE.InstancedMesh(geo, propMat, list.length);
      list.forEach((p, i) => {
        inst.setMatrixAt(i, p.mesh.matrixWorld);
        rise[i * 2] = p.rise[0];
        rise[i * 2 + 1] = p.rise[1];
      });
      geo.setAttribute('aRise', new THREE.InstancedBufferAttribute(rise, 2));
      inst.instanceMatrix.needsUpdate = true;
      inst.castShadow = true;
      inst.receiveShadow = true;
      inst.customDepthMaterial = propDepth;
      inst.frustumCulled = false;
      inst.name = `inst:${list[0].mesh.name}`;
      this.group.add(inst);
    }
    if (opaque.length) {
      const geo = mergeGeometries(opaque.map((g) => (g.index ? g.toNonIndexed() : g)), false)!;
      const mesh = new THREE.Mesh(geo, propMat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.customDepthMaterial = propDepth;
      mesh.frustumCulled = false;
      mesh.name = 'props';
      this.group.add(mesh);
    }
    if (glow.length) {
      const geo = mergeGeometries(glow.map((g) => (g.index ? g.toNonIndexed() : g)), false)!;
      const mat = patchWorldMaterial(new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false, color: new THREE.Color(2.2, 2.2, 2.2) }), { sway: false, rise: true, reveal: rev });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.frustumCulled = false;
      mesh.name = 'glow';
      this.materials.push(mat);
      this.group.add(mesh);
    }

    for (const a of animRoots) {
      a.updateMatrixWorld(true);
      this.anim.set(a.name, a);
      a.traverse((o) => {
        const m = o as THREE.Mesh;
        if (!m.isMesh) return;
        const src = m.material as THREE.Material;
        const mat = src.name === 'Glow'
          ? patchWorldMaterial(new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false, color: new THREE.Color(2.2, 2.2, 2.2) }), { reveal: rev })
          : patchWorldMaterial(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.85 }), { reveal: rev });
        m.material = mat;
        m.castShadow = true;
        m.receiveShadow = true;
        m.customDepthMaterial = worldDepthMaterial({ reveal: rev });
        this.materials.push(mat);
      });
      this.group.add(a);
    }
    for (const w of walkable) {
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(floats(w.geometry.getAttribute('position'), 3), 3));
      if (w.geometry.index) g.setIndex(w.geometry.index.clone());
      g.applyMatrix4(w.matrixWorld);
      this.rasterize(g, true);
    }
    if (grassmap) this.scatterGrass(grassmap);
    this.setGrassDensity(quality.grass);
  }

  private setupTerrain(mesh: THREE.Mesh): void {
    const rev = this.reveal;
    // Quantized (int16) attributes can't be transformed in place: copy to floats first.
    const src = mesh.geometry;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(floats(src.getAttribute('position'), 3), 3));
    if (src.getAttribute('normal')) geo.setAttribute('normal', new THREE.BufferAttribute(floats(src.getAttribute('normal'), 3), 3));
    if (src.getAttribute('color')) geo.setAttribute('color', new THREE.BufferAttribute(floats(src.getAttribute('color'), 4), 4));
    if (src.index) geo.setIndex(src.index.clone());
    if (!src.getAttribute('normal')) geo.computeVertexNormals();
    geo.applyMatrix4(mesh.matrixWorld);
    const mat = patchWorldMaterial(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95, metalness: 0, envMapIntensity: 0.4 }), { reveal: rev });
    const t = new THREE.Mesh(geo, mat);
    t.receiveShadow = true;
    t.frustumCulled = false;
    t.name = 'terrain';
    this.terrain = t;
    this.materials.push(mat);
    this.group.add(t);
    this.rasterizeHeights(geo);
  }

  /** Rasterize terrain triangles into a regular heightfield around the arena. */
  private rasterizeHeights(geo: THREE.BufferGeometry): void {
    this.heights.fill(NaN);
    this.rasterize(geo, false);
    for (let i = 0; i < this.heights.length; i++) if (Number.isNaN(this.heights[i])) this.heights[i] = 0;
    this.hasHeights = true;
  }

  /**
   * Write triangles into the heightfield. Walkable props (`top`) only add
   * their upward-facing surfaces, and only where they're higher than the ground.
   */
  private rasterize(geo: THREE.BufferGeometry, top: boolean): void {
    const pos = geo.getAttribute('position');
    const col = geo.getAttribute('color');
    const idx = geo.index;
    const tri = idx ? idx.count / 3 : pos.count / 3;
    const a = new THREE.Vector3();
    const b = new THREE.Vector3();
    const c = new THREE.Vector3();
    const n = new THREE.Vector3();
    for (let t = 0; t < tri; t++) {
      const i0 = idx ? idx.getX(t * 3) : t * 3;
      const i1 = idx ? idx.getX(t * 3 + 1) : t * 3 + 1;
      const i2 = idx ? idx.getX(t * 3 + 2) : t * 3 + 2;
      a.fromBufferAttribute(pos, i0);
      b.fromBufferAttribute(pos, i1);
      c.fromBufferAttribute(pos, i2);
      if (top) {
        n.subVectors(b, a).cross(c.clone().sub(a)).normalize();
        if (Math.abs(n.y) < 0.7) continue;
      }
      const minX = Math.min(a.x, b.x, c.x);
      const maxX = Math.max(a.x, b.x, c.x);
      const minZ = Math.min(a.z, b.z, c.z);
      const maxZ = Math.max(a.z, b.z, c.z);
      if (maxX < -HF_HALF || minX > HF_HALF || maxZ < -HF_HALF || minZ > HF_HALF) continue;
      const gx0 = Math.max(0, Math.ceil((minX + HF_HALF) / HF_RES));
      const gx1 = Math.min(HF_N - 1, Math.floor((maxX + HF_HALF) / HF_RES));
      const gz0 = Math.max(0, Math.ceil((minZ + HF_HALF) / HF_RES));
      const gz1 = Math.min(HF_N - 1, Math.floor((maxZ + HF_HALF) / HF_RES));
      const det = (b.z - c.z) * (a.x - c.x) + (c.x - b.x) * (a.z - c.z);
      if (Math.abs(det) < 1e-9) continue;
      for (let gz = gz0; gz <= gz1; gz++) {
        const z = gz * HF_RES - HF_HALF;
        for (let gx = gx0; gx <= gx1; gx++) {
          const x = gx * HF_RES - HF_HALF;
          const l1 = ((b.z - c.z) * (x - c.x) + (c.x - b.x) * (z - c.z)) / det;
          const l2 = ((c.z - a.z) * (x - c.x) + (a.x - c.x) * (z - c.z)) / det;
          const l3 = 1 - l1 - l2;
          if (l1 < -1e-4 || l2 < -1e-4 || l3 < -1e-4) continue;
          const cell = gz * HF_N + gx;
          const y = l1 * a.y + l2 * b.y + l3 * c.y;
          if (top) {
            if (!(y > this.heights[cell])) continue;
            this.heights[cell] = y;
            continue;
          }
          this.heights[cell] = y;
          if (col) {
            for (let ch = 0; ch < 3; ch++) {
              const get = ch === 0 ? 'getX' : ch === 1 ? 'getY' : 'getZ';
              this.ground[cell * 3 + ch] = l1 * col[get](i0) + l2 * col[get](i1) + l3 * col[get](i2);
            }
          }
        }
      }
    }
  }

  /** Terrain colour at (x, z) (nearest cell), for tinting things that grow from it. */
  groundColor(x: number, z: number, out: THREE.Color): THREE.Color {
    const gx = Math.max(0, Math.min(HF_N - 1, Math.round((x + HF_HALF) / HF_RES)));
    const gz = Math.max(0, Math.min(HF_N - 1, Math.round((z + HF_HALF) / HF_RES)));
    const i = (gz * HF_N + gx) * 3;
    return out.setRGB(this.ground[i], this.ground[i + 1], this.ground[i + 2]);
  }

  /** Ground height at (x, z), bilinear over the heightfield (0 outside it). */
  height(x: number, z: number): number {
    if (!this.hasHeights) return 0;
    const fx = (x + HF_HALF) / HF_RES;
    const fz = (z + HF_HALF) / HF_RES;
    if (fx < 0 || fz < 0 || fx >= HF_N - 1 || fz >= HF_N - 1) return 0;
    const ix = Math.floor(fx);
    const iz = Math.floor(fz);
    const tx = fx - ix;
    const tz = fz - iz;
    const h = this.heights;
    const i = iz * HF_N + ix;
    return (h[i] * (1 - tx) + h[i + 1] * tx) * (1 - tz) + (h[i + HF_N] * (1 - tx) + h[i + HF_N + 1] * tx) * tz;
  }

  /**
   * Scatter grass tufts over the grassmap's triangles, weighted by area ×
   * painted density (its vertex colour), tinted by the terrain colour below.
   */
  private scatterGrass(map: THREE.Mesh): void {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(floats(map.geometry.getAttribute('position'), 3), 3));
    geo.setAttribute('dens', new THREE.BufferAttribute(floats(map.geometry.getAttribute('color'), 1), 1));
    if (map.geometry.index) geo.setIndex(map.geometry.index.clone());
    geo.applyMatrix4(map.matrixWorld);
    const dens = geo.getAttribute('dens');
    const pos = geo.getAttribute('position');
    const idx = geo.index;
    const tri = idx ? idx.count / 3 : pos.count / 3;
    const weights: number[] = [];
    const tris: number[] = [];
    const a = new THREE.Vector3();
    const b = new THREE.Vector3();
    const c = new THREE.Vector3();
    let total = 0;
    for (let t = 0; t < tri; t++) {
      const i0 = idx ? idx.getX(t * 3) : t * 3;
      const i1 = idx ? idx.getX(t * 3 + 1) : t * 3 + 1;
      const i2 = idx ? idx.getX(t * 3 + 2) : t * 3 + 2;
      const d = (dens.getX(i0) + dens.getX(i1) + dens.getX(i2)) / 3;
      if (d <= 0.02) continue;
      a.fromBufferAttribute(pos, i0);
      b.fromBufferAttribute(pos, i1);
      c.fromBufferAttribute(pos, i2);
      const area = b.clone().sub(a).cross(c.clone().sub(a)).length() / 2;
      // Concentrate blades where the camera can see them up close.
      const r = Math.hypot((a.x + b.x + c.x) / 3, (a.z + b.z + c.z) / 3);
      const near = r < 9 ? 1 : Math.pow(9 / r, 1.6);
      const w = area * d * near;
      total += w;
      weights.push(total);
      tris.push(i0, i1, i2);
    }
    if (total <= 0) return;
    const MAX = 16000;
    if (!tuft) tuft = tuftGeometry();
    const rev = this.reveal;
    const mat = patchWorldMaterial(new THREE.MeshLambertMaterial({ vertexColors: true }), { sway: true, reveal: rev });
    const grass = new THREE.InstancedMesh(tuft, mat, MAX);
    grass.receiveShadow = true;
    grass.frustumCulled = false;
    grass.name = 'grass';
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const s = new THREE.Vector3();
    const p = new THREE.Vector3();
    const up = new THREE.Vector3(0, 1, 0);
    const tint = new THREE.Color();
    // Deterministic scatter so the meadow is identical every visit.
    let seed = 1234567;
    const rnd = (): number => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    for (let i = 0; i < MAX; i++) {
      const u = rnd() * total;
      let lo = 0;
      let hi = weights.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (weights[mid] < u) lo = mid + 1;
        else hi = mid;
      }
      const i0 = tris[lo * 3];
      const i1 = tris[lo * 3 + 1];
      const i2 = tris[lo * 3 + 2];
      let r1 = rnd();
      let r2 = rnd();
      if (r1 + r2 > 1) {
        r1 = 1 - r1;
        r2 = 1 - r2;
      }
      a.fromBufferAttribute(pos, i0);
      b.fromBufferAttribute(pos, i1);
      c.fromBufferAttribute(pos, i2);
      p.copy(a).addScaledVector(b.clone().sub(a), r1).addScaledVector(c.clone().sub(a), r2);
      q.setFromAxisAngle(up, rnd() * Math.PI * 2);
      const sc = 0.55 + rnd() * 0.55;
      s.set(sc, sc * (0.8 + rnd() * 0.5), sc);
      m.compose(p, q, s);
      grass.setMatrixAt(i, m);
      // Blades a touch lighter than the ground they grow from.
      this.groundColor(p.x, p.z, tint).multiplyScalar(1.12 + rnd() * 0.18);
      grass.setColorAt(i, tint);
    }
    grass.instanceMatrix.needsUpdate = true;
    if (grass.instanceColor) grass.instanceColor.needsUpdate = true;
    this.grass = grass;
    this.grassTotal = MAX;
    this.materials.push(mat);
    this.group.add(grass);
  }

  /** 0–1 share of the grass to draw (quality tier). */
  setGrassDensity(k: number): void {
    if (this.grass) this.grass.count = Math.floor(this.grassTotal * Math.max(0, Math.min(1, k)));
  }

  setShadows(on: boolean): void {
    this.group.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh && m !== this.terrain && m !== this.grass) m.castShadow = on;
    });
  }

  anchor(name: string): Anchor | undefined {
    return this.anchors.get(name);
  }

  /** All anchors whose name starts with `prefix`. */
  anchorsOf(prefix: string): Anchor[] {
    return [...this.anchors.values()].filter((a) => a.name.startsWith(prefix));
  }

  /**
   * Transition state. `mode` +1 = incoming (visible inside `radius`),
   * -1 = outgoing (visible outside), 0 = settled.
   */
  setReveal(radius: number, mode: -1 | 0 | 1, seam: THREE.Color): void {
    const v = this.reveal.uReveal.value;
    v.x = mode === 0 ? 1e4 : radius;
    v.y = mode;
    this.reveal.uRevealColor.value.copy(seam);
    this.group.visible = !(mode === -1 && radius > 400);
  }

  dispose(): void {
    this.group.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh && m.geometry !== tuft) m.geometry.dispose();
    });
    for (const m of this.materials) m.dispose();
  }
}
