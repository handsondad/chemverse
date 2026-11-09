import { findUnit, themeLessons, themes, unitLessons, units } from '../catalog';
import type { Unit } from '../curriculum';
import { cleanHook, completeCount, goalList, lessonKind, lessonOrder, pad, sectionHeading } from '../components';
import { html, setHtml } from '../html';
import { isCompleted } from '../store';
import { chapterArt, icon } from '../visuals';

let currentView: 'chapters' | 'themes' = 'chapters';

export function renderPath(content: HTMLElement): void {
  setHtml(content, html`
    <section class="page-intro">
      <div class="eyebrow">TWO WAYS TO EXPLORE / 双轨探索路线</div>
      <h1>把零散的知识，连成理解。</h1>
      <p>你可以顺着 <strong>7 个认知章节</strong> 由浅入深系统学习，也可以按 <strong>5 大生活与工业主题</strong> 跟着好奇心跨章节探索。不设强制解锁，随时自由切换。</p>
    </section>
    <div class="path-tracks" role="group" aria-label="切换路线视图">
      <button type="button" class="path-track-card" data-path-view="chapters" aria-pressed="${currentView === 'chapters'}">
        <div class="path-track-top">
          <span class="path-track-icon">${icon('path')}</span>
          <div class="path-track-title">
            <strong>按认知阶梯系统学习</strong>
            <span>7 个知识章节 · 由浅入深打好基础</span>
          </div>
          <span class="path-track-badge">7 章</span>
        </div>
        <div class="path-track-steps">
          <span><b>1–2</b>微观积木</span>${icon('arrow')}
          <span><b>3</b>元素脾气</span>${icon('arrow')}
          <span><b>4–6</b>变化规律</span>${icon('arrow')}
          <span><b>7</b>真实工业</span>
        </div>
      </button>
      <button type="button" class="path-track-card" data-path-view="themes" aria-pressed="${currentView === 'themes'}">
        <div class="path-track-top">
          <span class="path-track-icon">${icon('spark')}</span>
          <div class="path-track-title">
            <strong>按生活与工业主题探索</strong>
            <span>5 条跨章节故事线 · 从日常好奇心切入</span>
          </div>
          <span class="path-track-badge">5 主题</span>
        </div>
        <div class="path-track-steps">
          <span><b>起点</b>生活小事提问</span>${icon('arrow')}
          <span><b>探究</b>实验室看原理</span>${icon('arrow')}
          <span><b>延伸</b>走进真实工厂</span>
        </div>
      </button>
    </div>
    ${currentView === 'chapters' ? html`
      <div class="roadmap">${units.map((unit, i) => {
        const count = completeCount(unit.id);
        const courses = unitLessons(unit.id);
        return html`
        <section class="roadmap-unit" style="--unit-color:${unit.color}">
          <div class="roadmap-number">${pad(i + 1)}</div>
          <div class="roadmap-content">
            <div class="roadmap-heading">
              <div><div class="eyebrow">${unit.subtitle}</div><h2><a href="#unit/${unit.id}">${unit.title}</a></h2></div>
              <span class="muted">${count ? `已探索 ${count} / ${courses.length}` : `${courses.length} 个探索主题`}</span>
            </div>
            <p>${unit.description}</p>
            <div class="path-lessons">${courses.map((lesson, j) => html`
              <a href="#lesson/${lesson.slug}">
                <span class="lesson-order">${lessonOrder(lesson, j)}</span>
                <span class="path-lesson-main"><strong>${lesson.title}</strong><small class="path-lesson-hook">${cleanHook(lesson.hook)}</small></span>
                <small>${lesson.level} · ${lesson.minutes} 分钟</small>
                ${icon('arrow')}
              </a>`)}
            </div>
          </div>
        </section>`;
      })}
      </div>
    ` : html`
      <div class="roadmap">${themes.map((theme, i) => {
        const courses = themeLessons(theme.id);
        return html`
        <section class="roadmap-unit" style="--unit-color:${theme.color}">
          <div class="roadmap-number">${icon(theme.icon)}</div>
          <div class="roadmap-content">
            <div class="roadmap-heading">
              <div><div class="eyebrow">THEME ${pad(i + 1)} / ${theme.subtitle}</div><h2><a href="#courses?theme=${theme.id}">${theme.title}</a></h2></div>
              <span class="muted">串联 ${courses.length} 个现象</span>
            </div>
            <p>${theme.description}</p>
            <div class="path-lessons">${courses.map((lesson, j) => {
              const unit = findUnit(lesson.unit);
              return html`
              <a href="#lesson/${lesson.slug}">
                <span class="lesson-order">${lessonOrder(lesson, j)}</span>
                <span class="path-lesson-main"><strong>${lesson.title}</strong><small class="path-lesson-hook">${cleanHook(lesson.hook)}</small></span>
                <small>${unit.title} · ${lesson.level}</small>
                ${icon('arrow')}
              </a>`;
            })}
            </div>
          </div>
        </section>`;
      })}
      </div>
    `}`);

  content.querySelectorAll<HTMLButtonElement>('[data-path-view]').forEach(button => {
    button.addEventListener('click', () => {
      const nextView = button.dataset.pathView as 'chapters' | 'themes';
      if (nextView && nextView !== currentView) {
        currentView = nextView;
        renderPath(content);
      }
    });
  });
}

export function renderUnit(content: HTMLElement, unit: Unit): void {
  const index = units.indexOf(unit);
  const previous = units[index - 1];
  const following = units[index + 1];
  const courses = unitLessons(unit.id);
  const next = courses.find(lesson => !isCompleted(lesson.slug)) ?? courses[0];
  const minutes = courses.reduce((sum, lesson) => sum + lesson.minutes, 0);
  const count = completeCount(unit.id);

  setHtml(content, html`
    <a class="back-link" href="#path">${icon('back')}全部探索路径</a>
    <section class="unit-intro" style="--unit-color:${unit.color}">
      <div>
        <div class="eyebrow">CHAPTER ${pad(index + 1)} / ${unit.subtitle}</div>
        <h1>${unit.title}</h1>
        <p>${unit.description}</p>
        <div class="unit-intro-meta">
          <span>${courses.length} 个探索主题</span>
          <span>共约 ${minutes} 分钟</span>
          ${count ? html`<span>已探索 ${count} 项</span>` : ''}
        </div>
        <a class="primary-action" href="#lesson/${next.slug}">从这一章开始探索${icon('arrow')}</a>
      </div>
      ${chapterArt(unit.icon)}
    </section>
    <div class="unit-overview">
      <section><div class="eyebrow">THE BIG QUESTION</div><h2>${unit.question}</h2></section>
      <section><h2>这一章，你将看懂</h2>${goalList(unit.goals)}</section>
    </div>
    <section>
      ${sectionHeading('PHENOMENA IN THIS CHAPTER', '一步一步，把这一章的现象想明白')}
      <div class="chapter-lessons">${courses.map((lesson, i) => html`
        <a class="chapter-lesson" href="#lesson/${lesson.slug}">
          <span class="lesson-order">${lessonOrder(lesson, i)}</span>
          <div>
            <span class="eyebrow">${lesson.topic} · ${lesson.level}</span>
            <h3>${lesson.title}</h3>
            <p>${cleanHook(lesson.hook)}</p>
          </div>
          <div class="chapter-lesson-meta"><span>${lessonKind(lesson)}</span><span>${lesson.minutes} 分钟</span></div>
          ${icon('arrow')}
        </a>`)}
      </div>
    </section>
    <div class="chapter-pagination">
      ${previous
        ? html`<a href="#unit/${previous.id}">← 上一章 · ${previous.title}</a>`
        : html`<span>基础起步，从这里开始</span>`}
      ${following
        ? html`<a href="#unit/${following.id}">下一章 · ${following.title} →</a>`
        : html`<a href="#path">回到完整路径 →</a>`}
    </div>`);
}
