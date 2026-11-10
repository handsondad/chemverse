import type { Story, Vec } from './types';

const ELECTRON = '#ffcf3f';
const NUCLEUS = '#ff9f8a';
const CARBON = '#3d3a36';
const SODIUM = '#b48cff';
const CHLORINE = '#8fd16b';
const IRON = '#c9a27a';
const HYDROGEN = '#f4f4f0';
const HELIUM = '#ffd59e';
const CELL = '#f3ead8';

/** 绕 (cx, cy) 一整圈的路线，给绕核运动的电子用 */
const ring = (cx: number, cy: number, r: number): Vec[] =>
  Array.from({ length: 49 }, (_, i) => [cx + r * Math.cos((i / 48) * Math.PI * 2 - Math.PI / 2), cy + r * Math.sin((i / 48) * Math.PI * 2 - Math.PI / 2)] as Vec);

export const atomicBasics: Story = {
  slug: 'atomic-basics',
  title: '牛奶补钙、红肉补铁、芯片用硅，原子里到底是哪个数字决定了它是谁？',
  trigger: '小念喝牛奶时看见包装上写着「富含钙」，爸爸说钙、铁、硅都是由原子组成的，小念就犯起了嘀咕：原子不都是小球吗，凭什么分成这么多种？',
  dialogue: [
    {
      nian: '原子不都是一个个小球吗？钙原子和铁原子到底哪里不一样？',
      dad: '不一样在最中心的原子核里。原子要是有一座体育场那么大，原子核只有中间一颗豆子那么小，外面一大片是轻飘飘的电子。核里住着带正电的质子和不带电的中子。质子有几个，就决定它是哪种元素：20 个是钙，26 个是铁，14 个是硅。这个数叫原子序数，就像元素的身份证号。',
    },
    {
      nian: '质子数就是身份证号的话，那外面那一大片电子在干什么？',
      dad: '电子绕着核一层一层地住，像住楼房：第一层最多住 2 个，第二层最多住 8 个，住满一层才往外搬。不带电的原子里，电子数正好等于质子数，正负电刚好抵消。比如 6 号碳有 6 个电子，排成「2、4」；8 号氧有 8 个，排成「2、6」。',
      eq: '碳 C：6 个质子，6 个电子排成 2、4',
      show: { kind: 'lab', step: 1, label: '看「碳原子」' },
      figure: { kind: 'shells', caption: '碳和氧都住两层电子：第一层都是 2 个，橙色的最外层碳有 4 个、氧有 6 个。', atoms: [6, 8] },
    },
    {
      nian: '住满一层才往外搬，那质子再多一些，比如 11 个、17 个，电子会住到哪儿？',
      dad: '那就要搬到第三层。11 号钠排成「2、8、1」，最外层孤零零 1 个电子，很容易送人；17 号氯排成「2、8、7」，只差 1 个就凑满 8 个，特别想抢一个过来。最外层的电子就像伸在外面的手，元素爱跟谁打交道、脾气活不活泼，主要看它们。',
      eq: '钠 Na：2、8、1　　氯 Cl：2、8、7',
      show: { kind: 'lab', step: 3, label: '看「钠与氯」' },
      figure: { kind: 'shells', caption: '都住三层，差别全在橙色的最外层：钠只有 1 个电子，氯有 7 个，差 1 个就满 8 个。', atoms: [11, 17] },
    },
    {
      nian: '钠要是把最外层那 1 个电子送人，只剩 10 个，跟 10 号氖一样多，它是不是就变成氖了？',
      dad: '不会。很多人以为电子数变了，元素就变了，其实身份证号刻在核里。钠送走一个电子，就像人脱了一件外套，人还是那个人：核里 11 个质子一个没少，它还是钠，只是变成了带一个正电的钠离子。我们吃的食盐里，钠就是以这种钠离子的样子待着的。',
    },
    {
      nian: '身份证号刻在核里，那有没有什么办法能改掉核里的质子数？',
      dad: '平常的化学反应都改不了：烧、煮、溶解、生锈，碰到的只是外面的电子，原子核纹丝不动。所以化学反应前后，元素的种类一个也不会多、一个也不会少。只有核反应才能改动原子核，比如太阳里的氢原子核聚在一起变成氦，那要极高的温度和压力才行。',
    },
    {
      nian: '元素种类一个也不会少，那周期表上那么多格子，我怎么一下找到钙、铁、硅？',
      dad: '周期表就是按身份证号排的队：从 1 号氢开始，质子数每多一个，就往后挪一格，一排排满了换下一排，一直排到 118 号。每个格子里那个序号就是质子数，找硅就数到 14，找钙数到 20，找铁数到 26。同一竖列的元素，最外层电子数往往一样，脾气也很像。',
      figure: {
        kind: 'table',
        caption: '橙圈从左到右看：14 号硅在第 3 排，20 号钙和 26 号铁在第 4 排，序号就是质子数。',
        ring: [14, 20, 26],
        link: { label: '在周期表里找找它们' },
      },
    },
    {
      nian: '我懂了！原子核里的质子数就是元素的身份证号，决定它是谁；外面的电子一层层住，最外层几个电子决定它的脾气；电子送人了也不会变成别的元素。',
      dad: '一个字都没错！以后认识一种新元素，先问它的身份证号是几，再看最外层住了几个电子，你就把它的底细摸清一大半了。',
    },
  ],
  tip: '同一种元素的原子，中子数可以不同（同位素），但只要质子数相同就是同一种元素，初中暂不展开。「第一层最多 2 个、第二层最多 8 个」的排法适用于前 18 号元素，更重的元素排布更复杂。体育场和豆子的比方只表示原子核很小，真实比例差得更悬殊。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '核里的身份证',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'circle', at: [450, 470], size: [560, 560], color: '#f7fbff', outline: true, from: 0.2 },
          { kind: 'flow', path: ring(450, 470, 250), color: ELECTRON, count: 6, speed: 140, size: 10, loop: true, from: 0.8 },
          { kind: 'shape', shape: 'circle', at: [450, 470], size: [70, 70], color: NUCLEUS, motion: 'pulse', from: 1.6 },
          { kind: 'label', at: [450, 470], pos: [960, 580], text: '原子核：质子＋中子', from: 2.4 },
          { kind: 'count', at: [960, 300], label: '质子数', start: 1, end: 20, over: 3, from: 3.6 },
          { kind: 'text', at: [960, 440], text: '20 号 = 钙', size: 'm', color: '#c2410c', from: 6.8 },
          { kind: 'text', at: [600, 845], text: '质子数就是身份证号', size: 'm', from: 8 },
        ],
      },
      {
        turn: 1,
        title: '电子住楼房',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'circle', at: [450, 470], size: [240, 240], color: 'none', outline: true, from: 0.4 },
          { kind: 'shape', shape: 'circle', at: [450, 470], size: [400, 400], color: 'none', outline: true, from: 2.6 },
          { kind: 'atom', path: [[450, 470]], symbol: 'C', color: CARBON, r: 46, from: 0.2 },
          { kind: 'flow', path: ring(450, 470, 120), color: ELECTRON, count: 2, speed: 120, size: 12, loop: true, from: 1 },
          { kind: 'flow', path: ring(450, 470, 200), color: ELECTRON, count: 4, speed: 120, size: 12, loop: true, from: 3.2 },
          { kind: 'text', at: [950, 400], text: '碳：2、4', size: 'l', from: 5 },
          { kind: 'text', at: [600, 845], text: '住满一层，再往外搬', size: 'm', from: 7.2 },
        ],
      },
      {
        turn: 2,
        title: '钠和氯的最外层',
        duration: 12,
        cues: [
          { kind: 'atom', path: [[330, 440]], symbol: 'Na', color: SODIUM, r: 70, from: 0.3 },
          { kind: 'shape', shape: 'circle', at: [330, 440], size: [320, 320], color: 'none', outline: true, from: 0.5 },
          { kind: 'flow', path: ring(330, 440, 160), color: ELECTRON, count: 1, speed: 130, size: 14, loop: true, from: 1 },
          { kind: 'text', at: [330, 700], text: '外层 1 个：想送', size: 's', from: 2.2 },
          { kind: 'atom', path: [[870, 440]], symbol: 'Cl', color: CHLORINE, r: 70, from: 3.6 },
          { kind: 'shape', shape: 'circle', at: [870, 440], size: [320, 320], color: 'none', outline: true, from: 3.8 },
          { kind: 'flow', path: ring(870, 440, 160), color: ELECTRON, count: 7, speed: 130, size: 14, loop: true, from: 4.3 },
          { kind: 'text', at: [870, 700], text: '外层 7 个：想抢', size: 's', from: 5.6 },
        ],
      },
      {
        turn: 3,
        title: '送走电子还是钠',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [450, 380], size: [300, 300], color: 'none', outline: true, from: 0.2, to: 3.6 },
          { kind: 'atom', path: [[450, 380]], symbol: 'Na', color: SODIUM, r: 64, from: 0.2, to: 3.6 },
          { kind: 'flow', path: ring(450, 380, 150), color: ELECTRON, count: 1, speed: 130, size: 14, loop: true, from: 0.6, to: 2.2 },
          { kind: 'atom', path: [[600, 380], [1000, 230]], symbol: 'e⁻', color: ELECTRON, r: 28, travel: 1.4, from: 2.2, to: 5 },
          { kind: 'atom', path: [[450, 380]], symbol: 'Na', charge: '+', color: SODIUM, r: 64, from: 3.6 },
          { kind: 'text', at: [600, 590], text: '核里还是 11 个质子', size: 's', color: '#c2410c', from: 4.6 },
          { kind: 'myth', wrong: '少了电子就变成别的元素', right: '质子数没变，它还是钠', from: 6.6 },
        ],
      },
      {
        turn: 4,
        title: '只有核反应能改',
        duration: 12,
        cues: [
          { kind: 'sprite', icon: '🔥', path: [[300, 280]], size: 90, wobble: true, from: 0.3 },
          { kind: 'atom', path: [[300, 470]], symbol: 'Fe', color: IRON, r: 64, motion: 'jitter', from: 0.6 },
          { kind: 'text', at: [300, 680], text: '化学反应：核不动', size: 's', from: 1.8 },
          { kind: 'sprite', icon: '☀️', path: [[880, 260]], size: 110, from: 4 },
          { kind: 'atom', path: [[700, 470], [842, 470]], symbol: 'H', color: HYDROGEN, r: 38, travel: 1.6, from: 4.6, to: 6.6 },
          { kind: 'atom', path: [[1060, 470], [918, 470]], symbol: 'H', color: HYDROGEN, r: 38, travel: 1.6, from: 4.6, to: 6.6 },
          { kind: 'atom', path: [[880, 470]], symbol: 'He', color: HELIUM, r: 58, from: 6.6 },
          { kind: 'text', at: [880, 680], text: '太阳里：核反应', size: 's', color: '#c2410c', from: 7.2 },
          { kind: 'text', at: [600, 845], text: '元素种类一个不少', size: 'm', from: 8.8 },
        ],
      },
      {
        turn: 5,
        title: '按号码排队',
        duration: 11,
        cues: [
          { kind: 'count', at: [600, 290], label: '已发现', start: 1, end: 118, unit: '种', over: 3, from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [300, 510], size: [240, 110], color: CELL, text: '14 号 硅', from: 3.8 },
          { kind: 'shape', shape: 'pill', at: [600, 510], size: [240, 110], color: CELL, text: '20 号 钙', from: 4.6 },
          { kind: 'shape', shape: 'pill', at: [900, 510], size: [240, 110], color: CELL, text: '26 号 铁', from: 5.4 },
          { kind: 'arrow', path: [[200, 680], [1000, 680]], text: '多一个质子，挪一格', from: 6.2 },
          { kind: 'text', at: [600, 845], text: '周期表按质子数排队', size: 'm', from: 8 },
        ],
      },
    ],
  },
};
