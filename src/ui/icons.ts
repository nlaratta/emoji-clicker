import atlasUrl from '../assets/icons/atlas.webp';
import atlas from '../assets/icons/atlas.json';
import type { UpgradeDef } from '../content/upgrades';
import { MILESTONES } from '../content/upgrades';

/**
 * The illustrated icon set (art/icons): one atlas, addressed by id. Content
 * keeps its emoji (the sim and the 2D fallback use them); everything the
 * player sees in the UI goes through these mappings instead.
 */
export const ICON_ATLAS = { url: atlasUrl, cell: atlas.cell, cols: atlas.cols, rows: atlas.rows };
const INDEX = atlas.icons as Record<string, number>;

export function hasIcon(id: string): boolean {
  return id in INDEX;
}

/** Atlas cell for an icon id (falls back to the sparkle). */
export function iconIndex(id: string): number {
  return INDEX[id] ?? INDEX['ui-sparkle'] ?? 0;
}

/** A sized, decorative icon element (`role="img"` with a label when meaningful). */
export function icon(id: string, cls = '', label?: string): HTMLSpanElement {
  const el = document.createElement('span');
  el.className = `ico ${cls}`.trim();
  setIcon(el, id);
  if (label) {
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', label);
  } else el.setAttribute('aria-hidden', 'true');
  return el;
}

export function setIcon(el: HTMLElement, id: string): void {
  if (el.dataset.icon === id) return;
  el.dataset.icon = id;
  const i = iconIndex(id);
  const x = i % ICON_ATLAS.cols;
  const y = Math.floor(i / ICON_ATLAS.cols);
  el.style.setProperty('--ix', String(x));
  el.style.setProperty('--iy', String(y));
}

/** CSS custom properties shared by every `.ico` (installed once at startup). */
export function installIconStyles(): void {
  const r = document.documentElement.style;
  r.setProperty('--ico-url', `url("${ICON_ATLAS.url}")`);
  r.setProperty('--ico-cols', String(ICON_ATLAS.cols));
  r.setProperty('--ico-rows', String(ICON_ATLAS.rows));
}

// ── Mappings from game ids ──

export const weaponIcon = (index: number): string => (index < 0 ? 'ui-poke' : `weapon-${index}`);
export const minionIcon = (id: string): string => `minion-${id}`;
export const abilityIcon = (id: string): string => `ability-${id}`;
export const nodeIcon = (id: string): string => `node-${id}`;
export const eraIcon = (era: number): string => `era-${era}`;

/** Upgrade art: specials have their own; milestones reuse the minion; ability levels the ability. */
export function upgradeIcon(u: UpgradeDef): string {
  if (u.id.startsWith('m_')) return minionIcon(u.id.split('_')[1]);
  if (u.id.startsWith('a_')) return abilityIcon(u.id.split('_')[1]);
  return hasIcon(`up-${u.id}`) ? `up-${u.id}` : 'ui-sparkle';
}

/** Milestone tier (1-based) for minion upgrades, else 0. */
export function upgradeTier(u: UpgradeDef): number {
  if (!u.id.startsWith('m_')) return 0;
  const t = Number(u.id.split('_')[2]);
  return Number.isFinite(t) && t < MILESTONES.length ? t + 1 : 0;
}

/** Feat art: families share an icon (their tier shows as the medal); eras use their emblem. */
export function featIcon(id: string): string {
  const era = /^era(\d)$/.exec(id);
  if (era) return eraIcon(Number(era[1]));
  const fam = /^(clk|gsp|gps|cmb|crt|wk|gld|fo|tl)\d+$/.exec(id);
  if (fam) return `feat-${fam[1]}`;
  return hasIcon(`feat-${id}`) ? `feat-${id}` : 'ui-trophy';
}

/** Medal tier for tiered feats: 0 bronze, 1 silver, 2 gold, 3+ prismatic; -1 for one-offs. */
export function featTier(id: string): number {
  const fam = /^(?:clk|gsp|gps|cmb|crt|wk|gld|fo|tl)(\d+)$/.exec(id);
  return fam ? Number(fam[1]) : -1;
}

/** Inline markup for an icon inside an HTML string (goal text, tooltips). */
export function iconHtml(id: string, cls = 'inline'): string {
  const i = iconIndex(id);
  return `<span class="ico ${cls}" aria-hidden="true" style="--ix:${i % ICON_ATLAS.cols};--iy:${Math.floor(i / ICON_ATLAS.cols)}"></span>`;
}
