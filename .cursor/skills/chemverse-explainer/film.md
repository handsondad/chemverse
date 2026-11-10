# 右栏的讲解动画

动画写在 `Story.film` 里，放在文章右栏（宽屏吸附在右边，窄屏在对话上方），和「身体奇遇记」一样带语音讲解。引擎在 `src/learning/film/`（`engine.ts` 时间线、`stage.ts` 画面、`player.ts` 播放器、`narration.ts` 配音版时间线）。

**配音会把戏拉长**：有声音时，一场戏（或配同一轮的几场戏）要等这一轮的两句读完，整场戏按比例放慢，`from`/`to`、`travel`、`over`、液面 `rise`、变色 `tint`、平移 `slide`、粒子 `amount`、镜头 `t` 一起拉长；`flow`、`pulse`、抖动、打字、画箭头保持原速。所以戏照原速写就行，元素的先后顺序对上爸爸说话的顺序，不用掐着秒数配声音。没配到戏的轮次（通常是最后的总结）接在前一场戏后面读。画布固定 1200×900，坐标都是 `[x, y]`。每个元素只由时间 t 决定，所以能暂停、拖动、从任意一帧看。

**每一场演爸爸这一轮讲的东西**：会动的过程（放热、冒气、电子转移、液面涨落、颜色渐变）最好演；静态的结构和规律，也可以让元素按爸爸说的顺序一个个长出来。点对话里的「🎬 看动画」，就从这一轮的第一场开始播。

## 规矩（检查器会拦）

- 一轮问答配一到三场戏：至少 4 场；第一场配第 1 轮（`turn: 0`）；`turn` 按对话顺序只能不变或变大；最多跳过 1 轮（总结轮通常不配戏）；同一轮不超过 3 场。
- 每场 4–14 秒，全片 30–150 秒。
- 每场至少 2 个元素，任何时刻同屏不超过 8 个，用 `to` 把旧元素收走。
- `from` ≤ 时长 − 0.8；`to` ≥ `from` + 0.5，且不超过时长。
- 镜头 `zoom` 1–2.6。
- 文字长度：场次标题 ≤12、`label` ≤12、`text` ≤14、`arrow` ≤10、`shape` ≤7、`meter` / `count` 标签 ≤8、`myth` 每句 ≤18。
- 左上角留给场次标题，别把元素放在 y < 140 的左上角。

## 画法

1. **逐步长出来**：按爸爸台词的先后一个个加元素，间隔 0.6–1.5 秒。说到哪个，哪个才出现。
2. **比方要画出来**：爸爸说「像拔河」，就画两边拉的箭头；说「像传送带」，就用 `flow` 让小点一直流。
3. **误会要翻过来**：爸爸辟谣的那一轮放 `myth` 卡，先划掉错的，再亮出对的。
4. **字要少**：屏幕上只放关键词，完整的话交给旁边的对话。
5. **结尾一句**：每场最后用一行 `text` 点题（≤14 字），放在下方 y≈760–830。
6. **后写的盖在上面**：`cues` 的顺序就是画的顺序。原子和键一起出现时，先写 `bond` 再写 `atom`，原子才盖住键头；标签、`text` 写在最后。
7. **误会卡占底部**：`myth` 是盖在画面底部正中的卡片，有它的那场，y > 720 的地方别再放东西（点题的 `text` 往上挪到 y≈700，或干脆不要）。
8. **会动的东西**：`atom`、`sprite` 沿 `path` 走；`shape` 用 `slide` 平移；别用「先收走、再在新位置放一个」冒充移动。
9. **数字只用爸爸说过的**：`count`、`meter` 的标签和 `text` 里出现的数，爸爸这一轮里都要说过；只想表现「多 / 少」就用 `meter`，别凭空写数。

## 元素一览（`types.ts` 的 `Cue`）

| kind | 用来 | 主要字段 |
|---|---|---|
| `text` | 一行大字点题 | `at`、`text`、`size: 's'/'m'/'l'` |
| `formula` | 方程式逐字打出 | `at`、`text` |
| `label` | 带引线的标签 | `at`（指向点）、`pos`（文字位置）、`text` |
| `atom` | 原子 / 离子 / 电子；多点 `path` 时沿路线走 | `path`、`symbol`、`color`、`charge`、`travel`、`motion` |
| `bond` | 化学键一笔画出 | `a`、`b`、`order: 1/2` |
| `shape` | 发热包、试纸、电极…可写字、变色、动，`slide` 平移（石墨的一层滑开） | `shape`、`at`、`size`、`color`、`text`、`tint`、`motion`、`slide: { to, at, over }` |
| `vessel` | 烧杯 / 倒置烧瓶 / 集气瓶，液面涨落变色 | `vessel`、`at`、`size`、`liquid`、`level`、`rise`、`tint`、`label` |
| `particles` | 气体乱飞、原地抖、气泡上升，个数可增减 | `box`、`count`、`color`、`motion`、`amount` |
| `sprite` | 一个 emoji 弹出或沿路线走 | `icon`、`path`、`travel` |
| `arrow` | 一笔画出的箭头 | `path`、`text` |
| `flow` | 一串小点沿路线流（电子、热、液体） | `path`、`count`、`speed`、`loop` |
| `pulse` | 一圈圈波纹（放热、反应发生） | `at`、`radius` |
| `meter` | 进度条涨落（温度、压强、浓度） | `at`、`label`、`start`、`end`、`over` |
| `count` | 数字从 start 数到 end | `at`、`label`、`start`、`end`、`unit` |
| `myth` | 误会卡：划掉错的、换成对的 | `wrong`、`right` |

所有元素都有 `from`（出现秒数）和可选的 `to`（消失秒数）。

## 常用配方

- **放热**：`shape`（反应物，`tint` 变橙）+ `pulse` + `meter`（温度涨）+ `particles`（`motion: 'rise'` 冒白汽）。
- **产生气体**：`vessel` + `particles`（`motion: 'rise'`，`amount` 从少到多）+ `label` 标出气体名。
- **电子转移**：两个 `atom` + 一个电子 `atom` 沿 `path` 从一个走到另一个，到达后两边换上带 `charge` 的离子。
- **溶解 / 液面变化**：`vessel` 的 `rise` 让液面涨落，`tint` 换颜色（指示剂变色）。
- **快慢对比**：左右各一个 `vessel`，`particles` 的 `count` 一多一少，配 `count` 计时。

## 例子（`self-heating-pot.ts` 第 1 场）

```ts
{
  turn: 0,
  title: '冷水倒进发热包',
  duration: 10,
  cues: [
    { kind: 'vessel', vessel: 'beaker', at: [600, 560], size: [580, 260], label: '自热火锅的底盒', from: 0 },
    { kind: 'flow', path: [[600, 150], [600, 590]], color: WATER, count: 9, speed: 380, size: 11, from: 0.8, to: 3.4 },
    { kind: 'shape', shape: 'rect', at: [600, 630], size: [400, 100], color: '#e9e3d6', text: '发热包', tint: { color: '#ffb36b', at: 3, over: 2.5 }, from: 0.3 },
    { kind: 'label', at: [480, 630], pos: [260, 320], text: '生石灰 CaO', from: 1.8, to: 6.2 },
    { kind: 'pulse', at: [600, 630], color: HEAT, radius: 230, from: 3.6 },
    { kind: 'particles', box: [380, 250, 440, 300], count: 16, color: STEAM, motion: 'rise', size: 14, from: 4.2 },
    { kind: 'meter', at: [890, 120], label: '盒内温度', start: 0.12, end: 0.95, color: HEAT, over: 4.5, from: 3.4 },
    { kind: 'text', at: [600, 830], text: '不用火，也能变热', size: 'm', from: 6.6 },
  ],
}
```

完整样板：`self-heating-pot.ts`（放热）、`sodium-step.ts`（金属与水）、`ammonia-step.ts`（喷泉）、`flame-step.ts`（电子跃迁发光）、`iron-step.ts`（电子得失与价态）、`gasoline.ts`（一轮配两场戏）、`diamond-graphite.ts`（结构一步步长出来、`slide` 让一层滑开）、`silver-tarnish.ts`（电子从一种金属跑到另一种）。

写完先跑 `npm run story:frames -- <slug>`，看 `.story-preview/<slug>-frames.png`：每场一行三帧，元素不重叠、字不出框、该出现的都出现了。再在浏览器里开着声音从头听一遍：爸爸说到什么，画面正好出现什么。

## 一轮配几场戏

- 大多数轮一场就够。爸爸一句话里讲了两件事（「先……再……」「原油从哪来、又怎么变成油」），就拆成两场，`turn` 写同一个数，按顺序排。
- 同一轮最多 3 场；点「🎬 看动画」从这一轮的第一场开始，播完自动接下一场。
- 动画只给「看」，不做自己动手的实验（那是「🧪 3D 实验台」的事）；一场讲清一件事，台词留在文章里。
