import { getState } from '../state';
import { formatTileValue, formatValue } from '../utils/dom';
import { VisualizationMode, type HeatmapProperty } from '../types/app';

const heatmapProperties = new Set<VisualizationMode>([
  VisualizationMode.Radius,
  VisualizationMode.Electronegativity,
  VisualizationMode.Ionization,
  VisualizationMode.Melting,
  VisualizationMode.Boiling,
  VisualizationMode.Density,
]);

function isVisualizationMode(mode: string): mode is VisualizationMode {
  return Object.values(VisualizationMode).includes(mode as VisualizationMode);
}

function setVisibility(el: HTMLElement, visible: boolean, baseOpacity = 1): void {
  const opacity = visible ? baseOpacity : Math.min(baseOpacity, 0.1);
  el.style.setProperty('--element-opacity', String(opacity));
  el.style.filter = visible ? 'none' : 'grayscale(100%)';
}

export function applyTableView(): void {
  const state = getState();
  const table = document.getElementById('table');
  if (!table) return;

  const mode = state.currentMode;
  const heatmapActive = heatmapProperties.has(mode);
  const query = state.searchQuery.trim().toLowerCase();

  table.classList.toggle('heatmap-active', heatmapActive);
  document.querySelectorAll<HTMLElement>('.mode-btn').forEach(btn => {
    const active = btn.dataset.mode === mode;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll<HTMLElement>('.legend-item').forEach(btn => {
    const active = Number(btn.dataset.catId) === state.currentActiveCategory;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });

  let minVal = Infinity;
  let maxVal = -Infinity;
  if (heatmapActive) {
    const prop = mode as HeatmapProperty;
    state.elements.forEach(element => {
      const value = element[prop];
      if (value > 0) {
        minVal = Math.min(minVal, value);
        maxVal = Math.max(maxVal, value);
      }
    });
  }
  const range = Number.isFinite(maxVal - minVal) && maxVal !== minVal ? maxVal - minVal : 1;

  document.querySelectorAll<HTMLElement>('.element').forEach(el => {
    if (el.classList.contains('placeholder')) {
      const categoryMatches = state.currentActiveCategory === null ||
        Number(el.dataset.catId) === state.currentActiveCategory;
      const searchMatches = query === '' || (el.textContent || '').toLowerCase().includes(query);
      setVisibility(el, categoryMatches && searchMatches, heatmapActive ? 0.1 : 1);
      return;
    }

    const data = state.elements[Number(el.dataset.idx) - 1];
    if (!data) return;

    const symbol = el.querySelector<HTMLElement>('.symbol');
    const detail = el.querySelector<HTMLElement>('.detail-val');
    if (!symbol || !detail) return;

    if (heatmapActive) {
      const value = data[mode as HeatmapProperty];
      if (value <= 0) {
        el.style.background = 'var(--cv-inset)';
        el.style.borderColor = 'var(--cv-border)';
        symbol.style.color = 'var(--cv-subtle)';
        detail.textContent = '-';
        detail.removeAttribute('title');
      } else {
        const ratio = (value - minVal) / range;
        const hue = 215 - ratio * 205;
        el.style.background = `hsl(${hue}, 68%, ${88 - ratio * 16}%)`;
        el.style.borderColor = `hsl(${hue}, 50%, 64%)`;
        symbol.style.color = `hsl(${hue}, 55%, 24%)`;
        detail.textContent = formatTileValue(value);
        detail.title = formatValue(value);
      }
    } else {
      el.style.background = '';
      el.style.borderColor = '';
      symbol.style.color = '';
      detail.textContent = '';
      detail.removeAttribute('title');
    }

    const categoryMatches = state.currentActiveCategory === null ||
      data.catId === state.currentActiveCategory;
    const searchMatches = query === '' ||
      data.name.toLowerCase().includes(query) ||
      data.enName.toLowerCase().includes(query) ||
      data.sym.toLowerCase().includes(query) ||
      String(data.idx) === query;
    setVisibility(el, categoryMatches && searchMatches);
  });
}

export function setMode(mode: string): void {
  if (!isVisualizationMode(mode)) return;

  const state = getState();
  state.currentMode = mode;
  applyTableView();
}
