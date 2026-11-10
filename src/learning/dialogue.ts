import rawCourseDialogues from '../data/course-dialogues.json';
import type { InteractiveStep, LessonPlan } from './curriculum';

export interface RawCourseStep {
  tag: string;
  q: string;
  eq: string;
  expect: string;
  concl: string;
  wrong: string;
}

export interface DialogueTurn {
  tag: string;
  ask: string;
  /** One-line headline shown before the answer. */
  lead?: string;
  answer: string;
  eq?: string;
  phenomenon?: string;
  wrong?: string;
  steps?: { icon: string; label: string }[];
  stepIndex?: number;
}

const courseDialogues = rawCourseDialogues as Record<string, RawCourseStep[]>;

const NATIVE_DIALOGUES: Record<string, DialogueTurn[]> = {
  'matter-basics': [
    {
      tag: '生活现场',
      ask: '看着都清澈透明，难道透明的液体就一定是纯净物吗？',
      answer: '肉眼看着清澈透明，可不代表里面只有一种物质！矿泉水除了水分子（H₂O），还溶解着钾、钠、钙、镁等矿物质离子，所以它是“混合物”；而蒸馏水或纯水里只有 H₂O 一种分子，才叫“纯净物”。想分清它们，得戴上化学家的“粒子放大镜”。',
      steps: [
        { icon: '🥤', label: '先看有几种分子' },
        { icon: '🔬', label: '只有 1 种 = 纯净物' },
        { icon: '🫧', label: '2 种以上 = 混合物' },
        { icon: '⚛️', label: '再看分子里有几种原子' },
      ],
    },
    {
      tag: '氧气单质',
      ask: '那如果我把放大镜对准一瓶纯氧气（O₂），里面全是一模一样的双原子小球，它算什么？',
      answer: '因为瓶子里只有 O₂ 这一种分子，所以它首先是“纯净物”；再看每个 O₂ 分子内部，是由 2 个同种的氧原子手拉手组成的，只含一种元素，所以它属于纯净物里的“单质”。',
      eq: 'O₂（1 种分子 · 1 种氧元素 → 纯净物 · 单质）',
      phenomenon: '在互动模型中点击「O₂ 氧气」，观察窗里全是成对的红色氧原子。',
      stepIndex: 0,
    },
    {
      tag: '纯水化合物',
      ask: '纯水（H₂O）里既有氢原子又有氧原子，含两种元素，为什么它不是混合物而是纯净物呢？',
      answer: '这是最容易踩坑的地方！判断纯不纯，看的是“分子有没有混杂”，而不是原子种类。纯水里虽然有氢、氧两种原子，但它们按 2:1 牢牢绑成了同一种水分子（H₂O），没有别的分子掺杂，所以它是纯净物中的“化合物”。',
      eq: 'H₂O（1 种水分子 · H、O 两种元素 → 纯净物 · 化合物）',
      phenomenon: '在模型里点击「H₂O 纯水」，每个粒子都是 1 个红氧带着 2 个白氢。',
      wrong: '把“含两种元素”误当成“混合物”——只有当水里还飘着氧气分子或矿物质离子时，才叫混合物。',
      stepIndex: 1,
    },
    {
      tag: '空气混合物',
      ask: '那我们每时每刻呼吸的洁净空气呢？它也是透明的呀！',
      answer: '如果把空气放大几亿倍，你会看到里面约 78% 是氮气分子（N₂）、21% 是氧气分子（O₂），还有氩气、二氧化碳和水蒸气各自独立飞舞。几种不同的分子混在一个屋檐下，各自保持原来的脾气，这就是典型的“混合物”。',
      eq: '空气 ≈ 78% N₂ + 21% O₂ + 0.9% Ar + 0.04% CO₂（混合物）',
      phenomenon: '在模型里点击「N₂ + O₂ 空气」，可以看到蓝色氮分子与红色氧分子混杂在一起。',
      stepIndex: 2,
    },
    {
      tag: '豁然开朗',
      ask: '我彻底懂了！分清物质就两步：先数“有几种分子”分出纯净物和混合物；如果是纯净物，再数“分子里有几种元素”分出单质和化合物！',
      answer: '一点没错！抓住了“分子种类”和“元素种类”这两个标尺，不管是厨房里的酱油食醋，还是实验室里的试剂，你都能一眼看穿它的底细。',
    },
  ],
  'atomic-basics': [
    {
      tag: '生活现场',
      ask: '宇宙里这 118 种元素，到底是谁给它们发的“身份证”？',
      answer: '答案藏在原子最中心的“原子核”里。每个原子就像一座微型太阳系：中心是带正电的原子核（里面有质子和中子），外围是一层层高速运转的带负电电子。原子核里“质子的个数”，就是这个元素的唯一身份证号（原子序数）！',
      steps: [
        { icon: '🎯', label: '核内质子数 = 原子序数' },
        { icon: '🪪', label: '质子数决定它是哪一种元素' },
        { icon: '⚡', label: '中性原子：电子数 = 质子数' },
        { icon: '🧅', label: '核外电子按层排布（2·8…）' },
      ],
    },
    {
      tag: '碳与生命',
      ask: '如果原子核里有 6 个质子，它就是第 6 号元素吗？外面的电子怎么排？',
      answer: '对！有 6 个质子就一定是 6 号元素“碳（C）”——从铅笔芯、钻石到我们身体里的蛋白质和 DNA，全都以它为骨架。在电中性的碳原子里，核外也有 6 个电子：第一层最多住 2 个，剩下的 4 个住在第二层（排布为 2·4）。',
      eq: '⁶C 碳原子：质子数 Z = 6 ｜ 核外电子排布 = 2 · 4',
      phenomenon: '在模型里选择「6 · 碳 C」，内圈有 2 颗电子，外圈有 4 颗电子。',
      stepIndex: 1,
    },
    {
      tag: '钠与氯对比',
      ask: '那如果质子数增加到 11 个或者 17 个，电子层会一直往外加吗？',
      answer: '会的！第二层住满 8 个电子后，新来的电子就得开辟第三层。比如 11 号钠原子（Na）排成 2·8·1，最外层孤零零只有 1 个电子，特别想送出去；而 17 号氯原子（Cl）排成 2·8·7，最外层只差 1 个就满 8 个，特别想抢一个过来。',
      eq: '¹¹Na（2·8·1，易失 1e⁻） vs ¹⁷Cl（2·8·7，易得 1e⁻）',
      phenomenon: '在模型的下拉框里切换「11 · 钠 Na」和「17 · 氯 Cl」，对比它们最外层电子数的差别。',
      stepIndex: 3,
    },
    {
      tag: '离子与身份',
      ask: '等等，如果钠原子把最外层那 1 个电子送人了，只剩 10 个电子（跟 10 号氖一样多），它会不会就变成氖元素了？',
      answer: '绝对不会！得失电子只发生在原子核外围，就像人换了一件外套；只要原子核里面的 11 个质子一个没少，它的身份证号就还是 11 号，依然属于钠元素——只是从金属钠原子（Na）变成了带正电的钠离子（Na⁺），也就是食盐和生理盐水里的那个钠。',
      wrong: '误以为“电子数变了，元素种类就变了”——化学反应从不改变原子核内的质子数。',
    },
    {
      tag: '豁然开朗',
      ask: '我明白了！质子数是元素的“终身身份证”，决定它是谁；而最外层有几个电子，决定了它爱怎么跟别的原子打交道！',
      answer: '总结得太到位了！元素周期表正是按照质子数从 1 到 118 排队的，同一竖列（族）的元素最外层电子数相同，所以脾气也像一家人。',
    },
  ],
  'chemical-bonds': [
    {
      tag: '生活现场',
      ask: '一个遇水就炸、一个刺鼻有毒，两个“暴脾气”凭什么一结合就变温顺了？',
      answer: '因为决定物质化学脾气的，是原子最外层的电子！当钠原子遇上氯原子，双方完成了一次干脆利落的“电子交接”，各自都变成了最外层满 8 个电子的稳定状态，原本狂暴的本性也就彻底消失了。',
      steps: [
        { icon: '🔥', label: 'Na 最外层 1e⁻（极易失去）' },
        { icon: '🧪', label: 'Cl 最外层 7e⁻（极易夺取）' },
        { icon: '⚡', label: '电子转移 → Na⁺ 与 Cl⁻ 静电相吸' },
        { icon: '🤝', label: '非金属之间：共用电子对成共价键' },
      ],
    },
    {
      tag: '电子转移与离子键',
      ask: '这个“电子交接”具体是怎么发生的？交接完之后它们靠什么连在一起？',
      answer: '钠（2·8·1）把最外层那 1 个电子直接送给氯（2·8·7）。交接后，钠少了 1 个负电荷变成带正电的钠离子（Na⁺），氯多了 1 个负电荷变成带负电的氯离子（Cl⁻）。一正一负就像磁铁的两极一样靠静电紧紧吸在一起，这种作用力就叫“离子键”。',
      eq: 'Na (2·8·1) + Cl (2·8·7) → Na⁺ (2·8) + Cl⁻ (2·8·8) → NaCl 离子晶体',
      phenomenon: '在模型里点击「NaCl 电子转移」并把滑块拉到 100%，看电子如何从钠飞向氯。',
      wrong: '误以为食盐里是一个个独立的“NaCl 双原子分子”——其实在食盐晶体里，每个 Na⁺ 周围都上下左右前后围着 6 个 Cl⁻，排成整齐的立体晶格。',
      stepIndex: 0,
    },
    {
      tag: '电子共用与共价键',
      ask: '如果两个一模一样的非金属原子碰面，比如两个氢原子（H），谁也不肯把电子白送给对方，那怎么办？',
      answer: '谁都抢不过谁的时候，它们就选择“合租”！每个氢原子各拿出自己的 1 个电子放在中间，两人共同拥有这对电子（共用电子对）。这样每个氢原子身边都算有 2 个电子，达到了稳定状态，这种靠共用电子对结成的纽带就叫“共价键”。',
      eq: 'H· + ·H → H : H（H₂ 共价分子）',
      phenomenon: '在模型里切换到「H₂ 电子共用」并拖动滑块，看两个电子云如何重叠共用一对电子。',
      stepIndex: 1,
    },
    {
      tag: '豁然开朗',
      ask: '原来原子结合就两种套路：实力悬殊的金属和非金属直接“一给一拿”结成离子键；势均力敌的非金属原子就“合伙共用”结成共价键！',
      answer: '完全正确！水（H₂O）、二氧化碳（CO₂）、天然气（CH₄）全都是靠共价键拼出来的分子；而食盐（NaCl）、纯碱（Na₂CO₃）则是靠离子键搭起来的晶体。',
    },
  ],
};

/** Courseware copy cites the textbook for teachers (「（教材原话）」「教材 p.35：」); readers of an article don't need it. */
function readable(text: string): string {
  return text
    .replace(/（[^（）]*教材[^（）]*）/g, '')
    .replace(/（p\.\s*\d+）/g, '')
    .replace(/教材(?:脚注)?(?:原话|\s*p\.\s*\d+)\s*[：:]\s*/g, '')
    .replace(/^教材(只)?给了/, '实验台上$1摆了')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// The opening hook and the closing takeaway are rendered by the article itself, so dialogues only hold the inquiry in between.
function buildFromCards(cards: InteractiveStep[]): DialogueTurn[] {
  return cards.map((card, index) => ({
    tag: card.tag,
    ask: `「${card.tag}」的时候，到底发生了什么？`,
    lead: card.title,
    answer: card.micro,
    eq: card.formula,
    phenomenon: card.phenomenon,
    stepIndex: index,
  }));
}

function buildFromCourse(lesson: LessonPlan, steps: RawCourseStep[]): DialogueTurn[] {
  return steps.map((step, index) => ({
    tag: step.tag,
    ask: step.q === lesson.question ? '先别急着找答案——这张实验台上都摆了些什么？' : readable(step.q),
    answer: readable(step.concl),
    eq: step.eq || undefined,
    phenomenon: readable(step.expect) || undefined,
    wrong: readable(step.wrong) || undefined,
    stepIndex: index,
  }));
}

export function getLessonDialogue(lesson: LessonPlan): DialogueTurn[] {
  if (NATIVE_DIALOGUES[lesson.slug]) return NATIVE_DIALOGUES[lesson.slug];
  if (lesson.cards?.length) return buildFromCards(lesson.cards);
  const courseSteps = courseDialogues[lesson.slug];
  if (courseSteps?.length) return buildFromCourse(lesson, courseSteps);
  return [{ tag: '追问', ask: lesson.question ?? lesson.title, answer: lesson.takeaway }];
}
