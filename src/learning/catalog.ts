import catalog from '../data/lessons.json';
import { lessonPlan, themes, units, type LessonPlan, type Theme, type ThemeId, type Unit } from './curriculum';

export { themes, units, type Theme, type ThemeId };
export interface Lesson extends LessonPlan {
  kind: 'native' | 'simulation';
  themes: ThemeId[];
  question: string;
  textbook: string[];
  steps: string[];
  file?: string;
  cover?: string;
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
  return {
    ...plan,
    themes: plan.themes ?? [],
    kind: isNative ? 'native' : 'simulation',
    question: plan.question ?? source?.question ?? NATIVE_QUESTIONS[plan.slug] ?? findUnit(plan.unit).question,
    textbook: plan.textbook ?? source?.textbook ?? ['生活中的化学 · 现象观察与微观解释'],
    steps: plan.cards?.map(item => item.tag) ?? source?.steps ?? ['观察模型', '改变条件', '解释现象', '检验理解'],
    file,
    cover,
  };
});

export function lessonAsset(path: string): string {
  return `${import.meta.env.BASE_URL}lessons/tongjiang/${path}`;
}

export function findUnit(id: string): Unit {
  const unit = units.find(item => item.id === id);
  if (!unit) throw new Error(`Unknown unit: ${id}`);
  return unit;
}

export function findTheme(id: string): Theme | undefined {
  return themes.find(item => item.id === id);
}

export function findLesson(slug: string): Lesson | undefined {
  return lessons.find(lesson => lesson.slug === slug);
}

export function unitLessons(unitId: string): Lesson[] {
  return lessons.filter(lesson => lesson.unit === unitId);
}

export function themeLessons(themeId: ThemeId): Lesson[] {
  return lessons.filter(lesson => lesson.themes.includes(themeId));
}

export function randomLesson(excludeSlug?: string): Lesson {
  const pool = excludeSlug && lessons.length > 1 ? lessons.filter(item => item.slug !== excludeSlug) : lessons;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function filterLessons(unitId: string, query: string, themeId = 'all'): Lesson[] {
  const search = query.trim().toLocaleLowerCase();
  return lessons.filter(lesson =>
    (unitId === 'all' || lesson.unit === unitId) &&
    (themeId === 'all' || lesson.themes.includes(themeId as ThemeId)) &&
    `${lesson.title} ${lesson.hook} ${lesson.topic} ${lesson.question} ${lesson.textbook.join(' ')} ${lesson.steps.join(' ')}`
      .toLocaleLowerCase().includes(search),
  );
}

export function nextLesson(completed: string[]): Lesson | undefined {
  return lessons.find(lesson => !completed.includes(lesson.slug));
}
