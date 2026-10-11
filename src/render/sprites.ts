import * as THREE from 'three';
import { WEAPONS } from '../content/weapons';
import { PRODUCERS } from '../content/producers';

/**
 * Emoji are drawn once into a texture atlas at startup (using the system's
 * colour-emoji font) and rendered as billboards from a single instanced mesh.
 * This keeps the game's emoji-diorama identity without shipping image assets.
 */
const EXTRA = [
  '💥', '✨', '⭐', '💫', '🔥', '💨', '💧', '🪨', '🔩', '⚡', '🌟', '💢', '❗', '❓', '🍌', '🪶',
  '🧱', '🛞', '⚙️', '📄', '🦴', '🌀', '🕳️', '🌕', '🪐', '☄️', '🛡️', '💀', '🎈', '🫧', '😱', '😳',
  '🖐️', '👋', '🏹', '🗡️', '🔫', '💣', '🚀', '🛰️', '🌑', '🔮', '🧲', '⏳', '🦠', '🎲', '🧨', '🌌',
  '🐒', '🦍', '🏰', '🏇', '🏭', '🎯', '✈️', '🛸', '🖨️', '♾️', '🌲', '🌴', '🗿', '🦣', '🏛️', '🌋',
  '🐉', '🚂', '🚁', '🌆', '🫥', '👁️', '🪵', '🥊', '🌠', '😵', '🤯', '🫨', '🌈', '🍀', '👑', '🏆',
];

export class EmojiAtlas {
  readonly texture: THREE.CanvasTexture;
  private index = new Map<string, number>();
  readonly cols: number;
  readonly rows: number;
  readonly cell = 128;

  constructor() {
    const set = new Set<string>([...WEAPONS.map((w) => w.emoji), ...PRODUCERS.map((p) => p.emoji), ...EXTRA]);
    const list = [...set];
    this.cols = Math.ceil(Math.sqrt(list.length));
    this.rows = Math.ceil(list.length / this.cols);
    const canvas = document.createElement('canvas');
    canvas.width = this.cols * this.cell;
    canvas.height = this.rows * this.cell;
    const ctx = canvas.getContext('2d')!;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${this.cell * 0.78}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji","Twemoji Mozilla",sans-serif`;
    list.forEach((e, i) => {
      this.index.set(e, i);
      const x = (i % this.cols) * this.cell + this.cell / 2;
      const y = Math.floor(i / this.cols) * this.cell + this.cell / 2 + this.cell * 0.04;
      ctx.fillText(e, x, y);
    });
    this.texture = new THREE.CanvasTexture(canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.texture.anisotropy = 4;
    this.texture.generateMipmaps = true;
    this.texture.minFilter = THREE.LinearMipmapLinearFilter;
  }

  /** UV rect [u0, v0, du, dv] for an emoji (falls back to 💥). */
  rect(emoji: string, out: number[] = [0, 0, 0, 0]): number[] {
    const i = this.index.get(emoji) ?? this.index.get('💥') ?? 0;
    const du = 1 / this.cols;
    const dv = 1 / this.rows;
    out[0] = (i % this.cols) * du;
    out[1] = 1 - (Math.floor(i / this.cols) + 1) * dv;
    out[2] = du;
    out[3] = dv;
    return out;
  }
}

const VERT = /* glsl */ `
attribute vec3 aOffset;
attribute vec3 aScaleRot; // x scale, y rotation, z flipX
attribute vec4 aUv;
attribute vec4 aTint;     // rgb multiplier, a alpha
varying vec2 vUv;
varying vec4 vTint;
void main() {
  vec4 mv = modelViewMatrix * vec4(aOffset, 1.0);
  float c = cos(aScaleRot.y), s = sin(aScaleRot.y);
  vec2 corner = position.xy * aScaleRot.x;
  mv.xy += mat2(c, -s, s, c) * corner;
  gl_Position = projectionMatrix * mv;
  vec2 uv = position.xy + 0.5;
  if (aScaleRot.z > 0.5) uv.x = 1.0 - uv.x;
  vUv = aUv.xy + uv * aUv.zw;
  vTint = aTint;
}
`;

const FRAG = /* glsl */ `
uniform sampler2D uMap;
varying vec2 vUv;
varying vec4 vTint;
void main() {
  vec4 c = texture2D(uMap, vUv);
  c.rgb *= vTint.rgb;
  c.a *= vTint.a;
  if (c.a < 0.02) discard;
  gl_FragColor = c;
}
`;

export interface SpriteSlot {
  x: number;
  y: number;
  z: number;
  scale: number;
  rot: number;
  flip: boolean;
  alpha: number;
  tint: number;
  emoji: string;
  visible: boolean;
}

/** A fixed-size batch of emoji billboards, rewritten each frame. */
export class SpriteBatch {
  readonly mesh: THREE.Mesh;
  readonly slots: SpriteSlot[] = [];
  private geo: THREE.InstancedBufferGeometry;
  private aOffset: THREE.InstancedBufferAttribute;
  private aScaleRot: THREE.InstancedBufferAttribute;
  private aUv: THREE.InstancedBufferAttribute;
  private aTint: THREE.InstancedBufferAttribute;
  private atlas: EmojiAtlas;
  private rect = [0, 0, 0, 0];

  constructor(atlas: EmojiAtlas, capacity: number, opts: { depthTest?: boolean; renderOrder?: number } = {}) {
    this.atlas = atlas;
    const base = new THREE.PlaneGeometry(1, 1);
    this.geo = new THREE.InstancedBufferGeometry();
    this.geo.index = base.index;
    this.geo.setAttribute('position', base.getAttribute('position'));
    const mk = (n: number): THREE.InstancedBufferAttribute => {
      const a = new THREE.InstancedBufferAttribute(new Float32Array(capacity * n), n);
      a.setUsage(THREE.DynamicDrawUsage);
      return a;
    };
    this.aOffset = mk(3);
    this.aScaleRot = mk(3);
    this.aUv = mk(4);
    this.aTint = mk(4);
    this.geo.setAttribute('aOffset', this.aOffset);
    this.geo.setAttribute('aScaleRot', this.aScaleRot);
    this.geo.setAttribute('aUv', this.aUv);
    this.geo.setAttribute('aTint', this.aTint);
    this.geo.instanceCount = 0;
    for (let i = 0; i < capacity; i++) {
      this.slots.push({ x: 0, y: 0, z: 0, scale: 1, rot: 0, flip: false, alpha: 1, tint: 1, emoji: '💥', visible: false });
    }
    const mat = new THREE.ShaderMaterial({
      uniforms: { uMap: { value: atlas.texture } },
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      depthTest: opts.depthTest ?? true,
    });
    this.mesh = new THREE.Mesh(this.geo, mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = opts.renderOrder ?? 5;
  }

  /** Upload visible slots. Call once per frame after mutating slots. */
  flush(): void {
    const off = this.aOffset.array as Float32Array;
    const sr = this.aScaleRot.array as Float32Array;
    const uv = this.aUv.array as Float32Array;
    const tint = this.aTint.array as Float32Array;
    let n = 0;
    for (const s of this.slots) {
      if (!s.visible || s.alpha <= 0.01) continue;
      off[n * 3] = s.x;
      off[n * 3 + 1] = s.y;
      off[n * 3 + 2] = s.z;
      sr[n * 3] = s.scale;
      sr[n * 3 + 1] = s.rot;
      sr[n * 3 + 2] = s.flip ? 1 : 0;
      this.atlas.rect(s.emoji, this.rect);
      uv.set(this.rect, n * 4);
      tint[n * 4] = s.tint;
      tint[n * 4 + 1] = s.tint;
      tint[n * 4 + 2] = s.tint;
      tint[n * 4 + 3] = s.alpha;
      n++;
    }
    this.geo.instanceCount = n;
    for (const a of [this.aOffset, this.aScaleRot, this.aUv, this.aTint]) {
      a.clearUpdateRanges();
      a.addUpdateRange(0, n * a.itemSize);
      a.needsUpdate = true;
    }
  }

  dispose(): void {
    this.geo.dispose();
    (this.mesh.material as THREE.Material).dispose();
  }
}

/** Short-lived flying emoji (thrown weapons, debris) with simple physics. */
interface Flyer {
  slot: SpriteSlot;
  vx: number;
  vy: number;
  vz: number;
  spin: number;
  gravity: number;
  life: number;
  age: number;
  scale0: number;
  scale1: number;
  /** Optional scripted path: lerp from start to target over `travel` seconds, then ballistic. */
  tx?: number;
  ty?: number;
  tz?: number;
  sx?: number;
  sy?: number;
  sz?: number;
  travel?: number;
  onArrive?: () => void;
}

export class FlyingEmoji {
  readonly batch: SpriteBatch;
  private flyers: Flyer[] = [];
  private free: SpriteSlot[];

  constructor(atlas: EmojiAtlas, capacity = 96) {
    this.batch = new SpriteBatch(atlas, capacity, { renderOrder: 15 });
    this.free = [...this.batch.slots];
  }

  private take(): SpriteSlot | null {
    const s = this.free.pop();
    if (s) s.visible = true;
    return s ?? null;
  }

  /** Launch an emoji ballistically. */
  toss(emoji: string, x: number, y: number, z: number, vx: number, vy: number, vz: number, opts: Partial<Flyer> = {}): void {
    const slot = this.take();
    if (!slot) return;
    Object.assign(slot, { x, y, z, emoji, alpha: 1, rot: Math.random() * 6, flip: Math.random() < 0.5, tint: 1 });
    this.flyers.push({ slot, vx, vy, vz, spin: (Math.random() - 0.5) * 14, gravity: 9, life: 1.2, age: 0, scale0: 0.5, scale1: 0.5, ...opts });
  }

  /** Swing an emoji from `from` into `to` over `travel` seconds, then bounce off. */
  strike(emoji: string, from: THREE.Vector3, to: THREE.Vector3, travel: number, scale: number, onArrive?: () => void, flip = false): void {
    const slot = this.take();
    if (!slot) return;
    Object.assign(slot, { x: from.x, y: from.y, z: from.z, emoji, alpha: 1, rot: 0, flip, tint: 1, scale });
    this.flyers.push({
      slot, vx: 0, vy: 0, vz: 0, spin: 0, gravity: 0, life: travel + 0.6, age: 0, scale0: scale, scale1: scale * 0.8,
      sx: from.x, sy: from.y, sz: from.z, tx: to.x, ty: to.y, tz: to.z, travel, onArrive,
    });
  }

  update(dt: number): void {
    for (let i = this.flyers.length - 1; i >= 0; i--) {
      const f = this.flyers[i];
      f.age += dt;
      const s = f.slot;
      if (f.travel !== undefined && f.age <= f.travel) {
        const t = f.age / f.travel;
        const e = t * t; // accelerate into the hit
        s.x = f.sx! + (f.tx! - f.sx!) * e;
        s.y = f.sy! + (f.ty! - f.sy!) * e + Math.sin(t * Math.PI) * 0.4;
        s.z = f.sz! + (f.tz! - f.sz!) * e;
        s.rot = (s.flip ? 1 : -1) * (0.9 - t * 1.6);
        if (f.age + dt > f.travel) {
          f.onArrive?.();
          // Bounce off the face.
          f.vx = (f.sx! - f.tx!) * 0.9 + (Math.random() - 0.5) * 2;
          f.vy = 3 + Math.random() * 2;
          f.vz = 1.5;
          f.spin = (s.flip ? -1 : 1) * 12;
          f.gravity = 14;
        }
      } else {
        f.vx *= Math.exp(-0.4 * dt);
        f.vz *= Math.exp(-0.4 * dt);
        f.vy -= f.gravity * dt;
        s.x += f.vx * dt;
        s.y += f.vy * dt;
        s.z += f.vz * dt;
        s.rot += f.spin * dt;
      }
      const k = Math.min(1, f.age / f.life);
      s.scale = f.scale0 + (f.scale1 - f.scale0) * k;
      s.alpha = k > 0.75 ? 1 - (k - 0.75) / 0.25 : 1;
      if (f.age >= f.life) {
        s.visible = false;
        this.free.push(s);
        this.flyers[i] = this.flyers[this.flyers.length - 1];
        this.flyers.pop();
      }
    }
    this.batch.flush();
  }
}
