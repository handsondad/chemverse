import './learning.css';
import './element-theme.css';
import { findLab, findLesson, units } from './catalog';
import { html, setHtml } from './html';
import { registerPeriodic } from './periodic';
import { initProgressStore, reloadProgress } from './store';
import { leaveHome, renderHome } from './pages/home';
import { handleLabMessage, isLabOpen, leaveLab, renderLab, renderLabs } from './pages/lab';
import { isLessonOpen, leaveLesson, renderLesson } from './pages/lesson';
import { renderTopic } from './pages/topic';
import { closeModal } from '../modules/modal';
import { closeExpandedAtom } from '../modules/atom3d';
import { getElement } from '../utils/dom';

/** 和「身体奇遇记」一样没有顶栏：首页大标题就是招牌，其余页面都有「← 返回」。 */
const shell = html`
  <a class="skip-link" href="#learning-content">跳到正文内容</a>
  <p class="storage-notice" id="storage-notice" role="alert" hidden></p>
  <main id="learning-content" tabindex="-1"></main>
  <div id="periodic-host" hidden></div>
  <footer class="learning-footer">奇遇记系列 · 化学奇遇记 —— 小念一问，爸爸一答，把身边的化学看个明白</footer>`;

const notFound = html`
  <section class="empty-state">
    <h1>这个问题还没写好</h1>
    <p>回到首页，挑一个别的问题吧。</p>
    <a class="page-back" href="#home">← 回到首页</a>
  </section>`;

/** 旧链接（追问地图、问题库、足迹页）都回到首页；`#elements` 现在就是「元素周期表」这个问题。 */
const LEGACY_HOME = new Set(['home', 'path', 'courses', 'progress']);
const ELEMENTS_LESSON = 'periodic-table';

export function initLearningApp(loadPeriodicTable: () => Promise<void>): void {
  const root = getElement('app-content');
  const periodic = document.createElement('section');
  periodic.id = 'elements-view';
  periodic.setAttribute('aria-label', '元素周期表');
  while (root.firstChild) periodic.append(root.firstChild);
  root.classList.add('learning-app');
  setHtml(root, shell);
  const content = getElement('learning-content');
  const periodicHost = getElement('periodic-host');
  periodicHost.append(periodic);
  registerPeriodic(periodic, periodicHost, loadPeriodicTable);
  const notice = getElement('storage-notice');

  initProgressStore({
    onError(error) {
      console.error('ChemVerse learning progress could not be saved or restored.', error);
      notice.hidden = false;
      notice.textContent = '无法读取或保存本机记录（浏览器存储受限或记录损坏）。阅读不受影响，只是「看过」的标记不会保留。';
    },
    onChange: () => {},
  });

  function route(focus = false): void {
    if (location.hash === '#learning-content') {
      content.focus();
      return;
    }
    if (getElement('expandedAtomModal').classList.contains('open')) closeExpandedAtom();
    if (getElement('modal').classList.contains('open')) closeModal();
    leaveLesson();
    leaveLab();
    leaveHome();
    content.replaceChildren();

    const page = (location.hash.slice(1) || 'home').split('?')[0];
    const [kind, id = ''] = page.split('/');
    const unit = kind === 'topic' || kind === 'unit' ? units.find(item => item.id === id) : undefined;
    const lab = kind === 'lab' ? findLab(id) : undefined;
    const lesson = page === 'elements' ? findLesson(ELEMENTS_LESSON)
      : kind === 'q' || kind === 'lesson' || kind === 'lab' ? findLesson(id) : undefined;
    if (kind === 'lab' && !lab && lesson) history.replaceState(null, '', `#q/${lesson.slug}`);

    let title = '小念和爸爸探索化学的奥秘';
    if (LEGACY_HOME.has(page)) {
      renderHome(content);
    } else if (page === 'labs') {
      title = '3D 实验台';
      renderLabs(content);
    } else if (lab) {
      title = `3D 实验台 · ${lab.title}`;
      renderLab(content, lab);
    } else if (unit) {
      title = unit.title;
      renderTopic(content, unit);
    } else if (lesson) {
      title = lesson.article.title;
      renderLesson(content, lesson);
    } else {
      title = '页面未找到';
      setHtml(content, notFound);
    }

    document.title = `化学奇遇记 · ${title}`;
    if (focus) {
      content.focus({ preventScroll: true });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }

  window.addEventListener('hashchange', () => route(true));
  window.addEventListener('message', handleLabMessage);
  window.addEventListener('storage', () => {
    if (reloadProgress() && !isLessonOpen() && !isLabOpen()) route();
  });
  route();
}
