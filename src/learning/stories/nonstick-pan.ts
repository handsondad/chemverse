import type { Story } from './types';

const CARBON = '#475569';
const FLUORINE = '#34d399';
const PAN = '#334155';
const PRIMER = '#94a3b8';
const EGG = '#fde047';
const HEAT = '#e8590c';

export const nonstickPan: Story = {
  slug: 'nonstick-pan',
  title: '不粘锅既没涂油也没抹蜡，煎鸡蛋为什么滑溜溜一点都不粘？',
  trigger: '周末早上爸爸用深灰色的不粘锅煎荷包蛋，没放一滴油，轻轻一晃锅柄，荷包蛋就像在冰面上溜冰一样滑进了盘子里。',
  dialogue: [
    {
      nian: '爸爸，铁锅不放油煎蛋准会粘底，这口不粘锅连一滴油都没放，鸡蛋怎么滑溜溜就下来了？',
      dad: '因为锅面上涂了一层特别“高冷”的材料，叫聚四氟乙烯。它的骨架是一条长长的碳链，每个碳原子上都死死绑着两个氟原子，像给碳链穿上了一身密不透风的氟原子铠甲。不管是水、油还是黏糊糊的蛋清，伸手过来都抓不住这身铠甲，只能在上面打滑。',
      eq: 'n CF₂=CF₂ →（聚合） —[CF₂—CF₂]ₙ—（聚四氟乙烯）',
      figure: {
        kind: 'table',
        paint: 'en',
        ring: [6, 9],
        caption: '电负性地图：右上角的氟（F）是整张周期表里最会抢电子的冠军，把碳（C）链裹得严严实实。',
        link: { mode: 'en', label: '在周期表里看「电负性」' },
      },
      show: { kind: 'lab', step: 0, label: '看「氟原子铠甲」' },
    },
    {
      nian: '氟原子铠甲为什么连水和油都抓不住？它到底厉害在哪儿？',
      dad: '厉害在氟原子把电子抱得太紧了！平时两样东西能粘在一起，靠的是分子靠近时电子云互相吸引，这叫范德华力。可氟是全周期表最会抢电子的元素，碳氟键又短又结实，外围一圈氟原子的电子云纹丝不动，谁凑过来都擦不出一点吸引的火花，鸡蛋自然一推就滑走。',
      figure: {
        kind: 'shells',
        atoms: [6, 9],
        caption: '碳（2·4）的四个外层电子与氟（2·7）结成极牢固的共价键，氟把电子紧紧锁在身边不外借。',
      },
    },
    {
      nian: '既然它和谁都擦不出吸引的火花，那这层不粘涂层自己是怎么粘在锅底上的？',
      dad: '你问到最妙的地方了！靠化学吸引确实粘不住，工程师用的是“物理钩子”。工厂先用高速细沙把金属锅底打出无数肉眼看不见的小凹坑，喷上一层底漆钻进坑里，高温烧硬，就像树根牢牢扎进石缝；接着再把聚四氟乙烯面层融合上去，靠机械咬合稳稳扒在锅底。',
      show: { kind: 'lab', step: 1, label: '看「怎么粘锅底」' },
    },
    {
      nian: '原来是像树根一样钩在凹坑里！那妈妈为什么不准用铁铲和钢丝球刷不粘锅？',
      dad: '因为铁铲和钢丝球比涂层硬得多！用力一铲一刷，就会把表面那层薄薄的氟原子铠甲刮出深沟，甚至把底下的“树根”直接铲断，露出了里面的铝锅底，鸡蛋一煎就又粘住了。用圆润的木铲或硅胶铲，等锅稍微凉一点再用软海绵洗，铠甲才不会受伤。',
    },
    {
      nian: '只要换上木铲不刮伤它，不粘锅就能随便开大火烧吗？',
      dad: '不能空锅大火干烧！很多人习惯先把空锅烧到冒烟再下菜，这对铁锅没事，对不粘锅却是大忌。正常炒菜有水有油，锅温在一百多到两百摄氏度，涂层稳得很；可空锅大火干烧一两分钟就能冲过 260 ℃ 的安全线，再往上碳链就会断掉，冒出难闻又有毒的烟气。',
      figure: {
        kind: 'scale',
        axis: '不粘锅的温度红线 →',
        stops: [
          { label: '日常煎炒', note: '100～200℃稳', color: '#bbf7d0', hot: true },
          { label: '安全上限', note: '约260℃红线', color: '#fde68a' },
          { label: '空锅干烧', note: '超300℃分解！', color: '#fca5a5' },
        ],
        caption: '日常有食材时锅温远低于 260 ℃；唯独空锅大火干烧会迅速超温，破坏聚四氟乙烯长链。',
      },
      show: { kind: 'lab', step: 2, label: '看「温度红线」' },
    },
    {
      nian: '我懂了！不粘锅表面是聚四氟乙烯，氟原子把电子抱得死死的，食物抓不住它；它靠微小凹坑机械钩在锅底，所以怕铁铲和钢丝球刮，也怕超过 260 ℃ 空锅干烧！',
      dad: '说得清清楚楚！以后帮爸爸煎鸡蛋记住三句话：先倒一点油或食材再开中小火，只拿硅胶铲或木铲翻面，涂层要是大面积起皮花了就及时换新锅。',
    },
  ],
  tip: '聚四氟乙烯（PTFE）常态下化学性质极其稳定，偶然误食微小脱落碎屑也不会被人体消化吸收；真正需要防范的是空锅大火干烧超过 260～300 ℃ 引发的热分解烟气（对笼养宠物鸟尤为危险）。使用时请先放油或食物再开中小火，配合木铲或耐热硅胶铲，用软布清洗。资料参考美国化学会《化学与工程新闻》（C&EN）不粘炊具专题与高分子材料手册。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '碳链穿上氟铠甲',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 560], size: [780, 38], color: CARBON, text: '碳链骨架', from: 0.3 },
          { kind: 'atom', path: [[300, 485]], symbol: 'F', color: FLUORINE, r: 34, from: 0.8 },
          { kind: 'atom', path: [[450, 485]], symbol: 'F', color: FLUORINE, r: 34, from: 1 },
          { kind: 'atom', path: [[600, 485]], symbol: 'F', color: FLUORINE, r: 34, from: 1.2 },
          { kind: 'atom', path: [[750, 485]], symbol: 'F', color: FLUORINE, r: 34, from: 1.4 },
          { kind: 'atom', path: [[900, 485]], symbol: 'F', color: FLUORINE, r: 34, from: 1.6 },
          { kind: 'sprite', icon: '🍳', path: [[260, 340], [920, 340]], size: 95, travel: 2.8, from: 2.6 },
          { kind: 'text', at: [600, 820], text: '聚四氟乙烯：一推就滑走', size: 'm', from: 6.2 },
        ],
      },
      {
        turn: 1,
        title: '电子抱紧不搭手',
        duration: 11,
        cues: [
          { kind: 'bond', a: [520, 480], b: [680, 480], color: '#1f6b55', from: 0.4 },
          { kind: 'atom', path: [[520, 480]], symbol: 'C', color: CARBON, r: 52, from: 0.3 },
          { kind: 'atom', path: [[680, 480]], symbol: 'F', color: FLUORINE, r: 52, from: 0.5 },
          { kind: 'shape', shape: 'circle', at: [600, 250], size: [180, 110], color: EGG, text: '蛋清分子', slide: { to: [940, 250], at: 3.4, over: 2.2 }, from: 1.4 },
          { kind: 'label', at: [680, 420], pos: [930, 560], text: '碳氟键牢，吸引力极弱', from: 2.4 },
          { kind: 'text', at: [600, 820], text: '水和油都找不到抓手', size: 'm', from: 6.2 },
        ],
      },
      {
        turn: 2,
        title: '小凹坑钩住涂层',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 620], size: [760, 140], color: PAN, text: '打毛的金属锅底', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [380, 535], size: [90, 60], color: PRIMER, from: 1.2 },
          { kind: 'shape', shape: 'rect', at: [600, 535], size: [90, 60], color: PRIMER, from: 1.4 },
          { kind: 'shape', shape: 'rect', at: [820, 535], size: [90, 60], color: PRIMER, from: 1.6 },
          { kind: 'shape', shape: 'rect', at: [600, 470], size: [760, 74], color: FLUORINE, text: '不粘面层', from: 2.8 },
          { kind: 'label', at: [600, 535], pos: [600, 280], text: '底漆扎进微坑咬合', from: 3.8 },
          { kind: 'text', at: [600, 830], text: '不靠胶水，靠机械小钩子', size: 'm', from: 6.8 },
        ],
      },
      {
        turn: 3,
        title: '铁铲会刮破铠甲',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'pill', at: [330, 440], size: [260, 110], color: '#fee2e2', text: '铁铲·钢丝球', from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [870, 440], size: [260, 110], color: '#dcfce7', text: '木铲·硅胶铲', from: 1 },
          { kind: 'text', at: [330, 590], text: '刮断钩子易粘锅', size: 's', color: '#b03f38', from: 2.2 },
          { kind: 'text', at: [870, 590], text: '温柔翻炒护涂层', size: 's', color: '#1f6b55', from: 2.8 },
          { kind: 'text', at: [600, 810], text: '软海绵清洗，寿命长得多', size: 'm', from: 5.4 },
        ],
      },
      {
        turn: 4,
        title: '别让空锅大火干烧',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [440, 470], size: [440, 52], color: PAN, text: '空锅干烧', from: 0.2 },
          { kind: 'sprite', icon: '🔥', path: [[440, 580]], size: 95, wobble: true, from: 0.6 },
          { kind: 'count', at: [880, 320], label: '安全上限', start: 180, end: 260, unit: '℃', over: 2.5, from: 1.2 },
          { kind: 'particles', box: [300, 260, 280, 140], count: 8, color: '#94a3b8', motion: 'rise', size: 15, from: 3.4 },
          { kind: 'myth', wrong: '空锅烧到冒烟再下菜更香', right: '不粘锅先放油和菜，开中小火', from: 6.4 },
        ],
      },
      {
        turn: 5,
        title: '护锅三件小事',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'pill', at: [230, 420], size: [230, 96], color: '#fef3c7', text: '先放油菜', from: 0.4 },
          { kind: 'arrow', path: [[360, 420], [460, 420]], color: HEAT, from: 1.2 },
          { kind: 'shape', shape: 'pill', at: [600, 420], size: [230, 96], color: '#dcfce7', text: '中小火炒', from: 1.8 },
          { kind: 'arrow', path: [[730, 420], [830, 420]], color: HEAT, from: 2.6 },
          { kind: 'shape', shape: 'pill', at: [970, 420], size: [230, 96], color: '#dbeafe', text: '木硅胶铲', from: 3.2 },
          { kind: 'text', at: [600, 790], text: '氟铠甲完好，煎蛋一直滑', size: 'm', color: '#1f6b55', from: 5.2 },
        ],
      },
    ],
  },
};
