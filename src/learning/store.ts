import type { Lesson } from './catalog';
import { emptyProgress, readProgress, writeProgress, type Progress } from './progress';

interface StoreHooks {
  onError(error: unknown): void;
  onChange(): void;
}

let progress: Progress = emptyProgress();
let storageAvailable = true;
let hooks: StoreHooks = { onError: () => {}, onChange: () => {} };

function fail(error: unknown): void {
  storageAvailable = false;
  hooks.onError(error);
}

export function initProgressStore(nextHooks: StoreHooks): void {
  hooks = nextHooks;
  try { progress = readProgress(); } catch (error) { fail(error); }
}

/** Re-reads the record written by another tab; returns false when storage is unusable. */
export function reloadProgress(): boolean {
  if (!storageAvailable) return false;
  try {
    progress = readProgress();
    return true;
  } catch (error) {
    fail(error);
    return false;
  }
}

function persist(): void {
  if (storageAvailable) {
    try { writeProgress(progress); } catch (error) { fail(error); }
  }
  hooks.onChange();
}

export function getProgress(): Readonly<Progress> {
  return progress;
}

export function isStarted(slug: string): boolean {
  return progress.started.includes(slug);
}

export function isCompleted(slug: string): boolean {
  return progress.completed.includes(slug);
}

function markStarted(lesson: Lesson): void {
  if (!isStarted(lesson.slug)) progress.started.push(lesson.slug);
  progress.lastLesson = lesson.slug;
}

export function startLesson(lesson: Lesson): void {
  markStarted(lesson);
  persist();
}

export function recordAnswer(lesson: Lesson, answer: number): void {
  markStarted(lesson);
  progress.answers[lesson.slug] = answer;
  persist();
}

export function clearAnswer(lesson: Lesson): void {
  delete progress.answers[lesson.slug];
  persist();
}

export function toggleCompleted(lesson: Lesson): void {
  markStarted(lesson);
  progress.completed = isCompleted(lesson.slug)
    ? progress.completed.filter(slug => slug !== lesson.slug)
    : [...progress.completed, lesson.slug];
  persist();
}
