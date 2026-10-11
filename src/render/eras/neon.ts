import * as THREE from 'three';
import type { EraKit } from '../eraKit';
import type { PropContext } from '../eraProps';
import type { EraScript } from './index';
import { beam, rainField } from './fx3d';
import { emitter, fireLight } from './util';

/** Era V: rain streaks through the neon, steam off the noodle pot, holograms turn, the maglev and sky traffic pass. */
export function neonOverdrive(kit: EraKit, ctx: PropContext): EraScript {
  const p = ctx.particles;
  const rain = rainField(ctx.lite ? 450 : 1100, new THREE.Vector3(0, 6, 3));
  kit.group.add(rain);
  const rainMat = rain.material as THREE.ShaderMaterial;

  const steamAt = kit.anchor('fx_steam')?.pos ?? null;
  const steamCol = new THREE.Color(0xf0eef8);
  const steam = emitter(5, () => steamAt && p.smoke(steamAt, 1, steamCol, { size: 0.12, sizeEnd: 0.9, life: 2.2, vy: 0.7, vx: 0.15, a: 0.35 }));
  const lanterns = kit.anchorsOf('fx_lantern');
  const lantern = lanterns.length ? fireLight(kit, lanterns[1].pos.clone().add(new THREE.Vector3(0, -0.9, 0)), 0xff8a4a, 4, 6) : null;

  // Holograms: a soft cone of light and a slowly turning wireframe emblem.
  const holos = kit.anchorsOf('fx_holo').map((a, i) => {
    const col = new THREE.Color(a.data.color === 'magenta' ? 0xff3ad0 : 0x3af0ff);
    const cone = beam(col.clone().multiplyScalar(1.4), 1.1, 0.55);
    cone.position.copy(a.pos).add(new THREE.Vector3(0, -1.0, 0));
    kit.group.add(cone);
    const emblem = new THREE.LineSegments(
      new THREE.EdgesGeometry(i % 2 ? new THREE.OctahedronGeometry(0.42) : new THREE.IcosahedronGeometry(0.42)),
      new THREE.LineBasicMaterial({ color: col.clone().multiplyScalar(2.2), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }),
    );
    emblem.position.copy(a.pos).add(new THREE.Vector3(0, 0.4, 0));
    kit.group.add(emblem);
    return { cone, emblem, base: emblem.position.y, phase: i * 1.7 };
  });

  const train = kit.anim.get('maglev') ?? null;
  const pathA = kit.anchor('path_train_0')?.pos ?? new THREE.Vector3(-70, 4.95, -13.5);
  const pathB = kit.anchor('path_train_1')?.pos ?? new THREE.Vector3(70, 4.95, -13.5);
  let trainT = 3;
  let trainDir = 1;
  const cars = [...kit.anim.entries()].filter(([n]) => n.startsWith('skycar')).map(([, o], i) => ({
    o, y: o.position.y, z: o.position.z, x: o.position.x, dir: i % 2 ? -1 : 1, speed: 6 + i * 1.8, phase: i * 2.3,
  }));
  const beacon = kit.anchor('fx_beacon_0')?.pos ?? null;
  let blink = 0;
  const red = new THREE.Color(1, 0.2, 0.3);

  return {
    update(dt, t, presence) {
      const on = presence > 0.6;
      rainMat.uniforms.uTime.value = t;
      rainMat.uniforms.uFade.value = presence;
      if (on) steam(dt);
      if (lantern) lantern.intensity = (4 + Math.sin(t * 5.3) * 0.3 + Math.sin(t * 13.1) * 0.15) * presence;
      for (const h of holos) {
        h.emblem.rotation.y = t * 0.8 + h.phase;
        h.emblem.rotation.x = Math.sin(t * 0.5 + h.phase) * 0.3;
        h.emblem.position.y = h.base + Math.sin(t * 1.3 + h.phase) * 0.08;
        // A glitchy flicker now and then.
        const glitch = Math.sin(t * 23 + h.phase * 9) > 0.97 ? 0.3 : 1;
        (h.emblem.material as THREE.LineBasicMaterial).opacity = presence * glitch;
        (h.cone.material as THREE.ShaderMaterial).uniforms.uFade.value = presence * glitch;
      }
      if (train) {
        // Whoosh across, then a pause before the return run.
        trainT -= dt;
        const run = 7.5;
        if (trainT < -run) {
          trainT = 6 + Math.random() * 6;
          trainDir = -trainDir;
        }
        const u = trainT < 0 ? THREE.MathUtils.smootherstep(-trainT / run, 0, 1) : 0;
        const k = trainDir > 0 ? u : 1 - u;
        train.position.lerpVectors(pathA, pathB, k);
        train.visible = trainT < 0;
        train.rotation.y = trainDir > 0 ? 0 : Math.PI;
      }
      for (const c of cars) {
        c.x += c.dir * c.speed * dt;
        if (c.x > 75) c.x = -75;
        if (c.x < -75) c.x = 75;
        c.o.position.set(c.x, c.y + Math.sin(t * 0.7 + c.phase) * 0.6, c.z);
        c.o.rotation.set(0, c.dir > 0 ? Math.PI : 0, Math.sin(t * 0.9 + c.phase) * 0.06);
      }
      blink -= dt;
      if (beacon && blink <= 0 && on) {
        blink = 1.6;
        p.flash(beacon, red, 6, 0.4, 12);
      }
    },
  };
}
