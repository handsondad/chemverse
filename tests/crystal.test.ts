import { afterEach, describe, expect, it, vi } from 'vitest';
import { crystalNames, crystalScene, crystalSvg, mountCrystals } from '../src/learning/crystal';
import { renderFigure } from '../src/learning/figures';

const circles = (markup: string): number => markup.match(/<circle /g)?.length ?? 0;
const lines = (markup: string, color: string): number => markup.split('<line ').filter(line => line.includes(`stroke="${color}"`)).length;

describe('rotatable crystal figures', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('build the real structures: atom counts and bonds per atom', () => {
    const diamond = crystalScene('diamond', 0.4, 0.3, 'd');
    expect(circles(diamond)).toBe(18);
    expect(lines(diamond, '#f08c00')).toBe(4);
    expect(lines(diamond, '#bcae96') + 4).toBe(16);

    const graphite = crystalScene('graphite', 0.4, 0.3, 'g');
    expect(circles(graphite)).toBe(72);
    expect(lines(graphite, '#f08c00')).toBe(3);
    expect(lines(graphite, '#e8590c')).toBeGreaterThan(0);

    const salt = crystalScene('salt', 0.4, 0.3, 's');
    expect(circles(salt)).toBe(27);
    expect(salt.match(/url\(#s-Na\)/g)).toHaveLength(14);
    expect(salt.match(/url\(#s-Cl\)/g)).toHaveLength(13);
    expect(lines(salt, '#bcae96')).toBe(54);
  });

  it('draw every structure at every angle without broken numbers', () => {
    for (const name of crystalNames) {
      for (let yaw = 0; yaw < Math.PI * 2; yaw += 0.7) {
        for (const pitch of [-1.3, 0, 0.6, 1.3]) {
          expect(crystalScene(name, yaw, pitch, 'x'), `${name} ${yaw} ${pitch}`).not.toMatch(/NaN|undefined|Infinity/);
        }
      }
    }
  });

  it('render as a static figure with a legend, and turn with the keyboard once mounted', () => {
    const figure = renderFigure({ kind: 'crystal', caption: '钻石 <b>里</b>', structure: 'diamond' }, 2).value;
    expect(figure).toContain('data-crystal="diamond"');
    expect(figure).toContain('id="crystal-2-C"');
    expect(figure).toContain('一个碳的四只手');
    expect(figure).not.toContain('<b>');
    document.body.innerHTML = figure;
    const svg = document.querySelector<SVGSVGElement>('svg[data-crystal]')!;
    const before = svg.querySelector('.crystal-scene')!.innerHTML;
    const release = mountCrystals(document.body);
    svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(svg.querySelector('.crystal-scene')!.innerHTML).not.toBe(before);
    release();
    const turned = svg.querySelector('.crystal-scene')!.innerHTML;
    svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(svg.querySelector('.crystal-scene')!.innerHTML).toBe(turned);
  });

  it('spins only while on screen and stops when the article is left', () => {
    let seen: ((entries: { isIntersecting: boolean }[]) => void) | undefined;
    const frames: FrameRequestCallback[] = [];
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback: (entries: { isIntersecting: boolean }[]) => void) { seen = callback; }
      observe(): void {}
      disconnect(): void {}
    });
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => frames.push(callback));
    vi.stubGlobal('cancelAnimationFrame', () => frames.splice(0));
    const flush = (now: number): void => frames.splice(0).forEach(frame => frame(now));
    try {
      document.body.innerHTML = renderFigure({ kind: 'crystal', caption: '石墨', structure: 'graphite' }, 0).value;
      const scene = document.querySelector('.crystal-scene')!;
      const release = mountCrystals(document.body);
      const still = scene.innerHTML;
      flush(0);
      expect(frames).toHaveLength(0);
      seen!([{ isIntersecting: true }]);
      flush(1000);
      flush(1100);
      expect(scene.innerHTML).not.toBe(still);
      release();
      expect(frames).toHaveLength(0);
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('gives each figure its own gradient ids', () => {
    expect(crystalSvg('salt', 'a', 'x')).toContain('id="a-Cl"');
    expect(crystalSvg('salt', 'b', 'x')).toContain('id="b-Na"');
  });
});
