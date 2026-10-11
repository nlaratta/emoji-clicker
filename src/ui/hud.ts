import { h, setClass, setHidden, setText, setVar } from './dom';
import type { Game } from '../sim/game';
import { ERAS, FINAL_BOSS } from '../content/eras';
import { ABILITIES, CHARGE_FULL, type AbilityId } from '../content/abilities';
import { WEAPONS } from '../content/weapons';
import { fmt, fmtRate, fmtTime } from '../core/format';
import { comboMult, isFreakingOut, weaponCost } from '../sim/economy';
import { NEWS, NEWS_ANYTIME } from '../content/news';
import { abilityIcon, eraIcon, icon, iconHtml, setIcon, weaponIcon } from './icons';

export interface HudCallbacks {
  abilityDown(id: AbilityId): void;
  abilityUp(id: AbilityId): void;
  challengeBoss(): void;
  openSettings(): void;
  toggleMute(): void;
}

/** Everything drawn over the 3D view. */
export class Hud {
  readonly root: HTMLElement;
  private value: HTMLElement;
  private unit: HTMLElement;
  private gpsRate: HTMLElement;
  private pokeRate: HTMLElement;
  private eraNum: HTMLElement;
  private eraEmblem: HTMLElement;
  private muteIcon: HTMLElement;
  private eraName: HTMLElement;
  private goal: HTMLElement;
  private gateBar: HTMLElement;
  private meters: HTMLElement;
  private comboBar: HTMLElement;
  private comboVal: HTMLElement;
  private freakBar: HTMLElement;
  private freakVal: HTMLElement;
  private freakLabel: HTMLElement;
  private abilityEls = new Map<AbilityId, { el: HTMLButtonElement; cd: HTMLElement; cdText: HTMLElement }>();
  private gate: HTMLButtonElement;
  private gateName: HTMLElement;
  private gateTaunt: HTMLElement;
  private bossbar: HTMLElement;
  private bossName: HTMLElement;
  private bossTaunt: HTMLElement;
  private bossFill: HTMLElement;
  private bossTimer: HTMLElement;
  private ticker: HTMLElement;
  private muteBtn: HTMLButtonElement;
  private displayed = 0;
  private lastTarget = 0;
  private bumpTimer = 0;
  private tickerTimer = 0;
  private tickerIndex = 0;
  private slowTimer = 0;
  private lastGoal = '';

  constructor(cb: HudCallbacks) {
    this.value = h('div', { class: 'counter-value', text: '0' });
    this.unit = h('div', { class: 'counter-unit', text: 'gasps' });
    this.gpsRate = h('b', { text: '0' });
    this.pokeRate = h('b', { text: '1' });
    const counter = h(
      'div',
      { class: 'counter', 'aria-live': 'off' },
      h('div', { class: 'counter-main' }, icon('ui-gasp', 'coin'), this.value),
      this.unit,
      h('div', { class: 'counter-rates' },
        h('span', { class: 'rate', title: 'Gasps per second from minions' }, icon('ui-rate'), this.gpsRate, ' per second'),
        h('span', { class: 'rate', title: 'Gasps per poke' }, icon('ui-poke'), this.pokeRate, ' per poke'),
      ),
    );

    this.eraNum = h('span', { class: 'era-numeral', text: 'I' });
    this.eraName = h('span', { class: 'era-name', text: '' });
    this.goal = h('div', { class: 'goal' });
    this.gateBar = h('i');
    this.eraEmblem = icon(eraIcon(0), 'emblem');
    const badge = h('div', { class: 'era-badge plate' },
      h('div', { class: 'medallion' }, this.eraEmblem),
      h('div', { class: 'era-text' },
        h('div', { class: 'era-line' }, this.eraNum, this.eraName),
        h('div', { class: 'bar', role: 'progressbar', 'aria-label': 'Progress to the next era' }, this.gateBar),
        this.goal,
      ),
    );

    this.muteIcon = icon('ui-sound');
    this.muteBtn = h('button', { class: 'key icon-key', 'aria-label': 'Mute sound', title: 'Mute (M)', onclick: () => cb.toggleMute() }, this.muteIcon) as HTMLButtonElement;
    const utility = h('div', { class: 'utility' }, this.muteBtn, h('button', { class: 'key icon-key', 'aria-label': 'Settings', title: 'Settings', onclick: () => cb.openSettings() }, icon('ui-settings')));

    this.comboBar = h('i');
    this.comboVal = h('span', { class: 'val', text: '×1' });
    this.freakBar = h('i');
    this.freakVal = h('span', { class: 'val', text: '0%' });
    this.freakLabel = h('span', { text: 'Freak-O-Meter' });
    this.meters = h(
      'div',
      { class: 'meters' },
      h('div', { class: 'meter-row combo' }, icon('feat-cmb', 'meter-ico'), h('span', { text: 'Combo' }), h('div', { class: 'bar' }, this.comboBar), this.comboVal),
      h('div', { class: 'meter-row freak' }, icon('feat-fo', 'meter-ico'), this.freakLabel, h('div', { class: 'bar' }, this.freakBar), this.freakVal),
    );

    const hotbar = h('div', { class: 'hotbar', role: 'toolbar', 'aria-label': 'Abilities' });
    for (const a of ABILITIES) {
      const cd = h('span', { class: 'cd' });
      const cdText = h('span', { class: 'cd-text' });
      const el = h(
        'button',
        { class: 'key ability hidden', 'aria-label': `${a.name} (key ${a.key})`, title: a.name },
        h('span', { class: 'charge' }),
        h('span', { class: 'perfect-zone' }),
        icon(abilityIcon(a.id), 'ability-ico'),
        h('span', { class: 'hotkey', text: a.key }),
        cd,
        cdText,
      ) as HTMLButtonElement;
      el.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        el.setPointerCapture(e.pointerId);
        cb.abilityDown(a.id);
      });
      el.addEventListener('pointerup', () => cb.abilityUp(a.id));
      el.addEventListener('pointercancel', () => cb.abilityUp(a.id));
      el.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) {
          e.preventDefault();
          e.stopPropagation();
          cb.abilityDown(a.id);
        }
      });
      el.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          cb.abilityUp(a.id);
        }
      });
      this.abilityEls.set(a.id, { el, cd, cdText });
      hotbar.append(el);
    }

    this.gateName = h('span');
    this.gateTaunt = h('small');
    this.gate = h('button', { class: 'key pink gate', hidden: true, onclick: () => cb.challengeBoss() }, icon('ui-boss', 'gate-ico'), h('span', { class: 'gate-text' }, this.gateName, this.gateTaunt)) as HTMLButtonElement;

    this.bossName = h('div', { class: 'boss-name' });
    this.bossTaunt = h('div', { class: 'boss-taunt' });
    this.bossFill = h('i');
    this.bossTimer = h('div', { class: 'boss-timer' });
    this.bossbar = h('div', { class: 'bossbar', hidden: true, role: 'status' }, h('div', { class: 'boss-head' }, icon('ui-boss', 'boss-ico'), this.bossName), this.bossTaunt, h('div', { class: 'bar' }, this.bossFill), this.bossTimer);

    this.ticker = h('div', { class: 'ticker', 'aria-hidden': 'true' });

    this.root = h('div', { class: 'hud' }, counter, badge, utility, this.meters, this.bossbar, this.gate, hotbar, this.ticker);
  }

  setMuted(muted: boolean): void {
    setIcon(this.muteIcon, muted ? 'ui-mute' : 'ui-sound');
    setClass(this.muteBtn, 'muted', muted);
    this.muteBtn.setAttribute('aria-label', muted ? 'Unmute sound' : 'Mute sound');
  }

  /** Brief keycap press feedback for keyboard-triggered abilities. */
  flashAbility(id: AbilityId): void {
    const a = this.abilityEls.get(id);
    if (!a) return;
    a.el.classList.add('pressed');
    setTimeout(() => a.el.classList.remove('pressed'), 110);
  }

  update(dt: number, game: Game): void {
    const s = game.state;
    // Smoothly roll the counter toward the real value.
    const target = s.gasps;
    if (target > this.lastTarget + 1e-9) this.bumpTimer = 0.09;
    this.lastTarget = target;
    const diff = target - this.displayed;
    this.displayed = Math.abs(diff) < 1 || diff < 0 ? target : this.displayed + diff * (1 - Math.exp(-14 * dt));
    setText(this.value, fmt(this.displayed));
    this.bumpTimer -= dt;
    setClass(this.value, 'bump', this.bumpTimer > 0);

    // Meters every frame (they move fast).
    const m = game.mods;
    const streak = game.liveStreak;
    const freaking = isFreakingOut(s);
    this.comboBar.style.width = `${Math.min(1, streak / m.comboCap) * 100}%`;
    setText(this.comboVal, `×${comboMult(streak, m).toFixed(2)}`);
    const freakFrac = freaking ? Math.max(0, (s.freakOutEnd - s.time) / m.freakOutDuration) : s.freakMeter;
    this.freakBar.style.width = `${Math.min(1, freakFrac) * 100}%`;
    setText(this.freakVal, freaking ? `${Math.ceil(s.freakOutEnd - s.time)}s` : `${Math.floor(s.freakMeter * 100)}%`);
    setText(this.freakLabel, freaking ? 'FREAK OUT!' : 'Freak-O-Meter');
    setClass(this.meters, 'freaking', freaking);

    // Abilities.
    for (const a of ABILITIES) {
      const ui = this.abilityEls.get(a.id)!;
      const unlocked = game.abilityUnlocked(a.id);
      setClass(ui.el, 'hidden', !unlocked);
      if (!unlocked) continue;
      const left = game.abilityCooldownLeft(a.id);
      const total = game.abilityCooldownTotal(a.id);
      const active = game.abilityActiveLeft(a.id) > 0;
      const charging = a.id === 'haymaker' && !!s.charge;
      setVar(ui.cd, '--cd', `${left > 0 ? (left / total) * 100 : 0}%`);
      setText(ui.cdText, left > 0 ? fmtTime(left) : '');
      setClass(ui.el, 'ready', left <= 0 && !charging);
      setClass(ui.el, 'active', active);
      setClass(ui.el, 'charging', charging);
      if (charging) setVar(ui.el, '--charge', `${(Math.min(CHARGE_FULL, s.time - s.charge!.startedAt) / CHARGE_FULL) * 100}%`);
    }

    // Boss bar.
    const boss = s.boss;
    setHidden(this.bossbar, !boss);
    if (boss) {
      const def = boss.final ? FINAL_BOSS : ERAS[boss.era].boss!;
      setText(this.bossName, def.name);
      setText(this.bossTaunt, def.taunt);
      this.bossFill.style.width = `${Math.max(0, boss.hp / boss.maxHp) * 100}%`;
      setText(this.bossTimer, `${fmt(Math.max(0, boss.hp))} composure left · ${Math.max(0, boss.end - s.time).toFixed(1)}s`);
    }

    this.slowTimer -= dt;
    if (this.slowTimer <= 0) {
      this.slowTimer = 0.12;
      this.slowUpdate(game);
    }

    this.tickerTimer -= dt;
    if (this.tickerTimer <= 0) this.rotateTicker(s.era);
  }

  private slowUpdate(game: Game): void {
    const s = game.state;
    const buffedGps = game.gps > game.gpsBase * 1.01;
    setText(this.gpsRate, fmtRate(game.gps));
    setClass(this.gpsRate.parentElement!, 'buffed', buffedGps);
    setText(this.pokeRate, fmt(game.pokeValue, true));
    setText(this.unit, s.gasps === 1 ? 'gasp' : 'gasps');

    const era = ERAS[s.era];
    setIcon(this.eraEmblem, eraIcon(s.era));
    setText(this.eraNum, era.numeral);
    setText(this.eraName, era.name);

    // Gate progress and the next meaningful goal.
    const next = game.nextGateThreshold();
    const prev = era.threshold;
    let frac = 1;
    if (next !== null) frac = Math.min(1, Math.max(0, Math.log10(Math.max(1, s.runGasps) / Math.max(1, prev)) / Math.log10(next / Math.max(1, prev))));
    if (next !== null && prev <= 0) frac = Math.min(1, s.runGasps / next);
    this.gateBar.style.width = `${frac * 100}%`;
    const goal = this.goalText(game);
    if (goal !== this.lastGoal) {
      this.lastGoal = goal;
      this.goal.innerHTML = goal;
    }

    const gate = game.gateBoss();
    setHidden(this.gate, !gate || !!s.boss);
    if (gate) {
      setText(this.gateName, `Challenge ${gate.name}`);
      setText(this.gateTaunt, `${gate.taunt} Out-gasp ${fmt(gate.hp)} in ${gate.duration}s. (B)`);
    }
  }

  private goalText(game: Game): string {
    const s = game.state;
    if (s.boss) return 'Shatter its composure before the timer runs out!';
    const gate = game.gateBoss();
    if (gate) return `<strong>${gate.name}</strong> blocks the way to ${gate.final ? 'breaking reality' : `Era ${ERAS[s.era + 1].numeral}`}.`;
    if (s.time < s.bossRetryAt) return `Regroup: you can retry in ${Math.ceil(s.bossRetryAt - s.time)}s. Buy upgrades meanwhile.`;
    if (s.victory) return 'Reality is broken. Collapse the timeline to go even further.';
    const next = game.nextGateThreshold();
    if (s.runGasps < 15 && s.stats.clicks < 10) return '<strong>Poke the Freakmoji</strong> to make it gasp.';
    const w = game.nextWeapon();
    if (w >= 0 && game.weaponUnlocked(w) && s.gasps < weaponCost(w, game.mods) && s.runGasps < 400) {
      return `Next weapon: ${iconHtml(weaponIcon(w))}<strong>${WEAPONS[w].name}</strong> at ${fmt(weaponCost(w, game.mods))} gasps.`;
    }
    if (next !== null) {
      const name = s.era < ERAS.length - 1 ? `Era ${ERAS[s.era + 1].numeral}` : 'the final boss';
      return `Earn <strong>${fmt(Math.max(0, next - s.runGasps))}</strong> more to reach ${name}.`;
    }
    return '';
  }

  private rotateTicker(era: number): void {
    this.tickerTimer = 9;
    const pool = [...NEWS[era], ...NEWS_ANYTIME];
    this.tickerIndex = (this.tickerIndex + 1 + Math.floor(Math.random() * (pool.length - 1))) % pool.length;
    this.ticker.style.opacity = '0';
    setTimeout(() => {
      this.ticker.innerHTML = '';
      this.ticker.append(h('b', { text: 'FNN' }), pool[this.tickerIndex]);
      this.ticker.style.opacity = '1';
    }, 380);
  }
}

