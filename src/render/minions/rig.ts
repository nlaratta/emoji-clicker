import * as THREE from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MatClass, splitByClass } from '../matclass';

/**
 * Jointed characters from minions.glb. Each part carries its game-space
 * pivot and parent part (glTF extras), so the rig is rebuilt here
 * independent of how the exporter or gltfpack arranged the nodes.
 */
export interface PartMesh {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
}

export interface RigPart {
  name: string;
  parent: number;
  /** Pivot offset from the parent's pivot (rest pose). */
  offset: THREE.Vector3;
  meshes: PartMesh[];
}

export interface Rig {
  id: string;
  parts: RigPart[];
  index: Record<string, number>;
}

/** Copy any (interleaved / quantized) attribute to plain floats. */
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

/** Bake a mesh into pivot-relative space as clean float geometry. */
function bakePart(mesh: THREE.Mesh, pivot: THREE.Vector3, src: THREE.BufferGeometry = mesh.geometry): THREE.BufferGeometry {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(floats(src.getAttribute('position'), 3), 3));
  if (src.getAttribute('normal')) g.setAttribute('normal', new THREE.BufferAttribute(floats(src.getAttribute('normal'), 3), 3));
  if (src.getAttribute('color')) g.setAttribute('color', new THREE.BufferAttribute(floats(src.getAttribute('color'), 4), 4));
  if (src.index) g.setIndex(src.index.clone());
  if (!src.getAttribute('normal')) g.computeVertexNormals();
  g.applyMatrix4(mesh.matrixWorld);
  g.translate(-pivot.x, -pivot.y, -pivot.z);
  g.computeBoundingSphere();
  return g;
}

const materials = new Map<MatClass, THREE.Material>();

/** Shared character materials by class: matte, gloss (eyes), metal (armour), glow. */
export function charMaterial(cls: MatClass): THREE.Material {
  let m = materials.get(cls);
  if (!m) {
    m = cls === MatClass.Gloss
      ? new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.12, metalness: 0, envMapIntensity: 1.6 })
      : cls === MatClass.Metal
        ? new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.32, metalness: 0.65, envMapIntensity: 1.3 })
        : cls === MatClass.Glow
          ? new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false, color: new THREE.Color(2.2, 2.2, 2.2) })
          : new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.78, metalness: 0, envMapIntensity: 0.7 });
    materials.set(cls, m);
  }
  return m;
}

/** A mesh's primitives, split back out by material class and baked to pivot space. */
function partMeshes(m: THREE.Mesh, pivot: THREE.Vector3): PartMesh[] {
  return [...splitByClass(m.geometry)].map(([cls, g]) => ({ geometry: bakePart(m, pivot, g), material: charMaterial(cls) }));
}

/** A part's own meshes: itself and any role-less descendants (gltfpack wrappers,
 *  multi-material primitive groups), stopping at child parts. */
function meshesOf(node: THREE.Object3D): THREE.Mesh[] {
  const out: THREE.Mesh[] = [];
  const visit = (o: THREE.Object3D): void => {
    if ((o as THREE.Mesh).isMesh) out.push(o as THREE.Mesh);
    for (const c of o.children) if (c.userData.role === undefined) visit(c);
  };
  visit(node);
  return out;
}

export function rigsFromGltf(gltf: GLTF): Map<string, Rig> {
  const root = gltf.scene;
  root.updateMatrixWorld(true);
  const rigs = new Map<string, Rig>();
  const pivots = new Map<string, THREE.Vector3>();
  const partNodes: THREE.Object3D[] = [];
  root.traverse((o) => {
    if (o.userData.role === 'part' && Array.isArray(o.userData.joint)) {
      partNodes.push(o);
      pivots.set(o.name, new THREE.Vector3(...(o.userData.joint as [number, number, number])));
    }
  });
  // Group parts by character: the id is the prefix before the first underscore.
  const byChar = new Map<string, THREE.Object3D[]>();
  for (const n of partNodes) {
    const id = n.name.split('_')[0];
    const list = byChar.get(id) ?? [];
    list.push(n);
    byChar.set(id, list);
  }
  for (const [id, nodes] of byChar) {
    // Topological order: parents before children.
    const ordered: THREE.Object3D[] = [];
    const placed = new Set<string>();
    while (ordered.length < nodes.length) {
      let progressed = false;
      for (const n of nodes) {
        if (placed.has(n.name)) continue;
        const parent = String(n.userData.parentPart ?? '');
        if (!parent || placed.has(parent)) {
          ordered.push(n);
          placed.add(n.name);
          progressed = true;
        }
      }
      if (!progressed) break;
    }
    const index: Record<string, number> = {};
    const parts: RigPart[] = ordered.map((n, i) => {
      const short = n.name.slice(id.length + 1);
      index[short] = i;
      const pivot = pivots.get(n.name)!;
      const parentName = String(n.userData.parentPart ?? '');
      const parentPivot = parentName ? pivots.get(parentName)! : new THREE.Vector3();
      return {
        name: short,
        parent: parentName ? ordered.findIndex((o) => o.name === parentName) : -1,
        offset: pivot.clone().sub(parentPivot),
        meshes: meshesOf(n).flatMap((m) => partMeshes(m, pivot)),
      };
    });
    rigs.set(id, { id, parts, index });
  }
  return rigs;
}

/** Loose props (projectiles, carried items): `role: gear`, centred on their origin. */
export function gearFromGltf(gltf: GLTF): Map<string, PartMesh[]> {
  const out = new Map<string, PartMesh[]>();
  gltf.scene.updateMatrixWorld(true);
  gltf.scene.traverse((o) => {
    if (o.userData.role !== 'gear') return;
    const pivot = o.getWorldPosition(new THREE.Vector3());
    out.set(o.name, meshesOf(o).flatMap((m) => partMeshes(m, pivot)));
  });
  return out;
}

/**
 * Pose: per part, local rotation (x, y, z Euler, radians), translation offset
 * and uniform scale, applied at the part's pivot on top of the rest pose.
 */
export const POSE_STRIDE = 7;

export function makePose(rig: Rig): Float32Array {
  const p = new Float32Array(rig.parts.length * POSE_STRIDE);
  for (let i = 0; i < rig.parts.length; i++) p[i * POSE_STRIDE + 6] = 1;
  return p;
}

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _e = new THREE.Euler();
const _t = new THREE.Vector3();
const _s = new THREE.Vector3();

/**
 * Draws many instances of one rig: an InstancedMesh per part primitive. Call
 * `begin`, `add` per unit, then `end`.
 */
export class Crowd {
  readonly group = new THREE.Group();
  readonly rig: Rig;
  private meshes: { part: number; mesh: THREE.InstancedMesh }[] = [];
  private world: THREE.Matrix4[];
  private n = 0;
  private capacity: number;
  private hidden = new THREE.Matrix4().makeScale(0, 0, 0);

  constructor(rig: Rig, capacity: number) {
    this.rig = rig;
    this.capacity = capacity;
    this.world = rig.parts.map(() => new THREE.Matrix4());
    rig.parts.forEach((p, pi) => {
      for (const pm of p.meshes) {
        const m = new THREE.InstancedMesh(pm.geometry, pm.material, capacity);
        m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        m.castShadow = true;
        m.receiveShadow = true;
        m.frustumCulled = false;
        m.count = 0;
        m.name = `${rig.id}:${p.name}`;
        this.meshes.push({ part: pi, mesh: m });
        this.group.add(m);
      }
    });
  }

  begin(): void {
    this.n = 0;
  }

  /** Add one instance. `tint` multiplies vertex colours (individual variation). */
  add(root: THREE.Matrix4, pose: Float32Array, tint: THREE.Color): void {
    if (this.n >= this.capacity) return;
    const parts = this.rig.parts;
    for (let i = 0; i < parts.length; i++) {
      const o = i * POSE_STRIDE;
      const p = parts[i];
      _t.set(p.offset.x + pose[o + 3], p.offset.y + pose[o + 4], p.offset.z + pose[o + 5]);
      _q.setFromEuler(_e.set(pose[o], pose[o + 1], pose[o + 2]));
      const sc = pose[o + 6];
      _s.set(sc, sc, sc);
      _m.compose(_t, _q, _s);
      this.world[i].multiplyMatrices(p.parent >= 0 ? this.world[p.parent] : root, _m);
    }
    for (const { part, mesh } of this.meshes) {
      mesh.setMatrixAt(this.n, pose[part * POSE_STRIDE + 6] <= 0.001 ? this.hidden : this.world[part]);
      mesh.setColorAt(this.n, tint);
    }
    this.n++;
  }

  /** World matrix of a part for the most recently added instance (for held items, hit points). */
  partWorld(name: string): THREE.Matrix4 {
    return this.world[this.rig.index[name]];
  }

  end(): void {
    for (const { mesh } of this.meshes) {
      mesh.count = this.n;
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }
  }

  setShadows(on: boolean): void {
    for (const { mesh } of this.meshes) mesh.castShadow = on;
  }
}

/** Instanced pool for one gear item (rocks in flight, bananas in hand). */
export class GearPool {
  readonly group = new THREE.Group();
  private meshes: THREE.InstancedMesh[] = [];
  private n = 0;
  private capacity: number;

  constructor(parts: PartMesh[], capacity: number) {
    this.capacity = capacity;
    for (const pm of parts) {
      const m = new THREE.InstancedMesh(pm.geometry, pm.material, capacity);
      m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      m.castShadow = true;
      m.frustumCulled = false;
      m.count = 0;
      this.meshes.push(m);
      this.group.add(m);
    }
  }

  begin(): void {
    this.n = 0;
  }

  add(m: THREE.Matrix4): void {
    if (this.n >= this.capacity) return;
    for (const mesh of this.meshes) mesh.setMatrixAt(this.n, m);
    this.n++;
  }

  end(): void {
    for (const mesh of this.meshes) {
      mesh.count = this.n;
      mesh.instanceMatrix.needsUpdate = true;
    }
  }
}
