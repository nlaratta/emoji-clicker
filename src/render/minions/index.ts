import * as THREE from 'three';
import type { EmojiAtlas, FlyingEmoji } from '../sprites';
import type { Particles } from '../particles';
import type { EraKit } from '../eraKit';
import { loadModel } from '../assets';
import { SpriteMinions, type ImpactFn } from './legacy';
import { Crowd, GearPool, gearFromGltf, rigsFromGltf, type Rig } from './rig';
import { Creature, type Circle, type Env, type Kind, type Spot } from './creatures';

/** How many of each creature are drawn (more owned = more workers, up to this). */
const MAX: Record<Kind, number> = { monkey: 9, gorilla: 6 };
/** Base attacks per second before the log-owned boost (matches the sprite minions). */
const RATE: Record<Kind, number> = { monkey: 1.2, gorilla: 0.8 };
const COLOR: Record<Kind, THREE.Color> = { monkey: new THREE.Color(0xffe0a0), gorilla: new THREE.Color(0xc8b8a8) };
const STAR = new THREE.Vector3(0, 1.25, 0);
const KINDS: Kind[] = ['monkey', 'gorilla'];

export interface MinionWorld {
  heightAt(x: number, z: number): number;
  kit(): EraKit | null;
}

interface Flight {
  from: THREE.Vector3;
  to: THREE.Vector3;
  t: number;
  dur: number;
  arc: number;
  spin: THREE.Vector3;
  hit: (() => void) | null;
  /** After impact: ballistic tumble off the star. */
  vel: THREE.Vector3;
  after: number;
}

const tmpM = new THREE.Matrix4();
const tmpV = new THREE.Vector3();
const tmpQ = new THREE.Quaternion();
const tmpE = new THREE.Euler();
const ONE = new THREE.Vector3(1, 1, 1);

/**
 * Idle production made visible. Creature minions are 3D workers with
 * routines; types still awaiting a model fall back to emoji billboards.
 */
export class Minions {
  readonly group = new THREE.Group();
  private sprites: SpriteMinions;
  private particles: Particles;
  private onImpact: ImpactFn;
  private world: MinionWorld;
  private rigs: Map<string, Rig> | null = null;
  private crowds = new Map<Kind, Crowd>();
  private creatures: Record<Kind, Creature[]> = { monkey: [], gorilla: [] };
  private owned: Record<string, number> = {};
  private acc: Record<Kind, number> = { monkey: Math.random(), gorilla: Math.random() };
  private queue: Record<Kind, number[]> = { monkey: [], gorilla: [] };
  private rocks: GearPool | null = null;
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
    this.shadows = blobShadows(64);
    this.group.add(this.shadows);
    this.env = {
      height: (x, z) => this.world.heightAt(x, z),
      colliders: () => this.colliders,
      spots: (kind) => this.spots.get(kind) ?? [],
      star: STAR,
    };
    loadModel('minions')
      .then((gltf) => {
        this.rigs = rigsFromGltf(gltf);
        const gear = gearFromGltf(gltf);
        for (const k of KINDS) {
          const rig = this.rigs.get(k);
          if (!rig) continue;
          const crowd = new Crowd(rig, MAX[k]);
          this.crowds.set(k, crowd);
          this.group.add(crowd.group);
          this.sprites.skip.add(k);
        }
        const rock = gear.get('proj_rock');
        if (rock) {
          this.rocks = new GearPool(rock, 40);
          this.group.add(this.rocks.group);
        }
        const banana = gear.get('proj_banana');
        if (banana) {
          this.bananas = new GearPool(banana, MAX.monkey);
          this.group.add(this.bananas.group);
        }
        this.sync(this.owned, true);
      })
      .catch((err) => console.warn('minion models failed to load', err));
  }

  /** The emoji-billboard batch (kept for types without models). */
  get batch(): { mesh: THREE.Object3D } {
    return { mesh: this.group };
  }

  sync(producers: Record<string, number>, settle = false): void {
    this.owned = { ...producers };
    this.sprites.sync(producers);
    if (!this.rigs) return;
    this.refreshSpots();
    for (const k of KINDS) {
      const rig = this.rigs.get(k);
      if (!rig) continue;
      const list = this.creatures[k];
      const want = Math.min(MAX[k], producers[k] ?? 0);
      const bulk = want - list.length > 1;
      while (list.length < want) list.push(this.spawn(k, rig, settle || bulk || this.time < 2));
      while (list.length > want) list.pop()!.release();
    }
  }

  private spawn(kind: Kind, rig: Rig, settled: boolean): Creature {
    const c = new Creature(kind, rig);
    c.bindRig(rig);
    if (settled) {
      // Already part of the scene: start somewhere sensible, fully grown.
      const a = Math.PI + (Math.random() - 0.5) * 2.6;
      const r = 3 + Math.random() * 2.5;
      c.pos.set(Math.sin(a) * r, 0, Math.cos(a) * r);
      c.spawn = 1;
    } else {
      // New hire: arrives from the edge of the clearing.
      const a = Math.PI + (Math.random() - 0.5) * 2.2;
      c.pos.set(Math.sin(a) * 9, 0, Math.cos(a) * 9);
      c.spawn = 0;
      this.particles.sparks(new THREE.Vector3(c.pos.x, this.world.heightAt(c.pos.x, c.pos.z) + 0.3, c.pos.z), 10, COLOR[kind], 2.5);
    }
    c.pos.y = this.world.heightAt(c.pos.x, c.pos.z);
    c.yaw = Math.atan2(-c.pos.x, -c.pos.z);
    return c;
  }

  /** Rebuild work/rest spots from the current era's kit (anchors) plus defaults. */
  private refreshSpots(): void {
    const kit = this.world.kit();
    if (kit === this.spotKit) return;
    this.spotKit = kit;
    for (const list of Object.values(this.creatures)) for (const c of list) c.release();
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
    // Rock pile (kit anchor, else a default spot on the right).
    const pile = kit?.anchor('st_rockpile')?.pos ?? new THREE.Vector3(3.95, 0, -2.75);
    add('rockpile', pile.x, pile.z, 0);
    // Throwing line: a loose arc at the edge of the worn ground, nearest the pile first.
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
    // Colliders: everything but the dais (creatures climb onto it to work).
    this.colliders = (kit?.colliders ?? []).filter((c) => Math.hypot(c.x, c.z) > 0.5).map((c) => ({ ...c }));
  }

  /** Celebrate together (Freak Outs, shattered bosses). */
  cheer(dur = 1.4): void {
    for (const list of Object.values(this.creatures)) for (const c of list) c.cheer(this.time, dur);
  }

  /** Point at something interesting (a golden Freakmoji); null to stop. */
  pointAt(target: THREE.Vector3 | null): void {
    for (const list of Object.values(this.creatures)) {
      list.forEach((c, i) => c.point(target && i % 2 === 0 ? target : null));
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

    for (const k of KINDS) {
      const list = this.creatures[k];
      if (!list.length) continue;
      // Production → attack requests, handed to whoever is ready.
      const owned = this.owned[k] ?? 0;
      const rate = RATE[k] * (1 + Math.log10(Math.max(1, owned))) * this.frenzy * this.activity;
      this.acc[k] += dt * Math.min(rate, 9);
      const q = this.queue[k];
      while (this.acc[k] >= 1) {
        this.acc[k] -= 1;
        if (q.length < 4) q.push(t);
      }
      while (q.length && t - q[0] > 2.5) q.shift();
      for (const c of list) {
        if (!q.length) break;
        if (c.ready) {
          q.shift();
          this.fire(c);
        }
      }
      const demand = Math.min(1, q.length / 3 + (this.frenzy > 1.2 ? 0.6 : 0));
      for (const c of list) c.update(dt, t, this.env, list, demand);
    }

    this.updateFlights(dt);
    this.draw();
  }

  private fire(c: Creature): void {
    const env = this.env;
    if (c.kind === 'monkey') {
      c.attack(() => {
        const at = c.hitPoint(env, new THREE.Vector3());
        this.onImpact(at, 0.25, COLOR.monkey);
      });
      return;
    }
    c.attack(() => {
      const from = this.handPoint(c);
      const to = c.hitPoint(env, new THREE.Vector3());
      this.flights.push({
        from, to, t: 0, dur: 0.55, arc: 0.9,
        spin: new THREE.Vector3(Math.random() * 8, Math.random() * 8, 0),
        hit: () => this.onImpact(to.clone(), 0.38, COLOR.gorilla),
        vel: new THREE.Vector3(), after: 0,
      });
    });
  }

  /** Midpoint above a creature's hands (where a carried rock sits). */
  private handPoint(c: Creature): THREE.Vector3 {
    const crowd = this.crowds.get(c.kind)!;
    crowd.begin();
    crowd.add(c.matrix(tmpM), c.pose, c.tint);
    const l = new THREE.Vector3(-0.08, -0.645, 0.19).applyMatrix4(crowd.partWorld('armL'));
    const r = new THREE.Vector3(0.08, -0.645, 0.19).applyMatrix4(crowd.partWorld('armR'));
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
          this.particles.smoke(f.to, 2, new THREE.Color(0x9a8c80), { size: 0.12, sizeEnd: 0.5, life: 0.6, a: 0.5 });
        }
      } else {
        f.after += dt;
        f.vel.y -= 14 * dt;
        f.from.addScaledVector(f.vel, dt);
        const g = this.world.heightAt(f.from.x, f.from.z) + 0.1;
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
      if (ns >= 64) return;
      tmpM.compose(tmpV.set(x, y + 0.012, z), tmpQ.identity(), new THREE.Vector3(s, s, s));
      sh.setMatrixAt(ns, tmpM);
      sh.setColorAt(ns, new THREE.Color(a, a, a));
      ns++;
    };
    this.rocks?.begin();
    this.bananas?.begin();
    for (const k of KINDS) {
      const crowd = this.crowds.get(k);
      if (!crowd) continue;
      crowd.begin();
      for (const c of this.creatures[k]) {
        crowd.add(c.matrix(tmpM), c.pose, c.tint);
        const g = this.world.heightAt(c.pos.x, c.pos.z);
        put(c.pos.x, g, c.pos.z, (k === 'monkey' ? 0.42 : 0.78) * c.scale * c.spawn, 0.55);
        if (c.holding === 'rock' && this.rocks) {
          const l = tmpV.set(-0.08, -0.645, 0.19).applyMatrix4(crowd.partWorld('armL'));
          const lx = l.x, ly = l.y, lz = l.z;
          const r = tmpV.set(0.08, -0.645, 0.19).applyMatrix4(crowd.partWorld('armR'));
          const p = new THREE.Vector3((lx + r.x) / 2, (ly + r.y) / 2 + 0.07, (lz + r.z) / 2);
          this.rocks.add(tmpM.compose(p, tmpQ.setFromEuler(tmpE.set(0.3, c.yaw, 0.2)), ONE));
        }
        if (c.holding === 'banana' && this.bananas) {
          const p = tmpV.set(-0.035, -0.25, 0.02).applyMatrix4(crowd.partWorld('armL'));
          this.bananas.add(tmpM.compose(p, tmpQ.setFromEuler(tmpE.set(-0.6, c.yaw, 0.4)), ONE));
        }
      }
      crowd.end();
    }
    for (const f of this.flights) {
      if (!this.rocks) break;
      let p: THREE.Vector3;
      if (f.hit) {
        p = tmpV.lerpVectors(f.from, f.to, f.t);
        p.y += Math.sin(f.t * Math.PI) * f.arc;
      } else p = tmpV.copy(f.from);
      const age = f.hit ? f.t * f.dur : f.dur + f.after;
      const s = f.hit ? 1 : Math.max(0, 1 - Math.max(0, f.after - 1.1) / 0.5);
      this.rocks.add(tmpM.compose(p, tmpQ.setFromEuler(tmpE.set(f.spin.x * age, f.spin.y * age, 0)), new THREE.Vector3(s, s, s)));
      if (!f.hit && s > 0.2) {
        const g = this.world.heightAt(p.x, p.z);
        put(p.x, g, p.z, 0.3 * s, Math.max(0, 0.5 - (p.y - g) * 0.3));
      }
    }
    this.rocks?.end();
    this.bananas?.end();
    sh.count = ns;
    sh.instanceMatrix.needsUpdate = true;
    if (sh.instanceColor) sh.instanceColor.needsUpdate = true;
  }

  setShadows(on: boolean): void {
    for (const c of this.crowds.values()) c.setShadows(on);
  }
}

/** Soft contact shadows: a radial-gradient quad per creature, always on (every tier). */
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

