import { findLesson } from './catalog';

export const PROGRESS_KEY = 'chemverse.learning.v1';
export interface Progress {
  started: string[];
  completed: string[];
  lastLesson: string | null;
  answers: Record<string, number>;
}

export function emptyProgress(): Progress {
  return { started: [], completed: [], lastLesson: null, answers: {} };
}

function isSlugList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string') &&
    new Set(value).size === value.length;
}

// Records that mention lessons removed from the curriculum stay readable: those slugs are dropped.
function knownSlugs(slugs: string[]): string[] {
  return slugs.filter(slug => !!findLesson(slug));
}

export function readProgress(): Progress {
  const stored = localStorage.getItem(PROGRESS_KEY);
  if (!stored) return emptyProgress();
  const data: unknown = JSON.parse(stored);
  if (!data || typeof data !== 'object' || !('started' in data) || !('completed' in data) ||
      !('lastLesson' in data) || !isSlugList(data.started) || !isSlugList(data.completed) ||
      !(data.lastLesson === null || typeof data.lastLesson === 'string')) {
    throw new Error('Invalid learning progress data');
  }
  const { started, completed, lastLesson } = data;
  if (!completed.every(slug => started.includes(slug))) throw new Error('Completed lesson must have been started');
  const answers: Record<string, number> = {};
  if ('answers' in data) {
    if (!data.answers || typeof data.answers !== 'object' || Array.isArray(data.answers)) throw new Error('Invalid check answers');
    for (const [slug, answer] of Object.entries(data.answers)) {
      if (typeof answer !== 'number' || !Number.isInteger(answer) || answer < 0) throw new Error('Invalid check answer');
      const lesson = findLesson(slug);
      if (!lesson) continue;
      if (answer >= lesson.check.choices.length) throw new Error('Invalid check answer');
      answers[slug] = answer;
    }
  }
  return {
    started: knownSlugs(started),
    completed: knownSlugs(completed),
    lastLesson: lastLesson !== null && findLesson(lastLesson) ? lastLesson : null,
    answers,
  };
}

export function writeProgress(progress: Progress): void {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}
