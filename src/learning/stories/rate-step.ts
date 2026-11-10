import { lessonAsset } from '../assets';
import type { Story } from './types';

const WARM = '#e0762b';
const COLD = '#4c6ef5';
const SULFUR = '#e9d77a';
const SLOW = '#9cc3ff';
const FAST = '#ff8a6b';
const GATE = '#d9b77a';
const CATALYST = '#7fc8a0';
const OXYGEN = '#ffc2bc';
const ACID = '#eef4fb';
const MARBLE = '#e9e3d6';

export const rateStep: Story = {
  slug: 'rate-step',
  title: '牛奶放桌上半天就酸了，放进冰箱却能放好几天：反应的快慢到底由什么决定？',
  trigger: '夏天小念忘了把牛奶放回冰箱，下午一喝已经酸了；同一盒奶放在冰箱里，却好好地放了好几天。',
  dialogue: [
    {
      nian: '同一盒牛奶，为什么放桌上半天就酸，放冰箱就能放好几天？',
      dad: '因为变酸是一串化学反应：牛奶里的细菌用酶把乳糖变成乳酸。反应有快有慢，温度一低，就像给它踩了刹车。冰箱里只有 4 ℃ 左右，比夏天的屋里低二三十度，反应慢了好多倍，牛奶就能多放几天。一个反应进行得多快，叫反应速率。',
      show: { kind: 'lab', step: 0, label: '看「认识实验台」' },
    },
    {
      nian: '反应速率要怎么比快慢？总不能光靠闻一闻、尝一尝吧？',
      dad: '要把快慢变成能比的数。有个经典实验：硫代硫酸钠和稀硫酸一混，溶液会慢慢变浑，因为生成了很细的硫。在杯底画个黑十字，从上往下看，数一数十字过多少秒看不见了，就知道这个反应有多快。比的时候一次只改一个条件、别的都一样，这叫控制变量。',
      eq: 'Na₂S₂O₃ + H₂SO₄ = Na₂SO₄ + SO₂↑ + S↓ + H₂O',
      show: { kind: 'lab', step: 4, label: '看「定量测速率」' },
    },
    {
      nian: '一次只改一个条件的话，先把浓度改一改会怎样？',
      dad: '浓度越大越快。把硫代硫酸钠稀释成一半，变浑要等的时间差不多翻一倍。道理就像课间的走廊：人越挤，两个人撞上的机会越多。分子也要撞在一起才可能反应，同样大的地方分子越多，每秒撞上的次数就越多。',
      show: { kind: 'lab', step: 1, label: '看「浓度」' },
    },
    {
      nian: '撞上就一定能反应吗？温度又是怎么让它变快的？',
      dad: '不是每次撞上都算数。分子得撞得够猛，才能把旧的化学键撞开，这道门槛叫活化能，跨得过去的叫活化分子。温度一高，分子跑得更快，能跨过门槛的一下多了很多。很多反应温度每升高 10 ℃，速率会变成原来的 2 到 4 倍；冰箱正好反过来，把大多数分子拦在了门槛前。',
      eq: '升高温度 → 活化分子变多 → 有效碰撞变多 → 速率增大',
      show: { kind: 'lab', step: 2, label: '看「温度」' },
    },
    {
      nian: '门槛那么高，有没有办法不加热，也让更多分子跨过去？',
      dad: '有，加催化剂。它不是把分子推过门槛，而是另开一条矮一点的小路。双氧水自己分解很慢，撒一小撮二氧化锰，气泡马上密密麻麻。洗衣粉里的酶也是催化剂，专门对付奶渍、血渍里的蛋白质。很多人以为催化剂会被用掉，其实反应前后它的质量和化学性质都不变。',
      eq: '2H₂O₂ =MnO₂= 2H₂O + O₂↑',
      show: { kind: 'lab', step: 3, label: '看「催化剂」' },
      figure: {
        kind: 'image',
        src: lessonAsset('covers/rate-step.webp'),
        alt: '三支装着双氧水的试管，右边一支底部有黑色粉末、气泡最多',
        caption: '三支试管里都是双氧水：左边什么都没加，气泡稀稀拉拉；中间加了一点氯化铁，右边撒了黑色的二氧化锰，气泡密多了。',
      },
    },
    {
      nian: '催化剂开小路、温度添力气、浓度添人手，那把冰糖敲碎化得快，也是一个道理吗？',
      dad: '思路是一样的：东西碎了，和水接触的表面变大，同一时间能干活的地方变多。不过冰糖溶解是物理变化，不是化学反应。真要比化学反应，就把块状和粉末状的大理石分别丢进稀盐酸，粉末冒泡快得多。菜切细了熟得快、木屑比木块好点着，也是接触面积在帮忙。',
      eq: 'CaCO₃ + 2HCl = CaCl₂ + H₂O + CO₂↑',
    },
    {
      nian: '我懂了！反应要靠分子撞上、还得撞得够猛：浓度大撞得多，温度高撞得猛，催化剂把门槛放低，弄碎了接触面就大；冰箱就是让牛奶里的反应慢下来。',
      dad: '说得太好了！记一条好习惯：牛奶、剩菜趁早放进冰箱。不过冰箱只是让反应变慢，不是让它停下，放久了照样会坏，还是要按保质期吃。',
    },
  ],
  tip: '硫代硫酸钠与硫酸反应会放出有刺激性的二氧化硫，较浓的过氧化氢有腐蚀性，相关实验请在老师指导下进行。冷藏只能减慢变质，不能无限延长保质期；乳制品开封后请按包装要求尽快食用。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '热了酸得快',
        duration: 10,
        cues: [
          { kind: 'sprite', icon: '🥛', path: [[330, 420]], size: 140, from: 0.2 },
          { kind: 'sprite', icon: '🥛', path: [[870, 420]], size: 140, from: 0.4 },
          { kind: 'text', at: [330, 240], text: '桌上 30 ℃', size: 's', color: WARM, from: 0.8 },
          { kind: 'text', at: [870, 240], text: '冰箱 4 ℃', size: 's', color: COLD, from: 1 },
          { kind: 'meter', at: [330, 640], label: '变酸进度', start: 0, end: 0.9, color: WARM, over: 5, from: 1.6 },
          { kind: 'meter', at: [870, 640], label: '变酸进度', start: 0, end: 0.18, color: COLD, over: 5, from: 1.6 },
          { kind: 'sprite', icon: '❄️', path: [[1040, 330]], size: 70, wobble: true, from: 2.4 },
          { kind: 'text', at: [600, 830], text: '温度低，反应慢', size: 'm', from: 7 },
        ],
      },
      {
        turn: 1,
        title: '黑十字消失',
        duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [560, 500], size: [420, 400], liquid: ACID, level: 0.7, tint: { color: '#f1ead0', at: 2, over: 5 }, from: 0 },
          { kind: 'text', at: [560, 620], text: '✕', size: 'l', color: '#3d3a36', from: 0.4, to: 6.4 },
          { kind: 'particles', box: [380, 450, 360, 220], count: 14, color: SULFUR, motion: 'jitter', size: 10, amount: { at: 2, over: 5, from: 0, to: 14 }, from: 1.5 },
          { kind: 'label', at: [560, 640], pos: [220, 330], text: '十字看不见了', from: 6.6 },
          { kind: 'sprite', icon: '⏱️', path: [[960, 300]], size: 90, wobble: true, from: 1.5 },
          { kind: 'label', at: [680, 520], pos: [970, 480], text: '生成很细的硫', from: 3.4 },
          { kind: 'formula', at: [600, 830], text: 'Na₂S₂O₃ + H₂SO₄ = Na₂SO₄ + SO₂↑ + S↓ + H₂O', from: 7 },
        ],
      },
      {
        turn: 2,
        title: '人越挤，撞得越多',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [330, 450], size: [420, 360], color: '#fffaf0', outline: true, from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [870, 450], size: [420, 360], color: '#fffaf0', outline: true, from: 0.2 },
          { kind: 'text', at: [330, 220], text: '稀', size: 'm', from: 0.6 },
          { kind: 'text', at: [870, 220], text: '浓', size: 'm', from: 0.8 },
          { kind: 'particles', box: [150, 300, 360, 300], count: 4, color: SLOW, motion: 'gas', size: 26, from: 1.2 },
          { kind: 'particles', box: [690, 300, 360, 300], count: 14, color: SLOW, motion: 'gas', size: 26, from: 1.6 },
          { kind: 'pulse', at: [870, 450], color: WARM, radius: 170, rate: 2, from: 4 },
          { kind: 'text', at: [600, 790], text: '分子越多，撞得越勤', size: 'm', from: 7 },
        ],
      },
      {
        turn: 3,
        title: '跨过门槛',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 560], size: [60, 180], color: GATE, from: 0.2 },
          { kind: 'label', at: [600, 470], pos: [600, 230], text: '活化能：要撞够猛', from: 0.8 },
          { kind: 'atom', path: [[180, 620], [540, 620], [360, 620]], symbol: '', color: SLOW, r: 30, travel: 2.6, from: 1.2 },
          { kind: 'sprite', icon: '🌡️', path: [[1060, 420]], size: 80, from: 4.2 },
          { kind: 'atom', path: [[180, 640], [560, 330], [650, 330], [1000, 640]], symbol: '', color: FAST, r: 30, travel: 2, from: 4.8 },
          { kind: 'meter', at: [900, 760], label: '活化分子', start: 0.15, end: 0.6, color: WARM, over: 3, from: 6 },
          { kind: 'text', at: [380, 830], text: '温度高，跨过的更多', size: 's', from: 8.4 },
        ],
      },
      {
        turn: 4,
        title: '另开一条矮路',
        duration: 12,
        cues: [
          { kind: 'text', at: [300, 200], text: '不加催化剂', size: 's', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [600, 270], size: [50, 160], color: GATE, from: 0.3 },
          { kind: 'atom', path: [[180, 330], [560, 330], [380, 330]], symbol: '', color: SLOW, r: 28, travel: 2.4, from: 1 },
          { kind: 'shape', shape: 'rect', at: [600, 580], size: [50, 60], color: CATALYST, from: 3.6 },
          { kind: 'label', at: [600, 550], pos: [840, 440], text: '催化剂：矮门槛', from: 4 },
          { kind: 'atom', path: [[180, 610], [560, 530], [640, 530], [1000, 610]], symbol: '', color: FAST, r: 28, travel: 1.6, from: 5 },
          { kind: 'particles', box: [900, 470, 180, 140], count: 8, color: OXYGEN, symbol: 'O₂', motion: 'rise', size: 22, from: 6.4 },
          { kind: 'myth', wrong: '催化剂会被用掉', right: '反应前后它的质量不变', from: 8.2 },
        ],
      },
      {
        turn: 5,
        title: '碎了接触面大',
        duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [330, 520], size: [340, 380], liquid: ACID, level: 0.7, label: '大理石块', from: 0 },
          { kind: 'vessel', vessel: 'beaker', at: [870, 520], size: [340, 380], liquid: ACID, level: 0.7, label: '大理石粉', from: 0 },
          { kind: 'shape', shape: 'rect', at: [330, 630], size: [140, 110], color: MARBLE, from: 0.4 },
          { kind: 'particles', box: [770, 610, 200, 70], count: 14, color: MARBLE, motion: 'jitter', size: 18, from: 0.6 },
          { kind: 'particles', box: [250, 420, 160, 150], count: 3, color: '#ffffff', motion: 'rise', size: 14, from: 1.6 },
          { kind: 'particles', box: [770, 400, 200, 190], count: 16, color: '#ffffff', motion: 'rise', size: 14, from: 1.6 },
          { kind: 'text', at: [600, 850], text: '接触面大，反应快', size: 'm', from: 7 },
        ],
      },
    ],
  },
};
