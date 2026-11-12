import type { Story } from './types';

const SEA = '#cfe8f5';
const CRUDE = '#3b2f28';
const HEAT = '#e8590c';
const VAPOR = '#f2b880';
const CHAIN = '#9b8a7a';
const GASOLINE = '#ffb37a';

export const gasoline: Story = {
  slug: 'gasoline',
  title: '加油枪里流出来的汽油，是从哪儿来的？',
  trigger: '小念跟爸爸去加油站，看着油枪把透明的汽油灌进油箱，忍不住想：这东西是从哪儿来的？',
  dialogue: [
    {
      nian: '爸爸，加油枪里流出来的汽油，是从哪儿来的？',
      dad: '是从地下抽上来的原油里“分”和“变”出来的。原油像一锅大杂烩，装着几千种不同的分子，可几乎全是碳和氢两种元素搭起来的：碳原子手拉手连成链，四周挂满氢原子。这类分子叫“烃”，汽油就是其中的一部分。',
      figure: {
        kind: 'table',
        caption: '按质量算，原油里约 84%～87% 是碳、11%～14% 是氢，几乎只用到周期表上这两格。',
        paint: 'category',
        focus: { by: 'atoms', values: [1, 6] },
        ring: [1, 6],
      },
    },
    {
      nian: '原油又是怎么来的？是恐龙变的吗？',
      dad: '不是恐龙，主要是远古海洋里的藻类和浮游生物。它们死后沉到海底，被一层层泥沙盖住，越埋越深；地下六七十到一百多度的温度加上巨大的压力，像慢火炖锅一样把它们炖了几百万年甚至上亿年，才变成原油。用掉一桶，就得再等这么久。',
      show: { kind: 'lab', step: 0, label: '看原油怎么来的' },
    },
    {
      nian: '原油里那么多种分子混在一起，怎么把汽油挑出来？',
      dad: '靠沸点：分子越短，越容易变成蒸气。炼油厂把原油加热到三百多度，送进几十米高的分馏塔，塔里越往上越凉。长分子没升多高就冷成液体，短分子一路升到上层才冷凝。于是塔顶出石油气，上层接汽油，中间是煤油、柴油，塔底剩下重油和沥青。这一步叫分馏，分子本身没变。',
      figure: {
        kind: 'tower',
        caption: '分馏塔越往上越凉：分子越短沸点越低，升得越高。汽油从塔的上层接出来。',
        cuts: [
          { name: '石油气', note: '1–4 个碳 · 液化气' },
          { name: '汽油', note: '5–11 个碳 · 给汽车', hot: true },
          { name: '煤油', note: '11–16 个碳 · 给飞机' },
          { name: '柴油', note: '15–18 个碳 · 给卡车' },
          { name: '重油、沥青', note: '20 个碳以上 · 铺路' },
        ],
      },
      show: { kind: 'lab', step: 1, label: '看分馏塔' },
    },
    {
      nian: '分子越短越容易变成蒸气？那汽油的分子到底有多长？',
      dad: '汽油里的分子大多有 5 到 11 个碳，比如有 8 个碳的辛烷。再短一点，像 4 个碳的丁烷，常温下就是气体，打火机里装的就是它；柴油的分子有十几个碳；沥青要三四十个碳，长得连流都流不动。长短不同，脾气就不同。',
      figure: {
        kind: 'chains',
        caption: '用同一把尺子量：碳链越长，沸点越高。汽油在中间偏短的那一段。',
        chains: [
          { carbons: 4, label: '丁烷 · 气体' },
          { carbons: 8, label: '辛烷 · 汽油', hot: true },
          { carbons: 16, label: '十六烷 · 柴油' },
          { carbons: 30, label: '沥青里的长链' },
        ],
      },
    },
    {
      nian: '汽油只是中间短短一段？光靠分馏，汽油够用吗？',
      dad: '远远不够，直接分出来的汽油只占原油的五分之一左右。剩下的重油分子太长，炼油厂就把它加热到五百度上下，让它碰上满是小孔的催化剂，长链就“咔嚓”从中间断开，一根十六个碳的分子变成两根八个碳的。这叫催化裂化，我国车用汽油大部分是这样“剪”出来的。',
      eq: 'C₁₆H₃₄ → C₈H₁₈ + C₈H₁₆（加热、催化剂）',
      figure: {
        kind: 'chains',
        caption: '一根长链被“剪”成两根：碳 16 变成两个碳 8，其中一根少了两个氢，多出一个双键。',
        chains: [{ carbons: 16, label: '十六烷 · 重油里' }],
        then: {
          via: '催化裂化',
          chains: [
            { carbons: 8, label: '辛烷 · 汽油', hot: true },
            { carbons: 8, label: '辛烯 · 汽油', double: true, hot: true },
          ],
        },
      },
      show: { kind: 'lab', step: 2, label: '看催化裂化' },
    },
    {
      nian: '剪出来的汽油就能直接加进油箱吗？92 号、95 号又是什么意思？',
      dad: '还差最后一步：先把里面的硫去掉，不然烧出来的二氧化硫会污染空气；再把各种组分按配方调好。标号说的是“抗爆震”：发动机要等火花塞点火才该燃烧，抗爆差的汽油会被压得提前自己炸开，发出“咔咔”声。号越高越不容易乱炸，可它不等于更有劲、更省油。',
      show: { kind: 'lab', step: 3, label: '看调和出厂' },
    },
    {
      nian: '我懂了！远古的小生物在地下炖了几百万年变成原油，炼油厂先用分馏塔按沸点把汽油分出来，再用催化剂把长链剪短多造一些，最后去掉硫、调好标号，才送到加油站！',
      dad: '一点没错！加油时按油箱盖里写的标号加，不用盲目加高的。原油要几百万年才攒下一点，烧掉的汽油还会放出二氧化碳，能走路、骑车、坐公交的时候，就让汽车歇一歇。',
    },
  ],
  tip: '加油时要熄火、不吸烟、不玩手机，别让孩子靠近油枪。汽油很容易挥发，蒸气比空气重、遇到火星就会燃爆，不能用塑料桶装，也不要在家里存放。文中数据参考了美国能源信息署（EIA）对石油形成与炼制的介绍、国家能源局对催化裂化的介绍，以及我国国六车用汽油标准（硫含量 ≤ 10 mg/kg）。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '几乎只有碳和氢',
        duration: 10,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [300, 540], size: [320, 360], liquid: CRUDE, level: 0.75, label: '一桶原油', from: 0 },
          { kind: 'atom', path: [[660, 380]], symbol: 'C', color: '#b8c0c8', r: 66, from: 1 },
          { kind: 'atom', path: [[1000, 380]], symbol: 'H', color: '#ffffff', r: 42, from: 1.6 },
          { kind: 'count', at: [660, 600], label: '碳', start: 0, end: 85, unit: '%', over: 2, from: 2.2 },
          { kind: 'count', at: [1000, 600], label: '氢', start: 0, end: 13, unit: '%', over: 2, from: 2.8 },
          { kind: 'text', at: [600, 830], text: '几千种分子，只用碳和氢', size: 's', from: 5 },
        ],
      },
      {
        turn: 1,
        title: '远古海洋的小生物',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 430], size: [1000, 440], color: SEA, from: 0 },
          { kind: 'sprite', icon: '🦠', path: [[420, 250], [440, 580]], size: 64, travel: 4, from: 0.6 },
          { kind: 'sprite', icon: '🦠', path: [[760, 240], [730, 580]], size: 56, travel: 4.2, from: 1.4 },
          { kind: 'sprite', icon: '🌿', path: [[600, 280], [590, 590]], size: 56, travel: 4.4, from: 2 },
          { kind: 'shape', shape: 'rect', at: [600, 640], size: [1000, 90], color: '#c8a878', text: '泥沙盖上来', motion: 'grow', over: 3, from: 4.6 },
          { kind: 'text', at: [600, 820], text: '藻类和浮游生物沉到海底', size: 's', from: 5.6 },
        ],
      },
      {
        turn: 1,
        title: '地下慢火炖',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 300], size: [900, 170], color: '#d9c3a0', text: '厚厚的岩层', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 540], size: [720, 150], color: '#8a6a4a', text: '远古有机物', tint: { color: CRUDE, at: 3, over: 4 }, from: 0.3 },
          { kind: 'pulse', at: [600, 540], color: HEAT, radius: 320, from: 1.4 },
          { kind: 'count', at: [250, 780], label: '地下温度', start: 20, end: 110, unit: '℃', over: 3, from: 1.2 },
          { kind: 'count', at: [950, 780], label: '炖了多久', start: 0, end: 500, unit: '万年', over: 5, from: 2.2 },
          { kind: 'sprite', icon: '🛢️', path: [[600, 640], [600, 700]], size: 90, from: 7.4, travel: 1 },
        ],
      },
      {
        turn: 2,
        title: '加热变成蒸气',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'rect', at: [760, 430], size: [210, 640], color: '#e3eef8', from: 0 },
          { kind: 'shape', shape: 'rect', at: [330, 650], size: [260, 150], color: '#f3d9c4', text: '加热炉', from: 0.2 },
          { kind: 'flow', path: [[120, 650], [330, 650], [650, 650]], color: CRUDE, count: 9, size: 12, from: 0.5 },
          { kind: 'pulse', at: [330, 650], color: HEAT, radius: 170, from: 0.9 },
          { kind: 'count', at: [330, 330], label: '原油温度', start: 20, end: 350, unit: '℃', over: 3, from: 1 },
          { kind: 'particles', box: [680, 160, 160, 520], count: 14, color: VAPOR, motion: 'rise', size: 12, from: 3 },
          { kind: 'text', at: [600, 850], text: '变成蒸气，往塔里升', size: 's', from: 5 },
        ],
      },
      {
        turn: 2,
        title: '越往上越凉',
        duration: 13,
        cues: [
          { kind: 'shape', shape: 'rect', at: [480, 450], size: [220, 660], color: '#e8eef5', from: 0 },
          { kind: 'particles', box: [400, 180, 160, 560], count: 12, color: VAPOR, motion: 'rise', size: 11, from: 0 },
          { kind: 'arrow', path: [[590, 700], [820, 700]], color: '#6f5f52', text: '沥青 C₂₀以上', from: 1.5 },
          { kind: 'arrow', path: [[590, 540], [820, 540]], color: '#8a7a6a', text: '柴油 C₁₅–C₁₈', from: 3 },
          { kind: 'arrow', path: [[590, 360], [820, 360]], color: HEAT, text: '汽油 C₅–C₁₁', from: 4.5 },
          { kind: 'arrow', path: [[590, 200], [820, 200]], color: '#7aa6c8', text: '石油气 C₁–C₄', from: 6 },
          { kind: 'text', at: [600, 850], text: '沸点越低，升得越高', size: 's', from: 8 },
        ],
      },
      {
        turn: 3,
        title: '长短不同，脾气不同',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'pill', at: [280, 260], size: [160, 64], color: '#ffe1c2', text: 'C₄ 气体', from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [340, 390], size: [280, 64], color: GASOLINE, text: 'C₈ 汽油', from: 1.4 },
          { kind: 'shape', shape: 'pill', at: [430, 520], size: [460, 64], color: CHAIN, text: 'C₁₆ 柴油', from: 2.4 },
          { kind: 'shape', shape: 'pill', at: [560, 650], size: [720, 64], color: '#6f5f52', text: 'C₃₀ 沥青', from: 3.4 },
          { kind: 'arrow', path: [[1040, 230], [1040, 680]], color: HEAT, text: '越长沸点越高', from: 4.6 },
          { kind: 'text', at: [600, 830], text: '长短不同，脾气不同', size: 's', from: 6 },
        ],
      },
      {
        turn: 4,
        title: '汽油不够用',
        duration: 8,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [300, 520], size: [300, 320], liquid: '#5a4632', level: 0.65, label: '分馏剩下的重油', from: 0 },
          { kind: 'shape', shape: 'pill', at: [800, 360], size: [560, 70], color: CHAIN, text: 'C₁₆H₃₄', from: 0.8 },
          { kind: 'count', at: [800, 600], label: '直接分出的汽油', start: 0, end: 20, unit: '%', over: 2, from: 2 },
          { kind: 'text', at: [600, 850], text: '长链太多，汽油太少', size: 's', from: 4.5 },
        ],
      },
      {
        turn: 4,
        title: '催化剂一剪两段',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [600, 380], size: [640, 70], color: CHAIN, text: 'C₁₆H₃₄', motion: 'wiggle', from: 0, to: 4.4 },
          { kind: 'pulse', at: [600, 380], color: HEAT, radius: 360, from: 0.6, to: 4.4 },
          { kind: 'count', at: [960, 200], label: '反应温度', start: 20, end: 500, unit: '℃', over: 2.5, from: 0.6 },
          { kind: 'shape', shape: 'rect', at: [600, 560], size: [520, 90], color: '#cfd8dc', text: '分子筛催化剂', from: 0.4 },
          { kind: 'sprite', icon: '✂️', path: [[600, 280]], size: 84, from: 3, to: 4.8 },
          { kind: 'shape', shape: 'pill', at: [420, 380], size: [320, 70], color: GASOLINE, text: 'C₈H₁₈', from: 4.4 },
          { kind: 'shape', shape: 'pill', at: [790, 380], size: [320, 70], color: '#ffd08a', text: 'C₈H₁₆', from: 4.6 },
          { kind: 'formula', at: [600, 760], text: 'C₁₆H₃₄ → C₈H₁₈ + C₈H₁₆', from: 6 },
        ],
      },
      {
        turn: 5,
        title: '脱硫、调配方',
        duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [320, 520], size: [280, 320], liquid: '#f6e3a1', level: 0.2, rise: { to: 0.8, at: 1, over: 4 }, label: '汽油调和罐', from: 0 },
          { kind: 'flow', path: [[760, 160], [480, 160], [340, 380]], color: GASOLINE, count: 8, size: 12, from: 0.5, to: 6 },
          { kind: 'atom', path: [[320, 560], [560, 420], [820, 300]], symbol: 'S', color: '#f4d03f', r: 40, travel: 3, from: 1.6, to: 6.4 },
          { kind: 'text', at: [860, 470], text: '先把硫去掉', size: 's', from: 2.4, to: 6.4 },
          { kind: 'meter', at: [860, 620], label: '辛烷值', start: 0.6, end: 0.92, color: HEAT, over: 3, from: 5 },
          { kind: 'text', at: [600, 850], text: '调成 92 号、95 号', size: 's', from: 7.4 },
        ],
      },
      {
        turn: 5,
        title: '标号是抗爆能力',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 420], size: [280, 380], color: '#eef1f4', text: '气缸', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 580], size: [250, 60], color: '#9aa5b1', motion: 'pulse', from: 0 },
          { kind: 'sprite', icon: '⚡', path: [[600, 250]], size: 72, from: 1.6 },
          { kind: 'pulse', at: [600, 380], color: HEAT, radius: 170, from: 2, to: 5 },
          { kind: 'text', at: [600, 690], text: '火花一点，才该燃烧', size: 's', from: 2.4, to: 5.6 },
          { kind: 'sprite', icon: '💥', path: [[470, 470]], size: 90, wobble: true, from: 5.8 },
          { kind: 'text', at: [600, 690], text: '抗爆差：提前乱炸', size: 's', color: '#c2410c', from: 6, to: 8.6 },
          { kind: 'myth', wrong: '标号越高越有劲、越省油', right: '标号只说抗爆能力', from: 8.6 },
        ],
      },
    ],
  },
};
