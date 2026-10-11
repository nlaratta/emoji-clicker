import freakmojiUrl from '../../assets/freakmoji.png';
import { Floaters } from './floaters';
import type { Game } from '../sim/game';
import type { GameEvent } from '../sim/events';
import type { PickResult } from './scene';
import type { MotionPrefs } from './fx';
import { fmt } from '../core/format';

/**
 * No-WebGL fallback: the original PNG Freakmoji as a DOM element with CSS
 * squash-and-stretch. Fully playable; just without the 3D world.
 */
export class FallbackScene {
  readonly floaters: Floaters;
  private face: HTMLImageElement;
  private golden: HTMLImageElement;
  private host: HTMLElement;
  private squash = 0;
  private goldenAge = 0;
  private goldenSeed = 0;
  private w = 1;
  private h = 1;
  private shellRing: HTMLDivElement;

  constructor(host: HTMLElement, overlay: HTMLCanvasElement) {
    this.host = host;
    this.floaters = new Floaters(overlay);
    this.face = document.createElement('img');
    this.face.src = freakmojiUrl;
    this.face.alt = '';
    Object.assign(this.face.style, {
      position: 'absolute', left: '50%', top: '50%', width: 'min(52vmin, 420px)', transform: 'translate(-50%, -55%)',
      pointerEvents: 'none', filter: 'drop-shadow(0 18px 24px rgba(0,0,0,.45))',
    });
    this.golden = this.face.cloneNode() as HTMLImageElement;
    Object.assign(this.golden.style, { width: '90px', filter: 'sepia(1) saturate(4) hue-rotate(-10deg) brightness(1.2)', display: 'none' });
    this.shellRing = document.createElement('div');
    Object.assign(this.shellRing.style, {
      position: 'absolute', left: '50%', top: '50%', width: 'min(62vmin, 500px)', aspectRatio: '1', borderRadius: '50%',
      transform: 'translate(-50%, -55%)', border: '10px solid rgba(220,220,255,.7)', display: 'none', pointerEvents: 'none',
    });
    host.style.background = 'radial-gradient(80% 70% at 50% 45%, #3a2860, #140d1f)';
    host.prepend(this.face, this.golden, this.shellRing);
  }

  get tier(): string {
    return 'low';
  }

  setQuality(): void {}
  setPrefs(_p: MotionPrefs): void {}

  resize(w: number, h: number): void {
    this.w = w;
    this.h = h;
    this.floaters.resize(w, h);
  }

  pointerMove(): void {}

  pick(clientX: number, clientY: number): PickResult {
    const r = this.host.getBoundingClientRect();
    const x = clientX - r.left;
    const y = clientY - r.top;
    if (this.golden.style.display !== 'none') {
      const g = this.golden.getBoundingClientRect();
      if (clientX >= g.left && clientX <= g.right && clientY >= g.top && clientY <= g.bottom) return { kind: 'golden' };
    }
    const f = this.face.getBoundingClientRect();
    const cx = f.left + f.width / 2 - r.left;
    const cy = f.top + f.height / 2 - r.top;
    const rad = f.width * 0.42;
    const dx = (x - cx) / rad;
    const dy = (y - cy) / rad;
    if (dx * dx + dy * dy > 1.2) return null;
    const z = Math.sqrt(Math.max(0, 1 - dx * dx - dy * dy));
    return { kind: 'freakmoji', dir: [dx, -dy, z], region: 'face' };
  }

  handle(events: GameEvent[], _game: Game): void {
    for (const e of events) {
      if (e.type === 'poke' || e.type === 'haymaker') {
        this.squash = Math.min(1, this.squash + (e.type === 'haymaker' ? 1 : 0.35));
        const label = `+${fmt(e.value)}`;
        this.floaters.spawn(label, this.w / 2, this.h * 0.4, { size: e.type === 'poke' && e.crit ? 38 : 24, color: e.type === 'poke' && e.crit ? '#ffd23f' : '#fff6d6' });
      } else if (e.type === 'goldenSpawn') {
        this.goldenSeed = e.seed;
        this.goldenAge = 0;
        this.golden.style.display = 'block';
      } else if (e.type === 'goldenCaught' || e.type === 'goldenMissed') {
        this.golden.style.display = 'none';
      } else if (e.type === 'bossStart') {
        this.shellRing.style.display = 'block';
      } else if (e.type === 'bossWin' || e.type === 'bossFail' || e.type === 'collapse') {
        this.shellRing.style.display = 'none';
      }
    }
  }

  frame(dt: number, game: Game): void {
    this.squash = Math.max(0, this.squash - dt * 4);
    const q = Math.sin(this.squash * Math.PI) * 0.12;
    this.face.style.transform = `translate(-50%, -55%) scale(${1 + q}, ${1 - q})`;
    if (game.state.boss) {
      const frac = Math.max(0, game.state.boss.hp / game.state.boss.maxHp);
      this.shellRing.style.opacity = String(0.3 + frac * 0.7);
    }
    if (this.golden.style.display !== 'none') {
      this.goldenAge += dt;
      const k = this.goldenAge;
      const ph = (this.goldenSeed % 628) / 100;
      this.golden.style.left = `${50 + Math.sin(k * 0.8 + ph) * 34}%`;
      this.golden.style.top = `${40 + Math.sin(k * 1.1 + ph) * 22}%`;
      this.golden.style.transform = 'translate(-50%, -50%)';
    }
    this.floaters.update(dt);
  }
}
