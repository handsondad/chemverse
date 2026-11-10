import { raw, setHtml } from './html';

/** 文章里能拖着转的晶体：原子位置按真实的晶体结构算出来，画成带光影的球棍模型（纯 SVG） */
export type CrystalName = 'diamond' | 'graphite' | 'graphene' | 'salt';

export const crystalNames: readonly CrystalName[] = ['diamond', 'graphite', 'graphene', 'salt'];

type Element = 'C' | 'Na' | 'Cl';
type Vec = readonly [number, number, number];
interface Model {
  readonly atoms: readonly { readonly at: Vec; readonly el: Element }[];
  readonly bonds: readonly (readonly [number, number])[];
  /** 石墨层与层之间那点很弱的吸引，画成虚线 */
  readonly weak: readonly (readonly [number, number])[];
  /** 晶胞的棱，只是帮着看出立体感 */
  readonly cell: readonly (readonly [Vec, Vec])[];
  /** 挑一个原子，把它的键画成橙色：一眼看出它拉了几只手 */
  readonly hot?: number;
  readonly radius: Readonly<Record<Element, number>>;
  readonly bondWidth: number;
  readonly view: { readonly yaw: number; readonly pitch: number };
}

const SHADES: Record<Element, readonly [string, string, string]> = {
  C: ['#a9afb6', '#545a61', '#26292d'],
  Na: ['#ece4ff', '#9775fa', '#5f3dc4'],
  Cl: ['#dcf8e0', '#51cf66', '#2b8a3e'],
};
const BOND = '#bcae96';
const WEAK = '#e8590c';
const EDGE = '#d9c9ad';
const WIDTH = 480;
const HEIGHT = 340;
const SCALE = 142;
const HAND = '#f08c00';

const near = (a: Vec, b: Vec, d: number): boolean => Math.abs(Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) - d) < 0.01;

function pairs(atoms: readonly { at: Vec }[], d: number, keep: (i: number, j: number) => boolean = () => true): [number, number][] {
  const found: [number, number][] = [];
  atoms.forEach((a, i) => atoms.forEach((b, j) => {
    if (j > i && keep(i, j) && near(a.at, b.at, d)) found.push([i, j]);
  }));
  return found;
}

/** 金刚石：面心立方的格点再错开 (¼,¼,¼) 放一套，一个晶胞连边角共 18 个碳 */
function diamond(): Omit<Model, 'radius' | 'bondWidth' | 'view'> {
  const fcc: Vec[] = [[0, 0, 0], [0, 0.5, 0.5], [0.5, 0, 0.5], [0.5, 0.5, 0]];
  const basis = [...fcc, ...fcc.map(([x, y, z]): Vec => [x + 0.25, y + 0.25, z + 0.25])];
  const atoms: { at: Vec; el: Element }[] = [];
  for (const [x, y, z] of basis) {
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) for (let k = -1; k <= 1; k++) {
      const at: Vec = [x + i, y + j, z + k];
      if (at.every(v => v > -0.01 && v < 1.01) && !atoms.some(a => near(a.at, at, 0))) atoms.push({ at, el: 'C' });
    }
  }
  const corners = [0, 1].flatMap(x => [0, 1].flatMap(y => [0, 1].map((z): Vec => [x, y, z])));
  const cell = corners.flatMap((a, i) => corners.slice(i + 1).filter(b => near(a, b, 1)).map(b => [a, b] as [Vec, Vec]));
  return { atoms, bonds: pairs(atoms, Math.sqrt(3) / 4), weak: [], cell };
}

/** 蜂窝状的一层碳：键长当 1，取以某个六边形为中心、半径 patch 以内的原子 */
function honeycomb(patch: number, y: number, shift: number): Vec[] {
  const s3 = Math.sqrt(3);
  const [cx, cz] = [s3 / 2, 0.5 + shift];
  const out: Vec[] = [];
  for (let i = -8; i <= 8; i++) for (let j = -8; j <= 8; j++) {
    const [x, z] = [i * s3 + j * s3 / 2, j * 1.5 + shift];
    for (const at of [[x, y, z], [x, y, z + 1]] as Vec[]) {
      if (Math.hypot(at[0] - cx, at[2] - cz) <= patch + 0.01) out.push(at);
    }
  }
  return out;
}

/** 石墨：三层蜂窝错开一个键长叠起来（ABA），层间距 335 皮米，是层内键长 142 皮米的 2.36 倍 */
function layers(count: number, patch: number): Omit<Model, 'radius' | 'bondWidth' | 'view'> {
  const gap = 3.35 / 1.42;
  const atoms = Array.from({ length: count }, (_, k) => honeycomb(patch, k * gap, k % 2)).flat().map(at => ({ at, el: 'C' as Element }));
  const bonds = pairs(atoms, 1, (i, j) => Math.abs(atoms[i].at[1] - atoms[j].at[1]) < 0.01);
  const weak = pairs(atoms, gap, (i, j) => Math.abs(atoms[i].at[0] - atoms[j].at[0]) < 0.01 && Math.abs(atoms[i].at[2] - atoms[j].at[2]) < 0.01);
  return { atoms, bonds, weak, cell: [] };
}

/** 食盐：钠离子和氯离子前后左右上下交替排成 3×3×3 的小立方 */
function salt(): Omit<Model, 'radius' | 'bondWidth' | 'view'> {
  const atoms: { at: Vec; el: Element }[] = [];
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) for (let k = 0; k < 3; k++) {
    atoms.push({ at: [i, j, k], el: (i + j + k) % 2 === 0 ? 'Na' : 'Cl' });
  }
  return { atoms, bonds: pairs(atoms, 1), weak: [], cell: [] };
}

const models = new Map<CrystalName, Model>();

/** 把模型挪到原点、缩到半径 1，原子半径和键粗也跟着换算 */
function model(name: CrystalName): Model {
  const cached = models.get(name);
  if (cached) return cached;
  const base = name === 'diamond' ? diamond() : name === 'salt' ? salt() : name === 'graphite' ? layers(3, 2.7) : layers(1, 3.7);
  const points = base.atoms.map(a => a.at);
  const mid = [0, 1, 2].map(axis => (Math.min(...points.map(p => p[axis])) + Math.max(...points.map(p => p[axis]))) / 2);
  const move = (p: Vec): Vec => [p[0] - mid[0], p[1] - mid[1], p[2] - mid[2]];
  const size = Math.max(...points.map(p => Math.hypot(...move(p))));
  const fit = (p: Vec): Vec => {
    const [x, y, z] = move(p);
    return [x / size, y / size, z / size];
  };
  const [radius, bondWidth, view]: [Record<Element, number>, number, Model['view']] = name === 'diamond' ? [{ C: 0.1, Na: 0, Cl: 0 }, 0.05, { yaw: 0.55, pitch: 0.38 }]
    : name === 'salt' ? [{ C: 0, Na: 0.19, Cl: 0.31 }, 0.05, { yaw: 0.6, pitch: 0.42 }]
      : name === 'graphite' ? [{ C: 0.2, Na: 0, Cl: 0 }, 0.12, { yaw: 0.3, pitch: 0.3 }]
        : [{ C: 0.22, Na: 0, Cl: 0 }, 0.13, { yaw: 0.2, pitch: 0.95 }];
  const atoms = base.atoms.map(a => ({ at: fit(a.at), el: a.el }));
  const top = Math.max(...atoms.map(a => a.at[1]));
  const target: Vec | undefined = name === 'diamond' ? fit([0.25, 0.25, 0.25])
    : name === 'salt' ? undefined
      : [0, top, 0];
  const hot = target && atoms.reduce((best, a, i) => (Math.hypot(a.at[0] - target[0], a.at[1] - target[1], a.at[2] - target[2])
    < Math.hypot(atoms[best].at[0] - target[0], atoms[best].at[1] - target[1], atoms[best].at[2] - target[2]) ? i : best), 0);
  const built: Model = {
    atoms,
    bonds: base.bonds,
    weak: base.weak,
    cell: base.cell.map(([a, b]) => [fit(a), fit(b)] as const),
    hot,
    radius: { C: radius.C / size, Na: radius.Na / size, Cl: radius.Cl / size },
    bondWidth: bondWidth / size,
    view,
  };
  models.set(name, built);
  return built;
}

export const defaultView = (name: CrystalName): { yaw: number; pitch: number } => ({ ...model(name).view });

const f1 = (v: number): string => v.toFixed(1);

/** 转到 (yaw, pitch) 时的画面：远的先画、近的后画，越远越淡 */
export function crystalScene(name: CrystalName, yaw: number, pitch: number, id: string): string {
  const m = model(name);
  const [cy, sy, cp, sp] = [Math.cos(yaw), Math.sin(yaw), Math.cos(pitch), Math.sin(pitch)];
  const camera = 3.4;
  const project = ([x, y, z]: Vec): { x: number; y: number; z: number; k: number } => {
    const x1 = x * cy + z * sy;
    const z1 = -x * sy + z * cy;
    const y2 = y * cp - z1 * sp;
    const z2 = y * sp + z1 * cp;
    const k = camera / (camera - z2);
    return { x: WIDTH / 2 + SCALE * x1 * k, y: HEIGHT / 2 - SCALE * y2 * k, z: z2, k };
  };
  const seen = m.atoms.map(a => project(a.at));
  const fade = (z: number): string => (0.42 + 0.58 * (z + 1) / 2).toFixed(2);
  const items: { z: number; svg: string }[] = [];
  for (const [a, b] of m.cell) {
    const [p, q] = [project(a), project(b)];
    items.push({ z: (p.z + q.z) / 2 - 0.05, svg: `<line x1="${f1(p.x)}" y1="${f1(p.y)}" x2="${f1(q.x)}" y2="${f1(q.y)}" stroke="${EDGE}" stroke-width="1.5" stroke-dasharray="5 5" opacity="${fade((p.z + q.z) / 2)}"/>` });
  }
  for (const [i, j] of m.weak) {
    const [p, q] = [seen[i], seen[j]];
    items.push({ z: (p.z + q.z) / 2 - 0.02, svg: `<line x1="${f1(p.x)}" y1="${f1(p.y)}" x2="${f1(q.x)}" y2="${f1(q.y)}" stroke="${WEAK}" stroke-width="1.6" stroke-dasharray="2 5" stroke-linecap="round" opacity="${(Number(fade((p.z + q.z) / 2)) * 0.6).toFixed(2)}"/>` });
  }
  for (const [i, j] of m.bonds) {
    const [p, q] = [seen[i], seen[j]];
    const hand = m.hot === i || m.hot === j;
    const width = SCALE * m.bondWidth * (p.k + q.k) / 2 * (hand ? 1.35 : 1);
    items.push({ z: (p.z + q.z) / 2 - 0.02, svg: `<line x1="${f1(p.x)}" y1="${f1(p.y)}" x2="${f1(q.x)}" y2="${f1(q.y)}" stroke="${hand ? HAND : BOND}" stroke-width="${f1(width)}" stroke-linecap="round" opacity="${hand ? '1' : fade((p.z + q.z) / 2)}"/>` });
  }
  m.atoms.forEach((atom, i) => {
    const p = seen[i];
    const r = SCALE * m.radius[atom.el] * p.k;
    items.push({ z: p.z, svg: `<circle cx="${f1(p.x)}" cy="${f1(p.y)}" r="${f1(r)}" fill="url(#${id}-${atom.el})" opacity="${fade(p.z)}"/>` });
  });
  return items.sort((a, b) => a.z - b.z).map(item => item.svg).join('');
}

/** 静态的第一帧；没有脚本、或者在测试里也能看 */
export function crystalSvg(name: CrystalName, id: string, label: string): string {
  const { yaw, pitch } = defaultView(name);
  const elements = [...new Set(model(name).atoms.map(a => a.el))];
  const gradients = elements.map(el => {
    const [light, base, dark] = SHADES[el];
    return `<radialGradient id="${id}-${el}" cx="0.35" cy="0.3" r="0.75"><stop offset="0" stop-color="${light}"/><stop offset="0.55" stop-color="${base}"/><stop offset="1" stop-color="${dark}"/></radialGradient>`;
  }).join('');
  return `<svg class="fig-svg is-crystal" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" tabindex="0" aria-label="${label}" data-crystal="${name}" data-id="${id}" data-yaw="${yaw}" data-pitch="${pitch}">`
    + `<defs>${gradients}</defs><g class="crystal-scene">${crystalScene(name, yaw, pitch, id)}</g></svg>`;
}

const isCrystal = (value: string | undefined): value is CrystalName => crystalNames.includes(value as CrystalName);

/** 让文章里的晶体图能拖着转：看得见时慢慢自转，拖动时跟手，松手两秒半后接着转 */
export function mountCrystals(root: ParentNode): () => void {
  const stops = [...root.querySelectorAll<SVGSVGElement>('svg[data-crystal]')].map(spin);
  return () => stops.forEach(stop => stop());
}

function spin(svg: SVGSVGElement): () => void {
  const name = svg.dataset.crystal;
  const scene = svg.querySelector('.crystal-scene');
  if (!isCrystal(name) || !scene) return () => undefined;
  const id = svg.dataset.id ?? 'crystal';
  let yaw = Number(svg.dataset.yaw) || 0;
  let pitch = Number(svg.dataset.pitch) || 0;
  const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  let visible = false;
  let frame = 0;
  let last = 0;
  let drawn = 0;
  let resumeAt = 0;
  let drag: { x: number; y: number; pointer: number } | null = null;

  const draw = (): void => setHtml(scene, raw(crystalScene(name, yaw, pitch, id)));
  const tick = (now: number): void => {
    frame = 0;
    if (!visible || still) return;
    const dt = last ? Math.min(now - last, 100) / 1000 : 0;
    last = now;
    if (!drag && now >= resumeAt) {
      yaw += dt * 0.32;
      if (now - drawn > 30) { draw(); drawn = now; }
    }
    frame = requestAnimationFrame(tick);
  };
  const start = (): void => {
    if (!frame && visible && !still && typeof requestAnimationFrame === 'function') { last = 0; frame = requestAnimationFrame(tick); }
  };
  const observer = typeof IntersectionObserver === 'function'
    ? new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      if (visible) start();
    }, { threshold: 0.2 })
    : null;
  observer?.observe(svg);

  const onDown = (event: PointerEvent): void => {
    drag = { x: event.clientX, y: event.clientY, pointer: event.pointerId };
    svg.classList.add('is-dragging');
    try {
      svg.setPointerCapture?.(event.pointerId);
    } catch {
      // 指针已经松开时浏览器会拒绝捕获，拖动照样能用
    }
  };
  const onMove = (event: PointerEvent): void => {
    if (!drag || event.pointerId !== drag.pointer) return;
    yaw += (event.clientX - drag.x) * 0.012;
    if (event.pointerType !== 'touch') pitch = Math.max(-1.3, Math.min(1.3, pitch + (event.clientY - drag.y) * 0.012));
    drag = { ...drag, x: event.clientX, y: event.clientY };
    draw();
  };
  const onUp = (): void => {
    if (!drag) return;
    drag = null;
    svg.classList.remove('is-dragging');
    resumeAt = performance.now() + 2500;
    start();
  };
  const onKey = (event: KeyboardEvent): void => {
    const turn = { ArrowLeft: [-0.2, 0], ArrowRight: [0.2, 0], ArrowUp: [0, -0.2], ArrowDown: [0, 0.2] }[event.key];
    if (!turn) return;
    event.preventDefault();
    yaw += turn[0];
    pitch = Math.max(-1.3, Math.min(1.3, pitch + turn[1]));
    resumeAt = performance.now() + 2500;
    draw();
  };
  svg.addEventListener('pointerdown', onDown);
  svg.addEventListener('pointermove', onMove);
  svg.addEventListener('pointerup', onUp);
  svg.addEventListener('pointercancel', onUp);
  svg.addEventListener('keydown', onKey);
  return () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    visible = false;
    observer?.disconnect();
    svg.removeEventListener('pointerdown', onDown);
    svg.removeEventListener('pointermove', onMove);
    svg.removeEventListener('pointerup', onUp);
    svg.removeEventListener('pointercancel', onUp);
    svg.removeEventListener('keydown', onKey);
  };
}
