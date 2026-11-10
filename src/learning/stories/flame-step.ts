import { lessonAsset } from '../assets';
import type { Story } from './types';

const BLUE_FLAME = '#9cc3ff';
const YELLOW = '#ffcf3f';
const RED = '#ff5a4f';
const VIOLET = '#b48cff';
const GREEN = '#4cc38a';
const ELECTRON = '#ffcf3f';
const HEAT = '#ff8a3d';
const LEVEL = '#7a6a55';

export const flameStep: Story = {
  slug: 'flame-step',
  title: '烟花为什么有红有黄有绿？金属在火里一烧，凭什么各有各的颜色？',
  trigger: '除夕夜看烟花，天上一会儿金黄、一会儿紫红、一会儿翠绿；回家煮面时汤溢到灶上，蓝色的火苗一下子变成了黄色。',
  dialogue: [
    {
      nian: '爸爸，烟花怎么会有那么多颜色？汤一溢到灶上，蓝火苗怎么就变黄了？',
      dad: '因为不同的金属在火里会发出不同颜色的光。汤里有食盐，食盐里有钠，钠一进火就发黄光；换成锶，火是红的；换成钾，火是浅紫的。化学家把这叫焰色试验：看火变成什么颜色，就能认出里面藏着哪种金属。',
      show: { kind: 'lab', step: 0, label: '看「认识实验」' },
      figure: {
        kind: 'table',
        caption: '橙圈里是会给火焰「上色」的几种金属：锂、钠、钾、钙、铜、锶，大多住在周期表最左边两列。',
        focus: { by: 'atoms', values: [3, 11, 19, 20, 29, 38] },
        ring: [3, 11, 19, 20, 29, 38],
      },
    },
    {
      nian: '金属为什么一进火就会发光？火给了它什么？',
      dad: '火给了它能量。原子里的电子住在一级级「台阶」上，平时待在低处；火一烤，电子吸饱能量蹦上高台阶。可高处站不稳，它很快跳回来，把多出来的那份能量变成一小束光放出去。电子这样上上下下，叫电子跃迁。',
      figure: {
        kind: 'shells',
        caption: '钠和钾的最外层都只有 1 个电子（橙色）。火一烤，蹦上高台阶、再跳回来发光的主要就是它。',
        atoms: [11, 19],
      },
    },
    {
      nian: '那钠的电子跳回来是黄光，锶的却是红光，是它们的台阶不一样高吗？',
      dad: '对！每种元素的台阶高度都不一样，就像每栋楼的楼梯各有各的尺寸。落差大，放出的光能量高，颜色偏蓝紫；落差小，能量低，颜色偏红。钠那一跳正好对应黄光，波长约 589 纳米，所以钠的火永远是黄的。颜色就是元素的指纹。',
      eq: 'E = hc / λ：落差越大，波长越短，光越偏蓝紫',
      show: { kind: 'lab', step: 4, label: '看「能量与波长」' },
    },
    {
      nian: '既然颜色是指纹，为什么看钾的火还要隔一块蓝色玻璃？',
      dad: '因为钾的浅紫色很淡，而钾盐里几乎总混着一点钠，钠的黄光又特别亮，一下就把紫色盖住了。蓝色的钴玻璃能把黄光挡掉，紫色才露出来。同样的道理，每换一种样品，都要先把金属丝用盐酸洗净、烧到火焰不再变色，不然残留的钠会来捣乱。',
      eq: '钾：透过蓝色钴玻璃看浅紫色',
      show: { kind: 'lab', step: 3, label: '看「钾与钴玻璃」' },
      figure: {
        kind: 'image',
        src: lessonAsset('covers/flame-step.webp'),
        alt: '酒精灯上，一根细金属丝蘸着样品伸进火焰',
        caption: '细丝蘸一点样品伸进火焰外沿。火焰本来是淡蓝的，这里的黄色就是钠在「报到」。',
      },
    },
    {
      nian: '残留一点点钠都能被看出来，那科学家是不是也靠这些光找到过新元素？',
      dad: '真的找到过！用三棱镜把火光分开，每种元素会排出一组位置固定的亮线，这叫光谱。1860 年，本生和基尔霍夫在矿泉水的光谱里看见两条没人见过的蓝线，找到了铯；第二年又从两条红线里找到了铷。1868 年，太阳光谱里冒出一条陌生的黄线，那就是氦。',
      show: { kind: 'lab', step: 5, label: '看「发射与吸收」' },
      figure: {
        kind: 'table',
        caption: '靠光谱找到的三位：铷和铯在第 1 族，和钠是一家；氦在最右上角，它先在太阳上被看见，后来才在地球上找到。',
        ring: [2, 37, 55],
        focus: { by: 'atoms', values: [2, 11, 37, 55] },
      },
    },
    {
      nian: '光谱这么灵，那烟花的颜色也是金属烧出来的，不是加了颜料吗？',
      dad: '对，很多人以为烟花的颜色是涂的颜料，其实颜料一烧就成了黑灰。烟花里装的是金属盐：锶盐放红光、钡盐放绿光、钠盐放黄光。火药一炸，把它们烧到很高的温度，电子成批地跳上跳下，天空就被写满了颜色。',
      show: { kind: 'lab', step: 6, label: '看「六种金属」' },
    },
    {
      nian: '我懂了！火给电子能量，电子蹦上高台阶再跳回来，把能量变成光；每种元素的台阶高度不一样，光的颜色就不一样，所以看火的颜色就能认出金属。',
      dad: '说得完全对！下次煮汤溢锅、火苗一黄，你就知道是汤里的盐在报到。再记一条：看烟花要站在安全距离外，点火交给大人，落下来的火星和碎屑都很烫。',
    },
  ],
  tip: '焰色试验要用酒精灯、喷灯和盐酸清洗金属丝，只适合在学校实验室由老师演示；家里不要把金属盐往火里撒，钡盐有毒。燃放烟花爆竹请遵守当地规定，由大人在空旷处操作。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '火苗换了颜色',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'circle', at: [300, 470], size: [180, 260], color: BLUE_FLAME, text: '钠', tint: { color: YELLOW, at: 1.4, over: 1.4 }, motion: 'wiggle', from: 0.3 },
          { kind: 'shape', shape: 'circle', at: [600, 470], size: [180, 260], color: BLUE_FLAME, text: '锶', tint: { color: RED, at: 2.8, over: 1.4 }, motion: 'wiggle', from: 0.3 },
          { kind: 'shape', shape: 'circle', at: [900, 470], size: [180, 260], color: BLUE_FLAME, text: '钾', tint: { color: VIOLET, at: 4.2, over: 1.4 }, motion: 'wiggle', from: 0.3 },
          { kind: 'label', at: [300, 600], pos: [300, 700], text: '食盐里的钠', from: 2 },
          { kind: 'sprite', icon: '🎆', path: [[1040, 220]], size: 96, wobble: true, from: 5.6 },
          { kind: 'text', at: [600, 820], text: '看火的颜色，认出金属', size: 'm', from: 6.4 },
        ],
      },
      {
        turn: 1,
        title: '电子蹦上高台阶',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 640], size: [520, 12], color: LEVEL, from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [600, 360], size: [520, 12], color: LEVEL, from: 0.5 },
          { kind: 'label', at: [340, 640], pos: [200, 730], text: '低台阶', from: 0.8 },
          { kind: 'label', at: [340, 360], pos: [200, 270], text: '高台阶', from: 1.1 },
          { kind: 'sprite', icon: '🔥', path: [[600, 810]], size: 90, wobble: true, from: 1.4, to: 5 },
          { kind: 'flow', path: [[600, 760], [600, 660]], color: HEAT, count: 5, speed: 160, size: 12, from: 2, to: 5 },
          { kind: 'atom', path: [[600, 620], [600, 340]], symbol: 'e⁻', color: ELECTRON, r: 30, travel: 1.2, from: 3.2, to: 6.6 },
          { kind: 'atom', path: [[600, 340], [600, 620]], symbol: 'e⁻', color: ELECTRON, r: 30, travel: 0.8, from: 6.6 },
          { kind: 'arrow', path: [[640, 500], [960, 420]], color: '#e0a400', text: '放出一束光', from: 7.2 },
          { kind: 'text', at: [600, 830], text: '吸能上去，放光下来', size: 'm', from: 8.6 },
        ],
      },
      {
        turn: 2,
        title: '落差定颜色',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 660], size: [820, 12], color: LEVEL, from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [300, 540], size: [180, 12], color: LEVEL, from: 0.6 },
          { kind: 'arrow', path: [[300, 550], [300, 650]], color: RED, text: '锶·红', from: 1.4 },
          { kind: 'shape', shape: 'rect', at: [600, 430], size: [180, 12], color: LEVEL, from: 2.6 },
          { kind: 'arrow', path: [[600, 440], [600, 650]], color: '#e0a400', text: '钠·黄', from: 3.4 },
          { kind: 'shape', shape: 'rect', at: [900, 300], size: [180, 12], color: LEVEL, from: 4.6 },
          { kind: 'arrow', path: [[900, 310], [900, 650]], color: VIOLET, text: '钾·紫', from: 5.4 },
          { kind: 'text', at: [600, 810], text: '落差越大，越偏蓝紫', size: 'm', from: 7 },
        ],
      },
      {
        turn: 3,
        title: '蓝玻璃挡住黄光',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'circle', at: [260, 480], size: [180, 260], color: YELLOW, text: '钾盐', motion: 'wiggle', from: 0.3 },
          { kind: 'flow', path: [[360, 430], [880, 430]], color: '#e0a400', count: 7, speed: 260, size: 14, from: 1, to: 4.2 },
          { kind: 'flow', path: [[360, 530], [880, 530]], color: VIOLET, count: 4, speed: 260, size: 12, from: 1, to: 4.2 },
          { kind: 'shape', shape: 'rect', at: [640, 480], size: [44, 320], color: '#4c6ef5', from: 4.2 },
          { kind: 'label', at: [640, 320], pos: [640, 210], text: '蓝色钴玻璃', from: 4.6 },
          { kind: 'flow', path: [[360, 430], [620, 430]], color: '#e0a400', count: 4, speed: 260, size: 14, from: 4.6 },
          { kind: 'flow', path: [[360, 530], [960, 530]], color: VIOLET, count: 6, speed: 260, size: 14, from: 4.6 },
          { kind: 'text', at: [600, 800], text: '黄光挡住，紫色露出', size: 'm', from: 7.2 },
        ],
      },
      {
        turn: 4,
        title: '光谱里的新元素',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 400], size: [820, 110], color: '#3a3550', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [470, 400], size: [10, 110], color: '#5b8cff', from: 1.4 },
          { kind: 'shape', shape: 'rect', at: [492, 400], size: [10, 110], color: '#5b8cff', from: 1.6 },
          { kind: 'label', at: [480, 345], pos: [600, 230], text: '没人见过的蓝线', from: 2.6 },
          { kind: 'atom', path: [[480, 620]], symbol: 'Cs', color: '#c9d6ff', r: 56, from: 4 },
          { kind: 'shape', shape: 'rect', at: [880, 400], size: [10, 110], color: RED, from: 5.4 },
          { kind: 'atom', path: [[880, 620]], symbol: 'Rb', color: '#ffd0cc', r: 56, from: 6.4 },
          { kind: 'text', at: [600, 810], text: '把光分开，认出新元素', size: 'm', from: 8 },
        ],
      },
      {
        turn: 5,
        title: '烟花不是颜料',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'circle', at: [300, 380], size: [200, 200], color: RED, text: '锶盐', motion: 'pulse', from: 0.4 },
          { kind: 'shape', shape: 'circle', at: [600, 320], size: [200, 200], color: GREEN, text: '钡盐', motion: 'pulse', from: 1.1 },
          { kind: 'shape', shape: 'circle', at: [900, 380], size: [200, 200], color: YELLOW, text: '钠盐', motion: 'pulse', from: 1.8 },
          { kind: 'pulse', at: [600, 560], color: HEAT, radius: 260, from: 2.6, to: 6 },
          { kind: 'sprite', icon: '🎆', path: [[600, 600]], size: 120, wobble: true, from: 2.8 },
          { kind: 'myth', wrong: '烟花的颜色是颜料涂的', right: '是金属盐被烧得发光', from: 5 },
        ],
      },
    ],
  },
};
