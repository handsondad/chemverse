import { findUnit, lessonAsset, themeLessons, unitLessons, type Lesson, type Theme } from './catalog';
import type { Unit } from './curriculum';
import { html, type SafeHtml } from './html';
import { isCompleted, isStarted } from './store';
import { chapterArt, icon } from './visuals';

export function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export function completeCount(unitId: string): number {
  return unitLessons(unitId).filter(lesson => isCompleted(lesson.slug)).length;
}

export function lessonKind(lesson: Lesson): string {
  return lesson.kind === 'native' ? (lesson.cards?.length ? '趣味揭秘' : '交互模型') : '3D 实验';
}

export function lessonOrder(lesson: Lesson, index: number): SafeHtml | string {
  return isCompleted(lesson.slug) ? icon('check') : pad(index + 1);
}

export function goalList(goals: string[]): SafeHtml {
  return html`<ul class="goal-list">${goals.map(goal => html`<li>${icon('check')}${goal}</li>`)}</ul>`;
}

export function sectionHeading(kicker: string, title: string, link?: SafeHtml): SafeHtml {
  return html`<div class="section-heading"><div><div class="eyebrow">${kicker}</div><h2>${title}</h2></div>${link}</div>`;
}

export function cleanHook(hook: string): string {
  return hook.replace(/^生活中的化学\s*·\s*/, '');
}

export function lessonCard(lesson: Lesson): SafeHtml {
  const unit = findUnit(lesson.unit);
  const done = isCompleted(lesson.slug);
  const status = done ? '✓ 已探索' : isStarted(lesson.slug) ? '继续探索' : '进入探索';
  return html`
    <a class="lesson-card" href="#lesson/${lesson.slug}" style="--unit-color:${unit.color}">
      <div class="lesson-cover">
        ${lesson.cover
          ? html`<img src="${lessonAsset(lesson.cover)}" alt="" loading="lazy" width="640" height="360">`
          : chapterArt(unit.icon)}
        <span class="cover-badge">${lessonKind(lesson)}</span>
        <span class="cover-arrow">${icon('arrow')}</span>
      </div>
      <div class="lesson-card-body">
        <div class="lesson-meta"><span>${unit.title} / ${lesson.level}</span><span>${lesson.minutes} 分钟</span></div>
        <h3>${lesson.title}</h3>
        <p>${cleanHook(lesson.hook)}</p>
        <div class="lesson-card-bottom">
          <span class="${done ? 'completed-label' : ''}">${status}</span>
          ${icon('arrow')}
        </div>
      </div>
    </a>`;
}

export function unitCard(unit: Unit, index: number): SafeHtml {
  const courses = unitLessons(unit.id);
  const count = completeCount(unit.id);
  const stage = index < 2 ? '基础起步' : index === 6 ? '综合应用' : '深入理解';
  const highlights = courses.slice(0, 2).map(item => item.topic).join(' · ');
  return html`
    <a class="unit-card" href="#unit/${unit.id}" style="--unit-color:${unit.color}">
      <div class="unit-card-top">
        <span class="chapter-index">CHAPTER ${pad(index + 1)}</span>
        <span class="unit-icon">${icon(unit.icon)}</span>
      </div>
      <h3>${unit.title}</h3>
      <p>${unit.subtitle}</p>
      <div class="unit-card-bottom">
        <span>${count ? `已探索 ${count} 项 · 共 ${courses.length} 项` : `${highlights} 等 ${courses.length} 个探索`}</span>
        <span>${stage} ${icon('arrow')}</span>
      </div>
    </a>`;
}

export function themeCard(theme: Theme): SafeHtml {
  const courses = themeLessons(theme.id);
  const previews = courses.slice(0, 3).map(item => item.title.split('：')[0]).join(' → ');
  return html`
    <a class="theme-card" href="#courses?theme=${theme.id}" style="--unit-color:${theme.color}">
      <div class="theme-card-top">
        <span class="unit-icon">${icon(theme.icon)}</span>
        <div>
          <span class="eyebrow">${theme.subtitle}</span>
          <h3>${theme.title}</h3>
        </div>
      </div>
      <p>${theme.description}</p>
      <div class="theme-preview">${previews}</div>
      <div class="unit-card-bottom">
        <span>串联 ${courses.length} 个生活与工业现象</span>
        <span>按主题探索 ${icon('arrow')}</span>
      </div>
    </a>`;
}
