import type { Story } from './types';

const ETHYLENE = '#60a5fa';
const PE = '#64748b';
const PLA = '#34d399';
const ESTER = '#f59e0b';
const HEAT = '#e8590c';

export const plasticsPolymer: Story = {
  slug: 'plastics-polymer',
  title: '塑料袋是怎么从气体里“串珠子”变出来的？可降解塑料真能随便扔吗？',
  trigger: '喝奶茶时小念发现吸管袋上印着“聚乳酸可生物降解”，再看看手里结实的超市塑料袋，很难相信塑料原本竟是从气体变出来的。',
  dialogue: [
    {
      nian: '爸爸，结结实实的塑料袋和牛奶瓶，怎么会是从看不见的气体变出来的？',
      dad: '靠一场壮观的“手拉手排长龙”！石油炼制时会裂解出一种只有两个碳原子的小分子气体，叫乙烯，平时连熟苹果和香蕉也会放出一点它来催熟果实。乙烯中间本来两只手拉在一起成双键；在催化剂指挥下，成千上万个乙烯松开一只手，首尾相接串成几万个碳的大长链——聚乙烯，气体就变成了柔韧结实的塑料！这叫加聚反应。',
      eq: 'n CH₂=CH₂（乙烯气体） →（催化剂·加聚） —[CH₂—CH₂]ₙ—（聚乙烯塑料）',
      figure: {
        kind: 'chains',
        chains: [{ carbons: 2, label: '乙烯 · 双键小分子气体', double: true, hot: true }],
        then: { via: '打开双键串长龙', chains: [{ carbons: 16, label: '聚乙烯长链的一小段' }] },
        caption: '乙烯（2 个碳，带双键）松开一只手首尾相连，串成几万个碳原子的聚乙烯高分子长链。',
      },
      show: { kind: 'lab', step: 0, label: '看「双键牵手」' },
    },
    {
      nian: '乙烯串成聚乙烯长链以后，塑料袋为什么那么结实，埋进土里几百年都不烂？',
      dad: '因为这条长链打的全是“死扣”！树叶、纸片能烂掉，是因为泥土里的细菌和真菌有专门的酶当小剪刀，能把植物纤维剪碎吃掉。而聚乙烯整条脊梁骨全是又牢又怕水的碳碳单键，几万个碳一字排开没有半个缺口，自然界里的细菌围着它转几百年也下不了嘴，顶多被风吹日晒碎成细小的微塑料。',
      show: { kind: 'lab', step: 1, label: '看「百年不烂」' },
    },
    {
      nian: '碳碳单键细菌下不了嘴，那奶茶店印着“可降解”的聚乳酸吸管，是在链条里留了缺口吗？',
      dad: '一下子就猜中了！科学家改用玉米、木薯的淀粉发酵出乳酸，再手拉手串成聚乳酸。妙就妙在，聚乳酸每隔一小节就留着一个由碳和氧搭成的“活扣”，叫酯键。遇到合适的温度和水分，水分子就能先把这些酯键活扣一个个拆开，把长链剪成短短的小段，细菌就能大口把它吃成二氧化碳和水了！',
      eq: '聚乳酸（含 —COO— 酯键） + H₂O →（水解断链 + 微生物分解） CO₂ + H₂O',
      figure: {
        kind: 'table',
        focus: { by: 'atoms', values: [1, 6, 8] },
        ring: [6, 8],
        caption: '聚乙烯只有碳和氢；聚乳酸在碳链中间请来了氧（O）搭出酯键“活扣”，给水分子留出了拆解大门。',
      },
    },
    {
      nian: '既然聚乳酸留了酯键活扣，喝完的可降解吸管是不是随手丢进草丛或海里，过几天就化没了？',
      dad: '千万别上当，这是最常见的误会！聚乳酸的酯键活扣在常温冷水和干土里紧得很，要是随手扔进大海或路边草丛，好几年也烂不掉，照样会伤到海龟和海鸟。它真正需要的是工业堆肥场：在 50 到 60 ℃ 的湿热环境里先让水把长链剪短，微生物才能在一两个月内把它彻底吃干净！',
      figure: {
        kind: 'scale',
        axis: '聚乳酸吸管在不同环境里的命运',
        stops: [
          { label: '常温海水草地', note: '活扣难开·几年不化', color: '#fecaca' },
          { label: '高温堆肥场', note: '50～60℃两月化', color: '#bbf7d0', hot: true },
          { label: '随手乱扔', note: '照样是白色污染！', color: '#fde68a' },
        ],
        caption: '可降解塑料不是“随手乱扔免死金牌”，要有 50～60 ℃ 湿热工业堆肥条件才能快速走完降解两步曲。',
      },
      show: { kind: 'lab', step: 2, label: '看「酯键活扣」' },
    },
    {
      nian: '原来聚乳酸也得进堆肥场，不能乱扔！那平时喝完的矿泉水瓶底下印着数字 1，是干什么用的？',
      dad: '那是塑料家族的“身份证号”！矿泉水瓶是 1 号聚对苯二甲酸乙二醇酯，洗发水瓶常是 2 号高密度聚乙烯，保鲜膜多是 4 号，能进微波炉的饭盒要认准 5 号聚丙烯。干净的 1 号饮料瓶回收后，不仅能重新造瓶子，还能抽成细丝织成柔软的抓绒外套和书包呢！',
    },
    {
      nian: '我懂了！乙烯打开双键手拉手加聚成聚乙烯塑料，全是碳碳死扣很难烂；聚乳酸装了酯键活扣，也要进 50 到 60 ℃ 的工业堆肥场才能快快降解，绝不能随手乱扔！',
      dad: '认识得特别透彻！出门在外记住三步环保法：自带水杯和布袋少用一次性塑料，能进微波炉只认准 5 号盒，喝完的饮料瓶踩扁投进可回收物桶！',
    },
  ],
  tip: '矿泉水瓶（1 号 PET）耐热仅约 65～70 ℃，切勿装开水或放进微波炉加热；微波加热餐盒请认准盒底三角标志“5 号 PP（聚丙烯）”，并取下非 PP 材质盒盖。聚乳酸（PLA）需在约 58 ℃ 高湿工业堆肥条件（ISO 14855 标准）下发生酯键水解后方能快速生物降解。参考人教版高中化学必修第二册、选择性必修 3 及高分子降解综述文献。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '小气体手拉手串长龙',
        duration: 11,
        cues: [
          { kind: 'atom', path: [[220, 320], [320, 480]], symbol: '乙烯', color: ETHYLENE, r: 44, travel: 1.8, from: 0.3 },
          { kind: 'atom', path: [[460, 260], [500, 480]], symbol: '乙烯', color: ETHYLENE, r: 44, travel: 1.8, from: 0.6 },
          { kind: 'atom', path: [[740, 260], [680, 480]], symbol: '乙烯', color: ETHYLENE, r: 44, travel: 1.8, from: 0.9 },
          { kind: 'atom', path: [[980, 320], [860, 480]], symbol: '乙烯', color: ETHYLENE, r: 44, travel: 1.8, from: 1.2 },
          { kind: 'bond', a: [320, 480], b: [860, 480], color: PE, from: 2.4 },
          { kind: 'label', at: [590, 480], pos: [600, 640], text: '打开双键连成几万碳长链', from: 3.4 },
          { kind: 'text', at: [600, 830], text: '加聚反应：气体变聚乙烯塑料', size: 'm', from: 6.4 },
        ],
      },
      {
        turn: 1,
        title: '碳碳死扣细菌啃不动',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'pill', at: [600, 440], size: [760, 56], color: PE, text: 'C—C—C—C', from: 0.2 },
          { kind: 'sprite', icon: '🦠', path: [[360, 310]], size: 86, wobble: true, from: 0.8 },
          { kind: 'sprite', icon: '🦠', path: [[840, 310]], size: 86, wobble: true, from: 1.2 },
          { kind: 'count', at: [600, 620], label: '自然界残留超', start: 10, end: 200, unit: '年', over: 2.5, from: 2 },
          { kind: 'text', at: [600, 830], text: '没有缺口，风浪只磨成微塑料', size: 'm', from: 6 },
        ],
      },
      {
        turn: 2,
        title: '聚乳酸留着酯键活扣',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [310, 440], size: [210, 54], color: PLA, text: '乳酸节', from: 0.3 },
          { kind: 'shape', shape: 'circle', at: [485, 440], size: [86, 64], color: ESTER, text: '酯键', from: 0.6, to: 5.2 },
          { kind: 'shape', shape: 'pill', at: [660, 440], size: [210, 54], color: PLA, text: '乳酸节', from: 0.9 },
          { kind: 'shape', shape: 'circle', at: [835, 440], size: [86, 64], color: ESTER, text: '酯键', from: 1.2, to: 5.2 },
          { kind: 'sprite', icon: '💧', path: [[485, 240], [485, 400]], size: 68, travel: 1.4, from: 2.2, to: 5.2 },
          { kind: 'sprite', icon: '✂️', path: [[835, 260], [835, 400]], size: 74, travel: 1.4, from: 2.8, to: 5.2 },
          { kind: 'particles', box: [320, 560, 560, 120], count: 8, color: '#bbf7d0', symbol: 'CO₂', motion: 'rise', size: 24, from: 5.4 },
          { kind: 'text', at: [600, 830], text: '水先剪开酯键，细菌再吃干净', size: 'm', from: 6.8 },
        ],
      },
      {
        turn: 3,
        title: '得进高温堆肥场才快',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 390], size: [540, 230], color: '#dcfce7', outline: true, text: '工业堆肥场', from: 0.3 },
          { kind: 'pulse', at: [600, 390], color: HEAT, radius: 220, from: 1.2 },
          { kind: 'count', at: [930, 330], label: '湿热堆肥约', start: 20, end: 58, unit: '℃', over: 2.2, from: 1.6 },
          { kind: 'myth', wrong: '印着可降解就能随手扔进海里草丛', right: '常温下很难化，要分类进堆肥处理', from: 5.8 },
        ],
      },
      {
        turn: 4,
        title: '认准塑料底下的数字',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'pill', at: [320, 400], size: [290, 110], color: '#dbeafe', text: '1号矿泉水瓶', from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [880, 400], size: [290, 110], color: '#dcfce7', text: '5号微波饭盒', from: 1 },
          { kind: 'text', at: [320, 560], text: '怕烫别装开水·可抽丝做衣', size: 's', from: 2 },
          { kind: 'text', at: [880, 560], text: '聚丙烯耐热 · 可进微波炉', size: 's', color: '#1f6b55', from: 2.8 },
          { kind: 'text', at: [600, 810], text: '看清身份证号，用对又好回收', size: 'm', from: 5.4 },
        ],
      },
      {
        turn: 5,
        title: '减塑回收人人能做',
        duration: 10,
        cues: [
          { kind: 'sprite', icon: '🛍️', path: [[280, 420]], size: 110, from: 0.4 },
          { kind: 'text', at: [280, 560], text: '自带布袋水杯', size: 's', from: 1.2 },
          { kind: 'sprite', icon: '♻️', path: [[600, 420]], size: 115, from: 1.8 },
          { kind: 'text', at: [600, 560], text: '空瓶踩扁回收', size: 's', from: 2.4 },
          { kind: 'sprite', icon: '🌱', path: [[920, 420]], size: 110, from: 3 },
          { kind: 'text', at: [920, 560], text: '绝不随手乱丢', size: 's', from: 3.6 },
          { kind: 'text', at: [600, 810], text: '懂高分子脾气，做环保小达人', size: 'm', color: '#1f6b55', from: 5.4 },
        ],
      },
    ],
  },
};
