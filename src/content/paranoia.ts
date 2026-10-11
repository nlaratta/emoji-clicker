import type { Modifiers } from '../sim/modifiers';

/**
 * Collapsing a timeline wipes the run, but the Freakmoji keeps its fear.
 * Paranoia is the prestige currency. Every UNSPENT point gives +3% to all
 * gasps; spending points buys permanent nodes that change how you play.
 * Nodes can only be refunded at the moment of collapse, so each timeline
 * commits to a build: Twitchy (active), Brooding (idle) or Unhinged (chaos).
 */
export type Branch = 'root' | 'twitchy' | 'brooding' | 'unhinged' | 'capstone';

export interface NodeDef {
  id: string;
  name: string;
  icon: string;
  branch: Branch;
  tier: number;
  cost: number;
  requires: string[];
  desc: string;
  apply: (m: Modifiers) => void;
}

export const UNSPENT_BONUS = 0.03;
/** Lifetime gasps at which the first Paranoia point is earned. */
export const PARANOIA_BASE = 1e8;

export const NODES: NodeDef[] = [
  {
    id: 'dejavu', name: 'Déjà Vu', icon: '👁️', branch: 'root', tier: 0, cost: 1, requires: [],
    desc: 'Start every timeline with Bare Fists and 10 Poke Monkeys. Golden Freakmojis +10% frequency.',
    apply: (m) => { m.startKit = true; m.goldenFreq *= 1.1; },
  },

  // Twitchy: rewards fast, accurate, sustained clicking
  {
    id: 't_trigger', name: 'Itchy Trigger Finger', icon: '👆', branch: 'twitchy', tier: 1, cost: 2, requires: ['dejavu'],
    desc: 'Combo window +0.5s. Full-combo bonus +0.5.',
    apply: (m) => { m.comboWindow += 0.5; m.comboBonus += 0.5; },
  },
  {
    id: 't_tic', name: 'Nervous Tic', icon: '⚡', branch: 'twitchy', tier: 2, cost: 5, requires: ['t_trigger'],
    desc: '+5% critical chance. Crits ×4 harder.',
    apply: (m) => { m.critChance += 0.05; m.critMult += 4; },
  },
  {
    id: 't_vigil', name: 'Hypervigilance', icon: '🎯', branch: 'twitchy', tier: 3, cost: 15, requires: ['t_tic'],
    desc: 'Weak spots appear twice as often and are worth twice as much. Unlocks them from the start.',
    apply: (m) => { m.weakSpots = true; m.weakSpotInterval *= 0.5; m.weakSpotMult *= 2; },
  },
  {
    id: 't_flight', name: 'Fight or Flight', icon: '💓', branch: 'twitchy', tier: 4, cost: 40, requires: ['t_vigil'],
    desc: 'The Freak-O-Meter fills 40% faster and Freak Outs last 50% longer.',
    apply: (m) => { m.meterFill *= 1.4; m.freakOutDuration *= 1.5; },
  },
  {
    id: 't_hair', name: 'Hair Trigger', icon: '🧨', branch: 'twitchy', tier: 5, cost: 100, requires: ['t_flight'],
    desc: 'Full-combo bonus +1 and pokes add +3% of production.',
    apply: (m) => { m.comboBonus += 1; m.clickGpsFrac += 0.03; },
  },

  // Brooding: rewards leaving it alone
  {
    id: 'b_sweats', name: 'Night Sweats', icon: '🌙', branch: 'brooding', tier: 1, cost: 2, requires: ['dejavu'],
    desc: 'Offline progress 25% → 60% efficient, cap 2h → 8h.',
    apply: (m) => { m.offlineEff = Math.max(m.offlineEff, 0.6); m.offlineCap = Math.max(m.offlineCap, 8 * 3600); },
  },
  {
    id: 'b_memory', name: 'Muscle Memory', icon: '🧠', branch: 'brooding', tier: 2, cost: 5, requires: ['b_sweats'],
    desc: 'Minions cost 12% less.',
    apply: (m) => { m.producerCostMult *= 0.88; },
  },
  {
    id: 'b_overthink', name: 'Overthinking', icon: '🌀', branch: 'brooding', tier: 3, cost: 15, requires: ['b_memory'],
    desc: 'Production +2% for every 10 seconds since your last poke (up to +300%). Poking resets it.',
    apply: (m) => { m.overthinking = true; },
  },
  {
    id: 'b_insomnia', name: 'Insomnia', icon: '🦉', branch: 'brooding', tier: 4, cost: 40, requires: ['b_overthink'],
    desc: 'Offline progress is 100% efficient for up to 24 hours. Production ×1.5.',
    apply: (m) => { m.offlineEff = 1; m.offlineCap = 24 * 3600; m.gpsMult *= 1.5; },
  },
  {
    id: 'b_delegate', name: 'Delegation', icon: '📋', branch: 'brooding', tier: 5, cost: 100, requires: ['b_insomnia'],
    desc: 'Minion milestone upgrades triple output instead of doubling it.',
    apply: (m) => { m.milestoneMult = 3; },
  },

  // Unhinged: luck, golden Freakmojis and abilities
  {
    id: 'u_charm', name: 'Lucky Charm', icon: '🍀', branch: 'unhinged', tier: 1, cost: 2, requires: ['dejavu'],
    desc: 'Golden Freakmojis appear 35% more often and linger 50% longer.',
    apply: (m) => { m.goldenFreq *= 1.35; m.goldenDuration *= 1.5; },
  },
  {
    id: 'u_fuse', name: 'Short Fuse', icon: '⏲️', branch: 'unhinged', tier: 2, cost: 5, requires: ['u_charm'],
    desc: 'Ability cooldowns −25%.',
    apply: (m) => { m.abilityCooldown *= 0.75; },
  },
  {
    id: 'u_bleed', name: 'Timeline Bleed', icon: '🩸', branch: 'unhinged', tier: 3, cost: 15, requires: ['u_fuse'],
    desc: 'Start every timeline in Era II, skipping the Stone Age.',
    apply: (m) => { m.startEra = Math.max(m.startEra, 1); },
  },
  {
    id: 'u_midas', name: 'Golden Touch', icon: '✨', branch: 'unhinged', tier: 4, cost: 40, requires: ['u_bleed'],
    desc: 'Golden Freakmoji effects ×2. Time Warp collects double.',
    apply: (m) => { m.goldenPower *= 2; m.timeWarpMult *= 2; },
  },
  {
    id: 'u_slip', name: 'Reality Slip', icon: '🕳️', branch: 'unhinged', tier: 5, cost: 100, requires: ['u_midas'],
    desc: 'Start every timeline in Era III. Ability cooldowns −25% more.',
    apply: (m) => { m.startEra = Math.max(m.startEra, 2); m.abilityCooldown *= 0.75; },
  },

  {
    id: 'cap_dread', name: 'Transcendent Dread', icon: '😱', branch: 'capstone', tier: 6, cost: 400,
    requires: ['t_hair', 'b_delegate', 'u_slip'],
    desc: 'Master every fear. All gasps ×4.',
    apply: (m) => { m.globalMult *= 4; },
  },
];

export const NODE_BY_ID: Record<string, NodeDef> = Object.fromEntries(NODES.map((n) => [n.id, n]));
