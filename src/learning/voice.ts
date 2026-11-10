import manifest from '../data/voice-manifest.json';
import type { LineLength, Speaker } from './film/narration';

// 小念和爸爸的配音：npm run voice 用 edge-tts 把每篇有动画的文章逐句读出来，
// 放在 public/voice/<slug>/<轮次>-<nian|dad>.mp3，时长记在 src/data/voice-manifest.json。
// 声音和「身体奇遇记」一样，同一对角色听起来也是同一对人。

export const voices = {
  nian: { voice: 'zh-CN-YunxiaNeural', rate: '+0%' },
  dad: { voice: 'zh-CN-YunxiNeural', rate: '-5%' },
} as const satisfies Record<Speaker, { voice: string; rate: string }>;

export const clipKey = (slug: string, turn: number, who: Speaker): string => `${slug}/${turn}-${who}`;

export type VoiceManifest = { voices: typeof voices; clips: Record<string, { hash: string; seconds: number }> };

/** 化学式念成名字；前面已经说了名字就不再念一遍 */
const SPOKEN_NAMES: readonly (readonly [string, string])[] = [
  ['Fe²⁺', '亚铁离子'],
  ['Fe³⁺', '铁离子'],
  ['H⁺', '氢离子'],
  ['H₂S', '硫化氢'],
  ['H₂O', '水'],
  ['NaCl', '氯化钠'],
  ['KSCN', '硫氰化钾'],
];

const escapeRegExp = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** 文章里的字 → 念出来的字：化学式、化合价、温度和角度换成读法 */
export function speakable(text: string): string {
  let out = text;
  for (const [symbol, name] of SPOKEN_NAMES) {
    out = out.replace(new RegExp(`${escapeRegExp(name)}\\s*${escapeRegExp(symbol)}`, 'g'), name).split(symbol).join(name);
  }
  return out
    .replace(/(^|[^\d])\+(\d)/g, '$1正$2')
    .replace(/(^|[^\d])[−-](\d)/g, '$1负$2')
    .replace(/(\d)\s*[–~～]\s*(\d)/g, '$1到$2')
    .replace(/(\d+)°(\d+)′/g, '$1度$2分')
    .replace(/(\d+)°/g, '$1度')
    .replace(/\s*℃/g, '摄氏度')
    .replace(/84\s*消毒液/g, '八四消毒液')
    .replace(/([\u4e00-\u9fff])\s+(?=[\u4e00-\u9fff])/g, '$1');
}

// 3D 实验台「看懂原理」也是小念问、爸爸讲：npm run voice 把每一段念成
// public/voice/lab/<课件>/<段>-<q|seen|concl>-<指纹>.mp3。指纹算的是课件里的原文（fnv1a），
// 课件改了字，文件名就对不上，实验台退回无声，等重新配音。
export type LabPart = 'q' | 'seen' | 'concl';
export const labSpeaker: Record<LabPart, Speaker> = { q: 'nian', seen: 'dad', concl: 'dad' };

/** 和 public/theme/lesson-adapter.js 里的 fnv1a 一字不差 */
export function fnv1a(text: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, '0');
}

export const labClipKey = (slug: string, segment: number, part: LabPart, raw: string): string =>
  `lab/${slug}/${segment}-${part}-${fnv1a(raw)}`;

const LAB_NAMES: Record<string, string> = {
  'Fe³⁺': '铁离子', 'Fe²⁺': '亚铁离子', 'Cu²⁺': '铜离子', 'Zn²⁺': '锌离子', 'Ca²⁺': '钙离子', 'Mg²⁺': '镁离子',
  'Ba²⁺': '钡离子', 'Al³⁺': '铝离子', 'Ag⁺': '银离子', 'Na⁺': '钠离子', 'K⁺': '钾离子', 'H⁺': '氢离子',
  'NH₄⁺': '铵根离子', 'OH⁻': '氢氧根离子', 'Cl⁻': '氯离子', 'Br⁻': '溴离子', 'I⁻': '碘离子', 'S²⁻': '硫离子',
  'SO₄²⁻': '硫酸根离子', 'SO₃²⁻': '亚硫酸根离子', 'CO₃²⁻': '碳酸根离子', 'HCO₃⁻': '碳酸氢根离子',
  'NO₃⁻': '硝酸根离子', 'SCN⁻': '硫氰根离子', 'CH₃COO⁻': '醋酸根离子', 'ClO⁻': '次氯酸根离子',
  'H₂': '氢气', 'O₂': '氧气', 'N₂': '氮气', 'Cl₂': '氯气', 'Br₂': '溴', 'I₂': '碘', 'O₃': '臭氧',
  'CO': '一氧化碳', 'CO₂': '二氧化碳', 'SO₂': '二氧化硫', 'SO₃': '三氧化硫', 'NO': '一氧化氮', 'NO₂': '二氧化氮',
  'N₂O₄': '四氧化二氮', 'NH₃': '氨气', 'H₂O': '水', 'H₂O₂': '过氧化氢', 'H₂S': '硫化氢', 'HCl': '氯化氢',
  'HClO': '次氯酸', 'HNO₃': '硝酸', 'H₂SO₄': '硫酸', 'H₂SO₃': '亚硫酸', 'H₂CO₃': '碳酸', 'HBr': '溴化氢',
  'NaCl': '氯化钠', 'NaOH': '氢氧化钠', 'NaClO': '次氯酸钠', 'Na₂CO₃': '碳酸钠', 'NaHCO₃': '碳酸氢钠',
  'Na₂SO₄': '硫酸钠', 'Na₂S₂O₃': '硫代硫酸钠', 'Na₂O': '氧化钠', 'Na₂O₂': '过氧化钠', 'NaBr': '溴化钠',
  'KOH': '氢氧化钾', 'KCl': '氯化钾', 'KI': '碘化钾', 'KSCN': '硫氰化钾', 'KMnO₄': '高锰酸钾', 'KNO₃': '硝酸钾',
  'NH₄Cl': '氯化铵', 'NH₄HCO₃': '碳酸氢铵', 'NH₄NO₃': '硝酸铵', '(NH₄)₂SO₄': '硫酸铵',
  'CaO': '氧化钙', 'Ca(OH)₂': '氢氧化钙', 'CaCO₃': '碳酸钙', 'CaSO₄': '硫酸钙', 'CaCl₂': '氯化钙', 'CaSiO₃': '硅酸钙',
  'FeCl₃': '氯化铁', 'FeCl₂': '氯化亚铁', 'Fe(OH)₃': '氢氧化铁', 'Fe(OH)₂': '氢氧化亚铁', 'Fe(SCN)₃': '硫氰化铁',
  'Fe₂O₃': '氧化铁', 'Fe₃O₄': '四氧化三铁', 'FeO': '氧化亚铁', 'FeSO₄': '硫酸亚铁', 'FeS₂': '二硫化亚铁', 'FeS': '硫化亚铁',
  'CuCl₂': '氯化铜', 'CuSO₄': '硫酸铜', 'CuO': '氧化铜', 'Cu(NO₃)₂': '硝酸铜', 'Cu(OH)₂': '氢氧化铜', 'ZnSO₄': '硫酸锌',
  'BaSO₄': '硫酸钡', 'BaCl₂': '氯化钡', 'AgNO₃': '硝酸银', 'AgCl': '氯化银', 'MnO₂': '二氧化锰',
  'Al₂O₃': '氧化铝', 'Al(OH)₃': '氢氧化铝', 'MgCl₂': '氯化镁', 'MgO': '氧化镁', 'SiO₂': '二氧化硅',
  'CH₄': '甲烷', 'C₂H₆': '乙烷', 'C₂H₄': '乙烯', 'C₂H₂': '乙炔', 'C₃H₈': '丙烷', 'C₄H₁₀': '丁烷',
  'CH₃COOH': '醋酸', 'C₂H₅OH': '乙醇', 'CH₃COONa': '醋酸钠', 'CₙH₂ₙ₊₂': 'C n H 2n加2',
  'H₂O(g)': '水蒸气', 'NH₃·H₂O': '一水合氨', 'COS': '羰基硫', 'NOx': '氮氧化物', 'f-CaO': '游离氧化钙',
  'FeSCN²⁺': '硫氰合铁离子', 'CrO₄²⁻': '铬酸根离子', 'Cr₂O₇²⁻': '重铬酸根离子', 'O²⁻': '氧离子',
  'V₂O₅': '五氧化二钒', 'Na₂S': '硫化钠', 'Ba(OH)₂': '氢氧化钡', 'Mg(OH)₂': '氢氧化镁', 'Al₂(SO₄)₃': '硫酸铝',
  'Fe': '铁', 'Cu': '铜', 'Zn': '锌', 'Al': '铝', 'Na': '钠', 'Mg': '镁', 'Ag': '银', 'Ca': '钙', 'Pt': '铂', 'Hg': '汞',
  'Br': '溴', 'Cl': '氯', 'S': '硫', 'N': '氮', 'C': '碳',
};
const LAB_UNITS: Record<string, string> = {
  'mol/(L·s)': '摩尔每升每秒', 'mmol/L': '毫摩尔每升', 'mol/L': '摩尔每升', 'mg/L': '毫克每升', 'g/L': '克每升',
  'kJ·mol⁻¹': '千焦每摩尔', 'kJ/mol': '千焦每摩尔', 'mg·m⁻³': '毫克每立方米', 'mg/m³': '毫克每立方米',
  'kW·h/t': '千瓦时每吨', 'kW·h': '千瓦时', 'kg/t': '千克每吨', 'kg/kg': '千克每千克', 'kJ/kg': '千焦每千克',
  'kg/h': '千克每小时', 't/h': '吨每小时', 't/d': '吨每天', 'm³/h': '立方米每小时', 'mL/min': '毫升每分钟',
  'kA/m²': '千安每平方米', 'mS/cm': '毫西每厘米', 'eV·nm': '电子伏纳米', 'g/100 g': '克每100克',
  'mmol': '毫摩尔', 'mol': '摩尔', 'mL': '毫升', 'mA': '毫安', 'kA': '千安', 'kV': '千伏', 'eV': '电子伏',
  'kg': '千克', 'mg': '毫克', 'nm': '纳米', 'pm': '皮米', 'mm': '毫米', 'cm': '厘米', 'km': '千米', 'm³': '立方米',
  'min': '分钟', 'MPa': '兆帕', 'kPa': '千帕', 'Pa': '帕', 'kJ': '千焦', 'kW': '千瓦',
};
/** 一个字母的单位要和数字隔一个空格才算（「4s 轨道」「4p」不是秒） */
const LAB_SHORT_UNITS: Record<string, string> = { L: '升', A: '安', V: '伏', g: '克', t: '吨', m: '米', s: '秒', h: '小时', W: '瓦', K: '开', Ω: '欧' };
const byLength = (table: Record<string, string>): string =>
  Object.keys(table).sort((a, b) => b.length - a.length).map(escapeRegExp).join('|');
// ¹²³ 不在 ⁰-⁹ 这段编码里，上标数字要一个个列出来
const SUPERSCRIPT = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const SUBSCRIPT = '₀₁₂₃₄₅₆₇₈₉';
const NOT_AFTER_FORMULA = `(?![A-Za-z₀-₉ₙ₊${SUPERSCRIPT}⁺⁻(])`;
const LAB_FORMULA = new RegExp(`(?<![A-Za-z₀-₉ₙ])(${byLength(LAB_NAMES)})${NOT_AFTER_FORMULA}`, 'g');
const LAB_UNIT = new RegExp(`([\\d${SUPERSCRIPT}])\\s*(${byLength(LAB_UNITS)})(?![A-Za-z²³])`, 'g');
const LAB_SHORT_UNIT = new RegExp(`([\\d${SUPERSCRIPT}])\\s+(${byLength(LAB_SHORT_UNITS)})(?![A-Za-z²³/])`, 'g');
/** 等号后面跟着化学式才是方程式（「= 2Br⁻」念「生成」），跟着数就是算式（「V = 0」念「等于」） */
const LAB_EQUALS = new RegExp(`\\s*=\\s*(?=\\d*(?:${byLength(LAB_NAMES)})${NOT_AFTER_FORMULA})`, 'g');
const POWER = new RegExp(`(\\d)\\s*×\\s*10(⁻?[${SUPERSCRIPT}]+)`, 'g');
const CIRCLED = '①②③④⑤⑥⑦⑧⑨⑩';
const BOND_ATOMS: Record<string, string> = { C: '碳', H: '氢' };

/** 实验台的一段话 → 念出来的字：括号里的旁注不念，化学式念名字，单位、比较号和科学记数法念中文 */
export function labSpeakable(text: string): string {
  const out = text
    .replace(/（[^（）]*）|\([^()]*[\u4e00-\u9fff][^()]*\)/g, '')
    .replace(/C=C/g, '碳碳双键').replace(/C≡C/g, '碳碳三键')
    .replace(/[CH](?:—[CH])+/g, bond => bond.split('—').map(atom => BOND_ATOMS[atom]).join(''))
    .replace(/Δc\s*\/\s*Δt/g, '浓度变化除以时间').replace(/ΔrH°?/g, '反应热')
    .replace(/维生素\s*C/g, '维生素Ｃ')
    .replace(/([A-Za-z₀-₉⁺⁻)])\s*[↑↓]/g, '$1')
    .replace(/\s*\+\s*(\d*e⁻)/g, '得到$1').replace(/\s+[−-]\s+(\d*e⁻)/g, '失去$1')
    .replace(/\s*=([\u4e00-\u9fff△]+)=\s*/g, (_, how: string) => `，${how.replace('△', '加热')}生成`)
    .replace(LAB_EQUALS, '，生成')
    .replace(LAB_UNIT, (_, digit: string, unit: string) => `${digit}${LAB_UNITS[unit]}`)
    .replace(LAB_SHORT_UNIT, (_, digit: string, unit: string) => `${digit}${LAB_SHORT_UNITS[unit]}`)
    .replace(/\b([A-Za-z])\s*·\s*([A-Za-z])\b/g, '$1乘$2')
    .replace(POWER, (_, digit: string, power: string) =>
      `${digit}乘10的${power.startsWith('⁻') ? '负' : ''}${[...power.replace('⁻', '')].map(d => SUPERSCRIPT.indexOf(d)).join('')}次方`)
    .replace(/\bK–/g, '钾–')
    .replace(LAB_FORMULA, (_, formula: string) => LAB_NAMES[formula])
    .replace(/\bp\.\s*(\d+)/g, '第$1页').replace(/\bhc\/λ/g, 'h c 除以 λ').replace(/\bmol\b/g, '摩尔')
    .replace(/([+−])x\b/g, (_, sign: string) => `${sign === '+' ? '正' : '负'}x`)
    .replace(/([\u4e00-\u9fff])\s*–\s*(?=[\u4e00-\u9fff])/g, '$1到')
    .replace(/(\d*)e⁻/g, (_, count: string) => `${count}个电子`)
    .replace(/\bc\(([^()]+)\)/g, '$1浓度').replace(/\bn\(([^()]+)\)/g, '$1的物质的量').replace(/\bV\(([^()]+)\)/g, '$1的体积')
    .replace(/(\d) (\d{3})(?!\d)/g, '$1$2')
    .replace(/(\d+)\/(\d+)/g, '$2分之$1')
    .replace(new RegExp(`[${CIRCLED}]\\s*`, 'g'), mark => `${'一二三四五六七八九十'[CIRCLED.indexOf(mark.trim())]}、`)
    .replace(/\s*(?:→|⟶|⇒)\s*/g, '，变成').replace(/\s*(?:↔|⇄)\s*/g, '，')
    .replace(/\s*⇌\s*/g, '，可逆地生成')
    .replace(/\s*=\s*/g, '等于').replace(/\s*≈\s*/g, '约等于').replace(/\s*≠\s*/g, '不等于')
    .replace(/\s*<\s*/g, '小于').replace(/\s*>\s*/g, '大于')
    .replace(/(\d)×(?!\s*\d)/g, '$1倍').replace(/\s*×\s*/g, '乘').replace(/\s*÷\s*/g, '除以')
    .replace(/(\S)\s+\+\s+(?=\S)/g, '$1和')
    .replace(/([\u4e00-\u9fff])\s*↑/g, '$1升高').replace(/([\u4e00-\u9fff])\s*↓/g, '$1降低').replace(/[↑↓]/g, '')
    .replace(/\s+\/\s+/g, '，').replace(/\//g, '和')
    .replace(/\s*·\s*/g, '，')
    .replace(new RegExp(`[${SUBSCRIPT}]`, 'g'), digit => String(SUBSCRIPT.indexOf(digit)))
    .replace(/，\s*([，。；：])/g, '$1')
    .replace(/^，/, '');
  return speakable(out);
}

export type FilmVoice = {
  readonly turnCount: number;
  readonly lengthOf: LineLength;
  readonly src: (turn: number, who: Speaker) => string;
};

const clips = (manifest as VoiceManifest).clips;

/** 这篇文章的配音；一句都还没配就是 undefined，播放器不显示声音开关 */
export function voiceFor(slug: string, turnCount: number): FilmVoice | undefined {
  if (!clips[clipKey(slug, 0, 'nian')]) return undefined;
  return {
    turnCount,
    lengthOf: (turn, who) => clips[clipKey(slug, turn, who)]?.seconds,
    src: (turn, who) => `${import.meta.env.BASE_URL}voice/${clipKey(slug, turn, who)}.mp3`,
  };
}
