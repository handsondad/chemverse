/**
 * 写「小念 × 爸爸」文章的小工具（用 vite-node 跑，能直接读课程数据）：
 *   npm run story:todo                 按主题列出哪些课已经手写、哪些还是自动装配
 *   npm run story:new -- <slug>        生成 src/learning/stories/<slug>.ts 草稿并登记
 *   npm run story:check -- [slug...]   按写作规矩检查（不写 slug 就查全部），顺带提醒配音过期、念不出的符号
 *   npm run story:frames -- <slug>     把讲解动画每场切三帧排成一张联系表（HTML，装了 Edge / Chrome 再出 PNG）
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { cleanHook } from '../src/learning/article';
import { findLesson, labName, lessons, unitLessons } from '../src/learning/catalog';
import { units } from '../src/learning/curriculum';
import { totalDuration } from '../src/learning/film/engine';
import { renderStage } from '../src/learning/film/stage';
import { stories } from '../src/learning/stories';
import { storyProblems } from '../src/learning/stories/rules';
import type { Story } from '../src/learning/stories/types';
import { speakable } from '../src/learning/voice';
import { clipHash, wantedClips } from './voice-clips';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const storyDir = join(root, 'src', 'learning', 'stories');
const [command, ...args] = process.argv.slice(2);

const camel = (slug: string): string => slug.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());
const quote = (text: string): string => `'${text.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ')}'`;

function summary(story: Story): string {
  const figures = story.dialogue.filter(turn => turn.figure).length;
  const film = story.film ? `🎬 ${story.film.scenes.length} 场 ${totalDuration(story.film)} 秒` : '无动画';
  return `${story.dialogue.length} 轮 · ${figures} 张图 · ${film}`;
}

function todo(): void {
  let written = 0;
  for (const unit of units) {
    const list = unitLessons(unit.id);
    const done = list.filter(lesson => lesson.story).length;
    written += done;
    console.log(`\n${unit.emoji} ${unit.title}（${unit.id}）  已手写 ${done}/${list.length}`);
    for (const lesson of list) {
      const kind = lesson.story ? (lesson.story.film ? '🎬 有动画' : '🖼️ 图解') : `自动装配 · ${labName(lesson)}`;
      console.log(`  ${lesson.story ? '✅' : '⏳'} ${lesson.slug.padEnd(24)} ${lesson.level} · ${kind} · ${lesson.title}`);
    }
  }
  console.log(`\n共 ${lessons.length} 题，已手写 ${written} 篇。挑一题：npm run story:new -- <slug>`);
}

function scaffold(slug: string | undefined): void {
  if (!slug) throw new Error('用法：npm run story:new -- <slug>（slug 见 npm run story:todo）');
  const lesson = findLesson(slug);
  if (!lesson) throw new Error(`curriculum.ts 里没有 ${slug}；先在 lessonPlan 里加这节课`);
  const file = join(storyDir, `${slug}.ts`);
  if (existsSync(file)) throw new Error(`已经有 src/learning/stories/${slug}.ts 了，直接改它`);

  const name = camel(slug);
  const turns = lesson.article.turns.map((turn, i) => {
    const source = lesson.dialogue[i];
    const lines = [`      nian: ${quote(turn.nian)},`, `      dad: ${quote([turn.lead, turn.dad].filter(Boolean).join(''))},`];
    if (turn.eq) lines.push(`      eq: ${quote(turn.eq)},`);
    if (source?.stepIndex !== undefined) lines.push(`      show: { kind: 'lab', step: ${source.stepIndex}, label: ${quote(`看「${source.tag}」`)} },`);
    lines.push(`      // figure: { kind: 'table', paint: 'category', caption: '' },`);
    return `    {\n${lines.join('\n')}\n    },`;
  });
  writeFileSync(file, `import type { Story } from './types';

// 草稿：对话是从课件自动装配来的，照 .cursor/skills/chemverse-explainer 的讲法改写，再跑 npm run story:check -- ${slug}
export const ${name}: Story = {
  slug: ${quote(slug)},
  title: ${quote(lesson.article.title)},
  trigger: ${quote(cleanHook(lesson.hook))},
  dialogue: [
${turns.join('\n')}
  ],
  tip: ${quote(lesson.article.tip)},
  // 讲解动画放在文章右栏，一轮配一到三场戏，写法见 skill 的 film.md
  // film: { scenes: [{ turn: 0, title: '', duration: 10, cues: [] }] },
};
`);

  const indexFile = join(storyDir, 'index.ts');
  const source = readFileSync(indexFile, 'utf8');
  const lines = source.split('\n');
  const imports = lines.filter(line => line.startsWith('import '));
  imports.push(`import { ${name} } from './${slug}';`);
  const modulePath = (line: string): string => /from '(.+)'/.exec(line)?.[1] ?? '';
  imports.sort((a, b) => modulePath(a).localeCompare(modulePath(b)));
  const rest = lines.filter(line => !line.startsWith('import ')).join('\n');
  const listed = rest.replace(/(export const stories: readonly Story\[\] = \[[\s\S]*?)\n\];/, `$1\n  ${name},\n];`);
  writeFileSync(indexFile, `${imports.join('\n')}\n${listed}`);

  console.log(`已生成 src/learning/stories/${slug}.ts 并登记到 stories/index.ts。`);
  console.log(`下一步：改写对话、配图 → npm run story:check -- ${slug} → 浏览器打开 #q/${slug}`);
}

/** 不算没过，只是提醒：配音和现在的文字对不上、句子里还有念不出来的符号 */
function warnings(story: Story): string[] {
  const notes: string[] = [];
  if (story.film) {
    const manifestFile = join(root, 'src', 'data', 'voice-manifest.json');
    const saved = existsSync(manifestFile) ? (JSON.parse(readFileSync(manifestFile, 'utf8')) as { clips: Record<string, { hash: string }> }).clips : {};
    const stale = [...wantedClips()].filter(([key, clip]) => clip.slug === story.slug
      && (saved[key]?.hash !== clipHash(clip.who, clip.text) || !existsSync(join(root, 'public', 'voice', `${key}.mp3`))));
    if (stale.length) notes.push(`${stale.length} 句还没配音或文字改过了：npm run voice -- ${story.slug}`);
  }
  if (!story.film) return notes;
  story.dialogue.forEach((turn, i) => {
    for (const who of ['nian', 'dad'] as const) {
      const odd = speakable(turn[who]).replace(/pH|PM2\.5|LED/g, '').match(/[₀-₉⁰-⁹⁺⁻]|[A-Za-z]{2,}/g);
      if (odd) notes.push(`第 ${i + 1} 轮${who === 'nian' ? '小念' : '爸爸'}的话里「${[...new Set(odd)].join(' ')}」念不顺：换成名字，或在 voice.ts 的 speakable() 里补读法`);
    }
  });
  return notes;
}

const PREVIEW_DIR = join(root, '.story-preview');

function findBrowser(): string | undefined {
  const candidates = [
    process.env.CHROME_PATH,
    `${process.env['ProgramFiles(x86)']}\\Microsoft\\Edge\\Application\\msedge.exe`,
    `${process.env.ProgramFiles}\\Microsoft\\Edge\\Application\\msedge.exe`,
    `${process.env.ProgramFiles}\\Google\\Chrome\\Application\\chrome.exe`,
    `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/microsoft-edge',
  ];
  return candidates.find((path): path is string => Boolean(path) && existsSync(path!));
}

/** 每场取开头不久、中间、快结束三个时刻，一行一场，一眼看出元素有没有重叠、字有没有出框、该出现的有没有出现 */
function frames(slug: string | undefined): void {
  if (!slug) throw new Error('用法：npm run story:frames -- <slug>');
  const story = stories.find(item => item.slug === slug);
  if (!story) throw new Error(`stories/index.ts 里没有 ${slug}`);
  if (!story.film) throw new Error(`${slug} 没有讲解动画`);
  const { scenes } = story.film;
  const width = 400;
  const rows = scenes.map((scene, index) => {
    const moments = [0.35, 0.7, 1].map(share => Math.max(0.5, Math.min(scene.duration - 0.35, scene.duration * share)));
    const cells = moments.map(t => `<figure><figcaption>${index + 1}. 第 ${scene.turn + 1} 轮 · ${t.toFixed(1)} 秒</figcaption>`
      + `<div class="film-screen"><div class="film-stage">${renderStage(scene, t, { number: index + 1, isLast: index === scenes.length - 1, stageWidth: width, id: `f${index}-${moments.indexOf(t)}` })}</div></div></figure>`);
    return `<section>${cells.join('')}</section>`;
  });
  const css = ['public/theme/tokens.css', 'src/learning/learning.css'].map(file => readFileSync(join(root, file), 'utf8')).join('\n');
  mkdirSync(PREVIEW_DIR, { recursive: true });
  const page = join(PREVIEW_DIR, `${slug}-frames.html`);
  writeFileSync(page, `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>${slug} 动画联系表</title><style>${css}
body { margin: 0; padding: 12px; background: var(--cv-bg); font: 13px/1.4 var(--cv-font); color: var(--cv-text); }
h1 { margin: 0 0 10px; font-size: 18px; }
section { display: grid; grid-template-columns: repeat(3, ${width}px); gap: 10px; margin-bottom: 10px; }
figure { margin: 0; } figcaption { margin-bottom: 3px; color: var(--cv-muted); }
.film-stage { cursor: default; border: 1px solid var(--cv-border); }
</style><body class="learning-app"><h1>${story.title}（${scenes.length} 场 · ${totalDuration(story.film)} 秒）</h1>${rows.join('')}</body></html>`);
  console.log(`联系表：${page}`);

  const browser = findBrowser();
  if (!browser) {
    console.log('没找到 Edge / Chrome，直接用浏览器打开上面的 HTML 看；或设置 CHROME_PATH 再跑一次出 PNG。');
    return;
  }
  const png = join(PREVIEW_DIR, `${slug}-frames.png`);
  const height = 60 + scenes.length * (width * 0.75 + 32);
  spawnSync(browser, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', `--user-data-dir=${join(PREVIEW_DIR, '.browser')}`,
    `--window-size=${width * 3 + 44},${Math.ceil(height)}`, `--screenshot=${png}`, pathToFileURL(page).href], { stdio: 'ignore', timeout: 60000 });
  console.log(existsSync(png) ? `截图：${png}` : '截图没出来，直接用浏览器打开上面的 HTML 看。');
}

function check(slugs: string[]): void {
  const targets = slugs.length ? slugs : stories.map(story => story.slug);
  let failed = 0;
  for (const slug of targets) {
    const story = stories.find(item => item.slug === slug);
    if (!story) {
      failed += 1;
      const hint = existsSync(join(storyDir, `${slug}.ts`)) ? '文件在，但还没登记到 stories/index.ts' : `还没写，先 npm run story:new -- ${slug}`;
      console.log(`❌ ${slug}  ${hint}`);
      continue;
    }
    const problems = storyProblems(story, findLesson(slug));
    if (problems.length) failed += 1;
    console.log(`${problems.length ? '❌' : '✅'} ${slug}  ${summary(story)}`);
    for (const problem of problems) console.log(`   - ${problem}`);
    for (const note of warnings(story)) console.log(`   ⚠️ ${note}`);
  }
  console.log(failed ? `\n${failed} 篇没过，改完再跑一次。` : `\n${targets.length} 篇全部通过。浏览器里打开 #q/<slug> 从头读一遍，再看手机宽度。`);
  if (failed) process.exitCode = 1;
}

try {
  if (command === 'todo') todo();
  else if (command === 'new') scaffold(args[0]);
  else if (command === 'check') check(args);
  else if (command === 'frames') frames(args[0]);
  else throw new Error('用法：story todo | story new <slug> | story check [slug...] | story frames <slug>');
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
