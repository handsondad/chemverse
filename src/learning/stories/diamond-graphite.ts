import type { Story } from './types';

const CARBON = '#495057';
const BOND = '#bcae96';
const LAYER = '#ced4da';
const ELECTRON = '#4dabf7';
const HEAT = '#ff922b';

export const diamondGraphite: Story = {
  slug: 'diamond-graphite',
  title: '钻石和铅笔芯都是碳做的，为什么一个最硬、一个一划就掉渣？',
  trigger: '小念写作业时一用力，铅笔芯“啪”地断了，爸爸却说它和妈妈戒指上的钻石是同一种东西。',
  dialogue: [
    {
      nian: '爸爸，钻石和铅笔芯真的是同一种东西吗？一个亮晶晶硬邦邦，一个黑乎乎一按就断！',
      dad: '真的，它们都是用碳原子搭起来的，就像同一盒积木，能搭成结实的城堡，也能搭成一摞一推就散的薄片。差别不在原子本身，而在原子怎么排、怎么手拉手。同一种元素排成不同的样子，叫同素异形体。',
      figure: {
        kind: 'table',
        caption: '钻石和铅笔芯里的石墨只用了一种元素：第 6 号碳（圈出来的那格）。',
        focus: { by: 'atoms', values: [6] },
        ring: [6],
      },
      show: { kind: 'lab', step: 0, label: '看同一种碳' },
    },
    {
      nian: '原子怎么排就能差这么多？钻石里的碳原子是怎么排的？',
      dad: '钻石里，每个碳原子都向四个方向伸出手，牢牢拉住四个邻居，四只手正好指向一个三角金字塔的四个角。邻居又拉住各自的四个邻居，一直连下去，整颗钻石就是一张立体的大网，哪个方向都不软。想划开它，得同时扯断好多根很牢的共价键，所以它是天然最硬的东西。',
      figure: {
        kind: 'crystal',
        caption: '钻石里每个碳原子都拉住四个邻居，连成一张立体的大网。拖一拖，从各个方向看都一样结实。',
        structure: 'diamond',
      },
      show: { kind: 'lab', step: 1, label: '看钻石的立体网' },
    },
    {
      nian: '钻石是一张立体的大网，那铅笔芯里的石墨，碳原子又是怎么拉手的？',
      dad: '石墨里，每个碳原子只在一个平面上拉住三个邻居，排成蜂窝一样的六边形网，一张网就是一层。层和层之间没有手拉手，只靠很弱的吸引叠在一起，像一摞扑克牌。你用铅笔一划，一片片薄层被蹭下来留在纸上，这就是字迹。',
      figure: {
        kind: 'crystal',
        caption: '石墨是一层层蜂窝状的碳网。层与层离得远（虚线），吸引很弱，一推就滑开。',
        structure: 'graphite',
      },
      show: { kind: 'lab', step: 2, label: '看石墨一层层' },
    },
    {
      nian: '像扑克牌一推就滑开，所以铅笔芯那么软？那它为什么叫“铅”笔，里面有铅吗？',
      dad: '里面一点铅都没有，这是个流传了几百年的误会。几百年前英国人挖到一大块黑亮的石墨，以为是一种铅，就叫它“黑铅”，铅笔的名字就这么留了下来。现在的笔芯是石墨和黏土混在一起烧成的：黏土多就硬，是 H 铅笔；石墨多就软、写得黑，是 B 铅笔。',
      show: { kind: 'lab', step: 3, label: '看笔芯里有什么' },
    },
    {
      nian: '石墨多就写得黑！那石墨还有什么本事是钻石没有的？',
      dad: '石墨能导电，钻石不能。碳原子最外层有四个电子：在钻石里四个都用来拉手了；在石墨里只用了三个，多出来的那一个能在整层里跑来跑去，电就顺着它流过去，所以电池、电动机里都用石墨。用很软的铅笔涂一条又黑又粗的短线，接上纽扣电池和小灯珠，灯就能亮。',
      show: { kind: 'lab', step: 3, label: '看石墨导电' },
    },
    {
      nian: '多出来的电子能跑，石墨才导电？那石墨能不能变成钻石？',
      dad: '能，可得下大力气。把石墨压到几万个大气压、加热到一千多摄氏度，碳原子被逼着改成四只手的排法，就成了人造钻石，现在世界上的人造钻石大多产自中国。钻石也不是永远不变：在很热的氧气里，它会烧成二氧化碳。两百多年前，科学家正是烧掉钻石，才证明它是碳。',
      show: { kind: 'lab', step: 4, label: '看石墨变钻石' },
    },
    {
      nian: '我明白了！钻石和石墨都是碳，钻石里每个碳拉四只手，连成立体大网，所以最硬；石墨里每个碳只拉三只手，排成一层层蜂窝，层和层一推就滑，所以能写字，多出来的电子还能导电。铅笔芯里根本没有铅！',
      dad: '一点没错！以后看到一样东西，别只问它是什么做的，还要问它的原子是怎么排的。还有个好习惯：别咬铅笔头，笔杆外面的油漆可不是给你吃的。',
    },
  ],
  tip: '铅笔芯是石墨和黏土，不含金属铅，误食一点笔芯一般无毒，但笔杆油漆和橡皮头不宜啃咬。铅笔线导电的小实验只能用纽扣电池或一两节干电池，绝不能接家里的插座。钻石在空气中加热到七八百摄氏度以上会烧起来，不要让孩子尝试。结构数据：钻石中碳碳键长约 154 皮米，石墨层内约 142 皮米、层间距约 335 皮米，文中的立体图就按这些数据画成。1797 年坦南特烧钻石证明它是纯碳；2004 年海姆和诺沃肖洛夫用胶带从石墨上剥出石墨烯，获 2010 年诺贝尔物理学奖。立体结构的画法受到中国科学技术大学“美丽化学”的启发。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '同一盒积木',
        duration: 11,
        cues: [
          { kind: 'sprite', icon: '💎', path: [[320, 400]], size: 150, from: 0.3 },
          { kind: 'sprite', icon: '✏️', path: [[880, 400]], size: 150, from: 1 },
          { kind: 'arrow', path: [[380, 500], [540, 600]], color: CARBON, from: 2.4 },
          { kind: 'arrow', path: [[820, 500], [660, 600]], color: CARBON, from: 3 },
          { kind: 'atom', path: [[600, 650]], symbol: 'C', color: CARBON, r: 56, from: 3.8 },
          { kind: 'text', at: [600, 820], text: '都是碳原子', size: 'm', from: 5 },
        ],
      },
      {
        turn: 1,
        title: '伸出四只手',
        duration: 11,
        cues: [
          { kind: 'bond', a: [600, 470], b: [600, 230], color: BOND, from: 1.2 },
          { kind: 'bond', a: [600, 470], b: [380, 600], color: BOND, from: 1.9 },
          { kind: 'bond', a: [600, 470], b: [820, 600], color: BOND, from: 2.6 },
          { kind: 'bond', a: [600, 470], b: [660, 700], color: BOND, from: 3.3 },
          { kind: 'atom', path: [[600, 470]], symbol: 'C', color: CARBON, r: 58, from: 0.2 },
          { kind: 'text', at: [600, 830], text: '四只手拉住四个邻居', size: 'm', from: 4.6 },
        ],
      },
      {
        turn: 1,
        title: '天然最硬',
        duration: 10,
        cues: [
          { kind: 'sprite', icon: '💎', path: [[340, 380]], size: 150, from: 0.2 },
          { kind: 'meter', at: [340, 600], label: '硬度', start: 0, end: 1, color: '#74c0fc', over: 2, from: 1 },
          { kind: 'sprite', icon: '✏️', path: [[860, 380]], size: 150, from: 2.4 },
          { kind: 'meter', at: [860, 600], label: '硬度', start: 0, end: 0.12, color: LAYER, over: 1.5, from: 3 },
          { kind: 'text', at: [600, 820], text: '要扯断好多根键', size: 'm', from: 5.2 },
        ],
      },
      {
        turn: 2,
        title: '一层层蜂窝',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [600, 620], size: [720, 60], color: LAYER, text: '一层碳网', from: 0.3 },
          { kind: 'shape', shape: 'pill', at: [600, 490], size: [720, 60], color: LAYER, text: '一层碳网', from: 1 },
          { kind: 'shape', shape: 'pill', at: [600, 360], size: [720, 60], color: LAYER, text: '一层碳网', slide: { to: [840, 360], at: 6.4, over: 2.4 }, from: 1.7 },
          { kind: 'label', at: [600, 425], pos: [1060, 425], text: '层间吸引很弱', from: 3 },
          { kind: 'arrow', path: [[380, 250], [820, 250]], color: '#e8590c', text: '一推就滑开', from: 6 },
          { kind: 'text', at: [600, 800], text: '像一摞扑克牌', size: 'm', from: 8.4 },
        ],
      },
      {
        turn: 2,
        title: '字迹是薄层',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 560], size: [820, 260], color: '#ffffff', outline: true, from: 0 },
          { kind: 'sprite', icon: '✏️', path: [[260, 470], [900, 520]], size: 110, travel: 3.5, from: 0.8, to: 6 },
          { kind: 'particles', box: [260, 540, 640, 50], count: 14, color: CARBON, size: 8, motion: 'jitter', amount: { at: 1, over: 3.5, from: 0, to: 14 }, from: 1 },
          { kind: 'label', at: [600, 565], pos: [600, 760], text: '蹭下来的石墨薄层', from: 5.4 },
        ],
      },
      {
        turn: 3,
        title: '铅笔里没有铅',
        duration: 11,
        cues: [
          { kind: 'sprite', icon: '✏️', path: [[600, 290]], size: 155, from: 0.2 },
          { kind: 'shape', shape: 'pill', at: [400, 495], size: [240, 76], color: LAYER, text: '石墨', from: 1.2 },
          { kind: 'shape', shape: 'pill', at: [800, 495], size: [240, 76], color: '#e9c46a', text: '黏土', from: 1.8 },
          { kind: 'text', at: [600, 615], text: '黏土多硬，石墨多黑', size: 's', from: 3 },
          { kind: 'myth', wrong: '铅笔芯里有铅', right: '是石墨加黏土烧成的', from: 5.6 },
        ],
      },
      {
        turn: 4,
        title: '多出一个电子',
        duration: 13,
        cues: [
          { kind: 'atom', path: [[330, 450]], symbol: 'C', color: CARBON, r: 58, from: 0.2 },
          { kind: 'text', at: [330, 610], text: '钻石：4 个都拉手', size: 's', from: 0.8 },
          { kind: 'atom', path: [[870, 450]], symbol: 'C', color: CARBON, r: 58, from: 2 },
          { kind: 'text', at: [870, 610], text: '石墨：3 个拉手', size: 's', from: 2.6 },
          { kind: 'flow', path: [[700, 320], [1060, 320]], color: ELECTRON, count: 5, size: 13, speed: 160, from: 4.4 },
          { kind: 'label', at: [880, 320], pos: [870, 210], text: '多的一个能跑', from: 4.8 },
          { kind: 'text', at: [600, 810], text: '电子能跑，电就通了', size: 'm', from: 7.6 },
        ],
      },
      {
        turn: 4,
        title: '铅笔线点亮灯',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 500], size: [860, 260], color: '#ffffff', outline: true, from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 500], size: [440, 34], color: CARBON, from: 0.6 },
          { kind: 'sprite', icon: '🔋', path: [[260, 500]], size: 110, from: 1.4 },
          { kind: 'sprite', icon: '💡', path: [[940, 500]], size: 110, from: 2 },
          { kind: 'flow', path: [[320, 500], [880, 500]], color: ELECTRON, count: 6, size: 12, speed: 180, from: 3.2 },
          { kind: 'pulse', at: [940, 480], color: '#ffe066', radius: 140, from: 4.6 },
          { kind: 'text', at: [600, 800], text: '软铅笔的线能导电', size: 'm', from: 6 },
        ],
      },
      {
        turn: 5,
        title: '压成钻石',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 470], size: [300, 200], color: LAYER, text: '石墨', tint: { color: '#d0ebff', at: 5, over: 2.2 }, from: 0, to: 7.4 },
          { kind: 'arrow', path: [[600, 170], [600, 330]], color: '#e8590c', text: '几万个大气压', from: 1 },
          { kind: 'meter', at: [960, 300], label: '温度', start: 0.2, end: 0.9, color: HEAT, over: 2, from: 2.2 },
          { kind: 'pulse', at: [600, 470], color: HEAT, radius: 220, from: 3 },
          { kind: 'sprite', icon: '💎', path: [[600, 470]], size: 150, from: 7.4 },
          { kind: 'text', at: [600, 800], text: '逼着改成四只手', size: 'm', from: 8.4 },
        ],
      },
      {
        turn: 5,
        title: '钻石也能烧',
        duration: 10,
        cues: [
          { kind: 'sprite', icon: '💎', path: [[600, 440]], size: 140, from: 0.2, to: 5.6 },
          { kind: 'sprite', icon: '🔥', path: [[600, 600]], size: 120, wobble: true, from: 1.2 },
          { kind: 'particles', box: [480, 200, 240, 200], count: 5, color: '#e9ecef', symbol: 'CO₂', size: 26, motion: 'rise', from: 3.2 },
          { kind: 'text', at: [600, 810], text: '在热氧气里烧成二氧化碳', size: 'm', from: 5.8 },
        ],
      },
    ],
  },
};
