import { lessonAsset } from '../assets';
import type { Story } from './types';

const ZINC = '#b8c0c8';
const COPPER = '#d98a5a';
const ELECTRON = '#ffcf3f';
const ACID = '#eef4fb';
const ZINC_SOL = '#eef4fb';
const COPPER_SOL = '#8cc8f0';
const BRIDGE = '#f3ead2';
const HYDROGEN = '#ffffff';
const HEAT = '#e0762b';

export const galvanicStep: Story = {
  slug: 'galvanic-step',
  title: '柠檬里插一片锌、一片铜，连上导线，电子表怎么就亮了？',
  trigger: '科学课上，小念把锌片和铜片插进柠檬，用导线接上一块小电子表，表上的数字竟然亮了起来。',
  dialogue: [
    {
      nian: '爸爸，柠檬一接上导线，电子表就亮了！柠檬里藏着电吗？',
      dad: '柠檬里没存着电，电是两片金属和果汁一起「现做」的。锌比铜更舍得丢电子，丢出来的电子沿着导线跑到铜那边，就像水从高处往低处流，一路上推着电子表干活。这种把化学反应直接变成电流的装置，叫原电池。',
      show: { kind: 'lab', step: 0, label: '看「两台装置」' },
    },
    {
      nian: '电子跑到铜那边以后，铜片上会发生什么？',
      dad: '铜片上会冒出小气泡。果汁、稀硫酸这类酸里有很多氢离子，它们在铜片表面接住跑过来的电子，两个两个结成氢气。锌那边，丢了电子的锌原子变成锌离子溶进液体里，锌片一点点变薄。丢电子的锌片是负极，接电子的铜片是正极。',
      eq: 'Zn − 2e⁻ = Zn²⁺ · 2H⁺ + 2e⁻ = H₂↑',
      show: { kind: 'lab', step: 1, label: '看「接通导线」' },
    },
    {
      nian: '可是锌片直接泡在酸里不也会溶掉吗？为什么非得绕一圈导线？',
      dad: '问到点子上了。锌直接碰到酸，电子就在锌片表面当场交给氢离子，能量全变成了热，一点电也用不上。只有把丢电子和接电子分在两处，电子才不得不走导线，顺路干活。所以一杯酸做的电池用久了电流会变小：锌片上也在偷偷冒氢气，电子抄了近路。',
      eq: 'Zn + 2H⁺ = Zn²⁺ + H₂↑（不经导线）',
      show: { kind: 'lab', step: 3, label: '看「单液的代价」' },
    },
    {
      nian: '电子走导线到了铜片，是不是再穿过果汁游回锌片，绕成一圈？',
      dad: '很多人这么想，其实电子从不下水。溶液里走动的是带电的离子：带正电的往铜片那边挪，带负电的往锌片那边挪，像接力一样把电荷传过去。导线里跑电子，溶液里跑离子，两段接起来，才是一整圈电路。',
      show: { kind: 'lab', step: 6, label: '看「看进去」' },
    },
    {
      nian: '既然离子能接力，怎样才能让电池又稳又持久，不让电子抄近路？',
      dad: '把两件事彻底分开：锌片泡在硫酸锌溶液里，铜片泡在蓝色的硫酸铜溶液里，两杯之间搭一根盐桥。盐桥是灌了含盐冻胶的弯管，像两个房间之间的小门，只让离子过。锌碰不到铜离子，电子只好走导线；铜片上不再冒泡，而是长出一层新铜。',
      eq: 'Zn − 2e⁻ = Zn²⁺ · Cu²⁺ + 2e⁻ = Cu',
      show: { kind: 'lab', step: 4, label: '看「换成双液」' },
      figure: {
        kind: 'image',
        src: lessonAsset('covers/galvanic-step.webp'),
        alt: '两只烧杯：左杯无色溶液里插着锌片，右杯蓝色溶液里插着铜片，中间架着一根弯管，上方连着电表',
        caption: '左杯插锌片，右杯蓝色的硫酸铜里插铜片，中间那根倒 U 形的弯管就是盐桥，电表指针偏了。',
      },
    },
    {
      nian: '盐桥就是一根小管子，要是把它拔掉呢？',
      dad: '拔掉盐桥，电表马上回到零。锌那杯的锌离子越攒越多，正电荷过剩；铜那杯的铜离子越来越少，负电荷过剩，电子就推不动了。插着盐桥时，桥里的氯离子溜进锌那杯，钾离子溜进铜那杯，随时把两边的电荷扯平，反应才能一直进行。',
      eq: 'K⁺ → 硫酸铜杯 · Cl⁻ → 硫酸锌杯',
      show: { kind: 'lab', step: 5, label: '看「拔出盐桥」' },
    },
    {
      nian: '我懂了！锌爱丢电子，电子被逼着走导线到铜那边，路上让电子表亮起来；溶液里靠离子接力把电路接成一圈，盐桥把两边的电荷扯平，电池才又稳又久。',
      dad: '说得太清楚了！记一个好习惯：纽扣电池别和钥匙、硬币放在一个口袋里，金属一碰到两极，电子就能抄近路，电池会发烫，电也白白浪费了。',
    },
  ],
  tip: '柠檬电池电压很低，可以在家安全地做；做完的柠檬不要再吃。稀硫酸有腐蚀性、硫酸铜溶液有毒，双液电池实验请在老师指导下进行，用后洗手。纽扣电池被小孩误吞非常危险，请放在孩子够不着的地方。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '柠檬里现做电',
        duration: 10,
        cues: [
          { kind: 'sprite', icon: '🍋', path: [[600, 540]], size: 300, from: 0 },
          { kind: 'shape', shape: 'rect', at: [500, 440], size: [50, 260], color: ZINC, text: 'Zn', from: 0.6 },
          { kind: 'shape', shape: 'rect', at: [700, 440], size: [50, 260], color: COPPER, text: 'Cu', from: 0.9 },
          { kind: 'flow', path: [[500, 310], [500, 210], [700, 210], [700, 310]], color: ELECTRON, count: 6, speed: 160, size: 11, from: 2 },
          { kind: 'sprite', icon: '⌚', path: [[600, 210]], size: 90, from: 2.8 },
          { kind: 'label', at: [500, 480], pos: [250, 680], text: '锌：爱丢电子', from: 3.8 },
          { kind: 'text', at: [600, 840], text: '电不是存的，是现做的', size: 'm', from: 6.4 },
        ],
      },
      {
        turn: 1,
        title: '电子跑到铜片',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [600, 560], size: [600, 380], liquid: ACID, level: 0.75, label: '稀硫酸', from: 0 },
          { kind: 'shape', shape: 'rect', at: [420, 520], size: [60, 320], color: ZINC, text: 'Zn', from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [780, 520], size: [60, 320], color: COPPER, text: 'Cu', from: 0.5 },
          { kind: 'flow', path: [[420, 360], [420, 230], [780, 230], [780, 360]], color: ELECTRON, count: 6, speed: 160, size: 11, from: 1 },
          { kind: 'atom', path: [[460, 560], [580, 620]], symbol: 'Zn', charge: '2+', color: ZINC, r: 30, travel: 2, from: 2.6 },
          { kind: 'particles', box: [740, 500, 80, 170], count: 8, color: HYDROGEN, motion: 'rise', size: 12, from: 4 },
          { kind: 'label', at: [800, 470], pos: [1010, 340], text: '氢气泡', from: 5 },
          { kind: 'formula', at: [600, 860], text: 'Zn − 2e⁻ = Zn²⁺ · 2H⁺ + 2e⁻ = H₂↑', from: 7 },
        ],
      },
      {
        turn: 2,
        title: '电子抄了近路',
        duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [600, 560], size: [600, 380], liquid: ACID, level: 0.75, label: '一杯酸的电池', from: 0 },
          { kind: 'shape', shape: 'rect', at: [420, 520], size: [60, 320], color: ZINC, text: 'Zn', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [780, 520], size: [60, 320], color: COPPER, text: 'Cu', from: 0.3 },
          { kind: 'flow', path: [[420, 360], [420, 230], [780, 230], [780, 360]], color: ELECTRON, count: 6, speed: 160, size: 11, from: 0.5 },
          { kind: 'particles', box: [380, 500, 80, 170], count: 10, color: HYDROGEN, motion: 'rise', size: 12, amount: { at: 2, over: 5, from: 1, to: 10 }, from: 1.5 },
          { kind: 'label', at: [400, 560], pos: [200, 400], text: '锌片上也冒泡', from: 3 },
          { kind: 'meter', at: [960, 160], label: '电流', start: 0.8, end: 0.25, color: HEAT, over: 6, from: 2 },
          { kind: 'text', at: [600, 850], text: '电子抄近路，能量变成热', size: 's', from: 7.4 },
        ],
      },
      {
        turn: 3,
        title: '溶液里跑离子',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [600, 400], size: [600, 340], liquid: ACID, level: 0.8, from: 0 },
          { kind: 'shape', shape: 'rect', at: [420, 380], size: [56, 280], color: ZINC, text: 'Zn', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [780, 380], size: [56, 280], color: COPPER, text: 'Cu', from: 0.3 },
          { kind: 'flow', path: [[420, 240], [420, 170], [780, 170], [780, 240]], color: ELECTRON, count: 6, speed: 160, size: 11, from: 0.6 },
          { kind: 'atom', path: [[480, 460], [720, 460]], symbol: 'H', charge: '+', color: HYDROGEN, r: 26, travel: 4, from: 2 },
          { kind: 'atom', path: [[720, 380], [480, 380]], symbol: 'SO₄', charge: '2−', color: '#c9e6c0', r: 32, travel: 4, from: 2.6 },
          { kind: 'myth', wrong: '电子穿过溶液游回去', right: '溶液里是离子在搬电荷', from: 6.4 },
        ],
      },
      {
        turn: 4,
        title: '两杯加一座盐桥',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [330, 560], size: [360, 340], liquid: ZINC_SOL, level: 0.75, label: '硫酸锌', from: 0 },
          { kind: 'vessel', vessel: 'beaker', at: [870, 560], size: [360, 340], liquid: COPPER_SOL, level: 0.75, label: '硫酸铜', from: 0 },
          { kind: 'shape', shape: 'rect', at: [330, 520], size: [50, 300], color: ZINC, text: 'Zn', from: 0.4 },
          { kind: 'shape', shape: 'rect', at: [870, 520], size: [50, 300], color: COPPER, text: 'Cu', tint: { color: '#c0602a', at: 4.5, over: 4 }, from: 0.6 },
          { kind: 'shape', shape: 'pill', at: [600, 510], size: [420, 44], color: BRIDGE, text: '盐桥', from: 1.4 },
          { kind: 'flow', path: [[330, 370], [330, 250], [870, 250], [870, 370]], color: ELECTRON, count: 7, speed: 170, size: 11, from: 2.4 },
          { kind: 'label', at: [880, 620], pos: [1040, 340], text: '长出新铜', from: 5 },
          { kind: 'text', at: [600, 850], text: '锌碰不到铜离子了', size: 'm', from: 7.6 },
        ],
      },
      {
        turn: 5,
        title: '拔掉盐桥就停',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [330, 560], size: [360, 340], liquid: ZINC_SOL, level: 0.75, label: '硫酸锌', from: 0 },
          { kind: 'vessel', vessel: 'beaker', at: [870, 560], size: [360, 340], liquid: COPPER_SOL, level: 0.75, label: '硫酸铜', from: 0 },
          { kind: 'shape', shape: 'rect', at: [330, 520], size: [50, 300], color: ZINC, text: 'Zn', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [870, 520], size: [50, 300], color: COPPER, text: 'Cu', from: 0.2 },
          { kind: 'shape', shape: 'pill', at: [600, 510], size: [420, 44], color: BRIDGE, text: '盐桥', from: 0.4, to: 6.4 },
          { kind: 'flow', path: [[330, 370], [330, 250], [870, 250], [870, 370]], color: ELECTRON, count: 7, speed: 170, size: 11, from: 0.6, to: 6.4 },
          { kind: 'atom', path: [[560, 510], [420, 520], [410, 630]], symbol: 'Cl', charge: '−', color: '#b9e7a5', r: 24, travel: 2.6, from: 1.6, to: 6 },
          { kind: 'atom', path: [[640, 510], [780, 520], [790, 630]], symbol: 'K', charge: '+', color: '#d6c4ff', r: 24, travel: 2.6, from: 2.2, to: 6 },
          { kind: 'meter', at: [600, 220], label: '电流', start: 0.6, end: 0, color: HEAT, over: 1.5, from: 7 },
          { kind: 'text', at: [600, 850], text: '离子扯平电荷，电才不停', size: 's', from: 8.6 },
        ],
      },
    ],
  },
};
