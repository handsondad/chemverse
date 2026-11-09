import { getState } from '../state';
import { t, type TranslationKey } from '../i18n';
import { getElement } from '../utils/dom';
import type { Element } from '../types/element';

const LOAD_TIMEOUT = 5000;

interface MediaSlot {
  buttonId: string;
  textId: string;
  displayId: string;
  imageId: string;
  label: TranslationKey;
  url(data: Element): string | null;
  caption?: { id: string; text(data: Element): string };
  pendingUrl: string | null;
  timeout: ReturnType<typeof setTimeout> | null;
}

const slots: MediaSlot[] = [
  {
    buttonId: 'load-image-btn',
    textId: 'load-image-text',
    displayId: 'image-display',
    imageId: 'element-image',
    label: 'load-image',
    url: data => data.image?.url ?? null,
    caption: { id: 'image-caption', text: data => data.image?.title || '' },
    pendingUrl: null,
    timeout: null,
  },
  {
    buttonId: 'load-bohr-image-btn',
    textId: 'load-bohr-image-text',
    displayId: 'bohr-image-display',
    imageId: 'bohr-image',
    label: 'load-bohr-image',
    url: data => data.bohrModelImage,
    pendingUrl: null,
    timeout: null,
  },
];

function clearPendingTimeout(slot: MediaSlot): void {
  if (slot.timeout) clearTimeout(slot.timeout);
  slot.timeout = null;
}

function cancelLoad(slot: MediaSlot): void {
  clearPendingTimeout(slot);
  slot.pendingUrl = null;
}

export function cancelMediaLoads(): void {
  slots.forEach(cancelLoad);
}

export function resetMediaContainers(): void {
  slots.forEach(slot => {
    cancelLoad(slot);
    const btn = getElement<HTMLButtonElement>(slot.buttonId);
    const img = getElement<HTMLImageElement>(slot.imageId);
    img.onload = null;
    img.onerror = null;
    img.src = '';
    btn.style.display = 'flex';
    btn.classList.remove('loading', 'error', 'disabled');
    btn.disabled = false;
    btn.setAttribute('aria-busy', 'false');
    getElement(slot.displayId).style.display = 'none';
  });
}

export function updateMediaButtons(data: Element): void {
  slots.forEach(slot => {
    const btn = getElement<HTMLButtonElement>(slot.buttonId);
    const available = !!slot.url(data);
    btn.classList.toggle('disabled', !available);
    btn.disabled = !available;
    getElement(slot.textId).textContent = available ? t(slot.label) : t('no-resource');
  });
}

function setButtonError(btn: HTMLButtonElement, textSpan: HTMLElement, message: string): void {
  btn.classList.remove('loading');
  btn.classList.add('error');
  btn.disabled = false;
  btn.setAttribute('aria-busy', 'false');
  textSpan.textContent = message;
}

function loadMedia(slot: MediaSlot): void {
  const data = getState().currentElementData;
  const url = data ? slot.url(data) : null;
  if (!data || !url) return;

  const btn = getElement<HTMLButtonElement>(slot.buttonId);
  const textSpan = getElement(slot.textId);
  const display = getElement(slot.displayId);
  const img = getElement<HTMLImageElement>(slot.imageId);

  if (btn.disabled || btn.classList.contains('loading')) return;

  btn.classList.remove('error');
  textSpan.textContent = t('loading');
  btn.classList.add('loading');
  btn.disabled = true;
  btn.setAttribute('aria-busy', 'true');

  clearPendingTimeout(slot);
  slot.pendingUrl = url;

  slot.timeout = setTimeout(() => {
    if (slot.pendingUrl === url && btn.classList.contains('loading')) {
      img.onload = null;
      img.onerror = null;
      img.src = '';
      slot.timeout = null;
      setButtonError(btn, textSpan, t('load-timeout'));
    }
  }, LOAD_TIMEOUT);

  img.onload = () => {
    if (slot.pendingUrl !== url) return;
    clearPendingTimeout(slot);
    btn.style.display = 'none';
    btn.setAttribute('aria-busy', 'false');
    display.style.display = 'block';
    if (slot.caption) getElement(slot.caption.id).textContent = slot.caption.text(data);
  };

  img.onerror = () => {
    if (slot.pendingUrl !== url) return;
    clearPendingTimeout(slot);
    setButtonError(btn, textSpan, t('load-failed'));
  };

  img.src = url;
}

export function initMedia(): void {
  slots.forEach(slot => {
    getElement(slot.buttonId).addEventListener('click', () => loadMedia(slot));
  });
}
