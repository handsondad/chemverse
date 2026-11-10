import { getState } from '../state';
import { applyTableView, setMode } from '../modules/heatmap';
import type { TableView } from './figures';

/**
 * 整站只有一张真正的元素周期表（index.html 里的 `#elements-view`，带搜索、热力图和元素详情弹窗）。
 * 文章要用时把它搬进来，离开文章再停回隐藏的 `#periodic-host`。
 */
let view: HTMLElement | undefined;
let parking: HTMLElement | undefined;
let load: () => Promise<void> = () => Promise.resolve();

export function registerPeriodic(table: HTMLElement, host: HTMLElement, loader: () => Promise<void>): void {
  view = table;
  parking = host;
  load = loader;
}

export function applyTableLink(preset: TableView = {}): void {
  const state = getState();
  state.currentActiveCategory = preset.category ?? null;
  state.searchQuery = '';
  const search = view?.querySelector<HTMLInputElement>('#searchInput');
  if (search) search.value = '';
  setMode(preset.mode ?? 'default');
  applyTableView();
}

/** 把周期表放进 host，数据加载好后切到 preset 的样子 */
export function showPeriodic(host: HTMLElement, preset?: TableView): Promise<void> {
  if (!view) return Promise.resolve();
  host.replaceChildren(view);
  return load().then(() => applyTableLink(preset));
}

export function parkPeriodic(): void {
  if (view && parking && view.parentElement !== parking) parking.append(view);
}
