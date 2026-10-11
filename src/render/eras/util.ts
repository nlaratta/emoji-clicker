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
