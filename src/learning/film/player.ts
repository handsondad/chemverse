import { escapeHtml } from '../html';
import type { Film } from '../stories/types';
import type { FilmVoice } from '../voice';
import { MAX_FRAME_SECONDS, sceneAt, sceneStart, totalDuration } from './engine';
import { lineAt, narrateFilm, narrationGaps, type Speaker, type SpokenLine } from './narration';
import { renderStage } from './stage';

export type FilmHandle = {
  /** 从这一轮对话开始播（有配音时从小念开口前一点）；这一轮没有配戏也没有配音就返回 false */
  playTurn: (turn: number) => boolean;
  pause: () => void;
  destroy: () => void;
};

type Options = {
  /** 正在播哪一轮对话、谁在说话；播完或停在开头时 turn 是 null，没出声时 who 是 undefined */
  onTurn?: (turn: number | null, who?: Speaker) => void;
  id?: string;
  /** 有配音时，小念和爸爸把问答读出来，动画跟着声音放慢 */
  voice?: FilmVoice;
};

const VOICE_KEY = 'chemverse-film-voice';

/** 文章的讲解动画和 3D 实验台共用这一个声音开关，默认开 */
export function readVoicePreference(): boolean {
  try {
    return localStorage.getItem(VOICE_KEY) !== 'off';
  } catch {
    return true;
  }
}

export function saveVoicePreference(on: boolean): void {
  try {
    localStorage.setItem(VOICE_KEY, on ? 'on' : 'off');
  } catch (error) {
    console.error('声音开关保存失败', error);
  }
}

/** 同一时间只让一部动画出声：这一页、别的标签页里的播放器一开口，其他的就停下 */
const otherTabs = typeof BroadcastChannel === 'undefined' ? undefined : new BroadcastChannel(VOICE_KEY);
const thisTab = new Set<(speaker: string) => void>();
let players = 0;
function claimVoice(speaker: string): void {
  otherTabs?.postMessage(speaker);
  for (const listener of thisTab) listener(speaker);
}

const clock = (seconds: number): string => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
const lineKey = (line: SpokenLine): string => `${line.turn}-${line.who}`;

export function filmTurns(film: Film): Set<number> {
  return new Set(film.scenes.map(scene => scene.turn));
}

export function mountFilm(host: HTMLElement, film: Film, options: Options = {}): FilmHandle {
  const { voice } = options;
  const narrated = voice ? narrateFilm(film, voice.turnCount, voice.lengthOf) : undefined;
  let voiceOn = readVoicePreference();
  let active = voiceOn && narrated ? narrated.film : film;
  let lines: readonly SpokenLine[] = voiceOn && narrated ? narrated.lines : [];
  let total = totalDuration(active);
  const id = options.id ?? 'film';
  const playerId = `${id}-${(players += 1)}`;

  host.innerHTML = `<div class="film">`
    + `<div class="film-screen"><div class="film-stage" role="button" tabindex="0" aria-label="播放或暂停讲解动画"></div>`
    + `<button type="button" class="film-start" tabindex="-1" aria-hidden="true">▶ 看讲解动画<small></small></button></div>`
    + `<div class="film-controls">`
    + `<button type="button" class="film-play" aria-label="播放">▶</button>`
    + `<input class="film-range" type="range" min="0" max="${total}" step="0.01" value="0" aria-label="动画进度">`
    + `<span class="film-time"></span>`
    + (narrated ? `<button type="button" class="film-voice"></button>` : '')
    + `</div>`
    + `<p class="film-hint" hidden>点 ▶ 听小念和爸爸讲</p>`
    + `<div class="film-chips">${film.scenes.map((scene, i) => `<button type="button" data-film-scene="${i}"><b>${i + 1}</b>${escapeHtml(scene.title)}</button>`).join('')}</div>`
    + `</div>`;
  const stage = host.querySelector<HTMLElement>('.film-stage')!;
  const cover = host.querySelector<HTMLButtonElement>('.film-start')!;
  const coverInfo = cover.querySelector('small')!;
  const play = host.querySelector<HTMLButtonElement>('.film-play')!;
  const range = host.querySelector<HTMLInputElement>('.film-range')!;
  const time = host.querySelector<HTMLElement>('.film-time')!;
  const voiceButton = host.querySelector<HTMLButtonElement>('.film-voice');
  const hint = host.querySelector<HTMLElement>('.film-hint')!;
  const chips = [...host.querySelectorAll<HTMLButtonElement>('[data-film-scene]')];

  const raf = window.requestAnimationFrame?.bind(window) ?? ((cb: FrameRequestCallback) => window.setTimeout(() => cb(performance.now()), 16));
  const caf = window.cancelAnimationFrame?.bind(window) ?? window.clearTimeout.bind(window);
  let now = 0;
  let playing = false;
  let frame = 0;
  let last = 0;
  let shownScene = -1;
  let reported = '';
  let stageWidth = stage.clientWidth;
  let destroyed = false;
  let audio: HTMLAudioElement | undefined;
  let audioSrc = '';
  /** 正在放的那句配音；放着的时候动画的时钟跟着声音走 */
  let clip: SpokenLine | null = null;

  const showTotals = (): void => {
    range.max = String(total);
    coverInfo.textContent = `${film.scenes.length} 场戏 · ${clock(total)}${lines.length ? ' · 🔊 有讲解' : ''}`;
    if (!voiceButton) return;
    voiceButton.textContent = voiceOn ? '🔊' : '🔇';
    voiceButton.setAttribute('aria-pressed', String(voiceOn));
    voiceButton.setAttribute('aria-label', voiceOn ? '关掉声音' : '打开声音');
    voiceButton.title = voiceOn ? '关掉声音' : '打开声音';
  };

  const report = (turn: number | null, who?: Speaker): void => {
    const key = `${turn}|${who ?? ''}`;
    if (key === reported) return;
    reported = key;
    options.onTurn?.(turn, who);
  };

  const needTap = (show: boolean): void => {
    hint.hidden = !show;
    play.classList.toggle('is-waiting', show);
  };

  const draw = (): void => {
    const { index, local } = sceneAt(active, now);
    stage.innerHTML = renderStage(active.scenes[index], local, {
      number: index + 1,
      isLast: index === active.scenes.length - 1,
      stageWidth: stageWidth || stage.clientWidth,
      id: `${id}-${index}`,
    });
    range.value = String(now);
    time.textContent = `${clock(now)} / ${clock(total)}`;
    cover.hidden = playing || now > 0;
    if (index !== shownScene) {
      shownScene = index;
      chips.forEach((chip, i) => chip.classList.toggle('is-active', i === index));
    }
    if (!playing && now === 0) return report(null);
    const spoken = lines.length ? lineAt(lines, now) : undefined;
    const sceneTurn = active.scenes[index].turn;
    report(Math.max(sceneTurn, spoken?.line.turn ?? sceneTurn), spoken?.speaking ? spoken.line.who : undefined);
  };

  const setPlaying = (next: boolean): void => {
    playing = next;
    play.textContent = next ? '❚❚' : '▶';
    play.setAttribute('aria-label', next ? '暂停' : '播放');
    host.querySelector('.film')?.classList.toggle('is-playing', next);
  };

  const stopVoice = (): void => {
    clip = null;
    audio?.pause();
  };

  /** 从 at 秒开始放那时该说的话；在点击里直接调用，手机浏览器才肯出声 */
  const startVoice = (at: number): void => {
    const found = voice && lines.length ? lineAt(lines, at) : undefined;
    if (!voice || !found?.speaking) {
      stopVoice();
      return;
    }
    audio ??= Object.assign(new Audio(), { preload: 'auto' });
    const player = audio;
    const src = voice.src(found.line.turn, found.line.who);
    if (src !== audioSrc) {
      audioSrc = src;
      player.src = src;
    }
    clip = found.line;
    player.currentTime = Math.max(at - found.line.start, 0);
    claimVoice(playerId);
    player.play()?.catch((error: unknown) => {
      if (!(error instanceof DOMException) || error.name !== 'NotAllowedError' || destroyed) return;
      pause();
      needTap(true);
    });
  };

  /** 时间线走到下一句时换上那句的声音 */
  const followVoice = (): void => {
    if (!lines.length) return;
    const found = lineAt(lines, now);
    if (!found?.speaking) return;
    if (!clip || lineKey(clip) !== lineKey(found.line)) startVoice(now);
    else if (audio?.paused && !audio.ended) startVoice(now);
  };

  const tick = (stamp: number): void => {
    if (!playing || destroyed) return;
    const dt = last ? Math.min((stamp - last) / 1000, MAX_FRAME_SECONDS) : 0;
    last = stamp;
    if (clip && audio && !audio.paused && !audio.ended) {
      if (audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) now = Math.min(clip.start + audio.currentTime, total);
    } else {
      now = Math.min(now + dt, total);
    }
    if (now >= total) {
      setPlaying(false);
      stopVoice();
      draw();
      report(null);
      return;
    }
    followVoice();
    draw();
    frame = raf(tick);
  };

  const start = (): void => {
    if (destroyed) return;
    if (now >= total) now = 0;
    needTap(false);
    setPlaying(true);
    last = 0;
    caf(frame);
    startVoice(now);
    frame = raf(tick);
    draw();
  };

  function pause(): void {
    setPlaying(false);
    caf(frame);
    stopVoice();
    draw();
  }

  const seek = (seconds: number): void => {
    stopVoice();
    now = Math.min(Math.max(seconds, 0), total);
    if (playing) startVoice(now);
    draw();
  };

  /** 有配音时这一轮从小念开口前一点开始；没配音就从配这一轮的第一场戏开始 */
  const startOfTurn = (turn: number): number | undefined => {
    const line = lines.find(item => item.turn === turn);
    if (line) return Math.max(line.start - narrationGaps.lead, 0);
    const index = active.scenes.findIndex(scene => scene.turn === turn);
    return index < 0 ? undefined : sceneStart(active, index) + 0.001;
  };

  const toggleVoice = (): void => {
    if (!narrated) return;
    voiceOn = !voiceOn;
    saveVoicePreference(voiceOn);
    const { index, local } = sceneAt(active, now);
    const target = voiceOn ? narrated.film : film;
    const at = sceneStart(target, index) + local * (target.scenes[index].duration / active.scenes[index].duration);
    stopVoice();
    needTap(false);
    active = target;
    lines = voiceOn ? narrated.lines : [];
    total = totalDuration(active);
    now = Math.min(at, total);
    showTotals();
    if (playing) startVoice(now);
    draw();
  };

  play.addEventListener('click', () => (playing ? pause() : start()));
  stage.addEventListener('click', () => (playing ? pause() : start()));
  cover.addEventListener('click', start);
  voiceButton?.addEventListener('click', toggleVoice);
  stage.addEventListener('keydown', event => {
    if (event.key !== ' ' && event.key !== 'Enter') return;
    event.preventDefault();
    if (playing) pause();
    else start();
  });
  range.addEventListener('input', () => seek(Number(range.value)));
  chips.forEach((chip, i) => chip.addEventListener('click', () => {
    autoplay?.disconnect();
    seek(sceneStart(active, i) + 0.001);
    start();
  }));

  const quietIfSpeaking = (): void => {
    if (clip && playing) pause();
  };
  const onThisTab = (speaker: string): void => {
    if (speaker !== playerId) quietIfSpeaking();
  };
  const onHidden = (): void => {
    if (document.hidden) quietIfSpeaking();
  };
  thisTab.add(onThisTab);
  otherTabs?.addEventListener('message', quietIfSpeaking);
  document.addEventListener('visibilitychange', onHidden);

  const resize = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(entries => {
    stageWidth = entries[0]?.contentRect.width ?? stageWidth;
    if (!playing) draw();
  });
  resize?.observe(stage);

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const autoplay = reduceMotion || typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    autoplay?.disconnect();
    if (!playing && now === 0) start();
  }, { threshold: 0.45 });
  autoplay?.observe(stage);

  showTotals();
  draw();

  return {
    playTurn(turn) {
      const at = startOfTurn(turn);
      if (at === undefined) return false;
      autoplay?.disconnect();
      stopVoice();
      now = Math.min(at, total);
      start();
      return true;
    },
    pause,
    destroy() {
      destroyed = true;
      caf(frame);
      stopVoice();
      audio?.removeAttribute('src');
      resize?.disconnect();
      autoplay?.disconnect();
      thisTab.delete(onThisTab);
      otherTabs?.removeEventListener('message', quietIfSpeaking);
      document.removeEventListener('visibilitychange', onHidden);
    },
  };
}
