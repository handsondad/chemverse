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
<title>化学课件目录 · ChemVerse</title><link rel="stylesheet" href="../../theme/tokens.css"><style>
*{box-sizing:border-box}body{margin:0;padding:30px;background:var(--cv-bg);color:var(--cv-text);font:14px/1.8 var(--cv-font)}
h1{font-size:26px}p,footer{color:#a7bdaf}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:18px;margin:25px 0}
a{color:#c3eed1}main a{display:block;border:1px solid #3b5745;border-radius:10px;overflow:hidden;text-decoration:none;background:#1a2a20}
a:focus-visible{outline:3px solid #b7edc9;outline-offset:3px}img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover}h2{font-size:15px;margin:14px}small{display:block;margin:14px;color:#a7bdaf}
</style></head><body><h1>选择下一次化学探索</h1>
<p>这是课件内目录。在 ChemVerse 中选择课程会返回完整学习界面；独立打开时，可直接切换课件。</p>
<main>${catalog.map(course => `<a href="${course.slug}.html" data-slug="${course.slug}"><img src="../${course.cover}" alt="${escapeHtml(course.title)}的课件封面" loading="lazy"><h2>${escapeHtml(course.title)}</h2><small>${course.steps.length} 个探索步骤</small></a>`).join('\n')}</main>
<footer>ChemVerse 化学视界 · 让理解发生</footer>
<script>document.querySelectorAll('[data-slug]').forEach(function(link){link.addEventListener('click',function(event){if(window.parent!==window){event.preventDefault();window.parent.postMessage({type:'chemverse:open-lesson',slug:link.dataset.slug},'*');}});});</script>
</body></html>`;
writeFileSync(join(destination, 'courses', 'index.html'), directory);
console.log(`Imported ${catalog.length} chemistry lessons, covers and original license notices.`);
