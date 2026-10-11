import * as THREE from 'three';
import type { EraKit } from '../eraKit';
import type { PropContext } from '../eraProps';
import { Shape } from '../particles';
import type { EraScript } from './index';
import { emitter, fireLight } from './util';

/** Era III: chimneys and the boiler smoke, vents hiss, the gear wall grinds, lamps flicker, a train puffs past. */
export function freakdustrial(kit: EraKit, ctx: PropContext): EraScript {
  const p = ctx.particles;
  const chimneys = kit.anchorsOf('fx_chimney');
  const soot = new THREE.Color(0x3a3230);
  const chimneyEmit = emitter(ctx.lite ? 4 : 9, () => {
    const c = chimneys[Math.floor(Math.random() * chimneys.length)];
    if (c) p.smoke(c.pos, 1, soot, { size: 1.0, sizeEnd: 5, life: 7, vy: 1.6, vx: 0.9, a: 0.6 });
  });
  const boiler = kit.anchor('fx_boiler')?.pos ?? null;
  const boilerEmit = emitter(2, () => boiler && p.smoke(boiler, 1, new THREE.Color(0x5a5048), { size: 0.3, sizeEnd: 1.6, life: 3, vy: 1.2, vx: 0.3, a: 0.45 }));
  const vents = kit.anchorsOf('fx_vent');
  let ventT = 1;
  const lamps = kit.anchorsOf('fx_lamp');
  // Two of the nearest lamps get real light; the rest glow by themselves.
  const lights = lamps.slice(0, 2).map((a) => {
    const l = fireLight(kit, a.pos.clone().add(new THREE.Vector3(0, -0.5, 0)), 0xffb050, 3.2, 7);
    return l;
  });
  const boilerFire = fireLight(kit, new THREE.Vector3(-6.4, 0.6, -4.6), 0xff6a1a, 2.6, 5);
  const gears = [...kit.anim.entries()].filter(([n]) => n.startsWith('gear')).map(([, o]) => o);
  const train = kit.anim.get('locomotive') ?? null;
  const pathA = kit.anchor('path_train_0')?.pos ?? new THREE.Vector3(-60, 0.14, -12.5);
  const pathB = kit.anchor('path_train_1')?.pos ?? new THREE.Vector3(60, 0.14, -12.5);
  let trainU = 0.1;
  const steam = new THREE.Color(0xe8e4e0);
  const stack = new THREE.Vector3();

  return {
    update(dt, t, presence) {
      const on = presence > 0.6;
      if (on) {
        chimneyEmit(dt);
        boilerEmit(dt);
      }
      ventT -= dt;
      if (ventT <= 0 && on && vents.length) {
        ventT = 0.8 + Math.random() * 1.6;
        const v = vents[Math.floor(Math.random() * vents.length)].pos;
        for (let i = 0; i < 10; i++) {
          p.matter.spawn({
            x: v.x, y: v.y, z: v.z, vx: (Math.random() - 0.5) * 0.8, vy: 2.6 + Math.random() * 1.8, vz: (Math.random() - 0.5) * 0.8,
            life: 1.3, size: 0.25, sizeEnd: 1.3, r: 0.95, g: 0.94, b: 0.92, a: 0.5, drag: 2, shape: Shape.Smoke, delay: i * 0.03,
          });
        }
      }
      lights.forEach((l, i) => (l.intensity = (3 + Math.sin(t * 7 + i * 2) * 0.25 + (Math.random() < 0.01 ? -1.5 : 0)) * presence));
      boilerFire.intensity = (2.4 + Math.sin(t * 9) * 0.6) * presence;
      gears.forEach((g, i) => (g.rotation.z += dt * (i % 2 ? -0.35 : 0.28) * (i === 1 ? 1.4 : 1)));
      if (train) {
        // A loop: cross the yard, vanish into the haze, come back the other way.
        trainU = (trainU + dt * 0.022) % 2;
        const leg = trainU < 1 ? trainU : 2 - trainU;
        const dir = trainU < 1 ? 1 : -1;
        train.position.lerpVectors(pathA, pathB, leg);
        train.position.y = pathA.y + kit.height(train.position.x, train.position.z);
        train.rotation.y = dir > 0 ? 0 : Math.PI;
        if (on && Math.random() < dt * 9) {
          stack.set(1.5 * dir, 2.4, 0).add(train.position);
          p.smoke(stack, 1, steam, { size: 0.35, sizeEnd: 2.2, life: 2.6, vy: 1.4, vx: -dir * 1.2, a: 0.55 });
        }
      }
    },
  };
}
