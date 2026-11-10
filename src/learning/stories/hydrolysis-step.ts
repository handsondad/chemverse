import { lessonAsset } from '../assets';
import type { Story } from './types';

const CLEAR = '#eef4fb';
const PAPER = '#f3e6a8';
const NEUTRAL = '#a9d18e';
const BASIC = '#4c6ef5';
const ACIDIC = '#f2805a';
const H_ION = '#ffe0a3';
const OH_ION = '#ffd6bf';
const SODIUM = '#b48cff';
const CHLORINE = '#9be29b';
const OIL = '#f2cf5b';
const MUD = '#c8a77a';

export const hydrolysisStep: Story = {
  slug: 'hydrolysis-step',
  title: '纯碱、小苏打明明都是盐，为什么化进水里却是碱性的，还能洗掉油？',
  trigger: '妈妈刷油乎乎的锅时，舀了一勺纯碱化进热水里，小念拿 pH 试纸一蘸，试纸变成了蓝色。',
  dialogue: [
    {
      nian: '纯碱不是一种盐吗？盐水怎么会让试纸变蓝？',
      dad: '因为盐溶液不一定是中性的。食盐水是中性的，纯碱水却偏碱，氯化铵水还偏酸。可以把盐看成酸和碱生的孩子：纯碱的「爸爸」是很弱的碳酸，「妈妈」是很强的烧碱，谁强就随谁，所以它的水溶液显碱性。别全信这个比方，真正的原因在水里。',
      show: { kind: 'lab', step: 1, label: '看「盐的类型」' },
    },
    {
      nian: '碳酸很弱，为什么弱反而能让水变成碱性？',
      dad: '因为弱酸留下的离子很「恋」氢离子。水分子自己会拆开一点点，变成一样多的氢离子和氢氧根离子。纯碱化开后的碳酸根离子，会从水分子手里抢走一个氢离子，剩下的氢氧根离子就多出来了，溶液就偏碱。盐的离子和水这样拉扯，叫水解。',
      eq: 'CO₃²⁻ + H₂O ⇌ HCO₃⁻ + OH⁻',
    },
    {
      nian: '碳酸根离子会抢氢离子，那食盐化开的离子为什么不去抢？',
      dad: '因为它们都不缺。氯离子来自很强的盐酸，强酸在水里本来就痛快地把氢离子放走，不会再抢回来；钠离子来自很强的烧碱，也不去抢氢氧根离子。两边都不抢，氢离子和氢氧根离子还是一样多，食盐水就是中性的。只有弱酸、弱碱留下的离子才会去抢。',
    },
    {
      nian: '弱碱留下的离子也会去抢吗？那溶液会变酸吗？',
      dad: '会。氯化铵里的铵根离子来自弱碱氨水，它专抢水里的氢氧根离子，剩下多出来的氢离子，溶液就偏酸。很多人以为盐溶液都是中性的，用 pH 试纸一测就知道不是：有的偏酸，有的偏碱，只有强酸和强碱生的盐才是中性的。',
      eq: 'NH₄⁺ + H₂O ⇌ NH₃·H₂O + H⁺',
      show: { kind: 'lab', step: 2, label: '看「看进去」' },
    },
    {
      nian: '纯碱水偏碱，那妈妈为什么非要用热水化开它来洗锅？',
      dad: '因为抢氢离子这一步要吸热，水一热，碳酸根抢得更起劲，氢氧根离子更多，碱性更强。碱能把粘在锅上的油拆成能溶进水里的东西，热水一冲就走。所以温热的纯碱水洗油锅，比冷水好用得多。',
      eq: 'CO₃²⁻ + H₂O ⇌ HCO₃⁻ + OH⁻（吸热）',
      show: { kind: 'lab', step: 4, label: '看「温度」' },
    },
    {
      nian: '纯碱水能帮着洗锅，那别的盐水解还能帮我们干什么？',
      dad: '还能净水。明矾里的铝离子、铁盐里的铁离子水解后，会长出一团团毛茸茸的絮状物，像撒进泥水里的一张张小网，兜住悬浮的泥沙一起沉到底，水就清了。不过它只管把浑水变清，不能杀菌，喝之前还得消毒、烧开。',
      eq: 'Al³⁺ + 3H₂O ⇌ Al(OH)₃（胶体）+ 3H⁺',
      show: { kind: 'lab', step: 6, label: '看「净水」' },
      figure: {
        kind: 'image',
        src: lessonAsset('covers/hydrolysis-step.webp'),
        alt: '三支试管：左边是浑浊的泥水，中间管底有红褐色絮团，右边管底有白色絮团',
        caption: '左边是没处理的浑泥水；中间加了铁盐、右边加了铝盐，红褐色和白色的絮团沉到管底，上面的水清了。',
      },
    },
    {
      nian: '我懂了！盐化进水里，弱酸留下的离子会抢氢离子，剩下氢氧根就偏碱；弱碱留下的离子抢氢氧根，就偏酸；纯碱是前一种，水越热抢得越凶，所以热纯碱水洗油更干净。',
      dad: '完全正确！记一个好习惯：用纯碱水刷锅洗碗时戴上手套，用完把手冲干净，碱水会伤皮肤，也别溅进眼睛。',
    },
  ],
  tip: '纯碱（碳酸钠）溶液碱性较强，会刺激皮肤和眼睛，刷洗时请戴手套。氯化铁、浓盐酸等实验请在老师指导下进行。明矾等净水剂只能让浑水变清，不能杀菌消毒，饮用水仍需消毒、煮沸。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '三杯盐水',
        duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [250, 420], size: [260, 300], liquid: CLEAR, level: 0.7, label: '食盐水', from: 0 },
          { kind: 'vessel', vessel: 'beaker', at: [600, 420], size: [260, 300], liquid: CLEAR, level: 0.7, label: '纯碱水', from: 0.2 },
          { kind: 'vessel', vessel: 'beaker', at: [950, 420], size: [260, 300], liquid: CLEAR, level: 0.7, label: '氯化铵水', from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [250, 710], size: [180, 56], color: PAPER, text: '试纸', tint: { color: NEUTRAL, at: 2, over: 1.2 }, from: 1 },
          { kind: 'shape', shape: 'pill', at: [600, 710], size: [180, 56], color: PAPER, text: '试纸', tint: { color: BASIC, at: 3.4, over: 1.2 }, from: 1.2 },
          { kind: 'shape', shape: 'pill', at: [950, 710], size: [180, 56], color: PAPER, text: '试纸', tint: { color: ACIDIC, at: 4.8, over: 1.2 }, from: 1.4 },
          { kind: 'text', at: [600, 840], text: '盐水不一定是中性', size: 'm', from: 7 },
        ],
      },
      {
        turn: 1,
        title: '碳酸根抢 H⁺',
        duration: 12,
        cues: [
          { kind: 'atom', path: [[200, 450], [380, 450]], symbol: 'CO₃²⁻', color: '#cfd8e3', r: 62, travel: 1.6, from: 0.3, to: 4.8 },
          { kind: 'atom', path: [[780, 450]], symbol: 'H₂O', color: '#d8efff', r: 50, from: 0.4, to: 2.6 },
          { kind: 'atom', path: [[780, 450]], symbol: 'OH⁻', color: OH_ION, r: 46, from: 2.6 },
          { kind: 'atom', path: [[830, 400], [460, 400]], symbol: 'H⁺', color: H_ION, r: 28, travel: 2, from: 2.6, to: 4.8 },
          { kind: 'atom', path: [[390, 450]], symbol: 'HCO₃⁻', color: '#cfd8e3', r: 62, from: 4.6 },
          { kind: 'label', at: [780, 450], pos: [940, 270], text: '多出了 OH⁻', from: 5.4 },
          { kind: 'formula', at: [600, 690], text: 'CO₃²⁻ + H₂O ⇌ HCO₃⁻ + OH⁻', from: 6 },
          { kind: 'text', at: [600, 840], text: '剩下 OH⁻，就偏碱', size: 'm', from: 8 },
        ],
      },
      {
        turn: 2,
        title: '食盐谁也不抢',
        duration: 11,
        cues: [
          { kind: 'atom', path: [[260, 420]], symbol: 'Na', charge: '+', color: SODIUM, r: 46, from: 0.3 },
          { kind: 'atom', path: [[940, 420]], symbol: 'Cl', charge: '−', color: CHLORINE, r: 46, from: 0.5 },
          { kind: 'particles', box: [440, 330, 320, 80], count: 4, color: H_ION, symbol: 'H⁺', motion: 'jitter', size: 24, from: 1.2 },
          { kind: 'particles', box: [440, 460, 320, 80], count: 4, color: OH_ION, symbol: 'OH⁻', motion: 'jitter', size: 26, from: 1.4 },
          { kind: 'label', at: [260, 420], pos: [260, 620], text: '不抢 OH⁻', from: 3 },
          { kind: 'label', at: [940, 420], pos: [940, 620], text: '不抢 H⁺', from: 3.8 },
          { kind: 'text', at: [600, 820], text: '一样多，就是中性', size: 'm', from: 7 },
        ],
      },
      {
        turn: 3,
        title: '铵根抢 OH⁻',
        duration: 12,
        cues: [
          { kind: 'atom', path: [[200, 380], [370, 380]], symbol: 'NH₄⁺', color: '#c9e6ff', r: 58, travel: 1.4, from: 0.3 },
          { kind: 'atom', path: [[770, 380]], symbol: 'H₂O', color: '#d8efff', r: 50, from: 0.4, to: 2.6 },
          { kind: 'atom', path: [[810, 380]], symbol: 'H⁺', color: H_ION, r: 30, from: 2.6 },
          { kind: 'atom', path: [[750, 380], [470, 380]], symbol: 'OH⁻', color: OH_ION, r: 40, travel: 2, from: 2.6 },
          { kind: 'label', at: [420, 380], pos: [420, 560], text: '一起变成氨水', from: 4.8 },
          { kind: 'label', at: [810, 380], pos: [960, 240], text: '多出了 H⁺', from: 5.2 },
          { kind: 'myth', wrong: '盐溶液都是中性的', right: '有的偏酸，有的偏碱', from: 7 },
        ],
      },
      {
        turn: 4,
        title: '热碱水洗油更好',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [330, 450], size: [320, 320], liquid: '#eaf2ff', level: 0.7, label: '冷纯碱水', from: 0 },
          { kind: 'vessel', vessel: 'beaker', at: [870, 450], size: [320, 320], liquid: '#ffe3cf', level: 0.7, label: '热纯碱水', from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [330, 560], size: [130, 64], color: OIL, text: '油', from: 0.6 },
          { kind: 'shape', shape: 'circle', at: [870, 560], size: [130, 64], color: OIL, text: '油', motion: 'shrink', over: 7, from: 0.6 },
          { kind: 'particles', box: [210, 430, 240, 90], count: 3, color: OH_ION, symbol: 'OH⁻', motion: 'jitter', size: 22, from: 1 },
          { kind: 'particles', box: [750, 420, 240, 100], count: 8, color: OH_ION, symbol: 'OH⁻', motion: 'jitter', size: 22, amount: { at: 2, over: 3, from: 3, to: 8 }, from: 1.4 },
          { kind: 'sprite', icon: '🔥', path: [[1090, 560]], size: 80, wobble: true, from: 1.4 },
          { kind: 'text', at: [600, 830], text: '越热，碱性越强', size: 'm', from: 7.5 },
        ],
      },
      {
        turn: 5,
        title: '絮团兜住泥沙',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [480, 470], size: [420, 440], liquid: MUD, level: 0.8, tint: { color: CLEAR, at: 4, over: 4 }, label: '浑泥水', from: 0 },
          { kind: 'flow', path: [[480, 200], [480, 380]], color: '#ffffff', count: 4, speed: 160, size: 11, from: 0.8, to: 3.4 },
          { kind: 'label', at: [500, 260], pos: [880, 220], text: '加一点明矾', from: 1, to: 4 },
          { kind: 'particles', box: [320, 400, 320, 220], count: 12, color: '#9c7a4f', motion: 'jitter', size: 10, amount: { at: 3.5, over: 3.5, from: 12, to: 0 }, from: 0.4 },
          { kind: 'shape', shape: 'rect', at: [480, 665], size: [360, 40], color: '#e9e3d6', motion: 'grow', over: 4, from: 3.5 },
          { kind: 'label', at: [480, 665], pos: [900, 560], text: '絮团沉到底', from: 5.5 },
          { kind: 'text', at: [600, 840], text: '能变清，不能杀菌', size: 'm', from: 8 },
        ],
      },
    ],
  },
};
