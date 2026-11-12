import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { labClipKey } from '../src/learning/voice';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const adapter = readFileSync(resolve(root, 'public', 'theme', 'lesson-adapter.js'), 'utf8');

type State = Record<string, number | boolean>;

const STEPS = [
  { tag: '认识', q: '台面上有什么？', act: { kind: 'orbit' }, start: { V: 1, on: false }, expect: { text: '四站都在（教材 p.34 的注意框）' }, concl: '教材原话：变量控制（教材原话）', eq: 'v = Δc/Δt' },
  { tag: '浓度', q: '教材给了两杯，为什么更慢？', act: { kind: 'slider', key: 'V', to: 1, demo: 3 }, start: { V: 2, on: false }, expect: { text: '时间变长' }, concl: '浓度减小速率减小' },
  { tag: '催化剂', q: '为什么更快？', act: { kind: 'toggle', key: 'on', want: true }, start: { V: 1, on: false }, expect: { text: '气泡变密' }, concl: { text: '催化剂降低活化能' } },
  { tag: '考核', q: '考核', act: { kind: 'hold' }, start: {} },
];

function fakeLab() {
  let current = 0;
  const S: State = { V: 0, on: false };
  return {
    S,
    STEPS,
    renderer: { domElement: { width: 1 } },
    camera: { view: null, setViewOffset: vi.fn(), clearViewOffset: vi.fn() },
    step: () => current,
    // The real goto() eases into the start state; leave it unapplied here.
    goto: vi.fn((index: number) => { current = index; }),
    set: vi.fn((key: string, value: number) => { S[key] = value; }),
    setSwitch: vi.fn((key: string, value: boolean) => { S[key] = value; }),
    reveal: vi.fn(),
    freeRect: () => ({ l: 6, r: 700, t: 12, b: 580 }),
  };
}

const listeners: { type: string; listener: EventListenerOrEventListenerObject }[] = [];
const parentDescriptor = Object.getOwnPropertyDescriptor(window, 'parent') ?? { value: window, configurable: true };
let lab: ReturnType<typeof fakeLab>;

async function load(search: string): Promise<void> {
  window.history.replaceState(null, '', `/lesson.html${search}`);
  new Function(adapter)();
  await vi.advanceTimersByTimeAsync(100);
}

const card = () => document.getElementById('cv-watch')!;
const text = (selector: string) => card().querySelector<HTMLElement>(selector)!;
const action = (label: string) => Array.from(card().querySelectorAll('button')).find(button => button.textContent?.includes(label))!;

describe('lesson adapter watch mode', () => {
  beforeEach(() => {
    window.requestAnimationFrame ??= callback => window.setTimeout(() => callback(performance.now()), 16);
    vi.useFakeTimers();
    const add = window.addEventListener.bind(window);
    vi.spyOn(window, 'addEventListener').mockImplementation((type, listener, options) => {
      listeners.push({ type, listener });
      add(type, listener, options);
    });
    window.matchMedia = vi.fn((query: string) => ({
      matches: query.includes('min-width: 760px'),
      media: query,
      addEventListener() {},
      removeEventListener() {},
    })) as unknown as typeof window.matchMedia;
    document.documentElement.removeAttribute('data-cv-mode');
    document.documentElement.removeAttribute('data-cv-view');
    document.body.innerHTML = `
      <header id="top"><div class="hud"><span class="score">0</span></div></header>
      <nav id="steps"></nav>
      <aside id="left"><div class="pbody"></div></aside>
      <aside id="right"><div class="pbody"><div class="kpi"><div class="lb">浑浊时间</div><div class="vv">20.0 s</div></div></div></aside>
      <footer id="foot"><div class="nav"></div><span class="note">示意</span></footer>`;
    lab = fakeLab();
    (window as unknown as { __lab: unknown }).__lab = lab;
  });

  afterEach(() => {
    for (const { type, listener } of listeners.splice(0)) window.removeEventListener(type, listener);
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
    Reflect.deleteProperty(window, '__lab');
    document.documentElement.classList.remove('cv-simple', 'cv-show-chart', 'cv-compact');
    Object.defineProperty(window, 'parent', parentDescriptor);
  });

  it('plays each authored step with its own start state, demo value, observation and conclusion', async () => {
    await load('?cv-mode=watch&cv-narration=0');
    const html = document.documentElement;
    expect(html.dataset.cvMode).toBe('watch');
    expect(card().querySelectorAll('.cvw-dot')).toHaveLength(3);
    expect(text('.cvw-question').textContent).toBe('台面上有什么？');
    expect(text('.cvw-eq').textContent).toBe('v = Δc/Δt');
    expect(text('.cvw-reading').textContent).toBe('浑浊时间20.0 s');
    expect(document.getElementById('left')!.classList.contains('collapsed')).toBe(true);
    expect(document.getElementById('right')!.classList.contains('collapsed')).toBe(false);
    expect(lab.camera.setViewOffset).toHaveBeenLastCalledWith(innerWidth, innerHeight, innerWidth / 2 - 353, 0, innerWidth, innerHeight);
    expect(document.getElementById('cv-to-watch')!.hidden).toBe(true);

    await vi.advanceTimersByTimeAsync(4600);
    expect(lab.S).toEqual({ V: 1, on: false });
    expect(text('.cvw-seen').hidden).toBe(false);
    expect(text('.cvw-seen').textContent).toBe('👀 你看到四站都在');
    expect(text('.cvw-concl').textContent).toBe('💡 所以变量控制');
    expect(text('.is-nian .cvw-bubble').contains(text('.cvw-question'))).toBe(true);
    expect(text('.is-dad .cvw-bubble').contains(text('.cvw-concl'))).toBe(true);
    expect(lab.reveal).toHaveBeenCalledTimes(1);
    expect(action('再看一遍').disabled).toBe(false);

    document.querySelector('#right .vv')!.textContent = '40.0 s';
    await vi.advanceTimersByTimeAsync(20);
    expect(text('.cvw-reading strong').textContent).toBe('40.0 s');

    action('下一段').click();
    expect(lab.goto).toHaveBeenLastCalledWith(1);
    expect(text('.cvw-question').textContent).toBe('实验台上摆了两杯，为什么更慢？');
    expect(text('.cvw-seen').hidden).toBe(true);
    await vi.advanceTimersByTimeAsync(1000);
    expect(lab.S.V).toBe(2);
    await vi.advanceTimersByTimeAsync(800);
    expect(lab.S.V).toBeGreaterThan(2);
    expect(lab.S.V).toBeLessThan(3);

    card().querySelectorAll<HTMLButtonElement>('.cvw-dot')[2].click();
    await vi.advanceTimersByTimeAsync(6000);
    expect(lab.S).toEqual({ V: 1, on: true });
    expect(lab.setSwitch).toHaveBeenCalledWith('on', true);
    expect(text('.cvw-concl').textContent).toBe('💡 所以催化剂降低活化能');
    expect(action('演示结束').disabled).toBe(true);
    expect(lab.goto).not.toHaveBeenCalledWith(3);
  });

  it('talks to the ChemVerse page only through its parent window', async () => {
    const host = document.createElement('iframe');
    document.body.append(host);
    const parent = host.contentWindow!;
    const post = vi.spyOn(parent, 'postMessage').mockImplementation(() => {});
    Object.defineProperty(window, 'parent', { value: parent, configurable: true });
    const played: HTMLMediaElement[] = [];
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(function (this: HTMLMediaElement) {
      played.push(this);
      return Promise.resolve();
    });
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);

    await load('?cv-mode=watch&cv-narration=1');
    expect(post).toHaveBeenCalledWith({ type: 'chemverse:ready' }, '*');
    const avatars = { type: 'chemverse:avatars', nian: '<svg class="avatar"></svg>', dad: '<svg class="avatar"></svg>' };
    window.dispatchEvent(new MessageEvent('message', { data: avatars, source: window }));
    expect(card().querySelector('.cvw-avatar svg')).toBeNull();
    window.dispatchEvent(new MessageEvent('message', { data: avatars, source: parent }));
    expect(card().querySelectorAll('.cvw-avatar.has-art svg')).toHaveLength(2);

    // 小念先问：念的是 npm run voice 配好的那一句，文件名的指纹和配音脚本一致
    expect(played).toHaveLength(1);
    expect(played[0].src).toMatch(new RegExp(`/voice/${labClipKey('lesson', 0, 'q', '台面上有什么？')}\\.mp3$`));
    expect(text('.cvw-line.is-nian').classList.contains('is-speaking')).toBe(true);
    await vi.advanceTimersByTimeAsync(5000);
    expect(lab.set).not.toHaveBeenCalledWith('V', 1);
    played[0].dispatchEvent(new Event('ended'));
    await vi.advanceTimersByTimeAsync(0);
    expect(text('.cvw-line.is-nian').classList.contains('is-speaking')).toBe(false);
    await vi.advanceTimersByTimeAsync(1500);
    expect(played.at(-1)!.src).toMatch(new RegExp(`/voice/${labClipKey('lesson', 0, 'seen', '四站都在（教材 p.34 的注意框）')}\\.mp3$`));
    expect(text('.cvw-line.is-dad').classList.contains('is-speaking')).toBe(true);
    played.at(-1)!.dispatchEvent(new Event('error'));
    await vi.advanceTimersByTimeAsync(2300);
    expect(text('.cvw-concl').hidden).toBe(false);
    expect(played.at(-1)!.src).toContain('/0-concl-');

    expect(action('讲解').getAttribute('aria-pressed')).toBe('true');
    action('讲解').click();
    expect(action('讲解').textContent).toBe('🔇 讲解');
    expect(post).toHaveBeenCalledWith({ type: 'chemverse:narration', on: false }, '*');

    action('我想自己动手').click();
    expect(document.documentElement.dataset.cvMode).toBeUndefined();
    expect(document.getElementById('cv-to-watch')!.hidden).toBe(false);
    expect(post).toHaveBeenCalledWith({ type: 'chemverse:mode', mode: 'lab' }, '*');
    expect(lab.camera.setViewOffset).toHaveBeenCalled();

    window.dispatchEvent(new MessageEvent('message', { data: { type: 'chemverse:set-mode', mode: 'watch' }, source: window }));
    expect(document.documentElement.dataset.cvMode).toBeUndefined();
    window.dispatchEvent(new MessageEvent('message', { data: { type: 'chemverse:set-mode', mode: 'watch' }, source: parent }));
    expect(document.documentElement.dataset.cvMode).toBe('watch');

    card().querySelectorAll<HTMLButtonElement>('.cvw-dot')[2].click();
    action('小念还想问').click();
    expect(post).toHaveBeenCalledWith({ type: 'chemverse:go-check' }, '*');

    // 外面「分段看」点到没有演示的考核段（hold）时，自动切到自由实验台并跳到那一步
    window.dispatchEvent(new MessageEvent('message', { data: { type: 'chemverse:play-step', step: 3 }, source: parent }));
    expect(document.documentElement.dataset.cvMode).toBeUndefined();
    expect(lab.goto).toHaveBeenLastCalledWith(3);
    expect(post).toHaveBeenCalledWith({ type: 'chemverse:mode', mode: 'lab' }, '*');
    expect(post).toHaveBeenCalledWith({ type: 'chemverse:step', step: 3 }, '*');
  });

  it('paints the sky dome and fog in the site warm paper colours, and nothing else', async () => {
    const color = () => ({ isColor: true, set: vi.fn() });
    const sky = { material: { side: 1, uniforms: { top: { value: color() }, mid: { value: color() }, hor: { value: color() } } } };
    const beaker = { material: { side: 0, uniforms: { top: { value: color() }, hor: { value: color() } } } };
    const fog = { color: color() };
    Object.assign(lab, { scene: { fog, traverse: (visit: (node: unknown) => void) => [sky, beaker].forEach(visit) } });
    await load('');
    expect(sky.material.uniforms.top.value.set).toHaveBeenCalledWith('#ffe9c9');
    expect(sky.material.uniforms.hor.value.set).toHaveBeenCalledWith('#fffaf2');
    expect(beaker.material.uniforms.top.value.set).not.toHaveBeenCalled();
    expect(fog.color.set).toHaveBeenCalledWith('#fbf0e3');
  });

  it('leaves standalone lessons as the original lab bench', async () => {
    await load('');
    expect(document.documentElement.dataset.cvMode).toBeUndefined();
    expect(document.documentElement.classList.contains('cv-simple')).toBe(false);
    expect(document.getElementById('cv-watch')).toBeNull();
    expect(document.getElementById('cv-to-watch')).toBeNull();
    expect(lab.goto).not.toHaveBeenCalled();
  });

  it('opens the free lab inside the site as a simple bench: friendly headings, slider units and the chart folded away', async () => {
    Object.assign(lab, { CONSOLE: { sliders: [{ key: 'V', unit: 'mL' }] } });
    document.querySelector('#left')!.insertAdjacentHTML('afterbegin', '<div class="phead"><h2>本步</h2></div>');
    document.querySelector('#left .pbody')!.innerHTML = '<b class="cq">教材只给了用品，怎么填？</b><p class="ctxt">教材的做法是变量控制（教材原话）</p>';
    document.querySelector('#right')!.insertAdjacentHTML('afterbegin', '<div class="phead"><h2>中控台</h2></div>');
    document.querySelector('#right .vv')!.textContent = '40.0';
    document.querySelector('#right .pbody')!.insertAdjacentHTML('beforeend', '<div class="sl" data-key="V"><div class="slh"><span class="lb">体积</span><b>1.0</b></div></div><div class="chartwrap"><canvas></canvas></div><div class="acts"><button class="btn">参考工况</button><button class="btn"><span>停车</span></button></div>');
    const resize = vi.fn();
    window.addEventListener('resize', resize);
    window.history.replaceState(null, '', '/lessons/courses/rate-step.html?cv-mode=lab&cv-narration=0');
    new Function(adapter)();
    await vi.advanceTimersByTimeAsync(100);
    const html = document.documentElement;
    expect(html.dataset.cvMode).toBeUndefined();
    expect(html.classList.contains('cv-simple')).toBe(true);
    expect(document.querySelector('#left h2')!.textContent).toBe('🧪 动手试试');
    expect(document.querySelector('#right h2')!.textContent).toBe('🎛️ 调一调');
    expect(document.querySelector<HTMLElement>('#right .kpi .vv')!.dataset.cvUnit).toBe('s');
    expect(document.getElementById('cv-watch')!.querySelector('.cvw-reading strong')!.textContent).toBe('40.0 s');
    document.querySelector('#right .vv')!.textContent = '—';
    await vi.advanceTimersByTimeAsync(0);
    expect(document.querySelector<HTMLElement>('#right .kpi .vv')!.dataset.cvUnit).toBeUndefined();
    expect(document.querySelector<HTMLElement>('#right .sl[data-key="V"] .slh b')!.dataset.cvUnit).toBe('mL');
    expect([...document.querySelectorAll('#right .acts button')].map(button => button.textContent)).toEqual(['恢复初始', '暂停']);
    document.querySelector('#right .acts button:last-child span')!.textContent = '开车';
    await vi.advanceTimersByTimeAsync(0);
    expect(document.querySelector('#right .acts button:last-child')!.textContent).toBe('继续');
    expect(document.querySelector('#left .cq')!.textContent).toBe('实验台上只摆了用品，怎么填？');
    expect(document.querySelector('#left .ctxt')!.textContent).toBe('科学实验的做法是变量控制');
    document.querySelector('#left .ctxt')!.textContent = '浓度减半（教材 p.35）';
    await vi.advanceTimersByTimeAsync(0);
    expect(document.querySelector('#left .ctxt')!.textContent).toBe('浓度减半');
    expect([...document.querySelectorAll('#cv-views button')].map(button => button.textContent)).toEqual(['看实验', '调一调', '试试看']);
    const toggle = document.querySelector<HTMLButtonElement>('.cv-chart-toggle')!;
    expect(toggle.nextElementSibling!.classList.contains('chartwrap')).toBe(true);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    resize.mockClear();
    toggle.click();
    expect(html.classList.contains('cv-show-chart')).toBe(true);
    expect(toggle.textContent).toBe('📈 收起曲线');
    expect(resize).toHaveBeenCalled();
    expect(document.querySelector('#foot #cv-to-watch')).not.toBeNull();
  });
});
