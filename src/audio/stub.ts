// TEMPORARY no-op stand-in until src/audio/engine.ts lands. Delete afterwards.
import type { GameEvent } from '../sim/events';
import type { Game } from '../sim/game';
export type UiSound = 'hover' | 'click' | 'tab' | 'deny' | 'toggle' | 'open' | 'close';
export interface Volumes { master: number; sfx: number; music: number; muted: boolean }
export class AudioEngine {
  readonly ready = false;
  unlock(): void {}
  setVolumes(_v: Volumes): void {}
  handle(_e: readonly GameEvent[], _g: Game): void {}
  update(_dt: number, _g: Game): void {}
  ui(_k: UiSound): void {}
  suspend(): void {}
  resume(): void {}
}
