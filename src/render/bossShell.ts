import * as THREE from 'three';
import type { BossDef } from '../content/eras';

const SHELLS: Record<BossDef['shell'], { a: number; b: number; pattern: number; crack: number; alpha: number }> = {
  stone: { a: 0x8a8278, b: 0x4a443c, pattern: 0, crack: 0xff7a2a, alpha: 0.82 },
  iron: { a: 0x8a9098, b: 0x3a4048, pattern: 1, crack: 0xffb040, alpha: 0.8 },
  brass: { a: 0xb8883a, b: 0x5a3a14, pattern: 2, crack: 0xffd070, alpha: 0.8 },
  kevlar: { a: 0x3a4030, b: 0x1a1e18, pattern: 3, crack: 0x4ab0ff, alpha: 0.82 },
  energy: { a: 0x30a0d0, b: 0x06284a, pattern: 4, crack: 0xbff4ff, alpha: 0.5 },
  void: { a: 0x2a1a4a, b: 0x05020f, pattern: 5, crack: 0xb070ff, alpha: 0.8 },
  zen: { a: 0xe0c070, b: 0xb07020, pattern: 6, crack: 0xfff4d0, alpha: 0.6 },
};

const FRAG = /* glsl */ `
uniform vec3 uA, uB, uCrackColor;
uniform float uPattern, uCrack, uTime, uFlash, uAlpha;
varying vec3 vObj;
varying vec3 vNormalV;
varying vec3 vViewDir;
float h13(vec3 p) { p = fract(p * 0.1031); p += dot(p, p.zyx + 31.32); return fract((p.x + p.y) * p.z); }
float n3(vec3 p) { vec3 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(mix(h13(i), h13(i+vec3(1,0,0)), f.x), mix(h13(i+vec3(0,1,0)), h13(i+vec3(1,1,0)), f.x), f.y),
             mix(mix(h13(i+vec3(0,0,1)), h13(i+vec3(1,0,1)), f.x), mix(h13(i+vec3(0,1,1)), h13(i+vec3(1,1,1)), f.x), f.y), f.z); }
float fbm(vec3 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 4; i++) { s += a * n3(p); p *= 2.1; a *= 0.5; } return s; }
vec3 vor(vec3 x) { vec3 n = floor(x), f = fract(x); float md = 8.0, md2 = 8.0; vec3 id = vec3(0.0);
  for (int k = -1; k <= 1; k++) for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
    vec3 g = vec3(float(i), float(j), float(k)); vec3 o = vec3(h13(n+g), h13(n+g+11.0), h13(n+g+23.0));
    float d = length(g + o - f); if (d < md) { md2 = md; md = d; id = n + g; } else if (d < md2) md2 = d; }
  return vec3(md2 - md, h13(id), md); }
void main() {
  vec3 n = normalize(vObj);
  float lat = asin(n.y), lon = atan(n.x, n.z);
  vec3 col;
  float p = uPattern;
  if (p < 0.5) { col = mix(uB, uA, fbm(n * 4.0)); }
  else if (p < 1.5) { vec2 g = fract(vec2(lon * 2.0, lat * 3.0)); float seam = smoothstep(0.0, 0.04, min(min(g.x, 1.0-g.x), min(g.y, 1.0-g.y)));
    col = mix(uB, uA * (0.8 + 0.3 * n3(n * 9.0)), seam); }
  else if (p < 2.5) { float ring = 0.5 + 0.5 * sin(lat * 26.0); float teeth = step(0.5, fract(lon * 6.0 + lat * 2.0));
    col = mix(uB, uA, ring * 0.7 + teeth * 0.3); }
  else if (p < 3.5) { float w = step(0.5, fract((lon + lat) * 9.0)) * 0.5 + step(0.5, fract((lon - lat) * 9.0)) * 0.5; col = mix(uB, uA, w); }
  else if (p < 4.5) { vec2 q = vec2(lon * 5.0, lat * 6.0); vec2 hx = abs(fract(q) - 0.5); float edge = smoothstep(0.42, 0.5, max(hx.x, hx.y));
    col = uB + uA * (edge * 2.5 + 0.15 + 0.1 * sin(uTime * 3.0 + lat * 10.0)); }
  else if (p < 5.5) { float s = fbm(n * 3.0 + vec3(uTime * 0.2, 0.0, 0.0)); col = mix(uB, uA, s) + vec3(step(0.97, h13(floor(n * 40.0)))) * 1.5; }
  else { float w = 0.5 + 0.5 * sin(lat * 12.0 + uTime * 2.0); col = mix(uB, uA, w) * 1.4; }

  // Simple key lighting + rim.
  vec3 L = normalize(vec3(-0.4, 0.7, 0.6));
  float diff = 0.45 + 0.55 * max(dot(normalize(vNormalV), L), 0.0);
  float rim = pow(1.0 - max(dot(normalize(vNormalV), normalize(vViewDir)), 0.0), 2.5);
  col = col * diff + uA * rim * 0.6;

  // Composure cracks: glowing fissures, then whole plates fall away.
  vec3 v = vor(n * 3.2);
  float crackW = 0.015 + uCrack * 0.08;
  float fissure = smoothstep(crackW, crackW * 0.3, v.x) * step(0.03, uCrack);
  if (v.y < uCrack * 0.75 - 0.25) discard;
  col = mix(col, uCrackColor * 2.2, fissure);
  col += vec3(uFlash) * 0.6;
  // Thinner in the middle, solid at the rim: the calm face shows through.
  float edge = pow(1.0 - max(dot(normalize(vNormalV), normalize(vViewDir)), 0.0), 1.5);
  gl_FragColor = vec4(col, clamp(mix(uAlpha * 0.55, 1.0, edge) + fissure, 0.0, 1.0));
}
`;

/** The "Composure" armour a boss wraps around the Freakmoji. */
export class BossShell {
  readonly mesh: THREE.Mesh;
  private u: Record<string, THREE.IUniform>;
  private crack = 0;
  private targetCrack = 0;
  color = new THREE.Color();
  crackColor = new THREE.Color();
  active = false;
  private scaleIn = 0;

  constructor() {
    this.u = {
      uA: { value: new THREE.Color() }, uB: { value: new THREE.Color() }, uCrackColor: { value: new THREE.Color() },
      uPattern: { value: 0 }, uCrack: { value: 0 }, uTime: { value: 0 }, uFlash: { value: 0 }, uAlpha: { value: 1 },
    };
    this.mesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.42, 5),
      new THREE.ShaderMaterial({
        uniforms: this.u,
        vertexShader: `varying vec3 vObj; varying vec3 vNormalV; varying vec3 vViewDir;
          void main(){ vObj = position; vNormalV = normalMatrix * normal; vec4 mv = modelViewMatrix * vec4(position,1.0); vViewDir = -mv.xyz; gl_Position = projectionMatrix * mv; }`,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
        side: THREE.FrontSide,
      }),
    );
    this.mesh.visible = false;
    this.mesh.renderOrder = 3;
  }

  begin(shell: BossDef['shell']): void {
    const s = SHELLS[shell];
    (this.u.uA.value as THREE.Color).set(s.a);
    (this.u.uB.value as THREE.Color).set(s.b);
    (this.u.uCrackColor.value as THREE.Color).set(s.crack);
    this.u.uPattern.value = s.pattern;
    this.u.uAlpha.value = s.alpha;
    this.color.set(s.a);
    this.crackColor.set(s.crack);
    this.crack = this.targetCrack = 0;
    this.active = true;
    this.scaleIn = 0;
    this.mesh.visible = true;
  }

  setDamage(fraction: number): void {
    this.targetCrack = Math.min(1, Math.max(0, fraction));
  }

  pulse(amount = 0.25): void {
    this.u.uFlash.value = Math.min(0.35, (this.u.uFlash.value as number) + amount);
  }

  end(): void {
    this.active = false;
    this.mesh.visible = false;
  }

  update(dt: number, t: number): void {
    if (!this.active) return;
    this.scaleIn = Math.min(1, this.scaleIn + dt * 2.5);
    const e = 1 + Math.pow(1 - this.scaleIn, 3) * 1.5;
    this.mesh.scale.setScalar(e);
    this.crack += (this.targetCrack - this.crack) * (1 - Math.exp(-10 * dt));
    this.u.uCrack.value = this.crack;
    this.u.uTime.value = t;
    this.u.uFlash.value = Math.max(0, (this.u.uFlash.value as number) - dt * 6);
    this.mesh.rotation.y = t * 0.15;
  }
}
