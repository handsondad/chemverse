// 用 edge-tts 给每一句问答配音，写到 public/voice/<slug>/<轮次>-<nian|dad>.mp3，
// 时长和指纹记在 src/data/voice-manifest.json；3D 实验台「看懂原理」的每一段写到
// public/voice/lab/<课件>/…mp3，记在 src/data/lab-voice-manifest.json。只生成新的或改过的句子，可以随时中断再续。
//   npm run voice                          全部（文章 + 实验台）
//   npm run voice -- iron-step haber-step  只配这几篇文章
//   npm run voice -- lab                   只配实验台；lab:rate-step 只配这一个实验
// 需要：python -m pip install edge-tts，以及 PATH 里的 ffmpeg / ffprobe；生成时要联网。
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { voices, type VoiceManifest } from '../src/learning/voice';
import { clipHash, wantedClips, wantedLabClips, type WantedClip } from './voice-clips';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const voiceDir = join(root, 'public/voice');
const parallel = 4;

function run(command: string, args: string[]): Promise<string> {
  return new Promise((done, fail) => {
    const child = spawn(command, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '';
    let err = '';
    child.stdout.on('data', chunk => { out += chunk; });
    child.stderr.on('data', chunk => { err += chunk; });
    child.on('error', fail);
    child.on('close', code => (code === 0 ? done(out) : fail(new Error(`${command} 退出码 ${code}: ${err.slice(-400)}`))));
  });
}

type ClipSet = { readonly name: string; readonly manifestPath: string; readonly wanted: Map<string, WantedClip>; readonly only: Set<string> | 'all' | 'none' };

const args = process.argv.slice(2).filter(arg => arg !== '--');
const labArgs = args.filter(arg => arg === 'lab' || arg.startsWith('lab:'));
const storyArgs = args.filter(arg => !labArgs.includes(arg));
const sets: ClipSet[] = [
  {
    name: '有动画的文章',
    manifestPath: join(root, 'src/data/voice-manifest.json'),
    wanted: wantedClips(),
    only: storyArgs.length ? new Set(storyArgs) : args.length ? 'none' : 'all',
  },
  {
    name: '3D 实验台',
    manifestPath: join(root, 'src/data/lab-voice-manifest.json'),
    wanted: wantedLabClips(),
    only: labArgs.includes('lab') || !args.length ? 'all' : labArgs.length ? new Set(labArgs.map(arg => arg.slice(4))) : 'none',
  },
];

const scratch = join(tmpdir(), 'chemverse-voice');
mkdirSync(scratch, { recursive: true });

/** Windows 上开发服务器正在读这个文件时改名会报 EPERM，稍等再试 */
function save(path: string, manifest: VoiceManifest): void {
  const clips = Object.fromEntries(Object.entries(manifest.clips).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(`${path}.tmp`, `${JSON.stringify({ voices, clips }, null, 1)}\n`);
  for (let attempt = 1; ; attempt += 1) {
    try {
      renameSync(`${path}.tmp`, path);
      return;
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code ?? '';
      if (attempt >= 20 || !['EPERM', 'EBUSY', 'EACCES'].includes(code)) throw error;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 50);
    }
  }
}

async function make(manifest: VoiceManifest, key: string, { who, text }: WantedClip): Promise<void> {
  const { voice, rate } = voices[who];
  const raw = join(scratch, `${key.split('/').join('_')}.raw.mp3`);
  const out = join(voiceDir, `${key}.mp3`);
  mkdirSync(dirname(out), { recursive: true });
  for (let attempt = 1; ; attempt += 1) {
    try {
      await run('python', ['-m', 'edge_tts', '--voice', voice, `--rate=${rate}`, '--text', text, '--write-media', raw]);
      break;
    } catch (error) {
      if (attempt >= 4) throw error;
      await new Promise(wait => setTimeout(wait, 2000 * attempt));
    }
  }
  await run('ffmpeg', ['-y', '-v', 'error', '-i', raw, '-ac', '1', '-ar', '24000', '-b:a', '32k', out]);
  rmSync(raw, { force: true });
  const seconds = Number((await run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', out])).trim());
  manifest.clips[key] = { hash: clipHash(who, text), seconds: Math.round(seconds * 100) / 100 };
}

let failed = 0;
for (const { name, manifestPath, wanted, only } of sets) {
  if (only === 'none') continue;
  const manifest: VoiceManifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : { voices, clips: {} };
  if (only !== 'all') {
    const unknown = [...only].filter(slug => ![...wanted.values()].some(clip => clip.slug === slug));
    if (unknown.length) console.warn(`${name}里没有这些：${unknown.join('、')}`);
  }
  for (const key of Object.keys(manifest.clips)) {
    if (wanted.has(key)) continue;
    delete manifest.clips[key];
    rmSync(join(voiceDir, `${key}.mp3`), { force: true });
  }
  const todo = [...wanted].filter(([key, clip]) => {
    if (only !== 'all' && !only.has(clip.slug)) return false;
    return manifest.clips[key]?.hash !== clipHash(clip.who, clip.text) || !existsSync(join(voiceDir, `${key}.mp3`));
  });
  console.log(`${name}：需要配音 ${todo.length} 句（一共 ${wanted.size} 句）`);
  let done = 0;
  const queue = [...todo];
  await Promise.all(Array.from({ length: parallel }, async () => {
    for (let item = queue.shift(); item; item = queue.shift()) {
      const [key, clip] = item;
      try {
        await make(manifest, key, clip);
        save(manifestPath, manifest);
        done += 1;
        if (done % 20 === 0 || done === todo.length) console.log(`${done}/${todo.length}`);
      } catch (error) {
        failed += 1;
        console.error(`✖ ${key}: ${(error as Error).message}`);
      }
    }
  }));
  save(manifestPath, manifest);
}
console.log(failed ? `有 ${failed} 句失败，再跑一次会只补失败的` : '全部完成');
process.exitCode = failed ? 1 : 0;
