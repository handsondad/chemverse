export function getElement<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Element #${id} not found`);
  return el as T;
}

export function queryElement<T extends Element = HTMLElement>(selector: string, root: ParentNode = document): T {
  const el = root.querySelector<T>(selector);
  if (!el) throw new Error(`Element ${selector} not found`);
  return el;
}

export function formatValue(val: number | string | null | undefined, fallback = '—'): string {
  if (val === null || val === undefined || val === 0 || val === '') {
    return fallback;
  }
  if (typeof val === 'number') {
    if (Math.abs(val) < 0.01) return String(Number(val.toPrecision(4)));
    return Number.isInteger(val) ? String(val) : val.toFixed(4).replace(/\.?0+$/, '');
  }
  return String(val);
}

export function formatTileValue(val: number | string | null | undefined, fallback = '—'): string {
  if (val === null || val === undefined || val === 0 || val === '') {
    return fallback;
  }
  if (typeof val === 'number') {
    const abs = Math.abs(val);
    if (abs >= 100) return String(Math.round(val));
    if (abs >= 10) return String(Number(val.toFixed(1)));
    if (abs >= 0.01) return String(Number(val.toFixed(2)));
    return String(Number(val.toPrecision(2)));
  }
  return String(val);
}
