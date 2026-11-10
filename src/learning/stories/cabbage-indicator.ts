import type { Story } from './types';

const PURPLE = '#7b4fa0';
const PINK = '#e0457b';
const RED = '#d9365e';
const BLUE = '#3f6fd1';
const GREEN = '#2fa37a';
const YELLOW = '#e8c547';
const VINEGAR = '#f6f1e3';
const H_ION = '#ffe0a3';
const OH_ION = '#ffd6bf';

export const cabbageIndicator: Story = {
  slug: 'cabbage-indicator',
  title: '紫甘蓝汁淋上白醋变粉红，撒点小苏打又变蓝绿：一碗菜汁怎么会变色？',
  trigger: '妈妈做凉拌紫甘蓝时淋了一勺白醋，盘底的紫色汤汁一下子变成了粉红色。',
  dialogue: [
    {
      nian: '紫色的菜汤淋上白醋，怎么一下子就变成粉红色了？',
      dad: '因为紫甘蓝里有一种会变色的天然色素，叫花青素，它能溶进水里，所以菜汤是紫的。它特别敏感：碰到酸变红，碰到碱变蓝变绿，不酸不碱时是紫色。白醋是酸的，一淋就红了。蓝莓、紫葡萄皮、黑枸杞里也有它。',
      show: { kind: 'lab', step: 0, label: '看「天然色素」' },
    },
    {
      nian: '色素又不是活的，它怎么知道碰到的是酸还是碱？',
      dad: '它不用知道，是酸自己找上门。酸里有很多氢离子，花青素分子会抓住氢离子，抓住以后分子的样子变了，吸走的光和反射出来的光也跟着变，看起来就成了红色。就像一件双面穿的外套，翻个面就换了颜色。',
      eq: '花青素（紫）+ H⁺ → 红色的样子',
      show: { kind: 'lab', step: 1, label: '看「遇酸变红」' },
    },
    {
      nian: '酸里有氢离子，那碰到碱又为什么会变蓝变绿？',
      dad: '碱正好反过来：它会把花青素身上的氢离子拽走，和它结合成水。少了氢离子，分子又换了一副样子，颜色就往蓝、绿那边走；碱越强，颜色越往后走，在很强的碱里还会变成黄色。所以一碗菜汁能排出一整条彩虹：红、紫、蓝、绿、黄。',
      eq: '花青素（紫）+ OH⁻ → 蓝绿色的样子 + H₂O',
      show: { kind: 'lab', step: 2, label: '看「遇碱变蓝绿」' },
    },
    {
      nian: '颜色变来变去的，那变成蓝绿色的紫甘蓝，是不是坏掉不能吃了？',
      dad: '没坏，放心吃。很多人看到菜汤发蓝发绿，就以为菜变质了，其实只是锅里的水偏碱，比如加了小苏打，花青素翻了个面。想让它变回紫红，淋一点醋就行。真放坏了的菜会发酸、发臭、发黏，要靠闻和看样子判断，不是看这个颜色。',
    },
    {
      nian: '小苏打能让它变蓝绿，那我能用菜汁测测家里别的东西是酸还是碱吗？',
      dad: '能！把紫甘蓝切碎，请大人用热水泡出紫色的汁，分装进几个透明杯，再分别加白醋、柠檬汁、清水、小苏打水和肥皂水，看它们排成什么颜色：越红越酸，越往蓝绿走越碱。三百多年前，化学家波义耳就用花草的汁辨认过酸和碱。',
    },
    {
      nian: '花草的汁能辨认酸碱，那实验室里的试纸也是这样变色的吗？',
      dad: '对，道理一样。实验室里的石蕊、酚酞，还有能显出一长串颜色的 pH 试纸，都是会抓住或丢掉氢离子、一换样子就换颜色的分子，这类东西叫酸碱指示剂。它们比菜汁颜色更稳、更好比；紫甘蓝汁放久了会变质，最好现泡现用。',
    },
    {
      nian: '我懂了！紫甘蓝里的花青素会抓住或丢掉氢离子：酸里抓住氢离子就变红，碱把氢离子拽走就变蓝变绿，所以一碗菜汁就能当酸碱试纸用。',
      dad: '说得完全对！做这个小实验记住一个好习惯：每个杯子先贴上名字再测，测完的液体倒掉，别拿来喝，也别去碰家里的强力清洁剂。',
    },
  ],
  tip: '测试只选白醋、柠檬汁、小苏打水、肥皂水这类温和的家用液体；84 消毒液、洁厕灵、管道疏通剂等有强腐蚀性，混用还可能放出有毒气体，不要拿来做实验。用热水泡紫甘蓝请大人帮忙，防止烫伤。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '紫汤遇白醋',
        duration: 11,
        cues: [
          { kind: 'sprite', icon: '🥬', path: [[960, 260]], size: 110, from: 0.2 },
          { kind: 'vessel', vessel: 'beaker', at: [560, 540], size: [420, 360], liquid: PURPLE, level: 0.6, tint: { color: PINK, at: 3.6, over: 2 }, label: '紫甘蓝汁', from: 0 },
          { kind: 'flow', path: [[560, 230], [560, 500]], color: VINEGAR, count: 4, speed: 200, size: 11, from: 1.4, to: 4 },
          { kind: 'label', at: [580, 260], pos: [300, 300], text: '淋白醋', from: 1.6, to: 4.4 },
          { kind: 'pulse', at: [560, 600], color: PINK, radius: 200, from: 3.8, to: 6 },
          { kind: 'label', at: [700, 600], pos: [960, 520], text: '花青素变红', from: 5.2 },
          { kind: 'text', at: [600, 860], text: '遇酸变红', size: 'm', from: 7.5 },
        ],
      },
      {
        turn: 1,
        title: '抓住 H⁺ 换颜色',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 470], size: [260, 260], color: PURPLE, text: '花青素', tint: { color: RED, at: 4.4, over: 1.6 }, from: 0.2 },
          { kind: 'particles', box: [140, 560, 300, 160], count: 5, color: H_ION, symbol: 'H⁺', motion: 'gas', size: 24, from: 0.8 },
          { kind: 'atom', path: [[220, 260], [480, 390]], symbol: 'H⁺', color: H_ION, r: 30, travel: 2, from: 1.4 },
          { kind: 'sprite', icon: '🧥', path: [[960, 380]], size: 110, wobble: true, from: 5.6 },
          { kind: 'text', at: [960, 520], text: '翻个面，换颜色', size: 's', from: 6 },
          { kind: 'text', at: [600, 830], text: '抓住 H⁺，就换了颜色', size: 'm', from: 7.6 },
        ],
      },
      {
        turn: 2,
        title: '碱把 H⁺ 拽走',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [480, 420], size: [240, 240], color: PURPLE, text: '花青素', tint: { color: BLUE, at: 3.8, over: 1.5 }, from: 0.2 },
          { kind: 'atom', path: [[1060, 290], [900, 280]], symbol: 'OH⁻', color: OH_ION, r: 34, travel: 1.4, from: 0.8, to: 6.4 },
          { kind: 'atom', path: [[590, 340], [845, 282]], symbol: 'H⁺', color: H_ION, r: 28, travel: 1.8, from: 2, to: 6.4 },
          { kind: 'label', at: [870, 280], pos: [880, 440], text: '变成水', from: 4.2, to: 6.4 },
          { kind: 'shape', shape: 'pill', at: [200, 680], size: [170, 90], color: RED, text: '酸', from: 6.6 },
          { kind: 'shape', shape: 'pill', at: [400, 680], size: [170, 90], color: PURPLE, text: '中性', from: 6.9 },
          { kind: 'shape', shape: 'pill', at: [600, 680], size: [170, 90], color: BLUE, text: '弱碱', from: 7.2 },
          { kind: 'shape', shape: 'pill', at: [800, 680], size: [170, 90], color: GREEN, text: '较强碱', from: 7.5 },
          { kind: 'shape', shape: 'pill', at: [1000, 680], size: [170, 90], color: YELLOW, text: '强碱', from: 7.8 },
          { kind: 'text', at: [600, 840], text: '碱越强，越往黄走', size: 'm', from: 9 },
        ],
      },
      {
        turn: 3,
        title: '蓝绿的菜没坏',
        duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [500, 400], size: [400, 300], liquid: GREEN, level: 0.7, tint: { color: '#a2477f', at: 3.6, over: 2 }, label: '焯菜的汤', from: 0 },
          { kind: 'sprite', icon: '🥬', path: [[500, 450]], size: 90, from: 0.4 },
          { kind: 'flow', path: [[500, 160], [500, 330]], color: VINEGAR, count: 4, speed: 180, size: 11, from: 1.6, to: 3.8 },
          { kind: 'label', at: [520, 200], pos: [880, 220], text: '淋一点醋', from: 1.8, to: 4.6 },
          { kind: 'label', at: [650, 450], pos: [930, 450], text: '变回紫红', from: 5 },
          { kind: 'myth', wrong: '菜变蓝绿就是坏了', right: '只是水偏碱，淋醋就变回', from: 6.2 },
        ],
      },
      {
        turn: 4,
        title: '家里的彩虹',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [160, 460], size: [170, 260], liquid: PURPLE, level: 0.65, tint: { color: PINK, at: 1.6, over: 1.2 }, label: '白醋', from: 0 },
          { kind: 'vessel', vessel: 'beaker', at: [380, 460], size: [170, 260], liquid: PURPLE, level: 0.65, tint: { color: RED, at: 2.6, over: 1.2 }, label: '柠檬汁', from: 0.2 },
          { kind: 'vessel', vessel: 'beaker', at: [600, 460], size: [170, 260], liquid: PURPLE, level: 0.65, label: '清水', from: 0.4 },
          { kind: 'vessel', vessel: 'beaker', at: [820, 460], size: [170, 260], liquid: PURPLE, level: 0.65, tint: { color: BLUE, at: 3.6, over: 1.2 }, label: '小苏打', from: 0.6 },
          { kind: 'vessel', vessel: 'beaker', at: [1040, 460], size: [170, 260], liquid: PURPLE, level: 0.65, tint: { color: GREEN, at: 4.6, over: 1.2 }, label: '肥皂水', from: 0.8 },
          { kind: 'arrow', path: [[160, 720], [1040, 720]], color: '#7d8f88', text: '越往右越碱', from: 6.6 },
          { kind: 'text', at: [600, 840], text: '越红越酸，越蓝绿越碱', size: 'm', from: 8.4 },
        ],
      },
      {
        turn: 5,
        title: '试纸也是这个理',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [330, 420], size: [320, 90], color: '#8fb0e6', text: '蓝色石蕊', tint: { color: '#e0607e', at: 2.4, over: 1.2 }, from: 0.3 },
          { kind: 'sprite', icon: '🍋', path: [[330, 260]], size: 80, from: 1.2 },
          { kind: 'label', at: [330, 465], pos: [330, 600], text: '遇酸变红', from: 3.4 },
          { kind: 'vessel', vessel: 'beaker', at: [870, 470], size: [300, 300], liquid: '#f4f4f0', level: 0.6, tint: { color: '#f48fb6', at: 5, over: 1.2 }, label: '酚酞遇碱', from: 0 },
          { kind: 'flow', path: [[870, 220], [870, 420]], color: '#d8efff', count: 3, speed: 160, size: 10, from: 3.6, to: 5.4 },
          { kind: 'text', at: [600, 820], text: '抓住或丢掉 H⁺ 就变色', size: 'm', from: 7 },
        ],
      },
    ],
  },
};
