import { lessonAsset } from '../assets';
import type { Story } from './types';

const ORE = '#a0522d';
const IRON = '#9aa5b1';
const OXYGEN = '#ff8a80';
const FURNACE = '#f3e3d3';
const COKE = '#4a4a4a';
const CO2 = '#cfd8dc';
const CO = '#ffd8a8';
const GAS = '#7aa6c8';
const HEAT = '#e8590c';
const PIG_IRON = '#7d7f82';
const STEEL = '#b0bec5';
const WATER = '#bfe3ff';
const MOLTEN = '#ff8c42';
const SLAG = '#c9b37e';

export const blastFurnaceStep: Story = {
  slug: 'blast-furnace-step',
  title: '大桥的钢梁、家里的菜刀都是铁做的，红褐色的铁矿石怎么变成铁？',
  trigger: '小念坐车过江，看着大桥上一根根钢梁，想起爸爸说过铁矿石是红褐色的石头，像一大块铁锈。',
  dialogue: [
    {
      nian: '爸爸，铁矿石明明是红褐色的石头，怎么会变成亮闪闪的铁？',
      dad: '关键是把铁身上的氧拿走。红褐色铁矿石的主要成分是氧化铁，铁和氧紧紧抱在一起，跟铁锈差不多。高炉里有一种气体比铁更想要氧，把氧一个个抢走，剩下的就是铁。这叫还原，炼铁就像把生锈倒着走一遍。',
      eq: 'Fe₂O₃ + 3CO =高温= 2Fe + 3CO₂',
      figure: {
        kind: 'image',
        src: lessonAsset('covers/blast-furnace-step.webp'),
        alt: '剖开的高炉，炉里红褐色矿石和黑色焦炭一层层堆着，两侧有风口，底部淌出橙红色铁水',
        caption: '高炉剖开看：矿石和焦炭从炉顶一层层倒进去，热风从两侧吹进炉子下部，底下淌出橙红色的铁水。',
      },
      show: { kind: 'lab', step: 0, label: '看「矿石变铁」' },
    },
    {
      nian: '是什么气体比铁还想要氧？它是从哪儿来的？',
      dad: '是一氧化碳，它是焦炭变出来的。从炉子下部吹进一千多度的热风，焦炭先烧成二氧化碳，放出大量的热；二氧化碳往上走，又碰上烧红的焦炭，变成一氧化碳。所以焦炭身兼两职：既当燃料供热，又造出抢氧的一氧化碳。',
      eq: 'C + O₂ =高温= CO₂　CO₂ + C =高温= 2CO',
      show: { kind: 'lab', step: 3, label: '看「风口烧焦」' },
    },
    {
      nian: '一氧化碳往上走，矿石往下掉，为什么要让它们对着跑？',
      dad: '对着跑，才能一路加热、一路抢氧。矿石从炉顶慢慢往下沉，越往下越热；一氧化碳从下往上钻，一层层把氧抢走：氧化铁先变成四氧化三铁，再变成氧化亚铁，最后变成铁，到炉底已经熔成铁水。焦炭和矿石一层层地铺，焦炭层像留出的通风道，让气体钻得过去。',
      eq: 'Fe₂O₃ → Fe₃O₄ → FeO → Fe',
      show: { kind: 'lab', step: 4, label: '看「逐级还原」' },
    },
    {
      nian: '炉底的铁水流出来，就是做大桥的钢了吗？',
      dad: '还不是。很多人以为高炉里流出来的就是钢，其实那是生铁：它在炉里泡在焦炭堆中，吸进了不少碳，又硬又脆，一砸就裂。要把它送进炼钢炉，吹进氧气把多余的碳烧掉，才变成又结实又有韧性的钢。',
    },
    {
      nian: '炼钢这么费劲，我能帮着省一点铁吗？',
      dad: '能。一是别让铁生锈：生锈就是铁又和氧气、水结合在一起，等于把辛苦炼出的铁变回矿石的样子。自行车淋了雨要擦干，铁锅用完烘干、抹点油。二是旧铁锅、旧铁丝送去回收，炼钢厂把废钢直接回炉，比从矿石炼起省下大量焦炭。',
    },
    {
      nian: '从矿石炼起的话，矿石里混着的沙子跑哪儿去了？',
      dad: '靠一起加进去的石灰石把它带走。石灰石受热分解成生石灰，生石灰和沙子里的二氧化硅结合成硅酸钙，熔成液态的炉渣。炉渣比铁水轻，像汤上浮的一层油，盖在铁水上面，还能挡住空气、不让铁水再被氧化。放出来以后上下一分，渣和铁就分开了，炉渣还能拿去做水泥。',
      eq: 'CaCO₃ =高温= CaO + CO₂↑　CaO + SiO₂ =高温= CaSiO₃',
      show: { kind: 'lab', step: 5, label: '看「石灰石造渣」' },
    },
    {
      nian: '我懂了！焦炭在热风里烧出热量和一氧化碳，一氧化碳一路往上，把铁矿石里的氧一层层抢走，铁熔成铁水沉在炉底；石灰石把沙子变成炉渣浮在上面；生铁再烧掉多余的碳，才是造大桥的钢！',
      dad: '说得对！好习惯：淋湿的自行车、洗好的铁锅及时擦干，别让辛辛苦苦炼出来的铁又变回“铁锈”。',
    },
  ],
  tip: '高炉煤气里有大量一氧化碳，无色无味、毒性很强；家里的燃气热水器、炭火锅也会产生一氧化碳，一定要通风。铁水温度上千度，炼铁只在课本和视频里了解。文中热风“一千多度”为常见工艺范围，炼铁里也有一部分铁是焦炭直接还原的，这里只讲主要的一氧化碳还原。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '把氧从铁身上拿走',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'circle', at: [340, 430], size: [280, 230], color: ORE, text: '铁矿石', from: 0.2 },
          { kind: 'label', at: [340, 500], pos: [340, 660], text: '主要成分氧化铁', from: 0.8 },
          { kind: 'particles', box: [270, 200, 140, 180], count: 4, color: OXYGEN, motion: 'rise', symbol: 'O', size: 20, from: 1.6, to: 4.6 },
          { kind: 'arrow', path: [[520, 430], [700, 430]], color: HEAT, text: '抢走氧', from: 2.4 },
          { kind: 'shape', shape: 'circle', at: [880, 430], size: [240, 200], color: IRON, text: '铁', from: 3.4 },
          { kind: 'text', at: [880, 620], text: '这叫还原', size: 's', from: 4.6 },
          { kind: 'formula', at: [600, 820], text: 'Fe₂O₃ + 3CO = 2Fe + 3CO₂', from: 6.4 },
        ],
      },
      {
        turn: 1,
        title: '焦炭身兼两职',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 460], size: [520, 500], color: FURNACE, from: 0 },
          { kind: 'arrow', path: [[140, 620], [340, 620]], color: HEAT, text: '热风', from: 0.6 },
          { kind: 'shape', shape: 'pill', at: [600, 620], size: [240, 70], color: COKE, text: '焦炭', from: 0.3 },
          { kind: 'pulse', at: [600, 620], color: HEAT, radius: 200, from: 1.4 },
          { kind: 'particles', box: [520, 460, 160, 120], count: 4, color: CO2, motion: 'rise', symbol: 'CO₂', size: 22, from: 2, to: 5 },
          { kind: 'shape', shape: 'pill', at: [600, 420], size: [240, 70], color: COKE, text: '焦炭', from: 2.8 },
          { kind: 'particles', box: [500, 230, 200, 140], count: 5, color: CO, motion: 'rise', symbol: 'CO', size: 22, from: 4.6 },
          { kind: 'text', at: [600, 830], text: '既供热，又造 CO', size: 'm', from: 8 },
        ],
      },
      {
        turn: 2,
        title: '对着跑，一层层抢氧',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 460], size: [360, 640], color: FURNACE, from: 0 },
          { kind: 'flow', path: [[550, 170], [550, 750]], color: ORE, count: 7, speed: 110, size: 13, from: 0.3 },
          { kind: 'flow', path: [[650, 750], [650, 170]], color: GAS, count: 7, speed: 220, size: 10, from: 0.8 },
          { kind: 'arrow', path: [[200, 220], [200, 720]], color: HEAT, text: '越往下越热', from: 1.4 },
          { kind: 'label', at: [780, 260], pos: [1000, 260], text: 'Fe₂O₃', from: 2.6 },
          { kind: 'label', at: [780, 420], pos: [1000, 420], text: 'Fe₃O₄', from: 4 },
          { kind: 'label', at: [780, 580], pos: [1000, 580], text: 'FeO', from: 5.4 },
          { kind: 'label', at: [780, 720], pos: [1000, 720], text: '铁水 Fe', from: 6.8 },
        ],
      },
      {
        turn: 3,
        title: '生铁还不是钢',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'pill', at: [330, 320], size: [260, 90], color: PIG_IRON, text: '生铁', from: 0.2 },
          { kind: 'particles', box: [220, 390, 220, 90], count: 6, color: COKE, motion: 'jitter', symbol: 'C', size: 18, from: 0.8 },
          { kind: 'text', at: [330, 560], text: '又硬又脆', size: 's', from: 1.6 },
          { kind: 'arrow', path: [[500, 330], [700, 330]], color: HEAT, text: '吹氧去碳', from: 3 },
          { kind: 'shape', shape: 'pill', at: [880, 320], size: [260, 90], color: STEEL, text: '钢', from: 4.2 },
          { kind: 'text', at: [880, 560], text: '结实有韧性', size: 's', from: 5 },
          { kind: 'myth', wrong: '高炉里流出来的就是钢', right: '那是生铁，还要炼成钢', from: 7.2 },
        ],
      },
      {
        turn: 4,
        title: '别让铁变回铁锈',
        duration: 11,
        cues: [
          { kind: 'sprite', icon: '🚲', path: [[330, 360]], size: 140, from: 0.2 },
          { kind: 'flow', path: [[330, 160], [330, 280]], color: WATER, count: 5, speed: 200, size: 8, from: 0.8, to: 3.6 },
          { kind: 'text', at: [330, 540], text: '淋了雨，擦干', size: 's', from: 2.8 },
          { kind: 'sprite', icon: '🍳', path: [[870, 360]], size: 130, from: 1.8 },
          { kind: 'text', at: [870, 540], text: '烘干，抹点油', size: 's', from: 3.6 },
          { kind: 'sprite', icon: '♻️', path: [[600, 690]], size: 90, from: 5.8 },
          { kind: 'text', at: [600, 830], text: '废铁送去回收', size: 'm', from: 7.4 },
        ],
      },
      {
        turn: 5,
        title: '石灰石带走沙子',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [600, 500], size: [520, 360], liquid: MOLTEN, level: 0.3, label: '炉缸', from: 0 },
          { kind: 'shape', shape: 'pill', at: [400, 250], size: [180, 70], color: '#f4f1ea', text: 'CaO', from: 0.6, to: 3.4 },
          { kind: 'shape', shape: 'pill', at: [800, 250], size: [180, 70], color: '#e0d6c2', text: 'SiO₂', from: 1.2, to: 3.4 },
          { kind: 'shape', shape: 'pill', at: [600, 340], size: [240, 70], color: SLAG, text: 'CaSiO₃', from: 3.4 },
          { kind: 'shape', shape: 'rect', at: [600, 562], size: [514, 38], color: SLAG, from: 4.6 },
          { kind: 'label', at: [760, 562], pos: [1000, 430], text: '炉渣浮在上面', from: 5.4 },
          { kind: 'label', at: [760, 640], pos: [1000, 640], text: '铁水沉在下面', from: 6.4 },
          { kind: 'text', at: [600, 840], text: '炉渣还能做水泥', size: 'm', from: 8.6 },
        ],
      },
    ],
  },
};
