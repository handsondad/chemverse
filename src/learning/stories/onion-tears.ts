import type { Story } from './types';

const TEAR = '#c3a6ff';
const SULFUR = '#f4d03f';
const ENZYME = '#cfe6ff';
const COLD = '#4dabf7';
const HEAT = '#ff8a3d';

export const onionTears: Story = {
  slug: 'onion-tears',
  title: '切洋葱为什么会流眼泪？洋葱又没碰到我的眼睛！',
  trigger: '妈妈在厨房切洋葱，小念凑过去看了不到半分钟，眼睛就辣得直流泪。',
  dialogue: [
    {
      nian: '爸爸，我又没碰洋葱，为什么切洋葱会流眼泪？',
      dad: '因为洋葱会“放气”。一刀切下去，洋葱里马上造出一种会飘的气体，叫催泪因子。它飘到你眼睛上，眼睛表面的神经觉得又辣又刺，就赶紧让泪腺放眼泪，把它冲走。所以流泪是眼睛在保护自己，并不是洋葱汁溅进去了。',
      figure: {
        kind: 'table',
        caption: '催泪因子由碳、氢、氧、硫四种元素组成，圈出来的硫是洋葱又辣又冲的关键。',
        paint: 'category',
        focus: { by: 'atoms', values: [1, 6, 8, 16] },
        ring: [16],
      },
      show: { kind: 'lab', step: 0, label: '看催泪因子飘进眼睛' },
    },
    {
      nian: '催泪因子是一直藏在洋葱里的吗？为什么不切的洋葱闻起来不辣？',
      dad: '完整的洋葱里没有它。洋葱的细胞像一间间小屋：一边装着含硫的“原料”，另一边装着能加工原料的酶，平时不见面。刀一切，墙破了，两样一碰头，第一种酶把原料剪开，第二种酶马上把它改成催泪因子。前后只要几秒，切完大约 30 秒最冲。',
      eq: '含硫原料（氨基酸亚砜） →(蒜氨酸酶) 次磺酸 →(催泪因子合成酶) 催泪因子',
      figure: {
        kind: 'dots',
        caption: '把一个洋葱分成 100 份，大约 89 份是水。含硫原料和酶都泡在细胞的水里，只是分开住。',
        groups: [
          { label: '水', count: 89, amount: '约 89 份', note: '原料和酶就泡在里面' },
          { label: '糖、纤维等', count: 11, amount: '约 11 份', note: '含硫原料只占一点点', hot: true },
        ],
      },
      show: { kind: 'lab', step: 1, label: '看原料遇上酶' },
    },
    {
      nian: '酶为什么一碰到原料就那么快？它是什么东西？',
      dad: '酶是生物细胞自己做的“小剪刀”，专门加工某一种分子，就像一把钥匙只开一把锁。没有它，原料自己慢慢变要等很久；有了它，一眨眼就能剪好多个。能让反应变快、自己又不被用掉的东西叫催化剂，酶就是生物体里的催化剂。洋葱这么做是为了防身：谁咬它，就辣谁。',
      show: { kind: 'lab', step: 1, label: '看酶怎么加速' },
    },
    {
      nian: '洋葱用它来防身？那大蒜也很辣，为什么切大蒜不怎么流泪？',
      dad: '大蒜是洋葱的亲戚，也有那把剪原料的酶，却少了第二种酶。大蒜切开后，原料变成了大蒜素，辣嘴、气味冲，却不太会飘进眼睛捣乱。科学家正是找到了洋葱独有的这第二种酶，才弄明白催泪因子是怎么来的。很多人以为辣嘴的东西都辣眼睛，其实是两回事。',
      show: { kind: 'lab', step: 2, label: '比一比洋葱和大蒜' },
    },
    {
      nian: '原来是第二种酶在捣乱！我切洋葱的时候，怎么才能让它少干点活？',
      dad: '有几个好办法。先把洋葱放进冰箱冷藏半小时：温度低，酶干活慢，催泪因子也飘得慢；刀磨快一点，切破的细胞少；开着抽油烟机或在窗边切，让气被吹走。炒熟的洋葱不辣眼睛还发甜，因为高温把酶烫坏了，辣味分子也被破坏、跑掉，本来就有的甜味就显出来了。',
      figure: {
        kind: 'table',
        caption: '洋葱里的酶和其他蛋白质一样，主要由碳、氢、氧、氮搭成（亮着的四格），一受热就会变形、失去本领。',
        paint: 'category',
        focus: { by: 'atoms', values: [1, 6, 7, 8] },
      },
    },
    {
      nian: '我懂了！洋葱的原料和酶平时分开住，一刀切破细胞，它们碰头就造出会飘的催泪因子，飘进眼睛刺激神经，眼泪就来冲它。冰一冰、刀快一点、开着风，酶来不及干活，眼泪就少了！',
      dad: '说得一点不差！再记一个好习惯：切洋葱时千万别用手揉眼睛，手上沾着洋葱汁，越揉越辣。真辣得受不了，就先走开眨眨眼，用清水冲一冲。',
    },
  ],
  tip: '切洋葱流泪只是暂时的刺激，用清水冲洗即可缓解；如果眼睛持续红肿疼痛，应及时就医。孩子学切菜时先教握刀姿势，洋葱圆滚容易滑，先切一刀放平再切。文中的反应过程参考了 Imai 等 2002 年发表在《自然》上的洋葱催泪因子合成酶研究、Compound Interest 的洋葱化学图解，以及中国科学院植物研究所的科普文章；洋葱含水约 89% 来自美国农业部食物成分数据。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '一刀切下去',
        duration: 10,
        cues: [
          { kind: 'sprite', icon: '🧅', path: [[360, 480]], size: 220, from: 0 },
          { kind: 'sprite', icon: '🔪', path: [[360, 200], [360, 420]], size: 120, travel: 1.2, from: 0.6, to: 3 },
          { kind: 'particles', box: [270, 230, 200, 160], count: 8, color: TEAR, motion: 'rise', size: 14, from: 2 },
          { kind: 'flow', path: [[460, 380], [820, 330]], color: TEAR, count: 6, size: 12, speed: 180, from: 2.6 },
          { kind: 'sprite', icon: '👁️', path: [[900, 330]], size: 160, from: 0.3 },
          { kind: 'pulse', at: [900, 330], color: TEAR, radius: 170, from: 4.4 },
          { kind: 'sprite', icon: '💧', path: [[900, 420], [900, 580]], size: 60, travel: 1.5, from: 5.4 },
          { kind: 'text', at: [600, 800], text: '眼泪赶来冲走它', size: 'm', from: 6.4 },
        ],
      },
      {
        turn: 1,
        title: '原料和酶分开住',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [420, 450], size: [320, 280], color: '#fff3c4', outline: true, from: 0, to: 5.4 },
          { kind: 'particles', box: [300, 340, 240, 220], count: 5, color: SULFUR, symbol: 'S', size: 26, motion: 'jitter', from: 0.6, to: 5.4 },
          { kind: 'shape', shape: 'rect', at: [800, 450], size: [320, 280], color: '#e7f3ff', outline: true, from: 0.4, to: 5.4 },
          { kind: 'particles', box: [680, 340, 240, 220], count: 4, color: ENZYME, symbol: '✂', size: 30, motion: 'jitter', from: 1, to: 5.4 },
          { kind: 'sprite', icon: '🔪', path: [[610, 200], [610, 680]], size: 110, travel: 1, from: 4.2, to: 6 },
          { kind: 'particles', box: [300, 300, 620, 300], count: 10, color: TEAR, motion: 'gas', size: 16, from: 5.6 },
          { kind: 'count', at: [900, 760], label: '切开以后', start: 0, end: 30, unit: '秒最冲', over: 4, from: 6.4 },
          { kind: 'text', at: [420, 790], text: '一碰头就开工', size: 'm', from: 7.6 },
        ],
      },
      {
        turn: 1,
        title: '两步造出催泪因子',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [210, 450], size: [220, 90], color: '#ffe1a8', text: '含硫原料', from: 0 },
          { kind: 'arrow', path: [[330, 450], [490, 450]], text: '第一种酶', from: 1.2 },
          { kind: 'shape', shape: 'pill', at: [600, 450], size: [200, 90], color: '#ffd8c2', text: '次磺酸', from: 2.4 },
          { kind: 'arrow', path: [[710, 450], [860, 450]], text: '第二种酶', from: 3.6 },
          { kind: 'shape', shape: 'pill', at: [1000, 450], size: [220, 90], color: TEAR, text: '催泪因子', from: 4.8 },
          { kind: 'particles', box: [920, 230, 160, 150], count: 6, color: TEAR, motion: 'rise', size: 13, from: 5.6 },
          { kind: 'text', at: [600, 790], text: '前后只要几秒钟', size: 'm', from: 7 },
        ],
      },
      {
        turn: 2,
        title: '酶是一把小剪刀',
        duration: 11,
        cues: [
          { kind: 'particles', box: [140, 300, 300, 300], count: 8, color: SULFUR, symbol: 'S', size: 24, motion: 'jitter', amount: { at: 2, over: 5, from: 8, to: 1 }, from: 0.3 },
          { kind: 'sprite', icon: '✂️', path: [[600, 450]], size: 130, wobble: true, from: 0.8 },
          { kind: 'particles', box: [760, 300, 300, 300], count: 8, color: TEAR, motion: 'gas', size: 16, amount: { at: 2, over: 5, from: 0, to: 8 }, from: 1.6 },
          { kind: 'text', at: [600, 720], text: '一眨眼剪好多个', size: 's', from: 4 },
          { kind: 'text', at: [600, 820], text: '酶是生物的催化剂', size: 'm', color: '#1f6b55', from: 7 },
        ],
      },
      {
        turn: 3,
        title: '大蒜少一种酶',
        duration: 12,
        cues: [
          { kind: 'sprite', icon: '🧅', path: [[250, 330]], size: 130, from: 0 },
          { kind: 'arrow', path: [[350, 330], [740, 330]], text: '两种酶', from: 1 },
          { kind: 'shape', shape: 'pill', at: [910, 330], size: [260, 80], color: TEAR, text: '催泪因子', from: 2.2 },
          { kind: 'sprite', icon: '🧄', path: [[250, 580]], size: 130, from: 2.8 },
          { kind: 'arrow', path: [[350, 580], [740, 580]], text: '只有一种酶', from: 3.6 },
          { kind: 'shape', shape: 'pill', at: [910, 580], size: [260, 80], color: '#fff0c2', text: '大蒜素', from: 4.8 },
          { kind: 'myth', wrong: '辣嘴的都会辣眼睛', right: '会飘进眼睛的才辣眼', from: 7 },
        ],
      },
      {
        turn: 4,
        title: '冰一冰，酶变慢',
        duration: 11,
        cues: [
          { kind: 'sprite', icon: '🧅', path: [[320, 500]], size: 200, from: 0 },
          { kind: 'sprite', icon: '❄️', path: [[320, 260]], size: 110, from: 0.8 },
          { kind: 'particles', box: [240, 250, 160, 150], count: 6, color: TEAR, motion: 'rise', size: 13, amount: { at: 2.6, over: 3, from: 6, to: 1 }, from: 0.4 },
          { kind: 'meter', at: [800, 360], label: '温度', start: 0.75, end: 0.2, color: COLD, over: 2.5, from: 1.2 },
          { kind: 'meter', at: [800, 500], label: '酶的速度', start: 0.8, end: 0.25, color: TEAR, over: 2.5, from: 2 },
          { kind: 'text', at: [600, 800], text: '冷了，酶就慢下来', size: 'm', from: 5.6 },
        ],
      },
      {
        turn: 4,
        title: '炒熟就不辣眼',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'pill', at: [560, 580], size: [520, 60], color: '#868e96', from: 0 },
          { kind: 'sprite', icon: '🧅', path: [[560, 490]], size: 140, from: 0.3 },
          { kind: 'pulse', at: [560, 580], color: HEAT, radius: 230, from: 1 },
          { kind: 'meter', at: [940, 280], label: '锅里温度', start: 0.2, end: 0.9, color: HEAT, over: 2.5, from: 1.2 },
          { kind: 'shape', shape: 'pill', at: [300, 300], size: [180, 70], color: ENZYME, text: '酶', tint: { color: '#ced4da', at: 3.6, over: 1.5 }, from: 0.8 },
          { kind: 'label', at: [360, 300], pos: [600, 230], text: '烫坏了，剪不动', from: 4.6 },
          { kind: 'text', at: [600, 800], text: '不辣眼，还变甜了', size: 'm', from: 6 },
        ],
      },
    ],
  },
};
