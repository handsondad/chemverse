import { findLesson, findUnit, lessonAsset, lessons, randomLesson, unitLessons, type Lesson } from '../catalog';
import { cleanHook, goalList, pad } from '../components';
import { html, setHtml } from '../html';
import { mountNative } from '../native';
import { clearAnswer, getProgress, isCompleted, recordAnswer, startLesson, toggleCompleted } from '../store';
import { icon } from '../visuals';
import { getElement } from '../../utils/dom';

const TABS = [['understand', '课前理解'], ['explore', '互动探索'], ['check', '检验理解']] as const;
const NATIVE_STATUS = '交互模型 · 点击控件观察变化';
const READY_TIMEOUT = 25000;
const NARRATION_KEY = 'chemverse.narration';
const MODES = [['watch', '看懂原理'], ['lab', '自由实验台']] as const;
type LessonMode = typeof MODES[number][0];
const READY_STATUS: Record<LessonMode, string> = {
  watch: '演示已就绪 · 跟着说明卡逐段观看',
  lab: '实验台已就绪 · 自己调节条件、完成考核',
};

let currentLesson: Lesson | undefined;
let frameTimeout: ReturnType<typeof setTimeout> | undefined;
let activePlayer: { ready: boolean; mode?: LessonMode; showMode(mode: LessonMode): void; goCheck(): void } | undefined;

export function leaveLesson(): void {
  clearTimeout(frameTimeout);
  currentLesson = undefined;
  activePlayer = undefined;
}

function isMode(value: unknown): value is LessonMode {
  return MODES.some(([mode]) => mode === value);
}

function narrationEnabled(): boolean {
  try {
    return localStorage.getItem(NARRATION_KEY) === '1';
  } catch {
    return false;
  }
}

function saveNarration(on: boolean): void {
  try {
    if (on) localStorage.setItem(NARRATION_KEY, '1');
    else localStorage.removeItem(NARRATION_KEY);
  } catch {
    // Narration then stays a per-visit choice.
  }
}

/** Re-renders the check panel of the open lesson; returns false when no lesson is open. */
export function refreshLessonCheck(): boolean {
  if (!currentLesson) return false;
  renderCheck(currentLesson);
  return true;
}

export function handleLessonMessage(event: MessageEvent<unknown>): void {
  const frame = document.querySelector<HTMLIFrameElement>('#lesson-player iframe');
  if (!frame || event.source !== frame.contentWindow || !event.data || typeof event.data !== 'object') return;
  const data = event.data;
  if (!('type' in data)) return;
  if (data.type === 'chemverse:open-lesson' && 'slug' in data && typeof data.slug === 'string' && findLesson(data.slug)) {
    location.hash = `lesson/${data.slug}`;
  }
  if (data.type === 'chemverse:ready') {
    clearTimeout(frameTimeout);
    if (activePlayer) activePlayer.ready = true;
    getElement('player-status').textContent = activePlayer?.mode ? READY_STATUS[activePlayer.mode] : '三维实验已就绪 · 可以开始操作';
  }
  if (data.type === 'chemverse:mode' && 'mode' in data && isMode(data.mode)) activePlayer?.showMode(data.mode);
  if (data.type === 'chemverse:go-check') activePlayer?.goCheck();
  if (data.type === 'chemverse:narration' && 'on' in data && typeof data.on === 'boolean') saveNarration(data.on);
  if (data.type === 'chemverse:error') {
    clearTimeout(frameTimeout);
    getElement('player-status').textContent = '实验启动失败，请重新开始或独立打开，并检查浏览器 WebGL 2 支持。';
  }
}

function updateCompleteButton(): void {
  const button = document.getElementById('complete-lesson');
  if (!button || !currentLesson) return;
  const completed = isCompleted(currentLesson.slug);
  button.textContent = completed ? '✓ 已读懂这个现象 · 取消标记' : '✨ 我读懂这个现象了';
  button.setAttribute('aria-pressed', String(completed));
}

function renderCheck(lesson: Lesson): void {
  const { check } = lesson;
  const answer = getProgress().answers[lesson.slug];
  const answered = answer !== undefined;
  const correct = answer === check.answer;
  const choiceClass = (i: number): string => [
    'check-choice',
    answered && i === check.answer ? 'correct-choice' : '',
    answered && i === answer && !correct ? 'wrong-choice' : '',
  ].join(' ');
  const panel = getElement('check-panel');

  setHtml(panel, html`
    <div class="check-layout">
      <div>
        <div class="eyebrow">EXPLAIN IT / 检验理解</div>
        <h2>不只是看过，还能解释。</h2>
        <p>一道概念题，检查这一课最重要的理解。它不代替完整的学业评价。</p>
        <div class="takeaway"><h3>带走这个认识</h3><p>${lesson.takeaway}</p></div>
      </div>
      <section class="check-card">
        <span class="eyebrow">概念检验 · 1 题</span>
        <h3>${check.question}</h3>
        <form id="check-form">
          <fieldset ${answered ? 'disabled' : ''}>
            <legend class="sr-only">${check.question}</legend>
            ${check.choices.map((choice, i) => html`
              <label class="${choiceClass(i)}">
                <input type="radio" name="answer" value="${i}" required ${i === answer ? 'checked' : ''}>
                <span class="choice-letter">${String.fromCharCode(65 + i)}</span>
                <span>${choice}</span>
              </label>`)}
          </fieldset>
          ${answered ? '' : html`<button type="submit" class="primary-action">查看反馈 →</button>`}
        </form>
        ${answered ? html`
          <div class="check-feedback ${correct ? 'is-correct' : 'is-incorrect'}" role="status">
            <strong>${correct ? '理解正确' : '再想一想关键区别'}</strong>
            <p>${check.explanation}</p>
          </div>
          <button type="button" class="text-action" id="retry-check">重新作答</button>` : ''}
        <div class="complete-area">
          <div class="complete-actions">
            <button class="secondary-action" id="complete-lesson" aria-pressed="${isCompleted(lesson.slug)}"></button>
            <button type="button" class="text-action" id="random-next-lesson">${icon('shuffle')}换个有趣的现象看看 →</button>
          </div>
          <p>轻点即可收进你的「探索足迹」，方便下次快速找回。</p>
        </div>
      </section>
    </div>`);
  updateCompleteButton();

  getElement('check-form').addEventListener('submit', event => {
    event.preventDefault();
    const selected = panel.querySelector<HTMLInputElement>('input[name="answer"]:checked');
    if (!selected) return;
    recordAnswer(lesson, Number(selected.value));
    renderCheck(lesson);
    const feedback = panel.querySelector<HTMLElement>('.check-feedback');
    feedback?.setAttribute('tabindex', '-1');
    feedback?.focus({ preventScroll: true });
  });
  document.getElementById('retry-check')?.addEventListener('click', () => {
    clearAnswer(lesson);
    renderCheck(lesson);
    panel.querySelector<HTMLInputElement>('input[name="answer"]')?.focus();
  });
  getElement('complete-lesson').addEventListener('click', () => {
    toggleCompleted(lesson);
    updateCompleteButton();
  });
  document.getElementById('random-next-lesson')?.addEventListener('click', () => {
    const picked = randomLesson(lesson.slug);
    location.hash = `lesson/${picked.slug}`;
  });
}

export function renderLesson(content: HTMLElement, lesson: Lesson): void {
  currentLesson = lesson;
  startLesson(lesson);
  const guided = Boolean(lesson.file);
  const unit = findUnit(lesson.unit);
  const siblings = unitLessons(unit.id);
  const index = lessons.indexOf(lesson);
  const previous = lessons[index - 1];
  const following = lessons[index + 1];

  setHtml(content, html`
    <section class="lesson-detail">
      <div class="lesson-topline">
        <a class="back-link" href="#unit/${unit.id}">${icon('back')}返回${unit.title}</a>
        <span>${unit.title} / ${siblings.indexOf(lesson) + 1} · ${siblings.length}</span>
      </div>
      <div class="lesson-detail-heading">
        <div>
          <div class="eyebrow">${lesson.topic} / ${lesson.level} / 约 ${lesson.minutes} 分钟</div>
          <h1>${lesson.title}</h1>
        </div>
        <span class="lesson-type">${icon(lesson.kind === 'native' ? 'atom' : 'flask')}${lesson.kind === 'native' ? (lesson.cards?.length ? '趣味揭秘' : '交互模型') : '3D 互动实验'}</span>
      </div>
      <div class="lesson-tabs" role="tablist" aria-label="本课学习步骤">${TABS.map(([id, title], i) => html`
        <button role="tab" id="${id}-tab" aria-controls="${id}-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? '0' : '-1'}" data-tab="${id}">
          <span>${pad(i + 1)}</span>${title}${icon(i === TABS.length - 1 ? 'check' : 'arrow')}
        </button>`)}
      </div>
      <section id="understand-panel" class="lesson-panel" role="tabpanel" aria-labelledby="understand-tab">
        <div class="understand-layout">
          <div class="understand-main">
            <div class="life-hook">
              <span class="eyebrow">REAL-WORLD CHEMISTRY / 生活中的化学</span>
              <p>${cleanHook(lesson.hook)}</p>
            </div>
            <div class="eyebrow">CORE QUESTION / 本课核心问题</div>
            <h2>${lesson.question}</h2>
            <p class="understand-intro">带着上面的生活现象进入实验。观察时，试着用自己的话把“宏观现象”和“微观原因”连起来。</p>
            <h3>这一课，你将看清</h3>
            ${goalList(lesson.objectives)}
            <div class="investigation"><span class="eyebrow">带着这个任务去探索</span><p>${lesson.task}</p></div>
            <button class="primary-action" id="begin-explore">准备好了，开始探索${icon('arrow')}</button>
          </div>
          <aside class="before-card">
            <span class="eyebrow">CONNECT THE DOTS</span>
            <h3>先修知识建议</h3>
            ${lesson.prerequisites.length ? html`
              <p>如果这些概念还不熟悉，先用几分钟回顾。无需解锁，也可以直接学习。</p>
              ${lesson.prerequisites.map(slug => html`
                <a href="#lesson/${slug}">
                  ${icon(isCompleted(slug) ? 'check' : 'book')}<span>${findLesson(slug)?.title}</span>${icon('arrow')}
                </a>`)}` : html`<p>这是整个学习路径的起点。不需要预备知识，只需要一点好奇心。</p>`}
            <div class="before-divider"></div>
            <h3>学习方式</h3>
            <p>理解目标 → 操作并观察 → 用概念题检验</p>
            <p class="muted">预计时间仅供安排节奏，不计时、不催促。</p>
          </aside>
        </div>
      </section>
      <section id="explore-panel" class="lesson-panel" role="tabpanel" aria-labelledby="explore-tab" hidden>
        <div class="explore-prompt"><span>${icon('search')}观察任务</span><p>${lesson.task}</p></div>
        ${lesson.kind === 'native' ? '' : html`<div class="safety-note">虚拟实验仅用于学习。涉及有毒气体、强酸碱、高温或活泼金属的操作，请勿自行模仿。</div>`}
        <div class="player-toolbar">
          ${guided ? html`
            <div class="mode-switch" role="group" aria-label="学习方式">${MODES.map(([mode, title]) => html`
              <button type="button" data-mode="${mode}" aria-pressed="${mode === 'watch'}">${title}</button>`)}
            </div>` : ''}
          <span id="player-status" role="status">${lesson.kind === 'native' ? NATIVE_STATUS : '进入探索后加载实验'}</span>
          <div>
            <button id="reload-lesson" type="button">重新开始</button>
            <button id="fullscreen-lesson" type="button">${icon('expand')}全屏</button>
            ${lesson.file ? html`<a href="${lessonAsset(lesson.file)}" target="_blank" rel="noopener noreferrer">独立打开 ↗</a>` : ''}
          </div>
        </div>
        <div class="lesson-player ${lesson.kind === 'native' ? 'native-player' : ''}" id="lesson-player"></div>
        <div class="explore-bottom">
          <p>${lesson.kind === 'native'
            ? '模型为教学简化，注意图中的模型边界说明。'
            : guided
              ? '「看懂原理」按课件原有的步骤自动演示，并给出现象和结论；「自由实验台」可以自己调节条件、完成考核。两种方式用的是同一套实验数据，实验参数不保存。'
              : '小屏幕使用课件内「场景 / 操作 / 讲解」切换；上下翻阅面板，不需要左右拖动。实验参数不保存。'}</p>
          <button class="secondary-action" id="go-check">试着解释一下${icon('arrow')}</button>
        </div>
      </section>
      <section id="check-panel" class="lesson-panel" role="tabpanel" aria-labelledby="check-tab" hidden></section>
      <div class="lesson-after">
        <details><summary>教材对应</summary>${lesson.textbook.map(book => html`<p>${book}</p>`)}</details>
        <div class="chapter-pagination">
          ${previous
            ? html`<a href="#lesson/${previous.slug}">← 上一课 · ${previous.title}</a>`
            : html`<a href="#path">← 完整学习路径</a>`}
          ${following
            ? html`<a href="#lesson/${following.slug}">下一课 · ${following.title} →</a>`
            : html`<a href="#progress">回顾我的学习 →</a>`}
        </div>
      </div>
    </section>`);

  const modeButtons = content.querySelectorAll<HTMLButtonElement>('[data-mode]');
  const state: NonNullable<typeof activePlayer> = {
    ready: false,
    mode: guided ? 'watch' : undefined,
    showMode(mode) {
      state.mode = mode;
      modeButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mode === mode)));
      if (state.ready) getElement('player-status').textContent = READY_STATUS[mode];
    },
    goCheck: () => selectTab('check', true),
  };
  activePlayer = state;
  modeButtons.forEach(button => button.addEventListener('click', () => {
    const mode = button.dataset.mode;
    if (!isMode(mode) || mode === state.mode) return;
    state.showMode(mode);
    content.querySelector<HTMLIFrameElement>('#lesson-player iframe')?.contentWindow?.postMessage({ type: 'chemverse:set-mode', mode }, '*');
  }));

  let mounted = false;
  function mountPlayer(): void {
    clearTimeout(frameTimeout);
    const player = getElement('lesson-player');
    const status = getElement('player-status');
    state.ready = false;
    player.replaceChildren();
    if (lesson.kind === 'native') {
      mountNative(player, lesson);
      status.textContent = NATIVE_STATUS;
    } else {
      status.textContent = '正在启动三维实验…';
      const frame = document.createElement('iframe');
      frame.title = `${lesson.title} · 交互式三维课件`;
      frame.setAttribute('sandbox', 'allow-scripts');
      frame.allowFullscreen = true;
      const query = state.mode ? `?cv-mode=${state.mode}${narrationEnabled() ? '&cv-narration=1' : ''}` : '';
      frame.src = lessonAsset(lesson.file!) + query;
      frame.addEventListener('error', () => { status.textContent = '实验页面加载失败，请重新开始或独立打开。'; });
      player.append(frame);
      frameTimeout = setTimeout(() => {
        status.textContent = '尚未收到实验就绪信号。若画面空白，请重新开始或独立打开，并检查浏览器 WebGL 2 支持。';
      }, READY_TIMEOUT);
    }
    mounted = true;
  }

  const tabButtons = content.querySelectorAll<HTMLButtonElement>('[data-tab]');
  function selectTab(id: string, focus = false): void {
    tabButtons.forEach(button => {
      const selected = button.dataset.tab === id;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
      getElement(`${button.dataset.tab}-panel`).hidden = !selected;
      if (selected && focus) button.focus();
    });
    if (id === 'explore' && !mounted) mountPlayer();
  }
  tabButtons.forEach(button => {
    button.addEventListener('click', () => selectTab(button.dataset.tab!));
    button.addEventListener('keydown', event => {
      const ids = TABS.map(([id]) => id as string);
      const current = ids.indexOf(button.dataset.tab!);
      const last = ids.length - 1;
      const next = event.key === 'ArrowRight' ? (current + 1) % ids.length
        : event.key === 'ArrowLeft' ? (current + last) % ids.length
          : event.key === 'Home' ? 0
            : event.key === 'End' ? last
              : -1;
      if (next !== -1) {
        event.preventDefault();
        selectTab(ids[next], true);
      }
    });
  });

  getElement('begin-explore').addEventListener('click', () => selectTab('explore', true));
  getElement('go-check').addEventListener('click', () => selectTab('check', true));
  getElement('reload-lesson').addEventListener('click', mountPlayer);
  getElement('fullscreen-lesson').addEventListener('click', async () => {
    try {
      const player = getElement('lesson-player');
      if (!player.requestFullscreen) throw new Error('Fullscreen API is unavailable');
      await player.requestFullscreen();
    } catch (error) {
      console.error('ChemVerse could not enter fullscreen.', error);
      getElement('player-status').textContent = '无法进入全屏，可使用独立打开或浏览器全屏模式。';
    }
  });
  renderCheck(lesson);
}
