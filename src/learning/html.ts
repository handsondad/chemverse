export class SafeHtml {
  constructor(readonly value: string) {}
  toString(): string {
    return this.value;
  }
}

const entities: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, char => entities[char]);
}

export function raw(markup: string): SafeHtml {
  return new SafeHtml(markup);
}

function interpolate(value: unknown): string {
  if (value instanceof SafeHtml) return value.value;
  if (Array.isArray(value)) return value.map(interpolate).join('');
  if (value === null || value === undefined) return '';
  return escapeHtml(String(value));
}

/**
 * Builds markup in which every interpolated value is escaped unless it is already SafeHtml.
 * Line breaks in the template source, with the indentation around them, are not emitted.
 */
export function html(strings: TemplateStringsArray, ...values: unknown[]): SafeHtml {
  let markup = '';
  strings.forEach((chunk, i) => {
    markup += chunk.replace(/\s*\n\s*/g, '');
    if (i < values.length) markup += interpolate(values[i]);
  });
  return new SafeHtml(markup);
}

export function setHtml(target: Element, markup: SafeHtml): void {
  target.innerHTML = markup.value;
}
