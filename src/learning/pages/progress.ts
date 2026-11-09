import { lessons, randomLesson, themes } from '../catalog';
import { lessonCard, sectionHeading, themeCard } from '../components';
import { html, setHtml } from '../html';
import { getProgress, isStarted } from '../store';
import { icon } from '../visuals';

export function renderProgress(content: HTMLElement): void {
  const progress = getProgress();
  const correct = lessons.filter(lesson => progress.answers[lesson.slug] === lesson.check.answer).length;
  const opened = lessons.filter(lesson => isStarted(lesson.slug));

  setHtml(content, html`
    <section class="page-intro">
      <div class="eyebrow">CURIOSITY FOOTPRINTS / 探索足迹</div>
      <h1>留住每一次好奇的瞬间。</h1>
      <p>这里不是任务清单，也没有必须刷完的进度条。它只是帮你记住在这个浏览器里翻看过哪些化学现象，方便随时回来接着玩。</p>
    </section>
    <div class="progress-summary">
      <div><strong>${progress.started.length}</strong><span>翻看过的化学现象</span></div>
      <div><strong>${progress.completed.length}</strong><span>点亮「已读懂」的卡片</span></div>
      <div><strong>${correct}</strong><span>解开的概念小问答</span></div>
    </div>
    <section class="path-section">
      ${sectionHeading('RECENTLY EXPLORED', '最近逛过的现象', html`<button type="button" class="text-action" id="progress-random">${icon('shuffle')}随机挑一个新现象 →</button>`)}
      <div class="lesson-grid">${opened.length
        ? opened.map(lessonCard)
        : html`
          <div class="empty-state">
            <h2>你的好奇心之旅还没留脚印</h2>
            <p>可以从一杯水、一簇烟花或一颗柠檬电池开始，随便点开一个试试。</p>
            <a class="primary-action" href="#lesson/matter-basics">从一杯水开始 →</a>
          </div>`}
      </div>
    </section>
    <section>
      ${sectionHeading('EXPLORE BY THEME', '换个生活主题继续逛')}
      <div class="theme-grid">${themes.map(themeCard)}</div>
    </section>`);

  document.getElementById('progress-random')?.addEventListener('click', () => {
    const picked = randomLesson(progress.lastLesson ?? undefined);
    location.hash = `lesson/${picked.slug}`;
  });
}
