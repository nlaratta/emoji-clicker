import * as THREE from 'three';

/**
 * Stateless GPU particles. Each particle's position is evaluated in the vertex
 * shader from its spawn data (origin, velocity, drag, gravity, age), so the
 * CPU only writes when spawning, into a fixed ring buffer. One draw call per
 * pool regardless of particle count; no allocation in the hot path.
 */
export const Shape = { Glow: 0, Spark: 1, Chunk: 2, Smoke: 3, Ring: 4, Beam: 5, Star: 6 } as const;
export type Shape = (typeof Shape)[keyof typeof Shape];

export interface Spawn {
  x: number;
  y: number;
  z: number;
  vx?: number;
  vy?: number;
  vz?: number;
  life: number;
  size: number;
  sizeEnd?: number;
  r: number;
  g: number;
  b: number;
  a?: number;
  gravity?: number;
  drag?: number;
  /** View-space stretch along velocity (sparks, tracers). */
  stretch?: number;
  shape?: Shape;
  delay?: number;
}

const VERT = /* glsl */ `
attribute vec3 aPos0;
attribute vec3 aVel;
attribute vec2 aTime;
attribute vec2 aSize;
attribute vec4 aColor;
attribute vec4 aPhys;
uniform float uTime;
varying vec2 vUv;
varying vec4 vColor;
varying float vShape;
varying float vT;
void main() {
  float age = uTime - aTime.x;
  float t = age / aTime.y;
  if (t < 0.0 || t > 1.0) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  float shape = aPhys.w;
  float size = mix(aSize.x, aSize.y, t);
  vec2 corner = position.xy;
  vec4 mv;
  if (shape > 4.5 && shape < 5.5) {
    // Beam: aPos0 is the midpoint, aVel the full segment.
    vec4 a = modelViewMatrix * vec4(aPos0 - aVel * 0.5, 1.0);
    vec4 b = modelViewMatrix * vec4(aPos0 + aVel * 0.5, 1.0);
    vec2 dir = normalize(b.xy - a.xy + 1e-5);
    vec2 perp = vec2(-dir.y, dir.x);
    mv = mix(a, b, corner.y + 0.5);
    mv.xy += perp * corner.x * size;
  } else {
    float drag = aPhys.y;
    float decay = drag > 0.0 ? exp(-drag * age) : 1.0;
    float k = drag > 0.0 ? (1.0 - decay) / drag : age;
    vec3 p = aPos0 + aVel * k + vec3(0.0, -0.5 * aPhys.x * age * age, 0.0);
    vec3 vel = aVel * decay + vec3(0.0, -aPhys.x * age, 0.0);
    mv = modelViewMatrix * vec4(p, 1.0);
    if (aPhys.z > 0.0) {
      vec3 vv = (modelViewMatrix * vec4(vel, 0.0)).xyz;
      vec2 dir = normalize(vv.xy + 1e-5);
      float len = size + length(vv.xy) * aPhys.z;
      vec2 perp = vec2(-dir.y, dir.x);
      mv.xy += dir * corner.y * len + perp * corner.x * size;
    } else {
      float ang = (shape > 1.5 && shape < 2.5) || shape > 5.5 ? age * 7.0 + aTime.x * 17.0 : 0.0;
      float c = cos(ang), s = sin(ang);
      mv.xy += mat2(c, -s, s, c) * corner * size;
    }
  }
  gl_Position = projectionMatrix * mv;
  vUv = position.xy + 0.5;
  vColor = aColor;
  vColor.a *= (1.0 - smoothstep(0.55, 1.0, t)) * smoothstep(0.0, 0.04, t);
  vShape = shape;
  vT = t;
}
`;

const FRAG = /* glsl */ `
varying vec2 vUv;
varying vec4 vColor;
varying float vShape;
varying float vT;
void main() {
  vec2 c = vUv - 0.5;
  float d = length(c) * 2.0;
  float a;
  if (vShape < 0.5) a = pow(max(0.0, 1.0 - d), 2.2);
  else if (vShape < 1.5) a = smoothstep(1.0, 0.15, d);
  else if (vShape < 2.5) a = step(max(abs(c.x), abs(c.y) * 1.4), 0.45);
  else if (vShape < 3.5) a = smoothstep(1.0, 0.0, d) * 0.55;
  else if (vShape < 4.5) a = smoothstep(0.16, 0.0, abs(d - 0.82)) * (1.0 - vT * 0.5);
  else if (vShape < 5.5) a = smoothstep(0.5, 0.0, abs(c.x)) * (0.6 + 0.4 * smoothstep(0.5, 0.3, abs(c.y)));
  else {
    // Four-point star twinkle.
    float star = max(1.0 - abs(c.x) * 9.0 - abs(c.y) * 2.0, 1.0 - abs(c.y) * 9.0 - abs(c.x) * 2.0);
    a = clamp(star, 0.0, 1.0) + pow(max(0.0, 1.0 - d), 3.0);
  }
  if (a <= 0.002) discard;
  gl_FragColor = vec4(vColor.rgb, vColor.a * a);
}
`;

export class ParticlePool {
  readonly mesh: THREE.Mesh;
  private geo: THREE.InstancedBufferGeometry;
  private attrs: Record<'aPos0' | 'aVel' | 'aTime' | 'aSize' | 'aColor' | 'aPhys', THREE.InstancedBufferAttribute>;
  private cursor = 0;
  private dirtyMin = Infinity;
  private dirtyMax = -1;
  private uniforms = { uTime: { value: 0 } };
  readonly capacity: number;
  /** Fraction of spawns to keep (lowered on weak devices). */
  density = 1;
  private skip = 0;
  /** Slots in use: the ring wraps here (lowered on weak devices). */
  private limit: number;
  /** Highest slot written + 1 since the ring last wrapped: everything past it is
   *  known dead, so it isn't drawn (a calm scene draws a few hundred, not thousands). */
  private used = 0;
  /** Latest death time among particles written this lap of the ring, and the last one. */
  private lapDeath = 0;
  private prevLapDeath = 0;

  constructor(capacity: number, additive: boolean) {
    this.capacity = capacity;
    this.limit = capacity;
    const base = new THREE.PlaneGeometry(1, 1);
    this.geo = new THREE.InstancedBufferGeometry();
    this.geo.index = base.index;
    this.geo.setAttribute('position', base.getAttribute('position'));
    const mk = (n: number): THREE.InstancedBufferAttribute => {
      const a = new THREE.InstancedBufferAttribute(new Float32Array(capacity * n), n);
      a.setUsage(THREE.DynamicDrawUsage);
      return a;
    };
    this.attrs = { aPos0: mk(3), aVel: mk(3), aTime: mk(2), aSize: mk(2), aColor: mk(4), aPhys: mk(4) };
    // Start every slot expired.
    const time = this.attrs.aTime.array as Float32Array;
    for (let i = 0; i < capacity; i++) {
      time[i * 2] = -1000;
      time[i * 2 + 1] = 1;
    }
    for (const [k, v] of Object.entries(this.attrs)) this.geo.setAttribute(k, v);
    this.geo.instanceCount = 0;
    const mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    this.mesh = new THREE.Mesh(this.geo, mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = additive ? 20 : 10;
  }

  get time(): number {
    return this.uniforms.uTime.value;
  }

  /** Cap how many particles can be alive at once (quality tier). */
  setLimit(n: number): void {
    this.limit = Math.max(64, Math.min(this.capacity, Math.floor(n)));
    if (this.cursor >= this.limit) this.cursor = 0;
    this.used = Math.min(this.used, this.limit);
    this.geo.instanceCount = this.used;
  }

  spawn(p: Spawn): void {
    if (this.density < 1) {
      this.skip += 1 - this.density;
      if (this.skip >= 1) {
        this.skip -= 1;
        return;
      }
    }
    const i = this.cursor;
    this.cursor = (this.cursor + 1) % this.limit;
    if (this.cursor === 0) {
      this.prevLapDeath = this.lapDeath;
      this.lapDeath = 0;
    }
    if (i >= this.used) {
      this.used = i + 1;
      this.geo.instanceCount = this.used;
    }
    this.lapDeath = Math.max(this.lapDeath, this.uniforms.uTime.value + (p.delay ?? 0) + p.life);
    const A = this.attrs;
    const pos = A.aPos0.array as Float32Array;
    const vel = A.aVel.array as Float32Array;
    const tim = A.aTime.array as Float32Array;
    const siz = A.aSize.array as Float32Array;
    const col = A.aColor.array as Float32Array;
    const phy = A.aPhys.array as Float32Array;
    pos[i * 3] = p.x;
    pos[i * 3 + 1] = p.y;
    pos[i * 3 + 2] = p.z;
    vel[i * 3] = p.vx ?? 0;
    vel[i * 3 + 1] = p.vy ?? 0;
    vel[i * 3 + 2] = p.vz ?? 0;
    tim[i * 2] = this.uniforms.uTime.value + (p.delay ?? 0);
    tim[i * 2 + 1] = Math.max(0.01, p.life);
    siz[i * 2] = p.size;
    siz[i * 2 + 1] = p.sizeEnd ?? p.size;
    col[i * 4] = p.r;
    col[i * 4 + 1] = p.g;
    col[i * 4 + 2] = p.b;
    col[i * 4 + 3] = p.a ?? 1;
    phy[i * 4] = p.gravity ?? 0;
    phy[i * 4 + 1] = p.drag ?? 0;
    phy[i * 4 + 2] = p.stretch ?? 0;
    phy[i * 4 + 3] = p.shape ?? Shape.Glow;
    if (i < this.dirtyMin) this.dirtyMin = i;
    if (i > this.dirtyMax) this.dirtyMax = i;
  }

  update(time: number): void {
    this.uniforms.uTime.value = time;
    // Once the previous lap has burned out, only this lap's slots can be alive.
    if (this.used > this.cursor && time > this.prevLapDeath) {
      this.used = this.cursor;
      this.geo.instanceCount = this.used;
    }
    if (this.dirtyMax < 0) return;
    const start = this.dirtyMin;
    const count = this.dirtyMax - this.dirtyMin + 1;
    for (const a of Object.values(this.attrs)) {
      a.clearUpdateRanges();
      a.addUpdateRange(start * a.itemSize, count * a.itemSize);
      a.needsUpdate = true;
    }
    this.dirtyMin = Infinity;
    this.dirtyMax = -1;
  }

  dispose(): void {
    this.geo.dispose();
    (this.mesh.material as THREE.Material).dispose();
  }
}

/** Shared FX helpers built on two pools: additive light and alpha-blended matter. */
export class Particles {
  readonly glow: ParticlePool;
  readonly matter: ParticlePool;
  readonly group = new THREE.Group();

  constructor(glowCap = 6000, matterCap = 2500) {
    this.glow = new ParticlePool(glowCap, true);
    this.matter = new ParticlePool(matterCap, false);
    this.group.add(this.matter.mesh, this.glow.mesh);
  }

  setDensity(d: number): void {
    this.glow.density = d;
    this.matter.density = d;
    // Fewer spawns need fewer slots: keep the pools (and what's drawn) in proportion.
    const k = d >= 1 ? 1 : d >= 0.75 ? 0.6 : 0.3;
    this.glow.setLimit(this.glow.capacity * k);
    this.matter.setLimit(this.matter.capacity * k);
  }

  update(time: number): void {
    this.glow.update(time);
    this.matter.update(time);
  }

  /** Radial burst of glowing sparks. */
  sparks(o: THREE.Vector3, n: number, color: THREE.Color, speed = 4, opts: Partial<Spawn> = {}): void {
    for (let i = 0; i < n; i++) {
      const u = Math.random() * 2 - 1;
      const th = Math.random() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      const v = speed * (0.4 + Math.random() * 0.8);
      this.glow.spawn({
        x: o.x, y: o.y, z: o.z,
        vx: s * Math.cos(th) * v, vy: u * v + speed * 0.25, vz: s * Math.sin(th) * v,
        life: 0.35 + Math.random() * 0.4, size: 0.05 + Math.random() * 0.05, sizeEnd: 0.01,
        r: color.r * 4, g: color.g * 4, b: color.b * 4,
        gravity: 6, drag: 2.5, stretch: 0.045, shape: Shape.Spark,
        ...opts,
      });
    }
  }

  /** Expanding ring, camera-facing. */
  ring(o: THREE.Vector3, color: THREE.Color, size = 3, life = 0.45, intensity = 2.5): void {
    this.glow.spawn({
      x: o.x, y: o.y, z: o.z, life, size: 0.2, sizeEnd: size,
      r: color.r * intensity, g: color.g * intensity, b: color.b * intensity, shape: Shape.Ring,
    });
  }

  flash(o: THREE.Vector3, color: THREE.Color, size = 1.2, life = 0.18, intensity = 5): void {
    this.glow.spawn({
      x: o.x, y: o.y, z: o.z, life, size, sizeEnd: size * 1.6,
      r: color.r * intensity, g: color.g * intensity, b: color.b * intensity, shape: Shape.Glow,
    });
  }

  smoke(o: THREE.Vector3, n: number, color: THREE.Color, opts: Partial<Spawn> = {}): void {
    for (let i = 0; i < n; i++) {
      this.matter.spawn({
        x: o.x + (Math.random() - 0.5) * 0.3, y: o.y + (Math.random() - 0.5) * 0.3, z: o.z + (Math.random() - 0.5) * 0.3,
        vx: (Math.random() - 0.5) * 1.2, vy: 0.4 + Math.random() * 0.8, vz: (Math.random() - 0.5) * 1.2,
        life: 0.9 + Math.random() * 0.7, size: 0.25, sizeEnd: 0.9 + Math.random() * 0.5,
        r: color.r, g: color.g, b: color.b, a: 0.55, drag: 1.5, gravity: -0.4, shape: Shape.Smoke,
        ...opts,
      });
    }
  }

  debris(o: THREE.Vector3, n: number, color: THREE.Color, speed = 4): void {
    for (let i = 0; i < n; i++) {
      const th = Math.random() * Math.PI * 2;
      const v = speed * (0.5 + Math.random() * 0.7);
      const shade = 0.7 + Math.random() * 0.5;
      this.matter.spawn({
        x: o.x, y: o.y, z: o.z,
        vx: Math.cos(th) * v, vy: 1.5 + Math.random() * speed, vz: Math.sin(th) * v * 0.6 + 1,
        life: 0.8 + Math.random() * 0.6, size: 0.06 + Math.random() * 0.08,
        r: color.r * shade, g: color.g * shade, b: color.b * shade,
        gravity: 12, drag: 0.6, shape: Shape.Chunk,
      });
    }
  }

  beam(a: THREE.Vector3, b: THREE.Vector3, color: THREE.Color, width = 0.12, life = 0.18, intensity = 5): void {
    this.glow.spawn({
      x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, z: (a.z + b.z) / 2,
      vx: b.x - a.x, vy: b.y - a.y, vz: b.z - a.z,
      life, size: width, sizeEnd: width * 0.2,
      r: color.r * intensity, g: color.g * intensity, b: color.b * intensity, shape: Shape.Beam,
    });
  }

  dispose(): void {
    this.glow.dispose();
    this.matter.dispose();
  }
}
