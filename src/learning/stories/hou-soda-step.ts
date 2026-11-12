import { lessonAsset } from '../assets';
import type { Story } from './types';

const BRINE = '#dbeaf5';
const AMMONIA = '#cfe9d8';
const CO2 = '#cfd8dc';
const TOWER = '#e8f1f7';
const CRYSTAL = '#ffffff';
const SODA = '#ffffff';
const ASH = '#f4efe2';
const DOUGH = '#f3e2c0';
const HEAT = '#e8590c';
const HOT = '#e0762b';
const FERTILIZER = '#cde8b5';

export const houSodaStep: Story = {
  slug: 'hou-soda-step',
  title: '妈妈蒸馒头用的小苏打和碱面，真的是用食盐造出来的吗？',
  trigger: '小念帮妈妈蒸馒头，柜子里一袋小苏打、一袋碱面，爸爸说它们都是用海里的食盐造出来的。',
  dialogue: [
    {
      nian: '爸爸，小苏打和碱面都是用食盐造的？咸咸的盐怎么会变成碱？',
      dad: '是真的。咸咸的食盐里有钠，小苏打和碱面里也有钠。工厂把饱和食盐水、氨气和二氧化碳凑在一起，钠就像跳舞换了个舞伴，变成小苏打沉下来；小苏打再一烧，就成了碱面，也叫纯碱。这套办法是我国化学家侯德榜在二十世纪四十年代初研究出来的，叫侯氏制碱法。',
      eq: 'NaCl + NH₃ + CO₂ + H₂O = NaHCO₃↓ + NH₄Cl',
      show: { kind: 'lab', step: 0, label: '看「从盐到碱」' },
    },
    {
      nian: '为什么要加氨气？直接往食盐水里吹二氧化碳不行吗？',
      dad: '不行，二氧化碳在水里溶得很少，像汽水一开盖就往外跑。氨气却特别爱溶进水里，让食盐水变成碱性；碱性的水能把二氧化碳一口口“吃”进去，变成碳酸氢根留在水里。所以要先通氨气、再通二氧化碳，顺序反过来，二氧化碳就吸不进多少。',
      eq: 'NH₃ + CO₂ + H₂O = NH₄HCO₃',
      show: { kind: 'lab', step: 1, label: '看「先氨后碳」' },
    },
    {
      nian: '碳酸氢根留在水里，怎么就变成小苏打沉下来了？',
      dad: '因为水里一下子有了四种离子，能凑成四种盐：食盐、氯化铵、碳酸氢铵和碳酸氢钠。其中碳酸氢钠最不爱溶，水里装不下它了，就像挤满人的公交车，它最先被挤下车，结成白色小晶体沉到塔底。这叫结晶。',
      eq: 'NaCl + NH₄HCO₃ = NaHCO₃↓ + NH₄Cl',
      figure: {
        kind: 'image',
        src: lessonAsset('covers/hou-soda-step.webp'),
        alt: '一座透明的碳化塔，液体一层层往下淋，塔底积着白色晶体，管子连到右边的过滤机',
        caption: '工厂的碳化塔：液体一层层往下淋，塔底积起白色的小苏打晶体，再顺着管子送去过滤。',
      },
      show: { kind: 'lab', step: 2, label: '看「为什么它自己析出」' },
    },
    {
      nian: '沉下来的白色晶体，就是妈妈用的碱面吗？',
      dad: '还不是，它是小苏打。很多人以为小苏打和碱面是一样东西，其实差了一步：把小苏打加热，它会分解，放出二氧化碳和水蒸气，剩下的白粉才是碱面。蒸馒头时小苏打受热冒出二氧化碳，在面团里撑出许多小孔，馒头就松软了。',
      eq: '2NaHCO₃ =△= Na₂CO₃ + H₂O + CO₂↑',
      show: { kind: 'lab', step: 5, label: '看「煅烧成碱」' },
    },
    {
      nian: '那我在家蒸馒头，该放小苏打还是碱面？',
      dad: '看用什么发面。用酵母发的面不用放；用老面发的面会发酸，就加一点碱面或小苏打，它们和酸一碰就冒出二氧化碳，酸味没了，馒头又白又暄。千万别放多，碱多了馒头发黄、发涩。在工厂里，造碱剩下的水也一点不浪费。',
    },
    {
      nian: '工厂里造碱剩下的水，不倒掉还能干什么？',
      dad: '这正是侯德榜的妙招。剩下的水叫母液，里面溶着很多氯化铵。往里加食盐细粉、再降温，氯化铵就结晶出来，做成庄稼用的氮肥；剩下的盐水又回去接着造碱。老办法会排出大量没用的氯化钙废液，侯氏法把食盐用得更充分，还顺手得到化肥，所以也叫联合制碱法。',
      eq: 'NH₄Cl（溶液）→ NH₄Cl↓（加食盐、降温）',
      show: { kind: 'lab', step: 6, label: '看「母液与循环」' },
    },
    {
      nian: '我懂了！先用氨气把食盐水变成碱性，才能吸进很多二氧化碳；碳酸氢钠最不爱溶，自己沉下来就是小苏打，一加热变成碱面；剩下的母液再捞出氯化铵当化肥，盐一点也不浪费！',
      dad: '完全正确！好习惯：用之前看清包装，“碳酸氢钠”是小苏打，“碳酸钠”是碱面，碱面更“冲”，按说明少量放，用完封好放回柜子里。',
    },
  ],
  tip: '碱面（碳酸钠）的碱性比小苏打强，别让孩子直接吃、也别揉进眼睛。工厂里的氨气有强烈刺激性，二氧化碳在密闭空间里会让人窒息，这些都只在课本里了解。侯氏制碱法由侯德榜在 20 世纪 40 年代初研究成功；文中“谁最不爱溶”按室温（约 20 ℃）的溶解度比较。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '食盐变成小苏打',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [640, 450], size: [220, 480], color: TOWER, text: '碳化塔', from: 0.2 },
          { kind: 'shape', shape: 'pill', at: [230, 300], size: [230, 70], color: BRINE, text: '食盐水', from: 0.6 },
          { kind: 'shape', shape: 'pill', at: [230, 420], size: [230, 70], color: AMMONIA, text: '氨气', from: 1.2 },
          { kind: 'shape', shape: 'pill', at: [230, 540], size: [230, 70], color: CO2, text: '二氧化碳', from: 1.8 },
          { kind: 'flow', path: [[350, 420], [530, 420]], color: '#9cc3e0', count: 6, speed: 160, size: 10, from: 2.4 },
          { kind: 'particles', box: [560, 600, 160, 70], count: 10, color: CRYSTAL, motion: 'jitter', size: 12, amount: { at: 3.4, over: 3, from: 0, to: 10 }, from: 3 },
          { kind: 'arrow', path: [[760, 630], [960, 630]], color: HOT, text: '小苏打', from: 5.6 },
          { kind: 'text', at: [600, 830], text: '盐里的钠换了舞伴', size: 'm', from: 7.5 },
        ],
      },
      {
        turn: 1,
        title: '先通氨，再吸二氧化碳',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [330, 500], size: [320, 360], liquid: BRINE, level: 0.7, label: '直接吹二氧化碳', from: 0 },
          { kind: 'vessel', vessel: 'beaker', at: [870, 500], size: [320, 360], liquid: BRINE, level: 0.7, label: '先通氨气', from: 0 },
          { kind: 'arrow', path: [[870, 170], [870, 380]], color: '#5aa77a', text: 'NH₃', from: 0.8, to: 3 },
          { kind: 'arrow', path: [[330, 170], [330, 380]], color: '#7d8f88', text: 'CO₂', from: 3.4 },
          { kind: 'arrow', path: [[870, 170], [870, 380]], color: '#7d8f88', text: 'CO₂', from: 3.4 },
          { kind: 'particles', box: [200, 470, 260, 180], count: 3, color: CO2, motion: 'jitter', symbol: 'CO₂', size: 22, amount: { at: 4, over: 3, from: 0, to: 3 }, from: 4 },
          { kind: 'particles', box: [740, 470, 260, 180], count: 12, color: CO2, motion: 'jitter', symbol: 'CO₂', size: 22, amount: { at: 4, over: 4, from: 0, to: 12 }, from: 4 },
          { kind: 'text', at: [600, 830], text: '碱性的水，吃得进 CO₂', size: 's', from: 9 },
        ],
      },
      {
        turn: 2,
        title: '谁最不爱溶，谁先沉',
        duration: 11,
        cues: [
          { kind: 'meter', at: [360, 260], label: '氯化铵', start: 0, end: 0.93, color: '#9cc3e0', over: 1.5, from: 0.4 },
          { kind: 'meter', at: [360, 390], label: '食盐', start: 0, end: 0.9, color: '#9cc3e0', over: 1.5, from: 1.2 },
          { kind: 'meter', at: [360, 520], label: '碳酸氢铵', start: 0, end: 0.53, color: '#9cc3e0', over: 1.5, from: 2 },
          { kind: 'meter', at: [360, 650], label: '碳酸氢钠', start: 0, end: 0.24, color: HOT, over: 1.5, from: 2.8 },
          { kind: 'vessel', vessel: 'beaker', at: [900, 460], size: [300, 340], liquid: BRINE, level: 0.75, label: '装不下，就沉下来', from: 0.2 },
          { kind: 'particles', box: [790, 560, 220, 60], count: 12, color: CRYSTAL, motion: 'jitter', size: 12, amount: { at: 4.6, over: 3, from: 0, to: 12 }, from: 4.4 },
          { kind: 'text', at: [600, 830], text: '碳酸氢钠最不爱溶', size: 'm', from: 8 },
        ],
      },
      {
        turn: 3,
        title: '加热：小苏打变碱面',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [300, 400], size: [240, 150], color: SODA, text: '小苏打', from: 0.3 },
          { kind: 'sprite', icon: '🔥', path: [[300, 540]], size: 70, from: 1 },
          { kind: 'pulse', at: [300, 400], color: HEAT, radius: 200, from: 1.4, to: 5 },
          { kind: 'arrow', path: [[460, 400], [680, 400]], color: HOT, text: '加热分解', from: 2.6 },
          { kind: 'shape', shape: 'rect', at: [880, 420], size: [240, 150], color: ASH, text: '碱面', from: 3.6 },
          { kind: 'particles', box: [780, 170, 200, 160], count: 6, color: CO2, motion: 'rise', symbol: 'CO₂', size: 22, from: 4 },
          { kind: 'myth', wrong: '小苏打和碱面是一样东西', right: '小苏打一加热才变成碱面', from: 7 },
        ],
      },
      {
        turn: 4,
        title: '老面加碱，冒泡变暄',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'circle', at: [460, 460], size: [420, 280], color: DOUGH, from: 0.2 },
          { kind: 'label', at: [400, 400], pos: [300, 220], text: '发酸的老面', from: 0.8 },
          { kind: 'shape', shape: 'pill', at: [940, 260], size: [200, 70], color: ASH, text: '碱面', from: 1.4 },
          { kind: 'sprite', icon: '🥄', path: [[940, 340], [560, 420]], size: 70, travel: 1.6, from: 2, to: 4.2 },
          { kind: 'particles', box: [330, 360, 260, 200], count: 12, color: '#ffffff', motion: 'rise', size: 12, from: 4 },
          { kind: 'text', at: [600, 700], text: '和酸一碰，冒出二氧化碳', size: 's', from: 4.6 },
          { kind: 'text', at: [600, 830], text: '少放一点，馒头又白又暄', size: 's', from: 7.4 },
        ],
      },
      {
        turn: 5,
        title: '母液里再捞出化肥',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [330, 480], size: [320, 340], liquid: BRINE, level: 0.65, label: '母液', from: 0 },
          { kind: 'sprite', icon: '🧂', path: [[330, 170], [330, 330]], size: 70, travel: 1.2, from: 0.8, to: 3 },
          { kind: 'sprite', icon: '❄️', path: [[170, 330]], size: 70, wobble: true, from: 2.2 },
          { kind: 'particles', box: [220, 560, 220, 80], count: 10, color: CRYSTAL, motion: 'jitter', size: 12, amount: { at: 3, over: 3, from: 0, to: 10 }, from: 2.8 },
          { kind: 'arrow', path: [[530, 560], [760, 560]], color: HOT, text: '氯化铵', from: 5.6 },
          { kind: 'shape', shape: 'pill', at: [930, 560], size: [260, 90], color: FERTILIZER, text: '庄稼的氮肥', from: 6.4 },
          { kind: 'arrow', path: [[480, 330], [640, 225], [900, 225]], color: '#5b8fb9', text: '盐水回去造碱', from: 8 },
          { kind: 'text', at: [600, 830], text: '一举两得', size: 'm', from: 9.5 },
        ],
      },
    ],
  },
};
