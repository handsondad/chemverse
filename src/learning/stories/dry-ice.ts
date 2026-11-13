import type { Story } from './types';

const DRY_ICE = '#eef6ff';
const CO2_GAS = '#cbd5e1';
const WATER_DROP = '#93c5fd';
const FOG = '#ffffff';
const COLD = '#3b82f6';
const WARN = '#e8590c';

export const dryIce: Story = {
  slug: 'dry-ice',
  title: '舞台上的干冰冒着滚滚白雾，为什么摸着冰手却一滴水都不化出来？',
  trigger: '生日蛋糕礼盒底下垫着几块白花花的“冰块”，一打开盖子就涌出贴着桌面流淌的白雾，可等它全没了，盒底却干干爽爽一滴水都没有。',
  dialogue: [
    {
      nian: '爸爸，礼盒底下那块冒白雾的冰怎么全没了，盒子里却一滴水都没有？',
      dad: '因为它根本不是水冻成的冰，而是把二氧化碳气体冻成的固体，所以叫“干冰”。普通冰块受热会先化成水；干冰在日常气压下却不走寻常路，一到零下 78.5 ℃ 就直接从固体变成气体飞走了，中间压根不变成液体，盒底当然干干爽爽。化学上把固体直接变气体的本领叫升华。',
      eq: 'CO₂（固体，−78.5 ℃） →（吸热·升华） CO₂（气体）',
      figure: {
        kind: 'table',
        focus: { by: 'atoms', values: [1, 6, 8] },
        ring: [6, 8],
        caption: '普通冰是氢和氧搭成的水（H₂O），干冰则是碳（C）和氧（O）搭成的固态二氧化碳（CO₂）。',
      },
      show: { kind: 'lab', step: 0, label: '看「跳过液态」' },
    },
    {
      nian: '固体直接升华成气体，里面的二氧化碳分子变了吗？为什么它不肯先变成液体？',
      dad: '分子一点没变，每个还是一个碳拉着两个氧，只是原来挨得紧紧的队伍一下子散开，分子之间的空隙拉大了好几百倍，所以这是物理变化。二氧化碳脾气怪：非要用五个多大气压把它死死摁住，它才肯变成液体；在咱们平时的一个大气压下，它拘束不住，受热就直接散成气体跑了。',
      figure: {
        kind: 'scale',
        axis: '1 个大气压下的干冰 →',
        stops: [
          { label: '极冷固态', note: '−78.5℃以下', color: '#dbeafe' },
          { label: '液态阶段', note: '常压下跳过！', color: '#f3f4f6' },
          { label: '直接升华', note: '−78.5℃变气体', color: '#fed7aa', hot: true },
        ],
        caption: '在日常一个大气压下，干冰跨过 −78.5 ℃ 就跳过液态，直接升华成无色的二氧化碳气体。',
      },
    },
    {
      nian: '既然二氧化碳散成气体跑了，那桌面上滚滚流淌的白雾难道就是二氧化碳气体吗？',
      dad: '不是！很多人以为白雾就是二氧化碳，其实二氧化碳无色透明，眼睛根本看不见。干冰升华时要从周围大口吸热，把旁边的空气冻得冰冰凉，空气里原本看不见的水蒸气一受冻，就凝成千千万万颗极小的小水滴，聚在一起才像白色的仙气。',
      show: { kind: 'lab', step: 1, label: '看「白雾真相」' },
    },
    {
      nian: '原来白雾是小水滴！可烧开水冒的白汽往上飘，干冰的白雾为什么贴着地面往下流？',
      dad: '秘密在谁轻谁重。烧水冒出的热气比周围冷空气轻，就往屋顶上飘；而二氧化碳分子本来就比空气重，刚从干冰升华出来的气体又冷得要命，冷气带着小水滴一起往下沉，就会像一条牛奶河一样贴着舞台和桌面往低处流淌。往干冰上浇点温水，水汽更足，白雾就翻腾得更热闹了。',
    },
    {
      nian: '干冰这么好玩，我能用手抓着玩，或者装进矿泉水瓶里拧紧带走吗？',
      dad: '千万使不得！干冰冷到零下 78.5 ℃，比家里冰箱冷冻室还冷得多，光着手一捏，几秒钟就会把皮肤冻伤粘住。更不能把它塞进拧紧的瓶子里：一块干冰全部变成气体，体积要膨胀七八百倍，密闭瓶子很快就会被撑爆！冷链盒都故意留着透气缝，就是给气体让路。',
      show: { kind: 'lab', step: 2, label: '看「安全边界」' },
    },
    {
      nian: '我懂了！干冰是固态二氧化碳，常压下在零下 78.5 ℃ 直接升华成看不见的气体，所以不留水；白雾是它吸热把空气里的水蒸气冻成的小水滴，因为又冷又重才贴地流；它会剧烈膨胀还冻手，绝不能徒手摸或装进密闭瓶子！',
      dad: '总结得一点不差！下次再收到冰淇淋里的干冰，记住两条铁规矩：别用手直接碰，放在通风的阳台让它自己散完，千万别往塑料瓶或密封盒里关。',
    },
  ],
  tip: '干冰温度低达 −78.5 ℃，徒手接触会造成严重冻伤，切勿放入口中（食品级干冰也须等完全升华后再食用饮品）。干冰升华体积膨胀约 700～800 倍，严禁装入拧紧的饮料瓶、保温杯或密封盒，也不要在密闭车厢内大量存放以防缺氧。数据参考美国化学会（ACS）演示实验说明与物理化学相图数据（CO₂ 三相点 −56.6 ℃、5.11 atm）。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '跳过液态直接飞',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [360, 520], size: [260, 180], color: DRY_ICE, outline: true, text: '固态干冰', motion: 'shrink', over: 6, from: 0.3 },
          { kind: 'count', at: [900, 310], label: '升华温度', start: 0, end: -79, unit: '℃', over: 2.5, from: 0.8 },
          { kind: 'particles', box: [220, 220, 340, 220], count: 10, color: CO2_GAS, symbol: 'CO₂', motion: 'rise', size: 26, amount: { at: 1.6, over: 4, from: 0, to: 10 }, from: 1.4 },
          { kind: 'label', at: [360, 630], pos: [780, 620], text: '盘底一滴水都没有', from: 4.4 },
          { kind: 'text', at: [600, 830], text: '固体直接变气体：升华', size: 'm', from: 6.8 },
        ],
      },
      {
        turn: 1,
        title: '分子没变，队伍散开',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [280, 460], size: [260, 260], color: '#eff6ff', outline: true, from: 0.2 },
          { kind: 'particles', box: [190, 370, 180, 180], count: 9, color: COLD, symbol: 'CO₂', motion: 'jitter', size: 24, from: 0.5 },
          { kind: 'arrow', path: [[440, 460], [600, 460]], color: WARN, text: '常压受热', from: 1.8 },
          { kind: 'shape', shape: 'rect', at: [860, 460], size: [420, 360], color: '#fffaf3', outline: true, from: 0.4 },
          { kind: 'particles', box: [680, 310, 360, 300], count: 7, color: CO2_GAS, symbol: 'CO₂', motion: 'gas', size: 24, from: 2.6 },
          { kind: 'text', at: [600, 830], text: '分子不变，空隙大几百倍', size: 's', from: 6.4 },
        ],
      },
      {
        turn: 2,
        title: '白雾其实是小水滴',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [340, 420], size: [210, 140], color: DRY_ICE, outline: true, text: '干冰', from: 0.2 },
          { kind: 'pulse', at: [340, 420], color: COLD, radius: 220, from: 1 },
          { kind: 'particles', box: [560, 220, 420, 170], count: 8, color: '#dbeafe', symbol: 'H₂O', motion: 'gas', size: 24, from: 1.4, to: 5.8 },
          { kind: 'particles', box: [520, 400, 460, 170], count: 16, color: WATER_DROP, motion: 'jitter', size: 13, amount: { at: 3.6, over: 2.5, from: 0, to: 16 }, from: 3.4 },
          { kind: 'label', at: [740, 480], pos: [920, 270], text: '水汽冻成小水滴', color: COLD, from: 4.8 },
          { kind: 'myth', wrong: '看到的白雾就是二氧化碳', right: '二氧化碳无色，白雾是小水滴', from: 6.8 },
        ],
      },
      {
        turn: 3,
        title: '又冷又重贴地流',
        duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [340, 470], size: [280, 260], liquid: '#fde68a', level: 0.55, label: '温水加干冰', from: 0 },
          { kind: 'shape', shape: 'rect', at: [340, 545], size: [110, 60], color: DRY_ICE, text: '干冰', from: 0.4 },
          { kind: 'flow', path: [[440, 390], [640, 560], [1040, 620]], color: FOG, count: 10, speed: 180, size: 16, from: 1.4 },
          { kind: 'arrow', path: [[620, 450], [980, 540]], color: COLD, text: '比空气重往下流', from: 3 },
          { kind: 'text', at: [600, 830], text: '像牛奶河一样贴着桌面走', size: 's', from: 6.4 },
        ],
      },
      {
        turn: 4,
        title: '绝不能关进密闭瓶',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [380, 430], size: [210, 320], color: '#e0f2fe', outline: true, text: '拧紧的瓶', motion: 'pulse', from: 0.3 },
          { kind: 'particles', box: [305, 310, 150, 220], count: 14, color: CO2_GAS, motion: 'gas', size: 12, amount: { at: 1.5, over: 3, from: 3, to: 14 }, from: 1 },
          { kind: 'meter', at: [870, 310], label: '瓶内气压', start: 0.15, end: 0.98, color: WARN, over: 3.5, from: 1.6 },
          { kind: 'count', at: [870, 520], label: '体积膨胀约', start: 1, end: 750, unit: '倍', over: 3.5, from: 2.2 },
          { kind: 'sprite', icon: '🧤', path: [[180, 430]], size: 95, from: 4.8 },
          { kind: 'text', at: [600, 830], text: '不徒手摸 · 不进密闭瓶', size: 'm', color: WARN, from: 6.8 },
        ],
      },
      {
        turn: 5,
        title: '干冰的三个秘密',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'pill', at: [240, 420], size: [240, 96], color: '#dbeafe', text: '固态CO₂', from: 0.4 },
          { kind: 'arrow', path: [[375, 420], [465, 420]], color: COLD, from: 1.2 },
          { kind: 'shape', shape: 'pill', at: [600, 420], size: [240, 96], color: '#fef3c7', text: '升华吸热', from: 1.8 },
          { kind: 'arrow', path: [[735, 420], [825, 420]], color: COLD, from: 2.6 },
          { kind: 'shape', shape: 'pill', at: [960, 420], size: [240, 96], color: '#e0e7ff', text: '水汽成白雾', from: 3.2 },
          { kind: 'text', at: [600, 790], text: '通风散尽 · 安全第一', size: 'm', color: '#1f6b55', from: 5.2 },
        ],
      },
    ],
  },
};
