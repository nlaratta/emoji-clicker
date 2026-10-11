import './styles/main.css';
import { Game } from './sim/game';
import { elapsedSince, exportSave, importSave, loadGame, saveGame, wipeSave, type KVStore } from './sim/save';
import { loadSettings, saveSettings, type Settings } from './app/settings';
import { setNotation, fmt, fmtTime } from './core/format';
import { GameScene } from './render/scene';
import { FallbackScene } from './render/fallback';
import { AudioEngine } from './audio/engine';
import { Hud } from './ui/hud';
import { Shop } from './ui/shop';
import { Announcer, Toasts, openSettings, showEraCard, showTitle } from './ui/overlays';
import { h } from './ui/dom';
import { ABILITIES, ABILITY_BY_ID, type AbilityId } from './content/abilities';
import { ACHIEVEMENT_BY_ID } from './content/achievements';
import { ERAS, FINAL_BOSS } from './content/eras';
import type { GameEvent } from './sim/events';
import type { OfflineReport } from './sim/game';

/** Fixed simulation step (seconds). */
const STEP = 1 / 30;
const AUTOSAVE_EVERY = 10;

let resetting = false;
let hasLock = true;
let bossAbandoned = false;

const store: KVStore = {
  getItem: (k) => {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  setItem: (k, v) => {
    try {
      localStorage.setItem(k, v);
    } catch {
      /* quota or privacy mode */
    }
  },
  removeItem: (k) => {
    try {
      localStorage.removeItem(k);
    } catch {
      /* ignore */
    }
  },
};

// ── Settings & save ──
let settings: Settings = loadSettings();
setNotation(settings.notation);
const loaded = loadGame(store);
const game = new Game(loaded.state);
let offline: OfflineReport | null = null;
if (loaded.source !== 'new') {
  offline = game.applyOffline(elapsedSince(loaded.state.lastSeen));
  game.drainEvents();
}

// ── DOM ──
const canvas = h('canvas', { id: 'scene', 'aria-hidden': 'true' });
const overlayCanvas = h('canvas', { id: 'overlay', 'aria-hidden': 'true' });
const pokeButton = h('button', { class: 'poke-target', 'aria-label': 'Poke the Freakmoji (Space)' });
const stageEl = h('main', { class: 'stage', 'aria-label': 'The arena' }, canvas, overlayCanvas, pokeButton);
const app = h('div', { id: 'app' }, stageEl);
document.body.append(app);

const toasts = new Toasts();
const announcer = new Announcer();
const audio = new AudioEngine();

// ── View: WebGL scene, or a 2D fallback ──
type View = GameScene | FallbackScene;
let view: View;
try {
  const probe = document.createElement('canvas');
  if (!probe.getContext('webgl2') && !probe.getContext('webgl')) throw new Error('no webgl');
  view = new GameScene(canvas, overlayCanvas, game.state.era);
} catch (err) {
  console.warn('WebGL unavailable, using 2D fallback', err);
  canvas.remove();
  view = new FallbackScene(stageEl, overlayCanvas);
  toasts.push('Running in simple mode', 'Your browser could not start 3D graphics, so the 2D version is shown.', 'warn', 7000);
}

function applySettings(): void {
  setNotation(settings.notation);
  document.documentElement.classList.toggle('reduced-motion', settings.reducedMotion);
  view.setQuality(settings.quality);
  view.setPrefs({ shake: settings.shake, reducedMotion: settings.reducedMotion, flashes: settings.flashes });
  view.floaters.enabled = settings.floaters;
  audio.setVolumes({ master: settings.master, sfx: settings.sfx, music: settings.music, muted: settings.muted });
  hud.setMuted(settings.muted);
}

// ── Abilities input (Haymaker is hold-to-charge) ──
let chargeStartedAt = 0;
function abilityDown(id: AbilityId): void {
  audio.unlock();
  syncSim();
  if (id === 'haymaker') {
    if (game.startCharge()) chargeStartedAt = performance.now();
    else if (game.abilityUnlocked(id)) audio.ui('deny');
    return;
  }
  if (!game.activate(id) && game.abilityUnlocked(id)) audio.ui('deny');
}
function abilityUp(id: AbilityId): void {
  syncSim();
  if (id === 'haymaker' && game.state.charge) game.releaseCharge((performance.now() - chargeStartedAt) / 1000);
}

const hud = new Hud({
  abilityDown,
  abilityUp,
  challengeBoss: () => {
    audio.unlock();
    game.startBoss();
  },
  openSettings: () =>
    openSettings(settings, {
      change: (s) => {
        settings = s;
        saveSettings(settings);
        applySettings();
      },
      exportSave: () => exportSave(game.state),
      importSave: (text) => {
        const s = importSave(text);
        if (!s) return false;
        saveGame(store, s);
        location.reload();
        return true;
      },
      hardReset: () => {
        resetting = true;
        wipeSave(store);
        store.removeItem('freakmoji.hints');
        location.reload();
      },
      sound: (k) => audio.ui(k),
    }),
  toggleMute: () => {
    settings = { ...settings, muted: !settings.muted };
    saveSettings(settings);
    applySettings();
    audio.ui('toggle');
  },
});

const shop = new Shop(game, {
  sound: (k) => audio.ui(k),
  collapse: (respec) => {
    const gained = game.collapse(respec);
    if (gained > 0) persist();
  },
});

stageEl.append(hud.root, toasts.root, announcer.root);
app.append(shop.root);
applySettings();

// ── Stage sizing ──
const resizeObserver = new ResizeObserver(() => {
  const r = stageEl.getBoundingClientRect();
  view.resize(r.width, r.height, 0);
});
resizeObserver.observe(stageEl);

// ── Pointer & keyboard ──
let started = false;

function pokeAt(clientX: number, clientY: number): void {
  if (!started) return;
  syncSim();
  const hit = view.pick(clientX, clientY);
  if (!hit) return;
  if (hit.kind === 'golden') game.catchGolden();
  else game.poke({ dir: hit.dir, region: hit.region, source: 'pointer' });
}

stageEl.addEventListener('pointerdown', (e) => {
  if (e.target !== canvas && e.target !== stageEl && e.target !== overlayCanvas) return;
  if (e.button !== 0 && e.pointerType === 'mouse') return;
  if (!e.isTrusted) return;
  audio.unlock();
  pokeAt(e.clientX, e.clientY);
});
stageEl.addEventListener('pointermove', (e) => view.pointerMove(e.clientX, e.clientY), { passive: true });
stageEl.addEventListener('contextmenu', (e) => e.preventDefault());
// Screen readers may "click" the poke target directly; real Space/Enter
// presses are already handled by the global key handler (which prevents
// the default button activation), so this never double-pokes.
pokeButton.addEventListener('click', (e) => {
  if (e.detail === 0 && started) {
    syncSim();
    game.poke({ source: 'key' });
  }
});

const typingTarget = (t: EventTarget | null): boolean =>
  t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t instanceof HTMLSelectElement;

document.addEventListener('keydown', (e) => {
  if (!started || typingTarget(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;
  if (document.querySelector('.overlay')) return;
  const onButton = e.target instanceof HTMLButtonElement && e.target !== pokeButton;
  if ((e.key === ' ' || e.key === 'Enter') && !onButton) {
    e.preventDefault();
    syncSim();
    // No auto-repeat: holding a key must not become a free autoclicker.
    if (!e.repeat) game.poke({ source: 'key' });
    return;
  }
  const ability = ABILITIES.find((a) => a.key === e.key);
  if (ability && !e.repeat) {
    abilityDown(ability.id);
    hud.flashAbility(ability.id);
    return;
  }
  const k = e.key.toLowerCase();
  if (k === 'g' && game.catchGolden()) return;
  if (k === 'b') game.startBoss();
  if (k === 'm') {
    settings = { ...settings, muted: !settings.muted };
    saveSettings(settings);
    applySettings();
  }
});
document.addEventListener('keyup', (e) => {
  // Buttons activate on Space keyup; the poke target was already poked on keydown.
  if (e.target === pokeButton && (e.key === ' ' || e.key === 'Enter')) e.preventDefault();
  const ability = ABILITIES.find((a) => a.key === e.key);
  if (ability) abilityUp(ability.id);
});

// ── First-time hints: explain each mechanic the first time it shows up ──
const HINTS_KEY = 'freakmoji.hints';
let seenHints: Record<string, true> = {};
try {
  seenHints = JSON.parse(store.getItem(HINTS_KEY) ?? '{}') ?? {};
} catch {
  seenHints = {};
}
function hint(id: string, title: string, body: string): void {
  if (seenHints[id]) return;
  seenHints[id] = true;
  store.setItem(HINTS_KEY, JSON.stringify(seenHints));
  toasts.push(title, body, '', 7000);
}

// ── Events → presentation ──
function react(events: GameEvent[]): void {
  if (!events.length) return;
  view.handle(events, game);
  audio.handle(events, game);
  for (const e of events) {
    switch (e.type) {
      case 'weakSpot':
        hint('weak', '🎯 Weak spot!', 'Poke the glowing target on its face for a guaranteed critical hit.');
        break;
      case 'freakOutStart':
        hint('freakout', '😱 Freak Out!', 'Your pokes are tripled and production doubled for a few seconds. Keep poking to fill the meter again.');
        break;
      case 'buyProducer':
        if (game.state.producers[e.id] === e.amount) {
          hint('minion', '🐒 Your first minion', 'Minions poke the Freakmoji for you, even while you are away. Upgrades double their output.');
        }
        break;
      case 'achievement': {
        const a = ACHIEVEMENT_BY_ID[e.id];
        toasts.push(`${a.icon} Feat unlocked: ${a.name}`, `${a.desc} (+1% gasps)`, 'gold');
        announcer.say(`Feat unlocked: ${a.name}`);
        break;
      }
      case 'eraChange':
        // Let the shatter land before the title card slams in.
        setTimeout(() => showEraCard(stageEl, e.to, settings.reducedMotion), 900);
        for (const a of ABILITIES) {
          if (a.unlockEra === e.to) {
            setTimeout(() => hint(`ability-${a.id}`, `${a.icon} New ability: ${a.name} (key ${a.key})`, a.describe(1)), 4200);
          }
        }
        announcer.say(`Era ${ERAS[e.to].numeral}: ${ERAS[e.to].name}`, true);
        persist();
        break;
      case 'gateReady': {
        const b = e.final ? FINAL_BOSS : ERAS[e.era].boss!;
        toasts.push(`⚠️ ${b.name} blocks the way`, 'Press the challenge button (or B) when you are ready.', 'warn');
        announcer.say(`${b.name} is ready to fight. Press B to challenge.`, true);
        break;
      }
      case 'bossWin':
        if (e.final) {
          toasts.push('🌌 Reality: broken', 'You beat The Composed One. Collapse the timeline to push even further.', 'gold', 9000);
          announcer.say('Reality broken!', true);
          persist();
        } else announcer.say('Composure shattered!', true);
        break;
      case 'bossFail':
        if (bossAbandoned) {
          bossAbandoned = false;
          toasts.push('Fight abandoned', 'You left mid-fight, so the boss regained its composure. Challenge it again when ready.', 'warn', 6000);
        } else {
          toasts.push('Composure held', 'Build up your gasps per second and try again in 15 seconds.', 'warn');
          announcer.say('The boss kept its composure. Try again soon.', true);
        }
        break;
      case 'goldenSpawn':
        announcer.say('A golden Freakmoji appeared! Click it or press G.', true);
        hint('golden', '🌟 A golden Freakmoji!', 'Catch it before it escapes (click it or press G) for a random bonus.');
        break;
      case 'freakOutStart':
        announcer.say('Freak out! Pokes are tripled.');
        break;
      case 'collapse':
        toasts.push(`🫣 Timeline ${e.timeline} collapsed`, `+${fmt(e.gained)} Paranoia. The Freakmoji remembers nothing, except the fear.`, 'gold', 7000);
        announcer.say(`Timeline collapsed. Gained ${e.gained} Paranoia.`, true);
        shop.select('arsenal', true);
        break;
      case 'ability':
        announcer.say(`${ABILITY_BY_ID[e.id].name}!`);
        break;
    }
  }
}

// ── Persistence ──
let saveTimer = AUTOSAVE_EVERY;
function persist(): void {
  if (resetting || !hasLock) return;
  saveGame(store, game.state);
}
addEventListener('pagehide', persist);
addEventListener('beforeunload', persist);

// ── Single active tab: a second tab would double-apply offline rewards ──
const channel = typeof BroadcastChannel === 'function' ? new BroadcastChannel('freakmoji') : null;
const tabId = Math.random().toString(36).slice(2);
if (channel) {
  channel.onmessage = (m: MessageEvent<{ type: string; id: string }>) => {
    if (m.data?.type === 'claim' && m.data.id !== tabId && hasLock) {
      persist();
      hasLock = false;
      showTabLock();
    }
  };
  channel.postMessage({ type: 'claim', id: tabId });
}
function showTabLock(): void {
  if (document.querySelector('.tab-lock')) return;
  const el = h('div', { class: 'overlay tab-lock', role: 'alertdialog', 'aria-modal': 'true' },
    h('div', { class: 'title-card' },
      h('h2', { text: 'Freakmoji is open in another tab' }),
      h('p', { class: 'tagline', text: 'Only one tab can play at a time so your progress doesn’t get counted twice.' }),
      h('button', { class: 'key yellow start', onclick: () => location.reload() }, 'Play here instead'),
    ),
  );
  document.body.append(el);
}

// ── Main loop ──
let acc = 0;
let last = performance.now();
/** Wall-clock time the simulation has been advanced to. */
let simClock = performance.now();
let shopTimer = 0;

/** Bring the simulation up to the current instant. Called every frame and
 *  before every input, so combo timing follows real input timestamps even
 *  when frames are slow. */
function syncSim(): void {
  const now = performance.now();
  const dt = Math.max(0, (now - simClock) / 1000);
  simClock = now;
  advanceSim(dt);
}

function advanceSim(seconds: number): void {
  if (!started || !hasLock) return;
  if (seconds > 1) {
    // Throttled background tab or a long hitch: the Game decides whether to
    // simulate exactly or pay it out under the offline rules.
    const report = game.elapse(seconds);
    acc = 0;
    if (report && report.gained > 0) {
      toasts.push('While this tab was asleep', `Your minions earned ${fmt(report.gained)} gasps (${fmtTime(report.credited)} at ${Math.round(report.efficiency * 100)}%).`, 'gold');
    }
  } else {
    acc += seconds;
    let n = 0;
    while (acc >= STEP && n++ < 10) {
      game.update(STEP);
      acc -= STEP;
    }
  }
}

function frame(now: number): void {
  const dt = Math.min(Math.max(0, (now - last) / 1000), 30 * 60);
  last = now;
  syncSim();
  react(game.drainEvents());
  const vdt = Math.min(dt, 0.1);
  view.frame(vdt, game);
  hud.update(vdt, game);
  audio.update(vdt, game);
  shopTimer -= vdt;
  if (shopTimer <= 0) {
    shopTimer = 0.15;
    shop.update();
  }
  saveTimer -= dt;
  if (saveTimer <= 0) {
    saveTimer = AUTOSAVE_EVERY;
    persist();
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

// Keep the economy honest while hidden (rAF pauses); browsers throttle this to ~1/s or slower.
setInterval(() => {
  if (document.visibilityState !== 'hidden') return;
  syncSim();
  // Still deliver events (toasts, achievements); visuals also reconcile from state.
  react(game.drainEvents());
}, 1000);

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    // A boss fight can't be won (or lost) while nobody is watching.
    if (started && game.abandonBoss()) bossAbandoned = true;
    persist();
    audio.suspend();
  } else {
    audio.resume();
  }
});

// ── Start ──
showTitle(
  { returning: loaded.source !== 'new' && game.state.lifetimeGasps > 0, offline, warning: loaded.warning, era: game.state.era },
  () => {
    audio.unlock();
    started = true;
    last = simClock = performance.now();
    if (offline && offline.gained > 0) toasts.push('Welcome back', `Your minions earned ${fmt(offline.gained)} gasps while you were away.`, 'gold');
    announcer.say('Poke the Freakmoji: click it, tap it, or press Space.', true);
    canvas.focus?.();
  },
);

// Debug/test hook (single-player; harmless). Used by the e2e tests and for screenshots.
(window as unknown as { freakmoji: unknown }).freakmoji = {
  game,
  view,
  persist,
  get started() {
    return started;
  },
  dev: {
    gasps(n: number): void {
      game.state.gasps += n;
      game.state.runGasps += n;
      game.state.lifetimeGasps += n;
    },
    era(n: number): void {
      game.state.era = Math.max(0, Math.min(ERAS.length - 1, n));
      game.refresh();
      if (view instanceof GameScene) view.debugEra(game.state.era);
    },
    minions(count: number): void {
      for (const id of Object.keys(game.state.producers)) game.state.producers[id] = count;
      game.refresh();
    },
    weapon(i: number): void {
      game.state.weapon = i;
      game.refresh();
    },
    skip(seconds: number): void {
      game.update(seconds);
    },
    noSave(): void {
      resetting = true;
    },
    reset(): void {
      resetting = true;
      wipeSave(store);
      location.reload();
    },
  },
};
