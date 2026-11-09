import './learning.css';
import './element-theme.css';
import { findLesson, findUnit, unitLessons, units } from './catalog';
import { completeCount, pad } from './components';
import { html, setHtml } from './html';
import { getProgress, initProgressStore, reloadProgress } from './store';
import { icon } from './visuals';
import { renderCourses } from './pages/courses';
import { renderHome } from './pages/home';
import { handleLessonMessage, leaveLesson, refreshLessonCheck, renderLesson } from './pages/lesson';
import { renderPath, renderUnit } from './pages/path';
import { renderProgress } from './pages/progress';
import { closeModal } from '../modules/modal';
import { closeExpandedAtom } from '../modules/atom3d';
import { getElement, queryElement } from '../utils/dom';

const shell = html`
  <a class="skip-link" href="#learning-content">跳到学习内容</a>
  <aside class="learning-sidebar">
    <a class="brand" href="#home" aria-label="ChemVerse 化学视界首页"><span class="brand-symbol">${icon('atom')}</span><span>ChemVerse<small>化学视界</small></span></a>
    <span class="sidebar-caption">学习空间 / EXPLORE</span>
    <nav class="learning-nav" aria-label="主导航">
      <a href="#home" data-page="home">${icon('home')}<span>学习首页</span></a>
      <a href="#path" data-page="path">${icon('path')}<span>探索路径</span></a>
      <a href="#courses" data-page="courses">${icon('book')}<span>现象与课程</span></a>
      <a href="#elements" data-page="elements">${icon('table')}<span>元素周期表</span></a>
    </nav>
    <div class="chapter-nav">
      <span class="sidebar-caption">知识章节 / CHAPTERS</span>
      <nav aria-label="知识章节">${units.map((unit, i) => html`
        <a href="#unit/${unit.id}" data-unit="${unit.id}">
          <span class="chapter-nav-number">${pad(i + 1)}</span>${unit.title}<span class="unit-status" data-status="${unit.id}"></span>
        </a>`)}
      </nav>
    </div>
    <a class="sidebar-progress" href="#progress">${icon('spark')}<span>探索足迹<small id="sidebar-progress-count"></small></span>${icon('arrow')}</a>
    <div class="sidebar-bottom">从生活现象，看懂化学。<span>互动实验 · 自由探索</span></div>
  </aside>
  <div class="learning-workspace">
    <header class="workspace-header"><span id="learning-breadcrumb"></span><a href="#courses" class="header-progress">${icon('spark')}随便逛逛</a></header>
    <p class="storage-notice" id="storage-notice" role="alert" hidden></p>
    <main id="learning-content" tabindex="-1"></main>
    <div id="periodic-host" hidden></div>
    <footer class="learning-footer"><span>ChemVerse 化学视界 · 让理解自然发生</span></footer>
  </div>`;

const elementsIntro = html`
  <section class="elements-intro">
    <div class="eyebrow">REFERENCE TOOL / 基础学习工具</div>
    <h1>元素，是理解物质的索引。</h1>
    <p>点击元素查看性质与原子模型，切换热力图发现周期规律。小屏幕自动使用元素卡片，不需要横向滚动。</p>
    <a class="text-action" href="#lesson/atomic-basics">回到基础课：原子、元素与周期表 →</a>
  </section>`;

const notFound = html`
  <section class="empty-state">
    <h1>这个探索入口还不存在</h1>
    <p>请从现象与课程目录重新选择。</p>
    <a class="primary-action" href="#courses">返回课程目录 →</a>
  </section>`;

export function initLearningApp(onShowElements: () => void): void {
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
  const notice = getElement('storage-notice');

  function updateSidebar(): void {
    const { started, completed } = getProgress();
    const touched = new Set([...started, ...completed]).size;
    getElement('sidebar-progress-count').textContent = completed.length
      ? `已点亮 ${completed.length} 个现象`
      : touched
        ? `已逛过 ${touched} 个现象`
        : '随时从任意现象出发';
    units.forEach(unit => {
      queryElement(`[data-status="${unit.id}"]`, root).textContent =
        completeCount(unit.id) === unitLessons(unit.id).length ? '✓' : '';
    });
  }

  initProgressStore({
    onError(error) {
      console.error('ChemVerse learning progress could not be saved or restored.', error);
      notice.hidden = false;
      notice.textContent = '无法读取或保存本机记录（浏览器存储受限或记录损坏）。探索不受影响，但本次足迹仅在当前页面有效。';
    },
    onChange: updateSidebar,
  });

  function route(focus = false): void {
    if (location.hash === '#learning-content') {
      content.focus();
      return;
    }
    if (getElement('expandedAtomModal').classList.contains('open')) closeExpandedAtom();
    if (getElement('modal').classList.contains('open')) closeModal();
    leaveLesson();
    content.replaceChildren();

    const rawHash = location.hash.slice(1) || 'home';
    const [page, queryString = ''] = rawHash.split('?');
    const params = new URLSearchParams(queryString);
    const unit = units.find(item => page === `unit/${item.id}` || page === item.id);
    const lesson = page.startsWith('lesson/') ? findLesson(page.slice('lesson/'.length)) : undefined;
    periodicHost.hidden = page !== 'elements';
    root.classList.toggle('lesson-focus', !!lesson);

    let title = '学习首页';
    let activePage = page;
    let unitId = '';
    if (page === 'home') renderHome(content);
    else if (page === 'path') { title = '探索路径'; renderPath(content); }
    else if (page === 'courses') { title = '现象与课程'; renderCourses(content, params.get('theme') ?? undefined); }
    else if (page === 'progress') { title = '探索足迹'; renderProgress(content); }
    else if (page === 'elements') {
      title = '元素周期表';
      onShowElements();
      setHtml(content, elementsIntro);
    } else if (unit) {
      unitId = unit.id;
      title = unit.title;
      activePage = 'path';
      renderUnit(content, unit);
    } else if (lesson) {
      unitId = lesson.unit;
      activePage = 'path';
      title = `${findUnit(lesson.unit).title} / ${lesson.title}`;
      renderLesson(content, lesson);
    } else {
      title = '页面未找到';
      setHtml(content, notFound);
    }

    root.querySelectorAll<HTMLAnchorElement>('.learning-nav a, .chapter-nav a').forEach(link => {
      if (link.dataset.page === activePage || (unitId && link.dataset.unit === unitId)) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    getElement('learning-breadcrumb').textContent = title;
    document.title = `ChemVerse 化学视界 · ${title}`;
    updateSidebar();
    if (focus) {
      content.focus({ preventScroll: true });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }

  window.addEventListener('hashchange', () => route(true));
  window.addEventListener('message', handleLessonMessage);
  window.addEventListener('storage', () => {
    if (!reloadProgress()) return;
    updateSidebar();
    if (!refreshLessonCheck()) route();
  });
  route();
}
