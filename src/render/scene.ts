import * as THREE from 'three';
import { Stage, type QualityTier } from './stage';
import { Freakmoji } from './freakmoji';
import { World } from './world';
import { Particles, Shape } from './particles';
import { EmojiAtlas, FlyingEmoji } from './sprites';
import { Minions } from './minions';
import { Strikes, FAMILY_COLOR } from './strikes';
import { CameraRig, ScreenFX, type MotionPrefs } from './fx';
import { Floaters, type FloatOpts } from './floaters';
import { BossShell } from './bossShell';
import { THEMES } from './themes';
import { GOLDEN_LIFE, type Game } from '../sim/game';
import type { GameEvent, HitRegion } from '../sim/events';
import { WEAPONS, weaponFamily } from '../content/weapons';
import { ERAS, FINAL_BOSS } from '../content/eras';
import { fmt } from '../core/format';

export type PickResult =
  | { kind: 'freakmoji'; dir: [number, number, number]; region: HitRegion }
  | { kind: 'golden' }
  | null;

const CENTER = new THREE.Vector3(0, 1.25, 0);
const GOLD = new THREE.Color(1, 0.82, 0.25);

/**
 * The whole 3D presentation. Reads simulation state every frame and reacts
 * to simulation events; never mutates game state itself.
 */
export class GameScene {
  readonly stage: Stage;
  readonly floaters: Floaters;
  readonly star: Freakmoji;
  private world: World;
  private particles: Particles;
  private atlas: EmojiAtlas;
  private fly: FlyingEmoji;
  private minions: Minions;
  private strikes: Strikes;
  readonly rig: CameraRig;
  readonly screen: ScreenFX;
  private shell = new BossShell();
  private golden: Freakmoji;
  private goldenSeed = 0;
  private goldenAge = 0;
  private goldenLife = 12;
  private weakMarker: THREE.Mesh;
  private weakDir = new THREE.Vector3();
  private chargeFist: THREE.Group;
  private raycaster = new THREE.Raycaster();
  private ndc = new THREE.Vector2();
  private time = 0;
  private hitStop = 0;
  private lastImpactReact = 0;
  private era = 0;
  private lastAutoFloat = 0;
  private lastQuip = -10;
  private recentMax = 1;
  private tierAuto = true;
  private frameTimes: number[] = [];
  private tierCooldown = 4;
  private tmpV = new THREE.Vector3();
  private tmpV2 = new THREE.Vector2();
  private freakoutConfetti = 0;
  /** CSS pixel width/height of the canvas. */
  private w = 1;
  private h = 1;

  constructor(canvas: HTMLCanvasElement, overlay: HTMLCanvasElement, startEra: number) {
    this.stage = new Stage(canvas);
    this.floaters = new Floaters(overlay);
    this.atlas = new EmojiAtlas();
    this.particles = new Particles();
    this.fly = new FlyingEmoji(this.atlas);
    this.era = startEra;

    const scene = this.stage.scene;
    this.world = new World({ particles: this.particles, atlas: this.atlas, lite: false }, startEra);
    scene.add(this.world.group);

    this.star = new Freakmoji();
    this.star.root.position.copy(CENTER);
    scene.add(this.star.root);
    this.star.root.add(this.shell.mesh);

    // Weak-spot reticle that rides on the face.
    const ret = document.createElement('canvas');
    ret.width = ret.height = 128;
    const g = ret.getContext('2d')!;
    g.strokeStyle = '#fff';
    g.lineWidth = 9;
    g.beginPath();
    g.arc(64, 64, 44, 0, Math.PI * 2);
    g.stroke();
    g.lineWidth = 7;
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      g.beginPath();
      g.moveTo(64 + Math.cos(a) * 30, 64 + Math.sin(a) * 30);
      g.lineTo(64 + Math.cos(a) * 60, 64 + Math.sin(a) * 60);
      g.stroke();
    }
    g.fillStyle = '#fff';
    g.beginPath();
    g.arc(64, 64, 10, 0, Math.PI * 2);
    g.fill();
    this.weakMarker = new THREE.Mesh(
      new THREE.PlaneGeometry(0.5, 0.5),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(ret), color: new THREE.Color(3, 0.6, 1.2), transparent: true, depthTest: false, depthWrite: false }),
    );
    this.weakMarker.visible = false;
    this.weakMarker.renderOrder = 30;
    this.star.root.add(this.weakMarker);

    // Golden Freakmoji: a tiny gilded twin that zips around.
    this.golden = new Freakmoji();
    this.golden.setSkinTint(new THREE.Color(1, 0.78, 0.15), 0.85);
    this.golden.root.scale.setScalar(0.36);
    this.golden.root.visible = false;
    this.golden.mood = 'freakout';
    scene.add(this.golden.root);

    // Haymaker wind-up: a giant glove that grows as it charges.
    this.chargeFist = new THREE.Group();
    this.chargeFist.visible = false;
    scene.add(this.chargeFist);

    scene.add(this.particles.group, this.fly.batch.mesh);
    this.minions = new Minions(this.atlas, this.fly, this.particles, (p, s, c) => this.minionImpact(p, s, c), {
      heightAt: (x, z) => this.world.heightAt(x, z),
      kit: () => this.world.kit,
    });
    scene.add(this.minions.group);

    this.rig = new CameraRig(this.stage.camera);
    this.screen = new ScreenFX(this.stage.final.uniforms as unknown as Record<string, THREE.IUniform>);
    this.strikes = new Strikes(this.particles, this.fly, this.rig, this.screen, this.stage.camera);
    this.applyEraLook(startEra, true);
  }

  // ── Setup ──

  setQuality(q: 'auto' | QualityTier): void {
    this.tierAuto = q === 'auto';
    const tier: QualityTier = q === 'auto' ? (this.isMobile() ? 'medium' : 'high') : q;
    this.applyTier(tier);
  }

  private isMobile(): boolean {
    return typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches;
  }

  private applyTier(tier: QualityTier): void {
    this.stage.setTier(tier);
    this.particles.setDensity(tier === 'low' ? 0.4 : tier === 'medium' ? 0.75 : 1);
    this.minions.activity = tier === 'low' ? 0.5 : 1;
    this.world.setQuality({ grass: tier === 'high' ? 1 : tier === 'medium' ? 0.55 : 0.2, shadows: tier !== 'low' });
    this.minions.setShadows(tier !== 'low');
  }

  setPrefs(p: MotionPrefs): void {
    this.rig.prefs = p;
    this.screen.prefs = p;
  }

  resize(w: number, h: number, viewShift: number): void {
    this.w = w;
    this.h = h;
    this.stage.viewShift = viewShift;
    this.stage.resize(w, h);
    this.rig.baseFov = this.stage.camera.fov;
    this.floaters.resize(w, h);
  }

  // ── Input ──

  private setRay(clientX: number, clientY: number): void {
    const rect = this.stage.renderer.domElement.getBoundingClientRect();
    this.ndc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    this.raycaster.setFromCamera(this.ndc, this.stage.camera);
  }

  pointerMove(clientX: number, clientY: number): void {
    this.setRay(clientX, clientY);
    this.star.lookAt(this.raycaster.ray.at(5, this.tmpV));
    this.rig.setPointer(this.ndc.x, this.ndc.y);
  }

  pick(clientX: number, clientY: number): PickResult {
    this.setRay(clientX, clientY);
    if (this.golden.root.visible) {
      const gh = this.raycaster.intersectObject(this.golden.hitSphere)[0];
      if (gh) return { kind: 'golden' };
    }
    const hit = this.raycaster.intersectObject(this.star.hitSphere)[0];
    if (!hit) return null;
    // Region: which feature did the ray hit first?
    let region: HitRegion = 'face';
    const parts = this.raycaster.intersectObjects([this.star.head, ...this.star.eyes, ...this.star.hands, ...this.star.brows], true)[0];
    if (parts) {
      const n = parts.object.name;
      if (n === 'eye' || n === 'hand' || n === 'brow') region = n;
    }
    const surface = parts?.point ?? hit.point;
    const local = this.star.root.worldToLocal(surface.clone()).normalize();
    return { kind: 'freakmoji', dir: [local.x, local.y, local.z], region };
  }

  /** Screen position (CSS px) of a world point. */
  project(world: THREE.Vector3, out = new THREE.Vector2()): THREE.Vector2 {
    const v = this.tmpV.copy(world).project(this.stage.camera);
    return out.set((v.x * 0.5 + 0.5) * this.w, (-v.y * 0.5 + 0.5) * this.h);
  }

  private screenUv(world: THREE.Vector3): THREE.Vector2 {
    const v = this.tmpV.copy(world).project(this.stage.camera);
    return this.tmpV2.set(v.x * 0.5 + 0.5, v.y * 0.5 + 0.5).clone();
  }

  // ── Events ──

  handle(events: GameEvent[], game: Game): void {
    for (const e of events) {
      switch (e.type) {
        case 'poke':
          this.onPoke(e, game);
          break;
        case 'haymaker':
          this.onHaymaker(e.value, e.perfect, e.charge, game);
          break;
        case 'freakOutStart':
          this.minions.cheer(1.6);
          this.screen.flash('#ff3a8a', 0.35);
          this.rig.addTrauma(0.4);
          this.particles.ring(CENTER, new THREE.Color(1, 0.3, 0.6), 6, 0.6, 3);
          this.screen.shockwave(this.screenUv(CENTER), 1.2);
          this.floatAt(CENTER, 'FREAK OUT!', { size: 54, color: '#ff4fa3', life: 1.6, vy: -40, spread: 0 });
          break;
        case 'weakSpot':
          this.weakDir.set(Math.sin(e.yaw) * Math.cos(e.pitch), Math.sin(e.pitch), Math.cos(e.yaw) * Math.cos(e.pitch));
          break;
        case 'goldenSpawn':
          this.goldenSeed = e.seed;
          this.goldenAge = 0;
          this.goldenLife = e.duration;
          this.golden.root.visible = true;
          this.minions.pointAt(this.golden.root.position);
          break;
        case 'goldenCaught': {
          this.minions.pointAt(null);
          const at = this.golden.root.position.clone();
          this.golden.root.visible = false;
          this.particles.sparks(at, 40, GOLD, 6);
          this.particles.ring(at, GOLD, 4, 0.5, 4);
          this.screen.flash('#ffe08a', 0.4);
          for (let i = 0; i < 12; i++) {
            this.fly.toss('🌟', at.x, at.y, at.z, (Math.random() - 0.5) * 6, 3 + Math.random() * 4, (Math.random() - 0.5) * 3, { life: 1.4, scale0: 0.4, scale1: 0.2 });
          }
          const label = { lucky: `LUCKY! +${fmt(e.value)}`, frenzy: 'GASP FRENZY ×7', storm: 'CLICK STORM ×10', freakout: 'INSTANT FREAK OUT' }[e.effect];
          this.floatAt(at, label, { size: 34, color: '#ffd23f', life: 1.8, vy: -50, spread: 0 });
          break;
        }
        case 'goldenMissed':
          this.minions.pointAt(null);
          this.particles.smoke(this.golden.root.position, 6, new THREE.Color(0xffe08a));
          this.golden.root.visible = false;
          break;
        case 'chargeStart':
          this.chargeFist.visible = true;
          break;
        case 'bossStart': {
          const def = e.final ? FINAL_BOSS : ERAS[e.era].boss!;
          this.shell.begin(def.shell);
          this.screen.flash('#ffffff', 0.5);
          this.rig.addTrauma(0.5);
          this.screen.shockwave(this.screenUv(CENTER), 1.5);
          break;
        }
        case 'bossWin':
          this.shatterShell();
          this.minions.cheer(2.2);
          break;
        case 'bossFail':
          this.shell.end();
          this.star.mood = 'shocked';
          this.floatAt(CENTER, 'IT KEPT ITS COMPOSURE…', { size: 30, color: '#c8d0ff', life: 2, vy: -30, spread: 0 });
          break;
        case 'eraChange':
          this.applyEraLook(e.to, false);
          break;
        case 'ability':
          this.onAbility(e.id, game);
          break;
        case 'buyProducer':
          this.minions.sync(game.state.producers);
          break;
        case 'buyWeapon': {
          const w = WEAPONS[e.index];
          this.fly.toss(w.emoji, 0, 3.4, 1.2, 0, 1.5, 0, { life: 1.4, scale0: 1.2, scale1: 0.9, gravity: 3, spin: 0 });
          this.particles.sparks(new THREE.Vector3(0, 3.2, 1.2), 24, new THREE.Color(FAMILY_COLOR[w.family]), 4);
          break;
        }
        case 'collapse':
          this.onCollapse(game);
          break;
      }
    }
  }

  private floatAt(world: THREE.Vector3, text: string, opts: FloatOpts): void {
    const p = this.project(world);
    this.floaters.spawn(text, p.x, p.y, opts);
  }

  private onPoke(e: Extract<GameEvent, { type: 'poke' }>, game: Game): void {
    const auto = e.source === 'auto';
    const dir = e.dir
      ? this.tmpV.set(e.dir[0], e.dir[1], e.dir[2]).clone()
      : new THREE.Vector3((Math.random() - 0.5) * 0.9, (Math.random() - 0.2) * 0.8, 1).normalize();
    const hitWorld = this.star.root.localToWorld(dir.clone().multiplyScalar(1.0));
    this.recentMax = Math.max(this.recentMax * 0.98, e.value);
    const power = Math.min(1, e.value / this.recentMax);

    this.star.hit(dir, (e.crit ? 1.5 : 0.7) * (auto ? 0.5 : 1), { crit: e.crit, flinch: e.weak || (!auto && Math.random() < 0.08) });
    if (game.state.boss) {
      // Hits chip the composure shell.
      this.shell.pulse(e.crit ? 0.3 : 0.12);
      if (!auto || Math.random() < 0.3) {
        const chip = this.shell.color;
        this.particles.matter.spawn({
          x: hitWorld.x, y: hitWorld.y, z: hitWorld.z + 0.4, vx: (Math.random() - 0.5) * 3, vy: 2 + Math.random() * 2, vz: 2,
          life: 0.8, size: 0.07 + Math.random() * 0.06, r: chip.r, g: chip.g, b: chip.b, gravity: 10, shape: Shape.Chunk,
        });
      }
    }
    if (e.crit && !auto) this.hitStop = Math.max(this.hitStop, 0.07);

    if (!auto || Math.random() < 0.35) {
      const family = weaponFamily(game.state.weapon);
      const emoji = game.state.weapon >= 0 ? WEAPONS[game.state.weapon].emoji : '💥';
      this.strikes.strike(family, emoji, hitWorld, dir, { crit: e.crit, weak: e.weak, power, screen: this.screenUv(hitWorld) });
    }

    if (auto) {
      if (this.time - this.lastAutoFloat > 0.12) {
        this.lastAutoFloat = this.time;
        this.floatAt(hitWorld, `+${fmt(e.value)}`, { size: 16, color: '#bfefff', life: 0.7 });
      }
      return;
    }
    if (e.region === 'eye' && this.time - this.lastQuip > 4 && Math.random() < 0.25) {
      this.lastQuip = this.time;
      this.floatAt(hitWorld.clone().setY(hitWorld.y + 0.4), 'OW, MY EYE', { size: 18, color: '#ffffff', life: 1.1, spread: 0 });
    }
    if (e.weak) this.floatAt(hitWorld, 'WEAK SPOT!', { size: 26, color: '#ff5fa8', life: 1.1, vy: -120 });
    const label = `+${fmt(e.value)}`;
    if (e.crit) this.floatAt(hitWorld, label, { size: 40, color: '#ffd23f', life: 1.15, vy: -110 });
    else this.floatAt(hitWorld, label, { size: 24, life: 0.9 });
    if (e.streak > 0 && e.streak % 25 === 0) {
      this.floatAt(CENTER.clone().setY(2.6), `${e.streak} COMBO!`, { size: 30, color: '#7affd8', life: 1.2, vy: -60, spread: 0 });
      this.particles.ring(hitWorld, new THREE.Color(0.4, 1, 0.85), 2.5, 0.4, 3);
    }
  }

  private onHaymaker(value: number, perfect: boolean, charge: number, game: Game): void {
    this.chargeFist.visible = false;
    const dir = new THREE.Vector3(0, 0.05, 1).normalize();
    const hitWorld = this.star.root.localToWorld(dir.clone());
    this.star.hit(dir, 2.5, { crit: true });
    this.hitStop = perfect ? 0.16 : 0.08;
    const family = weaponFamily(game.state.weapon);
    const emoji = game.state.weapon >= 0 ? WEAPONS[game.state.weapon].emoji : '👊';
    this.strikes.strike(family, emoji, hitWorld, dir, { crit: true, weak: false, power: 1, screen: this.screenUv(hitWorld) });
    this.strikes.strike('explosive', '🥊', hitWorld, dir, { crit: true, weak: false, power: charge, screen: this.screenUv(hitWorld) });
    this.particles.ring(hitWorld, perfect ? GOLD : new THREE.Color(1, 0.6, 0.3), 7 * Math.max(0.4, charge), 0.6, 2.4);
    this.screen.shockwave(this.screenUv(hitWorld), 1.6 * Math.max(0.5, charge));
    this.screen.flash(perfect ? '#fff2b0' : '#ffffff', perfect ? 0.35 : 0.18);
    this.rig.addTrauma(0.5 + charge * 0.4);
    this.rig.punch(1.6);
    if (perfect) this.floatAt(hitWorld.clone().setY(2.7), 'PERFECT!', { size: 58, color: '#ffd23f', life: 1.6, vy: -50, spread: 0 });
    this.floatAt(hitWorld, `+${fmt(value)}`, { size: perfect ? 52 : 42, color: '#ffb347', life: 1.5, vy: -90, spread: 0 });
  }

  private onAbility(id: string, game: Game): void {
    switch (id) {
      case 'rally':
        this.floatAt(CENTER.clone().setY(2.8), 'MINION RALLY!', { size: 40, color: '#ffd23f', life: 1.6, vy: -40, spread: 0 });
        this.particles.ring(new THREE.Vector3(0, 0.3, 0), new THREE.Color(1, 0.8, 0.3), 12, 0.8, 3);
        this.rig.addTrauma(0.3);
        break;
      case 'flurry':
        this.floatAt(CENTER.clone().setY(2.8), 'FLURRY!', { size: 40, color: '#9ae8ff', life: 1.4, vy: -40, spread: 0 });
        break;
      case 'timewarp': {
        this.screen.flash('#9ad0ff', 0.5);
        this.screen.shockwave(this.screenUv(CENTER), 2);
        for (let i = 0; i < 80; i++) {
          const a = Math.random() * Math.PI * 2;
          const r = 2 + Math.random() * 4;
          this.particles.glow.spawn({
            x: Math.cos(a) * r, y: 1.25 + Math.sin(a) * r, z: -2, vx: -Math.cos(a) * 2, vy: -Math.sin(a) * 2, vz: 30,
            life: 0.5, size: 0.05, r: 2, g: 3, b: 4, stretch: 0.02, shape: Shape.Spark, delay: Math.random() * 0.3,
          });
        }
        this.floatAt(CENTER.clone().setY(2.8), 'TIME WARP!', { size: 44, color: '#9ad0ff', life: 1.6, vy: -40, spread: 0 });
        break;
      }
      case 'singularity':
        this.screen.flash('#b070ff', 0.6);
        this.rig.addTrauma(0.7);
        this.floatAt(CENTER.clone().setY(2.9), 'SINGULARITY', { size: 52, color: '#d0a0ff', life: 2, vy: -30, spread: 0 });
        break;
    }
    void game;
  }

  private minionImpact(point: THREE.Vector3, strength: number, color: THREE.Color): void {
    this.particles.sparks(point, 4, color, 2.5);
    if (this.time - this.lastImpactReact > 0.12) {
      this.lastImpactReact = this.time;
      const dir = this.star.root.worldToLocal(point.clone()).normalize();
      this.star.hit(dir, 0.25 + strength * 0.4);
    }
  }

  private shatterShell(): void {
    const c = this.shell.color;
    this.shell.end();
    for (let i = 0; i < 60; i++) {
      const u = Math.random() * 2 - 1;
      const th = Math.random() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      const v = 4 + Math.random() * 6;
      this.particles.matter.spawn({
        x: CENTER.x + s * Math.cos(th) * 1.4, y: CENTER.y + u * 1.4, z: CENTER.z + s * Math.sin(th) * 1.4,
        vx: s * Math.cos(th) * v, vy: u * v + 3, vz: s * Math.sin(th) * v,
        life: 1.4, size: 0.12 + Math.random() * 0.18, r: c.r, g: c.g, b: c.b, gravity: 12, drag: 0.5, shape: Shape.Chunk,
      });
    }
    this.particles.sparks(CENTER, 60, this.shell.crackColor, 8);
    this.particles.ring(CENTER, this.shell.crackColor, 9, 0.7, 4);
    this.screen.flash('#ffffff', 0.85);
    this.screen.shockwave(this.screenUv(CENTER), 2.2);
    this.rig.addTrauma(0.9);
    this.rig.punch(2);
    this.hitStop = 0.25;
    this.star.mood = 'freakout';
    this.star.hit(new THREE.Vector3(0, 0, 1), 2.5, { crit: true });
    this.floatAt(CENTER.clone().setY(2.9), 'COMPOSURE SHATTERED!', { size: 34, color: '#ffffff', life: 1.4, vy: -60, spread: 0 });
  }

  private applyEraLook(era: number, instant: boolean): void {
    this.era = era;
    this.world.setEra(era, instant);
    this.rig.drift = era >= 6 ? 1 : 0;
    this.screen.baseAberration = era >= 6 ? 0.007 : era >= 4 ? 0.004 : 0.0025;
    this.screen.baseGlitch = 0;
    if (!instant) {
      this.rig.eraTransition(3.4);
      this.screen.flash('#ffffff', 0.9);
      this.screen.shockwave(this.screenUv(CENTER), 2.5);
      for (let i = 0; i < 80; i++) {
        const a = Math.random() * Math.PI * 2;
        this.particles.glow.spawn({
          x: Math.cos(a) * 2, y: 0.3, z: Math.sin(a) * 2, vx: Math.cos(a) * 12, vy: 1 + Math.random() * 4, vz: Math.sin(a) * 12,
          life: 1.4, size: 0.12, sizeEnd: 0.02, r: 3, g: 3, b: 3, drag: 1.5, stretch: 0.03, shape: Shape.Spark,
        });
      }
    }
  }

  private onCollapse(game: Game): void {
    this.screen.flash('#ffffff', 1);
    this.screen.glitchBurst(1, 0.6);
    this.rig.addTrauma(1);
    for (let i = 0; i < 160; i++) {
      const u = Math.random() * 2 - 1;
      const th = Math.random() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      const r = 6 + Math.random() * 8;
      const o = new THREE.Vector3(s * Math.cos(th) * r, 1.25 + u * r, s * Math.sin(th) * r);
      const d = CENTER.clone().sub(o).multiplyScalar(1 / 0.8);
      this.particles.glow.spawn({ x: o.x, y: o.y, z: o.z, vx: d.x, vy: d.y, vz: d.z, life: 0.8, size: 0.1, r: 3, g: 3, b: 4, stretch: 0.04, shape: Shape.Spark });
    }
    this.shell.end();
    this.golden.root.visible = false;
    this.world.setEra(game.state.era, false);
    this.era = game.state.era;
    this.rig.eraTransition(3.4);
    this.minions.sync(game.state.producers);
  }

  // ── Frame ──

  frame(dtReal: number, game: Game): void {
    const s = game.state;
    // Hit-stop: briefly slow the world on big impacts for weight.
    let dt = dtReal;
    if (this.hitStop > 0) {
      this.hitStop -= dtReal;
      dt = dtReal * 0.12;
    }
    this.time += dtReal;
    const t = this.time;

    if (s.era !== this.era && !this.world.transitioning) this.applyEraLook(s.era, true);
    this.minions.sync(s.producers);
    this.reconcile(game);

    // Mood & state-driven presentation.
    const freaking = s.time < s.freakOutEnd;
    const boss = s.boss;
    if (boss) {
      const frac = 1 - Math.max(0, boss.hp) / boss.maxHp;
      this.shell.setDamage(frac);
      this.star.mood = frac > 0.6 ? 'worried' : 'calm';
    } else if (s.charge) this.star.mood = 'worried';
    else this.star.mood = freaking ? 'freakout' : 'shocked';
    const charge = game.chargeLevel();
    this.star.tremble = s.charge ? charge : freaking ? 0.5 : boss ? Math.max(0, 1 - boss.hp / boss.maxHp - 0.5) : 0;
    this.rig.bossFocus += ((boss ? 1 : 0) - this.rig.bossFocus) * (1 - Math.exp(-3 * dtReal));

    // Haymaker charge: energy gathering into a glove.
    if (s.charge) {
      this.chargeFist.visible = true;
      const perfect = charge >= 0.85;
      if (Math.random() < 0.5 + charge) {
        const a = Math.random() * Math.PI * 2;
        const r = 2.5;
        const o = new THREE.Vector3(Math.cos(a) * r, 1.25 + Math.sin(a) * r, 2.2);
        const d = new THREE.Vector3(0, 1.25, 2.2).sub(o).multiplyScalar(1 / 0.4);
        const col = perfect ? GOLD : new THREE.Color(1, 0.5, 0.2);
        this.particles.glow.spawn({ x: o.x, y: o.y, z: o.z, vx: d.x, vy: d.y, vz: d.z, life: 0.4, size: 0.06 + charge * 0.06, r: col.r * 3, g: col.g * 3, b: col.b * 3, stretch: 0.03, shape: Shape.Spark });
      }
      if (perfect && Math.random() < 0.3) this.particles.flash(new THREE.Vector3(0, 1.25, 2.2), GOLD, 0.8, 0.1, 3);
      this.rig.addTrauma(charge * 0.04);
    }

    // Weak spot reticle.
    if (s.weakSpot) {
      this.weakMarker.visible = true;
      this.weakMarker.position.copy(this.weakDir).multiplyScalar(1.06);
      this.weakMarker.lookAt(this.star.root.localToWorld(this.weakDir.clone().multiplyScalar(3)));
      const life = Math.max(0, s.weakSpot.end - s.time);
      this.weakMarker.scale.setScalar((0.9 + Math.sin(t * 10) * 0.12) * (life < 1 ? life : 1));
      this.weakMarker.rotation.z = t * 2;
    } else this.weakMarker.visible = false;

    // Golden Freakmoji flight path (deterministic per spawn).
    if (this.golden.root.visible) {
      this.goldenAge += dtReal;
      const sd = this.goldenSeed;
      const fx = 0.5 + ((sd >>> 3) % 100) / 200;
      const fy = 0.7 + ((sd >>> 9) % 100) / 180;
      const ph = (sd % 628) / 100;
      const k = this.goldenAge;
      // Keep the flight path inside the visible frustum (the shop panel narrows it).
      const cam = this.stage.camera;
      const depth = Math.max(3, cam.position.z - 1.6);
      const halfH = depth * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));
      const ax = Math.min(3, halfH * cam.aspect * 0.72);
      const ay = Math.min(0.85, halfH * 0.45);
      this.golden.root.position.set(Math.sin(k * fx + ph) * ax, 1.3 + Math.sin(k * fy + ph * 2) * ay, 1.4 + Math.cos(k * fx * 0.7 + ph) * 0.5);
      this.golden.root.rotation.y = Math.sin(k * 2) * 0.4;
      this.golden.update(dt);
      if (Math.random() < 0.6) {
        const p = this.golden.root.position;
        this.particles.glow.spawn({ x: p.x, y: p.y, z: p.z, vx: (Math.random() - 0.5) * 0.4, vy: -0.4, vz: 0, life: 0.6, size: 0.08, sizeEnd: 0.01, r: 4, g: 3, b: 0.8, shape: Shape.Star });
      }
      const left = this.goldenLife - this.goldenAge;
      this.golden.root.scale.setScalar(0.36 * (left < 1 ? Math.max(0.05, left) : Math.min(1, this.goldenAge * 3)));
    }

    // Freak Out: confetti of panic.
    if (freaking) {
      this.freakoutConfetti += dtReal * 8;
      while (this.freakoutConfetti > 1) {
        this.freakoutConfetti -= 1;
        const e = ['😱', '😳', '💥', '❗', '🫨'][Math.floor(Math.random() * 5)];
        this.fly.toss(e, (Math.random() - 0.5) * 4.5, 3.6, 0.5 + Math.random() * 1.5, (Math.random() - 0.5) * 2, 0.5, 0, { life: 1.8, scale0: 0.7, scale1: 0.45, gravity: 2.5 });
      }
      this.screen.tint.set(1.15, 0.85, 1.05, 0.35 + Math.sin(t * 8) * 0.1);
    } else this.screen.tint.w = Math.max(0, this.screen.tint.w - dtReal * 2);

    // Buff visuals.
    const rally = s.buffs.some((b) => b.id === 'rally' && b.end > s.time);
    const frenzy = s.buffs.some((b) => b.id === 'goldenFrenzy' && b.end > s.time);
    const sing = s.buffs.some((b) => b.id === 'singularity' && b.end > s.time);
    this.minions.frenzy = (rally ? 3 : 1) * (frenzy ? 2 : 1) * (freaking ? 1.5 : 1);
    if (sing) {
      this.screen.lens(this.screenUv(CENTER), 0.6 + Math.sin(t * 3) * 0.2, 0.18);
      this.screen.saturation = 1.3;
      if (Math.random() < 0.8) {
        const a = Math.random() * Math.PI * 2;
        const r = 4 + Math.random() * 3;
        const o = new THREE.Vector3(Math.cos(a) * r, 1.25 + (Math.random() - 0.5) * 2, Math.sin(a) * r);
        const d = CENTER.clone().sub(o);
        this.particles.glow.spawn({ x: o.x, y: o.y, z: o.z, vx: d.x - Math.sin(a) * 4, vy: d.y, vz: d.z + Math.cos(a) * 4, life: 1, size: 0.07, r: 2.5, g: 1.2, b: 4, stretch: 0.05, drag: 0.5, shape: Shape.Spark });
      }
    } else {
      this.screen.lens(null);
      this.screen.saturation = 1;
    }


    // Update everything.
    this.star.update(dt);
    this.world.update(dt);
    this.shell.update(dt, t);
    this.minions.update(dt);
    this.fly.update(dt);
    this.particles.update(t);
    this.rig.update(dtReal);
    this.screen.update(dtReal, t);
    this.applyThemeLights();
    this.stage.render();
    this.floaters.update(dtReal);
    this.adaptQuality(dtReal);
  }

  /**
   * Visuals started by one-shot events are re-derived from state every frame,
   * so an event dropped while the tab was hidden can't leave a stale shell or
   * a ghost golden Freakmoji behind.
   */
  private reconcile(game: Game): void {
    const s = game.state;
    if (!s.boss && this.shell.active) this.shell.end();
    else if (s.boss && !this.shell.active) this.shell.begin((s.boss.final ? FINAL_BOSS : ERAS[s.boss.era].boss!).shell);
    if (!s.golden) {
      this.golden.root.visible = false;
    } else if (!this.golden.root.visible || this.goldenSeed !== s.golden.seed) {
      this.goldenSeed = s.golden.seed;
      this.goldenLife = GOLDEN_LIFE * game.mods.goldenDuration;
      this.goldenAge = Math.max(0, this.goldenLife - (s.golden.end - s.time));
      this.golden.root.visible = true;
    }
    if (!s.charge) this.chargeFist.visible = false;
  }

  private applyThemeLights(): void {
    const T = this.world.theme;
    const st = this.stage;
    st.hemi.color.copy(T.c.hemiSky);
    st.hemi.groundColor.copy(T.c.hemiGround);
    st.hemi.intensity = T.n.hemiInt;
    st.key.color.copy(T.c.keyColor);
    st.setKeyDirection(T.v.keyDir);
    st.key.intensity = T.n.keyInt;
    st.rim.color.copy(T.c.rimColor);
    st.rim.intensity = T.n.rimInt;
    st.bloom.strength = T.n.bloom;
    const fog = st.scene.fog as THREE.Fog;
    fog.color.copy(T.c.fog);
    fog.near = T.n.fogNear;
    fog.far = T.n.fogFar;
    if (typeof document !== 'undefined') document.documentElement.style.setProperty('--era-accent', T.accent);
  }

  /** Step quality down when frames are slow, back up when there's headroom. */
  private adaptQuality(dt: number): void {
    if (!this.tierAuto) return;
    this.frameTimes.push(dt);
    if (this.frameTimes.length < 90) return;
    const avg = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
    this.frameTimes.length = 0;
    this.tierCooldown -= 1.5;
    if (this.tierCooldown > 0) return;
    const tier = this.stage.tier;
    if (avg > 1 / 40 && tier !== 'low') {
      this.applyTier(tier === 'high' ? 'medium' : 'low');
      this.tierCooldown = 6;
    } else if (avg < 1 / 90 && tier === 'medium' && !this.isMobile()) {
      this.applyTier('high');
      this.tierCooldown = 20;
    }
  }

  /** Dev/testing: jump the presentation to an era instantly. */
  debugEra(era: number): void {
    this.applyEraLook(era, true);
  }

  get tier(): QualityTier {
    return this.stage.tier;
  }

  /** Theme accent for UI chrome. */
  get accent(): string {
    return THEMES[this.era].accent;
  }
}
