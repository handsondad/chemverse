import { unitLessons, units, type Lesson, type Unit } from '../catalog';
import { levelStars, topicCount } from '../components';
import { html, setHtml, type SafeHtml } from '../html';
import { isStarted } from '../store';
import { avatar } from '../../series/avatar';

const GROUPS: { level: Lesson['level']; hint: string }[] = [
  { level: '入门', hint: '一听就懂的小问题' },
  { level: '进阶', hint: '要多想一步：谁和谁在接力？' },
  { level: '综合', hint: '藏得更深的问题，大人也常常答不全' },
];

function questionCard(lesson: Lesson): SafeHtml {
  const heard = isStarted(lesson.slug);
  const { article } = lesson;
  return html`
    <a class="qlist-card ${heard ? 'is-heard' : ''}" href="#q/${lesson.slug}">
      <strong>${article.title}</strong>
      <span class="qlist-trigger">${article.trigger}</span>
      <span class="qlist-badges">
        <em>💬 ${article.turns.length} 问 ${article.turns.length} 答</em>
        ${article.film ? html`<em class="is-film">🎬 讲解动画</em>` : article.turns.some(turn => turn.figure) ? html`<em class="is-figure">🖼️ 图解</em>` : ''}
        ${heard ? html`<em class="is-star">⭐ 看过</em>` : ''}
      </span>
    </a>`;
}

export function renderTopic(content: HTMLElement, unit: Unit): void {
  const items = unitLessons(unit.id);
  const { total, seen } = topicCount(unit.id);
  setHtml(content, html`
    <div class="qlist" style="--bubble:${unit.color}">
      <header class="page-top">
        <a class="page-back" href="#home">← 回到首页</a>
        <div>
          <span>${total} 个问题${seen ? ` · 看过 ${seen} 个` : ''}</span>
          <h1><span aria-hidden="true">${unit.emoji}</span> ${unit.title}</h1>
        </div>
      </header>

      <div class="qlist-intro">
        <p>${avatar('nian')}<b>小念：</b>${unit.kidHook}</p>
        <p>${avatar('dad')}<b>爸爸：</b>这一类其实都在讲${unit.dadLens}。挑一个问题，我们从头聊到底。</p>
      </div>

      ${GROUPS.map(group => {
        const list = items.filter(item => item.level === group.level);
        return list.length ? html`
          <section class="qlist-group">
            <h2>${levelStars(group.level)} ${group.level} <small>${group.hint}</small></h2>
            <div class="qlist-grid">${list.map(questionCard)}</div>
          </section>` : '';
      })}

      <nav class="qlist-other" aria-label="换一个主题">
        <h2>换一个主题</h2>
        <div class="qlist-chips">
          ${units.map(item => html`
            <a href="#topic/${item.id}" ${item.id === unit.id ? html`aria-current="page"` : ''}>${item.emoji} ${item.title}</a>`)}
        </div>
      </nav>
    </div>`);
}
