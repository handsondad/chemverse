import type { Story, Vec } from './types';

const WATER = '#d8efff';
const H2O = '#9cc3ff';
const OIL = '#f08a3c';
const HEAD = '#5aa9e6';
const TAIL = '#f2b33d';
const FOAM = '#ffffff';
const HEAT = '#e0762b';
const CARD = '#fff3e0';

/** 绕 (cx, cy) 一整圈的路线：围着油珠转的一圈尾巴和脑袋 */
const ring = (cx: number, cy: number, r: number): Vec[] =>
  Array.from({ length: 49 }, (_, i) => [cx + r * Math.cos((i / 48) * Math.PI * 2 - Math.PI / 2), cy + r * Math.sin((i / 48) * Math.PI * 2 - Math.PI / 2)] as Vec);

export const surfactantCleaning: Story = {
  slug: 'surfactant-cleaning',
  title: '火锅碗上的红油用清水冲好几遍还是滑溜溜的，为什么挤一滴洗洁精就冲掉了？',
  trigger: '吃完火锅，小念抢着洗碗：清水冲了好几遍，碗上的红油还是滑溜溜的，爸爸挤了一滴洗洁精，一搓一冲就干净了。',
  dialogue: [
    {
      nian: '清水冲了好几遍，碗上的红油还是滑溜溜的，为什么水就是冲不走油？',
      dad: '因为水和油天生合不来。水分子很「黏人」，彼此手拉手抱得紧紧的；油分子是一条条长长的碳氢链子，和水拉不上手。水宁可自己抱团，也不给油让地方，所以油聚成一片，水冲过去也只是从油上滑走。化学上管这叫相似相溶：脾气像的才溶得到一起。',
      show: { kind: 'lab', step: 0, label: '看「水油分家」' },
    },
    {
      nian: '油和水拉不上手，那洗洁精是怎么让它们凑到一起的？',
      dad: '靠它里面一种「两面派」的小分子。它长得像一根火柴：圆圆的脑袋喜欢水，长长的尾巴讨厌水、喜欢油。一碰到油，成千上万根尾巴就争着扎进油里，脑袋留在外面朝着水。这种一头亲水、一头亲油的分子，叫表面活性剂。',
      eq: '常见的一种：R—SO₃Na（R 是亲油的长尾巴，—SO₃⁻ 是亲水的脑袋）',
      show: { kind: 'lab', step: 1, label: '看「双面特工」' },
    },
    {
      nian: '尾巴都扎进油里以后，油怎么就跟着水被冲走了？',
      dad: '因为它们把油团团围成了小球。尾巴都朝里抱着油，脑袋都朝外拉着水，一搓，大油斑就碎成许多很小很小的油珠，每颗外面都裹着一圈亲水的脑袋，像穿了一件水拉得住的外衣。水一冲，这些小油珠就跟着水流走了。这样把油分散到水里，叫乳化。',
      show: { kind: 'lab', step: 2, label: '看「胶束打包」' },
    },
    {
      nian: '油珠穿上外衣就被冲走了，那泡泡越多，是不是洗得越干净？',
      dad: '不一定。很多人以为泡沫越多越干净，其实真正干活的是水里那些两面派小分子，泡泡只是它们顺便在水面上吹出来的。有的洗涤剂故意做得泡沫很少，比如洗碗机用的，照样洗得很干净。洗洁精挤多了，反而要多冲好几遍才冲得净，一碗几滴就够了。',
    },
    {
      nian: '一碗几滴就够的话，怎么洗才能让这几滴洗洁精最卖力？',
      dad: '有三个小窍门。先用纸把碗里的大块油擦掉，让洗洁精只对付薄薄一层；再用温水洗，火锅牛油一凉就凝成白白的一层，温水里软一些，更容易拉下来；然后用海绵搓一搓，把大油斑搓碎，尾巴才有更多地方往里扎。最后用清水多冲几遍，把裹着油的小油珠都带走。',
    },
    {
      nian: '尾巴往油里扎这么厉害，那肥皂也是这样把油洗掉的吗？',
      dad: '是的，肥皂也是一头亲水、一头亲油，洗油的办法一样。不过肥皂本身就是用油脂做的：把油脂和碱一起熬煮，油就变成了肥皂和甘油，这是真正生成了新物质的化学变化，叫皂化。而洗碗时油被裹走，油还是油，只是被拆散了，这是物理变化。',
      eq: '油脂 + 氢氧化钠 →（加热）肥皂 + 甘油',
    },
    {
      nian: '我懂了！水分子自己抱团，不给油让地方，所以清水冲不走油；洗洁精的小分子尾巴扎进油里、脑袋拉住水，把油裹成小油珠，水一冲就带走了；泡泡多少不要紧。',
      dad: '说得一点不差！记个好习惯：先擦油、用温水、少挤几滴，最后多冲几遍清水，碗洗得干净，水也省。',
    },
  ],
  tip: '洗洁精、肥皂都不能入口，用后要把餐具冲洗干净；皮肤敏感的孩子洗碗时可以戴手套。做肥皂用的氢氧化钠是强碱，会灼伤皮肤和眼睛，不要带孩子在家自制手工皂。洗火锅碗用温水就够了，不要用开水烫，以免烫伤。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '水和油合不来',
        duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [520, 520], size: [480, 400], liquid: WATER, level: 0.7, label: '一碗水', from: 0 },
          { kind: 'shape', shape: 'pill', at: [520, 445], size: [470, 40], color: OIL, from: 0.4 },
          { kind: 'particles', box: [300, 490, 440, 200], count: 12, color: H2O, motion: 'jitter', size: 14, from: 1 },
          { kind: 'label', at: [520, 600], pos: [960, 620], text: '水分子手拉手', from: 2 },
          { kind: 'label', at: [700, 445], pos: [960, 300], text: '油聚成一片', from: 3 },
          { kind: 'flow', path: [[220, 380], [520, 405], [840, 380]], color: HEAD, count: 6, speed: 260, size: 10, from: 4.4 },
          { kind: 'text', at: [600, 850], text: '水冲过去，油不走', size: 'm', from: 6.8 },
        ],
      },
      {
        turn: 1,
        title: '火柴一样的分子',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [625, 420], size: [380, 36], color: TAIL, from: 0.6 },
          { kind: 'atom', path: [[400, 420]], symbol: '', color: HEAD, r: 46, from: 0.3 },
          { kind: 'label', at: [400, 470], pos: [330, 620], text: '脑袋：喜欢水', from: 1.6 },
          { kind: 'sprite', icon: '💧', path: [[280, 300]], size: 70, wobble: true, from: 2.2 },
          { kind: 'label', at: [720, 440], pos: [840, 620], text: '尾巴：喜欢油', from: 3.4 },
          { kind: 'sprite', icon: '🫒', path: [[920, 300]], size: 70, wobble: true, from: 4 },
          { kind: 'formula', at: [600, 740], text: 'R—SO₃Na', from: 5.6 },
          { kind: 'text', at: [600, 850], text: '一头亲水，一头亲油', size: 'm', from: 7.4 },
        ],
      },
      {
        turn: 2,
        title: '把油裹成小油珠',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [560, 450], size: [320, 320], color: OIL, motion: 'shrink', over: 3, from: 0.2 },
          { kind: 'flow', path: ring(560, 450, 88), color: TAIL, count: 14, speed: 30, size: 7, loop: true, from: 3.6 },
          { kind: 'flow', path: ring(560, 450, 112), color: HEAD, count: 14, speed: 38, size: 15, loop: true, from: 3.6 },
          { kind: 'label', at: [560, 338], pos: [900, 250], text: '脑袋朝外拉着水', from: 4.8 },
          { kind: 'label', at: [560, 530], pos: [900, 650], text: '尾巴朝里抱着油', from: 5.6 },
          { kind: 'arrow', path: [[700, 450], [1080, 450]], color: HEAD, text: '跟着水流走', from: 7 },
          { kind: 'text', at: [600, 840], text: '油被裹成小油珠', size: 'm', from: 8.2 },
        ],
      },
      {
        turn: 3,
        title: '泡泡不是主角',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [330, 430], size: [300, 300], liquid: WATER, level: 0.7, label: '泡泡多', from: 0 },
          { kind: 'vessel', vessel: 'beaker', at: [870, 430], size: [300, 300], liquid: WATER, level: 0.7, label: '泡泡少', from: 0.2 },
          { kind: 'particles', box: [200, 330, 260, 55], count: 14, color: FOAM, motion: 'jitter', size: 16, from: 0.8 },
          { kind: 'particles', box: [780, 350, 180, 30], count: 3, color: FOAM, motion: 'jitter', size: 16, from: 1 },
          { kind: 'particles', box: [210, 410, 240, 150], count: 6, color: HEAD, motion: 'jitter', size: 9, from: 2 },
          { kind: 'particles', box: [750, 410, 240, 150], count: 6, color: HEAD, motion: 'jitter', size: 9, from: 2.2 },
          { kind: 'text', at: [600, 440], text: '一样干净', size: 's', from: 3.8 },
          { kind: 'myth', wrong: '泡沫越多洗得越干净', right: '干活的是小分子，不是泡泡', from: 6.6 },
        ],
      },
      {
        turn: 4,
        title: '擦、温、搓、冲',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [330, 320], size: [420, 130], color: CARD, text: '🧻 擦掉大油', from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [870, 320], size: [420, 130], color: CARD, text: '♨️ 用温水', from: 1.8 },
          { kind: 'pulse', at: [870, 320], color: HEAT, radius: 200, from: 2.4, to: 5 },
          { kind: 'shape', shape: 'pill', at: [330, 540], size: [420, 130], color: CARD, text: '🧽 搓一搓', from: 3.6 },
          { kind: 'shape', shape: 'pill', at: [870, 540], size: [420, 130], color: CARD, text: '🚿 多冲几遍', from: 5.2 },
          { kind: 'text', at: [600, 830], text: '几滴就够，干活最卖力', size: 'm', from: 7.4 },
        ],
      },
      {
        turn: 5,
        title: '肥皂是油变来的',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [430, 470], size: [400, 360], liquid: '#f2c14e', level: 0.55, tint: { color: '#efe6d2', at: 3, over: 4 }, label: '油脂 + 碱', from: 0 },
          { kind: 'pulse', at: [430, 600], color: HEAT, radius: 220, from: 1 },
          { kind: 'arrow', path: [[690, 470], [860, 470]], text: '熬煮', from: 4.6 },
          { kind: 'shape', shape: 'pill', at: [1010, 400], size: [220, 90], color: '#e8f4ff', text: '肥皂', from: 5.6 },
          { kind: 'shape', shape: 'pill', at: [1010, 530], size: [220, 90], color: '#fdf6e3', text: '甘油', from: 6.2 },
          { kind: 'formula', at: [600, 780], text: '油脂 + 氢氧化钠 → 肥皂 + 甘油', from: 7 },
          { kind: 'text', at: [600, 860], text: '生成了新物质', size: 's', from: 8.6 },
        ],
      },
    ],
  },
};
