import manifest from '../data/voice-manifest.json';
import type { LineLength, Speaker } from './film/narration';

// 小念和爸爸的配音：npm run voice 用 edge-tts 把每篇有动画的文章逐句读出来，
// 放在 public/voice/<slug>/<轮次>-<nian|dad>.mp3，时长记在 src/data/voice-manifest.json。
// 声音和「身体奇遇记」一样，同一对角色听起来也是同一对人。

export const voices = {
  nian: { voice: 'zh-CN-YunxiaNeural', rate: '+0%' },
  dad: { voice: 'zh-CN-YunxiNeural', rate: '-5%' },
} as const satisfies Record<Speaker, { voice: string; rate: string }>;

export const clipKey = (slug: string, turn: number, who: Speaker): string => `${slug}/${turn}-${who}`;

export type VoiceManifest = { voices: typeof voices; clips: Record<string, { hash: string; seconds: number }> };

/** 化学式念成名字；前面已经说了名字就不再念一遍 */
const SPOKEN_NAMES: readonly (readonly [string, string])[] = [
  ['Fe²⁺', '亚铁离子'],
  ['Fe³⁺', '铁离子'],
  ['H⁺', '氢离子'],
  ['H₂S', '硫化氢'],
  ['H₂O', '水'],
  ['NaCl', '氯化钠'],
  ['KSCN', '硫氰化钾'],
];

const escapeRegExp = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** 文章里的字 → 念出来的字：化学式、化合价、温度和角度换成读法 */
export function speakable(text: string): string {
  let out = text;
  for (const [symbol, name] of SPOKEN_NAMES) {
    out = out.replace(new RegExp(`${escapeRegExp(name)}\\s*${escapeRegExp(symbol)}`, 'g'), name).split(symbol).join(name);
  }
  return out
    .replace(/(^|[^\d])\+(\d)/g, '$1正$2')
    .replace(/(^|[^\d])[−-](\d)/g, '$1负$2')
    .replace(/(\d)\s*[–~～]\s*(\d)/g, '$1到$2')
    .replace(/(\d+)°(\d+)′/g, '$1度$2分')
    .replace(/(\d+)°/g, '$1度')
    .replace(/\s*℃/g, '摄氏度')
    .replace(/84\s*消毒液/g, '八四消毒液')
    .replace(/([\u4e00-\u9fff])\s+(?=[\u4e00-\u9fff])/g, '$1');
}

export type FilmVoice = {
  readonly turnCount: number;
  readonly lengthOf: LineLength;
  readonly src: (turn: number, who: Speaker) => string;
};

const clips = (manifest as VoiceManifest).clips;

/** 这篇文章的配音；一句都还没配就是 undefined，播放器不显示声音开关 */
export function voiceFor(slug: string, turnCount: number): FilmVoice | undefined {
  if (!clips[clipKey(slug, 0, 'nian')]) return undefined;
  return {
    turnCount,
    lengthOf: (turn, who) => clips[clipKey(slug, turn, who)]?.seconds,
    src: (turn, who) => `${import.meta.env.BASE_URL}voice/${clipKey(slug, turn, who)}.mp3`,
  };
}
