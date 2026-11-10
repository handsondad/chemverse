import { lessonAsset } from '../assets';
import type { Story } from './types';

const CO2 = '#dfe5ec';
const SODA = '#d8efff';
const BLOOD = '#b3261e';
const PALE_RED = '#f2a39a';
const NO2_DARK = '#8f3a12';
const NO2 = '#d9864f';
const HOT = '#ffd6bf';
const ICE = '#d8efff';

export const equilibriumStep: Story = {
  slug: 'equilibrium-step',
  title: '没开盖的汽水看着风平浪静，里面的气真的停住了吗？为什么一拧开就冒泡？',
  trigger: '小念盯着一瓶没开的汽水看了半天，一个气泡都没有；可瓶盖一拧，「嗤」的一声，气泡一下子全冒了出来。',
  dialogue: [
    {
      nian: '没开的汽水一个气泡都没有，里面的二氧化碳是不是停住不动了？',
      dad: '没停，只是两边一样忙。瓶子上方的二氧化碳不停地钻进水里，水里的二氧化碳也不停地跑回上方，每秒钻进去的和跑出来的一样多，所以看起来什么都没变。这种你来我往、表面不动的状态叫平衡。平衡是动的，不是停的。',
      eq: 'CO₂（气体）⇌ CO₂（溶在水里）　CO₂ + H₂O ⇌ H₂CO₃',
      show: { kind: 'lab', step: 6, label: '看「看进去」' },
    },
    {
      nian: '平衡是动的，那瓶盖一拧开，为什么一下子冒出那么多气泡？',
      dad: '因为你把平衡打破了。汽水是在高压下把二氧化碳压进去的，瓶盖一开，瓶里的压强一下降到和外面一样，钻进水里的二氧化碳变少了，跑出来的却还是那么多，多出来的就变成气泡往外冒。冒到一定程度，两边又一样快，汽水也就没什么气了。',
    },
    {
      nian: '平衡被打破以后，它总会往哪边跑？有没有规律？',
      dad: '有个很好记的规律：你改了什么，它就往减弱这个改变的方向跑。把氯化铁和硫氰化钾溶液混在一起，会生成血红色的物质，等颜色不再变，就到了平衡；这时再滴几滴氯化铁，平衡就往把它用掉的方向移，红色更深了。这条规律叫勒夏特列原理。',
      eq: 'Fe³⁺ + 3SCN⁻ ⇌ Fe(SCN)₃（血红色）',
      show: { kind: 'lab', step: 1, label: '看「铁管加料」' },
    },
    {
      nian: '多滴了氯化铁就往用掉它的方向跑，那要是把氯化铁悄悄拿走一些呢？',
      dad: '那就往补回来的方向跑。往红色溶液里加一点铁粉，铁粉把 Fe³⁺ 变成了 Fe²⁺，相当于把它悄悄拿走，平衡就往反方向移，血红色的物质拆回原样，颜色变浅。就像跷跷板，一头被压下去，另一头就翘起来，平衡总想把你的改变抵消掉一部分。',
      eq: '2Fe³⁺ + Fe = 3Fe²⁺',
      show: { kind: 'lab', step: 2, label: '看「铁粉减料」' },
    },
    {
      nian: '跷跷板上能压的只有浓度吗？温度变了，平衡也会跑吗？',
      dad: '也会。装着红棕色二氧化氮的烧瓶里，有一部分会两两手拉手变成无色的四氧化二氮，这一步会放热。把烧瓶泡进热水，平衡就往吸热的方向跑，拉着的手松开，红棕色更深；泡进冰水，平衡往放热的方向跑，手又拉上了，颜色变浅。',
      eq: '2NO₂（红棕）⇌ N₂O₄（无色）　正反应放热',
      show: { kind: 'lab', step: 5, label: '看「冷热两盆」' },
      figure: {
        kind: 'image',
        src: lessonAsset('covers/equilibrium-step.webp'),
        alt: '两只装着二氧化氮的烧瓶，左边泡在热水里颜色深，右边泡在冰水里颜色浅',
        caption: '同样装着二氧化氮的两只烧瓶：左边泡在热水里，红棕色更深；右边泡在冰水里，颜色淡了很多。',
      },
    },
    {
      nian: '冰水能让颜色变浅，那汽水是不是也该冰着喝，气才跑得慢？',
      dad: '对！气体在冷水里溶得更多，所以冰汽水开盖后冒泡慢、气留得久，温汽水一开就喷。很多人以为摇一摇能把气摇回去，其实摇晃只会让气泡更容易冒出来，开盖时喷得更凶。没喝完的汽水拧紧盖子放冰箱，气能留得久一些。',
    },
    {
      nian: '我懂了！平衡不是停住了，而是两边一样快；改了浓度、温度或压强，平衡就往抵消这个改变的方向移，所以汽水一开盖压强变小，二氧化碳就跑出来了。',
      dad: '完全正确！再记个小习惯：开汽水前别摇，瓶口朝着没人的地方，先慢慢拧开一点放放气，再全打开。',
    },
  ],
  tip: '硫氰化钾、二氧化氮（有毒）等实验请在老师指导下进行。碳酸饮料受热或摇晃后开盖容易喷溅，开瓶时瓶口不要对着人；含糖碳酸饮料孩子要少喝。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '你来我往',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [600, 500], size: [380, 460], liquid: SODA, level: 0.6, label: '没开的汽水', from: 0 },
          { kind: 'particles', box: [440, 290, 320, 120], count: 6, color: CO2, symbol: 'CO₂', motion: 'gas', size: 30, from: 0.4 },
          { kind: 'particles', box: [440, 510, 320, 190], count: 6, color: CO2, symbol: 'CO₂', motion: 'jitter', size: 30, from: 0.8 },
          { kind: 'flow', path: [[540, 320], [540, 600]], color: '#7a8a99', count: 4, speed: 120, size: 12, from: 1.6 },
          { kind: 'flow', path: [[660, 600], [660, 320]], color: '#7a8a99', count: 4, speed: 120, size: 12, from: 2.2 },
          { kind: 'label', at: [540, 440], pos: [250, 400], text: '钻进水里', from: 2.8 },
          { kind: 'label', at: [660, 440], pos: [960, 400], text: '跑回上方', from: 3.6 },
          { kind: 'text', at: [600, 870], text: '一样快，看着就不动', size: 'm', from: 7 },
        ],
      },
      {
        turn: 1,
        title: '拧开瓶盖',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [560, 540], size: [380, 500], liquid: SODA, level: 0.6, from: 0 },
          { kind: 'shape', shape: 'rect', at: [560, 280], size: [220, 44], color: '#e5484d', text: '瓶盖', from: 0.2, to: 2.6 },
          { kind: 'pulse', at: [560, 290], color: '#7a8a99', radius: 200, from: 2.6, to: 4.6 },
          { kind: 'meter', at: [960, 260], label: '瓶里的压强', start: 0.9, end: 0.25, color: '#c2410c', over: 1.6, from: 2.6 },
          { kind: 'particles', box: [400, 520, 320, 250], count: 16, color: '#ffffff', motion: 'rise', size: 14, amount: { at: 3, over: 2, from: 2, to: 16 }, from: 3 },
          { kind: 'particles', box: [420, 160, 300, 110], count: 8, color: CO2, symbol: 'CO₂', motion: 'gas', size: 28, from: 3.8 },
          { kind: 'text', at: [600, 860], text: '压强变小，气体跑出', size: 'm', from: 7 },
        ],
      },
      {
        turn: 2,
        title: '加料，红色更深',
        duration: 12,
        cues: [
          { kind: 'formula', at: [600, 180], text: 'Fe³⁺ + 3SCN⁻ ⇌ Fe(SCN)₃', from: 0.3 },
          { kind: 'vessel', vessel: 'beaker', at: [600, 560], size: [440, 400], liquid: PALE_RED, level: 0.65, tint: { color: BLOOD, at: 4, over: 2.5 }, from: 0 },
          { kind: 'flow', path: [[600, 260], [600, 430]], color: '#e8b86a', count: 5, speed: 220, size: 12, from: 1.6, to: 3.8 },
          { kind: 'label', at: [620, 320], pos: [930, 330], text: '再滴氯化铁', from: 1.8, to: 5.4 },
          { kind: 'arrow', path: [[440, 290], [760, 290]], color: '#c2410c', text: '往右移', from: 4.4 },
          { kind: 'text', at: [600, 850], text: '多了，就往用掉它的方向跑', size: 's', from: 7.4 },
        ],
      },
      {
        turn: 3,
        title: '拿走一点，往回补',
        duration: 12,
        cues: [
          { kind: 'formula', at: [600, 180], text: 'Fe³⁺ + 3SCN⁻ ⇌ Fe(SCN)₃', from: 0.3 },
          { kind: 'vessel', vessel: 'beaker', at: [600, 560], size: [440, 400], liquid: BLOOD, level: 0.65, tint: { color: '#f2c7a6', at: 4.4, over: 2.5 }, from: 0 },
          { kind: 'flow', path: [[600, 260], [600, 700]], color: '#8b939c', count: 5, speed: 260, size: 10, from: 1.4, to: 3.2 },
          { kind: 'shape', shape: 'rect', at: [600, 715], size: [180, 40], color: '#8b939c', motion: 'grow', over: 1, from: 2.6 },
          { kind: 'label', at: [690, 715], pos: [970, 640], text: '铁粉拿走 Fe³⁺', from: 3.2 },
          { kind: 'arrow', path: [[760, 290], [440, 290]], color: '#4c6ef5', text: '往左移', from: 5 },
          { kind: 'text', at: [600, 850], text: '少了，就往补回来的方向跑', size: 's', from: 7.6 },
        ],
      },
      {
        turn: 4,
        title: '热深冷浅',
        duration: 12,
        cues: [
          { kind: 'formula', at: [600, 170], text: '2NO₂（红棕）⇌ N₂O₄（无色）', from: 0.4 },
          { kind: 'vessel', vessel: 'beaker', at: [330, 540], size: [340, 260], liquid: HOT, level: 0.65, label: '热水', from: 0 },
          { kind: 'vessel', vessel: 'beaker', at: [870, 540], size: [340, 260], liquid: ICE, level: 0.65, label: '冰水', from: 0 },
          { kind: 'shape', shape: 'circle', at: [330, 440], size: [220, 220], color: NO2, tint: { color: NO2_DARK, at: 2.6, over: 2.6 }, text: 'NO₂', from: 0.8 },
          { kind: 'shape', shape: 'circle', at: [870, 440], size: [220, 220], color: NO2, tint: { color: '#f2d3bd', at: 2.6, over: 2.6 }, text: 'NO₂', from: 0.8 },
          { kind: 'sprite', icon: '🔥', path: [[110, 560]], size: 70, wobble: true, from: 1.8 },
          { kind: 'sprite', icon: '🧊', path: [[1090, 560]], size: 70, wobble: true, from: 1.8 },
          { kind: 'text', at: [600, 830], text: '热往吸热跑，冷往放热跑', size: 'm', from: 7.6 },
        ],
      },
      {
        turn: 5,
        title: '冰汽水气留得久',
        duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [330, 420], size: [300, 320], liquid: '#f6e7b0', level: 0.65, label: '温汽水', from: 0 },
          { kind: 'vessel', vessel: 'beaker', at: [870, 420], size: [300, 320], liquid: SODA, level: 0.65, label: '冰汽水', from: 0 },
          { kind: 'particles', box: [210, 400, 240, 170], count: 18, color: '#ffffff', motion: 'rise', size: 14, from: 1.2 },
          { kind: 'particles', box: [750, 450, 240, 120], count: 5, color: '#ffffff', motion: 'rise', size: 14, from: 1.2 },
          { kind: 'sprite', icon: '🧊', path: [[1060, 260]], size: 70, from: 0.8 },
          { kind: 'myth', wrong: '摇一摇能把气摇回去', right: '摇晃只会让气冒得更凶', from: 5.6 },
        ],
      },
    ],
  },
};
