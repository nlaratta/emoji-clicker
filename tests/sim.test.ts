import { describe, expect, it } from 'vitest';
import { Game, MAX_MANUAL_CPS } from '../src/sim/game';
import { createInitialState, type GameState } from '../src/sim/state';
import { ERAS, FINAL_BOSS } from '../src/content/eras';
import { WEAPONS } from '../src/content/weapons';
import { PRODUCERS } from '../src/content/producers';
import { CHARGE_FULL, PERFECT_FROM } from '../src/content/abilities';
import { Bot, PLAYSTYLES } from '../src/sim/bot';

const fresh = (seed = 7): Game => new Game(createInitialState(seed, 0));

function allFinite(v: unknown, path = 'state'): string[] {
  if (typeof v === 'number') return Number.isFinite(v) ? [] : [path];
  if (v && typeof v === 'object') {
    return Object.entries(v).flatMap(([k, x]) => allFinite(x, `${path}.${k}`));
  }
  return [];
}

describe('poking', () => {
  it('earns gasps and tracks clicks', () => {
    const g = fresh();
    const v = g.poke();
    expect(v).toBeGreaterThan(0);
    expect(g.state.gasps).toBe(v);
    expect(g.state.stats.clicks).toBe(1);
  });

  it('rate-limits manual pokes but not Flurry auto-pokes', () => {
    const g = fresh();
    let accepted = 0;
    for (let i = 0; i < 100; i++) if (g.poke() > 0) accepted++;
    expect(accepted).toBe(MAX_MANUAL_CPS);
    expect(g.poke({ source: 'auto' })).toBeGreaterThan(0);
    g.update(1.01);
    expect(g.poke()).toBeGreaterThan(0);
  });

  it('builds a combo within the window and drops it after', () => {
    const g = fresh();
    for (let i = 0; i < 10; i++) {
      g.poke();
      g.update(0.1);
    }
    expect(g.liveStreak).toBe(10);
    g.update(2);
    expect(g.liveStreak).toBe(0);
  });

  it('a weak-spot hit is a guaranteed boosted crit', () => {
    const g = fresh();
    g.state.upgrades.w_anatomy = true;
    g.refresh();
    g.state.weakSpot = { yaw: 0.2, pitch: 0.1, end: 100 };
    const dir: [number, number, number] = [Math.sin(0.2) * Math.cos(0.1), Math.sin(0.1), Math.cos(0.2) * Math.cos(0.1)];
    g.poke({ dir });
    const ev = g.drainEvents().find((e) => e.type === 'poke');
    expect(ev && ev.type === 'poke' && ev.weak && ev.crit).toBe(true);
    expect(g.state.weakSpot).toBeNull();
  });

  it('fills the Freak-O-Meter into a timed Freak Out', () => {
    const g = fresh();
    for (let i = 0; i < 400 && g.state.freakOutEnd === 0; i++) {
      g.poke();
      g.update(0.05);
    }
    expect(g.state.freakOutEnd).toBeGreaterThan(g.state.time);
    g.update(30);
    expect(g.state.freakOutEnd).toBe(0);
  });
});

describe('shopping', () => {
  it('buys weapons in order and only once their era is reached', () => {
    const g = fresh();
    g.state.gasps = 1e30;
    let bought = 0;
    while (g.buyWeapon()) bought++;
    expect(bought).toBe(WEAPONS.filter((w) => w.era === 0).length);
    g.state.era = ERAS.length - 1;
    while (g.buyWeapon()) bought++;
    expect(g.state.weapon).toBe(WEAPONS.length - 1);
  });

  it('charges the exact price and refuses when broke', () => {
    const g = fresh();
    g.state.gasps = 15;
    expect(g.buyProducer('monkey')).toBe(1);
    expect(g.state.gasps).toBe(0);
    expect(g.buyProducer('monkey')).toBe(0);
    expect(g.buyProducer('trebuchet')).toBe(0); // later era
  });

  it('max-buys as many units as affordable', () => {
    const g = fresh();
    g.state.gasps = 1e5;
    const n = g.buyProducer('monkey', 'max');
    expect(n).toBeGreaterThan(10);
    expect(g.state.gasps).toBeGreaterThanOrEqual(0);
    expect(g.producerPrice('monkey', 1)).toBeGreaterThan(g.state.gasps);
  });

  it('upgrades apply immediately', () => {
    const g = fresh();
    g.state.producers.monkey = 1;
    g.refresh();
    const before = g.gpsBase;
    g.state.gasps = 1e6;
    expect(g.buyUpgrade('m_monkey_0')).toBe(true);
    expect(g.gpsBase).toBeCloseTo(before * 2);
    expect(g.buyUpgrade('m_monkey_0')).toBe(false);
  });
});

describe('time', () => {
  it('one long update equals many short ones for steady production', () => {
    const a = fresh(3);
    const b = fresh(3);
    for (const g of [a, b]) {
      g.state.producers.monkey = 40;
      g.state.producers.gorilla = 12;
      g.refresh();
    }
    a.update(600);
    for (let i = 0; i < 12000; i++) b.update(0.05);
    // Achievements (+1% each) are checked once per simulated second, so the
    // two runs may unlock them a few ticks apart; allow that tiny drift.
    expect(Math.abs(a.state.gasps - b.state.gasps) / b.state.gasps).toBeLessThan(1e-3);
    expect(a.state.achievements).toEqual(b.state.achievements);
  });

  it('is deterministic for the same seed and inputs', () => {
    const run = (): GameState => {
      const g = fresh(99);
      for (let i = 0; i < 2000; i++) {
        g.poke({ dir: [0, 0, 1] });
        if (i % 50 === 0) g.buyProducer('monkey', 'max');
        if (g.state.golden) g.catchGolden();
        g.update(0.1);
      }
      return g.state;
    };
    expect(JSON.stringify(run())).toBe(JSON.stringify(run()));
  });
});

describe('bosses and eras', () => {
  it('opens the gate at the threshold, wins by out-earning the HP, and advances the era', () => {
    const g = fresh();
    expect(g.gateBoss()).toBeNull();
    g.state.runGasps = ERAS[1].threshold;
    expect(g.gateBoss()?.name).toBe(ERAS[1].boss!.name);
    expect(g.startBoss()).toBe(true);
    g.state.producers.monkey = 1;
    g.state.producers.gorilla = 2000; // overwhelming production
    g.refresh();
    g.update(5);
    expect(g.state.boss).toBeNull();
    expect(g.state.era).toBe(1);
    expect(g.drainEvents().some((e) => e.type === 'eraChange')).toBe(true);
  });

  it('fails on timeout and enforces a retry delay', () => {
    const g = fresh();
    g.state.runGasps = ERAS[1].threshold;
    g.startBoss();
    g.update(ERAS[1].boss!.duration + 0.1);
    expect(g.state.boss).toBeNull();
    expect(g.state.era).toBe(0);
    expect(g.gateBoss()).toBeNull();
    g.update(20);
    expect(g.gateBoss()).not.toBeNull();
  });
});

describe('the final boss', () => {
  it('breaks reality: victory is recorded and the timeline can keep going', () => {
    const g = fresh();
    g.state.era = ERAS.length - 1;
    g.state.runGasps = g.state.lifetimeGasps = FINAL_BOSS.threshold;
    g.refresh();
    const gate = g.gateBoss();
    expect(gate?.final).toBe(true);
    expect(g.nextGateThreshold()).toBe(FINAL_BOSS.threshold);
    g.startBoss();
    g.state.producers.paradox = 1e10; // ~3e19 gasps per second: overwhelming
    g.refresh();
    g.update(2);
    expect(g.state.victory).toBe(true);
    expect(g.state.era).toBe(ERAS.length - 1);
    expect(g.state.stats.victories).toBe(1);
    expect(g.state.achievements.victory).toBe(true);
    expect(g.gateBoss()).toBeNull();
    expect(g.nextGateThreshold()).toBeNull();
    expect(g.canCollapse()).toBe(true);
  });
});

describe('abilities', () => {
  it('Haymaker rewards a release inside the perfect window', () => {
    const g = fresh();
    g.state.era = 1;
    g.refresh();
    expect(g.activate('haymaker')).toBe(true);
    const okay = g.releaseCharge(1.2);
    g.state.abilityCooldowns = {};
    g.activate('haymaker');
    const perfect = g.releaseCharge((PERFECT_FROM + CHARGE_FULL) / 2);
    expect(perfect).toBeGreaterThan(okay * 3);
    expect(g.state.stats.perfectHaymakers).toBe(1);
    expect(g.activate('haymaker')).toBe(false); // on cooldown
  });

  it('locks abilities until their era and enforces cooldowns', () => {
    const g = fresh();
    expect(g.activate('rally')).toBe(false);
    g.state.era = 2;
    g.state.producers.monkey = 10;
    g.refresh();
    const base = g.gps;
    expect(g.activate('rally')).toBe(true);
    expect(g.gps).toBeGreaterThan(base * 3);
    expect(g.activate('rally')).toBe(false);
    g.update(200);
    expect(g.gps).toBeCloseTo(g.gpsBase); // buff expired (achievements may have nudged the base)
    expect(g.gpsBase).toBeLessThan(base * 1.1);
    expect(g.abilityReady('rally')).toBe(true);
  });
});

describe('golden Freakmoji', () => {
  it('spawns, can be caught once, and expires if ignored', () => {
    const g = fresh();
    g.update(g.state.nextGoldenAt + 0.01);
    expect(g.state.golden).not.toBeNull();
    expect(g.catchGolden()).not.toBeNull();
    expect(g.catchGolden()).toBeNull();
    g.update(g.state.nextGoldenAt - g.state.time + 0.01);
    expect(g.state.golden).not.toBeNull();
    g.update(60);
    expect(g.drainEvents().some((e) => e.type === 'goldenMissed')).toBe(true);
  });
});

describe('prestige', () => {
  it('requires Era IV, grants Paranoia, resets the run and keeps meta progress', () => {
    const g = fresh();
    g.state.lifetimeGasps = g.state.runGasps = 1e12;
    expect(g.canCollapse()).toBe(false);
    g.state.era = 3;
    g.state.achievements.clk0 = true;
    g.state.producers.monkey = 50;
    expect(g.canCollapse()).toBe(true);
    const gained = g.collapse(false, 0);
    expect(gained).toBeGreaterThan(0);
    expect(g.state.paranoia).toBe(gained);
    expect(g.state.era).toBe(0);
    expect(g.state.producers.monkey).toBe(0);
    expect(g.state.gasps).toBe(0);
    expect(g.state.achievements.clk0).toBe(true);
    expect(g.state.timelines).toBe(1);
    expect(g.canCollapse()).toBe(false); // no double-dipping
  });

  it('applies node effects to the next timeline and refunds on respec', () => {
    const g = fresh();
    g.state.paranoia = 100;
    expect(g.buyNode('t_trigger')).toBe(false); // needs the root
    expect(g.buyNode('dejavu')).toBe(true);
    expect(g.buyNode('u_charm')).toBe(true);
    expect(g.buyNode('u_fuse')).toBe(true);
    expect(g.buyNode('u_bleed')).toBe(true);
    g.state.lifetimeGasps = g.state.runGasps = 1e13;
    g.state.era = 3;
    const spent = 1 + 2 + 5 + 15;
    const before = g.state.paranoia;
    const gained = g.collapse(true, 0);
    expect(g.state.paranoia).toBe(before + gained + spent);
    expect(Object.keys(g.state.nodes)).toHaveLength(0);
  });

  it('starts the next timeline with the Déjà Vu kit and the Timeline Bleed era', () => {
    const g = fresh();
    g.state.paranoia = 100;
    ['dejavu', 'u_charm', 'u_fuse', 'u_bleed'].forEach((id) => g.buyNode(id));
    g.state.lifetimeGasps = g.state.runGasps = 1e13;
    g.state.era = 3;
    g.collapse(false, 0);
    expect(g.state.era).toBe(1);
    expect(g.state.weapon).toBe(0);
    expect(g.state.producers.monkey).toBe(10);
  });
});

describe('gaps (hidden tabs, sleep)', () => {
  it('simulates short gaps exactly and pays long gaps under offline rules', () => {
    const a = fresh(4);
    a.state.producers.gorilla = 100;
    a.refresh();
    const rate = a.gpsBase;
    expect(a.elapse(30)).toBeNull();
    // Full rate (achievements unlocked mid-gap may add a percent or two).
    expect(a.state.gasps / (rate * 30)).toBeGreaterThan(0.99);
    expect(a.state.gasps / (rate * 30)).toBeLessThan(1.05);

    const b = fresh(4);
    b.state.producers.gorilla = 100;
    b.refresh();
    const report = b.elapse(10 * 3600)!;
    expect(report).not.toBeNull();
    expect(report.credited).toBe(b.mods.offlineCap);
    expect(b.state.gasps).toBeLessThanOrEqual(b.gpsBase * b.mods.offlineCap * b.mods.offlineEff * 1.0001);
  });

  it('a long gap during a boss fight abandons it instead of winning it', () => {
    const g = fresh();
    g.state.runGasps = ERAS[1].threshold;
    g.startBoss();
    g.state.producers.gorilla = 5000;
    g.refresh();
    g.elapse(3600);
    expect(g.state.boss).toBeNull();
    expect(g.state.era).toBe(0);
  });

  it('abandonBoss ends the fight without advancing the era', () => {
    const g = fresh();
    g.state.runGasps = ERAS[1].threshold;
    g.startBoss();
    expect(g.abandonBoss()).toBe(true);
    expect(g.state.boss).toBeNull();
    expect(g.state.era).toBe(0);
    expect(g.drainEvents().some((e) => e.type === 'bossFail')).toBe(true);
    expect(g.abandonBoss()).toBe(false);
  });
});

describe('long-horizon simulation', () => {
  for (const key of ['casual', 'idle', 'prestige'] as const) {
    it(`stays finite and progresses for 3 simulated hours (${key})`, () => {
      const bot = new Bot(PLAYSTYLES[key]);
      bot.run(3 * 3600, 0.5);
      expect(allFinite(bot.game.state)).toEqual([]);
      expect(bot.game.state.lifetimeGasps).toBeGreaterThan(1e8);
      const owned = PRODUCERS.reduce((a, p) => a + bot.game.state.producers[p.id], 0);
      expect(owned).toBeGreaterThan(50);
    }, 60_000);
  }
});
