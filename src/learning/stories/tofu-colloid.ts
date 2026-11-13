import type { Story } from './types';

const SOY = '#fef9c3';
const PROTEIN = '#f59e0b';
const ION = '#38bdf8';
const BEAM = '#fde047';
const TOFU = '#fffdf7';
const MUD = '#a88b6c';

export const tofuColloid: Story = {
  slug: 'tofu-colloid',
  title: '清清稀稀的一碗热豆浆，点几滴卤水怎么就抱团变成了白嫩豆腐？',
  trigger: '早餐铺里，师傅往一大锅滚烫顺滑的豆浆里慢悠悠淋了几勺清亮的卤水，轻轻一搅，整锅豆浆眨眼就凝成了白嫩颤悠悠的豆腐脑。',
  dialogue: [
    {
      nian: '爸爸，豆浆本来像牛奶一样稀溜溜的，为什么淋几勺卤水就凝成豆腐脑了？',
      dad: '因为豆浆里藏着无数大豆蛋白质小团块，平时谁也不肯挨着谁；卤水一进去，就像派去了许多“小媒人”，把这些蛋白质小团块手拉手连成一张立体大网，把整锅水稳稳兜在网眼里，稀豆浆就变成了软嫩的豆腐脑。压掉一部分水，就是咱们吃的板豆腐。',
      show: { kind: 'lab', step: 2, label: '看「点卤聚沉」' },
    },
    {
      nian: '豆浆里的蛋白质小团块怎么既不像盐水那样透明，又不像泥水那样沉底呢？',
      dad: '这全看颗粒个头！盐水里的离子小到不足 1 纳米，叫溶液，清澈见底；泥水里的泥沙大于 100 纳米，太重了，一放就沉底，叫浊液。豆浆里的蛋白质团块正好卡在 1 到 100 纳米之间，不大不小，叫胶体。拿手电筒从侧面照一杯稀豆浆，还能看见一条亮堂堂的光路，这叫丁达尔效应。',
      figure: {
        kind: 'scale',
        axis: '按水里颗粒的直径排队 →',
        stops: [
          { label: '小于1纳米', note: '溶液·盐水糖水', color: '#dbeafe' },
          { label: '1～100纳米', note: '胶体·豆浆云雾', color: '#fde68a', hot: true },
          { label: '大于100纳米', note: '浊液·泥水沉底', color: '#e7dfd5' },
        ],
        caption: '粒子个头决定脾气：豆浆正好落在 1～100 纳米的胶体区间，不沉底又能散射出一束光柱。',
      },
      show: { kind: 'lab', step: 0, label: '看「不大不小」' },
    },
    {
      nian: '丁达尔效应好神奇！那没加卤水之前，胶体里的小团块为什么不会自己撞在一起结块？',
      dad: '因为它们身上带着同一种电！生豆浆煮沸以后，卷着的蛋白质长链舒展开来，表面带上了许多负电荷。就像一群头发都带同种静电的小球，刚一靠近就互相推开，谁也粘不住谁，所以热豆浆放着也能稳稳当当，不会自己抱成团。',
      show: { kind: 'lab', step: 1, label: '看「同电相斥」' },
    },
    {
      nian: '负电荷把它们推开了，卤水里到底有什么，能把它们重新拉到一起？',
      dad: '盐卤里主要是氯化镁，石膏水里主要是硫酸钙，溶进水都会分出带两个正电的镁离子或钙离子。正电一上场，先把蛋白质身上的负电荷抵消掉，大家不再互相推搡；接着一个镁离子或钙离子还能两只手各拉住一条蛋白质链，搭起小桥，这在化学上叫胶体的聚沉。',
      eq: '带负电的蛋白质胶粒 + Mg²⁺ / Ca²⁺ → 网状豆腐凝胶',
      figure: {
        kind: 'table',
        focus: { by: 'group', values: [2] },
        ring: [12, 20],
        caption: '点豆腐的两位主角：盐卤里的镁（Mg）和石膏里的钙（Ca）同住第 2 族，都带两个正电荷来搭桥。',
        link: { category: 1, label: '在周期表里看镁和钙' },
      },
      show: { kind: 'lab', step: 2, label: '看「点卤聚沉」' },
    },
    {
      nian: '既然盐卤和石膏都能让胶体聚沉，点出来的北豆腐和南豆腐有什么不一样？',
      dad: '脾气一快一慢！盐卤里的氯化镁溶得极快，镁离子一拥而上，蛋白质网收得紧、挤出的水多，做成的是结实耐炖的北豆腐；熟石膏硫酸钙溶得慢，钙离子慢慢放出来，织出的网又细又松，锁住的水特别多，就是滑溜溜的南豆腐。很多人以为做豆腐把水变没了，其实嫩豆腐里将近九成还是水！',
      figure: {
        kind: 'dots',
        groups: [
          { label: '锁住的水', count: 88, amount: '约 88 份', note: '被蛋白质网格兜住' },
          { label: '大豆蛋白', count: 12, amount: '约 12 份', note: '搭成海绵一样的网', hot: true },
        ],
        caption: '一百个点代表一块嫩豆腐：近九成都是水，只靠约一成的蛋白质搭成细网就把水锁得稳稳的。',
      },
    },
    {
      nian: '我懂了！豆浆是颗粒在 1 到 100 纳米之间的胶体，蛋白质带负电互相推开；淋进卤水或石膏，镁离子、钙离子抵消负电荷并搭桥，让蛋白质聚沉成一张大网，把水锁在里面就成了豆腐！',
      dad: '说得清清楚楚！清晨树林里穿过薄雾的光柱，也是空气胶体的丁达尔效应。再记一条厨房规矩：生豆浆里含有让人肚子疼的物质，自己在家打豆浆一定要彻底煮沸几分钟，别被表面的假沸泡泡骗了！',
    },
  ],
  tip: '生豆浆含有胰蛋白酶抑制剂和皂苷，在约 80 ℃ 时会大量冒泡出现“假沸”，必须继续小火煮沸 5～10 分钟彻底熟透后才能饮用或点制家庭豆花（家用可选食品级内酯或熟石膏，工业盐卤不可直接过量食用）。胶体粒径范围依照人教版高中化学必修第一册（1～100 nm），豆腐含水量参考《中国食物成分表》南豆腐/北豆腐数据（约 82%～90%）。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '几勺卤水变豆腐',
        duration: 10,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [560, 520], size: [460, 360], liquid: SOY, level: 0.72, tint: { color: TOFU, at: 4, over: 2.5 }, label: '滚烫的热豆浆', from: 0 },
          { kind: 'flow', path: [[560, 190], [560, 430]], color: ION, count: 5, speed: 190, size: 11, from: 1.2, to: 3.8 },
          { kind: 'label', at: [580, 240], pos: [880, 250], text: '淋入几勺卤水', from: 1.6, to: 4.4 },
          { kind: 'shape', shape: 'rect', at: [560, 560], size: [380, 190], color: TOFU, outline: true, text: '白嫩豆腐脑', motion: 'grow', over: 2.2, from: 4.2 },
          { kind: 'text', at: [600, 840], text: '蛋白质抱成网，把水锁住', size: 'm', from: 6.6 },
        ],
      },
      {
        turn: 1,
        title: '光柱认出胶体',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [240, 500], size: [220, 280], liquid: '#e0f2fe', level: 0.7, label: '盐水 <1nm', from: 0 },
          { kind: 'vessel', vessel: 'beaker', at: [600, 500], size: [220, 280], liquid: SOY, level: 0.7, label: '稀豆浆 1–100nm', from: 0.3 },
          { kind: 'vessel', vessel: 'beaker', at: [960, 500], size: [220, 280], liquid: '#f5efe6', level: 0.7, label: '泥水 >100nm', from: 0.6 },
          { kind: 'particles', box: [880, 585, 160, 40], count: 10, color: MUD, motion: 'jitter', size: 11, from: 1.2 },
          { kind: 'sprite', icon: '🔦', path: [[70, 480]], size: 76, from: 1.8 },
          { kind: 'shape', shape: 'rect', at: [600, 480], size: [210, 42], color: BEAM, text: '亮光通路', from: 2.6 },
          { kind: 'text', at: [600, 840], text: '丁达尔效应：胶体的招牌', size: 'm', from: 6.8 },
        ],
      },
      {
        turn: 2,
        title: '同种负电互相推',
        duration: 11,
        cues: [
          { kind: 'atom', path: [[380, 450], [310, 450]], symbol: '蛋白', charge: '−', color: PROTEIN, r: 58, travel: 2.2, motion: 'jitter', from: 0.4 },
          { kind: 'atom', path: [[820, 450], [890, 450]], symbol: '蛋白', charge: '−', color: PROTEIN, r: 58, travel: 2.2, motion: 'jitter', from: 0.6 },
          { kind: 'arrow', path: [[520, 450], [410, 450]], color: '#e0762b', text: '推开', from: 1.8 },
          { kind: 'arrow', path: [[680, 450], [790, 450]], color: '#e0762b', text: '推开', from: 1.8 },
          { kind: 'label', at: [310, 390], pos: [600, 250], text: '都带负电，挨不拢', from: 3.4 },
          { kind: 'text', at: [600, 830], text: '同种电荷排斥，稳稳悬浮', size: 'm', from: 6.4 },
        ],
      },
      {
        turn: 3,
        title: '镁钙离子来搭桥',
        duration: 12,
        cues: [
          { kind: 'bond', a: [360, 460], b: [600, 460], color: ION, from: 3.6 },
          { kind: 'bond', a: [600, 460], b: [840, 460], color: ION, from: 3.8 },
          { kind: 'atom', path: [[360, 460]], symbol: '蛋白', color: PROTEIN, r: 54, from: 0.3 },
          { kind: 'atom', path: [[840, 460]], symbol: '蛋白', color: PROTEIN, r: 54, from: 0.5 },
          { kind: 'atom', path: [[600, 210], [600, 460]], symbol: 'Mg', charge: '2+', color: ION, r: 40, travel: 2, from: 1.2 },
          { kind: 'particles', box: [380, 350, 440, 220], count: 10, color: '#bae6fd', symbol: 'H₂O', motion: 'jitter', size: 22, from: 4.8 },
          { kind: 'label', at: [600, 415], pos: [920, 270], text: '抵消负电还拉手', from: 4.4 },
          { kind: 'text', at: [600, 830], text: '胶体聚沉，兜住一锅水', size: 'm', from: 7.2 },
        ],
      },
      {
        turn: 4,
        title: '嫩豆腐九成是水',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'pill', at: [330, 360], size: [260, 110], color: '#fef3c7', text: '盐卤·北豆腐', from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [870, 360], size: [260, 110], color: '#fffbeb', outline: true, text: '石膏·南豆腐', from: 1 },
          { kind: 'text', at: [330, 510], text: '收网快 · 结实', size: 's', from: 2.2 },
          { kind: 'text', at: [870, 510], text: '收网慢 · 滑嫩', size: 's', from: 2.8 },
          { kind: 'myth', wrong: '点豆腐把水都变干了', right: '嫩豆腐里近九成仍是水', from: 5.8 },
        ],
      },
      {
        turn: 5,
        title: '豆浆一定要煮透',
        duration: 10,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [460, 430], size: [360, 290], liquid: SOY, level: 0.68, from: 0 },
          { kind: 'sprite', icon: '🔥', path: [[460, 645]], size: 80, wobble: true, from: 0.6 },
          { kind: 'particles', box: [320, 310, 280, 160], count: 12, color: '#ffffff', motion: 'rise', size: 13, from: 1.4 },
          { kind: 'count', at: [910, 360], label: '真正沸腾', start: 80, end: 100, unit: '℃', over: 2.5, from: 2 },
          { kind: 'text', at: [600, 830], text: '80℃假沸别停火，煮透才喝', size: 's', color: '#1f6b55', from: 5.6 },
        ],
      },
    ],
  },
};
