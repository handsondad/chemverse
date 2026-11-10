import { escapeHtml } from '../html';
import type { Cue, FilmScene, Vec } from '../stories/types';
import {
  cameraAt, clamp01, ease, envelope, FRAME, noise, partialPath, pathLength, pointAlong, smooth, tinted, type Camera,
} from './engine';

const INK = '#24332d';
const ACCENT = '#1f6b55';
/** 舞台小于这个宽度（CSS 像素）时放大文字，最多放大 MAX_LEGIBILITY 倍 */
const COMFORTABLE_WIDTH = 560;
const MAX_LEGIBILITY = 1.6;

/** k = 1 / 镜头放大倍数，让标签、箭头在屏幕上大小不变；ui 在 k 的基础上再按舞台宽度放大文字 */
type Ctx = { t: number; k: number; ui: number; alpha: number; camera: Camera; id: string };

const n = (value: number): string => (Math.round(value * 10) / 10).toString();
/** 透明度、缩放要两位小数，一位会有明显的跳变 */
const f2 = (value: number): string => (Math.round(value * 100) / 100).toString();
const pts = (points: readonly Vec[]): string => points.map(([x, y]) => `${n(x)},${n(y)}`).join(' ');
const esc = escapeHtml;

/** 粗略的字宽：汉字算 1 个字号，其余算 0.62 个 */
const textWidth = (text: string, size: number): number => [...text].reduce((sum, ch) => sum + (/[\u3000-\u9fff\uff00-\uffef]/.test(ch) ? 1 : 0.62), 0) * size;

function isDark(hex: string): boolean {
  const v = hex.replace('#', '');
  if (v.length !== 6) return false;
  const [r, g, b] = [0, 2, 4].map(i => Number.parseInt(v.slice(i, i + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b < 140;
}

/** 字幕性质的元素：坐标是屏幕位置，镜头推拉时留在原处 */
function screenPoint([sx, sy]: Vec, ctx: Ctx): Vec {
  const { camera } = ctx;
  return [camera.x + (sx / FRAME.width) * camera.width, camera.y + (sy / FRAME.height) * camera.height];
}

/** 并排的大字、计数牌只放大一半，免得互相挤到 */
const captionScale = (ctx: Ctx): number => ctx.k * Math.sqrt(ctx.ui / ctx.k);

/** 放大后的文字块不能被画面边缘裁掉 */
function keepInside([x, y]: Vec, halfWidth: number, halfHeight: number, ctx: Ctx): Vec {
  const { camera } = ctx;
  const margin = 6 * ctx.ui;
  const clamp = (value: number, low: number, high: number): number => (low > high ? (low + high) / 2 : Math.min(Math.max(value, low), high));
  return [
    clamp(x, camera.x + halfWidth + margin, camera.x + camera.width - halfWidth - margin),
    clamp(y, camera.y + halfHeight + margin, camera.y + camera.height - halfHeight - margin),
  ];
}

type Of<K extends Cue['kind']> = Extract<Cue, { kind: K }>;

function text(cue: Of<'text'>, ctx: Ctx): string {
  const size = { s: 34, m: 48, l: 72 }[cue.size ?? 'm'] * captionScale(ctx);
  const chars = [...cue.text];
  const [x, y] = keepInside(screenPoint(cue.at, ctx), textWidth(cue.text, size) / 2, size / 2, ctx);
  const spans = chars.map((ch, i) => `<tspan opacity="${n(smooth((ctx.t - cue.from - i * 0.05) / 0.15))}">${esc(ch)}</tspan>`).join('');
  return `<text class="film-text film-big" x="${n(x)}" y="${n(y)}" font-size="${n(size)}" text-anchor="middle" dominant-baseline="central" fill="${cue.color ?? INK}">${spans}</text>`;
}

function formula(cue: Of<'formula'>, ctx: Ctx): string {
  const size = 34 * captionScale(ctx);
  const chars = [...cue.text];
  const shown = Math.ceil(chars.length * clamp01((ctx.t - cue.from) / (0.3 + chars.length * 0.035)));
  const width = textWidth(cue.text, size) + 40 * captionScale(ctx);
  const height = size + 30 * captionScale(ctx);
  const [x, y] = keepInside(screenPoint(cue.at, ctx), width / 2, height / 2, ctx);
  const color = cue.color ?? ACCENT;
  return `<g transform="translate(${n(x)} ${n(y)})">`
    + `<rect x="${n(-width / 2)}" y="${n(-height / 2)}" width="${n(width)}" height="${n(height)}" rx="${n(height / 3)}" fill="#ffffff" fill-opacity="0.94" stroke="${color}" stroke-width="${n(3 * ctx.k)}"/>`
    + `<text class="film-formula" font-size="${n(size)}" text-anchor="middle" dominant-baseline="central" fill="${color}">${esc(chars.slice(0, shown).join(''))}</text></g>`;
}

function label(cue: Of<'label'>, ctx: Ctx): string {
  const { k, ui } = ctx;
  const [ax, ay] = cue.at;
  const size = 28 * ui;
  const width = textWidth(cue.text, size) + 28 * ui;
  const height = size + 20 * ui;
  const [px, py] = keepInside(cue.pos, width / 2, height / 2, ctx);
  const pop = Math.max(ease.backOut((ctx.t - cue.from) / 0.45), 0.01);
  const color = cue.color ?? INK;
  return `<line x1="${n(ax)}" y1="${n(ay)}" x2="${n(px)}" y2="${n(py)}" stroke="${color}" stroke-width="${n(3 * k)}" stroke-dasharray="${n(8 * k)} ${n(6 * k)}"/>`
    + `<circle cx="${n(ax)}" cy="${n(ay)}" r="${n(8 * k)}" fill="#fff" stroke="${color}" stroke-width="${n(4 * k)}"/>`
    + `<g transform="translate(${n(px)} ${n(py)}) scale(${f2(pop)})">`
    + `<rect x="${n(-width / 2)}" y="${n(-height / 2)}" width="${n(width)}" height="${n(height)}" rx="${n(height / 2)}" fill="#fff" stroke="${color}" stroke-width="${n(3 * k)}"/>`
    + `<text class="film-text" font-size="${n(size)}" text-anchor="middle" dominant-baseline="central" fill="${color}">${esc(cue.text)}</text></g>`;
}

function ball(x: number, y: number, r: number, color: string, symbol: string, charge?: string): string {
  const ink = isDark(color) ? '#ffffff' : INK;
  const fontSize = r * (symbol.length > 2 ? 0.62 : symbol.length > 1 ? 0.78 : 0.95);
  let out = `<circle cx="${n(x)}" cy="${n(y)}" r="${n(r)}" fill="${color}" stroke="${INK}" stroke-opacity="0.25" stroke-width="${n(Math.max(2, r * 0.07))}"/>`
    + `<ellipse cx="${n(x - r * 0.34)}" cy="${n(y - r * 0.38)}" rx="${n(r * 0.32)}" ry="${n(r * 0.22)}" fill="#fff" opacity="0.45"/>`
    + `<text class="film-symbol" x="${n(x)}" y="${n(y)}" font-size="${n(fontSize)}" text-anchor="middle" dominant-baseline="central" fill="${ink}">${esc(symbol)}</text>`;
  if (charge) {
    const cr = Math.max(r * 0.42, 13);
    out += `<circle cx="${n(x + r * 0.78)}" cy="${n(y - r * 0.78)}" r="${n(cr)}" fill="#fff" stroke="${INK}" stroke-width="2"/>`
      + `<text class="film-symbol" x="${n(x + r * 0.78)}" y="${n(y - r * 0.78)}" font-size="${n(cr * 1.15)}" text-anchor="middle" dominant-baseline="central" fill="${INK}">${esc(charge)}</text>`;
  }
  return out;
}

function atom(cue: Of<'atom'>, ctx: Ctx): string {
  const local = ctx.t - cue.from;
  const moving = cue.path.length > 1;
  let [x, y] = moving ? pointAlong(cue.path, ease.inOut(local / (cue.travel ?? 2))) : cue.path[0];
  let r = (cue.r ?? 34) * (moving ? 1 : Math.max(ease.backOut(local / 0.5), 0.01));
  if (cue.motion === 'jitter') {
    x += Math.sin(ctx.t * 9 + cue.from * 7) * 3;
    y += Math.cos(ctx.t * 11 + cue.from * 5) * 3;
  }
  if (cue.motion === 'pulse') r *= 1 + 0.06 * Math.sin(local * 5);
  return ball(x, y, r, cue.color, cue.symbol, cue.charge);
}

function bond(cue: Of<'bond'>, ctx: Ctx): string {
  const [a, b] = partialPath([cue.a, cue.b], ease.inOut((ctx.t - cue.from) / 0.6));
  const color = cue.color ?? '#7d8f88';
  const width = 9 * ctx.k;
  if ((cue.order ?? 1) === 1) return `<line x1="${n(a[0])}" y1="${n(a[1])}" x2="${n(b[0])}" y2="${n(b[1])}" stroke="${color}" stroke-width="${n(width)}" stroke-linecap="round"/>`;
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  const [ox, oy] = [(-(b[1] - a[1]) / len) * 7, ((b[0] - a[0]) / len) * 7];
  return [1, -1].map(s => `<line x1="${n(a[0] + ox * s)}" y1="${n(a[1] + oy * s)}" x2="${n(b[0] + ox * s)}" y2="${n(b[1] + oy * s)}" stroke="${color}" stroke-width="${n(width * 0.7)}" stroke-linecap="round"/>`).join('');
}

function shape(cue: Of<'shape'>, ctx: Ctx): string {
  const moved = cue.slide ? ease.inOut((ctx.t - cue.slide.at) / (cue.slide.over ?? 2)) : 0;
  const [x, y] = cue.slide
    ? [cue.at[0] + (cue.slide.to[0] - cue.at[0]) * moved, cue.at[1] + (cue.slide.to[1] - cue.at[1]) * moved]
    : cue.at;
  const [w, h] = cue.size;
  const local = ctx.t - cue.from;
  let scale = Math.max(ease.backOut(local / 0.5), 0.01);
  let rotate = 0;
  if (cue.motion === 'pulse') scale *= 1 + 0.05 * Math.sin(local * 5);
  if (cue.motion === 'wiggle') rotate = Math.sin(local * 7) * 5;
  if (cue.motion === 'grow') scale *= 0.35 + 0.65 * ease.inOut(local / (cue.over ?? 2));
  if (cue.motion === 'shrink') scale *= 1 - 0.55 * ease.inOut(local / (cue.over ?? 2));
  const fill = tinted(cue.color, cue.tint, ctx.t);
  const stroke = cue.outline ? `stroke="${INK}" stroke-opacity="0.45" stroke-width="4" stroke-dasharray="12 8"` : `stroke="${INK}" stroke-opacity="0.22" stroke-width="3"`;
  const body = cue.shape === 'circle'
    ? `<ellipse cx="0" cy="0" rx="${n(w / 2)}" ry="${n(h / 2)}" fill="${fill}" ${stroke}/>`
    : `<rect x="${n(-w / 2)}" y="${n(-h / 2)}" width="${n(w)}" height="${n(h)}" rx="${n(cue.shape === 'pill' ? h / 2 : Math.min(18, h / 4))}" fill="${fill}" ${stroke}/>`;
  const caption = cue.text
    ? `<text class="film-text${isDark(fill) ? ' film-on-dark' : ''}" font-size="${n(Math.min(40, h * 0.42, (w * 1.6) / [...cue.text].length))}" text-anchor="middle" dominant-baseline="central" fill="${isDark(fill) ? '#ffffff' : INK}">${esc(cue.text)}</text>`
    : '';
  return `<g transform="translate(${n(x)} ${n(y)}) rotate(${n(rotate)}) scale(${f2(scale)})">${body}${caption}</g>`;
}

function vessel(cue: Of<'vessel'>, ctx: Ctx): string {
  const [x, y] = cue.at;
  const [w, h] = cue.size;
  const clip = `${ctx.id}-clip`;
  const level = cue.rise
    ? (cue.level ?? 0) + (cue.rise.to - (cue.level ?? 0)) * ease.inOut((ctx.t - cue.rise.at) / (cue.rise.over ?? 2))
    : cue.level ?? 0;
  const liquid = cue.liquid ? tinted(cue.liquid, cue.tint, ctx.t) : undefined;
  const glass = 'fill="none" stroke="#6f8580" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"';
  let inner = '';
  let outline = '';
  let fillTop = 0;
  let fillBottom = 0;
  if (cue.vessel === 'beaker') {
    const r = Math.min(26, w * 0.12);
    const left = x - w / 2;
    const right = x + w / 2;
    const top = y - h / 2;
    const bottom = y + h / 2;
    inner = `<path d="M${n(left)} ${n(top)} V${n(bottom - r)} Q${n(left)} ${n(bottom)} ${n(left + r)} ${n(bottom)} H${n(right - r)} Q${n(right)} ${n(bottom)} ${n(right)} ${n(bottom - r)} V${n(top)} Z"/>`;
    outline = `<path d="M${n(left - 10)} ${n(top - 6)} Q${n(left)} ${n(top)} ${n(left)} ${n(top + 10)} V${n(bottom - r)} Q${n(left)} ${n(bottom)} ${n(left + r)} ${n(bottom)} H${n(right - r)} Q${n(right)} ${n(bottom)} ${n(right)} ${n(bottom - r)} V${n(top)}" ${glass}/>`;
    fillBottom = bottom;
    fillTop = bottom - level * h * 0.92;
  } else if (cue.vessel === 'flask') {
    const radius = w / 2;
    const cy = y - h / 2 + radius;
    const neckW = w * 0.22;
    const neckTop = cy + radius * 0.92;
    const bottom = y + h / 2;
    inner = `<circle cx="${n(x)}" cy="${n(cy)}" r="${n(radius)}"/>`;
    outline = `<path d="M${n(x - neckW / 2)} ${n(bottom)} V${n(neckTop)} A${n(radius)} ${n(radius)} 0 1 1 ${n(x + neckW / 2)} ${n(neckTop)} V${n(bottom)}" ${glass}/>`;
    fillBottom = cy + radius;
    fillTop = fillBottom - level * radius * 2;
  } else {
    const left = x - w / 2;
    const top = y - h / 2;
    const bottom = y + h / 2;
    const mouth = w * 0.32;
    inner = `<rect x="${n(left)}" y="${n(top)}" width="${n(w)}" height="${n(h * 0.86)}" rx="${n(w * 0.18)}"/>`;
    outline = `<path d="M${n(x - mouth)} ${n(bottom)} V${n(top + h * 0.86)} H${n(left + w * 0.1)} Q${n(left)} ${n(top + h * 0.86)} ${n(left)} ${n(top + h * 0.76)} V${n(top + w * 0.18)} Q${n(left)} ${n(top)} ${n(left + w * 0.18)} ${n(top)} H${n(left + w * 0.82)} Q${n(left + w)} ${n(top)} ${n(left + w)} ${n(top + w * 0.18)} V${n(top + h * 0.76)} Q${n(left + w)} ${n(top + h * 0.86)} ${n(left + w * 0.9)} ${n(top + h * 0.86)} H${n(x + mouth)} V${n(bottom)}" ${glass}/>`;
    fillBottom = top + h * 0.86;
    fillTop = fillBottom - level * h * 0.86;
  }
  let out = `<clipPath id="${clip}">${inner}</clipPath>`;
  out += `<g clip-path="url(#${clip})"><rect x="${n(x - w)}" y="${n(y - h)}" width="${n(w * 2)}" height="${n(h * 2)}" fill="#ffffff" fill-opacity="0.4"/>`;
  if (liquid && level > 0.001) out += `<rect x="${n(x - w)}" y="${n(fillTop)}" width="${n(w * 2)}" height="${n(Math.max(fillBottom - fillTop, 0))}" fill="${liquid}" fill-opacity="0.78"/>`;
  out += `</g>${outline}`;
  if (cue.label) {
    const size = 26 * ctx.ui;
    out += `<text class="film-text" x="${n(x)}" y="${n(y + h / 2 + size * 1.5)}" font-size="${n(size)}" text-anchor="middle" fill="${INK}">${esc(cue.label)}</text>`;
  }
  return out;
}

/** 0→1→0 的三角波，粒子撞到边就弹回来 */
const bounce = (u: number): number => 1 - Math.abs((((u % 2) + 2) % 2) - 1);

function particles(cue: Of<'particles'>, ctx: Ctx): string {
  const [x0, y0, w, h] = cue.box;
  const size = cue.size ?? 9;
  const { amount } = cue;
  const visible = amount ? amount.from + (amount.to - amount.from) * ease.inOut((ctx.t - amount.at) / amount.over) : cue.count;
  let out = '';
  for (let i = 0; i < cue.count; i += 1) {
    const a = clamp01(visible - i);
    if (a <= 0.01) continue;
    const sx = noise(i * 3 + 1);
    const sy = noise(i * 3 + 2);
    const sp = 0.5 + noise(i * 3 + 3);
    let x: number;
    let y: number;
    let fade = 1;
    if (cue.motion === 'gas') {
      x = x0 + bounce(sx * 2 + ctx.t * 0.16 * sp) * w;
      y = y0 + bounce(sy * 2 + ctx.t * 0.13 * (0.5 + noise(i * 7 + 5))) * h;
    } else if (cue.motion === 'rise') {
      const u = (sy + ctx.t * 0.28 * sp) % 1;
      x = x0 + sx * w + Math.sin(ctx.t * 2.4 + i) * 6;
      y = y0 + h - u * h;
      fade = Math.min(1, u / 0.12, (1 - u) / 0.2);
    } else {
      const cols = Math.max(1, Math.round(Math.sqrt(cue.count * w / h)));
      const rows = Math.ceil(cue.count / cols);
      const cw = w / cols;
      const ch = h / rows;
      x = x0 + (i % cols + 0.5 + (sx - 0.5) * 0.4) * cw + Math.sin(ctx.t * 8 + i * 1.7) * 4;
      y = y0 + (Math.floor(i / cols) + 0.5 + (sy - 0.5) * 0.4) * ch + Math.cos(ctx.t * 9 + i * 1.3) * 4;
    }
    const alpha = a * fade;
    out += `<g opacity="${f2(alpha)}">${cue.symbol
      ? ball(x, y, size, cue.color, cue.symbol)
      : `<circle cx="${n(x)}" cy="${n(y)}" r="${n(size)}" fill="${cue.color}" stroke="${INK}" stroke-opacity="0.18" stroke-width="2"/>`}</g>`;
  }
  return out;
}

function sprite(cue: Of<'sprite'>, ctx: Ctx): string {
  const local = ctx.t - cue.from;
  const moving = cue.path.length > 1;
  const [x, y] = moving ? pointAlong(cue.path, ease.inOut(local / (cue.travel ?? 2))) : cue.path[0];
  const scale = moving ? 1 : Math.max(ease.backOut(local / 0.5), 0.01);
  const rotate = cue.wobble ? Math.sin(local * 6) * 10 : 0;
  return `<text x="0" y="0" font-size="${cue.size ?? 56}" text-anchor="middle" dominant-baseline="central" transform="translate(${n(x)} ${n(y)}) rotate(${n(rotate)}) scale(${f2(scale)})">${esc(cue.icon)}</text>`;
}

function arrow(cue: Of<'arrow'>, ctx: Ctx): string {
  const { k } = ctx;
  const progress = ease.inOut((ctx.t - cue.from) / (cue.draw ?? 0.8));
  const drawn = partialPath(cue.path, Math.max(progress, 0.001));
  const color = cue.color ?? '#e0762b';
  const tip = drawn[drawn.length - 1];
  const prev = drawn.length > 1 ? drawn[drawn.length - 2] : cue.path[0];
  const angle = Math.atan2(tip[1] - prev[1], tip[0] - prev[0]);
  const head = 26 * k;
  const wing = (turn: number): Vec => [tip[0] - head * Math.cos(angle + turn), tip[1] - head * Math.sin(angle + turn)];
  let out = `<polyline points="${pts(drawn)}" fill="none" stroke="#fff" stroke-width="${n(15 * k)}" stroke-linecap="round" stroke-linejoin="round"/>`
    + `<polyline points="${pts(drawn)}" fill="none" stroke="${color}" stroke-width="${n(8 * k)}" stroke-linecap="round" stroke-linejoin="round"/>`;
  if (progress > 0.05) out += `<polygon points="${pts([tip, wing(0.5), wing(-0.5)])}" fill="${color}" stroke="#fff" stroke-width="${n(3 * k)}" stroke-linejoin="round"/>`;
  if (cue.text && progress > 0.6) {
    const mid = pointAlong(cue.path, 0.5);
    const [start, end] = [cue.path[0], cue.path[cue.path.length - 1]];
    const size = 28 * ctx.ui;
    const gap = 24 * ctx.ui;
    const upright = Math.abs(end[1] - start[1]) > Math.abs(end[0] - start[0]);
    const leftSide = mid[0] + gap + textWidth(cue.text, size) > FRAME.width;
    const place = !upright
      ? `x="${n(mid[0])}" y="${n(mid[1] - 30 * ctx.ui)}" text-anchor="middle"`
      : `x="${n(leftSide ? mid[0] - gap : mid[0] + gap)}" y="${n(mid[1])}" text-anchor="${leftSide ? 'end' : 'start'}" dominant-baseline="central"`;
    out += `<text class="film-text" ${place} font-size="${n(size)}" fill="${color}" opacity="${n(smooth((progress - 0.6) / 0.4))}">${esc(cue.text)}</text>`;
  }
  return out;
}

function flow(cue: Of<'flow'>, ctx: Ctx): string {
  const length = Math.max(pathLength(cue.path), 1);
  const count = cue.count ?? 8;
  const speed = cue.speed ?? 220;
  const size = cue.size ?? 10;
  const color = cue.color ?? '#ffcf3f';
  let out = '';
  for (let i = 0; i < count; i += 1) {
    const u = ((((ctx.t - cue.from) * speed) / length + i / count) % 1 + 1) % 1;
    const [x, y] = pointAlong(cue.path, u);
    const edge = cue.loop ? 1 : Math.min(1, u / 0.08, (1 - u) / 0.08);
    out += `<circle cx="${n(x)}" cy="${n(y)}" r="${n(size)}" fill="${color}" stroke="#fff" stroke-width="2.5" opacity="${f2(edge)}"/>`;
  }
  return out;
}

function pulse(cue: Of<'pulse'>, ctx: Ctx): string {
  const [x, y] = cue.at;
  const color = cue.color ?? '#e5484d';
  const radius = cue.radius ?? 70;
  const rate = cue.rate ?? 1.2;
  let out = '';
  for (let i = 0; i < 3; i += 1) {
    const phase = ((((ctx.t - cue.from) * rate + i / 3) % 1) + 1) % 1;
    out += `<circle cx="${n(x)}" cy="${n(y)}" r="${n(radius * phase)}" fill="none" stroke="${color}" stroke-width="${n(6 * ctx.k)}" opacity="${f2(1 - phase)}"/>`;
  }
  return out;
}

function meter(cue: Of<'meter'>, ctx: Ctx): string {
  const [x, y] = screenPoint(cue.at, ctx);
  const { k } = ctx;
  const value = cue.start + (cue.end - cue.start) * ease.inOut((ctx.t - cue.from) / (cue.over ?? 2));
  const width = 300 * k;
  const fontSize = Math.min(26 * captionScale(ctx), width / [...cue.label].length);
  return `<g transform="translate(${n(x - width / 2)} ${n(y)})">`
    + `<text class="film-text" y="${n(-14 * k)}" font-size="${n(fontSize)}" fill="${INK}">${esc(cue.label)}</text>`
    + `<rect width="${n(width)}" height="${n(28 * k)}" rx="${n(14 * k)}" fill="#fff" stroke="${INK}" stroke-width="${n(3 * k)}"/>`
    + `<rect width="${n(Math.max(width * clamp01(value), 0))}" height="${n(28 * k)}" rx="${n(14 * k)}" fill="${cue.color ?? '#e0762b'}"/></g>`;
}

function count(cue: Of<'count'>, ctx: Ctx): string {
  const [x, y] = screenPoint(cue.at, ctx);
  const value = cue.start + (cue.end - cue.start) * ease.inOut((ctx.t - cue.from) / (cue.over ?? 2));
  const { k } = ctx;
  const labelSize = Math.min(26 * captionScale(ctx), (270 * k) / [...cue.label].length);
  return `<g transform="translate(${n(x)} ${n(y)})">`
    + `<rect x="${n(-150 * k)}" y="${n(-70 * k)}" width="${n(300 * k)}" height="${n(140 * k)}" rx="${n(28 * k)}" fill="#fff" stroke="${INK}" stroke-width="${n(3 * k)}"/>`
    + `<text class="film-text" y="${n(-34 * k)}" font-size="${n(labelSize)}" text-anchor="middle" fill="#5f6f69">${esc(cue.label)}</text>`
    + `<text class="film-text film-big" y="${n(24 * k)}" font-size="${n(58 * k)}" text-anchor="middle" fill="${INK}">${Math.round(value)}<tspan font-size="${n(24 * k)}"> ${esc(cue.unit ?? '')}</tspan></text></g>`;
}

function renderCue(cue: Cue, ctx: Ctx): string {
  switch (cue.kind) {
    case 'text': return text(cue, ctx);
    case 'formula': return formula(cue, ctx);
    case 'label': return label(cue, ctx);
    case 'atom': return atom(cue, ctx);
    case 'bond': return bond(cue, ctx);
    case 'shape': return shape(cue, ctx);
    case 'vessel': return vessel(cue, ctx);
    case 'particles': return particles(cue, ctx);
    case 'sprite': return sprite(cue, ctx);
    case 'arrow': return arrow(cue, ctx);
    case 'flow': return flow(cue, ctx);
    case 'pulse': return pulse(cue, ctx);
    case 'meter': return meter(cue, ctx);
    case 'count': return count(cue, ctx);
    case 'myth': return '';
  }
}

function myth(cue: Of<'myth'>, t: number): string {
  const local = t - cue.from;
  const strike = smooth((local - 0.9) / 0.5);
  const right = smooth((local - 1.6) / 0.4);
  return `<div class="film-myth" style="opacity:${f2(envelope(t, cue.from, cue.to))}">`
    + `<span class="film-myth-wrong" style="--strike:${f2(strike)}">❌ ${esc(cue.wrong)}</span>`
    + `<span class="film-myth-right" style="opacity:${f2(right)}">✅ ${esc(cue.right)}</span></div>`;
}

/** 这场戏在 t 秒时的整块舞台内容：SVG 画面、左上角场次标题、误会卡 */
export function renderStage(scene: FilmScene, t: number, options: { number: number; isLast: boolean; stageWidth: number; id: string }): string {
  const camera = cameraAt(scene.camera, t);
  const k = 1 / camera.zoom;
  const ui = k * Math.min(Math.max(COMFORTABLE_WIDTH / (options.stageWidth || COMFORTABLE_WIDTH), 1), MAX_LEGIBILITY);
  const sceneFade = options.isLast ? 1 : 1 - smooth((t - (scene.duration - 0.3)) / 0.3);
  const cues = scene.cues.map((cue, index) => {
    const alpha = envelope(t, cue.from, cue.to) * sceneFade;
    if (alpha <= 0.001) return '';
    return `<g opacity="${f2(alpha)}">${renderCue(cue, { t, k, ui, alpha, camera, id: `${options.id}-${index}` })}</g>`;
  }).join('');
  const myths = scene.cues.map(cue => (cue.kind === 'myth' && t >= cue.from ? myth(cue, t) : '')).join('');
  return `<svg viewBox="${n(camera.x)} ${n(camera.y)} ${n(camera.width)} ${n(camera.height)}" role="img" aria-label="${esc(scene.title)}">${cues}</svg>`
    + `<span class="film-title"><b>${options.number}</b>${esc(scene.title)}</span>${myths}`;
}
