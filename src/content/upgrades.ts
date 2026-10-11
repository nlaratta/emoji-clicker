import type { GameState } from '../sim/state';
import type { Modifiers } from '../sim/modifiers';
import { PRODUCERS, PRODUCER_INDEX } from './producers';
import { ABILITIES, MAX_ABILITY_LEVEL } from './abilities';
import { ERAS } from './eras';

export type UpgradeKind =
  | 'minion'
  | 'click'
  | 'crit'
  | 'combo'
  | 'meter'
  | 'weak'
  | 'golden'
  | 'synergy'
  | 'global'
  | 'ability';

export interface UpgradeDef {
  id: string;
  name: string;
  icon: string;
  kind: UpgradeKind;
  cost: number;
  desc: string;
  /** When the upgrade appears in the shop. */
  req: (s: GameState) => boolean;
  apply: (m: Modifiers, s: GameState) => void;
}

const owned = (s: GameState, id: string): number => s.producers[id] ?? 0;

// ── Minion milestones: ×2 (or ×3 with Delegation) at fixed owned counts ──
export const MILESTONES = [1, 5, 25, 50, 100, 150, 200, 250];
const MILESTONE_COST = [10, 50, 500, 5e4, 5e6, 5e8, 5e10, 5e12];

const minionUpgrades: UpgradeDef[] = PRODUCERS.flatMap((p, pi) =>
  MILESTONES.map((at, tier) => ({
    id: `m_${p.id}_${tier}`,
    name: p.tierNames[tier],
    icon: p.emoji,
    kind: 'minion' as const,
    cost: p.baseCost * MILESTONE_COST[tier],
    desc: `${p.name} output doubled. (Requires ${at} owned.)`,
    req: (s: GameState) => owned(s, p.id) >= at,
    apply: (m: Modifiers) => {
      m.producerMult[pi] *= m.milestoneMult;
    },
  })),
);

// ── Hand-authored upgrades ──
const special: UpgradeDef[] = [
  // Click power
  {
    id: 'c_knuckles', name: 'Knuckle Crackers', icon: '🤜', kind: 'click', cost: 100,
    desc: 'Pokes are twice as strong.',
    req: (s) => s.runClicks >= 20,
    apply: (m) => { m.clickMult *= 2; },
  },
  {
    id: 'c_finger', name: 'Pointier Finger', icon: '☝️', kind: 'click', cost: 2_500,
    desc: 'Pokes are twice as strong again.',
    req: (s) => s.weapon >= 2,
    apply: (m) => { m.clickMult *= 2; },
  },
  {
    id: 'c_waiver', name: 'Carpal Tunnel Waiver', icon: '📝', kind: 'click', cost: 2e4,
    desc: 'Each poke also adds 1% of your production.',
    req: (s) => s.era >= 1,
    apply: (m) => { m.clickGpsFrac += 0.01; },
  },
  {
    id: 'c_brass', name: 'Ergonomic Brass Knuckles', icon: '🥊', kind: 'click', cost: 4e6,
    desc: 'Each poke adds another 1% of production. Pokes ×2.',
    req: (s) => s.era >= 2,
    apply: (m) => { m.clickGpsFrac += 0.01; m.clickMult *= 2; },
  },
  {
    id: 'c_strain', name: 'Repetitive Strain Mastery', icon: '💪', kind: 'click', cost: 3e9,
    desc: 'Each poke adds another 1% of production.',
    req: (s) => s.era >= 3,
    apply: (m) => { m.clickGpsFrac += 0.01; },
  },
  {
    id: 'c_haptic', name: 'Haptic Overdrive', icon: '📳', kind: 'click', cost: 1.5e12,
    desc: 'Each poke adds another 1% of production. Pokes ×2.',
    req: (s) => s.era >= 4,
    apply: (m) => { m.clickGpsFrac += 0.01; m.clickMult *= 2; },
  },
  {
    id: 'c_cosmic', name: 'Cosmic Fingertips', icon: '🌠', kind: 'click', cost: 6e14,
    desc: 'Each poke adds another 1% of production.',
    req: (s) => s.era >= 5,
    apply: (m) => { m.clickGpsFrac += 0.01; },
  },
  {
    id: 'c_god', name: 'The Finger of God', icon: '👆', kind: 'click', cost: 4e17,
    desc: 'Each poke adds another 2% of production. Pokes ×2.',
    req: (s) => s.era >= 6,
    apply: (m) => { m.clickGpsFrac += 0.02; m.clickMult *= 2; },
  },

  // Crits
  {
    id: 'k_rabbit', name: 'Lucky Rabbit’s Foot', icon: '🐇', kind: 'crit', cost: 600,
    desc: '+3% critical poke chance.',
    req: (s) => s.stats.crits >= 3,
    apply: (m) => { m.critChance += 0.03; },
  },
  {
    id: 'k_pressure', name: 'Pressure Points', icon: '📍', kind: 'crit', cost: 4e5,
    desc: 'Critical pokes hit for ×12 instead of ×8.',
    req: (s) => s.era >= 1 && s.stats.crits >= 25,
    apply: (m) => { m.critMult += 4; },
  },
  {
    id: 'k_glassjaw', name: 'Glass Jaw Theory', icon: '🥃', kind: 'crit', cost: 6e8,
    desc: '+4% critical poke chance.',
    req: (s) => s.era >= 3,
    apply: (m) => { m.critChance += 0.04; },
  },
  {
    id: 'k_mass', name: 'Critical Mass', icon: '☄️', kind: 'crit', cost: 2e13,
    desc: 'Critical pokes hit ×6 harder.',
    req: (s) => s.era >= 5,
    apply: (m) => { m.critMult += 6; },
  },

  // Combo
  {
    id: 'o_rhythm', name: 'Rhythm Game Brain', icon: '🥁', kind: 'combo', cost: 1_500,
    desc: 'A full combo now multiplies pokes by ×2.5 instead of ×2.',
    req: (s) => s.stats.bestCombo >= 30,
    apply: (m) => { m.comboBonus += 0.5; },
  },
  {
    id: 'o_metronome', name: 'Metronome Implant', icon: '⏱️', kind: 'combo', cost: 2e6,
    desc: 'Combo window +0.4s. Keep the rhythm going.',
    req: (s) => s.era >= 2,
    apply: (m) => { m.comboWindow += 0.4; },
  },
  {
    id: 'o_drumline', name: 'Marching Drumline', icon: '🎺', kind: 'combo', cost: 8e9,
    desc: 'Full-combo bonus +0.5, but the combo now takes 150 pokes to fill.',
    req: (s) => s.era >= 3 && s.stats.bestCombo >= 100,
    apply: (m) => { m.comboCap += 50; m.comboBonus += 0.5; },
  },
  {
    id: 'o_flow', name: 'Flow State', icon: '🌊', kind: 'combo', cost: 3e14,
    desc: 'Full-combo bonus +1.',
    req: (s) => s.era >= 5,
    apply: (m) => { m.comboBonus += 1; },
  },

  // Freak-O-Meter
  {
    id: 'f_espresso', name: 'Espresso IV Drip', icon: '☕', kind: 'meter', cost: 3_000,
    desc: 'The Freak-O-Meter fills 30% faster.',
    req: (s) => s.stats.freakOuts >= 1,
    apply: (m) => { m.meterFill *= 1.3; },
  },
  {
    id: 'f_panic', name: 'Panic Room Subwoofer', icon: '🔊', kind: 'meter', cost: 5e7,
    desc: 'Freak Outs last 5 seconds longer.',
    req: (s) => s.era >= 2 && s.stats.freakOuts >= 5,
    apply: (m) => { m.freakOutDuration += 5; },
  },
  {
    id: 'f_adrenal', name: 'Adrenal Overclock', icon: '💉', kind: 'meter', cost: 6e11,
    desc: 'Freak Outs multiply pokes by ×4 instead of ×3, and production by ×3 instead of ×2.',
    req: (s) => s.era >= 4,
    apply: (m) => { m.freakOutClickMult += 1; m.freakOutGpsMult += 1; },
  },

  // Weak spots
  {
    id: 'w_anatomy', name: 'Anatomy Textbook', icon: '📖', kind: 'weak', cost: 300,
    desc: 'Reveals glowing weak spots on the Freakmoji. Poke them for a guaranteed crit at ×2.',
    req: (s) => s.runClicks >= 60,
    apply: (m) => { m.weakSpots = true; },
  },
  {
    id: 'w_phd', name: 'Freakology PhD', icon: '🎓', kind: 'weak', cost: 8e5,
    desc: 'Weak spots are worth ×4 instead of ×2 and appear more often.',
    req: (s) => s.stats.weakHits >= 20,
    apply: (m) => { m.weakSpotMult *= 2; m.weakSpotInterval *= 0.75; },
  },
  {
    id: 'w_xray', name: 'X-Ray Goggles', icon: '🥽', kind: 'weak', cost: 5e10,
    desc: 'Weak spots are worth twice as much again.',
    req: (s) => s.era >= 4 && s.stats.weakHits >= 100,
    apply: (m) => { m.weakSpotMult *= 2; },
  },

  // Golden Freakmojis
  {
    id: 'g_lure', name: 'Shiny Lure', icon: '🪝', kind: 'golden', cost: 5e4,
    desc: 'Golden Freakmojis appear 25% more often.',
    req: (s) => s.stats.goldenCaught >= 1,
    apply: (m) => { m.goldenFreq *= 1.25; },
  },
  {
    id: 'g_leaf', name: 'Gold Leaf Gloves', icon: '🧤', kind: 'golden', cost: 2e8,
    desc: 'Golden Freakmojis linger twice as long.',
    req: (s) => s.stats.goldenCaught >= 5,
    apply: (m) => { m.goldenDuration *= 2; },
  },
  {
    id: 'g_midas', name: 'Midas Complex', icon: '👑', kind: 'golden', cost: 4e12,
    desc: 'Golden Freakmoji effects are 50% stronger.',
    req: (s) => s.stats.goldenCaught >= 15,
    apply: (m) => { m.goldenPower *= 1.5; },
  },

  // Synergies: tie early minions to later ones
  {
    id: 's_monkeyrock', name: 'Monkey See, Monkey Throw', icon: '🐒', kind: 'synergy', cost: 2.5e4,
    desc: 'Poke Monkeys +4% for each Rock Gorilla.',
    req: (s) => owned(s, 'monkey') >= 15 && owned(s, 'gorilla') >= 15,
    apply: (m, s) => { m.producerMult[PRODUCER_INDEX.monkey] *= 1 + 0.04 * owned(s, 'gorilla'); },
  },
  {
    id: 's_steamsiege', name: 'Steam-Powered Siege', icon: '♨️', kind: 'synergy', cost: 4e6,
    desc: 'Trebuchets +3% for each Steam Prodder; Steam Prodders +1% per Trebuchet.',
    req: (s) => owned(s, 'trebuchet') >= 15 && owned(s, 'steam') >= 15,
    apply: (m, s) => {
      m.producerMult[PRODUCER_INDEX.trebuchet] *= 1 + 0.03 * owned(s, 'steam');
      m.producerMult[PRODUCER_INDEX.steam] *= 1 + 0.01 * owned(s, 'trebuchet');
    },
  },
  {
    id: 's_mechknights', name: 'Mecha-Knights', icon: '🤖', kind: 'synergy', cost: 6e8,
    desc: 'Jousting Knights +3% for each Slap Factory; Slap Factories +1% per Knight.',
    req: (s) => owned(s, 'knight') >= 15 && owned(s, 'factory') >= 15,
    apply: (m, s) => {
      m.producerMult[PRODUCER_INDEX.knight] *= 1 + 0.03 * owned(s, 'factory');
      m.producerMult[PRODUCER_INDEX.factory] *= 1 + 0.01 * owned(s, 'knight');
    },
  },
  {
    id: 's_airsupport', name: 'Close Air Support', icon: '🛫', kind: 'synergy', cost: 4e10,
    desc: 'Auto-Turrets +3% for each Strafing Jet; Jets +1% per Turret.',
    req: (s) => owned(s, 'turret') >= 15 && owned(s, 'jet') >= 15,
    apply: (m, s) => {
      m.producerMult[PRODUCER_INDEX.turret] *= 1 + 0.03 * owned(s, 'jet');
      m.producerMult[PRODUCER_INDEX.jet] *= 1 + 0.01 * owned(s, 'turret');
    },
  },
  {
    id: 's_skynet', name: 'Skynet, But Polite', icon: '📡', kind: 'synergy', cost: 6e12,
    desc: 'Drone Swarms +3% per Orbital Laser; Orbital Lasers +1% per Drone Swarm.',
    req: (s) => owned(s, 'drone') >= 15 && owned(s, 'orbital') >= 15,
    apply: (m, s) => {
      m.producerMult[PRODUCER_INDEX.drone] *= 1 + 0.03 * owned(s, 'orbital');
      m.producerMult[PRODUCER_INDEX.orbital] *= 1 + 0.01 * owned(s, 'drone');
    },
  },
  {
    id: 's_tides', name: 'Tidal Spaghettification', icon: '🌊', kind: 'synergy', cost: 1e15,
    desc: 'Moon Cannons +3% per Black Hole Engine; Black Holes +1% per Moon Cannon.',
    req: (s) => owned(s, 'moon') >= 15 && owned(s, 'blackhole') >= 15,
    apply: (m, s) => {
      m.producerMult[PRODUCER_INDEX.moon] *= 1 + 0.03 * owned(s, 'blackhole');
      m.producerMult[PRODUCER_INDEX.blackhole] *= 1 + 0.01 * owned(s, 'moon');
    },
  },
  {
    id: 's_ouroboros', name: 'Print the Paradox', icon: '🔁', kind: 'synergy', cost: 2e17,
    desc: 'Reality Printers +3% per Paradox Engine; Paradox Engines +1% per Printer.',
    req: (s) => owned(s, 'printer') >= 15 && owned(s, 'paradox') >= 15,
    apply: (m, s) => {
      m.producerMult[PRODUCER_INDEX.printer] *= 1 + 0.03 * owned(s, 'paradox');
      m.producerMult[PRODUCER_INDEX.paradox] *= 1 + 0.01 * owned(s, 'printer');
    },
  },
  {
    id: 's_oldguard', name: 'The Old Guard', icon: '🎖️', kind: 'synergy', cost: 2e11,
    desc: 'Poke Monkeys and Rock Gorillas gain +1% for every minion you own.',
    req: (s) => s.era >= 4 && owned(s, 'monkey') >= 100,
    apply: (m, s) => {
      const total = PRODUCERS.reduce((a, p) => a + owned(s, p.id), 0);
      m.producerMult[PRODUCER_INDEX.monkey] *= 1 + 0.01 * total;
      m.producerMult[PRODUCER_INDEX.gorilla] *= 1 + 0.01 * total;
    },
  },

  // Era doctrines: a production boost when an era opens
  ...ERAS.slice(1).map((era, i) => ({
    id: `e_${era.id}`,
    name: ['Bronze Age Bravado', 'Steam & Screaming', 'Military-Industrial Complex', 'Cyber Psychosis', 'Cosmic Horror Grant', 'Post-Physics Funding'][i],
    icon: ['🛡️', '🚂', '🏢', '💾', '🔭', '🧿'][i],
    kind: 'global' as const,
    cost: era.threshold * 4,
    desc: `All gasps +25%. A gift from Era ${era.numeral}.`,
    req: (s: GameState) => s.era >= i + 1,
    apply: (m: Modifiers) => { m.globalMult *= 1.25; },
  })),
];

// ── Ability levels: four upgrades per ability, priced off its unlock era ──
const abilityUpgrades: UpgradeDef[] = ABILITIES.flatMap((a) =>
  Array.from({ length: MAX_ABILITY_LEVEL - 1 }, (_, i) => {
    const level = i + 2;
    const base = ERAS[a.unlockEra].threshold;
    return {
      id: `a_${a.id}_${level}`,
      name: `${a.name} ${['II', 'III', 'IV', 'V'][i]}`,
      icon: a.icon,
      kind: 'ability' as const,
      cost: base * 5 * Math.pow(40, i),
      desc: a.describe(level),
      req: (s: GameState) => s.era >= a.unlockEra && (level === 2 || s.upgrades[`a_${a.id}_${level - 1}`] === true),
      apply: (m: Modifiers) => {
        m.abilityLevels[a.id] = Math.max(m.abilityLevels[a.id] ?? 1, level);
      },
    };
  }),
);

export const UPGRADES: UpgradeDef[] = [...special, ...minionUpgrades, ...abilityUpgrades];

export const UPGRADE_BY_ID: Record<string, UpgradeDef> = Object.fromEntries(UPGRADES.map((u) => [u.id, u]));
