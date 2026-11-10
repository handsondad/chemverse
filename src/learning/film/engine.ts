import type { CameraKey, Film, Tint, Vec } from '../stories/types';

// 讲解动画的时间线：画面上的一切都是时间 t 的纯函数。同一个 t 永远是同一帧，
// 所以能暂停、拖动进度条，也能直接从某一场戏开始。

export const FRAME = { width: 1200, height: 900 } as const;
export const MAX_FRAME_SECONDS = 0.12;

export const clamp01 = (x: number): number => Math.min(1, Math.max(0, x));

export function smooth(x: number): number {
  const t = clamp01(x);
  return t * t * (3 - 2 * t);
}

export const ease = {
  expoOut: (x: number): number => (x >= 1 ? 1 : 1 - 2 ** (-10 * clamp01(x))),
  inOut: (x: number): number => {
    const t = clamp01(x);
    return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
  },
  backOut: (x: number): number => {
    const t = clamp01(x) - 1;
    return 1 + 2.4 * t ** 3 + 1.4 * t ** 2;
  },
};

const ENTER_SECONDS = 0.45;
const EXIT_SECONDS = 0.25;

/** 元素的可见度：from 之后淡入，to 之后淡出（退场比进场短）；不写 to 就留到这场戏结束 */
export function envelope(t: number, from: number, to?: number): number {
  if (t < from) return 0;
  const enter = ease.expoOut((t - from) / ENTER_SECONDS);
  if (to === undefined || t <= to) return enter;
  return enter * (1 - smooth((t - to) / EXIT_SECONDS));
}

export function pathLength(points: readonly Vec[]): number {
  let length = 0;
  for (let i = 1; i < points.length; i += 1) length += Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
  return length;
}

/** 按路程取路线上的点，u 从 0 到 1 */
export function pointAlong(points: readonly Vec[], u: number): Vec {
  if (!points.length) throw new RangeError('路线至少要有一个点');
  if (points.length === 1) return points[0];
  let left = clamp01(u) * pathLength(points);
  for (let i = 1; i < points.length; i += 1) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const segment = Math.hypot(x1 - x0, y1 - y0);
    if (left <= segment || i === points.length - 1) {
      const k = segment > 0 ? Math.min(1, left / segment) : 0;
      return [x0 + (x1 - x0) * k, y0 + (y1 - y0) * k];
    }
    left -= segment;
  }
  return points[points.length - 1];
}

/** 路线从起点画到 progress（0～1）为止的那一段 */
export function partialPath(points: readonly Vec[], progress: number): Vec[] {
  const target = pathLength(points) * clamp01(progress);
  const out: Vec[] = [points[0]];
  let walked = 0;
  for (let i = 1; i < points.length; i += 1) {
    const segment = Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
    if (walked + segment >= target) {
      const k = segment > 0 ? (target - walked) / segment : 0;
      out.push([points[i - 1][0] + (points[i][0] - points[i - 1][0]) * k, points[i - 1][1] + (points[i][1] - points[i - 1][1]) * k]);
      return out;
    }
    walked += segment;
    out.push(points[i]);
  }
  return out;
}

export function totalDuration(film: Film): number {
  return film.scenes.reduce((sum, scene) => sum + scene.duration, 0);
}

export function sceneStart(film: Film, index: number): number {
  let start = 0;
  for (let i = 0; i < index; i += 1) start += film.scenes[i].duration;
  return start;
}

/** 全片时间 → 第几场戏、这场戏里的时间 */
export function sceneAt(film: Film, time: number): { index: number; local: number } {
  if (!film.scenes.length) throw new RangeError('动画至少要有一场戏');
  let start = 0;
  for (let index = 0; index < film.scenes.length; index += 1) {
    const { duration } = film.scenes[index];
    if (time < start + duration || index === film.scenes.length - 1) {
      return { index, local: Math.min(Math.max(time - start, 0), duration) };
    }
    start += duration;
  }
  return { index: 0, local: 0 };
}

export type Camera = { x: number; y: number; width: number; height: number; zoom: number };

function frameAround([cx, cy]: Vec, zoom: number): Camera {
  const z = Math.max(1, zoom);
  const width = FRAME.width / z;
  const height = FRAME.height / z;
  const x = Math.min(Math.max(cx - width / 2, 0), FRAME.width - width);
  const y = Math.min(Math.max(cy - height / 2, 0), FRAME.height - height);
  return { x, y, width, height, zoom: z };
}

/** 镜头关键帧之间两头缓地推拉；第一帧之前停在第一帧，最后一帧之后停在最后一帧 */
export function cameraAt(keys: readonly CameraKey[] | undefined, t: number): Camera {
  if (!keys?.length) return { x: 0, y: 0, width: FRAME.width, height: FRAME.height, zoom: 1 };
  if (t <= keys[0].t) return frameAround(keys[0].at, keys[0].zoom);
  for (let i = 1; i < keys.length; i += 1) {
    const a = keys[i - 1];
    const b = keys[i];
    if (t <= b.t) {
      const k = ease.inOut((t - a.t) / Math.max(b.t - a.t, 1e-6));
      return frameAround([a.at[0] + (b.at[0] - a.at[0]) * k, a.at[1] + (b.at[1] - a.at[1]) * k], a.zoom + (b.zoom - a.zoom) * k);
    }
  }
  const last = keys[keys.length - 1];
  return frameAround(last.at, last.zoom);
}

function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace('#', '');
  const full = value.length === 3 ? [...value].map(c => c + c).join('') : value;
  const n = Number.parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** 两个 #rrggbb 颜色之间按 k 混合 */
export function mixColor(a: string, b: string, k: number): string {
  const [r0, g0, b0] = hexToRgb(a);
  const [r1, g1, b1] = hexToRgb(b);
  const u = clamp01(k);
  const channel = (x: number, y: number): string => Math.round(x + (y - x) * u).toString(16).padStart(2, '0');
  return `#${channel(r0, r1)}${channel(g0, g1)}${channel(b0, b1)}`;
}

export function tinted(base: string, tint: Tint | undefined, t: number): string {
  if (!tint) return base;
  return mixColor(base, tint.color, ease.inOut((t - tint.at) / (tint.over ?? 1.5)));
}

/** 固定的伪随机数：同一个 seed 永远同一个值，粒子的位置才能只由 t 决定 */
export function noise(seed: number): number {
  let h = Math.imul(Math.floor(seed) ^ 0x9e3779b9, 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
