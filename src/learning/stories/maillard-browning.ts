import type { Story } from './types';

const SUGAR = '#f6c56b';
const AMINO = '#9cc3ff';
const BROWN = '#8a5a2b';
const RAW = '#e8a0a0';
const GREY_MEAT = '#d9c8c0';
const CRUST = '#b06a2c';
const CHAR = '#2b2118';
const PAN = '#4a4a4a';
const WATER = '#d8efff';
const HEAT = '#e0762b';

export const maillardBrowning: Story = {
  slug: 'maillard-browning',
  title: '同样一块牛肉，为什么水煮的总是灰白色，煎出来的却又香又金黄？',
  trigger: '晚饭时小念发现，一块牛肉被妈妈煮成了灰白色的汤肉，另一块被爸爸放进热锅里煎，表面金黄焦脆，满屋子都是香味。',
  dialogue: [
    {
      nian: '都是把牛肉弄熟，为什么煎的那块又香又金黄，煮的那块却灰白灰白的？',
      dad: '因为煎的时候发生了一个专门「变香变色」的反应，叫美拉德反应。肉里的蛋白质会拆出一点氨基酸，肉里还带着一点糖，温度够高时，两者手拉手连在一起，再拆开重组，变出棕褐色的外皮和几百种香气分子。面包皮、烤红薯、炒咖啡豆的香味，也都是它做出来的。',
      eq: '糖 + 氨基酸 →（约 140～170 ℃）棕褐色物质 + 几百种香气分子',
      show: { kind: 'lab', step: 1, label: '看「140 ℃ 黄金区」' },
    },
    {
      nian: '温度够高才行，可是水煮的锅也很烫呀，为什么煮多久都不变色？',
      dad: '因为水把温度卡住了。锅里的水烧到 100 ℃ 左右就沸腾，再怎么加热，热量也只是把水变成水蒸气带走，泡在水里的肉表面一直停在 100 ℃ 上下。这个反应要到 140 ℃ 左右才跑得快，100 ℃ 时慢得像蜗牛，所以水煮肉煮多久都是灰白色。',
      show: { kind: 'lab', step: 0, label: '看「100 ℃ 困局」' },
    },
    {
      nian: '水会把温度卡住，那煎牛排之前，是不是得先把肉擦干？',
      dad: '对，这是大厨的第一招。先用厨房纸把肉表面的水吸干，锅也先烧热再下肉，表面没了水膜，温度才能很快冲过 140 ℃，几十秒就结出一层金黄的焦壳。湿淋淋地下锅，锅里只会噗噗冒水泡，热都被水汽带走了。一次也别堆太多肉，出的水一多，煎就又变成了煮。',
    },
    {
      nian: '焦壳那么香，那是不是煎得越焦越好吃？',
      dad: '不是。温度过了 180 ℃ 左右，好不容易变出来的香味分子也扛不住，会被烤成黑炭，又苦又冒黑烟，还会生成对身体不好的东西。很多人以为越焦越香，其实金黄到棕褐的时候最香，一发黑就过头了。看到锅里冒黑烟，就赶紧把火关小。',
      show: { kind: 'lab', step: 2, label: '看「碱性加速与焦化」' },
    },
    {
      nian: '过头了会变成黑炭，那熬焦糖、烤棉花糖变成褐色，也是同一个反应吗？',
      dad: '不完全一样。熬焦糖只用白糖，没有氨基酸：糖烧到 160 ℃ 左右，糖分子自己拆开又连起来，变成琥珀色，带一点苦的甜香，这叫焦糖化。煎肉、烤面包是糖和氨基酸一起变出来的，所以有肉香、烤香；焦糖化只有糖自己，闻起来是甜甜的焦香。',
    },
    {
      nian: '糖和氨基酸一起才有肉香和烤香，那烤面包的时候，有办法让它更快上色吗？',
      dad: '有两个小窍门。一是在面包表面刷一层蛋液，蛋里的蛋白质送来更多氨基酸，烤出来又亮又金黄；二是让表面带一点碱性，碱会给这个反应踩油门。碱水面包进烤箱前要在碱水里泡一下，皮才烤成深棕色；炒洋葱时撒一丁点小苏打，也上色更快。',
      show: { kind: 'lab', step: 2, label: '看「碱性加速与焦化」' },
    },
    {
      nian: '我懂了！煎肉变香变黄，是糖和氨基酸在 140 ℃ 以上一起反应；水煮时水把温度卡在 100 ℃，上不去；所以要擦干、热锅，但别烧过 180 ℃ 变成黑炭。',
      dad: '一点没错！下次帮忙做饭时记住：肉先擦干再下锅，火别开到冒黑烟，烧焦发黑的部分就别吃了。',
    },
  ],
  tip: '热锅热油容易溅出烫伤，孩子下厨请有大人在旁边。土豆、面包等含淀粉的食物煎炸烤得过头，会生成对健康不利的丙烯酰胺，焦黑的部分不要吃；小苏打、食用碱按菜谱少量使用即可。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '糖和氨基酸手拉手',
        duration: 11,
        cues: [
          { kind: 'sprite', icon: '🥩', path: [[960, 280]], size: 110, from: 0.2 },
          { kind: 'atom', path: [[200, 500], [520, 500]], symbol: '糖', color: SUGAR, r: 52, travel: 1.6, from: 0.4, to: 3.6 },
          { kind: 'atom', path: [[1000, 500], [680, 500]], symbol: '氨基酸', color: AMINO, r: 52, travel: 1.6, from: 0.4, to: 3.6 },
          { kind: 'bond', a: [572, 500], b: [628, 500], from: 2.2, to: 3.6 },
          { kind: 'shape', shape: 'circle', at: [600, 500], size: [240, 240], color: '#e8c99a', tint: { color: BROWN, at: 4, over: 2.5 }, text: '棕褐色', from: 3.6 },
          { kind: 'particles', box: [440, 190, 320, 150], count: 8, color: '#ffd59e', motion: 'rise', size: 18, from: 4.6 },
          { kind: 'label', at: [700, 300], pos: [930, 460], text: '几百种香气分子', from: 5.4 },
          { kind: 'text', at: [600, 830], text: '糖和氨基酸一起变香', size: 'm', from: 7.6 },
        ],
      },
      {
        turn: 1,
        title: '水把温度卡住',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [520, 560], size: [460, 380], liquid: WATER, level: 0.7, label: '水煮', from: 0 },
          { kind: 'shape', shape: 'rect', at: [520, 610], size: [220, 100], color: RAW, tint: { color: GREY_MEAT, at: 2, over: 3 }, text: '牛肉', from: 0.3 },
          { kind: 'particles', box: [320, 440, 400, 240], count: 14, color: '#ffffff', motion: 'rise', size: 14, from: 1 },
          { kind: 'count', at: [960, 300], label: '肉表面', start: 20, end: 100, unit: '℃', over: 3, from: 1.2 },
          { kind: 'sprite', icon: '🐌', path: [[960, 560]], size: 90, wobble: true, from: 5.4 },
          { kind: 'text', at: [600, 870], text: '最多 100 ℃，慢如蜗牛', size: 's', from: 7.4 },
        ],
      },
      {
        turn: 2,
        title: '擦干，冲过 140 ℃',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [520, 640], size: [560, 44], color: PAN, from: 0 },
          { kind: 'shape', shape: 'rect', at: [520, 575], size: [320, 86], color: RAW, tint: { color: CRUST, at: 5, over: 3 }, text: '牛排', from: 0.3 },
          { kind: 'sprite', icon: '🧻', path: [[260, 380], [520, 470], [700, 400]], size: 80, travel: 2, from: 0.8, to: 3.4 },
          { kind: 'pulse', at: [520, 640], color: HEAT, radius: 240, from: 3.2 },
          { kind: 'count', at: [960, 300], label: '肉表面', start: 100, end: 150, unit: '℃', over: 3, from: 3.4 },
          { kind: 'text', at: [600, 830], text: '擦干热锅，冲过 140 ℃', size: 'm', from: 8 },
        ],
      },
      {
        turn: 3,
        title: '太热就焦了',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [520, 580], size: [560, 44], color: PAN, from: 0 },
          { kind: 'shape', shape: 'rect', at: [520, 515], size: [320, 86], color: CRUST, tint: { color: CHAR, at: 3, over: 3 }, text: '牛排', from: 0 },
          { kind: 'count', at: [960, 280], label: '锅温', start: 150, end: 200, unit: '℃', over: 4, from: 0.5 },
          { kind: 'particles', box: [370, 250, 300, 170], count: 9, color: '#6b6b6b', motion: 'rise', size: 22, from: 3.6 },
          { kind: 'label', at: [640, 515], pos: [960, 480], text: '变黑炭，发苦', from: 4.8 },
          { kind: 'myth', wrong: '越焦越香', right: '金黄最香，发黑就过头', from: 7 },
        ],
      },
      {
        turn: 4,
        title: '焦糖化：只有糖',
        duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [380, 540], size: [340, 340], liquid: '#ffffff', level: 0.4, tint: { color: '#c98a2c', at: 2.5, over: 4 }, label: '只有白糖', from: 0 },
          { kind: 'count', at: [380, 260], label: '糖温', start: 100, end: 160, unit: '℃', over: 3, from: 0.8 },
          { kind: 'atom', path: [[790, 460]], symbol: '糖', color: SUGAR, r: 46, from: 1.2 },
          { kind: 'atom', path: [[950, 460]], symbol: '糖', color: SUGAR, r: 46, from: 1.4 },
          { kind: 'bond', a: [836, 460], b: [904, 460], from: 3.6 },
          { kind: 'text', at: [870, 600], text: '没有氨基酸', size: 's', from: 4.6 },
          { kind: 'text', at: [600, 850], text: '琥珀色，甜甜的焦香', size: 'm', from: 7 },
        ],
      },
      {
        turn: 5,
        title: '刷蛋液、加点碱',
        duration: 12,
        cues: [
          { kind: 'sprite', icon: '🥚', path: [[330, 300]], size: 90, from: 0.4 },
          { kind: 'sprite', icon: '🥨', path: [[870, 300]], size: 90, from: 1 },
          { kind: 'shape', shape: 'pill', at: [330, 520], size: [320, 150], color: '#f3dfb4', tint: { color: '#d9a441', at: 3, over: 3 }, text: '刷蛋液', from: 0.6 },
          { kind: 'shape', shape: 'pill', at: [870, 520], size: [320, 150], color: '#f3dfb4', tint: { color: '#7a4a22', at: 3, over: 3 }, text: '碱水泡过', from: 1.2 },
          { kind: 'label', at: [330, 600], pos: [330, 700], text: '氨基酸更多', from: 4.8 },
          { kind: 'label', at: [870, 600], pos: [870, 700], text: '碱来踩油门', from: 5.6 },
          { kind: 'text', at: [600, 840], text: '上色更快更漂亮', size: 'm', from: 7.6 },
        ],
      },
    ],
  },
};
