import * as THREE from 'three';
import { POSE_STRIDE, makePose, type Rig } from './rig';
import type { Env } from './creatures';

/**
 * Machine minions: siege engines, mounts and contraptions with their own
 * working cycles. Like creatures, they expose `ready` / `attack` so the
 * production rate decides when they fire.
 */
export interface Unit {
  readonly pose: Float32Array;
  readonly tint: THREE.Color;
  spawn: number;
  readonly ready: boolean;
  attack(fire: () => void): void;
  update(dt: number, t: number, env: Env, crowd: Unit[], demand: number): void;
  matrix(out: THREE.Matrix4): THREE.Matrix4;
  release(): void;
  /** Where the hit lands (or the projectile starts, for launchers). */
  muzzle?(out: THREE.Vector3): THREE.Vector3;
}

const UP = new THREE.Vector3(0, 1, 0);
const tmpV = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _s = new THREE.Vector3();
const TAU = Math.PI * 2;
const wrap = (a: number): number => Math.atan2(Math.sin(a), Math.cos(a));

function easeOutBack(x: number): number {
  const c1 = 1.7;
  const c3 = c1 + 1;
  return x >= 1 ? 1 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

abstract class Base implements Unit {
  readonly pose: Float32Array;
  readonly tint = new THREE.Color(1, 1, 1);
  readonly pos = new THREE.Vector3();
  yaw = 0;
  spawn = 0;
  scale = 1;
  protected idx: Record<string, number>;
  protected seed = Math.random() * 100;

  constructor(rig: Rig) {
    this.pose = makePose(rig);
    this.idx = rig.index;
    const v = 0.92 + Math.random() * 0.14;
    this.tint.setRGB(v, v, v);
  }

  abstract readonly ready: boolean;
  abstract attack(fire: () => void): void;
  abstract update(dt: number, t: number, env: Env, crowd: Unit[], demand: number): void;

  protected rot(part: string, x = 0, y = 0, z = 0): void {
    const i = this.idx[part];
    if (i === undefined) return;
    const o = i * POSE_STRIDE;
    this.pose[o] = x;
    this.pose[o + 1] = y;
    this.pose[o + 2] = z;
  }

  protected move(part: string, x = 0, y = 0, z = 0): void {
    const i = this.idx[part];
    if (i === undefined) return;
    const o = i * POSE_STRIDE;
    this.pose[o + 3] = x;
    this.pose[o + 4] = y;
    this.pose[o + 5] = z;
  }

  matrix(out: THREE.Matrix4): THREE.Matrix4 {
    const s = this.scale * easeOutBack(this.spawn);
    return out.compose(this.pos, _q.setFromAxisAngle(UP, this.yaw), _s.set(s, s, s));
  }

  release(): void {}
}

/**
 * Trebuchet: cocked with its long arm down at the back; on the order the
 * counterweight drops, the arm whips over and the sling lets go. Then the
 * crew (unseen) winches it back.
 */
export class Trebuchet extends Base {
  private arm = 2.2;
  private phase: 'cocked' | 'swing' | 'reset' = 'cocked';
  private t = 0;
  private fire: (() => void) | null = null;
  private fired = false;
  private weightLag = 0;

  constructor(rig: Rig, slot: THREE.Vector3) {
    super(rig);
    this.pos.copy(slot);
    this.yaw = Math.atan2(-slot.x, -slot.z);
    this.scale = 1.15;
  }

  get ready(): boolean {
    return this.phase === 'cocked' && this.spawn >= 1;
  }

  attack(fire: () => void): void {
    this.phase = 'swing';
    this.t = 0;
    this.fire = fire;
    this.fired = false;
  }

  update(dt: number, _t: number, env: Env): void {
    this.spawn = Math.min(1, this.spawn + dt * 1.5);
    this.pos.y = env.height(this.pos.x, this.pos.z);
    this.t += dt;
    const COCKED = 2.2;
    const SPENT = 5.15;
    let target = this.arm;
    if (this.phase === 'swing') {
      const k = Math.min(1, this.t / 0.55);
      target = COCKED + (SPENT - COCKED) * (1 - Math.pow(1 - k, 2.4));
      if (!this.fired && target > 4.75) {
        this.fired = true;
        this.fire?.();
      }
      if (k >= 1) {
        this.phase = 'reset';
        this.t = 0;
      }
    } else if (this.phase === 'reset') {
      const k = Math.min(1, Math.max(0, (this.t - 0.6) / 2.4));
      target = SPENT + (COCKED - SPENT) * (k * k * (3 - 2 * k));
      if (k >= 1) {
        this.phase = 'cocked';
        target = COCKED;
      }
    } else target = COCKED + Math.sin(_t * 1.3 + this.seed) * 0.01;
    const d = target - this.arm;
    this.arm = target;
    // The counterweight swings on its pin, lagging the arm.
    this.weightLag += (d * 3 - this.weightLag) * Math.min(1, dt * 6);
    this.rot('arm', this.arm % TAU);
    this.rot('weight', -(this.arm % TAU) + THREE.MathUtils.clamp(this.weightLag, -0.6, 0.6));
  }

  /** The sling pouch, in world space (projectiles start here). */
  muzzle(out: THREE.Vector3): THREE.Vector3 {
    const s = this.scale;
    const a = this.arm % TAU;
    // Long end: 2.4 from the axle along the arm, then the pouch hangs below it.
    const along = new THREE.Vector3(0, -Math.sin(a) * 2.45, Math.cos(a) * 2.45);
    out.set(0, 2.15, 0).add(along).multiplyScalar(s);
    out.applyAxisAngle(UP, this.yaw).add(this.pos);
    return out;
  }
}

/**
 * Jousting knight: waits at a station facing the star, charges with the
 * lance couched, strikes, wheels about and canters back.
 */
export class Knight extends Base {
  private home: THREE.Vector3;
  private state: 'wait' | 'charge' | 'wheel' | 'return' | 'face' = 'wait';
  private fire: (() => void) | null = null;
  private speed = 0;
  private gait = Math.random() * 6;
  private lance = -0.75;
  private stateT = 0;

  constructor(rig: Rig, slot: THREE.Vector3) {
    super(rig);
    this.home = slot.clone();
    this.pos.copy(slot);
    this.yaw = Math.atan2(-slot.x, -slot.z);
    this.scale = 1.05;
    const h = (Math.random() - 0.5) * 0.08;
    this.tint.setRGB(1 + h, 1, 1 - h);
  }

  get ready(): boolean {
    return this.state === 'wait' && this.spawn >= 1;
  }

  attack(fire: () => void): void {
    this.state = 'charge';
    this.stateT = 0;
    this.fire = fire;
  }

  update(dt: number, t: number, env: Env): void {
    this.spawn = Math.min(1, this.spawn + dt * 1.5);
    this.stateT += dt;
    const toStar = Math.atan2(-this.pos.x, -this.pos.z);
    let want = 0;
    let wantYaw = this.yaw;
    let lance = -0.75;
    if (this.state === 'wait') {
      wantYaw = toStar;
    } else if (this.state === 'charge') {
      want = 5.2;
      wantYaw = toStar;
      lance = 0.06;
      if (Math.hypot(this.pos.x, this.pos.z) < 2.75) {
        this.fire?.();
        this.fire = null;
        this.state = 'wheel';
        this.stateT = 0;
      }
    } else if (this.state === 'wheel') {
      want = 1.6;
      wantYaw = toStar + Math.PI;
      lance = -0.9;
      if (Math.abs(wrap(this.yaw - wantYaw)) < 0.3) this.state = 'return';
    } else if (this.state === 'return') {
      const d = this.home.clone().sub(this.pos).setY(0);
      want = Math.min(2.4, d.length() * 2);
      wantYaw = Math.atan2(d.x, d.z);
      lance = -0.85;
      if (d.length() < 0.12) this.state = 'face';
    } else if (this.state === 'face') {
      wantYaw = toStar;
      if (Math.abs(wrap(this.yaw - wantYaw)) < 0.05) this.state = 'wait';
    }
    this.speed += (want - this.speed) * Math.min(1, dt * (want > this.speed ? 3 : 5));
    this.yaw += wrap(wantYaw - this.yaw) * Math.min(1, dt * (this.state === 'wheel' ? 3.2 : 4));
    this.pos.x += Math.sin(this.yaw) * this.speed * dt;
    this.pos.z += Math.cos(this.yaw) * this.speed * dt;
    this.pos.y = env.height(this.pos.x, this.pos.z);
    this.lance += (lance - this.lance) * Math.min(1, dt * 6);

    // Gait: a lively gallop when fast, a fidgety stand when still.
    const v = this.speed;
    this.gait += dt * (v > 0.2 ? 4 + v * 1.6 : 1.2);
    const g = this.gait;
    const amp = Math.min(1, v / 2.5);
    const idle = 1 - amp;
    this.rot('legFL', Math.sin(g) * 0.75 * amp + Math.sin(t * 0.7 + this.seed) * 0.05 * idle);
    this.rot('legFR', Math.sin(g + 0.6) * 0.75 * amp);
    this.rot('legBL', -Math.sin(g + 2.4) * 0.65 * amp);
    this.rot('legBR', -Math.sin(g + 3.0) * 0.65 * amp + Math.max(0, Math.sin(t * 0.9 + this.seed)) * 0.15 * idle);
    this.move('body', 0, Math.abs(Math.sin(g)) * 0.08 * amp + Math.sin(t * 1.6) * 0.006, 0);
    this.rot('body', Math.sin(g * 2) * 0.05 * amp, 0, 0);
    this.rot('neck', -Math.sin(g * 2) * 0.12 * amp + Math.sin(t * 0.8 + this.seed) * 0.08 * idle - 0.05, Math.sin(t * 0.5 + this.seed) * 0.15 * idle, 0);
    this.rot('tail', Math.sin(t * 2 + this.seed) * 0.2 - amp * 0.5, Math.sin(t * 1.3) * 0.3 * idle, 0);
    this.rot('rider', -Math.sin(g * 2) * 0.06 * amp + amp * 0.12, 0, Math.sin(g) * 0.04 * amp);
    this.rot('armR', this.lance);
    this.rot('armL', 0, 0, 0.1 + amp * 0.1);
    this.rot('helm', 0, Math.sin(t * 0.6 + this.seed) * 0.2 * idle, 0);
  }
}

/**
 * Slap Factory: a little brick works. Its sprung roof arm winds back, then
 * whips forward and flings a giant glove at the star.
 */
export class Factory extends Base {
  private arm = -1.1;
  private phase: 'cocked' | 'whip' | 'reset' = 'cocked';
  private t = 0;
  private fire: (() => void) | null = null;
  private fired = false;
  /** Seconds until the next chimney puff (read by the manager). */
  puff = Math.random() * 2;

  constructor(rig: Rig, slot: THREE.Vector3) {
    super(rig);
    this.pos.copy(slot);
    this.yaw = Math.atan2(-slot.x, -slot.z);
    this.scale = 1.5;
  }

  get ready(): boolean {
    return this.phase === 'cocked' && this.spawn >= 1;
  }

  attack(fire: () => void): void {
    this.phase = 'whip';
    this.t = 0;
    this.fire = fire;
    this.fired = false;
  }

  update(dt: number, t: number, env: Env): void {
    this.spawn = Math.min(1, this.spawn + dt * 1.2);
    this.pos.y = env.height(this.pos.x, this.pos.z);
    this.t += dt;
    const COCKED = -1.1;
    const SPENT = 0.35;
    if (this.phase === 'whip') {
      const k = Math.min(1, this.t / 0.28);
      this.arm = COCKED + (SPENT - COCKED) * k * k;
      if (!this.fired && this.arm > -0.15) {
        this.fired = true;
        this.fire?.();
      }
      if (k >= 1) {
        this.phase = 'reset';
        this.t = 0;
      }
    } else if (this.phase === 'reset') {
      // Springy overshoot, then the winch hauls it back.
      const k = Math.min(1, Math.max(0, (this.t - 0.4) / 1.6));
      this.arm = SPENT + Math.sin(this.t * 18) * 0.12 * Math.exp(-this.t * 5) + (COCKED - SPENT) * (k * k * (3 - 2 * k));
      if (k >= 1) this.phase = 'cocked';
    } else this.arm = COCKED + Math.sin(t * 2.1 + this.seed) * 0.02;
    this.rot('arm', this.arm);
    this.puff -= dt;
  }

  /** The glove at the end of the arm, in world space. */
  muzzle(out: THREE.Vector3): THREE.Vector3 {
    const a = this.arm;
    const off = new THREE.Vector3(0, -Math.sin(a) * 1.65, Math.cos(a) * 1.65);
    out.set(0.4, 2.6, -0.2).add(off).multiplyScalar(this.scale);
    out.applyAxisAngle(UP, this.yaw).add(this.pos);
    return out;
  }

  /** The chimney top, for smoke. */
  chimney(out: THREE.Vector3): THREE.Vector3 {
    return out.set(-0.9, 4.2, -0.6).multiplyScalar(this.scale).applyAxisAngle(UP, this.yaw).add(this.pos);
  }
}

/** Auto-Turret: tracks the star with its head and barrels, fires tracers, recoils. */
export class Turret extends Base {
  private cooldown = Math.random();
  private recoil = 0;
  private headYaw = 0;
  private pitch = 0;

  constructor(rig: Rig, slot: THREE.Vector3) {
    super(rig);
    this.pos.copy(slot);
    this.yaw = Math.atan2(-slot.x, -slot.z) + (Math.random() - 0.5) * 0.6;
    this.scale = 1.1;
  }

  get ready(): boolean {
    return this.cooldown <= 0 && this.spawn >= 1;
  }

  attack(fire: () => void): void {
    this.cooldown = 0.16 + Math.random() * 0.12;
    this.recoil = 1;
    fire();
  }

  update(dt: number, t: number, env: Env): void {
    this.spawn = Math.min(1, this.spawn + dt * 2);
    this.pos.y = env.height(this.pos.x, this.pos.z);
    this.cooldown -= dt;
    this.recoil = Math.max(0, this.recoil - dt * 9);
    // Aim: yaw the head toward the star (relative to the base), pitch the guns up to it.
    const toStar = Math.atan2(-this.pos.x, -this.pos.z);
    const want = wrap(toStar - this.yaw) + Math.sin(t * 0.7 + this.seed) * 0.04;
    this.headYaw += wrap(want - this.headYaw) * Math.min(1, dt * 6);
    const dist = Math.hypot(this.pos.x, this.pos.z);
    this.pitch += (Math.atan2(1.25 - 0.95 * this.scale, dist) - this.pitch) * Math.min(1, dt * 6);
    this.rot('head', 0, this.headYaw, 0);
    this.rot('guns', -this.pitch, 0, 0);
    this.move('guns', 0, 0, -this.recoil * 0.12);
  }

  muzzle(out: THREE.Vector3): THREE.Vector3 {
    const s = this.scale;
    const a = this.yaw + this.headYaw;
    const side = (Math.random() < 0.5 ? -1 : 1) * 0.13;
    out.set(side, 0.92 + Math.sin(this.pitch) * 1.2, 1.2 * Math.cos(this.pitch)).multiplyScalar(s);
    out.applyAxisAngle(UP, a).add(this.pos);
    return out;
  }
}

/**
 * Strafing Jet: flies a long banking racetrack over the plaza, diving on
 * the star and opening up when it's lined up.
 */
export class Jet extends Base {
  private u: number;
  private readonly speed: number;
  private bank = 0;
  private readonly prevPos = new THREE.Vector3();
  private readonly heading = new THREE.Vector3(0, 0, 1);
  private cooldown = 0;
  private readonly lane: number;

  constructor(rig: Rig, index: number) {
    super(rig);
    this.lane = index;
    this.u = index / 3 + Math.random() * 0.05;
    this.speed = 0.045 + index * 0.004;
    this.scale = 1.25;
    this.place(0);
    this.prevPos.copy(this.pos);
  }

  /** Racetrack: a wide ellipse behind and over the star, dipping on the attack run. */
  private place(u: number): void {
    const a = u * TAU;
    const rx = 18 + this.lane * 2.5;
    const rz = 9 + this.lane;
    this.pos.set(Math.sin(a) * rx, 7.5 + this.lane * 1.2 - Math.max(0, Math.cos(a)) * 3.2, -9 + Math.cos(a) * rz);
  }

  get ready(): boolean {
    if (this.cooldown > 0 || this.spawn < 1) return false;
    const to = new THREE.Vector3(-this.pos.x, 1.25 - this.pos.y, -this.pos.z).normalize();
    return to.dot(this.heading) > 0.55;
  }

  attack(fire: () => void): void {
    this.cooldown = 0.5;
    fire();
  }

  update(dt: number, _t: number): void {
    this.spawn = Math.min(1, this.spawn + dt * 1.2);
    this.cooldown -= dt;
    this.prevPos.copy(this.pos);
    this.u = (this.u + dt * this.speed) % 1;
    this.place(this.u);
    const v = this.pos.clone().sub(this.prevPos);
    if (v.lengthSq() > 1e-8) {
      const h = v.normalize();
      // Bank into the turn: the heading's change, signed.
      const turn = this.heading.x * h.z - this.heading.z * h.x;
      this.bank += (THREE.MathUtils.clamp(-turn * 60, -0.9, 0.9) - this.bank) * Math.min(1, dt * 3);
      this.heading.copy(h);
    }
    this.yaw = Math.atan2(this.heading.x, this.heading.z);
    const pitch = Math.asin(THREE.MathUtils.clamp(this.heading.y, -1, 1));
    this.rot('body', -pitch, 0, this.bank);
  }

  muzzle(out: THREE.Vector3): THREE.Vector3 {
    return out.copy(this.heading).multiplyScalar(1.6 * this.scale).add(this.pos);
  }
}

/**
 * Drone Swarm: quad drones circle the star in a loose, bobbing swarm; on
 * an attack one darts in, zaps with its prongs and backs off.
 */
export class Drone extends Base {
  /** Home bearing (kept off the star's face), swayed around by `sway`. */
  private readonly home: number;
  private a: number;
  private readonly r: number;
  private readonly h: number;
  private readonly w: number;
  private dart = -1;
  private fireFn: (() => void) | null = null;
  private cooldown = Math.random() * 0.5;
  private tilt = 0;
  private roll = 0;
  private readonly prev = new THREE.Vector3();

  constructor(rig: Rig, index: number) {
    super(rig);
    // Fan out over the sides and back: 70°–290° from the camera-facing front.
    const k = ((index * 0.618) % 1);
    this.home = THREE.MathUtils.degToRad(70 + k * 220);
    this.a = this.home;
    this.r = 2.55 + Math.random() * 0.7;
    this.h = 1.5 + Math.random() * 1.0;
    this.w = 0.35 + Math.random() * 0.25;
    this.scale = 0.62;
    this.place(0);
    this.prev.copy(this.pos);
  }

  private place(t: number): void {
    const k = this.dart >= 0 ? Math.sin(Math.min(1, this.dart) * Math.PI) : 0;
    const r = this.r - (this.r - 1.55) * k;
    const h = THREE.MathUtils.lerp(this.h + Math.sin(t * 1.7 + this.seed) * 0.12, 1.35, k);
    this.pos.set(Math.sin(this.a) * r, h, Math.cos(this.a) * r);
  }

  get ready(): boolean {
    return this.dart < 0 && this.cooldown <= 0 && this.spawn >= 1;
  }

  attack(fire: () => void): void {
    this.dart = 0;
    this.fireFn = fire;
  }

  update(dt: number, t: number): void {
    this.spawn = Math.min(1, this.spawn + dt * 2);
    this.cooldown -= dt;
    this.prev.copy(this.pos);
    this.a = this.home + Math.sin(t * this.w + this.seed) * 0.45;
    if (this.dart >= 0) {
      this.dart += dt / 0.55;
      if (this.fireFn && this.dart >= 0.5) {
        this.fireFn();
        this.fireFn = null;
      }
      if (this.dart >= 1) {
        this.dart = -1;
        this.cooldown = 0.35 + Math.random() * 0.5;
      }
    }
    this.place(t);
    // Face the star; pitch into the dart, roll with the sideways drift.
    this.yaw = Math.atan2(-this.pos.x, -this.pos.z);
    const v = tmpV.copy(this.pos).sub(this.prev).divideScalar(Math.max(dt, 1e-4));
    const fwd = Math.sin(this.yaw) * v.x + Math.cos(this.yaw) * v.z;
    const side = Math.cos(this.yaw) * v.x - Math.sin(this.yaw) * v.z;
    this.tilt += (THREE.MathUtils.clamp(fwd * 0.12, -0.5, 0.5) - this.tilt) * Math.min(1, dt * 6);
    this.roll += (THREE.MathUtils.clamp(-side * 0.25, -0.5, 0.5) - this.roll) * Math.min(1, dt * 5);
    this.rot('body', this.tilt + Math.sin(t * 2.3 + this.seed) * 0.04, 0, this.roll);
    for (let i = 0; i < 4; i++) this.rot(`rotor${i}`, 0, (t * 38 + i * 0.7) * (i % 3 ? 1 : -1), 0);
    const zap = this.dart >= 0 ? Math.sin(Math.min(1, this.dart) * Math.PI) : 0;
    this.rot('zap', -zap * 0.5, 0, 0);
  }

  muzzle(out: THREE.Vector3): THREE.Vector3 {
    const s = this.scale;
    out.set(0, -0.2 * s, 0.32 * s).applyAxisAngle(UP, this.yaw).add(this.pos);
    return out;
  }
}

const SKY: [number, number, number][] = [[-8.5, 11.5, -9], [8.8, 12.5, -10], [-2.6, 14.5, -14], [3.6, 10.5, -6.5]];

/**
 * Orbital Laser: satellites hang high over the plaza, drifting slowly with
 * their wings trimmed to the sun, the lens barrel tracking the star.
 */
export class Orbital extends Base {
  private readonly home: THREE.Vector3;
  private cooldown = 1 + Math.random() * 2;
  private recoil = 0;
  private kickIn = -1;
  private lensPitch = 0;

  constructor(rig: Rig, index: number) {
    super(rig);
    const s = SKY[index % SKY.length];
    this.home = new THREE.Vector3(s[0], s[1], s[2]);
    this.pos.copy(this.home);
    this.scale = 0.85;
  }

  get ready(): boolean {
    return this.cooldown <= 0 && this.spawn >= 1;
  }

  /** Fires straight away; the beam itself lands after the charge-up (CHARGE). */
  attack(fire: () => void): void {
    this.cooldown = 2.2 + Math.random() * 1.2;
    this.kickIn = Orbital.CHARGE;
    fire();
  }

  static readonly CHARGE = 0.6;

  update(dt: number, t: number): void {
    this.spawn = Math.min(1, this.spawn + dt * 0.8);
    this.cooldown -= dt;
    if (this.kickIn >= 0) {
      this.kickIn -= dt;
      if (this.kickIn < 0) this.recoil = 1;
    }
    this.recoil = Math.max(0, this.recoil - dt * 2.5);
    const a = t * 0.05 + this.seed;
    this.pos.set(this.home.x + Math.sin(a) * 1.6, this.home.y + Math.sin(a * 1.7) * 0.4 + this.recoil * 0.25, this.home.z + Math.cos(a) * 1.0);
    this.yaw = Math.atan2(-this.pos.x, -this.pos.z);
    const dist = Math.hypot(this.pos.x, this.pos.z);
    // The barrel hangs straight down at rest; swing it toward the star.
    const want = Math.atan2(dist, this.pos.y - 1.25);
    this.lensPitch += (want - this.lensPitch) * Math.min(1, dt * 3);
    this.rot('lens', -this.lensPitch + this.recoil * 0.12, 0, 0);
    this.rot('wings', Math.sin(t * 0.13 + this.seed) * 0.35, 0, 0);
    this.rot('body', 0, 0, Math.sin(t * 0.2 + this.seed) * 0.05);
  }

  muzzle(out: THREE.Vector3): THREE.Vector3 {
    // The lens tip: 0.77 m down the barrel from its pivot, rotated by the aim.
    const s = this.scale;
    out.set(0, -0.77, 0).applyAxisAngle(new THREE.Vector3(1, 0, 0), -this.lensPitch).multiplyScalar(s);
    out.y += -0.6 * s;
    out.applyAxisAngle(UP, this.yaw).add(this.pos);
    return out;
  }
}

/**
 * Moon Cannon: a grumpy little moon with a cannon strapped on top, hanging
 * over the horizon. It turns to face the star, depresses the barrel and lobs
 * boulders; each shot kicks the barrel back and nudges the moon.
 */
export class MoonCannon extends Base {
  private static readonly HOME = new THREE.Vector3(-5, 4.9, -26);
  private cooldown = 1.5;
  private recoil = 0;
  private pitch = 0.3;

  constructor(rig: Rig) {
    super(rig);
    this.pos.copy(MoonCannon.HOME);
    this.scale = 1;
  }

  get ready(): boolean {
    return this.cooldown <= 0 && this.spawn >= 1;
  }

  attack(fire: () => void): void {
    this.cooldown = 1.8 + Math.random() * 0.8;
    this.recoil = 1;
    fire();
  }

  update(dt: number, t: number): void {
    this.spawn = Math.min(1, this.spawn + dt * 0.7);
    this.cooldown -= dt;
    this.recoil = Math.max(0, this.recoil - dt * 2.2);
    const h = MoonCannon.HOME;
    this.pos.set(h.x + Math.sin(t * 0.21) * 0.5 - this.recoil * 0.4, h.y + Math.sin(t * 0.37) * 0.35, h.z + Math.cos(t * 0.17) * 0.4);
    this.yaw = Math.atan2(-this.pos.x, -this.pos.z);
    const dist = Math.hypot(this.pos.x, this.pos.z);
    // Aim high: the boulder arcs, so lead with an elevated barrel.
    const want = Math.atan2(this.pos.y + 2.3 - 1.25, dist) - 0.38;
    this.pitch += (want - this.pitch) * Math.min(1, dt * 2);
    this.rot('barrel', this.pitch, 0, 0);
    this.move('barrel', 0, 0, -this.recoil * 0.5);
    this.rot('body', Math.sin(t * 0.5) * 0.04 - this.recoil * 0.08, 0, Math.sin(t * 0.3) * 0.05);
  }

  muzzle(out: THREE.Vector3): THREE.Vector3 {
    out.set(0, 0, 3.3).applyAxisAngle(new THREE.Vector3(1, 0, 0), this.pitch);
    out.y += 2.3;
    return out.multiplyScalar(this.scale).applyAxisAngle(UP, this.yaw).add(this.pos);
  }
}

/**
 * Black Hole Engine: a containment ring turning round a captive black hole
 * (the hole and its disc are drawn by `HoleFx`). Each pull strips a stream
 * of matter off the star.
 */
export class BlackHoleEngine extends Base {
  private cooldown = 0.5;
  pulse = 0;

  constructor(rig: Rig, slot: THREE.Vector3) {
    super(rig);
    this.pos.copy(slot);
    this.yaw = Math.atan2(-slot.x, -slot.z);
    this.scale = 1;
  }

  get ready(): boolean {
    return this.cooldown <= 0 && this.spawn >= 1;
  }

  attack(fire: () => void): void {
    this.cooldown = 0.35 + Math.random() * 0.3;
    this.pulse = 1;
    fire();
  }

  update(dt: number, t: number, env: Env): void {
    this.spawn = Math.min(1, this.spawn + dt);
    this.pos.y = env.height(this.pos.x, this.pos.z);
    this.cooldown -= dt;
    this.pulse = Math.max(0, this.pulse - dt * 2);
    this.rot('ring', 0, 0, t * 0.45);
  }

  /** The hole's centre. */
  muzzle(out: THREE.Vector3): THREE.Vector3 {
    return out.set(0, 2.7 * this.scale, 0).add(this.pos);
  }
}

/** The captive black hole: an event horizon, a photon ring and a swirling accretion disc. */
export class HoleFx {
  readonly group = new THREE.Group();
  private readonly disc: THREE.Mesh;
  private readonly discMat: THREE.ShaderMaterial;
  private readonly haloMat: THREE.ShaderMaterial;

  constructor() {
    const horizon = new THREE.Mesh(new THREE.SphereGeometry(0.62, 32, 16), new THREE.MeshBasicMaterial({ color: 0x000000 }));
    this.haloMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uPulse: { value: 0 } },
      vertexShader: 'varying vec3 vN; varying vec3 vV; void main(){ vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position,1.0); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }',
      fragmentShader: 'uniform float uPulse; varying vec3 vN; varying vec3 vV; void main(){ float f = 1.0 - abs(dot(vN, vV)); float rim = pow(f, 4.0) * 2.4 + pow(f, 12.0) * 3.0; gl_FragColor = vec4(vec3(0.85, 0.65, 1.0) * rim * (1.0 + uPulse), 1.0); }',
    });
    const halo = new THREE.Mesh(new THREE.SphereGeometry(0.8, 32, 16), this.haloMat);
    this.discMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      uniforms: { uTime: { value: 0 }, uPulse: { value: 0 } },
      vertexShader: 'varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: `uniform float uTime; uniform float uPulse; varying vec2 vP;
        void main(){
          float r = length(vP);
          float a = atan(vP.y, vP.x);
          float k = clamp((r - 0.7) / 1.45, 0.0, 1.0);
          float arms = 0.55 + 0.45 * sin(a * 3.0 - log(r) * 9.0 + uTime * 2.6);
          float fade = smoothstep(0.0, 0.08, k) * pow(1.0 - k, 1.6);
          vec3 hot = mix(vec3(1.0, 0.92, 0.75), vec3(1.0, 0.45, 0.15), k);
          vec3 col = mix(hot, vec3(0.55, 0.25, 1.0), smoothstep(0.4, 1.0, k));
          gl_FragColor = vec4(col * fade * arms * (1.6 + uPulse * 1.5), 1.0);
        }`,
    });
    this.disc = new THREE.Mesh(new THREE.RingGeometry(0.7, 2.15, 64, 1), this.discMat);
    this.disc.rotation.x = -1.15;
    this.group.add(horizon, halo, this.disc);
    this.group.visible = false;
  }

  update(dt: number, t: number, unit: BlackHoleEngine | null): void {
    this.group.visible = !!unit && unit.spawn > 0.05;
    if (!unit) return;
    unit.muzzle(this.group.position);
    const s = unit.spawn;
    this.group.scale.setScalar(s);
    this.group.rotation.y = unit.yaw;
    this.disc.rotation.z += dt * 0.6;
    this.discMat.uniforms.uTime.value = t;
    this.discMat.uniforms.uPulse.value = unit.pulse;
    this.haloMat.uniforms.uPulse.value = unit.pulse;
  }
}

/**
 * Reality Printer: the head sweeps back and forth while a cube of fresh
 * reality grows on the build plate; when it's done, it's flung at the star.
 */
export class Printer extends Base {
  /** 0–1 build progress of the cube on the plate. */
  progress = Math.random() * 0.6;
  private readonly speed = 0.8 + Math.random() * 0.3;

  constructor(rig: Rig, slot: THREE.Vector3) {
    super(rig);
    this.pos.copy(slot);
    this.yaw = Math.atan2(-slot.x, -slot.z);
    this.scale = 1.15;
  }

  get ready(): boolean {
    return this.progress >= 1 && this.spawn >= 1;
  }

  attack(fire: () => void): void {
    fire();
    this.progress = 0;
  }

  update(dt: number, t: number, env: Env): void {
    this.spawn = Math.min(1, this.spawn + dt * 1.5);
    this.pos.y = env.height(this.pos.x, this.pos.z);
    this.progress = Math.min(1, this.progress + dt * this.speed);
    const printing = this.progress < 1;
    const sweep = printing ? Math.sin(t * 9 + this.seed) * 0.42 : 0;
    this.move('head', sweep, printing ? -0.05 - this.progress * 0.25 : 0, 0);
    this.rot('body', 0, 0, printing ? Math.sin(t * 18) * 0.004 : 0);
  }

  /** Centre of the cube on the plate. */
  muzzle(out: THREE.Vector3): THREE.Vector3 {
    const s = this.scale;
    return out.set(0, 0.9 + 0.15 * this.progress, 0.35).multiplyScalar(s).applyAxisAngle(UP, this.yaw).add(this.pos);
  }
}

/**
 * Paradox Engine: an hourglass that keeps flipping inside a turning Möbius
 * band. Its hits land before it fires: the star flinches, then the echo
 * travels back to the engine, which only then lights up.
 */
export class Paradox extends Base {
  private cooldown = Math.random();
  private flip = 0;
  private flipT = 0;
  private core = 0;
  glow = 0;

  constructor(rig: Rig, slot: THREE.Vector3) {
    super(rig);
    this.pos.copy(slot);
    this.yaw = Math.atan2(-slot.x, -slot.z);
    this.scale = 1.05;
  }

  get ready(): boolean {
    return this.cooldown <= 0 && this.spawn >= 1;
  }

  attack(fire: () => void): void {
    this.cooldown = 0.9 + Math.random() * 0.6;
    fire();
  }

  update(dt: number, t: number, env: Env): void {
    this.spawn = Math.min(1, this.spawn + dt * 1.5);
    this.pos.y = env.height(this.pos.x, this.pos.z);
    this.cooldown -= dt;
    this.glow = Math.max(0, this.glow - dt * 3);
    // Flip the hourglass every few seconds (an eased half turn).
    this.flipT -= dt;
    if (this.flipT <= 0) {
      this.flipT = 2.5 + Math.random() * 2;
      this.flip += 1;
    }
    this.core += (this.flip * Math.PI - this.core) * Math.min(1, dt * 4);
    this.rot('core', this.core, 0, 0);
    this.rot('ring', 0.9 + Math.sin(t * 0.4 + this.seed) * 0.3, t * 0.7, Math.cos(t * 0.3 + this.seed) * 0.25);
    this.move('ring', 0, Math.sin(t * 1.3 + this.seed) * 0.05 + this.glow * 0.08, 0);
  }

  muzzle(out: THREE.Vector3): THREE.Vector3 {
    return out.set(0, 1.95 * this.scale, 0).add(this.pos);
  }
}
