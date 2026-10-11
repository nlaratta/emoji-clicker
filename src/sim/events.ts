import type { AbilityId } from '../content/abilities';

export type HitRegion = 'face' | 'eye' | 'hand' | 'brow';
export type GoldenEffect = 'lucky' | 'frenzy' | 'storm' | 'freakout';

/**
 * One-shot notifications from the simulation. The renderer, audio and UI
 * consume these; none of them may change game state in response except by
 * calling Game methods.
 */
export type GameEvent =
  | {
      type: 'poke';
      value: number;
      crit: boolean;
      weak: boolean;
      streak: number;
      dir: readonly [number, number, number] | null;
      region: HitRegion;
      source: 'pointer' | 'key' | 'auto';
    }
  | { type: 'haymaker'; value: number; perfect: boolean; charge: number }
  | { type: 'chargeStart' }
  | { type: 'buyWeapon'; index: number }
  | { type: 'buyProducer'; id: string; amount: number }
  | { type: 'buyUpgrade'; id: string }
  | { type: 'buyNode'; id: string }
  | { type: 'freakOutStart'; duration: number }
  | { type: 'freakOutEnd' }
  | { type: 'weakSpot'; yaw: number; pitch: number }
  | { type: 'weakSpotEnd'; hit: boolean }
  | { type: 'goldenSpawn'; seed: number; duration: number }
  | { type: 'goldenCaught'; effect: GoldenEffect; value: number }
  | { type: 'goldenMissed' }
  | { type: 'ability'; id: AbilityId }
  | { type: 'abilityEnd'; id: AbilityId }
  | { type: 'gateReady'; era: number; final: boolean }
  | { type: 'bossStart'; era: number; final: boolean }
  | { type: 'bossWin'; era: number; final: boolean }
  | { type: 'bossFail'; era: number; final: boolean }
  | { type: 'eraChange'; from: number; to: number }
  | { type: 'achievement'; id: string }
  | { type: 'collapse'; gained: number; timeline: number }
  | { type: 'denied'; reason: string };
