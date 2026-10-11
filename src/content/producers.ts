/**
 * Minions: idle producers that bombard the Freakmoji on your behalf.
 * Cost of the n-th unit = baseCost × COST_GROWTH^n (classic incremental curve).
 * Each also has eight milestone upgrades (see upgrades.ts) that double output.
 */
export interface ProducerDef {
  id: string;
  name: string;
  emoji: string;
  era: number;
  baseCost: number;
  baseGps: number;
  flavor: string;
  /** Names for the eight ×2 milestone upgrades, in order. */
  tierNames: [string, string, string, string, string, string, string, string];
}

export const COST_GROWTH = 1.15;

export const PRODUCERS: ProducerDef[] = [
  {
    id: 'monkey',
    name: 'Poke Monkey',
    emoji: '🐒',
    era: 0,
    baseCost: 15,
    baseGps: 0.2,
    flavor: 'Has a stick. Has no other hobbies.',
    tierNames: [
      'Longer Sticks', 'Banana Incentives', 'Opposable Thumbs Seminar', 'Monkey Union Contract',
      'Infinite Monkey Theorem', 'Primate Poking Academy', 'Simian Singularity', 'Monkey Business Class',
    ],
  },
  {
    id: 'gorilla',
    name: 'Rock Gorilla',
    emoji: '🦍',
    era: 0,
    baseCost: 120,
    baseGps: 1.5,
    flavor: 'Throws rocks. Feelings unclear.',
    tierNames: [
      'Pointier Rocks', 'Throwing Lessons', 'Boulder Budget', 'Silverback Squats',
      'Avalanche Doctrine', 'Tectonic Pitchers', 'Planetary Pebbles', 'Igneous Intent',
    ],
  },
  {
    id: 'trebuchet',
    name: 'Trebuchet',
    emoji: '🏰',
    era: 1,
    baseCost: 1.3e3,
    baseGps: 9,
    flavor: 'Hurls a 90 kg projectile over 300 metres. Always at the same emoji.',
    tierNames: [
      'Counterweight Cardio', 'Flaming Payloads', 'Siege Engineering Guild', 'Cow Ammunition',
      'Double-Arm Design', 'Trebuchet Supremacy', 'Orbital Counterweight', 'Siege of Ages',
    ],
  },
  {
    id: 'knight',
    name: 'Jousting Knight',
    emoji: '🏇',
    era: 1,
    baseCost: 1.4e4,
    baseGps: 50,
    flavor: 'Charges at full gallop. Apologises afterwards.',
    tierNames: [
      'Pointier Lances', 'Faster Horses', 'Chivalry Is Dead', 'Holy Grail Subscription',
      'Round Table Roundhouse', 'Excalibur Prime', 'Knights Who Say “Boo”', 'Eternal Crusade',
    ],
  },
  {
    id: 'steam',
    name: 'Steam Prodder',
    emoji: '⚙️',
    era: 2,
    baseCost: 1.5e5,
    baseGps: 280,
    flavor: 'A piston on a stick. Whistles when it’s happy.',
    tierNames: [
      'Brass Fittings', 'High-Pressure Boilers', 'Coal Overtime', 'Pneumatic Panic',
      'Clockwork Precision', 'Steampunk Aesthetic', 'Perpetual Piston', 'Victorian Overdrive',
    ],
  },
  {
    id: 'factory',
    name: 'Slap Factory',
    emoji: '🏭',
    era: 2,
    baseCost: 1.7e6,
    baseGps: 1.5e3,
    flavor: 'Mass-produced slaps. Union-made.',
    tierNames: [
      'Assembly Line', 'Slap Quotas', 'Six Sigma Slapping', 'Lean Manufacturing',
      'Robotic Palms', 'Slap Automation 4.0', 'Megaslap Complex', 'Industrial Hand Revolution',
    ],
  },
  {
    id: 'turret',
    name: 'Auto-Turret',
    emoji: '🎯',
    era: 3,
    baseCost: 2.2e7,
    baseGps: 8.5e3,
    flavor: 'Never sleeps. Never misses. Never asks why.',
    tierNames: [
      'Laser Sights', 'Belt-Fed Ammo', 'Target Acquisition AI', 'Ricochet Rounds',
      'Sentry Swarm', 'Smart Bullets', 'Turret Mesh Network', 'Omni-Directional Annoyance',
    ],
  },
  {
    id: 'jet',
    name: 'Strafing Jet',
    emoji: '✈️',
    era: 3,
    baseCost: 3.5e8,
    baseGps: 4.8e4,
    flavor: 'Flybys hourly, on the hour. And every other second.',
    tierNames: [
      'Afterburners', 'Top Gun Training', 'Sonic Boom Etiquette', 'Stealth Coating',
      'Air Superiority', 'Hypersonic Wings', 'Skywriting Insults', 'Mach Freak',
    ],
  },
  {
    id: 'drone',
    name: 'Drone Swarm',
    emoji: '🛸',
    era: 4,
    baseCost: 5.5e9,
    baseGps: 2.8e5,
    flavor: 'Ten thousand tiny propellers of judgement.',
    tierNames: [
      'Hive Mind Firmware', 'Quadcopter Quorum', 'Swarm Logic', 'Micro-Drones',
      'Self-Replicating Units', 'Drone Rights Act', 'Cloud of Buzzing', 'The Buzz Eternal',
    ],
  },
  {
    id: 'orbital',
    name: 'Orbital Laser',
    emoji: '🛰️',
    era: 4,
    baseCost: 8e10,
    baseGps: 1.7e6,
    flavor: 'The gasps are visible from space.',
    tierNames: [
      'Focusing Lenses', 'Solar Sails', 'Low Orbit Insertion', 'Space Force Funding',
      'Death Star Lite', 'Constellation Array', 'Orbital Bombard-moji', 'Kessler Syndrome',
    ],
  },
  {
    id: 'moon',
    name: 'Moon Cannon',
    emoji: '🌕',
    era: 5,
    baseCost: 1.1e12,
    baseGps: 1.05e7,
    flavor: 'We hollowed out the moon. For this.',
    tierNames: [
      'Lunar Gunpowder', 'Crater Barrels', 'Tidal Recoil', 'Dark Side Arsenal',
      'Moon Moon', 'Werewolf Ammunition', 'Second Moon', 'Lunacy',
    ],
  },
  {
    id: 'blackhole',
    name: 'Black Hole Engine',
    emoji: '🕳️',
    era: 5,
    baseCost: 1.5e13,
    baseGps: 7e7,
    flavor: 'Spaghettifies doubt. And everything else.',
    tierNames: [
      'Event Horizon Glasses', 'Hawking Radiation', 'Accretion Disk Polish', 'Spaghettification',
      'Wormhole Shortcuts', 'Supermassive Upgrade', 'Information Paradox', 'Gravity Well-Being',
    ],
  },
  {
    id: 'printer',
    name: 'Reality Printer',
    emoji: '🖨️',
    era: 6,
    baseCost: 1.9e14,
    baseGps: 4.5e8,
    flavor: 'Prints fresh realities in which the Freakmoji is even more surprised.',
    tierNames: [
      'Infinite Toner', 'PC LOAD REALITY', 'Duplex Universes', 'Paper Jam Paradox',
      'Ink of Creation', 'Print Preview of God', 'Wireless Existence', 'Out of Cyan, Into Chaos',
    ],
  },
  {
    id: 'paradox',
    name: 'Paradox Engine',
    emoji: '♾️',
    era: 6,
    baseCost: 2.5e15,
    baseGps: 3e9,
    flavor: 'Shocks the Freakmoji yesterday, tomorrow, and in the timeline where it’s a cat.',
    tierNames: [
      'Grandfather Clause', 'Bootstrap Loop', 'Closed Timelike Curves', 'Butterfly Farms',
      'Retrocausal Pokes', 'Schrödinger’s Gasp', 'The Ouroboros', 'Before the Beginning',
    ],
  },
];

export const PRODUCER_INDEX: Record<string, number> = Object.fromEntries(
  PRODUCERS.map((p, i) => [p.id, i]),
);
