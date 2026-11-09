import { findLesson, findUnit, lessons, nextLesson, randomLesson, themes, units, type Lesson } from '../catalog';
import { cleanHook, sectionHeading, themeCard, unitCard } from '../components';
import { html, setHtml } from '../html';
import { getProgress, isCompleted, isStarted } from '../store';
import { chapterArt, icon } from '../visuals';

function recommendation(): Lesson | undefined {
  const { lastLesson, completed } = getProgress();
  const last = lastLesson ? findLesson(lastLesson) : undefined;
  return last && !isCompleted(last.slug) ? last : nextLesson(completed);
}

export function renderHome(content: HTMLElement): void {
  const next = recommendation();
  const unit = next ? findUnit(next.unit) : units[0];
  const resumed = next ? isStarted(next.slug) : false;
  const heroAction = next ? (resumed ? '继续探索' : '开始第一个现象') : '回顾学习路径';
  const nextEyebrow = next
    ? (resumed ? 'CONTINUE / 接着上次的好奇心' : 'START HERE / 建议从这个现象开始')
    : 'EXPLORE MORE / 随时重温任意现象';

  setHtml(content, html`
    <section class="learning-hero">
      <div class="hero-copy">
        <div class="eyebrow"><span class="live-dot"></span>从生活现象出发 / CHEMISTRY IN EVERYDAY LIFE</div>
        <h1>从一滴水，<br>读懂整个<em>化学世界。</em></h1>
        <p>不用死记硬背，也不用按部就班打卡。<br>你可以顺着知识阶梯由浅入深，也可以从身边的生活现象随时切入。</p>
        <div class="hero-actions">
          <a class="primary-action" href="${next ? `#lesson/${next.slug}` : '#path'}">${heroAction}${icon('arrow')}</a>
          <button type="button" class="secondary-action" id="random-curiosity">${icon('shuffle')}随机看一个现象</button>
          <a class="text-action" href="#path">查看完整路径 ${icon('arrow')}</a>
        </div>
        <div class="hero-stats">
          <span><strong>${themes.length}</strong>大生活主题</span>
          <span><strong>${units.length}</strong>个知识章节</span>
          <span><strong>${lessons.length}</strong>个互动探索</span>
          <span><strong>118</strong>种元素</span>
        </div>
      </div>
      <div class="hero-discovery">
        ${chapterArt('molecule')}
        <div class="discovery-label label-top"><span class="live-dot"></span>从生活现象，看进微观世界</div>
        <div class="discovery-label label-bottom">${icon('atom')}动手改变条件，让变化自己说话</div>
        <span class="art-caption">PHENOMENON → EXPLORATION → INSIGHT</span>
      </div>
    </section>
    <section class="next-learning" style="--unit-color:${unit.color}">
      <div class="next-icon">${icon(next ? unit.icon : 'spark')}</div>
      <div class="next-copy">
        <div class="eyebrow">${nextEyebrow}</div>
        <h2>${next ? next.title : '挑一个你感兴趣的话题继续探索'}</h2>
        <p>${next
          ? `${cleanHook(next.hook)}（${unit.title} · ${next.level} · 约 ${next.minutes} 分钟）`
          : '不按顺序也没关系，随时点开任意实验或生活主题。'}</p>
      </div>
      <a class="secondary-action" href="${next ? `#lesson/${next.slug}` : '#courses'}">${next ? '去看看为什么' : '逛逛全部现象'}${icon('arrow')}</a>
    </section>
    <section class="path-section">
      ${sectionHeading('EVERYDAY & INDUSTRIAL THEMES', '从生活到工厂：5 条跨章节趣味主题线', html`<a class="text-action" href="#courses">在目录中按主题筛选 →</a>`)}
      <p class="section-description">不想按课本章节走？挑一个你熟悉的日常事物，一路看它怎样从厨房、饮料瓶走进真实的现代工厂。</p>
      <div class="theme-grid">${themes.map(themeCard)}</div>
    </section>
    <section class="path-section">
      ${sectionHeading('STEP-BY-STEP CHAPTERS', '由浅入深：7 个化学认知阶梯', html`<a class="text-action" href="#path">展开完整路径 →</a>`)}
      <p class="section-description">如果你想系统打好基础：先看微观积木，再认清元素脾气与反应规律，最后把知识合起来解决工业问题。</p>
      <div class="unit-grid">${units.map(unitCard)}</div>
    </section>
    <section class="home-bottom">
      <div>
        ${sectionHeading('HOW TO EXPLORE', '先看见，再真正理解')}
        <div class="method-grid">
          <article><span>01</span><h3>从生活悬念进入</h3><p>每一课都从一个日常现象或真实工业难题开始。</p></article>
          <article><span>02</span><h3>先看演示，再自己动手</h3><p>「看懂原理」自动演示因果，「自由实验台」任你调节参数。</p></article>
          <article><span>03</span><h3>用一句话讲明白</h3><p>做一道轻量概念问答，把看过的现象变成自己的直觉。</p></article>
        </div>
      </div>
      <a class="element-promo" href="#elements">
        <span class="element-tile"><small>6</small><strong>C</strong><span>碳 · Carbon</span></span>
        <div class="eyebrow">随时可查的探索地图</div>
        <h3>元素周期表</h3>
        <p>性质热力图、3D 电子云与元素百科，放在同一张画布里。</p>
        <span class="text-action">打开元素工具 ${icon('arrow')}</span>
      </a>
    </section>`);

  document.getElementById('random-curiosity')?.addEventListener('click', () => {
    const picked = randomLesson(next?.slug);
    location.hash = `lesson/${picked.slug}`;
  });
}
