import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Bloom, BloomPass, FinalShader } from './post';

export type QualityTier = 'low' | 'medium' | 'high';

/**
 * Owns the WebGL renderer, scene, camera, lights and post-processing chain.
 * Quality tiers trade resolution, bloom and shadows for frame rate.
 */
export class Stage {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera: THREE.PerspectiveCamera;
  readonly key: THREE.DirectionalLight;
  readonly rim: THREE.DirectionalLight;
  readonly hemi: THREE.HemisphereLight;
  readonly final: ShaderPass;
  readonly bloom = new Bloom();
  private composer: EffectComposer;
  tier: QualityTier = 'medium';
  width = 1;
  height = 1;
  /** Horizontal shift of the projection centre (px), to keep the star clear of side panels. */
  viewShift = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.NeutralToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.scene.fog = new THREE.Fog(0x8a4a4a, 60, 260);

    this.camera = new THREE.PerspectiveCamera(36, 1, 0.1, 400);
    this.camera.position.set(0, 1.6, 7.2);

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environmentIntensity = 0.32;
    pmrem.dispose();

    this.hemi = new THREE.HemisphereLight(0xfff2dd, 0x40305a, 0.7);
    this.key = new THREE.DirectionalLight(0xfff4e0, 2.1);
    this.key.position.set(-3.5, 6, 5);
    // One shadow-casting key light, its frustum fitted to the arena and the
    // nearby props (distant scenery relies on baked AO instead).
    this.key.castShadow = true;
    this.key.shadow.mapSize.set(2048, 2048);
    const sc = this.key.shadow.camera;
    sc.left = -11;
    sc.right = 11;
    sc.top = 11;
    sc.bottom = -11;
    sc.near = 2;
    sc.far = 60;
    this.key.shadow.bias = -0.0006;
    this.key.shadow.normalBias = 0.025;
    this.key.shadow.radius = 3;
    this.key.target.position.set(0, 0, -2);
    this.scene.add(this.key.target);
    this.rim = new THREE.DirectionalLight(0xff9a3c, 1.5);
    this.rim.position.set(4, 2.5, -6);
    const fill = new THREE.DirectionalLight(0xbfd6ff, 0.5);
    fill.position.set(3, 1, 6);
    this.scene.add(this.hemi, this.key, this.rim, fill);

    // Scene → bloom pyramid (small targets) → one full-screen final pass that
    // composites the bloom, applies the screen effects and tone maps.
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.final = new ShaderPass(FinalShader);
    this.composer.addPass(new BloomPass(this.bloom, this.final.uniforms));
    this.composer.addPass(this.final);
  }

  setTier(tier: QualityTier): void {
    const shadowsChanged = (this.tier === 'low') !== (tier === 'low');
    this.tier = tier;
    this.renderer.shadowMap.enabled = tier !== 'low';
    this.key.castShadow = tier !== 'low';
    const size = tier === 'high' ? 2048 : 1024;
    if (this.key.shadow.mapSize.x !== size) {
      this.key.shadow.mapSize.set(size, size);
      this.key.shadow.map?.dispose();
      this.key.shadow.map = null;
    }
    if (shadowsChanged) this.renderer.shadowMap.needsUpdate = true;
    this.resize(this.width, this.height);
  }

  /** Place the key light along `dir` (pointing from the scene toward the light). */
  setKeyDirection(dir: THREE.Vector3): void {
    this.key.position.copy(this.key.target.position).addScaledVector(dir, 30);
  }

  get pixelRatio(): number {
    const dpr = typeof devicePixelRatio === 'number' ? devicePixelRatio : 1;
    return this.tier === 'high' ? Math.min(dpr, 2) : this.tier === 'medium' ? Math.min(dpr, 1.5) : 1;
  }

  resize(w: number, h: number): void {
    this.width = Math.max(1, Math.floor(w));
    this.height = Math.max(1, Math.floor(h));
    const pr = this.pixelRatio;
    this.renderer.setPixelRatio(pr);
    this.renderer.setSize(this.width, this.height, false);
    this.composer.setPixelRatio(pr);
    this.composer.setSize(this.width, this.height);
    const bloomScale = this.tier === 'high' ? 0.5 : 0.35;
    this.bloom.setSize(this.width * pr * bloomScale, this.height * pr * bloomScale);
    this.camera.aspect = this.width / this.height;
    // Keep the horizontal framing constant on narrow screens (continuous, so
    // resizing never jumps): 36° vertical at 1.5:1 and wider, more as it narrows.
    const hHalf = Math.atan(Math.tan(THREE.MathUtils.degToRad(18)) * 1.5);
    const vHalf = Math.atan(Math.tan(hHalf) / Math.min(1.5, this.camera.aspect));
    this.camera.fov = Math.min(64, THREE.MathUtils.radToDeg(vHalf * 2));
    if (this.viewShift !== 0) {
      this.camera.setViewOffset(this.width, this.height, -this.viewShift, 0, this.width, this.height);
    } else {
      this.camera.clearViewOffset();
    }
    this.camera.updateProjectionMatrix();
    this.final.uniforms.uAspect.value = this.width / this.height;
  }

  render(): void {
    if (this.tier === 'low') this.renderer.render(this.scene, this.camera);
    else this.composer.render();
  }

  dispose(): void {
    this.composer.dispose();
    this.renderer.dispose();
  }
}
