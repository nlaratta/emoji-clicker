/**
 * Active abilities live on the hotbar (keys 1–5). Each unlocks with an era
 * and levels up through Upgrades. All numbers come from these functions so
 * the sim, the UI tooltips and the tests agree.
 */
export type AbilityId = 'haymaker' | 'rally' | 'flurry' | 'timewarp' | 'singularity';

export interface AbilityDef {
  id: AbilityId;
  name: string;
  icon: string;
  key: string;
  unlockEra: number;
  baseCooldown: number;
  describe(level: number): string;
}

/** Haymaker charge: full power at CHARGE_FULL seconds; release inside the
 *  perfect window for a guaranteed crit and double damage. Holding past
 *  CHARGE_MAX auto-releases without the perfect bonus. */
export const CHARGE_FULL = 2.0;
export const PERFECT_FROM = 1.7;
export const CHARGE_MAX = 2.6;

export const haymakerMult = (lvl: number): number => [20, 30, 45, 65, 90][Math.min(lvl, 5) - 1];
/** Extra multiplier for a PERFECT release. */
export const PERFECT_MULT = 3;
export const rallyMult = (lvl: number): number => 3 + lvl;
export const rallyDuration = (lvl: number): number => 20 + 4 * (lvl - 1);
export const flurryCps = (lvl: number): number => 12 + 4 * (lvl - 1);
export const flurryDuration = (lvl: number): number => 10 + 2 * (lvl - 1);
export const timeWarpMinutes = (lvl: number): number => 10 + 5 * (lvl - 1);
export const singularityMult = (lvl: number): number => 10 + 5 * (lvl - 1);
export const singularityDuration = (lvl: number): number => 15 + 3 * (lvl - 1);

export const ABILITIES: AbilityDef[] = [
  {
    id: 'haymaker',
    name: 'Haymaker',
    icon: '🥊',
    key: '1',
    unlockEra: 1,
    baseCooldown: 30,
    describe: (l) =>
      `Hold to wind up, release for one colossal poke worth up to ×${haymakerMult(l)} a click. Let go in the gold zone for a PERFECT: ×${PERFECT_MULT} on top.`,
  },
  {
    id: 'rally',
    name: 'Minion Rally',
    icon: '📣',
    key: '2',
    unlockEra: 2,
    baseCooldown: 120,
    describe: (l) => `Your minions lose their minds: production ×${rallyMult(l)} for ${rallyDuration(l)}s.`,
  },
  {
    id: 'flurry',
    name: 'Flurry',
    icon: '🌪️',
    key: '3',
    unlockEra: 3,
    baseCooldown: 90,
    describe: (l) =>
      `Unleash ${flurryCps(l)} automatic pokes per second for ${flurryDuration(l)}s. They crit, combo and fill the Freak-O-Meter.`,
  },
  {
    id: 'timewarp',
    name: 'Time Warp',
    icon: '⏩',
    key: '4',
    unlockEra: 4,
    baseCooldown: 600,
    describe: (l) => `Skip ahead: instantly collect ${timeWarpMinutes(l)} minutes of production.`,
  },
  {
    id: 'singularity',
    name: 'Singularity',
    icon: '🌀',
    key: '5',
    unlockEra: 5,
    baseCooldown: 900,
    describe: (l) =>
      `Collapse space around the Freakmoji: ALL gains ×${singularityMult(l)} for ${singularityDuration(l)}s.`,
  },
];

export const ABILITY_BY_ID: Record<AbilityId, AbilityDef> = Object.fromEntries(
  ABILITIES.map((a) => [a.id, a]),
) as Record<AbilityId, AbilityDef>;

export const MAX_ABILITY_LEVEL = 5;
