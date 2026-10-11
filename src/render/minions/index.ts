import * as THREE from 'three';
import type { EmojiAtlas, FlyingEmoji } from '../sprites';
import type { Particles } from '../particles';
import type { EraKit } from '../eraKit';
import { loadModel } from '../assets';
import { SpriteMinions, type ImpactFn } from './legacy';
import { Crowd, GearPool, gearFromGltf, rigsFromGltf, type Rig } from './rig';
import { Creature, type Circle, type Env, type Spot } from './creatures';
import { Factory, Knight, Trebuchet, type Unit } from './machines';
import layout from './layout.json';

const STAR = new THREE.Vector3(0, 1.25, 0);
const slot = (p: number[]): THREE.Vector3 => new THREE.Vector3(p[0], 0, p[1]);

/**
 * Every 3D minion kind: how many are drawn, how fast they attack (base rate
 * before the log-owned boost, matching the sprite minions), how they arrive
 * and how their attacks land.
 */
interface KindDef {
  max: number;
  rate: number;
  color: THREE.Color;
  make(rig: Rig, index: number): Unit;
  /** 'touch': hits where it stands; 'throw': a rock from the hands; 'sling': a boulder from the muzzle. */
  attack: 'touch' | 'throw' | 'sling';
  /** Projectile gear for slung attacks. */
  ammo?: 'rock' | 'glove';
  strength: number;
  /** Contact-shadow radius. */
  shadow: number;
}

const KINDS: Record<string, KindDef> = {
  monkey: { max: 9, rate: 1.2, color: new THREE.Color(0xffe0a0), make: (r) => new Creature('monkey', r), attack: 'touch', strength: 0.25, shadow: 0.42 },
  gorilla: { max: 5, rate: 0.8, color: new THREE.Color(0xc8b8a8), make: (r) => new Creature('gorilla', r), attack: 'throw', strength: 0.38, shadow: 0.8 },
  trebuchet: { max: 3, rate: 0.35, color: new THREE.Color(0xffb070), make: (r, i) => new Trebuchet(r, slot(layout.trebuchet[i])), attack: 'sling', strength: 0.6, shadow: 1.8 },
  knight: { max: 4, rate: 0.5, color: new THREE.Color(0xd8e4ff), make: (r, i) => new Knight(r, slot(layout.knight[i])), attack: 'touch', strength: 0.45, shadow: 1.1 },
  steam: { max: 6, rate: 0.8, color: new THREE.Color(0xffffff), make: (r) => new Creature('steam', r), attack: 'touch', strength: 0.3, shadow: 0.5 },
  factory: { max: 2, rate: 0.6, color: new THREE.Color(0xffd0a0), make: (r, i) => new Factory(r, slot(layout.factory[i])), attack: 'sling', ammo: 'glove', strength: 0.5, shadow: 0 },
};

export interface MinionWorld {
  heightAt(x: number, z: number): number;
  kit(): EraKit | null;
}

interface Flight {
  gear: 'rock' | 'glove';
  from: THREE.Vector3;
  to: THREE.Vector3;
  t: number;
  dur: number;
  arc: number;
  size: number;
  spin: THREE.Vector3;
  hit: (() => void) | null;
  /** After impact: ballistic tumble off the star. */
  vel: THREE.Vector3;
  after: number;
}

interface Pack {
  def: KindDef;
  crowd: Crowd;
  units: Unit[];
  acc: number;
  queue: number[];
}

const tmpM = new THREE.Matrix4();
const tmpV = new THREE.Vector3();
const tmpV2 = new THREE.Vector3();
const tmpQ = new THREE.Quaternion();
const tmpE = new THREE.Euler();
const tmpS = new THREE.Vector3();
const shadowCol = new THREE.Color();
const ONE = new THREE.Vector3(1, 1, 1);
const posOf = (u: Unit): THREE.Vector3 => (u as unknown as { pos: THREE.Vector3 }).pos;
const scaleOf = (u: Unit): number => (u as unknown as { scale: number }).scale;

/**
 * Idle production made visible. Minions are 3D workers and machines with
 * routines; kinds still awaiting a model fall back to illustrated billboards.
 */
export class Minions {
  readonly group = new THREE.Group();
  private sprites: SpriteMinions;
  private particles: Particles;
  private onImpact: ImpactFn;
  private world: MinionWorld;
  private rigs: Map<string, Rig> | null = null;
  private packs = new Map<string, Pack>();
  private owned: Record<string, number> = {};
  private rocks: GearPool | null = null;
  private gloves: GearPool | null = null;
  private bananas: GearPool | null = null;
  private flights: Flight[] = [];
  private shadows: THREE.InstancedMesh;
  private time = 0;
  private spots = new Map<string, Spot[]>();
  private spotKit: EraKit | null | undefined = undefined;
  private env: Env;
  private colliders: Circle[] = [];
  /** Multiplier on attack rate (Minion Rally, frenzies). */
  frenzy = 1;
  /** Global visual activity scale (quality). */
  activity = 1;

  constructor(atlas: EmojiAtlas, fly: FlyingEmoji, particles: Particles, onImpact: ImpactFn, world: MinionWorld) {
    this.sprites = new SpriteMinions(atlas, fly, particles, onImpact);
    this.particles = particles;
    this.onImpact = onImpact;
    this.world = world;
    this.group.add(this.sprites.batch.mesh);
    this.shadows = blobShadows(96);
    this.group.add(this.shadows);
    this.env = {
      height: (x, z) => this.world.heightAt(x, z),
      colliders: () => this.colliders,
      spots: (kind) => this.spots.get(kind) ?? [],
      star: STAR,
    };
    loadModel('minions')
      .then((gltf) => {
        const rigs = rigsFromGltf(gltf);
        const gear = gearFromGltf(gltf);
        for (const [id, def] of Object.entries(KINDS)) {
          const rig = rigs.get(id);
          if (!rig) continue;
          const crowd = new Crowd(rig, def.max);
          this.packs.set(id, { def, crowd, units: [], acc: Math.random(), queue: [] });
          this.group.add(crowd.group);
          this.sprites.skip.add(id);
        }
        const rock = gear.get('proj_rock');
        if (rock) {
          this.rocks = new GearPool(rock, 48);
          this.group.add(this.rocks.group);
        }
        const glove = gear.get('proj_glove');
        if (glove) {
          this.gloves = new GearPool(glove, 16);
          this.group.add(this.gloves.group);
        }
        const banana = gear.get('proj_banana');
        if (banana) {
          this.bananas = new GearPool(banana, KINDS.monkey.max);
          this.group.add(this.bananas.group);
        }
        this.rigs = rigs;
        this.sync(this.owned, true);
      })
      .catch((err) => console.warn('minion models failed to load', err));
  }

  /** Kept for callers that add the sprite batch directly. */
  get batch(): { mesh: THREE.Object3D } {
    return { mesh: this.group };
  }

  sync(producers: Record<string, number>, settle = false): void {
    this.owned = { ...producers };
    this.sprites.sync(producers);
    if (!this.rigs) return;
    this.refreshSpots();
    for (const [id, pack] of this.packs) {
      const rig = this.rigs.get(id)!;
      const want = Math.min(pack.def.max, producers[id] ?? 0);
      const bulk = want - pack.units.length > 1;
      while (pack.units.length < want) pack.units.push(this.spawn(pack, rig, settle || bulk || this.time < 2));
      while (pack.units.length > want) pack.units.pop()!.release();
    }
  }

  private spawn(pack: Pack, rig: Rig, settled: boolean): Unit {
    const u = pack.def.make(rig, pack.units.length);
    if (u instanceof Creature) {
      u.bindRig(rig);
      if (settled) {
        const a = Math.PI + (Math.random() - 0.5) * 2.6;
        const r = 3 + Math.random() * 2.5;
        u.pos.set(Math.sin(a) * r, 0, Math.cos(a) * r);
      } else {
        // New hire: walks in from the edge of the clearing.
        const a = Math.PI + (Math.random() - 0.5) * 2.2;
        u.pos.set(Math.sin(a) * 9, 0, Math.cos(a) * 9);
      }
      u.pos.y = this.world.heightAt(u.pos.x, u.pos.z);
      u.yaw = Math.atan2(-u.pos.x, -u.pos.z);
    }
    u.spawn = settled ? 1 : 0;
    if (!settled) {
      const p = posOf(u);
      this.particles.sparks(new THREE.Vector3(p.x, this.world.heightAt(p.x, p.z) + 0.4, p.z), 14, pack.def.color, 3);
    }
    return u;
  }

  /** Rebuild work/rest spots from the current era's kit (anchors) plus defaults. */
  private refreshSpots(): void {
    const kit = this.world.kit();
    if (kit === this.spotKit) return;
    this.spotKit = kit;
    for (const pack of this.packs.values()) for (const u of pack.units) u.release();
    const spots = new Map<string, Spot[]>();
    const add = (kind: string, x: number, z: number, yaw: number): void => {
      const list = spots.get(kind) ?? [];
      list.push({ pos: new THREE.Vector3(x, 0, z), yaw, kind, taken: null });
      spots.set(kind, list);
    };
    // Poke spots: on the dais rim, round the sides and back (the front stays clear for the star's face).
    for (const deg of [62, 84, 106, 128, 150, 172]) {
      for (const s of [-1, 1]) {
        if (deg === 172 && s < 0) continue;
        const a = THREE.MathUtils.degToRad(deg) * s;
        add('poke', Math.sin(a) * 1.66, Math.cos(a) * 1.66, a + Math.PI);
      }
    }
    // Prod spots: at the foot of the dais, between the monkeys' angles.
    for (const deg of [73, 95, 117, 139, 161]) {
      for (const s of [-1, 1]) {
        const a = THREE.MathUtils.degToRad(deg) * s;
        add('prod', Math.sin(a) * 2.62, Math.cos(a) * 2.62, a + Math.PI);
      }
    }
    const pile = kit?.anchor('st_rockpile')?.pos ?? new THREE.Vector3(layout.rockpile[0], 0, layout.rockpile[1]);
    add('rockpile', pile.x, pile.z, 0);
    const pileA = Math.atan2(pile.x, pile.z);
    for (const off of [-0.55, -0.2, 0.15, 0.5, 0.85, -0.9]) {
      const a = pileA + off;
      add('throw', Math.sin(a) * 3.3, Math.cos(a) * 3.3, a + Math.PI);
    }
    for (const a of kit?.anchorsOf('rest_') ?? []) {
      const kind = String(a.data.kind ?? 'seat');
      add(kind, a.pos.x, a.pos.z, Number(a.data.yaw ?? 0) + Math.PI);
    }
    if (!spots.get('seat')) for (const a of [2.4, -2.4, 2.9]) add('seat', Math.sin(a) * 4.6, Math.cos(a) * 4.6, a + Math.PI);
    if (!spots.get('eat')) add('eat', 4.6, -5.2, 0.4);
    this.spots = spots;
    // Colliders: everything but the dais (creatures climb onto it to work), plus parked machines.
    this.colliders = (kit?.colliders ?? []).filter((c) => Math.hypot(c.x, c.z) > 0.5).map((c) => ({ ...c }));
    const trebs = Math.min(KINDS.trebuchet.max, this.owned.trebuchet ?? 0);
    for (let i = 0; i < trebs; i++) this.colliders.push({ x: layout.trebuchet[i][0], z: layout.trebuchet[i][1], r: 1.5 });
  }

  /** Celebrate together (Freak Outs, shattered bosses). */
  cheer(dur = 1.4): void {
    for (const pack of this.packs.values()) for (const u of pack.units) if (u instanceof Creature) u.cheer(this.time, dur);
  }

  /** Point at something interesting (a golden Freakmoji); null to stop. */
  pointAt(target: THREE.Vector3 | null): void {
    for (const pack of this.packs.values()) {
      pack.units.forEach((u, i) => {
        if (u instanceof Creature) u.point(target && i % 2 === 0 ? target : null);
      });
    }
  }

  update(dt: number): void {
    this.time += dt;
    this.sprites.frenzy = this.frenzy;
    this.sprites.activity = this.activity;
    this.sprites.update(dt);
    if (!this.rigs) return;
    if (this.world.kit() !== this.spotKit) this.refreshSpots();
    const t = this.time;

    for (const [id, pack] of this.packs) {
      const list = pack.units;
      if (!list.length) continue;
      // Production → attack requests, handed to whoever is ready.
      const owned = this.owned[id] ?? 0;
      const rate = pack.def.rate * (1 + Math.log10(Math.max(1, owned))) * this.frenzy * this.activity;
      pack.acc += dt * Math.min(rate, 9);
      const q = pack.queue;
      while (pack.acc >= 1) {
        pack.acc -= 1;
        if (q.length < 4) q.push(t);
      }
      while (q.length && t - q[0] > 2.5) q.shift();
      for (const u of list) {
        if (!q.length) break;
        if (u.ready) {
          q.shift();
          this.fire(pack, u);
        }
      }
      const demand = Math.min(1, q.length / 3 + (this.frenzy > 1.2 ? 0.6 : 0));
      for (const u of list) u.update(dt, t, this.env, list, demand);
    }

    this.updateFlights(dt);
    this.puffs(dt);
    this.draw();
  }

  /** Steam bots and factories breathe smoke. */
  private puffs(dt: number): void {
    const steam = this.packs.get('steam');
    if (steam) {
      for (const u of steam.units) {
        const c = u as Creature;
        if (Math.random() > dt * (c.action >= 0 ? 14 : 1.6)) continue;
        steam.crowd.begin();
        steam.crowd.add(c.matrix(tmpM), c.pose, c.tint);
        const top = tmpV.set(0.06, 0.4, -0.05).applyMatrix4(steam.crowd.partWorld('body'));
        this.particles.smoke(top, 1, new THREE.Color(0xf0eeea), { size: 0.08, sizeEnd: 0.45, life: 1.2, vy: 1.0, a: 0.5 });
      }
    }
    const fac = this.packs.get('factory');
    if (fac) {
      for (const u of fac.units) {
        const f = u as Factory;
        if (f.puff > 0) continue;
        f.puff = 0.35 + Math.random() * 0.5;
        this.particles.smoke(f.chimney(tmpV), 1, new THREE.Color(0x4a403c), { size: 0.5, sizeEnd: 2.6, life: 4.5, vy: 1.4, vx: 0.5, a: 0.55 });
      }
    }
  }

  /** Where a unit's blow lands on the star (facing side, at a sensible height). */
  private hitPoint(u: Unit, h: number, out: THREE.Vector3): THREE.Vector3 {
    const p = posOf(u);
    return out.set(p.x - STAR.x, h - STAR.y, p.z - STAR.z).normalize().multiplyScalar(0.98).add(STAR);
  }

  private fire(pack: Pack, u: Unit): void {
    const def = pack.def;
    if (def.attack === 'touch') {
      u.attack(() => this.onImpact(this.hitPoint(u, u instanceof Creature ? 0.75 : 1.05, new THREE.Vector3()), def.strength, def.color));
      return;
    }
    if (def.attack === 'throw') {
      u.attack(() => {
        const from = this.handPoint(pack, u as Creature);
        this.launch(from, this.hitPoint(u, 1.2, new THREE.Vector3()), 0.55, 0.9, 1, def);
      });
      return;
    }
    u.attack(() => {
      const from = u.muzzle ? u.muzzle(new THREE.Vector3()) : STAR.clone().setY(4);
      const glove = def.ammo === 'glove';
      this.launch(from, this.hitPoint(u, glove ? 1.3 : 1.6, new THREE.Vector3()), glove ? 1.4 : 1.25, glove ? 5 : 3.5, glove ? 1.6 : 2.2, def);
    });
  }

  private launch(from: THREE.Vector3, to: THREE.Vector3, dur: number, arc: number, size: number, def: KindDef): void {
    this.flights.push({
      gear: def.ammo ?? 'rock',
      from, to, t: 0, dur, arc, size,
      spin: new THREE.Vector3(Math.random() * 8, Math.random() * 8, 0),
      hit: () => this.onImpact(to.clone(), def.strength, def.color),
      vel: new THREE.Vector3(), after: 0,
    });
  }

  /** Midpoint between a gorilla's fists (where a carried rock sits). */
  private handPoint(pack: Pack, c: Creature): THREE.Vector3 {
    const crowd = pack.crowd;
    crowd.begin();
    crowd.add(c.matrix(tmpM), c.pose, c.tint);
    const l = new THREE.Vector3(-0.08, -0.54, 0.12).applyMatrix4(crowd.partWorld('armL'));
    const r = new THREE.Vector3(0.08, -0.54, 0.12).applyMatrix4(crowd.partWorld('armR'));
    return l.add(r).multiplyScalar(0.5).add(new THREE.Vector3(0, 0.07, 0));
  }

  private updateFlights(dt: number): void {
    for (let i = this.flights.length - 1; i >= 0; i--) {
      const f = this.flights[i];
      if (f.hit) {
        f.t += dt / f.dur;
        if (f.t >= 1) {
          f.hit();
          f.hit = null;
          // Bounce off the star with a puff of grit.
          const out = tmpV.copy(f.to).sub(STAR).normalize();
          f.vel.copy(out).multiplyScalar(2.2).add(new THREE.Vector3((Math.random() - 0.5) * 1.5, 2.6, 0));
          f.from.copy(f.to);
          this.particles.smoke(f.to, Math.round(2 * f.size), new THREE.Color(0x9a8c80), { size: 0.12 * f.size, sizeEnd: 0.5 * f.size, life: 0.6, a: 0.5 });
        }
      } else {
        f.after += dt;
        f.vel.y -= 14 * dt;
        f.from.addScaledVector(f.vel, dt);
        const g = this.world.heightAt(f.from.x, f.from.z) + 0.1 * f.size;
        if (f.from.y < g) {
          f.from.y = g;
          f.vel.multiplyScalar(0.35);
          f.vel.y = Math.abs(f.vel.y) * 0.4;
        }
        if (f.after > 1.6) this.flights.splice(i, 1);
      }
    }
  }

  private draw(): void {
    const sh = this.shadows;
    let ns = 0;
    const put = (x: number, y: number, z: number, s: number, a: number): void => {
      if (ns >= 96 || s <= 0.01) return;
      tmpM.compose(tmpV2.set(x, y + 0.012, z), tmpQ.identity(), tmpS.set(s, s, s));
      sh.setMatrixAt(ns, tmpM);
      sh.setColorAt(ns, shadowCol.setRGB(a, a, a));
      ns++;
    };
    this.rocks?.begin();
    this.gloves?.begin();
    this.bananas?.begin();
    for (const pack of this.packs.values()) {
      const crowd = pack.crowd;
      crowd.begin();
      for (const u of pack.units) {
        crowd.add(u.matrix(tmpM), u.pose, u.tint);
        const p = posOf(u);
        put(p.x, this.world.heightAt(p.x, p.z), p.z, pack.def.shadow * scaleOf(u) * u.spawn, 0.55);
        if (u instanceof Creature) {
          if (u.holding === 'rock' && this.rocks) {
            const l = tmpV.set(-0.08, -0.54, 0.12).applyMatrix4(crowd.partWorld('armL'));
            const lx = l.x, ly = l.y, lz = l.z;
            const r = tmpV.set(0.08, -0.54, 0.12).applyMatrix4(crowd.partWorld('armR'));
            this.rocks.add(tmpM.compose(tmpV2.set((lx + r.x) / 2, (ly + r.y) / 2 + 0.07, (lz + r.z) / 2), tmpQ.setFromEuler(tmpE.set(0.3, u.yaw, 0.2)), ONE));
          }
          if (u.holding === 'banana' && this.bananas) {
            const b = tmpV.set(-0.035, -0.25, 0.02).applyMatrix4(crowd.partWorld('armL'));
            this.bananas.add(tmpM.compose(b, tmpQ.setFromEuler(tmpE.set(-0.6, u.yaw, 0.4)), ONE));
          }
        } else if (u instanceof Trebuchet && u.ready && this.rocks) {
          // A boulder waits in the sling.
          this.rocks.add(tmpM.compose(u.muzzle(tmpV2), tmpQ.identity(), tmpS.set(2.2, 2.2, 2.2)));
        }
      }
      crowd.end();
    }
    for (const f of this.flights) {
      const pool = f.gear === 'glove' ? this.gloves : this.rocks;
      if (!pool) continue;
      let p: THREE.Vector3;
      if (f.hit) {
        p = tmpV.lerpVectors(f.from, f.to, f.t);
        p.y += Math.sin(f.t * Math.PI) * f.arc;
      } else p = tmpV.copy(f.from);
      const age = f.hit ? f.t * f.dur : f.dur + f.after;
      const s = (f.hit ? 1 : Math.max(0, 1 - Math.max(0, f.after - 1.1) / 0.5)) * f.size;
      if (f.gear === 'glove' && f.hit) {
        // Gloves fly palm-first, wobbling.
        const dir = tmpV2.copy(f.to).sub(f.from).normalize();
        tmpQ.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.sin(age * 9) * 0.5));
        pool.add(tmpM.compose(p, tmpQ, tmpS.set(s, s, s)));
      } else pool.add(tmpM.compose(p, tmpQ.setFromEuler(tmpE.set(f.spin.x * age, f.spin.y * age, 0)), tmpS.set(s, s, s)));
      if (!f.hit && s > 0.2) {
        const g = this.world.heightAt(p.x, p.z);
        put(p.x, g, p.z, 0.3 * s, Math.max(0, 0.5 - (p.y - g) * 0.3));
      }
    }
    this.rocks?.end();
    this.gloves?.end();
    this.bananas?.end();
    sh.count = ns;
    sh.instanceMatrix.needsUpdate = true;
    if (sh.instanceColor) sh.instanceColor.needsUpdate = true;
  }

  setShadows(on: boolean): void {
    for (const pack of this.packs.values()) pack.crowd.setShadows(on);
  }
}

/** Soft contact shadows: a radial-gradient quad per minion, always on (every tier). */
function blobShadows(capacity: number): THREE.InstancedMesh {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(32, 32, 2, 32, 32, 32);
  grad.addColorStop(0, 'rgba(0,0,0,0.6)');
  grad.addColorStop(0.55, 'rgba(0,0,0,0.3)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  const geo = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, color: 0xffffff, polygonOffset: true, polygonOffsetFactor: -2 });
  // Instance colour scales darkness (alpha comes from the texture).
  mat.onBeforeCompile = (s) => {
    s.fragmentShader = s.fragmentShader.replace('#include <color_fragment>', '#include <color_fragment>\n diffuseColor.a *= vColor.r; diffuseColor.rgb = vec3(0.0);');
  };
  const m = new THREE.InstancedMesh(geo, mat, capacity);
  m.count = 0;
  m.frustumCulled = false;
  m.renderOrder = 2;
  m.setColorAt(0, new THREE.Color(1, 1, 1));
  return m;
}
