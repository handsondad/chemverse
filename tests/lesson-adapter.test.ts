import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

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
      <footer id="foot"><span class="note">示意</span></footer>`;
    lab = fakeLab();
    (window as unknown as { __lab: unknown }).__lab = lab;
  });

  afterEach(() => {
    for (const { type, listener } of listeners.splice(0)) window.removeEventListener(type, listener);
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
    for (const key of ['speechSynthesis', 'SpeechSynthesisUtterance', '__lab']) Reflect.deleteProperty(window, key);
    Object.defineProperty(window, 'parent', parentDescriptor);
  });

  it('plays each authored step with its own start state, demo value, observation and conclusion', async () => {
    await load('?cv-mode=watch');
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
    const speak = vi.fn();
    const cancel = vi.fn();
    Object.assign(window, {
      speechSynthesis: { getVoices: () => [{ lang: 'zh-CN' }], speak, cancel, addEventListener() {} },
      SpeechSynthesisUtterance: class { constructor(public text: string) {} },
    });

    await load('?cv-mode=watch&cv-narration=1');
    expect(post).toHaveBeenCalledWith({ type: 'chemverse:ready' }, '*');
    const avatars = { type: 'chemverse:avatars', nian: '<svg class="avatar"></svg>', dad: '<svg class="avatar"></svg>' };
    window.dispatchEvent(new MessageEvent('message', { data: avatars, source: window }));
    expect(card().querySelector('.cvw-avatar svg')).toBeNull();
    window.dispatchEvent(new MessageEvent('message', { data: avatars, source: parent }));
    expect(card().querySelectorAll('.cvw-avatar.has-art svg')).toHaveLength(2);
    expect(speak).toHaveBeenCalledWith(expect.objectContaining({ text: '台面上有什么？' }));
    expect(action('朗读').getAttribute('aria-pressed')).toBe('true');

    action('朗读').click();
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
    expect(document.getElementById('cv-watch')).toBeNull();
    expect(document.getElementById('cv-to-watch')).toBeNull();
    expect(lab.goto).not.toHaveBeenCalled();
  });
});
