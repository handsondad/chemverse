import { filterLessons, findTheme, themes, units } from '../catalog';
import { lessonCard } from '../components';
import { html, setHtml } from '../html';
import { icon } from '../visuals';
import { getElement } from '../../utils/dom';

let activeUnit = 'all';
let activeTheme = 'all';
let search = '';

function updateResults(content: HTMLElement): void {
  const results = filterLessons(activeUnit, search, activeTheme);
  getElement('results-count').textContent = `${results.length} 个探索主题`;
  content.querySelectorAll<HTMLButtonElement>('[data-theme]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.theme === activeTheme));
  });
  setHtml(getElement('course-results'), results.length
    ? html`${results.map(lessonCard)}`
    : html`
      <div class="empty-state">
        <h2>还没有匹配的探索内容</h2>
        <p>试试搜「烟花」「可乐」「暖宝宝」「小苏打」，也可以清除筛选看看全部内容。</p>
        <button class="secondary-action" id="clear-filters">清除筛选</button>
      </div>`);
  document.getElementById('clear-filters')?.addEventListener('click', () => {
    search = '';
    activeUnit = 'all';
    activeTheme = 'all';
    renderCourses(content);
    getElement('course-search').focus();
  });
}

export function renderCourses(content: HTMLElement, initialTheme?: string): void {
  if (initialTheme !== undefined) {
    activeTheme = findTheme(initialTheme) ? initialTheme : 'all';
  }
  setHtml(content, html`
    <section class="page-intro">
      <div class="eyebrow">EXPLORE CHEMISTRY / 化学探索馆</div>
      <h1>找到此刻想弄明白的事。</h1>
      <p>你可以按「生活与工业主题」横向逛展，也可以按「知识章节」由浅入深查找。初次系统学习，可参考<a class="inline-link" href="#path">学习路径</a>。</p>
    </section>
    <div class="theme-pills" role="group" aria-label="按生活与工业主题筛选">
      <button type="button" data-theme="all" aria-pressed="${activeTheme === 'all'}">全部主题</button>
      ${themes.map(theme => html`
        <button type="button" data-theme="${theme.id}" aria-pressed="${activeTheme === theme.id}" style="--unit-color:${theme.color}">
          ${icon(theme.icon)}<span>${theme.title}</span>
        </button>`)}
    </div>
    <div class="course-toolbar">
      <label class="course-search">
        ${icon('search')}
        <input id="course-search" type="search" aria-label="搜索生活现象、知识点或教材章节" placeholder="搜生活现象（如：烟花、可乐、暖宝宝）或化学概念…" value="${search}">
      </label>
      <label class="filter-label">知识章节<select id="unit-filter">
        <option value="all">全部章节</option>
        ${units.map(unit => html`<option value="${unit.id}" ${unit.id === activeUnit ? 'selected' : ''}>${unit.title}</option>`)}
      </select></label>
      <span id="results-count" role="status" aria-live="polite"></span>
    </div>
    <div class="lesson-grid" id="course-results"></div>`);

  getElement<HTMLInputElement>('course-search').addEventListener('input', event => {
    search = (event.target as HTMLInputElement).value;
    updateResults(content);
  });
  getElement<HTMLSelectElement>('unit-filter').addEventListener('change', event => {
    activeUnit = (event.target as HTMLSelectElement).value;
    updateResults(content);
  });
  content.querySelectorAll<HTMLButtonElement>('[data-theme]').forEach(button => {
    button.addEventListener('click', () => {
      activeTheme = button.dataset.theme ?? 'all';
      updateResults(content);
    });
  });
  updateResults(content);
}
