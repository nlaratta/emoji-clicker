import { h } from './dom';

/**
 * Paints each heavyweight UI surface once, invisibly, while the title screen
 * is up. Chrome builds a GPU pipeline the first time it draws a new kind of
 * effect (glows, blurs, filtered icons, form controls); on a cold shader
 * cache that takes hundreds of milliseconds and freezes the whole page, the
 * 3D view included. Doing it here moves those stalls off the first era
 * change, the first visit to Settings and the first look at each shop tab.
 */
export class UiWarmup {
  private readonly host = h('div', { class: 'ui-warmup', 'aria-hidden': 'true' });
  private readonly timers: number[] = [];
  private readonly cleanups: (() => void)[] = [];

  /** Runs each step in turn, `spacing` ms apart, and tears down after `life` ms. */
  constructor(steps: ((host: HTMLElement) => void | (() => void))[], spacing = 120, life = 4500) {
    this.host.inert = true;
    document.body.append(this.host);
    steps.forEach((step, i) => {
      this.timers.push(window.setTimeout(() => {
        const cleanup = step(this.host);
        if (cleanup) this.cleanups.push(cleanup);
      }, i * spacing));
    });
    this.timers.push(window.setTimeout(() => this.dispose(), life));
  }

  /** Stop early (the game is starting) and remove everything it painted. */
  dispose(): void {
    for (const t of this.timers) clearTimeout(t);
    this.timers.length = 0;
    for (const c of this.cleanups.splice(0)) c();
    this.host.remove();
  }
}
