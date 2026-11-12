import lite from '../data/elements-lite.json';
import { categories } from '../config/categories';
import { html, raw, type SafeHtml } from './html';
import { crystalSvg, type CrystalName } from './crystal';

/**
 * 爸爸讲解时配的图：画在爸爸的气泡里，让文章图文并茂；不需要动画的课就靠它们讲清楚。
 * 元素数据来自 `elements-lite.json`（由 elements.json 精简而来，只留画图要用的几项）。
 */

type LiteRow = [number, string, string, number, number, number, number, number, number, string, string];

export interface Atom {
  n: number;
  sym: string;
  name: string;
  /** 在周期表里的列和行；镧系、锕系在第 9、10 行 */
  col: number;
  row: number;
  cat: number;
  radius: number;
  en: number;
  ip: number;
  shells: number[];
  phase: 'g' | 'l' | 's';
}

export const atoms: readonly Atom[] = (lite as unknown as LiteRow[]).map(([n, sym, name, col, row, cat, radius, en, ip, shells, phase]) => ({
  n, sym, name, col, row, cat, radius, en, ip, shells: shells ? shells.split('.').map(Number) : [], phase: phase as Atom['phase'],
}));

export const atomAt = (n: number): Atom => {
  const found = atoms[n - 1];
  if (!found) throw new Error(`没有第 ${n} 号元素`);
  return found;
};

/** 真正的周期表（可点元素看详情）要切到的样子 */
export type TableMode = 'default' | 'radius' | 'en' | 'ip' | 'melt' | 'boil' | 'density';
export interface TableView {
  readonly mode?: TableMode;
  readonly category?: number;
}
export interface TableLink extends TableView {
  /** 按钮上的字，比如「在周期表里看原子半径」 */
  readonly label: string;
}

export interface TableFocus {
  readonly by: 'group' | 'period' | 'category' | 'atoms';
  readonly values: readonly number[];
}
/** 周期表上的箭头，坐标是 [列, 行]（可以是小数） */
export interface TableArrow {
  readonly from: readonly [number, number];
  readonly to: readonly [number, number];
  readonly text: string;
}

/** 一根碳链：碳原子连成一串，四周挂满氢 */
export interface Chain {
  /** 碳原子个数，1–30 */
  readonly carbons: number;
  readonly label: string;
  /** 链头是碳碳双键（烯烃），那两个碳各少一个氢 */
  readonly double?: boolean;
  /** 用橙色标出要看的那一根 */
  readonly hot?: boolean;
}

/** 分馏塔的一段出口，从塔顶往下排 */
export interface TowerCut {
  readonly name: string;
  /** 一句说明：碳数、用途，≤14 字 */
  readonly note: string;
  readonly hot?: boolean;
}

/** 百点图里的一组：占 100 份里的 count 份 */
export interface DotGroup {
  readonly label: string;
  readonly count: number;
  /** 图例里写的份数，默认「N 份」，比如「不到 1 份」 */
  readonly amount?: string;
  /** 图例第二行的说明 */
  readonly note?: string;
  readonly hot?: boolean;
}

/** 色阶横尺里的一档：一段温度区间或一档酸碱颜色 */
export interface ScaleStop {
  /** 色块里的短标签，≤7 字 */
  readonly label: string;
  /** 色块下方的说明，≤9 字 */
  readonly note: string;
  /** 代表色（#rrggbb） */
  readonly color: string;
  readonly hot?: boolean;
}

export type Figure =
  /** 小号周期表：按类别 / 半径 / 电负性 / 状态上色，可以只亮某几列、某几行，画出金属与非金属的分界线 */
  | {
    readonly kind: 'table';
    readonly caption: string;
    readonly paint?: 'category' | 'radius' | 'en' | 'phase';
    readonly focus?: TableFocus;
    readonly ring?: readonly number[];
    readonly staircase?: boolean;
    readonly arrows?: readonly TableArrow[];
    readonly link?: TableLink;
  }
  /** 按原子序数排开的柱状图，看性质怎么一轮一轮重复 */
  | { readonly kind: 'trend'; readonly caption: string; readonly property: 'radius' | 'ip'; readonly upTo: number; readonly marks?: readonly number[]; readonly link?: TableLink }
  /** 几个原子的电子分层，最外层电子标成橙色 */
  | { readonly kind: 'shells'; readonly caption: string; readonly atoms: readonly number[]; readonly link?: TableLink }
  /** 几个原子按真实半径比例画成圆 */
  | { readonly kind: 'sizes'; readonly caption: string; readonly atoms: readonly number[]; readonly link?: TableLink }
  /** 几根碳链按同一比例排开比长短；带 then 时画一个箭头，表示变成了下面这几根（比如裂化） */
  | { readonly kind: 'chains'; readonly caption: string; readonly chains: readonly Chain[]; readonly then?: { readonly via: string; readonly chains: readonly Chain[] } }
  /** 分馏塔：越往上越凉，每段出口接走一种产品 */
  | { readonly kind: 'tower'; readonly caption: string; readonly cuts: readonly TowerCut[] }
  /** 百点图：一个整体分成 10×10 个点，按组上色，看谁占了多少 */
  | { readonly kind: 'dots'; readonly caption: string; readonly groups: readonly DotGroup[] }
  /** 色阶横尺：3–5 档温度区间或酸碱变色带横向排开对比 */
  | { readonly kind: 'scale'; readonly caption: string; readonly axis?: string; readonly stops: readonly ScaleStop[] }
  /** 能拖着转的晶体球棍模型：金刚石、石墨（三层）、石墨烯（一层）、食盐 */
  | { readonly kind: 'crystal'; readonly caption: string; readonly structure: CrystalName }
  /** 真正的元素周期表，直接嵌在文章里（每篇最多一张） */
  | { readonly kind: 'live'; readonly caption: string; readonly view?: TableView }
  | { readonly kind: 'image'; readonly src: string; readonly alt: string; readonly caption: string };

const INK = '#5d4e37';
const FADED = '#c9bca6';
const HOT = '#e8590c';
const CELL = 30;
const PITCH = 32;
const LEFT = 22;
const TOP = 18;

const fmt = (value: number): string => String(Math.round(value * 10) / 10);

function heat(ratio: number): { fill: string; stroke: string; ink: string } {
  const hue = 215 - ratio * 205;
  return { fill: `hsl(${fmt(hue)},68%,${fmt(88 - ratio * 16)}%)`, stroke: `hsl(${fmt(hue)},50%,64%)`, ink: `hsl(${fmt(hue)},55%,24%)` };
}

function range(values: number[]): (value: number) => number {
  const present = values.filter(value => value > 0);
  const min = Math.min(...present);
  const max = Math.max(...present);
  return value => (max === min ? 0 : (value - min) / (max - min));
}

/** 镧系、锕系那两行往上挪半格，和主表隔开一点 */
const rowY = (row: number): number => TOP + (row > 7 ? row - 1.5 : row - 1) * PITCH;
const colX = (col: number): number => LEFT + (col - 1) * PITCH;
const periodOf = (atom: Atom): number => (atom.row === 9 ? 6 : atom.row === 10 ? 7 : atom.row);

function focused(atom: Atom, focus?: TableFocus): boolean {
  if (!focus) return true;
  if (focus.by === 'atoms') return focus.values.includes(atom.n);
  if (focus.by === 'category') return focus.values.includes(atom.cat);
  if (focus.by === 'period') return focus.values.includes(periodOf(atom));
  return atom.row <= 7 && focus.values.includes(atom.col);
}

function arrowMarkup(from: readonly [number, number], to: readonly [number, number], text: string): string {
  const [x1, y1] = [colX(from[0]) + CELL / 2, rowY(from[1]) + CELL / 2];
  const [x2, y2] = [colX(to[0]) + CELL / 2, rowY(to[1]) + CELL / 2];
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const head = [angle + 2.6, angle - 2.6].map(a => `${fmt(x2 + Math.cos(a) * 11)},${fmt(y2 + Math.sin(a) * 11)}`).join(' ');
  const [mx, my] = [(x1 + x2) / 2, (y1 + y2) / 2];
  const vertical = Math.abs(y2 - y1) > Math.abs(x2 - x1);
  return `<line x1="${fmt(x1)}" y1="${fmt(y1)}" x2="${fmt(x2)}" y2="${fmt(y2)}" stroke="${HOT}" stroke-width="3.5" stroke-linecap="round"/>`
    + `<polygon points="${fmt(x2)},${fmt(y2)} ${head}" fill="${HOT}"/>`
    + `<text x="${fmt(vertical ? mx + 10 : mx)}" y="${fmt(vertical ? my : my - 9)}" text-anchor="${vertical ? 'start' : 'middle'}" class="fig-callout">${escapeText(text)}</text>`;
}

function escapeText(text: string): string {
  return text.replace(/[&<>]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[char] ?? char));
}

function tableSvg(figure: Extract<Figure, { kind: 'table' }>): string {
  const paint = figure.paint ?? 'category';
  const scale = paint === 'radius' || paint === 'en' ? range(atoms.map(atom => atom[paint])) : undefined;
  let cells = '';
  for (const atom of atoms) {
    const x = colX(atom.col);
    const y = rowY(atom.row);
    const on = focused(atom, figure.focus);
    let fill = '#f3eee6';
    let stroke = 'none';
    let ink = FADED;
    if (on) {
      if (scale) {
        const value = paint === 'radius' ? atom.radius : atom.en;
        const tone = value > 0 ? heat(scale(value)) : { fill: '#efe9df', stroke: '#e2d8c6', ink: '#a8987a' };
        ({ fill, stroke, ink } = tone);
      } else if (paint === 'phase') {
        fill = { g: '#cfe8ff', l: '#ffd59a', s: '#f1e7d6' }[atom.phase];
        stroke = { g: '#7fb4e6', l: '#e6a24a', s: '#d6c6a8' }[atom.phase];
        ink = INK;
      } else {
        const color = categories[atom.cat]?.color ?? '#999';
        fill = `${color}38`;
        stroke = `${color}99`;
        ink = INK;
      }
    }
    cells += `<rect x="${x}" y="${y}" width="${CELL}" height="${CELL}" rx="5" fill="${fill}" stroke="${stroke}"/>`
      + `<text x="${x + CELL / 2}" y="${y + 19.5}" text-anchor="middle" class="fig-sym" fill="${ink}">${atom.sym}</text>`;
  }
  const rings = (figure.ring ?? []).map(n => {
    const atom = atomAt(n);
    return `<rect x="${colX(atom.col) - 2}" y="${rowY(atom.row) - 2}" width="${CELL + 4}" height="${CELL + 4}" rx="7" fill="none" stroke="${HOT}" stroke-width="2.5"/>`;
  }).join('');
  const heads = Array.from({ length: 18 }, (_, i) => `<text x="${colX(i + 1) + CELL / 2}" y="${TOP - 5}" text-anchor="middle" class="fig-axis">${i + 1}</text>`).join('')
    + Array.from({ length: 7 }, (_, i) => `<text x="${LEFT - 7}" y="${rowY(i + 1) + 19}" text-anchor="end" class="fig-axis">${i + 1}</text>`).join('');
  const stair = figure.staircase
    ? `<polyline points="${[[12, 1], [12, 2], [13, 2], [13, 3], [14, 3], [14, 4], [15, 4], [15, 5], [16, 5], [16, 7]]
      .map(([c, r]) => `${LEFT + c * PITCH - 1},${TOP + r * PITCH - 1}`).join(' ')}" fill="none" stroke="${HOT}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>`
    : '';
  const arrows = (figure.arrows ?? []).map(arrow => arrowMarkup(arrow.from, arrow.to, arrow.text)).join('');
  return `<svg class="fig-svg" viewBox="0 0 600 324" role="img" aria-label="${escapeText(figure.caption)}">${heads}${cells}${rings}${stair}${arrows}</svg>`;
}

function tableLegend(figure: Extract<Figure, { kind: 'table' }>): SafeHtml {
  const paint = figure.paint ?? 'category';
  if (paint === 'radius' || paint === 'en') {
    return html`<p class="fig-scale"><span>${paint === 'radius' ? '原子小' : '抢电子弱'}</span><i></i><span>${paint === 'radius' ? '原子大' : '抢电子强'}</span></p>`;
  }
  if (paint === 'phase') {
    return html`<ul class="fig-legend"><li><i style="background:#cfe8ff"></i>常温是气体</li><li><i style="background:#ffd59a"></i>液体</li><li><i style="background:#f1e7d6"></i>固体</li></ul>`;
  }
  const shown = new Set(atoms.filter(atom => focused(atom, figure.focus)).map(atom => atom.cat));
  return html`<ul class="fig-legend">${categories.map((category, id) => shown.has(id) ? html`<li><i style="background:${category.color}"></i>${category.name}</li>` : '')}</ul>`;
}

const PERIOD_ENDS = [2, 10, 18, 36, 54, 86, 118];

function trendSvg(figure: Extract<Figure, { kind: 'trend' }>): string {
  const list = atoms.slice(0, figure.upTo);
  const values = list.map(atom => atom[figure.property]);
  const max = Math.max(...values);
  const [width, height, left, bottom, top] = [600, 250, 12, 24, 34];
  const step = (width - left - 8) / list.length;
  const y = (value: number): number => top + (height - top - bottom) * (1 - value / max);
  let bars = '';
  list.forEach((atom, i) => {
    const value = values[i];
    if (value <= 0) return;
    const x = left + i * step;
    const color = categories[atom.cat]?.color ?? '#999';
    bars += `<rect x="${fmt(x + 0.6)}" y="${fmt(y(value))}" width="${fmt(Math.max(step - 1.2, 1))}" height="${fmt(height - bottom - y(value))}" rx="1.5" fill="${color}" fill-opacity="0.78"/>`;
  });
  const marks = (figure.marks ?? []).filter(n => n <= list.length).map(n => {
    const value = values[n - 1];
    const x = left + (n - 1) * step + step / 2;
    return `<circle cx="${fmt(x)}" cy="${fmt(y(value))}" r="3" fill="${HOT}"/><text x="${fmt(x)}" y="${fmt(y(value) - 7)}" text-anchor="middle" class="fig-mark">${atomAt(n).sym}</text>`;
  }).join('');
  const periods = PERIOD_ENDS.filter(n => n < list.length).map((n, i) => {
    const x = left + n * step;
    return `<line x1="${fmt(x)}" y1="4" x2="${fmt(x)}" y2="${height - bottom}" stroke="#d8c9b0" stroke-dasharray="3 3"/>`
      + (x > width - 50
        ? `<text x="${fmt(x - 3)}" y="13" text-anchor="end" class="fig-axis">第${i + 2}周期 →</text>`
        : `<text x="${fmt(x + 3)}" y="13" class="fig-axis">第${i + 2}周期</text>`);
  }).join('');
  const unit = figure.property === 'radius' ? '原子半径（pm）' : '第一电离能（kJ/mol）';
  return `<svg class="fig-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeText(figure.caption)}">`
    + `<line x1="${left}" y1="${height - bottom}" x2="${width - 6}" y2="${height - bottom}" stroke="#bfae92"/>`
    + `<text x="${left}" y="${height - 6}" class="fig-axis">柱高：${unit}</text><text x="${width - 6}" y="${height - 6}" text-anchor="end" class="fig-axis">原子序数 →</text>`
    + `${periods}${bars}${marks}</svg>`;
}

function shellsSvg(figure: Extract<Figure, { kind: 'shells' }>): string {
  const list = figure.atoms.map(atomAt);
  const most = Math.max(...list.map(atom => atom.shells.length));
  const outer = 22 + 13 * (most - 1);
  const panel = outer * 2 + 22;
  const height = outer * 2 + 56;
  const body = list.map((atom, i) => {
    const cx = panel * i + panel / 2;
    const cy = outer + 8;
    let markup = '';
    atom.shells.forEach((count, s) => {
      const r = 22 + 13 * s;
      const last = s === atom.shells.length - 1;
      markup += `<circle cx="${fmt(cx)}" cy="${cy}" r="${r}" fill="none" stroke="#cfe0f7" stroke-width="1.6"/>`;
      for (let e = 0; e < count; e += 1) {
        const a = -Math.PI / 2 + (e / count) * Math.PI * 2 + s * 0.4;
        markup += `<circle cx="${fmt(cx + Math.cos(a) * r)}" cy="${fmt(cy + Math.sin(a) * r)}" r="${last ? 4 : 3}" fill="${last ? HOT : '#3d7bff'}"/>`;
      }
    });
    return `${markup}<circle cx="${fmt(cx)}" cy="${cy}" r="14" fill="#ffd7a0" stroke="#f0a64a"/>`
      + `<text x="${fmt(cx)}" y="${cy + 5}" text-anchor="middle" class="fig-sym" fill="${INK}">${atom.sym}</text>`
      + `<text x="${fmt(cx)}" y="${height - 26}" text-anchor="middle" class="fig-name">${atom.name} ${atom.sym}</text>`
      + `<text x="${fmt(cx)}" y="${height - 9}" text-anchor="middle" class="fig-axis">${atom.shells.join(' · ')}</text>`;
  }).join('');
  return `<svg class="fig-svg is-shells" viewBox="0 0 ${panel * list.length} ${height}" role="img" aria-label="${escapeText(figure.caption)}">${body}</svg>`;
}

function sizesSvg(figure: Extract<Figure, { kind: 'sizes' }>): string {
  const list = figure.atoms.map(atomAt);
  const max = Math.max(...list.map(atom => atom.radius));
  const radii = list.map(atom => Math.max((atom.radius / max) * 50, 6));
  const gap = 14;
  const width = radii.reduce((sum, r) => sum + r * 2 + gap, gap);
  const cy = 62;
  let x = gap;
  const body = list.map((atom, i) => {
    const r = radii[i];
    const cx = x + r;
    x += r * 2 + gap;
    const color = categories[atom.cat]?.color ?? '#999';
    return `<circle cx="${fmt(cx)}" cy="${cy}" r="${fmt(r)}" fill="${color}" fill-opacity="0.32" stroke="${color}" stroke-width="2"/>`
      + `<text x="${fmt(cx)}" y="${r > 13 ? cy + 5 : cy - r - 6}" text-anchor="middle" class="fig-sym" fill="${INK}">${atom.sym}</text>`
      + `<text x="${fmt(cx)}" y="${cy + 72}" text-anchor="middle" class="fig-name">${atom.name}</text>`
      + `<text x="${fmt(cx)}" y="${cy + 88}" text-anchor="middle" class="fig-axis">${atom.radius} pm</text>`;
  }).join('');
  return `<svg class="fig-svg" viewBox="0 0 ${fmt(width)} 158" role="img" aria-label="${escapeText(figure.caption)}">${body}</svg>`;
}

const CARBON = '#5b5650';
const HYDROGEN_EDGE = '#b8ad9c';
const BOND = '#cbbfae';

function chainRow(chain: Chain, y: number, x0: number, step: number): string {
  const r = Math.min(7, step * 0.42);
  const hr = r * 0.56;
  const reach = r + hr + 2;
  const ink = chain.hot ? HOT : CARBON;
  const xs = Array.from({ length: chain.carbons }, (_, i) => x0 + i * step);
  const hydrogens: [number, number][] = [];
  xs.forEach((x, i) => {
    const doubled = chain.double === true && i < 2;
    hydrogens.push([x, y - reach]);
    if (!doubled) hydrogens.push([x, y + reach]);
  });
  hydrogens.push([xs[0] - reach, y], [xs[xs.length - 1] + reach, y]);
  let bonds = hydrogens.map(([hx, hy]) => {
    const nearest = xs.reduce((best, x) => (Math.abs(x - hx) < Math.abs(best - hx) ? x : best), xs[0]);
    return `<line x1="${fmt(nearest)}" y1="${y}" x2="${fmt(hx)}" y2="${fmt(hy)}" stroke="${BOND}" stroke-width="1.2"/>`;
  }).join('');
  const doubleBond = chain.double === true && xs.length > 1;
  if (xs.length > 1) {
    const from = doubleBond ? xs[1] : xs[0];
    bonds += `<line x1="${fmt(from)}" y1="${y}" x2="${fmt(xs[xs.length - 1])}" y2="${y}" stroke="${ink}" stroke-width="2"/>`;
  }
  if (doubleBond) {
    bonds += [-2.6, 2.6].map(dy => `<line x1="${fmt(xs[0])}" y1="${fmt(y + dy)}" x2="${fmt(xs[1])}" y2="${fmt(y + dy)}" stroke="${ink}" stroke-width="2"/>`).join('');
  }
  const atomsMarkup = hydrogens.map(([hx, hy]) => `<circle cx="${fmt(hx)}" cy="${fmt(hy)}" r="${fmt(hr)}" fill="#fff" stroke="${HYDROGEN_EDGE}" stroke-width="1"/>`).join('')
    + xs.map(x => `<circle cx="${fmt(x)}" cy="${y}" r="${fmt(r)}" fill="${ink}"/>`).join('');
  const label = `<text x="${fmt(xs[0] - reach - hr)}" y="${fmt(y - reach - hr - 8)}" class="fig-label"${chain.hot ? ` style="fill:${HOT}"` : ''}>${escapeText(chain.label)}</text>`
    + `<text x="${fmt(xs[xs.length - 1] + reach + hr + 8)}" y="${y + 4.5}" class="fig-note">${chain.carbons} 个碳</text>`
    + (doubleBond ? `<text x="${fmt((xs[0] + xs[1]) / 2)}" y="${fmt(y + reach + hr + 14)}" text-anchor="middle" class="fig-note" style="fill:${HOT}">↑ 双键</text>` : '');
  return bonds + atomsMarkup + label;
}

function chainsSvg(figure: Extract<Figure, { kind: 'chains' }>): string {
  const after = figure.then?.chains ?? [];
  const longest = Math.max(...[...figure.chains, ...after].map(chain => chain.carbons));
  const width = 480;
  const x0 = 20;
  const step = Math.min(26, (width - x0 - 80) / Math.max(longest - 1, 1));
  const rowH = 66;
  let y = 42;
  let body = '';
  for (const chain of figure.chains) {
    body += chainRow(chain, y, x0, step);
    y += rowH;
  }
  if (figure.then) {
    const top = y - rowH + 22;
    const ax = x0 + 6;
    body += `<line x1="${ax}" y1="${top}" x2="${ax}" y2="${top + 22}" stroke="${HOT}" stroke-width="3.5" stroke-linecap="round"/>`
      + `<polygon points="${ax},${top + 31} ${ax - 7},${top + 20} ${ax + 7},${top + 20}" fill="${HOT}"/>`
      + `<text x="${ax + 16}" y="${top + 22}" class="fig-callout">${escapeText(figure.then.via)}</text>`;
    y += 30;
    for (const chain of after) {
      body += chainRow(chain, y, x0, step);
      y += rowH;
    }
  }
  const lastChains = after.length ? after : figure.chains;
  const bottomPad = lastChains[lastChains.length - 1]?.double ? 36 : 26;
  return `<svg class="fig-svg is-chains" viewBox="0 0 ${width} ${y - rowH + bottomPad}" role="img" aria-label="${escapeText(figure.caption)}">${body}</svg>`;
}

function towerSvg(figure: Extract<Figure, { kind: 'tower' }>, index: number): string {
  const segment = 52;
  const [colX0, colW, colTop] = [132, 96, 30];
  const colBottom = colTop + figure.cuts.length * segment + 30;
  const height = colBottom + 22;
  const gradient = `tower-${index}`;
  const pipeEnd = colX0 + colW + 40;
  const cuts = figure.cuts.map((cut, i) => {
    const y = colTop + 16 + i * segment + segment / 2;
    const color = cut.hot ? HOT : '#a8987a';
    const tray = i > 0 ? `<line x1="${colX0 + 8}" y1="${y - segment / 2}" x2="${colX0 + colW - 8}" y2="${y - segment / 2}" stroke="#ffffffdd" stroke-width="2" stroke-dasharray="6 5"/>` : '';
    const band = cut.hot ? `<rect x="${colX0 + 4}" y="${y - segment / 2 + 3}" width="${colW - 8}" height="${segment - 6}" rx="9" fill="#fff4e6aa" stroke="${HOT}" stroke-width="2.5"/>` : '';
    return tray + band
      + `<line x1="${colX0 + colW}" y1="${y}" x2="${pipeEnd}" y2="${y}" stroke="${color}" stroke-width="5" stroke-linecap="round"/>`
      + `<circle cx="${pipeEnd + 6}" cy="${y + 8}" r="4.5" fill="${color}"/>`
      + `<text x="${pipeEnd + 20}" y="${y - 2}" class="fig-label"${cut.hot ? ` style="fill:${HOT}"` : ''}>${escapeText(cut.name)}</text>`
      + `<text x="${pipeEnd + 20}" y="${y + 16}" class="fig-note">${escapeText(cut.note)}</text>`;
  }).join('');
  const vaporX = colX0 + 22;
  const vapor = Array.from({ length: Math.max(figure.cuts.length - 1, 1) }, (_, i) => {
    const y = colTop + 16 + (i + 1) * segment + 6;
    return `<path d="M${vaporX} ${y + 14} V${y} m-5 6 l5 -6 l5 6" fill="none" stroke="#9fb3c8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  }).join('');
  const inletY = colBottom - 26;
  return `<svg class="fig-svg is-tower" viewBox="0 0 460 ${height}" role="img" aria-label="${escapeText(figure.caption)}">`
    + `<defs><linearGradient id="${gradient}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9ecff"/><stop offset="1" stop-color="#ffc19a"/></linearGradient></defs>`
    + `<rect x="${colX0}" y="${colTop}" width="${colW}" height="${colBottom - colTop}" rx="30" fill="url(#${gradient})" stroke="#bfae92" stroke-width="2"/>`
    + `<text x="${colX0 + colW / 2}" y="${colTop - 10}" text-anchor="middle" class="fig-note">塔顶 · 最凉</text>`
    + `<text x="${colX0 - 12}" y="${colTop + 40}" text-anchor="end" class="fig-note">蒸气往上走</text>`
    + `<text x="${colX0 - 12}" y="${colTop + 58}" text-anchor="end" class="fig-note">越走越凉</text>`
    + cuts
    + vapor
    + `<line x1="10" y1="${inletY}" x2="${colX0 - 6}" y2="${inletY}" stroke="#6b5440" stroke-width="5" stroke-linecap="round"/>`
    + `<polygon points="${colX0 + 2},${inletY} ${colX0 - 11},${inletY - 7} ${colX0 - 11},${inletY + 7}" fill="#6b5440"/>`
    + `<text x="12" y="${inletY - 12}" class="fig-label">原油</text>`
    + `<text x="12" y="${inletY + 22}" class="fig-note">🔥 先加热到</text>`
    + `<text x="12" y="${inletY + 39}" class="fig-note">三百多度</text>`
    + `</svg>`;
}

const DOT_COLORS = ['#a9cbe8', '#bcd9a9', '#e5d3a2', '#d3c3e6'];

function dotsSvg(figure: Extract<Figure, { kind: 'dots' }>): string {
  const [cell, x0, y0] = [17, 16, 14];
  let quiet = 0;
  const colors = figure.groups.map(group => (group.hot ? HOT : DOT_COLORS[quiet++ % DOT_COLORS.length]));
  const fills = figure.groups.flatMap((group, i) => Array.from({ length: group.count }, () => ({ color: colors[i], hot: group.hot === true })));
  const dots = fills.map(({ color, hot }, i) => {
    const cx = x0 + (i % 10) * cell + cell / 2;
    const cy = y0 + Math.floor(i / 10) * cell + cell / 2;
    return hot
      ? `<circle cx="${cx}" cy="${cy}" r="7.5" fill="${color}" stroke="#fff" stroke-width="1.5"/><circle cx="${cx}" cy="${cy}" r="11" fill="none" stroke="${HOT}" stroke-width="1.5"/>`
      : `<circle cx="${cx}" cy="${cy}" r="6.5" fill="${color}"/>`;
  }).join('');
  const lx = x0 + 10 * cell + 30;
  const legend = figure.groups.map((group, i) => {
    const y = y0 + 22 + i * 58;
    const style = group.hot ? ` style="fill:${HOT}"` : '';
    return `<circle cx="${lx + 7}" cy="${y - 5}" r="7" fill="${colors[i]}"/>`
      + `<text x="${lx + 22}" y="${y}" class="fig-label"${style}>${escapeText(group.label)} · ${escapeText(group.amount ?? `${group.count} 份`)}</text>`
      + (group.note ? `<text x="${lx + 22}" y="${y + 20}" class="fig-note">${escapeText(group.note)}</text>` : '');
  }).join('');
  const height = Math.max(y0 * 2 + 10 * cell, y0 + figure.groups.length * 58 + 10);
  return `<svg class="fig-svg is-dots" viewBox="0 0 480 ${height}" role="img" aria-label="${escapeText(figure.caption)}">${dots}${legend}</svg>`;
}

function darkSwatch(hex: string): boolean {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return false;
  const [r, g, b] = [0, 2, 4].map(i => Number.parseInt(clean.slice(i, i + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b < 148;
}

function scaleSvg(figure: Extract<Figure, { kind: 'scale' }>): string {
  const width = 560;
  const padX = 14;
  const gap = 10;
  const count = figure.stops.length;
  const cellW = (width - padX * 2 - gap * (count - 1)) / count;
  const barTop = figure.axis ? 30 : 12;
  const barH = 44;
  const height = barTop + barH + 34;
  const header = figure.axis
    ? `<text x="${width / 2}" y="18" text-anchor="middle" class="fig-note">${escapeText(figure.axis)}</text>`
    : '';
  const body = figure.stops.map((stop, i) => {
    const x = padX + i * (cellW + gap);
    const cx = x + cellW / 2;
    const ink = darkSwatch(stop.color) ? '#ffffff' : INK;
    const ring = stop.hot
      ? `<rect x="${fmt(x - 2.5)}" y="${barTop - 2.5}" width="${fmt(cellW + 5)}" height="${barH + 5}" rx="14" fill="none" stroke="${HOT}" stroke-width="2.5"/>`
      : '';
    const sep = i > 0
      ? `<text x="${fmt(x - gap / 2)}" y="${barTop + barH / 2 + 4}" text-anchor="middle" class="fig-axis">›</text>`
      : '';
    return sep + ring
      + `<rect x="${fmt(x)}" y="${barTop}" width="${fmt(cellW)}" height="${barH}" rx="11" fill="${stop.color}" stroke="#d8c9b0" stroke-width="1"/>`
      + `<text x="${fmt(cx)}" y="${barTop + barH / 2 + 5}" text-anchor="middle" class="fig-scale-label" style="fill:${ink}">${escapeText(stop.label)}</text>`
      + `<text x="${fmt(cx)}" y="${barTop + barH + 21}" text-anchor="middle" class="fig-scale-note"${stop.hot ? ` style="fill:${HOT};font-weight:700"` : ''}>${escapeText(stop.note)}</text>`;
  }).join('');
  return `<svg class="fig-svg is-scale" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeText(figure.caption)}">${header}${body}</svg>`;
}

function linkButton(link?: TableLink): SafeHtml | '' {
  if (!link) return '';
  return html`<button type="button" class="fig-link" data-table-mode="${link.mode ?? 'default'}" data-table-category="${link.category ?? ''}">🔍 ${link.label}</button>`;
}

const CRYSTAL_KEYS: Record<CrystalName, readonly { swatch: string; text: string }[]> = {
  diamond: [{ swatch: 'is-carbon', text: '碳原子' }, { swatch: 'is-bond', text: '共价键' }, { swatch: 'is-hand', text: '一个碳的四只手' }, { swatch: 'is-edge', text: '晶胞的边' }],
  graphite: [{ swatch: 'is-carbon', text: '碳原子' }, { swatch: 'is-bond', text: '层里的共价键' }, { swatch: 'is-hand', text: '一个碳的三只手' }, { swatch: 'is-weak', text: '层与层：很弱的吸引' }],
  graphene: [{ swatch: 'is-carbon', text: '碳原子' }, { swatch: 'is-bond', text: '共价键' }, { swatch: 'is-hand', text: '一个碳的三只手' }],
  salt: [{ swatch: 'is-sodium', text: '钠离子 Na⁺' }, { swatch: 'is-chloride', text: '氯离子 Cl⁻' }],
};

function crystalLegend(name: CrystalName): SafeHtml {
  return html`<ul class="fig-legend fig-crystal-legend">
    ${CRYSTAL_KEYS[name].map(key => html`<li><i class="${key.swatch}"></i>${key.text}</li>`)}
    <li class="fig-crystal-hint">👆 拖一拖，转着看</li>
  </ul>`;
}

/** 画在爸爸气泡里的图；`live` 只占个位，由文章页把真正的周期表搬进来 */
export function renderFigure(figure: Figure, index: number): SafeHtml {
  if (figure.kind === 'image') {
    return html`<figure class="fig"><img class="fig-img" src="${figure.src}" alt="${figure.alt}" loading="lazy"><figcaption>${figure.caption}</figcaption></figure>`;
  }
  if (figure.kind === 'live') {
    return html`
      <figure class="fig fig-live" id="live-table" data-table-mode="${figure.view?.mode ?? 'default'}" data-table-category="${figure.view?.category ?? ''}">
        <figcaption>${figure.caption}</figcaption>
        <div class="fig-live-host" id="live-table-host"><p class="fig-loading">周期表正在搬过来…</p></div>
      </figure>`;
  }
  if (figure.kind === 'crystal') {
    return html`
      <figure class="fig fig-crystal" data-figure="${index}">
        ${raw(crystalSvg(figure.structure, `crystal-${index}`, escapeText(figure.caption).replace(/"/g, '&quot;')))}
        ${crystalLegend(figure.structure)}
        <figcaption>${figure.caption}</figcaption>
      </figure>`;
  }
  const svg = figure.kind === 'table' ? tableSvg(figure)
    : figure.kind === 'trend' ? trendSvg(figure)
      : figure.kind === 'shells' ? shellsSvg(figure)
        : figure.kind === 'sizes' ? sizesSvg(figure)
          : figure.kind === 'chains' ? chainsSvg(figure)
            : figure.kind === 'dots' ? dotsSvg(figure)
              : figure.kind === 'scale' ? scaleSvg(figure)
                : towerSvg(figure, index);
  const link = 'link' in figure ? figure.link : undefined;
  return html`
    <figure class="fig fig-${figure.kind}" data-figure="${index}">
      ${raw(svg)}
      ${figure.kind === 'table' ? tableLegend(figure) : ''}
      <figcaption>${figure.caption}${linkButton(link)}</figcaption>
    </figure>`;
}
