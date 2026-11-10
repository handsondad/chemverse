import { lessonAsset } from '../assets';
import type { Story } from './types';

const IRON = '#c9a27a';
const FERROUS = '#bfe3b4';
const FERRIC = '#e8b86a';
const OXYGEN = '#ff8f85';
const CHLORINE = '#d8ec7a';
const ELECTRON = '#ffcf3f';
const WATER = '#eaf6e2';

export const ironStep: Story = {
  slug: 'iron-step',
  title: '补铁药水放久了怎么会变黄？同一个铁，凭什么一会儿 +2 价、一会儿 +3 价？',
  trigger: '奶奶的补铁口服液说明书上写着「宜与维生素 C 同服」，小念打开一瓶放了好些天的，发现淡绿色的药水有点发黄了。',
  dialogue: [
    {
      nian: '补铁的药水放久了，怎么从淡绿变黄了？里面的铁跑掉了吗？',
      dad: '铁没跑，是它换了个身份。药水里的铁原本是亚铁离子 Fe²⁺，溶在水里是淡绿色；它被空气里的氧气再抢走 1 个电子，就变成铁离子 Fe³⁺，颜色偏棕黄。铁原子交出 2 个电子是 +2 价，交出 3 个是 +3 价，化合价就是在数它交出去几个电子。',
      eq: 'Fe − 2e⁻ → Fe²⁺（浅绿） ｜ Fe − 3e⁻ → Fe³⁺（棕黄）',
      show: { kind: 'lab', step: 6, label: '看「看进去」' },
      figure: {
        kind: 'shells',
        caption: '铁最外层只有 2 个电子（橙色），攥得不牢；氧最外层 6 个，还差 2 个才满，所以总想去抢别人的。',
        atoms: [26, 8],
      },
    },
    {
      nian: '氧气一来就能抢走电子？那亚铁是不是特别容易被抢？',
      dad: '是的，Fe²⁺ 剩下的电子还很容易被抢。最明显的例子：往亚铁盐溶液里滴氢氧化钠，先出现白色的氢氧化亚铁沉淀，可它一碰到氧气，很快变成灰绿色，最后成了红褐色的氢氧化铁。白、灰绿、红褐，就是亚铁一步步被氧化的样子。',
      eq: '4Fe(OH)₂ + O₂ + 2H₂O = 4Fe(OH)₃',
      show: { kind: 'lab', step: 1, label: '看「白色沉淀」' },
      figure: {
        kind: 'image',
        src: lessonAsset('covers/iron-step.webp'),
        alt: '三支试管里的沉淀，从左到右是白色、灰绿色和红褐色',
        caption: '从左到右：刚生成的白色氢氧化亚铁、半路被氧化的灰绿色、最后的红褐色氢氧化铁。',
      },
    },
    {
      nian: '白色沉淀一碰氧气就变色，那想看清白色，要怎么把氧气挡在外面？',
      dad: '得给它造一个没有氧气的小房间：先把水煮沸，赶走溶在里面的氧气；滴氢氧化钠时把长滴管伸到液面下面，不让它穿过空气；最后在液面上盖一层煤油当盖子。这样白色就能留很久。这也说明，让亚铁变色的不是时间，而是氧气。',
      eq: '隔绝空气：煮沸除氧 · 长滴管伸到液面下 · 煤油封住液面',
      show: { kind: 'lab', step: 2, label: '看「隔绝空气」' },
    },
    {
      nian: '要是溶液很稀、光看变色分不清，有没有办法一下认出哪支里有 Fe³⁺？',
      dad: '有，滴几滴硫氰化钾溶液，也就是 KSCN。它像一个只认 Fe³⁺ 的红色警报：遇到 Fe³⁺ 马上变成血红色，遇到 Fe²⁺ 却没动静。两支浅色试管各滴一滴，变红的那支就有 Fe³⁺，哪怕只有很少一点也藏不住。',
      eq: 'Fe³⁺ + 3SCN⁻ = Fe(SCN)₃（红色）',
      show: { kind: 'lab', step: 3, label: '看「KSCN 检验」' },
    },
    {
      nian: '红色警报响了以后，还能把 Fe³⁺ 变回 Fe²⁺ 吗？',
      dad: '能，只要给它送回 1 个电子。往变红的溶液里加一勺铁粉，铁粉把电子交给 Fe³⁺，红色慢慢褪掉，溶液回到浅绿。反过来，往浅绿的溶液里滴氯水，氯气抢走 Fe²⁺ 的电子，再滴 KSCN 又变红了。会送电子的叫还原剂，会抢电子的叫氧化剂。',
      eq: '2Fe³⁺ + Fe = 3Fe²⁺ ｜ 2Fe²⁺ + Cl₂ = 2Fe³⁺ + 2Cl⁻',
      show: { kind: 'lab', step: 4, label: '看「价态降下来」' },
      figure: {
        kind: 'table',
        caption: '铁住在中间的过渡金属区（亮着的这一片）。这一带的金属大多有好几种化合价，铁最常见的是 +2 和 +3。',
        focus: { by: 'category', values: [2] },
        ring: [26],
      },
    },
    {
      nian: '那维生素 C 也是还原剂吗？所以补铁药才要配着它吃？',
      dad: '猜对了！人体更容易吸收 Fe²⁺，可它在药瓶里、在肠胃里都容易被氧化成 Fe³⁺。维生素 C 很爱送电子，能抢在氧气前面护住 Fe²⁺，还能把已经变成 Fe³⁺ 的送回来。很多人以为补铁越多越好，其实铁吃多了会伤肠胃、伤肝，补多少要听医生的。',
      show: { kind: 'lab', step: 7, label: '看「检铁站」' },
    },
    {
      nian: '我懂了！Fe²⁺ 再丢 1 个电子就成了 Fe³⁺；氧气和氯水会抢它的电子，铁粉和维生素 C 能把电子送回去；KSCN 一变红，就说明有 Fe³⁺。',
      dad: '完全正确，你把价态升降和「谁抢谁送」串起来了！生活里记一条：补铁药开封后要盖紧、放阴凉处，颜色明显变黄变褐就别再吃，也别自己加量。',
    },
  ],
  tip: '补铁剂和维生素 C 的用量请遵医嘱；儿童误服大量铁剂会中毒，药品要放在孩子拿不到的地方。文中氢氧化钠、氯水、硫氰化钾等实验只适合在学校实验室由老师演示。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '铁交出电子',
        duration: 11,
        cues: [
          { kind: 'atom', path: [[560, 460]], symbol: 'Fe', color: IRON, r: 64, from: 0.2, to: 3 },
          { kind: 'atom', path: [[620, 420], [960, 290]], symbol: 'e⁻', color: ELECTRON, r: 26, travel: 1.2, from: 1.2 },
          { kind: 'atom', path: [[620, 500], [960, 630]], symbol: 'e⁻', color: ELECTRON, r: 26, travel: 1.2, from: 1.6 },
          { kind: 'atom', path: [[560, 460]], symbol: 'Fe', charge: '2+', color: FERROUS, r: 64, from: 3, to: 6.6 },
          { kind: 'label', at: [560, 530], pos: [560, 700], text: 'Fe²⁺ 浅绿', from: 3.4, to: 6.6 },
          { kind: 'atom', path: [[1040, 460]], symbol: 'O₂', color: OXYGEN, r: 46, from: 4.4 },
          { kind: 'atom', path: [[630, 460], [980, 460]], symbol: 'e⁻', color: ELECTRON, r: 26, travel: 1, from: 5.4 },
          { kind: 'atom', path: [[560, 460]], symbol: 'Fe', charge: '3+', color: FERRIC, r: 64, from: 6.6 },
          { kind: 'label', at: [560, 530], pos: [560, 700], text: 'Fe³⁺ 棕黄', from: 7 },
          { kind: 'text', at: [600, 830], text: '交出几个电子，就是几价', size: 'm', from: 8.2 },
        ],
      },
      {
        turn: 1,
        title: '白、灰绿、红褐',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [600, 520], size: [460, 420], liquid: WATER, level: 0.72, from: 0 },
          { kind: 'flow', path: [[600, 170], [600, 420]], color: '#bcd8f0', count: 5, speed: 300, size: 12, from: 0.6, to: 2.6 },
          { kind: 'shape', shape: 'rect', at: [600, 650], size: [340, 90], color: '#f7f7f2', text: 'Fe(OH)₂', tint: { color: '#9aa98a', at: 4, over: 2.4 }, from: 1.6, to: 7.4 },
          { kind: 'particles', box: [420, 330, 360, 80], count: 6, color: OXYGEN, symbol: 'O₂', motion: 'gas', size: 28, from: 3 },
          { kind: 'shape', shape: 'rect', at: [600, 650], size: [340, 90], color: '#9aa98a', text: 'Fe(OH)₃', tint: { color: '#a5512e', at: 7.4, over: 2 }, from: 7 },
          { kind: 'label', at: [770, 650], pos: [1000, 520], text: '白→灰绿→红褐', from: 5 },
          { kind: 'formula', at: [600, 820], text: '4Fe(OH)₂ + O₂ + 2H₂O = 4Fe(OH)₃', from: 9 },
        ],
      },
      {
        turn: 2,
        title: '把氧气挡在外面',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [600, 540], size: [440, 400], liquid: WATER, level: 0.6, from: 0 },
          { kind: 'sprite', icon: '🔥', path: [[600, 800]], size: 80, wobble: true, from: 0.3, to: 3.4 },
          { kind: 'particles', box: [420, 560, 360, 150], count: 6, color: OXYGEN, symbol: 'O₂', motion: 'rise', size: 26, amount: { at: 1, over: 2.4, from: 6, to: 0 }, from: 0.3, to: 3.6 },
          { kind: 'label', at: [820, 600], pos: [1010, 420], text: '煮沸赶走氧气', from: 1, to: 3.6 },
          { kind: 'shape', shape: 'rect', at: [600, 450], size: [16, 400], color: '#cfe0e8', from: 3.8, to: 7.2 },
          { kind: 'label', at: [600, 620], pos: [1000, 330], text: '滴管伸到液面下', from: 4.2, to: 7.2 },
          { kind: 'shape', shape: 'rect', at: [600, 690], size: [300, 70], color: '#f7f7f2', text: 'Fe(OH)₂', from: 5.2 },
          { kind: 'shape', shape: 'rect', at: [600, 502], size: [430, 36], color: '#f6d77a', from: 6.6 },
          { kind: 'label', at: [780, 502], pos: [1010, 400], text: '煤油当盖子', from: 7.2 },
          { kind: 'text', at: [600, 840], text: '没有氧气，白色留住', size: 'm', from: 8.6 },
        ],
      },
      {
        turn: 3,
        title: '只认 Fe³⁺ 的警报',
        duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [330, 540], size: [340, 380], liquid: '#e6f4dc', level: 0.65, label: 'Fe²⁺', from: 0 },
          { kind: 'vessel', vessel: 'beaker', at: [870, 540], size: [340, 380], liquid: '#f3e3b8', level: 0.65, tint: { color: '#c92a2a', at: 3.6, over: 1.6 }, label: 'Fe³⁺', from: 0 },
          { kind: 'text', at: [600, 200], text: '滴 KSCN', size: 's', from: 0.8 },
          { kind: 'flow', path: [[330, 200], [330, 420]], color: '#f1c9a5', count: 4, speed: 260, size: 12, from: 1.4, to: 3.6 },
          { kind: 'flow', path: [[870, 200], [870, 420]], color: '#f1c9a5', count: 4, speed: 260, size: 12, from: 1.8, to: 4 },
          { kind: 'sprite', icon: '🚨', path: [[1090, 330]], size: 80, wobble: true, from: 5 },
          { kind: 'text', at: [600, 840], text: '只有 Fe³⁺ 会变红', size: 'm', from: 6.6 },
        ],
      },
      {
        turn: 4,
        title: '送回电子，抢走电子',
        duration: 12,
        cues: [
          { kind: 'atom', path: [[180, 620]], symbol: 'Fe', color: '#a9b1ba', r: 46, from: 0.4 },
          { kind: 'atom', path: [[360, 440]], symbol: 'Fe', charge: '3+', color: FERRIC, r: 58, from: 0.2, to: 3.2 },
          { kind: 'atom', path: [[220, 590], [330, 480]], symbol: 'e⁻', color: ELECTRON, r: 22, travel: 1, from: 1.4, to: 3.2 },
          { kind: 'atom', path: [[360, 440]], symbol: 'Fe', charge: '2+', color: FERROUS, r: 58, from: 3.2 },
          { kind: 'text', at: [360, 260], text: '还原剂：送电子', size: 's', color: '#1f6b55', from: 3.6 },
          { kind: 'atom', path: [[840, 440]], symbol: 'Fe', charge: '2+', color: FERROUS, r: 58, from: 4.8, to: 7.8 },
          { kind: 'atom', path: [[1030, 620]], symbol: 'Cl₂', color: CHLORINE, r: 46, from: 5.2 },
          { kind: 'atom', path: [[870, 470], [1000, 590]], symbol: 'e⁻', color: ELECTRON, r: 22, travel: 1, from: 6.2, to: 7.8 },
          { kind: 'atom', path: [[840, 440]], symbol: 'Fe', charge: '3+', color: FERRIC, r: 58, from: 7.8 },
          { kind: 'text', at: [840, 260], text: '氧化剂：抢电子', size: 's', color: '#c2410c', from: 8.2 },
          { kind: 'text', at: [600, 830], text: '一送一抢，价态升降', size: 'm', from: 9.4 },
        ],
      },
      {
        turn: 5,
        title: '维生素 C 护住亚铁',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 440], size: [300, 300], color: '#fff3bf', motion: 'grow', over: 1.2, from: 2.4 },
          { kind: 'atom', path: [[600, 440]], symbol: 'Fe', charge: '2+', color: FERROUS, r: 62, from: 0.2 },
          { kind: 'particles', box: [860, 280, 260, 340], count: 5, color: OXYGEN, symbol: 'O₂', motion: 'gas', size: 30, from: 0.8 },
          { kind: 'sprite', icon: '🍊', path: [[300, 600]], size: 100, wobble: true, from: 1.4 },
          { kind: 'label', at: [300, 600], pos: [170, 450], text: '维生素 C', from: 1.8 },
          { kind: 'flow', path: [[350, 570], [500, 490]], color: ELECTRON, count: 3, speed: 160, size: 12, from: 2.8, to: 5.6 },
          { kind: 'myth', wrong: '补铁越多越好', right: '补多少要听医生的', from: 6.4 },
        ],
      },
    ],
  },
};
