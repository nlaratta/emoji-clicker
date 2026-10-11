import * as THREE from 'three';
import type { Particles } from './particles';
import { Shape } from './particles';
import { SpriteBatch, type EmojiAtlas, type SpriteSlot } from './sprites';

/**
 * Era set pieces: procedural props that rise out of the ground when their era
 * begins and sink away when it ends. Everything is built from primitives and
 * shaders (no external assets), with instancing for repeated objects.
 */
export interface PropContext {
  particles: Particles;
  atlas: EmojiAtlas;
  /** Lower-detail props on weak devices. */
  lite: boolean;
}

export interface EraProps {
  group: THREE.Group;
  presence: number;
  setPresence(p: number): void;
  update(dt: number, t: number): void;
}

interface Tracked {
  obj: THREE.Object3D;
  baseY: number;
  sink: number;
  delay: number;
}

const easeOutBack = (x: number): number => {
  const c1 = 1.4;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

class PropSet implements EraProps {
  group = new THREE.Group();
  presence = 0;
  private tracked: Tracked[] = [];
  private updaters: ((dt: number, t: number) => void)[] = [];
  sprites: SpriteBatch | null = null;

  add<T extends THREE.Object3D>(obj: T, sink = 8, delay?: number): T {
    const d = delay ?? Math.min(0.45, Math.hypot(obj.position.x, obj.position.z) / 60);
    this.tracked.push({ obj, baseY: obj.position.y, sink, delay: d });
    this.group.add(obj);
    return obj;
  }

  onUpdate(fn: (dt: number, t: number) => void): void {
    this.updaters.push(fn);
  }

  setPresence(p: number): void {
    this.presence = p;
    this.group.visible = p > 0.001;
    for (const t of this.tracked) {
      const k = Math.min(1, Math.max(0, (p * 1.45 - t.delay) / 1));
      const e = k <= 0 ? 0 : easeOutBack(k);
      t.obj.position.y = t.baseY - (1 - e) * t.sink;
      t.obj.visible = k > 0.001;
    }
  }

  update(dt: number, t: number): void {
    for (const fn of this.updaters) fn(dt, t);
    if (this.sprites) {
      for (const s of this.sprites.slots) if (s.visible) s.alpha = Math.min(1, this.presence * 1.5);
      this.sprites.flush();
    }
  }
}

/** Seeded random for stable prop layouts. */
function rng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A point on a ring that avoids the wedge between the camera and the star. */
function ringPoint(r: () => number, rMin: number, rMax: number, frontClear = 0.7): THREE.Vector3 {
  for (let i = 0; i < 20; i++) {
    const a = r() * Math.PI * 2;
    const d = rMin + r() * (rMax - rMin);
    const p = new THREE.Vector3(Math.sin(a) * d, 0, Math.cos(a) * d);
    if (Math.cos(a) < frontClear || d > 14) return p;
  }
  return new THREE.Vector3(0, 0, -rMin);
}

function instanced(geo: THREE.BufferGeometry, mat: THREE.Material, mats: THREE.Matrix4[], colors?: THREE.Color[]): THREE.InstancedMesh {
  const m = new THREE.InstancedMesh(geo, mat, mats.length);
  mats.forEach((x, i) => m.setMatrixAt(i, x));
  if (colors) colors.forEach((c, i) => m.setColorAt(i, c));
  m.instanceMatrix.needsUpdate = true;
  return m;
}

const tmpM = new THREE.Matrix4();
const tmpQ = new THREE.Quaternion();
const tmpE = new THREE.Euler();
const tmpV = new THREE.Vector3();
const tmpS = new THREE.Vector3();
const mtx = (x: number, y: number, z: number, sx: number, sy: number, sz: number, rx = 0, ry = 0, rz = 0): THREE.Matrix4 =>
  new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)), new THREE.Vector3(sx, sy, sz));

function addSprite(set: PropSet, ctx: PropContext, emoji: string, x: number, y: number, z: number, scale: number): SpriteSlot {
  if (!set.sprites) {
    set.sprites = new SpriteBatch(ctx.atlas, 16, { renderOrder: 2 });
    set.group.add(set.sprites.mesh);
  }
  const slot = set.sprites.slots.find((s) => !s.visible)!;
  Object.assign(slot, { x, y, z, scale, emoji, visible: true, alpha: 1, rot: 0, flip: false, tint: 1 });
  return slot;
}

/** Continuous emitter helper: calls `emit` at `rate` per second. */
function emitter(rate: number, emit: () => void): (dt: number) => void {
  let acc = Math.random();
  return (dt) => {
    acc += dt * rate;
    while (acc >= 1) {
      acc -= 1;
      emit();
    }
  };
}

function flame(ctx: PropContext, x: number, y: number, z: number, scale = 1): void {
  const p = ctx.particles;
  p.glow.spawn({
    x: x + (Math.random() - 0.5) * 0.15 * scale, y, z: z + (Math.random() - 0.5) * 0.15 * scale,
    vx: (Math.random() - 0.5) * 0.3, vy: 1.4 * scale + Math.random() * 0.6, vz: (Math.random() - 0.5) * 0.3,
    life: 0.5 + Math.random() * 0.3, size: 0.28 * scale, sizeEnd: 0.04,
    r: 3.2, g: 1.2 + Math.random() * 0.6, b: 0.25, drag: 1.2, gravity: -1.2, shape: Shape.Glow,
  });
}

// ─────────────────────────────────────────────────────────────── I. Primitive
function primitive(ctx: PropContext): PropSet {
  const set = new PropSet();
  const r = rng(11);
  const rock = new THREE.MeshStandardMaterial({ color: 0x8a7a6a, roughness: 0.95, flatShading: true });
  const mesaMat = new THREE.MeshStandardMaterial({ color: 0x6a4a4a, roughness: 1, flatShading: true });

  const mesas: THREE.Matrix4[] = [];
  for (let i = 0; i < 8; i++) {
    const a = Math.PI + (i - 3.5) * 0.38 + (r() - 0.5) * 0.2;
    const d = 32 + r() * 14;
    mesas.push(mtx(Math.sin(a) * d, 0, Math.cos(a) * d, 5 + r() * 5, 5 + r() * 8, 5 + r() * 5, 0, r() * 3, 0));
  }
  set.add(instanced(new THREE.CylinderGeometry(0.55, 1, 1, 7, 1).translate(0, 0.5, 0), mesaMat, mesas), 16);

  const rocks: THREE.Matrix4[] = [];
  for (let i = 0; i < (ctx.lite ? 12 : 26); i++) {
    const p = ringPoint(r, 2.8, 12);
    const s = 0.2 + r() * 0.6;
    rocks.push(mtx(p.x, s * 0.4, p.z, s, s * (0.6 + r() * 0.5), s, r() * 3, r() * 3, r() * 3));
  }
  set.add(instanced(new THREE.DodecahedronGeometry(1, 0), rock, rocks), 4);

  const leaf = new THREE.MeshStandardMaterial({ color: 0x2f5a2a, roughness: 0.9, flatShading: true });
  const bark = new THREE.MeshStandardMaterial({ color: 0x4a3020, roughness: 1 });
  const crowns: THREE.Matrix4[] = [];
  const trunks: THREE.Matrix4[] = [];
  for (let i = 0; i < 14; i++) {
    const p = ringPoint(r, 9, 22, 0.5);
    const h = 2.5 + r() * 3;
    trunks.push(mtx(p.x, h * 0.2, p.z, 0.25, h * 0.4, 0.25));
    crowns.push(mtx(p.x, h * 0.4 + h * 0.4, p.z, h * 0.35, h * 0.8, h * 0.35, 0, r() * 3, 0));
  }
  set.add(instanced(new THREE.CylinderGeometry(0.5, 0.6, 1, 6), bark, trunks), 8);
  set.add(instanced(new THREE.ConeGeometry(1, 1, 7), leaf, crowns), 10);

  // Campfire with a flickering light.
  const fire = new THREE.Group();
  fire.position.set(-3.1, 0, 0.9);
  const logMat = new THREE.MeshStandardMaterial({ color: 0x5a3a22, roughness: 1 });
  for (let i = 0; i < 3; i++) {
    const log = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.8, 6), logMat);
    log.rotation.set(Math.PI / 2 - 0.35, (i / 3) * Math.PI * 2, 0);
    log.position.y = 0.12;
    fire.add(log);
  }
  const stones = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.1, 5, 9), rock);
  stones.rotation.x = Math.PI / 2;
  stones.position.y = 0.06;
  fire.add(stones);
  const light = new THREE.PointLight(0xff8a3a, 6, 9, 1.6);
  light.position.y = 0.6;
  fire.add(light);
  set.add(fire, 3);
  const fireEmit = emitter(ctx.lite ? 18 : 40, () => flame(ctx, -3.1, 0.18 + fire.position.y, 0.9));
  set.onUpdate((dt, t) => {
    if (fire.visible) fireEmit(dt);
    light.intensity = (5 + Math.sin(t * 13) * 1.2 + Math.sin(t * 29) * 0.8) * set.presence;
  });

  // Distant wildlife.
  const mammoth = addSprite(set, ctx, '🦣', -18, 1.4, -24, 3.2);
  const mammoth2 = addSprite(set, ctx, '🦣', 14, 1.1, -30, 2.4);
  addSprite(set, ctx, '🌋', 14, 4.2, -44, 11);
  set.onUpdate((_dt, t) => {
    mammoth.x = -22 + ((t * 0.6) % 44);
    mammoth.flip = false;
    mammoth.y = 1.4 + Math.abs(Math.sin(t * 2.5)) * 0.15;
    mammoth2.x = 20 - ((t * 0.4) % 40);
    mammoth2.flip = true;
    mammoth2.y = 1.1 + Math.abs(Math.sin(t * 2.2 + 1)) * 0.1;
  });
  const smokeEmit = emitter(3, () =>
    ctx.particles.smoke(tmpV.set(14 + (Math.random() - 0.5), 9, -44), 1, new THREE.Color(0x3a2a30), { size: 2, sizeEnd: 6, life: 4, vy: 2 }),
  );
  set.onUpdate((dt) => set.presence > 0.5 && smokeEmit(dt));
  return set;
}

// ─────────────────────────────────────────────────────────────── II. Medieval
function medieval(ctx: PropContext): PropSet {
  const set = new PropSet();
  const r = rng(22);
  const stone = new THREE.MeshStandardMaterial({ color: 0x9a968e, roughness: 0.92 });
  const roof = new THREE.MeshStandardMaterial({ color: 0x9a2a2a, roughness: 0.7 });

  const R = 12;
  const walls: THREE.Matrix4[] = [];
  const merlons: THREE.Matrix4[] = [];
  for (let i = 0; i <= 22; i++) {
    const a = Math.PI - 1.15 + (i / 22) * 2.3;
    const x = Math.sin(a) * R;
    const z = Math.cos(a) * R;
    walls.push(mtx(x, 1.6, z, 1.75, 3.2, 0.9, 0, a, 0));
    if (i % 1 === 0) merlons.push(mtx(x, 3.45, z, 0.55, 0.6, 0.95, 0, a, 0));
  }
  set.add(instanced(new THREE.BoxGeometry(1, 1, 1), stone, walls), 6);
  set.add(instanced(new THREE.BoxGeometry(1, 1, 1), stone, merlons), 7);

  for (const a of [Math.PI - 1.2, Math.PI, Math.PI + 1.2]) {
    const tower = new THREE.Group();
    tower.position.set(Math.sin(a) * R, 0, Math.cos(a) * R);
    const body = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.45, 5.6, 16), stone);
    body.position.y = 2.8;
    const cone = new THREE.Mesh(new THREE.ConeGeometry(1.7, 2.4, 16), roof);
    cone.position.y = 6.8;
    tower.add(body, cone);
    set.add(tower, 9, 0.1);
  }

  // Banners that ripple (CPU-animated vertices, cheap at this size).
  const banners: { geo: THREE.PlaneGeometry; base: Float32Array }[] = [];
  const colors = [0xd23a3a, 0x3a6ad2, 0xd2a23a, 0x3a6ad2];
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x4a3a2a });
  [-1, 1].forEach((side, si) => {
    [0, 1].forEach((j) => {
      const g = new THREE.Group();
      const ang = side * (0.9 + j * 0.55);
      g.position.set(Math.sin(ang + Math.PI) * 5.2 * -1, 0, Math.cos(ang + Math.PI) * 5.2);
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 4, 6), poleMat);
      pole.position.y = 2;
      const geo = new THREE.PlaneGeometry(1.1, 1.8, 10, 6);
      const flag = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: colors[si * 2 + j], side: THREE.DoubleSide, roughness: 0.8 }));
      flag.position.set(0.58, 2.9, 0);
      g.add(pole, flag);
      g.lookAt(0, 0, 0);
      g.rotateY(Math.PI / 2);
      banners.push({ geo, base: (geo.attributes.position.array as Float32Array).slice() });
      set.add(g, 5);
    });
  });
  set.onUpdate((_dt, t) => {
    if (set.presence <= 0) return;
    banners.forEach((b, bi) => {
      const pos = b.geo.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length; i += 3) {
        const x = b.base[i] + 0.55;
        pos[i + 2] = Math.sin(x * 4 - t * 5 + bi) * 0.12 * x;
      }
      b.geo.attributes.position.needsUpdate = true;
    });
  });

  // Torches
  const torchMat = new THREE.MeshStandardMaterial({ color: 0x3a2a1a });
  const torchSpots = [new THREE.Vector3(-2.7, 0, 1.4), new THREE.Vector3(2.7, 0, 1.4)];
  for (const p of torchSpots) {
    const t = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.04, 1.6, 6), torchMat);
    t.position.set(p.x, 0.8, p.z);
    set.add(t, 3);
  }
  const torchLight = new THREE.PointLight(0xffa04a, 4, 10, 1.5);
  torchLight.position.set(0, 2, 1.6);
  set.add(torchLight, 3);
  const torchEmit = emitter(ctx.lite ? 14 : 30, () => {
    const p = torchSpots[Math.random() < 0.5 ? 0 : 1];
    flame(ctx, p.x, 1.62, p.z, 0.6);
  });
  set.onUpdate((dt, t) => {
    if (set.presence > 0.6) torchEmit(dt);
    torchLight.intensity = (3.5 + Math.sin(t * 11) * 0.8) * set.presence;
  });

  // A dragon occasionally crosses the sky.
  const dragon = addSprite(set, ctx, '🐉', -60, 14, -40, 7);
  addSprite(set, ctx, '🏰', -26, 3, -46, 9);
  set.onUpdate((_dt, t) => {
    const cyc = (t % 40) / 40;
    dragon.x = -70 + cyc * 140;
    dragon.y = 14 + Math.sin(t * 1.5) * 1.5;
    dragon.flip = true;
    dragon.rot = Math.sin(t * 1.5) * 0.08;
  });
  void r;
  return set;
}

// ──────────────────────────────────────────────────────────── III. Industrial
function gearGeometry(radius: number, teeth: number, depth: number): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  const inner = radius * 0.82;
  for (let i = 0; i < teeth * 2; i++) {
    const a0 = (i / (teeth * 2)) * Math.PI * 2;
    const a1 = ((i + 1) / (teeth * 2)) * Math.PI * 2;
    const rr = i % 2 === 0 ? radius : inner;
    if (i === 0) shape.moveTo(Math.cos(a0) * rr, Math.sin(a0) * rr);
    else shape.lineTo(Math.cos(a0) * rr, Math.sin(a0) * rr);
    shape.lineTo(Math.cos(a1) * rr, Math.sin(a1) * rr);
  }
  const hole = new THREE.Path();
  hole.absarc(0, 0, radius * 0.25, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  return new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 1, curveSegments: 6 });
}

function industrial(ctx: PropContext): PropSet {
  const set = new PropSet();
  const r = rng(33);
  const brick = new THREE.MeshStandardMaterial({ color: 0x8a3a2a, roughness: 0.9 });
  const brass = new THREE.MeshStandardMaterial({ color: 0xc89a4a, roughness: 0.35, metalness: 0.85 });
  const iron = new THREE.MeshStandardMaterial({ color: 0x4a4a50, roughness: 0.6, metalness: 0.6 });

  const stacks: THREE.Vector3[] = [];
  for (let i = 0; i < 6; i++) {
    const a = Math.PI + (i - 2.5) * 0.42 + (r() - 0.5) * 0.15;
    const d = 18 + r() * 10;
    const h = 9 + r() * 7;
    const s = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 1.05, h, 12), brick);
    s.position.set(Math.sin(a) * d, h / 2, Math.cos(a) * d);
    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.4, 12), iron);
    band.position.y = h / 2 - 0.3;
    s.add(band);
    set.add(s, h + 2);
    stacks.push(new THREE.Vector3(s.position.x, h, s.position.z));
  }
  const smokeColor = new THREE.Color(0x2a2420);
  const smokeEmit = emitter(ctx.lite ? 6 : 14, () => {
    const p = stacks[Math.floor(Math.random() * stacks.length)];
    ctx.particles.smoke(tmpV.set(p.x, p.y + 0.5, p.z), 1, smokeColor, { size: 1.2, sizeEnd: 5, life: 5, vy: 1.6, vx: 0.8, a: 0.7 });
  });
  set.onUpdate((dt) => set.presence > 0.7 && smokeEmit(dt));

  // Giant gears grinding behind the arena.
  const gears: { m: THREE.Mesh; speed: number }[] = [];
  const gearSpecs: [number, number, number, number, number][] = [
    [-6.5, 4.2, -10, 2.6, 0.25],
    [-1.0, 6.4, -13, 3.4, -0.19],
    [5.5, 3.6, -10, 2.2, 0.3],
    [9.5, 7.5, -14, 2.8, -0.22],
  ];
  for (const [x, y, z, rad, speed] of gearSpecs) {
    const m = new THREE.Mesh(gearGeometry(rad, Math.round(rad * 6), 0.5), brass);
    m.position.set(x, y, z);
    set.add(m, y + rad + 2);
    gears.push({ m, speed });
  }
  set.onUpdate((dt) => gears.forEach((g) => (g.m.rotation.z += g.speed * dt)));

  // Steam pipes with vents.
  const pipes: THREE.Matrix4[] = [];
  const vents: THREE.Vector3[] = [];
  for (let i = 0; i < 5; i++) {
    const a = Math.PI + (i - 2) * 0.5;
    const d = 5.5;
    const x = Math.sin(a) * d;
    const z = Math.cos(a) * d;
    pipes.push(mtx(x, 0.35, z, 0.3, 3, 0.3, Math.PI / 2, a, 0));
    vents.push(new THREE.Vector3(x, 0.7, z));
  }
  set.add(instanced(new THREE.CylinderGeometry(1, 1, 1, 10), iron, pipes), 3);
  let ventTimer = 0;
  set.onUpdate((dt) => {
    ventTimer -= dt;
    if (ventTimer <= 0 && set.presence > 0.8) {
      ventTimer = 0.6 + Math.random() * 1.2;
      const v = vents[Math.floor(Math.random() * vents.length)];
      for (let i = 0; i < 8; i++) {
        ctx.particles.matter.spawn({
          x: v.x, y: v.y, z: v.z, vx: (Math.random() - 0.5) * 0.8, vy: 3 + Math.random() * 2, vz: (Math.random() - 0.5) * 0.8,
          life: 1.2, size: 0.3, sizeEnd: 1.4, r: 0.92, g: 0.92, b: 0.95, a: 0.5, drag: 2, shape: Shape.Smoke,
        });
      }
    }
  });
  const train = addSprite(set, ctx, '🚂', -50, 1.6, -26, 4);
  addSprite(set, ctx, '🏭', 22, 3.5, -40, 9);
  set.onUpdate((_dt, t) => {
    train.x = 50 - ((t * 5) % 100);
    if (set.presence > 0.8 && Math.random() < 0.15) {
      ctx.particles.smoke(tmpV.set(train.x - 1, 3.4, -26), 1, new THREE.Color(0xdddddd), { size: 0.6, sizeEnd: 2.4, life: 2 });
    }
  });
  return set;
}

// ──────────────────────────────────────────────────────────────── IV. Modern
function windowTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 128;
  const g = c.getContext('2d')!;
  g.fillStyle = '#000';
  g.fillRect(0, 0, 64, 128);
  for (let y = 4; y < 128; y += 8) {
    for (let x = 4; x < 64; x += 8) {
      if (Math.random() < 0.45) {
        g.fillStyle = Math.random() < 0.8 ? '#ffd890' : '#9ad0ff';
        g.fillRect(x, y, 4, 4);
      }
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.magFilter = THREE.NearestFilter;
  return t;
}

function modern(ctx: PropContext): PropSet {
  const set = new PropSet();
  const r = rng(44);
  const tex = windowTexture();
  const facade = new THREE.MeshStandardMaterial({ color: 0x1a1e2a, roughness: 0.6, metalness: 0.3, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 1.3 });
  const towers: THREE.Matrix4[] = [];
  for (let i = 0; i < (ctx.lite ? 26 : 46); i++) {
    const a = Math.PI + (r() - 0.5) * 3.4;
    const d = 22 + r() * 22;
    const h = 6 + r() * 18;
    const w = 2.5 + r() * 3;
    towers.push(mtx(Math.sin(a) * d, h / 2, Math.cos(a) * d, w, h, w, 0, r() * 3, 0));
  }
  set.add(instanced(new THREE.BoxGeometry(1, 1, 1), facade, towers), 26);

  // Searchlights sweeping the sky.
  const beamMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    uniforms: { uColor: { value: new THREE.Color(0.5, 0.65, 1.0) } },
    vertexShader: `varying float vY; void main(){ vY = uv.y; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `uniform vec3 uColor; varying float vY; void main(){ gl_FragColor = vec4(uColor * pow(vY, 1.5) * 0.35, 1.0); }`,
  });
  const beams: THREE.Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 2.6, 34, 16, 1, true).translate(0, 17, 0), beamMat);
    const base = new THREE.Group();
    base.position.set((i - 1) * 11, 0, -18 - i * 2);
    beam.rotation.x = Math.PI;
    beam.position.y = 34;
    const pivot = new THREE.Group();
    pivot.add(beam);
    base.add(pivot);
    set.add(base, 4);
    beams.push(pivot as unknown as THREE.Mesh);
  }
  set.onUpdate((_dt, t) => beams.forEach((b, i) => b.rotation.set(Math.sin(t * 0.4 + i * 2) * 0.5, 0, Math.sin(t * 0.3 + i) * 0.6)));

  // Helipad decal on the platform.
  const pc = document.createElement('canvas');
  pc.width = pc.height = 256;
  const g = pc.getContext('2d')!;
  g.strokeStyle = '#ffd23f';
  g.lineWidth = 10;
  g.beginPath();
  g.arc(128, 128, 112, 0, Math.PI * 2);
  g.stroke();
  g.fillStyle = '#f2f2f2';
  g.font = 'bold 150px sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText('H', 128, 136);
  const pad = new THREE.Mesh(
    new THREE.PlaneGeometry(3.2, 3.2),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(pc), transparent: true, depthWrite: false, opacity: 0.85 }),
  );
  pad.rotation.x = -Math.PI / 2;
  pad.position.y = 0.207;
  set.add(pad, 0.3, 0);

  // Barriers
  const sandbag = new THREE.MeshStandardMaterial({ color: 0x8a7a5a, roughness: 1 });
  const bags: THREE.Matrix4[] = [];
  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i < 7; i++) {
      const a = side * (0.95 + i * 0.13) + Math.PI;
      bags.push(mtx(Math.sin(a) * 3.6, 0.22, Math.cos(a) * -3.6 * -1, 0.35, 0.22, 0.25, 0, a, 0));
    }
  }
  set.add(instanced(new THREE.CapsuleGeometry(1, 1.2, 3, 8).rotateZ(Math.PI / 2), sandbag, bags), 2);

  const heli = addSprite(set, ctx, '🚁', 0, 12, -20, 3);
  set.onUpdate((_dt, t) => {
    heli.x = Math.sin(t * 0.25) * 16;
    heli.z = -22 + Math.cos(t * 0.25) * 6;
    heli.flip = Math.cos(t * 0.25) < 0;
    heli.y = 12 + Math.sin(t * 1.3) * 0.5;
  });
  return set;
}

// ──────────────────────────────────────────────────────────────── V. Future
function future(ctx: PropContext): PropSet {
  const set = new PropSet();
  const pylons: THREE.Mesh[] = [];
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 + 0.26;
    const d = 10;
    if (Math.cos(a) > 0.8) continue;
    const col = i % 2 === 0 ? new THREE.Color(0.2, 2.6, 3.0) : new THREE.Color(3.0, 0.4, 2.4);
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.22, 7, 0.22), new THREE.MeshBasicMaterial({ color: col }));
    m.position.set(Math.sin(a) * d, 3.5, Math.cos(a) * d);
    const cap = new THREE.Mesh(new THREE.OctahedronGeometry(0.45), new THREE.MeshBasicMaterial({ color: col }));
    cap.position.y = 4;
    m.add(cap);
    set.add(m, 9);
    pylons.push(m);
  }
  const ringMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.3, 2.4, 3.2), transparent: true, opacity: 0.85 });
  const ringMat2 = new THREE.MeshBasicMaterial({ color: new THREE.Color(3.2, 0.5, 2.6), transparent: true, opacity: 0.85 });
  const rings: THREE.Mesh[] = [];
  [2.0, 2.35, 2.7].forEach((rad, i) => {
    // Pivot carries the rise/sink animation; the ring spins inside it.
    const pivot = new THREE.Group();
    pivot.position.y = 1.0 + i * 0.14;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(rad, 0.018, 6, 128), i === 1 ? ringMat2 : ringMat);
    pivot.add(ring);
    set.add(pivot, 6, 0.2 + i * 0.05);
    rings.push(ring);
  });
  set.onUpdate((_dt, t) => {
    rings.forEach((ring, i) => {
      ring.rotation.set(Math.PI / 2 + 0.18 * Math.sin(t * 0.5 + i), 0, t * (0.25 + i * 0.12));
      ring.position.y = Math.sin(t * 0.8 + i) * 0.05;
    });
    pylons.forEach((p, i) => p.children[0].rotation.set(t, t * 1.3 + i, 0));
  });
  const ufo = addSprite(set, ctx, '🛸', 0, 9, -18, 2.4);
  set.onUpdate((_dt, t) => {
    ufo.x = Math.sin(t * 0.7) * 12;
    ufo.y = 9 + Math.sin(t * 2.1) * 1.2;
  });
  return set;
}

// ──────────────────────────────────────────────────────────────── VI. Cosmic
function bandTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 4;
  c.height = 256;
  const g = c.getContext('2d')!;
  for (let y = 0; y < 256; y++) {
    const v = 0.5 + 0.5 * Math.sin(y * 0.15) * Math.sin(y * 0.031 + 1);
    g.fillStyle = `rgb(${200 + v * 50},${130 + v * 60},${90 + v * 40})`;
    g.fillRect(0, y, 4, 1);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function cosmic(ctx: PropContext): PropSet {
  const set = new PropSet();
  const r = rng(66);
  // The Freakmoji now floats on an asteroid.
  const astGeo = new THREE.IcosahedronGeometry(1.9, 3);
  const pos = astGeo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    tmpV.fromBufferAttribute(pos, i);
    const n = 1 + (Math.sin(tmpV.x * 3.1) * Math.sin(tmpV.y * 2.7) * Math.sin(tmpV.z * 3.3)) * 0.12 + (r() - 0.5) * 0.06;
    tmpV.multiplyScalar(n);
    if (tmpV.y > 0.9) tmpV.y = 0.9 + (tmpV.y - 0.9) * 0.15;
    pos.setXYZ(i, tmpV.x, tmpV.y, tmpV.z);
  }
  astGeo.computeVertexNormals();
  const rockMat = new THREE.MeshStandardMaterial({ color: 0x6a6070, roughness: 0.95, flatShading: true });
  const asteroid = new THREE.Mesh(astGeo, rockMat);
  asteroid.position.y = -0.8;
  asteroid.scale.set(1, 0.5, 1);
  set.add(asteroid, 10, 0);

  // Ringed planet.
  const planet = new THREE.Group();
  planet.position.set(-34, 16, -70);
  const ball = new THREE.Mesh(new THREE.SphereGeometry(13, 48, 32), new THREE.MeshStandardMaterial({ map: bandTexture(), roughness: 0.9 }));
  ball.rotation.z = 0.3;
  const ringGeo = new THREE.RingGeometry(16, 25, 96, 1);
  const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0xd8c0a0, transparent: true, opacity: 0.55, side: THREE.DoubleSide }));
  ring.rotation.set(1.2, 0.2, 0.3);
  planet.add(ball, ring);
  set.add(planet, 40, 0);

  // Black hole with a swirling accretion disk.
  const bh = new THREE.Group();
  bh.position.set(26, 12, -58);
  const disk = new THREE.Mesh(
    new THREE.RingGeometry(2.6, 9, 96, 1),
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `uniform float uTime; varying vec2 vP;
        void main(){ float r = length(vP); float a = atan(vP.y, vP.x);
          float swirl = 0.5 + 0.5 * sin(a * 6.0 - r * 1.8 + uTime * 2.0) * sin(a * 3.0 + uTime);
          float fall = smoothstep(9.0, 3.0, r) * smoothstep(2.6, 3.4, r);
          vec3 col = mix(vec3(3.0, 0.9, 0.3), vec3(3.5, 2.6, 1.6), smoothstep(6.0, 3.0, r));
          gl_FragColor = vec4(col * fall * (0.4 + 0.8 * swirl), 1.0); }`,
    }),
  );
  disk.rotation.set(1.25, 0, 0.25);
  const core = new THREE.Mesh(new THREE.SphereGeometry(2.5, 32, 24), new THREE.MeshBasicMaterial({ color: 0x000000 }));
  bh.add(disk, core);
  set.add(bh, 40, 0);
  set.onUpdate((dt, t) => {
    (disk.material as THREE.ShaderMaterial).uniforms.uTime.value = t;
    planet.rotation.y += dt * 0.01;
  });

  // Orbiting asteroid belt.
  const belt = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1, 0), rockMat, ctx.lite ? 30 : 70);
  const orbit = Array.from({ length: belt.count }, () => ({
    r: 5 + r() * 6, a: r() * Math.PI * 2, y: (r() - 0.5) * 3 + 1.2, s: 0.1 + r() * 0.35, sp: 0.05 + r() * 0.08, spin: r() * 3,
  }));
  set.add(belt, 12, 0.1);
  set.onUpdate((_dt, t) => {
    orbit.forEach((o, i) => {
      const a = o.a + t * o.sp;
      tmpV.set(Math.sin(a) * o.r, o.y + belt.position.y, Math.cos(a) * o.r);
      tmpQ.setFromEuler(tmpE.set(t * 0.3 + o.spin, t * 0.2, 0));
      tmpS.setScalar(o.s);
      belt.setMatrixAt(i, tmpM.compose(tmpV.setY(o.y), tmpQ, tmpS));
    });
    belt.instanceMatrix.needsUpdate = true;
  });

  // Shooting stars.
  let comet = 2;
  set.onUpdate((dt) => {
    comet -= dt;
    if (comet <= 0 && set.presence > 0.8) {
      comet = 1.5 + Math.random() * 3;
      const x = (Math.random() - 0.5) * 80;
      ctx.particles.glow.spawn({
        x, y: 25 + Math.random() * 15, z: -60, vx: -30 - Math.random() * 20, vy: -10, vz: 0,
        life: 1.2, size: 0.4, sizeEnd: 0.1, r: 3, g: 3, b: 4, stretch: 0.12, shape: Shape.Spark,
      });
    }
  });
  addSprite(set, ctx, '🛰️', 12, 8, -16, 1.8);
  return set;
}

// ────────────────────────────────────────────────────────────── VII. Reality
function reality(ctx: PropContext): PropSet {
  const set = new PropSet();
  const r = rng(77);
  const shardMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, metalness: 0.3, roughness: 0.15, iridescence: 1, iridescenceIOR: 1.6, clearcoat: 1, flatShading: true,
  });
  const n = ctx.lite ? 30 : 64;
  const shards = new THREE.InstancedMesh(new THREE.OctahedronGeometry(1, 0), shardMat, n);
  const sp = Array.from({ length: n }, () => ({
    r: 3.5 + r() * 12, a: r() * Math.PI * 2, y: r() * 9 - 1, s: 0.15 + r() * 0.6, sp: (r() - 0.5) * 0.4, bob: r() * 6, tilt: r(),
  }));
  set.add(shards, 14, 0.05);

  // Fractured floor: glass tiles drifting beneath the star.
  const tiles = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 0.12, 1), new THREE.MeshPhysicalMaterial({
    color: 0x9affea, metalness: 0.1, roughness: 0.05, transmission: 0.0, clearcoat: 1, transparent: true, opacity: 0.6,
  }), 19);
  const tileData: { x: number; z: number; ph: number }[] = [];
  let ti = 0;
  for (let gx = -2; gx <= 2; gx++) {
    for (let gz = -2; gz <= 2; gz++) {
      if (Math.abs(gx) + Math.abs(gz) > 3 || ti >= 19) continue;
      tileData.push({ x: gx * 1.05, z: gz * 1.05, ph: r() * 6 });
      ti++;
    }
  }
  set.add(tiles, 6, 0);

  // Portals: swirling discs ringed with light.
  const portalMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `uniform float uTime; varying vec2 vUv;
      void main(){ vec2 c = vUv - 0.5; float r = length(c) * 2.0; float a = atan(c.y, c.x);
        float s = 0.5 + 0.5 * sin(a * 5.0 + r * 12.0 - uTime * 4.0);
        float edge = smoothstep(1.0, 0.85, r);
        vec3 col = mix(vec3(0.0, 2.2, 1.6), vec3(2.4, 0.0, 2.0), s) * (0.15 + 0.85 * pow(r, 2.0));
        gl_FragColor = vec4(col * edge, 1.0); }`,
  });
  const portals: THREE.Mesh[] = [];
  for (let i = 0; i < 4; i++) {
    const a = Math.PI + (i - 1.5) * 0.75;
    const p = new THREE.Mesh(new THREE.CircleGeometry(1.6, 48), portalMat);
    p.position.set(Math.sin(a) * 7.5, 2.4 + (i % 2) * 1.6, Math.cos(a) * 7.5);
    p.lookAt(0, 1.5, 0);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.06, 8, 64), new THREE.MeshBasicMaterial({ color: new THREE.Color(2.5, 2.5, 3) }));
    p.add(rim);
    set.add(p, 10);
    portals.push(p);
  }

  // The wireframe of reality, breathing.
  const wire = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(22, 2)),
    new THREE.LineBasicMaterial({ color: new THREE.Color(0.6, 1.6, 1.4), transparent: true, opacity: 0.35 }),
  );
  wire.position.y = 2;
  set.add(wire, 30, 0);

  set.onUpdate((_dt, t) => {
    portalMat.uniforms.uTime.value = t;
    portals.forEach((p, i) => (p.rotation.z = t * (0.4 + i * 0.1)));
    wire.rotation.set(t * 0.03, t * 0.05, 0);
    wire.scale.setScalar(1 + Math.sin(t * 0.7) * 0.04);
    (wire.material as THREE.LineBasicMaterial).color.setHSL((t * 0.05) % 1, 0.8, 0.6).multiplyScalar(2);
    sp.forEach((o, i) => {
      const a = o.a + t * o.sp;
      tmpV.set(Math.sin(a) * o.r, o.y + Math.sin(t * 0.8 + o.bob) * 0.8, Math.cos(a) * o.r);
      tmpQ.setFromEuler(tmpE.set(t * o.tilt, t * 0.5 + o.bob, t * 0.3));
      shards.setMatrixAt(i, tmpM.compose(tmpV, tmpQ, tmpS.setScalar(o.s)));
    });
    shards.instanceMatrix.needsUpdate = true;
    tileData.forEach((d, i) => {
      tmpV.set(d.x, 0.1 + Math.sin(t * 0.9 + d.ph) * 0.08, d.z);
      tmpQ.setFromEuler(tmpE.set(Math.sin(t + d.ph) * 0.06, t * 0.02, Math.cos(t * 0.7 + d.ph) * 0.06));
      tiles.setMatrixAt(i, tmpM.compose(tmpV, tmpQ, tmpS.set(0.98, 1, 0.98)));
    });
    tiles.instanceMatrix.needsUpdate = true;
  });
  addSprite(set, ctx, '👁️', -14, 14, -30, 6);
  addSprite(set, ctx, '🫥', 16, 16, -34, 7);
  return set;
}

const BUILDERS = [primitive, medieval, industrial, modern, future, cosmic, reality];

export function buildEraProps(era: number, ctx: PropContext): EraProps {
  const set = BUILDERS[Math.min(era, BUILDERS.length - 1)](ctx);
  set.setPresence(0);
  return set;
}
