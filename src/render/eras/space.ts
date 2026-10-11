import * as THREE from 'three';
import type { EraKit } from '../eraKit';
import type { PropContext } from '../eraProps';
import { Shape } from '../particles';
import type { EraScript } from './index';
import { emitter, fireLight } from './util';

/** Era VI: boulders drift in the low gravity, the dish slews, a rover patrols, crystals pulse, meteors streak by. */
export function spaceOutpost(kit: EraKit, ctx: PropContext): EraScript {
  const p = ctx.particles;
  const floaters = [...kit.anim.entries()].filter(([n]) => n.startsWith('float')).map(([, o], i) => ({
    o, base: o.position.clone(), phase: i * 1.37, spin: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).multiplyScalar(0.3),
  }));
  const dish = kit.anim.get('dish') ?? null;
  const bowl = dish?.children.find((c) => c.name.includes('bowl')) ?? null;
  const rover = kit.anim.get('rover') ?? null;
  const pathA = kit.anchor('path_rover_0')?.pos ?? new THREE.Vector3(-4, 0, -14.3);
  const pathB = kit.anchor('path_rover_1')?.pos ?? new THREE.Vector3(5.5, 0, -14.8);
  let roverU = 0.3;
  const beacons = kit.anchorsOf('fx_beacon');
  let blink = 0;
  const red = new THREE.Color(1, 0.25, 0.25);
  const crystals = kit.anchorsOf('fx_crystal');
  const glows = crystals.slice(0, 2).map((a) => fireLight(kit, a.pos.clone().add(new THREE.Vector3(0, 0.2, 0)), 0xb06aff, 3, 6));
  const vent = kit.anchor('fx_vent_0')?.pos ?? null;
  let ventT = 3;
  const meteor = emitter(0.35, () => {
    // A streak high across the sky, far behind the outpost.
    const y = 30 + Math.random() * 30;
    const z = -120 - Math.random() * 60;
    const x0 = -120 + Math.random() * 60;
    const life = 0.9 + Math.random() * 0.5;
    p.glow.spawn({
      x: x0, y, z, vx: 160 + Math.random() * 60, vy: -25 - Math.random() * 20, vz: 0,
      life, size: 0.9, sizeEnd: 0.2, r: 3, g: 2.6, b: 2.2, shape: Shape.Spark, stretch: 0.07,
    });
  });
  const motes = emitter(ctx.lite ? 3 : 8, () => {
    const a = Math.random() * Math.PI * 2;
    const d = 2 + Math.random() * 8;
    p.glow.spawn({
      x: Math.sin(a) * d, y: Math.random() * 0.5, z: Math.cos(a) * d - 2,
      vx: (Math.random() - 0.5) * 0.2, vy: 0.25 + Math.random() * 0.3, vz: (Math.random() - 0.5) * 0.2,
      life: 4 + Math.random() * 3, size: 0.035, sizeEnd: 0.01, r: 0.9, g: 0.8, b: 1.3, shape: Shape.Glow,
    });
  });

  return {
    update(dt, t, presence) {
      const on = presence > 0.6;
      for (const f of floaters) {
        f.o.position.set(f.base.x + Math.sin(t * 0.13 + f.phase) * 0.6, f.base.y + Math.sin(t * 0.31 + f.phase) * 0.7, f.base.z + Math.cos(t * 0.11 + f.phase) * 0.5);
        f.o.rotation.x += f.spin.x * dt;
        f.o.rotation.y += f.spin.y * dt;
        f.o.rotation.z += f.spin.z * dt;
      }
      if (bowl) bowl.rotation.y = Math.sin(t * 0.07) * 0.9;
      if (rover) {
        // Out and back along the track behind the pad, turning at each end.
        roverU = (roverU + dt * 0.045) % 2;
        const leg = roverU < 1 ? roverU : 2 - roverU;
        const k = THREE.MathUtils.smootherstep(leg, 0, 1);
        rover.position.lerpVectors(pathA, pathB, k);
        rover.position.y = kit.height(rover.position.x, rover.position.z);
        const dir = roverU < 1 ? 1 : -1;
        rover.rotation.y = dir > 0 ? Math.PI : 0;
        rover.rotation.z = Math.sin(t * 3.1) * 0.015;
      }
      blink -= dt;
      if (blink <= 0 && on) {
        blink = 1.4;
        for (const b of beacons) p.flash(b.pos, red, 1.0, 0.3, 4);
      }
      glows.forEach((g, i) => (g.intensity = (2.4 + Math.sin(t * 1.3 + i * 2) * 1.2) * presence));
      ventT -= dt;
      if (vent && on && ventT <= 0) {
        ventT = 4 + Math.random() * 5;
        p.smoke(vent, 6, new THREE.Color(0xe8e8f0), { size: 0.3, sizeEnd: 1.6, life: 1.6, vy: 0.5, a: 0.4 });
      }
      if (on) {
        meteor(dt);
        motes(dt);
      }
    },
  };
}
