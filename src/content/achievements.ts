import type { GameState } from '../sim/state';
import { PRODUCERS } from './producers';
import { WEAPONS } from './weapons';
import { ERAS } from './eras';

/** Each achievement permanently adds +1% to all gasps, across timelines. */
export const ACHIEVEMENT_BONUS = 0.01;

export interface AchievementDef {
  id: string;
  name: string;
  desc: string;
  icon: string;
  secret?: boolean;
  check: (s: GameState, gps: number) => boolean;
}

const totalMinions = (s: GameState): number => PRODUCERS.reduce((a, p) => a + (s.producers[p.id] ?? 0), 0);

const threshold = (
  prefix: string,
  icon: string,
  values: number[],
  names: string[],
  desc: (v: number) => string,
  get: (s: GameState, gps: number) => number,
): AchievementDef[] =>
  values.map((v, i) => ({
    id: `${prefix}${i}`,
    name: names[i],
    icon,
    desc: desc(v),
    check: (s: GameState, gps: number) => get(s, gps) >= v,
  }));

const short = (n: number): string => {
  const names: [number, string][] = [[1e24, 'septillion'], [1e21, 'sextillion'], [1e18, 'quintillion'], [1e15, 'quadrillion'], [1e12, 'trillion'], [1e9, 'billion'], [1e6, 'million'], [1e3, 'thousand']];
  for (const [v, w] of names) if (n >= v) return `${n / v} ${w}`;
  return String(n);
};

export const ACHIEVEMENTS: AchievementDef[] = [
  ...threshold('clk', '👆', [1, 100, 1_000, 10_000, 50_000],
    ['First Contact', 'Poke Enthusiast', 'Clickaholic', 'Repetitive Strain', 'Carpal Tunnel Champion'],
    (v) => `Poke the Freakmoji ${v.toLocaleString('en-US')} time${v === 1 ? '' : 's'}.`, (s) => s.stats.clicks),
  ...threshold('gsp', '😮', [1e3, 1e6, 1e9, 1e12, 1e15, 1e18, 1e21, 1e24],
    ['Mild Surprise', 'Genuine Alarm', 'Existential Shock', 'Trillion-Gasp Tantrum', 'Quadrillion Quiver', 'Quintillion Quake', 'Sextillion Scream', 'The Heat Death Gasp'],
    (v) => `Earn ${short(v)} gasps in total.`, (s) => s.lifetimeGasps),
  ...threshold('gps', '⏲️', [10, 1e3, 1e6, 1e9, 1e12],
    ['Idle Hands', 'Gasp Engine', 'Assembly of Agony', 'Industrial Dread', 'Perpetual Panic'],
    (v) => `Produce ${short(v)} gasps per second.`, (_s, gps) => gps),
  ...threshold('cmb', '🔥', [25, 100, 250],
    ['On a Roll', 'Combo Breaker Breaker', 'Unbroken'],
    (v) => `Reach a ${v}-poke combo.`, (s) => s.stats.bestCombo),
  ...threshold('crt', '💥', [1, 100, 1_000],
    ['Critical Thinking', 'Critical Condition', 'Critical Mass Hysteria'],
    (v) => `Land ${v.toLocaleString('en-US')} critical poke${v === 1 ? '' : 's'}.`, (s) => s.stats.crits),
  ...threshold('wk', '🎯', [1, 50, 500],
    ['Found a Soft Spot', 'Pressure Point Pro', 'Acupuncturist of Doom'],
    (v) => `Hit ${v} weak spot${v === 1 ? '' : 's'}.`, (s) => s.stats.weakHits),
  ...threshold('gld', '🌟', [1, 10, 77],
    ['Fool’s Gold', 'Gold Rush', 'Seventy-Seven Shiny Shocks'],
    (v) => `Catch ${v} Golden Freakmoji${v === 1 ? '' : 's'}.`, (s) => s.stats.goldenCaught),
  ...threshold('fo', '😱', [1, 25, 100],
    ['Freaking Out', 'Chronic Panic', 'Permanent Meltdown'],
    (v) => `Trigger ${v} Freak Out${v === 1 ? '' : 's'}.`, (s) => s.stats.freakOuts),
  ...ERAS.slice(1).map((era, i) => ({
    id: `era${i + 1}`,
    name: `Era ${era.numeral}: ${era.name}`,
    icon: '🏛️',
    desc: `Shatter ${era.boss!.name}'s composure and enter Era ${era.numeral}.`,
    check: (s: GameState) => s.era >= i + 1,
  })),
  {
    id: 'victory', name: 'Reality: Broken', icon: '🌌',
    desc: 'Defeat The Composed One and break reality itself.',
    check: (s) => s.stats.victories >= 1,
  },
  {
    id: 'allweapons', name: 'Fully Armed and Operational', icon: '⚔️',
    desc: `Own all ${WEAPONS.length} weapons in one timeline.`,
    check: (s) => s.weapon >= WEAPONS.length - 1,
  },
  {
    id: 'min100', name: 'Middle Management', icon: '📈',
    desc: 'Own 100 minions in one timeline.',
    check: (s) => totalMinions(s) >= 100,
  },
  {
    id: 'min500', name: 'Minion Megacorp', icon: '🏢',
    desc: 'Own 500 minions in one timeline.',
    check: (s) => totalMinions(s) >= 500,
  },
  {
    id: 'allminions', name: 'Diverse Portfolio', icon: '🗂️',
    desc: 'Own at least one of every minion.',
    check: (s) => PRODUCERS.every((p) => (s.producers[p.id] ?? 0) > 0),
  },
  {
    id: 'perfect', name: 'Frame Perfect', icon: '🥊',
    desc: 'Land a PERFECT Haymaker.',
    check: (s) => s.stats.perfectHaymakers >= 1,
  },
  {
    id: 'abil50', name: 'Ability Spammer', icon: '🎛️',
    desc: 'Use abilities 50 times.',
    check: (s) => s.stats.abilitiesUsed >= 50,
  },
  ...threshold('tl', '🔄', [1, 5, 25],
    ['It Was All a Dream', 'Groundhog Gasp', 'Timeline Tourist'],
    (v) => `Collapse ${v} timeline${v === 1 ? '' : 's'}.`, (s) => s.timelines),
  {
    id: 'para100', name: 'Clinically Paranoid', icon: '🫣',
    desc: 'Earn 100 Paranoia in total.',
    check: (s) => s.paranoiaEarned >= 100,
  },
  // Secrets: shown as ??? until earned
  {
    id: 'hands', name: 'Talk to the Hand', icon: '✋', secret: true,
    desc: 'Poke the Freakmoji’s gloves 150 times. They are VERY clean gloves.',
    check: (s) => s.stats.handPokes >= 150,
  },
  {
    id: 'eyes', name: 'Eye Contact', icon: '👀', secret: true,
    desc: 'Poke the Freakmoji right in the eye 150 times. Rude.',
    check: (s) => s.stats.eyePokes >= 150,
  },
  {
    id: 'patience', name: 'Thousand-Yard Stare', icon: '🧘', secret: true,
    desc: 'Leave the Freakmoji alone for 10 minutes. It appreciates the space.',
    check: (s) => s.runClicks > 0 && s.time - s.lastManualAt >= 600,
  },
  {
    id: 'bighit', name: 'One Punch', icon: '👊', secret: true,
    desc: 'Deal a single hit worth more than an hour of production.',
    check: (s, gps) => gps > 0 && s.stats.biggestHit >= gps * 3600,
  },
];

export const ACHIEVEMENT_BY_ID: Record<string, AchievementDef> = Object.fromEntries(ACHIEVEMENTS.map((a) => [a.id, a]));
