import { describe, expect, it } from 'vitest';
import {
  BACKUP_KEY,
  LEGACY_SCORES_KEY,
  SAVE_KEY,
  deserialize,
  elapsedSince,
  exportSave,
  importSave,
  loadGame,
  sanitize,
  saveGame,
  serialize,
  type KVStore,
} from '../src/sim/save';
import { Game } from '../src/sim/game';
import { createInitialState } from '../src/sim/state';

class MemStore implements KVStore {
  m = new Map<string, string>();
  getItem(k: string): string | null {
    return this.m.get(k) ?? null;
  }
  setItem(k: string, v: string): void {
    this.m.set(k, v);
  }
  removeItem(k: string): void {
    this.m.delete(k);
  }
}

function played(): Game {
  const g = new Game(createInitialState(5, 0));
  for (let i = 0; i < 300; i++) {
    g.poke({ dir: [0, 0, 1] });
    g.update(0.1);
    if (i % 30 === 0) g.buyProducer('monkey', 'max');
  }
  g.buyWeapon();
  return g;
}

describe('save round trip', () => {
  it('restores the persistent state exactly', () => {
    const g = played();
    const store = new MemStore();
    saveGame(store, g.state, 1000);
    const loaded = loadGame(store, 1000);
    expect(loaded.source).toBe('save');
    expect(loaded.warning).toBeNull();
    const s = loaded.state;
    expect(s.gasps).toBe(g.state.gasps);
    expect(s.producers).toEqual(g.state.producers);
    expect(s.weapon).toBe(g.state.weapon);
    expect(s.stats.clicks).toBe(g.state.stats.clicks);
    expect(s.rng).toBe(g.state.rng);
  });

  it('keeps the RNG so a reload cannot re-roll outcomes', () => {
    const g = played();
    const restored = new Game(deserialize(serialize(g.state), 0)!.state);
    const a = [g.poke(), g.poke(), g.poke()];
    const b = [restored.poke(), restored.poke(), restored.poke()];
    expect(b.map((v, i) => v > 0 && a[i] > 0)).toEqual([true, true, true]);
    expect(restored.state.rng).toBe(g.state.rng);
  });
});

describe('corruption handling', () => {
  it('falls back to the backup when the main save is garbage', () => {
    const store = new MemStore();
    const g = played();
    saveGame(store, g.state, 1);
    saveGame(store, { ...g.state, gasps: g.state.gasps + 1 }, 2);
    store.setItem(SAVE_KEY, '{"v":2,"data":{"gasps":');
    const r = loadGame(store, 3);
    expect(r.source).toBe('backup');
    expect(r.warning).toMatch(/backup/);
    expect(r.state.gasps).toBe(g.state.gasps);
  });

  it('starts fresh with a warning when nothing is readable', () => {
    const store = new MemStore();
    store.setItem(SAVE_KEY, 'not json at all');
    store.setItem(BACKUP_KEY, '💥');
    const r = loadGame(store, 0);
    expect(r.source).toBe('new');
    expect(r.warning).toMatch(/new game/);
  });

  it('repairs a tampered save and flags it', () => {
    const store = new MemStore();
    const g = played();
    const text = serialize(g.state, 0).replace(/"gasps":[0-9.e+]+/, '"gasps":123');
    store.setItem(SAVE_KEY, text);
    const r = loadGame(store, 0);
    expect(r.warning).toMatch(/integrity/);
    expect(r.state.gasps).toBe(123);
  });

  it('sanitizes NaN, negatives, unknown ids and out-of-range values', () => {
    const s = sanitize({
      gasps: 'lots',
      runGasps: -5,
      lifetimeGasps: Infinity,
      era: 99,
      weapon: 1e9,
      producers: { monkey: -3, gorilla: 2.7, dragon: 5 },
      upgrades: { c_knuckles: true, fake_upgrade: true, w_anatomy: 'yes' },
      paranoia: NaN,
      stats: { clicks: -1, crits: 1e400 },
    });
    expect(s.gasps).toBe(0);
    expect(s.runGasps).toBe(0);
    expect(Number.isFinite(s.lifetimeGasps)).toBe(true);
    expect(s.era).toBe(6);
    expect(s.weapon).toBe(39);
    expect(s.producers.monkey).toBe(0);
    expect(s.producers.gorilla).toBe(2);
    expect('dragon' in s.producers).toBe(false);
    expect(s.upgrades).toEqual({ c_knuckles: true });
    expect(s.paranoia).toBe(0);
    expect(Number.isFinite(s.stats.crits)).toBe(true);
  });

  it('refuses saves from a newer version instead of corrupting them', () => {
    expect(deserialize('{"v":99,"t":0,"sum":"x","data":{}}')).toBeNull();
  });
});

describe('legacy high scores', () => {
  it('imports the original game’s table and leaves the old key alone', () => {
    const store = new MemStore();
    const legacy = JSON.stringify([{ name: 'Noah', score: 4200, clicks: 900 }, { name: 'X', score: 'bad', clicks: 1 }]);
    store.setItem(LEGACY_SCORES_KEY, legacy);
    const r = loadGame(store, 0);
    expect(r.state.legacyScores[0]).toEqual({ name: 'Noah', score: 4200, clicks: 900 });
    expect(r.state.legacyScores[1].score).toBe(0);
    expect(store.getItem(LEGACY_SCORES_KEY)).toBe(legacy);
  });
});

describe('export / import', () => {
  it('round-trips through portable text and rejects junk', () => {
    const g = played();
    const text = exportSave(g.state, 0);
    expect(text.startsWith('FREAK2:')).toBe(true);
    expect(importSave(text, 0)!.gasps).toBe(g.state.gasps);
    expect(importSave('FREAK2:%%%%', 0)).toBeNull();
    expect(importSave('hello', 0)).toBeNull();
  });
});

describe('offline progress', () => {
  it('pays production at the offline efficiency, capped', () => {
    const g = new Game(createInitialState(1, 0));
    g.state.producers.gorilla = 100;
    g.refresh();
    const gps = g.gpsBase;
    const r = g.applyOffline(10 * 3600);
    expect(r.credited).toBe(2 * 3600);
    expect(r.gained).toBeCloseTo(gps * 2 * 3600 * 0.25);
    expect(g.state.gasps).toBeCloseTo(r.gained);
  });

  it('ignores clock rollback and sub-second gaps', () => {
    expect(elapsedSince(10_000, 5_000)).toBe(0);
    expect(elapsedSince(NaN, 5_000)).toBe(0);
    const g = new Game(createInitialState(1, 0));
    g.state.producers.gorilla = 10;
    g.refresh();
    expect(g.applyOffline(0.5).gained).toBe(0);
  });

  it('does not duplicate rewards across save/reload cycles', () => {
    const store = new MemStore();
    const g = new Game(createInitialState(1, 0));
    g.state.producers.gorilla = 100;
    g.refresh();
    saveGame(store, g.state, 1_000_000);
    // Reload immediately, several times.
    let total = 0;
    for (let i = 0; i < 5; i++) {
      const r = loadGame(store, 1_000_000);
      const g2 = new Game(r.state);
      const rep = g2.applyOffline(elapsedSince(r.state.lastSeen, 1_000_000));
      total += rep.gained;
      saveGame(store, g2.state, 1_000_000);
    }
    expect(total).toBe(0);
  });

  it('abandons an in-progress boss instead of letting offline time win it', () => {
    const g = new Game(createInitialState(1, 0));
    g.state.runGasps = 1e9;
    g.startBoss();
    g.state.producers.gorilla = 1e5;
    g.refresh();
    g.applyOffline(3600);
    expect(g.state.boss).toBeNull();
    expect(g.state.era).toBe(0);
  });
});
