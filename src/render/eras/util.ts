import * as THREE from 'three';
import type { EraKit } from '../eraKit';
import type { PropContext } from '../eraProps';

/** Continuous emitter: calls `emit` at `rate` per second. */
export function emitter(rate: number, emit: () => void): (dt: number, scale?: number) => void {
  let acc = Math.random();
  return (dt, scale = 1) => {
    acc += dt * rate * scale;
    while (acc >= 1) {
      acc -= 1;
      emit();
    }
  };
}

/** A warm flickering practical light attached to the kit. */
export function fireLight(kit: EraKit, at: THREE.Vector3, color = 0xff8a3a, intensity = 7, distance = 9): THREE.PointLight {
  const light = new THREE.PointLight(color, intensity, distance, 1.6);
  light.position.copy(at).add(new THREE.Vector3(0, 0.55, 0));
  kit.group.add(light);
  kit.lights.push({ light, base: intensity });
  return light;
}

export function flame(ctx: PropContext, p: THREE.Vector3, scale = 1): void {
  ctx.particles.glow.spawn({
    x: p.x + (Math.random() - 0.5) * 0.2 * scale, y: p.y, z: p.z + (Math.random() - 0.5) * 0.2 * scale,
    vx: (Math.random() - 0.5) * 0.25, vy: 1.1 * scale + Math.random() * 0.5, vz: (Math.random() - 0.5) * 0.25,
    life: 0.45 + Math.random() * 0.3, size: 0.26 * scale, sizeEnd: 0.03,
    r: 3.2, g: 1.1 + Math.random() * 0.7, b: 0.22, drag: 1.2, gravity: -1.1, shape: 0,
  });
}

export interface Cloth {
  /** Ripple the cloth: `amp` as a share of its width, `freq` in rad/s. */
  wave(t: number, amp: number, freq: number): void;
}

/**
 * A hanging cloth (banner, flag) from a kit `anim` node, rippled on the CPU.
 * Works in the mesh's own (possibly quantized) units: the top edge stays put
 * and the swing grows toward the free end.
 */
export function clothOf(root: THREE.Object3D): Cloth {
  let mesh: THREE.Mesh | null = null;
  root.traverse((o) => {
    if (!mesh && (o as THREE.Mesh).isMesh) mesh = o as THREE.Mesh;
  });
  const m = mesh as THREE.Mesh | null;
  if (!m) return { wave() {} };
  const src = m.geometry.getAttribute('position');
  const n = src.count;
  const base = new Float32Array(n * 3);
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (let i = 0; i < n; i++) {
    const x = src.getX(i);
    const y = src.getY(i);
    base[i * 3] = x;
    base[i * 3 + 1] = y;
    base[i * 3 + 2] = src.getZ(i);
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  const attr = new THREE.BufferAttribute(base.slice(), 3);
  attr.setUsage(THREE.DynamicDrawUsage);
  m.geometry.setAttribute('position', attr);
  m.frustumCulled = false;
  const w = Math.max(1e-4, maxX - minX);
  const h = Math.max(1e-4, maxY - minY);
  const arr = attr.array as Float32Array;
  return {
    wave(t, amp, freq) {
      for (let i = 0; i < n; i++) {
        const u = (base[i * 3] - minX) / w;
        const d = (maxY - base[i * 3 + 1]) / h;
        const s = Math.sin(u * 5 + d * 4 - t * freq) * 0.7 + Math.sin(u * 2.3 - t * freq * 0.6 + 1.3) * 0.3;
        arr[i * 3 + 2] = base[i * 3 + 2] + s * amp * w * d;
        arr[i * 3] = base[i * 3] + Math.sin(d * 3 - t * freq * 0.8) * amp * 0.25 * w * d;
      }
      attr.needsUpdate = true;
    },
  };
}
