import type { Story } from './types';

const ENAMEL = '#fefce8';
const FLUOR_ENAMEL = '#bbf7d0';
const ACID = '#fb7185';
const CALCIUM = '#93c5fd';
const FLUORIDE = '#34d399';

export const fluorideTeeth: Story = {
  slug: 'fluoride-teeth',
  title: '含氟牙膏里只有一丁点氟，凭什么能给牙齿换上不怕酸的“铠甲”？',
  trigger: '睡前刷牙时，小念看着儿童牙膏盒上大大的“含氟防蛀”，纳闷这千分之一左右的氟到底是怎么保护牙齿的。',
  dialogue: [
    {
      nian: '爸爸，牙齿摸起来比石头还硬，为什么吃点糖不刷牙就会被蛀出小洞？',
      dad: '因为再硬的石头也有怕的东西——牙齿最外层的牙釉质，近九成是用钙、磷和氢氧根搭成的矿物质砖块，叫羟基磷灰石。糖本身不咬牙齿，可藏在牙缝里的细菌一吃到糖，几分钟就会吐出乳酸。当牙面酸到 pH 5.5 以下，酸里的氢离子就会把砖块里的钙和磷一点点撬走溶进水里，这叫脱矿。',
      eq: 'Ca₅(PO₄)₃OH（固体） + 4H⁺ ⇌ 5Ca²⁺ + 3HPO₄²⁻ + H₂O',
      figure: {
        kind: 'table',
        focus: { by: 'atoms', values: [1, 8, 9, 15, 20] },
        ring: [9, 15, 20],
        caption: '牙齿矿物质由钙（Ca）、磷（P）、氧、氢搭成；第 9 号元素氟（F）正是来帮忙加固的援兵。',
      },
      show: { kind: 'lab', step: 0, label: '看「酸蚀脱矿」' },
    },
    {
      nian: '每天吃饭喝酸奶都会脱矿，那我们的牙齿怎么没有几天就被溶光呢？',
      dad: '多亏你嘴里全天候值班的“泥瓦匠”——唾液！不吃东西的时候，唾液能把酸冲淡回中性，而且唾液里本来就溶着许多钙离子和磷酸根。酸劲一退，它们就会把刚刚撬松的小缺口一点点重新补回去，叫再矿化。只有老含着甜饮料、让脱矿远远快过修补，牙面才会先长白斑、再塌成蛀洞。',
    },
    {
      nian: '既然唾液会再矿化修补，牙膏里的那一点点氟又是怎么帮上忙的？',
      dad: '氟离子干的是“升级砖块”的活！刷牙时微量的氟离子钻进牙面，替掉原来砖块里的氢氧根，跟钙和磷拼成一种更紧凑、更难溶的新砖块——氟磷灰石。原来的砖块到 pH 5.5 就开始溶了，换上氟磷灰石新砖块，一直扛到 pH 4.5 左右才怕酸，而且氟离子还能催着唾液里的钙和磷补得更快！',
      eq: 'Ca₅(PO₄)₃OH（固体） + F⁻ ⇌ Ca₅(PO₄)₃F（固体） + OH⁻',
      figure: {
        kind: 'scale',
        axis: '牙面抵抗口腔酸蚀的防线对比',
        stops: [
          { label: '中性口腔', note: '唾液日常修补', color: '#dbeafe' },
          { label: '跌破pH5.5', note: '普通牙面开始溶', color: '#fde68a' },
          { label: '扛到pH4.5', note: '含氟新砖仍稳固', color: '#bbf7d0', hot: true },
          { label: '强酸饮食', note: '汽水柠檬别久含', color: '#fecaca' },
        ],
        caption: '氟离子把表面部分羟基磷灰石升级成氟磷灰石，把牙齿耐酸的临界线从 pH 5.5 往下推到约 pH 4.5。',
      },
      show: { kind: 'lab', step: 1, label: '看「氟来换砖」' },
    },
    {
      nian: '氟磷灰石这么耐酸，是不是把整支牙膏挤满牙刷、刷完再把泡沫咽下去更好？',
      dad: '那可不行，再好的帮手也不能贪多！很多人以为氟越多越防蛀，其实正在长恒牙的小朋友如果长期把牙膏吞进肚子里，过量的氟反而会让新长出来的牙齿表面带白斑或褐斑，叫氟斑牙。三岁以上每次只挤一颗豌豆大小就够用，刷完一定要把泡沫吐干净！',
      figure: {
        kind: 'sizes',
        atoms: [9, 8, 17],
        caption: '氟原子（F）个头小巧紧实，变成氟离子嵌进钙磷晶格里比氢氧根咬合得更牢。',
      },
      show: { kind: 'lab', step: 2, label: '看「用量刚好」' },
    },
    {
      nian: '把泡沫吐干净以后，要不要接三大杯水咕噜咕噜漱上好几遍？',
      dad: '恰恰相反，少漱口更护牙！要是刷完立刻拿几大杯水猛漱好几遍，刚留在牙齿表面的氟离子一下子全被冲进下水道了。牙医推荐的做法是：刷够两分钟，把嘴里的牙膏沫彻底吐掉，只抿一小口水轻轻漱一下吐掉就行，让那一点点氟留在牙面上安安静静帮你修一晚上砖。',
    },
    {
      nian: '我懂了！细菌吃糖吐出酸，酸过 pH 5.5 会把牙釉质里的钙磷撬走脱矿；含氟牙膏里的氟离子能把表面换成耐酸到 pH 4.5 的氟磷灰石并加速再矿化；每次只挤豌豆大，吐掉泡沫少漱口！',
      dad: '记得又准又实用！再加一条护牙铁律：晚上睡前刷完牙，除了白开水就别再吃任何甜食或喝牛奶饮料了，因为睡觉时唾液变少，细菌最爱趁夜偷袭！',
    },
  ],
  tip: '儿童使用含氟牙膏须由家长看护防吞咽：3 岁以下每次米粒大小，3～6 岁每次豌豆大小（儿童含氟牙膏氟含量国家标准一般为 0.05%～0.11%，即 500～1100 ppm）。羟基磷灰石临界脱矿 pH 约 5.5、氟磷灰石约 4.5（随唾液钙磷饱和度略有浮动），参考人教版高中化学选择性必修 1 与口腔生物化学文献。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '细菌产酸撬走钙磷',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 610], size: [740, 150], color: ENAMEL, outline: true, text: '牙釉质砖墙', from: 0 },
          { kind: 'sprite', icon: '🍬', path: [[260, 270], [460, 360]], size: 78, travel: 1.4, from: 0.4, to: 3 },
          { kind: 'sprite', icon: '🦠', path: [[560, 360]], size: 84, wobble: true, from: 1 },
          { kind: 'particles', box: [420, 410, 360, 120], count: 8, color: ACID, symbol: 'H⁺', motion: 'gas', size: 22, from: 2.2 },
          { kind: 'atom', path: [[600, 560], [860, 320]], symbol: 'Ca', charge: '2+', color: CALCIUM, r: 36, travel: 2.2, from: 3.6 },
          { kind: 'text', at: [600, 830], text: '酸过pH5.5，钙磷溶出脱矿', size: 'm', from: 6.4 },
        ],
      },
      {
        turn: 1,
        title: '唾液泥瓦匠日常修补',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 600], size: [720, 150], color: ENAMEL, outline: true, text: '牙釉质表面', from: 0 },
          { kind: 'flow', path: [[180, 380], [600, 480], [1020, 380]], color: '#bae6fd', count: 8, speed: 180, size: 13, from: 0.5 },
          { kind: 'atom', path: [[360, 280], [520, 540]], symbol: 'Ca', charge: '2+', color: CALCIUM, r: 36, travel: 2, from: 1.4 },
          { kind: 'label', at: [520, 540], pos: [880, 270], text: '中性时唾液补回钙磷', from: 3.4 },
          { kind: 'text', at: [600, 820], text: '脱矿与再矿化每天都在拉锯', size: 'm', from: 5.8 },
        ],
      },
      {
        turn: 2,
        title: '氟离子换上耐酸新砖',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 620], size: [740, 130], color: ENAMEL, from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 535], size: [740, 50], color: FLUOR_ENAMEL, text: '氟磷灰石护盾', motion: 'grow', over: 2.5, from: 2.4 },
          { kind: 'atom', path: [[300, 250], [540, 520]], symbol: 'F', charge: '−', color: FLUORIDE, r: 38, travel: 1.8, from: 0.6, to: 3.4 },
          { kind: 'atom', path: [[600, 520], [880, 250]], symbol: 'OH', charge: '−', color: '#cbd5e1', r: 36, travel: 1.8, from: 2.2, to: 5 },
          { kind: 'label', at: [600, 510], pos: [900, 380], text: '扛到pH4.5才怕酸', color: '#15803d', from: 4.8 },
          { kind: 'text', at: [600, 830], text: '沉淀转化：换成更难溶的新晶体', size: 's', from: 6.8 },
        ],
      },
      {
        turn: 3,
        title: '豌豆大小，吐掉别咽',
        duration: 11,
        cues: [
          { kind: 'sprite', icon: '🪥', path: [[420, 410]], size: 130, from: 0.3 },
          { kind: 'shape', shape: 'circle', at: [475, 365], size: [42, 42], color: FLUORIDE, from: 1 },
          { kind: 'label', at: [475, 365], pos: [790, 290], text: '每次一颗豌豆大', from: 1.6 },
          { kind: 'text', at: [600, 540], text: '3 岁以下只挤米粒大', size: 's', from: 3 },
          { kind: 'myth', wrong: '含氟牙膏挤得越多、咽下去越补钙', right: '微量才护牙，刷完要把泡沫吐净', from: 5.8 },
        ],
      },
      {
        turn: 4,
        title: '吐净泡沫，轻轻漱口',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'pill', at: [330, 400], size: [280, 105], color: '#fee2e2', text: '几大杯猛漱', from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [870, 400], size: [280, 105], color: '#dcfce7', text: '吐净·抿一口漱', from: 1 },
          { kind: 'text', at: [330, 560], text: '氟离子全冲走了', size: 's', color: '#b03f38', from: 2.2 },
          { kind: 'text', at: [870, 560], text: '留微量氟继续修补', size: 's', color: '#1f6b55', from: 2.8 },
          { kind: 'text', at: [600, 810], text: '刷够两分钟，牙面更结实', size: 'm', from: 5.4 },
        ],
      },
      {
        turn: 5,
        title: '睡前刷牙不吃糖',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'pill', at: [230, 430], size: [230, 96], color: '#fef3c7', text: '早晚含氟刷', from: 0.4 },
          { kind: 'arrow', path: [[360, 430], [460, 430]], color: '#1f6b55', from: 1.2 },
          { kind: 'shape', shape: 'pill', at: [600, 430], size: [230, 96], color: '#bbf7d0', text: '换氟磷灰石', from: 1.8 },
          { kind: 'arrow', path: [[730, 430], [830, 430]], color: '#1f6b55', from: 2.6 },
          { kind: 'shape', shape: 'pill', at: [970, 430], size: [230, 96], color: '#dbeafe', text: '睡前不再吃', from: 3.2 },
          { kind: 'text', at: [600, 790], text: '守住牙釉质，笑出一口好牙', size: 'm', color: '#1f6b55', from: 5.2 },
        ],
      },
    ],
  },
};
