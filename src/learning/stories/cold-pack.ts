import type { Story } from './types';

const PACK = '#e0f2fe';
const WATER = '#60a5fa';
const SALT = '#ffffff';
const COLD = '#2563eb';
const HEAT = '#ef4444';

export const coldPack: Story = {
  slug: 'cold-pack',
  title: '冷敷冰袋不用放冰箱，用力一捏怎么自己就变得冰冰凉？',
  trigger: '体育课上同学不小心扭了脚踝，校医从医药箱里拿出一只常温软袋，“啪”地捏破里面的小水包摇了摇，袋子眨眼间就变得冰冰凉。',
  dialogue: [
    {
      nian: '爸爸，校医的冰袋平时就放在抽屉里，也没插电，为什么一捏就变得像冰块一样凉？',
      dad: '因为袋子里藏着“两居室”：大袋子里装着白色的硝酸铵或尿素颗粒，中间还封着一小包清水。你用力一捏把水包挤破，白色颗粒哗啦啦溶进水里，一边溶解一边拼命从水里“抢”热量，十几秒钟就把整袋水冻得冰冰凉了。',
      eq: 'NH₄NO₃（固体） →（溶于水·吸热） NH₄⁺ + NO₃⁻（每摩尔约吸热 25.7 千焦）',
      figure: {
        kind: 'table',
        focus: { by: 'atoms', values: [1, 6, 7, 8] },
        ring: [7],
        caption: '冷敷袋常用的尿素和硝酸铵都由氮（N）、氢（H）、氧（O）或碳（C）等非金属元素搭成。',
      },
      show: { kind: 'lab', step: 0, label: '看「袋中藏水」' },
    },
    {
      nian: '上次自热火锅加水是发烫，为什么这里的颗粒溶进水反而要从水里抢热量？',
      dad: '问到点子上了！固体溶进水里其实要算两笔账：第一步把紧紧抱成晶体的粒子拆散开，得花力气，要吸热；第二步水分子围上来和它们拉手做朋友，叫水合，会放热。硝酸铵和尿素拆家花掉的能量，远远多于跟水拉手放出的能量，入不敷出，就只好向周围的水借热量，水温就刷刷往下掉！',
      show: { kind: 'lab', step: 1, label: '看「两笔能量账」' },
    },
    {
      nian: '那是不是所有东西溶进水都会变凉？家里的食盐溶进水怎么摸不出冷热？',
      dad: '观察真仔细！不同固体的账本不一样：食盐拆散花的能量和水分子拉手放出的能量差不多扯平，所以水温几乎不变；而管道疏通剂里的氢氧化钠正好相反，水分子拉手放出的热比拆散花的多得多，一溶进水就烫手；只有尿素、硝酸铵这类“花多赚少”的选手，才能上岗当冷敷袋。',
      figure: {
        kind: 'scale',
        axis: '三种固体溶进水里的温度变化',
        stops: [
          { label: '尿素·硝酸铵', note: '花多赚少·变冰凉', color: '#bfdbfe', hot: true },
          { label: '厨房食盐', note: '收支相抵·几乎不变', color: '#f3f4f6' },
          { label: '氢氧化钠', note: '赚多花少·发烫！', color: '#fecaca' },
        ],
        caption: '同样是溶进水里，拆散吸热与水合放热的差额不同，摸起来就有冰凉、不变、发烫三种脾气。',
      },
    },
    {
      nian: '水温一下子降这么多，是热量消失了吗？这种冷敷袋能反复捏着制冷吗？',
      dad: '热量一丁点都没消失，只是搬去变成粒子分开后的能量存起来了。很多人以为等它回温后还能再捏一次变凉，其实颗粒一旦全溶进水里，自己是不会重新结成干颗粒和水包分开的，所以这种急救冰袋只能自己制冷一次。不过别急着扔，把它整袋放进冰箱冷冻室，还能当普通冰袋接着用！',
      show: { kind: 'lab', step: 2, label: '看「一次性冷敷」' },
    },
    {
      nian: '既然硝酸铵制冷那么猛，为什么现在很多家用冷敷袋改写着“尿素”了？',
      dad: '因为安全第一！硝酸铵吸热更猛，但管得严，万一袋子破了孩子误碰也不安全；尿素脾气温和得多，运输存放都稳当，降下来的温度也正好适合敷扭伤肿包，不容易一下子把皮肤冻坏。敷的时候在皮肤上垫一层薄毛巾，每次敷十五分钟左右最合适。',
    },
    {
      nian: '我懂了！冷敷袋里分装着水和尿素或硝酸铵颗粒，捏破水包溶解时，拆散颗粒花掉的能量比水分子拉手放出的多，就从水里吸热变冰凉；溶完不能自己复原，冷敷时还要垫毛巾！',
      dad: '跟自热火锅一冷一热正好凑成一对，你全串起来了！记住一条安全习惯：冷敷袋万一被尖东西扎破漏水了，千万别尝更别揉眼睛，洗干净手直接扔掉。',
    },
  ],
  tip: '即时冷敷袋仅供外用，切勿剪开或吞食袋内液体与颗粒；敷于皮肤时建议包裹薄毛巾，单次冷敷 15～20 分钟以防低温冻伤。硝酸铵（NH₄NO₃）溶解焓约为 +25.7 kJ/mol，尿素（CO(NH₂)₂）溶解焓约为 +15.4 kJ/mol，数据参考美国化学会（ACS）与大学普通化学热力学表。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '捏破水包秒变凉',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [520, 480], size: [520, 320], color: PACK, outline: true, from: 0 },
          { kind: 'shape', shape: 'circle', at: [430, 450], size: [180, 150], color: WATER, text: '小水包', motion: 'shrink', over: 1.6, from: 0.4, to: 2.6 },
          { kind: 'particles', box: [540, 380, 200, 190], count: 10, color: SALT, motion: 'jitter', size: 15, from: 0.4, to: 4.5 },
          { kind: 'particles', box: [320, 360, 400, 230], count: 12, color: '#93c5fd', motion: 'gas', size: 14, from: 2.4 },
          { kind: 'count', at: [960, 340], label: '袋面温度', start: 25, end: 2, unit: '℃', over: 3, from: 2.2 },
          { kind: 'text', at: [600, 830], text: '颗粒溶进水，十几秒变冰凉', size: 'm', from: 6.4 },
        ],
      },
      {
        turn: 1,
        title: '拆散花得多，拉手赚得少',
        duration: 12,
        cues: [
          { kind: 'meter', at: [330, 290], label: '拆散吸热', start: 0, end: 0.9, color: COLD, over: 2.2, from: 0.6 },
          { kind: 'meter', at: [870, 290], label: '水合放热', start: 0, end: 0.45, color: HEAT, over: 2.2, from: 1.4 },
          { kind: 'atom', path: [[480, 540], [340, 540]], symbol: 'NH₄', charge: '+', color: '#bae6fd', r: 46, travel: 1.8, from: 2.2 },
          { kind: 'atom', path: [[720, 540], [860, 540]], symbol: 'NO₃', charge: '−', color: '#cbd5e1', r: 46, travel: 1.8, from: 2.2 },
          { kind: 'arrow', path: [[600, 650], [600, 540]], color: COLD, text: '向水借热', from: 4 },
          { kind: 'text', at: [600, 830], text: '花掉多于放出，溶解吸热降温', size: 'm', from: 6.8 },
        ],
      },
      {
        turn: 2,
        title: '三种固体三种脾气',
        duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [240, 500], size: [220, 280], liquid: '#bfdbfe', level: 0.7, label: '尿素：变冰凉', from: 0 },
          { kind: 'vessel', vessel: 'beaker', at: [600, 500], size: [220, 280], liquid: '#e5e7eb', level: 0.7, label: '食盐：几乎不变', from: 0.4 },
          { kind: 'vessel', vessel: 'beaker', at: [960, 500], size: [220, 280], liquid: '#fecaca', level: 0.7, label: '氢氧化钠：发烫', from: 0.8 },
          { kind: 'sprite', icon: '❄️', path: [[240, 290]], size: 70, from: 1.8 },
          { kind: 'sprite', icon: '🔥', path: [[960, 290]], size: 70, wobble: true, from: 2.4 },
          { kind: 'text', at: [600, 830], text: '全看两笔能量账谁更大', size: 'm', from: 6 },
        ],
      },
      {
        turn: 3,
        title: '溶完不会自己回头',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [420, 410], size: [360, 220], color: '#dbeafe', outline: true, text: '已溶匀的冰袋', from: 0.3 },
          { kind: 'particles', box: [280, 330, 280, 160], count: 10, color: COLD, motion: 'gas', size: 12, from: 0.8 },
          { kind: 'sprite', icon: '🧊', path: [[880, 410]], size: 110, from: 2.4 },
          { kind: 'label', at: [880, 490], pos: [880, 590], text: '进冷冻室可当普通冰袋', from: 3.2 },
          { kind: 'myth', wrong: '回温后再捏几下又能自己变冰', right: '颗粒已溶完，自制冷只有一次', from: 5.8 },
        ],
      },
      {
        turn: 4,
        title: '温和尿素与薄毛巾',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'pill', at: [600, 360], size: [340, 96], color: PACK, outline: true, text: '尿素冷敷袋', from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [600, 465], size: [420, 28], color: '#fde68a', text: '垫一层毛巾', from: 1.2 },
          { kind: 'count', at: [600, 620], label: '单次冷敷约', start: 0, end: 15, unit: '分钟', over: 2, from: 2.2 },
          { kind: 'text', at: [600, 820], text: '隔着毛巾敷，温和不冻伤', size: 'm', from: 5.4 },
        ],
      },
      {
        turn: 5,
        title: '一热一冷两兄弟',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'pill', at: [330, 420], size: [300, 110], color: '#fed7aa', text: '自热火锅·放热', from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [870, 420], size: [300, 110], color: '#bfdbfe', text: '急救冰袋·吸热', from: 1 },
          { kind: 'text', at: [330, 580], text: '成键放出 > 拆键花掉', size: 's', color: '#c2410c', from: 2.2 },
          { kind: 'text', at: [870, 580], text: '拆散花掉 > 水合放出', size: 's', color: COLD, from: 2.8 },
          { kind: 'text', at: [600, 800], text: '破袋漏液别入口，洗手丢弃', size: 's', color: '#1f6b55', from: 5.2 },
        ],
      },
    ],
  },
};
