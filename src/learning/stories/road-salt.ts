import type { Story } from './types';

const ICE = '#e0f2fe';
const BRINE = '#93c5fd';
const NA = '#a78bfa';
const CL = '#34d399';
const COLD = '#2563eb';

export const roadSalt: Story = {
  slug: 'road-salt',
  title: '下雪天往结冰的马路上撒盐，没出太阳雪怎么自己就化了？',
  trigger: '大雪过后气温还是零下三四摄氏度，环卫车往桥面撒了一层白花花的粗盐，不一会儿硬邦邦的冰面就化成了水。',
  dialogue: [
    {
      nian: '爸爸，天还冷在零下好几度呢，盐本身又不烫手，撒在马路上怎么就把冰化开了？',
      dad: '盐不是拿热去“烫”冰，而是派小兵去“拆台”！纯水在 0 ℃ 时结冰，是因为这时候水分子跑回冰上排队的速度，和冰拆散变成水的速度刚好打平。撒上食盐以后，盐溶进冰表面那层极薄的水膜里，把结冰的温度门槛硬生生压到了零下，零下三四度根本冻不住盐水，冰就只好乖乖化成水了。这叫凝固点降低。',
      eq: 'NaCl（固体） →（溶入冰面水膜） Na⁺ + Cl⁻（盐水凝固点降到 0 ℃ 以下）',
      figure: {
        kind: 'crystal',
        structure: 'salt',
        caption: '食盐晶体由紫色的钠离子（Na⁺）和绿色的氯离子（Cl⁻）交替排成，一遇冰面水膜就会散开去“插队”。',
      },
      show: { kind: 'lab', step: 0, label: '看「离子捣乱」' },
    },
    {
      nian: '食盐散开以后，是怎么把凝固点压到零下的？水分子为什么排不好队了？',
      dad: '食盐一进水，就拆成无数带正电的钠离子和带负电的氯离子，挤在水分子中间到处乱窜。水分子本来想手拉手排回整齐的六角冰晶，老被这些盐离子插队挡路，归队结冰的速度一下子慢了半拍；而冰那头往水里拆散的速度照旧。出的多、进的少，硬冰块自然越化越薄！',
      figure: {
        kind: 'shells',
        atoms: [11, 17],
        caption: '钠（11 号）送出 1 个电子给氯（17 号）变成阴阳离子，钻进水分子队伍中间挡住结冰通道。',
      },
    },
    {
      nian: '既然食盐只是挡住水分子排队，那冰块在零下化成水时，会变热还是变冷？',
      dad: '反而会变得更冷！很多人以为撒盐化雪会让雪水变暖和，其实恰恰相反：冰融化成水必须吸收大量热量，盐逼着冰在低温下硬着头皮融化，周围又没太阳供热，它就只好抢冰盐水自己的热量。往一碗碎冰里拌两大勺盐，温度能一路掉到零下十几度，把装果汁的小杯子放进去，不用冰箱都能冻出冰棒！',
      show: { kind: 'lab', step: 1, label: '看「越化越冷」' },
    },
    {
      nian: '碎冰拌盐能掉到零下十几度！那要是东北冷到零下三十度，撒食盐还能化雪吗？',
      dad: '那就失灵啦！在实验室里，食盐水最浓也只能撑到零下 21.2 ℃，再冷连盐水自己都会冻成硬块；真到了马路上，低于零下 10 ℃ 左右冰面太干、连化盐的水膜都没了，干食盐撒上去就像撒沙子一样不起作用。所以严寒地区会改撒氯化钙：它一个粒子能拆成三个离子，溶进水还放热，零下二十多度照样能啃动坚冰！',
      figure: {
        kind: 'scale',
        axis: '不同温度下的路面除冰本领',
        stops: [
          { label: '0 ℃', note: '纯水结冰线', color: '#e0f2fe' },
          { label: '0～−9℃', note: '撒食盐·好用省钱', color: '#93c5fd', hot: true },
          { label: '−21.2℃', note: '食盐水理论极限', color: '#bfdbfe' },
          { label: '更冷严寒', note: '改撒氯化钙融雪', color: '#c4b5fd' },
        ],
        caption: '零下几摄氏度撒普通食盐最划算；再冷突破工作极限后，就要请氯化钙等融雪剂上阵了。',
      },
      show: { kind: 'lab', step: 2, label: '看「融雪边界」' },
    },
    {
      nian: '食盐和氯化钙这么管用，为什么下雪后不把每条小路和花坛边都撒满融雪盐？',
      dad: '因为盐水有两样坏脾气：一是盐水导电特别强，溅到汽车底盘和桥梁钢筋上，会让铁生锈的速度翻好几倍；二是雪水渗进路边泥土，树根在浓盐水里吸不到水反而会脱水枯黄。所以现在都是先用铲雪车推走厚雪，只在坡道、桥面精准撒一点环保型融雪剂。',
    },
    {
      nian: '我懂了！食盐溶进冰面水膜拆成钠离子和氯离子，插队挡住水分子结冰，把凝固点压到 0 ℃ 以下；冰融化还要吸热，所以碎冰拌盐反而更冷；太冷要换氯化钙，而且不能往花坛乱撒盐！',
      dad: '前因后果全理顺了！冬天雪地出门也记个好习惯：踩过撒了融雪剂的雪泥水，回家拿湿布把鞋面和自行车链条擦一擦，既不留白盐印，也不容易生锈。',
    },
  ],
  tip: '工业融雪盐多含杂质（或使用氯化钙、醋酸钾等成分），严禁当作食用盐误食！在家体验“冰盐冻冰棒”小实验时请用食用盐，且手指不要长时间直接伸入零下十几度的冰盐水中以防冻伤。食盐—水体系共晶点为 −21.2 ℃（质量分数 23.3% NaCl），公路干撒岩盐实用下限约 −9.4 ℃，数据参考海洋物理化学相图与美国联邦公路管理局（FHWA）除冰指南。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '撒盐压低结冰线',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [340, 540], size: [340, 140], color: ICE, outline: true, text: '纯水冰 0℃', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [860, 540], size: [340, 140], color: ICE, outline: true, tint: { color: BRINE, at: 2.6, over: 3 }, text: '撒盐化成水', from: 0.4 },
          { kind: 'particles', box: [730, 320, 260, 130], count: 10, color: '#ffffff', motion: 'gas', size: 10, from: 0.8, to: 3.4 },
          { kind: 'label', at: [860, 470], pos: [860, 260], text: '零下几度也冻不住', color: COLD, from: 3.8 },
          { kind: 'text', at: [600, 820], text: '食盐把凝固点压到 0℃ 以下', size: 'm', from: 6.2 },
        ],
      },
      {
        turn: 1,
        title: '钠氯离子插队捣乱',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [260, 460], size: [220, 340], color: ICE, outline: true, text: '整齐冰晶', from: 0.2 },
          { kind: 'arrow', path: [[390, 360], [620, 360]], color: COLD, text: '冰照常拆散', from: 1 },
          { kind: 'atom', path: [[540, 540]], symbol: 'Na', charge: '+', color: NA, r: 40, motion: 'jitter', from: 1.8 },
          { kind: 'atom', path: [[660, 490]], symbol: 'Cl', charge: '−', color: CL, r: 44, motion: 'jitter', from: 2 },
          { kind: 'particles', box: [780, 360, 260, 240], count: 8, color: BRINE, symbol: 'H₂O', motion: 'gas', size: 24, from: 0.6 },
          { kind: 'label', at: [600, 520], pos: [880, 250], text: '挡在中间排不回冰', from: 3.4 },
          { kind: 'text', at: [600, 830], text: '化得比结得快，坚冰就化开了', size: 'm', from: 6.6 },
        ],
      },
      {
        turn: 2,
        title: '碎冰拌盐反而更冰',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [420, 405], size: [340, 300], liquid: BRINE, level: 0.72, label: '碎冰 + 两大勺盐', from: 0 },
          { kind: 'sprite', icon: '🍭', path: [[420, 360]], size: 88, from: 1.4 },
          { kind: 'count', at: [880, 370], label: '冰盐水降到', start: 0, end: -15, unit: '℃', over: 3, from: 1.8 },
          { kind: 'myth', wrong: '撒盐是因为盐发热把冰烫化', right: '冰被迫融化吸热，反而变得更冷', from: 6.2 },
        ],
      },
      {
        turn: 3,
        title: '严寒改请氯化钙',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'pill', at: [330, 380], size: [280, 105], color: '#dbeafe', text: '普通食盐', from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [870, 380], size: [280, 105], color: '#ede9fe', text: '氯化钙融雪剂', from: 1 },
          { kind: 'text', at: [330, 540], text: '马路约 −9 ℃ 内好用', size: 's', from: 2 },
          { kind: 'text', at: [870, 540], text: '拆3个离子·溶解还放热', size: 's', color: '#6d28d9', from: 2.8 },
          { kind: 'text', at: [600, 820], text: '零下二十多度也能破冰', size: 'm', from: 5.8 },
        ],
      },
      {
        turn: 4,
        title: '铲雪为主，精准撒盐',
        duration: 11,
        cues: [
          { kind: 'sprite', icon: '🚗', path: [[300, 420]], size: 110, from: 0.4 },
          { kind: 'text', at: [300, 560], text: '浓盐水催铁生锈', size: 's', color: '#b45309', from: 1.4 },
          { kind: 'sprite', icon: '🌳', path: [[900, 420]], size: 110, from: 0.8 },
          { kind: 'text', at: [900, 560], text: '咸雪水伤路边树根', size: 's', color: '#b45309', from: 2 },
          { kind: 'sprite', icon: '🚜', path: [[600, 420]], size: 110, from: 3.2 },
          { kind: 'text', at: [600, 820], text: '先机械铲雪，桥面坡道按量撒', size: 's', color: '#1f6b55', from: 5.8 },
        ],
      },
      {
        turn: 5,
        title: '雪天回家擦擦鞋',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'pill', at: [240, 430], size: [240, 96], color: '#e0f2fe', text: '离子插队', from: 0.4 },
          { kind: 'arrow', path: [[375, 430], [465, 430]], color: COLD, from: 1.2 },
          { kind: 'shape', shape: 'pill', at: [600, 430], size: [240, 96], color: '#dbeafe', text: '冰点降低', from: 1.8 },
          { kind: 'arrow', path: [[735, 430], [825, 430]], color: COLD, from: 2.6 },
          { kind: 'shape', shape: 'pill', at: [960, 430], size: [240, 96], color: '#dcfce7', text: '融冰护路', from: 3.2 },
          { kind: 'text', at: [600, 790], text: '踩过咸雪水，擦净鞋面和车链', size: 's', color: '#1f6b55', from: 5.2 },
        ],
      },
    ],
  },
};
