import { lessonAsset } from '../assets';
import type { Story } from './types';

const CU = '#d9895b';
const OXY = '#f4a3a3';
const AL = '#c9d3dc';
const CARBON = '#4a4a4a';
const IRON = '#b0643c';
const HEAT = '#e8590c';
const ELECTRON = '#ffcf3f';
const MELT = '#ffb066';

export const smeltingStep: Story = {
  slug: 'smelting-step',
  title: '博物馆里的青铜鼎三千多岁了，天天见的铝罐，为什么一百多年前却比黄金还贵？',
  trigger: '小念刚在博物馆看完三千多年前的青铜鼎，出门就喝了一罐汽水，手里的铝罐轻飘飘的，爸爸却说一百多年前铝比黄金还贵。',
  dialogue: [
    {
      nian: '爸爸，青铜鼎三千多岁了，铝罐到处都是，为什么铝反而是后来才便宜起来的？',
      dad: '因为金属在矿石里都不是单独待着的，而是和氧、硫这些伙伴抓在一起。要拿到金属，就得把它从矿石里“抢”回来。越活泼的金属抓得越紧，越难抢。铜不太活泼，古人用木炭火就能抢出来，再掺上锡就是青铜；铝非常活泼，抓氧抓得死死的，人类等到会用电才抢得动。',
      figure: {
        kind: 'table',
        caption: '圈出的是铜、锡（青铜就是它俩）、铁和铝。它们在矿石里都和别的元素抓在一起，要“抢”出来才能用。',
        paint: 'category',
        focus: { by: 'atoms', values: [13, 26, 29, 50] },
        ring: [13, 26, 29, 50],
      },
      show: { kind: 'lab', step: 0, label: '看「三处台子」' },
    },
    {
      nian: '木炭火怎么就能把铜抢出来？',
      dad: '木炭里的碳比铜更想要氧。把铜矿和木炭一起烧，碳和烧出来的一氧化碳就把氧从铜身上拽走，留下红色的铜。就像两个小朋友抢一个皮球，力气大的赢。铁也能这样炼，可铁比铜活泼一些，抢起来更费劲，所以铁器比青铜器出现得晚。这种办法叫热还原。',
      eq: '2CuO + C =高温= 2Cu + CO₂↑',
      show: { kind: 'lab', step: 0, label: '看「三处台子」' },
    },
    {
      nian: '那铝也拿木炭烧，火再旺一点，不行吗？',
      dad: '不行。铝比碳还要爱氧，在工厂能用的炉温下，碳根本拽不走铝身上的氧。只好换个办法：通电，让电流把电子硬塞给铝离子，让它变回铝原子。就像撬棍撬不开一扇焊死的门，只好请来一台大吊车。这叫电解，钠、镁也得这样炼。1886 年有人想出了便宜的电解办法，铝才走进千家万户。',
      eq: '2Al₂O₃（熔融）=通电，冰晶石= 4Al + 3O₂↑',
      show: { kind: 'lab', step: 1, label: '看「只能电解」' },
    },
    {
      nian: '电解是不是把铝矿直接接上电线就行？',
      dad: '没那么简单。先得把提纯出来的氧化铝熔成液体，离子才跑得动，可它要两千多度才化。窍门是让它泡进熔化的冰晶石里，像往冰上撒盐让冰更容易化，一千度左右就成了一锅。很多人以为冰晶石也参加了反应，其实它只帮氧化铝熔化，自己不被用掉。整锅还要一直通着大电流。',
      figure: {
        kind: 'image',
        src: lessonAsset('covers/smelting-step.webp'),
        alt: '铝电解槽剖面图：上方一排黑色碳块插进橙色的熔体，银色的铝液积在槽底',
        caption: '电解槽剖开看：上面一排黑色碳块插进橙色的熔体里，银亮的铝液比熔体重，沉在槽底。',
      },
      show: { kind: 'lab', step: 4, label: '看「掺冰晶石」' },
    },
    {
      nian: '一直通着大电流，那喝完的铝罐扔掉不是太浪费电了？',
      dad: '对，铝罐是最值得回收的东西之一。把旧铝罐熔掉重新做，不用再把铝从氧那里抢一遍，比从矿石炼新铝大约能省下 95% 的电。铝熔了又熔，性质也不变，能一直循环下去。所以喝完把罐子捏扁、放进可回收垃圾桶，就是在帮地球省电。',
      show: { kind: 'lab', step: 5, label: '看「电耗的账」' },
    },
    {
      nian: '从矿石里炼铝那么难，是因为铝太爱氧了吧？那它能反过来抢别人的氧吗？',
      dad: '能，而且抢得很凶。把铝粉和氧化铁粉混在一起点着，铝一把夺走铁的氧，放出大量的热，烫得铁都熔成了铁水。这叫铝热反应，铁路工人用它把两段钢轨焊在一起。同一个“太爱氧”，炼铝时是麻烦，到这里成了本事。',
      eq: '2Al + Fe₂O₃ =高温= Al₂O₃ + 2Fe',
      show: { kind: 'lab', step: 6, label: '看「铝热」' },
    },
    {
      nian: '我懂了！金属在矿石里和氧抓在一起，越爱氧的抓得越紧：铜用木炭火就能抢出来，所以青铜最早；铝连碳都抢不过，只能等人类会发电以后用电解，所以一百多年前才便宜起来；回收铝罐就能省下好多电！',
      dad: '一点没错！再养成一个好习惯：喝完的易拉罐冲一冲、捏扁，投进可回收垃圾桶，别和其他垃圾混在一起。',
    },
  ],
  tip: '铝热反应温度极高、火花四溅，熔融电解槽也在近千度下工作，这些都只能看懂原理，切勿模仿。“铝比黄金还贵”指 19 世纪中叶电解法发明之前；1886 年霍尔（美）和埃鲁（法）各自发明了冰晶石—氧化铝熔融电解法。回收铝约省 95% 能耗的说法来自国际铝业组织等行业资料。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '金属被锁在矿石里',
        duration: 11,
        cues: [
          { kind: 'text', at: [340, 260], text: '铜：抓得松', size: 's', from: 0.4 },
          { kind: 'atom', path: [[290, 440]], symbol: 'Cu', color: CU, r: 62, from: 0.8 },
          { kind: 'atom', path: [[400, 440]], symbol: 'O', color: OXY, r: 46, from: 1.2 },
          { kind: 'text', at: [860, 260], text: '铝：抓得死紧', size: 's', from: 2.4 },
          { kind: 'atom', path: [[810, 440]], symbol: 'Al', color: AL, r: 62, from: 2.8 },
          { kind: 'atom', path: [[912, 440]], symbol: 'O', color: OXY, r: 46, from: 3.2 },
          { kind: 'sprite', icon: '🔒', path: [[860, 580]], size: 80, from: 4.4 },
          { kind: 'text', at: [600, 820], text: '越活泼，抓氧越紧', size: 'm', from: 6.4 },
        ],
      },
      {
        turn: 1,
        title: '木炭把氧拽走',
        duration: 11,
        cues: [
          { kind: 'atom', path: [[420, 440]], symbol: 'Cu', color: CU, r: 62, from: 0.2, to: 4 },
          { kind: 'atom', path: [[530, 440]], symbol: 'O', color: OXY, r: 46, from: 0.4 },
          { kind: 'atom', path: [[1000, 440], [640, 440]], symbol: 'C', color: CARBON, r: 52, travel: 2, from: 1.2 },
          { kind: 'pulse', at: [530, 440], color: HEAT, radius: 260, from: 3 },
          { kind: 'atom', path: [[420, 440], [250, 520]], symbol: 'Cu', color: CU, r: 62, travel: 1.4, from: 4 },
          { kind: 'label', at: [250, 520], pos: [260, 700], text: '红色的铜', from: 5.6 },
          { kind: 'formula', at: [600, 830], text: '2CuO + C = 2Cu + CO₂↑', from: 7 },
        ],
      },
      {
        turn: 2,
        title: '碳抢不动，只能通电',
        duration: 12,
        cues: [
          { kind: 'atom', path: [[440, 420]], symbol: 'Al', color: AL, r: 62, from: 0.2, to: 5 },
          { kind: 'atom', path: [[548, 420]], symbol: 'O', color: OXY, r: 46, from: 0.2, to: 5 },
          { kind: 'atom', path: [[1000, 420], [650, 420], [960, 420]], symbol: 'C', color: CARBON, r: 52, travel: 2.6, from: 0.8, to: 5 },
          { kind: 'text', at: [820, 280], text: '碳：拽不动！', size: 's', color: '#c2410c', from: 2.4, to: 5 },
          { kind: 'sprite', icon: '⚡', path: [[260, 460]], size: 90, from: 5.2 },
          { kind: 'flow', path: [[320, 460], [560, 460]], color: ELECTRON, count: 6, speed: 200, size: 12, from: 5.6, to: 8.6 },
          { kind: 'atom', path: [[680, 460]], symbol: 'Al', color: AL, r: 62, charge: '3+', from: 5.4, to: 8.6 },
          { kind: 'atom', path: [[680, 460]], symbol: 'Al', color: AL, r: 62, motion: 'pulse', from: 8.6 },
          { kind: 'text', at: [600, 820], text: '电子塞给铝离子', size: 'm', from: 9 },
        ],
      },
      {
        turn: 3,
        title: '泡进冰晶石里熔化',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [420, 420], size: [380, 320], liquid: MELT, level: 0, rise: { to: 0.7, at: 3, over: 2.5 }, label: '电解槽', from: 0 },
          { kind: 'shape', shape: 'rect', at: [420, 540], size: [260, 70], color: '#f3f3f3', text: '氧化铝', motion: 'shrink', over: 2.5, from: 0.3, to: 5.4 },
          { kind: 'flow', path: [[420, 180], [420, 480]], color: '#dfe9f2', count: 7, speed: 260, size: 11, from: 1, to: 3.4 },
          { kind: 'label', at: [430, 230], pos: [760, 200], text: '冰晶石', from: 1.2, to: 4 },
          { kind: 'meter', at: [880, 380], label: '熔化温度', start: 0.95, end: 0.45, color: HEAT, over: 2.5, from: 3 },
          { kind: 'myth', wrong: '冰晶石也参加了反应', right: '它只帮氧化铝熔化', from: 7 },
        ],
      },
      {
        turn: 4,
        title: '回收铝罐省电',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [300, 420], size: [150, 240], color: AL, text: '旧铝罐', from: 0.3 },
          { kind: 'sprite', icon: '♻️', path: [[600, 300]], size: 90, from: 1.2 },
          { kind: 'arrow', path: [[400, 420], [790, 420]], color: '#1f6b55', text: '熔了再做', from: 1.6 },
          { kind: 'shape', shape: 'rect', at: [900, 420], size: [150, 240], color: '#e3e9ee', text: '新铝罐', from: 2.6 },
          { kind: 'meter', at: [300, 680], label: '矿石炼新铝', start: 0, end: 1, color: HEAT, over: 2, from: 3.6 },
          { kind: 'meter', at: [900, 680], label: '回收再炼', start: 0, end: 0.05, color: '#1f6b55', over: 2, from: 4.4 },
          { kind: 'text', at: [600, 840], text: '省下约 95% 的电', size: 'm', from: 7 },
        ],
      },
      {
        turn: 5,
        title: '铝反过来抢铁的氧',
        duration: 12,
        cues: [
          { kind: 'atom', path: [[420, 420]], symbol: 'Fe', color: IRON, r: 60, from: 0.2, to: 4 },
          { kind: 'atom', path: [[528, 420]], symbol: 'O', color: OXY, r: 46, from: 0.4 },
          { kind: 'atom', path: [[1000, 420], [640, 420]], symbol: 'Al', color: AL, r: 60, travel: 1.6, from: 1 },
          { kind: 'pulse', at: [560, 420], color: HEAT, radius: 320, from: 3.2 },
          { kind: 'atom', path: [[420, 420], [260, 560]], symbol: 'Fe', color: '#ff8a3d', r: 60, travel: 1.4, from: 4 },
          { kind: 'label', at: [260, 560], pos: [520, 660], text: '熔成铁水', from: 5.6 },
          { kind: 'sprite', icon: '🛤️', path: [[960, 640]], size: 110, from: 7 },
          { kind: 'formula', at: [600, 830], text: '2Al + Fe₂O₃ = Al₂O₃ + 2Fe', from: 8 },
        ],
      },
    ],
  },
};
