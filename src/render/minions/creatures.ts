import * as THREE from 'three';
import { POSE_STRIDE, makePose, type Crowd, type Rig } from './rig';

/**
 * Creature minions (Poke Monkeys, Rock Gorillas): little workers with
 * routines. Each runs a short plan of steps (walk to a reserved spot, work,
 * rest, eat, wander) and is animated procedurally from its current mode.
 * Attacks are requested by the production rate and handed to whichever
 * worker is ready, so what you see still tracks your gasps per second.
 */
export type Kind = 'monkey' | 'gorilla' | 'steam';
export type Mode = 'idle' | 'walk' | 'work' | 'sit' | 'eat' | 'cheer' | 'fidget' | 'pickup' | 'carry' | 'point';

export interface Spot {
  pos: THREE.Vector3;
  yaw: number;
  kind: string;
  taken: Creature | null;
  /** Seat height above the ground (a log, a bench), 0 for ground spots. */
  lift?: number;
}

export interface Circle {
  x: number;
  z: number;
  r: number;
}

export interface Env {
  height(x: number, z: number): number;
  colliders(): Circle[];
  spots(kind: string): Spot[];
  star: THREE.Vector3;
}

type Step =
  | { type: 'goto'; spot: Spot | null; to: THREE.Vector3; face?: number }
  | { type: 'work'; until: number }
  | { type: 'sit'; until: number }
  | { type: 'eat'; until: number }
  | { type: 'fidget'; until: number }
  | { type: 'pickup' }
  | { type: 'ready' };

const TAU = Math.PI * 2;
const tmp = new THREE.Vector3();
const tmp2 = new THREE.Vector3();
const STAR_R = 1.0;

const wrap = (a: number): number => {
  while (a > Math.PI) a -= TAU;
  while (a < -Math.PI) a += TAU;
  return a;
};

let nextId = 1;

export class Creature {
  readonly id = nextId++;
  readonly kind: Kind;
  readonly pos = new THREE.Vector3();
  yaw = 0;
  private speedNow = 0;
  mode: Mode = 'idle';
  private plan: Step[] = [];
  private spot: Spot | null = null;
  private stepTime = 0;
  /** One-shot action (poke/throw/cheer) progress 0..1, or -1. */
  action = -1;
  private actionDur = 0.5;
  private actionKind: 'poke' | 'prod' | 'throw' | 'cheer' | null = null;
  private onAction: (() => void) | null = null;
  private fired = false;
  holding: 'rock' | 'banana' | null = null;
  readonly pose: Float32Array;
  private target: Float32Array;
  private walkPhase = Math.random() * TAU;
  private stuck = 0;
  /** Current height above the ground: eases up onto seats. */
  private perch = 0;
  private lastPos = new THREE.Vector3();
  readonly tint = new THREE.Color();
  readonly scale: number;
  private readonly pace: number;
  private readonly laziness: number;
  /** Accessory visibility flags. */
  readonly acc: boolean[];
  spawn = 0;
  private lookYaw = 0;
  private lookPitch = 0;
  private cheerUntil = 0;
  private pointAt: THREE.Vector3 | null = null;
  private seed = Math.random() * 100;

  constructor(kind: Kind, rig: Rig) {
    this.kind = kind;
    this.pose = makePose(rig);
    this.target = makePose(rig);
    this.scale = (kind === 'monkey' ? 1.38 : kind === 'steam' ? 1.4 : 1.28) * (0.92 + Math.random() * 0.16);
    this.pace = 0.85 + Math.random() * 0.3;
    this.laziness = Math.random();
    const h = (Math.random() - 0.5) * 0.06;
    const v = 0.88 + Math.random() * 0.2;
    this.tint.setRGB(v * (1 + h), v, v * (1 - h));
    this.acc = kind === 'monkey' ? [Math.random() < 0.3, Math.random() < 0.35] : kind === 'gorilla' ? [Math.random() < 0.35] : [];
    if (kind === 'steam') {
      // Brass ages differently on every bot.
      const v = 0.85 + Math.random() * 0.25;
      this.tint.setRGB(v * (1.02 + h), v, v * (0.95 - h));
    }
  }

  get ready(): boolean {
    if (this.action >= 0) return false;
    const step = this.plan[0];
    if (this.kind !== 'gorilla') return step?.type === 'work' && this.mode === 'work';
    return step?.type === 'ready' && this.holding === 'rock';
  }

  /** True while the creature is on its way to (or at) a working position. */
  get busy(): boolean {
    const s = this.plan[0];
    return !!s && (s.type === 'work' || s.type === 'ready' || s.type === 'pickup' || (s.type === 'goto' && !!s.spot && (s.spot.kind === 'poke' || s.spot.kind === 'prod' || s.spot.kind === 'throw' || s.spot.kind === 'rockpile')));
  }

  release(): void {
    if (this.spot) this.spot.taken = null;
    this.spot = null;
  }

  /** Perform an attack now; `fire` is called at the moment of impact/release. */
  attack(fire: () => void): void {
    this.actionKind = this.kind === 'monkey' ? 'poke' : this.kind === 'steam' ? 'prod' : 'throw';
    this.actionDur = this.kind === 'monkey' ? 0.42 / this.pace : this.kind === 'steam' ? 0.5 : 0.7;
    this.action = 0;
    this.fired = false;
    this.onAction = fire;
  }

  cheer(time: number, dur = 1.2): void {
    if (this.action >= 0 && this.actionKind !== 'cheer') return;
    this.cheerUntil = time + dur * (0.8 + Math.random() * 0.4);
  }

  point(at: THREE.Vector3 | null): void {
    this.pointAt = at;
  }

  // ── Planning ──

  private reserve(env: Env, kind: string, near?: THREE.Vector3): Spot | null {
    const spots = env.spots(kind).filter((s) => !s.taken || s.taken === this);
    if (!spots.length) return null;
    const from = near ?? this.pos;
    spots.sort((a, b) => a.pos.distanceToSquared(from) - b.pos.distanceToSquared(from) + (Math.random() - 0.5) * 6);
    const s = spots[0];
    this.release();
    s.taken = this;
    this.spot = s;
    return s;
  }

  private choose(env: Env, time: number, demand: number): void {
    // Demand (queued attacks, rally) pulls everyone to work; laziness pulls toward breaks.
    const breakChance = Math.max(0, 0.42 * (0.5 + this.laziness) - demand * 0.5);
    const roll = Math.random();
    if (this.kind === 'steam') {
      if (roll < breakChance * 0.4) {
        const seat = this.reserve(env, 'shade') ?? this.reserve(env, 'seat');
        if (seat) return void this.plan.push({ type: 'goto', spot: seat, to: seat.pos, face: seat.yaw }, { type: 'fidget', until: time + 3 + Math.random() * 3 });
      }
      const s = this.reserve(env, 'prod');
      if (s) this.plan.push({ type: 'goto', spot: s, to: s.pos, face: s.yaw }, { type: 'work', until: time + 7 + Math.random() * 8 });
      else this.plan.push({ type: 'fidget', until: time + 1.5 });
      return;
    }
    if (this.kind === 'monkey') {
      if (roll < breakChance * 0.45) {
        const seat = this.reserve(env, 'seat');
        if (seat) return void this.plan.push({ type: 'goto', spot: seat, to: seat.pos, face: seat.yaw }, { type: 'sit', until: time + 4 + Math.random() * 5 });
      } else if (roll < breakChance * 0.75) {
        const food = this.reserve(env, 'eat');
        if (food) return void this.plan.push({ type: 'goto', spot: food, to: food.pos, face: food.yaw }, { type: 'eat', until: time + 3 + Math.random() * 3 });
      } else if (roll < breakChance) {
        const a = Math.random() * TAU;
        const r = 3 + Math.random() * 3;
        this.release();
        return void this.plan.push({ type: 'goto', spot: null, to: new THREE.Vector3(Math.sin(a) * r, 0, Math.cos(a) * r - 1.5) }, { type: 'fidget', until: time + 2 + Math.random() * 2 });
      }
      const s = this.reserve(env, 'poke');
      if (s) this.plan.push({ type: 'goto', spot: s, to: s.pos, face: s.yaw }, { type: 'work', until: time + 6 + Math.random() * 8 });
      else this.plan.push({ type: 'fidget', until: time + 1.5 });
      return;
    }
    // Gorilla: fetch a rock, carry it to a throwing spot, wait for the order.
    if (this.holding !== 'rock') {
      if (roll < breakChance * 0.5) {
        const seat = this.reserve(env, 'seat') ?? this.reserve(env, 'shade');
        if (seat) return void this.plan.push({ type: 'goto', spot: seat, to: seat.pos, face: seat.yaw }, { type: 'sit', until: time + 4 + Math.random() * 4 });
      }
      const pile = env.spots('rockpile');
      if (pile.length) {
        const p = pile[Math.floor(Math.random() * pile.length)];
        const a = Math.random() * TAU;
        const at = p.pos.clone().add(new THREE.Vector3(Math.sin(a) * 1.25, 0, Math.cos(a) * 1.25));
        this.release();
        this.plan.push({ type: 'goto', spot: null, to: at, face: Math.atan2(p.pos.x - at.x, p.pos.z - at.z) }, { type: 'pickup' });
        return;
      }
      this.holding = 'rock';
    }
    const s = this.reserve(env, 'throw');
    if (s) this.plan.push({ type: 'goto', spot: s, to: s.pos, face: s.yaw }, { type: 'ready' });
    else this.plan.push({ type: 'fidget', until: time + 1.5 });
  }

  // ── Simulation ──

  update(dt: number, time: number, env: Env, crowd: Creature[], demand: number): void {
    this.spawn = Math.min(1, this.spawn + dt * 2.5);
    if (!this.plan.length) this.choose(env, time, demand);
    const step = this.plan[0];
    this.stepTime += dt;
    let moving = false;
    let wantYaw = this.yaw;

    if (step?.type === 'goto') {
      const d = tmp.copy(step.to).sub(this.pos).setY(0);
      const dist = d.length();
      if (dist < 0.12) {
        this.plan.shift();
        this.stepTime = 0;
        if (step.face !== undefined) wantYaw = step.face;
      } else {
        moving = true;
        const speed = (this.kind === 'monkey' ? 1.35 : this.kind === 'steam' ? 0.9 : 1.0) * this.pace * Math.min(1, dist / 0.5 + 0.35);
        const dir = d.multiplyScalar(1 / dist);
        this.steer(dir, env, crowd, step.to);
        this.speedNow += (speed - this.speedNow) * Math.min(1, dt * 6);
        this.pos.addScaledVector(dir, this.speedNow * dt);
        wantYaw = Math.atan2(dir.x, dir.z);
        // Unstick: if we've barely moved for a while, give up on this target.
        this.stuck = this.pos.distanceTo(this.lastPos) < 0.05 * dt * 60 ? this.stuck + dt : 0;
        if (this.stuck > 2.5) {
          this.plan = [];
          this.release();
          this.stuck = 0;
        }
      }
    } else if (step) {
      const until = 'until' in step ? step.until : Infinity;
      if (step.type === 'pickup' && this.stepTime > 1.1) {
        this.holding = 'rock';
        this.plan.shift();
        this.stepTime = 0;
      } else if (time > until && this.action < 0) {
        this.plan.shift();
        this.stepTime = 0;
        if (step.type !== 'work') this.release();
        if (step.type === 'eat' && this.holding === 'banana') this.holding = null;
      }
      if (step.type === 'eat' && this.stepTime > 0.4) this.holding = 'banana';
      if (this.spot) wantYaw = this.spot.yaw;
    }
    if (!moving) this.speedNow = Math.max(0, this.speedNow - dt * 5);
    this.lastPos.copy(this.pos);

    // Face the star while working; turn smoothly.
    if (step?.type === 'work' || step?.type === 'ready') wantYaw = Math.atan2(env.star.x - this.pos.x, env.star.z - this.pos.z);
    this.yaw += wrap(wantYaw - this.yaw) * Math.min(1, dt * (moving ? 8 : 5));
    const sitting = !moving && step?.type === 'sit' && this.spot !== null;
    this.perch += ((sitting ? (this.spot?.lift ?? 0) : 0) - this.perch) * Math.min(1, dt * 7);
    this.pos.y = env.height(this.pos.x, this.pos.z) + this.perch;

    // Mode drives the pose.
    const cheering = time < this.cheerUntil;
    this.mode = moving
      ? (this.holding === 'rock' ? 'carry' : 'walk')
      : cheering ? 'cheer'
        : this.pointAt ? 'point'
          : step?.type === 'work' ? 'work'
            : step?.type === 'ready' ? 'carry'
              : step?.type === 'sit' ? 'sit'
                : step?.type === 'eat' ? 'eat'
                  : step?.type === 'pickup' ? 'pickup'
                    : step?.type === 'fidget' ? 'fidget' : 'idle';

    if (this.action >= 0) {
      this.action += dt / this.actionDur;
      const fireAt = this.actionKind === 'throw' ? 0.55 : this.actionKind === 'prod' ? 0.42 : 0.48;
      if (!this.fired && this.action >= fireAt) {
        this.fired = true;
        this.onAction?.();
        if (this.actionKind === 'throw') {
          this.holding = null;
          this.plan = [];
          // Sometimes a celebratory chest-beat before fetching the next rock.
          if (Math.random() < 0.3) this.cheerUntil = time + 1.1;
        }
      }
      if (this.action >= 1) {
        this.action = -1;
        this.actionKind = null;
      }
    }

    // Look target: the star (or what we're pointing at), within neck limits.
    const look = this.pointAt ?? env.star;
    const ly = Math.atan2(look.x - this.pos.x, look.z - this.pos.z);
    const ldist = Math.hypot(look.x - this.pos.x, look.z - this.pos.z);
    const lp = Math.atan2(look.y - (this.pos.y + 0.6), ldist);
    this.lookYaw += (THREE.MathUtils.clamp(wrap(ly - this.yaw), -0.9, 0.9) - this.lookYaw) * Math.min(1, dt * 4);
    this.lookPitch += (THREE.MathUtils.clamp(lp, -0.4, 0.6) - this.lookPitch) * Math.min(1, dt * 4);

    this.animate(dt, time);
  }

  /** Steering: head for `dir`, slide around colliders and other creatures. */
  private steer(dir: THREE.Vector3, env: Env, crowd: Creature[], goal: THREE.Vector3): void {
    const me = this.kind === 'monkey' ? 0.22 : 0.38;
    for (const c of env.colliders()) {
      // The thing we're heading for (a bench, a log) doesn't push us away.
      if (Math.hypot(goal.x - c.x, goal.z - c.z) < c.r + 0.3) continue;
      tmp2.set(c.x - this.pos.x, 0, c.z - this.pos.z);
      const d = tmp2.length();
      const reach = c.r + me + 0.25;
      if (d < reach + 0.6 && tmp2.dot(dir) > 0) {
        // Push sideways around the obstacle, stronger when close.
        const side = dir.x * tmp2.z - dir.z * tmp2.x > 0 ? 1 : -1;
        const k = THREE.MathUtils.clamp((reach + 0.6 - d) / 0.6, 0, 1.5);
        dir.x += -tmp2.z / d * side * k;
        dir.z += tmp2.x / d * side * k;
        if (d < reach) {
          dir.x -= tmp2.x / d * (reach - d) * 3;
          dir.z -= tmp2.z / d * (reach - d) * 3;
        }
      }
    }
    const room = this.kind === 'monkey' ? 0.5 : 0.95;
    for (const o of crowd) {
      if (o === this) continue;
      tmp2.set(this.pos.x - o.pos.x, 0, this.pos.z - o.pos.z);
      const d = tmp2.length();
      if (d > 0.001 && d < room) dir.addScaledVector(tmp2, (room - d) / d * 1.5);
    }
    dir.setY(0).normalize();
  }

  // ── Animation ──

  private set(part: number, rx = 0, ry = 0, rz = 0, tx = 0, ty = 0, tz = 0, s = 1): void {
    if (part < 0) return;
    const o = part * POSE_STRIDE;
    const t = this.target;
    t[o] = rx;
    t[o + 1] = ry;
    t[o + 2] = rz;
    t[o + 3] = tx;
    t[o + 4] = ty;
    t[o + 5] = tz;
    t[o + 6] = s;
  }

  private add(part: number, rx = 0, ry = 0, rz = 0, tx = 0, ty = 0, tz = 0): void {
    if (part < 0) return;
    const o = part * POSE_STRIDE;
    const t = this.target;
    t[o] += rx;
    t[o + 1] += ry;
    t[o + 2] += rz;
    t[o + 3] += tx;
    t[o + 4] += ty;
    t[o + 5] += tz;
  }

  private parts: Record<string, number> = {};

  bindRig(rig: Rig): void {
    const ix = (n: string): number => rig.index[n] ?? -1;
    this.parts = { body: ix('body'), head: ix('head'), armL: ix('armL'), armR: ix('armR'), legL: ix('legL'), legR: ix('legR'), tail: ix('tail'), tool: ix('tool'), acc0: ix('acc0'), acc1: ix('acc1') };
  }

  private animate(dt: number, t: number): void {
    const P = this.parts;
    const T = this.target;
    for (let i = 0; i < T.length; i += POSE_STRIDE) {
      T[i] = T[i + 1] = T[i + 2] = T[i + 3] = T[i + 4] = T[i + 5] = 0;
      T[i + 6] = 1;
    }
    const mk = this.kind === 'monkey';
    const ph = t * 2 + this.seed;
    // Breathing and idle life on every pose.
    this.set(P.body, 0, 0, 0, 0, Math.sin(ph * 1.1) * 0.006, 0);
    this.set(P.head, -this.lookPitch * 0.7, this.lookYaw, Math.sin(ph * 0.7) * 0.05);
    if (P.tail >= 0) this.set(P.tail, Math.sin(ph * 1.3) * 0.15, Math.sin(ph * 0.9) * 0.35, 0);
    if (mk && P.tool >= 0) this.set(P.tool, 0.2, 0, 0);

    const m = this.mode;
    if (this.kind === 'steam') {
      this.animateSteam(dt, t, m, ph);
    } else if (m === 'walk' || m === 'carry' && this.speedNow > 0.05) {
      const stride = mk ? 0.34 : 0.5;
      this.walkPhase += (this.speedNow * dt) / stride * Math.PI;
      const s = Math.sin(this.walkPhase);
      const a = Math.min(1, this.speedNow);
      const swing = (mk ? 0.75 : 0.45) * a;
      this.add(P.legL, s * swing);
      this.add(P.legR, -s * swing);
      this.add(P.body, mk ? 0.12 * a : 0.05 * a, 0, Math.sin(this.walkPhase) * (mk ? 0.07 : 0.05) * a, 0, Math.abs(Math.cos(this.walkPhase)) * (mk ? 0.04 : 0.025) * a);
      if (m === 'carry') {
        // Rock hugged to the chest, waddling upright.
        this.add(P.armL, -1.15, 0, -0.32);
        this.add(P.armR, -1.15, 0, 0.32);
        this.add(P.body, -0.28);
      } else {
        this.add(P.armL, -s * swing * (mk ? 0.9 : 1.1));
        this.add(P.armR, s * swing * (mk ? 0.9 : 1.1));
      }
      if (mk && P.tool >= 0) this.add(P.tool, -0.6);
    } else if (m === 'work') {
      // Monkey: stick levelled at the star, weight on the front foot.
      this.add(P.body, 0.1);
      this.add(P.armR, -0.85, 0, -0.1);
      this.add(P.armL, -0.45, 0, 0.25);
      this.add(P.tool, 0.35 - this.lookPitch * 0.6);
      this.add(P.legR, -0.15);
      this.add(P.legL, 0.12);
    } else if (m === 'carry') {
      // Gorilla up on its legs, rock hugged to the chest, bouncing impatiently.
      const bounce = Math.abs(Math.sin(ph * 2.2));
      this.add(P.armL, -1.2 + Math.sin(ph * 2) * 0.05, 0, -0.32);
      this.add(P.armR, -1.2 - Math.sin(ph * 2) * 0.05, 0, 0.32);
      this.add(P.body, -0.32, 0, Math.sin(ph) * 0.04, 0, 0.03 + bounce * 0.02);
      this.add(P.head, -0.2);
    } else if (m === 'sit') {
      this.add(P.body, -0.12, 0, 0, 0, mk ? -0.13 : -0.18, -0.02);
      this.add(P.legL, -1.35, 0, 0.12);
      this.add(P.legR, -1.35, 0, -0.12);
      this.add(P.armL, -0.55, 0, 0.12);
      this.add(P.armR, -0.55 + Math.max(0, Math.sin(ph * 0.35)) * -0.6, 0, -0.12);
      this.add(P.head, Math.sin(ph * 0.5) * 0.08, Math.sin(ph * 0.21) * 0.4);
      if (mk && P.tool >= 0) this.add(P.tool, -1.2);
    } else if (m === 'eat') {
      this.add(P.body, -0.06);
      const chew = Math.sin(ph * 6);
      this.add(P.armL, -2.15 + chew * 0.08, 0, 0.35);
      this.add(P.head, 0.05 + chew * 0.04);
      this.add(P.armR, -0.3);
    } else if (m === 'pickup') {
      const k = Math.min(1, this.stepTime / 0.5);
      const lift = Math.max(0, (this.stepTime - 0.6) / 0.5);
      this.add(P.body, 0.45 * k * (1 - lift), 0, 0, 0, -0.1 * k * (1 - lift));
      this.add(P.armL, (-0.7 * k) * (1 - lift) - 1.15 * lift, 0, -0.3 * lift);
      this.add(P.armR, (-0.7 * k) * (1 - lift) - 1.15 * lift, 0, 0.3 * lift);
    } else if (m === 'fidget') {
      if (mk) {
        // Scratch the head, look around.
        this.add(P.armL, -2.7, 0, -0.5 + Math.sin(ph * 9) * 0.12);
        this.add(P.head, 0.1, Math.sin(ph * 0.8) * 0.5, 0.25);
        this.add(P.body, 0, 0, Math.sin(ph * 0.8) * 0.05);
      } else {
        // Gorilla: sit back on its haunches and scratch its belly.
        this.add(P.body, -0.2, 0, Math.sin(ph * 0.6) * 0.04, 0, -0.06);
        this.add(P.armR, -0.9, 0, 0.55 + Math.sin(ph * 10) * 0.08);
        this.add(P.armL, 0.15);
        this.add(P.head, -0.15, Math.sin(ph * 0.5) * 0.6, 0.1);
      }
    } else if (m === 'point') {
      this.add(P.armR, -2.6, 0, -0.2);
      this.add(P.head, -0.25);
    }

    if (m === 'cheer' && this.kind !== 'steam') {
      if (mk) {
        const hop = Math.abs(Math.sin(t * 9 + this.seed));
        this.add(P.body, -0.1, 0, 0, 0, hop * 0.16);
        this.add(P.legL, -0.3 * hop, 0, 0.1, 0, hop * 0.16);
        this.add(P.legR, -0.3 * hop, 0, -0.1, 0, hop * 0.16);
        this.add(P.armL, -2.8, 0, 0.35 + Math.sin(t * 18) * 0.2);
        this.add(P.armR, -2.8, 0, -0.35 - Math.sin(t * 18) * 0.2);
        this.add(P.head, -0.3);
      } else {
        // Chest beat.
        const b = Math.sin(t * 17 + this.seed);
        this.add(P.body, -0.35, 0, 0, 0, 0.06);
        this.add(P.armL, -1.4 + b * 0.25, 0, -0.75);
        this.add(P.armR, -1.4 - b * 0.25, 0, 0.75);
        this.add(P.head, -0.35);
      }
    }

    // One-shot actions layered on top.
    if (this.action >= 0 && this.actionKind === 'prod') {
      const a = this.action;
      const shove = a < 0.3 ? -a / 0.3 * 0.3 : a < 0.45 ? -0.3 + (a - 0.3) / 0.15 * 1.3 : 1 - (a - 0.45) / 0.55;
      this.add(P.tool, 0, 0, 0, 0, 0, Math.max(-0.08, shove) * 0.55);
      this.add(P.body, -0.1 + Math.max(0, shove) * 0.2, 0, 0, 0, 0, Math.max(0, shove) * 0.05);
    } else if (this.action >= 0) {
      const a = this.action;
      if (this.actionKind === 'poke') {
        // Wind up, thrust, recover.
        const wind = a < 0.35 ? a / 0.35 : a < 0.5 ? 1 - (a - 0.35) / 0.15 : 0;
        const thrust = a < 0.35 ? 0 : a < 0.5 ? (a - 0.35) / 0.15 : 1 - (a - 0.5) / 0.5;
        this.add(P.body, -0.12 * wind + 0.22 * thrust, 0, 0, 0, 0, -0.04 * wind + 0.12 * thrust);
        this.add(P.armR, 0.4 * wind - 0.45 * thrust);
        this.add(P.tool, -0.1 * wind + 0.15 * thrust);
        this.add(P.legR, -0.25 * thrust);
        this.add(P.head, 0.05 * thrust);
      } else if (this.actionKind === 'throw') {
        // Heave: lift the rock overhead, then hurl it forward.
        const wind = a < 0.4 ? a / 0.4 : a < 0.55 ? 1 - (a - 0.4) / 0.15 : 0;
        const swing = a < 0.4 ? 0 : a < 0.6 ? (a - 0.4) / 0.2 : 1 - (a - 0.6) / 0.4;
        this.add(P.armL, -1.3 * wind + 0.5 * swing, 0, 0.3 * wind);
        this.add(P.armR, -1.3 * wind + 0.5 * swing, 0, -0.3 * wind);
        this.add(P.body, -0.25 * wind + 0.5 * swing, 0, 0, 0, 0.04 * wind, -0.05 * wind + 0.12 * swing);
        this.add(P.head, -0.25 * wind + 0.15 * swing);
      }
    }

    // Accessories: scale 0 hides them.
    if (P.acc0 >= 0) T[P.acc0 * POSE_STRIDE + 6] = this.acc[0] ? 1 : 0;
    if (P.acc1 >= 0) T[P.acc1 * POSE_STRIDE + 6] = this.acc[1] ? 1 : 0;

    // Ease the displayed pose toward the target: smooth transitions between modes.
    const k = 1 - Math.exp(-(this.action >= 0 ? 30 : 13) * dt);
    const S = this.pose;
    for (let i = 0; i < S.length; i++) {
      S[i] += (T[i] - S[i]) * ((i % POSE_STRIDE) === 6 ? 1 : k);
    }
  }

  /** The brass bot: a rolling waddle, a stance with the piston levelled at the star. */
  private animateSteam(dt: number, t: number, m: Mode, ph: number): void {
    const P = this.parts;
    if (m === 'walk') {
      this.walkPhase += (this.speedNow * dt) / 0.18 * Math.PI;
      const s = Math.sin(this.walkPhase);
      const a = Math.min(1, this.speedNow);
      this.add(P.legL, s * 0.6 * a);
      this.add(P.legR, -s * 0.6 * a);
      this.add(P.body, 0.06 * a, 0, s * 0.14 * a, 0, Math.abs(Math.cos(this.walkPhase)) * 0.035 * a);
      this.add(P.armL, -s * 0.4 * a, 0, 0.2);
      this.add(P.armR, -0.2);
    } else if (m === 'work') {
      this.add(P.armR, -0.15 - this.lookPitch * 0.8);
      this.add(P.armL, -0.6, 0, 0.3 + Math.sin(ph * 3) * 0.1);
      this.add(P.body, 0.05, 0, Math.sin(ph * 1.7) * 0.03);
    } else if (m === 'cheer') {
      const hop = Math.abs(Math.sin(t * 8 + this.seed));
      this.add(P.body, 0, 0, Math.sin(t * 16) * 0.12, 0, hop * 0.12);
      this.add(P.armL, -2.4, 0, 0.3);
      this.add(P.armR, -1.6);
    } else {
      // Idle: a little shimmy, valve wheel twiddling.
      this.add(P.body, 0, 0, Math.sin(ph * 1.3) * 0.05, 0, Math.max(0, Math.sin(ph * 2.6)) * 0.01);
      this.add(P.armL, -0.4 + Math.sin(ph * 2) * 0.2, 0, 0.25);
      this.add(P.armR, -0.25);
    }
    void dt;
  }

  /** Where this creature's hit lands on the star (for impact effects). */
  hitPoint(env: Env, out: THREE.Vector3): THREE.Vector3 {
    const h = this.kind === 'monkey' ? 0.75 : 1.2;
    out.set(this.pos.x - env.star.x, h - env.star.y, this.pos.z - env.star.z).normalize().multiplyScalar(STAR_R * 0.98).add(env.star);
    return out;
  }

  /** Root transform for rendering. */
  matrix(out: THREE.Matrix4): THREE.Matrix4 {
    const s = this.scale * easeOutBack(this.spawn);
    return out.compose(this.pos, _q.setFromAxisAngle(UP, this.yaw), _s.set(s, s, s));
  }
}

const UP = new THREE.Vector3(0, 1, 0);
const _q = new THREE.Quaternion();
const _s = new THREE.Vector3();
function easeOutBack(x: number): number {
  const c1 = 1.7;
  const c3 = c1 + 1;
  return x >= 1 ? 1 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

/** Draw a crowd of creatures of one kind. */
export function drawCrowd(crowd: Crowd, list: Creature[], m: THREE.Matrix4): void {
  crowd.begin();
  for (const c of list) crowd.add(c.matrix(m), c.pose, c.tint);
  crowd.end();
}
