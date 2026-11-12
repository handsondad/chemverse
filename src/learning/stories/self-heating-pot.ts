import type { Story } from './types';

const LIME = '#ffe08a';
const ALUMINIUM = '#d7dbe3';
const HEAT = '#ff5a5f';
const WATER = '#4fb6ff';
const STEAM = '#b7d3e6';

export const selfHeatingPot: Story = {
  slug: 'self-heating-pot',
  title: '自热火锅没有火也没插电，倒一袋冷水怎么就咕嘟咕嘟烧开了？',
  trigger: '露营时，爸爸往自热火锅的发热包上倒了一袋凉水，盖上盒盖没多久，透气孔就呼呼冒出白汽。',
  dialogue: [
    {
      nian: '爸爸，这里面又没有火，也没插电，倒进去的明明是凉水，怎么一会儿就冒热气了？',
      dad: '热是从发热包里那包白色粉末来的。粉末的主力是生石灰，它一碰到水就和水反应，变成熟石灰，同时放出一大股热，几十秒就能把水烧得冒泡。这种一边反应一边往外放热的变化，化学上叫「放热反应」。',
      eq: 'CaO + H₂O = Ca(OH)₂',
      figure: {
        kind: 'table',
        focus: { by: 'atoms', values: [1, 8, 20] },
        ring: [20, 8],
        caption: '生石灰由第 2 族的钙（Ca）和氧（O）组成，一遇冷水（H₂O）就剧烈放热变成熟石灰。',
      },
      show: { kind: 'lab', step: 0, label: '看第一波升温' },
    },
    {
      nian: '生石灰碰到水为什么会放热？热原来是藏在粉末里的吗？',
      dad: '可以这么想：能量一直锁在物质里。反应时要先拆开生石灰和水里原来的化学键，这一步得花能量；拼成熟石灰时新的化学键又会放出能量。放出来的比花掉的多，多出来的那部分就变成了热，就像拆旧积木只花一点力气，搭成新积木却能领回更多。',
    },
    {
      nian: '可熟石灰一下子就生成了，热也是一下子放完的，那它怎么能撑着把一盒火锅煮上十几分钟？',
      dad: '你抓到关键了，生石灰只管「点火」。发热包里还配了铝粉和碳酸钠：熟石灰和碳酸钠在水里生成碱性很强的氢氧化钠，铝粉泡在这种碱液里会慢慢反应，一边放热一边冒出氢气。它像接力赛的第二棒，把高温撑上十几分钟。',
      eq: '2Al + 2NaOH + 6H₂O = 2Na[Al(OH)₄] + 3H₂↑',
      figure: {
        kind: 'shells',
        atoms: [20, 13, 11],
        caption: '发热包接力赛里的三种金属原子：打头阵的钙（Ca），以及碱液里持续放热的铝（Al）和钠（Na）。',
      },
      show: { kind: 'lab', step: 1, label: '看铝粉接力' },
    },
    {
      nian: '氢气不是能烧起来的气体吗？盒子里冒氢气，会不会很危险？',
      dad: '问得好。氢气的量其实不多，正常使用时会跟着水蒸气从盒盖上的透气孔散掉。危险在于堵住透气孔，或者在车里这种密闭小空间里用：水蒸气把盒子越撑越胀，可能顶开盖子喷出烫水；散不掉的氢气碰到明火，也可能被点着。所以说明书才反复写着「保持透气孔畅通、通风使用」。',
      show: { kind: 'lab', step: 2, label: '看安全红线' },
    },
    {
      nian: '说明书上还写着只能加冷水，用热水不是能热得更快吗？',
      dad: '恰恰是因为会「太快」。温度越高，反应越快：倒热水进去，发热包几乎一下子放出全部热量，水猛烈沸腾，蒸汽来不及从透气孔散出去，烫水可能溢出来甚至顶开盒子。冷水让反应由慢到快，热量才能平稳地放上一刻钟。温度能改变反应快慢，是化学里很常用的规律。',
    },
    {
      nian: '我明白了！发热包里的生石灰碰到冷水先放出第一股热，铝粉在碱液里接力慢慢放热，还会冒氢气，所以透气孔不能堵，也只能加冷水。',
      dad: '说得完整！化学能变成热能，就藏在这一包粉末里。再养成一个好习惯：吃完等发热包彻底凉了再整包扔掉，别拆开它。里面的残渣碱性很强，沾到皮肤或眼睛要马上用大量清水冲洗。',
    },
  ],
  tip: '发热包遇水会产生高温蒸汽和少量氢气：请在通风处使用，不要在车内、帐篷等密闭空间加热，不要堵住透气孔；只能加常温冷水，不要用热水或饮料代替；按照民航规定，自热食品不能带上飞机。用完待冷却后整包丢弃，残渣呈强碱性，沾到皮肤或眼睛请立即用大量清水冲洗。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '冷水倒进发热包',
        duration: 10,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [600, 560], size: [580, 260], label: '自热火锅的底盒', from: 0 },
          { kind: 'flow', path: [[600, 150], [600, 590]], color: WATER, count: 9, speed: 380, size: 11, from: 0.8, to: 3.4 },
          { kind: 'shape', shape: 'rect', at: [600, 630], size: [400, 100], color: '#e9e3d6', text: '发热包', tint: { color: '#ffb36b', at: 3, over: 2.5 }, from: 0.3 },
          { kind: 'label', at: [480, 630], pos: [260, 320], text: '生石灰 CaO', from: 1.8, to: 6.2 },
          { kind: 'pulse', at: [600, 630], color: HEAT, radius: 230, from: 3.6 },
          { kind: 'particles', box: [380, 250, 440, 300], count: 16, color: STEAM, motion: 'rise', size: 14, from: 4.2 },
          { kind: 'meter', at: [890, 120], label: '盒内温度', start: 0.12, end: 0.95, color: HEAT, over: 4.5, from: 3.4 },
          { kind: 'text', at: [600, 830], text: '不用火，也能变热', size: 'm', from: 6.6 },
        ],
      },
      {
        turn: 1,
        title: '能量锁在化学键里',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'circle', at: [330, 400], size: [180, 180], color: LIME, text: 'CaO', from: 0.3, to: 4.6 },
          { kind: 'shape', shape: 'circle', at: [870, 400], size: [160, 160], color: '#bfe3ff', text: 'H₂O', from: 0.6, to: 4.6 },
          { kind: 'arrow', path: [[450, 400], [560, 400]], color: '#7a6a55', from: 1.6, to: 4.6 },
          { kind: 'arrow', path: [[760, 400], [650, 400]], color: '#7a6a55', from: 1.8, to: 4.6 },
          { kind: 'meter', at: [330, 200], label: '拆键花掉', start: 0, end: 0.35, color: '#b9c4cf', over: 1.6, from: 2.4 },
          { kind: 'shape', shape: 'circle', at: [600, 420], size: [250, 250], color: '#fff3d6', text: 'Ca(OH)₂', motion: 'pulse', from: 4.8 },
          { kind: 'meter', at: [870, 200], label: '成键放出', start: 0, end: 0.9, color: HEAT, over: 2, from: 5 },
          { kind: 'pulse', at: [600, 420], color: HEAT, radius: 260, from: 5.4 },
          { kind: 'text', at: [600, 760], text: '放出的 > 花掉的 = 放热', size: 's', from: 7.6 },
        ],
      },
      {
        turn: 2,
        title: '铝粉接力放热',
        duration: 12,
        cues: [
          { kind: 'arrow', path: [[170, 720], [1060, 720]], color: '#7a6a55', text: '时间', from: 0.2 },
          { kind: 'arrow', path: [[170, 720], [170, 170]], color: '#7a6a55', text: '温度', from: 0.4 },
          { kind: 'arrow', path: [[180, 700], [260, 470], [340, 320], [460, 280], [640, 272], [820, 280], [1000, 300]], color: HEAT, draw: 6, from: 1 },
          { kind: 'label', at: [300, 390], pos: [470, 520], text: '生石灰：几十秒升温', color: '#b5651d', from: 2.2 },
          { kind: 'label', at: [760, 276], pos: [760, 470], text: '铝粉：撑十几分钟', color: '#4a5568', from: 5.6 },
          { kind: 'particles', box: [880, 120, 200, 150], count: 5, color: '#f4f4f0', symbol: 'H₂', motion: 'rise', size: 32, from: 6.4 },
          { kind: 'formula', at: [600, 830], text: '2Al + 2NaOH + 6H₂O = 2Na[Al(OH)₄] + 3H₂↑', from: 7.6 },
        ],
      },
      {
        turn: 3,
        title: '透气孔不能堵',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 540], size: [540, 300], color: '#f3e7d3', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 372], size: [580, 44], color: '#c9b79c', from: 0 },
          { kind: 'particles', box: [390, 440, 420, 180], count: 6, color: '#f4f4f0', symbol: 'H₂', motion: 'gas', size: 32, from: 0.5 },
          { kind: 'flow', path: [[720, 470], [720, 372], [745, 230], [790, 110]], color: STEAM, count: 8, speed: 260, size: 13, from: 1.2, to: 5.3 },
          { kind: 'label', at: [720, 372], pos: [960, 270], text: '透气孔', from: 1.8, to: 5.3 },
          { kind: 'shape', shape: 'circle', at: [720, 372], size: [74, 74], color: HEAT, text: '堵', from: 5.6 },
          { kind: 'pulse', at: [600, 540], color: HEAT, radius: 300, rate: 1.6, from: 6.2 },
          { kind: 'text', at: [600, 820], text: '盒子越撑越胀！', size: 'm', color: '#c2410c', from: 6.8 },
        ],
      },
      {
        turn: 4,
        title: '冷水还是热水',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'pill', at: [330, 230], size: [220, 84], color: '#bfe3ff', text: '冷水', from: 0.2 },
          { kind: 'shape', shape: 'pill', at: [870, 230], size: [220, 84], color: '#ffd6bf', text: '热水', from: 0.4 },
          { kind: 'meter', at: [330, 380], label: '放热速度', start: 0, end: 0.45, color: WATER, over: 4, from: 1.2 },
          { kind: 'meter', at: [870, 380], label: '放热速度', start: 0, end: 1, color: HEAT, over: 0.9, from: 1.2 },
          { kind: 'sprite', icon: '💥', path: [[870, 560]], size: 110, wobble: true, from: 2.4 },
          { kind: 'sprite', icon: '🍲', path: [[330, 560]], size: 110, from: 4.4 },
          { kind: 'myth', wrong: '加热水，热得更快更好', right: '冷水让放热又稳又久', from: 6.2 },
        ],
      },
      {
        turn: 5,
        title: '化学能变成热能',
        duration: 9,
        cues: [
          { kind: 'text', at: [600, 230], text: '化学能 → 热能', size: 'l', from: 0.3 },
          { kind: 'shape', shape: 'pill', at: [260, 500], size: [210, 90], color: LIME, text: '生石灰', from: 1 },
          { kind: 'arrow', path: [[380, 500], [470, 500]], color: HEAT, from: 1.6 },
          { kind: 'shape', shape: 'pill', at: [600, 500], size: [210, 90], color: ALUMINIUM, text: '铝粉', from: 2.2 },
          { kind: 'arrow', path: [[720, 500], [810, 500]], color: HEAT, from: 2.8 },
          { kind: 'sprite', icon: '🍲', path: [[930, 500]], size: 110, from: 3.4 },
          { kind: 'text', at: [600, 760], text: '透气孔畅通 · 只加冷水', size: 's', color: '#1f6b55', from: 4.6 },
        ],
      },
    ],
  },
};
