import { describe, expect, it } from 'vitest';
import { WEAPONS } from '../src/content/weapons';
import { PRODUCERS } from '../src/content/producers';
import { UPGRADES } from '../src/content/upgrades';
import { NODES } from '../src/content/paranoia';
import { ACHIEVEMENTS } from '../src/content/achievements';
import { ERAS, FINAL_BOSS } from '../src/content/eras';
import {
  computeModifiers,
  maxAffordable,
  paranoiaGain,
  paranoiaTotalFor,
  producerCost,
  baseGps,
  clickBase,
} from '../src/sim/economy';
import { baseModifiers } from '../src/sim/modifiers';
import { createInitialState } from '../src/sim/state';
import { fmt, fmtTime, setNotation } from '../src/core/format';

const finitePositive = (n: number): boolean => Number.isFinite(n) && n > 0;

describe('content tables', () => {
  it('every weapon has a finite, increasing price and damage (the old ladder broke at tier 13)', () => {
    expect(WEAPONS).toHaveLength(40);
    for (let i = 0; i < WEAPONS.length; i++) {
      expect(finitePositive(WEAPONS[i].cost)).toBe(true);
      expect(finitePositive(WEAPONS[i].damage)).toBe(true);
      if (i > 0) {
        expect(WEAPONS[i].cost).toBeGreaterThan(WEAPONS[i - 1].cost);
        expect(WEAPONS[i].damage).toBeGreaterThan(WEAPONS[i - 1].damage);
        expect(WEAPONS[i].era).toBeGreaterThanOrEqual(WEAPONS[i - 1].era);
      }
    }
  });

  it('keeps the original 40 weapon names in order', () => {
    expect(WEAPONS[0].name).toBe('Bare Fists');
    expect(WEAPONS[12].name).toBe('Gatling Gun');
    expect(WEAPONS[39].name).toBe('Galaxy Destroyer');
  });

  it('has unique ids across upgrades, nodes and achievements', () => {
    for (const list of [UPGRADES, NODES, ACHIEVEMENTS, PRODUCERS]) {
      const ids = list.map((x) => x.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it('prices every upgrade with a finite positive cost', () => {
    for (const u of UPGRADES) expect(finitePositive(u.cost), u.id).toBe(true);
  });

  it('era thresholds and boss HP increase monotonically', () => {
    for (let i = 1; i < ERAS.length; i++) {
      expect(ERAS[i].threshold).toBeGreaterThan(ERAS[i - 1].threshold);
      if (i > 1) expect(ERAS[i].boss!.hp).toBeGreaterThan(ERAS[i - 1].boss!.hp);
    }
    expect(FINAL_BOSS.threshold).toBeGreaterThan(ERAS[ERAS.length - 1].threshold);
  });
});

describe('modifiers', () => {
  it('stay finite with every upgrade, node and achievement owned', () => {
    const s = createInitialState(1);
    for (const u of UPGRADES) s.upgrades[u.id] = true;
    for (const n of NODES) s.nodes[n.id] = true;
    for (const a of ACHIEVEMENTS) s.achievements[a.id] = true;
    for (const p of PRODUCERS) s.producers[p.id] = 1000;
    s.weapon = 39;
    s.paranoia = 1e6;
    const m = computeModifiers(s);
    for (const [k, v] of Object.entries(m)) {
      if (typeof v === 'number') expect(Number.isFinite(v), k).toBe(true);
    }
    m.producerMult.forEach((v) => expect(Number.isFinite(v)).toBe(true));
    const g = baseGps(s, m);
    expect(Number.isFinite(g)).toBe(true);
    expect(Number.isFinite(clickBase(s, m, g))).toBe(true);
  });
});

describe('producer pricing', () => {
  const m = baseModifiers();

  it('bulk price equals the sum of single purchases', () => {
    for (const p of PRODUCERS) {
      let sum = 0;
      for (let k = 0; k < 25; k++) sum += producerCost(p, 10 + k, m, 1);
      const bulk = producerCost(p, 10, m, 25);
      expect(Math.abs(bulk - sum) / sum).toBeLessThan(1e-6);
    }
  });

  it('maxAffordable buys exactly as many as the bank allows', () => {
    const p = PRODUCERS[3];
    for (const bank of [0, 1, p.baseCost - 1, p.baseCost, 1e6, 1e12, 1e30]) {
      for (const owned of [0, 7, 120]) {
        const n = maxAffordable(p, owned, m, bank);
        if (n > 0) expect(producerCost(p, owned, m, n)).toBeLessThanOrEqual(bank);
        expect(producerCost(p, owned, m, n + 1)).toBeGreaterThan(bank);
      }
    }
  });

  it('never returns NaN or Infinity for extreme counts', () => {
    for (const p of PRODUCERS) {
      const c = producerCost(p, 5000, m, 1);
      expect(Number.isFinite(c)).toBe(true);
      expect(Number.isNaN(maxAffordable(p, 5000, m, 1e300))).toBe(false);
    }
  });
});

describe('prestige math', () => {
  it('Paranoia total is monotonic and the gain is never negative', () => {
    let prev = 0;
    for (let e = 0; e <= 60; e++) {
      const p = paranoiaTotalFor(Math.pow(10, e));
      expect(p).toBeGreaterThanOrEqual(prev);
      prev = p;
    }
    const s = createInitialState(1);
    s.lifetimeGasps = 1e12;
    s.paranoiaEarned = 1e9;
    expect(paranoiaGain(s)).toBe(0);
    expect(paranoiaTotalFor(NaN)).toBe(0);
  });
});

describe('number formatting', () => {
  it('formats the full range without garbage', () => {
    setNotation('suffix');
    expect(fmt(0)).toBe('0');
    expect(fmt(999)).toBe('999');
    expect(fmt(1000)).toBe('1K');
    expect(fmt(1234)).toBe('1.23K');
    expect(fmt(45.6e6)).toBe('45.6M');
    expect(fmt(1e300)).toMatch(/e300$/);
    expect(fmt(Infinity)).toBe('∞');
    expect(fmt(NaN)).toBe('0');
    setNotation('scientific');
    expect(fmt(1.5e9)).toBe('1.50e9');
    setNotation('suffix');
    expect(fmtTime(3725)).toBe('1h 2m');
  });
});
