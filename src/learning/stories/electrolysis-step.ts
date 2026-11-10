import { lessonAsset } from '../assets';
import type { Story } from './types';

const COPPER_SOL = '#7fc8d8';
const BRINE = '#eef4fb';
const GRAPHITE = '#4a4a4a';
const COPPER = '#d9783f';
const KEY = '#c9ced4';
const CU_ION = '#7fb0e8';
const CHLORINE = '#d8f0a8';
const CL_ION = '#b9e7a5';
const ELECTRON = '#ffcf3f';
const PINK = '#ffb3cc';

export const electrolysisStep: Story = {
  slug: 'electrolysis-step',
  title: '铁钥匙泡进蓝色的溶液里通上电，怎么就穿上了一层铜衣服？',
  trigger: '小念在科技馆看见工作人员把一把铁钥匙挂进蓝色溶液，接上电源，过了一会儿，钥匙变成了红红的铜色。',
  dialogue: [
    {
      nian: '钥匙一通电就变成铜色了！这些铜是从哪儿来的？',
      dad: '铜就藏在那杯蓝色的溶液里。那是铜盐溶液，里面漂着许多看不见的铜离子，每个都少了两个电子。钥匙接在电源的负极上，电源像水泵一样把电子源源不断推到钥匙上，铜离子一碰到钥匙就把电子补回来，变回铜原子，一层层贴在表面。用电让化学反应发生，叫电解。',
      eq: 'Cu²⁺ + 2e⁻ = Cu',
      show: { kind: 'lab', step: 0, label: '看「认识实验」' },
    },
    {
      nian: '钥匙接的是电源负极，那接正极的那一头又在干什么？',
      dad: '正极那头正好反过来，它把电子往回抽。用两根碳棒电解氯化铜溶液看得最清楚：接负极的叫阴极，上面长出红色的铜；接正极的叫阳极，溶液里的氯离子在那儿交出电子，变成黄绿色、有刺激性气味的氯气，冒着小泡跑出来。',
      eq: 'CuCl₂ =电解= Cu + Cl₂↑',
      show: { kind: 'lab', step: 1, label: '看「接通电源」' },
      figure: {
        kind: 'image',
        src: lessonAsset('covers/electrolysis-step.webp'),
        alt: 'U 形管里装着蓝绿色溶液，两根电极接着电源，一根上裹着红色的铜，另一根周围冒着小气泡',
        caption: 'U 形管里是蓝绿色的氯化铜溶液：一根电极上长出了红色的铜，另一根周围冒出一串小气泡。',
      },
    },
    {
      nian: '铜离子和氯离子怎么知道该往哪根棒跑？',
      dad: '靠正负相吸。通电以前，离子在水里到处乱逛；一通电，带正电的铜离子被阴极吸过去，带负电的氯离子被阳极吸过去，像操场上一吹哨，同学们分成两队往两头跑。电子只在导线里走，从不下水，溶液里搬电荷的全是离子。',
      show: { kind: 'lab', step: 3, label: '看「看进去」' },
    },
    {
      nian: '要是换成食盐水呢？里面有钠离子，阴极上会长出金属钠吗？',
      dad: '不会，这是最容易想错的地方。食盐水里除了钠离子和氯离子，还有大量的水，水比钠离子更容易接到电子，所以阴极上冒出的是氢气，钠离子原封不动留在水里；阳极照样放出氯气。很多人以为溶液里有什么就析出什么，其实要看谁抢电子更积极。',
      eq: '2NaCl + 2H₂O =电解= 2NaOH + H₂↑ + Cl₂↑',
      show: { kind: 'lab', step: 4, label: '看「换食盐水」' },
    },
    {
      nian: '阴极冒的是氢气，那钠离子留在水里，最后变成了什么？',
      dad: '变成了氢氧化钠，也叫烧碱，是一种碱。水在阴极接电子放出氢气时，会留下带负电的氢氧根，正好和钠离子凑成一对。滴一滴酚酞，阴极周围马上变红，就是碱在报到。工厂里就靠电解食盐水，一次做出氯气、氢气和烧碱，消毒液、肥皂、塑料都离不开它们。',
      eq: '2H₂O + 2e⁻ = H₂↑ + 2OH⁻',
      show: { kind: 'lab', step: 5, label: '看「阴极区变红」' },
    },
    {
      nian: '电解食盐水能做出这么多东西，那给钥匙镀铜时，阳极为什么不放一根碳棒，而是放一块铜？',
      dad: '因为铜片会自己抢着交出电子，变成铜离子溶进溶液，就不冒氯气了；阴极那边，铜离子又变回铜贴在钥匙上。整个过程像搬家，铜从阳极一点点搬到钥匙上，溶液里的铜离子差不多不增不减，蓝色也几乎不变。工厂提纯铜，用的也是这个办法。',
      eq: 'Cu − 2e⁻ = Cu²⁺（阳极） · Cu²⁺ + 2e⁻ = Cu（阴极）',
      show: { kind: 'lab', step: 7, label: '看「铜作阳极」' },
    },
    {
      nian: '我懂了！电源把电子推到阴极、从阳极抽走，溶液里带正电的离子跑去阴极接电子，带负电的跑去阳极交电子；谁抢电子更积极谁先反应，所以食盐水出氢气不出钠，铜阳极还能把铜搬到钥匙上。',
      dad: '完全正确！电池放电是化学变成电，电解是电变成化学，正好倒过来。记一个好习惯：遇到通电的实验，先认清哪一极接正、哪一极接负，再去猜每根棒上会出现什么。',
    },
  ],
  tip: '氯气有毒，电解氯化铜溶液或食盐水只适合在通风良好的实验室里由老师演示，家中请勿尝试；氢气和氯气混在一起遇强光可能爆炸，氢氧化钠有强腐蚀性。铜盐溶液有毒，不能入口，接触后要洗手。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '钥匙穿上铜衣',
        duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [600, 560], size: [560, 360], liquid: COPPER_SOL, level: 0.75, label: '铜盐溶液', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 540], size: [90, 260], color: KEY, text: '钥匙', tint: { color: COPPER, at: 4, over: 4 }, from: 0.3 },
          { kind: 'sprite', icon: '🔋', path: [[600, 220]], size: 100, from: 0.6 },
          { kind: 'flow', path: [[600, 290], [600, 410]], color: ELECTRON, count: 4, speed: 120, size: 11, from: 1.5 },
          { kind: 'atom', path: [[400, 620], [552, 600]], symbol: 'Cu', charge: '2+', color: CU_ION, r: 28, travel: 2, from: 2.5 },
          { kind: 'atom', path: [[800, 560], [648, 580]], symbol: 'Cu', charge: '2+', color: CU_ION, r: 28, travel: 2, from: 3 },
          { kind: 'label', at: [648, 520], pos: [950, 380], text: '铜离子变回铜', from: 5 },
          { kind: 'text', at: [600, 850], text: '电源推电子，铜贴上来', size: 'm', from: 7.5 },
        ],
      },
      {
        turn: 1,
        title: '一边铜，一边氯气',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [600, 560], size: [640, 360], liquid: COPPER_SOL, level: 0.75, label: '氯化铜溶液', from: 0 },
          { kind: 'shape', shape: 'rect', at: [420, 520], size: [50, 300], color: GRAPHITE, tint: { color: COPPER, at: 3, over: 4 }, from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [780, 520], size: [50, 300], color: GRAPHITE, from: 0.4 },
          { kind: 'sprite', icon: '🔋', path: [[600, 220]], size: 100, from: 0.6 },
          { kind: 'particles', box: [745, 500, 70, 170], count: 8, color: CHLORINE, motion: 'rise', size: 12, from: 2.5 },
          { kind: 'label', at: [420, 560], pos: [200, 400], text: '阴极：长出铜', from: 4 },
          { kind: 'label', at: [780, 480], pos: [1010, 360], text: '阳极：氯气', from: 5 },
          { kind: 'formula', at: [600, 860], text: 'CuCl₂ =电解= Cu + Cl₂↑', from: 7 },
        ],
      },
      {
        turn: 2,
        title: '正负相吸分两队',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [600, 540], size: [700, 380], liquid: COPPER_SOL, level: 0.78, from: 0 },
          { kind: 'shape', shape: 'rect', at: [340, 500], size: [50, 320], color: GRAPHITE, from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [860, 500], size: [50, 320], color: GRAPHITE, from: 0.3 },
          { kind: 'text', at: [340, 290], text: '阴极 −', size: 's', from: 0.6 },
          { kind: 'text', at: [860, 290], text: '阳极 +', size: 's', from: 0.8 },
          { kind: 'atom', path: [[720, 560], [385, 560]], symbol: 'Cu', charge: '2+', color: CU_ION, r: 30, travel: 4, from: 1.6 },
          { kind: 'atom', path: [[480, 650], [815, 650]], symbol: 'Cl', charge: '−', color: CL_ION, r: 28, travel: 4, from: 2 },
          { kind: 'text', at: [600, 850], text: '电子不下水，离子搬电荷', size: 's', from: 7 },
        ],
      },
      {
        turn: 3,
        title: '食盐水：冒氢不出钠',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [600, 400], size: [640, 340], liquid: BRINE, level: 0.78, label: '饱和食盐水', from: 0 },
          { kind: 'shape', shape: 'rect', at: [440, 400], size: [46, 260], color: GRAPHITE, from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [760, 400], size: [46, 260], color: GRAPHITE, from: 0.3 },
          { kind: 'particles', box: [410, 340, 60, 180], count: 7, color: '#ffffff', motion: 'rise', size: 12, from: 1.5 },
          { kind: 'particles', box: [730, 340, 60, 180], count: 7, color: CHLORINE, motion: 'rise', size: 12, from: 1.8 },
          { kind: 'label', at: [440, 320], pos: [220, 230], text: '阴极：氢气', from: 3 },
          { kind: 'label', at: [760, 320], pos: [990, 230], text: '阳极：氯气', from: 3.6 },
          { kind: 'myth', wrong: '有钠离子就会析出钠', right: '水抢先接电子，放出氢气', from: 6 },
        ],
      },
      {
        turn: 4,
        title: '阴极周围变红',
        duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [600, 540], size: [640, 380], liquid: BRINE, level: 0.78, from: 0 },
          { kind: 'shape', shape: 'circle', at: [440, 600], size: [240, 220], color: PINK, motion: 'grow', over: 3, from: 3 },
          { kind: 'shape', shape: 'rect', at: [440, 520], size: [46, 300], color: GRAPHITE, from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [760, 520], size: [46, 300], color: GRAPHITE, from: 0.3 },
          { kind: 'particles', box: [410, 460, 60, 200], count: 6, color: '#ffffff', motion: 'rise', size: 12, from: 0.6 },
          { kind: 'particles', box: [350, 560, 180, 110], count: 4, color: '#ffd6bf', symbol: 'OH⁻', motion: 'jitter', size: 24, from: 2 },
          { kind: 'label', at: [520, 640], pos: [960, 770], text: '酚酞变红：有碱', from: 4.8 },
          { kind: 'text', at: [600, 850], text: '阴极周围生成了烧碱', size: 'm', from: 7.4 },
        ],
      },
      {
        turn: 5,
        title: '铜从阳极搬家',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [600, 560], size: [640, 360], liquid: COPPER_SOL, level: 0.75, label: '铜盐溶液', from: 0 },
          { kind: 'shape', shape: 'rect', at: [420, 520], size: [80, 280], color: KEY, text: '钥匙', tint: { color: COPPER, at: 4, over: 5 }, from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [780, 520], size: [80, 280], color: COPPER, text: '铜片', motion: 'shrink', over: 10, from: 0.3 },
          { kind: 'flow', path: [[780, 380], [780, 230], [420, 230], [420, 380]], color: ELECTRON, count: 6, speed: 160, size: 11, from: 1 },
          { kind: 'sprite', icon: '🔋', path: [[600, 230]], size: 90, from: 0.8 },
          { kind: 'atom', path: [[740, 590], [462, 610]], symbol: 'Cu', charge: '2+', color: CU_ION, r: 28, travel: 3, from: 2 },
          { kind: 'atom', path: [[740, 520], [462, 530]], symbol: 'Cu', charge: '2+', color: CU_ION, r: 28, travel: 3, from: 4.5 },
          { kind: 'text', at: [600, 850], text: '铜搬了家，钥匙穿铜衣', size: 'm', from: 8 },
        ],
      },
    ],
  },
};
