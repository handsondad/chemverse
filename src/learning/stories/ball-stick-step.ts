import { lessonAsset } from '../assets';
import type { Story, Vec } from './types';

const CARBON = '#3d3a36';
const HYDROGEN = '#f4f4f0';
const CHLORINE = '#8fd16b';
const STICK = '#7d8f88';
const PUSH = '#e0762b';

/** 甲烷投影到纸面上：碳在中间，一个氢朝上，两个在前下方，一个躲在碳后面 */
const C: Vec = [600, 440];
const TOP: Vec = [600, 220];
const LEFT: Vec = [420, 580];
const RIGHT: Vec = [790, 565];
const BACK: Vec = [650, 515];
/** 一笔画完朝外的三根棍子，最后回到碳的中心，箭头尖藏在碳球下面 */
const STICKS: Vec[] = [TOP, C, LEFT, C, RIGHT, C];

/** 绕 (cx, cy) 转一圈的椭圆，给绕着单键转的氢用 */
const ellipse = (cx: number, cy: number, rx: number, ry: number): Vec[] =>
  Array.from({ length: 49 }, (_, i) => [cx + rx * Math.cos((i / 48) * Math.PI * 2 - Math.PI / 2), cy + ry * Math.sin((i / 48) * Math.PI * 2 - Math.PI / 2)] as Vec);

/** 碳碳单键上方的一段弧线，表示「能转」 */
const swirl: Vec[] = Array.from({ length: 9 }, (_, i) => {
  const a = Math.PI * (-0.85 + (i / 8) * 0.7);
  return [600 + 110 * Math.cos(a), 430 + 110 * Math.sin(a)] as Vec;
});

export const ballStickStep: Story = {
  slug: 'ball-stick-step',
  title: '天然气里的甲烷在书上画成一个平平的十字，它真正的样子也是平的吗？',
  trigger: '小念看见爸爸的书上把甲烷画成 C 在中间、四个 H 排成十字，可桌上那套球棍模型里，黑球上的四根小棍却朝着四面八方。',
  dialogue: [
    {
      nian: '书上的甲烷画成平平的十字，可模型里的四根小棍怎么朝着四面八方？',
      dad: '因为纸是平的，只能画出「谁连着谁」，画不出真实的方向。真正的甲烷像一个三脚架再朝上竖一根棍：碳在中间，4 个氢分别待在一个正四面体的 4 个角上，5 个原子不在同一个平面里。这个形状就叫正四面体。',
      eq: 'CH₄：碳在中心，4 个氢在正四面体的 4 个角上',
      show: { kind: 'lab', step: 1, label: '看「甲烷」' },
      figure: {
        kind: 'image',
        src: lessonAsset('covers/ball-stick-step.webp'),
        alt: '甲烷的球棍模型：黑色碳球在中间，四个白色氢球朝四个方向伸出',
        caption: '黑球是碳、白球是氢：三个氢像三脚架的脚，第四个朝上竖着，谁和谁都不在一个平面上。',
      },
    },
    {
      nian: '为什么四个氢偏偏要待在正四面体的角上，不能排成平平的十字？',
      dad: '因为连着氢的四对电子都带负电，互相推挤，都想离别人远一点。排成平面十字，相邻两根棍只隔 90°；撑成正四面体，每两根之间都隔 109°28′，这是四根棍能分得最开的摆法。就像把四个气球的口扎在一起，它们会自己挤成这个样子。',
      eq: 'CH₄ · 键角 109°28′',
      show: { kind: 'lab', step: 1, label: '看「甲烷」' },
    },
    {
      nian: '四根棍分得最开，可怎么证明它真是四面体，不是平的十字呢？',
      dad: '有个巧办法：把甲烷里的两个氢换成氯，做成二氯甲烷。要是甲烷是平的十字，两个氯可以挨着放，也可以对着放，就该有两种不同的二氯甲烷；可科学家只找到过一种。用模型搭搭看：正四面体的四个角两两都挨着，换哪两个都一样，所以只有一种。',
      eq: 'CH₂Cl₂ 只有一种结构',
      show: { kind: 'lab', step: 2, label: '看「二氯甲烷」' },
    },
    {
      nian: '用模型一搭就看出来了！那把乙烷中间那根碳碳键扭一扭，会不会变出另一种分子？',
      dad: '不会。两个碳之间只连一根单键时，两头能像车轴一样随便转，转来转去还是同一个乙烷，只是摆了不同的姿势。很多人以为扭一下就成了新分子，其实谁连着谁一点没变，分子就没变。可要是两个碳之间是双键，就像用两根棍钉死了，怎么也转不动。',
      eq: 'C₂H₆：碳碳单键可以绕着键转',
      show: { kind: 'lab', step: 3, label: '看「单键能转」' },
    },
    {
      nian: '双键转不动的话，乙烯是不是就被钉成平平的一片了？',
      dad: '对。乙烯的两个碳之间是双键，2 个碳和 4 个氢全被锁在同一个平面上，键角大约 120°。乙炔的两个碳之间是三键，4 个原子干脆排成了一条直线。香蕉、芒果能被催熟，靠的就是乙烯这种平平的小分子。',
      eq: 'C₂H₄ 平面　　C₂H₂ 直线',
      show: { kind: 'lab', step: 6, label: '看「乙烯与乙炔」' },
    },
    {
      nian: '一个小分子就有这么多形状，那碳原子一个接一个连下去，能搭出多少种？',
      dad: '多得数不过来。碳能连成长链，还能拐弯、分叉、连成环。同样是 4 个碳、10 个氢，排成一条直链的叫正丁烷，中间分个叉的叫异丁烷，长相不同，沸点也不同，是两种东西。这种原子一样、搭法不同的分子，叫同分异构体。打火机里装的就是丁烷。',
      eq: 'C₄H₁₀：正丁烷、异丁烷两种结构',
      show: { kind: 'lab', step: 5, label: '看「同分异构」' },
      figure: {
        kind: 'chains',
        caption: '用同一把尺子量：碳一个接一个连下去，链就一节节变长；到 4 个碳时，还能搭出分叉的异丁烷。',
        chains: [
          { carbons: 1, label: '甲烷 · 天然气' },
          { carbons: 2, label: '乙烷' },
          { carbons: 3, label: '丙烷' },
          { carbons: 4, label: '丁烷 · 打火机', hot: true },
        ],
      },
    },
    {
      nian: '我懂了！纸上的结构式只画出谁连着谁；真实的甲烷是正四面体，单键能转、双键转不动，所以乙烯是平的、乙炔是直的；碳还能连成链、分出叉，同样的原子能搭出不同的分子。',
      dad: '总结得真棒！以后看到纸上的结构式，就在脑子里把它立起来想一想。家里没有模型，也可以用橡皮泥当原子、牙签当棍子，自己搭一个甲烷看看。',
    },
  ],
  tip: '甲烷、乙烯、丁烷都是易燃气体，打火机和燃气灶要远离孩子，闻到燃气味先开窗、别开关电器。键角 109°28′、乙烯约 120° 属于高中「物质结构」的内容，初中只需知道甲烷是立体的正四面体。用牙签搭模型时注意别扎手。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '纸上平，真的立',
        duration: 11,
        cues: [
          { kind: 'text', at: [600, 300], text: 'H', size: 'l', from: 0.3, to: 4.2 },
          { kind: 'text', at: [600, 365], text: '|', size: 'l', from: 0.5, to: 4.2 },
          { kind: 'text', at: [600, 430], text: 'H—C—H', size: 'l', from: 0.7, to: 4.2 },
          { kind: 'text', at: [600, 495], text: '|', size: 'l', from: 0.9, to: 4.2 },
          { kind: 'text', at: [600, 560], text: 'H', size: 'l', from: 1.1, to: 4.2 },
          { kind: 'label', at: [720, 430], pos: [960, 260], text: '纸上只画谁连谁', from: 1.8, to: 4.2 },
          { kind: 'atom', path: [BACK], symbol: 'H', color: HYDROGEN, r: 30, from: 4.6 },
          { kind: 'arrow', path: STICKS, color: STICK, draw: 1, from: 4.8 },
          { kind: 'atom', path: [C], symbol: 'C', color: CARBON, r: 58, from: 4.7 },
          { kind: 'atom', path: [TOP], symbol: 'H', color: HYDROGEN, r: 40, from: 5.4 },
          { kind: 'atom', path: [LEFT], symbol: 'H', color: HYDROGEN, r: 40, from: 5.6 },
          { kind: 'atom', path: [RIGHT], symbol: 'H', color: HYDROGEN, r: 40, from: 5.8 },
          { kind: 'text', at: [600, 820], text: '真实的甲烷是立体的', size: 'm', from: 7.4 },
        ],
      },
      {
        turn: 1,
        title: '四根棍分得最开',
        duration: 12,
        cues: [
          { kind: 'atom', path: [[600, 640], BACK], symbol: 'H', color: HYDROGEN, r: 36, travel: 4, from: 1.2 },
          { kind: 'atom', path: [C], symbol: 'C', color: CARBON, r: 58, from: 0.2 },
          { kind: 'atom', path: [[600, 250], TOP], symbol: 'H', color: HYDROGEN, r: 40, travel: 4, from: 1.2 },
          { kind: 'atom', path: [[400, 440], LEFT], symbol: 'H', color: HYDROGEN, r: 40, travel: 4, from: 1.2 },
          { kind: 'atom', path: [[800, 440], RIGHT], symbol: 'H', color: HYDROGEN, r: 40, travel: 4, from: 1.2 },
          { kind: 'text', at: [600, 810], text: '十字：相邻只隔 90°', size: 'm', from: 0.4, to: 3.2 },
          { kind: 'pulse', at: C, color: PUSH, radius: 260, from: 2.4, to: 6 },
          { kind: 'label', at: [640, 400], pos: [960, 280], text: '电子对互相推开', from: 2.6, to: 6.2 },
          { kind: 'text', at: [600, 810], text: '四面体：都隔 109°28′', size: 'm', from: 6.6 },
        ],
      },
      {
        turn: 2,
        title: '换哪两个都一样',
        duration: 12,
        cues: [
          { kind: 'atom', path: [BACK], symbol: 'H', color: HYDROGEN, r: 30, from: 0.2 },
          { kind: 'arrow', path: STICKS, color: STICK, draw: 1, from: 0.4 },
          { kind: 'atom', path: [C], symbol: 'C', color: CARBON, r: 58, from: 0.3 },
          { kind: 'atom', path: [TOP], symbol: 'Cl', color: CHLORINE, r: 48, from: 1 },
          { kind: 'atom', path: [LEFT], symbol: 'Cl', color: CHLORINE, r: 48, from: 1.2, to: 5 },
          { kind: 'atom', path: [RIGHT], symbol: 'H', color: HYDROGEN, r: 40, from: 1.4, to: 5 },
          { kind: 'text', at: [600, 820], text: '两个氢换成氯', size: 'm', from: 1.8, to: 4.6 },
          { kind: 'atom', path: [LEFT, [600, 660], RIGHT], symbol: 'Cl', color: CHLORINE, r: 48, travel: 2, from: 5 },
          { kind: 'atom', path: [RIGHT, [600, 770], LEFT], symbol: 'H', color: HYDROGEN, r: 40, travel: 2, from: 5 },
          { kind: 'text', at: [600, 840], text: '换个位置，还是同一种', size: 'm', from: 7.6 },
        ],
      },
      {
        turn: 3,
        title: '单键能转',
        duration: 12,
        cues: [
          { kind: 'bond', a: [430, 420], b: [770, 420], color: STICK, from: 0.3 },
          { kind: 'bond', a: [430, 420], b: [330, 290], color: STICK, from: 0.5 },
          { kind: 'atom', path: [[430, 420]], symbol: 'C', color: CARBON, r: 54, from: 0.2 },
          { kind: 'atom', path: [[770, 420]], symbol: 'C', color: CARBON, r: 54, from: 0.3 },
          { kind: 'atom', path: [[330, 290]], symbol: 'H', color: HYDROGEN, r: 38, from: 0.6 },
          { kind: 'atom', path: ellipse(900, 420, 34, 130), symbol: 'H', color: HYDROGEN, r: 38, travel: 4, from: 1.4 },
          { kind: 'arrow', path: swirl, text: '单键能转', from: 2 },
          { kind: 'myth', wrong: '扭一扭就成了新分子', right: '单键转一转，还是乙烷', from: 6.6 },
        ],
      },
      {
        turn: 4,
        title: '乙烯平，乙炔直',
        duration: 12,
        cues: [
          { kind: 'arrow', path: [[455, 308], [520, 420], [455, 532], [520, 420], [520, 410], [680, 410], [680, 420], [745, 308], [680, 420], [745, 532]], color: STICK, draw: 1.4, from: 0.4, to: 5.6 },
          { kind: 'bond', a: [520, 430], b: [680, 430], color: STICK, from: 1.6, to: 5.6 },
          { kind: 'atom', path: [[520, 420]], symbol: 'C', color: CARBON, r: 50, from: 0.2, to: 5.6 },
          { kind: 'atom', path: [[680, 420]], symbol: 'C', color: CARBON, r: 50, from: 0.3, to: 5.6 },
          { kind: 'atom', path: [[455, 308]], symbol: 'H', color: HYDROGEN, r: 36, from: 0.8, to: 5.6 },
          { kind: 'atom', path: [[455, 532]], symbol: 'H', color: HYDROGEN, r: 36, from: 1, to: 5.6 },
          { kind: 'atom', path: [[745, 308]], symbol: 'H', color: HYDROGEN, r: 36, from: 1.2, to: 5.6 },
          { kind: 'atom', path: [[745, 532]], symbol: 'H', color: HYDROGEN, r: 36, from: 1.4, to: 5.6 },
          { kind: 'arrow', path: [[300, 450], [900, 450]], color: STICK, draw: 1, from: 6.2 },
          { kind: 'bond', a: [500, 434], b: [700, 434], color: STICK, from: 6.8 },
          { kind: 'bond', a: [500, 466], b: [700, 466], color: STICK, from: 6.8 },
          { kind: 'atom', path: [[300, 450]], symbol: 'H', color: HYDROGEN, r: 36, from: 6 },
          { kind: 'atom', path: [[500, 450]], symbol: 'C', color: CARBON, r: 50, from: 6.1 },
          { kind: 'atom', path: [[700, 450]], symbol: 'C', color: CARBON, r: 50, from: 6.2 },
          { kind: 'atom', path: [[900, 450]], symbol: 'H', color: HYDROGEN, r: 36, from: 6.3 },
          { kind: 'text', at: [600, 700], text: '乙炔：4 个原子一条直线', size: 's', from: 8.2 },
        ],
      },
      {
        turn: 5,
        title: '同样原子，不同搭法',
        duration: 12,
        cues: [
          { kind: 'bond', a: [300, 520], b: [480, 420], color: STICK, from: 0.6 },
          { kind: 'bond', a: [480, 420], b: [660, 520], color: STICK, from: 0.8 },
          { kind: 'bond', a: [660, 520], b: [840, 420], color: STICK, from: 1, to: 4.4 },
          { kind: 'atom', path: [[300, 520]], symbol: 'C', color: CARBON, r: 48, from: 0.2 },
          { kind: 'atom', path: [[480, 420]], symbol: 'C', color: CARBON, r: 48, from: 0.3 },
          { kind: 'atom', path: [[660, 520]], symbol: 'C', color: CARBON, r: 48, from: 0.4 },
          { kind: 'atom', path: [[840, 420]], symbol: 'C', color: CARBON, r: 48, from: 0.5, to: 4.4 },
          { kind: 'text', at: [600, 720], text: '正丁烷：碳排成一条链', size: 's', from: 1.4, to: 4 },
          { kind: 'atom', path: [[840, 420], [720, 280], [480, 250]], symbol: 'C', color: CARBON, r: 48, travel: 1.8, from: 4.4 },
          { kind: 'bond', a: [480, 420], b: [480, 250], color: STICK, from: 6.2 },
          { kind: 'text', at: [600, 720], text: '异丁烷：中间分个叉', size: 's', from: 6.6 },
        ],
      },
    ],
  },
};
