import type { Story } from './types';

const WATER = '#d8efff';
const CALCIUM = '#cfe3c4';
const SCALE = '#e9e3d6';
const BICARB = '#d8e6f5';
const CO2 = '#dfe5ec';
const VINEGAR = '#f6f1e3';
const OIL = '#f2cf5b';
const OH_ION = '#ffd6bf';
const HEAT = '#e0762b';

export const kettleScale: Story = {
  slug: 'kettle-scale',
  title: '水壶底的白色水垢是从哪来的？为什么网上说的「小苏打加白醋」反而除不干净？',
  trigger: '小念看见水壶底结了一层白花花的硬壳，网上有人说把小苏打和白醋倒在一起刷，泡泡冒得可热闹了。',
  dialogue: [
    {
      nian: '水壶里只烧过清水，这层白白硬硬的东西是从哪来的？',
      dad: '是水里本来就溶着的东西变出来的。自来水看着清亮，其实溶着钙、镁这些看不见的矿物质。水一烧开，它们就变成不溶于水、像石头一样的东西，一层层贴在壶底，这就是水垢。溶的矿物质多的水叫硬水，很多地方的自来水都比较硬。',
      figure: {
        kind: 'table',
        focus: { by: 'group', values: [2] },
        ring: [12, 20],
        caption: '硬水里的两位主角镁（Mg）和钙（Ca）住在周期表同一列（第 2 族），水一烧开就结成白色水垢。',
        link: { category: 1, label: '在周期表里看碱土金属' },
      },
      show: { kind: 'lab', step: 0, label: '看「水垢诞生」' },
    },
    {
      nian: '水一烧开，溶着的钙怎么就变成石头了？',
      dad: '水里的钙原来和碳酸氢根做伴，叫碳酸氢钙，它能溶在水里。一加热，碳酸氢根就拆开，放走二氧化碳，剩下的部分和钙抱在一起变成碳酸钙。碳酸钙不溶于水，就沉下来结成硬壳，大理石、鸡蛋壳的主要成分也是它。镁也会变成不溶的氢氧化镁来凑热闹。',
      eq: 'Ca(HCO₃)₂ =△= CaCO₃↓ + H₂O + CO₂↑',
      figure: {
        kind: 'shells',
        atoms: [12, 20],
        caption: '镁（2·8·2）和钙（2·8·8·2）最外层都是 2 个电子，失去后变成 Mg²⁺ 和 Ca²⁺ 溶在自来水里。',
      },
      show: { kind: 'lab', step: 0, label: '看「水垢诞生」' },
    },
    {
      nian: '碳酸钙那么硬，为什么白醋一泡它就化了？',
      dad: '因为碳酸钙怕酸。醋里的醋酸比碳酸厉害，像拔河时力气更大的一方，把钙从碳酸那边拉过来，变成能溶在水里的醋酸钙；碳酸那部分变成水和二氧化碳，冒着小气泡跑掉。硬壳就这样一点点化进水里，倒掉就干净了。柠檬酸也是同样的道理。',
      eq: 'CaCO₃ + 2CH₃COOH = (CH₃COO)₂Ca + H₂O + CO₂↑',
      show: { kind: 'lab', step: 1, label: '看「白醋化垢」' },
    },
    {
      nian: '醋酸这么能干，那再倒点小苏打一起刷，不是更厉害吗？',
      dad: '反而更差。很多人以为泡泡越多越干净，其实小苏打是碱，白醋是酸，倒在一起先互相抵消：冒出来的泡泡是它们俩反应放出的二氧化碳，醋酸被小苏打用掉了，留给水垢的就少了。就像两个人约好去搬箱子，路上先打了一架，力气全花光了。',
      eq: 'NaHCO₃ + CH₃COOH = CH₃COONa + H₂O + CO₂↑',
      show: { kind: 'lab', step: 2, label: '看「混用误区」' },
    },
    {
      nian: '酸和碱会互相抵消，那小苏打和白醋到底该怎么用才对？',
      dad: '各管各的。除水垢单用酸：往壶里倒白醋或放一勺柠檬酸，加水烧开后泡一会儿，倒掉再用清水烧两三遍。除油污单用碱：小苏打或纯碱化在温水里擦油锅。记住两句话：水垢怕酸，油污怕碱，就不会用反。',
      figure: {
        kind: 'scale',
        axis: '厨房清洁各管各的',
        stops: [
          { label: '白醋·柠檬酸', note: '酸：专化水垢', color: '#fde68a', hot: true },
          { label: '混在一起', note: '互相抵消白忙', color: '#e5e7eb' },
          { label: '小苏打·纯碱', note: '碱：专去油污', color: '#bfdbfe', hot: true },
        ],
        caption: '清洁分工尺：酸用来化水垢，碱用来去油污，倒在一起只会互相抵消冒二氧化碳。',
      },
    },
    {
      nian: '油污为什么怕碱？它就不怕酸吗？',
      dad: '油污不太怕酸。油的分子能被碱拆开，变成像肥皂一样、能溶进水里的东西，一冲就走，古人用草木灰水洗衣服就是这个道理。酸拆不动油，所以拿白醋擦油锅没什么用。水垢正好反过来：它是碳酸钙这类「石头」，碱化不动它，只有酸能化开。',
    },
    {
      nian: '我懂了！硬水里溶着钙，一烧开就变成不溶的碳酸钙结成水垢；醋酸能把钙拉走，水垢就化了；可要是先和小苏打混在一起，酸和碱就互相抵消，白忙一场。',
      dad: '说得太对了！记一个好习惯：除水垢单用酸、去油污单用碱，各种清洁剂别随手倒在一起；除完水垢，多烧几遍清水再喝。',
    },
  ],
  tip: '除垢后要用清水多烧几遍再饮用；铝制水壶不宜用醋或柠檬酸长时间浸泡。洁厕灵（含盐酸）与 84 消毒液混用会放出有毒的氯气，各种清洁剂切勿混用；管道疏通剂等强碱有腐蚀性，请大人操作。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '清水烧出白壳',
        duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [560, 500], size: [460, 380], liquid: WATER, level: 0.75, from: 0 },
          { kind: 'particles', box: [380, 460, 360, 170], count: 6, color: CALCIUM, symbol: 'Ca²⁺', motion: 'jitter', size: 24, amount: { at: 4, over: 3, from: 6, to: 1 }, from: 0.8 },
          { kind: 'label', at: [560, 520], pos: [920, 300], text: '看不见的钙和镁', from: 1.4, to: 4.4 },
          { kind: 'sprite', icon: '🔥', path: [[560, 760]], size: 80, wobble: true, from: 2.6 },
          { kind: 'particles', box: [420, 230, 280, 150], count: 6, color: '#ffffff', motion: 'rise', size: 14, from: 3 },
          { kind: 'shape', shape: 'rect', at: [560, 668], size: [420, 36], color: SCALE, motion: 'grow', over: 3.5, from: 4 },
          { kind: 'label', at: [560, 668], pos: [920, 560], text: '水垢', from: 6 },
          { kind: 'text', at: [600, 860], text: '一烧开，就结出白壳', size: 'm', from: 7.6 },
        ],
      },
      {
        turn: 1,
        title: '钙变成碳酸钙',
        duration: 12,
        cues: [
          { kind: 'atom', path: [[420, 440]], symbol: 'Ca²⁺', color: CALCIUM, r: 46, from: 0.3, to: 5 },
          { kind: 'atom', path: [[600, 380]], symbol: 'HCO₃⁻', color: BICARB, r: 52, from: 0.6, to: 3.6 },
          { kind: 'atom', path: [[600, 500]], symbol: 'HCO₃⁻', color: BICARB, r: 52, from: 0.8, to: 3.6 },
          { kind: 'pulse', at: [520, 450], color: HEAT, radius: 220, from: 2, to: 4.6 },
          { kind: 'particles', box: [600, 180, 300, 200], count: 6, color: CO2, symbol: 'CO₂', motion: 'rise', size: 26, from: 3.4 },
          { kind: 'atom', path: [[480, 440], [480, 640]], symbol: 'CaCO₃', color: SCALE, r: 60, travel: 1.6, from: 5 },
          { kind: 'label', at: [480, 640], pos: [860, 640], text: '不溶，沉下来', from: 6.8 },
          { kind: 'formula', at: [600, 820], text: 'Ca(HCO₃)₂ =△= CaCO₃↓ + H₂O + CO₂↑', from: 7.4 },
        ],
      },
      {
        turn: 2,
        title: '醋酸把钙拉走',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [560, 520], size: [460, 360], liquid: VINEGAR, level: 0.6, label: '泡白醋', from: 0 },
          { kind: 'shape', shape: 'rect', at: [560, 675], size: [400, 40], color: SCALE, motion: 'shrink', over: 6, from: 0.3 },
          { kind: 'particles', box: [380, 510, 360, 150], count: 12, color: '#ffffff', motion: 'rise', size: 12, from: 1.4 },
          { kind: 'label', at: [560, 675], pos: [930, 600], text: '水垢化开', from: 3 },
          { kind: 'arrow', path: [[440, 450], [700, 450]], color: '#c2410c', text: '醋酸拉走钙', from: 4 },
          { kind: 'atom', path: [[480, 640], [720, 560]], symbol: 'Ca²⁺', color: CALCIUM, r: 30, travel: 2, from: 4.4 },
          { kind: 'text', at: [600, 850], text: '变成能溶的醋酸钙', size: 'm', from: 7.5 },
        ],
      },
      {
        turn: 3,
        title: '先打了一架',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [520, 400], size: [420, 340], liquid: VINEGAR, level: 0.55, label: '白醋', from: 0 },
          { kind: 'flow', path: [[520, 150], [520, 380]], color: '#ffffff', count: 5, speed: 180, size: 12, from: 0.8, to: 3.6 },
          { kind: 'label', at: [540, 180], pos: [260, 260], text: '倒小苏打', from: 1, to: 4 },
          { kind: 'particles', box: [340, 260, 360, 300], count: 16, color: '#ffffff', motion: 'rise', size: 14, amount: { at: 2, over: 1.5, from: 0, to: 16 }, from: 1.8 },
          { kind: 'meter', at: [960, 300], label: '醋的酸劲', start: 0.9, end: 0.15, color: HEAT, over: 3, from: 2.4 },
          { kind: 'label', at: [560, 320], pos: [960, 450], text: '冒的是 CO₂', from: 3.6 },
          { kind: 'myth', wrong: '泡泡越多越干净', right: '酸和碱先互相抵消了', from: 7 },
        ],
      },
      {
        turn: 4,
        title: '各管各的',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [300, 300], size: [260, 100], color: SCALE, text: '水垢', from: 0.3 },
          { kind: 'shape', shape: 'pill', at: [900, 300], size: [260, 100], color: OIL, text: '油污', from: 0.6 },
          { kind: 'arrow', path: [[300, 370], [300, 530]], color: '#c2410c', text: '用酸', from: 1.4 },
          { kind: 'arrow', path: [[900, 370], [900, 530]], color: '#4c6ef5', text: '用碱', from: 2.2 },
          { kind: 'shape', shape: 'pill', at: [300, 610], size: [280, 100], color: '#fff3b0', text: '白醋·柠檬酸', from: 2.6 },
          { kind: 'shape', shape: 'pill', at: [900, 610], size: [280, 100], color: '#e3f0ff', text: '小苏打·纯碱', from: 3.2 },
          { kind: 'text', at: [600, 820], text: '水垢怕酸，油污怕碱', size: 'm', from: 6.5 },
        ],
      },
      {
        turn: 5,
        title: '碱把油拆开',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [420, 440], size: [260, 180], color: OIL, text: '油', motion: 'shrink', over: 7, from: 0.3 },
          { kind: 'particles', box: [260, 330, 320, 220], count: 6, color: OH_ION, symbol: 'OH⁻', motion: 'jitter', size: 24, from: 0.8 },
          { kind: 'particles', box: [640, 300, 380, 300], count: 8, color: '#cfe3ff', motion: 'gas', size: 14, amount: { at: 2.5, over: 4, from: 0, to: 8 }, from: 2 },
          { kind: 'label', at: [800, 450], pos: [900, 230], text: '像肥皂，能溶进水', from: 4.4 },
          { kind: 'text', at: [600, 700], text: '酸拆不动油', size: 's', color: '#7d8f88', from: 6 },
          { kind: 'text', at: [600, 840], text: '碱把油拆成「肥皂」', size: 'm', from: 7.5 },
        ],
      },
    ],
  },
};
