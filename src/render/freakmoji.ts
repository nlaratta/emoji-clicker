import * as THREE from 'three';
import { Spring, approach } from './springs';

/**
 * The star: a procedurally modelled 3D Freakmoji. Every feature is its own
 * mesh so it can react: dents where it's hit, squash and stretch, eyes that
 * track the cursor and blink, brows that leap, and gloved hands that flinch
 * away from the mouth to reveal a gasp.
 */

export type Mood = 'shocked' | 'freakout' | 'calm' | 'worried';

const MAX_DENTS = 6;
const HEAD_R = 1;

interface HandPose {
  pos: THREE.Vector3;
  quat: THREE.Quaternion;
  spread: number;
  curl: number;
}

const Y = new THREE.Vector3(0, 1, 0);

/** A hand resting on the face: centred over (x, y) on the sphere, `dist` from
 *  the centre, fingers pointing along the surface rotated by `roll`. */
function onFace(x: number, y: number, dist: number, roll: number, spread: number, curl: number): HandPose {
  const n = new THREE.Vector3(x, y, Math.sqrt(Math.max(0, 1 - x * x - y * y))).normalize();
  const up = Y.clone().addScaledVector(n, -Y.dot(n)).normalize();
  up.applyAxisAngle(n, roll);
  const side = new THREE.Vector3().crossVectors(up, n);
  const m = new THREE.Matrix4().makeBasis(side, up, n);
  return { pos: n.multiplyScalar(dist), quat: new THREE.Quaternion().setFromRotationMatrix(m), spread, curl };
}

function free(x: number, y: number, z: number, rx: number, ry: number, rz: number, spread: number, curl: number): HandPose {
  return {
    pos: new THREE.Vector3(x, y, z),
    quat: new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)),
    spread,
    curl,
  };
}

/** Poses for [left hand (viewer's left), right hand]. */
const POSES: Record<'cover' | 'flinch' | 'calm' | 'worried', [HandPose, HandPose]> = {
  cover: [onFace(-0.34, -0.27, 1.06, -0.32, 0.12, -0.45), onFace(0.1, -0.5, 1.1, 1.75, 0.05, -0.5)],
  flinch: [free(-1.45, 0.15, 0.3, 0.1, 0.5, 0.45, 1, 0.1), free(1.45, 0.15, 0.3, 0.1, -0.5, -0.45, 1, 0.1)],
  calm: [free(-0.9, -0.95, 0.3, 0.5, 0.3, 2.8, 0.15, -0.5), free(0.9, -0.95, 0.3, 0.5, -0.3, -2.8, 0.15, -0.5)],
  worried: [onFace(-0.8, -0.32, 1.08, 0.25, 0.3, -0.3), onFace(0.8, -0.32, 1.08, -0.25, 0.3, -0.3)],
};

function headMaterial(dents: THREE.Vector4[]): THREE.MeshPhysicalMaterial {
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xffc61a,
    roughness: 0.34,
    metalness: 0,
    clearcoat: 0.7,
    clearcoatRoughness: 0.22,
  });
  const uniforms = {
    uDents: { value: dents },
    uRim: { value: new THREE.Color(0xe86a00) },
    uCore: { value: new THREE.Color(0xffcf1f) },
    uTint: { value: new THREE.Color(1, 1, 1) },
    uTintAmt: { value: 0 },
  };
  mat.userData.uniforms = uniforms;
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
uniform vec4 uDents[${MAX_DENTS}];
varying vec3 vObjNormal;
float dentShape(float d) { return smoothstep(0.80, 1.0, d); }
float dentSlope(float d) { float t = clamp((d - 0.80) / 0.20, 0.0, 1.0); return 6.0 * t * (1.0 - t) / 0.20; }`,
      )
      .replace(
        '#include <beginnormal_vertex>',
        `#include <beginnormal_vertex>
vec3 nrm0 = normalize(position);
vObjNormal = nrm0;
vec3 tilt = vec3(0.0);
for (int i = 0; i < ${MAX_DENTS}; i++) {
  float dd = dot(nrm0, uDents[i].xyz);
  tilt += uDents[i].w * dentSlope(dd) * (uDents[i].xyz - dd * nrm0);
}
objectNormal = normalize(objectNormal + tilt * 1.4);`,
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
float dent = 0.0;
for (int i = 0; i < ${MAX_DENTS}; i++) dent += uDents[i].w * dentShape(dot(nrm0, uDents[i].xyz));
transformed -= nrm0 * dent;`,
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
uniform vec3 uRim; uniform vec3 uCore; uniform vec3 uTint; uniform float uTintAmt;
varying vec3 vObjNormal;`,
      )
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
// Emoji gradient: hot yellow core, deep orange rim and underside.
float facing = clamp(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 0.0, 1.0);
float under = smoothstep(0.2, -0.9, vObjNormal.y);
vec3 grad = mix(uRim, uCore, pow(facing, 0.75));
grad = mix(grad, uRim * 0.85, under * 0.55);
diffuseColor.rgb = mix(grad, uTint, uTintAmt);`,
      );
  };
  return mat;
}

function buildHand(mat: THREE.Material): { group: THREE.Group; fingers: THREE.Object3D[]; thumb: THREE.Object3D } {
  const group = new THREE.Group();
  const palm = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 16), mat);
  palm.scale.set(0.24, 0.26, 0.11);
  group.add(palm);
  const fingers: THREE.Object3D[] = [];
  const lengths = [0.16, 0.2, 0.19, 0.14];
  const xs = [-0.15, -0.05, 0.055, 0.155];
  for (let i = 0; i < 4; i++) {
    const pivot = new THREE.Object3D();
    pivot.position.set(xs[i], 0.17, 0);
    const f = new THREE.Mesh(new THREE.CapsuleGeometry(0.062, lengths[i], 6, 12), mat);
    f.position.y = lengths[i] / 2 + 0.04;
    pivot.add(f);
    pivot.userData.baseZ = (i - 1.5) * -0.07;
    group.add(pivot);
    fingers.push(pivot);
  }
  const thumb = new THREE.Object3D();
  thumb.position.set(0.2, -0.05, 0.02);
  const t = new THREE.Mesh(new THREE.CapsuleGeometry(0.062, 0.13, 6, 12), mat);
  t.position.y = 0.1;
  thumb.add(t);
  thumb.rotation.z = -1.0;
  group.add(thumb);
  return { group, fingers, thumb };
}

export class Freakmoji {
  readonly root = new THREE.Group();
  /** Moves with recoil; aligned so squash happens along the hit axis. */
  private recoil = new THREE.Group();
  private squashFrame = new THREE.Group();
  private body = new THREE.Group();
  readonly head: THREE.Mesh;
  readonly hitSphere: THREE.Mesh;
  readonly eyes: THREE.Mesh[] = [];
  readonly hands: THREE.Group[] = [];
  readonly brows: THREE.Mesh[] = [];
  private pupils: THREE.Group[] = [];
  private lids: THREE.Mesh[] = [];
  private eyeCenters: THREE.Vector3[] = [];
  private handParts: { fingers: THREE.Object3D[]; thumb: THREE.Object3D }[] = [];
  private mouth: THREE.Group;
  private mouthOuter: THREE.Mesh;
  private sweat: THREE.Mesh[] = [];
  private headMat: THREE.MeshPhysicalMaterial;
  private gloveMat: THREE.MeshStandardMaterial;

  private dents = Array.from({ length: MAX_DENTS }, () => new THREE.Vector4(0, 0, 1, 0));
  private dentSprings = Array.from({ length: MAX_DENTS }, () => new Spring(0, 260, 9));
  private nextDent = 0;

  private squash = new Spring(0, 220, 11);
  private recoilX = new Spring(0, 140, 12);
  private recoilY = new Spring(0, 140, 12);
  private recoilZ = new Spring(0, 140, 12);
  private tiltX = new Spring(0, 90, 9);
  private tiltZ = new Spring(0, 90, 9);
  private browLift = new Spring(0, 200, 10);
  private eyeScale = new Spring(1, 220, 12);
  private flinch = new Spring(0, 70, 11);
  private gasp = new Spring(0, 120, 12);
  private poseW = { cover: 1, flinch: 0, calm: 0, worried: 0 };

  mood: Mood = 'shocked';
  /** 0–1: trembles during charge-ups and Freak Outs. */
  tremble = 0;
  private lookTarget = new THREE.Vector3(0, 1.4, 6);
  private lookCurrent = new THREE.Vector3(0, 1.4, 6);
  private blinkTimer = 2.5;
  private blink = 0;
  private time = 0;
  private flinchHold = 0;
  private squashQuat = new THREE.Quaternion();
  private tmpV = new THREE.Vector3();
  private tmpQ = new THREE.Quaternion();

  constructor() {
    this.headMat = headMaterial(this.dents);
    this.head = new THREE.Mesh(new THREE.SphereGeometry(HEAD_R, 96, 64), this.headMat);
    this.head.name = 'face';

    this.root.add(this.recoil);
    this.recoil.add(this.squashFrame);
    this.squashFrame.add(this.body);
    this.body.add(this.head);

    // Generous invisible hit volume for clicks.
    this.hitSphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.22, 24, 16),
      new THREE.MeshBasicMaterial({ visible: false }),
    );
    this.root.add(this.hitSphere);

    // Eyes: tall glossy ovals that bulge out of the face.
    const eyeMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.08 });
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x050507 });
    const glintMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const lidMat = new THREE.MeshPhysicalMaterial({ color: 0xffbe12, roughness: 0.36, clearcoat: 0.8, clearcoatRoughness: 0.2, side: THREE.DoubleSide });
    for (const side of [-1, 1]) {
      const c = new THREE.Vector3(side * 0.33, 0.27, 0);
      c.z = Math.sqrt(1 - c.x * c.x - c.y * c.y) * 0.93;
      this.eyeCenters.push(c.clone());
      const eyeGroup = new THREE.Group();
      eyeGroup.position.copy(c);
      eyeGroup.lookAt(c.clone().multiplyScalar(2));
      const eye = new THREE.Mesh(new THREE.SphereGeometry(1, 40, 28), eyeMat);
      eye.scale.set(0.29, 0.345, 0.2);
      eye.name = 'eye';
      eyeGroup.add(eye);
      this.eyes.push(eye);

      const pupil = new THREE.Group();
      const p = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), pupilMat);
      p.scale.set(0.088, 0.088, 0.02);
      pupil.add(p);
      const glint = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 8), glintMat);
      glint.scale.set(0.026, 0.026, 0.01);
      glint.position.set(0.032, 0.032, 0.016);
      pupil.add(glint);
      eyeGroup.add(pupil);
      this.pupils.push(pupil);

      // Upper lid: a shell that rotates down over the eye to blink or look smug.
      const lid = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), lidMat);
      lid.scale.set(0.305, 0.36, 0.215);
      lid.rotation.x = -1.62;
      eyeGroup.add(lid);
      this.lids.push(lid);

      this.body.add(eyeGroup);
    }

    // Brows: floating charcoal arcs, higher toward the middle (perpetual alarm).
    const browMat = new THREE.MeshStandardMaterial({ color: 0x2c2c30, roughness: 0.45 });
    for (const side of [-1, 1]) {
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-0.23, -0.035, 0),
        new THREE.Vector3(0, 0.06, 0.03),
        new THREE.Vector3(0.23, -0.035, 0),
      );
      const brow = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.058, 12, false), browMat);
      const cap1 = new THREE.Mesh(new THREE.SphereGeometry(0.058, 12, 10), browMat);
      cap1.position.copy(curve.getPoint(0));
      const cap2 = cap1.clone();
      cap2.position.copy(curve.getPoint(1));
      brow.add(cap1, cap2);
      brow.position.set(side * 0.43, 1.02, 0.46);
      brow.rotation.set(-0.35, side * -0.25, side * -0.24);
      brow.name = 'brow';
      this.body.add(brow);
      this.brows.push(brow);
    }

    // Mouth: a gasping "O", normally hidden behind the gloves.
    this.mouth = new THREE.Group();
    const mouthPos = new THREE.Vector3(0, -0.46, 0);
    mouthPos.z = Math.sqrt(1 - mouthPos.y * mouthPos.y) * 0.955;
    this.mouth.position.copy(mouthPos);
    this.mouth.lookAt(mouthPos.clone().multiplyScalar(2));
    this.mouthOuter = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 20),
      new THREE.MeshStandardMaterial({ color: 0x4a120c, roughness: 0.55 }),
    );
    this.mouthOuter.scale.set(0.2, 0.26, 0.06);
    const tongue = new THREE.Mesh(
      new THREE.SphereGeometry(1, 20, 12),
      new THREE.MeshStandardMaterial({ color: 0xe0565a, roughness: 0.5 }),
    );
    tongue.scale.set(0.13, 0.08, 0.04);
    tongue.position.set(0, -0.15, 0.03);
    this.mouthOuter.add(tongue);
    tongue.scale.divide(this.mouthOuter.scale);
    tongue.position.divide(this.mouthOuter.scale);
    this.mouth.add(this.mouthOuter);
    this.body.add(this.mouth);

    // Gloves.
    this.gloveMat = new THREE.MeshStandardMaterial({ color: 0xecebe6, roughness: 0.7 });
    for (let i = 0; i < 2; i++) {
      const { group, fingers, thumb } = buildHand(this.gloveMat);
      group.name = 'hand';
      group.traverse((o) => (o.name = 'hand'));
      if (i === 1) {
        fingers.forEach((f) => { f.position.x *= -1; f.userData.baseZ = -(f.userData.baseZ as number); });
        thumb.position.x *= -1;
        thumb.scale.x = -1;
      }
      this.body.add(group);
      this.hands.push(group);
      this.handParts.push({ fingers, thumb });
    }

    // Sweat drops for charge-ups.
    const sweatMat = new THREE.MeshPhysicalMaterial({ color: 0x9fd8ff, roughness: 0.05, transmission: 0.2, clearcoat: 1, transparent: true, opacity: 0.9 });
    for (let i = 0; i < 3; i++) {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 10), sweatMat);
      s.scale.y = 1.5;
      s.visible = false;
      this.body.add(s);
      this.sweat.push(s);
    }

    this.root.traverse((o) => {
      if ((o as THREE.Mesh).isMesh && o !== this.hitSphere) o.castShadow = true;
    });
    this.applyPose(1 / 60);
  }

  /** World-space look target for the pupils (usually the cursor ray). */
  lookAt(world: THREE.Vector3): void {
    this.lookTarget.copy(world);
  }

  /** React to a poke. `dirLocal` is the unit hit direction in root space. */
  hit(dirLocal: THREE.Vector3 | null, strength: number, opts: { crit?: boolean; flinch?: boolean } = {}): void {
    const dir = dirLocal ?? this.tmpV.set((Math.random() - 0.5) * 0.4, (Math.random() - 0.3) * 0.4, 1).normalize();
    const s = Math.min(strength, 2.5);

    // Dent at the impact point.
    const i = this.nextDent;
    this.nextDent = (this.nextDent + 1) % MAX_DENTS;
    this.dents[i].set(dir.x, dir.y, dir.z, this.dents[i].w);
    this.dentSprings[i].kick(1.6 * s);

    // Squash along the hit axis.
    this.squashQuat.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    this.squash.kick(4.5 * s);

    // Recoil away from the hit and tilt.
    this.recoilX.kick(-dir.x * 2.4 * s);
    this.recoilY.kick(-dir.y * 2.0 * s);
    this.recoilZ.kick(-dir.z * 2.8 * s);
    this.tiltX.kick(dir.y * 3.0 * s);
    this.tiltZ.kick(-dir.x * 3.0 * s);

    this.browLift.kick(5 * s);
    this.eyeScale.kick(2.2 * s);
    this.blink = 0;

    if (opts.flinch || opts.crit) {
      this.flinchHold = opts.crit ? 0.55 : 0.32;
      this.gasp.kick(opts.crit ? 9 : 5);
    }
  }

  setSkinTint(color: THREE.Color, amount: number): void {
    const u = this.headMat.userData.uniforms;
    u.uTint.value.copy(color);
    u.uTintAmt.value = amount;
  }

  /** Approximate world position of the mouth (for gasp particles). */
  mouthWorld(out: THREE.Vector3): THREE.Vector3 {
    return this.mouth.getWorldPosition(out);
  }

  update(dt: number): void {
    this.time += dt;
    const t = this.time;

    // Dents spring back with a wobble.
    for (let i = 0; i < MAX_DENTS; i++) {
      const sp = this.dentSprings[i];
      sp.update(dt);
      this.dents[i].w = Math.max(-0.05, Math.min(0.28, sp.x));
    }

    const q = this.squash.update(dt);
    this.squashFrame.quaternion.copy(this.squashQuat);
    this.body.quaternion.copy(this.tmpQ.copy(this.squashQuat).invert());
    const sq = Math.max(-0.35, Math.min(0.35, q * 0.12));
    this.squashFrame.scale.set(1 + sq * 0.55, 1 - sq, 1 + sq * 0.55);

    const tr = this.tremble;
    const jitter = tr > 0 ? tr * 0.025 : 0;
    this.recoil.position.set(
      this.recoilX.update(dt) * 0.06 + (Math.random() - 0.5) * jitter,
      this.recoilY.update(dt) * 0.06 + Math.sin(t * 1.7) * 0.035 + (Math.random() - 0.5) * jitter,
      this.recoilZ.update(dt) * 0.06,
    );
    this.recoil.rotation.set(
      this.tiltX.update(dt) * 0.05 + Math.sin(t * 0.9) * 0.03,
      Math.sin(t * 0.6) * 0.06,
      this.tiltZ.update(dt) * 0.05 + Math.sin(t * 1.1) * 0.02,
    );

    // Mood drives the resting expression.
    const mood = this.mood;
    this.flinchHold = Math.max(0, this.flinchHold - dt);
    const wantFlinch = mood === 'freakout' || this.flinchHold > 0 ? 1 : 0;
    this.flinch.target = wantFlinch;
    const fl = Math.max(0, Math.min(1.15, this.flinch.update(dt)));
    const calm = mood === 'calm' ? 1 : 0;
    const worried = mood === 'worried' ? 1 : 0;
    this.poseW.calm = approach(this.poseW.calm, calm * (1 - fl), 6, dt);
    this.poseW.worried = approach(this.poseW.worried, worried * (1 - fl), 6, dt);
    this.poseW.flinch = fl;
    this.poseW.cover = Math.max(0, 1 - fl - this.poseW.calm - this.poseW.worried);
    this.applyPose(dt);

    // Mouth: open while the hands are away.
    this.gasp.target = mood === 'calm' ? 0.1 : Math.max(fl, worried * 0.45);
    const g = Math.max(0, this.gasp.update(dt));
    const open = mood === 'calm' ? 0.12 : Math.min(1.3, g);
    this.mouthOuter.scale.set(0.2 * (0.7 + open * 0.3), 0.26 * Math.max(0.08, open), 0.06);
    this.mouth.visible = open > 0.03;

    // Brows and eyes.
    const browBase = mood === 'calm' ? -0.1 : mood === 'worried' ? 0.08 : 0;
    this.browLift.target = browBase + fl * 0.12;
    const bl = this.browLift.update(dt);
    for (let i = 0; i < 2; i++) {
      const side = i === 0 ? -1 : 1;
      const b = this.brows[i];
      b.position.y = 1.02 + bl * 0.08 + Math.sin(t * 2 + i) * 0.006;
      b.rotation.z = -side * (0.24 + (mood === 'calm' ? -0.38 : mood === 'worried' ? 0.2 : 0) + fl * 0.14);
    }
    this.eyeScale.target = mood === 'freakout' ? 1.12 : 1;
    const es = this.eyeScale.update(dt);

    // Blinking and lids.
    this.blinkTimer -= dt;
    if (this.blinkTimer <= 0) {
      this.blink = 1;
      this.blinkTimer = 2 + Math.random() * 4;
    }
    this.blink = Math.max(0, this.blink - dt * 7);
    const blinkAmt = Math.sin(Math.min(1, this.blink) * Math.PI);
    const lidRest = mood === 'calm' ? 0.55 : mood === 'worried' ? 0.08 : 0;
    const lidAmt = Math.max(lidRest, blinkAmt) * (1 - fl * 0.8);
    this.lookCurrent.lerp(this.lookTarget, 1 - Math.exp(-12 * dt));
    for (let i = 0; i < 2; i++) {
      const eye = this.eyes[i];
      eye.scale.set(0.29 * es, 0.345 * es, 0.2);
      this.lids[i].rotation.x = -1.62 + lidAmt * 3.0;
      this.lids[i].scale.set(0.305 * es, 0.36 * es, 0.215);

      // Pupils track the look target, constrained to the eye's face.
      const eyeGroup = eye.parent!;
      const local = eyeGroup.worldToLocal(this.tmpV.copy(this.lookCurrent));
      local.normalize();
      const px = Math.max(-0.55, Math.min(0.55, local.x)) * 0.16 * es;
      const py = Math.max(-0.55, Math.min(0.55, local.y)) * 0.19 * es;
      const shake = mood === 'freakout' ? 0.025 : 0;
      const pupil = this.pupils[i];
      pupil.position.set(
        px + (Math.random() - 0.5) * shake,
        py + (Math.random() - 0.5) * shake,
        0.2 * Math.sqrt(Math.max(0.05, 1 - (px / 0.29) ** 2 - (py / 0.345) ** 2)) + 0.004,
      );
      const ps = mood === 'freakout' ? 0.55 : 1 - Math.min(0.35, (es - 1) * 2);
      pupil.scale.setScalar(ps);
    }

    // Sweat while worried.
    for (let i = 0; i < this.sweat.length; i++) {
      const s = this.sweat[i];
      const show = worried > 0 || tr > 0.6;
      s.visible = show;
      if (show) {
        const phase = (t * 0.7 + i * 0.33) % 1;
        const side = i % 2 === 0 ? 1 : -1;
        s.position.set(side * (0.78 + i * 0.05), 0.55 - phase * 0.9, 0.62 - phase * 0.1);
        s.scale.setScalar(1 - phase * 0.4).setY((1 - phase * 0.4) * 1.5);
      }
    }
  }

  private applyPose(dt: number): void {
    const w = this.poseW;
    const t = this.time;
    for (let h = 0; h < 2; h++) {
      const pos = this.tmpV.set(0, 0, 0);
      const q = this.tmpQ.set(0, 0, 0, 0);
      let spread = 0;
      let curl = 0;
      let total = 0;
      for (const key of ['cover', 'flinch', 'calm', 'worried'] as const) {
        const k = w[key];
        if (k <= 1e-4) continue;
        const p = POSES[key][h];
        pos.addScaledVector(p.pos, k);
        // Weighted quaternion sum (sign-aligned), normalised below.
        const sgn = q.x * p.quat.x + q.y * p.quat.y + q.z * p.quat.z + q.w * p.quat.w < 0 ? -1 : 1;
        q.x += p.quat.x * k * sgn;
        q.y += p.quat.y * k * sgn;
        q.z += p.quat.z * k * sgn;
        q.w += p.quat.w * k * sgn;
        spread += p.spread * k;
        curl += p.curl * k;
        total += k;
      }
      if (total <= 0) continue;
      pos.multiplyScalar(1 / total);
      q.normalize();
      spread /= total;
      curl /= total;
      const hand = this.hands[h];
      hand.position.copy(pos);
      hand.position.y += this.tremble * Math.sin(t * 40 + h) * 0.03;
      hand.quaternion.copy(q);
      hand.rotateZ(w.flinch * Math.sin(t * 22 + h * 2) * 0.14);
      const parts = this.handParts[h];
      parts.fingers.forEach((f, i) => {
        f.rotation.z = (f.userData.baseZ as number) * (0.4 + spread * 2.4);
        f.rotation.x = curl + Math.sin(t * 3 + i) * 0.02;
      });
      parts.thumb.rotation.z = (h === 0 ? -1 : 1) * (0.8 + spread * 0.6);
    }
    void dt;
  }
}
