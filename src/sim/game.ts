import { nextRandom, randomRange } from '../core/rng';
import { clamp, safe } from '../core/math';
import { ERAS, FINAL_BOSS, type BossDef } from '../content/eras';
import { PRODUCERS, PRODUCER_INDEX } from '../content/producers';
import { WEAPONS } from '../content/weapons';
import { UPGRADE_BY_ID } from '../content/upgrades';
import { NODE_BY_ID, NODES } from '../content/paranoia';
import { ACHIEVEMENTS } from '../content/achievements';
import {
  ABILITY_BY_ID,
  CHARGE_FULL,
  CHARGE_MAX,
  PERFECT_FROM,
  PERFECT_MULT,
  flurryCps,
  flurryDuration,
  haymakerMult,
  rallyDuration,
  rallyMult,
  singularityDuration,
  singularityMult,
  timeWarpMinutes,
  type AbilityId,
} from '../content/abilities';
import {
  baseGps,
  clickBase,
  comboMult,
  computeModifiers,
  dynamicClickMult,
  dynamicGpsMult,
  isFreakingOut,
  maxAffordable,
  nodeAvailable,
  paranoiaGain,
  producerCost,
  weaponCost,
} from './economy';
import type { Modifiers } from './modifiers';
import { createInitialState, type Buff, type BuffId, type GameState } from './state';
import type { GameEvent, GoldenEffect, HitRegion } from './events';

export interface PokeInput {
  /** Unit vector from the Freakmoji's centre, in its local frame (+z faces the camera). */
  dir?: readonly [number, number, number] | null;
  region?: HitRegion;
  source?: 'pointer' | 'key' | 'auto';
}

export interface OfflineReport {
  elapsed: number;
  credited: number;
  efficiency: number;
  gained: number;
}

/** Manual pokes beyond this rate are ignored (autoclicker / double-fire guard). */
export const MAX_MANUAL_CPS = 25;
const METER_PER_POKE = 0.004;
const METER_DECAY = 0.06;
const WEAK_SPOT_LIFE = 3.5;
const WEAK_SPOT_COS = Math.cos(0.36);
const GOLDEN_LIFE = 12;
const BOSS_RETRY_DELAY = 15;
const ACHIEVEMENT_INTERVAL = 1;

export class Game {
  state: GameState;
  mods!: Modifiers;
  /** Production with permanent multipliers only. */
  gpsBase = 0;
  private events: GameEvent[] = [];
  private manualTimes: number[] = [];
  private nextAchievementCheck = 0;
  private gateAnnounced = -1;

  constructor(state: GameState = createInitialState()) {
    this.state = state;
    this.refresh();
  }

  // ── Derived values ──

  refresh(): void {
    this.mods = computeModifiers(this.state);
    this.gpsBase = baseGps(this.state, this.mods);
  }

  /** Current production including temporary buffs. */
  get gps(): number {
    return safe(this.gpsBase * dynamicGpsMult(this.state, this.mods));
  }

  /** Value of a normal, non-critical poke right now, combo included. */
  get pokeValue(): number {
    const s = this.state;
    return safe(clickBase(s, this.mods, this.gpsBase) * dynamicClickMult(s, this.mods) * comboMult(this.liveStreak, this.mods));
  }

  get liveStreak(): number {
    const s = this.state;
    if (isFreakingOut(s)) return s.streak;
    return s.time - s.lastClickAt <= this.mods.comboWindow ? s.streak : 0;
  }

  drainEvents(): GameEvent[] {
    if (this.events.length === 0) return this.events;
    const out = this.events;
    this.events = [];
    return out;
  }

  private emit(e: GameEvent): void {
    this.events.push(e);
    if (this.events.length > 2000) this.events.splice(0, this.events.length - 2000);
  }

  private rand(): number {
    return nextRandom(this.state);
  }

  // ── Earning ──

  private earn(amount: number): void {
    const v = safe(amount);
    if (v <= 0) return;
    const s = this.state;
    s.gasps = safe(s.gasps + v);
    s.runGasps = safe(s.runGasps + v);
    s.lifetimeGasps = safe(s.lifetimeGasps + v);
    if (s.boss) {
      s.boss.hp -= v;
      if (s.boss.hp <= 0) this.winBoss();
    }
  }

  // ── Time ──

  /** Advance the simulation by `dt` seconds. Splits at timer boundaries so a
   *  single long step (e.g. a backgrounded tab) is exact. */
  update(dt: number): void {
    if (!(dt > 0)) return;
    let remaining = Math.min(dt, 7 * 24 * 3600);
    let guard = 0;
    while (remaining > 1e-9 && guard++ < 100_000) {
      // Production is linear between boundaries; the cap only keeps Flurry
      // auto-pokes and the Overthinking ramp smooth.
      const flurry = this.state.buffs.some((b) => b.id === 'flurry');
      const step = Math.min(remaining, this.nextBoundary() - this.state.time, flurry ? 0.25 : 5);
      const h = Math.max(step, 1e-6);
      this.advance(h);
      remaining -= h;
      this.processTimers();
    }
  }

  private nextBoundary(): number {
    const s = this.state;
    let t = Infinity;
    for (const b of s.buffs) t = Math.min(t, b.end);
    if (s.freakOutEnd > s.time) t = Math.min(t, s.freakOutEnd);
    if (s.boss) t = Math.min(t, s.boss.end);
    if (s.golden) t = Math.min(t, s.golden.end);
    else t = Math.min(t, s.nextGoldenAt);
    if (s.weakSpot) t = Math.min(t, s.weakSpot.end);
    else if (this.mods.weakSpots) t = Math.min(t, s.nextWeakSpotAt);
    if (s.charge) t = Math.min(t, s.charge.startedAt + CHARGE_MAX);
    return Math.max(t, s.time + 1e-6);
  }

  private advance(h: number): void {
    const s = this.state;
    const gpsNow = this.gps;
    const flurry = s.buffs.find((b) => b.id === 'flurry' && b.end > s.time);
    s.time += h;
    s.totalTime += h;
    this.earn(gpsNow * h);

    if (flurry) {
      const lvl = this.mods.abilityLevels.flurry ?? 1;
      s.flurryCarry += flurryCps(lvl) * h;
      let n = Math.floor(s.flurryCarry);
      s.flurryCarry -= n;
      n = Math.min(n, 200);
      for (let i = 0; i < n; i++) this.poke({ source: 'auto', region: 'face', dir: null });
    }

    if (!isFreakingOut(s) && s.time - s.lastClickAt > 2) {
      s.freakMeter = Math.max(0, s.freakMeter - METER_DECAY * h);
    }
    if (!isFreakingOut(s) && s.time - s.lastClickAt > this.mods.comboWindow) s.streak = 0;
  }

  private processTimers(): void {
    const s = this.state;
    const t = s.time;

    // Buffs
    if (s.buffs.length) {
      const kept: Buff[] = [];
      let changed = false;
      for (const b of s.buffs) {
        if (b.end > t) kept.push(b);
        else {
          changed = true;
          if (b.id === 'rally' || b.id === 'singularity' || b.id === 'flurry') this.emit({ type: 'abilityEnd', id: b.id });
        }
      }
      if (changed) s.buffs = kept;
    }

    if (s.freakOutEnd > 0 && t >= s.freakOutEnd) {
      s.freakOutEnd = 0;
      this.emit({ type: 'freakOutEnd' });
    }

    if (s.charge && t - s.charge.startedAt >= CHARGE_MAX) this.releaseCharge();

    // Boss timeout
    if (s.boss && t >= s.boss.end) {
      const { era, final } = s.boss;
      s.boss = null;
      s.bossRetryAt = t + BOSS_RETRY_DELAY;
      this.gateAnnounced = -1;
      this.emit({ type: 'bossFail', era, final });
    }

    // Golden Freakmoji
    if (s.golden && t >= s.golden.end) {
      s.golden = null;
      s.nextGoldenAt = t + this.goldenDelay();
      this.emit({ type: 'goldenMissed' });
    } else if (!s.golden && t >= s.nextGoldenAt) {
      const duration = GOLDEN_LIFE * this.mods.goldenDuration;
      s.golden = { end: t + duration, seed: (this.rand() * 0xffffffff) >>> 0 };
      this.emit({ type: 'goldenSpawn', seed: s.golden.seed, duration });
    }

    // Weak spots only appear while the player is actively poking.
    if (s.weakSpot && t >= s.weakSpot.end) {
      s.weakSpot = null;
      s.nextWeakSpotAt = t + this.weakSpotDelay();
      this.emit({ type: 'weakSpotEnd', hit: false });
    } else if (!s.weakSpot && this.mods.weakSpots && t >= s.nextWeakSpotAt) {
      if (t - s.lastManualAt < 8) {
        s.weakSpot = {
          yaw: randomRange(s, -0.75, 0.75),
          pitch: randomRange(s, -0.3, 0.55),
          end: t + WEAK_SPOT_LIFE,
        };
        this.emit({ type: 'weakSpot', yaw: s.weakSpot.yaw, pitch: s.weakSpot.pitch });
      } else {
        s.nextWeakSpotAt = t + 2;
      }
    }

    // Era gate announcements
    const gate = this.gateBoss();
    if (gate && this.gateAnnounced !== s.era + (s.era === ERAS.length - 1 ? 1 : 0)) {
      this.gateAnnounced = s.era + (s.era === ERAS.length - 1 ? 1 : 0);
      this.emit({ type: 'gateReady', era: s.era + 1, final: gate.final });
    }

    if (t >= this.nextAchievementCheck) {
      this.nextAchievementCheck = t + ACHIEVEMENT_INTERVAL;
      this.checkAchievements();
    }
  }

  private goldenDelay(): number {
    return randomRange(this.state, 80, 200) / this.mods.goldenFreq;
  }

  private weakSpotDelay(): number {
    return randomRange(this.state, 4, 9) * this.mods.weakSpotInterval;
  }

  // ── Poking ──

  /** Returns the value earned, or 0 if the poke was rejected. */
  poke(input: PokeInput = {}): number {
    const s = this.state;
    const m = this.mods;
    const source = input.source ?? 'pointer';
    const region = input.region ?? 'face';

    if (source !== 'auto') {
      // Rate limit manual pokes.
      const times = this.manualTimes;
      if (times.length >= MAX_MANUAL_CPS && s.time - times[0] < 1) return 0;
      times.push(s.time);
      if (times.length > MAX_MANUAL_CPS) times.shift();
      s.lastManualAt = s.time;
      if (region === 'hand') s.stats.handPokes++;
      if (region === 'eye') s.stats.eyePokes++;
    }

    // Combo
    if (isFreakingOut(s) || s.time - s.lastClickAt <= m.comboWindow) s.streak++;
    else s.streak = 1;
    s.lastClickAt = s.time;
    if (s.streak > s.stats.bestCombo) s.stats.bestCombo = s.streak;

    // Weak spot hit test
    let weak = false;
    if (s.weakSpot && input.dir) {
      const { yaw, pitch } = s.weakSpot;
      const wx = Math.sin(yaw) * Math.cos(pitch);
      const wy = Math.sin(pitch);
      const wz = Math.cos(yaw) * Math.cos(pitch);
      const [x, y, z] = input.dir;
      if (x * wx + y * wy + z * wz >= WEAK_SPOT_COS) {
        weak = true;
        s.weakSpot = null;
        s.nextWeakSpotAt = s.time + this.weakSpotDelay();
        s.stats.weakHits++;
        this.emit({ type: 'weakSpotEnd', hit: true });
      }
    }

    const crit = weak || this.rand() < m.critChance;
    let value = clickBase(s, m, this.gpsBase) * dynamicClickMult(s, m) * comboMult(s.streak, m);
    if (crit) value *= m.critMult;
    if (weak) value *= m.weakSpotMult;
    value = safe(value);

    s.stats.clicks++;
    s.runClicks++;
    if (crit) s.stats.crits++;
    if (value > s.stats.biggestHit) s.stats.biggestHit = value;

    // Freak-O-Meter
    if (!isFreakingOut(s)) {
      s.freakMeter += METER_PER_POKE * m.meterFill * (weak ? 5 : crit ? 2 : 1);
      if (s.freakMeter >= 1) this.startFreakOut();
    }

    this.earn(value);
    this.emit({ type: 'poke', value, crit, weak, streak: s.streak, dir: input.dir ?? null, region, source });
    return value;
  }

  private startFreakOut(): void {
    const s = this.state;
    s.freakMeter = 0;
    s.freakOutEnd = s.time + this.mods.freakOutDuration;
    s.stats.freakOuts++;
    this.emit({ type: 'freakOutStart', duration: this.mods.freakOutDuration });
  }

  // ── Shopping ──

  nextWeapon(): number {
    const i = this.state.weapon + 1;
    return i < WEAPONS.length ? i : -1;
  }

  weaponUnlocked(i: number): boolean {
    return i >= 0 && i < WEAPONS.length && WEAPONS[i].era <= this.state.era;
  }

  buyWeapon(): boolean {
    const s = this.state;
    const i = this.nextWeapon();
    if (i < 0 || !this.weaponUnlocked(i)) return false;
    const cost = weaponCost(i, this.mods);
    if (s.gasps < cost) {
      this.emit({ type: 'denied', reason: 'weapon' });
      return false;
    }
    s.gasps -= cost;
    s.weapon = i;
    this.refresh();
    this.emit({ type: 'buyWeapon', index: i });
    this.checkAchievements();
    return true;
  }

  producerUnlocked(id: string): boolean {
    const i = PRODUCER_INDEX[id];
    return i !== undefined && PRODUCERS[i].era <= this.state.era;
  }

  producerPrice(id: string, amount: number): number {
    const p = PRODUCERS[PRODUCER_INDEX[id]];
    return producerCost(p, this.state.producers[id] ?? 0, this.mods, Math.max(1, amount));
  }

  /** Buys up to `amount` units (or as many as affordable for 'max'). Returns units bought. */
  buyProducer(id: string, amount: number | 'max' = 1): number {
    const s = this.state;
    const idx = PRODUCER_INDEX[id];
    if (idx === undefined || !this.producerUnlocked(id)) return 0;
    const p = PRODUCERS[idx];
    const have = s.producers[id] ?? 0;
    const n = amount === 'max' ? maxAffordable(p, have, this.mods, s.gasps) : Math.floor(amount);
    if (n <= 0) {
      this.emit({ type: 'denied', reason: 'producer' });
      return 0;
    }
    const cost = producerCost(p, have, this.mods, n);
    if (s.gasps < cost) {
      this.emit({ type: 'denied', reason: 'producer' });
      return 0;
    }
    s.gasps -= cost;
    s.producers[id] = have + n;
    this.refresh();
    this.emit({ type: 'buyProducer', id, amount: n });
    this.checkAchievements();
    return n;
  }

  upgradeVisible(id: string): boolean {
    const u = UPGRADE_BY_ID[id];
    return !!u && !this.state.upgrades[id] && u.req(this.state);
  }

  buyUpgrade(id: string): boolean {
    const s = this.state;
    const u = UPGRADE_BY_ID[id];
    if (!u || s.upgrades[id] || !u.req(s)) return false;
    if (s.gasps < u.cost) {
      this.emit({ type: 'denied', reason: 'upgrade' });
      return false;
    }
    s.gasps -= u.cost;
    s.upgrades[id] = true;
    this.refresh();
    this.emit({ type: 'buyUpgrade', id });
    return true;
  }

  // ── Abilities ──

  abilityLevel(id: AbilityId): number {
    return this.mods.abilityLevels[id] ?? 1;
  }

  abilityUnlocked(id: AbilityId): boolean {
    return this.state.era >= ABILITY_BY_ID[id].unlockEra;
  }

  abilityCooldownLeft(id: AbilityId): number {
    return Math.max(0, (this.state.abilityCooldowns[id] ?? 0) - this.state.time);
  }

  abilityCooldownTotal(id: AbilityId): number {
    return ABILITY_BY_ID[id].baseCooldown * this.mods.abilityCooldown;
  }

  abilityActiveLeft(id: AbilityId): number {
    const b = this.state.buffs.find((x) => x.id === id);
    return b ? Math.max(0, b.end - this.state.time) : 0;
  }

  abilityReady(id: AbilityId): boolean {
    return this.abilityUnlocked(id) && this.abilityCooldownLeft(id) <= 0 && !(id === 'haymaker' && this.state.charge);
  }

  private addBuff(id: BuffId, duration: number, gps: number, click: number): void {
    const s = this.state;
    s.buffs = s.buffs.filter((b) => b.id !== id);
    s.buffs.push({ id, end: s.time + duration, gps, click });
  }

  private startCooldown(id: AbilityId): void {
    this.state.abilityCooldowns[id] = this.state.time + this.abilityCooldownTotal(id);
    this.state.stats.abilitiesUsed++;
  }

  activate(id: AbilityId): boolean {
    if (id === 'haymaker') return this.startCharge();
    if (!this.abilityReady(id)) return false;
    const lvl = this.abilityLevel(id);
    switch (id) {
      case 'rally':
        this.addBuff('rally', rallyDuration(lvl), rallyMult(lvl), 1);
        break;
      case 'flurry':
        this.addBuff('flurry', flurryDuration(lvl), 1, 1);
        break;
      case 'timewarp':
        this.earn(this.gpsBase * 60 * timeWarpMinutes(lvl) * this.mods.timeWarpMult);
        break;
      case 'singularity': {
        const k = singularityMult(lvl);
        this.addBuff('singularity', singularityDuration(lvl), k, k);
        break;
      }
    }
    this.startCooldown(id);
    this.emit({ type: 'ability', id });
    return true;
  }

  startCharge(): boolean {
    if (!this.abilityReady('haymaker')) return false;
    this.state.charge = { startedAt: this.state.time };
    this.emit({ type: 'chargeStart' });
    return true;
  }

  chargeLevel(): number {
    const c = this.state.charge;
    return c ? clamp((this.state.time - c.startedAt) / CHARGE_FULL, 0, 1) : 0;
  }

  /** Release the Haymaker. `held` lets the UI pass a precise wall-clock hold time. */
  releaseCharge(held?: number): number {
    const s = this.state;
    if (!s.charge) return 0;
    const simHeld = s.time - s.charge.startedAt;
    const t = clamp(held ?? simHeld, 0, CHARGE_MAX);
    s.charge = null;
    const ratio = clamp(t / CHARGE_FULL, 0, 1);
    const perfect = t >= PERFECT_FROM && t <= CHARGE_FULL;
    const m = this.mods;
    let value =
      clickBase(s, m, this.gpsBase) *
      dynamicClickMult(s, m) *
      comboMult(this.liveStreak, m) *
      haymakerMult(this.abilityLevel('haymaker')) *
      Math.max(0.05, ratio * ratio);
    if (perfect) {
      value *= PERFECT_MULT;
      s.stats.perfectHaymakers++;
    }
    value = safe(value);
    if (value > s.stats.biggestHit) s.stats.biggestHit = value;
    this.startCooldown('haymaker');
    this.earn(value);
    this.emit({ type: 'haymaker', value, perfect, charge: ratio });
    if (!isFreakingOut(s)) {
      s.freakMeter += 0.15 * m.meterFill * (perfect ? 2 : 1);
      if (s.freakMeter >= 1) this.startFreakOut();
    }
    return value;
  }

  // ── Golden Freakmoji ──

  catchGolden(): GoldenEffect | null {
    const s = this.state;
    if (!s.golden || s.time >= s.golden.end) return null;
    s.golden = null;
    s.nextGoldenAt = s.time + this.goldenDelay();
    s.stats.goldenCaught++;
    const power = this.mods.goldenPower;
    const r = this.rand();
    let effect: GoldenEffect;
    let value = 0;
    if (r < 0.45) {
      effect = 'lucky';
      value = Math.min(s.gasps * 0.15, this.gpsBase * 900) * power + 13;
      this.earn(value);
    } else if (r < 0.8) {
      effect = 'frenzy';
      this.addBuff('goldenFrenzy', 77 * power, 7, 1);
    } else if (r < 0.92) {
      effect = 'storm';
      this.addBuff('clickStorm', 12 * power, 1, 10);
    } else {
      effect = 'freakout';
      s.streak = Math.max(s.streak, this.mods.comboCap);
      s.lastClickAt = s.time;
      if (!isFreakingOut(s)) this.startFreakOut();
    }
    this.emit({ type: 'goldenCaught', effect, value });
    return effect;
  }

  // ── Bosses & eras ──

  /** The boss currently challengeable, if any. */
  gateBoss(): (BossDef & { final: boolean }) | null {
    const s = this.state;
    if (s.boss || s.time < s.bossRetryAt) return null;
    if (s.era < ERAS.length - 1) {
      const next = ERAS[s.era + 1];
      return s.runGasps >= next.threshold && next.boss ? { ...next.boss, final: false } : null;
    }
    if (!s.victory && s.runGasps >= FINAL_BOSS.threshold) return { ...FINAL_BOSS, final: true };
    return null;
  }

  /** Next era threshold for progress bars (null once reality is broken). */
  nextGateThreshold(): number | null {
    const s = this.state;
    if (s.era < ERAS.length - 1) return ERAS[s.era + 1].threshold;
    return s.victory ? null : FINAL_BOSS.threshold;
  }

  startBoss(): boolean {
    const s = this.state;
    const b = this.gateBoss();
    if (!b) return false;
    const era = b.final ? s.era : s.era + 1;
    s.boss = { era, hp: b.hp, maxHp: b.hp, end: s.time + b.duration, final: b.final };
    this.emit({ type: 'bossStart', era, final: b.final });
    return true;
  }

  private winBoss(): void {
    const s = this.state;
    if (!s.boss) return;
    const { era, final } = s.boss;
    s.boss = null;
    s.bossRetryAt = 0;
    s.stats.bossesBeaten++;
    this.emit({ type: 'bossWin', era, final });
    if (final) {
      s.victory = true;
      s.stats.victories++;
    } else {
      const from = s.era;
      s.era = era;
      this.emit({ type: 'eraChange', from, to: era });
    }
    this.refresh();
    this.checkAchievements();
  }

  // ── Prestige ──

  canCollapse(): boolean {
    return (this.state.era >= 3 || this.state.victory) && paranoiaGain(this.state) >= 1;
  }

  /** Collapse the timeline. Returns the Paranoia gained. */
  collapse(respec = false, now = Date.now()): number {
    const s = this.state;
    if (!this.canCollapse()) return 0;
    const gained = paranoiaGain(s);
    s.records.unshift({
      timeline: s.timelines + 1,
      gasps: s.runGasps,
      era: s.era,
      victory: s.victory,
      duration: s.time,
      endedAt: now,
    });
    s.records = s.records.sort((a, b) => b.gasps - a.gasps).slice(0, 10);
    s.paranoia += gained;
    s.paranoiaEarned += gained;
    if (respec) {
      for (const n of NODES) if (s.nodes[n.id]) s.paranoia += n.cost;
      s.nodes = {};
    }
    s.timelines++;
    this.resetRun(now);
    this.emit({ type: 'collapse', gained, timeline: s.timelines });
    this.checkAchievements();
    return gained;
  }

  private resetRun(now: number): void {
    const s = this.state;
    const fresh = createInitialState(s.rng, now);
    s.time = 0;
    s.gasps = 0;
    s.runGasps = 0;
    s.weapon = -1;
    s.producers = fresh.producers;
    s.upgrades = {};
    s.buffs = [];
    s.abilityCooldowns = {};
    s.streak = 0;
    s.lastClickAt = -10;
    s.lastManualAt = -10;
    s.runClicks = 0;
    s.freakMeter = 0;
    s.freakOutEnd = 0;
    s.weakSpot = null;
    s.nextWeakSpotAt = 6;
    s.golden = null;
    s.nextGoldenAt = 40;
    s.boss = null;
    s.bossRetryAt = 0;
    s.victory = false;
    s.charge = null;
    s.flurryCarry = 0;
    s.runStats = { clicks: 0, startedAt: now };
    this.gateAnnounced = -1;
    this.manualTimes = [];
    this.nextAchievementCheck = 0;
    this.refresh();
    s.era = this.mods.startEra;
    if (this.mods.startKit) {
      s.weapon = 0;
      s.producers.monkey = 10;
    }
    this.refresh();
  }

  buyNode(id: string): boolean {
    const s = this.state;
    const n = NODE_BY_ID[id];
    if (!n || !nodeAvailable(s, id) || s.paranoia < n.cost) return false;
    s.paranoia -= n.cost;
    s.nodes[id] = true;
    this.refresh();
    this.emit({ type: 'buyNode', id });
    return true;
  }

  // ── Achievements ──

  checkAchievements(): void {
    const s = this.state;
    const gps = this.gpsBase;
    let gained = false;
    for (const a of ACHIEVEMENTS) {
      if (!s.achievements[a.id] && a.check(s, gps)) {
        s.achievements[a.id] = true;
        gained = true;
        this.emit({ type: 'achievement', id: a.id });
      }
    }
    if (gained) this.refresh();
  }

  // ── Offline ──

  /** Credit time away (tab closed). Temporary effects lapse; production is
   *  paid at the offline efficiency, capped. Cooldowns keep ticking. */
  applyOffline(elapsed: number): OfflineReport {
    const s = this.state;
    const report: OfflineReport = { elapsed: 0, credited: 0, efficiency: this.mods.offlineEff, gained: 0 };
    if (!(elapsed > 1)) return report;
    const e = Math.min(elapsed, 365 * 86400);
    if (s.boss) {
      const { era, final } = s.boss;
      s.boss = null;
      this.emit({ type: 'bossFail', era, final });
    }
    s.buffs = [];
    s.freakOutEnd = 0;
    s.charge = null;
    s.golden = null;
    s.weakSpot = null;
    s.streak = 0;
    s.freakMeter = 0;
    s.time += e;
    s.totalTime += e;
    s.nextGoldenAt = s.time + 30;
    s.nextWeakSpotAt = s.time + 5;
    s.bossRetryAt = 0;
    const credited = Math.min(e, this.mods.offlineCap);
    const gained = safe(this.gpsBase * credited * this.mods.offlineEff);
    this.earn(gained);
    this.checkAchievements();
    return { elapsed: e, credited, efficiency: this.mods.offlineEff, gained };
  }
}
