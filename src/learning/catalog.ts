import catalog from '../data/lessons.json';
import { autoArticle, storyArticle, type Article } from './article';
import { lessonAsset } from './assets';
import { lessonPlan, themes, units, type LessonPlan, type Theme, type ThemeId, type Unit } from './curriculum';
import { getLessonDialogue, type DialogueTurn } from './dialogue';
import { findStory, type Story } from './stories';

export { lessonAsset, themes, units, type Article, type DialogueTurn, type Story, type Theme, type ThemeId, type Unit };
export interface Lesson extends LessonPlan {
  kind: 'native' | 'simulation';
  themes: ThemeId[];
  question: string;
  textbook: string[];
  steps: string[];
  dialogue: DialogueTurn[];
  /** 写成「小念 × 爸爸」问答、配了讲解动画的课 */
  story?: Story;
  /** 文章页真正渲染的内容：有 `story` 用它，没有就由 `dialogue` 自动装配 */
  article: Article;
  file?: string;
  cover?: string;
}

function storyDialogue(story: Story): DialogueTurn[] {
  return story.dialogue.map((turn, i) => ({
    tag: story.film?.scenes.find(scene => scene.turn === i)?.title ?? `第 ${i + 1} 问`,
    ask: turn.nian,
    answer: turn.dad,
    eq: turn.eq,
    stepIndex: turn.show?.kind === 'lab' ? turn.show.step : undefined,
  }));
}

const NATIVE_QUESTIONS: Record<string, string> = {
  'matter-basics': '同样清澈透明的一杯水，怎么从微观粒子一眼分出“纯净物”和“混合物”？',
  'atomic-basics': '118 种元素千差万别，原子内部到底哪一个数字决定了“它是谁”？',
  'chemical-bonds': '原子为什么不愿意单打独斗？“送出电子”和“共用电子”造出的物质有什么不同？',
};

export const lessons: Lesson[] = lessonPlan.map(plan => {
  const source = catalog.find(course => course.slug === plan.slug);
  const file = plan.file ?? source?.file;
  const cover = plan.cover ?? source?.cover;
  const isNative = Boolean(plan.native || plan.cards?.length);
  if (!isNative && !file) throw new Error(`Missing simulation or interactive content: ${plan.slug}`);
  const question = plan.question ?? source?.question ?? NATIVE_QUESTIONS[plan.slug] ?? findUnit(plan.unit).question;
  const story = findStory(plan.slug);
  const dialogue = story ? storyDialogue(story) : getLessonDialogue({ ...plan, question });
  return {
    ...plan,
    themes: plan.themes ?? [],
    kind: isNative ? 'native' : 'simulation',
    question,
    textbook: plan.textbook ?? source?.textbook ?? ['生活中的化学 · 现象观察与微观解释'],
    steps: plan.cards?.map(item => item.tag) ?? source?.steps ?? ['观察模型', '改变条件', '解释现象', '检验理解'],
    dialogue,
    story,
    article: story
      ? storyArticle(story)
      : autoArticle({
        hook: plan.hook, question, takeaway: plan.takeaway, objectives: plan.objectives, simulation: !isNative,
        cover: cover ? lessonAsset(cover) : undefined,
      }, dialogue),
    file,
    cover,
  };
});

export function findUnit(id: string): Unit {
  const unit = units.find(item => item.id === id);
  if (!unit) throw new Error(`Unknown unit: ${id}`);
  return unit;
}

export function findLesson(slug: string): Lesson | undefined {
  return lessons.find(lesson => lesson.slug === slug);
}

export function unitLessons(unitId: string): Lesson[] {
  return lessons.filter(lesson => lesson.unit === unitId);
}

export function labName(lesson: Lesson): string {
  if (lesson.kind === 'simulation') return '3D 实验';
  if (lesson.native === 'periodic') return '元素周期表';
  return lesson.cards?.length ? '互动揭秘卡' : '互动模型';
}

/** 「🧪 3D 实验台」里只放真正有 3D 课件的课；互动卡、周期表这些不算 */
export const labs: Lesson[] = lessons.filter(lesson => lesson.kind === 'simulation');

export function findLab(slug: string): Lesson | undefined {
  return labs.find(lesson => lesson.slug === slug);
}

export function unitLabs(unitId: string): Lesson[] {
  return labs.filter(lesson => lesson.unit === unitId);
}

/** 「小念还想问」：先接着往后问同一主题里的下一题，不够再从相邻主题补。 */
export function relatedLessons(lesson: Lesson, limit = 3): Lesson[] {
  const siblings = unitLessons(lesson.unit);
  const at = siblings.indexOf(lesson);
  const sameUnit = [...siblings.slice(at + 1), ...siblings.slice(0, at)];
  const index = lessons.indexOf(lesson);
  const nearby = [...lessons.slice(index + 1), ...lessons.slice(0, index)].filter(item => item.unit !== lesson.unit);
  return [...sameUnit, ...nearby].slice(0, limit);
}
