import * as THREE from 'three';
import type { EraKit } from '../eraKit';
import type { PropContext } from '../eraProps';
import { Shape } from '../particles';
import type { EraScript } from './index';
import { emitter, fireLight, flame } from './util';

interface Walker {
  root: THREE.Object3D;
  legs: THREE.Object3D[];
  head: THREE.Object3D | null;
  tail: THREE.Object3D | null;
  body: THREE.Object3D | null;
  /** Phase along the patrol (0–1 one way, 1–2 back). */
  u: number;
  speed: number;
  offset: THREE.Vector3;
  scale: number;
  stride: number;
}

/** Era I: campfire, embers and smoke, a smoking volcano, fireflies, and mammoths on the plain. */
export function stoneAge(kit: EraKit, ctx: PropContext): EraScript {
  const p = ctx.particles;
  const fireAt = kit.anchor('fx_fire')?.pos ?? new THREE.Vector3(-3.7, 0.1, -2.5);
  const light = fireLight(kit, fireAt, 0xff8a3a, 7, 10);
  const fireEmit = emitter(ctx.lite ? 16 : 34, () => flame(ctx, fireAt.clone().setY(fireAt.y + 0.08)));
  const sparkEmit = emitter(3, () =>
    p.glow.spawn({
      x: fireAt.x + (Math.random() - 0.5) * 0.3, y: fireAt.y + 0.4, z: fireAt.z + (Math.random() - 0.5) * 0.3,
      vx: (Math.random() - 0.5) * 0.6, vy: 1.8 + Math.random() * 1.4, vz: (Math.random() - 0.5) * 0.6,
      life: 1.6, size: 0.035, sizeEnd: 0.01, r: 4, g: 1.6, b: 0.4, drag: 0.6, stretch: 0.02, shape: Shape.Spark,
    }),
  );
  const smokeCol = new THREE.Color(0x6a5a5a);
  const smokeEmit = emitter(2.2, () =>
    p.smoke(fireAt.clone().setY(fireAt.y + 0.9), 1, smokeCol, { size: 0.25, sizeEnd: 1.4, life: 3.4, vy: 0.7, vx: 0.25, a: 0.32 }),
  );
  const volcanoAt = kit.anchor('fx_volcano')?.pos ?? new THREE.Vector3(28, 23.5, -78);
  const plume = new THREE.Color(0x4a3a40);
  const volcanoEmit = emitter(1.6, () =>
    p.smoke(volcanoAt.clone().add(new THREE.Vector3((Math.random() - 0.5) * 2, 0, (Math.random() - 0.5) * 2)), 1, plume, {
      size: 3, sizeEnd: 11, life: 9, vy: 2.4, vx: 1.2, a: 0.55,
    }),
  );
  // Fireflies drifting over the meadow at dusk.
  const flyEmit = emitter(ctx.lite ? 3 : 7, () => {
    const a = Math.random() * Math.PI * 2;
    const r = 3.5 + Math.random() * 7;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r - 2;
    p.glow.spawn({
      x, y: kit.height(x, z) + 0.3 + Math.random() * 1.2, z,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.3) * 0.18, vz: (Math.random() - 0.5) * 0.35,
      life: 2.6 + Math.random() * 2, size: 0.045, sizeEnd: 0.02, r: 2.2, g: 2.6, b: 0.7, shape: Shape.Glow, delay: Math.random() * 0.5,
    });
  });

  // Mammoths: an adult and a calf patrol the far plain between two anchors.
  const walkers: Walker[] = [];
  const pathA = kit.anchor('path_mammoth_0')?.pos ?? new THREE.Vector3(-30, 0, -26);
  const pathB = kit.anchor('path_mammoth_1')?.pos ?? new THREE.Vector3(30, 0, -24);
  const proto = kit.anim.get('mammoth');
  if (proto) {
    const mk = (root: THREE.Object3D, u: number, scale: number, offset: THREE.Vector3): Walker => {
      const find = (suffix: string): THREE.Object3D | null => root.children.find((c) => c.name.endsWith(suffix)) ?? null;
      root.scale.setScalar(scale);
      return {
        root,
        legs: [0, 1, 2, 3].map((i) => find(`leg${i}`)).filter((x): x is THREE.Object3D => !!x),
        head: find('head'),
        tail: find('tail'),
        body: find('body'),
        u,
        speed: 0.022,
        offset,
        scale,
        stride: 0,
      };
    };
    walkers.push(mk(proto, 0.15, 1, new THREE.Vector3()));
    const calf = proto.clone(true);
    kit.group.add(calf);
    walkers.push(mk(calf, 0.15, 0.55, new THREE.Vector3(-3.2, 0, 1.6)));
  }
  const tmp = new THREE.Vector3();
  const dir = new THREE.Vector3();

  return {
    update(dt, t, presence) {
      const on = presence > 0.6;
      if (on) {
        fireEmit(dt);
        sparkEmit(dt);
        smokeEmit(dt);
        volcanoEmit(dt);
        flyEmit(dt);
      }
      light.intensity = (6 + Math.sin(t * 13) * 1.1 + Math.sin(t * 29) * 0.7 + Math.sin(t * 5.3) * 0.6) * presence;

      for (const w of walkers) {
        // Ping-pong patrol with a pause at each end to graze.
        w.u = (w.u + dt * w.speed) % 2;
        const leg = w.u < 1 ? w.u : 2 - w.u;
        const pause = Math.min(1, Math.min(leg, 1 - leg) * 14);
        const k = THREE.MathUtils.smoothstep(leg, 0, 1);
        tmp.lerpVectors(pathA, pathB, k).add(w.offset);
        tmp.z += Math.sin(k * Math.PI * 2) * 2.5;
        dir.copy(pathB).sub(pathA).multiplyScalar(w.u < 1 ? 1 : -1);
        const ground = kit.height(tmp.x, tmp.z);
        w.root.position.set(tmp.x, ground, tmp.z);
        const yaw = Math.atan2(-dir.x, -dir.z);
        w.root.rotation.y += (yaw - w.root.rotation.y) * Math.min(1, dt * 1.5);
        w.stride += dt * 2.6 * pause / w.scale ** 0.5;
        const s = Math.sin(w.stride);
        w.legs.forEach((l, i) => (l.rotation.x = (i === 0 || i === 3 ? s : -s) * 0.32 * pause));
        if (w.body) w.body.position.y = 1.75 + Math.abs(Math.cos(w.stride)) * 0.06 * pause;
        if (w.head) w.head.rotation.x = Math.sin(w.stride * 2) * 0.05 + (1 - pause) * (0.25 + Math.sin(t * 0.8) * 0.1);
        if (w.tail) w.tail.rotation.z = Math.sin(t * 2.3 + w.u * 9) * 0.35;
      }
    },
  };
}
