import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { autoArticle } from '../src/learning/article';
import { labs, lessonAsset, lessons, themes, unitLabs, unitLessons, units } from '../src/learning/catalog';
import { getLessonDialogue } from '../src/learning/dialogue';
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

  it('builds article dialogues that neither repeat the opening and closing nor quote textbook citations', () => {
    for (const lesson of lessons) {
      expect(lesson.dialogue.length).toBeGreaterThan(0);
      for (const turn of lesson.dialogue) {
        expect(turn.ask).not.toBe(lesson.question);
        expect(turn.ask).not.toBe(lesson.hook.replace(/^生活中的化学\s*·\s*/, ''));
        expect(turn.answer).not.toBe(lesson.takeaway);
        expect(`${turn.ask}${turn.answer}${turn.phenomenon ?? ''}${turn.wrong ?? ''}`).not.toMatch(/教材原话|（p\.\s*\d+）/);
      }
      if (lesson.kind === 'simulation' && !lesson.story) {
        expect(lesson.dialogue.every((turn, i) => turn.stepIndex === i)).toBe(true);
      }
    }
  });

  it('gives every topic a kid-facing card and every question a 小念 × 爸爸 article', () => {
    for (const unit of units) {
      expect(unit.emoji).not.toBe('');
      expect(unit.kidHook).toMatch(/？$/);
      expect(unit.dadLens.length).toBeGreaterThan(4);
    }
    for (const lesson of lessons) {
      const { article } = lesson;
      expect(article.title).toMatch(/[？?]/);
      expect(article.trigger.length).toBeGreaterThan(10);
      expect(article.tip.length).toBeGreaterThan(10);
      expect(article.turns.length).toBeGreaterThanOrEqual(3);
      for (const turn of article.turns) {
        expect(turn.nian.trim()).not.toBe('');
        expect(turn.dad.trim()).not.toBe('');
      }
      if (!lesson.story) {
        expect(article.turns.at(-1)?.dad).toBe(lesson.takeaway);
        expect(article.film).toBeUndefined();
      }
    }
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


  it('opens on 小念 and 爸爸 exploring chemistry, followed by one card per topic', async () => {
    await start();
    expect(document.querySelector('.learning-sidebar')).toBeNull();
    expect(document.querySelector('.home-title h1')?.textContent).toContain('化学奇遇记');
    expect(document.getElementById('duo-title')?.textContent).toBe('小念和爸爸探索化学的奥秘');
    const cards = [...document.querySelectorAll<HTMLAnchorElement>('.topic-card:not(.is-labs)')];
    expect(cards.map(card => card.getAttribute('href'))).toEqual(units.map(unit => `#topic/${unit.id}`));
    expect(document.querySelector('.topic-card.is-labs')?.getAttribute('href')).toBe('#labs');
    expect(document.querySelector('.topic-card.is-labs')?.textContent).toContain(`${labs.length} 个实验`);
    expect(cards[0].textContent).toContain(`${unitLessons('foundations').length} 个问题`);
    const story = lessons.find(lesson => lesson.story)!;
    expect(document.querySelector('#duo-nian span')?.textContent).toBe(story.article.title);
    expect(document.getElementById('duo-go')?.getAttribute('href')).toBe(`#q/${story.slug}`);
    document.getElementById('duo-next')!.click();
    expect(document.getElementById('duo-go')?.getAttribute('href')).not.toBe(`#q/${story.slug}`);
    expect(document.querySelector('iframe')).toBeNull();
    expect(document.querySelector('.learning-footer')?.textContent).not.toMatch(/铜匠实验室|CC BY-NC|仅限非商业使用/);
    expect(document.querySelector('.github-silent-link')).toBeNull();
    expect(document.querySelector('.app-bar')).toBeNull();
    // 没有 WebGL 时，小星球上换成和 bodyverse 一样的平面头像
    const flat = document.querySelectorAll('.home-planet-flat svg.avatar');
    expect(flat).toHaveLength(2);
    expect(flat[0].querySelector('ellipse')?.getAttribute('cx')).toBe('13.5');
    expect(flat[1].querySelector('ellipse')?.getAttribute('cx')).toBe('12.5');
    expect(document.querySelector('.topic-card[href="#topic/periodic"]')?.textContent).toContain('元素周期表');
    expect(document.getElementById('periodic-host')?.hidden).toBe(true);
    expect(document.querySelectorAll('.element')).toHaveLength(0);

    navigate('#elements');
    await vi.dynamicImportSettled();
    expect(document.title).toContain('元素周期表');
    expect(document.querySelector('.page-back')?.getAttribute('href')).toBe('#topic/periodic');
    expect(document.querySelector('#live-table #elements-view')).not.toBeNull();
    expect(document.querySelectorAll('.element')).toHaveLength(120);
    expect(document.querySelector('#elements-view a[href*="github.com"]')).toBeNull();
    document.getElementById('lang-en')?.click();
    expect(document.documentElement.lang).toBe('zh-CN');
    expect(document.getElementById('elements-view')?.lang).toBe('en');
    navigate('#home');
    expect(document.querySelector('#periodic-host > #elements-view')).not.toBeNull();
  });

  it('draws figures in 爸爸 bubbles and keeps figure-only articles in one column', async () => {
    await start();
    navigate('#q/why-periodic');
    expect(document.querySelector('.qa-main')?.classList.contains('has-film')).toBe(false);
    expect(document.getElementById('film-host')).toBeNull();
    expect(document.querySelector('.story-line.is-dad .fig-trend svg rect')).not.toBeNull();
    expect(document.querySelector('.fig-shells')?.textContent).toContain('钠 Na');
    expect(document.querySelector('.fig-table figcaption')?.textContent).toContain('稀有气体');
    expect(document.querySelector('#open-lab, .page-lab, [data-watch-step]')).toBeNull();

    navigate('#q/atom-size-trend');
    expect(document.getElementById('table-sheet')?.hidden).toBe(true);
    document.querySelector<HTMLButtonElement>('.fig-link[data-table-mode="radius"]')!.click();
    expect(document.getElementById('table-sheet')?.hidden).toBe(false);
    await vi.dynamicImportSettled();
    expect(document.querySelector('#table-host #elements-view')).not.toBeNull();
    expect(document.getElementById('table')?.classList.contains('heatmap-active')).toBe(true);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(document.getElementById('table-sheet')?.hidden).toBe(true);
    navigate('#topic/periodic');
    expect(document.querySelector('#periodic-host > #elements-view')).not.toBeNull();
    expect(document.querySelector('.qlist-card[href="#q/why-periodic"] .is-figure')).not.toBeNull();
  });

  it('lets 爸爸 switch the table that is embedded in the overview question', async () => {
    await start();
    navigate('#q/periodic-table');
    await vi.dynamicImportSettled();
    expect(document.querySelectorAll('.qa-main.has-live #live-table .element')).toHaveLength(120);
    expect(document.getElementById('table')?.classList.contains('heatmap-active')).toBe(false);
    document.querySelector<HTMLButtonElement>('.fig-link[data-table-mode="radius"]')!.click();
    expect(document.getElementById('table')?.classList.contains('heatmap-active')).toBe(true);
    expect(document.getElementById('table-sheet')).toBeNull();
  });

  it('lists every question of a topic in 小念 words, grouped from easy to deep', async () => {
    await start();
    navigate('#topic/reactions');
    expect(document.querySelector('.page-top h1')?.textContent).toContain('反应与平衡');
    expect(document.querySelector('.qlist-intro')?.textContent).toContain('爸爸：这一类其实都在讲');
    const hrefs = [...document.querySelectorAll('.qlist-card')].map(card => card.getAttribute('href')).sort();
    expect(hrefs).toEqual(unitLessons('reactions').map(lesson => `#q/${lesson.slug}`).sort());
    const pot = document.querySelector('.qlist-card[href="#q/self-heating-pot"]')!;
    expect(pot.textContent).toContain(lessons.find(lesson => lesson.slug === 'self-heating-pot')!.article.title);
    expect(pot.querySelector('.is-film')).not.toBeNull();
    expect(pot.querySelector('.is-star')).toBeNull();
    expect(document.querySelectorAll('.qlist-chips a')).toHaveLength(units.length);
    expect(document.querySelector('.qlist-chips a[aria-current]')?.getAttribute('href')).toBe('#topic/reactions');
    navigate('#unit/solutions');
    expect(document.querySelector('.page-top h1')?.textContent).toContain('溶液与离子');
    navigate('#path');
    expect(document.querySelectorAll('.topic-card')).toHaveLength(units.length + 1);
  });

  it('tells a written story as a 小念 × 爸爸 chat beside a turn-synced explainer film', async () => {
    await start();
    navigate('#q/self-heating-pot');
    expect(document.querySelector('.page-top h1')?.textContent).toContain('倒一袋冷水');
    expect(document.querySelector('.page-back')?.getAttribute('href')).toBe('#topic/reactions');
    expect(document.querySelectorAll('.story-turn')).toHaveLength(6);
    expect(document.querySelectorAll('.story-line.is-nian .story-avatar svg')).toHaveLength(6);
    expect(document.querySelector('.lesson-tabs, #check-form, .learning-sidebar')).toBeNull();
    expect(document.querySelector('.qa-main')?.classList.contains('has-film')).toBe(true);
    expect(document.querySelector('#film-host .film-stage svg')).not.toBeNull();
    expect(document.querySelector('#film-host .film-voice')?.getAttribute('aria-pressed')).toBe('true');
    expect(document.querySelector('#open-lab, .page-lab, [data-watch-step], #lab-sheet')).toBeNull();

    document.querySelector<HTMLButtonElement>('[data-film-turn="2"]')!.click();
    expect(document.querySelector('.film-chips .is-active')?.textContent).toContain('铝粉接力');
    expect(document.getElementById('qa-turn-2')?.classList.contains('is-playing')).toBe(true);
    expect(document.querySelector('.qa-tip')?.textContent).toContain('民航');
    expect(document.querySelector('.qa-more h2')?.textContent).toContain('小念还想问');
    expect(document.querySelectorAll('.qa-more-list a')).toHaveLength(3);

    expect(readProgress().started).toEqual(['self-heating-pot']);
    navigate('#topic/reactions');
    expect(document.querySelector('.qlist-card[href="#q/self-heating-pot"] .is-star')).not.toBeNull();
  });

  it('puts a converted film beside the chat, with several scenes for one turn', async () => {
    await start();
    navigate('#q/gasoline');
    expect(document.querySelector('.qa-main')?.classList.contains('has-film')).toBe(true);
    expect(document.querySelectorAll('#film-host .film-chips button')).toHaveLength(10);
    document.querySelector<HTMLButtonElement>('[data-film-turn="2"]')!.click();
    expect(document.querySelector('#film-host .film-chips .is-active')?.textContent).toContain('加热变成蒸气');
    expect(document.getElementById('qa-turn-2')?.classList.contains('is-playing')).toBe(true);
  });

  it('turns a lesson without a written story into the same chat, with no lab inside the article', () => {
    const lesson = lessons.find(item => item.slug === 'conductivity-step')!;
    const cover = lessonAsset(lesson.cover!);
    const dialogue = getLessonDialogue(lesson);
    const article = autoArticle({ ...lesson, simulation: true, cover }, dialogue);
    expect(article.turns).toHaveLength(dialogue.length + 1);
    expect(article.turns[article.turns.length - 1].dad).toContain(lesson.takeaway);
    expect(article.film).toBeUndefined();
    expect(article.turns.find(turn => turn.figure)?.figure).toMatchObject({ kind: 'image', src: cover });
  });

  it('marks the questions you have read on the topic card', async () => {
    await start();
    navigate('#q/conductivity-step');
    expect(document.querySelector('iframe, #open-lab, [data-watch-step]')).toBeNull();
    navigate('#home');
    expect(document.querySelector('.topic-card[href="#topic/solutions"]')?.textContent).toContain('看过 1 个');
  });

  it('gathers every experiment in the 3D lab, grouped by topic', async () => {
    await start();
    navigate('#labs');
    expect(document.title).toContain('3D 实验台');
    expect(document.querySelectorAll('.lab-card')).toHaveLength(labs.length);
    const groups = units.filter(unit => unitLabs(unit.id).length);
    expect(document.querySelectorAll('.labs .qlist-group')).toHaveLength(groups.length);
    expect(document.querySelectorAll('.lab-card[href^="#lab/"]')).toHaveLength(labs.length);
    expect(labs.length).toBeGreaterThan(0);
    expect(labs.every(lesson => lesson.kind === 'simulation' && lesson.file)).toBe(true);
    for (const slug of ['periodic-table', 'matter-basics', 'self-heating-pot']) {
      expect(document.querySelector(`.lab-card[href="#lab/${slug}"]`)).toBeNull();
    }

    navigate('#lab/why-periodic');
    expect(location.hash).toBe('#q/why-periodic');
    expect(document.querySelector('.lab-page')).toBeNull();
  });

  it('runs a 3D lab on its own page and jumps to any step', async () => {
    await start();
    navigate('#lab/rate-step');
    const frame = document.querySelector('iframe')!;
    expect(frame.getAttribute('src')).toContain('lessons/tongjiang/courses/rate-step.html');
    expect(frame.getAttribute('sandbox')).toBe('allow-scripts');
    expect(frame.title).toContain('反应速率');
    expect(document.querySelector('.page-lab')?.getAttribute('href')).toBe('#q/rate-step');
    const steps = document.querySelectorAll<HTMLButtonElement>('[data-lab-step]');
    expect(steps).toHaveLength(lessons.find(lesson => lesson.slug === 'rate-step')!.steps.length);

    steps[2].click();
    const post = vi.spyOn(frame.contentWindow!, 'postMessage');
    window.dispatchEvent(new MessageEvent('message', { data: { type: 'chemverse:ready' }, source: frame.contentWindow }));
    expect(post).toHaveBeenCalledWith({ type: 'chemverse:play-step', step: 2 }, '*');
    window.dispatchEvent(new MessageEvent('message', { data: { type: 'chemverse:step', step: 3 }, source: frame.contentWindow }));
    expect(steps[3].classList.contains('is-active')).toBe(true);
    steps[1].click();
    expect(post).toHaveBeenLastCalledWith({ type: 'chemverse:play-step', step: 1 }, '*');

    document.getElementById('reload-lesson')?.click();
    expect(document.querySelector('iframe')).not.toBe(frame);
    navigate('#home');
    expect(document.querySelector('iframe')).toBeNull();
  });

  it('supports legacy lesson links and unknown-route recovery', async () => {
    window.history.replaceState(null, '', '/#lesson/titration-step');
    await start();
    expect(document.querySelector('.page-top h1')?.textContent).toBe(lessons.find(lesson => lesson.slug === 'titration-step')!.article.title);
    navigate('#lab/titration-step');
    expect(document.querySelector('iframe')?.title).toContain('滴定');
    navigate('#q/unknown');
    expect(document.querySelector('iframe')).toBeNull();
    expect(document.title).toContain('页面未找到');
    expect(document.querySelector('.empty-state a')?.getAttribute('href')).toBe('#home');
  });

  it('only accepts messages from the currently mounted lesson frame', async () => {
    await start();
    navigate('#lab/rate-step');
    const frame = document.querySelector('iframe')!;
    window.dispatchEvent(new MessageEvent('message', { data: { type: 'chemverse:ready' }, source: window }));
    expect(document.getElementById('player-status')?.textContent).toContain('启动');
    window.dispatchEvent(new MessageEvent('message', { data: { type: 'chemverse:ready' }, source: frame.contentWindow }));
    expect(document.getElementById('player-status')?.textContent).toContain('就绪');
    const data = { type: 'chemverse:open-lesson', slug: 'titration-step' };
    window.dispatchEvent(new MessageEvent('message', { data, source: window }));
    expect(location.hash).toBe('#lab/rate-step');
    window.dispatchEvent(new MessageEvent('message', { data: { ...data, slug: 'unknown' }, source: frame.contentWindow }));
    expect(location.hash).toBe('#lab/rate-step');
    window.dispatchEvent(new MessageEvent('message', { data, source: frame.contentWindow }));
    expect(location.hash).toBe('#q/titration-step');
  });

  it('starts simulation lessons in the guided watch mode and keeps the lab bench one switch away', async () => {
    await start();
    navigate('#lab/rate-step');
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
    expect(location.hash).toBe('#q/rate-step');

    navigate('#lab/sodium-step');
    expect(document.querySelectorAll('.mode-switch button')).toHaveLength(2);
    expect(document.querySelector('iframe')!.getAttribute('src')).toMatch(/sodium-step\.html\?cv-mode=watch&cv-narration=1$/);
  });

  it('keeps the open question and its lab when another tab changes the record', async () => {
    await start();
    navigate('#lab/rate-step');
    const frame = document.querySelector('iframe');
    localStorage.clear();
    window.dispatchEvent(new StorageEvent('storage'));
    expect(document.querySelector('iframe')).toBe(frame);
  });

  it('surfaces storage failure and never overwrites the broken record', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    localStorage.setItem(PROGRESS_KEY, '{bad');
    await start();
    expect(document.getElementById('storage-notice')?.hidden).toBe(false);
    expect(error).toHaveBeenCalled();
    navigate('#q/rate-step');
    expect(localStorage.getItem(PROGRESS_KEY)).toBe('{bad');
  });

  it('opens the article for old lab links of lessons without 3D courseware, and links background questions for grown-ups', async () => {
    await start();
    navigate('#lab/matter-basics');
    expect(location.hash).toBe('#q/matter-basics');
    expect(document.querySelector('.story-turn')).not.toBeNull();
    expect(document.querySelector('iframe, .lab-page')).toBeNull();
    navigate('#q/chemical-bonds');
    expect(document.querySelector('.qa-prereq a')?.getAttribute('href')).toBe('#q/atomic-basics');
    expect(document.querySelector('iframe')).toBeNull();
  });
});
