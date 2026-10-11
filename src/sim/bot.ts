import { PRODUCERS } from '../content/producers';
import { UPGRADES } from '../content/upgrades';
import { NODES } from '../content/paranoia';
import { ABILITIES, PERFECT_FROM } from '../content/abilities';
import { nextRandom } from '../core/rng';
import { baseGps, clickBase, computeModifiers, nodeAvailable, producerCost, weaponCost } from './economy';
import { Game } from './game';
import { createInitialState, type GameState } from './state';

/**
 * A headless player used by the balance report and the long-horizon tests.
 * It plays through the real Game API: pokes, buys, abilities, bosses and
 * prestige, so it exercises exactly the code the browser runs.
 */
export interface Playstyle {
  name: string;
  /** Pokes per second while actively playing. */
  cps: number;
  /** Seconds of active play, then seconds away, repeating. */
  activeFor: number;
  awayFor: number;
  /** Chance per poke of aiming at a visible weak spot. */
  aim: number;
  /** Chance to catch a Golden Freakmoji while present (active / away). */
  goldenCatch: number;
  useAbilities: boolean;
  /** Chance a Haymaker lands PERFECT. */
  perfectRate: number;
  /** Collapse when the pending gain is at least this × Paranoia earned so far (0 = never). */
  prestigeRatio: number;
  /** Seconds between shopping trips while active. */
  shopEvery: number;
  /** Spend Paranoia on which branch first. */
  branch: 'twitchy' | 'brooding' | 'unhinged';
}

export const PLAYSTYLES: Record<string, Playstyle> = {
  casual: {
    name: 'Casual active', cps: 4, activeFor: 90, awayFor: 90, aim: 0.06, goldenCatch: 0.6,
    useAbilities: true, perfectRate: 0.3, prestigeRatio: 0, shopEvery: 15, branch: 'twitchy',
  },
  intense: {
    name: 'Intensive active', cps: 8, activeFor: 1e9, awayFor: 0, aim: 0.18, goldenCatch: 0.9,
    useAbilities: true, perfectRate: 0.6, prestigeRatio: 0, shopEvery: 5, branch: 'twitchy',
  },
  idle: {
    name: 'Mostly idle', cps: 3, activeFor: 20, awayFor: 400, aim: 0, goldenCatch: 0.3,
    useAbilities: true, perfectRate: 0.2, prestigeRatio: 0, shopEvery: 10, branch: 'brooding',
  },
  prestige: {
    name: 'Prestige-focused', cps: 7, activeFor: 1e9, awayFor: 0, aim: 0.15, goldenCatch: 0.85,
    useAbilities: true, perfectRate: 0.5, prestigeRatio: 1.5, shopEvery: 5, branch: 'unhinged',
  },
};

interface Candidate {
  kind: 'weapon' | 'producer' | 'upgrade';
  id: string;
  cost: number;
  gain: number;
}

export class Bot {
  game: Game;
  style: Playstyle;
  private rng = { rng: 12345 };
  private pokeCarry = 0;
  private nextShop = 0;
  private charging = false;
  log: string[] = [];
  eraTimes: number[] = [0];
  bossFails = 0;
  collapses = 0;
  victoryAt = -1;
  /** Total simulated seconds across all timelines. */
  clock = 0;

  constructor(style: Playstyle, state: GameState = createInitialState(42, 0)) {
    this.style = style;
    this.game = new Game(state);
  }

  private chance(p: number): boolean {
    return nextRandom(this.rng) < p;
  }

  isActive(): boolean {
    const cycle = this.style.activeFor + this.style.awayFor;
    return this.clock % cycle < this.style.activeFor;
  }

  /** Effective income estimate used to value purchases. */
  private income(s: GameState): number {
    const m = computeModifiers(s);
    const g = baseGps(s, m);
    const activeShare = this.style.activeFor / (this.style.activeFor + this.style.awayFor);
    return g + clickBase(s, m, g) * this.style.cps * activeShare * 1.8;
  }

  private candidates(): Candidate[] {
    const g = this.game;
    const s = g.state;
    const now = this.income(s);
    const out: Candidate[] = [];
    const w = g.nextWeapon();
    if (w >= 0 && g.weaponUnlocked(w)) {
      const trial = { ...s, weapon: w };
      out.push({ kind: 'weapon', id: String(w), cost: weaponCost(w, g.mods), gain: this.income(trial) - now });
    }
    for (const p of PRODUCERS) {
      if (!g.producerUnlocked(p.id)) continue;
      const trial = { ...s, producers: { ...s.producers, [p.id]: (s.producers[p.id] ?? 0) + 1 } };
      out.push({ kind: 'producer', id: p.id, cost: producerCost(p, s.producers[p.id] ?? 0, g.mods), gain: this.income(trial) - now });
    }
    for (const u of UPGRADES) {
      if (s.upgrades[u.id] || !u.req(s)) continue;
      const trial = { ...s, upgrades: { ...s.upgrades, [u.id]: true as const } };
      let gain = this.income(trial) - now;
      // Utility upgrades don't change income directly; give them a nominal value.
      if (gain <= 0) gain = now * 0.02;
      out.push({ kind: 'upgrade', id: u.id, cost: u.cost, gain });
    }
    return out;
  }

  private shop(): void {
    const g = this.game;
    for (let guard = 0; guard < 400; guard++) {
      const income = Math.max(this.income(g.state), 1e-9);
      const bank = g.state.gasps;
      let best: Candidate | null = null;
      let bestScore = Infinity;
      for (const c of this.candidates()) {
        if (c.gain <= 0) continue;
        const score = c.cost / c.gain + Math.max(0, c.cost - bank) / income;
        if (score < bestScore) {
          bestScore = score;
          best = c;
        }
      }
      if (!best || best.cost > bank) return;
      if (best.kind === 'weapon') g.buyWeapon();
      else if (best.kind === 'producer') g.buyProducer(best.id, 1);
      else g.buyUpgrade(best.id);
    }
  }

  private spendParanoia(): void {
    const g = this.game;
    const order = ['dejavu', ...NODES.filter((n) => n.branch === this.style.branch).map((n) => n.id),
      ...NODES.filter((n) => n.branch !== this.style.branch && n.branch !== 'root').sort((a, b) => a.cost - b.cost).map((n) => n.id)];
    for (const id of order) {
      const n = NODES.find((x) => x.id === id)!;
      // Keep a reserve: unspent Paranoia is itself a multiplier.
      if (nodeAvailable(g.state, id) && g.state.paranoia >= n.cost * 2) g.buyNode(id);
    }
  }

  private useAbilities(): void {
    const g = this.game;
    for (const a of ABILITIES) {
      if (a.id === 'haymaker') continue;
      if (g.abilityReady(a.id)) g.activate(a.id);
    }
    if (g.abilityReady('haymaker') && !this.charging) {
      this.charging = g.startCharge();
    }
  }

  /** Simulate `seconds` of play in steps of `dt`. */
  run(seconds: number, dt = 0.25): void {
    const g = this.game;
    const st = this.style;
    const end = this.clock + seconds;
    while (this.clock < end) {
      const active = this.isActive();
      const s = g.state;
      if (active) {
        this.pokeCarry += st.cps * dt;
        while (this.pokeCarry >= 1) {
          this.pokeCarry -= 1;
          let dir: [number, number, number] | null = [0, 0, 1];
          if (s.weakSpot && this.chance(st.aim)) {
            const { yaw, pitch } = s.weakSpot;
            dir = [Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch)];
          }
          g.poke({ dir, source: 'pointer' });
        }
        if (st.useAbilities) this.useAbilities();
        if (this.charging && s.charge && s.time - s.charge.startedAt >= PERFECT_FROM) {
          const perfect = this.chance(st.perfectRate);
          g.releaseCharge(perfect ? 1.85 : 1.4);
          this.charging = false;
        }
        if (this.clock >= this.nextShop) {
          this.shop();
          this.nextShop = this.clock + st.shopEvery;
        }
        if (g.gateBoss()) g.startBoss();
      }
      if (!s.charge) this.charging = false;
      if (s.golden && this.chance((active ? st.goldenCatch : st.goldenCatch * 0.1) * dt)) g.catchGolden();

      g.update(dt);
      this.clock += dt;
      for (const e of g.drainEvents()) {
        if (e.type === 'bossFail') this.bossFails++;
        if (e.type === 'bossWin' && e.final && this.victoryAt < 0) this.victoryAt = this.clock;
      }
      if (this.collapses === 0 && this.eraTimes[g.state.era] === undefined) this.eraTimes[g.state.era] = this.clock;

      if (st.prestigeRatio > 0 && g.canCollapse()) {
        const s2 = g.state;
        const gain = Math.max(0, Math.floor(Math.cbrt(s2.lifetimeGasps / 1e8)) - s2.paranoiaEarned);
        if (gain >= Math.max(3, s2.paranoiaEarned * st.prestigeRatio)) {
          g.collapse(false, this.clock * 1000);
          this.collapses++;
          this.log.push(`t=${(this.clock / 60).toFixed(1)}m collapse #${this.collapses} +${gain} paranoia`);
          this.spendParanoia();
          this.nextShop = 0;
        }
      }
    }
  }

  /** Average value of a click relative to production, for reporting. */
  clickShare(): number {
    const g = this.game;
    const v = clickBase(g.state, g.mods, g.gpsBase) * this.style.cps;
    return g.gpsBase > 0 ? v / g.gpsBase : Infinity;
  }
}

