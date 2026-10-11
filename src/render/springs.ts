/** Damped springs drive every bit of secondary motion (squash, recoil, poses). */
export class Spring {
  x: number;
  v = 0;
  target: number;
  k: number;
  d: number;
  constructor(initial = 0, k = 160, d = 14) {
    this.x = initial;
    this.target = initial;
    this.k = k;
    this.d = d;
  }
  update(dt: number): number {
    // Sub-step for stability at low frame rates.
    const steps = Math.ceil(dt / (1 / 120));
    const h = dt / steps;
    for (let i = 0; i < steps; i++) {
      const a = -this.k * (this.x - this.target) - this.d * this.v;
      this.v += a * h;
      this.x += this.v * h;
    }
    return this.x;
  }
  kick(impulse: number): void {
    this.v += impulse;
  }
}

/** Frame-rate independent exponential approach. */
export function approach(current: number, target: number, rate: number, dt: number): number {
  return target + (current - target) * Math.exp(-rate * dt);
}
