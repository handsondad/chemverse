import { findLesson, findUnit, relatedLessons, type Lesson } from '../catalog';
import type { ArticleTurn } from '../article';
import { levelStars } from '../components';
import { mountCrystals } from '../crystal';
import { renderFigure, type TableMode, type TableView } from '../figures';
import { html, setHtml, type SafeHtml } from '../html';
import { applyTableLink, parkPeriodic, showPeriodic } from '../periodic';
import { startLesson } from '../store';
import { getElement } from '../../utils/dom';
import { filmTurns, mountFilm, type FilmHandle } from '../film/player';
import type { Speaker } from '../film/narration';
import { voiceFor } from '../voice';
import { avatar, characterNames } from '../../series/avatar';

let currentLesson: Lesson | undefined;
let activeFilm: FilmHandle | undefined;
let releaseSheet: (() => void) | undefined;
let releaseCrystals: (() => void) | undefined;

export function leaveLesson(): void {
  activeFilm?.destroy();
  activeFilm = undefined;
  releaseCrystals?.();
  releaseCrystals = undefined;
  releaseSheet?.();
  releaseSheet = undefined;
  parkPeriodic();
  currentLesson = undefined;
}

export function isLessonOpen(): boolean {
  return Boolean(currentLesson);
}

function renderTurn(turn: ArticleTurn, index: number, last: boolean, scenes: Set<number>): SafeHtml {
  const { figure } = turn;
  const live = figure?.kind === 'live';
  return html`
    <article class="story-turn ${last ? 'is-epiphany' : ''}" id="qa-turn-${index}" data-turn-index="${index}" style="--i:${index}">
      <div class="story-line is-nian">
        <span class="story-avatar">${avatar('nian')}</span>
        <div class="story-bubble">
          <span class="story-name">${characterNames.nian}</span>
          <p>${turn.nian}</p>
        </div>
      </div>
      <div class="story-line is-dad">
        <span class="story-avatar">${avatar('dad')}</span>
        <div class="story-bubble ${figure && !live ? 'has-figure' : ''}">
          <span class="story-name">${characterNames.dad}</span>
          ${turn.lead ? html`<p class="story-lead">${turn.lead}</p>` : ''}
          <p>${turn.dad}</p>
          ${turn.eq ? html`<code class="qa-eq">${turn.eq}</code>` : ''}
          ${figure && !live ? renderFigure(figure, index) : ''}
          ${turn.frames?.length ? html`
            <ol class="qa-steps" aria-label="图解">
              ${turn.frames.map((frame, i) => html`<li style="--i:${i}"><span aria-hidden="true">${frame.icon}</span><small>${frame.label}</small></li>`)}
            </ol>` : ''}
          ${turn.see ? html`<p class="story-see"><b>👀 你会看到</b>${turn.see}</p>` : ''}
          ${turn.myth ? html`<p class="story-myth"><b>⚠️ 别弄错</b>${turn.myth}</p>` : ''}
          ${scenes.has(index) ? html`
            <div class="story-actions">
              <button type="button" class="story-action" data-film-turn="${index}" aria-label="播放这一轮的讲解动画">🎬 看动画</button>
            </div>` : ''}
        </div>
      </div>
      ${figure && live ? renderFigure(figure, index) : ''}
    </article>`;
}

function tableView(button: HTMLElement): TableView {
  const category = button.dataset.tableCategory;
  return {
    mode: (button.dataset.tableMode || 'default') as TableMode,
    category: category ? Number(category) : undefined,
  };
}

export function renderLesson(content: HTMLElement, lesson: Lesson): void {
  activeFilm?.destroy();
  activeFilm = undefined;
  releaseCrystals?.();
  currentLesson = lesson;
  startLesson(lesson);
  const { article } = lesson;
  const { film } = article;
  const unit = findUnit(lesson.unit);
  const scenes = film ? filmTurns(film) : new Set<number>();
  const hasLive = article.turns.some(turn => turn.figure?.kind === 'live');
  const hasTableLink = !hasLive && article.turns.some(turn => turn.figure && 'link' in turn.figure && turn.figure.link);

  setHtml(content, html`
    <article class="qa-page" style="--bubble:${unit.color}">
      <header class="page-top">
        <a class="page-back" href="#topic/${unit.id}">← ${unit.emoji} ${unit.title}</a>
        <div>
          <span>${levelStars(lesson.level)} ${lesson.level} · ${lesson.topic} · 💬 ${article.turns.length} 问 ${article.turns.length} 答${film ? ' · 🎬 有讲解动画' : ''}</span>
          <h1>${article.title}</h1>
        </div>
      </header>

      <div class="qa-main ${film ? 'has-film' : ''} ${hasLive ? 'has-live' : ''}">
        <section class="story-chat" aria-label="小念和爸爸的对话">
          <p class="story-scene">📍 ${article.trigger}</p>
          ${article.turns.map((turn, i) => renderTurn(turn, i, i === article.turns.length - 1, scenes))}
        </section>
        ${film ? html`<aside class="qa-film" id="qa-stage" aria-label="讲解动画"><div id="film-host"></div></aside>` : ''}
      </div>

      <footer class="qa-wrap">
        <section class="qa-more" aria-labelledby="more-title">
          <h2 id="more-title">${avatar('nian')} 小念还想问</h2>
          <div class="qa-more-list">
            ${relatedLessons(lesson, 3).map(item => html`
              <a href="#q/${item.slug}"><strong>${item.article.title}</strong><small>${findUnit(item.unit).emoji} ${findUnit(item.unit).title}${item.article.film ? ' · 🎬 有动画' : ''}</small></a>`)}
          </div>
        </section>
        <details class="qa-tip">
          <summary>👨‍👩‍👧 给大人</summary>
          <p>${article.tip}</p>
          ${lesson.prerequisites.length ? html`
            <p class="qa-prereq">想先打个底，可以一起看：${lesson.prerequisites.map(slug => {
              const before = findLesson(slug);
              return before ? html`<a href="#q/${slug}">${before.article.title}</a>` : '';
            })}</p>` : ''}
          <p class="qa-textbook">对应课本：${lesson.textbook.join('；')}</p>
        </details>
      </footer>
    </article>

    ${hasTableLink ? html`
      <div class="lab-sheet" id="table-sheet" hidden>
        <div class="lab-sheet-backdrop" data-close-table></div>
        <section class="lab-sheet-panel" id="table-panel" role="dialog" aria-modal="true" aria-labelledby="table-sheet-title" tabindex="-1">
          <header class="lab-sheet-head">
            <h2 id="table-sheet-title">🗂️ 元素周期表</h2>
            <button type="button" class="lab-sheet-close" id="close-table" data-close-table>回到文章 ✕</button>
          </header>
          <div class="lesson-player periodic-player" id="table-host"></div>
        </section>
      </div>` : ''}`);

  releaseCrystals = mountCrystals(content);
  const liveHost = document.getElementById('live-table-host');
  const liveFigure = document.getElementById('live-table');
  if (liveHost && liveFigure) void showPeriodic(liveHost, tableView(liveFigure));

  const sheet = document.getElementById('table-sheet');
  let tableShown = false;
  let returnFocus: HTMLElement | null = null;
  function closeSheet(): void {
    if (!sheet || sheet.hidden) return;
    sheet.hidden = true;
    document.documentElement.classList.remove('has-lab-sheet');
    returnFocus?.focus({ preventScroll: true });
  }
  function onKey(event: KeyboardEvent): void {
    if (event.key !== 'Escape' || !sheet || sheet.hidden) return;
    if (document.querySelector('#modal.open, #expandedAtomModal.open')) return;
    closeSheet();
  }
  if (sheet) {
    sheet.querySelectorAll('[data-close-table]').forEach(node => node.addEventListener('click', closeSheet));
    document.addEventListener('keydown', onKey);
    releaseSheet = () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('has-lab-sheet');
    };
  }

  /** 图下面的「🔍 在周期表里看…」：文章里嵌着周期表就切它并滚过去，没有就弹出周期表 */
  function showTable(view: TableView): void {
    if (liveHost) {
      applyTableLink(view);
      liveFigure?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (!sheet) return;
    returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    activeFilm?.pause();
    sheet.hidden = false;
    document.documentElement.classList.add('has-lab-sheet');
    getElement('table-panel').focus({ preventScroll: true });
    if (tableShown) applyTableLink(view);
    else void showPeriodic(getElement('table-host'), view);
    tableShown = true;
  }
  content.querySelectorAll<HTMLButtonElement>('.fig-link').forEach(button => {
    button.addEventListener('click', () => showTable(tableView(button)));
  });

  if (film) {
    activeFilm = mountFilm(getElement('film-host'), film, {
      id: `film-${lesson.slug}`,
      voice: voiceFor(lesson.slug, article.turns.length),
      onTurn: markFilmTurn,
    });
    content.querySelectorAll<HTMLButtonElement>('[data-film-turn]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeFilm?.playTurn(Number(btn.dataset.filmTurn));
        const stage = document.getElementById('qa-stage');
        if (!stage) return;
        const { top, bottom } = stage.getBoundingClientRect();
        if (top < 0 || bottom > innerHeight + 1) stage.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  let spokenTurn: number | null = null;
  /** 高亮正在讲的那一轮和正在说话的人；宽屏上左右两栏并排，读到哪一轮就把它滚进视野 */
  function markFilmTurn(turn: number | null, who?: Speaker): void {
    content.querySelectorAll<HTMLElement>('[data-turn-index]').forEach(node => {
      const current = Number(node.dataset.turnIndex) === turn;
      node.classList.toggle('is-playing', current);
      node.querySelectorAll<HTMLElement>('.story-line').forEach(line => {
        line.classList.toggle('is-speaking', current && line.classList.contains(`is-${who}`));
      });
    });
    const next = who ? turn : null;
    if (next === null || next === spokenTurn) return;
    spokenTurn = next;
    if (window.matchMedia?.('(min-width: 901px)').matches) {
      document.getElementById(`qa-turn-${next}`)?.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' });
    }
  }
}
