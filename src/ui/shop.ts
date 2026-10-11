import { h, setClass, setText } from './dom';
import type { Game } from '../sim/game';
import { WEAPONS } from '../content/weapons';
import { PRODUCERS } from '../content/producers';
import { UPGRADES, type UpgradeDef, type UpgradeKind } from '../content/upgrades';
import { NODES, NODE_BY_ID, UNSPENT_BONUS, UNSPENT_SOFTCAP, unspentBonus, type NodeDef } from '../content/paranoia';
import { ACHIEVEMENTS, ACHIEVEMENT_BONUS } from '../content/achievements';
import { ERAS } from '../content/eras';
import { fmt, fmtRate, fmtTime, fmtPct } from '../core/format';
import { maxAffordable, nextParanoiaAt, nodeAvailable, paranoiaGain, producerGps, weaponCost } from '../sim/economy';
import type { UiSound } from '../audio/engine';

export type TabId = 'arsenal' | 'minions' | 'upgrades' | 'paranoia' | 'feats' | 'stats';

const TABS: { id: TabId; icon: string; label: string }[] = [
  { id: 'arsenal', icon: '⚔️', label: 'Arsenal' },
  { id: 'minions', icon: '🐒', label: 'Minions' },
  { id: 'upgrades', icon: '✨', label: 'Upgrades' },
  { id: 'paranoia', icon: '🫣', label: 'Paranoia' },
  { id: 'feats', icon: '🏆', label: 'Feats' },
  { id: 'stats', icon: '📊', label: 'Stats' },
];

const KIND_COLOR: Record<UpgradeKind, string> = {
  minion: '#ffc61a',
  click: '#ff9b4a',
  crit: '#ff5a5a',
  combo: '#7affd8',
  meter: '#ff4fa3',
  weak: '#ff7ab8',
  golden: '#ffe08a',
  synergy: '#7fb2ff',
  global: '#c79aff',
  ability: '#3af0ff',
};

export interface ShopCallbacks {
  sound(kind: UiSound): void;
  collapse(respec: boolean): void;
}

interface Tip {
  name: string;
  desc: string;
  cost?: string;
  ok?: boolean;
}

/** Shared tooltip that follows focus/hover. */
class Tooltip {
  el = h('div', { class: 'tooltip', role: 'tooltip' });
  private name = h('div', { class: 'tt-name' });
  private desc = h('div');
  private cost = h('div', { class: 'tt-cost' });
  constructor() {
    this.el.append(this.name, this.desc, this.cost);
    document.body.append(this.el);
  }
  show(target: HTMLElement, tip: Tip): void {
    setText(this.name, tip.name);
    setText(this.desc, tip.desc);
    setText(this.cost, tip.cost ?? '');
    this.cost.hidden = !tip.cost;
    setClass(this.cost, 'no', tip.ok === false);
    const r = target.getBoundingClientRect();
    const w = 260;
    let x = r.left + r.width / 2 - w / 2;
    x = Math.max(8, Math.min(innerWidth - w - 8, x));
    this.el.style.left = `${x}px`;
    this.el.classList.add('show');
    const th = this.el.offsetHeight;
    const y = r.top - th - 10 > 8 ? r.top - th - 10 : r.bottom + 10;
    this.el.style.top = `${y}px`;
  }
  hide(): void {
    this.el.classList.remove('show');
  }
}

export class Shop {
  readonly root: HTMLElement;
  private body: HTMLElement;
  private tabBtns = new Map<TabId, HTMLButtonElement>();
  private dots = new Map<TabId, HTMLElement>();
  private active: TabId = 'arsenal';
  private signature = '';
  private game: Game;
  private cb: ShopCallbacks;
  private tooltip = new Tooltip();
  private buyAmount: number | 'max' = 1;
  private confirmCollapse = false;
  private respec = false;
  private refreshers: (() => void)[] = [];
  private coarse = typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches;
  private armed: HTMLElement | null = null;
  private seenUpgrades = 0;

  constructor(game: Game, cb: ShopCallbacks) {
    this.game = game;
    this.cb = cb;
    const tabs = h('div', { class: 'tabs', role: 'tablist', 'aria-label': 'Shop' });
    for (const t of TABS) {
      const dot = h('span', { class: 'dot', hidden: true });
      const btn = h('button', {
        class: 'key tab', role: 'tab', id: `tab-${t.id}`, 'aria-selected': 'false', 'aria-controls': 'tab-body',
        onclick: () => this.select(t.id),
      }, h('span', { class: 'ti', 'aria-hidden': 'true', text: t.icon }), t.label, dot) as HTMLButtonElement;
      this.tabBtns.set(t.id, btn);
      this.dots.set(t.id, dot);
      tabs.append(btn);
    }
    this.body = h('div', { class: 'tab-body', id: 'tab-body', role: 'tabpanel' });
    this.root = h('aside', { class: 'panel', 'aria-label': 'Shop and progress' }, tabs, this.body);
    this.body.addEventListener('scroll', () => this.tooltip.hide(), { passive: true });
    this.select('arsenal', true);
  }

  select(id: TabId, silent = false): void {
    this.active = id;
    for (const [tid, b] of this.tabBtns) b.setAttribute('aria-selected', String(tid === id));
    if (id === 'upgrades') this.seenUpgrades = this.availableUpgrades().length;
    this.signature = '';
    this.confirmCollapse = false;
    this.tooltip.hide();
    if (!silent) this.cb.sound('tab');
    this.update();
  }

  private tipHandlers(el: HTMLElement, get: () => Tip, onActivate?: () => void): void {
    el.addEventListener('pointerenter', (e) => {
      if ((e as PointerEvent).pointerType === 'mouse') this.tooltip.show(el, get());
    });
    el.addEventListener('pointerleave', () => this.tooltip.hide());
    el.addEventListener('focus', () => this.tooltip.show(el, get()));
    el.addEventListener('blur', () => this.tooltip.hide());
    if (onActivate) {
      el.addEventListener('click', () => {
        // On touch screens the first tap explains, the second tap buys.
        if (this.coarse && this.armed !== el) {
          this.armed = el;
          this.tooltip.show(el, get());
          return;
        }
        this.armed = null;
        onActivate();
        this.tooltip.show(el, get());
      });
    }
  }

  private visibleTabs(): Set<TabId> {
    const s = this.game.state;
    const set = new Set<TabId>(['arsenal', 'minions', 'upgrades', 'feats', 'stats']);
    if (s.era >= 3 || s.timelines > 0 || s.paranoia > 0) set.add('paranoia');
    return set;
  }

  private availableUpgrades(): UpgradeDef[] {
    const s = this.game.state;
    return UPGRADES.filter((u) => !s.upgrades[u.id] && u.req(s)).sort((a, b) => a.cost - b.cost);
  }

  /** Structural signature: when it changes, the active tab is rebuilt. */
  private computeSignature(): string {
    const g = this.game;
    const s = g.state;
    switch (this.active) {
      case 'arsenal':
        return `a${s.weapon}|${s.era}`;
      case 'minions':
        return `m${s.era}|${this.buyAmount}`;
      case 'upgrades':
        return `u${this.availableUpgrades().map((u) => u.id).join(',')}|${Object.keys(s.upgrades).length}`;
      case 'paranoia':
        return `p${Object.keys(s.nodes).join(',')}|${s.timelines}|${this.confirmCollapse}|${g.canCollapse()}|${this.respec}`;
      case 'feats':
        return `f${Object.keys(s.achievements).length}`;
      case 'stats':
        return `s${s.records.length}|${s.timelines}`;
    }
  }

  update(): void {
    const vis = this.visibleTabs();
    for (const [id, b] of this.tabBtns) b.hidden = !vis.has(id);
    const s = this.game.state;
    const avail = this.availableUpgrades();
    const affordableUp = avail.some((u) => u.cost <= s.gasps);
    this.dots.get('upgrades')!.hidden = !(affordableUp && (this.active !== 'upgrades') && avail.length > this.seenUpgrades - 1);
    this.dots.get('paranoia')!.hidden = !(this.game.canCollapse() && this.active !== 'paranoia');
    if (this.active === 'upgrades') this.seenUpgrades = avail.length;

    const sig = this.computeSignature();
    if (sig !== this.signature) {
      this.signature = sig;
      this.rebuild();
    }
    for (const r of this.refreshers) r();
  }

  private rebuild(): void {
    const scroll = this.body.scrollTop;
    this.body.innerHTML = '';
    this.refreshers = [];
    this.tooltip.hide();
    switch (this.active) {
      case 'arsenal':
        this.buildArsenal();
        break;
      case 'minions':
        this.buildMinions();
        break;
      case 'upgrades':
        this.buildUpgrades();
        break;
      case 'paranoia':
        this.buildParanoia();
        break;
      case 'feats':
        this.buildFeats();
        break;
      case 'stats':
        this.buildStats();
        break;
    }
    this.body.scrollTop = scroll;
  }

  // ── Arsenal ──
  private buildArsenal(): void {
    const g = this.game;
    const s = g.state;
    const i = g.nextWeapon();
    const cur = s.weapon >= 0 ? WEAPONS[s.weapon] : null;
    this.body.append(
      h('p', { class: 'hint', text: cur ? `Equipped: ${cur.emoji} ${cur.name}. Each tier hits harder and changes how your pokes land.` : 'You are poking with one bare finger. Buy a weapon to hit harder.' }),
    );
    if (i >= 0) {
      const w = WEAPONS[i];
      const unlocked = g.weaponUnlocked(i);
      const price = h('span');
      const card = h(
        'button',
        { class: 'key row featured', onclick: () => g.buyWeapon() },
        h('span', { class: 'emoji', text: unlocked ? w.emoji : '🔒' }),
        h(
          'span',
          {},
          h('div', { class: 'name', text: unlocked ? w.name : '???' }),
          h('div', { class: 'sub', text: unlocked ? `Base poke ${fmt(s.weapon >= 0 ? WEAPONS[s.weapon].damage : 1)} → ${fmt(w.damage)}` : `Unlocks in Era ${ERAS[w.era].numeral}: ${ERAS[w.era].name}` }),
          unlocked ? h('div', { class: 'flavor', text: w.flavor }) : null,
        ),
        h('div', { class: 'buyline' }, h('span', { text: unlocked ? 'Buy and equip' : 'Locked' }), price),
      ) as HTMLButtonElement;
      this.body.append(card);
      this.refreshers.push(() => {
        const cost = weaponCost(i, g.mods);
        const ok = unlocked && s.gasps >= cost;
        setText(price, unlocked ? `${fmt(cost)} gasps` : '');
        setClass(card, 'affordable', ok);
        setClass(card, 'unaffordable', !ok);
        setClass(card, 'locked', !unlocked);
      });
    } else {
      this.body.append(h('p', { class: 'hint', text: 'You own every weapon in existence. The Freakmoji is aware.' }));
    }
    const strip = h('div', { class: 'arsenal-strip' });
    WEAPONS.forEach((w) => {
      const owned = w.index <= s.weapon;
      const known = owned || w.era <= s.era;
      const span = h('span', {
        class: `${owned ? '' : 'locked'} ${w.index === s.weapon ? 'current' : ''}`,
        text: known ? w.emoji : '?',
        tabindex: '0',
        'aria-label': known ? w.name : 'Unknown weapon',
      });
      this.tipHandlers(span, () => ({
        name: known ? `${w.emoji} ${w.name}` : '???',
        desc: known ? `${w.flavor} Base poke ${fmt(w.damage)}.` : `A weapon from Era ${ERAS[w.era].numeral}.`,
      }));
      strip.append(span);
    });
    this.body.append(h('div', { class: 'section-title' }, h('span', { text: `Weapons owned: ${s.weapon + 1} of ${WEAPONS.length}` })), strip);
  }

  // ── Minions ──
  private buildMinions(): void {
    const g = this.game;
    const s = g.state;
    const seg = h('div', { class: 'seg', role: 'group', 'aria-label': 'Buy amount' });
    for (const amt of [1, 10, 100, 'max'] as const) {
      seg.append(
        h('button', {
          class: 'key', 'aria-pressed': String(this.buyAmount === amt),
          onclick: () => {
            this.buyAmount = amt;
            this.cb.sound('toggle');
            this.update();
          },
        }, amt === 'max' ? 'Max' : `×${amt}`),
      );
    }
    this.body.append(h('div', { class: 'section-title' }, h('span', { text: 'Minions poke for you, forever' }), seg));

    const unlocked = PRODUCERS.filter((p) => p.era <= s.era);
    const teaser = PRODUCERS.find((p) => p.era > s.era);
    unlocked.forEach((p) => {
      const pi = PRODUCERS.indexOf(p);
      const owned = h('span', { class: 'owned' });
      const sub = h('div', { class: 'sub' });
      const price = h('div', { class: 'price' });
      const row = h(
        'button',
        { class: 'key row', onclick: () => g.buyProducer(p.id, this.buyAmount) },
        h('span', { class: 'emoji', text: p.emoji }),
        h('span', {}, h('div', { class: 'name', text: p.name }), sub),
        h('span', {}, owned, price),
      ) as HTMLButtonElement;
      this.tipHandlers(row, () => ({ name: `${p.emoji} ${p.name}`, desc: p.flavor }));
      this.body.append(row);
      this.refreshers.push(() => {
        const have = s.producers[p.id] ?? 0;
        const n = this.buyAmount === 'max' ? Math.max(1, maxAffordable(p, have, g.mods, s.gasps)) : this.buyAmount;
        const cost = g.producerPrice(p.id, n);
        const each = p.baseGps * g.mods.producerMult[pi] * g.mods.gpsMult * g.mods.globalMult;
        const total = producerGps(s, g.mods, pi);
        setText(owned, String(have));
        setText(sub, have > 0 ? `${fmtRate(each)}/s each · ${fmtRate(total)}/s total (${fmtPct(g.gpsBase > 0 ? total / g.gpsBase : 0)})` : `+${fmtRate(each)}/s each`);
        price.innerHTML = '';
        price.append(`${fmt(cost)}`, h('small', { text: n > 1 ? `for ${n}` : 'gasps' }));
        const ok = s.gasps >= cost;
        setClass(row, 'affordable', ok);
        setClass(row, 'unaffordable', !ok);
        row.style.display = have > 0 || s.runGasps >= p.baseCost * 0.3 || pi === 0 ? '' : 'none';
      });
    });
    if (teaser) {
      this.body.append(
        h('div', { class: 'key row teaser', 'aria-disabled': 'true' },
          h('span', { class: 'emoji', text: teaser.emoji }),
          h('span', {}, h('div', { class: 'name', text: '???' }), h('div', { class: 'sub', text: `Arrives in Era ${ERAS[teaser.era].numeral}` })),
          h('span'),
        ),
      );
    }
  }

  // ── Upgrades ──
  private buildUpgrades(): void {
    const g = this.game;
    const s = g.state;
    const avail = this.availableUpgrades();
    this.body.append(h('div', { class: 'section-title' }, h('span', { text: avail.length ? `Available (${avail.length})` : 'Nothing to buy yet' })));
    if (!avail.length) this.body.append(h('p', { class: 'hint', text: 'Upgrades appear as you poke, buy minions and reach new eras.' }));
    const grid = h('div', { class: 'grid' });
    for (const u of avail) {
      const tile = h('button', { class: 'key tile', 'aria-label': `${u.name}: ${u.desc}` },
        h('span', { 'aria-hidden': 'true', text: u.icon }),
        h('span', { class: 'kind', style: { background: KIND_COLOR[u.kind] } }),
      ) as HTMLButtonElement;
      const tip = (): Tip => ({ name: u.name, desc: u.desc, cost: `${fmt(u.cost)} gasps`, ok: s.gasps >= u.cost });
      this.tipHandlers(tile, tip, () => {
        if (g.buyUpgrade(u.id)) this.tooltip.hide();
      });
      grid.append(tile);
      this.refreshers.push(() => setClass(tile, 'affordable', s.gasps >= u.cost));
    }
    this.body.append(grid);
    const owned = UPGRADES.filter((u) => s.upgrades[u.id]);
    if (owned.length) {
      this.body.append(h('div', { class: 'section-title' }, h('span', { text: `Owned (${owned.length})` })));
      const og = h('div', { class: 'grid' });
      for (const u of owned) {
        const t = h('button', { class: 'key tile owned', 'aria-label': `${u.name} (owned)` }, h('span', { 'aria-hidden': 'true', text: u.icon }));
        this.tipHandlers(t, () => ({ name: u.name, desc: u.desc, cost: 'Owned' }));
        og.append(t);
      }
      this.body.append(og);
    }
  }

  // ── Paranoia ──
  private buildParanoia(): void {
    const g = this.game;
    const s = g.state;
    const gain = h('span');
    const unspent = h('div', { class: 'big' });
    const bonus = h('p');
    const next = h('p');
    const card = h('div', { class: 'prestige-card' },
      h('div', { class: 'section-title', style: { margin: '0 0 6px' } }, h('span', { text: 'Paranoia' })),
      unspent,
      bonus,
    );
    this.body.append(card);
    this.refreshers.push(() => {
      setText(unspent, `${fmt(s.paranoia)} 🫣`);
      setText(bonus, `Each unspent point adds +${UNSPENT_BONUS * 100}% to all gasps, tapering after ${UNSPENT_SOFTCAP} (now +${fmt(unspentBonus(s.paranoia) * 100)}%). Spending points buys permanent fears below; you can only get them back when you collapse.`);
    });

    const actions = h('div', { class: 'collapse-actions' });
    const can = g.canCollapse();
    if (!can) {
      const why = s.era < 3 && !s.victory ? `Reach Era IV (${ERAS[3].name}) to collapse a timeline.` : 'Earn more gasps to gain at least 1 Paranoia.';
      actions.append(h('p', { text: why }));
    } else if (!this.confirmCollapse) {
      actions.append(h('button', { class: 'key pink', onclick: () => { this.confirmCollapse = true; this.cb.sound('open'); this.update(); } }, 'Collapse timeline…'));
    } else {
      actions.append(
        h('button', { class: 'key pink', onclick: () => { this.confirmCollapse = false; this.cb.collapse(this.respec); } }, 'Yes, collapse it'),
        h('button', { class: 'key', onclick: () => { this.confirmCollapse = false; this.cb.sound('close'); this.update(); } }, 'Keep playing'),
      );
    }
    const respecBox = h('input', { type: 'checkbox', id: 'respec' }) as HTMLInputElement;
    respecBox.checked = this.respec;
    respecBox.addEventListener('change', () => { this.respec = respecBox.checked; });
    const col = h('div', { class: 'prestige-card', style: { marginTop: '10px' } },
      h('div', { class: 'section-title', style: { margin: '0 0 6px' } }, h('span', { text: 'Collapse the timeline' }), gain),
      h('p', { text: 'Reset this timeline (gasps, minions, weapons, upgrades, era) for Paranoia. Feats, stats and Paranoia fears are kept.' }),
      next,
      actions,
      can ? h('label', { class: 'check' }, respecBox, 'Refund all fears on collapse (respec)') : null,
    );
    this.body.append(col);
    this.refreshers.push(() => {
      const p = paranoiaGain(s);
      setText(gain, p > 0 ? `+${fmt(p)} 🫣` : '');
      setText(next, `Next point at ${fmt(nextParanoiaAt(s))} lifetime gasps (now ${fmt(s.lifetimeGasps)}).`);
    });

    // Tree
    this.body.append(h('div', { class: 'section-title' }, h('span', { text: 'Fears (permanent)' })));
    const mkNode = (n: NodeDef, extra = ''): HTMLButtonElement => {
      const el = h('button', { class: `key node ${extra}`, 'aria-label': `${n.name}: ${n.desc}` },
        h('span', { class: 'ni', 'aria-hidden': 'true', text: n.icon }),
        h('span', { class: 'nn', text: n.name }),
        h('span', { class: 'nc', text: s.nodes[n.id] ? 'Owned' : `${n.cost} 🫣` }),
      ) as HTMLButtonElement;
      this.tipHandlers(el, () => ({ name: n.name, desc: n.desc, cost: s.nodes[n.id] ? 'Owned' : `${n.cost} Paranoia`, ok: s.paranoia >= n.cost }), () => {
        if (g.buyNode(n.id)) this.update();
        else this.cb.sound('deny');
      });
      this.refreshers.push(() => {
        const owned = !!s.nodes[n.id];
        const avail = nodeAvailable(s, n.id);
        setClass(el, 'owned', owned);
        setClass(el, 'available', avail);
        setClass(el, 'affordable', avail && s.paranoia >= n.cost);
        setClass(el, 'locked', !owned && !avail);
      });
      return el;
    };
    this.body.append(mkNode(NODE_BY_ID.dejavu, 'root'));
    const tree = h('div', { class: 'tree' });
    const branches: [NodeDef['branch'], string, string][] = [
      ['twitchy', 'Twitchy', 'active play'],
      ['brooding', 'Brooding', 'idle play'],
      ['unhinged', 'Unhinged', 'luck & abilities'],
    ];
    for (const [b, name, sub] of branches) {
      const col2 = h('div', { class: 'tree-col' }, h('h4', {}, name, h('span', { text: sub })));
      NODES.filter((n) => n.branch === b).forEach((n) => col2.append(mkNode(n)));
      tree.append(col2);
    }
    this.body.append(tree, mkNode(NODE_BY_ID.cap_dread, 'capstone'));
  }

  // ── Feats ──
  private buildFeats(): void {
    const s = this.game.state;
    const got = ACHIEVEMENTS.filter((a) => s.achievements[a.id]).length;
    this.body.append(h('div', { class: 'section-title' }, h('span', { text: `${got} of ${ACHIEVEMENTS.length} unlocked · +${Math.round(got * ACHIEVEMENT_BONUS * 100)}% gasps` })));
    const sorted = [...ACHIEVEMENTS].sort((a, b) => Number(!!s.achievements[b.id]) - Number(!!s.achievements[a.id]));
    for (const a of sorted) {
      const has = !!s.achievements[a.id];
      const hidden = a.secret && !has;
      this.body.append(
        h('div', { class: `feat ${has ? '' : 'locked'}` },
          h('span', { class: 'fi', 'aria-hidden': 'true', text: hidden ? '❔' : a.icon }),
          h('span', {}, h('div', { class: 'fn', text: hidden ? 'Secret feat' : a.name }), h('div', { class: 'fd', text: hidden ? 'Keep messing with the Freakmoji.' : a.desc })),
        ),
      );
    }
  }

  // ── Stats ──
  private buildStats(): void {
    const g = this.game;
    const s = g.state;
    const dl = h('dl', { class: 'stats' });
    const rows: [string, () => string][] = [
      ['Gasps this timeline', () => fmt(s.runGasps)],
      ['Gasps, all time', () => fmt(s.lifetimeGasps)],
      ['Production', () => `${fmtRate(g.gpsBase)}/s`],
      ['Pokes', () => fmt(s.stats.clicks)],
      ['Critical pokes', () => fmt(s.stats.crits)],
      ['Weak spots hit', () => fmt(s.stats.weakHits)],
      ['Best combo', () => fmt(s.stats.bestCombo)],
      ['Biggest single hit', () => fmt(s.stats.biggestHit)],
      ['Freak Outs', () => fmt(s.stats.freakOuts)],
      ['Golden Freakmojis caught', () => fmt(s.stats.goldenCaught)],
      ['Bosses defeated', () => fmt(s.stats.bossesBeaten)],
      ['Abilities used', () => fmt(s.stats.abilitiesUsed)],
      ['Timelines collapsed', () => fmt(s.timelines)],
      ['This timeline', () => fmtTime(s.time)],
      ['Total play time', () => fmtTime(s.totalTime)],
    ];
    for (const [label, get] of rows) {
      const dd = h('dd');
      dl.append(h('dt', { text: label }), dd);
      this.refreshers.push(() => setText(dd, get()));
    }
    this.body.append(h('div', { class: 'section-title' }, h('span', { text: 'Statistics' })), dl);

    this.body.append(h('div', { class: 'section-title' }, h('span', { text: 'Your best timelines' })));
    if (!s.records.length) this.body.append(h('p', { class: 'hint', text: 'Collapse a timeline to record it here.' }));
    else {
      const t = h('table', { class: 'records' }, h('tr', {}, h('th', { text: '#' }), h('th', { text: 'Gasps' }), h('th', { text: 'Era' }), h('th', { text: 'Time' })));
      s.records.forEach((r) => t.append(h('tr', {}, h('td', { text: String(r.timeline) }), h('td', { text: fmt(r.gasps) }), h('td', { text: r.victory ? '🌌 Broken' : ERAS[r.era].numeral }), h('td', { text: fmtTime(r.duration) }))));
      this.body.append(t);
    }

    if (s.legacyScores.length) {
      this.body.append(h('div', { class: 'section-title' }, h('span', { text: 'Classic Freakmoji Clicker scores' })));
      this.body.append(h('p', { class: 'hint', text: 'High scores from the original version, saved in this browser only.' }));
      const t = h('table', { class: 'records' }, h('tr', {}, h('th', { text: 'Name' }), h('th', { text: 'Score' }), h('th', { text: 'Clicks' })));
      s.legacyScores.forEach((r) => t.append(h('tr', {}, h('td', { text: r.name }), h('td', { text: fmt(r.score) }), h('td', { text: fmt(r.clicks) }))));
      this.body.append(t);
    }
    this.body.append(h('p', { class: 'hint', text: 'Progress is saved in this browser. Use Settings to export a backup.' }));
  }
}
