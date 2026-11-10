import type { Story } from './types';

const COLA = '#8a4b2a';
const BUBBLE = '#ffffff';
const PRESSURE = '#ff8a3d';

export const mentosCola: Story = {
  slug: 'mentos-cola',
  title: '曼妥思丢进可乐，为什么会喷出一米多高的喷泉？',
  trigger: '公园里一个大哥哥往一大瓶可乐里丢了几颗曼妥思，可乐“噗”地喷得比小念还高。',
  dialogue: [
    {
      nian: '爸爸，可乐为什么会喷那么高？是曼妥思和可乐发生了化学反应吗？',
      dad: '主要不是化学反应，是可乐里憋着的气一下子全跑了出来。工厂灌可乐时，用很大的压力把二氧化碳压进水里，一瓶 2 升的可乐大约溶着 15 克二氧化碳。要是全变回气体，差不多有 8 升，能装满好几个可乐瓶。曼妥思只是让它们同时往外冲。',
      eq: 'CO₂（气体） ⇌ CO₂（溶在水里）    H₂O + CO₂ ⇌ H₂CO₃',
      figure: {
        kind: 'table',
        caption: '二氧化碳由一个碳原子和两个氧原子组成（圈出来的两格）。它溶进水里，有一点会变成碳酸，所以汽水微微发酸。',
        paint: 'category',
        focus: { by: 'atoms', values: [6, 8] },
        ring: [6, 8],
      },
      show: { kind: 'lab', step: 0, label: '看可乐里压着多少气' },
    },
    {
      nian: '二氧化碳憋在水里想跑，为什么平时打开瓶盖只是慢慢冒泡？',
      dad: '因为气泡“出生”很难。开盖后压力变小，水里的二氧化碳本来就想跑，可要在光溜溜的水里凭空鼓出一个新气泡，得先撑开一个小洞，特别费劲。所以它们大多慢吞吞地从瓶壁的小划痕上一个个冒出来，就像一屋子人想出去，门却很窄。',
      show: { kind: 'lab', step: 1, label: '看气泡为什么难出生' },
    },
    {
      nian: '小划痕能帮气泡出生？那曼妥思上面也有划痕吗？',
      dad: '对！曼妥思看着光溜溜，放大了看却坑坑洼洼，像月球表面，有数不清的小坑。每个小坑里藏着一点空气，二氧化碳不用费劲开洞，直接往里钻就行，这些小坑叫成核点。曼妥思又重，一下沉到瓶底，一路上到处冒出新气泡，气泡越胀越大，可乐只能被推着往瓶口冲。',
      show: { kind: 'lab', step: 1, label: '看曼妥思表面的小坑' },
    },
    {
      nian: '成核点都一样多，为什么网上说用无糖可乐喷得更高？',
      dad: '曼妥思一样，可乐里的配料不一样。科学家做过实验：无糖可乐里的甜味剂阿斯巴甜、防腐剂苯甲酸钠和香精，会让气泡变得更小、不容易合成大泡。小泡多，和可乐接触的面积大，气跑得更快，喷泉就更高；含糖可乐稠一点，气泡反而慢。很多人以为是酸碱反应在冒气，其实主要是溶着的气跑了出来。',
      show: { kind: 'lab', step: 2, label: '比一比含糖和无糖' },
    },
    {
      nian: '气泡越小喷得越高？那摇过的可乐一开盖也会喷，是同一个道理吗？',
      dad: '是同一个道理。摇晃会把瓶子上方的空气打成无数小气泡混进可乐，它们就成了现成的成核点，一开盖，二氧化碳全往里钻。所以摇过的汽水先放一会儿，等小气泡浮上去再慢慢拧开。热可乐也更容易喷，因为温度越高，水里能溶的气越少。',
      show: { kind: 'lab', step: 3, label: '看摇过的可乐' },
    },
    {
      nian: '我懂了！可乐里压着很多二氧化碳，开盖后它想跑，可新气泡很难出生；曼妥思表面全是小坑，给气泡当“产房”，一下子冒出好多气泡，就把可乐推出瓶口了。摇过的、热的可乐也会这样！',
      dad: '完全正确！做这个实验要去空旷的户外，瓶口别对着人，丢完糖马上往后退。喷出来的可乐黏糊糊的，会招来蚂蚁，记得把地面冲干净，空瓶扔进可回收物桶。',
    },
  ],
  tip: '曼妥思喷泉主要是物理过程：溶解的二氧化碳在糖果表面的微小坑洞（成核点）上迅速析出。户外做实验时让孩子戴上眼镜、瓶口朝天、远离人群和车辆。网上流传“吃曼妥思再喝可乐会撑爆肚子”是谣言，但一次喝太多碳酸饮料会胀气不适，别让孩子故意尝试。文中数字和配料实验参考了 Compound Interest 的可乐喷泉图解，以及 Kuntzleman 等发表在《化学教育杂志》上的研究。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '压进瓶里的气',
        duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [420, 500], size: [300, 460], liquid: COLA, level: 0.85, label: '一瓶 2 升可乐', from: 0 },
          { kind: 'particles', box: [300, 340, 240, 360], count: 14, color: BUBBLE, size: 9, motion: 'jitter', from: 0.6 },
          { kind: 'count', at: [900, 330], label: '溶着的气', start: 0, end: 15, unit: '克', over: 2, from: 1.6 },
          { kind: 'count', at: [900, 540], label: '变回气体', start: 0, end: 8, unit: '升', over: 2, from: 4 },
          { kind: 'text', at: [600, 820], text: '憋着好多二氧化碳', size: 'm', from: 6.5 },
        ],
      },
      {
        turn: 1,
        title: '新气泡很难出生',
        duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [400, 500], size: [300, 440], liquid: COLA, level: 0.85, label: '刚开盖', from: 0 },
          { kind: 'particles', box: [300, 340, 200, 320], count: 3, color: BUBBLE, size: 12, motion: 'rise', from: 1 },
          { kind: 'meter', at: [880, 320], label: '冒泡速度', start: 0, end: 0.15, color: PRESSURE, over: 2, from: 1.5 },
          { kind: 'sprite', icon: '🚪', path: [[880, 540]], size: 120, from: 3 },
          { kind: 'text', at: [600, 820], text: '挤在屋里，门太窄', size: 'm', from: 5 },
        ],
      },
      {
        turn: 2,
        title: '坑坑洼洼的糖',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 440], size: [380, 380], color: '#f6f1e6', outline: true, text: '曼妥思', from: 0 },
          { kind: 'label', at: [500, 360], pos: [250, 230], text: '小坑里藏着空气', from: 1.5 },
          { kind: 'pulse', at: [600, 440], color: '#9ec5fe', radius: 260, from: 3 },
          { kind: 'particles', box: [430, 250, 340, 360], count: 16, color: '#d0ebff', size: 11, motion: 'rise', amount: { at: 3, over: 3, from: 0, to: 16 }, from: 2.8 },
          { kind: 'text', at: [600, 800], text: '成核点：气泡的产房', size: 'm', from: 6 },
        ],
      },
      {
        turn: 2,
        title: '沉到瓶底一路冒泡',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [480, 500], size: [300, 480], liquid: COLA, level: 0.6, rise: { to: 0.98, at: 3, over: 2 }, from: 0 },
          { kind: 'sprite', icon: '⚪', path: [[480, 250], [480, 700]], size: 56, travel: 2, from: 0.6 },
          { kind: 'particles', box: [350, 300, 260, 420], count: 22, color: BUBBLE, size: 11, motion: 'rise', amount: { at: 2.4, over: 2.5, from: 0, to: 22 }, from: 2 },
          { kind: 'meter', at: [920, 330], label: '瓶里压力', start: 0.3, end: 0.95, color: PRESSURE, over: 2.5, from: 2.6 },
          { kind: 'flow', path: [[480, 270], [480, 150]], color: COLA, count: 8, size: 16, speed: 300, from: 5 },
          { kind: 'text', at: [600, 830], text: '可乐被推出瓶口', size: 'm', from: 6.5 },
        ],
      },
      {
        turn: 3,
        title: '小泡越多喷越高',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [330, 520], size: [240, 400], liquid: COLA, level: 0.8, label: '含糖可乐', from: 0 },
          { kind: 'particles', box: [250, 380, 160, 280], count: 5, color: BUBBLE, size: 24, motion: 'rise', from: 0.8 },
          { kind: 'vessel', vessel: 'beaker', at: [870, 520], size: [240, 400], liquid: COLA, level: 0.8, label: '无糖可乐', from: 1.6 },
          { kind: 'particles', box: [790, 380, 160, 280], count: 18, color: BUBBLE, size: 9, motion: 'rise', from: 2.4 },
          { kind: 'myth', wrong: '是酸碱反应在冒气', right: '溶着的气跑了出来', from: 6.5 },
        ],
      },
      {
        turn: 4,
        title: '摇过就有气泡种子',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [420, 520], size: [300, 440], liquid: COLA, level: 0.8, label: '摇过的可乐', from: 0 },
          { kind: 'particles', box: [300, 340, 240, 330], count: 14, color: BUBBLE, size: 8, motion: 'jitter', amount: { at: 5, over: 3, from: 14, to: 2 }, from: 0.8 },
          { kind: 'label', at: [420, 420], pos: [820, 260], text: '小气泡就是种子', from: 2, to: 6 },
          { kind: 'sprite', icon: '⏳', path: [[880, 470]], size: 120, from: 4.2 },
          { kind: 'text', at: [600, 820], text: '先放一放再开盖', size: 'm', from: 7 },
        ],
      },
    ],
  },
};
