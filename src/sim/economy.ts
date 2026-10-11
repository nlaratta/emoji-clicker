import { safe } from '../core/math';
import { PRODUCERS, COST_GROWTH, type ProducerDef } from '../content/producers';
import { UPGRADES } from '../content/upgrades';
import { NODES, NODE_BY_ID, PARANOIA_BASE, unspentBonus } from '../content/paranoia';
import { ACHIEVEMENT_BONUS } from '../content/achievements';
import { WEAPONS, weaponDamage } from '../content/weapons';
import { baseModifiers, type Modifiers } from './modifiers';
import type { GameState } from './state';

/**
 * Pure economy math. Nothing here mutates state or touches the DOM, so every
 * formula is unit-testable and shared by the game, the UI and the balance sim.
 */

export function computeModifiers(s: GameState): Modifiers {
  const m = baseModifiers();
  for (const n of NODES) if (s.nodes[n.id]) n.apply(m);
  for (const u of UPGRADES) if (s.upgrades[u.id]) u.apply(m, s);
  m.globalMult *= 1 + ACHIEVEMENT_BONUS * Object.keys(s.achievements).length;
  m.globalMult *= 1 + unspentBonus(s.paranoia);
  return m;
}

// ── Costs ──

/** Price of a single unit when `owned` are already owned. Whole gasps only. */
function unitCost(p: ProducerDef, owned: number, m: Modifiers): number {
  return Math.ceil(p.baseCost * m.producerCostMult * Math.pow(COST_GROWTH, owned));
}

/** Total price of buying `n` more units: exactly the sum of the unit prices,
 *  so buying ×10 costs the same as ten single purchases. */
export function producerCost(p: ProducerDef, owned: number, m: Modifiers, n = 1): number {
  const r = COST_GROWTH;
  let total = 0;
  let k = 0;
  // Sum whole-number unit prices while rounding still matters...
  for (; k < n; k++) {
    const c = unitCost(p, owned + k, m);
    if (c > 1e12) break;
    total += c;
  }
  // ...then the remainder in closed form (rounding is irrelevant at that scale).
  if (k < n) {
    const first = p.baseCost * m.producerCostMult * Math.pow(r, owned + k);
    total += (first * (Math.pow(r, n - k) - 1)) / (r - 1);
  }
  return safe(total);
}

/** How many units the bank can afford right now (closed form, then verified). */
export function maxAffordable(p: ProducerDef, owned: number, m: Modifiers, bank: number): number {
  const r = COST_GROWTH;
  const first = p.baseCost * m.producerCostMult * Math.pow(r, owned);
  if (!(bank >= first)) return 0;
  let n = Math.floor(Math.log((bank * (r - 1)) / first + 1) / Math.log(r));
  // Guard against floating-point drift at the boundary.
  while (n > 0 && producerCost(p, owned, m, n) > bank) n--;
  while (producerCost(p, owned, m, n + 1) <= bank) n++;
  return Math.max(0, Math.min(n, 100_000));
}

export function weaponCost(index: number, m: Modifiers): number {
  return safe(WEAPONS[index].cost * m.weaponCostMult);
}

// ── Production ──

export function producerGps(s: GameState, m: Modifiers, i: number): number {
  const p = PRODUCERS[i];
  return safe((s.producers[p.id] ?? 0) * p.baseGps * m.producerMult[i] * m.gpsMult * m.globalMult);
}

/** Production from minions with permanent multipliers only (no temporary buffs). */
export function baseGps(s: GameState, m: Modifiers): number {
  let total = 0;
  for (let i = 0; i < PRODUCERS.length; i++) total += producerGps(s, m, i);
  return safe(total);
}

/** Base value of one poke before combo, crits and buffs. */
export function clickBase(s: GameState, m: Modifiers, gpsBase: number): number {
  return safe(weaponDamage(s.weapon) * m.clickMult * m.globalMult + gpsBase * m.clickGpsFrac);
}

export function comboMult(streak: number, m: Modifiers): number {
  return 1 + (m.comboBonus * Math.min(streak, m.comboCap)) / m.comboCap;
}

export function overthinkingMult(s: GameState, m: Modifiers): number {
  if (!m.overthinking) return 1;
  const idle = Math.max(0, s.time - s.lastManualAt);
  return 1 + Math.min(3, 0.02 * Math.floor(idle / 10));
}

export function isFreakingOut(s: GameState): boolean {
  return s.time < s.freakOutEnd;
}

/** Temporary multiplier on production from buffs and states. */
export function dynamicGpsMult(s: GameState, m: Modifiers): number {
  let x = 1;
  for (const b of s.buffs) if (b.end > s.time) x *= b.gps;
  if (isFreakingOut(s)) x *= m.freakOutGpsMult;
  return x * overthinkingMult(s, m);
}

/** Temporary multiplier on pokes from buffs and states (combo excluded). */
export function dynamicClickMult(s: GameState, m: Modifiers): number {
  let x = 1;
  for (const b of s.buffs) if (b.end > s.time) x *= b.click;
  if (isFreakingOut(s)) x *= m.freakOutClickMult;
  return x;
}

// ── Prestige ──

export function paranoiaTotalFor(lifetimeGasps: number): number {
  if (!(lifetimeGasps > 0)) return 0;
  return Math.floor(Math.cbrt(lifetimeGasps / PARANOIA_BASE));
}

export function paranoiaGain(s: GameState): number {
  return Math.max(0, paranoiaTotalFor(s.lifetimeGasps) - s.paranoiaEarned);
}

/** Lifetime gasps needed for the next point of Paranoia. */
export function nextParanoiaAt(s: GameState): number {
  const next = Math.max(paranoiaTotalFor(s.lifetimeGasps), s.paranoiaEarned) + 1;
  return Math.pow(next, 3) * PARANOIA_BASE;
}

export function nodeAvailable(s: GameState, id: string): boolean {
  const n = NODE_BY_ID[id];
  if (!n || s.nodes[id]) return false;
  return n.requires.every((r) => s.nodes[r]);
}

export function spentParanoia(s: GameState): number {
  return NODES.reduce((a, n) => a + (s.nodes[n.id] ? n.cost : 0), 0);
}
