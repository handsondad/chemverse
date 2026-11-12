import { lessonAsset } from '../assets';
import type { Story, Vec } from './types';

const SODIUM = '#b48cff';
const OXYGEN = '#ff6b5e';
const HYDROGEN = '#f4f4f0';
const ELECTRON = '#ffcf3f';
const PINK = '#ff7aa8';
const WATER = '#d8efff';

/** 绕 (cx, cy) 一整圈的路线，给绕核运动的电子用 */
const ring = (cx: number, cy: number, r: number): Vec[] =>
  Array.from({ length: 49 }, (_, i) => [cx + r * Math.cos((i / 48) * Math.PI * 2 - Math.PI / 2), cy + r * Math.sin((i / 48) * Math.PI * 2 - Math.PI / 2)] as Vec);

export const sodiumStep: Story = {
  slug: 'sodium-step',
  title: '金属不是都会沉底吗？为什么一小块钠丢进水里，会浮着乱窜还嘶嘶响？',
  trigger: '实验视频里，老师把绿豆大的一粒钠丢进滴了酚酞的水里：它浮在水面缩成小银球，嘶嘶地四处乱跑，水也慢慢变红了。',
  dialogue: [
    {
      nian: '金属不都是沉下去的吗？钠为什么能浮在水面上，还缩成一个小球到处乱跑？',
      dad: '因为钠是一种很特别的金属：它比水还轻，所以浮着；它和水一碰就剧烈反应、放出大量的热，把自己熔成了小球；反应冒出的气体推着它四处跑，嘶嘶声就是气体冲出来的声音。老师们把看到的现象编成五个字：浮、熔、游、响、红。',
      show: {
        kind: 'steps',
        frames: [
          { icon: '🪶', label: '浮：比水轻' },
          { icon: '💧', label: '熔：熔成小球' },
          { icon: '🏃', label: '游：四处游动' },
          { icon: '🔊', label: '响：嘶嘶作响' },
          { icon: '🔴', label: '红：酚酞变红' },
        ],
      },
    },
    {
      nian: '推着它跑的气体是什么？钠和水反应到底生成了什么？',
      dad: '是氢气。钠把水分子里的氢「挤」了出来，自己和剩下的部分结合成氢氧化钠，溶进了水里。这个反应放热很猛，而钠的熔点不到 98 ℃，比水烧开的温度还低，所以它一边反应，一边被自己放出的热熔成了亮晶晶的小球。',
      eq: '2Na + 2H₂O = 2NaOH + H₂↑',
      figure: {
        kind: 'image',
        src: lessonAsset('covers/sodium-step.webp'),
        alt: '金属钠与水反应的 3D 实验台画面',
        caption: '3D 实验台里的金属钠实验：钠浮在水面熔成亮晶晶的小球，反应生成的碱让酚酞变红。',
      },
      show: { kind: 'lab', step: 4, label: '看浮熔游响红' },
    },
    {
      nian: '那水变红又是怎么回事？难道氢氧化钠本身是红色的？',
      dad: '不是，氢氧化钠溶液是无色的。红色来自老师事先滴进水里的酚酞，它是一种「酸碱指示剂」，平时无色，一遇到碱就变红。水变红，正说明钠和水反应后生成了碱，看不见的产物就这样被「染」了出来。',
    },
    {
      nian: '同样是金属，铁和铜丢进冷水里都没动静，为什么钠和水反应这么猛？',
      dad: '秘密在原子的最外层。钠原子最外层只有 1 个电子，离原子核又比较远，被拉得很松，一碰到水就把这个电子交出去，自己变成钠离子。这种很容易把电子交给别人的本领，化学上叫「还原性」。钠的还原性特别强，所以连冷水都能和它反应。',
      figure: {
        kind: 'shells',
        atoms: [11, 26, 29],
        caption: '钠（Na，2·8·1）最外层只有 1 个电子，一碰冷水就交出去；铁（Fe）和铜（Cu）没这么急。',
      },
      show: { kind: 'lab', step: 6, label: '看进原子里' },
    },
    {
      nian: '钠这么急着交出电子，那它放在空气里会不会也出事？',
      dad: '会。刚切开的钠是银白色的，几秒钟就变暗，那是它在和空气里的氧气反应，表面长出了一层氧化钠；它还会和空气里的水汽反应。所以实验室把钠泡在煤油里保存：煤油不和钠反应，钠又比煤油重，沉在瓶底正好被隔绝在空气外面。',
      eq: '4Na + O₂ = 2Na₂O',
      figure: {
        kind: 'table',
        focus: { by: 'atoms', values: [8, 11] },
        ring: [11, 8],
        caption: '最左边的活泼金属钠（Na）遇上右上角的氧（O），切开后几秒钟就会反应变暗。',
        link: { category: 0, label: '在周期表里看碱金属' },
      },
      show: { kind: 'lab', step: 1, label: '看银白变暗' },
    },
    {
      nian: '钠连空气都不放过，要是它着火了，能用水浇灭吗？',
      dad: '千万不能！钠遇水会更猛地反应，放出的氢气还会跟着烧起来，越浇火越大。用二氧化碳灭火器也不行，钠燃烧生成的过氧化钠会和二氧化碳反应放出氧气，等于给火加料。正确做法是用干燥的沙土盖住，把空气隔开，火就灭了。',
      eq: '2Na₂O₂ + 2CO₂ = 2Na₂CO₃ + O₂',
      show: { kind: 'lab', step: 7, label: '看着火扑救' },
    },
    {
      nian: '我明白了！钠最外层那个电子特别容易交出去，所以它碰到水就抢着反应，放出的热把自己熔成小球，生成的氢气推着它跑，氢氧化钠让酚酞变红；着火了只能用干沙土盖。',
      dad: '一点没错，你把现象和原因连起来了！再记一条实验室规矩：钠要用镊子夹、在滤纸上用小刀切，绝不能用手直接拿，因为手上的汗水也会和它反应、灼伤皮肤；用剩的钠要放回煤油瓶，不能随手丢进水池。',
    },
  ],
  tip: '金属钠只能在学校实验室由老师演示，家中绝不要尝试。演示用绿豆大小的钠块即可，观察时与烧杯保持距离并佩戴护目镜；钠着火时用干燥沙土覆盖，禁止用水或二氧化碳灭火器扑救。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '浮、熔、游、响、红',
        duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [600, 580], size: [600, 380], liquid: WATER, level: 0.72, tint: { color: PINK, at: 7.6, over: 2.5 }, from: 0 },
          {
            kind: 'atom', symbol: 'Na', color: SODIUM, r: 38, travel: 8.5, from: 1,
            path: [[440, 512], [560, 506], [700, 516], [760, 504], [640, 512], [500, 506], [420, 514]],
          },
          { kind: 'text', at: [240, 175], text: '浮', size: 'l', color: '#4a5568', from: 1.5 },
          { kind: 'text', at: [420, 175], text: '熔', size: 'l', color: '#c2410c', from: 3 },
          { kind: 'text', at: [600, 175], text: '游', size: 'l', color: '#1f6b55', from: 4.5 },
          { kind: 'text', at: [780, 175], text: '响', size: 'l', color: '#7a6a55', from: 6 },
          { kind: 'text', at: [960, 175], text: '红', size: 'l', color: '#d6336c', from: 7.5 },
          { kind: 'sprite', icon: '🔊', path: [[960, 330]], size: 70, wobble: true, from: 6 },
        ],
      },
      {
        turn: 1,
        title: '钠把氢挤出来',
        duration: 11,
        cues: [
          { kind: 'bond', a: [620, 420], b: [665, 495], from: 0.3 },
          { kind: 'bond', a: [620, 420], b: [700, 380], from: 0.3, to: 3.2 },
          { kind: 'bond', a: [470, 420], b: [620, 420], color: '#b48cff', from: 3.3 },
          { kind: 'atom', path: [[200, 420], [470, 420]], symbol: 'Na', color: SODIUM, r: 44, travel: 2.2, from: 0.3 },
          { kind: 'atom', path: [[620, 420]], symbol: 'O', color: OXYGEN, r: 38, from: 0.3 },
          { kind: 'atom', path: [[665, 495]], symbol: 'H', color: HYDROGEN, r: 24, from: 0.4 },
          { kind: 'atom', path: [[700, 380]], symbol: 'H', color: HYDROGEN, r: 24, from: 0.4, to: 3.2 },
          { kind: 'atom', path: [[700, 380], [950, 230]], symbol: 'H', color: HYDROGEN, r: 24, travel: 1.5, from: 3.2 },
          { kind: 'label', at: [950, 230], pos: [990, 380], text: '两个 H 凑成氢气', from: 4.8, to: 7.2 },
          { kind: 'formula', at: [600, 780], text: '2Na + 2H₂O = 2NaOH + H₂↑', from: 6 },
          { kind: 'text', at: [600, 155], text: '钠的熔点不到 98 ℃', size: 's', color: '#c2410c', from: 7.6 },
        ],
      },
      {
        turn: 2,
        title: '酚酞遇碱变红',
        duration: 9,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [600, 520], size: [460, 420], liquid: WATER, level: 0.78, tint: { color: PINK, at: 3.8, over: 2.4 }, label: '滴了酚酞的水', from: 0 },
          { kind: 'particles', box: [420, 420, 360, 250], count: 7, color: '#ffd6bf', symbol: 'OH⁻', motion: 'jitter', size: 36, from: 2.2 },
          { kind: 'label', at: [700, 560], pos: [960, 300], text: '酚酞：遇碱变红', color: '#d6336c', from: 4.4 },
          { kind: 'text', at: [600, 155], text: '水变红 = 生成了碱', size: 's', from: 6 },
        ],
      },
      {
        turn: 3,
        title: '最外层只有 1 个电子',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'circle', at: [500, 450], size: [180, 180], color: 'none', outline: true, from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [500, 450], size: [290, 290], color: 'none', outline: true, from: 0.4 },
          { kind: 'shape', shape: 'circle', at: [500, 450], size: [410, 410], color: 'none', outline: true, from: 0.6, to: 6.6 },
          { kind: 'atom', path: [[500, 450]], symbol: 'Na', color: SODIUM, r: 48, from: 0.2, to: 6.6 },
          { kind: 'atom', path: [[500, 450]], symbol: 'Na', charge: '+', color: SODIUM, r: 48, from: 6.6 },
          { kind: 'flow', path: ring(500, 450, 90), color: ELECTRON, count: 2, speed: 120, size: 11, loop: true, from: 0.8 },
          { kind: 'flow', path: ring(500, 450, 145), color: ELECTRON, count: 8, speed: 120, size: 11, loop: true, from: 1.2 },
          { kind: 'flow', path: ring(500, 450, 205), color: ELECTRON, count: 1, speed: 120, size: 14, loop: true, from: 2, to: 5.5 },
          { kind: 'atom', path: [[705, 450], [1040, 280]], symbol: 'e⁻', color: ELECTRON, r: 32, travel: 1.6, from: 5.5 },
          { kind: 'label', at: [1040, 280], pos: [1000, 470], text: '交给水分子', from: 7.2 },
          { kind: 'text', at: [600, 830], text: '外层 1 个电子，一碰就交出', size: 's', from: 7.8 },
        ],
      },
      {
        turn: 4,
        title: '空气里慢慢变暗',
        duration: 12,
        cues: [
          { kind: 'particles', box: [150, 170, 480, 130], count: 7, color: '#ffc2bc', symbol: 'O₂', motion: 'gas', size: 30, from: 0.4, to: 6.4 },
          { kind: 'shape', shape: 'rect', at: [390, 450], size: [320, 180], color: '#eceef4', text: '刚切开的钠', tint: { color: '#8f8a80', at: 1.8, over: 4 }, from: 0.2 },
          { kind: 'label', at: [390, 530], pos: [390, 680], text: '表面长出氧化钠', from: 3.6 },
          { kind: 'vessel', vessel: 'beaker', at: [880, 500], size: [300, 340], liquid: '#f6e7b0', level: 0.82, label: '煤油', from: 6 },
          { kind: 'shape', shape: 'rect', at: [880, 620], size: [130, 70], color: '#eceef4', text: '钠', from: 6.8 },
          { kind: 'formula', at: [600, 820], text: '4Na + O₂ = 2Na₂O', from: 4.6 },
          { kind: 'text', at: [600, 155], text: '泡在煤油里，隔绝空气', size: 's', color: '#1f6b55', from: 8 },
        ],
      },
      {
        turn: 5,
        title: '着火了不能浇水',
        duration: 11,
        cues: [
          { kind: 'sprite', icon: '🔥', path: [[600, 440]], size: 160, wobble: true, from: 0.3, to: 6.8 },
          { kind: 'sprite', icon: '💧', path: [[230, 170], [520, 400]], size: 70, travel: 1.2, from: 1.4, to: 3 },
          { kind: 'pulse', at: [600, 440], color: '#e5484d', radius: 240, rate: 1.6, from: 2.6, to: 6.4 },
          { kind: 'text', at: [600, 165], text: '越浇越旺！', size: 'm', color: '#c2410c', from: 3, to: 6.4 },
          { kind: 'myth', wrong: '着火了，赶紧用水浇', right: '用干燥的沙土盖住', from: 4 },
          { kind: 'shape', shape: 'rect', at: [600, 500], size: [440, 190], color: '#d9b77a', text: '干沙土', motion: 'grow', over: 1.4, from: 6.6 },
        ],
      },
      {
        turn: 6,
        title: '钠的脾气一条线',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'pill', at: [230, 380], size: [230, 96], color: '#e4d8ff', text: '外层1个电子', from: 0.3 },
          { kind: 'arrow', path: [[360, 380], [460, 380]], color: '#c2410c', from: 1 },
          { kind: 'shape', shape: 'pill', at: [600, 380], size: [230, 96], color: '#ffd6bf', text: '遇水放热', from: 1.4 },
          { kind: 'arrow', path: [[730, 380], [830, 380]], color: '#c2410c', from: 2.1 },
          { kind: 'shape', shape: 'pill', at: [970, 380], size: [230, 96], color: '#ffd1e0', text: '浮熔游响红', from: 2.5 },
          { kind: 'sprite', icon: '🥽', path: [[600, 600]], size: 90, from: 3.8 },
          { kind: 'text', at: [600, 780], text: '镊子夹·煤油存·沙土灭', size: 's', color: '#1f6b55', from: 4.4 },
        ],
      },
    ],
  },
};
