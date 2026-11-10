import type { DialogueTurn } from './dialogue';
import type { Figure } from './figures';
import type { Film, Story } from './stories/types';

/** 文章页里的一轮：小念问一句，爸爸答一段（可带方程式、配图、图解）。 */
export interface ArticleTurn {
  nian: string;
  dad: string;
  lead?: string;
  eq?: string;
  figure?: Figure;
  frames?: readonly { icon: string; label: string }[];
  see?: string;
  myth?: string;
}

/** 每个问题都渲染成同一种「小念 × 爸爸」文章；写了讲解动画的，页面变成左问答、右动画。 */
export interface Article {
  title: string;
  trigger: string;
  turns: ArticleTurn[];
  tip: string;
  film?: Film;
}

const LAB_SAFETY = '文中的实验涉及有毒气体、强酸强碱、高温或活泼金属时，只看懂原理就好，现实中请勿模仿。';

export function cleanHook(hook: string): string {
  return hook.replace(/^生活中的化学\s*·\s*/, '');
}

export function storyArticle(story: Story): Article {
  return {
    title: story.title,
    trigger: story.trigger,
    tip: story.tip,
    film: story.film,
    turns: story.dialogue.map(turn => ({
      nian: turn.nian,
      dad: turn.dad,
      eq: turn.eq,
      figure: turn.figure,
      frames: turn.show?.kind === 'steps' ? turn.show.frames : undefined,
    })),
  };
}

interface AutoSource {
  hook: string;
  question: string;
  takeaway: string;
  objectives: string[];
  simulation: boolean;
  /** 3D 课件的封面图地址：配在讲到第一段实验的那一轮，让文章先有张图 */
  cover?: string;
}

/** 还没手写成 `Story` 的课：把已有的一问一答直接交给小念和爸爸来说，最后让爸爸用一句话收尾。 */
export function autoArticle(source: AutoSource, dialogue: DialogueTurn[]): Article {
  const firstLab = dialogue.findIndex(turn => turn.stepIndex !== undefined);
  const turns: ArticleTurn[] = dialogue.map((turn, i) => ({
    figure: source.cover && i === firstLab
      ? { kind: 'image', src: source.cover, alt: `${turn.tag}：实验的画面`, caption: `${turn.tag}：实验里的这一幕。` }
      : undefined,
    nian: turn.ask,
    dad: turn.answer,
    lead: turn.lead,
    eq: turn.eq,
    frames: turn.steps,
    see: turn.phenomenon,
    myth: turn.wrong,
  }));
  turns.push({ nian: '我好像有点懂了！爸爸，能用一句话帮我总结一下吗？', dad: source.takeaway });
  return {
    title: source.question,
    trigger: cleanHook(source.hook),
    turns,
    tip: `读完这篇，孩子能弄懂：${source.objectives.join('；')}。${source.simulation ? LAB_SAFETY : ''}`,
  };
}
