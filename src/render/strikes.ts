import * as THREE from 'three';
import type { WeaponFamily } from '../content/weapons';
import { Shape, type Particles } from './particles';
import type { FlyingEmoji } from './sprites';
import type { CameraRig, ScreenFX } from './fx';

export const FAMILY_COLOR: Record<WeaponFamily, number> = {
  blunt: 0xffe2a8,
  blade: 0xdff4ff,
  arrow: 0xffd28a,
  bullet: 0xffcc55,
  explosive: 0xff7a2a,
  fire: 0xff6a1a,
  energy: 0x40e0ff,
  cosmic: 0xb070ff,
  reality: 0x7affd8,
};

export interface StrikeOpts {
  crit: boolean;
  weak: boolean;
  /** 0–1: how big this hit is relative to recent hits (drives scale). */
  power: number;
  screen: THREE.Vector2;
}

const C = new THREE.Color();
const tmp = new THREE.Vector3();
const tmp2 = new THREE.Vector3();

/** Weapon-specific hit delivery. Every family reads differently at a glance. */
export class Strikes {
  private p: Particles;
  private fly: FlyingEmoji;
  private rig: CameraRig;
  private screen: ScreenFX;
  private camera: THREE.Camera;
  private side = 1;

  constructor(p: Particles, fly: FlyingEmoji, rig: CameraRig, screen: ScreenFX, camera: THREE.Camera) {
    this.p = p;
    this.fly = fly;
    this.rig = rig;
    this.screen = screen;
    this.camera = camera;
  }

  /** Point just off-screen toward the camera, to the left or right. */
  private offscreen(side: number, up = 0.6): THREE.Vector3 {
    return new THREE.Vector3(side * 4.5, 1.25 + up, 4.5);
  }

  strike(family: WeaponFamily, emoji: string, hit: THREE.Vector3, normal: THREE.Vector3, o: StrikeOpts): void {
    const p = this.p;
    const color = C.set(FAMILY_COLOR[family]);
    const big = o.crit ? 1.7 : 1;
    const scale = (0.75 + o.power * 0.5) * big;
    this.side = -this.side;
    const side = this.side;
    const out = tmp.copy(hit).addScaledVector(normal, 0.05);

    // Universal impact: a small hot flash + sparks. Crits go big; normal pokes stay crisp.
    p.flash(out, color, o.crit ? 0.7 : 0.28, 0.12, o.crit ? 2.6 : 1.6);
    p.sparks(out, Math.round((o.crit ? 10 : 5) * scale), color, 3 * scale, { r: color.r * 2.4, g: color.g * 2.4, b: color.b * 2.4 });

    switch (family) {
      case 'blunt': {
        const from = hit.clone().addScaledVector(normal, 1.1).add(new THREE.Vector3(side * 0.9, 0.5, 0.3));
        this.fly.strike(emoji, from, hit.clone().addScaledVector(normal, 0.25), 0.05, 0.62 * scale, undefined, side > 0);
        p.smoke(out, o.crit ? 4 : 2, new THREE.Color(0xd8c8b0), { size: 0.18, sizeEnd: 0.6, life: 0.6 });
        if (o.crit) p.debris(out, 6, new THREE.Color(0xb89a70), 4);
        break;
      }
      case 'blade': {
        const from = hit.clone().addScaledVector(normal, 1.0).add(new THREE.Vector3(side * 0.8, 0.8, 0.3));
        this.fly.strike(emoji, from, hit.clone().addScaledVector(normal, 0.2), 0.05, 0.6 * scale, undefined, side > 0);
        const a = hit.clone().add(new THREE.Vector3(-side * 0.55, 0.45, 0.4).multiplyScalar(scale));
        const b = hit.clone().add(new THREE.Vector3(side * 0.55, -0.45, 0.4).multiplyScalar(scale));
        p.beam(a, b, new THREE.Color(1, 1, 1), 0.07 * scale, 0.16, 4);
        p.beam(a, b, color, 0.22 * scale, 0.2, 1.5);
        break;
      }
      case 'arrow': {
        const from = this.offscreen(side, 0.8);
        const d = hit.clone().sub(from);
        p.glow.spawn({ x: from.x, y: from.y, z: from.z, vx: d.x / 0.08, vy: d.y / 0.08, vz: d.z / 0.08, life: 0.08, size: 0.05, r: 3, g: 2.6, b: 1.6, stretch: 0.025, shape: Shape.Spark });
        this.fly.toss(emoji, hit.x, hit.y, hit.z + 0.3, side * 0.6, 1.2, 0.5, { life: 0.9, scale0: 0.5 * scale, scale1: 0.45, gravity: 8, spin: side * 6 });
        break;
      }
      case 'bullet': {
        const shots = o.crit ? 3 : 1;
        for (let i = 0; i < shots; i++) {
          const from = this.offscreen(side, 0.3 + i * 0.2);
          const d = hit.clone().sub(from);
          p.glow.spawn({ x: from.x, y: from.y, z: from.z, vx: d.x / 0.06, vy: d.y / 0.06, vz: d.z / 0.06, life: 0.06, size: 0.04, r: 4, g: 3.2, b: 1.2, stretch: 0.02, shape: Shape.Spark, delay: i * 0.04 });
          // Ejected casing.
          p.matter.spawn({ x: from.x * 0.7, y: from.y, z: from.z * 0.7, vx: -side * 1.5, vy: 3, vz: 0.5, life: 0.8, size: 0.05, r: 0.95, g: 0.75, b: 0.3, gravity: 14, shape: Shape.Chunk });
        }
        this.fly.toss(emoji, hit.x + side * 1.4, hit.y + 0.2, hit.z + 1.6, -side * 0.5, 0.6, 0, { life: 0.35, scale0: 0.5, scale1: 0.55, gravity: 0, spin: 0 });
        p.flash(out, new THREE.Color(1, 0.9, 0.5), 0.5, 0.08, 5);
        break;
      }
      case 'explosive': {
        for (let i = 0; i < Math.round(14 * scale); i++) {
          const th = Math.random() * Math.PI * 2;
          const ph = Math.random() * Math.PI;
          const v = 1.5 + Math.random() * 2.5 * scale;
          p.glow.spawn({
            x: out.x, y: out.y, z: out.z,
            vx: Math.cos(th) * Math.sin(ph) * v, vy: Math.cos(ph) * v + 0.5, vz: Math.sin(th) * Math.sin(ph) * v + 1,
            life: 0.45 + Math.random() * 0.3, size: 0.45 * scale, sizeEnd: 0.1, r: 3.6, g: 1.4 + Math.random(), b: 0.3, drag: 3.5, shape: Shape.Glow,
          });
        }
        p.smoke(out, Math.round(5 * scale), new THREE.Color(0x3a3230), { size: 0.4, sizeEnd: 1.6, life: 1.2 });
        p.debris(out, Math.round(6 * scale), new THREE.Color(0x6a5a4a), 5);
        p.ring(out, new THREE.Color(1, 0.6, 0.2), 3.2 * scale, 0.4, 3);
        this.fly.toss(emoji, hit.x, hit.y + 0.3, hit.z + 0.8, side * 2.5, 4, 1.5, { life: 0.9, scale0: 0.55, scale1: 0.4, gravity: 12, spin: side * 12 });
        this.rig.addTrauma(0.18 * scale);
        this.screen.shockwave(o.screen, 0.6 * scale);
        break;
      }
      case 'fire': {
        const from = this.offscreen(side, 0.1);
        for (let i = 0; i < Math.round(16 * scale); i++) {
          const d = hit.clone().sub(from).multiplyScalar(1 / 0.28);
          p.glow.spawn({
            x: from.x, y: from.y, z: from.z, vx: d.x + (Math.random() - 0.5), vy: d.y + Math.random(), vz: d.z,
            life: 0.32, size: 0.15, sizeEnd: 0.6, r: 3.6, g: 1.2 + Math.random() * 0.8, b: 0.2, delay: i * 0.008, shape: Shape.Glow,
          });
        }
        for (let i = 0; i < 8; i++) {
          p.glow.spawn({ x: out.x, y: out.y, z: out.z, vx: (Math.random() - 0.5) * 2, vy: 1.5 + Math.random() * 2, vz: 1, life: 1.2, size: 0.04, r: 4, g: 1.6, b: 0.3, drag: 1, gravity: -0.5, shape: Shape.Glow });
        }
        break;
      }
      case 'energy': {
        const from = tmp2.set(side * 3.5, 9, 3).clone();
        p.beam(from, hit, new THREE.Color(1, 1, 1), 0.06 * scale, 0.16, 5);
        p.beam(from, hit, color, 0.3 * scale, 0.22, 2.2);
        for (let i = 0; i < 3; i++) {
          // Electric arcs crawling over the face.
          const a = out.clone();
          const b = out.clone().add(new THREE.Vector3((Math.random() - 0.5) * 0.9, (Math.random() - 0.5) * 0.9, 0.2));
          p.beam(a, b, color, 0.03, 0.1, 4);
        }
        if (o.crit) this.screen.shockwave(o.screen, 0.5);
        break;
      }
      case 'cosmic': {
        for (let i = 0; i < Math.round(22 * scale); i++) {
          const th = (i / 22) * Math.PI * 2;
          const r = 1.1 * scale;
          const o2 = out.clone().add(new THREE.Vector3(Math.cos(th) * r, Math.sin(th) * r, 0.2));
          const d = out.clone().sub(o2).multiplyScalar(1 / 0.35);
          p.glow.spawn({ x: o2.x, y: o2.y, z: o2.z, vx: d.x - Math.sin(th) * 2, vy: d.y + Math.cos(th) * 2, vz: d.z, life: 0.35, size: 0.07, r: 2.4, g: 1.2, b: 4, stretch: 0.05, shape: Shape.Spark });
        }
        p.glow.spawn({ x: out.x, y: out.y, z: out.z, life: 0.6, size: 0.25, sizeEnd: 0.8, r: 3, g: 2.5, b: 4, shape: Shape.Star });
        p.ring(out, color, 2.6 * scale, 0.5, 2.4);
        this.screen.shockwave(o.screen, 0.45 * scale);
        break;
      }
      case 'reality': {
        for (let i = 0; i < Math.round(16 * scale); i++) {
          const hue = Math.random();
          const c = new THREE.Color().setHSL(hue, 1, 0.6).multiplyScalar(3);
          p.glow.spawn({
            x: out.x, y: out.y, z: out.z,
            vx: (Math.random() - 0.5) * 6, vy: (Math.random() - 0.5) * 6, vz: Math.random() * 3,
            life: 0.5, size: 0.12, sizeEnd: 0.02, r: c.r, g: c.g, b: c.b, drag: 3, shape: Shape.Chunk,
          });
        }
        this.screen.glitchBurst(o.crit ? 0.9 : 0.35, o.crit ? 0.18 : 0.06);
        this.screen.aberration(0.006);
        break;
      }
    }

    if (o.crit) {
      p.ring(out, new THREE.Color(1, 0.95, 0.6), 3.2, 0.42, 2.2);
      p.glow.spawn({ x: out.x, y: out.y, z: out.z + 0.1, life: 0.45, size: 0.3, sizeEnd: 0.9, r: 2.6, g: 2.3, b: 1.3, shape: Shape.Star });
      this.rig.addTrauma(0.22);
      this.rig.punch(0.6);
      this.screen.aberration(0.0015);
    } else {
      this.rig.addTrauma(0.05 + 0.05 * o.power);
    }
    if (o.weak) {
      p.ring(out, new THREE.Color(1, 0.25, 0.45), 2.4, 0.35, 2.6);
      p.ring(out, new THREE.Color(1, 0.25, 0.45), 1.4, 0.25, 2.6);
    }
    void this.camera;
  }
}
