import type { Story } from './types';

const H2 = '#bae6fd';
const O2 = '#fca5a5';
const ELECTRON = '#fbbf24';
const MEMBRANE = '#e2e8f0';
const ANODE = '#64748b';
const CATHODE = '#475569';
const GREEN = '#1f6b55';

export const fuelCell: Story = {
  slug: 'fuel-cell',
  title: '氢燃料电池车不烧汽油只“喝”氢气，排气管滴出来的为什么只有纯水？',
  trigger: '科技馆门口停着一辆氢能源示范大巴，启动时没听见轰隆隆的发动机响，车尾排气管也没有黑烟，只滴下几滴清亮亮的水珠。',
  dialogue: [
    {
      nian: '爸爸，这辆大巴没烧汽油，排气管怎么不冒烟，反而滴出一滴滴清水来？',
      dad: '因为它肚子里装的不是烧油的内燃机，而是一座“氢燃料电池”！它请来的两位主角只有车罐里的氢气和空气里的氧气。两个氢分子和一个氧分子牵手，生成的唯一新物质就是水！既没有碳也没有硫，排气管里出来的当然只有干净的水汽和水滴啦。',
      eq: '总反应：2H₂ + O₂ = 2H₂O（单节理论电压约 1.23 V）',
      figure: {
        kind: 'table',
        focus: { by: 'atoms', values: [1, 8, 78] },
        ring: [1, 8],
        caption: '氢（H）和氧（O）在铂（Pt，78 号）催化剂帮忙下安静化合成水，全程不产生二氧化碳。',
      },
      show: { kind: 'lab', step: 0, label: '看「隔膜分流」' },
    },
    {
      nian: '可是上次你说氢气碰到氧气一点就炸，大巴里怎么没有“砰”地炸开呢？',
      dad: '妙就妙在一张薄薄的“质子交换膜”上！点火爆炸，是因为氢气和氧气直接撞在一起，能量一瞬间全变成火光和热浪乱冲。燃料电池偏不让它们见面：用这张薄膜把氢气拦在左边负极、氧气拦在右边正极，把一场暴烈的燃烧拆成了两半温温柔柔的交接，化学能就直接变成了电！',
    },
    {
      nian: '被质子交换膜隔在两边，氢气和氧气不碰面怎么交接变成水呢？',
      dad: '靠“分头行动”！左边负极涂了一丁点铂做催化剂，帮氢分子拆成氢离子和电子。中间那张膜有个倔脾气——只放带正电的氢离子穿过去，把带负电的电子死死拦在门外。电子没法抄近路，只好乖乖顺着外面的电线跑一圈，先推着大巴的电动机转起来，再到右边正极跟穿膜过来的氢离子、空气里的氧气汇合，手拉手拼成水！',
      eq: '负极：2H₂ − 4e⁻ = 4H⁺ ｜ 正极：O₂ + 4H⁺ + 4e⁻ = 2H₂O',
      figure: {
        kind: 'shells',
        atoms: [1, 8],
        caption: '每个氢原子（H）交出唯一一个电子走外电路做功，最后四个氢、四个电子与两个氧（O）在正极汇合成两分子水。',
      },
      show: { kind: 'lab', step: 1, label: '看「两路汇合」' },
    },
    {
      nian: '跟手机里的锂电池比起来，氢燃料电池也是用完了插上电线充一晚上吗？',
      dad: '不用插线等充电，它更像一台“边吃边发电的小电站”！锂电池是把电存进石墨和氧化物里，跑完了得插电慢慢赶回去；氢燃料电池自己不存电，只要往车上的高压储氢罐里加满氢气——像加油一样几分钟就加好——一路吸进空气就能接着发电，特别适合跑长途的大巴和重卡。',
    },
    {
      nian: '几分钟就能加满氢气还只排水，那只要全换成氢燃料车，是不是就一点二氧化碳都不排了？',
      dad: '还得追问一句：“氢气是从哪儿来的？”地球上几乎没有现成的纯氢气。很多人以为用氢气就一定零碳，其实如果拿煤或天然气去造氢气，工厂那头照样冒二氧化碳，这叫“灰氢”；只有用太阳能板、大风车发出的电去电解水，拆出来的氢气才叫“绿氢”，从源头到车尾真真正正零碳！',
      figure: {
        kind: 'scale',
        axis: '按制氢源头分三种“颜色” →',
        stops: [
          { label: '灰氢', note: '煤·天然气制·排碳', color: '#e2e8f0' },
          { label: '蓝氢', note: '制氢并把碳捕集', color: '#bae6fd' },
          { label: '绿氢', note: '风光电解水·零碳', color: '#bbf7d0', hot: true },
        ],
        caption: '氢气本身无色，人们用灰、蓝、绿区分它的出身：风电光伏电解水造出的“绿氢”才是彻底清洁的闭环。',
      },
      show: { kind: 'lab', step: 2, label: '看「绿氢闭环」' },
    },
    {
      nian: '我懂了！氢燃料电池用质子交换膜把氢气和氧气隔开，氢离子穿膜、电子绕电线推车轮，最后在正极拼成纯水；再配上风光电解水造出的绿氢，就从头到尾都不排碳了！',
      dad: '眼光都看到整条能源链啦！记住这个思路：看一种能源干不干净，不光看排气管冒不冒烟，还要往前看它的原料是怎么造出来的。绿色出行加上随手省电，我们每个人都在帮绿氢时代的忙！',
    },
  ],
  tip: '质子交换膜燃料电池（PEMFC）工作温度通常约 60～80 ℃，单池理论电动势 1.23 V（实际工作电压约 0.6～0.8 V，车载电堆由数百片单池串联而成）。氢气属于易燃气体，车载储氢瓶采用碳纤维缠绕高压容器并配有多重泄漏监测与泄压阀。参考人教版高中化学必修第二册、选择性必修 1 及国际能源署（IEA）氢能报告。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '喝进氢气，滴出纯水',
        duration: 10,
        cues: [
          { kind: 'sprite', icon: '🚌', path: [[560, 440]], size: 150, from: 0.2 },
          { kind: 'particles', box: [180, 360, 220, 120], count: 6, color: H2, symbol: 'H₂', motion: 'gas', size: 26, from: 0.6 },
          { kind: 'arrow', path: [[700, 480], [880, 480]], color: GREEN, text: '只排纯水', from: 1.8 },
          { kind: 'sprite', icon: '💧', path: [[950, 460], [950, 580]], size: 76, travel: 1.8, from: 2.6 },
          { kind: 'formula', at: [600, 820], text: '2H₂ + O₂ = 2H₂O', from: 4.8 },
        ],
      },
      {
        turn: 1,
        title: '薄膜隔开，不炸发电',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'pill', at: [320, 390], size: [280, 110], color: '#fee2e2', text: '直接撞面·爆燃', from: 0.4 },
          { kind: 'pulse', at: [320, 390], color: '#ef4444', radius: 150, from: 1, to: 4.5 },
          { kind: 'shape', shape: 'pill', at: [880, 390], size: [280, 110], color: '#dcfce7', text: '薄膜隔开·发电', from: 1.2 },
          { kind: 'shape', shape: 'rect', at: [880, 560], size: [24, 150], color: MEMBRANE, outline: true, from: 1.8 },
          { kind: 'label', at: [880, 560], pos: [600, 620], text: '质子交换膜不让直接碰面', from: 2.8 },
          { kind: 'text', at: [600, 830], text: '把暴烈燃烧拆成安静的电流', size: 'm', from: 6 },
        ],
      },
      {
        turn: 2,
        title: '离子穿膜，电子推车',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [340, 520], size: [120, 300], color: ANODE, text: '负极', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [600, 520], size: [26, 330], color: MEMBRANE, outline: true, from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [860, 520], size: [120, 300], color: CATHODE, text: '正极', from: 0.4 },
          { kind: 'sprite', icon: '⚙️', path: [[600, 220]], size: 86, wobble: true, from: 1 },
          { kind: 'flow', path: [[340, 370], [340, 220], [860, 220], [860, 370]], color: ELECTRON, count: 7, speed: 180, size: 12, from: 1.4 },
          { kind: 'atom', path: [[410, 540], [790, 540]], symbol: 'H', charge: '+', color: H2, r: 30, travel: 2.6, from: 2 },
          { kind: 'atom', path: [[1030, 540], [930, 540]], symbol: 'O₂', color: O2, r: 34, travel: 1.8, from: 2.4 },
          { kind: 'text', at: [600, 840], text: '电子走外线做功，正极汇合成水', size: 's', from: 6.8 },
        ],
      },
      {
        turn: 3,
        title: '几分钟加氢跑长途',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'pill', at: [330, 400], size: [280, 105], color: '#ede9fe', text: '锂电池·存电', from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [870, 400], size: [280, 105], color: '#dbeafe', text: '燃料电池·发电', from: 1 },
          { kind: 'text', at: [330, 555], text: '插线充电 · 适合轿车手机', size: 's', from: 2 },
          { kind: 'text', at: [870, 555], text: '几分钟加氢 · 适合重卡大巴', size: 's', color: GREEN, from: 2.8 },
          { kind: 'text', at: [600, 810], text: '两兄弟各有拿手本领', size: 'm', from: 5.4 },
        ],
      },
      {
        turn: 4,
        title: '认准风光造出的绿氢',
        duration: 12,
        cues: [
          { kind: 'sprite', icon: '☀️', path: [[240, 300]], size: 92, from: 0.3 },
          { kind: 'sprite', icon: '🌬️', path: [[240, 480]], size: 92, from: 0.6 },
          { kind: 'arrow', path: [[340, 390], [520, 390]], color: GREEN, text: '绿电拆水', from: 1.4 },
          { kind: 'vessel', vessel: 'beaker', at: [660, 400], size: [220, 240], liquid: '#bae6fd', level: 0.7, label: '电解水制绿氢', from: 1.8 },
          { kind: 'particles', box: [590, 230, 140, 110], count: 6, color: H2, symbol: 'H₂', motion: 'rise', size: 24, from: 2.8 },
          { kind: 'myth', wrong: '只要烧氢气就一定零碳环保', right: '用风光电力电解水造绿氢才零碳', from: 6.2 },
        ],
      },
      {
        turn: 5,
        title: '阳光变氢气，氢气变清水',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'pill', at: [230, 430], size: [230, 96], color: '#fef3c7', text: '风光绿电', from: 0.4 },
          { kind: 'arrow', path: [[360, 430], [460, 430]], color: GREEN, from: 1.2 },
          { kind: 'shape', shape: 'pill', at: [600, 430], size: [230, 96], color: '#dbeafe', text: '绿氢上车', from: 1.8 },
          { kind: 'arrow', path: [[730, 430], [830, 430]], color: GREEN, from: 2.6 },
          { kind: 'shape', shape: 'pill', at: [970, 430], size: [230, 96], color: '#bbf7d0', text: '变回纯水', from: 3.2 },
          { kind: 'text', at: [600, 790], text: '干净又循环的能量接力', size: 'm', color: GREEN, from: 5.2 },
        ],
      },
    ],
  },
};
