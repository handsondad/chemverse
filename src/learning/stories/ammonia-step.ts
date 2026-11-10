import type { Story } from './types';

const AMMONIA = '#bfe3ff';
const WATER = '#d8efff';
const PINK = '#ff7aa8';
const AIR = '#b9c4cf';
const TUBE = '#8aa19b';
const PRESSURE = '#3f8fd8';

export const ammoniaStep: Story = {
  slug: 'ammonia-step',
  title: '烧杯里的水为什么会自己往上冲，在烧瓶里喷出一朵红色的喷泉？',
  trigger: '实验视频里，倒扣的烧瓶装满了氨气。老师挤了一下胶头滴管，下面烧杯里滴了酚酞的水就顺着玻璃管冲上去，在烧瓶里喷成一朵红色的喷泉。',
  dialogue: [
    {
      nian: '水明明在下面的烧杯里，为什么会自己往上冲进烧瓶？是烧瓶把水吸上去的吗？',
      dad: '不是「吸」，是「压」。烧瓶里原来装满了氨气，滴管挤进去的那一点水溶掉了一大片氨气，瓶里的气体一下子变少，压强跟着降低；烧杯的水面上却一直压着大气，外面的大气压比瓶里大，就把水沿着玻璃管压了上去，喷成了泉。',
      show: { kind: 'lab', step: 6, label: '看做喷泉' },
    },
    {
      nian: '一点点水就能溶掉一大片氨气？氨气到底有多容易溶在水里？',
      dad: '极其容易。常温下，1 体积的水大约能溶解 700 体积的氨气。打个比方，一个装满氨气的大烧瓶，只要挤进去一小滴管水，瓶里的氨气就能被「吃掉」一大半。气体越少，瓶里压强越低，外面的水就冲得越猛。能做喷泉的气体都有这个特点：在水里溶得又多又快。',
    },
    {
      nian: '那喷泉为什么是红色的？氨气溶进水里变成了什么？',
      dad: '氨气溶进水里，大部分和水结合成一水合氨，其中一小部分又会分出铵根离子和氢氧根离子。氢氧根离子让溶液显碱性，烧杯里预先滴的酚酞遇碱变红，喷出来的泉就是红色的。因为只有一小部分分出氢氧根，氨水是一种「弱碱」。',
      eq: 'NH₃ + H₂O ⇌ NH₃·H₂O ⇌ NH₄⁺ + OH⁻',
      show: { kind: 'lab', step: 7, label: '看进分子里' },
    },
    {
      nian: '氨气这么容易溶进水里，那做实验时，烧瓶里的氨气是怎么收集满的？',
      dad: '正因为它太容易溶于水，不能用排水法收集。实验室把氯化铵和熟石灰混在一起加热制氨气；氨气比空气轻，就把收集用的试管口朝下，让氨气从上往下把空气挤出去，这叫「向下排空气法」。干燥它要用碱石灰，不能用浓硫酸，因为氨气显碱性，会被酸吸收掉。',
      eq: '2NH₄Cl + Ca(OH)₂ =△= CaCl₂ + 2NH₃↑ + 2H₂O',
      show: { kind: 'lab', step: 3, label: '看怎么收集' },
    },
    {
      nian: '氨气看不见，怎么知道试管里已经收集满了？',
      dad: '拿一张湿润的红色石蕊试纸靠近试管口：氨气溶进试纸上的水，显碱性，试纸就会变蓝。还有一个漂亮的办法：用蘸了浓盐酸的玻璃棒靠近，氨气和浓盐酸挥发出的氯化氢在空中相遇，立刻生成氯化铵小颗粒，冒出一团白烟。',
      eq: 'NH₃ + HCl = NH₄Cl',
      show: { kind: 'lab', step: 5, label: '看验满与白烟' },
    },
    {
      nian: '要是烧瓶里的氨气没收满，混着空气，还能喷得那么高吗？',
      dad: '会喷得矮很多，甚至喷不起来。混进去的空气几乎不溶于水，氨气溶掉后瓶里还剩着这些空气，压强降得少，外面的大气压能压上来的水也少。所以氨气要收满、装置不能漏气，烧瓶还得干燥，不然氨气在做喷泉之前，就先溶进瓶壁的水珠里了。',
      show: { kind: 'lab', step: 4, label: '看收多久' },
    },
    {
      nian: '我懂了！氨气特别容易溶在水里，烧瓶里的气体一下子少了，压强变小，外面的大气压就把水压上去；氨水显碱性，酚酞就把喷泉染成了红色。',
      dad: '完全正确，而且你说的是「压」不是「吸」！举一反三：氯化氢也极易溶于水，同样能做喷泉。最后提醒一句，氨气有刺激性气味，闻气体要用手在瓶口轻轻扇，让少量气体飘进鼻子，千万别凑上去猛吸。',
    },
  ],
  tip: '氨气有刺激性，浓氨水和浓盐酸都会挥发出刺激性气体：喷泉和白烟实验须在老师指导下、通风良好的实验室进行，闻气体用扇闻法。家中若有氨水等清洁剂泄漏，应开窗通风并远离。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '大气压把水压上去',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'flask', at: [600, 260], size: [320, 380], liquid: PINK, level: 0, rise: { to: 0.55, at: 3.8, over: 6 }, from: 0 },
          { kind: 'vessel', vessel: 'beaker', at: [600, 610], size: [420, 210], liquid: WATER, level: 0.82, rise: { to: 0.48, at: 3.8, over: 6 }, from: 0 },
          { kind: 'bond', a: [600, 690], b: [600, 205], color: TUBE, from: 0.2 },
          { kind: 'label', at: [600, 230], pos: [940, 140], text: '瓶内压强变小', color: PRESSURE, from: 2.2, to: 7.6 },
          { kind: 'flow', path: [[600, 680], [600, 215]], color: '#7cc4f2', count: 10, speed: 320, size: 9, from: 3.4 },
          { kind: 'particles', box: [535, 110, 130, 110], count: 14, color: PINK, motion: 'rise', size: 7, from: 4 },
          { kind: 'arrow', path: [[420, 430], [420, 545]], color: PRESSURE, text: '大气压', from: 5.6 },
          { kind: 'myth', wrong: '水是被烧瓶吸上去的', right: '水是被大气压压上去的', from: 8.2 },
        ],
      },
      {
        turn: 1,
        title: '水能溶 700 倍的氨',
        duration: 10,
        cues: [
          { kind: 'vessel', vessel: 'flask', at: [400, 360], size: [340, 440], from: 0 },
          { kind: 'particles', box: [290, 190, 220, 240], count: 14, color: AMMONIA, symbol: 'NH₃', motion: 'gas', size: 30, amount: { at: 3, over: 4, from: 14, to: 2 }, from: 0.3 },
          { kind: 'sprite', icon: '💧', path: [[400, 620], [400, 330]], size: 60, travel: 1, from: 1.8, to: 3.4 },
          { kind: 'count', at: [880, 300], label: '1 体积水能溶', start: 0, end: 700, unit: '体积氨', over: 3, from: 2.4 },
          { kind: 'meter', at: [880, 560], label: '瓶内压强', start: 0.9, end: 0.15, color: PRESSURE, over: 4, from: 3 },
          { kind: 'text', at: [600, 830], text: '溶得越多，压强越低', size: 's', from: 6.6 },
        ],
      },
      {
        turn: 2,
        title: '氨水显碱性',
        duration: 11,
        cues: [
          { kind: 'atom', path: [[230, 420], [480, 420]], symbol: 'NH₃', color: AMMONIA, r: 58, travel: 1.6, from: 0.3, to: 3.4 },
          { kind: 'atom', path: [[970, 420], [720, 420]], symbol: 'H₂O', color: '#7cc4f2', r: 52, travel: 1.6, from: 0.3, to: 3.4 },
          { kind: 'pulse', at: [600, 420], color: '#b48cff', radius: 200, from: 3, to: 4.8 },
          { kind: 'atom', path: [[560, 420], [360, 560]], symbol: 'NH₄', charge: '+', color: AMMONIA, r: 56, travel: 1.5, from: 3.5 },
          { kind: 'atom', path: [[640, 420], [840, 560]], symbol: 'OH', charge: '−', color: '#ffb3a8', r: 52, travel: 1.5, from: 3.5 },
          { kind: 'label', at: [840, 560], pos: [920, 300], text: '让溶液显碱性', color: '#d6336c', from: 5.4 },
          { kind: 'formula', at: [600, 800], text: 'NH₃ + H₂O ⇌ NH₃·H₂O ⇌ NH₄⁺ + OH⁻', from: 6.2 },
          { kind: 'text', at: [600, 130], text: '酚酞遇碱变红', size: 's', color: '#d6336c', from: 7.6 },
        ],
      },
      {
        turn: 3,
        title: '向下排空气收集',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'jar', at: [680, 360], size: [240, 380], from: 0 },
          { kind: 'shape', shape: 'rect', at: [250, 700], size: [190, 80], color: '#f3efe6', text: '加热制氨', from: 0.3 },
          { kind: 'arrow', path: [[345, 700], [680, 700], [680, 230]], color: TUBE, draw: 1.4, from: 0.8 },
          { kind: 'flow', path: [[345, 700], [680, 700], [680, 230]], color: '#7cc4f2', count: 9, speed: 260, size: 9, from: 2 },
          { kind: 'particles', box: [590, 200, 180, 300], count: 10, color: AIR, motion: 'gas', size: 12, amount: { at: 2.4, over: 6, from: 10, to: 0 }, from: 0.2 },
          { kind: 'particles', box: [600, 200, 160, 280], count: 9, color: AMMONIA, symbol: 'NH₃', motion: 'gas', size: 28, amount: { at: 2.4, over: 6, from: 0, to: 9 }, from: 2.2 },
          { kind: 'arrow', path: [[600, 590], [520, 690]], color: '#7d8b99', text: '空气被挤出', from: 3.6 },
          { kind: 'label', at: [680, 220], pos: [980, 260], text: '氨气比空气轻', color: PRESSURE, from: 1.6 },
        ],
      },
      {
        turn: 4,
        title: '验满：变蓝和白烟',
        duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'jar', at: [330, 300], size: [200, 300], from: 0 },
          { kind: 'shape', shape: 'rect', at: [330, 540], size: [44, 150], color: '#ff9a8f', tint: { color: '#4f7fd9', at: 1.8, over: 1.6 }, from: 0.4 },
          { kind: 'label', at: [350, 560], pos: [180, 760], text: '湿润红色石蕊试纸', from: 1, to: 5.4 },
          { kind: 'text', at: [330, 110], text: '变蓝了！', size: 'm', color: '#2f5fb8', from: 3.4 },
          { kind: 'atom', path: [[620, 470], [790, 470]], symbol: 'NH₃', color: AMMONIA, r: 38, travel: 1.4, from: 5.4, to: 7.2 },
          { kind: 'atom', path: [[1080, 470], [910, 470]], symbol: 'HCl', color: '#8fd19e', r: 38, travel: 1.4, from: 5.4, to: 7.2 },
          { kind: 'particles', box: [700, 360, 300, 180], count: 22, color: '#dfe3e8', motion: 'gas', size: 12, from: 6.9 },
          { kind: 'label', at: [850, 450], pos: [850, 250], text: '白烟：氯化铵', from: 7.6 },
          { kind: 'formula', at: [600, 830], text: 'NH₃ + HCl = NH₄Cl', from: 8 },
        ],
      },
      {
        turn: 5,
        title: '收不满就喷不高',
        duration: 10,
        cues: [
          { kind: 'vessel', vessel: 'flask', at: [330, 300], size: [260, 340], liquid: PINK, level: 0, rise: { to: 0.72, at: 2, over: 4 }, label: '收满了', from: 0 },
          { kind: 'vessel', vessel: 'flask', at: [870, 300], size: [260, 340], liquid: PINK, level: 0, rise: { to: 0.24, at: 2, over: 4 }, label: '混着空气', from: 0.2 },
          { kind: 'bond', a: [330, 640], b: [330, 250], color: TUBE, from: 0.4 },
          { kind: 'bond', a: [870, 640], b: [870, 250], color: TUBE, from: 0.6 },
          { kind: 'particles', box: [800, 170, 140, 100], count: 8, color: AIR, motion: 'gas', size: 12, from: 0.8 },
          { kind: 'text', at: [600, 820], text: '空气不溶于水，压强降得少', size: 's', from: 6 },
        ],
      },
      {
        turn: 6,
        title: '喷泉的秘密',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'pill', at: [230, 380], size: [230, 96], color: AMMONIA, text: '极易溶于水', from: 0.3 },
          { kind: 'arrow', path: [[360, 380], [460, 380]], color: PRESSURE, from: 1 },
          { kind: 'shape', shape: 'pill', at: [600, 380], size: [230, 96], color: '#e5f0ff', text: '压强变小', from: 1.4 },
          { kind: 'arrow', path: [[730, 380], [830, 380]], color: PRESSURE, from: 2.1 },
          { kind: 'shape', shape: 'pill', at: [970, 380], size: [230, 96], color: '#ffd1e0', text: '大气压压水', from: 2.5 },
          { kind: 'text', at: [600, 620], text: '氨水显碱性 → 酚酞变红', size: 's', color: '#d6336c', from: 4.2 },
          { kind: 'sprite', icon: '⛲', path: [[600, 770]], size: 90, from: 5.2 },
        ],
      },
    ],
  },
};
