import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

/**
 * Art-kit loading. Every .glb in src/assets/models is discovered at build
 * time and fetched on demand (cached), so the title screen can preload the
 * current era while rendering never blocks on a download.
 */
const URLS = import.meta.glob('../assets/models/*.glb', { query: '?url', import: 'default', eager: true }) as Record<string, string>;

const byKey = new Map<string, string>();
for (const [path, url] of Object.entries(URLS)) byKey.set(path.split('/').pop()!.replace('.glb', ''), url);

let loader: GLTFLoader | null = null;
const cache = new Map<string, Promise<GLTF>>();

export function hasModel(key: string): boolean {
  return byKey.has(key);
}

export function loadModel(key: string): Promise<GLTF> {
  let p = cache.get(key);
  if (!p) {
    const url = byKey.get(key);
    if (!url) return Promise.reject(new Error(`no model ${key}`));
    if (!loader) {
      loader = new GLTFLoader();
      loader.setMeshoptDecoder(MeshoptDecoder);
    }
    p = loader.loadAsync(url);
    cache.set(key, p);
  }
  return p;
}
