/**
 * Eras are the spine of a timeline. Each era after the first is gated twice:
 * first by lifetime-of-timeline gasps (`threshold`), then by a "Composure"
 * boss: the Freakmoji tries very hard to keep it together and you have
 * `boss.duration` seconds to shatter that composure with raw gasp output.
 */
export interface BossDef {
  name: string;
  /** Composure HP: gasps that must be earned during the fight window. */
  hp: number;
  duration: number;
  taunt: string;
  /** Shell look used by the renderer. */
  shell: 'stone' | 'iron' | 'brass' | 'kevlar' | 'energy' | 'void' | 'zen';
}

export interface EraDef {
  id: string;
  numeral: string;
  name: string;
  tagline: string;
  /** runGasps required before the gate boss can be challenged. */
  threshold: number;
  /** The boss guarding the way INTO this era (null for the first era). */
  boss: BossDef | null;
}

export const ERAS: EraDef[] = [
  {
    id: 'primitive',
    numeral: 'I',
    name: 'The Stone Age of Poking',
    tagline: 'Ooga. Booga. Boop.',
    threshold: 0,
    boss: null,
  },
  {
    id: 'medieval',
    numeral: 'II',
    name: 'The Middle Ages of Mild Peril',
    tagline: 'Thou hast startled the orb.',
    threshold: 15_000,
    boss: {
      name: 'Stoic Stoneface',
      hp: 3_000,
      duration: 30,
      taunt: 'It has turned to stone out of sheer stubbornness.',
      shell: 'stone',
    },
  },
  {
    id: 'industrial',
    numeral: 'III',
    name: 'The Freakdustrial Revolution',
    tagline: 'Gasps, now mass-produced.',
    threshold: 6e5,
    boss: {
      name: 'Sir Composure the Unflinching',
      hp: 1.2e5,
      duration: 30,
      taunt: 'Full plate armour. Fuller denial.',
      shell: 'iron',
    },
  },
  {
    id: 'modern',
    numeral: 'IV',
    name: 'Shock & Awe',
    tagline: 'Now with surround-sound peril.',
    threshold: 2e8,
    boss: {
      name: 'The Clockwork Calm',
      hp: 4e7,
      duration: 30,
      taunt: 'A brass exoskeleton of total serenity. Tick. Tock.',
      shell: 'brass',
    },
  },
  {
    id: 'future',
    numeral: 'V',
    name: 'Neon Overdrive',
    tagline: 'The future is bright and deeply alarming.',
    threshold: 8e10,
    boss: {
      name: 'Poker Face Prime',
      hp: 1.6e10,
      duration: 30,
      taunt: 'Riot shield. Sunglasses. Zero reaction.',
      shell: 'kevlar',
    },
  },
  {
    id: 'cosmic',
    numeral: 'VI',
    name: 'Space Is Freaking Out',
    tagline: 'In space, everyone can hear you gasp.',
    threshold: 5e13,
    boss: {
      name: 'Z.E.N. Mainframe',
      hp: 7e12,
      duration: 30,
      taunt: 'A hard-light shield running meditation.exe.',
      shell: 'energy',
    },
  },
  {
    id: 'reality',
    numeral: 'VII',
    name: 'Reality Has Left the Chat',
    tagline: 'Physics was a suggestion.',
    threshold: 4e16,
    boss: {
      name: 'The Unbothered Void',
      hp: 6e15,
      duration: 30,
      taunt: 'It has achieved the calm of deep space. Ruin it.',
      shell: 'void',
    },
  },
];

/** The last fight: beating it "breaks reality" and completes the timeline. */
export const FINAL_BOSS: BossDef & { threshold: number } = {
  name: 'The Composed One',
  threshold: 4e19,
  hp: 8e18,
  duration: 40,
  taunt: 'Perfect zen. Total serenity. Absolutely unacceptable.',
  shell: 'zen',
};

export const ERA_COUNT = ERAS.length;
