import { h } from './dom';
import { fmt, fmtTime } from '../core/format';
import type { Settings, Quality } from '../app/settings';
import type { OfflineReport } from '../sim/game';
import { ERAS } from '../content/eras';
import type { UiSound } from '../audio/engine';

// ── Title / continue screen ───────────────────────────────────────────

export interface TitleInfo {
  returning: boolean;
  offline: OfflineReport | null;
  warning: string | null;
  era: number;
}

export function showTitle(info: TitleInfo, onStart: () => void): HTMLElement {
  const away = info.offline && info.offline.gained > 0
    ? h('div', { class: 'away' },
      'While you were away, your minions kept poking:',
      h('b', { text: `+${fmt(info.offline.gained)} gasps` }),
      h('span', {
        class: 'fineprint',
        text: `${fmtTime(info.offline.elapsed)} away, ${fmtTime(info.offline.credited)} counted at ${Math.round(info.offline.efficiency * 100)}% efficiency.`,
      }),
    )
    : null;
  const warn = info.warning ? h('div', { class: 'away', role: 'alert', text: info.warning }) : null;
  const btn = h('button', { class: 'key yellow start', autofocus: true }, info.returning ? 'Keep poking' : 'Start poking') as HTMLButtonElement;
  const el = h('div', { class: 'overlay title-screen', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Freakmoji Clicker' },
    h('div', { class: 'title-card' },
      h('h1', { class: 'logo', text: 'Freakmoji' }),
      h('div', { class: 'logo-sub', text: 'Clicker: Reality Breach' }),
      h('p', { class: 'tagline', text: info.returning
        ? `Welcome back. The Freakmoji is still in Era ${ERAS[info.era].numeral}, still shocked.`
        : 'One very startled emoji. Forty weapons. Seven eras. Poke it until reality breaks.' }),
      warn,
      btn,
      away,
      h('p', { class: 'fineprint', text: 'Click, tap or press Space to poke · 1–5 abilities · sound on for the full effect' }),
    ),
  );
  const go = (): void => {
    el.remove();
    onStart();
  };
  btn.addEventListener('click', go);
  document.body.append(el);
  setTimeout(() => btn.focus(), 50);
  return el;
}

// ── Toasts ─────────────────────────────────────────────────────────────

export class Toasts {
  readonly root = h('div', { class: 'toasts', 'aria-hidden': 'true' });

  push(title: string, body = '', variant: '' | 'gold' | 'warn' = '', life = 4200): void {
    const t = h('div', { class: `toast ${variant}` }, h('strong', { text: title }), body);
    this.root.prepend(t);
    while (this.root.children.length > 3) this.root.lastElementChild?.remove();
    setTimeout(() => {
      t.classList.add('out');
      setTimeout(() => t.remove(), 320);
    }, life);
  }
}

/** Polite screen-reader announcements, throttled so pokes don't spam. */
export class Announcer {
  readonly root = h('div', { class: 'sr-only', 'aria-live': 'polite', role: 'status' });
  private last = 0;
  say(text: string, force = false): void {
    const now = performance.now();
    if (!force && now - this.last < 1500) return;
    this.last = now;
    this.root.textContent = text;
  }
}

// ── Era title card ─────────────────────────────────────────────────────

export function showEraCard(host: HTMLElement, era: number, reduced: boolean): void {
  const e = ERAS[era];
  const card = h('div', { class: `era-card ${reduced ? 'static' : ''}`, 'aria-hidden': 'true' },
    h('div', { class: 'num', text: `Era ${e.numeral}` }),
    h('div', { class: 'title', text: e.name }),
    h('div', { class: 'tag', text: e.tagline }),
  );
  host.append(card);
  setTimeout(() => card.remove(), reduced ? 2600 : 3700);
}

// ── Settings drawer ────────────────────────────────────────────────────

export interface SettingsCallbacks {
  change(s: Settings): void;
  exportSave(): string;
  importSave(text: string): boolean;
  hardReset(): void;
  sound(kind: UiSound): void;
}

export function openSettings(settings: Settings, cb: SettingsCallbacks): void {
  const s = { ...settings };
  const commit = (): void => cb.change({ ...s });
  const slider = (label: string, key: 'master' | 'sfx' | 'music' | 'shake'): HTMLElement => {
    const input = h('input', { type: 'range', min: '0', max: '1', step: '0.05', id: `set-${key}`, value: String(s[key]) }) as HTMLInputElement;
    input.addEventListener('input', () => {
      s[key] = Number(input.value);
      commit();
    });
    return h('div', { class: 'field' }, h('label', { for: `set-${key}`, text: label }), input);
  };
  const toggle = (label: string, key: 'muted' | 'reducedMotion' | 'flashes' | 'floaters', invert = false): HTMLElement => {
    const btn = h('button', { class: 'key toggle' }) as HTMLButtonElement;
    const sync = (): void => {
      const on = invert ? !s[key] : s[key];
      btn.setAttribute('aria-pressed', String(on));
      btn.textContent = on ? 'On' : 'Off';
    };
    btn.addEventListener('click', () => {
      s[key] = !s[key];
      sync();
      commit();
      cb.sound('toggle');
    });
    sync();
    return h('div', { class: 'field' }, h('label', { text: label }), btn);
  };
  const quality = h('select', { id: 'set-quality' },
    ...(['auto', 'high', 'medium', 'low'] as Quality[]).map((q) => h('option', { value: q, text: q === 'auto' ? 'Auto (adapts to your device)' : q[0].toUpperCase() + q.slice(1), selected: s.quality === q })),
  ) as HTMLSelectElement;
  quality.addEventListener('change', () => {
    s.quality = quality.value as Quality;
    commit();
  });
  const notation = h('select', { id: 'set-notation' },
    h('option', { value: 'suffix', text: '1.23M, 4.5B', selected: s.notation === 'suffix' }),
    h('option', { value: 'scientific', text: '1.23e6', selected: s.notation === 'scientific' }),
  ) as HTMLSelectElement;
  notation.addEventListener('change', () => {
    s.notation = notation.value === 'scientific' ? 'scientific' : 'suffix';
    commit();
  });

  const box = h('textarea', { class: 'save-box', 'aria-label': 'Save data', placeholder: 'Paste a save here to import it, or press Export to copy yours.' }) as HTMLTextAreaElement;
  const status = h('p', { class: 'hint', 'aria-live': 'polite' });
  let resetArmed = false;
  const resetBtn = h('button', { class: 'key danger' }, 'Reset everything…') as HTMLButtonElement;
  resetBtn.addEventListener('click', () => {
    if (!resetArmed) {
      resetArmed = true;
      resetBtn.textContent = 'Click again to erase all progress';
      status.textContent = 'This deletes every timeline, feat and Paranoia point. It cannot be undone.';
      return;
    }
    cb.hardReset();
  });

  const close = (): void => {
    el.remove();
    document.removeEventListener('keydown', onKey);
    cb.sound('close');
  };
  const onKey = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') close();
  };
  const el = h('div', { class: 'overlay drawer', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'settings-title' },
    h('div', { class: 'sheet' },
      h('h2', { id: 'settings-title' }, 'Settings', h('button', { class: 'key icon-key', 'aria-label': 'Close settings', onclick: close }, '✕')),
      h('div', { class: 'section-title' }, h('span', { text: 'Sound' })),
      toggle('Sound', 'muted', true),
      slider('Master volume', 'master'),
      slider('Effects', 'sfx'),
      slider('Music', 'music'),
      h('div', { class: 'section-title' }, h('span', { text: 'Visuals & comfort' })),
      h('div', { class: 'field' }, h('label', { for: 'set-quality', text: 'Graphics quality' }), quality),
      toggle('Reduced motion', 'reducedMotion'),
      toggle('Screen flashes', 'flashes'),
      slider('Screen shake', 'shake'),
      toggle('Floating numbers', 'floaters'),
      h('div', { class: 'field' }, h('label', { for: 'set-notation', text: 'Big numbers' }), notation),
      h('div', { class: 'section-title' }, h('span', { text: 'Your save' })),
      h('p', { class: 'hint', text: 'The game saves automatically in this browser every few seconds.' }),
      box,
      h('div', { class: 'btn-row' },
        h('button', {
          class: 'key',
          onclick: async () => {
            box.value = cb.exportSave();
            box.select();
            try {
              await navigator.clipboard.writeText(box.value);
              status.textContent = 'Save copied to your clipboard.';
            } catch {
              status.textContent = 'Save exported below. Copy it somewhere safe.';
            }
          },
        }, 'Export save'),
        h('button', {
          class: 'key',
          onclick: () => {
            status.textContent = cb.importSave(box.value) ? 'Save imported.' : 'That doesn’t look like a Freakmoji save. Check you pasted all of it.';
          },
        }, 'Import save'),
        resetBtn,
      ),
      status,
      h('p', { class: 'fineprint', text: 'Freakmoji Clicker: Reality Breach · All sound and art is generated in your browser · MIT licensed' }),
    ),
  );
  el.addEventListener('click', (e) => {
    if (e.target === el) close();
  });
  document.addEventListener('keydown', onKey);
  document.body.append(el);
  cb.sound('open');
  (el.querySelector('.sheet button') as HTMLButtonElement | null)?.focus();
}
