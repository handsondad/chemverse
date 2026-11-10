import { unitLessons, type Lesson } from './catalog';
import { isStarted } from './store';

export function levelStars(level: Lesson['level']): string {
  if (level === '入门') return '⭐';
  if (level === '进阶') return '⭐⭐';
  return '⭐⭐⭐';
}

/** 这个主题一共几个问题、小念已经点开看过几个。 */
export function topicCount(unitId: string): { total: number; seen: number } {
  const items = unitLessons(unitId);
  return { total: items.length, seen: items.filter(item => isStarted(item.slug)).length };
}

/** 文章第一段里的第一句，用作预告。 */
export function firstSentence(text: string): string {
  const end = text.search(/[。！？]/);
  return end > 0 ? text.slice(0, end + 1) : text;
}
