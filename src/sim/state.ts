import { newSeed } from '../core/rng';
import { PRODUCERS } from '../content/producers';

export const SAVE_VERSION = 2;

export type BuffId = 'goldenFrenzy' | 'clickStorm' | 'rally' | 'singularity' | 'flurry';

export interface Buff {
  id: BuffId;
  end: number;
  /** Multiplier on production. */
  gps: number;
  /** Multiplier on click value. */
  click: number;
}

export interface RunRecord {
  timeline: number;
  gasps: number;
  era: number;
  victory: boolean;
  duration: number;
  endedAt: number;
}

export interface LegacyScore {
  name: string;
  score: number;
  clicks: number;
}

export interface Stats {
  clicks: number;
  crits: number;
  weakHits: number;
  goldenCaught: number;
  freakOuts: number;
  bestCombo: number;
  bossesBeaten: number;
  abilitiesUsed: number;
  perfectHaymakers: number;
  handPokes: number;
  eyePokes: number;
  biggestHit: number;
  victories: number;
}

export interface GameState {
  version: number;
  rng: number;

  /** Seconds of simulated time in the current timeline. */
  time: number;
  /** Seconds of simulated time across every timeline. */
  totalTime: number;

  gasps: number;
  runGasps: number;
  lifetimeGasps: number;

  era: number;
  /** Index of the equipped (highest owned) weapon, -1 for none. */
  weapon: number;
  producers: Record<string, number>;
  upgrades: Record<string, true>;

  buffs: Buff[];
  abilityCooldowns: Record<string, number>;

  streak: number;
  /** Sim time of the last poke of any kind (drives combo and meter decay). */
  lastClickAt: number;
  /** Sim time of the last poke made by the player (not Flurry). */
  lastManualAt: number;
  runClicks: number;

  freakMeter: number;
  freakOutEnd: number;

  weakSpot: { yaw: number; pitch: number; end: number } | null;
  nextWeakSpotAt: number;

  golden: { end: number; seed: number } | null;
  nextGoldenAt: number;

  boss: { era: number; hp: number; maxHp: number; end: number; final: boolean } | null;
  bossRetryAt: number;
  victory: boolean;

  charge: { startedAt: number } | null;
  flurryCarry: number;

  paranoia: number;
  paranoiaEarned: number;
  nodes: Record<string, true>;
  timelines: number;

  achievements: Record<string, true>;
  stats: Stats;
  runStats: { clicks: number; startedAt: number };
  records: RunRecord[];
  legacyScores: LegacyScore[];

  /** Wall-clock ms of the last save; drives offline progress. */
  lastSeen: number;
}

export function emptyStats(): Stats {
  return {
    clicks: 0,
    crits: 0,
    weakHits: 0,
    goldenCaught: 0,
    freakOuts: 0,
    bestCombo: 0,
    bossesBeaten: 0,
    abilitiesUsed: 0,
    perfectHaymakers: 0,
    handPokes: 0,
    eyePokes: 0,
    biggestHit: 0,
    victories: 0,
  };
}

export function createInitialState(seed: number = newSeed(), now = Date.now()): GameState {
  return {
    version: SAVE_VERSION,
    rng: seed >>> 0,
    time: 0,
    totalTime: 0,
    gasps: 0,
    runGasps: 0,
    lifetimeGasps: 0,
    era: 0,
    weapon: -1,
    producers: Object.fromEntries(PRODUCERS.map((p) => [p.id, 0])),
    upgrades: {},
    buffs: [],
    abilityCooldowns: {},
    streak: 0,
    lastClickAt: -10,
    lastManualAt: -10,
    runClicks: 0,
    freakMeter: 0,
    freakOutEnd: 0,
    weakSpot: null,
    nextWeakSpotAt: 6,
    golden: null,
    nextGoldenAt: 50,
    boss: null,
    bossRetryAt: 0,
    victory: false,
    charge: null,
    flurryCarry: 0,
    paranoia: 0,
    paranoiaEarned: 0,
    nodes: {},
    timelines: 0,
    achievements: {},
    stats: emptyStats(),
    runStats: { clicks: 0, startedAt: now },
    records: [],
    legacyScores: [],
    lastSeen: now,
  };
}
