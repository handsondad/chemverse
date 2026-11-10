import { lessonAsset } from '../assets';
import type { Story } from './types';

const WATER = '#d8efff';
const SODIUM = '#b48cff';
const CHLORINE = '#9be29b';
const SUGAR = '#f6c56b';
const ELECTRODE = '#5b5f66';
const BULB_OFF = '#e9e6dc';
const BULB_ON = '#ffd84d';
const ACID = '#f6e7b0';

export const conductivityStep: Story = {
  slug: 'conductivity-step',
  title: '我的手还是那只手，为什么一沾水就容易触电？',
  trigger: '小念洗完手没擦干，伸手就要去拔充电器，被爸爸一把拦住：「湿手不能碰插座！」',
  dialogue: [
    {
      nian: '我的手还是那只手，为什么一沾水就容易触电？',
      dad: '因为湿手上的水能让电走过去。手上出过汗会留下一点盐，水一来盐就化开，变成许多带电的小颗粒，电就靠它们一个传一个地搬运。干皮肤像一堵干墙，电很难穿过；沾了水，就像墙上一下开了好多门，电流顺着湿皮肤就钻进了身体。',
      show: { kind: 'lab', step: 0, label: '看「认识台面」' },
    },
    {
      nian: '带电的小颗粒是什么？干盐粒里也有，为什么干盐不导电？',
      dad: '这些带电的小颗粒叫离子。食盐由带正电的钠离子和带负电的氯离子组成，在干盐粒里它们一个挨一个排得整整齐齐，像做广播操的同学，只能原地站着，电就搬不过去。导电要的是能自由跑动的离子。把盐烧到熔化，队形散了，它也能导电。',
      eq: 'NaCl（固体）→ 熔化 → 能自由跑动的 Na⁺ 和 Cl⁻',
      show: { kind: 'lab', step: 1, label: '看「干燥与熔融」' },
    },
    {
      nian: '盐要烧到熔化才行，那撒进水里没有熔化，为什么也能导电？',
      dad: '因为水分子会把离子一个个从盐粒上拉下来。水分子一头带一点正电、一头带一点负电，像一群带着小磁铁的手，围住钠离子和氯离子，把它们拽进水里自由游动，这个过程叫电离。一通电，带正电的往负极游，带负电的往正极游，电就被搬过去了，灯也亮了。',
      eq: 'NaCl = Na⁺ + Cl⁻',
      show: { kind: 'lab', step: 2, label: '看「溶于水」' },
      figure: {
        kind: 'image',
        src: lessonAsset('covers/conductivity-step.webp'),
        alt: '烧杯里插着两根碳棒，导线连着电池、电阻和电流表',
        caption: '导电实验：两根碳棒插进液体，接上电池和电流表。液体里有能跑动的离子，电流表的指针才会偏。',
      },
    },
    {
      nian: '电离这么厉害，那白糖溶进水里，也会变成离子吗？',
      dad: '不会。很多人以为东西只要溶进水里就能导电，其实白糖溶进去还是一个个完整的糖分子，不带电，灯不亮。很纯的水也几乎不导电。可是家里的自来水、身上的汗里都溶着不少盐，所以别以为「只是水」就安全。',
      eq: 'C₁₂H₂₂O₁₁（蔗糖）溶于水，不电离',
      show: { kind: 'lab', step: 3, label: '看「水与蔗糖」' },
    },
    {
      nian: '自来水和汗都能导电，那我在家里要怎么做才不会触电？',
      dad: '记住三件事：手擦干再碰插头和开关；浴室里别用插着电的吹风机；看见有人触电，先关电闸，千万别伸手去拉，你的手也会变成电走的路。水里的离子越多，电走得越顺，所以手越湿越危险。',
    },
    {
      nian: '离子越多电走得越顺，那要是让水里的离子变少，灯会变暗吗？',
      dad: '会！往氢氧化钡溶液里一滴滴加稀硫酸，钡离子和硫酸根离子手拉手变成不溶于水的白色沉淀，氢离子和氢氧根离子结合成水，能跑的离子一批批退场，灯越来越暗，最后几乎熄灭；再多滴一些，多出来的硫酸又带来离子，灯又亮了。',
      eq: 'Ba²⁺ + 2OH⁻ + 2H⁺ + SO₄²⁻ = BaSO₄↓ + 2H₂O',
      show: { kind: 'lab', step: 5, label: '看「滴加稀硫酸」' },
    },
    {
      nian: '我懂了！电要靠能自由跑动的离子来搬：干盐里的离子站着不动，溶进水里被水分子拉开才能跑；白糖不会变成离子，所以不导电；汗和自来水里有离子，所以湿手碰电特别危险。',
      dad: '说得一点没错！养成一个好习惯：洗完手先擦干，再去碰插头、开关和电器；在浴室里用电，更要加倍小心。',
    },
  ],
  tip: '家庭用电是 220 伏交流电，湿手或赤脚站在湿地上时触电尤其危险；发现有人触电，先切断电源，不能直接用手去拉。氢氧化钡有毒、稀硫酸有腐蚀性，相关实验请在老师指导下进行。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '干手和湿手',
        duration: 11,
        cues: [
          { kind: 'sprite', icon: '🖐️', path: [[330, 420]], size: 150, from: 0.2 },
          { kind: 'sprite', icon: '🖐️', path: [[870, 420]], size: 150, from: 0.4 },
          { kind: 'text', at: [330, 230], text: '干手', size: 's', from: 0.6 },
          { kind: 'text', at: [870, 230], text: '湿手', size: 's', color: '#4c6ef5', from: 0.8 },
          { kind: 'particles', box: [780, 340, 180, 160], count: 6, color: WATER, motion: 'jitter', size: 14, from: 1.4 },
          { kind: 'meter', at: [330, 640], label: '电好不好走', start: 0, end: 0.12, color: '#e0762b', over: 3, from: 2.2 },
          { kind: 'meter', at: [870, 640], label: '电好不好走', start: 0, end: 0.85, color: '#e0762b', over: 3, from: 2.2 },
          { kind: 'text', at: [600, 830], text: '沾了水，电就好走了', size: 'm', from: 7 },
        ],
      },
      {
        turn: 1,
        title: '盐粒里站着不动',
        duration: 12,
        cues: [
          { kind: 'atom', path: [[540, 420]], symbol: 'Na', charge: '+', color: SODIUM, r: 40, motion: 'jitter', from: 0.3, to: 6 },
          { kind: 'atom', path: [[630, 420]], symbol: 'Cl', charge: '−', color: CHLORINE, r: 40, motion: 'jitter', from: 0.4, to: 6 },
          { kind: 'atom', path: [[540, 510]], symbol: 'Cl', charge: '−', color: CHLORINE, r: 40, motion: 'jitter', from: 0.5, to: 6 },
          { kind: 'atom', path: [[630, 510]], symbol: 'Na', charge: '+', color: SODIUM, r: 40, motion: 'jitter', from: 0.6, to: 6 },
          { kind: 'label', at: [585, 465], pos: [880, 300], text: '排好队，站着不动', from: 1.6, to: 4.6 },
          { kind: 'shape', shape: 'circle', at: [1000, 470], size: [120, 120], color: BULB_OFF, text: '灯', tint: { color: BULB_ON, at: 7.4, over: 1.2 }, from: 0.8 },
          { kind: 'sprite', icon: '🔥', path: [[585, 700]], size: 100, wobble: true, from: 4.4, to: 8.2 },
          { kind: 'particles', box: [360, 300, 460, 320], count: 4, color: SODIUM, symbol: 'Na⁺', motion: 'gas', size: 28, from: 6 },
          { kind: 'particles', box: [360, 300, 460, 320], count: 4, color: CHLORINE, symbol: 'Cl⁻', motion: 'gas', size: 28, from: 6.2 },
          { kind: 'text', at: [600, 840], text: '熔化后，离子能跑了', size: 'm', from: 8.6 },
        ],
      },
      {
        turn: 2,
        title: '水把离子拉开',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [600, 520], size: [560, 400], liquid: WATER, level: 0.75, from: 0 },
          { kind: 'shape', shape: 'rect', at: [420, 470], size: [36, 360], color: ELECTRODE, text: '−', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [780, 470], size: [36, 360], color: ELECTRODE, text: '+', from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [600, 660], size: [120, 70], color: '#ffffff', text: '盐', motion: 'shrink', over: 2, from: 0.6, to: 3 },
          { kind: 'atom', path: [[600, 620], [470, 560]], symbol: 'Na', charge: '+', color: SODIUM, r: 30, travel: 2.4, from: 2.4 },
          { kind: 'atom', path: [[600, 620], [730, 560]], symbol: 'Cl', charge: '−', color: CHLORINE, r: 30, travel: 2.4, from: 2.6 },
          { kind: 'shape', shape: 'circle', at: [600, 200], size: [120, 120], color: BULB_OFF, text: '灯', tint: { color: BULB_ON, at: 4.8, over: 1 }, from: 0.4 },
          { kind: 'pulse', at: [600, 200], color: BULB_ON, radius: 150, from: 5.2 },
          { kind: 'text', at: [600, 830], text: '离子跑起来，灯亮了', size: 'm', from: 7.2 },
        ],
      },
      {
        turn: 3,
        title: '糖水不亮',
        duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [330, 410], size: [320, 300], liquid: WATER, level: 0.7, label: '糖水', from: 0 },
          { kind: 'vessel', vessel: 'beaker', at: [870, 410], size: [320, 300], liquid: WATER, level: 0.7, label: '盐水', from: 0 },
          { kind: 'particles', box: [200, 380, 260, 160], count: 5, color: SUGAR, symbol: '糖', motion: 'jitter', size: 24, from: 0.8 },
          { kind: 'particles', box: [740, 385, 260, 70], count: 3, color: SODIUM, symbol: 'Na⁺', motion: 'jitter', size: 24, from: 1 },
          { kind: 'particles', box: [740, 470, 260, 70], count: 3, color: CHLORINE, symbol: 'Cl⁻', motion: 'jitter', size: 24, from: 1.2 },
          { kind: 'shape', shape: 'circle', at: [330, 200], size: [100, 100], color: BULB_OFF, text: '灯', from: 1.8 },
          { kind: 'shape', shape: 'circle', at: [870, 200], size: [100, 100], color: BULB_OFF, text: '灯', tint: { color: BULB_ON, at: 3, over: 1 }, from: 1.8 },
          { kind: 'myth', wrong: '溶进水里就能导电', right: '要有能跑动的离子才行', from: 6 },
        ],
      },
      {
        turn: 4,
        title: '先擦干再碰电',
        duration: 11,
        cues: [
          { kind: 'sprite', icon: '🖐️', path: [[380, 420]], size: 160, from: 0.2 },
          { kind: 'particles', box: [300, 340, 160, 160], count: 5, color: WATER, motion: 'jitter', size: 14, amount: { at: 2, over: 2.5, from: 5, to: 0 }, from: 0.4 },
          { kind: 'sprite', icon: '🧻', path: [[200, 300], [420, 450], [560, 330]], size: 90, travel: 2.5, from: 1.6, to: 4.6 },
          { kind: 'meter', at: [380, 660], label: '电好不好走', start: 0.85, end: 0.1, color: '#e0762b', over: 2.5, from: 2 },
          { kind: 'sprite', icon: '🔌', path: [[900, 420]], size: 140, from: 4.8 },
          { kind: 'arrow', path: [[560, 420], [780, 420]], color: '#1f6b55', text: '再去碰', from: 5.4 },
          { kind: 'text', at: [600, 830], text: '手擦干，再碰电', size: 'm', from: 7.4 },
        ],
      },
      {
        turn: 5,
        title: '离子退场，灯变暗',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [520, 540], size: [460, 380], liquid: '#eef4fb', level: 0.65, from: 0 },
          { kind: 'flow', path: [[520, 250], [520, 470]], color: ACID, count: 5, speed: 200, size: 11, from: 1 },
          { kind: 'label', at: [540, 300], pos: [260, 300], text: '滴稀硫酸', from: 1.2, to: 5 },
          { kind: 'particles', box: [340, 500, 360, 160], count: 12, color: '#c9b8ff', motion: 'jitter', size: 12, amount: { at: 2, over: 4, from: 12, to: 1 }, from: 0.5 },
          { kind: 'shape', shape: 'rect', at: [520, 705], size: [400, 34], color: '#ffffff', motion: 'grow', over: 4, from: 2.4 },
          { kind: 'label', at: [520, 705], pos: [900, 640], text: '白色沉淀', from: 4.4 },
          { kind: 'shape', shape: 'circle', at: [960, 330], size: [120, 120], color: BULB_ON, text: '灯', tint: { color: BULB_OFF, at: 2.5, over: 4 }, from: 0.3, to: 9.2 },
          { kind: 'shape', shape: 'circle', at: [960, 330], size: [120, 120], color: BULB_OFF, text: '灯', tint: { color: BULB_ON, at: 9.6, over: 1.2 }, from: 9 },
          { kind: 'text', at: [600, 850], text: '离子少了灯暗，多了又亮', size: 'm', from: 7.6 },
        ],
      },
    ],
  },
};
