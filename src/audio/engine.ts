import type { GameEvent } from '../sim/events';
import type { Game } from '../sim/game';
import { weaponFamily } from '../content/weapons';
import { Music } from './music';
import * as sfx from './sfx';
import { Kit, makeImpulse, type Out, type Voice } from './synth';
import { keyFor, pokeMidi } from './theory';
import { gasp } from './voice';

export type UiSound = 'hover' | 'click' | 'tab' | 'deny' | 'toggle' | 'open' | 'close';

/** 0–1 each. */
export interface Volumes {
  master: number;
  sfx: number;
  music: number;
  muted: boolean;
}

/** Concurrent poke voices; the oldest is stolen beyond this. */
const POKE_VOICES = 8;
/** At most this many pokes from one event batch are voiced (newest kept). */
const POKES_PER_BATCH = 6;
/** Minimum seconds between "big" gasps (Freak Out, haymaker, boss win can coincide). */
const GASP_GAP = 0.35;
/** Minimum seconds between crit gasps, so fast crit streams don't become a chatter. */
const CRIT_GASP_GAP = 1;
/**
 * Gain after the master fader, before the limiter. The compressor's own
 * automatic make-up adds ~3 dB on top. At default volumes the limiter stays
 * idle; at full volume only the biggest moments touch it.
 */
const OUTPUT_TRIM = 1.8;
/** Perceptual slider curve. */
const taper = (v: number): number => Math.pow(v, 1.5);
const unit = (v: unknown, d: number): number =>
  typeof v === 'number' && Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : d;

interface Graph {
  ctx: AudioContext;
  kit: Kit;
  master: GainNode;
  sfxBus: GainNode;
  sfxVerb: GainNode;
  uiBus: GainNode;
  musicBus: GainNode;
  musicVerb: GainNode;
  /** Shared bitcrusher input feeding the sfx bus. */
  crush: WaveShaperNode;
  sfx: Out;
  ui: Out;
  music: Music;
}

type AudioContextCtor = new (options?: AudioContextOptions) => AudioContext;

function audioContextCtor(): AudioContextCtor | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { AudioContext?: AudioContextCtor; webkitAudioContext?: AudioContextCtor };
  return w.AudioContext ?? w.webkitAudioContext ?? null;
}

/**
 * Mix: [sfx bus, ui bus, music bus (after a duck stage), reverb return]
 *   → master → trim → gentle limiter (DynamicsCompressor) → destination.
 * One ConvolverNode with a procedural 1.8 s impulse is shared as a send;
 * the sfx and music sends follow their bus volumes.
 */
function buildGraph(ctx: AudioContext, vol: Volumes): Graph {
  const kit = new Kit(ctx);
  const gain = (v: number, to: AudioNode): GainNode => {
    const g = ctx.createGain();
    g.gain.value = v;
    g.connect(to);
    return g;
  };

  const limiter = ctx.createDynamicsCompressor();
  limiter.threshold.value = -6;
  limiter.knee.value = 6;
  limiter.ratio.value = 6;
  limiter.attack.value = 0.003;
  limiter.release.value = 0.2;
  limiter.connect(ctx.destination);
  const trim = gain(OUTPUT_TRIM, limiter);
  const master = gain(vol.muted ? 0 : taper(vol.master), trim);

  const reverb = ctx.createConvolver();
  reverb.normalize = true;
  reverb.buffer = makeImpulse(ctx, 1.8);
  reverb.connect(gain(0.5, master));

  const sfxLevel = taper(vol.sfx);
  const musicLevel = taper(vol.music);
  const sfxBus = gain(sfxLevel, master);
  const sfxVerb = gain(sfxLevel, reverb);
  const uiBus = gain(sfxLevel * 0.9, master);
  const musicBus = gain(musicLevel, master);
  const musicVerb = gain(musicLevel, reverb);
  const duck = gain(1, musicBus);
  const crush = kit.crusher(sfxBus, 0.08);

  return {
    ctx,
    kit,
    master,
    sfxBus,
    sfxVerb,
    uiBus,
    musicBus,
    musicVerb,
    crush,
    sfx: { dry: sfxBus, wet: sfxVerb },
    ui: { dry: uiBus, wet: null },
    music: new Music(kit, { dry: duck, wet: musicVerb }, duck),
  };
}

/**
 * Procedural audio for Freakmoji Clicker. Every method is a safe no-op
 * until `unlock()` has created a running AudioContext, and none of them
 * ever throws.
 */
export class AudioEngine {
  private g: Graph | null = null;
  private failed = false;
  private hidden = false;
  private vol: Volumes = { master: 0.8, sfx: 0.8, music: 0.5, muted: false };

  private pokeVoices: Voice[] = [];
  private pokeTimes: number[] = [];
  private critTimes: number[] = [];
  private lastPokeAt = -1;
  private lastBigGaspAt = -1;
  private lastCritGaspAt = -1;
  private critGasp: Voice | null = null;
  private lastHoverAt = -1;
  private riser: sfx.Riser | null = null;

  constructor() {
    // Deliberately empty: the AudioContext is created in unlock() (autoplay policy).
  }

  get ready(): boolean {
    return this.g?.ctx.state === 'running';
  }

  unlock(): void {
    if (this.failed) return;
    try {
      if (!this.g) {
        const Ctor = audioContextCtor();
        if (!Ctor) {
          this.failed = true;
          return;
        }
        const ctx = new Ctor({ latencyHint: 'interactive' });
        this.g = buildGraph(ctx, this.vol);
        // iOS: playing a buffer inside the gesture fully unlocks output.
        const b = ctx.createBufferSource();
        b.buffer = ctx.createBuffer(1, 1, ctx.sampleRate);
        b.connect(ctx.destination);
        b.start(0);
      }
      const ctx = this.g.ctx;
      if (ctx.state !== 'running' && !this.hidden) ctx.resume().catch(() => undefined);
    } catch {
      this.failed = true;
      this.g = null;
    }
  }

  setVolumes(v: Volumes): void {
    try {
      this.vol = {
        master: unit(v.master, this.vol.master),
        sfx: unit(v.sfx, this.vol.sfx),
        music: unit(v.music, this.vol.music),
        muted: typeof v.muted === 'boolean' ? v.muted : this.vol.muted,
      };
      const g = this.g;
      if (!g) return;
      const now = g.ctx.currentTime;
      const set = (p: AudioParam, x: number): void => {
        p.setTargetAtTime(x, now, 0.04);
      };
      const s = taper(this.vol.sfx);
      const m = taper(this.vol.music);
      set(g.master.gain, this.vol.muted ? 0 : taper(this.vol.master));
      set(g.sfxBus.gain, s);
      set(g.sfxVerb.gain, s);
      set(g.uiBus.gain, s * 0.9);
      set(g.musicBus.gain, m);
      set(g.musicVerb.gain, m);
    } catch {
      /* never throw */
    }
  }

  handle(events: readonly GameEvent[], game: Game): void {
    const g = this.g;
    if (!g || g.ctx.state !== 'running' || events.length === 0) return;
    let now: number;
    try {
      now = g.ctx.currentTime;
    } catch {
      return;
    }
    let pokes = 0;
    for (const e of events) if (e.type === 'poke') pokes++;
    let skipPokes = Math.max(0, pokes - POKES_PER_BATCH);
    const seen = new Set<string>();
    // A boss win and the era change it causes arrive together: let the
    // shatter land first, then the era stinger.
    let eraDelay = 0;
    for (const e of events) {
      if (e.type === 'poke') {
        if (skipPokes > 0) {
          skipPokes--;
          continue;
        }
      } else {
        const id = e.type === 'ability' || e.type === 'abilityEnd' ? `${e.type}:${e.id}` : e.type;
        if (seen.has(id)) continue;
        seen.add(id);
        if (e.type === 'bossWin') eraDelay = 0.7;
      }
      try {
        this.play(g, e, game, now, eraDelay);
      } catch {
        /* one bad sound must not silence the rest */
      }
    }
  }

  private play(g: Graph, e: GameEvent, game: Game, now: number, eraDelay: number): void {
    const s = game.state;
    const key = keyFor(s.era, s.boss !== null);
    const kit = g.kit;
    const out = g.sfx;
    switch (e.type) {
      case 'poke':
        this.poke(g, e, game, now);
        break;
      case 'haymaker':
        this.stopRiser(now);
        sfx.haymaker(kit, out, now, e.charge, e.perfect, key);
        this.gasp(g, now, now + 0.06, true);
        g.music.duck(now, 0.55, 0.35, 0.9);
        break;
      case 'chargeStart':
        this.stopRiser(now);
        this.riser = sfx.riser(kit, out, now, key);
        break;
      case 'buyWeapon':
        sfx.equip(kit, out, now, key);
        break;
      case 'buyProducer':
        sfx.pop(kit, out, now, key, e.amount);
        break;
      case 'buyUpgrade':
        sfx.upgrade(kit, out, now, key);
        break;
      case 'buyNode':
        sfx.darkChime(kit, out, now, key);
        break;
      case 'freakOutStart':
        sfx.siren(kit, out, now);
        this.gasp(g, now, now + 0.02, true);
        g.music.duck(now, 0.3, 0.6, 0.6);
        break;
      case 'freakOutEnd':
        sfx.relief(kit, out, now, key);
        break;
      case 'weakSpot':
        sfx.weakSpot(kit, out, now, key);
        break;
      case 'weakSpotEnd':
        break;
      case 'goldenSpawn':
        sfx.goldenSpawn(kit, out, now, key);
        break;
      case 'goldenCaught':
        sfx.goldenCaught(kit, out, now, key);
        break;
      case 'goldenMissed':
        sfx.goldenMissed(kit, out, now, key);
        break;
      case 'ability':
        switch (e.id) {
          case 'rally':
            sfx.rally(kit, out, now, key);
            break;
          case 'flurry':
            sfx.flurry(kit, out, now);
            break;
          case 'timewarp':
            sfx.timewarp(kit, out, now);
            break;
          case 'singularity':
            sfx.singularity(kit, out, now, key);
            g.music.duck(now, 0.4, 0.8, 1.5);
            break;
          case 'haymaker':
            break; // the wind-up is voiced by chargeStart
        }
        break;
      case 'abilityEnd':
        sfx.windDown(kit, out, now);
        break;
      case 'gateReady':
        sfx.gateReady(kit, out, now, key);
        break;
      case 'bossStart':
        sfx.bossStart(kit, out, now, key);
        g.music.duck(now, 0.5, 0.5, 0.8);
        break;
      case 'bossWin':
        sfx.bossWin(kit, out, now, key);
        this.gasp(g, now, now + 0.05, true);
        g.music.duck(now, 0.6, 1.2, 1.2);
        break;
      case 'bossFail':
        sfx.bossFail(kit, out, now, key);
        g.music.duck(now, 0.45, 1.6, 0.8);
        break;
      case 'eraChange':
        sfx.eraChange(kit, out, now + eraDelay, keyFor(e.to, false));
        g.music.duck(now, 0.6, eraDelay + 1.2, 1.2);
        break;
      case 'achievement':
        sfx.achievement(kit, out, now, key);
        break;
      case 'collapse':
        sfx.collapse(kit, out, now, keyFor(0, false));
        g.music.duck(now, 0.75, 3, 2);
        break;
      case 'denied':
        sfx.denied(kit, out, now);
        break;
    }
  }

  /**
   * Pokes: in-key pitch from the event's streak, family timbre from the
   * equipped weapon. Loudness is normalised by the recent poke rate
   * (~1/√rate) so fast clicking stays as loud as slow clicking, voices are
   * capped (oldest stolen), same-frame pokes are spread into a flam, and a
   * backlog is dropped rather than queued. Crits and weak hits are never
   * dropped, but they never extend the queue either: if the queue is full
   * they play immediately.
   */
  private poke(g: Graph, e: Extract<GameEvent, { type: 'poke' }>, game: Game, now: number): void {
    const auto = e.source === 'auto';
    const special = e.crit || e.weak;
    let t = Math.max(now + 0.004, this.lastPokeAt + (auto ? 0.065 : 0.028));
    if (t > now + 0.09) {
      if (!special) return;
      t = now + 0.004;
    } else {
      this.lastPokeAt = t;
    }

    const times = this.pokeTimes;
    times.push(t);
    while (times.length > 0 && t - times[0] > 1) times.shift();
    let level = 1 / Math.sqrt(Math.max(1, times.length / 4));
    if (auto) level *= 0.4;
    level *= 0.9 + Math.random() * 0.2;

    // Crit extras get their own rate normalisation so a high crit rate
    // doesn't make the mix louder.
    let critGain = 0;
    if (special) {
      const ct = this.critTimes;
      ct.push(t);
      while (ct.length > 0 && t - ct[0] > 1) ct.shift();
      critGain = (auto ? 0.5 : 1) * Math.max(level / (auto ? 0.4 : 1), 0.6) / Math.sqrt(Math.max(1, ct.length / 1.5));
    }

    this.pokeVoices = this.pokeVoices.filter((v) => v.end > now);
    while (this.pokeVoices.length >= POKE_VOICES) this.pokeVoices.shift()?.kill(now);

    const s = game.state;
    const key = keyFor(s.era, s.boss !== null);
    const voice = sfx.poke(g.kit, g.sfx, t, {
      family: weaponFamily(s.weapon),
      midi: pokeMidi(key, e.streak),
      gain: level,
      crit: e.crit,
      critGain,
      crush: g.crush,
    });
    this.pokeVoices.push(voice);
    if (e.weak) sfx.weakDing(g.kit, g.sfx, t + 0.015, key);
    if (e.crit && Math.random() < (auto ? 0.12 : 0.4)) this.gasp(g, now, t + 0.03, false);
  }

  /**
   * Two tiers of gasp. Big gasps (Freak Out, haymaker, boss win) only wait
   * on each other, cut off a crit gasp still in flight, and reset the crit
   * timer. Crit gasps are rate-limited to one per CRIT_GASP_GAP.
   */
  private gasp(g: Graph, now: number, t: number, big: boolean): void {
    if (big) {
      if (t - this.lastBigGaspAt < GASP_GAP) return;
      this.lastBigGaspAt = t;
      this.lastCritGaspAt = t;
      if (this.critGasp && this.critGasp.end > now) this.critGasp.kill(now);
      this.critGasp = null;
      gasp(g.kit, g.sfx, t, { big: true });
      return;
    }
    if (t - this.lastCritGaspAt < CRIT_GASP_GAP) return;
    this.lastCritGaspAt = t;
    this.critGasp = gasp(g.kit, g.sfx, t, { big: false });
  }

  private stopRiser(now: number): void {
    if (!this.riser) return;
    this.riser.voice.kill(now);
    this.riser = null;
  }

  update(dt: number, game: Game): void {
    const g = this.g;
    if (!g || g.ctx.state !== 'running') return;
    try {
      const now = g.ctx.currentTime;
      // Charge cancelled without a release (or the safety stop passed).
      if (this.riser && (!game.state.charge || now > this.riser.end)) this.stopRiser(now);
      const audible = !this.vol.muted && this.vol.master > 0 && this.vol.music > 0;
      g.music.update(now, dt, game, audible);
    } catch {
      /* never throw */
    }
  }

  ui(kind: UiSound): void {
    const g = this.g;
    if (!g || g.ctx.state !== 'running') return;
    try {
      const now = g.ctx.currentTime;
      if (kind === 'hover') {
        if (now - this.lastHoverAt < 0.045) return;
        this.lastHoverAt = now;
      }
      sfx.ui(g.kit, g.ui, now, kind);
    } catch {
      /* never throw */
    }
  }

  suspend(): void {
    this.hidden = true;
    const g = this.g;
    if (!g) return;
    try {
      g.ctx.suspend().catch(() => undefined);
    } catch {
      /* never throw */
    }
  }

  resume(): void {
    this.hidden = false;
    const g = this.g;
    if (!g) return;
    try {
      g.ctx.resume().catch(() => undefined);
    } catch {
      /* never throw */
    }
  }
}
