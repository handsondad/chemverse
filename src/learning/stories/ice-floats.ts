import type { Story } from './types';

const WATER = '#bae6fd';
const DEEP_WATER = '#60a5fa';
const ICE = '#e0f2fe';
const HBOND = '#f59e0b';
const OXYGEN = '#ef4444';

export const iceFloats: Story = {
  slug: 'ice-floats',
  title: '东西冻成固体都会缩紧变重，为什么水结成冰反而变轻、能浮在水面上？',
  trigger: '夏天喝冰水时，小念拿手指把冰块按到杯底，一松手冰块“嗖”地又浮回水面；可昨天妈妈熬猪油，凉了凝固后表面却往里凹下去一个坑。',
  dialogue: [
    {
      nian: '爸爸，猪油、蜡烛冻硬了都会缩紧往下沉，为什么水冻成冰块反而浮在水面上？',
      dad: '因为水是个罕见的“叛逆者”！绝大多数液体变冷凝固时，分子动得慢了，会挨得更挤更密，同样重量的固体体积更小、密度更大，丢进液体里就沉底。唯独水结成冰的时候，体积反而鼓大了将近十分之一，密度比水小，放进水里自然稳稳浮在上面。',
      eq: '4 ℃ 液态水密度 ≈ 1.00 g/cm³ ｜ 0 ℃ 普通冰密度 ≈ 0.917 g/cm³（体积膨胀约 9%）',
      show: { kind: 'lab', step: 0, label: '看「反常膨胀」' },
    },
    {
      nian: '同样都是水分子，结冰时密度为什么反而变小、更占地方了？',
      dad: '秘密在水分子之间带方向的“小拉手”——氢键。每个水分子由一个氧拉着两个氢，氧略带负电、氢略带正电，邻居之间就会头尾相吸。还是液态水的时候，水分子蹦蹦跳跳，小拉手拉上又松开，大家挤成一团没有空隙；一旦降到 0 ℃ 结冰，氢键就把每个水分子按固定角度死死拉住四个邻居，撑开了一座空荡荡的六角形脚手架！',
      figure: {
        kind: 'shells',
        atoms: [8, 1],
        caption: '氧（O，最外层 6 个电子）拉着氢（H，1 个电子）共用电子时偏心，让水分子一头略负、一头略正，结成氢键。',
      },
      show: { kind: 'lab', step: 1, label: '看「六角空笼」' },
    },
    {
      nian: '六角形脚手架里全是空隙吗？天上的雪花也是六个角，和它有关系吗？',
      dad: '被你一眼看穿了！冰晶里面一层层六角小环搭出许多空心小笼子，中间空着不准别的水分子硬塞进来，就像做广播体操时大家伸直胳膊散开队形，占地面积一下子大了约百分之九。天上的雪花不管长得多精巧，骨子里都是按这套六角网格长出来的，所以永远是六瓣！',
    },
    {
      nian: '占地面积一下子大了百分之九，那把玻璃瓶装满水放进冷冻室，岂不是很危险？',
      dad: '太对了！水结冰往外撑的力气大得惊人，装满水的玻璃瓶、易拉罐或是没排空的室外自来水管，一旦冻实，硬生生就会被撑裂炸开。那水什么时候挤得最紧、最重呢？不是 0 ℃，而是 4 ℃ 左右：再往下降温，水分子就开始提前排六角队形，反而慢慢变轻了。',
      figure: {
        kind: 'scale',
        axis: '从温水冻成冰的密度变化 →',
        stops: [
          { label: '室温温水', note: '分子跑得欢·略松', color: '#fed7aa' },
          { label: '4 ℃ 冷水', note: '挤得最紧·最重！', color: '#60a5fa', hot: true },
          { label: '0 ℃ 冰块', note: '六角空笼·膨胀9%', color: '#e0f2fe' },
        ],
        caption: '水在 4 ℃ 时密度最大最重；降到 0 ℃ 结成六角冰晶后，体积膨胀约 9%，密度变小浮上水面。',
      },
    },
    {
      nian: '4 ℃ 的冷水最重，这对冬天大湖里的鱼虾有什么用？还有人说滑冰是因为冰刀把冰压化了，是真的吗？',
      dad: '这可是救了满湖生命的奇妙设计！冬天寒风一吹，4 ℃ 的水最重，沉在湖底；更冷的 0 ℃ 水变轻浮在最上面先结成冰。这层浮冰像厚棉被一样挡住寒风，让湖底稳稳保持在 4 ℃ 左右不结冰，鱼虾才能活过寒冬。至于滑冰，很多人以为全靠冰刀把冰压化，其实算下来人的体重远远不够把冰压化——主要是冰表面天生带着一层极薄的“滑溜水膜”，再加上滑行摩擦生热才那么滑！',
      show: { kind: 'lab', step: 2, label: '看「4 ℃ 护生灵」' },
    },
    {
      nian: '我懂了！水分子之间有带方向的氢键，结冰时把大家撑成留着六角空洞的脚手架，体积膨胀约百分之九、密度变小，所以冰能浮在水面，冬天还能像棉被一样护住湖底 4 ℃ 水里的鱼虾！',
      dad: '讲得太精彩了！记住一条生活铁律：夏天想冰镇饮料，千万别把玻璃瓶或听装可乐塞进冷冻室忘了拿，装水冷冻也一定要留出至少十分之一的空位！',
    },
  ],
  tip: '严禁将密封玻璃瓶装饮品、听装碳酸饮料放入冰箱冷冻室，水结冰体积膨胀约 9% 极易撑裂容器造成割伤。普通六方冰（Ice Ih）在 0 ℃ 时密度约 0.917 g/cm³，纯水在 3.98 ℃ 达到最大密度约 1.000 g/cm³；热力学计算表明约需 135 个大气压才能使冰熔点降低 1 ℃，因此冰面湿滑主要源于表面预融化准液态层（Premelting layer）与摩擦生热，而非单纯压强融冰。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '冰块浮，满瓶裂',
        duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [340, 500], size: [300, 340], liquid: WATER, level: 0.72, label: '冰块浮在水面', from: 0 },
          { kind: 'shape', shape: 'rect', at: [340, 445], size: [120, 85], color: ICE, outline: true, text: '冰 0.92', motion: 'wiggle', from: 0.6 },
          { kind: 'count', at: [860, 330], label: '结冰体积膨胀', start: 0, end: 9, unit: '%', over: 2.5, from: 1.4 },
          { kind: 'sprite', icon: '🍾', path: [[860, 560]], size: 95, wobble: true, from: 3.4 },
          { kind: 'pulse', at: [860, 560], color: '#e5484d', radius: 130, from: 4.2 },
          { kind: 'text', at: [600, 830], text: '冻成冰更占地方，密度更小', size: 'm', from: 6.4 },
        ],
      },
      {
        turn: 1,
        title: '氢键撑开空脚手架',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [300, 460], size: [340, 340], color: '#f0f9ff', outline: true, from: 0.2, to: 5.2 },
          { kind: 'particles', box: [185, 345, 230, 230], count: 12, color: DEEP_WATER, symbol: 'H₂O', motion: 'jitter', size: 22, from: 0.5, to: 5.2 },
          { kind: 'text', at: [300, 680], text: '液态水：挤得紧', size: 's', from: 1.4 },
          { kind: 'bond', a: [870, 310], b: [990, 380], color: HBOND, from: 5.3 },
          { kind: 'bond', a: [990, 380], b: [990, 520], color: HBOND, from: 5.4 },
          { kind: 'bond', a: [990, 520], b: [870, 590], color: HBOND, from: 5.5 },
          { kind: 'bond', a: [870, 590], b: [750, 520], color: HBOND, from: 5.6 },
          { kind: 'bond', a: [750, 520], b: [750, 380], color: HBOND, from: 5.7 },
          { kind: 'bond', a: [750, 380], b: [870, 310], color: HBOND, from: 5.8 },
          { kind: 'text', at: [870, 680], text: '冰：氢键撑出空笼', size: 's', color: '#c2410c', from: 6.4 },
        ],
      },
      {
        turn: 2,
        title: '六角网格与六瓣雪花',
        duration: 10,
        cues: [
          { kind: 'atom', path: [[420, 340]], symbol: 'H₂O', color: OXYGEN, r: 34, from: 0.3 },
          { kind: 'atom', path: [[540, 420]], symbol: 'H₂O', color: OXYGEN, r: 34, from: 0.6 },
          { kind: 'atom', path: [[540, 550]], symbol: 'H₂O', color: OXYGEN, r: 34, from: 0.9 },
          { kind: 'atom', path: [[420, 630]], symbol: 'H₂O', color: OXYGEN, r: 34, from: 1.2 },
          { kind: 'atom', path: [[300, 550]], symbol: 'H₂O', color: OXYGEN, r: 34, from: 1.5 },
          { kind: 'atom', path: [[300, 420]], symbol: 'H₂O', color: OXYGEN, r: 34, from: 1.8 },
          { kind: 'sprite', icon: '❄️', path: [[880, 480]], size: 170, from: 2.8 },
          { kind: 'text', at: [600, 820], text: '六角空笼 → 雪花天生六瓣', size: 'm', from: 5.6 },
        ],
      },
      {
        turn: 3,
        title: '4 ℃ 的水挤得最紧',
        duration: 11,
        cues: [
          { kind: 'meter', at: [330, 330], label: '4 ℃ 水密度', start: 0.5, end: 1, color: DEEP_WATER, over: 2, from: 0.6 },
          { kind: 'meter', at: [870, 330], label: '0 ℃ 冰密度', start: 0.5, end: 0.917, color: '#93c5fd', over: 2, from: 1.2 },
          { kind: 'count', at: [330, 560], label: '1升水质量', start: 900, end: 1000, unit: '克', over: 2, from: 2.2 },
          { kind: 'count', at: [870, 560], label: '1升冰质量', start: 900, end: 917, unit: '克', over: 2, from: 2.6 },
          { kind: 'text', at: [600, 820], text: '4℃水最重沉底，0℃冰上浮', size: 'm', from: 6 },
        ],
      },
      {
        turn: 4,
        title: '冰被子护住鱼虾',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 260], size: [820, 70], color: ICE, outline: true, text: '0 ℃ 浮冰层', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [600, 455], size: [820, 310], color: WATER, from: 0 },
          { kind: 'sprite', icon: '🐟', path: [[340, 500], [760, 500]], size: 80, travel: 5, from: 0.8 },
          { kind: 'label', at: [600, 540], pos: [920, 420], text: '湖底约 4 ℃ 不冻', from: 2.2 },
          { kind: 'myth', wrong: '滑冰全靠体重把冰压化', right: '冰面自带超薄水膜又摩擦生热', from: 6.4 },
        ],
      },
      {
        turn: 5,
        title: '冷冻记得留空位',
        duration: 10,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [360, 490], size: [260, 320], liquid: WATER, level: 0.98, label: '装太满：易冻裂', from: 0 },
          { kind: 'vessel', vessel: 'beaker', at: [840, 490], size: [260, 320], liquid: WATER, level: 0.8, label: '留一成空位：安全', from: 0.4 },
          { kind: 'sprite', icon: '✅', path: [[840, 260]], size: 76, from: 2.4 },
          { kind: 'sprite', icon: '⚠️', path: [[360, 260]], size: 76, wobble: true, from: 1.8 },
          { kind: 'text', at: [600, 830], text: '玻璃瓶和听装饮料别塞冷冻室', size: 's', color: '#1f6b55', from: 5.2 },
        ],
      },
    ],
  },
};
