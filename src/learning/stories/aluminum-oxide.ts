import type { Story } from './types';

const AL = '#cbd5e1';
const AL2O3 = '#38bdf8';
const IRON = '#64748b';
const RUST = '#b45309';
const ACID = '#fb7185';
const ALKALI = '#60a5fa';

export const aluminumOxide: Story = {
  slug: 'aluminum-oxide',
  title: '铝明明比铁还活泼，为什么家里的铝合金窗框反而好多年都不生锈？',
  trigger: '阳台上，老式铁花架掉了一地红褐色的铁锈渣，旁边装了十几年的铝合金窗框风吹雨淋，摸上去却依然平平整整。',
  dialogue: [
    {
      nian: '爸爸，书上明明说铝比铁更活泼，为什么铁架子锈得掉渣，铝合金窗框却一点事都没有？',
      dad: '因为铝不但反应了，还抢在一眨眼间给自己穿好了一件“隐形防弹衣”！铁生出的红褐色铁锈又松又脆，像吸水的饼干渣，水和氧气顺着缝隙一直往里钻，越锈越深；而铝一碰到空气里的氧气，表面立刻长出一层极其致密的氧化铝薄膜，把里面的铝严严实实护住了。',
      eq: '4Al + 3O₂ = 2Al₂O₃',
      figure: {
        kind: 'table',
        focus: { by: 'atoms', values: [8, 13, 26] },
        ring: [13, 26],
        caption: '第 13 号铝（Al）比第 26 号铁（Fe）更愿意交出电子，一遇氧（O）就迅速结成致密保护膜。',
      },
      show: { kind: 'lab', step: 0, label: '看「致密薄膜」' },
    },
    {
      nian: '这层氧化铝薄膜有多厚？要是窗框不小心被树枝刮花了一道口子，里面不就烂了吗？',
      dad: '它薄得不可思议，天然长出来的只有几纳米厚，连头发丝的万分之一都不到，所以眼睛看不出它穿了衣服。更神奇的是它会“自己愈合”：刮花露出新鲜铝的一瞬间，空气里的氧气马上扑上去，眨眼又补好一层新氧化铝！而且氧化铝硬得很，天然红宝石和蓝宝石骨子里就是它。',
      figure: {
        kind: 'shells',
        atoms: [13, 8],
        caption: '铝原子（2·8·3）交出外层 3 个电子，与氧（2·6）紧紧扣在一起，排成水气都钻不过去的致密层。',
      },
    },
    {
      nian: '连红宝石都是氧化铝！那要是拿火去烧一片铝箔，这层薄膜会被烧化吗？',
      dad: '不仅烧不化，还会演出一场“袋子兜水”的好戏！里面的纯铝到了 660 ℃ 就熔化成液体了，可外面那层薄薄的氧化铝要到 2050 ℃ 以上才肯熔化。所以在酒精灯上烧铝箔，你会看到铝箔软塌塌鼓成一个小囊袋，化开的液态铝被外面的氧化铝皮稳稳兜着，一滴都掉不下来！',
      figure: {
        kind: 'scale',
        axis: '铝和氧化铝外衣的熔点对比 →',
        stops: [
          { label: '纯铝熔化', note: '约660℃变液态', color: '#e2e8f0' },
          { label: '酒精灯火', note: '烧不化外层膜', color: '#fde68a' },
          { label: '氧化铝膜', note: '2050℃才熔化', color: '#bae6fd', hot: true },
        ],
        caption: '纯铝 660 ℃ 就熔化，表面的氧化铝却能扛过 2050 ℃，像耐火小口袋一样兜住里面的液态铝。',
      },
      show: { kind: 'lab', step: 1, label: '看「外衣耐高温」' },
    },
    {
      nian: '氧化铝连两千度都不怕，那它是不是天下无敌、什么东西都不怕了？',
      dad: '它有个最大的软肋：既怕酸，又怕碱！大多数金属氧化物只怕酸，氧化铝却是个“双面脾气”，化学上叫两性氧化物。碰到醋、柠檬、酸菜里的酸，它会溶掉；碰到纯碱、强力油污净里的碱，它也会溶掉。铠甲一破，里面的铝就会接着冒泡被腐蚀。',
      eq: 'Al₂O₃ + 6HCl = 2AlCl₃ + 3H₂O ｜ Al₂O₃ + 2NaOH + 3H₂O = 2Na[Al(OH)₄]',
      show: { kind: 'lab', step: 2, label: '看「酸碱都怕」' },
    },
    {
      nian: '既然酸和碱都会溶掉铠甲，那我们喝的可乐也是酸的，为什么敢装进铝易拉罐里？',
      dad: '观察得太细了！很多人以为可乐直接贴着铝罐壁，其实剪开易拉罐就会发现，内壁早就悄悄喷涂了一层极薄的食品级透明树脂薄膜，把酸性的可乐和铝彻底隔开了！而家里的普通铝锅没有这层树脂，就不能长久熬酸梅汤、腌酸菜，也别拿钢丝球拼命蹭它。',
    },
    {
      nian: '我懂了！铝比铁活泼，一碰氧气就长出几纳米厚又致密的氧化铝铠甲，刮破还能自己补好，连高温铝水都能兜住；但它既怕酸又怕碱，所以铝锅不能久装酸碱食物！',
      dad: '说得明明白白！再记一个绿色好习惯：从矿石里电解炼铝特别费电，而把喝完的铝易拉罐回收重熔，省下九成以上的电，随手把空铝罐投进可回收物桶里吧！',
    },
  ],
  tip: '家用无涂层铝锅、铝盆不宜长时间存放过酸（醋、番茄汤、酸菜）或过碱（纯碱水、强碱油污清洁剂）物品，清洗时用软布即可，避免钢丝球反复刮擦。回收再生铝所需的能耗仅约为原铝电解冶炼的 5%。数据参考人教版高中化学必修第一册及无机化学手册（Al 熔点 660 ℃，Al₂O₃ 熔点约 2054 ℃，天然氧化膜厚约 2～5 nm）。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '铁锈松脆，铝膜致密',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [320, 540], size: [300, 150], color: IRON, text: '铁块', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [320, 440], size: [300, 46], color: RUST, outline: true, text: '松脆铁锈', from: 0.8 },
          { kind: 'particles', box: [200, 310, 240, 100], count: 6, color: '#93c5fd', symbol: 'O₂', motion: 'gas', size: 22, from: 1.4 },
          { kind: 'shape', shape: 'rect', at: [880, 540], size: [300, 150], color: AL, text: '铝块', from: 0.4 },
          { kind: 'shape', shape: 'rect', at: [880, 452], size: [300, 24], color: AL2O3, from: 1.2 },
          { kind: 'label', at: [880, 452], pos: [880, 310], text: '致密氧化铝挡住水氧', color: '#0284c7', from: 2.6 },
          { kind: 'text', at: [600, 830], text: '一眨眼穿好隐形防弹衣', size: 'm', from: 6.4 },
        ],
      },
      {
        turn: 1,
        title: '刮破一道瞬间自愈',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 540], size: [640, 160], color: AL, text: '新鲜金属铝', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [410, 446], size: [260, 26], color: AL2O3, from: 0.4 },
          { kind: 'shape', shape: 'rect', at: [790, 446], size: [260, 26], color: AL2O3, from: 0.4 },
          { kind: 'particles', box: [500, 220, 200, 160], count: 6, color: '#fb7185', symbol: 'O₂', motion: 'gas', size: 26, from: 1.2, to: 4.8 },
          { kind: 'shape', shape: 'rect', at: [600, 446], size: [130, 26], color: '#38bdf8', motion: 'grow', over: 1.5, from: 3.6 },
          { kind: 'label', at: [600, 446], pos: [600, 290], text: '几纳米厚，立刻补好', from: 4.8 },
          { kind: 'text', at: [600, 830], text: '比铁活泼，反而更耐风吹雨淋', size: 's', from: 6.8 },
        ],
      },
      {
        turn: 2,
        title: '高熔点外皮兜住铝水',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'circle', at: [480, 440], size: [250, 300], color: AL2O3, outline: true, from: 0.3 },
          { kind: 'shape', shape: 'circle', at: [480, 465], size: [210, 230], color: '#f8fafc', text: '液态铝', motion: 'pulse', from: 1.2 },
          { kind: 'sprite', icon: '🔥', path: [[480, 660]], size: 88, wobble: true, from: 0.6 },
          { kind: 'count', at: [900, 310], label: '纯铝熔点', start: 200, end: 660, unit: '℃', over: 2, from: 1.4 },
          { kind: 'count', at: [900, 540], label: '氧化铝熔点', start: 660, end: 2050, unit: '℃', over: 2.5, from: 2.2 },
          { kind: 'text', at: [600, 830], text: '里面化了，外皮兜着滴不下来', size: 's', from: 6.4 },
        ],
      },
      {
        turn: 3,
        title: '两性氧化物：酸碱都怕',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [340, 490], size: [280, 310], liquid: '#ffe4e6', level: 0.68, label: '遇酸溶解冒泡', from: 0 },
          { kind: 'vessel', vessel: 'beaker', at: [860, 490], size: [280, 310], liquid: '#dbeafe', level: 0.68, label: '遇强碱也溶解', from: 0.3 },
          { kind: 'particles', box: [250, 420, 180, 160], count: 10, color: ACID, motion: 'rise', size: 11, from: 1.4 },
          { kind: 'particles', box: [770, 420, 180, 160], count: 10, color: ALKALI, motion: 'rise', size: 11, from: 1.8 },
          { kind: 'text', at: [600, 240], text: '两性氧化物：Al₂O₃', size: 's', from: 2.6 },
          { kind: 'text', at: [600, 830], text: '酸和强碱都能拆掉这层铠甲', size: 'm', from: 6.6 },
        ],
      },
      {
        turn: 4,
        title: '易拉罐里有层隔离膜',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 515], size: [580, 78], color: AL, text: '铝罐外壁', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [600, 425], size: [580, 66], color: '#fef08a', text: '食品级树脂膜', from: 1.2 },
          { kind: 'shape', shape: 'rect', at: [600, 325], size: [580, 96], color: '#fed7aa', text: '酸性可乐', from: 2 },
          { kind: 'myth', wrong: '可乐在易拉罐里直接挨着铝', right: '罐内涂了薄树脂膜把酸隔开', from: 5.8 },
        ],
      },
      {
        turn: 5,
        title: '爱护铝锅，回收铝罐',
        duration: 10,
        cues: [
          { kind: 'sprite', icon: '🥫', path: [[320, 430]], size: 115, from: 0.4 },
          { kind: 'arrow', path: [[430, 430], [640, 430]], color: '#1f6b55', text: '回收重熔', from: 1.4 },
          { kind: 'count', at: [860, 430], label: '节省电能超', start: 0, end: 90, unit: '%', over: 2.5, from: 2.2 },
          { kind: 'text', at: [600, 810], text: '少装酸碱·软布洗·空罐回收', size: 's', color: '#1f6b55', from: 5.4 },
        ],
      },
    ],
  },
};
