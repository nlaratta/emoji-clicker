import { safe } from '../core/math';
import { PRODUCERS } from '../content/producers';
import { WEAPONS } from '../content/weapons';
import { ERAS } from '../content/eras';
import { UPGRADE_BY_ID } from '../content/upgrades';
import { NODE_BY_ID } from '../content/paranoia';
import { ACHIEVEMENT_BY_ID } from '../content/achievements';
import { createInitialState, emptyStats, SAVE_VERSION, type GameState, type LegacyScore, type RunRecord } from './state';

/**
 * Save format: a JSON envelope { v, t, sum, data }. Loading never trusts the
 * payload: every field is re-validated against the current content tables,
 * so old, hand-edited or half-corrupted saves load as sanely as possible
 * instead of crashing or poisoning the economy with NaN.
 */
export const SAVE_KEY = 'freakmoji.save';
export const BACKUP_KEY = 'freakmoji.save.bak';
/** The original game's high-score table. Read, never deleted. */
export const LEGACY_SCORES_KEY = 'highScores';

export interface KVStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

interface Envelope {
  v: number;
  t: number;
  sum: string;
  data: unknown;
}

function hash(str: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}

export function serialize(state: GameState, now = Date.now()): string {
  const data = JSON.stringify(state);
  return `{"v":${SAVE_VERSION},"t":${now},"sum":"${hash(data)}","data":${data}}`;
}

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => typeof v === 'object' && v !== null && !Array.isArray(v);
const num = (v: unknown, fallback = 0): number => (typeof v === 'number' && Number.isFinite(v) ? v : fallback);
const pos = (v: unknown, fallback = 0): number => safe(num(v, fallback));
const int = (v: unknown, lo: number, hi: number, fallback: number): number => {
  const n = Math.floor(num(v, fallback));
  return n < lo ? lo : n > hi ? hi : n;
};
const flags = (v: unknown, known: Record<string, unknown>): Record<string, true> => {
  const out: Record<string, true> = {};
  if (isObj(v)) for (const k of Object.keys(v)) if (v[k] === true && k in known) out[k] = true;
  return out;
};

/** Upgrade old save shapes to the current version before sanitising. */
export function migrate(data: Obj, fromVersion: number): Obj {
  const d = { ...data };
  if (fromVersion < 2) {
    // Version 1 never persisted a game, only high scores; nothing to carry.
  }
  return d;
}

/** Rebuild a valid GameState from untrusted data. */
export function sanitize(raw: unknown, now = Date.now()): GameState {
  const base = createInitialState(undefined, now);
  if (!isObj(raw)) return base;
  const s = base;

  s.rng = (num(raw.rng, s.rng) >>> 0) || s.rng;
  s.time = pos(raw.time);
  s.totalTime = pos(raw.totalTime, s.time);
  s.gasps = pos(raw.gasps);
  s.runGasps = Math.max(pos(raw.runGasps), 0);
  s.lifetimeGasps = Math.max(pos(raw.lifetimeGasps), s.runGasps);
  s.era = int(raw.era, 0, ERAS.length - 1, 0);
  s.weapon = int(raw.weapon, -1, WEAPONS.length - 1, -1);

  if (isObj(raw.producers)) {
    for (const p of PRODUCERS) s.producers[p.id] = int(raw.producers[p.id], 0, 1e6, 0);
  }
  s.upgrades = flags(raw.upgrades, UPGRADE_BY_ID);
  s.nodes = flags(raw.nodes, NODE_BY_ID);
  s.achievements = flags(raw.achievements, ACHIEVEMENT_BY_ID);

  // Temporary combat state is not restored across sessions: buffs lapse,
  // bosses are abandoned. Cooldowns survive (relative to sim time).
  if (isObj(raw.abilityCooldowns)) {
    for (const [k, v] of Object.entries(raw.abilityCooldowns)) {
      if (['haymaker', 'rally', 'flurry', 'timewarp', 'singularity'].includes(k)) {
        s.abilityCooldowns[k] = Math.min(pos(v), s.time + 3600);
      }
    }
  }
  s.buffs = [];
  s.boss = null;
  s.charge = null;
  s.golden = null;
  s.weakSpot = null;
  s.freakOutEnd = 0;
  s.streak = 0;
  s.lastClickAt = s.time - 10;
  s.lastManualAt = Math.min(num(raw.lastManualAt, s.time - 10), s.time);
  s.nextGoldenAt = s.time + 30;
  s.nextWeakSpotAt = s.time + 5;
  s.bossRetryAt = 0;
  s.freakMeter = Math.min(1, pos(raw.freakMeter));
  s.runClicks = int(raw.runClicks, 0, 1e12, 0);
  s.victory = raw.victory === true;

  s.paranoia = int(raw.paranoia, 0, 1e15, 0);
  s.paranoiaEarned = Math.max(int(raw.paranoiaEarned, 0, 1e15, 0), s.paranoia);
  s.timelines = int(raw.timelines, 0, 1e9, 0);

  const st = emptyStats();
  if (isObj(raw.stats)) {
    for (const k of Object.keys(st) as (keyof typeof st)[]) st[k] = pos(raw.stats[k]);
  }
  s.stats = st;
  if (isObj(raw.runStats)) {
    s.runStats = { clicks: pos(raw.runStats.clicks), startedAt: num(raw.runStats.startedAt, now) };
  }

  if (Array.isArray(raw.records)) {
    s.records = raw.records
      .filter(isObj)
      .slice(0, 10)
      .map(
        (r): RunRecord => ({
          timeline: int(r.timeline, 0, 1e9, 0),
          gasps: pos(r.gasps),
          era: int(r.era, 0, ERAS.length - 1, 0),
          victory: r.victory === true,
          duration: pos(r.duration),
          endedAt: num(r.endedAt, now),
        }),
      );
  }
  s.legacyScores = sanitizeLegacy(raw.legacyScores);
  s.lastSeen = num(raw.lastSeen, now);
  s.version = SAVE_VERSION;
  return s;
}

export function sanitizeLegacy(v: unknown): LegacyScore[] {
  if (!Array.isArray(v)) return [];
  return v
    .filter(isObj)
    .slice(0, 10)
    .map((e) => ({
      name: String(e.name ?? 'Anonymous').slice(0, 16),
      score: pos(e.score),
      clicks: int(e.clicks, 0, 1e12, 0),
    }));
}

/** Parse a serialized save. Returns null when the payload is unusable. */
export function deserialize(text: string | null, now = Date.now()): { state: GameState; savedAt: number; intact: boolean } | null {
  if (!text) return null;
  let env: unknown;
  try {
    env = JSON.parse(text);
  } catch {
    return null;
  }
  if (!isObj(env) || !isObj((env as unknown as Envelope).data)) return null;
  const e = env as unknown as Envelope;
  const v = num(e.v, 0);
  if (v > SAVE_VERSION) return null; // From a newer build; refuse rather than corrupt it.
  const intact = typeof e.sum === 'string' && hash(JSON.stringify(e.data)) === e.sum;
  const data = migrate(e.data as Obj, v);
  const state = sanitize(data, now);
  return { state, savedAt: num(e.t, state.lastSeen), intact };
}

export interface LoadResult {
  state: GameState;
  source: 'save' | 'backup' | 'new';
  warning: string | null;
}

export function loadGame(store: KVStore, now = Date.now()): LoadResult {
  let main: ReturnType<typeof deserialize> = null;
  let backup: ReturnType<typeof deserialize> = null;
  try {
    main = deserialize(store.getItem(SAVE_KEY), now);
    if (!main || !main.intact) backup = deserialize(store.getItem(BACKUP_KEY), now);
  } catch {
    /* storage unavailable */
  }
  let result: LoadResult;
  if (main && main.intact) result = { state: main.state, source: 'save', warning: null };
  else if (backup && backup.intact) {
    result = { state: backup.state, source: 'backup', warning: 'Your save looked damaged, so the backup was restored.' };
  } else if (main) {
    result = { state: main.state, source: 'save', warning: 'Your save failed its integrity check; it was repaired as best as possible.' };
  } else {
    const hadSomething = safeGet(store, SAVE_KEY) !== null;
    result = {
      state: createInitialState(undefined, now),
      source: 'new',
      warning: hadSomething ? 'Your save could not be read, so a new game was started.' : null,
    };
  }
  if (result.state.legacyScores.length === 0) {
    try {
      const legacy = store.getItem(LEGACY_SCORES_KEY);
      if (legacy) result.state.legacyScores = sanitizeLegacy(JSON.parse(legacy));
    } catch {
      /* ignore malformed legacy scores */
    }
  }
  return result;
}

function safeGet(store: KVStore, key: string): string | null {
  try {
    return store.getItem(key);
  } catch {
    return null;
  }
}

/** Write the save, rotating the previous one into the backup slot. */
export function saveGame(store: KVStore, state: GameState, now = Date.now()): boolean {
  try {
    state.lastSeen = now;
    const text = serialize(state, now);
    const prev = store.getItem(SAVE_KEY);
    if (prev && prev !== text) store.setItem(BACKUP_KEY, prev);
    store.setItem(SAVE_KEY, text);
    return true;
  } catch {
    return false;
  }
}

export function wipeSave(store: KVStore): void {
  try {
    store.removeItem(SAVE_KEY);
    store.removeItem(BACKUP_KEY);
  } catch {
    /* ignore */
  }
}

// ── Export / import (portable text) ──

export function exportSave(state: GameState, now = Date.now()): string {
  const bytes = new TextEncoder().encode(serialize(state, now));
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return 'FREAK2:' + btoa(bin);
}

export function importSave(text: string, now = Date.now()): GameState | null {
  const t = text.trim();
  if (!t.startsWith('FREAK2:')) return null;
  try {
    const bin = atob(t.slice(7));
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    const parsed = deserialize(new TextDecoder().decode(bytes), now);
    return parsed ? parsed.state : null;
  } catch {
    return null;
  }
}

/** Seconds since the save was last written, clamped against clock changes. */
export function elapsedSince(lastSeen: number, now = Date.now()): number {
  const d = (now - lastSeen) / 1000;
  return Number.isFinite(d) && d > 0 ? d : 0;
}
