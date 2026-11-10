# 配图

配图写在爸爸那一轮的 `figure` 里，画在他的气泡中（纯 SVG，类型和画法在 `src/learning/figures.ts`，元素数据在 `src/data/elements-lite.json`）。

## 规矩（检查器会拦）

- 没有动画的文章至少 3 轮配图。
- `caption` ≤70 字，说清「看哪里、看出什么」，不要重复爸爸的原话。
- 元素用原子序数（1–118）。
- `shells` / `sizes` 一张图比较 2–7 个原子。
- `live`（真周期表）每篇最多一张。
- `chains` 每组 1–5 根链、每根 1–30 个碳，名字 ≤12 字，箭头上的字 ≤10 字。
- `tower` 3–7 段出口，名称 ≤8 字、说明 ≤14 字。
- `dots` 分 2–4 组，每组至少 1 份、合起来正好 100 份；图例「名称 · 份数」≤14 字、说明 ≤20 字。
- `crystal`（能转的晶体）每篇最多 3 张，`structure` 只能是 `diamond` / `graphite` / `graphene` / `salt`。

## 选哪种图

| kind | 用来讲 | 关键字段 |
|---|---|---|
| `table` | 位置、分区、规律：哪一族、哪一周期、金属和非金属在哪 | `paint`、`focus`、`ring`、`staircase`、`arrows`、`link` |
| `trend` | 性质随原子序数一轮轮起伏（为什么叫「周期」） | `property`、`upTo`、`marks`、`link` |
| `shells` | 电子分层、最外层几个电子（同族像、稀有气体稳定） | `atoms` |
| `sizes` | 原子按真实半径比大小 | `atoms` |
| `chains` | 碳氢分子的长短（同一把尺子），以及长链断成短链（裂化） | `chains`、`then` |
| `tower` | 分馏塔：按沸点从上到下接出不同产品 | `cuts` |
| `dots` | 百点图：一样东西里谁占多少（屁里臭的不到 1 份、空气里氮气占 78 份） | `groups` |
| `crystal` | 晶体里原子怎么排、每个原子拉几只手（金刚石的立体网、石墨的层、盐的离子交替），读者能拖着转 | `structure` |
| `image` | 照片或课件截图（`public/` 下的文件） | `src`、`alt` |
| `live` | 真正可点的元素周期表，全宽嵌在文章里 | `view` |

一张图只帮爸爸说清这一句。同一篇里换着用不同种类，别连着三张一样的。

## 每种图的写法

**`table`** 小号周期表：
- `paint`：`'category'`（默认，按类别上色）、`'radius'`（半径热力）、`'en'`（电负性热力）、`'phase'`（常温状态：气 / 液 / 固）。
- `focus`：只亮一部分，其余变淡。`{ by: 'group', values: [1, 17] }`、`{ by: 'period', values: [3] }`、`{ by: 'category', values: [0] }`、`{ by: 'atoms', values: [6, 14] }`。
- `ring`：给几个元素画橙色圈，点名要看的格子：`ring: [9, 55]`。
- `staircase: true`：画出金属与非金属的分界线（楼梯线）。
- `arrows`：`[{ from: [列, 行], to: [列, 行], text: '往下变大' }]`，坐标可以是小数；文字 ≤6 字最好。
- 类别编号：0 碱金属、1 碱土金属、2 过渡金属、3 后过渡金属、4 类金属、5 非金属、6 卤素、7 稀有气体、8 镧系、9 锕系。

**`trend`** 柱状图：`property: 'radius' | 'ip'`（原子半径 / 第一电离能）；`upTo: 56` 画到第几号；`marks: [3, 11, 19]` 在柱顶标出元素符号。

**`shells`**：`atoms: [10, 11]` 画氖和钠的电子层，最外层电子是橙色。

**`sizes`**：`atoms: [3, 11, 19, 37, 55]` 同族从上往下，或 `[11, 12, …, 17]` 同周期从左往右。

**`chains`**：`chains: [{ carbons: 4, label: '丁烷 · 气体' }, { carbons: 8, label: '辛烷 · 汽油', hot: true }]`，所有链按同一比例画，右边自动写「N 个碳」。`double: true` 让链头变成碳碳双键（烯烃，少两个氢）。加 `then: { via: '催化裂化', chains: [...] }` 画一个箭头和变化后的链。样板见 `stories/gasoline.ts`。

**`tower`**：`cuts` 从塔顶往下排，`{ name: '汽油', note: '5–11 个碳 · 给汽车', hot: true }`；塔身上凉下热，底部有加热过的原油进料。

**`dots`**：`groups: [{ label: '没味的气体', count: 99, amount: '99 份以上', note: '氮气、氢气……' }, { label: '含硫的臭气', count: 1, amount: '不到 1 份', hot: true }]`。10×10 个点按组依次上色，`hot` 那组是橙色并加圈；`amount` 不写就显示「N 份」。很小的比例（不到 1%）也至少给 1 份，用 `amount` 说清楚。样板见 `stories/fart-smell.ts`。

**`crystal`**：`{ kind: 'crystal', caption: '…', structure: 'diamond' }`。原子位置按真实晶体结构算（`src/learning/crystal.ts`）：`diamond` 一个金刚石晶胞 18 个碳、虚线是晶胞的边；`graphite` 三层蜂窝错开叠放，层间距是层内键长的 2.36 倍，橙色虚线是层间的弱吸引；`graphene` 一层；`salt` 3×3×3 的钠离子（紫）和氯离子（绿）。一个原子的键画成橙色，一眼看出它拉了几只手。图本身是静态 SVG（没有脚本也能看），文章页用 `mountCrystals` 让它进入视野后慢慢自转、可以拖动和用方向键转（尊重「减少动态效果」），离开文章时停掉。图例和「👆 拖一拖，转着看」自动加，图注里写看什么就行。要新的结构，在 `crystal.ts` 里按晶体学数据写生成函数，再在 `figures.ts` 的 `CRYSTAL_KEYS` 里配图例。样板见 `stories/diamond-graphite.ts`、`chemical-bonds.ts`。

**`image`**：`{ kind: 'image', src: lessonAsset('covers/xxx.webp'), alt: '…', caption: '…' }`；在 `stories/` 里从 `../assets` 引入 `lessonAsset`（从 `../catalog` 引会循环引用）。先打开图片看清画面再写图注。

**`live`**：`{ kind: 'live', caption: '…', view: { mode: 'radius' } }`。只适合「总体认识周期表」这种整篇围着表转的文章。

## `link`：从小图跳到真周期表

`table` / `trend` / `shells` / `sizes` 可以带 `link`，图下出现「🔍 …」按钮：
- `{ mode: 'radius', label: '在周期表里切到「半径」' }`：`mode` 可选 `default`、`radius`、`en`、`ip`、`melt`、`boil`、`density`。
- `{ category: 0, label: '在周期表里只看碱金属' }`。
- 文章里嵌了 `live` 时，按钮直接切换嵌着的那张表；没嵌时在文章上方弹出一张放大的真周期表（Esc 关闭）。

## 周期表以外的课

非周期表的课（反应、溶液、电化学、工业）现在能用的是 `table`（讲涉及的元素在哪）、`shells`（电子得失）、`sizes`、`chains` / `tower`（石油、有机物）、`dots`（成分占比）、`crystal`（晶体结构）、`image`（课件封面或实验照片）。SVG 文字用 `fig-label`（名称）/ `fig-note`（说明）这类 class 时，要改颜色得写 `style="fill:…"`，`fill` 属性会被 CSS 盖掉。要画别的图（分子结构、能量图、pH 色带……），在 `figures.ts` 的 `Figure` 里加一种 kind，同时在 `renderFigure` 里画出来、在 `rules.ts` 的 `figureProblems` 里补检查，并更新本文件。

## 加一种新图

1. **数据要真**：位置、比例、数值都从可靠数据算出来（`elements-lite.json`、晶体学参数、教材表格），别凭感觉摆。
2. **先出静态 SVG**：`renderFigure` 返回的是完整的一张图，没有脚本、在测试（jsdom）里、无头截图里都能看。SVG 里的文字走 `escapeText`；用到 `<defs>` 渐变时 id 带上 `index`（同一页可能有好几张）。
3. **要能动就另写挂载**：像 `crystal.ts` 的 `mountCrystals(root)` 那样，返回一个清理函数；在 `pages/lesson.ts` 的 `renderLesson` 里挂上、`leaveLesson` 和下一次 `renderLesson` 开头清掉。只在看得见时动（`IntersectionObserver`），尊重 `prefers-reduced-motion`，拖动用 pointer 事件并给键盘一个替代（方向键），手机上 `touch-action: pan-y` 别挡住页面滚动。
4. **样式**：写进 `learning.css` 的 `.fig-<kind>`，颜色用 `--cv-*` 和已有的暖色；图例沿用 `.fig-legend`。
5. **测试**：在 `tests/` 里查结构对不对（原子个数、每个原子几根键……）、任何角度 / 参数下都没有 `NaN`，有交互的再查挂上能动、清理后不再动。
6. **文档**：本文件的「规矩」「选哪种图」「每种图的写法」三处，加上 `AGENTS.md` 第 2 节 `figures.ts` 那一条。
