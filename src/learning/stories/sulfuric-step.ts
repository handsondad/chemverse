import { lessonAsset } from '../assets';
import type { Story } from './types';

const PYRITE = '#e9d77a';
const SO2 = '#f4e3a1';
const SO3 = '#f4d03f';
const ACID = '#f6e7b0';
const WATER = '#d8efff';
const DUST = '#8a7a6a';
const WASH = '#cfe8f5';
const GREEN = '#1f6b55';

export const sulfuricStep: Story = {
  slug: 'sulfuric-step',
  title: '汽车电池上写着「内有硫酸」，硫酸是怎么从石头里变出来的？',
  trigger: '小念看爸爸给汽车换蓄电池，电池壳上贴着「内有硫酸，小心腐蚀」的黄标签，她凑近看了半天。',
  dialogue: [
    {
      nian: '爸爸，电池上写着「内有硫酸」，硫酸是从哪儿来的？',
      dad: '是工厂用含硫的石头“烧”出来的。常用一种金灿灿的矿石，叫黄铁矿，里面是铁和硫。造硫酸像一场接力赛：先把矿石烧成二氧化硫，再让它多抓一个氧变成三氧化硫，最后让三氧化硫和水结合成硫酸。汽车电池、化肥、洗衣粉都离不开它。',
      eq: '4FeS₂ + 11O₂ =高温= 2Fe₂O₃ + 8SO₂',
      figure: {
        kind: 'table',
        caption: '硫酸 H₂SO₄ 只用到三种元素：氢、氧、硫。圈出的硫和氧在同一列，是一家人。',
        paint: 'category',
        focus: { by: 'atoms', values: [1, 8, 16] },
        ring: [8, 16],
      },
      show: { kind: 'lab', step: 0, label: '看「为什么分五段」' },
    },
    {
      nian: '二氧化硫从炉子里出来，就能直接去抓氧吗？',
      dad: '还不行，得先洗个澡。炉子里出来的气夹着矿尘，还有一些会让催化剂“中毒”的杂质。下一步抓氧要靠一种叫五氧化二钒的催化剂帮忙，它像一位只在干净车间里干活的师傅，灰一堵、杂质一毒，就罢工了。所以要先除尘、洗涤、再干燥，把气洗得干干净净。',
      show: { kind: 'lab', step: 1, label: '看「为什么先净化」' },
    },
    {
      nian: '洗干净的气碰到催化剂，是不是温度越高越好？',
      dad: '不是，温度在这里两头为难。二氧化硫抓氧会放热，温度越低，最后能变成三氧化硫的越多；可太低了催化剂醒不过来，反应慢得像蜗牛。太高呢，跑得快却做不完。工厂只好折中，控制在 400–500 ℃，让气一层层穿过催化剂，层与层之间再给它降降温。',
      eq: '2SO₂ + O₂ ⇌ 2SO₃（催化剂、加热，正反应放热）',
      figure: {
        kind: 'image',
        src: lessonAsset('covers/sulfuric-step.webp'),
        alt: '转化器剖面图：圆筒里叠着四层催化剂颗粒，右边一台换热器用管子和每一层相连',
        caption: '转化器剖开看：气从上往下穿过四层催化剂，右边的换热器在层与层之间给气降温。',
      },
      show: { kind: 'lab', step: 2, label: '看「为什么这个温度」' },
    },
    {
      nian: '三氧化硫做好了，直接倒进水里不就变成硫酸了吗？',
      dad: '偏偏不能直接用水。三氧化硫一碰水就猛烈放热，把水也蒸起来，在空中结成一团团白雾，雾滴又小又轻，很难再收回来。工厂改用浓度 98.3% 的浓硫酸去吸收，三氧化硫钻进去，溶得又快又干净。很多人以为三氧化硫不和水反应，其实恰恰是反应太猛了。',
      eq: 'SO₃ + H₂O = H₂SO₄',
      show: { kind: 'lab', step: 5, label: '看「为什么用浓硫酸」' },
    },
    {
      nian: '浓硫酸这么厉害，那汽车电池里的硫酸会不会也很危险？',
      dad: '电池里装的是稀硫酸，可也会腐蚀皮肤和衣服，里面还有铅。所以电池别拆、别摔，旧电池要交到回收点，不能当普通垃圾扔。万一皮肤沾到酸液，马上用大量清水冲，再告诉大人。',
    },
    {
      nian: '电池能交到回收点，那工厂里没变成三氧化硫的二氧化硫，也能回收吗？',
      dad: '能，而且必须回收。二氧化硫跑到天上，会变成酸雨，腐蚀树叶和石头房子。所以工厂让气穿过两次催化剂、吸收两次，最后剩下的一点尾气再用碱液洗掉，排出去的气就干净多了。连烧剩下的矿渣也不浪费，里面的氧化铁能拿去炼铁。',
      eq: 'SO₂ + 2NaOH = Na₂SO₃ + H₂O',
    },
    {
      nian: '我懂了！黄铁矿烧成二氧化硫，洗干净后在催化剂上再抓一个氧变成三氧化硫，温度要折中；三氧化硫不用水、用浓硫酸吸收才不起雾；剩下的尾气还得洗掉，不然会变成酸雨。',
      dad: '完全正确！记住一个好习惯：看到贴着「腐蚀」「当心」标志的瓶瓶罐罐，不碰、不闻，告诉大人。',
    },
  ],
  tip: '硫酸（无论浓稀）都有强腐蚀性，铅酸蓄电池里还有铅，不要让孩子拆卸或接触电池液；皮肤沾到酸液应立即用大量流水冲洗并就医。稀释浓硫酸时只能把酸缓缓倒入水中并不断搅拌，切不可把水倒进浓硫酸。二氧化硫、三氧化硫都有毒，工业流程只看懂原理即可。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '硫酸接力赛',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [200, 450], size: [200, 100], color: PYRITE, text: '黄铁矿', from: 0.3 },
          { kind: 'arrow', path: [[310, 450], [450, 450]], color: '#c2410c', text: '烧', from: 1.2 },
          { kind: 'shape', shape: 'pill', at: [560, 450], size: [200, 100], color: SO2, text: 'SO₂', from: 2 },
          { kind: 'arrow', path: [[670, 450], [790, 450]], color: '#c2410c', text: '加个氧', from: 3 },
          { kind: 'shape', shape: 'pill', at: [900, 450], size: [200, 100], color: SO3, text: 'SO₃', from: 3.8 },
          { kind: 'arrow', path: [[900, 510], [900, 640]], color: '#c2410c', text: '吸收', from: 4.8 },
          { kind: 'shape', shape: 'pill', at: [900, 710], size: [220, 100], color: ACID, text: 'H₂SO₄', from: 5.6 },
          { kind: 'text', at: [450, 840], text: '三棒接力变硫酸', size: 'm', from: 7.6 },
        ],
      },
      {
        turn: 1,
        title: '先给炉气洗个澡',
        duration: 11,
        cues: [
          { kind: 'flow', path: [[100, 450], [1100, 450]], color: SO2, count: 12, speed: 200, size: 12, from: 0.3 },
          { kind: 'particles', box: [140, 390, 260, 120], count: 10, color: DUST, motion: 'jitter', size: 10, from: 0.5 },
          { kind: 'label', at: [270, 420], pos: [270, 260], text: '矿尘、杂质', from: 0.9 },
          { kind: 'shape', shape: 'rect', at: [520, 450], size: [120, 260], color: WASH, text: '除尘', from: 1.8 },
          { kind: 'shape', shape: 'rect', at: [700, 450], size: [120, 260], color: WASH, text: '洗涤', from: 2.8 },
          { kind: 'shape', shape: 'rect', at: [880, 450], size: [120, 260], color: WASH, text: '干燥', from: 3.8 },
          { kind: 'text', at: [600, 800], text: '洗干净，催化剂才干活', size: 'm', from: 6.6 },
        ],
      },
      {
        turn: 2,
        title: '温度要折中',
        duration: 12,
        cues: [
          { kind: 'formula', at: [600, 210], text: '2SO₂ + O₂ ⇌ 2SO₃', from: 0.3 },
          { kind: 'sprite', icon: '🧊', path: [[240, 420]], size: 100, from: 1 },
          { kind: 'text', at: [240, 560], text: '太冷：慢吞吞', size: 's', from: 1.4 },
          { kind: 'sprite', icon: '🔥', path: [[960, 420]], size: 100, wobble: true, from: 2.6 },
          { kind: 'text', at: [960, 560], text: '太热：做不完', size: 's', from: 3 },
          { kind: 'shape', shape: 'pill', at: [600, 420], size: [240, 110], color: '#7fc8a0', text: '折中', from: 4.8 },
          { kind: 'text', at: [600, 560], text: '400–500 ℃', size: 'm', color: GREEN, from: 5.4 },
          { kind: 'text', at: [600, 820], text: '又要快，又要多', size: 'm', from: 8 },
        ],
      },
      {
        turn: 3,
        title: '不用水，用浓硫酸',
        duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [320, 440], size: [280, 260], liquid: WATER, level: 0.6, label: '水', from: 0 },
          { kind: 'vessel', vessel: 'beaker', at: [880, 440], size: [280, 260], liquid: ACID, level: 0.6, label: '98.3% 浓硫酸', from: 0 },
          { kind: 'flow', path: [[320, 170], [320, 380]], color: SO3, count: 5, speed: 200, size: 12, from: 1.2, to: 4.2 },
          { kind: 'flow', path: [[880, 170], [880, 420]], color: SO3, count: 5, speed: 200, size: 12, from: 1.2 },
          { kind: 'particles', box: [190, 170, 260, 130], count: 14, color: '#ffffff', motion: 'gas', size: 14, amount: { at: 2, over: 2.5, from: 0, to: 14 }, from: 1.8 },
          { kind: 'label', at: [400, 230], pos: [600, 300], text: '酸雾收不回', from: 3.6 },
          { kind: 'myth', wrong: '三氧化硫直接用水吸收', right: '浓硫酸吸收，不起酸雾', from: 7.4 },
        ],
      },
      {
        turn: 4,
        title: '电池里是稀硫酸',
        duration: 11,
        cues: [
          { kind: 'sprite', icon: '🔋', path: [[380, 420]], size: 170, from: 0.3 },
          { kind: 'label', at: [430, 380], pos: [760, 280], text: '稀硫酸 + 铅', from: 1.2 },
          { kind: 'arrow', path: [[520, 480], [760, 520]], color: GREEN, text: '交回收点', from: 3 },
          { kind: 'sprite', icon: '♻️', path: [[860, 530]], size: 100, from: 3.8 },
          { kind: 'text', at: [600, 720], text: '沾到酸：清水冲', size: 's', color: '#c2410c', from: 5.6 },
          { kind: 'text', at: [600, 830], text: '别拆、别摔、交回收', size: 'm', from: 7.6 },
        ],
      },
      {
        turn: 5,
        title: '尾气也要洗干净',
        duration: 12,
        cues: [
          { kind: 'flow', path: [[80, 450], [1120, 450]], color: SO2, count: 12, speed: 220, size: 11, from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [200, 450], size: [140, 200], color: '#e3eef8', text: '一转', from: 0.6 },
          { kind: 'shape', shape: 'rect', at: [400, 450], size: [140, 200], color: ACID, text: '一吸', from: 1.4 },
          { kind: 'shape', shape: 'rect', at: [600, 450], size: [140, 200], color: '#e3eef8', text: '二转', from: 2.2 },
          { kind: 'shape', shape: 'rect', at: [800, 450], size: [140, 200], color: ACID, text: '二吸', from: 3 },
          { kind: 'shape', shape: 'rect', at: [1010, 450], size: [140, 260], color: '#c8e6c9', text: '碱洗', from: 4.2 },
          { kind: 'text', at: [600, 720], text: '不让二氧化硫跑上天', size: 's', from: 5.6 },
          { kind: 'text', at: [600, 830], text: '排出去的气干净多了', size: 'm', from: 7.6 },
        ],
      },
    ],
  },
};
