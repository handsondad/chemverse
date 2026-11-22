/**
 * 实验台课件跑在 `sandbox="allow-scripts"` 的 iframe 里，来源是不透明的，浏览器不给它留字体缓存：
 * 每打开一次，手写体（马善政楷书按字切成的几十块）都要从头下载，「看懂原理」的说明卡头几秒一半手写一半雅黑，
 * 和之后秒开的「自由实验台」看着不是一种字。网站自己的字体缓存是长期有效的，所以由网站替课件取字体：
 * 课件把要显示的字发过来，这里按 Google Fonts 样式表里每块的 `unicode-range` 挑出用得上的几块，
 * 从网站的缓存里拿出来交回去，课件用 `FontFace` 装上（见 `public/theme/lesson-adapter.js`）。
 */

const FALLBACK_CSS = 'https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&family=Ma+Shan+Zheng&display=swap';

export interface FontChunk {
  family: string;
  weight: string;
  style: string;
  unicodeRange: string;
  url: string;
  ranges: Array<[number, number]>;
}

export interface FontFaceData {
  family: string;
  weight: string;
  style: string;
  unicodeRange: string;
  data: ArrayBuffer;
}

const descriptor = (block: string, name: string): string =>
  block.match(new RegExp(`${name}\\s*:\\s*([^;]+);`))?.[1].trim() ?? '';

function parseRanges(value: string): Array<[number, number]> {
  return value.split(',').flatMap(part => {
    const token = part.trim().replace(/^U\+/i, '');
    if (!token) return [];
    const [start, end = start] = token.includes('-')
      ? token.split('-')
      : [token.replace(/\?/g, '0'), token.replace(/\?/g, 'F')];
    const range: [number, number] = [parseInt(start, 16), parseInt(end, 16)];
    return Number.isNaN(range[0]) || Number.isNaN(range[1]) ? [] : [range];
  });
}

export function parseFontCss(css: string, base = FALLBACK_CSS): FontChunk[] {
  return [...css.matchAll(/@font-face\s*\{([^}]*)\}/g)].flatMap(([, block]) => {
    const url = block.match(/url\(\s*['"]?([^'")]+)['"]?\s*\)/)?.[1];
    if (!url) return [];
    const unicodeRange = descriptor(block, 'unicode-range');
    return [{
      family: descriptor(block, 'font-family').replace(/['"]/g, ''),
      weight: descriptor(block, 'font-weight') || '400',
      style: descriptor(block, 'font-style') || 'normal',
      unicodeRange,
      url: new URL(url, base).href,
      ranges: unicodeRange ? parseRanges(unicodeRange) : [[0, 0x10ffff]],
    }];
  });
}

/** 只挑这段文字真用得上的分块 */
export function pickChunks(chunks: FontChunk[], text: string): FontChunk[] {
  const codes = [...new Set(Array.from(text, char => char.codePointAt(0) ?? 0))];
  return chunks.filter(chunk => codes.some(code => chunk.ranges.some(([start, end]) => code >= start && code <= end)));
}

let chunkList: Promise<FontChunk[]> | undefined;
const files = new Map<string, Promise<ArrayBuffer>>();

function fontChunks(): Promise<FontChunk[]> {
  const href = document.querySelector<HTMLLinkElement>('link[href*="fonts.googleapis.com/css2"]')?.href ?? FALLBACK_CSS;
  chunkList ??= fetch(href)
    .then(response => (response.ok ? response.text() : ''))
    .then(css => parseFontCss(css, href))
    .catch(() => {
      chunkList = undefined;
      return [];
    });
  return chunkList;
}

function fontFile(url: string): Promise<ArrayBuffer> {
  let file = files.get(url);
  if (!file) {
    file = fetch(url).then(response => {
      if (!response.ok) throw new Error(`font ${response.status}`);
      return response.arrayBuffer();
    });
    file.catch(() => files.delete(url));
    files.set(url, file);
  }
  return file;
}

export async function fontsFor(text: string): Promise<FontFaceData[]> {
  const chunks = pickChunks(await fontChunks(), text);
  const loaded = await Promise.all(chunks.map(chunk => fontFile(chunk.url).then(
    data => ({ family: chunk.family, weight: chunk.weight, style: chunk.style, unicodeRange: chunk.unicodeRange, data }),
    () => undefined,
  )));
  return loaded.filter((face): face is FontFaceData => Boolean(face));
}

/** 课件发来 `<prefix>:font-request`，把字体数据回给它；不是这个消息就返回 false */
export function answerFontRequest(data: object, prefix: string, target: Window | null | undefined): boolean {
  if (!('type' in data) || data.type !== `${prefix}:font-request` || !('text' in data) || typeof data.text !== 'string') return false;
  const id = 'id' in data ? data.id : undefined;
  void fontsFor(data.text.slice(0, 20000)).then(faces => {
    target?.postMessage({ type: `${prefix}:fonts`, id, faces }, '*');
  });
  return true;
}
