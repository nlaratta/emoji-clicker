import * as THREE from 'three';
import type { EraKit } from '../eraKit';
import type { PropContext } from '../eraProps';
import type { EraScript } from './index';
import { beam, pool } from './fx3d';
import { fireLight } from './util';

/** Era IV: searchlights sweep, lamps glow, a news chopper circles, traffic rolls round the ring road. */
export function shockAndAwe(kit: EraKit, ctx: PropContext): EraScript {
  const p = ctx.particles;
  const searches = kit.anchorsOf('fx_search').map((a, i) => {
    const pivot = new THREE.Group();
    pivot.position.copy(a.pos);
    const b = beam(new THREE.Color(0.55, 0.7, 1.0), 60, 3.2);
    pivot.add(b);
    kit.group.add(pivot);
    return { pivot, b, phase: i * 2.1 };
  });
  const lamps = kit.anchorsOf('fx_lamp');
  const sodium = new THREE.Color(1.0, 0.62, 0.28);
  const pools = lamps.map((a) => {
    const m = pool(sodium, 3.4);
    m.position.set(a.pos.x, a.pos.y - 3.96, a.pos.z);
    kit.group.add(m);
    return m;
  });
  const lights = lamps
    .slice()
    .sort((a, b) => b.pos.z - a.pos.z)
    .slice(0, 2)
    .map((a) => fireLight(kit, a.pos.clone().add(new THREE.Vector3(0, -0.7, 0)), 0xffb35a, 5, 8));
  const beacon = kit.anchor('fx_crane')?.pos ?? null;
  let blink = 0;
  const heli = kit.anim.get('helicopter') ?? null;
  const rotor = heli?.children.find((c) => c.name.endsWith('rotor')) ?? null;
  const cars = [...kit.anim.entries()].filter(([n]) => n.startsWith('traffic')).map(([, o], i) => ({ o, a: 1.95 + i * 0.75, speed: 0.12 + i * 0.03 }));
  const red = new THREE.Color(1, 0.15, 0.15);

  return {
    update(dt, t, presence) {
      for (const s of searches) {
        s.pivot.rotation.set(Math.sin(t * 0.33 + s.phase) * 0.45, 0, Math.sin(t * 0.21 + s.phase * 1.7) * 0.5);
        (s.b.material as THREE.ShaderMaterial).uniforms.uFade.value = presence;
      }
      for (const m of pools) (m.material as THREE.ShaderMaterial).uniforms.uFade.value = presence;
      lights.forEach((l, i) => (l.intensity = (5 + Math.sin(t * 50 + i) * 0.1) * presence));
      blink -= dt;
      if (beacon && blink <= 0 && presence > 0.8) {
        blink = 1.2;
        p.flash(beacon, red, 1.4, 0.35, 4);
      }
      if (heli) {
        const a = t * 0.16;
        heli.position.set(Math.sin(a) * 20, 15 + Math.sin(t * 0.5) * 0.8, -26 + Math.cos(a) * 9);
        heli.rotation.set(0.08, a + Math.PI / 2 + Math.PI, Math.sin(t * 0.3) * 0.05);
        if (rotor) rotor.rotation.y += dt * 28;
      }
      for (const c of cars) {
        // Round the back of the ring road; out of sight at either end.
        c.a += dt * c.speed;
        if (c.a > 4.3) c.a = 1.95;
        const r = 9.1;
        c.o.position.set(Math.sin(c.a) * r, 0.02, Math.cos(c.a) * r);
        const dx = Math.cos(c.a);
        const dz = -Math.sin(c.a);
        c.o.rotation.y = Math.atan2(-dz, dx);
      }
    },
  };
}
