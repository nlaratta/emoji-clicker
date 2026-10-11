import { PRODUCERS } from '../content/producers';

/**
 * Every persistent source of power (upgrades, Paranoia nodes, achievements,
 * unspent Paranoia) folds into one Modifiers record. Economy math only ever
 * reads from here, so there is exactly one place where multipliers combine.
 */
export interface Modifiers {
  globalMult: number;
  gpsMult: number;
  clickMult: number;
  /** Fraction of base production added to each click. */
  clickGpsFrac: number;
  producerMult: number[];
  /** Multiplier applied by each producer milestone upgrade (×2 by default). */
  milestoneMult: number;
  producerCostMult: number;
  weaponCostMult: number;

  critChance: number;
  critMult: number;

  comboCap: number;
  /** Extra multiplier at a full combo: 1 means ×2 at cap. */
  comboBonus: number;
  comboWindow: number;

  meterFill: number;
  freakOutDuration: number;
  freakOutClickMult: number;
  freakOutGpsMult: number;

  weakSpots: boolean;
  weakSpotInterval: number;
  weakSpotMult: number;

  goldenFreq: number;
  goldenDuration: number;
  goldenPower: number;

  abilityCooldown: number;
  abilityLevels: Record<string, number>;
  timeWarpMult: number;

  offlineEff: number;
  offlineCap: number;
  overthinking: boolean;

  /** Era a fresh timeline starts in (from Paranoia nodes). */
  startEra: number;
  startKit: boolean;
}

export function baseModifiers(): Modifiers {
  return {
    globalMult: 1,
    gpsMult: 1,
    clickMult: 1,
    clickGpsFrac: 0,
    producerMult: PRODUCERS.map(() => 1),
    milestoneMult: 2,
    producerCostMult: 1,
    weaponCostMult: 1,
    critChance: 0.04,
    critMult: 8,
    comboCap: 100,
    comboBonus: 1,
    comboWindow: 1.0,
    meterFill: 1,
    freakOutDuration: 10,
    freakOutClickMult: 3,
    freakOutGpsMult: 2,
    weakSpots: false,
    weakSpotInterval: 1,
    weakSpotMult: 2,
    goldenFreq: 1,
    goldenDuration: 1,
    goldenPower: 1,
    abilityCooldown: 1,
    abilityLevels: {},
    timeWarpMult: 1,
    offlineEff: 0.25,
    offlineCap: 2 * 3600,
    overthinking: false,
    startEra: 0,
    startKit: false,
  };
}
