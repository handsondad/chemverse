import { lessonAsset } from '../assets';
import type { Story } from './types';

const CHLORINE = '#d8ec7a';
const CHLORINE_GAS = '#e9f5a8';
const HCL = '#ffd6bf';
const STEAM = '#bfe0ff';
const AIR = '#eceef4';
const BRINE = '#d8efff';
const ACID = '#f2ead0';
const RED = '#e5484d';

export const chlorineStep: Story = {
  slug: 'chlorine-step',
  title: '84 消毒液为什么不能和洁厕灵混着用？冒出来的氯气，实验室又是怎么管住它的？',
  trigger: '小念帮妈妈打扫卫生间，看见 84 消毒液的瓶子上印着醒目的一行字：「勿与酸性产品（如洁厕类清洁剂）同时使用」。',
  dialogue: [
    {
      nian: '84 消毒液为什么不能和洁厕灵一起用？混在一起会怎样？',
      dad: '会冒出氯气。84 消毒液里干活的是次氯酸钠，洁厕灵里有盐酸，两样一碰就放出黄绿色、有刺鼻气味的氯气。氯气有毒，在小小的卫生间里吸进去，会咳嗽、胸闷，严重时伤到肺。所以瓶子上才写着「勿与酸性产品同时使用」。',
      eq: 'NaClO + 2HCl = NaCl + Cl₂↑ + H₂O',
      figure: {
        kind: 'table',
        caption: '氯在第 17 族，是卤素家族的一员。这一家最外层都差 1 个电子才满，抢电子的脾气都很冲。',
        focus: { by: 'group', values: [17] },
        ring: [17],
      },
    },
    {
      nian: '氯气这么危险，化学家要用它的时候，是怎么把它造出来的？',
      dad: '实验室常用二氧化锰和浓盐酸一起加热：二氧化锰抢走盐酸里氯的电子，氯两两凑成氯气跑出来。有两个条件缺一不可：要加热，不加热几乎不反应；要浓盐酸，反应一阵子盐酸变稀，氯气就自己停了。所以按盐酸算出来的氯气，实际总要少一些。',
      eq: 'MnO₂ + 4HCl(浓) =△= MnCl₂ + Cl₂↑ + 2H₂O',
      show: { kind: 'lab', step: 1, label: '看「为什么加热」' },
    },
    {
      nian: '浓盐酸那么冲，跑出来的氯气里会不会混着别的东西？',
      dad: '会混两样：浓盐酸挥发出来的氯化氢，还有水蒸气。所以气体要先后洗两次澡：第一瓶装饱和食盐水，氯化氢极易溶进去，氯气在浓浓的盐水里却很难溶，正好只把杂质留下；第二瓶装浓硫酸，它特别能吸水，把水汽吸干。顺序不能反，不然从食盐水里出来又带上水汽。',
      show: { kind: 'lab', step: 3, label: '看「第一瓶洗什么」' },
    },
    {
      nian: '吸干水汽以后的氯气，还能像 84 消毒液那样漂白、杀菌吗？',
      dad: '干燥的氯气碰到干燥的红布条，布条一点不褪色；可布条一湿，马上就白了。很多人以为是氯气自己在漂白，其实真正干活的是氯气溶进水里生成的次氯酸。它抢电子的本领很强，能把色素和细菌都破坏掉。游泳池、自来水消毒，靠的也是它。',
      eq: 'Cl₂ + H₂O ⇌ HCl + HClO',
      show: { kind: 'lab', step: 4, label: '看「第二瓶洗什么」' },
    },
    {
      nian: '次氯酸这么能干，那造好的氯气要怎么装进瓶子？用排水法行吗？',
      dad: '不行，氯气能溶进水里，还会和水反应，用排水法会跑掉一大截。氯气比空气重，所以用向上排空气法：导管一直伸到集气瓶底，氯气沉在下面，一点点把空气从瓶口顶出去，叫「长进短出」。看到整个瓶子都变成黄绿色，就装满了。',
      show: { kind: 'lab', step: 5, label: '看「怎么收集」' },
      figure: {
        kind: 'image',
        src: lessonAsset('covers/chlorine-step.webp'),
        alt: '装满黄绿色气体的集气瓶，导管通到旁边盛着溶液的烧杯里',
        caption: '黄绿色的就是氯气。它从伸到瓶底的长管进去、把空气往上顶；瓶里装满后，多出来的顺着右边的管子通进烧杯。',
      },
    },
    {
      nian: '瓶子装满以后，还在冒的氯气怎么办？直接放走吗？',
      dad: '绝不能放走。最后一定接一个装氢氧化钠溶液的烧杯，把多余的氯气吸收掉。有意思的是，氯气和氢氧化钠反应生成的次氯酸钠，正是 84 消毒液的主角。所以 84 消毒液就像装进瓶子里的氯气，再遇到洁厕灵里的盐酸，氯气就又被放出来了。',
      eq: 'Cl₂ + 2NaOH = NaCl + NaClO + H₂O',
      show: { kind: 'lab', step: 6, label: '看「多余的氯气去哪」' },
    },
    {
      nian: '我懂了！84 消毒液里藏着「装进瓶子的氯气」，遇到洁厕灵的盐酸就会放出来；实验室造氯气要先洗掉氯化氢、再吸干水汽，向上排空气收集，最后用氢氧化钠把多余的吃掉。',
      dad: '讲得清清楚楚！家里记一条好习惯：消毒液和清洁剂各用各的，用完开窗通风；万一混了闻到刺鼻味，马上离开、关上门、开窗，别留在里面清理。',
    },
  ],
  tip: '含氯消毒剂（84 消毒液、漂白水）切勿与洁厕灵等酸性清洁剂混用，也不要与酒精混用；使用时按说明稀释、通风、戴手套。万一混用闻到刺激气味，立刻撤离到空气新鲜处，出现咳嗽、胸闷请就医。氯气制备实验只适合在学校通风橱里由老师演示。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '两瓶一混冒氯气',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [260, 440], size: [180, 260], color: '#d8efff', text: '84', from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [940, 440], size: [180, 260], color: '#ffe3ec', text: '洁厕灵', from: 0.6 },
          { kind: 'vessel', vessel: 'beaker', at: [600, 620], size: [320, 240], liquid: '#eef7e8', level: 0.5, tint: { color: CHLORINE_GAS, at: 2.8, over: 1.4 }, from: 1 },
          { kind: 'flow', path: [[360, 440], [560, 580]], color: '#9cc3ff', count: 5, speed: 220, size: 12, from: 1.6, to: 3.6 },
          { kind: 'flow', path: [[840, 440], [640, 580]], color: '#ffb3c8', count: 5, speed: 220, size: 12, from: 1.6, to: 3.6 },
          { kind: 'particles', box: [460, 260, 280, 220], count: 10, color: CHLORINE, symbol: 'Cl₂', motion: 'gas', size: 30, from: 3.4 },
          { kind: 'label', at: [700, 330], pos: [980, 220], text: '黄绿色、有毒', color: '#c2410c', from: 4.8 },
          { kind: 'text', at: [600, 830], text: '勿与酸性产品混用', size: 'm', from: 7 },
        ],
      },
      {
        turn: 1,
        title: '加热才肯出来',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [460, 520], size: [320, 340], liquid: '#f6f0e0', level: 0.45, from: 0 },
          { kind: 'shape', shape: 'rect', at: [460, 640], size: [220, 50], color: '#6b625a', from: 0.4 },
          { kind: 'label', at: [360, 640], pos: [200, 520], text: '二氧化锰', from: 0.9 },
          { kind: 'sprite', icon: '🔥', path: [[460, 770]], size: 80, wobble: true, from: 2.2 },
          { kind: 'particles', box: [340, 330, 240, 160], count: 8, color: CHLORINE, symbol: 'Cl₂', motion: 'rise', size: 28, amount: { at: 2.8, over: 3, from: 0, to: 8 }, from: 2.6, to: 9.4 },
          { kind: 'meter', at: [900, 300], label: '盐酸浓度', start: 0.9, end: 0.3, color: '#c2410c', over: 6, from: 2.6 },
          { kind: 'text', at: [900, 460], text: '变稀了，就停了', size: 's', color: '#c2410c', from: 8.6 },
          { kind: 'formula', at: [600, 860], text: 'MnO₂ + 4HCl(浓) =△= MnCl₂ + Cl₂↑ + 2H₂O', from: 5 },
        ],
      },
      {
        turn: 2,
        title: '先洗澡，再吸干',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [380, 560], size: [260, 300], liquid: BRINE, level: 0.7, label: '饱和食盐水', from: 0 },
          { kind: 'vessel', vessel: 'beaker', at: [820, 560], size: [260, 300], liquid: ACID, level: 0.7, label: '浓硫酸', from: 0 },
          { kind: 'flow', path: [[100, 300], [380, 300], [380, 650]], color: CHLORINE, count: 6, speed: 240, size: 13, from: 0.8 },
          { kind: 'particles', box: [290, 560, 180, 110], count: 5, color: HCL, symbol: 'HCl', motion: 'jitter', size: 30, from: 2.4 },
          { kind: 'flow', path: [[400, 440], [600, 300], [820, 300], [820, 650]], color: CHLORINE, count: 6, speed: 240, size: 13, from: 3.8 },
          { kind: 'particles', box: [730, 560, 180, 110], count: 5, color: STEAM, symbol: 'H₂O', motion: 'jitter', size: 30, from: 5.4 },
          { kind: 'flow', path: [[840, 440], [1000, 300], [1140, 300]], color: CHLORINE, count: 5, speed: 240, size: 13, from: 6.8 },
          { kind: 'text', at: [600, 850], text: '先除氯化氢，再除水汽', size: 'm', from: 8.4 },
        ],
      },
      {
        turn: 3,
        title: '漂白的是次氯酸',
        duration: 12,
        cues: [
          { kind: 'particles', box: [160, 230, 880, 90], count: 8, color: CHLORINE, symbol: 'Cl₂', motion: 'gas', size: 28, from: 0.4 },
          { kind: 'shape', shape: 'rect', at: [330, 425], size: [240, 145], color: RED, text: '干布条', from: 0.8 },
          { kind: 'shape', shape: 'rect', at: [870, 425], size: [240, 145], color: RED, text: '湿布条', tint: { color: '#f8f4ec', at: 4.4, over: 2.4 }, from: 1.2 },
          { kind: 'label', at: [330, 498], pos: [330, 610], text: '不褪色', from: 3 },
          { kind: 'label', at: [870, 498], pos: [870, 610], text: '褪成白色', from: 6.2 },
          { kind: 'myth', wrong: '是氯气自己在漂白', right: '是它溶水生成的次氯酸', from: 7.6 },
        ],
      },
      {
        turn: 4,
        title: '长进短出',
        duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [600, 520], size: [340, 440], liquid: CHLORINE_GAS, level: 0, rise: { to: 0.95, at: 2, over: 6 }, from: 0 },
          { kind: 'shape', shape: 'rect', at: [560, 470], size: [16, 420], color: '#cfe0e8', from: 0.3 },
          { kind: 'particles', box: [450, 330, 300, 360], count: 8, color: AIR, symbol: '空气', motion: 'gas', size: 34, amount: { at: 2, over: 6, from: 8, to: 0 }, from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [410, 260], size: [316, 16], color: '#cfe0e8', from: 0.3 },
          { kind: 'flow', path: [[260, 260], [560, 260], [560, 680]], color: CHLORINE, count: 6, speed: 240, size: 13, from: 1 },
          { kind: 'label', at: [560, 420], pos: [270, 470], text: '长管伸到瓶底', from: 1.6 },
          { kind: 'arrow', path: [[690, 290], [690, 170]], color: '#7a6a55', text: '空气被顶出', from: 3 },
          { kind: 'text', at: [600, 840], text: '比空气重，向上排空气', size: 'm', from: 8 },
        ],
      },
      {
        turn: 5,
        title: '多余的氯气吸收掉',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [560, 560], size: [380, 320], liquid: BRINE, level: 0.7, label: '氢氧化钠溶液', from: 0 },
          { kind: 'flow', path: [[160, 260], [560, 260], [560, 650]], color: CHLORINE, count: 7, speed: 240, size: 13, from: 0.8 },
          { kind: 'particles', box: [460, 500, 200, 180], count: 8, color: CHLORINE_GAS, motion: 'rise', size: 16, from: 1.8 },
          { kind: 'formula', at: [560, 860], text: 'Cl₂ + 2NaOH = NaCl + NaClO + H₂O', from: 4 },
          { kind: 'label', at: [680, 600], pos: [980, 380], text: '生成 NaClO', from: 5.6 },
          { kind: 'sprite', icon: '🧴', path: [[1000, 580]], size: 100, wobble: true, from: 7 },
          { kind: 'text', at: [1000, 700], text: '84 的主角', size: 's', color: '#1f6b55', from: 7.6 },
        ],
      },
    ],
  },
};
