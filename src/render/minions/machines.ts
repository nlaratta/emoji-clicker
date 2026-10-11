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
