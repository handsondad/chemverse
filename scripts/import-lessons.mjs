import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const source = process.argv[2];
if (!source) throw new Error('Usage: node scripts/import-lessons.mjs <upstream lab directory>');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const catalog = JSON.parse(readFileSync(join(source, 'catalog.json'), 'utf8'))
  .filter(course => course.subject === 'chem')
  .map(course => {
    delete course.online;
    return course;
  });
if (catalog.length !== 25) throw new Error('Expected the reviewed catalog of 25 chemistry lessons.');
const destination = join(root, 'public', 'lessons');
mkdirSync(destination, { recursive: true });
for (const course of catalog) {
  for (const asset of [course.file, course.cover]) {
    if (!/^(courses|covers)\/[\w-]+\.(html|webp)$/.test(asset)) {
      throw new Error(`Unexpected asset path: ${asset}`);
    }
    const target = join(destination, asset);
    mkdirSync(dirname(target), { recursive: true });
    if (asset.endsWith('.html')) {
      const original = readFileSync(join(source, asset), 'utf8');
      if (!original.includes('</head>')) throw new Error(`Missing lesson head: ${asset}`);
      const theme = '<!-- ChemVerse adaptation: shared theme and responsive view adapter; original simulation bundle unchanged. -->\n<link rel="stylesheet" href="../../theme/lesson.css">\n<script defer src="../../theme/lesson-adapter.js"></script>\n';
      writeFileSync(target, original.replace('</head>', `${theme}</head>`));
    } else {
      copyFileSync(join(source, asset), target);
    }
  }
}
for (const notice of ['LICENSE', 'THIRD_PARTY_NOTICES.md']) {
  copyFileSync(join(source, notice), join(destination, notice));
}
writeFileSync(join(root, 'src', 'data', 'lessons.json'), `${JSON.stringify(catalog, null, 2)}\n`);
const escapeHtml = text => text.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const directory = `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>3D 实验台目录 · 化学奇遇记</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&family=Ma+Shan+Zheng&display=swap"><link rel="stylesheet" href="../../theme/tokens.css"><style>
*{box-sizing:border-box}body{margin:0;padding:24px 20px 44px;background:var(--cv-page);background-attachment:fixed;color:var(--cv-text);font:16px/1.7 var(--cv-font)}
.wrap{max-width:1180px;margin:0 auto}header{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;margin-bottom:18px}
h1{margin:0;font-size:clamp(1.4rem,2.6vw,1.9rem)}p{margin:4px 0 0;color:var(--cv-muted);font-size:14.5px}
.back{display:inline-flex;padding:8px 16px;border:2px solid var(--cv-border);border-radius:999px;background:var(--cv-surface);color:var(--cv-text-2);font-size:14px;font-weight:700;text-decoration:none}
.back:hover{border-color:#ffc58f}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin:20px 0 28px}
main a{display:grid;align-content:start;gap:6px;padding:10px 10px 12px;border:2px solid var(--cv-border);border-radius:20px;text-decoration:none;background:var(--cv-surface);color:var(--cv-text);box-shadow:var(--cv-shadow-sm);transition:transform .2s,border-color .15s,box-shadow .2s}
main a:hover{transform:translateY(-2px);border-color:#ffc58f;box-shadow:var(--cv-shadow)}
a:focus-visible{outline:2px solid var(--cv-accent);outline-offset:3px}img{display:block;width:100%;aspect-ratio:16/9;border-radius:14px;object-fit:cover;background:var(--cv-inset)}
h2{font-size:16px;line-height:1.45;margin:2px 4px 0}small{display:block;margin:0 4px;font-size:13px;font-weight:700;color:var(--cv-accent)}
footer{padding-top:18px;border-top:2px dashed var(--cv-border);text-align:center;font-size:13px;color:var(--cv-subtle)}@media(max-width:700px){body{padding:14px 12px 36px}main{grid-template-columns:1fr}}
</style></head><body><div class="wrap"><header><a class="back" href="../../#labs">← 🧪 回到 3D 实验台</a><div><h1>🧪 选择一个 3D 化学实验</h1><p>独立打开的是完整实验台；回到「化学奇遇记」还可以听小念和爸爸边演边讲。</p></div></header>
<main>${catalog.map(course => `<a href="${course.slug}.html" data-slug="${course.slug}"><img src="../${course.cover}" alt="${escapeHtml(course.title)}的课件封面" loading="lazy"><h2>${escapeHtml(course.title)}</h2><small>🧪 3D 实验 · ${course.steps.length} 段</small></a>`).join('\n')}</main>
<footer>奇遇记系列 · 化学奇遇记 —— 小念一问，爸爸一答，把身边的化学看个明白</footer></div>
<script>document.querySelectorAll('[data-slug]').forEach(function(link){link.addEventListener('click',function(event){if(window.parent!==window){event.preventDefault();window.parent.postMessage({type:'chemverse:open-lesson',slug:link.dataset.slug},'*');}});});</script>
</body></html>`;
writeFileSync(join(destination, 'courses', 'index.html'), directory);
console.log(`Imported ${catalog.length} chemistry lessons, covers and original license notices.`);
