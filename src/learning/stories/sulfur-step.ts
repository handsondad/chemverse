import { lessonAsset } from '../assets';
import type { Story } from './types';

const SULFUR = '#ffe066';
const SO2 = '#fff0a8';
const IRON = '#a9b1ba';
const COPPER = '#d9844a';
const PINK = '#ff7aa8';
const UP = '#c2410c';
const DOWN = '#4c6ef5';

export const sulfurStep: Story = {
  slug: 'sulfur-step',
  title: '葡萄酒里怎么能加二氧化硫？同一个硫，为什么一会儿是黄粉、一会儿又成了漂白剂？',
  trigger: '小念帮爸爸看葡萄酒瓶的背标，配料里写着「二氧化硫」，可课本上说，它是形成酸雨的气体呀。',
  dialogue: [
    {
      nian: '二氧化硫不是会形成酸雨吗？怎么还能加进葡萄酒里？',
      dad: '因为量差得很远，去向也不一样。葡萄酒里只加一丁点，国家标准对用量有严格的上限：它抢先和氧气反应，替酒挡住氧化，还能抑制杂菌。可烧煤时成吨的二氧化硫排进空气，被氧化后溶进雨水，就成了酸雨。同一种物质，多少和去向决定了它是帮手还是麻烦。',
      figure: {
        kind: 'table',
        caption: '硫在第 16 族，就在氧的正下方。它和氧是一家，脾气相近：都能和许多金属、非金属直接反应。',
        focus: { by: 'group', values: [16] },
        ring: [16],
      },
    },
    {
      nian: '同一个硫，为什么有时候是黄色的粉，有时候又成了二氧化硫这种气体？',
      dad: '因为硫的化合价能上能下，像一部有四层楼的电梯：最低层是 −2 价，比如有臭鸡蛋味的硫化氢；0 价就是黄色的硫粉；+4 价是二氧化硫；最高层 +6 价是硫酸。硫往上走就要交出电子，往下走就要拿回电子。',
      eq: 'S：−2（H₂S）· 0（S）· +4（SO₂）· +6（H₂SO₄）',
      show: { kind: 'lab', step: 7, label: '看「价态电梯」' },
      figure: {
        kind: 'shells',
        caption: '氧和硫最外层都是 6 个电子（橙色），再拿 2 个就满，所以最低都是 −2 价；硫外层离核更远，还能把电子交出去，最高到 +6。',
        atoms: [8, 16],
      },
    },
    {
      nian: '往下走要拿回电子，那硫粉碰到铁粉，会从铁那里拿电子吗？',
      dad: '会。硫从铁那里拿走电子，自己从 0 价降到 −2 价，铁升到 +2 价，变成黑色的硫化亚铁。把硫粉和铁粉混成一长条，用烧红的玻璃棒碰一下一端，红光就会自己一路烧到另一端：反应放出的热，正好点着了旁边的粉末。',
      eq: 'Fe + S =△= FeS',
      show: { kind: 'lab', step: 1, label: '看「硫粉 + 铁粉」' },
      figure: {
        kind: 'image',
        src: lessonAsset('covers/sulfur-step.webp'),
        alt: '石棉网上一条硫粉和铁粉的混合物，中间正发着红光，一端已经变黑',
        caption: '左边黄色的是还没反应的硫粉和铁粉，中间红亮的地方正在反应，烧过的右边成了黑色的硫化亚铁。',
      },
    },
    {
      nian: '硫粉会拿铁的电子，那硫酸里在最高层的硫，也能去抢别人的电子吗？',
      dad: '能，浓硫酸就是个狠角色。把铜片放进浓硫酸里加热，+6 价的硫抢走铜的电子，自己降到 +4 价，变成二氧化硫冒出来，铜变成蓝色的硫酸铜。很多人以为稀硫酸也行，其实铜放进稀硫酸里怎么加热都不反应：要浓、还要加热，才有这么强的抢电子本领。',
      eq: 'Cu + 2H₂SO₄(浓) =△= CuSO₄ + SO₂↑ + 2H₂O',
      show: { kind: 'lab', step: 2, label: '看「浓硫酸与铜」' },
    },
    {
      nian: '冒出来的二氧化硫，为什么能把红色的品红变成无色，一加热又变回红色？',
      dad: '因为二氧化硫的漂白是抱住颜色，不是毁掉颜色：它和品红结合成一种不稳定的无色物质，一加热，怀抱松开，红色就回来了。氯水的漂白不一样，次氯酸把色素彻底破坏，再怎么加热也变不回去。所以一个能复原，一个不能。',
      eq: 'SO₂ + 品红 ⇌ 不稳定的无色物质',
      show: { kind: 'lab', step: 4, label: '看「加热复原」' },
    },
    {
      nian: '二氧化硫在 +4 价的中间层，是不是既能往上走、又能往下走？',
      dad: '正是！往上走：遇到紫色的酸性高锰酸钾，它被抢走电子变成 +6 价，紫色褪掉，说明它有还原性，葡萄酒里替酒挡氧气靠的就是这个。往下走：和 −2 价的硫化氢相遇，两边一起走到 0 价，溶液里冒出淡黄色的硫。中间层的物质，往往两头都能去。',
      eq: 'SO₂ 使酸性 KMnO₄ 褪色（+4 → +6） ｜ 2H₂S + SO₂ = 3S↓ + 2H₂O',
      show: { kind: 'lab', step: 5, label: '看「三支检验管」' },
    },
    {
      nian: '我懂了！硫有 −2、0、+4、+6 四层，交出电子往上走、拿回电子往下走；二氧化硫在中间，少量能替葡萄酒挡住氧气，大量排进空气就会变成酸雨。',
      dad: '总结得真漂亮！记一条好习惯：闻到刺鼻的二氧化硫味或者臭鸡蛋味，马上远离、开窗通风；少烧散煤、多用清洁能源，就是在帮天空少下酸雨。',
    },
  ],
  tip: '浓硫酸有强腐蚀性，二氧化硫和硫化氢都有毒，相关实验只适合在学校通风橱里由老师演示。食品中的二氧化硫等添加剂按国家标准限量使用；对亚硫酸盐过敏的人（部分哮喘患者）购买时请留意配料表。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '少量护酒，大量酸雨',
        duration: 11,
        cues: [
          { kind: 'sprite', icon: '🍷', path: [[300, 440]], size: 140, from: 0.3 },
          { kind: 'particles', box: [230, 560, 140, 70], count: 3, color: SO2, symbol: 'SO₂', motion: 'jitter', size: 28, from: 1.2 },
          { kind: 'label', at: [300, 600], pos: [300, 740], text: '少量：挡住氧气', from: 2.2 },
          { kind: 'sprite', icon: '🏭', path: [[880, 640]], size: 140, from: 4 },
          { kind: 'particles', box: [770, 260, 220, 300], count: 12, color: SO2, symbol: 'SO₂', motion: 'rise', size: 28, from: 4.8 },
          { kind: 'sprite', icon: '🌧️', path: [[1060, 250]], size: 100, wobble: true, from: 6.4 },
          { kind: 'text', at: [600, 850], text: '多少和去向，决定好坏', size: 'm', from: 8 },
        ],
      },
      {
        turn: 1,
        title: '硫的价态电梯',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [420, 720], size: [250, 90], color: '#e4d8ff', text: '−2 硫化氢', from: 0.3 },
          { kind: 'shape', shape: 'pill', at: [420, 560], size: [250, 90], color: SULFUR, text: '0 硫粉', from: 0.6 },
          { kind: 'shape', shape: 'pill', at: [420, 400], size: [250, 90], color: SO2, text: '+4 二氧化硫', from: 0.9 },
          { kind: 'shape', shape: 'pill', at: [420, 240], size: [250, 90], color: '#ffd6bf', text: '+6 硫酸', from: 1.2 },
          { kind: 'atom', path: [[680, 720], [680, 560], [680, 400], [680, 240]], symbol: 'S', color: SULFUR, r: 40, travel: 4.5, from: 1.8 },
          { kind: 'arrow', path: [[860, 720], [860, 250]], color: UP, text: '交出电子', from: 3 },
          { kind: 'arrow', path: [[1040, 250], [1040, 720]], color: DOWN, text: '拿回电子', from: 5.4 },
          { kind: 'text', at: [600, 850], text: '往上交电子，往下拿电子', size: 'm', from: 8 },
        ],
      },
      {
        turn: 2,
        title: '硫和铁一路烧过去',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 440], size: [760, 90], color: '#e8d25a', tint: { color: '#3d3a36', at: 2.8, over: 5 }, from: 0.2 },
          { kind: 'arrow', path: [[140, 280], [215, 410]], color: UP, text: '烧红的玻璃棒', from: 0.6, to: 6 },
          { kind: 'sprite', icon: '🔥', path: [[230, 440], [970, 440]], size: 80, travel: 5, from: 2.4 },
          { kind: 'atom', path: [[460, 660]], symbol: 'Fe', color: IRON, r: 48, from: 1, to: 7.2 },
          { kind: 'atom', path: [[740, 660]], symbol: 'S', color: SULFUR, r: 48, from: 1.2, to: 7.2 },
          { kind: 'atom', path: [[510, 640], [690, 640]], symbol: 'e⁻', color: '#ffcf3f', r: 20, travel: 1, from: 6, to: 7.4 },
          { kind: 'atom', path: [[460, 660]], symbol: 'Fe', charge: '2+', color: IRON, r: 48, from: 7.2 },
          { kind: 'atom', path: [[740, 660]], symbol: 'S', charge: '2−', color: SULFUR, r: 48, from: 7.2 },
          { kind: 'label', at: [800, 440], pos: [880, 300], text: '黑色的硫化亚铁', from: 8 },
          { kind: 'formula', at: [600, 850], text: 'Fe + S =△= FeS', from: 8.8 },
        ],
      },
      {
        turn: 3,
        title: '浓硫酸抢铜的电子',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [330, 540], size: [300, 340], liquid: '#eef4fb', level: 0.6, label: '稀硫酸 + 铜', from: 0 },
          { kind: 'vessel', vessel: 'beaker', at: [870, 540], size: [300, 340], liquid: '#f4f1e6', level: 0.6, tint: { color: '#9cc9f0', at: 4, over: 3 }, label: '浓硫酸 + 铜', from: 0 },
          { kind: 'shape', shape: 'rect', at: [330, 620], size: [40, 150], color: COPPER, from: 0.5 },
          { kind: 'shape', shape: 'rect', at: [870, 620], size: [40, 150], color: COPPER, from: 0.5 },
          { kind: 'sprite', icon: '🔥', path: [[600, 300]], size: 80, wobble: true, from: 1.2 },
          { kind: 'particles', box: [790, 330, 160, 190], count: 8, color: SO2, symbol: 'SO₂', motion: 'rise', size: 28, from: 3 },
          { kind: 'label', at: [330, 560], pos: [330, 250], text: '不反应', from: 5 },
          { kind: 'text', at: [600, 850], text: '要浓，还要加热', size: 'm', from: 8 },
        ],
      },
      {
        turn: 4,
        title: '抱住颜色，不是毁掉',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [450, 520], size: [320, 360], liquid: PINK, level: 0.7, tint: { color: '#f6f0f4', at: 2.6, over: 2 }, from: 0, to: 6 },
          { kind: 'particles', box: [330, 400, 240, 220], count: 6, color: SO2, symbol: 'SO₂', motion: 'jitter', size: 28, from: 1, to: 6 },
          { kind: 'label', at: [450, 560], pos: [880, 400], text: '无色，但抱得不牢', from: 4.4, to: 7 },
          { kind: 'vessel', vessel: 'beaker', at: [450, 520], size: [320, 360], liquid: '#f6f0f4', level: 0.7, tint: { color: PINK, at: 7.4, over: 2 }, from: 6 },
          { kind: 'sprite', icon: '🔥', path: [[450, 780]], size: 80, wobble: true, from: 6.6 },
          { kind: 'text', at: [880, 560], text: '一加热，红色回来', size: 's', color: '#d6336c', from: 9 },
        ],
      },
      {
        turn: 5,
        title: '中间层两头都能去',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [600, 220], size: [260, 90], color: '#ffd6bf', text: '+6 硫酸', from: 0.3 },
          { kind: 'shape', shape: 'pill', at: [600, 450], size: [260, 90], color: SO2, text: '+4 二氧化硫', from: 0.3 },
          { kind: 'shape', shape: 'pill', at: [600, 680], size: [260, 90], color: SULFUR, text: '0 硫', from: 0.3 },
          { kind: 'shape', shape: 'circle', at: [250, 320], size: [190, 190], color: '#9c36b5', text: '高锰酸钾', tint: { color: '#f3e8f7', at: 3.4, over: 2 }, from: 1 },
          { kind: 'arrow', path: [[600, 400], [600, 270]], color: UP, text: '还原性', from: 2.4 },
          { kind: 'shape', shape: 'circle', at: [950, 600], size: [190, 190], color: '#eef4fb', text: '硫化氢', tint: { color: '#f5e08a', at: 7, over: 2 }, from: 5.4 },
          { kind: 'arrow', path: [[600, 500], [600, 630]], color: DOWN, text: '氧化性', from: 6.4 },
          { kind: 'text', at: [600, 840], text: '中间价态，能上能下', size: 'm', from: 9 },
        ],
      },
    ],
  },
};
