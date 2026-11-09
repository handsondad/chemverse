import { html, raw, type SafeHtml } from './html';

const paths: Record<string, string> = {
  home: '<path d="m3 10 9-7 9 7v10H3Z"/><path d="M9 20v-7h6v7"/>',
  path: '<circle cx="6" cy="5" r="2"/><circle cx="18" cy="19" r="2"/><path d="M6 7v5h12v5"/>',
  book: '<path d="M12 5C8 2 4 3 2 4v15c4-2 7-1 10 1 3-2 6-3 10-1V4c-2-1-6-2-10 1v15"/>',
  atom: '<circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>',
  molecule: '<circle cx="8" cy="14" r="4"/><circle cx="18" cy="6" r="3"/><circle cx="19" cy="19" r="2"/><path d="m11 11 5-3m-4 8 5 2"/>',
  flask: '<path d="M9 3h6m-5 0v7L4 20a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1l-6-10V3M7 15h10"/>',
  reaction: '<path d="M3 7h17l-4-4M21 17H4l4 4"/>',
  drop: '<path d="M12 2C9 7 4 11 4 15a8 8 0 0 0 16 0c0-4-5-8-8-13Z"/><path d="M8 15a4 4 0 0 0 4 4"/>',
  bolt: '<path d="m13 2-9 12h7l-1 8 10-12h-7Z"/>',
  factory: '<path d="M3 21V10l6 4V8l6 4V3h5v18ZM7 17h1m4 0h1m4 0h1"/>',
  table: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18m6-18v18"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  back: '<path d="M20 12H4m6-6-6 6 6 6"/>',
  play: '<path d="m8 4 12 8-12 8Z"/>',
  search: '<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  progress: '<path d="M4 20V10m8 10V4m8 16v-7"/>',
  spark: '<path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z"/><path d="m19 16 .9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9Z"/>',
  shuffle: '<path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>',
  expand: '<path d="M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5"/>',
};

export function icon(name: string, className = ''): SafeHtml {
  return html`<svg class="icon ${className}" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${raw(paths[name] ?? paths.book)}</svg>`;
}

export function chapterArt(name: string): SafeHtml {
  return html`<div class="chapter-art art-${name}" aria-hidden="true"><div class="art-orbit orbit-one"></div><div class="art-orbit orbit-two"></div><div class="art-core">${icon(name)}</div><span class="art-dot dot-one"></span><span class="art-dot dot-two"></span><span class="art-dot dot-three"></span></div>`;
}
