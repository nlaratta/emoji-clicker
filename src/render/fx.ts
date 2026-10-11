import * as THREE from 'three';
import { MAX_WAVES } from './post';
import { Spring } from './springs';

export interface MotionPrefs {
  /** 0–1 camera shake scale. */
  shake: number;
  reducedMotion: boolean;
  flashes: boolean;
}

/**
 * Camera direction: framing, cursor parallax, trauma-based shake, FOV punches,
 * and scripted moves for era transitions and boss intros.
 */
export class CameraRig {
  private camera: THREE.PerspectiveCamera;
  private trauma = 0;
  private fovKick = new Spring(0, 120, 10);
  private zoom = new Spring(0, 30, 10);
  private roll = new Spring(0, 40, 9);
  private parallax = new THREE.Vector2();
  private parallaxCur = new THREE.Vector2();
  private time = 0;
  /** Seconds remaining of a scripted era-transition move. */
  private cinematic = 0;
  private cinematicDur = 1;
  baseFov = 36;
  prefs: MotionPrefs = { shake: 1, reducedMotion: false, flashes: true };
  readonly target = new THREE.Vector3(0, 1.15, 0);
  /** Resting framing: a raised three-quarter view so the ground plane reads. */
  baseDist = 9.3;
  baseHeight = 2.95;
  /** 0–1: boss close-up framing. */
  bossFocus = 0;
  /** Continuous slow roll (reality era). */
  drift = 0;

  constructor(camera: THREE.PerspectiveCamera) {
    this.camera = camera;
  }

  addTrauma(x: number): void {
    this.trauma = Math.min(1, this.trauma + x);
  }

  punch(fov: number): void {
    if (!this.prefs.reducedMotion) this.fovKick.kick(fov * 30);
  }

  setPointer(nx: number, ny: number): void {
    this.parallax.set(nx, ny);
  }

  eraTransition(duration = 3.2): void {
    this.cinematic = duration;
    this.cinematicDur = duration;
  }

  update(dt: number): void {
    this.time += dt;
    const t = this.time;
    this.trauma = Math.max(0, this.trauma - dt * 1.6);
    this.parallaxCur.lerp(this.parallax, 1 - Math.exp(-3 * dt));

    // Scripted pull-back during era transitions.
    let pull = 0;
    if (this.cinematic > 0) {
      this.cinematic = Math.max(0, this.cinematic - dt);
      const k = 1 - this.cinematic / this.cinematicDur;
      pull = Math.sin(k * Math.PI);
    }
    this.zoom.target = this.bossFocus * -1.2 + pull * 3.2;
    const z = this.zoom.update(dt);

    const reduced = this.prefs.reducedMotion;
    const px = reduced ? 0 : this.parallaxCur.x * 0.35;
    const py = reduced ? 0 : this.parallaxCur.y * 0.18;
    const orbit = pull * 0.35 * Math.sin(t * 0.5);
    const dist = this.baseDist + z;
    this.camera.position.set(
      Math.sin(orbit + px * 0.12) * dist + px,
      this.baseHeight + py + pull * 2.4 + this.bossFocus * -0.5,
      Math.cos(orbit + px * 0.12) * dist,
    );
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(this.target.x, this.target.y + pull * 0.4, this.target.z);

    // Shake: trauma² × layered sines (smooth, not jittery noise).
    const s = this.trauma * this.trauma * this.prefs.shake * (reduced ? 0 : 1);
    if (s > 0) {
      this.camera.position.x += (Math.sin(t * 37.1) + Math.sin(t * 61.7) * 0.5) * 0.09 * s;
      this.camera.position.y += (Math.sin(t * 43.3) + Math.sin(t * 71.9) * 0.5) * 0.08 * s;
      this.camera.rotateZ((Math.sin(t * 29.3) + Math.sin(t * 53.1) * 0.5) * 0.025 * s);
    }
    this.roll.target = reduced ? 0 : this.drift * Math.sin(t * 0.21) * 0.06;
    this.camera.rotateZ(this.roll.update(dt));

    const kick = this.fovKick.update(dt);
    const fov = this.baseFov - kick * 0.06;
    if (Math.abs(this.camera.fov - fov) > 0.001) {
      this.camera.fov = fov;
      this.camera.updateProjectionMatrix();
    }
  }
}

/** Screen-space effect state feeding the final post pass. */
export class ScreenFX {
  private u: Record<string, THREE.IUniform>;
  private waves: THREE.Vector4[];
  private next = 0;
  private flashAmt = 0;
  private flashColor = new THREE.Color(1, 1, 1);
  private ab = 0;
  private glitch = 0;
  private glitchHold = 0;
  prefs: MotionPrefs = { shake: 1, reducedMotion: false, flashes: true };
  /** Persistent baselines set by the era / state. */
  baseAberration = 0.004;
  baseGlitch = 0;
  saturation = 1;
  tint = new THREE.Vector4(1, 1, 1, 0);

  constructor(uniforms: Record<string, THREE.IUniform>) {
    this.u = uniforms;
    this.waves = uniforms.uWaves.value as THREE.Vector4[];
  }

  shockwave(screenUv: THREE.Vector2, strength = 1): void {
    if (this.prefs.reducedMotion) return;
    const w = this.waves[this.next];
    this.next = (this.next + 1) % MAX_WAVES;
    w.set(screenUv.x, screenUv.y, 0, strength);
  }

  flash(color: THREE.ColorRepresentation, amount: number): void {
    const cap = this.prefs.flashes ? 1 : 0.12;
    this.flashColor.set(color);
    this.flashAmt = Math.min(cap, Math.max(this.flashAmt, amount));
  }

  aberration(x: number): void {
    if (this.prefs.reducedMotion) return;
    this.ab = Math.min(0.012, this.ab + x * 1.2);
  }

  glitchBurst(amount: number, hold = 0.3): void {
    if (this.prefs.reducedMotion || !this.prefs.flashes) return;
    this.glitch = Math.max(this.glitch, amount);
    this.glitchHold = hold;
  }

  lens(screenUv: THREE.Vector2 | null, strength = 0, radius = 0.12): void {
    const l = this.u.uLens.value as THREE.Vector4;
    if (!screenUv || this.prefs.reducedMotion) l.z = 0;
    else l.set(screenUv.x, screenUv.y, strength, radius);
  }

  update(dt: number, time: number): void {
    for (const w of this.waves) if (w.z >= 0) w.z = w.z > 1.2 ? -1 : w.z + dt;
    this.flashAmt = Math.max(0, this.flashAmt - dt * 3.2);
    this.ab = Math.max(0, this.ab - dt * 0.04);
    this.glitchHold = Math.max(0, this.glitchHold - dt);
    if (this.glitchHold <= 0) this.glitch = Math.max(0, this.glitch - dt * 3);
    const u = this.u;
    u.uTime.value = time;
    u.uAberration.value = this.prefs.reducedMotion ? 0 : this.baseAberration + this.ab;
    const f = u.uFlash.value as THREE.Vector4;
    f.set(this.flashColor.r, this.flashColor.g, this.flashColor.b, this.flashAmt);
    u.uGlitch.value = this.prefs.reducedMotion || !this.prefs.flashes ? 0 : Math.max(this.glitch, this.baseGlitch);
    u.uSaturation.value = this.saturation;
    (u.uTint.value as THREE.Vector4).copy(this.tint);
  }
}
