import type { Story } from './types';

const WATER = '#d8efff';
const H2O = '#9cc3ff';
const MINERAL = '#ffb36b';
const OXYGEN = '#ff6b5e';
const HYDROGEN = '#f4f4f0';
const NITROGEN = '#a9c7ff';
const SALT = '#ffffff';

export const matterBasics: Story = {
  slug: 'matter-basics',
  title: '纯净水和矿泉水看着一模一样，为什么一个叫纯净物，一个却是混合物？',
  trigger: '小念在超市拿起一瓶纯净水和一瓶矿泉水对着光看，都清清亮亮的，可矿泉水的标签上多写了一串钙、镁、钾、钠。',
  dialogue: [
    {
      nian: '它们看着都清清亮亮的，为什么矿泉水的标签上多了钙、镁这些东西？',
      dad: '因为矿泉水里除了水，还悄悄溶着一点点矿物质，只是溶得太均匀，眼睛看不出来。就像一杯化开的糖水，也是透明的。纯净水几乎只有水这一种东西，叫纯净物；矿泉水里好几种东西混在一起，叫混合物。透明不透明，说明不了纯不纯。',
    },
    {
      nian: '眼睛看不出来的话，要怎么才知道里面混了几种东西？',
      dad: '得把它想象成放大几亿倍，去看里面的小粒子。纯净水里，每个小粒子都长一个样：一个氧原子拉着两个氢原子，这就是水分子。矿泉水里，除了满满的水分子，还夹着少量钙、镁这些离子。粒子只有一种，是纯净物；好几种粒子混着，就是混合物。',
    },
    {
      nian: '一个氧原子拉着两个氢原子才是水分子，那一瓶氧气里的小粒子长什么样？',
      dad: '氧气瓶里全是氧分子，每个都是两个氧原子手拉手。只有一种分子，所以它是纯净物；分子里又只有氧这一种原子，就叫单质。原子的种类叫元素，所有的氧原子都属于氧元素。铁块、铜丝、金戒指，也都是只含一种元素的单质。',
      eq: 'O₂：1 种分子，只含氧元素 → 纯净物里的单质',
      show: { kind: 'lab', step: 0, label: '看「氧气」' },
    },
    {
      nian: '只含一种元素才叫单质，那水里有氢和氧两种元素，是不是就成了混合物？',
      dad: '不是，这是最容易弄错的地方。很多人以为里面有两种原子就是混合物，其实要看粒子是不是同一种。水里的氢和氧不是各飞各的，而是按两个氢、一个氧牢牢绑成同一种水分子。只有一种分子，就是纯净物；它又含两种元素，叫化合物。',
      eq: 'H₂O：1 种分子，含氢、氧两种元素 → 纯净物里的化合物',
      show: { kind: 'lab', step: 1, label: '看「纯水」' },
    },
    {
      nian: '只有一种分子才是纯净物，那我们每天呼吸的空气算哪一种？',
      dad: '空气是混合物。放大来看，里面大约 78% 是氮气分子，21% 是氧气分子，剩下一点点是氩气、二氧化碳和水蒸气，它们各飞各的，谁也不和谁绑在一起。正因为各管各的，工厂把空气冷成液体，就能按沸点不同把氮气和氧气一样一样分出来。',
      eq: '空气 ≈ 78% 氮气 + 21% 氧气 + 少量氩气、二氧化碳等（按体积）',
      show: { kind: 'lab', step: 2, label: '看「空气」' },
      figure: {
        kind: 'dots',
        caption: '一百个点代表一份空气：氮气占了大半，橙色的氧气约五分之一，其他气体加起来只有约一个点。',
        groups: [
          { label: '氮气', count: 78, amount: '约 78 份' },
          { label: '氧气', count: 21, amount: '约 21 份', hot: true },
          { label: '其他', count: 1, amount: '约 1 份', note: '氩气、二氧化碳、水蒸气' },
        ],
      },
    },
    {
      nian: '空气里的东西能一样一样分出来，那家里的混合物也能分开吗？',
      dad: '能，而且办法很简单。混合物里的东西各自保持原来的脾气，所以盐水放在太阳底下晒，水跑掉了，盐留下来，海边的盐田就是这么晒盐的；泥水静静放一会儿，泥沙沉到底，上面就变清了。酱油、牛奶、食醋也都是混合物。纯净物用晒、滤这种办法可分不开。',
    },
    {
      nian: '我懂了！分东西先数有几种粒子：只有一种就是纯净物，好几种混着就是混合物；纯净物里再数元素，一种是单质，两种以上是化合物。所以矿泉水和空气都是混合物！',
      dad: '完全正确！以后看到包装上的配料表，就当个小侦探：配料不止一样的，就是混合物。透明不透明别管它，要看里面有几种东西。',
    },
  ],
  tip: '「纯净物」是化学上的理想说法，超市里的纯净水也含极少量杂质，只是少到可以忽略；矿泉水里的矿物质是溶解的离子，并不脏。空气成分按体积计约氮气 78%、氧气 21%。晒盐水、静置泥水的小实验请在大人陪同下做，实验用品不要入口。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '看着一样透明',
        duration: 10,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [330, 500], size: [320, 360], liquid: WATER, level: 0.75, label: '纯净水', from: 0 },
          { kind: 'vessel', vessel: 'beaker', at: [870, 500], size: [320, 360], liquid: WATER, level: 0.75, label: '矿泉水', from: 0.3 },
          { kind: 'sprite', icon: '🔍', path: [[330, 260], [870, 260]], size: 90, travel: 2.4, from: 1.4, to: 4.4 },
          { kind: 'particles', box: [750, 450, 240, 200], count: 6, color: MINERAL, motion: 'jitter', size: 9, amount: { at: 3.6, over: 2, from: 0, to: 6 }, from: 3.4 },
          { kind: 'label', at: [870, 560], pos: [960, 230], text: '悄悄溶着矿物质', from: 4.6 },
          { kind: 'text', at: [600, 840], text: '透明，不等于纯净', size: 'm', from: 6.6 },
        ],
      },
      {
        turn: 1,
        title: '放大几亿倍',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'circle', at: [330, 460], size: [420, 420], color: '#f4fbff', outline: true, from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [870, 460], size: [420, 420], color: '#f4fbff', outline: true, from: 0.4 },
          { kind: 'particles', box: [200, 330, 260, 260], count: 8, color: H2O, symbol: 'H₂O', motion: 'jitter', size: 32, from: 1 },
          { kind: 'particles', box: [740, 330, 260, 180], count: 6, color: H2O, symbol: 'H₂O', motion: 'jitter', size: 32, from: 1.4 },
          { kind: 'particles', box: [760, 520, 220, 70], count: 2, color: MINERAL, symbol: 'Ca²⁺', motion: 'jitter', size: 30, from: 3.4 },
          { kind: 'text', at: [330, 720], text: '只有一种粒子', size: 's', from: 4.6 },
          { kind: 'text', at: [870, 720], text: '好几种粒子', size: 's', from: 5.4 },
          { kind: 'text', at: [600, 840], text: '纯净物 · 混合物', size: 'm', from: 7 },
        ],
      },
      {
        turn: 2,
        title: '氧气：单质',
        duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'jar', at: [300, 470], size: [300, 420], label: '一瓶氧气', from: 0 },
          { kind: 'particles', box: [190, 300, 220, 260], count: 7, color: OXYGEN, symbol: 'O₂', motion: 'gas', size: 26, from: 0.6 },
          { kind: 'bond', a: [740, 440], b: [880, 440], from: 2.4 },
          { kind: 'atom', path: [[740, 440]], symbol: 'O', color: OXYGEN, r: 60, from: 2 },
          { kind: 'atom', path: [[880, 440]], symbol: 'O', color: OXYGEN, r: 60, from: 2.2 },
          { kind: 'label', at: [810, 500], pos: [810, 640], text: '只含氧元素', from: 4.4 },
          { kind: 'text', at: [600, 840], text: '一种元素 → 单质', size: 'm', from: 6.6 },
        ],
      },
      {
        turn: 3,
        title: '水：化合物',
        duration: 12,
        cues: [
          { kind: 'bond', a: [600, 340], b: [490, 430], from: 2.8 },
          { kind: 'bond', a: [600, 340], b: [710, 430], from: 2.8 },
          { kind: 'atom', path: [[260, 230], [490, 430]], symbol: 'H', color: HYDROGEN, r: 40, travel: 2.2, from: 0.4 },
          { kind: 'atom', path: [[940, 230], [710, 430]], symbol: 'H', color: HYDROGEN, r: 40, travel: 2.2, from: 0.4 },
          { kind: 'atom', path: [[600, 340]], symbol: 'O', color: OXYGEN, r: 62, from: 0.3 },
          { kind: 'label', at: [600, 400], pos: [940, 560], text: '同一种水分子', from: 3.8 },
          { kind: 'formula', at: [480, 580], text: 'H₂O：两种元素', from: 4.8 },
          { kind: 'myth', wrong: '有两种原子就是混合物', right: '只有一种分子，就是纯净物', from: 7 },
        ],
      },
      {
        turn: 4,
        title: '空气：各飞各的',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [430, 470], size: [600, 440], color: '#fffaf0', outline: true, from: 0.2 },
          { kind: 'particles', box: [170, 290, 520, 360], count: 8, color: NITROGEN, symbol: 'N₂', motion: 'gas', size: 28, from: 0.8 },
          { kind: 'particles', box: [170, 290, 520, 360], count: 2, color: OXYGEN, symbol: 'O₂', motion: 'gas', size: 28, from: 2 },
          { kind: 'text', at: [950, 380], text: '氮气 约 78%', size: 's', color: '#3b5bdb', from: 3 },
          { kind: 'text', at: [950, 480], text: '氧气 约 21%', size: 's', color: '#c2410c', from: 3.8 },
          { kind: 'sprite', icon: '🌬️', path: [[950, 620]], size: 90, wobble: true, from: 4.6 },
          { kind: 'text', at: [600, 830], text: '几种分子混着 → 混合物', size: 's', from: 6.6 },
        ],
      },
      {
        turn: 5,
        title: '晒盐水',
        duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [520, 560], size: [440, 300], liquid: WATER, level: 0.6, rise: { to: 0.04, at: 1.6, over: 5 }, label: '盐水', from: 0 },
          { kind: 'sprite', icon: '☀️', path: [[960, 260]], size: 110, wobble: true, from: 0.4 },
          { kind: 'particles', box: [360, 260, 320, 180], count: 10, color: '#eef6ff', motion: 'rise', size: 14, from: 1.4, to: 7.4 },
          { kind: 'particles', box: [340, 670, 360, 30], count: 12, color: SALT, motion: 'jitter', size: 10, amount: { at: 3, over: 4, from: 0, to: 12 }, from: 2.8 },
          { kind: 'label', at: [520, 690], pos: [920, 560], text: '盐留在杯底', from: 6.4 },
          { kind: 'text', at: [600, 850], text: '混合物能晒开、滤开', size: 'm', from: 7.8 },
        ],
      },
    ],
  },
};
