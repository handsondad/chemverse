import type { Story } from './types';

const GLOW = '#69db7c';
const SOFT = '#d3f9d8';
const ENERGY = '#ffd43b';
const HEAT = '#ff8a3d';

export const glowStick: Story = {
  slug: 'glow-stick',
  title: '荧光棒一掰就亮，它又没有电池，光是从哪儿来的？',
  trigger: '晚会散场，小念把手里的荧光棒一掰，它就亮了，她摸了摸：一点都不烫！',
  dialogue: [
    {
      nian: '爸爸，荧光棒里又没有电池，它的光是从哪儿来的？',
      dad: '光是从一个化学反应里来的。荧光棒里装着两种液体：外层是一种叫草酸酯的液体，中间还泡着一根细玻璃管，装着过氧化氢。你一掰，“咔”的一声玻璃管碎了，两种液体混到一起开始反应，反应放出的能量变成了光。这叫化学发光。',
      show: { kind: 'lab', step: 0, label: '看一掰之后发生了什么' },
    },
    {
      nian: '过氧化氢和草酸酯一混就会亮吗？它们俩谁在发光？',
      dad: '它们俩都不发光，发光的是第三位：泡在里面的荧光染料。过氧化氢和草酸酯反应，先变出一种很不稳定、浑身是劲的中间物，它一碎成二氧化碳，就把能量塞给旁边的染料分子。染料里的电子被推上更高的台阶，再跳回来时，把多出来的能量变成一点光放出来。',
      eq: '草酸二苯酯 + H₂O₂ → 2 苯酚 + 2CO₂ + 能量（交给染料，染料发光）',
      show: { kind: 'lab', step: 1, label: '看能量怎么交给染料' },
    },
    {
      nian: '电子跳回来就会发光？那荧光棒为什么有红的、绿的、蓝的？',
      dad: '颜色由染料决定。不同的染料分子，电子台阶的高低不一样，跳下来放出的光颜色就不一样：一种染料发蓝光，换一种发绿光，红色的用的是罗丹明。这和烟花有点像，可烟花的颜色靠钠、锶、铜这些金属，荧光棒里没有这些金属，靠的是染料分子。',
      figure: {
        kind: 'table',
        caption: '烟花靠金属元素上色：钠黄、锶红、钡绿、铜蓝（圈出来的四格）。荧光棒里没有它们，颜色来自染料分子。',
        paint: 'category',
        focus: { by: 'atoms', values: [11, 29, 38, 56] },
        ring: [11, 29, 38, 56],
      },
      show: { kind: 'lab', step: 2, label: '比一比不同颜色' },
    },
    {
      nian: '烟花又烫又亮，为什么荧光棒亮着却一点都不烫？',
      dad: '因为它的能量几乎直接变成了光，没有先变成热。火焰和老式灯泡要先把东西烧得很烫才发光，大半能量都变成了热；化学发光把能量直接交给染料，所以叫“冷光”。萤火虫的光也是冷光。有人说荧光棒晒晒太阳就能“充电”，这是误会：原料用完了，它就再也亮不起来。',
      figure: {
        kind: 'table',
        caption: '过氧化氢和草酸酯由碳、氢、氧（亮着的三格）搭成，没有烟花里那些会上色的金属。',
        paint: 'category',
        focus: { by: 'atoms', values: [1, 6, 8] },
      },
      show: { kind: 'lab', step: 3, label: '看冷光为什么不烫' },
    },
    {
      nian: '原料用完就不亮了？那怎么才能让它亮得久一点？',
      dad: '让反应慢下来就行。放进冰箱，分子跑得慢、碰得少，光变暗，可是能亮更久；泡进温水里，反应变快，光一下子很亮，却很快就用完了。这就是温度控制反应快慢，和牛奶放冰箱是一个道理。玩够了想留到明天，就放进冰箱冷冻室，第二天拿出来还能接着亮一阵。',
      show: { kind: 'lab', step: 3, label: '比一比冷水和温水' },
    },
    {
      nian: '我懂了！一掰荧光棒，玻璃管碎了，过氧化氢和草酸酯混在一起反应，把能量交给染料，染料的电子跳上去再跳下来就发光了。染料不同颜色就不同；能量直接变成光，所以不烫；放冰箱反应变慢，就能亮得更久！',
      dad: '说得太好了！再记一个好习惯：荧光棒千万别咬、别剪开，里面的液体会刺激皮肤和眼睛。用完的荧光棒属于有害垃圾，要扔进有害垃圾桶。',
    },
  ],
  tip: '荧光棒内含过氧化氢、草酸酯和反应生成的苯酚类物质，溅到皮肤上要用大量清水冲洗，进入眼睛要立即冲洗并就医；常有小孩把荧光棒咬破，要提醒不能放进嘴里。反应里那个“浑身是劲的中间物”，化学家普遍认为是 1,2-二氧杂环丁二酮，但至今还没有直接抓到它。文中事实参考了美国化学会 C&EN、Compound Interest、麻省理工开放课程和人民网科普中国的文章。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '咔的一声就亮了',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'pill', at: [600, 450], size: [720, 120], color: '#f1f3f5', outline: true, tint: { color: GLOW, at: 3.6, over: 1.5 }, from: 0 },
          { kind: 'shape', shape: 'pill', at: [600, 450], size: [500, 36], color: '#ffffff', outline: true, from: 0.3, to: 3.4 },
          { kind: 'label', at: [760, 450], pos: [880, 260], text: '玻璃管：过氧化氢', from: 0.8, to: 3.4 },
          { kind: 'label', at: [330, 480], pos: [300, 650], text: '外层：草酸酯', from: 1.6, to: 3.4 },
          { kind: 'pulse', at: [600, 450], color: SOFT, radius: 260, from: 3.4 },
          { kind: 'sprite', icon: '✨', path: [[600, 280]], size: 90, from: 4.6 },
          { kind: 'text', at: [600, 790], text: '咔！混在一起就亮', size: 'm', from: 5.6 },
        ],
      },
      {
        turn: 1,
        title: '能量交给染料',
        duration: 13,
        cues: [
          { kind: 'shape', shape: 'pill', at: [220, 350], size: [220, 80], color: '#e7f5ff', text: '过氧化氢', from: 0 },
          { kind: 'shape', shape: 'pill', at: [220, 560], size: [220, 80], color: '#fff3c4', text: '草酸酯', from: 0.4 },
          { kind: 'arrow', path: [[340, 455], [500, 455]], from: 1.4 },
          { kind: 'shape', shape: 'circle', at: [600, 455], size: [150, 150], color: '#ffd8a8', text: '中间物', motion: 'pulse', from: 2 },
          { kind: 'particles', box: [520, 200, 170, 120], count: 3, color: '#e9ecef', symbol: 'CO₂', size: 22, motion: 'rise', from: 4 },
          { kind: 'flow', path: [[690, 455], [880, 455]], color: ENERGY, count: 5, speed: 200, size: 12, from: 4.4 },
          { kind: 'atom', path: [[970, 455]], symbol: '染料', color: SOFT, r: 62, from: 3.6 },
          { kind: 'pulse', at: [970, 455], color: GLOW, radius: 170, from: 6.4 },
        ],
      },
      {
        turn: 1,
        title: '电子上台阶',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [560, 620], size: [480, 14], color: '#adb5bd', from: 0 },
          { kind: 'label', at: [800, 620], pos: [980, 720], text: '低台阶', from: 0.6 },
          { kind: 'shape', shape: 'rect', at: [560, 320], size: [480, 14], color: '#adb5bd', from: 1 },
          { kind: 'label', at: [800, 320], pos: [980, 220], text: '高台阶', from: 1.4 },
          { kind: 'atom', path: [[560, 596], [560, 296]], symbol: 'e⁻', color: '#74c0fc', r: 24, travel: 1.4, from: 2, to: 4.6 },
          { kind: 'atom', path: [[560, 296], [560, 596]], symbol: 'e⁻', color: '#74c0fc', r: 24, travel: 1, from: 4.6 },
          { kind: 'pulse', at: [560, 460], color: GLOW, radius: 200, from: 5.6 },
          { kind: 'text', at: [600, 820], text: '跳下来就放出光', size: 'm', from: 6.4 },
        ],
      },
      {
        turn: 2,
        title: '染料决定颜色',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'pill', at: [600, 300], size: [620, 80], color: '#f1f3f5', text: '蓝色染料', tint: { color: '#74c0fc', at: 1, over: 1 }, from: 0.3 },
          { kind: 'shape', shape: 'pill', at: [600, 450], size: [620, 80], color: '#f1f3f5', text: '绿色染料', tint: { color: GLOW, at: 2.6, over: 1 }, from: 1.8 },
          { kind: 'shape', shape: 'pill', at: [600, 600], size: [620, 80], color: '#f1f3f5', text: '罗丹明', tint: { color: '#ff8787', at: 4.2, over: 1 }, from: 3.4 },
          { kind: 'text', at: [600, 800], text: '换染料就换颜色', size: 'm', from: 6 },
        ],
      },
      {
        turn: 3,
        title: '冷光不烫手',
        duration: 12,
        cues: [
          { kind: 'sprite', icon: '🔥', path: [[330, 400]], size: 170, from: 0.3 },
          { kind: 'meter', at: [330, 640], label: '变成了热', start: 0, end: 0.85, color: HEAT, over: 2, from: 1 },
          { kind: 'shape', shape: 'pill', at: [870, 400], size: [110, 320], color: '#b2f2bb', from: 2.4 },
          { kind: 'pulse', at: [870, 400], color: GLOW, radius: 200, from: 3 },
          { kind: 'meter', at: [870, 640], label: '变成了热', start: 0, end: 0.08, color: HEAT, over: 2, from: 3.4 },
          { kind: 'myth', wrong: '晒晒太阳就能充电', right: '原料用完就不亮了', from: 7 },
        ],
      },
      {
        turn: 4,
        title: '冷一冷，亮更久',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [330, 520], size: [300, 340], liquid: '#d0ebff', level: 0.7, label: '冰水', from: 0 },
          { kind: 'shape', shape: 'pill', at: [330, 500], size: [70, 260], color: '#b2f2bb', from: 0.3 },
          { kind: 'vessel', vessel: 'beaker', at: [870, 520], size: [300, 340], liquid: '#ffe8cc', level: 0.7, label: '温水', from: 0.6 },
          { kind: 'shape', shape: 'pill', at: [870, 500], size: [70, 260], color: GLOW, tint: { color: '#e9ecef', at: 6, over: 2 }, from: 0.9 },
          { kind: 'pulse', at: [870, 500], color: GLOW, radius: 170, from: 1.4, to: 6 },
          { kind: 'text', at: [600, 830], text: '冷的暗一点，亮更久', size: 'm', from: 8 },
        ],
      },
    ],
  },
};
