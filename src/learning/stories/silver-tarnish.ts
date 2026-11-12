import type { Story } from './types';

const SILVER = '#e9ecef';
const TARNISH = '#3b3b3b';
const SULFUR = '#f4d03f';
const ELECTRON = '#4dabf7';

export const silverTarnish: Story = {
  slug: 'silver-tarnish',
  title: '银镯子放久了为什么会变黑？一张锡纸怎么让它变回亮闪闪？',
  trigger: '奶奶从抽屉里翻出小念满月时的银镯子，原本亮闪闪的，现在却黑乎乎的。',
  dialogue: [
    {
      nian: '爸爸，银镯子为什么会变黑？是生锈了吗？',
      dad: '有点像生锈，可抓住银的不是氧气，是硫。空气里飘着极少量的硫化氢，就是臭鸡蛋味的那种气体，它和银表面的银原子结合，长出一层薄薄的硫化银。硫化银是黑色的，越积越厚，镯子就从亮白变黄、变褐，最后发黑。',
      eq: '4Ag + 2H₂S + O₂ = 2Ag₂S + 2H₂O',
      figure: {
        kind: 'table',
        caption: '银在第 5 周期、第 11 族，硫在第 16 族（都圈出来了）。银不怕氧气，偏偏和硫很合得来。',
        paint: 'category',
        focus: { by: 'atoms', values: [16, 47] },
        ring: [16, 47],
      },
      show: { kind: 'lab', step: 0, label: '看硫怎么抓住银' },
    },
    {
      nian: '硫化氢那么少，为什么镯子放在抽屉里也会变黑？',
      dad: '硫化氢虽然少，可它一点点地来，银一点点地攒，几年下来就是一层黑。家里带硫的东西还不少：煮鸡蛋的蛋黄、洋葱、蛋黄酱、橡皮筋、羊毛衣服，都会悄悄放出含硫的气体。抽屉不透气，要是旁边还放着橡皮筋，镯子黑得更快。',
      show: { kind: 'lab', step: 1, label: '看家里的硫从哪来' },
    },
    {
      nian: '蛋黄也会让银变黑？那电视里的银针验毒，是不是也是被硫弄黑的？',
      dad: '你猜对了！古代的砒霜做得不纯，里面混着硫，银针碰到就变黑，所以人们以为银针能验毒。其实纯的砒霜根本不让银变黑，很多毒药也不含硫；反过来，一个煮鸡蛋的蛋黄就能把银针染黑，可鸡蛋没毒。所以银针验毒很不靠谱，真要查毒得靠化验。',
      show: { kind: 'lab', step: 1, label: '看银针验毒靠不靠谱' },
    },
    {
      nian: '镯子已经变黑了，还能变回来吗？用牙膏使劲刷行不行？',
      dad: '牙膏能刷亮，可它靠的是磨，把黑的那层连同一点银一起磨掉，刷多了镯子会变薄、花纹会变浅。有个更聪明的办法：盆底铺一张厨房里的“锡纸”，它其实是铝箔，倒进热水，加一勺小苏打和一点盐，把镯子放进去贴着铝箔。几分钟后黑色慢慢褪去，硫化银变回了银，一点银都没少。',
      eq: '3Ag₂S + 2Al + 6H₂O = 6Ag + 2Al(OH)₃ + 3H₂S↑',
      show: { kind: 'lab', step: 2, label: '看铝箔热水澡' },
    },
    {
      nian: '铝箔为什么能把硫化银变回银？它们俩之间发生了什么？',
      dad: '它们搭成了一个小电池。铝比银更舍得交出电子，铝原子把电子交出去，电子顺着镯子和铝箔贴着的地方跑到硫化银那里，银拿回电子，又变回亮闪闪的银原子，硫就跑进了水里。盐和小苏打让水能导电，热水让反应更快。所以镯子一定要贴着铝箔，不贴就不灵。',
      figure: {
        kind: 'table',
        caption: '按电负性上色：圈出的铝（13）比银（47）电负性小，更舍得把电子交出去。',
        paint: 'en',
        ring: [13, 47],
        link: { mode: 'en', label: '在周期表里切到「电负性」' },
      },
      show: { kind: 'lab', step: 3, label: '看电子从铝跑到银' },
    },
    {
      nian: '我懂了！银镯子变黑不是被氧气锈的，是空气和鸡蛋、橡皮筋里的硫找上了银，长出黑色的硫化银。用铝箔、热水和小苏打，铝把电子送给银，黑色就变回银了，比用牙膏磨更省银子！',
      dad: '说得对！平时保护银饰也简单：不戴的时候擦干净装进密封袋，别和橡皮筋、鸡蛋放一块儿；常戴常擦，反而不容易黑。洗澡、泡温泉前摘下来，温泉水里的硫更多。',
    },
  ],
  tip: '用铝箔法清洗银饰要用热水，注意别烫伤；反应会放出一点臭鸡蛋味的硫化氢，开窗通风即可。镶宝石、粘了胶或特意做旧发黑的银器不要泡；镀银制品银层很薄，别用牙膏反复刷。方程式写法依照高中化学教材。文中事实参考了《化学教育杂志》的“Silver to Black—and Back”、马萨诸塞大学和加州大学戴维斯分校的演示实验说明，以及美国化学会芝加哥分会的科普文章。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '硫抓住了银',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 430], size: [380, 380], color: SILVER, outline: true, text: '银镯子', tint: { color: TARNISH, at: 5, over: 3 }, from: 0 },
          { kind: 'particles', box: [130, 220, 240, 420], count: 5, color: SULFUR, symbol: 'H₂S', size: 24, motion: 'gas', from: 1 },
          { kind: 'atom', path: [[220, 300], [440, 380]], symbol: 'S', color: SULFUR, r: 34, travel: 2, from: 2 },
          { kind: 'atom', path: [[1000, 540], [760, 480]], symbol: 'S', color: SULFUR, r: 34, travel: 2, from: 2.6 },
          { kind: 'label', at: [700, 330], pos: [960, 220], text: '黑色的硫化银', from: 6 },
          { kind: 'formula', at: [600, 790], text: '4Ag + 2H₂S + O₂ = 2Ag₂S + 2H₂O', from: 6.6 },
        ],
      },
      {
        turn: 1,
        title: '家里的硫从哪来',
        duration: 11,
        cues: [
          { kind: 'sprite', icon: '🥚', path: [[220, 300]], size: 100, from: 0.3 },
          { kind: 'sprite', icon: '🧅', path: [[220, 580]], size: 100, from: 0.8 },
          { kind: 'sprite', icon: '🧶', path: [[480, 300]], size: 100, from: 1.3 },
          { kind: 'shape', shape: 'pill', at: [480, 580], size: [200, 70], color: '#ffe3e3', text: '橡皮筋', from: 1.8 },
          { kind: 'shape', shape: 'circle', at: [960, 440], size: [220, 220], color: SILVER, outline: true, text: '镯子', tint: { color: '#495057', at: 4, over: 4 }, from: 0 },
          { kind: 'flow', path: [[580, 440], [840, 440]], color: SULFUR, count: 5, size: 12, speed: 120, from: 2.6 },
          { kind: 'text', at: [600, 800], text: '一点点攒成一层黑', size: 'm', from: 6 },
        ],
      },
      {
        turn: 2,
        title: '银针验毒靠不住',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [380, 370], size: [26, 330], color: '#dee2e6', tint: { color: TARNISH, at: 2.6, over: 2 }, from: 0 },
          { kind: 'sprite', icon: '🥚', path: [[380, 600]], size: 110, from: 0.8 },
          { kind: 'label', at: [390, 300], pos: [180, 220], text: '蛋黄的硫', from: 2.4 },
          { kind: 'shape', shape: 'rect', at: [820, 370], size: [26, 330], color: '#dee2e6', from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [820, 600], size: [200, 70], color: '#f8f9fa', outline: true, text: '纯砒霜', from: 3.4 },
          { kind: 'myth', wrong: '银针变黑就是有毒', right: '变黑只说明有硫', from: 6.4 },
        ],
      },
      {
        turn: 3,
        title: '牙膏是磨掉一层',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 490], size: [560, 120], color: '#ced4da', text: '银', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 415], size: [560, 30], color: TARNISH, from: 0, to: 4 },
          { kind: 'sprite', icon: '🪥', path: [[320, 330], [880, 330], [320, 330]], size: 100, travel: 3, from: 0.8, to: 4.4 },
          { kind: 'meter', at: [600, 690], label: '银的厚度', start: 0.9, end: 0.7, color: '#adb5bd', over: 2.5, from: 1.5 },
          { kind: 'text', at: [600, 820], text: '黑的没了，银也少了', size: 'm', from: 5 },
        ],
      },
      {
        turn: 3,
        title: '铝箔热水澡',
        duration: 13,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [600, 520], size: [700, 320], liquid: '#e7f5ff', level: 0.7, label: '热水 + 小苏打 + 盐', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 655], size: [600, 18], color: '#adb5bd', from: 0.5 },
          { kind: 'shape', shape: 'pill', at: [600, 615], size: [280, 60], color: '#495057', text: '镯子', tint: { color: '#f1f3f5', at: 4, over: 4 }, from: 1.5 },
          { kind: 'label', at: [820, 655], pos: [1000, 760], text: '铝箔（锡纸）', from: 2 },
          { kind: 'particles', box: [400, 430, 400, 150], count: 6, color: '#ffffff', size: 10, motion: 'rise', from: 3 },
          { kind: 'count', at: [960, 240], label: '泡了', start: 0, end: 5, unit: '分钟', over: 4, from: 3.5 },
          { kind: 'text', at: [500, 830], text: '黑色慢慢褪去', size: 'm', from: 8.5 },
        ],
      },
      {
        turn: 4,
        title: '铝把电子送给银',
        duration: 13,
        cues: [
          { kind: 'atom', path: [[300, 450]], symbol: 'Al', color: '#ced4da', r: 60, from: 0, to: 7 },
          { kind: 'atom', path: [[900, 450]], symbol: 'Ag', charge: '+', color: '#dee2e6', r: 60, from: 0.4, to: 6 },
          { kind: 'flow', path: [[360, 450], [840, 450]], color: ELECTRON, count: 6, size: 12, speed: 200, from: 2, to: 7.5 },
          { kind: 'label', at: [600, 450], pos: [600, 280], text: '电子从铝跑到银', from: 2.4 },
          { kind: 'atom', path: [[900, 450]], symbol: 'Ag', color: '#f8f9fa', r: 60, from: 6 },
          { kind: 'pulse', at: [900, 450], color: '#ffe066', radius: 150, from: 6.2 },
          { kind: 'atom', path: [[300, 450]], symbol: 'Al', charge: '3+', color: '#ced4da', r: 60, from: 7 },
          { kind: 'text', at: [600, 800], text: '搭成了一个小电池', size: 'm', from: 8.5 },
        ],
      },
    ],
  },
};
