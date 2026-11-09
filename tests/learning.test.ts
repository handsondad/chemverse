import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { filterLessons, lessonAsset, lessons, nextLesson, themes, units } from '../src/learning/catalog';
import { emptyProgress, PROGRESS_KEY, readProgress, writeProgress } from '../src/learning/progress';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(resolve(root, 'index.html'), 'utf8');

describe('chemistry lesson collection', () => {
  it('ships all chemistry lessons, covers and original licensing locally without hardcoding chapter counts', () => {
    expect(lessons.length).toBeGreaterThanOrEqual(28);
    expect(new Set(lessons.map(lesson => lesson.slug)).size).toBe(lessons.length);
    for (const unit of units) {
      expect(lessons.some(lesson => lesson.unit === unit.id)).toBe(true);
    }
    for (const theme of themes) {
      expect(lessons.some(lesson => lesson.themes.includes(theme.id))).toBe(true);
    }
    const simulations = lessons.filter(lesson => lesson.kind === 'simulation');
    expect(simulations.length).toBeGreaterThanOrEqual(25);
    expect(lessons.filter(lesson => lesson.kind === 'native').length).toBeGreaterThanOrEqual(3);
    for (const lesson of simulations) {
      expect(existsSync(resolve(root, 'public', 'lessons', 'tongjiang', lesson.file!))).toBe(true);
      expect(existsSync(resolve(root, 'public', 'lessons', 'tongjiang', lesson.cover!))).toBe(true);
      expect(lesson.steps.length).toBeGreaterThan(0);
      const source = readFileSync(resolve(root, 'public', 'lessons', 'tongjiang', lesson.file!), 'utf8');
      expect(source).toContain('<canvas');
      expect(source).toContain('<script type="module">');
      expect(source).toContain('<link rel="stylesheet" href="../../../theme/lesson.css">');
      expect(source).toContain('<script defer src="../../../theme/lesson-adapter.js"></script>');
      expect(existsSync(resolve(root, 'public', 'theme', 'lesson.css'))).toBe(true);
      expect(existsSync(resolve(root, 'public', 'theme', 'lesson-adapter.js'))).toBe(true);
    }
    expect(readFileSync(resolve(root, 'public', 'lessons', 'tongjiang', 'LICENSE'), 'utf8')).toContain('CC BY-NC 4.0');
    expect(existsSync(resolve(root, 'public', 'lessons', 'tongjiang', 'THIRD_PARTY_NOTICES.md'))).toBe(true);
    const directory = readFileSync(resolve(root, 'public', 'lessons', 'tongjiang', 'courses', 'index.html'), 'utf8');
    for (const lesson of simulations) expect(directory).toContain(`href="${lesson.slug}.html"`);
    expect(lessonAsset(simulations[0].file!)).toContain('lessons/tongjiang/courses/');
  });

  it('has a complete, ordered prerequisite graph and an actionable check for every lesson', () => {
    for (const [index, lesson] of lessons.entries()) {
      expect(units.some(unit => unit.id === lesson.unit)).toBe(true);
      expect(lesson.hook.length).toBeGreaterThan(15);
      expect(lesson.objectives.length).toBeGreaterThan(0);
      expect(lesson.check.choices).toHaveLength(3);
      expect(lesson.check.answer).toBeGreaterThanOrEqual(0);
      expect(lesson.check.answer).toBeLessThan(3);
      expect(lesson.check.explanation.length).toBeGreaterThan(15);
      for (const prerequisite of lesson.prerequisites) {
        const prerequisiteIndex = lessons.findIndex(item => item.slug === prerequisite);
        expect(prerequisiteIndex).toBeGreaterThanOrEqual(0);
        expect(prerequisiteIndex).toBeLessThan(index);
      }
    }
    expect(nextLesson([])?.slug).toBe('matter-basics');
    expect(nextLesson(['matter-basics'])?.slug).toBe('atomic-basics');
    expect(nextLesson(lessons.map(lesson => lesson.slug))).toBeUndefined();
  });

  it('shares design tokens across workbench, elements and isolated lessons', () => {
    const theme = readFileSync(resolve(root, 'public', 'theme', 'lesson.css'), 'utf8');
    const tokens = readFileSync(resolve(root, 'public', 'theme', 'tokens.css'), 'utf8');
    const elementTheme = readFileSync(resolve(root, 'src', 'learning', 'element-theme.css'), 'utf8');
    expect(theme).toContain("@import './tokens.css'");
    expect(tokens).toContain('--cv-accent: #1f6b55');
    expect(tokens).toContain('color-scheme: light');
    expect(theme).toContain('--ink: var(--cv-text) !important');
    expect(elementTheme).toContain('--accent-cyan: var(--cv-accent)');
    expect(theme).not.toMatch(/filter:\s*(invert|hue-rotate)/);
    expect(elementTheme).not.toContain('--valence-color:');
  });

  it('searches questions, steps, textbook chapters and life themes', () => {
    expect(filterLessons('structure', '').length).toBeGreaterThanOrEqual(2);
    expect(filterLessons('all', '半滴').map(lesson => lesson.slug)).toEqual(['titration-step']);
    expect(filterLessons('industry', '合成氨').map(lesson => lesson.slug)).toEqual(['haber-step']);
    expect(filterLessons('all', '必修第一册').length).toBeGreaterThan(1);
    expect(filterLessons('all', '', 'kitchen').length).toBeGreaterThan(3);
    expect(filterLessons('all', '不存在的知识点')).toHaveLength(0);
  });
});

describe('learning progress', () => {
  beforeEach(() => localStorage.clear());

  it('persists only the supported opened/completed lesson record', () => {
    expect(readProgress()).toEqual(emptyProgress());
    const progress = { started: ['rate-step'], completed: ['rate-step'], lastLesson: 'rate-step', answers: { 'rate-step': 1 } };
    writeProgress(progress);
    expect(readProgress()).toEqual(progress);
  });

  it('migrates existing opened/completed records without losing them', () => {
    const legacy = { started: ['rate-step'], completed: [], lastLesson: 'rate-step' };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(legacy));
    expect(readProgress()).toEqual({ ...legacy, answers: {} });
  });

  it('drops lessons that are no longer in the curriculum instead of discarding the whole record', () => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({
      started: ['retired-lesson', 'rate-step'],
      completed: ['retired-lesson', 'rate-step'],
      lastLesson: 'retired-lesson',
      answers: { 'retired-lesson': 5, 'rate-step': 1 },
    }));
    expect(readProgress()).toEqual({ started: ['rate-step'], completed: ['rate-step'], lastLesson: null, answers: { 'rate-step': 1 } });
  });

  it.each([
    '{',
    '{"started":[],"completed":["rate-step"],"lastLesson":null}',
    '{"started":[1],"completed":[],"lastLesson":null}',
    '{"started":[],"completed":[],"lastLesson":1}',
    '{"started":["rate-step","rate-step"],"completed":[],"lastLesson":null}',
    '{"started":[],"completed":[],"lastLesson":null,"answers":{"unknown":-1}}',
    '{"started":[],"completed":[],"lastLesson":null,"answers":{"rate-step":3}}',
    '{"started":[],"completed":[],"lastLesson":null,"answers":{"rate-step":0.5}}',
  ])('reports malformed records instead of treating them as successful restores', stored => {
    localStorage.setItem(PROGRESS_KEY, stored);
    expect(() => readProgress()).toThrow();
  });
});

describe('learning workspace', () => {
  let listeners: { type: string; listener: EventListenerOrEventListenerObject }[] = [];
  beforeEach(async () => {
    vi.useFakeTimers();
    vi.resetModules();
    listeners = [];
    localStorage.clear();
    window.history.replaceState(null, '', '/#home');
    const parsed = new DOMParser().parseFromString(html, 'text/html');
    document.documentElement.lang = parsed.documentElement.lang;
    document.head.innerHTML = parsed.head.innerHTML;
    document.body.innerHTML = parsed.body.innerHTML;
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn(() => ({ matches: false })),
    });
  });

  afterEach(() => {
    for (const { type, listener } of listeners) window.removeEventListener(type, listener);
    vi.clearAllTimers();
    vi.useRealTimers();
    document.body.style.overflow = '';
  });

  async function start(): Promise<void> {
    // Keep each initialization in a separate window event lifecycle in jsdom.
    const add = window.addEventListener.bind(window);
    vi.spyOn(window, 'addEventListener').mockImplementation((type, listener, options) => {
      if (listener && ['hashchange', 'storage', 'message'].includes(type)) listeners.push({ type, listener });
      add(type, listener, options);
    });
    await import('../src/main');
    vi.runAllTimers();
  }

  function navigate(hash: string): void {
    window.history.replaceState(null, '', `/${hash}`);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }

  it('starts on a real learning dashboard without eagerly mounting any lessons', async () => {
    await start();
    expect(document.querySelector('h1')?.textContent).toContain('化学世界');
    expect(document.querySelectorAll('.unit-card')).toHaveLength(7);
    expect(document.querySelector('.hero-actions a')?.getAttribute('href')).toBe('#lesson/matter-basics');
    expect(document.querySelector('iframe')).toBeNull();
    expect(document.querySelector('.learning-footer')?.textContent).not.toMatch(/铜匠实验室|CC BY-NC|仅限非商业使用/);
    expect(document.querySelector('.github-silent-link')).toBeNull();
    expect(document.getElementById('periodic-host')?.hidden).toBe(true);
    expect(document.querySelectorAll('.element')).toHaveLength(0);
    navigate('#elements');
    await vi.dynamicImportSettled();
    expect(document.querySelectorAll('.element')).toHaveLength(120);
    expect(document.getElementById('periodic-host')?.hidden).toBe(false);
    expect(document.querySelector('#elements-view a[href*="github.com"]')).toBeNull();
    document.getElementById('lang-en')?.click();
    expect(document.title).toContain('ChemVerse');
    expect(document.documentElement.lang).toBe('zh-CN');
    expect(document.getElementById('elements-view')?.lang).toBe('en');
  });

  it('filters courses and displays an actionable empty state', async () => {
    await start();
    navigate('#courses');
    expect(document.querySelectorAll('.lesson-card')).toHaveLength(lessons.length);
    const input = document.getElementById('course-search') as HTMLInputElement;
    input.value = '半滴';
    input.dispatchEvent(new Event('input'));
    expect(document.querySelectorAll('.lesson-card')).toHaveLength(1);
    expect(document.querySelector('.lesson-card')?.getAttribute('href')).toBe('#lesson/titration-step');
    input.value = '不存在的课件';
    input.dispatchEvent(new Event('input'));
    expect(document.querySelector('.empty-state')).not.toBeNull();
    document.getElementById('clear-filters')?.click();
    expect(document.querySelectorAll('.lesson-card')).toHaveLength(lessons.length);
    document.querySelector<HTMLButtonElement>('[data-theme="kitchen"]')?.click();
    expect(document.querySelectorAll('.lesson-card').length).toBeGreaterThan(3);
  });

  it('opens isolated local lessons, records explicit completion and unloads the frame on exit', async () => {
    await start();
    navigate('#lesson/rate-step');
    expect(document.querySelector('iframe')).toBeNull();
    expect(document.getElementById('understand-panel')?.hidden).toBe(false);
    document.getElementById('begin-explore')?.click();
    const frame = document.querySelector('iframe')!;
    expect(frame.getAttribute('src')).toContain('lessons/tongjiang/courses/rate-step.html');
    expect(frame.getAttribute('sandbox')).toBe('allow-scripts');
    expect(frame.title).toContain('反应速率');
    expect(document.querySelectorAll('.lesson-tabs [role="tab"]')).toHaveLength(3);
    expect(readProgress().started).toEqual(['rate-step']);
    expect(readProgress().completed).toEqual([]);
    document.getElementById('complete-lesson')?.click();
    expect(readProgress().completed).toEqual(['rate-step']);
    expect(document.getElementById('complete-lesson')?.getAttribute('aria-pressed')).toBe('true');
    document.getElementById('reload-lesson')?.click();
    expect(document.querySelector('iframe')).not.toBe(frame);
    expect(readProgress().completed).toEqual(['rate-step']);
    navigate('#home');
    expect(document.querySelector('iframe')).toBeNull();
    expect(document.getElementById('sidebar-progress-count')?.textContent).toContain('已点亮 1 个现象');
    expect(document.querySelector('.hero-actions a')?.getAttribute('href')).toBe('#lesson/matter-basics');
    navigate('#lesson/rate-step');
    document.getElementById('complete-lesson')?.click();
    expect(readProgress().completed).toEqual([]);
  });

  it('supports direct lesson links and unknown-route recovery', async () => {
    window.history.replaceState(null, '', '/#lesson/titration-step');
    await start();
    document.getElementById('begin-explore')?.click();
    expect(document.querySelector('iframe')?.title).toContain('滴定');
    navigate('#lesson/unknown');
    expect(document.querySelector('iframe')).toBeNull();
    expect(document.getElementById('learning-breadcrumb')?.textContent).toBe('页面未找到');
    expect(document.querySelector('.empty-state a')?.getAttribute('href')).toBe('#courses');
  });

  it('only accepts directory navigation from the currently mounted lesson frame', async () => {
    await start();
    navigate('#lesson/rate-step');
    document.getElementById('begin-explore')?.click();
    const frame = document.querySelector('iframe')!;
    const data = { type: 'chemverse:open-lesson', slug: 'titration-step' };
    window.dispatchEvent(new MessageEvent('message', { data, source: window }));
    expect(location.hash).toBe('#lesson/rate-step');
    window.dispatchEvent(new MessageEvent('message', { data: { ...data, slug: 'unknown' }, source: frame.contentWindow }));
    expect(location.hash).toBe('#lesson/rate-step');
    window.dispatchEvent(new MessageEvent('message', { data, source: frame.contentWindow }));
    expect(location.hash).toBe('#lesson/titration-step');
  });

  it('starts simulation lessons in the guided watch mode and keeps the lab bench one switch away', async () => {
    await start();
    navigate('#lesson/rate-step');
    document.getElementById('begin-explore')?.click();
    const frame = document.querySelector('iframe')!;
    expect(frame.getAttribute('src')).toMatch(/rate-step\.html\?cv-mode=watch$/);
    const [watch, lab] = document.querySelectorAll<HTMLButtonElement>('.mode-switch button');
    expect(watch.getAttribute('aria-pressed')).toBe('true');
    const post = vi.spyOn(frame.contentWindow!, 'postMessage');
    lab.click();
    expect(post).toHaveBeenCalledWith({ type: 'chemverse:set-mode', mode: 'lab' }, '*');
    expect(lab.getAttribute('aria-pressed')).toBe('true');
    window.dispatchEvent(new MessageEvent('message', { data: { type: 'chemverse:mode', mode: 'watch' }, source: window }));
    expect(lab.getAttribute('aria-pressed')).toBe('true');
    window.dispatchEvent(new MessageEvent('message', { data: { type: 'chemverse:mode', mode: 'watch' }, source: frame.contentWindow }));
    expect(watch.getAttribute('aria-pressed')).toBe('true');
    window.dispatchEvent(new MessageEvent('message', { data: { type: 'chemverse:ready' }, source: frame.contentWindow }));
    expect(document.getElementById('player-status')?.textContent).toContain('说明卡');

    window.dispatchEvent(new MessageEvent('message', { data: { type: 'chemverse:narration', on: true }, source: frame.contentWindow }));
    document.getElementById('reload-lesson')?.click();
    const reloaded = document.querySelector('iframe')!;
    expect(reloaded.getAttribute('src')).toMatch(/\?cv-mode=watch&cv-narration=1$/);
    window.dispatchEvent(new MessageEvent('message', { data: { type: 'chemverse:go-check' }, source: reloaded.contentWindow }));
    expect(document.getElementById('check-panel')?.hidden).toBe(false);
    expect(document.activeElement?.id).toBe('check-tab');

    navigate('#lesson/sodium-step');
    document.getElementById('begin-explore')?.click();
    expect(document.querySelectorAll('.mode-switch button')).toHaveLength(2);
    expect(document.querySelector('iframe')!.getAttribute('src')).toMatch(/sodium-step\.html\?cv-mode=watch&cv-narration=1$/);
  });

  it('keeps records consistent if another tab clears progress during a lesson', async () => {
    await start();
    navigate('#lesson/rate-step');
    localStorage.clear();
    window.dispatchEvent(new StorageEvent('storage'));
    document.getElementById('complete-lesson')?.click();
    expect(readProgress()).toEqual({ started: ['rate-step'], completed: ['rate-step'], lastLesson: 'rate-step', answers: {} });
  });

  it('surfaces storage failure and never claims the record was persisted', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    localStorage.setItem(PROGRESS_KEY, '{bad');
    await start();
    expect(document.getElementById('storage-notice')?.hidden).toBe(false);
    expect(error).toHaveBeenCalled();
    navigate('#lesson/rate-step');
    document.getElementById('complete-lesson')?.click();
    expect(localStorage.getItem(PROGRESS_KEY)).toBe('{bad');
    navigate('#home');
    expect(document.getElementById('sidebar-progress-count')?.textContent).toContain('已点亮 1 个现象');
  });

  it('groups the complete learning path into real chapters, life themes and suggested prerequisites', async () => {
    await start();
    navigate('#path');
    expect(document.querySelectorAll('.roadmap-unit')).toHaveLength(units.length);
    expect(document.querySelectorAll('.path-lessons a')).toHaveLength(lessons.length);
    document.querySelector<HTMLButtonElement>('[data-path-view="themes"]')?.click();
    expect(document.querySelectorAll('.roadmap-unit')).toHaveLength(themes.length);
    document.querySelector<HTMLButtonElement>('[data-path-view="chapters"]')?.click();
    navigate('#unit/solutions');
    expect(document.querySelectorAll('.chapter-lesson').length).toBeGreaterThanOrEqual(3);
    navigate('#lesson/chemical-bonds');
    expect(document.querySelector('.before-card a')?.getAttribute('href')).toBe('#lesson/atomic-basics');
    expect(document.querySelector('iframe')).toBeNull();
  });

  it('uses native models and independently persists conceptual answers and completion', async () => {
    await start();
    navigate('#lesson/matter-basics');
    document.getElementById('begin-explore')?.click();
    expect(document.querySelector('iframe')).toBeNull();
    expect(document.querySelector('#particle-model')).not.toBeNull();
    document.querySelector<HTMLButtonElement>('[data-sample="1"]')!.click();
    expect(document.getElementById('sample-explanation')?.textContent).toContain('化合物');
    document.getElementById('go-check')?.click();
    const wrong = document.querySelector<HTMLInputElement>('input[name="answer"][value="0"]')!;
    wrong.checked = true;
    document.getElementById('check-form')!.dispatchEvent(new Event('submit', { cancelable: true }));
    expect(document.querySelector('.is-incorrect')).not.toBeNull();
    expect(readProgress().answers['matter-basics']).toBe(0);
    expect(readProgress().completed).toEqual([]);
    document.getElementById('retry-check')!.click();
    expect(readProgress().answers['matter-basics']).toBeUndefined();
    document.querySelector<HTMLInputElement>('input[name="answer"][value="1"]')!.checked = true;
    document.getElementById('check-form')!.dispatchEvent(new Event('submit', { cancelable: true }));
    expect(document.querySelector('.is-correct')).not.toBeNull();
    expect(readProgress().completed).toEqual([]);
    document.getElementById('complete-lesson')!.click();
    expect(readProgress().completed).toEqual(['matter-basics']);
    navigate('#lesson/matter-basics');
    expect(document.querySelector('.is-correct')).not.toBeNull();
    navigate('#progress');
    expect(document.querySelectorAll('.progress-summary strong')[2].textContent).toContain('1');
    navigate('#lesson/self-heating-pot');
    document.getElementById('begin-explore')?.click();
    expect(document.querySelector('#card-stage')).not.toBeNull();
    document.querySelector<HTMLButtonElement>('[data-card-step="1"]')?.click();
    expect(document.getElementById('card-stage')?.textContent).toContain('铝粉');
  });

  it('supports arrow-key learning tabs without losing the mounted experiment', async () => {
    await start();
    navigate('#lesson/rate-step');
    document.getElementById('understand-tab')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    const frame = document.querySelector('iframe')!;
    expect(document.activeElement?.id).toBe('explore-tab');
    document.getElementById('check-tab')!.click();
    document.getElementById('explore-tab')!.click();
    expect(document.querySelector('iframe')).toBe(frame);
    window.dispatchEvent(new MessageEvent('message', { data: { type: 'chemverse:ready' }, source: window }));
    expect(document.getElementById('player-status')?.textContent).toContain('启动');
    window.dispatchEvent(new MessageEvent('message', { data: { type: 'chemverse:ready' }, source: frame.contentWindow }));
    expect(document.getElementById('player-status')?.textContent).toContain('就绪');
  });
});
