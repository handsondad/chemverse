import { lessonAsset } from '../assets';
import type { Story } from './types';

const LIME = '#e6dfd2';
const CLAY = '#d8b48a';
const MEAL = '#c8b89a';
const MILL = '#dfe6ea';
const KILN = '#e9d3b8';
const KILN_HOT = '#f6c49a';
const TOWER = '#e8eef5';
const CO2 = '#cfd8dc';
const QUICKLIME = '#f4f1ea';
const SILICA = '#cfe3ea';
const GRAIN = '#9aa0a6';
const FIBER = '#7d8f88';
const SLAB = '#b8bcc0';
const PASTE = '#c9ccd0';
const SET = '#6f747a';
const WATER = '#bfe3ff';
const HEAT = '#e8590c';
const RED = '#c2410c';

export const cementStep: Story = {
  slug: 'cement-step',
  title: '工地上的灰色水泥粉，加水一搅就能变得像石头一样硬，它是怎么造出来的？',
  trigger: '放学路过工地，小念看见搅拌车一边转一边把灰色泥浆倒进模板，过几天那里就立起了硬邦邦的柱子。',
  dialogue: [
    {
      nian: '爸爸，工地上那些灰色的水泥粉，是用什么造出来的？',
      dad: '主要原料就是石灰石和黏土，山上的石头加地里的泥。先把它们按比例磨成很细的粉，送进大窑里烧成一颗颗灰黑色的小硬块，叫熟料；再掺一点石膏一起磨细，就是水泥。工厂里管这叫“两磨一烧”，像磨面、烤饼、再磨面。',
      eq: '石灰石 + 黏土 →磨细→ 生料 →高温烧→ 熟料 →加石膏磨细→ 水泥',
      show: { kind: 'lab', step: 0, label: '看「看全厂」' },
    },
    {
      nian: '石灰石进了窑，最先发生了什么？',
      dad: '最先是“吐气”。石灰石的主要成分是碳酸钙，烧到八九百度就分解，放出二氧化碳，剩下生石灰（氧化钙）。工厂让粉料先从高高的预热塔里落下来，被热气一路烘着，大部分在进窑前就分解好了，像接力赛先跑完第一棒，窑里就轻松多了。',
      eq: 'CaCO₃ =高温= CaO + CO₂↑',
      show: { kind: 'lab', step: 2, label: '看「预热分解」' },
    },
    {
      nian: '生石灰进了窑，为什么还要烧到那么高的温度？',
      dad: '因为它还要和黏土里的二氧化硅结合。烧到一千四百多度，料里有一部分熔成黏稠的液体，生石灰和二氧化硅在里面结合成几种硅酸钙，水泥变硬的本事就藏在它们身上。回转窑又斜又转，料一边翻滚一边往前走，迎着火慢慢烧透；粉磨得越细越匀，就烧得越透。',
      eq: '2CaO + SiO₂ = 2CaO·SiO₂　3CaO + SiO₂ = 3CaO·SiO₂（高温）',
      figure: {
        kind: 'image',
        src: lessonAsset('covers/cement-step.webp'),
        alt: '剖开的回转窑，长长的窑身斜躺着，里面满是碎料，一端喷着橙红色的火',
        caption: '回转窑剖开看：长长的窑身斜躺着慢慢转，碎料从高的一头进去，一边翻滚一边迎着另一头喷出的火。',
      },
      show: { kind: 'lab', step: 4, label: '看「烧成带」' },
    },
    {
      nian: '硅酸钙怎么让水泥变硬？是水泥晒干了吗？',
      dad: '不是晒干的。很多人以为水泥是“干了才硬”，其实是水泥和水发生了化学反应，叫水化：硅酸钙吸进水，长出无数细小的“小纤维”和胶状物，像许多小手互相拉紧，把沙子、石子牢牢抓在一起。所以水泥泡在水里也能变硬，刚浇好的还得勤洒水养着。',
    },
    {
      nian: '勤洒水？工地上天天往水泥地上浇水，就是这个原因吗？',
      dad: '对，这叫养护。头几天水化正忙，要是水分跑得太快，反应没做完，水泥就会起裂缝、不结实，所以工人盖上布、勤洒水。你能做的是：刚抹好的水泥地别去踩、别写字，等它长结实。水泥粉是碱性的，也别用手抓。',
    },
    {
      nian: '水化要是一下子太快了，又会怎样？',
      dad: '会“闪凝”：熟料里有一种铝酸三钙，碰到水特别急，一下子就把整锅料凝住，工人还来不及浇进模板。所以磨水泥时要掺少量石膏，它先和铝酸三钙反应，在颗粒外面裹上一层“外衣”，给凝结踩一脚刹车，留出搅拌、运输、浇筑的时间。石膏也不能多，多了水泥反而会胀坏。',
      eq: '石膏 + 铝酸三钙 + 水 → 钙矾石（裹住颗粒，延缓凝结）',
      show: { kind: 'lab', step: 6, label: '看「加石膏」' },
    },
    {
      nian: '我懂了！石灰石和黏土磨成粉，先放掉二氧化碳变成生石灰，再在一千四百多度的回转窑里和二氧化硅结合成硅酸钙熟料；掺点石膏磨细就是水泥，它要和水发生化学反应才会变硬！',
      dad: '完全正确！好习惯：路过刚抹好的水泥地绕着走，别踩也别写字，等它养护好了再说。',
    },
  ],
  tip: '水泥、生石灰遇水呈强碱性，沾在潮湿的皮肤上会灼伤，进了眼睛要立刻用大量清水冲洗并就医；工地有车辆和高处坠物，别带孩子靠近玩耍。文中温度为水泥窑的常见工艺范围（碳酸钙分解约 850–900 ℃，烧成约 1450 ℃）。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '两磨一烧',
        duration: 11,
        cues: [
          { kind: 'flow', path: [[290, 400], [1000, 400]], color: MEAL, count: 12, speed: 200, size: 9, from: 1 },
          { kind: 'shape', shape: 'pill', at: [180, 330], size: [200, 70], color: LIME, text: '石灰石', from: 0.3 },
          { kind: 'shape', shape: 'pill', at: [180, 470], size: [200, 70], color: CLAY, text: '黏土', from: 0.6 },
          { kind: 'shape', shape: 'rect', at: [440, 400], size: [160, 120], color: MILL, text: '磨细', from: 1.4 },
          { kind: 'shape', shape: 'pill', at: [740, 400], size: [300, 110], color: KILN, text: '回转窑', tint: { color: '#f29b55', at: 3.2, over: 2 }, from: 2.4 },
          { kind: 'sprite', icon: '🔥', path: [[740, 530]], size: 70, from: 3 },
          { kind: 'shape', shape: 'rect', at: [1040, 400], size: [190, 120], color: MILL, text: '再磨细', from: 4.6 },
          { kind: 'text', at: [600, 830], text: '两磨一烧，变成水泥', size: 'm', from: 7 },
        ],
      },
      {
        turn: 1,
        title: '石灰石吐出二氧化碳',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [400, 470], size: [200, 560], color: TOWER, from: 0 },
          { kind: 'flow', path: [[400, 210], [400, 730]], color: MEAL, count: 9, speed: 160, size: 10, from: 0.4 },
          { kind: 'count', at: [880, 240], label: '温度', start: 20, end: 900, unit: '℃', over: 3, from: 1 },
          { kind: 'shape', shape: 'pill', at: [840, 500], size: [260, 90], color: LIME, text: 'CaCO₃', motion: 'wiggle', from: 1.6, to: 4.8 },
          { kind: 'pulse', at: [840, 500], color: HEAT, radius: 220, from: 2.4, to: 4.8 },
          { kind: 'shape', shape: 'pill', at: [840, 500], size: [190, 90], color: QUICKLIME, text: 'CaO', from: 4.8 },
          { kind: 'particles', box: [740, 340, 200, 110], count: 5, color: CO2, motion: 'rise', symbol: 'CO₂', size: 22, from: 5 },
          { kind: 'text', at: [600, 830], text: '放出二氧化碳，剩下生石灰', size: 's', from: 7.4 },
        ],
      },
      {
        turn: 2,
        title: '一千四百多度，烧成熟料',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [600, 380], size: [900, 160], color: KILN_HOT, from: 0 },
          { kind: 'particles', box: [220, 400, 700, 50], count: 12, color: MEAL, motion: 'jitter', size: 14, from: 0.4 },
          { kind: 'sprite', icon: '🔥', path: [[1000, 380]], size: 90, wobble: true, from: 0.8 },
          { kind: 'arrow', path: [[240, 520], [900, 520]], color: '#8a6a4a', text: '料边翻边往前走', from: 1.4 },
          { kind: 'count', at: [940, 180], label: '窑里温度', start: 20, end: 1450, unit: '℃', over: 3, from: 1.8 },
          { kind: 'atom', path: [[300, 650], [520, 650]], symbol: 'CaO', color: QUICKLIME, r: 46, travel: 1.6, from: 3.4, to: 5.6 },
          { kind: 'atom', path: [[900, 650], [680, 650]], symbol: 'SiO₂', color: SILICA, r: 46, travel: 1.6, from: 3.6, to: 5.6 },
          { kind: 'shape', shape: 'pill', at: [600, 650], size: [260, 90], color: '#bfc6cc', text: '硅酸钙', from: 5.6 },
          { kind: 'text', at: [600, 830], text: '熟料：水泥的本事', size: 'm', from: 8 },
        ],
      },
      {
        turn: 3,
        title: '遇水长出小纤维',
        duration: 11,
        cues: [
          { kind: 'sprite', icon: '💧', path: [[600, 160], [600, 330]], size: 70, travel: 1, from: 0.3, to: 2.6 },
          { kind: 'atom', path: [[400, 330]], symbol: '', color: GRAIN, r: 62, from: 0.2 },
          { kind: 'atom', path: [[800, 320]], symbol: '', color: GRAIN, r: 62, from: 0.4 },
          { kind: 'atom', path: [[600, 540]], symbol: '', color: GRAIN, r: 62, from: 0.6 },
          { kind: 'bond', a: [462, 330], b: [738, 320], color: FIBER, from: 3 },
          { kind: 'bond', a: [430, 385], b: [560, 490], color: FIBER, from: 3.8 },
          { kind: 'bond', a: [770, 375], b: [640, 490], color: FIBER, from: 4.6 },
          { kind: 'label', at: [640, 560], pos: [960, 600], text: '水化：和水反应', from: 5.2 },
          { kind: 'myth', wrong: '水泥是晒干才变硬的', right: '水泥和水反应才变硬', from: 7.2 },
        ],
      },
      {
        turn: 4,
        title: '勤洒水，别踩',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 520], size: [800, 140], color: SLAB, text: '刚抹好的水泥地', from: 0 },
          { kind: 'particles', box: [260, 290, 680, 150], count: 10, color: WATER, motion: 'rise', size: 10, from: 0.6, to: 4.2 },
          { kind: 'text', at: [600, 230], text: '水跑太快会开裂', size: 's', color: RED, from: 1.4, to: 4.2 },
          { kind: 'sprite', icon: '💦', path: [[340, 330]], size: 80, from: 4.4 },
          { kind: 'sprite', icon: '💦', path: [[860, 330]], size: 80, from: 4.8 },
          { kind: 'meter', at: [600, 700], label: '水化反应', start: 0.2, end: 0.9, color: '#5b8fb9', over: 3.5, from: 5.2 },
          { kind: 'text', at: [600, 830], text: '别踩，也别写字', size: 'm', from: 8 },
        ],
      },
      {
        turn: 5,
        title: '石膏：给凝结踩刹车',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [330, 470], size: [300, 320], liquid: PASTE, level: 0.65, tint: { color: SET, at: 1.6, over: 0.8 }, label: '不加石膏', from: 0 },
          { kind: 'vessel', vessel: 'beaker', at: [870, 470], size: [300, 320], liquid: PASTE, level: 0.65, tint: { color: SET, at: 4, over: 6 }, label: '掺了石膏', from: 0 },
          { kind: 'text', at: [330, 230], text: '一下子凝住', size: 's', color: RED, from: 2.4 },
          { kind: 'particles', box: [780, 470, 180, 120], count: 6, color: '#ffffff', motion: 'jitter', size: 12, from: 2.8 },
          { kind: 'label', at: [870, 520], pos: [880, 230], text: '石膏裹住颗粒', from: 3.4 },
          { kind: 'text', at: [600, 830], text: '留出浇筑的时间', size: 'm', from: 8.4 },
        ],
      },
    ],
  },
};
