import type { Story } from './types';

const STARCH = '#f3e1b0';
const WATER = '#9cc3ff';
const STEAM = '#eef6ff';
const HEAT = '#e0762b';
const SUGAR = '#f6c56b';
const PAN = '#4a4a4a';
const RICE = '#fffdf6';
const COLD = '#4c6ef5';

export const starchGelatinization: Story = {
  slug: 'starch-gelatinization',
  title: '生米一煮就变得软糯喷香，为什么剩饭放进冰箱一夜又变得硬邦邦？',
  trigger: '早上小念从冰箱里拿出昨晚的剩米饭，一捏硬邦邦、一粒一粒的，和昨晚刚出锅时软糯的样子完全不一样。',
  dialogue: [
    {
      nian: '昨晚的米饭还软软糯糯的，怎么在冰箱里放了一夜就变得硬邦邦的？',
      dad: '因为米饭里的主角淀粉，凉下来以后会重新「排队」。淀粉是一根根很长的链子，在生米里排得整整齐齐、紧紧抱成一团，所以生米很硬。煮的时候水钻进去把队伍冲散，米就软了；放凉以后，链子又慢慢靠拢排好，把水挤了出去，米饭就又变硬了。这叫淀粉的回生。',
    },
    {
      nian: '生米里的淀粉链子抱得那么紧，用冷水泡着为什么泡不软？',
      dad: '因为链子之间有许许多多的小拉手，把彼此拽得牢牢的，排成一小块一小块很整齐的结构。冷水分子劲头小，挤不进这么紧的队伍，生米泡一晚上也只吸进一点水，还是硬得嚼不动。这些小拉手叫氢键，一个很弱，可成千上万个一起拉，就很结实了。',
      figure: {
        kind: 'shells',
        atoms: [1, 8],
        caption: '水分子由氢（H）和氧（O）组成：冷水里水分子运动慢、劲头小，挤不进被氢键拉紧的生淀粉队伍。',
      },
      show: { kind: 'lab', step: 0, label: '看「冷水淘米」' },
    },
    {
      nian: '氢键那么结实，为什么一加热就被冲开了？',
      dad: '因为热会让所有分子都动得更欢。水温升到大约 60 到 80 ℃，水分子撞得又快又猛，淀粉链也抖了起来，小拉手一个个被扯开，水分子趁机挤进链子中间，和它们拉上了手。米粒吸饱了水，胀得又大又软，还变得有点半透明，这个过程叫糊化。',
      eq: '生淀粉 + 水 →（约 60～80 ℃）吸水胀大的糊化淀粉',
      figure: {
        kind: 'scale',
        axis: '水温一路升高 →',
        stops: [
          { label: '冷水泡米', note: '链子抱紧·嚼不动', color: '#dbeafe' },
          { label: '水温渐升', note: '分子越撞越猛', color: '#fef3c7' },
          { label: '60～80 ℃', note: '吸水胀大·糊化', color: '#fed7aa', hot: true },
        ],
        caption: '水温跨过 60～80 ℃ 这道门槛，水分子才冲得开淀粉链的小拉手，让米粒吸饱水变软糯。',
      },
      show: { kind: 'lab', step: 1, label: '看「升温糊化」' },
    },
    {
      nian: '米粒一糊化就变软变香，那煮饭是不是把淀粉变成了别的东西？',
      dad: '不是。很多人以为饭煮熟了就变成了新物质，其实糊化时淀粉还是淀粉，只是队伍散了、吸进了水，这是物理变化。真正变出新东西的地方在你嘴里：米饭嚼久了会发甜，是唾液里的酶把长长的淀粉剪成了麦芽糖，这才是化学变化。',
      eq: '淀粉 + 水 →（唾液里的酶）麦芽糖',
    },
    {
      nian: '剩饭里的淀粉又排好了队，那怎么放才能让它别那么快变硬？',
      dad: '回生在冰箱冷藏室那种几度的低温下特别快。所以吃不完的饭，要么尽快吃掉，要么分成小份放进冷冻室，冻住以后链子很难挪动，回生就慢多了。要吃的时候洒一点水，蒸透或用微波炉热透，大部分队伍又被冲散，米饭就能重新变软。',
      show: { kind: 'lab', step: 2, label: '看「冷藏回生」' },
    },
    {
      nian: '冷冻能让回生慢下来，那做蛋炒饭为什么偏偏要用隔夜饭？',
      dad: '因为炒饭正好需要米粒硬一点、干一点。回生把水挤了出去，米粒表面不黏，下锅一炒就粒粒分开，裹上蛋液也不会糊成一团；刚出锅的软饭水多又黏，一炒就成了一锅饭泥。所以回生不全是坏事，要看你拿它做什么。',
    },
    {
      nian: '我懂了！生米里淀粉链子靠氢键抱得紧紧的，所以硬；加热后水分子把它们冲散、钻进去，米粒就糊化变软；凉了链子又排回队伍、把水挤走，就是回生变硬。',
      dad: '讲得清清楚楚！记一个好习惯：剩饭要早点放进冰箱或冷冻室，吃之前一定热透；放了很久、闻着发酸的饭就别吃了。',
    },
  ],
  tip: '煮熟的米饭在室温下放久了容易滋生细菌（如蜡样芽孢杆菌），请尽快冷藏或冷冻，一般不要超过两小时，复热时要热透。糊化温度因米的品种不同而略有差别，文中的 60～80 ℃ 是大致范围。冷冻能明显减慢回生，但解冻后仍要充分加热再吃。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '软饭变硬饭',
        duration: 10,
        cues: [
          { kind: 'sprite', icon: '🍚', path: [[300, 420]], size: 150, from: 0.2 },
          { kind: 'particles', box: [230, 190, 140, 150], count: 8, color: STEAM, motion: 'rise', size: 14, from: 0.6 },
          { kind: 'text', at: [300, 620], text: '刚出锅：软糯', size: 's', from: 1.2 },
          { kind: 'arrow', path: [[460, 420], [740, 420]], color: COLD, text: '冰箱一夜', from: 2.4 },
          { kind: 'sprite', icon: '🍚', path: [[900, 420]], size: 150, from: 3.4 },
          { kind: 'sprite', icon: '❄️', path: [[1010, 300]], size: 70, wobble: true, from: 3.8 },
          { kind: 'text', at: [900, 620], text: '隔夜：硬邦邦', size: 's', color: COLD, from: 4.4 },
          { kind: 'text', at: [600, 830], text: '淀粉又排好了队', size: 'm', from: 6.4 },
        ],
      },
      {
        turn: 1,
        title: '冷水挤不进去',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'pill', at: [560, 420], size: [520, 34], color: STARCH, from: 0.3 },
          { kind: 'shape', shape: 'pill', at: [560, 470], size: [520, 34], color: STARCH, from: 0.6 },
          { kind: 'shape', shape: 'pill', at: [560, 520], size: [520, 34], color: STARCH, from: 0.9 },
          { kind: 'shape', shape: 'pill', at: [560, 570], size: [520, 34], color: STARCH, from: 1.2 },
          { kind: 'label', at: [700, 495], pos: [990, 640], text: '氢键：小拉手', from: 2.4 },
          { kind: 'particles', box: [300, 200, 560, 130], count: 9, color: WATER, motion: 'gas', size: 16, from: 3.4 },
          { kind: 'text', at: [600, 830], text: '冷水挤不进去', size: 'm', from: 6.4 },
        ],
      },
      {
        turn: 2,
        title: '加热冲散队伍',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [520, 440], size: [520, 34], color: STARCH, from: 0.2, to: 4.2 },
          { kind: 'shape', shape: 'pill', at: [520, 490], size: [520, 34], color: STARCH, from: 0.2, to: 4.2 },
          { kind: 'shape', shape: 'pill', at: [520, 540], size: [520, 34], color: STARCH, from: 0.2, to: 4.2 },
          { kind: 'count', at: [990, 260], label: '水温', start: 20, end: 80, unit: '℃', over: 3, from: 0.6 },
          { kind: 'shape', shape: 'pill', at: [520, 330], size: [520, 34], color: STARCH, motion: 'wiggle', from: 4.2 },
          { kind: 'shape', shape: 'pill', at: [520, 490], size: [520, 34], color: STARCH, motion: 'wiggle', from: 4.3 },
          { kind: 'shape', shape: 'pill', at: [520, 650], size: [520, 34], color: STARCH, motion: 'wiggle', from: 4.4 },
          { kind: 'particles', box: [290, 370, 460, 240], count: 12, color: WATER, motion: 'jitter', size: 14, from: 4.8 },
          { kind: 'text', at: [600, 830], text: '糊化：吸饱水变软', size: 'm', from: 8 },
        ],
      },
      {
        turn: 3,
        title: '还是淀粉',
        duration: 12,
        cues: [
          { kind: 'text', at: [600, 200], text: '糊化：淀粉还是淀粉', size: 's', from: 0.3 },
          { kind: 'shape', shape: 'pill', at: [600, 340], size: [600, 40], color: STARCH, from: 0.6, to: 3.8 },
          { kind: 'sprite', icon: '✂️', path: [[260, 340], [940, 340]], size: 80, travel: 2.2, from: 1.6, to: 4 },
          { kind: 'particles', box: [310, 310, 580, 60], count: 8, color: SUGAR, motion: 'jitter', size: 18, from: 3.6 },
          { kind: 'label', at: [600, 360], pos: [600, 520], text: '酶剪出了麦芽糖', from: 4.4 },
          { kind: 'myth', wrong: '煮熟就变成了新物质', right: '糊化时，淀粉还是淀粉', from: 7 },
        ],
      },
      {
        turn: 4,
        title: '冷冻慢慢回生',
        duration: 11,
        cues: [
          { kind: 'text', at: [330, 230], text: '冷藏室', size: 's', from: 0.3 },
          { kind: 'text', at: [870, 230], text: '冷冻室', size: 's', from: 0.5 },
          { kind: 'sprite', icon: '🍚', path: [[330, 420]], size: 130, from: 0.8 },
          { kind: 'sprite', icon: '🍚', path: [[870, 420]], size: 130, from: 1 },
          { kind: 'sprite', icon: '❄️', path: [[1000, 320]], size: 70, wobble: true, from: 1.4 },
          { kind: 'meter', at: [330, 620], label: '回生变硬', start: 0, end: 0.85, color: HEAT, over: 4, from: 2 },
          { kind: 'meter', at: [870, 620], label: '回生变硬', start: 0, end: 0.2, color: COLD, over: 4, from: 2 },
          { kind: 'text', at: [600, 830], text: '分小份，放冷冻', size: 'm', from: 7 },
        ],
      },
      {
        turn: 5,
        title: '隔夜饭炒得开',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'pill', at: [520, 640], size: [560, 44], color: PAN, from: 0 },
          { kind: 'particles', box: [320, 540, 400, 70], count: 14, color: RICE, motion: 'jitter', size: 16, from: 0.6 },
          { kind: 'pulse', at: [520, 640], color: HEAT, radius: 260, from: 1.6 },
          { kind: 'sprite', icon: '🥚', path: [[960, 260], [560, 470]], size: 80, travel: 1.6, from: 2.6, to: 4.6 },
          { kind: 'label', at: [520, 570], pos: [920, 450], text: '粒粒分开', from: 4.6 },
          { kind: 'text', at: [600, 830], text: '回生也有用处', size: 'm', from: 7 },
        ],
      },
    ],
  },
};
