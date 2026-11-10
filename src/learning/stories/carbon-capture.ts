import type { Story } from './types';

const CO2 = '#dfe5ec';
const STACK = '#b8c0c8';
const ALKALI = '#7fc8a0';
const LEAN = '#bfe6cf';
const HEAT = '#e8590c';
const TOWER = '#eef4fb';
const GREEN = '#1f6b55';

export const carbonCapture: Story = {
  slug: 'carbon-capture',
  title: '电厂烟囱一直在冒烟，里面的二氧化碳能抓住，再变回燃料吗？',
  trigger: '小念坐车经过一座发电厂，看见高高的烟囱一直往外冒白烟，想起老师说二氧化碳多了地球会变热。',
  dialogue: [
    {
      nian: '爸爸，烟囱冒的那些白烟，就是让地球变热的二氧化碳吗？',
      dad: '白烟大多是水汽遇冷凝成的小水滴。很多人以为白烟就是二氧化碳，其实二氧化碳没颜色，看不见，混在烟气里一起跑了出去。烧煤、烧天然气都会生出它。它在空气里多了，就像给地球多盖了一层被子，热散不出去。科学家想在烟囱口就把它抓住，这叫碳捕集。',
      figure: {
        kind: 'table',
        caption: '二氧化碳只用到两种元素：一个碳（C）拉着两个氧（O）。圈出的两格都在周期表右上方的非金属区。',
        paint: 'category',
        focus: { by: 'atoms', values: [6, 8] },
        ring: [6, 8],
      },
    },
    {
      nian: '在烟囱口怎么抓？二氧化碳看不见又摸不着呀？',
      dad: '用一种带碱性的液体来“吃”它。二氧化碳是偏酸性的气体，碰到碱就被抱住，溶进液体里。烟气从塔底往上走，碱液从塔顶像下雨一样往下淋，两边迎面碰上，二氧化碳就被留在液体里，氮气这些不被吸收的气体从塔顶排走。温度低一点，抓得更牢。',
      eq: 'K₂CO₃ + CO₂ + H₂O ⇌ 2KHCO₃（低温吸收）',
      show: { kind: 'lab', step: 0, label: '看「低温抓捕」' },
    },
    {
      nian: '碱液吃饱了二氧化碳，是不是就只能扔掉了？',
      dad: '不用扔，加热让它吐出来。吸收二氧化碳会放热，这个反应能倒着走：低温时往“抓”的方向跑；把液体送进另一座塔，加热到一百多度，平衡就往“放”的方向跑，二氧化碳被赶出来，收集起来很纯。吐干净的碱液流回去接着抓，就像一块拧干了还能再用的海绵。',
      eq: '2KHCO₃ =加热= K₂CO₃ + CO₂↑ + H₂O',
      show: { kind: 'lab', step: 1, label: '看「高温再生」' },
    },
    {
      nian: '收集起来的二氧化碳那么纯，能拿来做什么？',
      dad: '有两条路。一条是让它和含钙、镁的岩石或钢渣反应，变成碳酸钙那样的“石头”，牢牢锁住；另一条是给它加上氢气，在催化剂上变成甲醇，一种能烧的液体燃料。很多人以为甲醇烧掉就白抓了，其实只要氢气是用太阳能、风能电解水造的，它就能顶替一份从地下挖出来的石油和煤。',
      eq: 'CO₂ + 3H₂ ⇌ CH₃OH + H₂O（催化剂）　Ca(OH)₂ + CO₂ = CaCO₃↓ + H₂O',
      show: { kind: 'lab', step: 2, label: '看「变废为宝」' },
    },
    {
      nian: '用太阳能、风能造氢气那么好，我在家能做点什么吗？',
      dad: '最简单的就能帮上忙：少用一度电，电厂就少烧一点煤。随手关灯，空调别开得太冷，能走路、骑车就少坐车，用不着的东西少买。抓碳的机器又贵又费能，最便宜的办法永远是一开始就少排。',
    },
    {
      nian: '抓碳的机器又贵又费能，那为什么还要造它？',
      dad: '因为有些地方很难不排：炼钢、烧水泥都会放出大量二氧化碳，一时还找不到替代的办法，就得在出口把它抓住。大自然也有个老办法——植物的光合作用，树叶吸进二氧化碳，把碳存进木头里。人造的抓碳塔，就是学着帮大自然多干一份活。',
      eq: '6CO₂ + 6H₂O =光照、叶绿体= C₆H₁₂O₆ + 6O₂',
    },
    {
      nian: '我懂了！烟囱的白烟主要是水汽，二氧化碳看不见；碱液在低温下把它抱住，加热又吐出来，碱液能反复用；抓到的二氧化碳可以变成石头锁起来，或者加上绿色的氢变成甲醇。炼钢、烧水泥躲不开时就靠它，我能做的是省电少排！',
      dad: '说得真好！再养成一个好习惯：出门前看一眼，家里的灯和电器关好了没有。',
    },
  ],
  tip: '碳捕集用的醇胺、碳酸钾溶液有腐蚀性，工厂在加热加压下操作，只看懂原理即可。甲醇有毒，误饮会致盲甚至致命，绝不能入口。用 CO₂ 造甲醇要真正减碳，前提是氢气来自可再生电力电解水；目前碳捕集和 CO₂ 制甲醇仍处在推广阶段，成本和能耗还在不断下降中。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '白烟不是二氧化碳',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [400, 460], size: [140, 360], color: STACK, text: '烟囱', from: 0 },
          { kind: 'particles', box: [330, 160, 200, 110], count: 12, color: '#ffffff', motion: 'rise', size: 16, from: 0.4 },
          { kind: 'label', at: [440, 210], pos: [760, 190], text: '白烟：小水滴', from: 1.4 },
          { kind: 'particles', box: [600, 300, 440, 240], count: 6, color: CO2, symbol: 'CO₂', motion: 'gas', size: 28, from: 3.2 },
          { kind: 'label', at: [820, 420], pos: [860, 610], text: '看不见的 CO₂', from: 4.2 },
          { kind: 'myth', wrong: '白烟就是二氧化碳', right: '二氧化碳没颜色，看不见', from: 7 },
        ],
      },
      {
        turn: 1,
        title: '碱液像雨一样淋',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 470], size: [280, 540], color: TOWER, from: 0 },
          { kind: 'flow', path: [[600, 210], [600, 730]], color: ALKALI, count: 10, speed: 200, size: 12, from: 0.6 },
          { kind: 'label', at: [600, 250], pos: [920, 360], text: '碱液往下淋', from: 1 },
          { kind: 'arrow', path: [[180, 700], [440, 700]], color: '#6f5f52', text: '烟气', from: 1.4 },
          { kind: 'particles', box: [480, 260, 240, 460], count: 10, color: CO2, symbol: 'CO₂', motion: 'rise', size: 22, amount: { at: 3, over: 4, from: 10, to: 2 }, from: 1.8 },
          { kind: 'arrow', path: [[760, 230], [1000, 230]], color: GREEN, text: '氮气排走', from: 4.4 },
          { kind: 'formula', at: [600, 830], text: 'K₂CO₃ + CO₂ + H₂O ⇌ 2KHCO₃', from: 7 },
        ],
      },
      {
        turn: 2,
        title: '加热吐出来',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [300, 470], size: [220, 440], color: TOWER, text: '吸收塔', from: 0 },
          { kind: 'shape', shape: 'rect', at: [880, 470], size: [220, 440], color: '#ffe1c2', text: '再生塔', tint: { color: '#ffb37a', at: 2, over: 2 }, from: 0.3 },
          { kind: 'flow', path: [[410, 610], [770, 610]], color: ALKALI, count: 7, speed: 180, size: 12, from: 1 },
          { kind: 'pulse', at: [880, 580], color: HEAT, radius: 200, from: 2.2 },
          { kind: 'particles', box: [810, 150, 140, 90], count: 8, color: CO2, symbol: 'CO₂', motion: 'rise', size: 20, from: 3.6 },
          { kind: 'flow', path: [[770, 340], [410, 340]], color: LEAN, count: 7, speed: 180, size: 12, from: 5 },
          { kind: 'label', at: [590, 340], pos: [590, 230], text: '拧干再用', from: 5.6 },
          { kind: 'text', at: [600, 800], text: '低温抓，高温放', size: 'm', from: 8 },
        ],
      },
      {
        turn: 3,
        title: '变石头，变燃料',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [600, 240], size: [220, 90], color: CO2, text: 'CO₂', from: 0.3 },
          { kind: 'arrow', path: [[510, 290], [340, 420]], color: '#8a7a6a', text: '矿化', from: 1 },
          { kind: 'shape', shape: 'rect', at: [300, 510], size: [240, 130], color: '#e9e3d6', text: '碳酸钙', from: 1.8 },
          { kind: 'arrow', path: [[690, 290], [860, 420]], color: GREEN, text: '加绿氢', from: 3 },
          { kind: 'shape', shape: 'rect', at: [900, 510], size: [240, 130], color: '#d8efff', text: '甲醇', from: 3.8 },
          { kind: 'myth', wrong: '甲醇烧了，等于白抓', right: '它能顶替一份石油和煤', from: 7 },
        ],
      },
      {
        turn: 4,
        title: '一开始就少排',
        duration: 11,
        cues: [
          { kind: 'sprite', icon: '💡', path: [[300, 380]], size: 110, from: 0.3 },
          { kind: 'text', at: [300, 530], text: '随手关灯', size: 's', from: 0.9 },
          { kind: 'sprite', icon: '🚲', path: [[600, 380]], size: 110, from: 1.8 },
          { kind: 'text', at: [600, 530], text: '多走路骑车', size: 's', from: 2.4 },
          { kind: 'sprite', icon: '🌡️', path: [[900, 380]], size: 110, from: 3.3 },
          { kind: 'text', at: [900, 530], text: '空调别太冷', size: 's', from: 3.9 },
          { kind: 'meter', at: [600, 690], label: '电厂烧煤', start: 0.8, end: 0.5, color: HEAT, over: 2.5, from: 5 },
          { kind: 'text', at: [600, 840], text: '最便宜的是少排', size: 'm', from: 8 },
        ],
      },
      {
        turn: 5,
        title: '躲不开的就去抓',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [250, 360], size: [200, 140], color: '#cfd8dc', text: '炼钢', from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [250, 600], size: [200, 140], color: '#e9e3d6', text: '烧水泥', from: 0.9 },
          { kind: 'arrow', path: [[370, 480], [560, 480]], color: '#c2410c', text: '抓住', from: 1.8 },
          { kind: 'shape', shape: 'rect', at: [680, 480], size: [200, 320], color: TOWER, text: '抓碳塔', from: 2.4 },
          { kind: 'sprite', icon: '🌳', path: [[1010, 420]], size: 160, from: 4.4 },
          { kind: 'flow', path: [[820, 300], [960, 380]], color: '#9aa5b1', count: 5, speed: 120, size: 11, from: 5 },
          { kind: 'label', at: [1010, 470], pos: [1010, 650], text: '光合作用', from: 5.8 },
          { kind: 'text', at: [600, 830], text: '帮大自然多干一份活', size: 'm', from: 8 },
        ],
      },
    ],
  },
};
