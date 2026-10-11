import * as THREE from 'three';
import type { EraKit } from '../eraKit';
import type { PropContext } from '../eraProps';
import { Shape } from '../particles';
import type { EraScript } from './index';
import { clothOf, emitter, fireLight, flame, type Cloth } from './util';

/** Era II: banners ripple, the windmill turns, the forge glows, chimneys smoke and a dragon circles. */
export function middleAges(kit: EraKit, ctx: PropContext): EraScript {
  const p = ctx.particles;
  const forgeAt = kit.anchor('fx_forge')?.pos ?? new THREE.Vector3(-5, 1, -4.7);
  const light = fireLight(kit, forgeAt, 0xff7a2a, 4.5, 6);
  light.position.y = forgeAt.y + 0.3;
  const forgeEmit = emitter(ctx.lite ? 8 : 16, () => flame(ctx, forgeAt, 0.6));
  const sparkEmit = emitter(2.5, () =>
    p.glow.spawn({
      x: forgeAt.x, y: forgeAt.y + 0.2, z: forgeAt.z, vx: (Math.random() - 0.5) * 1.2, vy: 1.6 + Math.random(), vz: (Math.random() - 0.5) * 1.2,
      life: 0.9, size: 0.03, sizeEnd: 0.01, r: 4, g: 1.8, b: 0.4, gravity: 3, stretch: 0.02, shape: Shape.Spark,
    }),
  );
  const chimneys = kit.anchorsOf('fx_chimney');
  const smoke = new THREE.Color(0xd8d4cc);
  const smokeEmit = emitter(chimneys.length * 1.2, () => {
    const c = chimneys[Math.floor(Math.random() * chimneys.length)];
    if (c) p.smoke(c.pos, 1, smoke, { size: 0.3, sizeEnd: 1.6, life: 4, vy: 0.8, vx: 0.4, a: 0.35 });
  });

  const banners: Cloth[] = [];
  for (const [name, o] of kit.anim) if (name.startsWith('banner')) banners.push(clothOf(o));
  const sails = kit.anim.get('mill_sails') ?? null;

  // The dragon: a lazy figure-eight high over the castle, wings beating, now and then a puff of fire.
  const dragon = kit.anim.get('dragon') ?? null;
  const part = (s: string): THREE.Object3D | null => dragon?.children.find((c) => c.name.endsWith(s)) ?? null;
  const wingL = part('wingL');
  const wingR = part('wingR');
  const core = part('core');
  let roar = 6;

  return {
    update(dt, t, presence) {
      if (presence > 0.6) {
        forgeEmit(dt);
        sparkEmit(dt);
        smokeEmit(dt);
      }
      light.intensity = (4 + Math.sin(t * 11) * 0.8 + Math.sin(t * 23) * 0.4) * presence;
      for (const b of banners) b.wave(t, 0.16, 2.6);
      if (sails) sails.rotation.z = -t * 0.7;
      if (dragon) {
        const u = t * 0.045;
        const a = u * Math.PI * 2;
        dragon.position.set(Math.sin(a) * 46, 24 + Math.sin(a * 2) * 4, -52 + Math.sin(a * 2) * 16);
        // Face along the path's tangent (not the last frame's step, which is zero on a dt = 0 frame).
        dragon.rotation.y = Math.atan2(46 * Math.cos(a), 32 * Math.cos(a * 2));
        dragon.rotation.z = Math.cos(a) * 0.3;
        const flap = Math.sin(t * 3.4);
        if (wingL) wingL.rotation.z = flap * 0.55 - 0.1;
        if (wingR) wingR.rotation.z = -flap * 0.55 + 0.1;
        if (core) core.position.y = -flap * 0.12;
        roar -= dt;
        if (roar <= 0 && presence > 0.8) {
          roar = 7 + Math.random() * 6;
          const head = new THREE.Vector3(0, 0.7, 2.6).applyMatrix4(dragon.matrixWorld);
          const fwd = new THREE.Vector3(0, -0.2, 1).transformDirection(dragon.matrixWorld);
          for (let i = 0; i < 26; i++) {
            p.glow.spawn({
              x: head.x, y: head.y, z: head.z, vx: fwd.x * 9 + (Math.random() - 0.5) * 2, vy: fwd.y * 9 + (Math.random() - 0.5) * 2, vz: fwd.z * 9 + (Math.random() - 0.5) * 2,
              life: 0.7, size: 0.9, sizeEnd: 0.2, r: 3.2, g: 1.3 + Math.random() * 0.6, b: 0.3, drag: 1.6, shape: Shape.Glow, delay: i * 0.02,
            });
          }
        }
      }
    },
  };
}
