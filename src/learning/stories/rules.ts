import { crystalNames } from '../crystal';
import { envelope, totalDuration } from '../film/engine';
import type { Cue, FilmScene, Story } from './types';

/**
 * 「小念 × 爸爸」文章的写作规矩，`tests/stories.test.ts` 和 `npm run story:check` 共用。
 * 每条返回一句中文，说清是哪一轮、哪一场、差在哪里。
 */

/** 实验台有几段：互动卡的张数或 3D 课件的步骤数 */
export type LabSize = { readonly cards?: readonly unknown[]; readonly steps: readonly unknown[] };

// 两个字都由这些字组成的词说明不了话题，不算「接住了爸爸的话」
const filler = new Set('的了吗呢吧呀啊哦嘛是我你他她它们这那就也都还又在有和么什怎为个一不没会要说想看能可以得很太好真再');

/** 一句话里有意义的两字词，比如 石灰、氢气、压强 */
export function topicWords(line: string): Set<string> {
  const words = new Set<string>();
  const chars = [...line];
  for (let i = 0; i < chars.length - 1; i += 1) {
    const [a, b] = [chars[i], chars[i + 1]];
    if (!/\p{Script=Han}/u.test(a) || !/\p{Script=Han}/u.test(b)) continue;
    if (filler.has(a) || filler.has(b)) continue;
    words.add(a + b);
  }
  return words;
}

export function dialogueProblems(story: Story, lab?: LabSize): string[] {
  const problems: string[] = [];
  if (!lab) problems.push('curriculum.ts 里没有这个 slug');
  if (!story.title.includes('？')) problems.push('标题要是小念口吻的问题，带「？」');
  if (story.trigger.length < 8) problems.push('trigger 要用一句话写清小念刚遇到的事');
  const turns = story.dialogue;
  if (turns.length < 5 || turns.length > 8) problems.push(`需要 5–8 轮，现在 ${turns.length} 轮`);
  turns.forEach((turn, i) => {
    const last = i === turns.length - 1;
    if (!last && !turn.nian.includes('？')) problems.push(`第 ${i + 1} 轮：小念要用「？」发问`);
    if (last && !/^我(懂了|明白了)/.test(turn.nian)) problems.push('最后一轮：小念以「我懂了 / 我明白了」开头，用自己的话总结');
    if (i > 0 && ![...topicWords(turn.nian)].some(word => turns[i - 1].dad.includes(word))) {
      problems.push(`第 ${i + 1} 轮：小念的追问要接住爸爸上一句里的一个词`);
    }
    if (turn.dad.length < 20 || turn.dad.length > 180) problems.push(`第 ${i + 1} 轮：爸爸的回答 ${turn.dad.length} 字（20–180）`);
    if (turn.show?.kind === 'steps' && turn.show.frames.length < 2) problems.push(`第 ${i + 1} 轮：图解至少 2 步`);
    if (turn.show?.kind === 'lab' && lab) {
      const steps = lab.cards?.length ?? lab.steps.length;
      if (!Number.isInteger(turn.show.step) || turn.show.step < 0 || turn.show.step >= steps) {
        problems.push(`第 ${i + 1} 轮：实验台只有第 0–${steps - 1} 段，没有第 ${turn.show.step} 段`);
      }
    }
  });
  if (story.tip.length < 20) problems.push('「给大人」要写清安全须知（至少 20 字）');
  return problems;
}

export function figureProblems(story: Story): string[] {
  const problems: string[] = [];
  const figures = story.dialogue.flatMap((turn, i) => (turn.figure ? [{ figure: turn.figure, at: i + 1 }] : []));
  if (!story.film && figures.length < 3) problems.push(`没有讲解动画的文章要图文并茂：至少 3 轮配图，现在 ${figures.length} 张`);
  if (figures.filter(({ figure }) => figure.kind === 'live').length > 1) problems.push('真正的周期表（live）每篇最多嵌一张');
  const crystals = figures.filter(({ figure }) => figure.kind === 'crystal');
  if (crystals.length > 3) problems.push(`能转的晶体图每篇最多 3 张，现在 ${crystals.length} 张`);
  if (crystals.some(({ figure }) => figure.kind === 'crystal' && !crystalNames.includes(figure.structure))) {
    problems.push(`晶体图只有这几种结构：${crystalNames.join('、')}`);
  }
  for (const { figure, at } of figures) {
    if ([...figure.caption].length > 70) problems.push(`第 ${at} 轮：图注 ${[...figure.caption].length} 字（最多 70）`);
    const numbers = figure.kind === 'shells' || figure.kind === 'sizes' ? figure.atoms
      : figure.kind === 'table' ? [...(figure.ring ?? []), ...(figure.focus?.by === 'atoms' ? figure.focus.values : [])]
        : figure.kind === 'trend' ? [...(figure.marks ?? []), figure.upTo] : [];
    if (numbers.some(n => !Number.isInteger(n) || n < 1 || n > 118)) problems.push(`第 ${at} 轮：图里用到了不存在的元素（序号 1–118）`);
    if ((figure.kind === 'shells' || figure.kind === 'sizes') && (figure.atoms.length < 2 || figure.atoms.length > 7)) {
      problems.push(`第 ${at} 轮：一张图比较 2–7 个原子`);
    }
    if (figure.kind === 'chains') {
      const groups = [figure.chains, ...(figure.then ? [figure.then.chains] : [])];
      if (groups.some(group => group.length < 1 || group.length > 5)) problems.push(`第 ${at} 轮：碳链图每组画 1–5 根`);
      if (groups.flat().some(chain => !Number.isInteger(chain.carbons) || chain.carbons < 1 || chain.carbons > 30)) problems.push(`第 ${at} 轮：一根碳链 1–30 个碳`);
      if (groups.flat().some(chain => [...chain.label].length > 12)) problems.push(`第 ${at} 轮：碳链的名字最多 12 字`);
      if (figure.then && [...figure.then.via].length > 10) problems.push(`第 ${at} 轮：碳链图箭头上的字最多 10 个`);
    }
    if (figure.kind === 'dots') {
      const total = figure.groups.reduce((sum, group) => sum + group.count, 0);
      if (figure.groups.length < 2 || figure.groups.length > 4) problems.push(`第 ${at} 轮：百点图分 2–4 组`);
      if (figure.groups.some(group => !Number.isInteger(group.count) || group.count < 1) || total !== 100) problems.push(`第 ${at} 轮：百点图每组至少 1 份、合起来正好 100 份（现在 ${total}）`);
      if (figure.groups.some(group => [...`${group.label} · ${group.amount ?? `${group.count} 份`}`].length > 14 || [...(group.note ?? '')].length > 20)) {
        problems.push(`第 ${at} 轮：百点图图例「名称 · 份数」最多 14 字、说明最多 20 字`);
      }
    }
    if (figure.kind === 'tower') {
      if (figure.cuts.length < 3 || figure.cuts.length > 7) problems.push(`第 ${at} 轮：分馏塔画 3–7 段出口`);
      if (figure.cuts.some(cut => [...cut.name].length > 8 || [...cut.note].length > 14)) problems.push(`第 ${at} 轮：分馏塔出口名称最多 8 字、说明最多 14 字`);
    }
  }
  return problems;
}

const LIMITS: Partial<Record<Cue['kind'], number>> = { label: 12, text: 14, arrow: 10, shape: 7, meter: 8, count: 8 };

function cueText(cue: Cue): string | undefined {
  if (cue.kind === 'label' || cue.kind === 'text' || cue.kind === 'meter' || cue.kind === 'count') return 'label' in cue ? cue.label : cue.text;
  if (cue.kind === 'arrow' || cue.kind === 'shape') return cue.text;
  return undefined;
}

/** 一场戏自己的规矩：时长、元素个数、字数、出场时间 */
function sceneProblems(scene: FilmScene, where: string): string[] {
  const problems: string[] = [];
  if ([...scene.title].length > 12) problems.push(`${where}：标题不超过 12 字`);
  if (scene.duration < 4 || scene.duration > 14) problems.push(`${where}：时长 ${scene.duration} 秒（4–14）`);
  if (scene.cues.length < 2) problems.push(`${where}：至少 2 个元素`);
  for (const key of scene.camera ?? []) if (key.zoom < 1 || key.zoom > 2.6) problems.push(`${where}：镜头倍数 ${key.zoom}（1–2.6）`);
  scene.cues.forEach(cue => {
    if (cue.from > scene.duration - 0.8) problems.push(`${where}：${cue.kind} 出现得太晚（from ≤ 时长 − 0.8）`);
    if (cue.to !== undefined && (cue.to < cue.from + 0.5 || cue.to > scene.duration)) problems.push(`${where}：${cue.kind} 的 to 不合理`);
    const text = cueText(cue);
    const limit = LIMITS[cue.kind];
    if (text && limit && [...text].length > limit) problems.push(`${where}：「${text}」超过 ${limit} 字`);
    if (cue.kind === 'myth' && ([...cue.wrong].length > 18 || [...cue.right].length > 18)) problems.push(`${where}：误会卡每句不超过 18 字`);
  });
  for (let t = 0; t <= scene.duration; t += 0.25) {
    const shown = scene.cues.filter(cue => envelope(t, cue.from, cue.to) > 0.02).length;
    if (shown > 8) {
      problems.push(`${where}：${t} 秒时同屏 ${shown} 个元素（最多 8 个）`);
      break;
    }
  }
  return problems;
}

export function filmProblems(story: Story): string[] {
  if (!story.film) return [];
  const problems: string[] = [];
  const { scenes } = story.film;
  if (scenes.length < 4) problems.push('讲解动画至少 4 场戏');
  if (scenes[0]?.turn !== 0) problems.push('第一场戏要配第 1 轮对话');
  const total = totalDuration(story.film);
  if (total < 30 || total > 150) problems.push(`全片 ${total} 秒（30–150）`);
  let skipped = 0;
  scenes.forEach((scene, i) => {
    const where = `第 ${i + 1} 场「${scene.title}」`;
    if (i > 0 && scene.turn < scenes[i - 1].turn) problems.push(`${where}：场次要按对话顺序排`);
    if (i > 0) skipped += Math.max(scene.turn - scenes[i - 1].turn - 1, 0);
    if (scene.turn >= story.dialogue.length) problems.push(`${where}：对话没有第 ${scene.turn + 1} 轮`);
    problems.push(...sceneProblems(scene, where));
  });
  if (skipped > 1) problems.push('最多只能跳过 1 轮对话不配戏');
  for (const turn of new Set(scenes.map(scene => scene.turn))) {
    if (scenes.filter(scene => scene.turn === turn).length > 3) problems.push(`第 ${turn + 1} 轮配了超过 3 场戏`);
  }
  return problems;
}

/** 一篇文章的全部问题；空数组就是全过了 */
export function storyProblems(story: Story, lab?: LabSize): string[] {
  return [...dialogueProblems(story, lab), ...figureProblems(story), ...filmProblems(story)];
}
