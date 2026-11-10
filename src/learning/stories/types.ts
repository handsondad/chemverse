import type { Figure } from '../figures';

/**
 * 小念 × 爸爸：问题驱动的化学讲解（与「身体奇遇记」同一对角色）。
 * 小念从生活里的现象发问，爸爸回答；小念接着爸爸上一句里的说法追问，一问一答一路讲到原理。
 * 爸爸可以配一张图（`figure`）讲；讲解动画（`film`）放在文章右栏，一轮问答配一场或几场戏。
 * 文章里不放实验台入口：3D 课件 / 互动卡都在「🧪 3D 实验台」里，`show: lab` 只记下这一轮讲的是实验的第几段。
 */

export type { CharacterId } from '../../series/characters';

export type ShowFrame = { readonly icon: string; readonly label: string };

/** 爸爸讲这一轮时配的东西：图解步骤，或记下这一轮对应实验（3D 课件 / 互动卡）的第 step 段 */
export type StoryShow =
  | { readonly kind: 'steps'; readonly frames: readonly ShowFrame[] }
  | { readonly kind: 'lab'; readonly step: number; readonly label: string };

export type StoryTurn = {
  /** 小念：第一句说现象，之后每一句都接着爸爸上一句里的说法追问；最后一句以「我懂了 / 我明白了」开头总结 */
  readonly nian: string;
  readonly dad: string;
  /** 这一轮的化学方程式，单独排成一行 */
  readonly eq?: string;
  /** 爸爸边说边指着的一张图，画在他的气泡里 */
  readonly figure?: Figure;
  readonly show?: StoryShow;
};

export type Story = {
  /** 对应 curriculum.ts 里的 slug */
  readonly slug: string;
  /** 小念口吻的问题，必须带「？」 */
  readonly title: string;
  /** 小念刚刚遇到的那件事，一句话 */
  readonly trigger: string;
  readonly dialogue: readonly StoryTurn[];
  /** 给大人：安全须知、背景补充 */
  readonly tip: string;
  /** 讲解动画：文章变成左问答、右动画；还没写的文章先是一栏图文 */
  readonly film?: Film;
};

/* ---------------- 讲解动画 ----------------
 * 画面固定 1200×900 的空白画布，坐标都是 [x, y]。
 * 一场戏里每个元素只由时间 t 决定，所以能暂停、拖动、从任意一帧开始看。
 */

export type Vec = readonly [number, number];

type Timed = {
  /** 出现的时间（秒，从这场戏开头算） */
  readonly from: number;
  /** 消失的时间，不写就留到这场戏结束 */
  readonly to?: number;
};

/** 颜色渐变：从 at 秒开始，用 over 秒变成 color */
export type Tint = { readonly color: string; readonly at: number; readonly over?: number };

export type Cue = Timed & (
  /** 一行大字，点出关键词；at 是屏幕位置，镜头推拉时留在原处 */
  | { readonly kind: 'text'; readonly at: Vec; readonly text: string; readonly size?: 's' | 'm' | 'l'; readonly color?: string }
  /** 化学式 / 方程式牌子，逐字打出来 */
  | { readonly kind: 'formula'; readonly at: Vec; readonly text: string; readonly color?: string }
  /** 指向某处的标签，带一根引线 */
  | { readonly kind: 'label'; readonly at: Vec; readonly pos: Vec; readonly text: string; readonly color?: string }
  /** 一个原子 / 离子 / 电子小球；path 有多个点时沿路线走一趟 */
  | {
    readonly kind: 'atom';
    readonly path: readonly Vec[];
    readonly symbol: string;
    readonly color: string;
    readonly r?: number;
    readonly charge?: string;
    readonly travel?: number;
    readonly motion?: 'jitter' | 'pulse';
  }
  /** 两点之间的化学键，一笔画出来 */
  | { readonly kind: 'bond'; readonly a: Vec; readonly b: Vec; readonly order?: 1 | 2; readonly color?: string }
  /** 示意图形：发热包、试纸、沙土……可以写字、变色；slide 让它在第 at 秒起平移到 to（比如石墨的一层滑开） */
  | {
    readonly kind: 'shape';
    readonly shape: 'circle' | 'rect' | 'pill';
    readonly at: Vec;
    readonly size: Vec;
    readonly color: string;
    readonly text?: string;
    readonly tint?: Tint;
    readonly slide?: { readonly to: Vec; readonly at: number; readonly over?: number };
    readonly motion?: 'pulse' | 'wiggle' | 'grow' | 'shrink';
    readonly over?: number;
    readonly outline?: boolean;
  }
  /** 实验容器：烧杯、倒置的圆底烧瓶、集气瓶；液面高度 0～1，可以涨落、变色 */
  | {
    readonly kind: 'vessel';
    readonly vessel: 'beaker' | 'flask' | 'jar';
    readonly at: Vec;
    readonly size: Vec;
    readonly liquid?: string;
    readonly level?: number;
    readonly rise?: { readonly to: number; readonly at: number; readonly over?: number };
    readonly tint?: Tint;
    readonly label?: string;
  }
  /** 一群粒子在方框 [x, y, 宽, 高] 里运动：gas 乱飞、jitter 原地抖、rise 气泡上升；amount 让看得见的个数从 from 个慢慢变成 to 个 */
  | {
    readonly kind: 'particles';
    readonly box: readonly [number, number, number, number];
    readonly count: number;
    readonly color: string;
    readonly motion: 'gas' | 'jitter' | 'rise';
    readonly size?: number;
    readonly symbol?: string;
    readonly amount?: { readonly at: number; readonly over: number; readonly from: number; readonly to: number };
  }
  /** 一个 emoji：一个点就原地弹出来，几个点就沿路线走一趟（用 travel 秒） */
  | { readonly kind: 'sprite'; readonly icon: string; readonly path: readonly Vec[]; readonly size?: number; readonly travel?: number; readonly wobble?: boolean }
  /** 一笔画出来的箭头，可以带一句话 */
  | { readonly kind: 'arrow'; readonly path: readonly Vec[]; readonly color?: string; readonly text?: string; readonly draw?: number }
  /** 一串小点沿路线一直流动：电子、热、气体、液体；loop 表示路线首尾相接（比如电子绕核转），两头不淡出 */
  | { readonly kind: 'flow'; readonly path: readonly Vec[]; readonly color?: string; readonly count?: number; readonly speed?: number; readonly size?: number; readonly loop?: boolean }
  /** 一圈圈往外扩的波纹：放热、报警、反应发生 */
  | { readonly kind: 'pulse'; readonly at: Vec; readonly color?: string; readonly radius?: number; readonly rate?: number }
  /** 一根进度条，从 start 涨（或落）到 end，取值 0～1 */
  | { readonly kind: 'meter'; readonly at: Vec; readonly label: string; readonly start: number; readonly end: number; readonly color?: string; readonly over?: number }
  /** 数字从 start 数到 end */
  | { readonly kind: 'count'; readonly at: Vec; readonly label: string; readonly start: number; readonly end: number; readonly unit?: string; readonly over?: number }
  /** 常见误会：先写错误的说法再划掉，然后换成正确的说法 */
  | { readonly kind: 'myth'; readonly wrong: string; readonly right: string }
);

/** 镜头：在 t 秒时对准 at，放大 zoom 倍；两个关键帧之间平滑推拉 */
export type CameraKey = { readonly t: number; readonly at: Vec; readonly zoom: number };

export type FilmScene = {
  /** 配对话里第几轮（从 0 数） */
  readonly turn: number;
  /** 这场戏的小标题，不超过 12 个字 */
  readonly title: string;
  /** 秒 */
  readonly duration: number;
  readonly camera?: readonly CameraKey[];
  readonly cues: readonly Cue[];
};

export type Film = { readonly scenes: readonly FilmScene[] };
