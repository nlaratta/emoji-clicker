import * as THREE from 'three';

/**
 * Material classes baked into the art kits (see art/blender/kit.py
 * `encode_material_classes`): each face's real material travels in its
 * first UV as u = class / 4 + 1/8, because Blender's glTF exporter drops
 * vertex colours on all but the first material of a mesh.
 */
export const MatClass = { Matte: 0, Gloss: 1, Metal: 2, Glow: 3 } as const;
export type MatClass = (typeof MatClass)[keyof typeof MatClass];

/** Split a geometry into per-class geometries sharing its vertex buffers. */
export function splitByClass(src: THREE.BufferGeometry): Map<MatClass, THREE.BufferGeometry> {
  const out = new Map<MatClass, THREE.BufferGeometry>();
  const uv = src.getAttribute('uv');
  if (!uv) {
    out.set(MatClass.Matte, src);
    return out;
  }
  const index = src.index;
  const tris = index ? index.count / 3 : src.getAttribute('position').count / 3;
  const lists = new Map<MatClass, number[]>();
  for (let t = 0; t < tris; t++) {
    const a = index ? index.getX(t * 3) : t * 3;
    const cls = Math.max(0, Math.min(3, Math.floor(uv.getX(a) * 4))) as MatClass;
    let l = lists.get(cls);
    if (!l) lists.set(cls, (l = []));
    if (index) l.push(index.getX(t * 3), index.getX(t * 3 + 1), index.getX(t * 3 + 2));
    else l.push(t * 3, t * 3 + 1, t * 3 + 2);
  }
  if (lists.size === 1 && lists.has(MatClass.Matte) && index) {
    out.set(MatClass.Matte, src);
    return out;
  }
  for (const [cls, ids] of lists) {
    const g = new THREE.BufferGeometry();
    for (const [name, attr] of Object.entries(src.attributes)) g.setAttribute(name, attr);
    g.setIndex(ids);
    out.set(cls, g);
  }
  return out;
}
