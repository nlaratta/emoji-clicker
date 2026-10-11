import type { EraKit } from '../eraKit';
import type { PropContext } from '../eraProps';
import { stoneAge } from './stone';
import { middleAges } from './medieval';
import { freakdustrial } from './industrial';

/**
 * Era scripts bring a kit to life: practical lights, fire and smoke,
 * wildlife and machinery. They read named anchors and `anim` nodes from the
 * kit and never touch game state.
 */
export interface EraScript {
  /** `presence` is 0–1 while the era sweeps in or out. */
  update(dt: number, t: number, presence: number): void;
}

const SCRIPTS: Record<number, (kit: EraKit, ctx: PropContext) => EraScript> = {
  0: stoneAge,
  1: middleAges,
  2: freakdustrial,
};

export function attachEraScript(era: number, kit: EraKit, ctx: PropContext): EraScript | null {
  const make = SCRIPTS[era];
  return make ? make(kit, ctx) : null;
}
