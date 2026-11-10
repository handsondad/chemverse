import { cleanHook } from '../article';
import { findLesson, findUnit, labs, lessonAsset, unitLabs, units, type Lesson } from '../catalog';
import { html, setHtml, type SafeHtml } from '../html';
import { icon } from '../visuals';
import { getElement } from '../../utils/dom';
import { avatar } from '../../series/avatar';
import { readVoicePreference, saveVoicePreference } from '../film/player';

/**
 * 「🧪 3D 实验台」：只放真正的 3D 课件，按 8 个主题分组。
 * 问答文章里不打开实验台；每个实验单独一页 `#lab/<slug>`，页首可以回到爸爸讲的那篇文章。
 */

const READY_TIMEOUT = 25000;
const MODES = [['watch', '看懂原理'], ['lab', '自由实验台']] as const;
type LabMode = typeof MODES[number][0];
const READY_STATUS: Record<LabMode, string> = {
  watch: '演示就绪 · 跟着说明卡逐段看',
  lab: '实验台就绪 · 自己调条件试试',
};

let currentLab: Lesson | undefined;
let frameTimeout: ReturnType<typeof setTimeout> | undefined;
let activePlayer: {
  ready: boolean;
  mode: LabMode;
  pendingStep?: number;
  showMode(mode: LabMode): void;
  highlightStep(stepIndex: number): void;
} | undefined;

export function leaveLab(): void {
  clearTimeout(frameTimeout);
  currentLab = undefined;
  activePlayer = undefined;
}

export function isLabOpen(): boolean {
  return Boolean(currentLab);
}

function isMode(value: unknown): value is LabMode {
  return MODES.some(([mode]) => mode === value);
}

export function handleLabMessage(event: MessageEvent<unknown>): void {
  const frame = document.querySelector<HTMLIFrameElement>('#lesson-player iframe');
  if (!frame || event.source !== frame.contentWindow || !event.data || typeof event.data !== 'object') return;
  const data = event.data;
  if (!('type' in data)) return;
  if (data.type === 'chemverse:open-lesson' && 'slug' in data && typeof data.slug === 'string' && findLesson(data.slug)) {
    location.hash = `q/${data.slug}`;
  }
  if (data.type === 'chemverse:ready') {
    clearTimeout(frameTimeout);
    frame.contentWindow?.postMessage({ type: 'chemverse:avatars', nian: avatar('nian').value, dad: avatar('dad').value }, '*');
    if (activePlayer) {
      activePlayer.ready = true;
      getElement('player-status').textContent = READY_STATUS[activePlayer.mode];
      if (activePlayer.pendingStep !== undefined) {
        const step = activePlayer.pendingStep;
        activePlayer.pendingStep = undefined;
        frame.contentWindow?.postMessage({ type: 'chemverse:play-step', step }, '*');
      }
    }
  }
  if (data.type === 'chemverse:step' && 'step' in data && typeof data.step === 'number') {
    activePlayer?.highlightStep(data.step);
  }
  if (data.type === 'chemverse:mode' && 'mode' in data && isMode(data.mode)) activePlayer?.showMode(data.mode);
  if (data.type === 'chemverse:go-check' && currentLab) location.hash = `q/${currentLab.slug}`;
  if (data.type === 'chemverse:narration' && 'on' in data && typeof data.on === 'boolean') saveVoicePreference(data.on);
  if (data.type === 'chemverse:error') {
    clearTimeout(frameTimeout);
    getElement('player-status').textContent = '实验启动失败，请重新开始或独立打开，并检查浏览器 WebGL 2 支持。';
  }
}

function labCard(lesson: Lesson): SafeHtml {
  const unit = findUnit(lesson.unit);
  return html`
    <a class="lab-card" href="#lab/${lesson.slug}">
      ${lesson.cover
        ? html`<img src="${lessonAsset(lesson.cover)}" alt="" loading="lazy">`
        : html`<span class="lab-card-art" aria-hidden="true">${unit.emoji}</span>`}
      <strong>${lesson.title}</strong>
      <small>🧪 3D 实验 · ${lesson.steps.length} 段</small>
    </a>`;
}

export function renderLabs(content: HTMLElement): void {
  setHtml(content, html`
    <div class="qlist labs" style="--bubble:#7fbf9f">
      <header class="page-top">
        <a class="page-back" href="#home">← 回到首页</a>
        <div>
          <span>${labs.length} 个实验 · 按主题分好了</span>
          <h1><span aria-hidden="true">🧪</span> 3D 实验台</h1>
        </div>
      </header>

      <div class="qlist-intro">
        <p>${avatar('nian')}<b>小念：</b>听完爸爸讲，我想自己动手试一试！</p>
        <p>${avatar('dad')}<b>爸爸：</b>这里的实验都是虚拟的，先「看懂原理」，再到「自由实验台」随便调条件。真实的药品可不能这样玩哦。</p>
      </div>

      ${units.map(unit => {
        const list = unitLabs(unit.id);
        return list.length ? html`
          <section class="qlist-group" style="--bubble:${unit.color}">
            <h2>${unit.emoji} ${unit.title} <small>${list.length} 个实验</small></h2>
            <div class="lab-grid">${list.map(labCard)}</div>
          </section>` : '';
      })}
    </div>`);
}

export function renderLab(content: HTMLElement, lesson: Lesson): void {
  clearTimeout(frameTimeout);
  currentLab = lesson;
  const unit = findUnit(lesson.unit);
  const file = lesson.file!;
  const steps = lesson.steps;

  setHtml(content, html`
    <article class="lab-page" style="--bubble:${unit.color}">
      <header class="page-top">
        <a class="page-back" href="#labs">← 🧪 3D 实验台</a>
        <div>
          <span>${unit.emoji} ${unit.title} · 3D 实验</span>
          <h1>${lesson.title}</h1>
        </div>
        <a class="page-lab" href="#q/${lesson.slug}">📖 先听爸爸讲</a>
      </header>
      <p class="lab-hook">📍 ${cleanHook(lesson.hook)}</p>

      <div class="player-toolbar" id="player-toolbar">
        <div class="mode-switch" role="group" aria-label="看的方式">${MODES.map(([mode, title]) => html`
          <button type="button" data-mode="${mode}" aria-pressed="${mode === 'watch'}">${title}</button>`)}
        </div>
        <span id="player-status" role="status">正在启动 3D 实验…</span>
        <div class="player-actions">
          <button id="reload-lesson" type="button">重新开始</button>
          <button id="fullscreen-lesson" type="button">${icon('expand')}全屏</button>
          <a href="${lessonAsset(file)}" target="_blank" rel="noopener noreferrer">独立打开 ↗</a>
        </div>
      </div>
      <div class="lesson-player" id="lesson-player"></div>
      ${steps.length ? html`
        <nav class="lab-steps" aria-label="分段看">
          <b>分段看</b>
          ${steps.map((step, i) => html`<button type="button" data-lab-step="${i}"><span>${i + 1}</span>${step}</button>`)}
        </nav>` : ''}
    </article>`);

  const modeButtons = content.querySelectorAll<HTMLButtonElement>('[data-mode]');
  const stepButtons = [...content.querySelectorAll<HTMLButtonElement>('[data-lab-step]')];
  const status = getElement('player-status');
  const frame = (): HTMLIFrameElement | null => content.querySelector<HTMLIFrameElement>('#lesson-player iframe');

  const state: NonNullable<typeof activePlayer> = {
    ready: false,
    mode: 'watch',
    showMode(mode) {
      state.mode = mode;
      modeButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mode === mode)));
      if (state.ready) status.textContent = READY_STATUS[mode];
    },
    highlightStep(stepIndex) {
      stepButtons.forEach((button, i) => button.classList.toggle('is-active', i === stepIndex));
    },
  };
  activePlayer = state;

  modeButtons.forEach(button => button.addEventListener('click', () => {
    const mode = button.dataset.mode;
    if (!isMode(mode) || mode === state.mode) return;
    state.showMode(mode);
    frame()?.contentWindow?.postMessage({ type: 'chemverse:set-mode', mode }, '*');
  }));

  stepButtons.forEach((button, step) => button.addEventListener('click', () => {
    state.highlightStep(step);
    if (!state.ready) {
      state.pendingStep = step;
      return;
    }
    state.showMode('watch');
    frame()?.contentWindow?.postMessage({ type: 'chemverse:play-step', step }, '*');
  }));

  function mountPlayer(): void {
    clearTimeout(frameTimeout);
    const player = getElement('lesson-player');
    state.ready = false;
    player.replaceChildren();
    status.textContent = '正在启动三维实验…';
    const iframe = document.createElement('iframe');
    iframe.title = `${lesson.title} · 交互式三维课件`;
    iframe.setAttribute('sandbox', 'allow-scripts');
    iframe.setAttribute('allow', 'autoplay; fullscreen');
    iframe.allowFullscreen = true;
    iframe.src = `${lessonAsset(file)}?cv-mode=${state.mode}&cv-narration=${readVoicePreference() ? '1' : '0'}`;
    iframe.addEventListener('error', () => { status.textContent = '实验页面加载失败，请重新开始或独立打开。'; });
    player.append(iframe);
    frameTimeout = setTimeout(() => {
      status.textContent = '尚未收到实验就绪信号。若画面空白，请重新开始或独立打开，并检查浏览器 WebGL 2 支持。';
    }, READY_TIMEOUT);
  }

  getElement('reload-lesson').addEventListener('click', mountPlayer);
  getElement('fullscreen-lesson').addEventListener('click', () => {
    const player = getElement('lesson-player');
    if (document.fullscreenElement) void document.exitFullscreen();
    else void player.requestFullscreen?.();
  });
  mountPlayer();
}
