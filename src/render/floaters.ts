/**
 * Floating numbers and callouts, drawn on a 2D canvas over the 3D view.
 * A fixed pool, no DOM nodes per number, text pre-measured once per spawn.
 */
interface Floater {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  text: string;
  size: number;
  color: string;
  stroke: string;
  pop: number;
  rot: number;
}

export interface FloatOpts {
  size?: number;
  color?: string;
  stroke?: string;
  life?: number;
  vy?: number;
  spread?: number;
}

export class Floaters {
  readonly canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private pool: Floater[] = [];
  private dpr = 1;
  private w = 1;
  private h = 1;
  enabled = true;
  font = '"Bungee", "Arial Black", system-ui, sans-serif';

  constructor(canvas: HTMLCanvasElement, capacity = 70) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    for (let i = 0; i < capacity; i++) {
      this.pool.push({ active: false, x: 0, y: 0, vx: 0, vy: 0, age: 0, life: 1, text: '', size: 20, color: '#fff', stroke: '#000', pop: 0, rot: 0 });
    }
  }

  resize(w: number, h: number): void {
    this.dpr = Math.min(2, typeof devicePixelRatio === 'number' ? devicePixelRatio : 1);
    this.w = w;
    this.h = h;
    this.canvas.width = Math.floor(w * this.dpr);
    this.canvas.height = Math.floor(h * this.dpr);
  }

  spawn(text: string, x: number, y: number, o: FloatOpts = {}): void {
    if (!this.enabled) return;
    // Reuse the oldest if the pool is exhausted.
    let f = this.pool.find((p) => !p.active);
    if (!f) f = this.pool.reduce((a, b) => (a.age / a.life > b.age / b.life ? a : b));
    const spread = o.spread ?? 90;
    Object.assign(f, {
      active: true,
      x: x + (Math.random() - 0.5) * spread,
      y: y + (Math.random() - 0.5) * spread * 0.4,
      vx: (Math.random() - 0.5) * 70,
      vy: o.vy ?? -140,
      age: 0,
      life: o.life ?? 0.95,
      text,
      size: o.size ?? 22,
      color: o.color ?? '#fff6d6',
      stroke: o.stroke ?? 'rgba(40,10,40,0.85)',
      pop: 1,
      rot: (Math.random() - 0.5) * 0.12,
    });
  }

  update(dt: number): void {
    const ctx = this.ctx;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, this.w, this.h);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round';
    for (const f of this.pool) {
      if (!f.active) continue;
      f.age += dt;
      if (f.age >= f.life) {
        f.active = false;
        continue;
      }
      f.x += f.vx * dt;
      f.y += f.vy * dt;
      f.vy += 40 * dt;
      const k = f.age / f.life;
      const popScale = k < 0.12 ? 0.6 + (k / 0.12) * 0.7 : 1.3 - Math.min(0.3, (k - 0.12) * 1.2);
      const alpha = k > 0.7 ? 1 - (k - 0.7) / 0.3 : 1;
      const size = f.size * popScale;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(f.x, f.y);
      ctx.rotate(f.rot);
      ctx.font = `${Math.round(size)}px ${this.font}`;
      ctx.lineWidth = Math.max(3, size * 0.18);
      ctx.strokeStyle = f.stroke;
      ctx.strokeText(f.text, 0, 0);
      ctx.fillStyle = f.color;
      ctx.fillText(f.text, 0, 0);
      ctx.restore();
    }
  }
}
