import type { Story, Vec } from './types';

const AIR = '#a9cbe8';
const STINK = '#e8590c';
const SULFUR = '#f4d03f';

/** 绕一圈的路线，给电子绕核转用 */
const ring = (cx: number, cy: number, r: number): Vec[] =>
  Array.from({ length: 25 }, (_, i) => [cx + r * Math.cos((i / 24) * Math.PI * 2), cy + r * Math.sin((i / 24) * Math.PI * 2)] as const);

export const fartSmell: Story = {
  slug: 'fart-smell',
  title: '人放的屁为什么是臭的？为什么不管吃什么，都是同一种臭味？',
  trigger: '吃完晚饭，爸爸悄悄放了个屁，小念捂着鼻子跳开：怎么又是这个味儿！',
  dialogue: [
    {
      nian: '爸爸，人放的屁为什么是臭的呀？',
      dad: '说出来你可能不信：屁里绝大部分都不臭。氮气、氢气、二氧化碳、甲烷，再加一点氧气，合起来占了 99% 以上，全都没有味道。真正臭的连 1% 都不到，是几种含硫的气体，打头的叫硫化氢，闻起来就像臭鸡蛋。',
      figure: {
        kind: 'dots',
        caption: '把一个屁分成 100 份：99 份以上都没有味道，臭的那几种气体连 1 份都不到。',
        groups: [
          { label: '没味的气体', count: 99, amount: '99 份以上', note: '氮气、氢气、二氧化碳、甲烷、氧气' },
          { label: '含硫的臭气', count: 1, amount: '不到 1 份', note: '硫化氢、甲硫醇、二甲基硫醚', hot: true },
        ],
      },
      show: { kind: 'lab', step: 0, label: '看一个屁里有什么' },
    },
    {
      nian: '不到 1% 就那么臭？硫化氢有那么厉害吗？',
      dad: '厉害在鼻子对它太灵了：十亿份空气里只要混进半份硫化氢，鼻子就能闻出来。科学家真的把屁收集起来做过测试：硫化氢越多，大家打的“臭分”就越高；用活性炭把含硫气体吸掉以后，屁几乎就闻不出味道了。',
    },
    {
      nian: '硫化氢里的硫是从哪儿来的？我又没吃过硫呀？',
      dad: '你天天都在吃。鸡蛋、肉、牛奶、豆子里的蛋白质，是由许多叫氨基酸的小零件拼成的，其中有几种零件带着硫原子。小肠没吸收完的部分会进到大肠，那里住着成千上万亿个细菌，它们把这些零件拆开，硫就变成硫化氢跑了出来。',
      eq: '半胱氨酸 + H₂O →（细菌的酶） 丙酮酸 + NH₃ + H₂S',
      figure: {
        kind: 'table',
        caption: '蛋白质主要用碳、氢、氧、氮四种元素搭成，有几种零件还带着硫（圈出来的那格）。',
        paint: 'category',
        focus: { by: 'atoms', values: [1, 6, 7, 8, 16] },
        ring: [16],
      },
      show: { kind: 'lab', step: 1, label: '看细菌怎么做臭味' },
    },
    {
      nian: '为什么偏偏带硫原子的气体这么臭？',
      dad: '先说它为什么是气体。硫和氧在周期表上是一家，最外层都是 6 个电子，所以硫化氢 H₂S 和水 H₂O 长得很像。可水分子之间手拉手拉得很紧，100 ℃ 才烧开；硫化氢分子几乎不拉手，零下 60 ℃ 就是气体，在肚子里早就飞起来了。鼻子里又正好有对含硫气味特别灵的“接收器”。',
      figure: {
        kind: 'shells',
        caption: '氧和硫同一族，最外层都是 6 个电子（橙色）。硫多一层电子，个头大一圈。',
        atoms: [8, 16],
      },
      show: { kind: 'lab', step: 2, label: '看硫和氧' },
    },
    {
      nian: '鼻子这么灵，那为什么不管吃什么，屁都是同一种臭味？',
      dad: '因为做臭味的“工厂”和“原料”几乎不变：几乎每顿饭都有蛋白质，大肠细菌拆它们走的是同一条路，出来的总是硫化氢、甲硫醇这几位，鼻子就把这股组合记成了“屁味”。其实仔细闻并不完全一样：硫化氢像臭鸡蛋，甲硫醇像烂菜叶，比例一变味道就不同；鸡蛋、肉吃多了，屁会更臭。',
      show: { kind: 'lab', step: 3, label: '看为什么总是那股味' },
    },
    {
      nian: '鸡蛋和肉吃多了屁更臭？那吃豆子为什么屁特别多？',
      dad: '豆子里有一种叫低聚糖的糖，小肠拆不动，只好整个送进大肠，细菌吃得正欢，吐出一大堆氢气和二氧化碳，所以屁多，可这些气体本身没味。想让屁少一点、淡一点：细嚼慢咽少吞空气，豆子、鸡蛋、肉别一次吃太多，多出去跑跑跳跳。憋着不放也没用，早晚还得出来。',
    },
    {
      nian: '我懂了！屁里 99% 的气体都没味，臭的是不到 1% 的含硫气体；它们是大肠里的细菌拆蛋白质时做出来的。硫和氧是一家，可硫化氢一下就变成气体钻进鼻子。吃什么都离不开蛋白质和这群细菌，所以总是那股味，只是吃蛋和肉多了会更臭！',
      dad: '总结得真好！放屁说明肚子里的细菌在认真干活，是健康的事，不丢人。想放的时候走到一边，放完说声“不好意思”就行。要是肚子总是胀痛，屁又多又拉肚子，就告诉大人，去医院看看。',
    },
  ],
  tip: '放屁很正常，健康人一天十几次都不算多；如果每天超过二十多次，或者伴随腹痛、腹泻、体重下降，应去看消化科。大量硫化氢有剧毒：下水道、化粪池、沼气池里浓度可能很高，而且浓度一高鼻子反而会“失灵”闻不到，千万别让孩子靠近或下去。文中事实参考了 Suarez 等 1998 年发表在《Gut》上的屁味研究、美国有毒物质与疾病登记署（ATSDR）的硫化氢资料，以及科普中国的相关文章。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '一个屁里有什么',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 420], size: [640, 470], color: '#eef4fb', from: 0 },
          { kind: 'particles', box: [370, 250, 460, 340], count: 30, color: AIR, motion: 'gas', size: 11, from: 0.5 },
          { kind: 'count', at: [240, 790], label: '没味的气体', start: 0, end: 99, unit: '%', over: 2.5, from: 1 },
          { kind: 'particles', box: [370, 250, 460, 340], count: 2, color: STINK, symbol: 'S', size: 24, motion: 'gas', from: 3.4 },
          { kind: 'count', at: [960, 790], label: '含硫的臭气', start: 0, end: 1, unit: '% 不到', over: 1.5, from: 3.8 },
          { kind: 'text', at: [600, 120], text: '氮气 氢气 二氧化碳 甲烷', size: 's', from: 1.4 },
        ],
      },
      {
        turn: 1,
        title: '鼻子太灵了',
        duration: 10,
        cues: [
          { kind: 'particles', box: [140, 260, 420, 340], count: 24, color: AIR, motion: 'gas', size: 10, from: 0.3 },
          { kind: 'sprite', icon: '👃', path: [[900, 430]], size: 200, from: 0 },
          { kind: 'flow', path: [[220, 430], [800, 430]], color: STINK, count: 3, size: 13, speed: 160, from: 1 },
          { kind: 'pulse', at: [900, 430], color: STINK, radius: 200, from: 3.4 },
          { kind: 'text', at: [600, 760], text: '十亿份空气里只要半份', size: 's', from: 2.4 },
          { kind: 'text', at: [600, 850], text: '就能闻出来！', size: 's', color: '#c2410c', from: 4.6 },
        ],
      },
      {
        turn: 2,
        title: '蛋白质进了大肠',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [600, 470], size: [980, 230], color: '#f7d6c8', from: 0 },
          { kind: 'sprite', icon: '🥚', path: [[150, 470], [600, 470]], size: 72, travel: 3, from: 0.4, to: 3.8 },
          { kind: 'shape', shape: 'pill', at: [600, 470], size: [340, 64], color: '#ffe1a8', text: '蛋白质', from: 3.6, to: 7.8 },
          { kind: 'sprite', icon: '🦠', path: [[420, 380]], size: 72, wobble: true, from: 4.4 },
          { kind: 'sprite', icon: '🦠', path: [[790, 560]], size: 72, wobble: true, from: 4.8 },
          { kind: 'atom', path: [[600, 470], [650, 300], [720, 190]], symbol: 'S', color: SULFUR, r: 40, travel: 2.4, from: 7.6 },
          { kind: 'text', at: [600, 820], text: '大肠里的细菌拆零件', size: 's', from: 5.2 },
        ],
      },
      {
        turn: 2,
        title: '硫变成硫化氢',
        duration: 11,
        cues: [
          { kind: 'bond', a: [600, 400], b: [500, 330], from: 2.6 },
          { kind: 'bond', a: [600, 400], b: [700, 330], from: 2.8 },
          { kind: 'atom', path: [[600, 400]], symbol: 'S', color: SULFUR, r: 62, from: 0 },
          { kind: 'atom', path: [[380, 250], [500, 330]], symbol: 'H', color: '#ffffff', r: 32, travel: 1.5, from: 1 },
          { kind: 'atom', path: [[820, 250], [700, 330]], symbol: 'H', color: '#ffffff', r: 32, travel: 1.5, from: 1.2 },
          { kind: 'formula', at: [600, 640], text: '半胱氨酸 + H₂O → 丙酮酸 + NH₃ + H₂S', from: 4 },
          { kind: 'particles', box: [440, 700, 320, 130], count: 4, color: '#ffd8a8', symbol: 'H₂S', size: 30, motion: 'rise', from: 6 },
        ],
      },
      {
        turn: 3,
        title: '硫和氧是一家',
        duration: 11,
        cues: [
          { kind: 'atom', path: [[360, 400]], symbol: 'O', color: '#ff8a80', r: 58, from: 0.3 },
          { kind: 'flow', path: ring(360, 400, 120), color: STINK, count: 6, size: 11, speed: 140, loop: true, from: 1 },
          { kind: 'atom', path: [[830, 400]], symbol: 'S', color: SULFUR, r: 74, from: 0.6 },
          { kind: 'flow', path: ring(830, 400, 165), color: STINK, count: 6, size: 11, speed: 160, loop: true, from: 1.3 },
          { kind: 'text', at: [600, 690], text: '最外层都是 6 个电子', size: 's', from: 2.6 },
          { kind: 'text', at: [600, 810], text: '同一族的兄弟', size: 'm', from: 4.6 },
        ],
      },
      {
        turn: 3,
        title: '水抱团，硫化氢飞走',
        duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [330, 560], size: [320, 320], liquid: '#bfe3ff', level: 0.75, label: 'H₂O：100 ℃ 才沸腾', from: 0 },
          { kind: 'particles', box: [200, 500, 260, 160], count: 8, color: '#ffffff', symbol: 'H₂O', size: 24, motion: 'jitter', from: 0.5 },
          { kind: 'shape', shape: 'rect', at: [870, 470], size: [400, 440], color: '#fff7ea', outline: true, from: 0.3 },
          { kind: 'particles', box: [700, 280, 340, 380], count: 7, color: '#ffd8a8', symbol: 'H₂S', size: 26, motion: 'gas', from: 1 },
          { kind: 'text', at: [870, 760], text: '−60 ℃ 就是气体', size: 's', from: 2 },
          { kind: 'text', at: [600, 860], text: '体温下早就飞起来了', size: 's', color: '#c2410c', from: 5 },
        ],
      },
      {
        turn: 4,
        title: '吃什么都同一条路',
        duration: 13,
        cues: [
          { kind: 'sprite', icon: '🍚', path: [[160, 260], [500, 450]], size: 70, travel: 2.5, from: 0.3, to: 6 },
          { kind: 'sprite', icon: '🥬', path: [[160, 450], [500, 450]], size: 70, travel: 2.5, from: 0.8, to: 6 },
          { kind: 'sprite', icon: '🍖', path: [[160, 640], [500, 450]], size: 70, travel: 2.5, from: 1.3, to: 6 },
          { kind: 'sprite', icon: '🦠', path: [[600, 450]], size: 120, wobble: true, from: 2.4 },
          { kind: 'flow', path: [[690, 450], [1060, 450]], color: STINK, count: 6, size: 12, from: 4 },
          { kind: 'shape', shape: 'pill', at: [960, 320], size: [260, 70], color: '#ffe1c2', text: '硫化氢', from: 4.6 },
          { kind: 'shape', shape: 'pill', at: [960, 580], size: [260, 70], color: '#fff0c2', text: '甲硫醇', from: 5 },
          { kind: 'text', at: [600, 820], text: '原料和工厂都差不多', size: 's', from: 6.4 },
        ],
      },
      {
        turn: 4,
        title: '家族一样，浓淡会变',
        duration: 12,
        cues: [
          { kind: 'sprite', icon: '🥚', path: [[260, 300]], size: 90, from: 0.3 },
          { kind: 'meter', at: [740, 300], label: '吃蛋和肉：更臭', start: 0, end: 0.9, color: STINK, over: 2, from: 1 },
          { kind: 'sprite', icon: '🥬', path: [[260, 540]], size: 90, from: 2.6 },
          { kind: 'meter', at: [740, 540], label: '吃菜吃饭：淡些', start: 0, end: 0.35, color: STINK, over: 2, from: 3.2 },
          { kind: 'myth', wrong: '吃什么屁味都一模一样', right: '同一家族，浓淡比例会变', from: 6 },
        ],
      },
      {
        turn: 5,
        title: '豆子让屁变多',
        duration: 11,
        cues: [
          { kind: 'sprite', icon: '🫘', path: [[150, 450], [420, 450]], size: 80, travel: 2, from: 0.3, to: 3.4 },
          { kind: 'shape', shape: 'pill', at: [420, 450], size: [240, 70], color: '#ffe1a8', text: '低聚糖', from: 2.6, to: 5.6 },
          { kind: 'sprite', icon: '🦠', path: [[600, 450]], size: 110, wobble: true, from: 3.4 },
          { kind: 'particles', box: [700, 220, 420, 440], count: 26, color: AIR, motion: 'gas', size: 13, from: 4.6 },
          { kind: 'label', at: [860, 300], pos: [930, 170], text: '氢气、二氧化碳', from: 5.4 },
          { kind: 'text', at: [600, 820], text: '气多，可是没有味道', size: 's', from: 6.6 },
        ],
      },
    ],
  },
};
