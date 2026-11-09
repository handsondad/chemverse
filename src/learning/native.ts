import type { Lesson } from './catalog';
import { queryElement } from '../utils/dom';

function atomCircle(x: number, y: number, color: string, label: string, radius = 19): string {
  return `<g><circle cx="${x}" cy="${y}" r="${radius}" fill="${color}" stroke="#1c272133" stroke-width="1.5"/><text x="${x}" y="${y + 5}" text-anchor="middle" fill="#14231c" font-size="14" font-weight="650">${label}</text></g>`;
}

const red = '#f2a59c';
const white = '#f3f6f4';
const blue = '#9dbdf2';
const green = '#6fc193';

export function mountNative(host: HTMLElement, lesson: Lesson): void {
  if (lesson.cards?.length) renderCards(host, lesson);
  else if (lesson.native === 'matter') renderMatter(host);
  else if (lesson.native === 'atom') renderAtom(host);
  else renderBond(host);
}

function renderCards(host: HTMLElement, lesson: Lesson): void {
  const steps = lesson.cards!;
  host.innerHTML = `<div class="native-experiment"><div class="native-controls"><div class="eyebrow">INTERACTIVE STORY / 步进揭秘</div><h2>${lesson.title}</h2><p>点击下方步骤，从表面现象一步步看进微观原理。</p><div class="native-options story-options" role="group" aria-label="探索步骤">${steps.map((item, index) => `<button type="button" data-card-step="${index}" aria-pressed="${index === 0}"><strong>0${index + 1} · ${item.tag}</strong><span>${item.title}</span></button>`).join('')}</div><div id="card-explanation" class="native-explanation" aria-live="polite"></div></div><div class="native-stage"><span class="stage-label">宏观现象 ⇄ 微观解释</span><div id="card-stage" class="story-stage" aria-live="polite"></div></div></div>`;
  function update(index: number): void {
    const item = steps[index];
    host.querySelectorAll<HTMLButtonElement>('[data-card-step]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.cardStep) === index)));
    queryElement('#card-explanation', host).innerHTML = `<strong>${item.title}</strong><p>${item.phenomenon}</p>`;
    const prevDisabled = index === 0 ? 'disabled' : '';
    const nextDisabled = index === steps.length - 1 ? 'disabled' : '';
    queryElement('#card-stage', host).innerHTML = `<div class="story-card"><div class="story-card-head"><span class="eyebrow">STEP 0${index + 1} / 0${steps.length} · ${item.tag}</span><div class="story-dots">${steps.map((_, i) => `<span class="${i === index ? 'is-active' : ''}"></span>`).join('')}</div></div><h3>${item.title}</h3>${item.formula ? `<div class="story-formula">${item.formula}</div>` : ''}<div class="story-columns"><div><small>👀 看得见的宏观现象</small><p>${item.phenomenon}</p></div><div><small>🔬 看不见的微观过程</small><p>${item.micro}</p></div></div><div class="story-nav"><button type="button" data-story-nav="${index - 1}" ${prevDisabled}>← 上一步</button><button type="button" data-story-nav="${index + 1}" class="story-next" ${nextDisabled}>下一步 →</button></div></div>`;
    host.querySelectorAll<HTMLButtonElement>('[data-story-nav]').forEach(btn => btn.addEventListener('click', () => {
      const target = Number(btn.dataset.storyNav);
      if (target >= 0 && target < steps.length) update(target);
    }));
  }
  host.querySelectorAll<HTMLButtonElement>('[data-card-step]').forEach(button => button.addEventListener('click', () => update(Number(button.dataset.cardStep))));
  update(0);
}

function renderMatter(host: HTMLElement): void {
  const examples = [
    { title: '氧气', formula: 'O₂', type: '纯净物 · 单质', species: '1 种', elements: '1 种', explanation: '所有粒子都是氧分子，每个氧分子由两个氧原子组成。只含一种元素的纯净物是单质。' },
    { title: '纯水', formula: 'H₂O', type: '纯净物 · 化合物', species: '1 种', elements: '2 种', explanation: '所有粒子都是水分子，但每个水分子都含氢、氧两种元素。因此，纯水是化合物，不是混合物。' },
    { title: '空气（简化）', formula: 'N₂ + O₂', type: '混合物', species: '2 种', elements: '2 种', explanation: '这里用氮分子和氧分子简化表示空气。空气含多种物质，是混合物；实际空气还含氩、二氧化碳等。' },
  ];
  host.innerHTML = `<div class="native-experiment"><div class="native-controls"><div class="eyebrow">01 / 选择一份物质</div><h2>用粒子图，重新认识分类</h2><p>先看物质种类，再看元素种类。</p><div class="native-options" role="group" aria-label="选择物质">${examples.map((item, index) => `<button type="button" data-sample="${index}" aria-pressed="${index === 0}"><strong>${item.formula}</strong>${item.title}</button>`).join('')}</div><div id="sample-explanation" class="native-explanation" aria-live="polite"></div><p class="model-note">粒子图为示意，粒子数目、间距和比例不代表实际测量值。</p></div><div class="native-stage"><span class="stage-label">微观观察窗</span><svg id="particle-model" viewBox="0 0 480 340" role="img"></svg><div class="native-reading" id="sample-reading" aria-live="polite"></div></div></div>`;
  function update(index: number): void {
    const example = examples[index];
    host.querySelectorAll<HTMLButtonElement>('[data-sample]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.sample) === index)));
    let drawing = '';
    const positions = [[100, 95], [240, 80], [370, 110], [110, 230], [270, 225], [385, 240]];
    positions.forEach(([x, y], i) => {
      if (index === 1) {
        drawing += `<path d="m${x} ${y} -24 24m24-24 26 24" stroke="#a3b1a9" stroke-width="7"/>${atomCircle(x, y, red, 'O', 23)}${atomCircle(x - 25, y + 25, white, 'H', 15)}${atomCircle(x + 27, y + 25, white, 'H', 15)}`;
      } else {
        const oxygen = index === 0 || i === 4;
        drawing += `<path d="M${x - 18} ${y}h36" stroke="#a3b1a9" stroke-width="8"/>${atomCircle(x - 18, y, oxygen ? red : blue, oxygen ? 'O' : 'N')}${atomCircle(x + 18, y, oxygen ? red : blue, oxygen ? 'O' : 'N')}`;
      }
    });
    const svg = queryElement<SVGSVGElement>('#particle-model', host);
    svg.innerHTML = drawing;
    svg.setAttribute('aria-label', `${example.title}粒子示意：${example.type}`);
    queryElement('#sample-explanation', host).innerHTML = `<strong>${example.type}</strong><p>${example.explanation}</p>`;
    queryElement('#sample-reading', host).innerHTML = `<span>图示物质<strong>${example.species}</strong></span><span>图示元素<strong>${example.elements}</strong></span>`;
  }
  host.querySelectorAll<HTMLButtonElement>('[data-sample]').forEach(button => button.addEventListener('click', () => update(Number(button.dataset.sample))));
  update(0);
}

function renderAtom(host: HTMLElement): void {
  const atoms = [
    { z: 1, symbol: 'H', name: '氢', shells: [1] },
    { z: 6, symbol: 'C', name: '碳', shells: [2, 4] },
    { z: 8, symbol: 'O', name: '氧', shells: [2, 6] },
    { z: 11, symbol: 'Na', name: '钠', shells: [2, 8, 1] },
    { z: 17, symbol: 'Cl', name: '氯', shells: [2, 8, 7] },
  ];
  host.innerHTML = `<div class="native-experiment"><div class="native-controls"><div class="eyebrow">02 / 进入原子内部</div><h2>元素的身份，由什么决定？</h2><p>选择一个中性原子，观察质子数与核外电子。</p><label class="field-label" for="atom-select">选择元素</label><select id="atom-select">${atoms.map((atom, i) => `<option value="${i}" ${i === 1 ? 'selected' : ''}>${atom.z} · ${atom.name} ${atom.symbol}</option>`).join('')}</select><div id="atom-reading" class="native-explanation" aria-live="polite"></div><a class="text-action" href="#elements">在完整周期表中继续观察 →</a><p class="model-note">电子层示意图不是真实轨道；不按实际尺寸绘制。这里仅展示所选中性原子的电子排布。</p></div><div class="native-stage"><span class="stage-label">中性原子 · 电子层模型</span><svg id="atom-model" viewBox="0 0 480 380" role="img"></svg><div class="model-legend"><span><i style="background:#6fc193"></i>核外电子</span><span><i style="background:#edc18b"></i>原子核（示意）</span></div></div></div>`;
  function update(index: number): void {
    const atom = atoms[index];
    let drawing = '';
    atom.shells.forEach((count, shell) => {
      const radius = 65 + shell * 44;
      drawing += `<circle cx="240" cy="185" r="${radius}" fill="none" stroke="#a3bcad" stroke-width="1.5" stroke-dasharray="4 5"/>`;
      for (let i = 0; i < count; i++) {
        const angle = 2 * Math.PI * i / count - Math.PI / 2;
        drawing += `<circle cx="${240 + Math.cos(angle) * radius}" cy="${185 + Math.sin(angle) * radius}" r="7" fill="${green}"/>`;
      }
    });
    drawing += atomCircle(240, 185, '#edc18b', atom.symbol, 32);
    const svg = queryElement<SVGSVGElement>('#atom-model', host);
    svg.innerHTML = drawing;
    svg.setAttribute('aria-label', `${atom.name}原子，质子数${atom.z}，电子数${atom.z}，电子层排布${atom.shells.join('、')}`);
    queryElement('#atom-reading', host).innerHTML = `<strong>${atom.name} · 原子序数 ${atom.z}</strong><dl><div><dt>核内质子数</dt><dd>${atom.z}</dd></div><div><dt>核外电子数</dt><dd>${atom.z}</dd></div><div><dt>电子层排布</dt><dd>${atom.shells.join(' · ')}</dd></div></dl><p>中性原子中，质子数 = 电子数。改变质子数，元素的身份就改变了。</p>`;
  }
  queryElement('#atom-select', host).addEventListener('change', event => update(Number((event.target as HTMLSelectElement).value)));
  update(1);
}

function renderBond(host: HTMLElement): void {
  host.innerHTML = `<div class="native-experiment"><div class="native-controls"><div class="eyebrow">03 / 原子之间的连接</div><h2>转移，还是共用？</h2><div class="native-options" role="group" aria-label="选择化学键模型"><button type="button" data-bond="ionic" aria-pressed="true"><strong>NaCl</strong>电子转移</button><button type="button" data-bond="covalent" aria-pressed="false"><strong>H₂</strong>电子共用</button></div><label class="field-label" for="bond-progress">拖动观察示意过程 <output id="bond-output">0%</output></label><input id="bond-progress" type="range" min="0" max="100" step="1" value="0"><div id="bond-reading" class="native-explanation" aria-live="polite"></div><p class="model-note">这是成键概念示意，不表示真实反应路径、轨道或能量变化。NaCl 固体是离子晶体，不是独立分子。</p></div><div class="native-stage"><span class="stage-label">化学键 · 概念模型</span><svg id="bond-model" viewBox="0 0 480 340" role="img"></svg><div class="model-legend"><span><i style="background:#6fc193"></i>示意电子</span><span>只追踪与成键相关的电子</span></div></div></div>`;
  let mode = 'ionic';
  let progress = 0;
  function update(): void {
    const ratio = progress / 100;
    let drawing: string;
    if (mode === 'ionic') {
      const electronX = 162 + 140 * ratio;
      drawing = `<path d="M170 126Q240 70 308 126" fill="none" stroke="#8aa898" stroke-width="2" stroke-dasharray="5 6"/>${atomCircle(140, 180, '#edc18b', progress === 100 ? 'Na⁺' : 'Na', 48)}${atomCircle(335, 180, green, progress === 100 ? 'Cl⁻' : 'Cl', 53)}<circle cx="${electronX}" cy="${135 - Math.sin(Math.PI * ratio) * 38}" r="8" fill="${green}" stroke="#1c2721" stroke-width="2"/><text x="240" y="285" fill="#35433b" text-anchor="middle" font-size="15">${progress === 100 ? '形成离子 → 相反电荷之间的静电作用' : '观察一个电子从钠原子转移给氯原子'}</text>`;
    } else {
      const left = 130 + ratio * 52;
      const right = 350 - ratio * 52;
      drawing = `<circle cx="${left}" cy="175" r="76" fill="#1f6b550d" stroke="#a8ccb8"/><circle cx="${right}" cy="175" r="76" fill="#1f6b550d" stroke="#a8ccb8"/>${atomCircle(left, 175, white, 'H', 27)}${atomCircle(right, 175, white, 'H', 27)}<circle cx="${left + 32 + ratio * 21}" cy="160" r="7" fill="${green}"/><circle cx="${right - 32 - ratio * 21}" cy="190" r="7" fill="${green}"/><text x="240" y="305" fill="#35433b" text-anchor="middle" font-size="15">${progress === 100 ? '共用一对电子，形成共价键' : '观察两个氢原子如何共用一对电子'}</text>`;
    }
    const svg = queryElement<SVGSVGElement>('#bond-model', host);
    svg.innerHTML = drawing;
    svg.setAttribute('aria-label', `${mode === 'ionic' ? '氯化钠离子键' : '氢分子共价键'}示意，进度${progress}%`);
    queryElement('#bond-output', host).textContent = `${progress}%`;
    queryElement('#bond-reading', host).innerHTML = mode === 'ionic'
      ? '<strong>离子键 · 电子发生转移</strong><p>钠原子失去电子形成 Na⁺，氯原子得到电子形成 Cl⁻。两种离子之间存在静电作用；在固体中它们会有规则地排列。</p>'
      : '<strong>共价键 · 电子被共同拥有</strong><p>两个氢原子共用一对电子形成氢分子。电子不是固定在小球上的点，图中仅用两个点帮助理解“共用”。</p>';
  }
  host.querySelectorAll<HTMLButtonElement>('[data-bond]').forEach(button => button.addEventListener('click', () => {
    mode = button.dataset.bond!;
    host.querySelectorAll<HTMLButtonElement>('[data-bond]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    update();
  }));
  queryElement('#bond-progress', host).addEventListener('input', event => {
    progress = Number((event.target as HTMLInputElement).value);
    update();
  });
  update();
}
