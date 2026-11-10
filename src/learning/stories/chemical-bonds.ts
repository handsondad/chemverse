import type { Story } from './types';

const SODIUM = '#b48cff';
const CHLORINE = '#c8e66b';
const ELECTRON = '#ffcf3f';
const HYDROGEN = '#f4f4f0';
const OXYGEN = '#ff6b5e';
const HEAT = '#e0762b';
const PULL = '#c2410c';

export const chemicalBonds: Story = {
  slug: 'chemical-bonds',
  title: '钠一碰水就乱窜、氯气还有毒，为什么它俩凑在一起就成了能吃的食盐？',
  trigger: '小念往汤里撒盐时，听爸爸说食盐是钠和氯变成的，可前几天视频里的钠一丢进水就嘶嘶乱窜，氯气还是一种黄绿色的毒气。',
  dialogue: [
    {
      nian: '钠一碰水就乱窜，氯气还有毒，它俩凑在一起怎么就成了能吃的盐？',
      dad: '因为它们结合时交换了最外层的电子，脾气彻底变了。钠把最外层那 1 个电子交给氯，两边的最外层都凑成了 8 个，变得很稳定。变成食盐以后，原来那块钠和那团氯气就不在了，只剩一种新物质，性质完全不同。就像面粉和鸡蛋烤成蛋糕，再也不是原来的样子。',
      eq: '2Na + Cl₂ =点燃= 2NaCl',
      figure: { kind: 'shells', caption: '钠最外层只有 1 个橙色电子，氯最外层有 7 个：一个想送，一个正好想要。', atoms: [11, 17] },
    },
    {
      nian: '钠把电子交给氯以后呢？它们靠什么连在一起？',
      dad: '靠正负电互相吸引。钠送出一个电子，就带上一个正电，成了钠离子；氯收下一个电子，带上一个负电，成了氯离子。一正一负，就像磁铁的南极和北极，紧紧吸在一起。这种靠正负电吸住的力，叫离子键。',
      eq: 'Na − e⁻ → Na⁺　　Cl + e⁻ → Cl⁻',
      show: { kind: 'lab', step: 0, label: '看「电子转移」' },
    },
    {
      nian: '像磁铁一样一正一负吸住，那一粒盐里就是一个钠离子吸着一个氯离子吗？',
      dad: '不是一对一对的。一粒小小的盐里有数不清的钠离子和氯离子，一正一负前后左右上下交替排好，排成整整齐齐的小方块，所以放大看盐粒，常常是一个个小立方体。很多人以为盐是一个个「盐分子」堆起来的，其实 NaCl 只是说钠离子和氯离子个数一比一。',
      figure: {
        kind: 'crystal',
        caption: '盐粒里的钠离子（紫）和氯离子（绿）前后左右上下交替排开，每个离子周围都是 6 个异号离子。拖一拖看看。',
        structure: 'salt',
      },
    },
    {
      nian: '盐是离子交替排起来的，那两个一模一样的氢原子碰面，谁也不肯送电子，又怎么办？',
      dad: '那就合伙用。两个氢原子各拿出 1 个电子放在中间，这一对电子两边共有，每个氢都觉得自己身边有了 2 个电子，满足了。就像两个小朋友各出一块积木，搭成一座两人共有的小房子。这种靠共用电子对连起来的键，叫共价键，两个氢就成了一个氢分子。',
      eq: 'H· + ·H → H : H（H₂）',
      show: { kind: 'lab', step: 1, label: '看「电子共用」' },
    },
    {
      nian: '共价键能把两个氢连起来，那我们喝的水也是这样连起来的吗？',
      dad: '对。水分子里，氧原子和两个氢原子各共用一对电子，连成一个弯弯的 V 字；二氧化碳、天然气里的甲烷、白糖，也都是靠共价键连成一个个分子。粗略记：金属和非金属碰头，多半是一送一收，结成离子键；非金属和非金属碰头，多半是合伙共用，结成共价键。',
      figure: {
        kind: 'table',
        caption: '楼梯线左下是金属，右上是非金属（左上角的氢也算）：钠和氯一送一收，氢和氧合伙共用。',
        staircase: true,
        ring: [1, 8, 11, 17],
      },
    },
    {
      nian: '一送一收和合伙共用，在家里能看出它们有什么不一样吗？',
      dad: '能看出一点。离子键吸得很牢，所以食盐要上八百多度才熔化，炒菜的火根本熔不了它；白糖是一个个共价分子，分子和分子之间吸得松，放锅里小火一熬就化成糖浆。盐水还能导电，糖水几乎不导电，因为盐水里有能跑来跑去的离子。',
    },
    {
      nian: '我懂了！钠把最外层电子送给氯，变成一正一负的离子，靠离子键排成整齐的盐晶体；两个非金属谁也不肯送，就共用电子对，用共价键连成分子。电子一变，脾气也就变了。',
      dad: '完全正确！以后看到一种物质，先看它是金属和非金属在一起，还是全是非金属，就能猜出它是一送一收，还是合伙共用。',
    },
  ],
  tip: '金属钠和氯气都很危险，钠与氯气的反应只能在实验室由老师演示，家里绝不要尝试。熬糖浆温度很高，糖浆粘在皮肤上会严重烫伤，孩子要在大人看护下操作；验证盐水导电要用电池和小灯泡，千万不能接家里的插座。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '暴脾气变温顺',
        duration: 10,
        cues: [
          { kind: 'atom', path: [[250, 440], [530, 440]], symbol: 'Na', color: SODIUM, r: 64, travel: 3, from: 0.3, to: 3.6 },
          { kind: 'atom', path: [[950, 440], [670, 440]], symbol: 'Cl', color: CHLORINE, r: 64, travel: 3, from: 0.3, to: 3.6 },
          { kind: 'sprite', icon: '💥', path: [[250, 260]], size: 80, wobble: true, from: 0.6, to: 3 },
          { kind: 'sprite', icon: '☠️', path: [[950, 260]], size: 80, wobble: true, from: 0.8, to: 3 },
          { kind: 'pulse', at: [600, 440], color: HEAT, radius: 260, from: 3.2, to: 5.6 },
          { kind: 'sprite', icon: '🧂', path: [[600, 440]], size: 160, from: 3.8 },
          { kind: 'formula', at: [600, 690], text: '2Na + Cl₂ = 2NaCl', from: 5 },
          { kind: 'text', at: [600, 840], text: '变成新物质，脾气全变', size: 'm', from: 6.6 },
        ],
      },
      {
        turn: 1,
        title: '一送一收',
        duration: 12,
        cues: [
          { kind: 'atom', path: [[350, 450]], symbol: 'Na', color: SODIUM, r: 60, from: 0.2, to: 3.6 },
          { kind: 'atom', path: [[850, 450]], symbol: 'Cl', color: CHLORINE, r: 60, from: 0.4, to: 3.6 },
          { kind: 'atom', path: [[410, 400], [600, 300], [790, 400]], symbol: 'e⁻', color: ELECTRON, r: 26, travel: 1.6, from: 1.4, to: 3.4 },
          { kind: 'atom', path: [[350, 450], [540, 450]], symbol: 'Na', charge: '+', color: SODIUM, r: 56, travel: 2.4, from: 3.6 },
          { kind: 'atom', path: [[850, 450], [664, 450]], symbol: 'Cl', charge: '−', color: CHLORINE, r: 64, travel: 2.4, from: 3.6 },
          { kind: 'arrow', path: [[300, 300], [440, 300]], color: PULL, from: 3.8, to: 6.2 },
          { kind: 'arrow', path: [[900, 300], [760, 300]], color: PULL, from: 3.8, to: 6.2 },
          { kind: 'label', at: [602, 450], pos: [600, 640], text: '离子键：正负相吸', from: 6.4 },
          { kind: 'text', at: [600, 830], text: '一正一负，紧紧吸住', size: 'm', from: 7.6 },
        ],
      },
      {
        turn: 2,
        title: '交替排成小方块',
        duration: 12,
        cues: [
          { kind: 'atom', path: [[480, 330]], symbol: 'Na⁺', color: SODIUM, r: 46, from: 0.3 },
          { kind: 'atom', path: [[600, 330]], symbol: 'Cl⁻', color: CHLORINE, r: 60, from: 0.6 },
          { kind: 'atom', path: [[720, 330]], symbol: 'Na⁺', color: SODIUM, r: 46, from: 0.9 },
          { kind: 'atom', path: [[480, 450]], symbol: 'Cl⁻', color: CHLORINE, r: 60, from: 1.2 },
          { kind: 'atom', path: [[600, 450]], symbol: 'Na⁺', color: SODIUM, r: 46, from: 1.5 },
          { kind: 'atom', path: [[720, 450]], symbol: 'Cl⁻', color: CHLORINE, r: 60, from: 1.8 },
          { kind: 'text', at: [600, 590], text: '盐粒：交替排好的小方块', size: 's', from: 3.4 },
          { kind: 'myth', wrong: '盐是一个个盐分子堆成的', right: '钠离子、氯离子交替排好', from: 6.6 },
        ],
      },
      {
        turn: 3,
        title: '合伙共用',
        duration: 11,
        cues: [
          { kind: 'atom', path: [[250, 450], [500, 450]], symbol: 'H', color: HYDROGEN, r: 60, travel: 2.4, from: 0.3 },
          { kind: 'atom', path: [[950, 450], [700, 450]], symbol: 'H', color: HYDROGEN, r: 60, travel: 2.4, from: 0.3 },
          { kind: 'shape', shape: 'circle', at: [600, 450], size: [380, 230], color: 'none', outline: true, from: 3 },
          { kind: 'atom', path: [[600, 418]], symbol: '', color: ELECTRON, r: 20, motion: 'pulse', from: 3.4 },
          { kind: 'atom', path: [[600, 482]], symbol: '', color: ELECTRON, r: 20, motion: 'pulse', from: 3.6 },
          { kind: 'label', at: [600, 482], pos: [600, 660], text: '共用电子对', from: 4.6 },
          { kind: 'text', at: [600, 830], text: '合伙共用 = 共价键', size: 'm', from: 7 },
        ],
      },
      {
        turn: 4,
        title: '水分子：V 字形',
        duration: 11,
        cues: [
          { kind: 'bond', a: [600, 380], b: [482, 472], from: 1.4 },
          { kind: 'bond', a: [600, 380], b: [718, 472], from: 1.6 },
          { kind: 'atom', path: [[600, 380]], symbol: 'O', color: OXYGEN, r: 64, from: 0.3 },
          { kind: 'atom', path: [[482, 472]], symbol: 'H', color: HYDROGEN, r: 42, from: 0.8 },
          { kind: 'atom', path: [[718, 472]], symbol: 'H', color: HYDROGEN, r: 42, from: 1 },
          { kind: 'label', at: [541, 426], pos: [300, 600], text: '共用一对电子', from: 2.8 },
          { kind: 'formula', at: [600, 700], text: 'H₂O · CO₂ · CH₄', from: 4.6 },
          { kind: 'text', at: [600, 840], text: '非金属碰头：合伙共用', size: 'm', from: 6.6 },
        ],
      },
      {
        turn: 5,
        title: '盐难熔，糖好熬',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [330, 450], size: [200, 200], color: '#ffffff', text: '盐', from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [870, 450], size: [200, 200], color: '#fff7e6', text: '糖', tint: { color: '#d08a2c', at: 3, over: 4 }, motion: 'shrink', over: 6, from: 0.5 },
          { kind: 'sprite', icon: '🔥', path: [[330, 620]], size: 80, wobble: true, from: 1.4 },
          { kind: 'sprite', icon: '🔥', path: [[870, 620]], size: 80, wobble: true, from: 1.6 },
          { kind: 'text', at: [330, 720], text: '八百多度才熔', size: 's', from: 3.6 },
          { kind: 'text', at: [870, 720], text: '小火就化成糖浆', size: 's', from: 5 },
          { kind: 'text', at: [600, 850], text: '吸得牢不牢，熔点差很多', size: 'm', from: 7.4 },
        ],
      },
    ],
  },
};
