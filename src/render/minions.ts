import * as THREE from 'three';
import { PRODUCERS } from '../content/producers';
import { SpriteBatch, type EmojiAtlas, type FlyingEmoji, type SpriteSlot } from './sprites';
import { Shape, type Particles } from './particles';

/**
 * Idle production made visible: every minion type you own shows up around
 * the arena and keeps attacking the Freakmoji in its own way. Visual rate
 * scales with log(owned) and is capped, so 10,000 minions stay readable.
 */
type Attack = 'lunge' | 'throw' | 'catapult' | 'charge' | 'steam' | 'slap' | 'tracer' | 'strafe' | 'drone' | 'orbital' | 'moon' | 'pull' | 'paper' | 'clone';

interface Visual {
  emoji: string;
  attack: Attack;
  max: number;
  /** [min, max] radius and base height of the layout. */
  radius: [number, number];
  height: number;
  scale: number;
  /** Base attacks per second (before the log-owned boost). */
  rate: number;
  color: number;
}

const VISUALS: Record<string, Visual> = {
  monkey: { emoji: '🐒', attack: 'lunge', max: 8, radius: [2.35, 2.6], height: 0.55, scale: 0.75, rate: 1.2, color: 0xffe0a0 },
  gorilla: { emoji: '🦍', attack: 'throw', max: 6, radius: [3.3, 4.2], height: 0.65, scale: 1.1, rate: 0.8, color: 0xc8b8a8 },
  trebuchet: { emoji: '🏰', attack: 'catapult', max: 3, radius: [8, 9.5], height: 1.3, scale: 2.4, rate: 0.35, color: 0xffb070 },
  knight: { emoji: '🏇', attack: 'charge', max: 4, radius: [4.6, 5.4], height: 0.8, scale: 1.4, rate: 0.5, color: 0xd8e4ff },
  steam: { emoji: '⚙️', attack: 'steam', max: 6, radius: [2.9, 3.2], height: 1.3, scale: 0.7, rate: 0.8, color: 0xffffff },
  factory: { emoji: '🏭', attack: 'slap', max: 2, radius: [7, 8], height: 1.6, scale: 3, rate: 0.6, color: 0xffd0a0 },
  turret: { emoji: '🎯', attack: 'tracer', max: 6, radius: [3.6, 4.4], height: 0.5, scale: 0.8, rate: 2.2, color: 0xffd060 },
  jet: { emoji: '✈️', attack: 'strafe', max: 3, radius: [9, 12], height: 6, scale: 1.4, rate: 0.25, color: 0xffe080 },
  drone: { emoji: '🛸', attack: 'drone', max: 10, radius: [2.6, 3.3], height: 1.9, scale: 0.5, rate: 2.0, color: 0x60ffe0 },
  orbital: { emoji: '🛰️', attack: 'orbital', max: 4, radius: [5, 7], height: 11, scale: 1.4, rate: 0.5, color: 0xff4060 },
  moon: { emoji: '🌕', attack: 'moon', max: 1, radius: [16, 16], height: 13, scale: 6, rate: 0.45, color: 0xfff0b0 },
  blackhole: { emoji: '🕳️', attack: 'pull', max: 1, radius: [11, 11], height: 4.5, scale: 4.5, rate: 2.5, color: 0xa060ff },
  printer: { emoji: '🖨️', attack: 'paper', max: 3, radius: [4.8, 5.4], height: 1.0, scale: 1.1, rate: 1.2, color: 0xffffff },
  paradox: { emoji: '♾️', attack: 'clone', max: 4, radius: [6, 7], height: 3.2, scale: 1.2, rate: 1.0, color: 0x80ffd0 },
};

interface Unit {
  slot: SpriteSlot;
  base: THREE.Vector3;
  angle: number;
  phase: number;
  lunge: number;
}

interface Group {
  id: string;
  vis: Visual;
  units: Unit[];
  owned: number;
  acc: number;
  color: THREE.Color;
}

export interface ImpactFn {
  (point: THREE.Vector3, strength: number, color: THREE.Color): void;
}

const TARGET = new THREE.Vector3(0, 1.25, 0);

export class Minions {
  readonly batch: SpriteBatch;
  private groups: Group[] = [];
  private free: SpriteSlot[];
  private fly: FlyingEmoji;
  private particles: Particles;
  private onImpact: ImpactFn;
  private time = 0;
  private tmp = new THREE.Vector3();
  private tmp2 = new THREE.Vector3();
  /** Multiplier on attack rate (Minion Rally, frenzies). */
  frenzy = 1;
  /** Global visual activity scale (quality). */
  activity = 1;
  private pending: { at: number; fn: () => void }[] = [];

  private later(sec: number, fn: () => void): void {
    if (this.pending.length < 200) this.pending.push({ at: this.time + sec, fn });
  }

  constructor(atlas: EmojiAtlas, fly: FlyingEmoji, particles: Particles, onImpact: ImpactFn) {
    this.batch = new SpriteBatch(atlas, 80, { renderOrder: 6 });
    this.free = [...this.batch.slots];
    this.fly = fly;
    this.particles = particles;
    this.onImpact = onImpact;
    PRODUCERS.forEach((p, i) => {
      const vis = VISUALS[p.id];
      if (vis) this.groups.push({ id: p.id, vis, units: [], owned: 0, acc: Math.random(), color: new THREE.Color(vis.color) });
      void i;
    });
  }

  /** Sync unit counts with the simulation. */
  sync(producers: Record<string, number>): void {
    for (const g of this.groups) {
      const owned = producers[g.id] ?? 0;
      g.owned = owned;
      const want = Math.min(g.vis.max, owned);
      while (g.units.length < want) this.spawnUnit(g, g.units.length);
      while (g.units.length > want) {
        const u = g.units.pop()!;
        u.slot.visible = false;
        this.free.push(u.slot);
      }
    }
  }

  private spawnUnit(g: Group, index: number): void {
    const slot = this.free.pop();
    if (!slot) return;
    const v = g.vis;
    // Spread units across the sides and back, alternating left/right.
    const side = index % 2 === 0 ? -1 : 1;
    const k = Math.floor(index / 2);
    const spreadMax = v.attack === 'drone' ? Math.PI : 1.25;
    const angle = v.attack === 'drone' ? (index / v.max) * Math.PI * 2 : Math.PI + side * (0.5 + (k / Math.max(1, v.max / 2)) * spreadMax);
    const rad = v.radius[0] + ((index * 0.37) % 1) * (v.radius[1] - v.radius[0]);
    const base = new THREE.Vector3(Math.sin(angle) * rad, v.height, Math.cos(angle) * rad);
    if (v.attack === 'moon') base.set(-20, v.height, -42);
    if (v.attack === 'pull') base.set(13, v.height, -14);
    Object.assign(slot, {
      x: base.x, y: base.y, z: base.z, emoji: v.emoji, scale: 0, visible: true, alpha: 1, rot: 0, tint: 1,
      flip: base.x > 0,
    });
    g.units.push({ slot, base, angle, phase: Math.random() * 10, lunge: 0 });
    // Pop-in sparkle.
    this.particles.sparks(base, 10, g.color, 2.5);
  }

  update(dt: number): void {
    this.time += dt;
    const t = this.time;
    for (let i = this.pending.length - 1; i >= 0; i--) {
      if (this.pending[i].at <= t) {
        const { fn } = this.pending[i];
        this.pending[i] = this.pending[this.pending.length - 1];
        this.pending.pop();
        fn();
      }
    }
    for (const g of this.groups) {
      if (g.units.length === 0) continue;
      const v = g.vis;
      const grow = 1 + Math.min(0.6, Math.log10(Math.max(1, g.owned)) * 0.18);
      for (const u of g.units) {
        const s = u.slot;
        s.scale = Math.min(v.scale * grow, s.scale + dt * v.scale * 4);
        u.lunge = Math.max(0, u.lunge - dt * 3.5);
        const lungeK = Math.sin(Math.min(1, u.lunge) * Math.PI);
        this.tmp.copy(TARGET).sub(u.base).setY(0).normalize();
        switch (v.attack) {
          case 'drone': {
            const a = u.angle + t * 0.8;
            const rr = v.radius[0] + Math.sin(t * 1.3 + u.phase) * 0.3;
            s.x = Math.sin(a) * rr;
            s.z = Math.cos(a) * rr;
            s.y = v.height + Math.sin(t * 2.4 + u.phase) * 0.35;
            s.flip = Math.cos(a) < 0;
            break;
          }
          case 'strafe': {
            // Jets loop across the sky in long passes.
            const cyc = ((t * 0.12 + u.phase * 0.1) % 1) * 2 - 1;
            s.x = cyc * 26;
            s.y = v.height + 2 + u.phase * 0.3;
            s.z = -8 - u.phase;
            s.flip = false;
            s.rot = -0.1;
            break;
          }
          case 'orbital': {
            const a = u.angle * 0.5 + t * 0.15;
            s.x = Math.sin(a) * v.radius[0];
            s.z = Math.cos(a) * v.radius[0] - 3;
            s.y = v.height + Math.sin(t + u.phase) * 0.4;
            break;
          }
          default: {
            s.x = u.base.x + this.tmp.x * lungeK * 0.7;
            s.z = u.base.z + this.tmp.z * lungeK * 0.7;
            const hop = v.attack === 'lunge' || v.attack === 'throw' ? Math.abs(Math.sin(t * 3 + u.phase)) * 0.08 : 0;
            s.y = u.base.y + hop + Math.sin(t * 1.4 + u.phase) * 0.05 + (v.attack === 'clone' ? Math.sin(t * 2 + u.phase) * 0.4 : 0);
            s.rot = v.attack === 'steam' ? t * 2 + u.phase : v.attack === 'lunge' ? -lungeK * 0.6 * (s.flip ? -1 : 1) : 0;
            if (v.attack === 'clone') s.alpha = 0.55 + Math.sin(t * 3 + u.phase) * 0.25;
            if (v.attack === 'pull') s.rot = t * 0.6;
          }
        }
      }

      // Attacks
      const rate = v.rate * (1 + Math.log10(Math.max(1, g.owned))) * this.frenzy * this.activity;
      g.acc += dt * Math.min(rate, 9);
      while (g.acc >= 1) {
        g.acc -= 1;
        const u = g.units[Math.floor(Math.random() * g.units.length)];
        this.attack(g, u);
      }
    }
    this.batch.flush();
  }

  private aimPoint(out: THREE.Vector3): THREE.Vector3 {
    const a = Math.random() * Math.PI * 2;
    return out.set(Math.cos(a) * 0.55, 1.25 + Math.sin(a) * 0.55, 0.6);
  }

  private attack(g: Group, u: Unit): void {
    const v = g.vis;
    const s = u.slot;
    const from = this.tmp.set(s.x, s.y, s.z);
    const to = this.aimPoint(this.tmp2);
    const c = g.color;
    const p = this.particles;
    const at = to.clone();
    const hit = (strength: number): void => this.onImpact(at, strength, c);
    switch (v.attack) {
      case 'lunge':
      case 'charge':
        u.lunge = 1;
        this.later(0.14, () => hit(0.25));
        break;
      case 'throw':
        u.lunge = 0.6;
        this.fly.strike('🪨', from.clone().setY(from.y + 0.4), to.clone(), 0.5, 0.35, () => hit(0.35), from.x > 0);
        break;
      case 'catapult':
        this.fly.strike('🪨', from.clone().setY(from.y + 1.5), to.clone(), 1.1, 0.65, () => {
          hit(0.6);
          p.smoke(to, 3, new THREE.Color(0x8a7a6a));
        }, from.x > 0);
        break;
      case 'steam':
        u.lunge = 0.8;
        for (let i = 0; i < 4; i++) {
          p.matter.spawn({
            x: from.x, y: from.y, z: from.z,
            vx: (to.x - from.x) * 1.6 + (Math.random() - 0.5), vy: (to.y - from.y) * 1.6 + Math.random(), vz: (to.z - from.z) * 1.6,
            life: 0.7, size: 0.2, sizeEnd: 0.9, r: 1, g: 1, b: 1, a: 0.45, drag: 2.2, shape: Shape.Smoke,
          });
        }
        this.later(0.28, () => hit(0.2));
        break;
      case 'slap':
        this.fly.strike('🖐️', from.clone().setY(from.y + 1), to.clone(), 0.55, 0.55, () => hit(0.5), from.x < 0);
        break;
      case 'tracer':
      case 'strafe': {
        const shots = v.attack === 'strafe' ? 6 : 1;
        for (let i = 0; i < shots; i++) {
          const d = to.clone().sub(from);
          const travel = 0.12 + d.length() * 0.012;
          const delay = i * 0.06;
          p.glow.spawn({
            x: from.x, y: from.y, z: from.z, vx: d.x / travel, vy: d.y / travel, vz: d.z / travel,
            life: travel, size: 0.05, r: 4, g: 3, b: 1.2, stretch: 0.03, shape: Shape.Spark, delay,
          });
          this.later(travel + delay, () => hit(0.18));
        }
        break;
      }
      case 'drone':
        p.beam(from.clone(), to.clone(), c, 0.05, 0.12, 4);
        hit(0.15);
        break;
      case 'orbital': {
        const top = to.clone().setY(30);
        p.beam(top, to.clone(), new THREE.Color(1, 0.25, 0.35), 0.22, 0.3, 5);
        p.flash(to, new THREE.Color(1, 0.3, 0.4), 1.2, 0.2, 4);
        hit(0.55);
        break;
      }
      case 'moon': {
        const d = to.clone().sub(from);
        const travel = 1.1;
        p.glow.spawn({
          x: from.x, y: from.y, z: from.z, vx: d.x / travel, vy: d.y / travel + 0.5 * 9 * travel, vz: d.z / travel,
          life: travel, size: 0.7, sizeEnd: 0.5, r: 4, g: 3.6, b: 2.2, gravity: 9, shape: Shape.Glow,
        });
        this.later(travel, () => {
          hit(0.9);
          p.ring(to, new THREE.Color(1, 0.9, 0.6), 2.4, 0.4, 3);
        });
        break;
      }
      case 'pull':
        for (let i = 0; i < 3; i++) {
          const o = to.clone().add(new THREE.Vector3((Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.8, 0));
          const d = from.clone().sub(o);
          p.glow.spawn({
            x: o.x, y: o.y, z: o.z, vx: d.x * 0.9, vy: d.y * 0.9, vz: d.z * 0.9,
            life: 1.1, size: 0.08, sizeEnd: 0.02, r: c.r * 3, g: c.g * 3, b: c.b * 3, stretch: 0.06, shape: Shape.Spark,
          });
        }
        if (Math.random() < 0.3) hit(0.12);
        break;
      case 'paper':
        this.fly.strike('📄', from.clone().setY(from.y + 0.5), to.clone(), 0.45, 0.4, () => hit(0.3), from.x > 0);
        break;
      case 'clone':
        this.fly.strike('😳', from.clone(), to.clone(), 0.6, 0.6, () => {
          hit(0.4);
          p.sparks(to, 8, c, 3);
        }, from.x > 0);
        break;
    }
  }
}
