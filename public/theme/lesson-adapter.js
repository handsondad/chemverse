(() => {
  const embedded = window.parent !== window;
  const post = data => {
    if (embedded) window.parent.postMessage(data, '*');
  };
  const notify = type => post({ type });
  const params = new URLSearchParams(location.search);
  const watchEnabled = params.has('cv-mode');
  if (params.get('cv-mode') === 'watch') document.documentElement.dataset.cvMode = 'watch';
  let ready = false;
  const fail = () => {
    if (ready) return;
    console.error('ChemVerse: the simulation did not initialize.');
    notify('chemverse:error');
    let message = document.getElementById('cv-startup-error');
    if (!message) {
      message = document.createElement('p');
      message.id = 'cv-startup-error';
      message.setAttribute('role', 'alert');
      message.textContent = '实验未能启动。请刷新页面，或检查浏览器是否支持 WebGL 2。';
      document.body.append(message);
    }
  };
  const deadline = setTimeout(() => { clearInterval(wait); fail(); }, 24000);
  const wait = setInterval(() => {
    const lab = window.__lab;
    if (!lab?.renderer?.domElement?.width || !Array.isArray(lab.STEPS) ||
        typeof lab.step !== 'function' || typeof lab.goto !== 'function' ||
        !document.querySelector('#left .pbody') || !document.querySelector('#right .pbody')) return;
    clearInterval(wait);
    clearTimeout(deadline);
    ready = true;
    install(lab);
    warmScene(lab);
    notify('chemverse:ready');
  }, 100);

  /** 课件文案里给老师看的教材引注（「（教材原话）」「教材 p.34：」），孩子读的时候不需要 */
  const readable = text => String(text ?? '')
    .replace(/（[^（）]*教材[^（）]*）/g, '')
    .replace(/（p\.\s*\d+）/g, '')
    .replace(/教材(?:脚注)?(?:原话|\s*p\.\s*\d+)\s*[：:]\s*/g, '')
    .replace(/^教材(只)?给了/, '实验台上$1摆了')
    .replace(/\s{2,}/g, ' ')
    .trim();

  // 和网站同一块暖白纸面：只换天空球和远处的雾，实验器材、溶液、火焰的颜色不动。
  // 有的课件换步骤时会重设雾色、换场景，所以隔一会儿再看一眼。
  const SKY = { top: '#ffe9c9', mid: '#fff3df', hor: '#fffaf2', lil: '#fff1e4', haze: '#fff1e4' };
  const FOG = '#fbf0e3';
  function warmScene(lab) {
    const done = new WeakSet();
    const paint = () => {
      const scene = lab.scene;
      if (!scene?.traverse) return;
      if (scene.fog?.color?.set) scene.fog.color.set(FOG);
      scene.traverse(node => {
        const material = node.material;
        if (!material || done.has(material) || !material.uniforms || material.side !== 1) return;
        const { uniforms } = material;
        if (!uniforms.top?.value?.isColor || !uniforms.hor?.value?.isColor) return;
        for (const [key, color] of Object.entries(SKY)) {
          if (uniforms[key]?.value?.isColor) uniforms[key].value.set(color);
        }
        done.add(material);
      });
    };
    paint();
    setInterval(paint, 1500);
  }

  function install(lab) {
    const root = document.documentElement;
    const left = document.getElementById('left');
    const right = document.getElementById('right');
    const steps = document.getElementById('steps');
    const note = document.querySelector('#foot .note');
    if (note) {
      const details = document.createElement('details');
      details.id = 'cv-model-note';
      const summary = document.createElement('summary');
      summary.textContent = '模型边界与示意说明';
      const paragraph = document.createElement('p');
      paragraph.textContent = note.textContent;
      details.append(summary, paragraph);
      left.append(details);
    }
    const nav = document.createElement('nav');
    nav.id = 'cv-views';
    nav.setAttribute('aria-label', '实验视图');
    for (const [view, title] of [['scene', '场景'], ['controls', '操作'], ['guide', '讲解']]) {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.view = view;
      button.textContent = title;
      button.addEventListener('click', () => selectView(view));
      nav.append(button);
    }
    const chooser = document.createElement('label');
    chooser.id = 'cv-step-picker';
    const label = document.createElement('span');
    label.textContent = '探索步骤';
    const score = document.querySelector('.hud .score');
    if (score) {
      const syncScore = () => { label.textContent = `步骤 · ${score.textContent.trim()}`; };
      new MutationObserver(syncScore).observe(score, { childList: true, subtree: true, characterData: true });
      syncScore();
    }
    const select = document.createElement('select');
    select.setAttribute('aria-label', '选择实验探索步骤');
    lab.STEPS.forEach((step, index) => {
      const option = document.createElement('option');
      option.value = String(index);
      option.textContent = `${index + 1} / ${lab.STEPS.length} · ${step.tag}`;
      select.append(option);
    });
    select.addEventListener('change', () => {
      const index = Number(select.value);
      if (Number.isInteger(index) && index >= 0 && index < lab.STEPS.length) lab.goto(index);
    });
    chooser.append(label, select);
    document.body.append(nav, chooser);
    const media = window.matchMedia('(max-width: 1100px)');
    const sideCard = window.matchMedia('(min-width: 760px)');
    let savedCollapse = null;
    let compact = false;
    let view = 'scene';
    // The canvas remains viewport-sized and the original camera frames the
    // scene between the uncollapsed panels. Overlay panels count as collapsed;
    // in watch mode the invisible right panel reserves the explanation card.
    function forcedCollapse() {
      if (root.dataset.cvMode === 'watch') return [true, !sideCard.matches];
      return compact ? [true, true] : null;
    }
    function syncPanels() {
      const forced = forcedCollapse();
      if (forced) {
        savedCollapse ??= [left.classList.contains('collapsed'), right.classList.contains('collapsed')];
        left.classList.toggle('collapsed', forced[0]);
        right.classList.toggle('collapsed', forced[1]);
      } else if (savedCollapse) {
        const [leftCollapsed, rightCollapsed] = savedCollapse;
        savedCollapse = null;
        left.classList.toggle('collapsed', leftCollapsed);
        right.classList.toggle('collapsed', rightCollapsed);
      }
      window.dispatchEvent(new Event('resize'));
    }
    // The original camera aims at the viewport centre. With only the right
    // panel reserved, shift the projection so the scene centres in the free area.
    function centreCamera() {
      const camera = lab.camera;
      if (!camera?.setViewOffset) return;
      const forced = forcedCollapse();
      if (forced && !forced[1]) {
        const free = lab.freeRect();
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.setViewOffset(width, height, width / 2 - (free.l + free.r) / 2, 0, width, height);
      } else if (camera.view) {
        camera.clearViewOffset();
      }
    }
    window.addEventListener('resize', centreCamera);
    function selectView(next) {
      view = next;
      root.dataset.cvView = view;
      nav.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.view === view)));
      syncPanels();
    }
    function resize() {
      if (media.matches === compact) return;
      compact = media.matches;
      root.classList.toggle('cv-compact', compact);
      syncPanels();
    }
    media.addEventListener('change', resize);
    sideCard.addEventListener('change', () => { if (root.dataset.cvMode === 'watch') syncPanels(); });
    selectView(view);
    resize();
    function syncStep() {
      const index = lab.step();
      if (Number.isInteger(index) && index >= 0 && index < lab.STEPS.length) select.value = String(index);
    }
    new MutationObserver(syncStep).observe(steps, { attributes: true, subtree: true, childList: true });
    syncStep();
    [left, right].forEach((panel, index) => {
      new MutationObserver(() => {
        const forced = forcedCollapse();
        if (forced && panel.classList.contains('collapsed') !== forced[index]) {
          panel.classList.toggle('collapsed', forced[index]);
        }
      }).observe(panel, { attributes: true, attributeFilter: ['class'] });
    });
    if (watchEnabled) installWatch(lab, syncPanels);
  }

  /**
   * "看懂原理" mode: plays each step's own authored demo (start state, demo
   * value, expected observation and conclusion) without the console panels.
   */
  function installWatch(lab, syncPanels) {
    const root = document.documentElement;
    const segments = lab.STEPS
      .map((step, index) => ({ step, index }))
      .filter(({ step }) => step.act?.kind !== 'hold');
    if (!segments.length) {
      delete root.dataset.cvMode;
      syncPanels();
      post({ type: 'chemverse:mode', mode: 'lab' });
      return;
    }
    const watching = () => root.dataset.cvMode === 'watch';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const speech = 'speechSynthesis' in window ? window.speechSynthesis : null;
    let narrate = params.get('cv-narration') === '1';
    let voice = null;
    let current = 0;
    let run = 0;

    const element = (tag, props = {}, ...children) => {
      const node = document.createElement(tag);
      Object.assign(node, props);
      node.append(...children);
      return node;
    };
    const button = (text, className, onClick) => {
      const node = element('button', { type: 'button', className, textContent: text });
      node.addEventListener('click', onClick);
      return node;
    };

    const progress = element('span', { className: 'cvw-progress' });
    const dots = element('div', { className: 'cvw-dots' });
    const voiceButton = button('朗读', 'cvw-voice', () => {
      narrate = !narrate;
      syncVoice();
      post({ type: 'chemverse:narration', on: narrate });
      if (narrate) say(segments[current].step.q);
      else speech?.cancel();
    });
    voiceButton.hidden = true;
    const question = element('h2', { className: 'cvw-question' });
    const equation = element('p', { className: 'cvw-eq' });
    const readingLabel = element('span');
    const readingValue = element('strong');
    const reading = element('p', { className: 'cvw-reading' }, readingLabel, readingValue);
    const status = element('p', { className: 'cvw-status' });
    const seen = element('p', { className: 'cvw-seen' });
    const conclusion = element('p', { className: 'cvw-concl' });
    // 和文章一样：小念提问，爸爸指着实验台讲；头像由外面的网站传进来，独立打开时用名字里的一个字
    const avatars = {
      nian: element('span', { className: 'cvw-avatar', textContent: '念' }),
      dad: element('span', { className: 'cvw-avatar', textContent: '爸' }),
    };
    const line = (who, name, ...children) => element('div', { className: `cvw-line is-${who}` },
      avatars[who],
      element('div', { className: 'cvw-bubble' }, element('span', { className: 'cvw-name', textContent: name }), ...children));
    const body = element('div', { className: 'cvw-body' },
      line('nian', '小念', question),
      line('dad', '爸爸', equation, reading, status, seen, conclusion));
    body.setAttribute('aria-live', 'polite');
    const previous = button('← 上一段', 'cvw-btn', () => play(current - 1));
    const replay = button('↻ 再看一遍', 'cvw-btn', () => play(current));
    const next = button('下一段 →', 'cvw-btn cvw-primary', () => {
      if (current < segments.length - 1) play(current + 1);
      else post({ type: 'chemverse:go-check' });
    });
    const toLab = button('我想自己动手 ›', 'cvw-link', () => setMode('lab', true));
    const card = element('section', { id: 'cv-watch' },
      element('div', { className: 'cvw-meta' }, progress, dots, voiceButton),
      body,
      element('div', { className: 'cvw-actions' }, previous, replay, next, element('span', { className: 'cvw-spacer' }), toLab));
    card.setAttribute('aria-label', '看懂原理 · 分段演示');
    segments.forEach(({ step }, index) => {
      const dot = button('', 'cvw-dot', () => play(index));
      dot.setAttribute('aria-label', `第 ${index + 1} 段：${step.tag}`);
      dots.append(dot);
    });
    const toWatch = element('button', { type: 'button', className: 'btn', id: 'cv-to-watch', textContent: '看懂原理' });
    toWatch.addEventListener('click', () => setMode('watch', true));
    document.querySelector('.hud')?.prepend(toWatch);
    document.body.append(card);

    // The live main reading sits in the hidden console; mirror it on the card.
    const consolePanel = document.getElementById('right');
    let readingFrame = 0;
    const syncReading = () => {
      readingFrame = 0;
      const kpi = consolePanel.querySelector('.kpi');
      const label = kpi?.querySelector('.lb')?.textContent.trim();
      const value = kpi?.querySelector('.vv')?.textContent.trim();
      reading.hidden = !label || !value;
      readingLabel.textContent = label ?? '';
      readingValue.textContent = value ?? '';
    };
    new MutationObserver(() => {
      readingFrame ||= window.requestAnimationFrame(syncReading);
    }).observe(consolePanel, { childList: true, subtree: true, characterData: true });
    syncReading();

    function syncVoice() {
      voiceButton.textContent = narrate ? '朗读：开' : '朗读：关';
      voiceButton.setAttribute('aria-pressed', String(narrate));
    }
    function pickVoice() {
      const voices = speech?.getVoices() ?? [];
      voice = voices.find(v => /^zh[-_]CN/i.test(v.lang)) ?? voices.find(v => /^zh/i.test(v.lang)) ?? null;
      voiceButton.hidden = !voice;
    }
    speech?.addEventListener?.('voiceschanged', pickVoice);
    pickVoice();
    syncVoice();
    function say(text) {
      if (!narrate || !voice || !text) return;
      const utterance = new SpeechSynthesisUtterance(text.replace(/→/g, '，'));
      utterance.voice = voice;
      utterance.lang = voice.lang;
      speech.speak(utterance);
    }

    const pause = (ms, token) => new Promise(resolve => setTimeout(() => resolve(token === run), ms));
    async function tween(key, target, token) {
      const from = Number(lab.S?.[key]);
      if (!Number.isFinite(from) || reducedMotion.matches) {
        lab.set(key, target);
        return token === run;
      }
      const frames = 30;
      for (let frame = 1; frame <= frames; frame++) {
        if (!(await pause(1600 / frames, token))) return false;
        const t = frame / frames;
        const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
        const value = from + (target - from) * eased;
        lab.set(key, frame === frames ? target : value);
      }
      return true;
    }
    // goto() eases into the step's start state; lab.set() cancels that ease,
    // so pin the authored start values before the demo moves anything.
    function settleStart(start) {
      for (const [key, value] of Object.entries(start ?? {})) {
        if (lab.S?.[key] === value) continue;
        if (typeof value === 'boolean') lab.setSwitch(key, value);
        else lab.set(key, value);
      }
    }
    async function demonstrate(act, token) {
      if (act?.kind === 'slider' && act.key) {
        const target = Number(act.demo ?? act.to);
        if (Number.isFinite(target)) return tween(act.key, target, token);
      }
      if (act?.kind === 'toggle' && act.key) {
        if ('want' in act) lab.setSwitch(act.key, act.want);
        else lab.toggle?.(act.key);
      }
      if (act?.kind === 'custom' && typeof act.demo === 'function') {
        try { await act.demo(lab.ctx ?? lab); } catch { /* ignore demo error */ }
      }
      return token === run;
    }
    const conclusionText = concl => (typeof concl === 'string' ? concl : concl?.text ?? '');

    async function play(index) {
      if (index < 0 || index >= segments.length) return;
      const token = ++run;
      current = index;
      post({ type: 'chemverse:step', step: index });
      speech?.cancel();
      const { step } = segments[index];
      progress.textContent = `第 ${index + 1} / ${segments.length} 段 · ${step.tag}`;
      dots.querySelectorAll('button').forEach((dot, i) => {
        if (i === index) dot.setAttribute('aria-current', 'step');
        else dot.removeAttribute('aria-current');
      });
      question.textContent = readable(step.q);
      equation.textContent = [step.eq, step.eqCal].filter(Boolean).join(' · ');
      equation.hidden = !step.eq;
      status.textContent = '你先看实验台，我慢慢做给你看…';
      status.hidden = false;
      seen.hidden = true;
      conclusion.hidden = true;
      previous.disabled = index === 0;
      replay.disabled = true;
      next.textContent = index < segments.length - 1 ? '下一段 →' : embedded ? '小念还想问 →' : '演示结束';
      next.disabled = index === segments.length - 1 && !embedded;
      lab.goto(segments[index].index);
      say(readable(step.q));
      if (!(await pause(1000, token))) return;
      settleStart(step.start);
      if (!(await demonstrate(step.act, token))) return;
      if (!(await pause(1400, token))) return;
      const expected = readable(step.expect?.text);
      if (expected) {
        seen.replaceChildren(element('strong', { textContent: '👀 你看到' }), expected);
        seen.hidden = false;
        status.hidden = true;
        say(expected);
        if (!(await pause(2200, token))) return;
      }
      const concl = readable(conclusionText(step.concl));
      if (concl) {
        lab.reveal?.();
        conclusion.replaceChildren(element('strong', { textContent: '💡 所以' }), concl);
        conclusion.hidden = false;
        say(concl);
      }
      status.hidden = true;
      replay.disabled = false;
    }
    function stop() {
      run++;
      speech?.cancel();
    }
    function setMode(mode, announce) {
      if (mode === (watching() ? 'watch' : 'lab')) return;
      if (mode === 'watch') root.dataset.cvMode = 'watch';
      else delete root.dataset.cvMode;
      toWatch.hidden = mode === 'watch';
      syncPanels();
      if (mode === 'watch') {
        const found = segments.findIndex(({ index }) => index === lab.step());
        play(found === -1 ? 0 : found);
      } else {
        stop();
      }
      if (announce) post({ type: 'chemverse:mode', mode });
    }

    window.addEventListener('message', event => {
      if (!embedded || event.source !== window.parent) return;
      const data = event.data;
      if (data?.type === 'chemverse:avatars') {
        for (const who of ['nian', 'dad']) {
          if (typeof data[who] !== 'string') continue;
          avatars[who].innerHTML = data[who];
          avatars[who].classList.add('has-art');
        }
      }
      if (data?.type === 'chemverse:set-mode' && (data.mode === 'watch' || data.mode === 'lab')) setMode(data.mode, false);
      if (data?.type === 'chemverse:play-step' && Number.isInteger(data.step)) {
        if (!watching()) {
          root.dataset.cvMode = 'watch';
          toWatch.hidden = true;
          syncPanels();
          post({ type: 'chemverse:mode', mode: 'watch' });
        }
        play(data.step);
      }
    });
    toWatch.hidden = watching();
    if (watching()) play(0);
  }
})();
