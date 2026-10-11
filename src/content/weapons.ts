import { niceRound } from '../core/math';
import { ERAS, FINAL_BOSS } from './eras';

/**
 * The Arsenal: the original 40-tier ladder, now spread across eras and
 * priced by a formula so every tier has a defined, finite cost.
 * Owning a weapon equips it; its damage is the base value of every poke,
 * and its `family` decides how the hit looks and sounds.
 */
export type WeaponFamily =
  | 'blunt'
  | 'blade'
  | 'arrow'
  | 'bullet'
  | 'explosive'
  | 'fire'
  | 'energy'
  | 'cosmic'
  | 'reality';

export interface WeaponDef {
  index: number;
  name: string;
  emoji: string;
  era: number;
  family: WeaponFamily;
  flavor: string;
  cost: number;
  damage: number;
}

type RawWeapon = [name: string, emoji: string, era: number, family: WeaponFamily, flavor: string];

const RAW: RawWeapon[] = [
  ['Bare Fists', '👊', 0, 'blunt', 'Classic. Organic. Knuckly.'],
  ['Wooden Stick', '🪵', 0, 'blunt', 'Found it. Poked it. History was made.'],
  ['Sharp Rock', '🪨', 0, 'blunt', 'Like a rock, but with ambition.'],
  ['Bone Club', '🦴', 0, 'blunt', 'Previously owned by a mammoth.'],
  ['Stone Axe', '🪓', 0, 'blade', 'The first tool with a warranty (void if used).'],
  ['Bronze Dagger', '🗡️', 1, 'blade', 'Pointy end goes toward the emoji.'],
  ['Iron Sword', '⚔️', 1, 'blade', 'Forged in fire. Swung in mild confusion.'],
  ['Longbow', '🏹', 1, 'arrow', 'Range: yes.'],
  ['Crossbow', '🎯', 1, 'arrow', 'A longbow that went to engineering school.'],
  ['Flintlock Pistol', '🔫', 2, 'bullet', 'Reload time: one (1) brisk walk.'],
  ['Musket', '💨', 2, 'bullet', 'Mostly smoke. Partly bullet.'],
  ['Revolver', '🤠', 2, 'bullet', 'Six shots. Six gasps.'],
  ['Gatling Gun', '⚙️', 2, 'bullet', 'Crank it like you mean it.'],
  ['Dynamite', '🧨', 2, 'explosive', 'Mr. Nobel would like a word.'],
  ['Hand Grenade', '💣', 3, 'explosive', 'Count to three. Not five. Three.'],
  ['Machine Gun', '🔩', 3, 'bullet', 'Brrrrrrrrrrrrrrrrrt.'],
  ['Flamethrower', '🔥', 3, 'fire', 'Toasty.'],
  ['Bazooka', '🎺', 3, 'explosive', 'Shoulder-mounted surprise delivery.'],
  ['Land Mine', '💥', 3, 'explosive', 'The Freakmoji does not walk. It still works.'],
  ['Tank', '🛡️', 3, 'explosive', 'Sixty tons of “boo!”.'],
  ['Fighter Plane', '✈️', 3, 'bullet', 'Strafes the emoji at Mach 2.'],
  ['Bomber Aircraft', '🛩️', 3, 'explosive', 'Carpet-gasping.'],
  ['Guided Missile', '🚀', 3, 'explosive', 'It knows where the emoji is. Because it knows where it isn’t.'],
  ['Nuclear Warhead', '☢️', 4, 'explosive', 'Splits atoms. Splits sides.'],
  ['Hydrogen Bomb', '🎇', 4, 'explosive', 'The nuke’s louder sibling.'],
  ['Orbital Satellite', '🛰️', 4, 'energy', 'Pokes from orbit. Very passive-aggressive.'],
  ['Laser Cannon', '🔴', 4, 'energy', 'Pew, but industrial.'],
  ['Plasma Rifle', '🟣', 4, 'energy', 'The fourth state of matter: alarming.'],
  ['Railgun', '⚡', 4, 'energy', 'Magnets. Lots of magnets.'],
  ['Particle Beam', '✨', 4, 'energy', 'Sparkly. Also catastrophic.'],
  ['Antimatter Bomb', '⚛️', 5, 'cosmic', 'Matter’s evil twin, now in bomb form.'],
  ['Gravity Manipulator', '🧲', 5, 'cosmic', 'Makes the emoji fall in every direction.'],
  ['Time Distortion Field', '⏳', 5, 'cosmic', 'Pokes it last Tuesday.'],
  ['Nanite Swarm', '🦠', 5, 'cosmic', 'A billion microscopic pokes.'],
  ['Quantum Disruptor', '🎲', 5, 'cosmic', 'The emoji is both shocked and shocked.'],
  ['Dark Matter Projector', '🌑', 5, 'cosmic', 'You can’t see it. The Freakmoji can.'],
  ['Singularity Generator', '🕳️', 6, 'reality', 'A pocket black hole, conveniently aimed.'],
  ['Supernova Inducer', '🌟', 6, 'reality', 'Explodes a star. For the reaction.'],
  ['Reality Warper', '🌀', 6, 'reality', 'Rewrites the rules so the emoji gasps harder.'],
  ['Galaxy Destroyer', '🌌', 6, 'reality', 'The final poke. Probably.'],
];

/** Minimum damage multiplier between consecutive weapon tiers. */
export const WEAPON_GROWTH = 1.3;

/** The fist-free default: a single index finger. */
export const BASE_CLICK_DAMAGE = 1;

/** Era price windows, in runGasps. Weapons inside an era are spread evenly in log-space. */
function eraWindow(era: number): [number, number] {
  const lo = era === 0 ? 25 : ERAS[era].threshold * 1.5;
  const hi = era + 1 < ERAS.length ? ERAS[era + 1].threshold * 0.9 : FINAL_BOSS.threshold * 0.6;
  return [lo, hi];
}

/**
 * Price-to-damage ratio per era. A weapon's damage is its price divided by
 * this, so an actively clicking player recoups a weapon in roughly the same
 * time as the era's minions. Tuned with `pnpm balance` (see docs/balance.md).
 */
const PRICE_PER_DAMAGE = [800, 10_000, 150_000, 250_000, 2e6, 1.2e7, 2e8];

function buildWeapons(): WeaponDef[] {
  const perEra = new Map<number, number>();
  for (const w of RAW) perEra.set(w[2], (perEra.get(w[2]) ?? 0) + 1);
  const seen = new Map<number, number>();
  let prev = BASE_CLICK_DAMAGE;
  return RAW.map(([name, emoji, era, family, flavor], index) => {
    const k = seen.get(era) ?? 0;
    seen.set(era, k + 1);
    const n = perEra.get(era)!;
    const [lo, hi] = eraWindow(era);
    const t = n === 1 ? 0 : k / (n - 1);
    const cost = niceRound(lo * Math.pow(hi / lo, t), 2);
    // Every tier is a visible step up, even where the price ratio alone is small.
    const floor = prev < 20 ? Math.max(prev + 1, Math.ceil(prev * WEAPON_GROWTH)) : prev * WEAPON_GROWTH;
    const damage = niceRound(Math.max(floor, cost / PRICE_PER_DAMAGE[era]), 2);
    prev = damage;
    return { index, name, emoji, era, family, flavor, cost, damage };
  });
}

export const WEAPONS: WeaponDef[] = buildWeapons();

export function weaponDamage(index: number): number {
  return index < 0 ? BASE_CLICK_DAMAGE : WEAPONS[Math.min(index, WEAPONS.length - 1)].damage;
}

export function weaponFamily(index: number): WeaponFamily {
  return index < 0 ? 'blunt' : WEAPONS[Math.min(index, WEAPONS.length - 1)].family;
}
