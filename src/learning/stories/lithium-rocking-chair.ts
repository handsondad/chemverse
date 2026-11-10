import type { Story } from './types';

const GRAPHITE = '#5a5f66';
const OXIDE = '#c9b8e8';
const ELECTROLYTE = '#eef6fb';
const SEPARATOR = '#ffffff';
const LITHIUM = '#9ad1ff';
const LI_METAL = '#cfd6dd';
const ELECTRON = '#ffcf3f';
const HEAT = '#e5484d';
const CHARGE = '#1f6b55';

export const lithiumRockingChair: Story = {
  slug: 'lithium-rocking-chair',
  title: '手机充一次电能用一整天，电池里的锂离子是怎么来回搬家的？',
  trigger: '晚上小念把手机插上充电器，看着电量一格一格往上涨，忍不住想：电到底存在电池的哪儿了？',
  dialogue: [
    {
      nian: '爸爸，充电的时候，电是被灌进电池里存起来的吗？',
      dad: '电本身存不住，电池存的是一种「随时能变回电」的化学状态。手机电池两头各有一个家：一头是石墨，一头是含锂的金属氧化物，中间隔着一层薄膜。充电，就是用电把锂离子从氧化物那头赶到石墨那头住下。这种电池叫锂离子电池。',
      show: { kind: 'lab', step: 0, label: '看「插电蓄能」' },
    },
    {
      nian: '锂离子住进石墨里，是怎么住的？石墨不就是铅笔芯吗？',
      dad: '对，就是铅笔芯里那种石墨。它是一层层叠起来的，像一摞千层饼，层和层之间有缝。充电器把电子沿着导线推到石墨这头，锂离子就跟着穿过电解液和中间的薄膜，钻进千层饼的夹缝里坐好，等着用。这样钻进夹缝住下，叫嵌入。',
      eq: 'LiCoO₂ + C₆ →(充电) Li₁₋ₓCoO₂ + LiₓC₆',
      show: { kind: 'lab', step: 0, label: '看「插电蓄能」' },
    },
    {
      nian: '那用手机的时候，锂离子和电子是一起跑回去吗？',
      dad: '一起出发，却分两条路。锂离子从石墨夹缝里出来，穿过薄膜游回氧化物那头；电子不许走这条路，只能绕到外面的导线，经过芯片和屏幕再回去，一路上给手机干活。锂离子在两头轮流住、来回摇，就像坐摇椅，所以人们叫它摇椅电池。',
      eq: 'LiₓC₆ + Li₁₋ₓCoO₂ →(放电) C₆ + LiCoO₂',
      show: { kind: 'lab', step: 1, label: '看「放电续航」' },
    },
    {
      nian: '为什么电子不许走薄膜那条路？',
      dad: '因为那层薄膜叫隔膜，专门只放锂离子、不放电子。电子要是能从里面抄近路，两头直接通了，能量一下子在电池里变成热，这叫短路，电池会鼓包甚至着火。很多人以为锂电池里装着一块锂金属，其实里面的锂一直是离子，住在石墨和氧化物里。',
      show: { kind: 'lab', step: 2, label: '看「安全护栏」' },
    },
    {
      nian: '要是电池里真的冒出锂金属，会怎么样？',
      dad: '那就危险了。锂金属很活泼，遇到水就会反应。天气很冷时，锂离子钻进石墨变慢，要是硬用大电流快充，挤不进去的锂离子就在石墨表面变回锂金属，长成一根根细刺，叫锂枝晶。它越长越长，会扎穿隔膜引起短路。所以冬天手机和电动车会限制快充，或者先把电池焐热。',
      show: { kind: 'lab', step: 2, label: '看「安全护栏」' },
    },
    {
      nian: '那我平时给手机充电，要注意什么，才不让电池受伤？',
      dad: '用合格的充电器；别在太冷、太热的地方充，比如夏天晒着的车里；充电时别压在枕头底下。手机鼓包、发烫、有怪味，就别再用了。很多人以为每次都要用到没电再充，那是老式电池的习惯，锂离子电池随用随充反而更好。',
    },
    {
      nian: '我懂了！充电时电源把锂离子赶进石墨的夹缝里住下，用电时锂离子穿过隔膜游回去，电子绕外面的导线给手机干活；隔膜只放离子不放电子，锂一直是离子、不变成金属，电池才安全。',
      dad: '说得一点不差！再记一个好习惯：电池鼓包或摔坏了，不要自己拆，也别扔进普通垃圾桶，送到回收点去。',
    },
  ],
  tip: '锂离子电池被刺穿、挤压或过热时可能起火，而且很难用水迅速扑灭；鼓包电池应停止使用并交回收点。请使用合格充电器，不要在床上、枕头下或高温环境里充电。正极材料除钴酸锂外还有磷酸铁锂、三元材料等，文中方程式以钴酸锂为例。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '电池里的两个家',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 480], size: [860, 420], color: ELECTROLYTE, from: 0 },
          { kind: 'shape', shape: 'rect', at: [330, 480], size: [240, 340], color: GRAPHITE, text: '石墨', from: 0.4 },
          { kind: 'shape', shape: 'rect', at: [870, 480], size: [240, 340], color: OXIDE, text: '含锂氧化物', from: 0.8 },
          { kind: 'shape', shape: 'rect', at: [600, 480], size: [18, 400], color: SEPARATOR, outline: true, from: 1.2 },
          { kind: 'label', at: [600, 300], pos: [600, 190], text: '隔膜', from: 1.8 },
          { kind: 'particles', box: [790, 520, 160, 110], count: 6, color: LITHIUM, symbol: 'Li⁺', motion: 'jitter', size: 26, amount: { at: 4, over: 4, from: 6, to: 1 }, from: 2.4 },
          { kind: 'particles', box: [240, 360, 180, 240], count: 5, color: LITHIUM, symbol: 'Li⁺', motion: 'jitter', size: 26, amount: { at: 4.4, over: 4, from: 0, to: 5 }, from: 4 },
          { kind: 'text', at: [600, 850], text: '充电：锂离子搬到石墨', size: 'm', from: 7.6 },
        ],
      },
      {
        turn: 1,
        title: '钻进千层饼',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [500, 300], size: [600, 30], color: GRAPHITE, from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [500, 400], size: [600, 30], color: GRAPHITE, from: 0.4 },
          { kind: 'shape', shape: 'rect', at: [500, 500], size: [600, 30], color: GRAPHITE, from: 0.6 },
          { kind: 'shape', shape: 'rect', at: [500, 600], size: [600, 30], color: GRAPHITE, from: 0.8 },
          { kind: 'atom', path: [[1100, 350], [600, 350]], symbol: 'Li', charge: '+', color: LITHIUM, r: 28, travel: 2.5, from: 2 },
          { kind: 'atom', path: [[1100, 450], [700, 450]], symbol: 'Li', charge: '+', color: LITHIUM, r: 28, travel: 2.5, from: 3.6 },
          { kind: 'label', at: [700, 470], pos: [880, 720], text: '夹缝里坐好', from: 5.8 },
          { kind: 'text', at: [600, 850], text: '钻进夹缝住下，叫嵌入', size: 'm', from: 7.6 },
        ],
      },
      {
        turn: 2,
        title: '分两条路回家',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [330, 540], size: [240, 320], color: GRAPHITE, text: '石墨', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [870, 540], size: [240, 320], color: OXIDE, text: '氧化物', from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [600, 540], size: [18, 380], color: SEPARATOR, outline: true, from: 0.4 },
          { kind: 'sprite', icon: '📱', path: [[600, 230]], size: 90, from: 1 },
          { kind: 'flow', path: [[330, 380], [330, 230], [870, 230], [870, 380]], color: ELECTRON, count: 7, speed: 170, size: 11, from: 1.5 },
          { kind: 'atom', path: [[400, 610], [770, 610]], symbol: 'Li', charge: '+', color: LITHIUM, r: 28, travel: 3, from: 2.6 },
          { kind: 'atom', path: [[400, 680], [770, 680]], symbol: 'Li', charge: '+', color: LITHIUM, r: 28, travel: 3, from: 4.2 },
          { kind: 'text', at: [600, 850], text: '离子走里面，电子走外面', size: 's', from: 7.6 },
        ],
      },
      {
        turn: 3,
        title: '隔膜只放离子',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [330, 400], size: [220, 300], color: GRAPHITE, text: '石墨', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [870, 400], size: [220, 300], color: OXIDE, text: '氧化物', from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [600, 400], size: [18, 340], color: SEPARATOR, outline: true, from: 0.4 },
          { kind: 'atom', path: [[460, 320], [760, 320]], symbol: 'Li', charge: '+', color: LITHIUM, r: 28, travel: 3, from: 1 },
          { kind: 'atom', path: [[460, 470], [580, 470], [500, 480]], symbol: 'e⁻', color: ELECTRON, r: 22, travel: 2.4, from: 2.6 },
          { kind: 'label', at: [580, 470], pos: [600, 610], text: '电子：此路不通', from: 4.2 },
          { kind: 'myth', wrong: '锂电池里装着锂金属', right: '锂一直是离子，住在两头', from: 6.4 },
        ],
      },
      {
        turn: 4,
        title: '天太冷硬快充',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [330, 450], size: [240, 340], color: GRAPHITE, text: '石墨', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [600, 450], size: [18, 380], color: SEPARATOR, outline: true, from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [870, 450], size: [240, 340], color: OXIDE, text: '氧化物', from: 0.4 },
          { kind: 'particles', box: [462, 300, 40, 300], count: 6, color: LI_METAL, motion: 'jitter', size: 14, amount: { at: 2, over: 3, from: 0, to: 6 }, from: 1.5 },
          { kind: 'shape', shape: 'rect', at: [530, 450], size: [140, 14], color: LI_METAL, motion: 'grow', over: 3, from: 5 },
          { kind: 'label', at: [540, 450], pos: [600, 720], text: '锂枝晶', from: 6.4 },
          { kind: 'pulse', at: [600, 450], color: HEAT, radius: 140, from: 8.4 },
          { kind: 'text', at: [600, 850], text: '扎穿隔膜就会短路', size: 'm', from: 9 },
        ],
      },
      {
        turn: 5,
        title: '随用随充',
        duration: 11,
        cues: [
          { kind: 'sprite', icon: '📱', path: [[600, 340]], size: 200, from: 0.2 },
          { kind: 'meter', at: [600, 560], label: '电量', start: 0.3, end: 0.8, color: CHARGE, over: 4, from: 1 },
          { kind: 'text', at: [930, 300], text: '合格充电器', size: 's', from: 2.4 },
          { kind: 'text', at: [270, 300], text: '别太冷太热', size: 's', from: 3.4 },
          { kind: 'myth', wrong: '用到没电再充才好', right: '锂电池随用随充更好', from: 6 },
        ],
      },
    ],
  },
};
