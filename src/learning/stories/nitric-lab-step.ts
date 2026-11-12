import { lessonAsset } from '../assets';
import type { Story } from './types';

const ACID = '#fff6d6';
const COPPER = '#d9844a';
const IRON = '#9aa3ad';
const NO2 = '#c8642c';
const NO = '#f4f4f0';
const OXYGEN = '#ffc2bc';
const WATER = '#d8efff';
const UP = '#c2410c';

export const nitricLabStep: Story = {
  slug: 'nitric-lab-step',
  title: '硝酸连铜都能溶掉，为什么运浓硝酸的却是铁罐车？',
  trigger: '小念在高速公路上看见一辆罐车，罐身上写着「浓硝酸」，可书上说硝酸连铜都能溶解，铁罐子怎么不怕它？',
  dialogue: [
    {
      nian: '硝酸连铜都能溶掉，为什么装浓硝酸的罐车却是铁做的？',
      dad: '因为冷的浓硝酸一碰到铁，会先在铁表面刷出一层极薄却很致密的氧化膜，像给铁穿了一件密不透风的雨衣，里面的铁碰不到酸，反应很快就停了。这叫钝化，铝也一样。不过这件雨衣只在常温的浓硝酸里管用，换成稀硝酸或者加热，铁照样会被溶掉。',
      show: { kind: 'lab', step: 3, label: '看「换成铁片」' },
      figure: {
        kind: 'table',
        caption: '橙圈：硝酸里的主角氮，会被冷浓硝酸钝化的铝和铁，还有穿不上「雨衣」、会被它溶掉的铜。',
        focus: { by: 'atoms', values: [7, 13, 26, 29] },
        ring: [7, 13, 26, 29],
      },
    },
    {
      nian: '那铜为什么穿不上雨衣？铜丝插进浓硝酸里会怎样？',
      dad: '铜表面长不出这样致密的膜，浓硝酸就一直往里吃。铜丝一插进去，溶液很快变绿，试管里冒出红棕色的气体，那是二氧化氮。硝酸里的氮本来是 +5 价，它抢走铜的电子，自己降到 +4 价。二氧化氮有毒，所以把铜丝往上一拉、离开酸液，反应就停。',
      eq: 'Cu + 4HNO₃(浓) = Cu(NO₃)₂ + 2NO₂↑ + 2H₂O',
      show: { kind: 'lab', step: 1, label: '看「铜丝插进去」' },
      figure: {
        kind: 'image',
        src: lessonAsset('covers/nitric-lab-step.webp'),
        alt: '试管里插着铜丝，上方充满红棕色气体，导管通进旁边的烧杯',
        caption: '铜丝插进硝酸，试管上方很快充满红棕色的二氧化氮；多出来的气体顺着导管通进旁边的溶液里吸收掉。',
      },
    },
    {
      nian: '换成稀硝酸，也会冒出红棕色的二氧化氮吗？',
      dad: '不会。稀硝酸抢电子的劲小一些，氮只降到 +2 价，冒出来的是无色的一氧化氮。很多人以为稀硝酸不冒气，其实只是你看不见。更神奇的是，一氧化氮一碰到空气里的氧气，马上变成红棕色的二氧化氮，所以试管口常常还是会泛红。',
      eq: '3Cu + 8HNO₃(稀) = 3Cu(NO₃)₂ + 2NO↑ + 4H₂O',
      show: { kind: 'lab', step: 2, label: '看「换成稀硝酸」' },
    },
    {
      nian: '一氧化氮碰到氧气就变红，那吸进多少空气，就能变红多少吗？',
      dad: '差不多是这样。空气里的氧气只占约 21%，往装着一氧化氮的注射器里吸进 10 毫升空气，只带进约 2 毫升氧气，只够把约 4 毫升一氧化氮变成二氧化氮。吸进的空气越多，变红的越多，没轮到的一氧化氮还是无色的。',
      eq: '2NO + O₂ = 2NO₂',
      show: { kind: 'lab', step: 6, label: '看「通入空气」' },
      figure: {
        kind: 'dots',
        caption: '100 份空气里，氧气只占约 21 份（橙色）。吸进去的空气，只有这一小部分能让一氧化氮变红。',
        groups: [
          { label: '氮气', count: 78, amount: '约 78 份' },
          { label: '氧气', count: 21, amount: '约 21 份', note: '能把 NO 变红的只有它', hot: true },
          { label: '其他', count: 1, amount: '约 1 份', note: '氩气、二氧化碳……' },
        ],
      },
    },
    {
      nian: '变红的二氧化氮再碰到水，又会怎么样？',
      dad: '它会溶进水里自己分家：3 个二氧化氮里，2 个的氮升到 +5 价、变回硝酸，1 个降到 +2 价、变成一氧化氮。所以摇一摇注射器，红棕色褪掉，气体只剩原来的三分之一，活塞就被往里吸。工厂造硝酸，最后一步正是让二氧化氮溶进水里。',
      eq: '3NO₂ + H₂O = 2HNO₃ + NO',
      show: { kind: 'lab', step: 7, label: '看「振荡与看进去」' },
    },
    {
      nian: '工厂造出来的浓硝酸，为什么非得装在棕色瓶里、放在阴凉的地方？',
      dad: '因为浓硝酸见光、受热都会分解，放出二氧化氮和氧气。二氧化氮溶回酸里，把无色的硝酸染成黄色；气体越积越多，瓶里的压力还会升高。棕色瓶挡住光，阴凉处少受热，硝酸就能稳稳地放着。实验里多出来的氮氧化物，也要通进碱液里吸收，不能放进屋里。',
      eq: '4HNO₃ =光照或△= 4NO₂↑ + O₂↑ + 2H₂O',
      show: { kind: 'lab', step: 5, label: '看「棕色瓶的道理」' },
    },
    {
      nian: '我懂了！冷的浓硝酸给铁和铝穿上一层致密的雨衣，所以能用铁罐车装；铜穿不上，就被浓硝酸溶掉、冒出红棕色的二氧化氮；稀硝酸放出无色的一氧化氮，碰到空气又变红。',
      dad: '完全正确，你还发现了同一种酸，浓和稀的脾气不一样！路上看到贴着危险品标志的罐车，要离远一点，也别跟在它后面太近。',
    },
  ],
  tip: '浓硝酸有强腐蚀性和强氧化性，二氧化氮、一氧化氮都有毒，相关实验只适合在学校通风橱里由老师演示，尾气用碱液吸收。钝化只在常温浓硝酸中有效，铁、铝容器不能盛装稀硝酸。行车遇到危险品罐车请保持车距。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '给铁穿上雨衣',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [560, 540], size: [460, 380], liquid: ACID, level: 0.75, label: '冷的浓硝酸', from: 0 },
          { kind: 'shape', shape: 'rect', at: [560, 580], size: [120, 260], color: '#cfe0ff', motion: 'grow', over: 1.4, from: 2.8 },
          { kind: 'shape', shape: 'rect', at: [560, 580], size: [80, 220], color: IRON, text: '铁', from: 0.5 },
          { kind: 'pulse', at: [560, 580], color: UP, radius: 180, from: 1.2, to: 3.2 },
          { kind: 'label', at: [620, 500], pos: [940, 330], text: '致密的氧化膜', from: 3.8 },
          { kind: 'sprite', icon: '🚛', path: [[1000, 640]], size: 110, from: 6 },
          { kind: 'text', at: [600, 850], text: '常温浓硝酸：钝化', size: 'm', from: 7.6 },
        ],
      },
      {
        turn: 1,
        title: '铜丝冒出红棕气',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [460, 540], size: [320, 400], liquid: ACID, level: 0.55, tint: { color: '#7fc8a0', at: 3, over: 3 }, label: '浓硝酸', from: 0 },
          { kind: 'shape', shape: 'rect', at: [460, 560], size: [24, 300], color: COPPER, from: 0.6 },
          { kind: 'particles', box: [320, 350, 280, 130], count: 10, color: NO2, symbol: 'NO₂', motion: 'gas', size: 30, amount: { at: 2, over: 4, from: 0, to: 10 }, from: 1.8 },
          { kind: 'shape', shape: 'pill', at: [930, 330], size: [220, 90], color: '#d0ebff', text: '氮 +5', from: 4.4 },
          { kind: 'arrow', path: [[930, 380], [930, 500]], color: UP, text: '抢 1 个电子', from: 5 },
          { kind: 'shape', shape: 'pill', at: [930, 560], size: [220, 90], color: '#ffd6bf', text: '氮 +4', from: 6 },
          { kind: 'formula', at: [600, 860], text: 'Cu + 4HNO₃(浓) = Cu(NO₃)₂ + 2NO₂↑ + 2H₂O', from: 8 },
        ],
      },
      {
        turn: 2,
        title: '看不见的一氧化氮',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [460, 415], size: [320, 290], liquid: '#eef4fb', level: 0.55, tint: { color: '#a5d0f5', at: 2, over: 3 }, label: '稀硝酸', from: 0 },
          { kind: 'shape', shape: 'rect', at: [460, 445], size: [24, 215], color: COPPER, from: 0.4 },
          { kind: 'particles', box: [320, 290, 280, 95], count: 8, color: NO, symbol: 'NO', motion: 'gas', size: 30, from: 1.6 },
          { kind: 'myth', wrong: '稀硝酸不冒气体', right: '冒的是无色的一氧化氮', from: 3.6, to: 8 },
          { kind: 'particles', box: [320, 195, 280, 80], count: 6, color: NO2, symbol: 'NO₂', motion: 'gas', size: 28, from: 8.4 },
          { kind: 'label', at: [600, 235], pos: [920, 230], text: '碰到空气就变红', from: 9 },
        ],
      },
      {
        turn: 3,
        title: '吸进空气，红一部分',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [560, 440], size: [680, 170], color: '#f7fbff', from: 0.2 },
          { kind: 'particles', box: [240, 380, 320, 120], count: 8, color: NO, symbol: 'NO', motion: 'jitter', size: 30, amount: { at: 6.6, over: 1, from: 8, to: 4 }, from: 0.6 },
          { kind: 'flow', path: [[1140, 440], [900, 440]], color: WATER, count: 5, speed: 200, size: 13, from: 2, to: 4.2 },
          { kind: 'particles', box: [620, 380, 240, 120], count: 2, color: OXYGEN, symbol: 'O₂', motion: 'gas', size: 30, from: 3, to: 6.6 },
          { kind: 'count', at: [330, 680], label: '吸进空气', start: 0, end: 10, unit: 'mL', over: 2, from: 2 },
          { kind: 'count', at: [800, 680], label: '其中氧气', start: 0, end: 2, unit: 'mL', over: 2, from: 3.4 },
          { kind: 'particles', box: [440, 380, 280, 120], count: 4, color: NO2, symbol: 'NO₂', motion: 'jitter', size: 30, from: 6.6 },
          { kind: 'text', at: [600, 850], text: '氧气只占约 21%', size: 'm', from: 8.4 },
        ],
      },
      {
        turn: 4,
        title: '溶进水里自己分家',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [600, 640], size: [620, 260], liquid: WATER, level: 0.62, from: 0 },
          { kind: 'atom', path: [[420, 320]], symbol: 'NO₂', color: NO2, r: 50, from: 0.6, to: 4 },
          { kind: 'atom', path: [[600, 320]], symbol: 'NO₂', color: NO2, r: 50, from: 0.9, to: 4 },
          { kind: 'atom', path: [[780, 320]], symbol: 'NO₂', color: NO2, r: 50, from: 1.2, to: 4 },
          { kind: 'atom', path: [[420, 320], [450, 690]], symbol: 'HNO₃', color: '#ffd6bf', r: 52, travel: 1.5, from: 4 },
          { kind: 'atom', path: [[600, 320], [660, 700]], symbol: 'HNO₃', color: '#ffd6bf', r: 52, travel: 1.5, from: 4 },
          { kind: 'atom', path: [[780, 320], [960, 260]], symbol: 'NO', color: NO, r: 46, travel: 1.5, from: 4 },
          { kind: 'formula', at: [600, 180], text: '3NO₂ + H₂O = 2HNO₃ + NO', from: 6.4 },
          { kind: 'text', at: [600, 850], text: '2 个变硝酸，1 个变 NO', size: 'm', from: 8 },
        ],
      },
      {
        turn: 5,
        title: '棕色瓶挡住光',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [400, 500], size: [200, 320], color: '#fffbe8', text: '无色瓶', tint: { color: '#f3d27a', at: 3, over: 3 }, from: 0.3 },
          { kind: 'sprite', icon: '☀️', path: [[200, 260]], size: 90, from: 1 },
          { kind: 'flow', path: [[250, 300], [330, 380]], color: '#ffcf3f', count: 4, speed: 140, size: 12, from: 1.4, to: 6 },
          { kind: 'particles', box: [320, 360, 160, 80], count: 5, color: NO2, symbol: 'NO₂', motion: 'gas', size: 24, from: 3.4 },
          { kind: 'shape', shape: 'rect', at: [840, 500], size: [200, 320], color: '#b07a4f', text: '棕色瓶', from: 5.4 },
          { kind: 'label', at: [840, 340], pos: [840, 220], text: '挡光、放阴凉处', from: 6.4 },
          { kind: 'formula', at: [600, 820], text: '4HNO₃ = 4NO₂↑ + O₂↑ + 2H₂O', from: 7.4 },
        ],
      },
    ],
  },
};
