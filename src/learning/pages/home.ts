import { labs, lessons, units } from '../catalog';
import { firstSentence, topicCount } from '../components';
import { html, setHtml } from '../html';
import { avatar } from '../../series/avatar';
import type { DuoStage } from '../../series/duo-stage';
import { canUseWebGL } from '../../series/webgl';
import { getElement, queryElement } from '../../utils/dom';

let stage: DuoStage | undefined;
let alive = 0;

export function leaveHome(): void {
  alive += 1;
  stage?.destroy();
  stage = undefined;
}

export function renderHome(content: HTMLElement): void {
  leaveHome();
  const visit = alive;
  const picks = [...lessons.filter(item => item.story), ...lessons.filter(item => !item.story)];
  let at = 0;

  setHtml(content, html`
    <div class="home">
      <header class="home-title">
        <h1><span aria-hidden="true">🧪</span> 化学奇遇记</h1>
        <p>小念一问，爸爸一答，把身边的化学看个明白</p>
      </header>

      <section class="home-duo" aria-labelledby="duo-title">
        <h2 class="home-section-title" id="duo-title">小念和爸爸探索化学的奥秘</h2>
        <div class="home-planet" id="home-planet">
          <div class="home-planet-flat" aria-hidden="true"><span>${avatar('dad')}</span><span>${avatar('nian')}</span></div>
          <button type="button" class="home-bubble is-nian" id="duo-nian" title="点一下，换一个问题"><b>小念</b><span></span></button>
          <button type="button" class="home-bubble is-dad" id="duo-dad" title="点一下，换一个问题"><b>爸爸</b><span></span></button>
        </div>
        <div class="home-planet-actions">
          <a class="home-go" id="duo-go" href="#home">听爸爸讲完 →</a>
          <button type="button" class="home-next" id="duo-next">换一个问题 ↻</button>
        </div>
      </section>

      <section aria-labelledby="topics-title">
        <h2 class="home-section-title" id="topics-title">化学主题</h2>
        <div class="home-topics">
          ${units.map(unit => {
            const { total, seen } = topicCount(unit.id);
            return html`
              <a class="topic-card" href="#topic/${unit.id}" style="--bubble:${unit.color}">
                <span class="topic-emoji" aria-hidden="true">${unit.emoji}</span>
                <strong>${unit.title}</strong>
                <small>${unit.kidHook}</small>
                <span class="topic-count">${total} 个问题${seen ? ` · ⭐ 看过 ${seen} 个` : ''} →</span>
              </a>`;
          })}
          <a class="topic-card is-labs" href="#labs" style="--bubble:#1f6b55">
            <span class="topic-emoji" aria-hidden="true">🧪</span>
            <strong>3D 实验台</strong>
            <small>听完爸爸讲，自己动手做一做：所有实验都在这里</small>
            <span class="topic-count">${labs.length} 个实验 →</span>
          </a>
        </div>
      </section>
    </div>`);

  const nian = queryElement('#duo-nian span', content);
  const dad = queryElement('#duo-dad span', content);
  const go = getElement<HTMLAnchorElement>('duo-go');
  function show(): void {
    const lesson = picks[at % picks.length];
    nian.textContent = lesson.article.title;
    dad.textContent = firstSentence(lesson.article.turns[0].dad);
    go.href = `#q/${lesson.slug}`;
  }
  function next(): void {
    at += 1;
    show();
    stage?.cheer();
  }
  ['duo-nian', 'duo-dad', 'duo-next'].forEach(id => getElement(id).addEventListener('click', next));
  show();

  if (!canUseWebGL()) return;
  const planet = getElement('home-planet');
  void import('../home-planet')
    .then(({ mountChemPlanet }) => mountChemPlanet(planet, next))
    .then(duo => {
      if (visit !== alive) {
        duo.destroy();
        return;
      }
      stage = duo;
      planet.classList.add('is-3d');
    })
    .catch((error: unknown) => console.warn('化学小星球没能加载，先用平面头像。', error));
}
