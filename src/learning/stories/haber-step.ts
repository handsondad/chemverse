import { lessonAsset } from '../assets';
import type { Story } from './types';

const N2 = '#a8c8ff';
const NITROGEN = '#7aa6ff';
const O2 = '#ffc2bc';
const H = '#ffffff';
const IRON = '#5f5f5f';
const HEAT = '#e8590c';
const LIQUID = '#cfe8f5';
const GREEN = '#1f6b55';

export const haberStep: Story = {
  slug: 'haber-step',
  title: '外婆往菜地里撒的化肥，真的是用空气做出来的吗？',
  trigger: '小念帮外婆给菜地撒化肥，袋子上印着「尿素」两个大字，外婆说这里面的氮，最早是从空气里来的。',
  dialogue: [
    {
      nian: '外婆说化肥里的氮是从空气里来的，空气怎么能变成肥料？',
      dad: '能，靠的是合成氨。空气里接近八成是氮气，可大多数庄稼“吃”不了它：两个氮原子之间有三根键手拉着手，抱得太紧。工厂把氮气和氢气放在一起，让它们变成氨，再用氨去造尿素这些化肥，庄稼就能吸收了。',
      eq: 'N₂ + 3H₂ ⇌ 2NH₃（高温、高压、催化剂）',
      figure: {
        kind: 'dots',
        caption: '空气按体积分成 100 份：氮气约占 78 份，比氧气多得多，可大多数庄稼没法直接用它。',
        groups: [
          { label: '氮气', count: 78, amount: '约 78 份', hot: true },
          { label: '氧气', count: 21, amount: '约 21 份' },
          { label: '其他', count: 1, amount: '约 1 份', note: '氩气、二氧化碳……' },
        ],
      },
      show: { kind: 'lab', step: 0, label: '看「为什么建厂」' },
    },
    {
      nian: '氮气抱得那么紧，工厂怎么让它和氢气手拉手？',
      dad: '靠三样东西一起上：铁做的催化剂、几百度的高温、上百个大气压的高压。氮气分子落到铁的表面，被“掰”成两个氮原子，再一个个接上氢原子，变成氨。就像拆一块焊得很牢的积木，得找对工具还得使劲。1909 年哈伯在实验室里做成了它，后来博施把它变成了大工厂。',
      figure: {
        kind: 'image',
        src: lessonAsset('covers/haber-step.webp'),
        alt: '合成塔剖面图：高高的圆筒里叠着四层黑色催化剂，气体从上往下穿过，侧面有几根进气管',
        caption: '合成塔剖开看：塔里叠着好几层黑色的铁催化剂，气从上往下穿过，侧面的管子往层间打进冷气控温。',
      },
      show: { kind: 'lab', step: 4, label: '看「塔内什么样」' },
    },
    {
      nian: '为什么非要那么高的高压？压力小一点不行吗？',
      dad: '压力小，氨就做得少。你数一数：一个氮气加三个氢气，是四个气体分子，变成氨只剩两个。把气体使劲往小里压，平衡就往分子少的那边跑，氨就多了。这叫勒夏特列原理：你挤它，它就想办法少占地方。可压力越高，机器越厚越贵，也越费电，所以不能无限加压。',
      eq: 'N₂ + 3H₂ ⇌ 2NH₃（4 个气体分子 → 2 个）',
      show: { kind: 'lab', step: 2, label: '看「为什么加压」' },
    },
    {
      nian: '挤一挤平衡就会跑，那温度呢？做氨是不是越热越好？',
      dad: '恰恰相反。合成氨会放热，温度越高，平衡越往拆回氮气和氢气的方向跑，氨反而少。可温度太低，铁催化剂醒不过来，反应慢得等不起。工厂只好折中，选 400–500 ℃：氨少一点，但做得快。很多人以为催化剂能让氨变多，其实它只让反应变快，最后能做到多少它管不了。',
      eq: 'N₂ + 3H₂ ⇌ 2NH₃（正反应放热）',
      show: { kind: 'lab', step: 3, label: '看「为什么高温」' },
    },
    {
      nian: '催化剂帮了这么大忙，造出来的化肥，是不是撒得越多菜长得越好？',
      dad: '不是。庄稼一次只能吸收那么多，多撒的氮会被雨水冲进河里、湖里，让水藻疯长，水就发臭了；撒得太多还会“烧”坏菜根。所以要按袋子上说的量，少量多次，撒完浇水或者埋进土里。外婆常说的“薄肥勤施”，就是这个道理。',
    },
    {
      nian: '庄稼吸收不完会浪费，那工厂里没变成氨的氮气和氢气，也浪费掉了吗？',
      dad: '一点也不浪费。气穿过合成塔一趟，只有一小部分变成氨。出来以后先降温，氨比氮气、氢气容易变成液体，就先冷成液氨流走；剩下的氮气和氢气再送回塔里重新来一趟。就像回转寿司，没被拿走的盘子转一圈又回来，来回循环，原料绝大部分都能用上。',
      eq: 'NH₃（气）→ NH₃（液）　降温分离',
      show: { kind: 'lab', step: 5, label: '看「为什么要循环」' },
    },
    {
      nian: '我懂了！空气里的氮气抱得太紧，工厂用铁催化剂和高压把它和氢气拉成氨：加压让平衡往分子少的一边跑，温度只能折中在 400–500 ℃，没变成氨的气还会循环回去再用。化肥也要薄肥勤施，不能乱撒！',
      dad: '一点没错！再记个好习惯：帮外婆施肥时先看袋子上的用量，撒完一定要把手洗干净。',
    },
  ],
  tip: '氨气有强烈刺激性，液氨会冻伤并灼伤皮肤，合成氨车间在高温高压下运行，只看懂原理即可。化肥不要让孩子入口，施用后要洗手，存放时远离食物。哈伯 1909 年在实验室实现合成氨，博施随后在巴斯夫实现工业化（1913 年投产）；“合成氮肥养活了世界近一半人口”是学者斯米尔等人的估算。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '空气里大半是氮气',
        duration: 11,
        cues: [
          { kind: 'particles', box: [220, 220, 760, 360], count: 14, color: N2, symbol: 'N₂', motion: 'gas', size: 28, from: 0.3, to: 5 },
          { kind: 'particles', box: [220, 220, 760, 360], count: 4, color: O2, symbol: 'O₂', motion: 'gas', size: 28, from: 0.8, to: 5 },
          { kind: 'text', at: [600, 680], text: '氮气占了一大半', size: 'm', from: 1.6, to: 5 },
          { kind: 'atom', path: [[500, 420]], symbol: 'N', color: NITROGEN, r: 62, from: 5.2 },
          { kind: 'atom', path: [[700, 420]], symbol: 'N', color: NITROGEN, r: 62, from: 5.2 },
          { kind: 'bond', a: [562, 420], b: [638, 420], order: 2, from: 5.8 },
          { kind: 'bond', a: [562, 420], b: [638, 420], from: 5.8 },
          { kind: 'label', at: [600, 440], pos: [600, 620], text: '三根键，抱得紧', from: 6.6 },
          { kind: 'text', at: [600, 820], text: '庄稼吃不了氮气', size: 'm', from: 8 },
        ],
      },
      {
        turn: 1,
        title: '铁表面掰开氮气',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 640], size: [820, 80], color: IRON, text: '铁催化剂', from: 0 },
          { kind: 'atom', path: [[560, 240], [560, 440], [450, 566]], symbol: 'N', color: NITROGEN, r: 36, travel: 3, from: 0.6 },
          { kind: 'atom', path: [[632, 240], [632, 440], [750, 566]], symbol: 'N', color: NITROGEN, r: 36, travel: 3, from: 0.6 },
          { kind: 'pulse', at: [600, 566], color: HEAT, radius: 260, from: 3.2, to: 6.4 },
          { kind: 'atom', path: [[220, 300], [404, 520]], symbol: 'H', color: H, r: 24, travel: 1.6, from: 5 },
          { kind: 'atom', path: [[980, 300], [796, 520]], symbol: 'H', color: H, r: 24, travel: 1.6, from: 5.6 },
          { kind: 'label', at: [404, 520], pos: [250, 420], text: '再接上氢', from: 6.8 },
          { kind: 'formula', at: [600, 820], text: 'N₂ + 3H₂ ⇌ 2NH₃', from: 8 },
        ],
      },
      {
        turn: 2,
        title: '挤一挤，分子变少',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 430], size: [520, 360], color: '#f3f7fb', outline: true, from: 0 },
          { kind: 'particles', box: [380, 290, 440, 280], count: 8, color: N2, motion: 'gas', size: 22, amount: { at: 4, over: 3, from: 8, to: 4 }, from: 0.4 },
          { kind: 'arrow', path: [[120, 430], [320, 430]], color: '#c2410c', text: '加压', from: 2 },
          { kind: 'arrow', path: [[1080, 430], [880, 430]], color: '#c2410c', text: '加压', from: 2 },
          { kind: 'count', at: [600, 710], label: '气体分子', start: 4, end: 2, unit: '个', over: 3, from: 4 },
          { kind: 'text', at: [600, 855], text: '往分子少的一边跑', size: 's', from: 8 },
        ],
      },
      {
        turn: 3,
        title: '温度只能折中',
        duration: 12,
        cues: [
          { kind: 'meter', at: [300, 300], label: '反应快慢', start: 0.1, end: 0.8, color: HEAT, over: 3, from: 1 },
          { kind: 'meter', at: [900, 300], label: '平衡时的氨', start: 0.85, end: 0.35, color: '#4c6ef5', over: 3, from: 1 },
          { kind: 'sprite', icon: '🌡️', path: [[600, 300]], size: 90, from: 0.4 },
          { kind: 'sprite', icon: '🐢', path: [[300, 440]], size: 90, from: 0.6, to: 3.6 },
          { kind: 'sprite', icon: '🐇', path: [[300, 440]], size: 90, from: 3.6 },
          { kind: 'text', at: [600, 560], text: '400–500 ℃', size: 'm', color: GREEN, from: 5 },
          { kind: 'myth', wrong: '催化剂能让氨变多', right: '催化剂只让反应变快', from: 7.4 },
        ],
      },
      {
        turn: 4,
        title: '薄肥勤施',
        duration: 11,
        cues: [
          { kind: 'sprite', icon: '🥬', path: [[380, 470]], size: 120, from: 0.3 },
          { kind: 'flow', path: [[380, 190], [380, 400]], color: '#f3f3f3', count: 6, speed: 180, size: 11, from: 0.8, to: 3.8 },
          { kind: 'shape', shape: 'rect', at: [990, 640], size: [260, 90], color: '#9fd3c7', text: '河和湖', tint: { color: '#6aa84f', at: 6, over: 2 }, from: 3 },
          { kind: 'flow', path: [[480, 540], [720, 600], [900, 630]], color: '#7aa6c8', count: 7, speed: 200, size: 11, from: 4 },
          { kind: 'label', at: [700, 595], pos: [720, 440], text: '多余的氮', from: 4.6 },
          { kind: 'text', at: [600, 830], text: '少量多次，别乱撒', size: 'm', from: 8 },
        ],
      },
      {
        turn: 5,
        title: '没变的气转回去',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [360, 440], size: [180, 360], color: '#e3eef8', text: '合成塔', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [800, 420], size: [180, 240], color: LIQUID, text: '冷却器', from: 0.6 },
          { kind: 'flow', path: [[450, 440], [710, 440]], color: N2, count: 6, speed: 200, size: 11, from: 1 },
          { kind: 'flow', path: [[800, 540], [800, 670]], color: '#7fb8e0', count: 4, speed: 140, size: 11, from: 2.4 },
          { kind: 'shape', shape: 'pill', at: [800, 720], size: [200, 70], color: LIQUID, text: '液氨', from: 3 },
          { kind: 'flow', path: [[800, 300], [800, 210], [360, 210], [360, 260]], color: N2, count: 8, speed: 220, size: 11, from: 4 },
          { kind: 'arrow', path: [[700, 170], [470, 170]], color: GREEN, text: '送回去再来', from: 4.6 },
          { kind: 'text', at: [450, 840], text: '原料绝大部分用上', size: 'm', from: 8 },
        ],
      },
    ],
  },
};
