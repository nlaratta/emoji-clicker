export type Notation = 'suffix' | 'scientific';

const SUFFIXES = [
  '', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No',
  'Dc', 'UDc', 'DDc', 'TDc', 'QaDc', 'QiDc', 'SxDc', 'SpDc', 'OcDc', 'NoDc', 'Vg',
];

let notation: Notation = 'suffix';
export function setNotation(n: Notation): void {
  notation = n;
}

function trimFixed(v: number, digits: number): string {
  return v.toFixed(digits).replace(/\.?0+$/, '');
}

/** Compact number for HUD display: 999, 1.23K, 45.6M, 7.89e72. */
export function fmt(n: number, precise = false): string {
  if (!Number.isFinite(n)) return n > 0 ? '∞' : '0';
  if (n < 0) return '-' + fmt(-n, precise);
  if (n < 1000) {
    if (precise && n < 100 && n % 1 !== 0) return trimFixed(n, n < 10 ? 2 : 1);
    return Math.floor(n).toLocaleString('en-US');
  }
  const exp = Math.floor(Math.log10(n));
  if (notation === 'scientific' || exp >= SUFFIXES.length * 3) {
    const m = n / Math.pow(10, exp);
    return `${m.toFixed(2)}e${exp}`;
  }
  const tier = Math.floor(exp / 3);
  const scaled = n / Math.pow(10, tier * 3);
  const digits = scaled >= 100 ? 1 : 2;
  return `${trimFixed(scaled, digits)}${SUFFIXES[tier]}`;
}

/** Per-second rates keep a decimal when small. */
export function fmtRate(n: number): string {
  return fmt(n, true);
}

export function fmtTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return '—';
  if (sec < 1) return '<1s';
  const s = Math.floor(sec % 60);
  const m = Math.floor((sec / 60) % 60);
  const h = Math.floor((sec / 3600) % 24);
  const d = Math.floor(sec / 86400);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export function fmtMult(x: number): string {
  return `×${x >= 1000 ? fmt(x) : trimFixed(x, x < 10 ? 2 : 1)}`;
}

export function fmtPct(x: number): string {
  return `${trimFixed(x * 100, x * 100 < 10 ? 1 : 0)}%`;
}
