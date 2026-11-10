---
name: chemverse-explainer
description: >-
  Writes new 化学奇遇记 (chemverse) content in the house style: a 小念 × 爸爸 question-and-answer
  article where 爸爸 explains with figures (mini periodic tables, trend charts, electron shells,
  atom sizes, rotatable 3D crystal models, the live periodic table) and a voiced explainer film in
  the right column, one to three scenes per turn. Use when adding or rewriting a chemistry question
  or lesson, researching new everyday-chemistry topics, writing a story in src/learning/stories,
  adding figures, a new figure kind or a film, adding a topic (unit), styling chemverse pages or the
  3D lab, or extending the 奇遇记 series to a new domain, or when the user mentions 小念, 爸爸,
  新课程, 新问题, 配图, 讲解动画, 晶体结构, 化学主题 or 奇遇记.
---

# 化学奇遇记：写一篇「小念 × 爸爸」

目标只有一个：孩子从头读到尾，就真的弄懂了标题里那个问题。问答负责把道理讲对、讲顺；配图让孩子「看见」爸爸说的东西；右栏的讲解动画把爸爸每一轮讲的过程演出来。

## 先弄清楚

- 仓库结构、命令、硬性规矩：根目录 `AGENTS.md`（第 3 节讲怎么新增一节课的数据）。
- 问答怎么写：[dialogue.md](dialogue.md)
- 配图怎么选、怎么写：[figures.md](figures.md)
- 右栏的讲解动画：[film.md](film.md)
- 页面风格、系列规矩、扩展到新领域：[design.md](design.md)

## 做一篇新文章

照这个清单走，每一步过了检查再走下一步：

```
- [ ] 1. 选题：npm run story:todo 看哪些课还是「⏳ 自动装配」；全新的题先查资料（见下面「选题与资料」）
- [ ] 2. 新课先进 curriculum.ts：按 AGENTS.md 第 3 节写一条（形态 A 要写 3–5 张 cards，show.lab.step 就数它们），放进对的主题、先修课排在前面
- [ ] 3. 生成草稿：npm run story:new -- <slug>（写好 src/learning/stories/<slug>.ts 并登记到 index.ts）
- [ ] 4. 改写问答：照 dialogue.md 重写成小念的口吻和追问链
- [ ] 5. 核对科学：每个数字、每个说法都站得住；拿不准的写「科学家还在研究」；不编数字；出处写进 tip
- [ ] 6. 配图（figures.md）和右栏动画（film.md）：一轮配一到三场戏
- [ ] 7. 检查：npm run story:check -- <slug>，直到 ✅（⚠️ 是提醒：配音过期、念不顺的符号）
- [ ] 8. 看动画：npm run story:frames -- <slug>，打开 .story-preview/<slug>-frames.png 逐场看
- [ ] 9. 配音：npm run voice -- <slug>（要联网；以后改了对话的字也要重跑）
- [ ] 10. npm run lint && npm exec -- tsc --noEmit && npm run test -- --no-file-parallelism --maxWorkers=1 && npm run build
- [ ] 11. 浏览器里看 #q/<slug>：桌面开着声音从头听一遍，再看手机宽度（390px）
```

## 选题与资料

- **好题**是孩子真遇到过的事：厨房、浴室、玩具、节日、出门（切洋葱流泪、荧光棒、曼妥思可乐、银镯子变黑、钻石和铅笔芯）。一个题只回答一个「为什么」，放进最贴的那个主题（`units`），别让一个主题只有一两篇。
- **查资料**先找可靠来源：教材、大学或科学馆的演示实验说明、学会科普（如美国化学会）、同行评议论文（《化学教育杂志》、Nature 等）、政府数据库（如 USDA 营养数据）。网上流传的数字至少对上两处来源；对不上就不写数字，或者写「大约」「科学家还在研究」。
- **版权**：别人的图片、动画、视频、课件，没有明确的开放许可（或者写着「需申请授权」）就不搬，只当灵感；要画就按真实数据自己画（如 `crystal` 配图按晶体学数据算原子位置）。受了谁的启发，在 `tip` 里写一句。已有的第三方课件只按 AGENTS.md 的规矩用。
- `tip` 里写清：安全须知、数字的口径与出处、和教材写法不一样的地方。

## 配图和动画

文章的版式是**左问答、右动画**，动画带小念和爸爸的语音讲解（和「身体奇遇记」一样）。两样东西分工不同：

| 讲的是 | 用 | 例子 |
|---|---|---|
| 结构、位置、规律、分类、比大小，爸爸指着讲 | 配图 `figure`（在气泡里） | 周期表、原子半径、同族元素、电子层、能拖着转的晶体 |
| 爸爸这一轮讲的过程：放热、冒气、电子转移、液面涨落、颜色渐变 | 动画 `film`（在右栏） | 自热火锅、钠与水、焰色、铁的价态 |

- 除元素周期表主题外，每篇文章都要配 `film`（测试会查）：一轮配一到三场戏，按对话顺序。
- 配图仍然要有：至少 2–3 张，帮爸爸把那句话讲清楚；没有动画的文章至少 3 张。
- **文章里不放实验台入口**。首页的「🧪 3D 实验台」（`#labs`、`#lab/<slug>`）只放真正的 3D 课件，实验页自己有「📖 先听爸爸讲」链回文章；揭秘卡、周期表不进实验台。
- 有 3D 课件或互动卡的课，照样在对应那一轮写 `show: { kind: 'lab', step, label }`：它不显示按钮，只记下这一轮讲的是实验第几段（检查器会核对段数）。

## 讲法速记（细则见 dialogue.md）

- **小念**：好奇、爱追问的孩子。第一句说现象；之后每句都接住爸爸上一句里的一个词往下挖；最后以「我懂了！」开头，用自己的话把因果链串一遍。
- **爸爸**：第一句直接回答，再打一个孩子见过的比方，真名词只说一次；常见误会点名说破；每句 20–180 字。
- **顺序**：是什么 → 怎么发生 → 为什么非得这样 → 误会 / 特例 → 我能做什么 → 总结。
- **安全**：危险操作、强酸强碱、有毒气体，写进 `tip`（给大人），对话里只讲成好习惯。

## 工具

| 命令 | 做什么 |
|---|---|
| `npm run story:todo` | 按主题列出每题：✅ 已手写（🎬 有动画 / 🖼️ 图解）还是 ⏳ 自动装配 |
| `npm run story:new -- <slug>` | 生成草稿（预填课件的对话、方程式和实验台跳转），并登记到 `stories/index.ts` |
| `npm run story:check -- [slug...]` | 逐条检查写作规矩，用中文指出第几轮 / 第几场差在哪；不写 slug 就查全部。❌ 是没过；⚠️ 是提醒：哪几句配音过期、哪句里有念不顺的符号（下标、上标、英文字母串） |
| `npm run story:frames -- <slug>` | 把动画每场切三帧（开头不久、中间、快结束）排成联系表 `.story-preview/<slug>-frames.html`，找得到 Edge / Chrome（或设了 `CHROME_PATH`）就再出一张 PNG。用来查元素重叠、字出框、该出现的没出现 |
| `npm run voice -- [slug...]` | 用 edge-tts 给新写或改过的句子配音（`public/voice/`、`src/data/voice-manifest.json`）；化学式的念法在 `src/learning/voice.ts` 的 `speakable()`。`npm run voice -- lab`（或 `lab:<课件>`）给 3D 实验台「看懂原理」配音，念法在 `labSpeakable()`，清单是 `src/data/lab-voice-manifest.json` |

规则本身在 `src/learning/stories/rules.ts`，`tests/stories.test.ts` 用的是同一份。改规矩时只改那里，并同步本 skill 和 `AGENTS.md`。工具都在 `scripts/story.ts`（`story:*`）和 `scripts/voice.ts`；加新工具时登记到 `package.json` 和上面这张表。

**看整篇文章的截图**（开着 `npm run dev` 时，端口用它打印的那个；Windows 上 Edge 一般在 `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`）：

```powershell
& $edge --headless=new --disable-gpu --hide-scrollbars --user-data-dir=.story-preview/.browser --window-size=1400,2600 --virtual-time-budget=6000 --screenshot=.story-preview/page.png "http://localhost:<端口>/#q/<slug>"
```

无头浏览器在 `--virtual-time-budget` 下不跑 `requestAnimationFrame`、也收不到发给沙箱 iframe 的消息：晶体自转、3D 课件的头像这些要在真浏览器（前台标签）里看；窗口最窄约 500px，手机宽度用浏览器的设备模拟（390px）量。

## 验收

- `story:check` 全过，四条验证命令全过。
- 浏览器里确认：每张图都在说爸爸这一句（图注说的东西爸爸这句里没讲，就换图或删图）；图注 ≤70 字；「🔍」弹出的周期表对得上；晶体图能拖、会慢慢转；右栏动画逐场拖着看，爸爸说到什么画面正好出现什么；手机上图和字不挤。
