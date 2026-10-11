import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { FinalShader } from './post';

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
  readonly bloom: UnrealBloomPass;
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

    this.camera = new THREE.PerspectiveCamera(36, 1, 0.1, 400);
    this.camera.position.set(0, 1.6, 7.2);

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environmentIntensity = 0.32;
    pmrem.dispose();

    this.hemi = new THREE.HemisphereLight(0xfff2dd, 0x40305a, 0.7);
    this.key = new THREE.DirectionalLight(0xfff4e0, 2.1);
    this.key.position.set(-3.5, 6, 5);
    this.key.castShadow = true;
    this.key.shadow.mapSize.set(1024, 1024);
    this.key.shadow.camera.left = -4;
    this.key.shadow.camera.right = 4;
    this.key.shadow.camera.top = 4;
    this.key.shadow.camera.bottom = -4;
    this.key.shadow.camera.near = 1;
    this.key.shadow.camera.far = 20;
    this.key.shadow.bias = -0.0005;
    this.key.shadow.radius = 4;
    this.rim = new THREE.DirectionalLight(0xff9a3c, 1.5);
    this.rim.position.set(4, 2.5, -6);
    const fill = new THREE.DirectionalLight(0xbfd6ff, 0.5);
    fill.position.set(3, 1, 6);
    this.scene.add(this.hemi, this.key, this.rim, fill);

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.7, 0.5, 2.4);
    this.composer.addPass(this.bloom);
    this.final = new ShaderPass(FinalShader);
    this.composer.addPass(this.final);
    this.composer.addPass(new OutputPass());
  }

  setTier(tier: QualityTier): void {
    this.tier = tier;
    this.renderer.shadowMap.enabled = tier !== 'low';
    this.key.castShadow = tier !== 'low';
    this.resize(this.width, this.height);
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
    this.bloom.resolution.set(this.width * pr * bloomScale, this.height * pr * bloomScale);
    this.camera.aspect = this.width / this.height;
    // Pull back on tall (portrait) screens so the star still fits.
    this.camera.fov = this.camera.aspect < 0.8 ? 50 : this.camera.aspect < 1.2 ? 42 : 36;
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
