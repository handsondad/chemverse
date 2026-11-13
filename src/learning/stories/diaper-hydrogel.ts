import type { Story } from './types';

const NET = '#60a5fa';
const CROSS = '#f59e0b';
const NA = '#a78bfa';
const WATER = '#bae6fd';
const GEL = '#dbeafe';

export const diaperHydrogel: Story = {
  slug: 'diaper-hydrogel',
  title: '纸尿裤薄薄一片，凭什么能喝下好几杯水还一滴不漏？',
  trigger: '给小表弟换纸尿裤时，小念好奇地拿一片干净纸尿裤做实验：倒进满满两大杯蓝色清水，几秒钟水就不见了，剪开一看全变成了晶莹的果冻粒，使劲攥也不滴水。',
  dialogue: [
    {
      nian: '爸爸，厚毛巾吸了水一拧就哗哗流，纸尿裤这么薄，怎么喝下两大杯水还攥不出水来？',
      dad: '因为毛巾和海绵只是把水暂存在纤维的大缝隙里，一挤就跑；纸尿裤芯层里却藏着几克像细白糖一样的神奇粉末，叫聚丙烯酸钠，是一种高吸水性树脂。它不是靠大孔存水，而是从分子层面把水分子请进肚子、锁成果冻，能吸进比自己重上百倍的纯水！',
      eq: '—[CH₂—CH(COONa)]ₙ—（轻度交联的聚丙烯酸钠）',
      figure: {
        kind: 'table',
        focus: { by: 'atoms', values: [1, 6, 8, 11] },
        ring: [11],
        caption: '高吸水性树脂由碳、氢、氧串成长链，链上挂满第 11 号元素钠（Na）离子来召唤水分子。',
      },
      show: { kind: 'lab', step: 0, label: '看「立体渔网」' },
    },
    {
      nian: '聚丙烯酸钠吃进上百倍的水，为什么没有像白糖和食盐那样直接化进水里变成汤呢？',
      dad: '全靠长链之间暗藏的“小横梁”！如果只是一根根分开的长链，吸足水确实会化开变成黏糊糊的胶水；工程师在造它的时候，故意每隔一段就用化学键把相邻的长链扣在一起，这叫交联。成千上万根长链连成了一张拉不断的立体大渔网，水再多也只能把网眼撑鼓，绝不会散架流走！',
    },
    {
      nian: '立体大渔网是怎么把外面的水分子全都吸进网眼里的？',
      dad: '靠两股力气打配合！第一股叫渗透作用：渔网的链条上挂满带负电的羧酸根，网眼里还困着密密麻麻的钠离子。网里离子太挤、外面纯水太清，外面的水分子就像赶去劝架一样争先恐后往网里钻；第二股是同种负电荷互相排斥，把卷着的渔网一下子撑到最开，腾出巨大的仓库装水！',
      show: { kind: 'lab', step: 1, label: '看「钠离子吸水」' },
    },
    {
      nian: '原来靠网里网外的离子差吸水！那要是我往鼓鼓的果冻上撒一勺食盐，会发生什么？',
      dad: '立刻上演“果冻吐水”大戏！一撒食盐，外面的水里突然多出大把钠离子和氯离子，网里网外的离子浓度差一下子变小了，正电的钠离子还跑去挡住网上的负电排斥。两股撑网的力气一撤，立体渔网“唰”地缩瘪下去，把刚喝进去的水哗哗吐出来！所以纸尿裤吸带盐分的尿液时，吸水量会比吸纯水少一截。',
      figure: {
        kind: 'scale',
        axis: '吸水树脂遇到不同液体的表现',
        stops: [
          { label: '倒进纯水', note: '离子差大·鼓胀百倍', color: '#bae6fd', hot: true },
          { label: '自来水·尿液', note: '含少量盐·吸几十倍', color: '#dbeafe' },
          { label: '撒上食盐', note: '离子差没了·吐水！', color: '#fef3c7' },
        ],
        caption: '外界盐分越低，网内外离子差越大，果冻鼓得越饱满；一撒食盐，凝胶就会失水缩瘪。',
      },
      show: { kind: 'lab', step: 2, label: '看「撒盐吐水」' },
    },
    {
      nian: '这种会吸水变大的小颗粒，是不是和玩具店卖的泡水“海洋宝宝”是一家的？还能干什么正经事？',
      dad: '眼睛真毒，它们都是高吸水性水凝胶！在干旱地区种树种庄稼，人们会往树根泥土里拌一点保水剂：下雨时它大口把雨水存成果冻，天旱时再一点点放给树根喝。不过很多人不知道，“海洋宝宝”干着只有绿豆大，万一被小宝宝误吞进肚子吸了消化液，会胀得像乒乓球一样堵住肠道，非常危险！',
    },
    {
      nian: '我懂了！纸尿裤里的聚丙烯酸钠用交联横梁扣成立体渔网，靠网里的钠离子渗透吸水和负电排斥把网撑大锁水；撒盐会让它把水吐出来，而且绝不能误吞或倒进下水道！',
      dad: '总结得太全面了！在家做完纸尿裤吸水小实验，记住最后一步好习惯：鼓出来的吸水凝胶要装进垃圾袋扔进干垃圾桶，千万别冲进洗手池或马桶，不然它在水管里接着吸水膨胀，能把整根下水管堵得严严实实！',
    },
  ],
  tip: '实验拆出的纸尿裤吸水树脂粉末勿扬尘吸入或揉眼，吸胀后的水凝胶切勿倒入水槽或马桶（极易膨胀堵塞管道，应作为生活垃圾丢弃）。市售膨胀珠玩具（“海洋宝宝”/水精灵）属于同类交联水凝胶，严防婴幼儿误吞引发肠梗阻！原理参考人教版高中化学选择性必修 3《功能高分子材料》及美国化学会（ACS）高分子教育实验。',
  film: {
    scenes: [
      {
        turn: 0,
        title: '几克粉末锁住整杯水',
        duration: 10,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [340, 500], size: [260, 300], liquid: WATER, level: 0.78, rise: { to: 0.05, at: 1.4, over: 2.5 }, label: '倒进纯水', from: 0 },
          { kind: 'shape', shape: 'rect', at: [340, 560], size: [230, 150], color: GEL, text: '透明水凝胶', motion: 'grow', over: 2.5, from: 2 },
          { kind: 'count', at: [860, 420], label: '吸纯水可达', start: 1, end: 200, unit: '倍重', over: 3, from: 1.6 },
          { kind: 'text', at: [600, 830], text: '聚丙烯酸钠：只胀大，不漏水', size: 'm', from: 6 },
        ],
      },
      {
        turn: 1,
        title: '交联横梁扣成渔网',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'pill', at: [600, 340], size: [660, 30], color: NET, from: 0.2 },
          { kind: 'shape', shape: 'pill', at: [600, 480], size: [660, 30], color: NET, from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [600, 620], size: [660, 30], color: NET, from: 0.6 },
          { kind: 'bond', a: [400, 340], b: [400, 620], color: CROSS, from: 1.4 },
          { kind: 'bond', a: [600, 340], b: [600, 620], color: CROSS, from: 1.6 },
          { kind: 'bond', a: [800, 340], b: [800, 620], color: CROSS, from: 1.8 },
          { kind: 'label', at: [800, 480], pos: [980, 240], text: '交联扣拉住不散架', color: '#c2410c', from: 3 },
          { kind: 'text', at: [600, 830], text: '立体渔网：能撑鼓却不会溶化', size: 'm', from: 6.2 },
        ],
      },
      {
        turn: 2,
        title: '钠离子召唤水分子',
        duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 480], size: [520, 340], color: '#eff6ff', outline: true, motion: 'grow', over: 4, from: 0.3 },
          { kind: 'particles', box: [420, 360, 360, 240], count: 7, color: NA, symbol: 'Na⁺', motion: 'jitter', size: 26, from: 0.8 },
          { kind: 'flow', path: [[140, 480], [360, 480]], color: '#38bdf8', count: 6, speed: 200, size: 13, from: 1.6 },
          { kind: 'flow', path: [[1060, 480], [840, 480]], color: '#38bdf8', count: 6, speed: 200, size: 13, from: 1.8 },
          { kind: 'label', at: [600, 320], pos: [600, 210], text: '网内离子浓，水争着往里钻', from: 3.4 },
          { kind: 'text', at: [600, 830], text: '渗透吸水加负电排斥撑开网', size: 'm', from: 6.8 },
        ],
      },
      {
        turn: 3,
        title: '撒一勺盐立刻吐水',
        duration: 11,
        cues: [
          { kind: 'shape', shape: 'circle', at: [440, 460], size: [340, 260], color: GEL, outline: true, text: '饱满果冻', motion: 'shrink', over: 3.5, from: 0.3 },
          { kind: 'sprite', icon: '🧂', path: [[440, 220], [440, 310]], size: 78, travel: 1.2, from: 0.8, to: 3 },
          { kind: 'flow', path: [[560, 500], [880, 560]], color: '#60a5fa', count: 8, speed: 210, size: 13, from: 2.4 },
          { kind: 'label', at: [840, 550], pos: [880, 340], text: '内外离子差变小，网缩瘪', from: 3.4 },
          { kind: 'text', at: [600, 830], text: '一撒食盐，锁住的水就吐出来', size: 'm', from: 6.4 },
        ],
      },
      {
        turn: 4,
        title: '荒漠保水，严防误吞',
        duration: 11,
        cues: [
          { kind: 'sprite', icon: '🌱', path: [[340, 390]], size: 115, from: 0.4 },
          { kind: 'text', at: [340, 535], text: '树根保水抗旱', size: 's', color: '#1f6b55', from: 1.4 },
          { kind: 'sprite', icon: '🚫', path: [[860, 390]], size: 110, from: 1 },
          { kind: 'text', at: [860, 535], text: '海洋宝宝别误吞', size: 's', color: '#b03f38', from: 2 },
          { kind: 'myth', wrong: '做完实验的吸水凝胶冲进马桶就行', right: '进水管会继续膨胀堵管，要装袋丢弃', from: 5.8 },
        ],
      },
      {
        turn: 5,
        title: '功能高分子的巧思',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'pill', at: [230, 430], size: [230, 96], color: '#dbeafe', text: '交联渔网', from: 0.4 },
          { kind: 'arrow', path: [[360, 430], [460, 430]], color: '#2563eb', from: 1.2 },
          { kind: 'shape', shape: 'pill', at: [600, 430], size: [230, 96], color: '#ede9fe', text: '钠离子吸水', from: 1.8 },
          { kind: 'arrow', path: [[730, 430], [830, 430]], color: '#2563eb', from: 2.6 },
          { kind: 'shape', shape: 'pill', at: [970, 430], size: [230, 96], color: '#dcfce7', text: '锁水不漏', from: 3.2 },
          { kind: 'text', at: [600, 790], text: '装袋扔干垃圾 · 不进下水道', size: 's', color: '#1f6b55', from: 5.2 },
        ],
      },
    ],
  },
};
