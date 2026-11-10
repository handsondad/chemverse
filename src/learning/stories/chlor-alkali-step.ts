import { lessonAsset } from '../assets';
import type { Story } from './types';

const BRINE = '#e3f0f7';
const MUDDY = '#e2dccd';
const ELECTRODE = '#9aa5b1';
const MEMBRANE = '#8fc7b0';
const CL2 = '#d4e86a';
const H2 = '#ffffff';
const CL_ION = '#c8e06a';
const NA = '#ffd59e';
const OH = '#bfe3ff';
const ELECTRON = '#ffcf3f';
const RED = '#c2410c';

export const chlorAlkaliStep: Story = {
  slug: 'chlor-alkali-step',
  title: '家里拖地用的 84 消毒液，是怎么用食盐和电造出来的？',
  trigger: '小念看妈妈用 84 消毒液拖地，瓶子背面写着“次氯酸钠”，爸爸说它是用海盐通电造出来的。',
  dialogue: [
    {
      nian: '爸爸，84 消毒液真的是用食盐造出来的吗？盐水通上电会变成什么？',
      dad: '是真的。把很浓的食盐水通上电，一下子能得到三样东西：氯气、氢气和烧碱（氢氧化钠），这一行叫氯碱工业。氯气给自来水消毒、做塑料水管，烧碱拿去造纸、做肥皂；把氯气通进烧碱溶液里，就做出了 84 消毒液里的次氯酸钠。',
      eq: '2NaCl + 2H₂O =通电= 2NaOH + H₂↑ + Cl₂↑',
      show: { kind: 'lab', step: 0, label: '看「三样产品」' },
    },
    {
      nian: '通上电以后，氯气和烧碱是从盐水的哪儿冒出来的？',
      dad: '从两块电极上分头出来。盐水里有带负电的氯离子、带正电的钠离子。接正极的那块板上，氯离子交出电子，两两结对成了黄绿色的氯气；接负极的那块板上，水分子收下电子，放出氢气，留下氢氧根。钠离子再来和氢氧根做伴，就是烧碱。电线像传送带，把电子从这头运到那头。',
      eq: '阳极：2Cl⁻ − 2e⁻ = Cl₂↑　阴极：2H₂O + 2e⁻ = H₂↑ + 2OH⁻',
      show: { kind: 'lab', step: 2, label: '看「剖开槽」' },
    },
    {
      nian: '一边出氯气、一边出氢气，它们要是跑到一块儿怎么办？',
      dad: '所以两块板中间立着一张薄膜，叫阳离子交换膜。它只放带正电的钠离子过去，带负电的氯离子、氢氧根都被它推回来，气体也钻不过。就像地铁闸机只认一种卡。于是一边只出氯气，另一边出氢气和很纯的烧碱，谁也碰不到谁。',
      figure: {
        kind: 'image',
        src: lessonAsset('covers/chlor-alkali-step.webp'),
        alt: '透明的电解槽，中间一张膜把槽隔成两半，一边冒无色气泡，一边冒黄绿色气泡',
        caption: '电解槽剖开看：中间一张膜把槽隔成两半，一边冒黄绿色的氯气泡，另一边冒无色的氢气泡。',
      },
      show: { kind: 'lab', step: 3, label: '看「膜里看」' },
    },
    {
      nian: '要是把这张薄膜拿掉，会怎么样？',
      dad: '会出两件麻烦事。一是氯气碰上烧碱就反应，烧碱被弄脏，混进次氯酸钠和食盐；二是氢气和氯气混在一起，见强光或遇火会爆炸。很多人以为这张膜只是过滤杂质用的，其实它最要紧的本事是把产物分开、保住安全。',
      eq: 'Cl₂ + 2NaOH = NaCl + NaClO + H₂O',
      show: { kind: 'lab', step: 6, label: '看「拆掉膜」' },
    },
    {
      nian: '次氯酸钠就是 84 消毒液里的东西吧？家里用它要注意什么？',
      dad: '最要紧的一条：不能和洁厕灵混用。洁厕灵里有盐酸，一混，次氯酸钠就把氯气重新放出来，那是刺鼻的有毒气体。用的时候按说明加水稀释，开窗通风，戴上手套，用完盖紧放在阴凉处。',
      eq: 'NaClO + 2HCl = NaCl + Cl₂↑ + H₂O',
    },
    {
      nian: '消毒液要加水稀释，那工厂电解用的盐水是不是也越稀越好？',
      dad: '正相反，工厂要的是又浓又干净的盐水。海盐里混着钙、镁这些杂质，先加纯碱和烧碱让它们变成沉淀滤掉，再用树脂细细筛一遍。要是没洗干净，钙、镁会在膜上结垢，像水壶里结的水垢，把钠离子的路堵住，费电不说，膜也坏了。',
      eq: 'Ca²⁺ + CO₃²⁻ = CaCO₃↓　Mg²⁺ + 2OH⁻ = Mg(OH)₂↓',
      show: { kind: 'lab', step: 1, label: '看「先洗盐」' },
    },
    {
      nian: '我懂了！先把盐水洗干净，通上电，正极那边出氯气，负极那边出氢气和烧碱，中间的膜只放钠离子过去，把它们隔开；氯气和烧碱另外在罐子里一混，就成了 84 消毒液！',
      dad: '说得一点没错！好习惯：84 消毒液单独用，不和洁厕灵或别的清洁剂混在一起，用完开窗通风，放回高处。',
    },
  ],
  tip: '氯气有毒、烧碱有强腐蚀性，氢气和氯气混合后见强光可能爆炸，这些都只在课本和视频里了解。含氯消毒液（84 等）绝不能与含盐酸的洁厕剂混用，会放出氯气；使用时按说明稀释、戴手套、保持通风，误入眼睛立即用大量清水冲洗并就医。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '盐水通电变三样',
        duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [600, 500], size: [560, 380], liquid: BRINE, level: 0.75, label: '浓食盐水', from: 0 },
          { kind: 'shape', shape: 'rect', at: [440, 480], size: [34, 300], color: ELECTRODE, text: '+', from: 0.4 },
          { kind: 'shape', shape: 'rect', at: [760, 480], size: [34, 300], color: ELECTRODE, text: '−', from: 0.6 },
          { kind: 'sprite', icon: '⚡', path: [[600, 240]], size: 80, from: 1.2 },
          { kind: 'particles', box: [400, 340, 80, 260], count: 6, color: CL2, motion: 'rise', symbol: 'Cl₂', size: 18, from: 2 },
          { kind: 'particles', box: [720, 340, 80, 260], count: 6, color: H2, motion: 'rise', symbol: 'H₂', size: 18, from: 2.6 },
          { kind: 'text', at: [600, 830], text: '氯气、氢气、烧碱', size: 'm', from: 6.5 },
        ],
      },
      {
        turn: 1,
        title: '两块电极分头干活',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [330, 470], size: [40, 380], color: ELECTRODE, text: '+', from: 0 },
          { kind: 'shape', shape: 'rect', at: [870, 470], size: [40, 380], color: ELECTRODE, text: '−', from: 0 },
          { kind: 'atom', path: [[600, 420], [372, 420]], symbol: 'Cl', charge: '−', color: CL_ION, r: 36, travel: 1.6, from: 0.6, to: 2.6 },
          { kind: 'flow', path: [[330, 280], [330, 190], [870, 190], [870, 280]], color: ELECTRON, count: 8, speed: 260, size: 10, from: 2.2 },
          { kind: 'particles', box: [360, 260, 90, 300], count: 5, color: CL2, motion: 'rise', symbol: 'Cl₂', size: 18, from: 2.6 },
          { kind: 'particles', box: [750, 260, 90, 300], count: 5, color: H2, motion: 'rise', symbol: 'H₂', size: 18, from: 3.6 },
          { kind: 'atom', path: [[760, 600]], symbol: 'OH', charge: '−', color: OH, r: 34, from: 4.4 },
          { kind: 'atom', path: [[560, 600], [690, 600]], symbol: 'Na', charge: '+', color: NA, r: 34, travel: 1.4, from: 5.6 },
          { kind: 'text', at: [600, 830], text: '钠离子和氢氧根做伴', size: 's', from: 8 },
        ],
      },
      {
        turn: 2,
        title: '膜只放钠离子过去',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 470], size: [26, 440], color: MEMBRANE, from: 0.2 },
          { kind: 'label', at: [600, 300], pos: [830, 200], text: '阳离子交换膜', from: 0.8 },
          { kind: 'atom', path: [[360, 430], [840, 430]], symbol: 'Na', charge: '+', color: NA, r: 34, travel: 2.2, from: 1.6 },
          { kind: 'atom', path: [[360, 560], [840, 560]], symbol: 'Na', charge: '+', color: NA, r: 34, travel: 2.2, from: 3 },
          { kind: 'atom', path: [[360, 330], [550, 330], [380, 360]], symbol: 'Cl', charge: '−', color: CL_ION, r: 34, travel: 2, from: 4.4 },
          { kind: 'atom', path: [[860, 640], [650, 640], [840, 620]], symbol: 'OH', charge: '−', color: OH, r: 34, travel: 2, from: 6 },
          { kind: 'text', at: [600, 830], text: '只认钠离子', size: 'm', from: 8.6 },
        ],
      },
      {
        turn: 3,
        title: '拿掉膜就出事',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 400], size: [760, 380], color: BRINE, from: 0 },
          { kind: 'particles', box: [260, 240, 680, 320], count: 6, color: CL2, motion: 'gas', symbol: 'Cl₂', size: 20, from: 0.4 },
          { kind: 'particles', box: [260, 240, 680, 320], count: 6, color: H2, motion: 'gas', symbol: 'H₂', size: 20, from: 0.8 },
          { kind: 'text', at: [600, 640], text: '烧碱被弄脏', size: 's', from: 2, to: 4.6 },
          { kind: 'sprite', icon: '💥', path: [[600, 400]], size: 110, wobble: true, from: 4.6 },
          { kind: 'text', at: [600, 640], text: '氢气＋氯气会爆炸', size: 's', color: RED, from: 4.8, to: 7 },
          { kind: 'myth', wrong: '这张膜只是过滤杂质', right: '它把产物分开、保平安', from: 7.2 },
        ],
      },
      {
        turn: 4,
        title: '84 别和洁厕灵混用',
        duration: 11,
        cues: [
          { kind: 'sprite', icon: '🧴', path: [[260, 380], [470, 400]], size: 120, travel: 2, from: 0.3 },
          { kind: 'sprite', icon: '🧴', path: [[940, 380], [730, 400]], size: 120, travel: 2, from: 0.5 },
          { kind: 'text', at: [260, 540], text: '84 消毒液', size: 's', from: 0.3, to: 6 },
          { kind: 'text', at: [940, 540], text: '洁厕灵', size: 's', from: 0.5, to: 6 },
          { kind: 'particles', box: [480, 200, 240, 160], count: 7, color: CL2, motion: 'gas', symbol: 'Cl₂', size: 18, from: 2.6, to: 6 },
          { kind: 'text', at: [600, 660], text: '放出有毒的氯气', size: 's', color: RED, from: 3, to: 6.2 },
          { kind: 'sprite', icon: '🚫', path: [[600, 400]], size: 150, from: 6.2 },
          { kind: 'text', at: [600, 830], text: '单独用，开窗通风', size: 'm', from: 7.6 },
        ],
      },
      {
        turn: 5,
        title: '先把盐水洗干净',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [330, 480], size: [320, 340], liquid: MUDDY, level: 0.7, tint: { color: BRINE, at: 4, over: 2 }, label: '粗盐水', from: 0 },
          { kind: 'particles', box: [210, 450, 240, 90], count: 3, color: '#f1c27d', motion: 'jitter', symbol: 'Ca', size: 20, from: 0.4, to: 5.4 },
          { kind: 'particles', box: [210, 530, 240, 70], count: 3, color: '#c5e1a5', motion: 'jitter', symbol: 'Mg', size: 20, from: 0.6, to: 5.4 },
          { kind: 'arrow', path: [[330, 170], [330, 360]], color: '#7d8f88', text: '加纯碱、烧碱', from: 1.6 },
          { kind: 'particles', box: [220, 610, 220, 30], count: 8, color: '#ffffff', motion: 'jitter', size: 10, amount: { at: 3.6, over: 2, from: 0, to: 8 }, from: 3.4 },
          { kind: 'shape', shape: 'rect', at: [900, 440], size: [30, 320], color: MEMBRANE, tint: { color: '#b9a88a', at: 7, over: 2 }, from: 6 },
          { kind: 'label', at: [900, 440], pos: [930, 220], text: '没洗：膜会结垢', from: 6.8 },
          { kind: 'text', at: [600, 830], text: '盐水要又浓又干净', size: 'm', from: 9.4 },
        ],
      },
    ],
  },
};
