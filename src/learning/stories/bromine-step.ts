import { lessonAsset } from '../assets';
import type { Story } from './types';

const SEA = '#d6ebf5';
const SEA_YELLOW = '#f2dc8a';
const TOWER = '#e8f1f7';
const BR_ION = '#f4c7a1';
const BR2 = '#b5541f';
const BR2_GAS = '#c86b3c';
const BR_LIQUID = '#7a2410';
const CL = '#c8e06a';
const ELECTRON = '#ffcf3f';
const AIR = '#7aa6c8';

export const bromineStep: Story = {
  slug: 'bromine-step',
  title: '爸爸说海水里藏着溴，可它那么稀，工厂是怎么把它捞出来的？',
  trigger: '小念在海边玩水，尝到海水又咸又苦，爸爸说海水里除了盐，还藏着一种做阻燃材料和药品用的元素——溴。',
  dialogue: [
    {
      nian: '爸爸，海水里真的藏着溴吗？我怎么一点也看不见？',
      dad: '真的有，只是太稀了。一升海水里只有大约 65 毫克溴，就像一大缸水里只撒了一小撮盐。它以溴离子的样子溶在水里，无色透明，所以看不见。可海太大了，地球上的溴绝大部分都在海里，加起来就很多。',
      show: { kind: 'lab', step: 0, label: '看「全场」' },
    },
    {
      nian: '溴离子看不见摸不着，怎么把它变出来？',
      dad: '先给海水加点硫酸，再通进氯气。氯和溴是卤素家的兄弟，氯在上面，抢电子的本领更强，它把溴离子身上多出来的电子抢走，溴离子就变回溴分子，海水微微泛黄。就像大个子把小个子手里的球抢走了。加酸是为了不让变出来的溴又被海水里的碱“吃”回去。',
      eq: 'Cl₂ + 2Br⁻ = 2Cl⁻ + Br₂',
      figure: {
        kind: 'table',
        paint: 'category',
        caption: '氯（17 号）和溴（35 号）同在第 17 族卤素家：氯在上面，抢电子的本领更强。',
        focus: { by: 'group', values: [17] },
        ring: [17, 35],
      },
      show: { kind: 'lab', step: 2, label: '看「氧化」' },
    },
    {
      nian: '溴分子变出来了，为什么不直接把海水煮干，把溴拿出来？',
      dad: '那得烧掉多得吓人的燃料，煮干一大片海，才得一点点溴。聪明的办法是借溴爱挥发的脾气：它的沸点只有 58.8 ℃，比水低得多。往塔里吹进热空气，溴就跟着空气跑出来，水留在下面，像风把汤面上的香味吹走一样。这一步叫吹出。',
      eq: 'Br₂（溶在水里）→ Br₂（气体，被空气带走）',
      show: { kind: 'lab', step: 3, label: '看「吹出」' },
    },
    {
      nian: '溴跟着空气跑出来了，为什么又要用二氧化硫把它变回去？这不是白干了吗？',
      dad: '看着像白干，其实是在“装箱”。空气里的溴还是很稀，让它和二氧化硫、水反应，变成溴化氢，溶进一小股水里。很多人以为这一步在走回头路，其实溴从一大片海水挪进了一小杯水，浓度一下子高了好多倍。这叫富集。',
      eq: 'Br₂ + SO₂ + 2H₂O = 2HBr + H₂SO₄',
      figure: {
        kind: 'image',
        src: lessonAsset('covers/bromine-step.webp'),
        alt: '两座透明的塔，左边高塔里水从上往下淋，红棕色的气顺着顶上的管子进到右边的小塔',
        caption: '左边高塔里海水往下淋，溴被吹出来，变成红棕色的气，顺着顶上的管子进到右边的吸收塔。',
      },
      show: { kind: 'lab', step: 4, label: '看「吸收」' },
    },
    {
      nian: '溴化氢装进一小杯水里，又怎么变成一瓶溴？',
      dad: '再通一次氯气，把溴化氢里的溴又“抢”出来。这回水少溴多，溶液变成深红棕色。最后加热蒸馏，溴先变成蒸气跑出去，冷下来就是红棕色的液溴，比水重，沉在瓶底。它是常温下唯一的液态非金属单质。',
      eq: '2HBr + Cl₂ = 2HCl + Br₂',
      show: { kind: 'lab', step: 5, label: '看「提纯」' },
    },
    {
      nian: '液溴这么特别，造出来都用在哪儿？我能做点什么？',
      dad: '用处不少：做成阻燃剂，让电器外壳、窗帘不容易着火；还能做一些药品、农药，以前照相胶片上的溴化银也离不开它。有些含溴阻燃剂很难分解，所以旧电器、旧手机别随手扔进垃圾桶，送去回收点，别让它们跑进土壤和海里。',
    },
    {
      nian: '我懂了！海水里的溴太稀，先加酸、通氯气把它变成溴分子，再用热空气吹出来，用二氧化硫装进一小杯水里富集，最后再通氯气、蒸馏，就得到红棕色的液溴，能做成阻燃剂！',
      dad: '一点没错！这就是“先富集、再提纯”。好习惯：在实验室见到红棕色的溴，只看不闻不碰；家里的旧电器送去回收。',
    },
  ],
  tip: '液溴、氯气、二氧化硫都有毒：溴蒸气刺激眼睛和鼻子，液溴沾到皮肤会严重灼伤，实验室里液溴要加水封存，相关实验只能由老师在通风橱里演示。海水含溴约 65 mg/L、溴的沸点 58.8 ℃ 均为教材常用数据。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '一大片海，一点点溴',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 440], size: [1000, 420], color: SEA, from: 0 },
          { kind: 'particles', box: [180, 300, 840, 280], count: 4, color: BR_ION, motion: 'jitter', symbol: 'Br', size: 22, from: 1.2 },
          { kind: 'sprite', icon: '🔍', path: [[300, 400], [820, 420]], size: 80, travel: 3, from: 1.6, to: 5 },
          { kind: 'count', at: [880, 770], label: '每升海水的溴', start: 0, end: 65, unit: 'mg', over: 2.5, from: 3 },
          { kind: 'text', at: [380, 770], text: '少得看不见', size: 'm', from: 4.4 },
        ],
      },
      {
        turn: 1,
        title: '氯把电子抢走',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 440], size: [900, 380], color: SEA, tint: { color: '#f5e6b0', at: 5, over: 2 }, from: 0 },
          { kind: 'atom', path: [[420, 440]], symbol: 'Br', charge: '−', color: BR_ION, r: 58, from: 0.3, to: 4.2 },
          { kind: 'atom', path: [[940, 300], [660, 430]], symbol: 'Cl', color: CL, r: 48, travel: 1.6, from: 0.9, to: 4.2 },
          { kind: 'atom', path: [[470, 420], [620, 425]], symbol: 'e⁻', color: ELECTRON, r: 16, travel: 1.2, from: 2.6, to: 4.2 },
          { kind: 'atom', path: [[420, 440]], symbol: 'Br', color: BR2, r: 58, from: 4.2 },
          { kind: 'atom', path: [[660, 430]], symbol: 'Cl', charge: '−', color: CL, r: 48, from: 4.2 },
          { kind: 'text', at: [600, 700], text: '氯比溴更会抢电子', size: 's', from: 5.4 },
          { kind: 'formula', at: [600, 830], text: 'Cl₂ + 2Br⁻ = 2Cl⁻ + Br₂', from: 7 },
        ],
      },
      {
        turn: 2,
        title: '热空气把溴吹出来',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [520, 460], size: [220, 560], color: TOWER, from: 0 },
          { kind: 'flow', path: [[520, 200], [520, 720]], color: SEA_YELLOW, count: 8, speed: 180, size: 10, from: 0.3 },
          { kind: 'arrow', path: [[180, 700], [400, 700]], color: AIR, text: '热空气', from: 1.2 },
          { kind: 'particles', box: [440, 200, 160, 500], count: 10, color: BR2_GAS, motion: 'rise', size: 12, from: 2.2 },
          { kind: 'arrow', path: [[640, 210], [880, 210]], color: BR2, text: '带着溴走', from: 3.8 },
          { kind: 'text', at: [900, 450], text: '溴的沸点 58.8 ℃', size: 's', from: 5 },
          { kind: 'text', at: [600, 840], text: '溴爱挥发，跟着空气走', size: 'm', from: 7.4 },
        ],
      },
      {
        turn: 3,
        title: '装进一小杯水',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [320, 400], size: [440, 340], color: SEA, from: 0 },
          { kind: 'particles', box: [120, 250, 400, 300], count: 5, color: BR2_GAS, motion: 'gas', size: 14, amount: { at: 2.6, over: 2.4, from: 5, to: 0 }, from: 0.3 },
          { kind: 'vessel', vessel: 'beaker', at: [900, 440], size: [240, 300], liquid: '#f6e7c8', level: 0.45, tint: { color: '#d9894f', at: 3, over: 3 }, label: '一小杯吸收液', from: 1.2 },
          { kind: 'arrow', path: [[560, 400], [740, 400]], color: '#7d8f88', text: 'SO₂ + 水', from: 1.8 },
          { kind: 'particles', box: [800, 470, 200, 110], count: 12, color: BR2, motion: 'jitter', size: 10, amount: { at: 2.8, over: 3, from: 0, to: 12 }, from: 2.6 },
          { kind: 'myth', wrong: '变回去是白干', right: '是把溴装进一小杯水', from: 7.2 },
        ],
      },
      {
        turn: 4,
        title: '再通氯气，蒸出液溴',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [330, 470], size: [300, 340], liquid: '#f6e7c8', level: 0.6, tint: { color: '#a8431c', at: 2, over: 2.5 }, from: 0 },
          { kind: 'arrow', path: [[330, 150], [330, 280]], color: '#9bbf3a', text: '氯气', from: 0.6 },
          { kind: 'sprite', icon: '🔥', path: [[330, 690]], size: 80, from: 3.4 },
          { kind: 'flow', path: [[400, 300], [560, 220], [760, 240], [880, 420]], color: BR2_GAS, count: 8, speed: 200, size: 11, from: 4 },
          { kind: 'vessel', vessel: 'beaker', at: [900, 560], size: [200, 220], liquid: BR_LIQUID, level: 0, rise: { to: 0.4, at: 5, over: 3 }, label: '液溴', from: 3.6 },
          { kind: 'text', at: [600, 840], text: '常温下唯一的液态非金属', size: 's', from: 8.4 },
        ],
      },
      {
        turn: 5,
        title: '溴用在哪儿',
        duration: 11,
        cues: [
          { kind: 'sprite', icon: '📺', path: [[250, 330]], size: 110, from: 0.3, to: 6 },
          { kind: 'text', at: [250, 460], text: '阻燃剂', size: 's', from: 0.6, to: 6 },
          { kind: 'sprite', icon: '💊', path: [[600, 330]], size: 110, from: 1.4, to: 6 },
          { kind: 'text', at: [600, 460], text: '药品', size: 's', from: 1.7, to: 6 },
          { kind: 'sprite', icon: '🎞️', path: [[950, 330]], size: 110, from: 2.5, to: 6 },
          { kind: 'text', at: [950, 460], text: '胶片', size: 's', from: 2.8, to: 6 },
          { kind: 'sprite', icon: '📱', path: [[260, 560], [760, 560]], size: 90, travel: 2, from: 6.2 },
          { kind: 'sprite', icon: '♻️', path: [[880, 560]], size: 110, from: 6.4 },
          { kind: 'text', at: [600, 830], text: '旧电器送去回收', size: 'm', from: 8.4 },
        ],
      },
    ],
  },
};
