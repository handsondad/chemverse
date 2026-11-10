import { lessonAsset } from '../assets';
import type { Story } from './types';

const GLASS = '#eef4fb';
const LYE = '#d8efff';
const VINEGAR = '#f6f1e3';
const PINK = '#f7b8d2';
const PINK_DEEP = '#e0569a';
const H_ION = '#ffe0a3';
const OH_ION = '#ffd6bf';
const WATER = '#d8efff';

export const titrationStep: Story = {
  slug: 'titration-step',
  title: '往白醋里一滴滴加碱，前面滴了好多都没动静，为什么最后半滴一下就变粉红了？',
  trigger: '小念在纪录片里看到质检员测白醋：细玻璃管里的液体一滴滴落进瓶子，瓶里一直透明，忽然半滴下去，整瓶变成了淡淡的粉红色。',
  dialogue: [
    {
      nian: '质检员一滴一滴往白醋里加的是什么？为什么要滴得这么小心？',
      dad: '加的是浓度已经知道的烧碱溶液。酸和碱会互相抵消，醋里有多少醋酸，就要用掉多少碱，只要量出用掉了多少碱，就能倒推出醋有多酸。就像数一袋糖，一颗颗拿出来，拿完了就知道有几颗。这种一滴滴加、量出用掉多少的方法叫滴定。',
      eq: 'CH₃COOH + NaOH = CH₃COONa + H₂O',
      show: { kind: 'lab', step: 0, label: '看「认识滴定装置」' },
    },
    {
      nian: '酸和碱是怎么互相抵消的？醋里的酸跑到哪去了？',
      dad: '酸里有氢离子，碱里有氢氧根离子，它们一碰面就手拉手变成一个水分子，既不酸也不碱了。每滴进去一滴碱，都会悄悄「吃掉」一些醋里的酸。等最后一点酸也被吃完，正好抵消干净，这一刻就是我们要找的终点。',
      eq: 'H⁺ + OH⁻ = H₂O',
      show: { kind: 'lab', step: 6, label: '看「看进去」' },
    },
    {
      nian: '终点前瓶子里一直是透明的，怎么知道酸刚好被吃完了？',
      dad: '靠一个报信员：酚酞。它在酸里和中性的水里都没有颜色，水一偏碱就变粉红。酸还没吃完时，滴进去的碱马上被吃掉，瓶里一直不碱，所以一直透明；最后一点酸吃完，再多半滴碱就没人吃了，水一下偏碱，粉红色就冒了出来。这类会变色报信的东西叫指示剂。',
      show: { kind: 'lab', step: 2, label: '看「取液与加指示剂」' },
    },
    {
      nian: '粉红色是突然冒出来的？不是一点点变深的吗？',
      dad: '是突然的。很多人以为颜色会跟着滴进去的碱一点点变深，其实前面滴了一大半，瓶里的酸碱程度只变了一点点；快到终点时，半滴就让它一下子跳过一大截，这叫突跃。就像往天平一边一粒粒加米，前面一直不动，最后一粒放上去，一下就翻过去了。',
      show: { kind: 'lab', step: 3, label: '看「逐滴加入」' },
    },
    {
      nian: '半滴就能跳过去，那快到终点时要怎么滴才不会滴过头？',
      dad: '先快后慢。开始可以一滴接一滴，边滴边摇；看到粉红色冒出来又很快褪掉，就说明快到了，改成半滴半滴地加。等淡淡的粉红色半分钟都不褪，才算到了终点。要是滴过了头，用掉的碱算多了，算出来的醋就比实际更酸。',
      show: { kind: 'lab', step: 4, label: '看「半滴到终点」' },
      figure: {
        kind: 'image',
        src: lessonAsset('covers/titration-step.webp'),
        alt: '铁架台夹着滴定管，下面的锥形瓶垫着白纸，瓶里是淡粉红色的溶液',
        caption: '滴定装置：铁架台夹着细长的滴定管，锥形瓶下垫一张白纸，淡淡的粉红色一眼就能看出来。',
      },
    },
    {
      nian: '用掉多少碱，到底怎么算出醋有多酸？',
      dad: '酸和碱是一份对一份抵消的。碱液的浓度已知，再读出用掉了多少毫升，就知道用掉了多少碱，醋里的醋酸也就有那么多。读刻度时眼睛要和液面平齐，仰着、俯着看都会读错；滴定管还要先用碱液润洗几遍，不然碱被管里残留的水冲稀，结果就不准。',
      eq: 'c(酸)·V(酸) = c(碱)·V(碱)',
      show: { kind: 'lab', step: 5, label: '看「读数与计算」' },
    },
    {
      nian: '我懂了！碱一滴滴吃掉醋里的酸，酸没吃完时瓶里一直透明；最后一点酸吃完，半滴碱就让酚酞一下变粉红，再读出用掉多少碱，就能算出醋有多酸。',
      dad: '说得真好！做实验记住一个好习惯：读数时蹲下来，让眼睛和液面平齐，读完马上记在本子上，别光靠脑子记。',
    },
  ],
  tip: '烧碱（氢氧化钠）溶液有强腐蚀性，滴定实验请在实验室由老师指导进行，并戴好护目镜。3D 实验台里演示的是用盐酸滴定烧碱溶液，酚酞从粉红褪成无色，方向和文中测白醋正好相反，道理相同。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '一滴滴加碱',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 250], size: [44, 300], color: GLASS, from: 0 },
          { kind: 'label', at: [620, 200], pos: [880, 200], text: '已知浓度的碱', from: 0.8 },
          { kind: 'vessel', vessel: 'beaker', at: [600, 610], size: [320, 260], liquid: VINEGAR, level: 0.5, label: '白醋', from: 0 },
          { kind: 'flow', path: [[600, 410], [600, 600]], color: LYE, count: 3, speed: 140, size: 9, from: 1.6 },
          { kind: 'meter', at: [960, 560], label: '用掉的碱', start: 0, end: 0.75, color: '#4c6ef5', over: 6, from: 2 },
          { kind: 'text', at: [600, 860], text: '用掉多少碱，就知道多酸', size: 'm', from: 7.4 },
        ],
      },
      {
        turn: 1,
        title: '酸碱手拉手',
        duration: 11,
        cues: [
          { kind: 'particles', box: [300, 380, 600, 200], count: 6, color: H_ION, symbol: 'H⁺', motion: 'jitter', size: 26, amount: { at: 2, over: 5, from: 6, to: 0 }, from: 0.3 },
          { kind: 'atom', path: [[820, 180], [700, 430]], symbol: 'OH⁻', color: OH_ION, r: 32, travel: 1.4, from: 1.2, to: 3.2 },
          { kind: 'atom', path: [[420, 180], [500, 430]], symbol: 'OH⁻', color: OH_ION, r: 32, travel: 1.4, from: 2.6, to: 4.6 },
          { kind: 'particles', box: [300, 380, 600, 200], count: 6, color: WATER, symbol: 'H₂O', motion: 'gas', size: 30, amount: { at: 2, over: 5, from: 0, to: 6 }, from: 2 },
          { kind: 'meter', at: [600, 680], label: '剩下的酸', start: 0.9, end: 0.05, color: '#e0762b', over: 5, from: 2 },
          { kind: 'formula', at: [600, 800], text: 'H⁺ + OH⁻ = H₂O', from: 6.4 },
        ],
      },
      {
        turn: 2,
        title: '酚酞来报信',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 230], size: [44, 260], color: GLASS, from: 0 },
          { kind: 'vessel', vessel: 'beaker', at: [600, 590], size: [340, 280], liquid: VINEGAR, level: 0.5, tint: { color: PINK, at: 7.5, over: 0.6 }, label: '醋 + 酚酞', from: 0 },
          { kind: 'flow', path: [[600, 370], [600, 580]], color: LYE, count: 3, speed: 140, size: 9, from: 1, to: 7.4 },
          { kind: 'label', at: [600, 650], pos: [930, 470], text: '一直透明', from: 2, to: 6.4 },
          { kind: 'meter', at: [930, 300], label: '剩下的酸', start: 0.7, end: 0, color: '#e0762b', over: 5, from: 1.5 },
          { kind: 'pulse', at: [600, 640], color: PINK_DEEP, radius: 200, from: 7.6 },
          { kind: 'text', at: [600, 860], text: '酸吃完，半滴就变粉红', size: 'm', from: 8.4 },
        ],
      },
      {
        turn: 3,
        title: '最后才突跃',
        duration: 12,
        cues: [
          { kind: 'arrow', path: [[240, 600], [960, 600]], color: '#7d8f88', text: '滴进的碱', from: 0.3 },
          { kind: 'arrow', path: [[240, 600], [240, 170]], color: '#7d8f88', text: '酸碱程度', from: 0.6 },
          {
            kind: 'arrow', color: PINK_DEEP, draw: 4, from: 1.2,
            path: [[260, 540], [400, 515], [550, 495], [660, 475], [700, 455], [715, 380], [725, 290], [745, 245], [820, 225], [940, 215]],
          },
          { kind: 'label', at: [720, 340], pos: [960, 400], text: '突跃！', from: 4.6 },
          { kind: 'shape', shape: 'circle', at: [1060, 230], size: [100, 100], color: VINEGAR, tint: { color: PINK, at: 4.4, over: 0.5 }, from: 0.8 },
          { kind: 'myth', wrong: '颜色是一点点变深的', right: '最后半滴一下子跳过去', from: 7 },
        ],
      },
      {
        turn: 4,
        title: '先快后慢',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 230], size: [44, 260], color: GLASS, from: 0 },
          { kind: 'vessel', vessel: 'beaker', at: [600, 560], size: [340, 280], liquid: VINEGAR, level: 0.5, tint: { color: PINK, at: 7.2, over: 1 }, from: 0 },
          { kind: 'flow', path: [[600, 370], [600, 540]], color: LYE, count: 6, speed: 320, size: 9, from: 0.6, to: 3.6 },
          { kind: 'label', at: [600, 450], pos: [900, 330], text: '一滴接一滴', from: 0.8, to: 3.6 },
          { kind: 'pulse', at: [600, 610], color: PINK_DEEP, radius: 120, from: 3.6, to: 5 },
          { kind: 'flow', path: [[600, 370], [600, 540]], color: LYE, count: 1, speed: 60, size: 9, from: 4.4 },
          { kind: 'label', at: [600, 450], pos: [900, 330], text: '改成半滴', from: 4.6 },
          { kind: 'text', at: [600, 840], text: '半分钟不褪，才算终点', size: 'm', from: 8 },
        ],
      },
      {
        turn: 5,
        title: '眼睛和液面平齐',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 450], size: [90, 520], color: GLASS, from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 590], size: [86, 240], color: LYE, from: 0.2 },
          { kind: 'sprite', icon: '👁️', path: [[900, 470]], size: 80, from: 1 },
          { kind: 'arrow', path: [[850, 470], [670, 470]], color: '#1f6b55', text: '平视读数', from: 1.6 },
          { kind: 'sprite', icon: '👁️', path: [[900, 290]], size: 60, from: 4, to: 7.5 },
          { kind: 'arrow', path: [[860, 300], [670, 455]], color: '#e5484d', text: '俯视会读错', from: 4.4, to: 7.5 },
          { kind: 'formula', at: [600, 820], text: 'c(酸)·V(酸) = c(碱)·V(碱)', from: 7.6 },
        ],
      },
    ],
  },
};
