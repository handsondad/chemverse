import { lessonAsset } from '../assets';
import type { Story } from './types';

const COAL = '#3a3a3a';
const HOT = '#e8590c';
const STEAM = '#cfe8f5';
const OXYGEN = '#a8d8ff';
const CO = '#cfd4da';
const H2 = '#ffffff';
const SULFUR = '#f4d03f';
const BLOOD = '#e57373';

export const coalGasStep: Story = {
  slug: 'coal-gas-step',
  title: '奶奶说以前家里的灶烧的是「煤气」，黑乎乎的煤块怎么能变成气？',
  trigger: '奶奶说她年轻时家里的灶烧的叫「煤气」，小念看看煤炉边黑乎乎的煤块，怎么也想不通像石头一样的煤怎么会变成气。',
  dialogue: [
    {
      nian: '爸爸，黑乎乎的煤块，怎么能变成烧饭用的煤气？',
      dad: '让烧得通红的煤“喝”一口水蒸气。高温下，煤里的碳会把水分子拆开：碳抢走水里的氧，变成一氧化碳，剩下的氢结成氢气。一氧化碳和氢气都能烧，混在一起就是一种煤气。这种把固体的煤变成气的办法，叫煤的气化。',
      eq: 'C + H₂O（气）=高温= CO + H₂',
      figure: {
        kind: 'image',
        src: lessonAsset('covers/coal-gas-step.webp'),
        alt: '气化炉剖面图：煤粉从顶上落进烧得通红的炉膛，下半截是蓝色的水，底部积着黑色的渣',
        caption: '气化炉剖开看：煤粉从顶上喷进去，上半截烧得通红，下面的水给出来的气降温，灰渣落到最底下。',
      },
      show: { kind: 'lab', step: 2, label: '看「炉子里长什么样」' },
    },
    {
      nian: '碳抢水里的氧，抢着抢着，煤块会不会凉下来？',
      dad: '会。碳和水蒸气的这个反应要不停地吸热，光喝水蒸气，炉子很快就冷了。所以还要同时吹进氧气，让一部分煤烧起来放热，给另一部分煤“加柴”。就像煮饭得一直开着火：氧气管供热，水蒸气管产出氢气，两样都不能少，比例还得调好。',
      eq: 'C + O₂ = CO₂（放热）　C + H₂O = CO + H₂（吸热）',
      show: { kind: 'lab', step: 1, label: '看「供热还是供气」' },
    },
    {
      nian: '既然要吹氧气烧掉一部分煤，为什么不干脆直接烧煤，非要绕一圈变成气？',
      dad: '因为直接烧只能拿到热，煤里的硫和灰跟着烟跑出来，又呛又脏。变成气以后，硫成了气里的杂质，能用化学办法洗掉；灰在炉底熔成渣排走。而且一氧化碳和氢气像两块积木，能拼成甲醇、化肥这些新东西，煤就不只是一把火了。',
      show: { kind: 'lab', step: 0, label: '看「为什么气化」' },
    },
    {
      nian: '一氧化碳和氢气这么有用，那奶奶为什么总说煤气会让人中毒？',
      dad: '毛病就出在一氧化碳身上。它被吸进身体，会抢着和血液里运氧的血红蛋白抱在一起，抱得比氧气紧得多，身体就缺氧了。很多人以为闻不到味儿就安全，其实一氧化碳没颜色也没气味，燃气里那股怪味，是专门加进去报警用的。',
    },
    {
      nian: '怪味是用来报警的，那我们家现在用的燃气，也要防着点吗？',
      dad: '要。现在家里大多烧天然气，主要成分是甲烷，本身不含一氧化碳，可它漏出来遇到火星会爆炸；火烧得不充分时，也会生出一氧化碳。所以做饭时开窗或开油烟机，热水器别装在不通风的浴室里；闻到怪味先告诉大人，别按开关。',
    },
    {
      nian: '那工厂里造出来的一氧化碳和氢气，是怎么拼成甲醇和化肥的？',
      dad: '先把硫洗干净，再按比例拼积木。一个一氧化碳配两个氢气，在催化剂上一拼就是甲醇；造化肥要的是氢，就让一氧化碳再和水蒸气反应，把水里的氢也换出来，再配上从空气里分出的氮气去合成氨。同一炉气，调一调比例就能走不同的路。',
      eq: 'CO + 2H₂ =催化剂= CH₃OH　CO + H₂O ⇌ CO₂ + H₂',
      show: { kind: 'lab', step: 6, label: '看「变成什么」' },
    },
    {
      nian: '我懂了！通红的煤喝一口水蒸气，碳把水里的氧抢走，变成一氧化碳和氢气；吹点氧气烧掉一部分煤来供热；变成气以后好洗掉硫，还能当积木拼成甲醇和化肥。一氧化碳有毒还没味道，所以家里用燃气要通风！',
      dad: '说得太好了！记住一个好习惯：灶上开着火的时候，人别走远，厨房的窗户留一条缝。',
    },
  ],
  tip: '一氧化碳无色无味、毒性很强，城市燃气里会加入有臭味的物质用来报警。家里闻到燃气味时，不要开关电器、不要打电话，先关燃气总阀、开窗通风，到室外再求助；燃气热水器不要装在密闭浴室里。气化炉在一千多度和高压下运行，相关内容只看懂原理即可。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '红煤喝一口水蒸气',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'circle', at: [360, 480], size: [280, 280], color: COAL, text: '红煤', tint: { color: HOT, at: 0.6, over: 2 }, from: 0.2 },
          { kind: 'flow', path: [[1060, 480], [520, 480]], color: STEAM, count: 8, speed: 260, size: 13, from: 1.6, to: 4.6 },
          { kind: 'label', at: [860, 480], pos: [860, 330], text: '水蒸气 H₂O', from: 1.8, to: 4.6 },
          { kind: 'particles', box: [600, 260, 440, 380], count: 6, color: CO, symbol: 'CO', motion: 'gas', size: 30, from: 4.6 },
          { kind: 'particles', box: [600, 260, 440, 380], count: 6, color: H2, symbol: 'H₂', motion: 'gas', size: 30, from: 5.2 },
          { kind: 'formula', at: [600, 820], text: 'C + H₂O = CO + H₂', from: 7 },
        ],
      },
      {
        turn: 1,
        title: '一边吸热，一边供热',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [420, 480], size: [260, 260], color: HOT, text: '煤', tint: { color: '#5a3a2a', at: 1, over: 3 }, from: 0.2, to: 4.6 },
          { kind: 'flow', path: [[820, 480], [560, 480]], color: STEAM, count: 6, speed: 200, size: 12, from: 0.4 },
          { kind: 'meter', at: [880, 260], label: '炉温', start: 0.8, end: 0.3, color: HOT, over: 3, from: 0.6, to: 4.6 },
          { kind: 'shape', shape: 'circle', at: [420, 480], size: [260, 260], color: '#5a3a2a', text: '煤', tint: { color: HOT, at: 5.4, over: 2 }, from: 4.6 },
          { kind: 'flow', path: [[100, 480], [280, 480]], color: OXYGEN, count: 5, speed: 200, size: 12, from: 4.8 },
          { kind: 'label', at: [190, 480], pos: [220, 330], text: '吹进氧气', from: 5 },
          { kind: 'meter', at: [880, 260], label: '炉温', start: 0.3, end: 0.8, color: HOT, over: 2.5, from: 4.6 },
          { kind: 'text', at: [600, 820], text: '氧气供热，水汽产氢', size: 'm', from: 8.4 },
        ],
      },
      {
        turn: 2,
        title: '变成气，才好洗干净',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [250, 470], size: [130, 340], color: '#9aa5b1', text: '烟囱', from: 0.2 },
          { kind: 'particles', box: [190, 170, 120, 120], count: 10, color: '#6b6b6b', motion: 'rise', size: 14, from: 0.6 },
          { kind: 'text', at: [250, 720], text: '直接烧：又呛又脏', size: 's', from: 1.2 },
          { kind: 'shape', shape: 'pill', at: [820, 300], size: [320, 90], color: CO, text: 'CO + H₂', from: 3.4 },
          { kind: 'shape', shape: 'pill', at: [820, 450], size: [320, 90], color: SULFUR, text: '硫：洗掉', from: 4.4 },
          { kind: 'shape', shape: 'pill', at: [820, 600], size: [320, 90], color: '#8a7a6a', text: '灰：熔成渣', from: 5.4 },
          { kind: 'text', at: [600, 840], text: '变成气，好洗也好用', size: 'm', from: 7.6 },
        ],
      },
      {
        turn: 3,
        title: '一氧化碳抢座位',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [600, 420], size: [440, 140], color: BLOOD, text: '血红蛋白', from: 0.3 },
          { kind: 'atom', path: [[150, 260], [470, 330]], symbol: 'O₂', color: OXYGEN, r: 42, travel: 1.5, from: 0.9, to: 4 },
          { kind: 'atom', path: [[1060, 240], [650, 320]], symbol: 'CO', color: CO, r: 44, travel: 1.5, from: 2.6 },
          { kind: 'atom', path: [[470, 330], [200, 560]], symbol: 'O₂', color: OXYGEN, r: 42, travel: 1.2, from: 4 },
          { kind: 'label', at: [650, 320], pos: [920, 580], text: '抱得比氧气紧', from: 4.6 },
          { kind: 'myth', wrong: '闻不到味就没有煤气', right: '一氧化碳没颜色、没气味', from: 7.2 },
        ],
      },
      {
        turn: 4,
        title: '用燃气要通风',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [380, 600], size: [360, 80], color: '#9aa5b1', text: '燃气灶', from: 0.2 },
          { kind: 'sprite', icon: '🔥', path: [[380, 510]], size: 100, wobble: true, from: 0.6 },
          { kind: 'particles', box: [560, 260, 320, 260], count: 6, color: CO, symbol: 'CO', motion: 'gas', size: 26, amount: { at: 3.6, over: 3, from: 6, to: 1 }, from: 1.4 },
          { kind: 'sprite', icon: '🪟', path: [[1040, 300]], size: 110, from: 2.6 },
          { kind: 'flow', path: [[980, 320], [760, 420], [560, 460]], color: STEAM, count: 7, speed: 220, size: 11, from: 3 },
          { kind: 'meter', at: [900, 640], label: '屋里一氧化碳', start: 0.6, end: 0.1, color: '#c2410c', over: 3, from: 3.6 },
          { kind: 'text', at: [600, 830], text: '开窗、开油烟机', size: 'm', from: 7.4 },
        ],
      },
      {
        turn: 5,
        title: '拼积木：甲醇和氨',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [300, 330], size: [280, 90], color: CO, text: 'CO+2H₂', from: 0.3 },
          { kind: 'arrow', path: [[470, 330], [650, 330]], color: '#1f6b55', text: '催化剂', from: 1.2 },
          { kind: 'shape', shape: 'pill', at: [840, 330], size: [260, 90], color: '#d8efff', text: '甲醇', from: 2.2 },
          { kind: 'shape', shape: 'pill', at: [300, 560], size: [280, 90], color: '#e3eef8', text: '3H₂+N₂', from: 4.6 },
          { kind: 'arrow', path: [[470, 560], [650, 560]], color: '#1f6b55', text: '合成氨', from: 5.4 },
          { kind: 'shape', shape: 'pill', at: [840, 560], size: [260, 90], color: '#c8e6c9', text: '氨→化肥', from: 6.4 },
          { kind: 'text', at: [600, 800], text: '一炉气，两条路', size: 'm', from: 8.4 },
        ],
      },
    ],
  },
};
