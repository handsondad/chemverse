import { lessonAsset } from '../assets';
import type { Story } from './types';

const IRON = '#9aa3ab';
const RUST = '#b5562b';
const PACK = '#f3ead8';
const WARM = '#ffb36b';
const HEAT = '#e0762b';
const CARBON = '#4a4a4a';
const SALTWATER = '#d8efff';
const ACID = '#eef4fb';
const SEA = '#cfe8f7';
const ZINC = '#c9d3dc';
const TIN = '#e6e9ee';
const ELECTRON = '#ffcf3f';
const OXYGEN = '#ffc2bc';

export const corrosionStep: Story = {
  slug: 'corrosion-step',
  title: '暖宝宝一撕开就发热，铁栏杆却慢慢生锈：它们真的是同一件事吗？',
  trigger: '冬天小念撕开一片暖宝宝贴在衣服上，不一会儿就热乎乎的，包装上写着成分：铁粉、活性炭、食盐、水……',
  dialogue: [
    {
      nian: '暖宝宝里装的是铁粉？铁怎么会自己发热呢？',
      dad: '暖宝宝发热，靠的就是铁生锈。铁和空气里的氧气、水慢慢结合，会放出热量；栏杆生锈时也在放热，只是太慢了，热一出来就散掉，摸不出来。暖宝宝把铁磨成细粉，再配上几个帮手，让生锈快上许多倍，热就攒起来了。',
      eq: '2Fe + O₂ + 2H₂O = 2Fe(OH)₂',
      show: { kind: 'lab', step: 0, label: '看「台面四站」' },
    },
    {
      nian: '那几个帮手是活性炭和食盐吗？它们又不会生锈，帮什么忙？',
      dad: '它们自己不锈，却让铁锈得飞快。铁粉和炭粉挨在一起、泡在盐水里，就搭成了无数个小小的电池：铁丢出电子变成铁离子，电子跑到炭粉上，交给氧气和水。盐水像一条通畅的马路，让离子跑得更快。靠这种微型电池加快的生锈，叫电化学腐蚀。',
      eq: 'Fe − 2e⁻ = Fe²⁺ · O₂ + 2H₂O + 4e⁻ = 4OH⁻',
      show: { kind: 'lab', step: 2, label: '看「碳粉的角色」' },
    },
    {
      nian: '电子要交给氧气，那把暖宝宝塞进不透气的袋子里，还会热吗？',
      dad: '不会热。没有氧气，炭粉上的电子没人接，小电池就停工了。所以暖宝宝出厂时封在不透气的外袋里，撕开才开始发热。把铁钉、炭粉和盐水封进试管，连一根导管插进水里，管里的氧气被一点点用掉，水就顺着导管往上爬。',
      show: { kind: 'lab', step: 1, label: '看「液柱为什么升」' },
      figure: {
        kind: 'image',
        src: lessonAsset('covers/corrosion-step.webp'),
        alt: '铁架台夹着一支塞住的试管，管里有几根铁钉，一根导管从试管口弯下来伸进旁边的水杯',
        caption: '试管口塞紧，里面放着铁钉，导管伸进水杯：管里的氧气被铁钉用掉，水就沿导管往上爬。',
      },
    },
    {
      nian: '铁钉一定要有氧气才会生锈吗？要是泡在酸里呢？',
      dad: '泡在酸里也会坏，只是换了个接电子的。酸里有很多氢离子，电子交给它们，就会冒出氢气。很多人以为铁不沾水就不会锈，其实空气里的水汽会在铁表面凝成一层看不见的水膜，溶进一点盐和灰尘，小电池照样搭起来，所以海边的铁锈得特别快。',
      eq: 'Fe + 2H⁺ = Fe²⁺ + H₂↑',
      show: { kind: 'lab', step: 3, label: '看「换成酸性」' },
    },
    {
      nian: '海边的铁锈得那么快，大轮船整天泡在海水里，怎么护住它？',
      dad: '给它找个替身。船底钉上几块锌，锌比铁更爱丢电子，小电池里就由锌来丢电子、一点点被吃掉，钢板反而成了接电子的一方，安然无恙；锌块变薄了就换新的。这叫牺牲阳极保护。家里更简单：铁器擦干、刷漆、涂油，把水和氧气挡在外面。',
      eq: 'Zn − 2e⁻ = Zn²⁺',
      show: { kind: 'lab', step: 7, label: '看「让锌替它锈」' },
    },
    {
      nian: '刷漆能挡住水和氧气，那为什么有的铁皮镀一层锌，刮破了也不怎么锈？',
      dad: '镀锌铁皮就是把替身穿在身上。漆一刮破，铁露出来就开始锈；锌层刮破了，露出的铁和旁边的锌照样搭成小电池，还是锌先丢电子，铁依然被护着。反过来，镀锡的罐头盒一旦划破，铁比锡更爱丢电子，反而锈得更快。',
    },
    {
      nian: '我懂了！铁和炭粉在盐水里搭成小电池，铁丢电子、氧气接电子，铁就生锈还放热；暖宝宝把这件事加快了来取暖，防锈就挡住水和氧气，或者请更爱丢电子的锌来当替身。',
      dad: '说得真完整！记一个好习惯：铁锅、菜刀洗完马上擦干，别让它们带着水过夜；暖宝宝贴在衣服上，别直接贴皮肤。',
    },
  ],
  tip: '暖宝宝不要直接贴在皮肤上，也不要在睡觉时或与电热毯同时使用，以免低温烫伤；婴幼儿和感觉不灵敏的人慎用。用过的暖宝宝主要是铁锈等物质，按生活垃圾丢弃即可。稀盐酸、稀硫酸有腐蚀性，析氢腐蚀实验请在老师指导下进行。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '铁生锈也放热',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [330, 450], size: [120, 360], color: IRON, text: '栏杆', tint: { color: RUST, at: 1, over: 9 }, from: 0.2 },
          { kind: 'text', at: [330, 220], text: '慢：热马上散掉', size: 's', from: 1 },
          { kind: 'shape', shape: 'rect', at: [870, 450], size: [300, 220], color: PACK, text: '暖宝宝', tint: { color: WARM, at: 3, over: 3 }, from: 0.4 },
          { kind: 'text', at: [870, 220], text: '快：热攒起来', size: 's', from: 1.6 },
          { kind: 'pulse', at: [870, 450], color: HEAT, radius: 220, from: 3.6 },
          { kind: 'meter', at: [330, 720], label: '温度', start: 0.15, end: 0.18, color: HEAT, over: 4, from: 3 },
          { kind: 'meter', at: [870, 720], label: '温度', start: 0.15, end: 0.85, color: HEAT, over: 4, from: 3 },
          { kind: 'text', at: [600, 850], text: '一个慢慢锈，一个快快锈', size: 'm', from: 7.6 },
        ],
      },
      {
        turn: 1,
        title: '无数个小电池',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 560], size: [900, 220], color: SALTWATER, from: 0 },
          { kind: 'atom', path: [[380, 530]], symbol: 'Fe', color: IRON, r: 80, from: 0.4 },
          { kind: 'atom', path: [[820, 530]], symbol: 'C', color: CARBON, r: 70, from: 0.9 },
          { kind: 'flow', path: [[465, 510], [745, 510]], color: ELECTRON, count: 5, speed: 160, size: 11, from: 2 },
          { kind: 'atom', path: [[400, 620], [300, 640]], symbol: 'Fe', charge: '2+', color: IRON, r: 30, travel: 2, from: 3 },
          { kind: 'particles', box: [700, 220, 260, 140], count: 4, color: OXYGEN, symbol: 'O₂', motion: 'gas', size: 30, from: 4 },
          { kind: 'particles', box: [740, 610, 200, 50], count: 3, color: '#ffd6bf', symbol: 'OH⁻', motion: 'jitter', size: 24, from: 6.4 },
          { kind: 'text', at: [600, 850], text: '铁丢电子，氧气接电子', size: 'm', from: 8 },
        ],
      },
      {
        turn: 2,
        title: '没氧气就停工',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [330, 470], size: [380, 320], color: '#f6f8fa', outline: true, from: 0 },
          { kind: 'shape', shape: 'rect', at: [330, 470], size: [240, 160], color: PACK, text: '暖宝宝', from: 0.3 },
          { kind: 'text', at: [330, 250], text: '封在袋里', size: 's', from: 0.8 },
          { kind: 'shape', shape: 'rect', at: [870, 470], size: [240, 160], color: PACK, text: '暖宝宝', tint: { color: WARM, at: 3, over: 3 }, from: 0.5 },
          { kind: 'particles', box: [720, 240, 300, 110], count: 5, color: OXYGEN, symbol: 'O₂', motion: 'gas', size: 28, from: 1.5 },
          { kind: 'meter', at: [330, 720], label: '温度', start: 0.15, end: 0.15, color: HEAT, from: 3 },
          { kind: 'meter', at: [870, 720], label: '温度', start: 0.15, end: 0.85, color: HEAT, over: 4, from: 3 },
          { kind: 'text', at: [600, 850], text: '没有氧气，电子没人接', size: 'm', from: 7.4 },
        ],
      },
      {
        turn: 3,
        title: '酸里冒氢气',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [600, 400], size: [520, 340], liquid: ACID, level: 0.75, label: '稀盐酸', from: 0 },
          { kind: 'shape', shape: 'rect', at: [520, 420], size: [50, 260], color: IRON, text: 'Fe', from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [690, 440], size: [60, 200], color: CARBON, text: 'C', from: 0.6 },
          { kind: 'particles', box: [660, 360, 60, 190], count: 7, color: '#ffffff', motion: 'rise', size: 12, from: 2 },
          { kind: 'label', at: [700, 380], pos: [960, 260], text: '氢气', from: 3.6 },
          { kind: 'myth', wrong: '铁不沾水就不会生锈', right: '看不见的水膜也能让它锈', from: 6.4 },
        ],
      },
      {
        turn: 4,
        title: '请锌当替身',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 600], size: [1000, 360], color: SEA, from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 360], size: [800, 120], color: IRON, text: '船底钢板', from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [600, 462], size: [200, 84], color: ZINC, text: '锌块', motion: 'shrink', over: 10, from: 1 },
          { kind: 'flow', path: [[620, 440], [700, 380], [950, 380]], color: ELECTRON, count: 4, speed: 120, size: 11, from: 2.5 },
          { kind: 'atom', path: [[580, 510], [500, 660]], symbol: 'Zn', charge: '2+', color: ZINC, r: 28, travel: 2.5, from: 3.5 },
          { kind: 'atom', path: [[640, 510], [740, 680]], symbol: 'Zn', charge: '2+', color: ZINC, r: 28, travel: 2.5, from: 5.5 },
          { kind: 'label', at: [850, 340], pos: [960, 210], text: '钢板被护住', from: 6.4 },
          { kind: 'text', at: [600, 850], text: '锌先丢电子，铁就安全', size: 'm', from: 8 },
        ],
      },
      {
        turn: 5,
        title: '镀锌和镀锡',
        duration: 12,
        cues: [
          { kind: 'text', at: [330, 260], text: '镀锌刮破', size: 's', from: 0.2 },
          { kind: 'text', at: [870, 260], text: '镀锡刮破', size: 's', from: 0.4 },
          { kind: 'shape', shape: 'rect', at: [330, 520], size: [360, 110], color: IRON, text: '铁', from: 0.6 },
          { kind: 'shape', shape: 'rect', at: [330, 440], size: [360, 50], color: ZINC, text: '锌', tint: { color: '#8d969e', at: 3, over: 5 }, from: 0.8 },
          { kind: 'shape', shape: 'rect', at: [870, 520], size: [360, 110], color: IRON, text: '铁', tint: { color: RUST, at: 4, over: 5 }, from: 0.6 },
          { kind: 'shape', shape: 'rect', at: [870, 440], size: [360, 50], color: TIN, text: '锡', from: 0.8 },
          { kind: 'sprite', icon: '✅', path: [[330, 680]], size: 80, from: 6 },
          { kind: 'text', at: [600, 850], text: '谁更爱丢电子，谁先坏', size: 'm', from: 8 },
        ],
      },
    ],
  },
};
