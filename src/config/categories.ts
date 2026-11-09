import type { Category } from '../types/element';

export const categories: readonly Category[] = [
  { name: '碱金属', nameEn: 'Alkali Metal', color: '#d96b5c' },
  { name: '碱土金属', nameEn: 'Alkaline Earth Metal', color: '#d98e46' },
  { name: '过渡金属', nameEn: 'Transition Metal', color: '#5b7fa6' },
  { name: '后过渡金属', nameEn: 'Post-transition Metal', color: '#499478' },
  { name: '类金属', nameEn: 'Metalloid', color: '#3d9199' },
  { name: '非金属', nameEn: 'Nonmetal', color: '#689c54' },
  { name: '卤素', nameEn: 'Halogen', color: '#8c72b8' },
  { name: '稀有气体', nameEn: 'Noble Gas', color: '#4f86b8' },
  { name: '镧系', nameEn: 'Lanthanide', color: '#b87692' },
  { name: '锕系', nameEn: 'Actinide', color: '#9a73b5' },
] as const;

export const categoryNameMap: Record<string, number> = {
  '碱金属': 0,
  '碱土金属': 1,
  '过渡金属': 2,
  '后过渡金属': 3,
  '类金属': 4,
  '非金属': 5,
  '卤素': 6,
  '稀有气体': 7,
  '镧系': 8,
  '锕系': 9,
};
