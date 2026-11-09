import './css/styles.css';
import '../public/theme/tokens.css';
import { getState } from './state';
import { t, updateElementTranslations } from './i18n';
import { renderTable } from './modules/table';
import { renderLegend } from './modules/legend';
import { setMode } from './modules/heatmap';
import { initDragControl, initExpandedDragControl, openExpandedAtom, closeExpandedAtom, updateExpandedAtomInfo } from './modules/atom3d';
import { closeModal, refreshModal, switchTab } from './modules/modal';
import { initMedia } from './modules/media';
import { initSearch } from './modules/search';
import { getElement, queryElement } from './utils/dom';
import { TabId } from './types/app';
import { initLearningApp } from './learning/app';

function setLanguage(lang: 'zh' | 'en'): void {
  const state = getState();
  state.currentLanguage = lang;

  getElement('lang-zh').classList.toggle('active', lang === 'zh');
  getElement('lang-en').classList.toggle('active', lang === 'en');
  getElement('lang-zh').setAttribute('aria-pressed', String(lang === 'zh'));
  getElement('lang-en').setAttribute('aria-pressed', String(lang === 'en'));
  getElement('elements-view').lang = lang === 'zh' ? 'zh-CN' : 'en';
  getElement('modal').lang = lang === 'zh' ? 'zh-CN' : 'en';
  getElement('expandedAtomModal').lang = lang === 'zh' ? 'zh-CN' : 'en';

  updateUILanguage();
  renderTable();
  renderLegend();

  const modal = getElement('modal');
  if (modal.classList.contains('open') && state.currentElementData) {
    refreshModal();
  }
  const expandedAtomModal = getElement('expandedAtomModal');
  if (expandedAtomModal.classList.contains('open')) {
    updateExpandedAtomInfo();
  }
}

function updateUILanguage(): void {
  updateElementTranslations({
    'main-title': 'periodic-table-title',
    'mode-standard': 'standard',
    'mode-radius': 'radius',
    'mode-electronegativity': 'electronegativity',
    'mode-ionization': 'ionization-energy',
    'mode-melting': 'melting-point',
    'mode-boiling': 'boiling-point',
    'mode-density': 'density',
    'rotate-hint': 'rotate-hint',
  });

  const searchInput = getElement<HTMLInputElement>('searchInput');
  searchInput.placeholder = t('search-placeholder');
  searchInput.setAttribute('aria-label', t('search-label'));
  getElement('search-label').textContent = t('search-label');
  queryElement('.mode-group').setAttribute('aria-label', t('mode-label'));
  queryElement('.language-toggle').setAttribute('aria-label', t('language-label'));
  getElement('legend').setAttribute('aria-label', t('legend-label'));
  getElement('table').setAttribute('aria-label', t('table-label'));
  queryElement('.tab-nav').setAttribute('aria-label', t('tab-list-label'));
  document.querySelectorAll<HTMLElement>('.close-btn').forEach(btn => {
    btn.setAttribute('aria-label', t('close'));
  });
  const expandButton = queryElement('.expand-btn');
  expandButton.setAttribute('aria-label', t('expand-atom'));
  expandButton.setAttribute('title', t('expand-atom'));
  getElement('atomWrapper').setAttribute('aria-label', t('atom-controls'));
  getElement('expandedAtomWrapper').setAttribute('aria-label', t('expanded-atom-controls'));
}

function bindEvents(): void {
  document.querySelectorAll<HTMLElement>('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => setMode(btn.dataset.mode!));
  });

  getElement('lang-zh').addEventListener('click', () => setLanguage('zh'));
  getElement('lang-en').addEventListener('click', () => setLanguage('en'));

  document.querySelectorAll<HTMLElement>('.close-btn').forEach(btn => {
    if (btn.closest('.expanded-atom-overlay')) {
      btn.addEventListener('click', closeExpandedAtom);
    } else {
      btn.addEventListener('click', closeModal);
    }
  });

  document.querySelector('.expand-btn')?.addEventListener('click', openExpandedAtom);

  document.querySelectorAll<HTMLElement>('.tab-btn').forEach(btn => {
    const tabId = btn.id.replace('tab-', '') as TabId;
    btn.addEventListener('click', () => switchTab(tabId));
    btn.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>('.tab-btn'));
      const currentIndex = tabs.indexOf(btn as HTMLButtonElement);
      let nextIndex = currentIndex;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;
      if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length;
      const nextTab = tabs[nextIndex];
      switchTab(nextTab.id.replace('tab-', '') as TabId);
      nextTab.focus();
    });
  });

  initMedia();

  const modal = getElement('modal');
  const expandedAtomModal = getElement('expandedAtomModal');

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  expandedAtomModal.addEventListener('click', (e) => {
    if (e.target === expandedAtomModal) closeExpandedAtom();
  });
}

function trapDialogFocus(event: KeyboardEvent): void {
  if (event.key !== 'Tab') return;

  const expandedOpen = getElement('expandedAtomModal').classList.contains('open');
  const modalOpen = getElement('modal').classList.contains('open');
  if (!expandedOpen && !modalOpen) return;

  const dialog = queryElement(expandedOpen ? '.expanded-atom-card' : '.hologram-card');
  const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(
    'a[href], button:not(:disabled), input:not(:disabled), [tabindex]:not([tabindex="-1"])'
  )).filter(element => !element.closest('[hidden]'));

  if (focusable.length === 0) {
    event.preventDefault();
    dialog.focus();
    return;
  }

  const currentIndex = focusable.indexOf(document.activeElement as HTMLElement);
  const nextIndex = event.shiftKey
    ? (currentIndex <= 0 ? focusable.length - 1 : currentIndex - 1)
    : (currentIndex < 0 || currentIndex === focusable.length - 1 ? 0 : currentIndex + 1);
  event.preventDefault();
  focusable[nextIndex].focus();
}

function initKeyboard(): void {
  const expandedAtomModal = getElement('expandedAtomModal');
  document.addEventListener('keydown', (e) => {
    trapDialogFocus(e);
    if (e.key === 'Escape') {
      if (expandedAtomModal.classList.contains('open')) {
        closeExpandedAtom();
      } else if (getElement('modal').classList.contains('open')) {
        closeModal();
      }
    }
  });
}

let periodicTableLoad: Promise<void> | null = null;

function loadPeriodicTable(): Promise<void> {
  periodicTableLoad ??= import('./data')
    .then(({ processElementsData }) => {
      getState().elements = processElementsData();
      renderTable();
    })
    .catch(error => {
      periodicTableLoad = null;
      console.error('ChemVerse could not load the element data.', error);
      getElement('table').textContent = t('table-load-failed');
    });
  return periodicTableLoad;
}

function init(): void {
  bindEvents();
  updateUILanguage();
  renderLegend();
  initDragControl();
  initExpandedDragControl();
  initSearch();
  initKeyboard();
  initLearningApp(loadPeriodicTable);
}

init();
