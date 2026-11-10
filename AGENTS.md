# AGENTS.md — ChemVerse 化学视界 Agent 协作与课程扩展指南

本文档面向参与 **ChemVerse（化学视界）** 的所有编码 Agent。修改代码、调整样式或新增化学课程前，请先阅读并遵守以下规范。

---

## 1. 产品定位与核心设计哲学（必读）

1. **是“互动化学探索馆”，不是“刷课打卡监工平台”**
   - 核心目标是**用生活中的化学现象点燃好奇心，由浅入深看懂化学原理**。
   - **禁止**引入强制解锁、倒计时催促、百分比完成度焦虑条、或者类似考试/刷题平台的生硬话术。
   - 唯一的记录是问题卡上的「⭐ 看过」（点开过就算，仅保存在本地 `localStorage`），强调“随时从任意感兴趣的问题切入”。
2. **「奇遇记」系列的一员：和「身体奇遇记」同一对小念和爸爸、同一套暖色手写风，三层结构：首页 → 主题 → 问题文章，外加一个「🧪 3D 实验台」**（没有顶栏；不要再加侧栏、地图、问题库、足迹页、标签页或测验）
   - **首页 `#home`**：标题「化学奇遇记」，先是「小念和爸爸探索化学的奥秘」——3D 小星球上的两人（与 bodyverse 同一个 CC0 模型、同一套卡通着色和镜头；WebGL 不可用时退回 SVG 头像），两人的气泡对话点一下换一个问题，「听爸爸讲完 →」直达文章；再是 8 张主题卡。
   - **主题 `#topic/<unit>`**：主题就是 8 章 `units`（每题只属于一个主题）：`foundations` → `periodic` → `structure` → `substances` → `reactions` → `solutions` → `energy` → `industry`。页首小念和爸爸各说一句（`kidHook`、`dadLens`），问题按「入门 / 进阶 / 综合」分组，底部「换一个主题」。
   - **问题 `#q/<slug>`**：每个问题都是同一种「小念 × 爸爸」图文聊天文章，结尾「小念还想问」和「👨‍👩‍👧 给大人」。**左问答、右动画、有声音**（和 bodyverse 一样）：爸爸的回答里直接配图（`figure`），讲解动画（`film`）放在右栏，一轮问答配一到三场戏，点「看动画」播这一轮。动画默认带**语音讲解**：小念和爸爸把每一句读出来，动画按声音长度放慢，读到谁谁的气泡亮起来；播放条上的 🔊/🔇 可以关掉（记在 `localStorage`），关掉就是原速无声版。**除 `periodic`（元素周期表）主题外，每篇文章都要有讲解动画**（`tests/stories.test.ts` 会查）；周期表那几题是一栏图文，不要硬塞空右栏。**文章里不放实验台入口**（没有「🧪」按钮、没有实验台面板）。
 - **🧪 3D 实验台 `#labs`**：首页 8 张主题卡后面的第 9 张卡。**只放真正有 3D 课件（形态 C）的课**，按主题分组；揭秘卡、周期表这些不是 3D 交互的不要放进来。每个实验单独一页 `#lab/<slug>`（可在「看懂原理 / 自由实验台」间切换，下方「分段看」跳到任意一段），页首「📖 先听爸爸讲」回到对应文章。没有 3D 课件的课，旧的 `#lab/<slug>` 链接直接打开文章。
   - **元素周期表**是 `periodic` 主题下的一组问题：总览题 `periodic-table` 把真正的周期表直接嵌在文章里（旧的 `#elements` 链接也跳到这里），其余各题（为什么叫周期表、同族一家人、原子大小、金属与非金属的分界线……）用小图讲，配图下的「🔍 …」一点，在文章上方弹出切好热力图 / 类别的真周期表（这是放大配图，不是实验台）。旧的 `#lesson/<slug>`、`#unit/<id>` 链接仍可用；5 个生活主题 `themes` 只保留为数据，不在界面上出现。
3. **每节课必须从「生活中的化学（`hook`）」出发**
   - 任何课程都不能一上来堆砌考纲定义。必须先用一个日常可见的悬念提问（如“为什么牛奶要放冰箱？”、“为什么洁厕灵绝不能和 84 消毒液混用？”、“暖宝宝和铁生锈是一个原理吗？”）引导用户进入探索。
4. **3D 实验默认「看懂原理」，随时可切「自由实验台」**
   - 复杂实验先通过「看懂原理（`watch`）」自动演示步骤、现象与结论，降低操作门槛；用户想自己动手时可一键切到「自由实验台（`lab`）」。
5. **做成系列，方便扩展到别的领域**
   - 角色、头像和 3D 小星球放在与领域无关的 `src/series/`，每个领域只通过 `decorate` 摆自己的道具（化学是烧瓶、晶体和分子，见 `src/learning/home-planet.ts`）。改角色长相时两边一起改，和 bodyverse 保持一模一样。

---

## 2. 目录结构与关键文件

- `src/series/`：**「奇遇记」系列共用、与领域无关的部分**。`characters.ts` 小念和爸爸的名字、配色、身高、头身比（与 bodyverse 一致）；`avatar.ts` 两人的 SVG 头像；`duo-stage.ts` 首页 3D 小星球（three.js：卡通着色、描边、待机眨眼、看向手指、点一下跳一跳、不在视口里就停，后台页面先画一帧静止画面），模型在 `public/models/character.glb`（CC0，来源见同目录 `CREDITS.md`）。
- `src/learning/curriculum.ts`：**课程与目录的唯一数据源**（定义 8 个主题 `units`——含首页用的 `emoji`、小念口吻的 `kidHook`、爸爸定调的 `dadLens`——以及所有问题列表 `lessonPlan`；`themes` 仅作数据保留）。
- `src/learning/dialogue.ts` & `src/data/course-dialogues.json`：**一问一答叙事引擎**（把步进揭秘 `cards` 或 3D 课件的 `STEPS` 装配成环环相扣的 `DialogueTurn[]`，每轮可带方程式、可折叠的「实验台上会看到」、误区提醒，并用 `stepIndex` 记下这一轮讲的是实验的第几段；自动装配的文章会在第一处 `stepIndex` 那轮配上课件封面图）。`question`（标题）、`hook`（📍 现场）与 `takeaway`（最后一轮爸爸的总结）由 `article.ts` 放好，**不要再写进对话里**，否则会重复；课件文案里给老师看的「（教材原话）」「教材 p.35：」等引注会被 `readable()` 自动清掉。
- `src/learning/stories/`：**「小念 × 爸爸」问答文章**（与「身体奇遇记」同一对角色）。每篇一个文件，导出 `Story`（小念口吻的标题、`trigger` 现场、`dialogue` 一问一答——爸爸那句可带 `figure` 配图、`tip` 给大人、可选的 `film` 讲解动画），在 `stories/index.ts` 的 `stories` 里登记后即自动替换该课的自动装配问答。
- `src/learning/figures.ts`：**爸爸气泡里的配图**（纯 SVG，数据来自 `src/data/elements-lite.json`）：`table` 小号周期表（按类别 / 半径 / 电负性 / 状态上色，可只亮某几族、某几周期或某几个元素，可画金属分界线和箭头）、`trend` 性质随原子序数起伏的柱状图、`shells` 电子层、`sizes` 原子大小对比、`chains` 碳链长短与裂化、`tower` 分馏塔、`dots` 百点图（成分占比）、`crystal` 能拖着转的晶体球棍模型（金刚石 / 石墨 / 石墨烯 / 食盐，原子位置由 `crystal.ts` 按晶体学数据算出，纯 SVG，文章页用 `mountCrystals` 加上自转和拖动）、`image` 图片、`live` 把真正的周期表嵌进文章（每篇最多一张）。`table` / `trend` 可带 `link`，显示「🔍 …」按钮，一点就把真周期表切到对应的热力图或类别。
- `src/learning/crystal.ts`：`crystal` 配图的模型与画法（金刚石晶胞 18 个碳；石墨三层 AB 错开、层间距 = 层内键长 × 2.36；石墨烯一层；食盐 3×3×3）。正交投影 + 轻透视、远的先画越远越淡，挑一个原子把它的键画成橙色；`mountCrystals(root)` 只在看得见时自转、可拖动和用方向键转，返回清理函数（`lesson.ts` 离开文章时调用）。
- `src/learning/periodic.ts`：元素周期表只有一份 DOM（`#elements-view`），它在文章里的 `live` 图、「🔍」弹出的放大表和隐藏的 `#periodic-host` 之间搬来搬去；`applyTableLink` 切换模式与类别。
- `src/learning/film/`：**讲解动画引擎**（纯 TS + SVG，1200×900 空白画布；`engine.ts` 时间线与缓动、`stage.ts` 把一场戏在 t 秒时画成 SVG、`player.ts` 播放器：进入视口自动播一次、可暂停拖动、按场跳转，并通过 `onTurn(turn, who)` 让对话高亮正在讲的那一轮和正在说话的人；`narration.ts` 配音版时间线：按每句话的长度把整场戏等比例拉长——出现消失、移动、液面、变色、数字、镜头都放慢，流动、脉冲这些循环动作保持原速——有声音时播放器的时钟跟着音频走，同一时间只有一部动画出声）。
- **语音讲解**：`src/learning/voice.ts`（两人的声音与「身体奇遇记」相同：小念 `zh-CN-YunxiaNeural`，爸爸 `zh-CN-YunxiNeural` −5%；`speakable()` 把 Fe³⁺、+4 价、℃ 这些写法换成念法）、`scripts/voice.ts`（`npm run voice` 用 edge-tts + ffmpeg 生成）、音频在 `public/voice/<slug>/<轮次>-<nian|dad>.mp3`、时长和指纹在 `src/data/voice-manifest.json`。只有带动画的文章配音。
- `scripts/`：写文章的工具，都用 vite-node 跑、直接读课程数据。`story.ts`（`story:todo` / `story:new` / `story:check` / `story:frames`）、`voice.ts` 与 `voice-clips.ts`（配音与指纹）、`import-lessons.mjs`（`node scripts/import-lessons.mjs <tongjiang-lab 目录>`：从第三方仓库复制 25 节化学 3D 课件、封面和许可文件到 `public/lessons/tongjiang/`，只在 `</head>` 前注入主题适配，并写 `lessons.json`）。`story:frames` 的联系表和截图写在 `.story-preview/`（已忽略，不提交）。临时脚本也放 `scripts/` 下（vite-node 不能跑 `-e`，也跑不了系统临时目录里的文件），用完删掉。
- `src/learning/article.ts`：把每个问题统一成文章 `Article`（标题、`trigger`、`turns` 小念/爸爸一问一答、`tip`、可选 `film`）。有 `story` 的用 `storyArticle`；还没写 `story` 的用 `autoArticle` 把 `dialogue` 交给小念和爸爸来说，并补一轮「能用一句话总结吗？」由爸爸念出 `takeaway`。
- `src/learning/catalog.ts`：将 `curriculum.ts`、`lessons.json`、`stories/` 与 `dialogue.ts` 合并成 `lessons`（每课带 `article`），提供按主题取题、`labName` 与「小念还想问」推荐。
- `src/learning/pages/`：四个页面。`home.ts` 首页（3D 小星球上的小念和爸爸 + 8 张主题卡 + 「🧪 3D 实验台」卡）、`topic.ts` 主题下的问题列表（有动画的题标「🎬 有讲解动画」，只有配图的标「🖼️ 图解」）、`lesson.ts` 问题文章：有动画时宽屏左聊天右动画（吸附）、窄屏动画在上，点「看动画」播这一轮的戏；没有动画就是一栏 780px 的图文聊天；配图的「🔍 …」弹出放大的周期表（Esc 关闭）。`lab.ts` 是实验台：`#labs` 按主题分组的实验卡，`#lab/<slug>` 单个实验（3D 课件 iframe 与 `postMessage` 联动）。外壳 `app.ts` 没有顶栏，只有正文和页脚。
- `public/theme/tokens.css`：**全站唯一颜色与设计变量源**（与 bodyverse 同一套暖色：奶油底 `#fff8f0` + 白卡片 + 浅橙描边、`'Comic Neue', 'Ma Shan Zheng'` 手写体，化学保留深绿强调色 `#1f6b55`）。`src/css/styles.css` 给所有元素设了雅黑，`learning.css` 让文章继承手写体，只有周期表的小格子仍用雅黑。
- `public/theme/lesson.css` & `public/theme/lesson-adapter.js`：注入到独立 3D 课件 iframe 中的浅色主题适配与「看懂原理」自动演示控制器。和网站一个样子：标题、按钮、步骤条用手写体（控制台里的密集数字仍用雅黑），「看懂原理」的说明卡是小念提问、爸爸指着实验台讲的两个气泡（头像由 `lab.ts` 在 `chemverse:ready` 后用 `chemverse:avatars` 传进去，独立打开时显示「念 / 爸」），课件文案里给老师看的教材引注用和 `dialogue.ts` 同一个 `readable()` 清掉；三维场景的天空球（`side` 为背面的着色器材质）和雾在运行时刷成暖色奶油调。
- `src/learning/element-theme.css` & `src/modules/`：元素周期表、热力图防遮挡数值胶囊（`formatTileValue`）及全浅色立体 3D 电子云弹窗。

---

## 3. 如何新增一节化学课（可扩展规范）

系统已解除课程数量硬编码，统计与导航会自动根据 `src/learning/curriculum.ts` 中的 `lessonPlan` 动态计算。新增课程的素材有两种形态（A 揭秘卡、C 3D 课件），**最后都要用形态 D 写成带讲解动画的问答文章**（周期表主题除外）。只有形态 C 会出现在「🧪 3D 实验台」里。

### 形态 A：新增「趣味揭秘步进卡」（最轻量，无需写 3D/SVG 代码）
当你发现一个有趣的日常化学现象（如“自热火锅为什么加冷水就能沸腾”、“切洋葱为什么会流泪”、“可乐加曼妥思为什么喷发”），只需在 `src/learning/curriculum.ts` 的 `lessonPlan` 中追加一项配置并填写 `cards` 数组。卡片是写文章的素材：`story:new` 用它预填草稿，`show.lab.step` 记的就是卡片下标；它不进实验台。

```typescript
{
  slug: 'self-heating-pot',
  unit: 'reactions',
  themes: ['kitchen', 'energy'],
  title: '自热火锅：不用火不用电，冷水怎么自己烧开的？',
  hook: '生活中的化学 · 倒进一瓶凉水，短短几分钟蒸汽直冒、汤汁沸腾，发热包里装的到底是什么？',
  question: '一包白色粉末遇上冷水，凭什么能在几分钟内释放出煮熟食物的热量？',
  topic: '放热反应',
  level: '入门',
  minutes: 8,
  prerequisites: ['matter-basics'],
  objectives: [
    '认识生石灰（CaO）遇水剧烈放热与铝粉协同产热的原理',
    '理解为什么发热包透气孔不能堵、且不能在密闭环境使用',
  ],
  task: '依次点击下方步骤，观察冷水加入发热包后温度、气体和微观粒子的变化。',
  takeaway: '化学键断裂与形成伴随着能量变化。当生成物总能量低于反应物时，多余能量就会以热的形式释放出来。',
  cards: [
    {
      tag: '冷水入包',
      title: '第一波升温：生石灰遇水放热',
      formula: 'CaO + H₂O = Ca(OH)₂ + 热量',
      phenomenon: '冷水接触发热包后数秒内迅速升温并冒出白雾，底部开始发烫。',
      micro: '氧化钙（CaO）与水分子剧烈反应生成氢氧化钙，化学能迅速转化为热能，把水温推高。',
    },
    {
      tag: '持续沸腾',
      title: '第二波接力：碱性环境激活铝粉持续放热',
      formula: '2Al + 2NaOH + 6H₂O = 2Na[Al(OH)₄] + 3H₂↑',
      phenomenon: '发热包持续鼓起并维持长达 15~20 分钟的高温蒸汽，将上层食材焖熟。',
      micro: '生成的碱性溶液与发热包中的铝粉、碳酸钠继续反应持续放热，同时产生少量氢气，因此必须保持透气孔畅通。',
    },
  ],
  check: {
    question: '使用自热火锅时，为什么说明书严格要求“打开盒盖透气孔并保持通风”？',
    choices: [
      '发热包反应会产生水蒸气和少量氢气，堵住透气孔会导致盒体膨胀甚至引发危险',
      '为了让外面的冷空气进来给食物降温',
      '因为发热包需要吸收空气里的氮气才能发热',
    ],
    answer: 0,
    explanation: '发热包放热产生大量水蒸气，且铝粉反应会伴随产生少量可燃氢气，保持透气孔畅通与通风可防止高压胀裂和气体积聚。',
  },
}
```

### 形态 C：新增「3D 互动实验课件」（独立 HTML 课件）
1. 将课件 HTML 放入 `public/lessons/tongjiang/courses/<slug>.html`，封面放入 `public/lessons/tongjiang/covers/<slug>.webp`。
2. 在课件 `</head>` 前注入共享主题与适配器：
   ```html
   <link rel="stylesheet" href="../../../theme/lesson.css">
   <script defer src="../../../theme/lesson-adapter.js"></script>
   ```
3. 在 `src/learning/curriculum.ts` 中添加条目（可直接通过 `file: 'courses/<slug>.html'` 和 `cover: 'covers/<slug>.webp'` 指定资源路径，或在 `src/data/lessons.json` 中登记）。
4. **版权红线**：`public/lessons/tongjiang/` 下的第三方原始课件脚本与许可文件（CC BY-NC 4.0）严禁篡改，所有样式与交互适配统一在 `public/theme/lesson.css` 和 `public/theme/lesson-adapter.js` 中完成。

### 选题与资料（新题都要走一遍）
- 题目从孩子真遇到过的事出发，一个题只回答一个「为什么」，放进最贴的主题；新条目插在同主题最后一篇后面，先修课排在前面。
- 事实和数字以教材、大学 / 科学馆的演示实验说明、学会科普、同行评议论文、政府数据库为准，至少对上两处；对不上就不写数字。出处、口径和安全须知写进文章的 `tip`。
- **外部素材**：网上的图片、动画、视频、课件没有明确开放许可（或写着「需申请授权」，如「美丽化学」）就不搬，只当灵感，按真实数据自己画，并在 `tip` 里写一句受谁启发。

### 形态 D：把一节课写成「小念 × 爸爸」图文问答（推荐；带讲解动画的样板见 `self-heating-pot.ts`、`sodium-step.ts`、`flame-step.ts`、`gasoline.ts`、`diamond-graphite.ts`（带能转的晶体图），纯图文样板见 `stories/why-periodic.ts`、`atom-size-trend.ts`）
在已有课程（A 或 C）之上，新建 `src/learning/stories/<slug>.ts` 并登记到 `stories/index.ts`。完整写法见 skill `.cursor/skills/chemverse-explainer/`（`SKILL.md` 总流程与选题查资料，`dialogue.md` 问答，`figures.md` 配图与怎么加新图，`film.md` 动画，`design.md` 系列风格）；这几个命令帮你走流程：
- `npm run story:todo`：按主题列出哪些课已手写、哪些还是自动装配；
- `npm run story:new -- <slug>`：生成草稿（预填课件的对话、方程式和实验台跳转）并登记；
- `npm run story:check -- [slug...]`：逐条检查下面的规矩，用中文指出第几轮差在哪；另用 ⚠️ 提醒哪几句配音过期、哪句里有念不顺的符号；
- `npm run story:frames -- <slug>`：把动画每场切三帧排成联系表（`.story-preview/<slug>-frames.html`，找得到 Edge / Chrome 再出 PNG），查重叠、出框、漏出场；
- `npm run voice -- [slug...]`：给改过或新写的句子配音（只生成新的或改过的句子，删掉的句子连音频一起清掉；要联网，需要 `python -m pip install edge-tts` 和 PATH 里的 ffmpeg / ffprobe）。**改了对话的字就要重跑**，`tests/voice.test.ts` 会查每一句的配音是不是读的现在的文字。对话里新出现的化学式、符号要念得出来，在 `voice.ts` 的 `speakable()` 里补读法。

规矩写在 `src/learning/stories/rules.ts`，`tests/stories.test.ts` 和 `story:check` 共用这一份：
1. **标题**用小念的口吻提问，带「？」；`trigger` 一句话写小念刚遇到的那件事。
2. **对话 5–8 轮**，按「是什么 → 怎么发生 → 为什么非得这样 → 误会/特例 → 我能做什么 → 总结」推进：
   - 除最后一轮外，小念每句都是带「？」的追问；从第 2 轮起，必须**接住爸爸上一句里的一个词**（有意义的两字词，如「石灰」「氢气」「压强」），让追问环环相扣；
   - 最后一轮小念以「我懂了 / 我明白了」开头，用自己的话把因果链说一遍，爸爸肯定并给一个好习惯；
   - 爸爸每句 20–180 字：第一句直接回答，再打比方，真名词只说一次；常见误会要明说（有动画时在动画里用 `myth` 卡划掉）；安全须知放进 `tip`（给大人）。
   - 化学方程式放进 `eq`；这一轮讲的是实验的哪一段，用 `show: { kind: 'lab', step, label }` 记下（`step` 是 3D 课件的第几段或 `cards` 的下标）。它不在文章里显示按钮，只用来核对段数、给自动装配的文章放封面图。
   - **配图**放在爸爸那句的 `figure` 里（见 `figures.ts`）：图要帮着把这句话讲清楚，`caption` ≤70 字；元素序号 1–118；`shells` / `sizes` 比 2–7 个原子；`live`（真周期表）每篇最多 1 张。**没有动画的文章至少配 3 张图**。
   - `crystal`（能转的晶体）每篇最多 3 张，结构只能是 `diamond` / `graphite` / `graphene` / `salt`；图注说的东西爸爸这一句里要讲到。
3. **讲解动画放在文章右栏**（样板 `sodium-step.ts`、`gasoline.ts`、`flame-step.ts`）：动画把爸爸这一轮讲的东西画出来，会动的过程（放热、冒气、电子转移）最适合，静态的结构、规律也可以一步步「长出来」。规矩——一轮配一到三场戏：至少 4 场、第一场配第 1 轮、按对话顺序（`turn` 只能不变或变大）、最多跳过 1 轮、同一轮不超过 3 场；每场 4–14 秒、全片 30–150 秒；每场至少 2 个元素、同屏不超过 8 个；`from` ≤ 时长 − 0.8，`to` ≥ `from` + 0.5。文字长度：场次标题 ≤12、`label` ≤12、`text` ≤14、`arrow` ≤10、`shape` ≤7、`meter`/`count` 标签 ≤8、`myth` 每句 ≤18。左上角留给场次标题，别把元素放在 y < 140 的左上角；`cues` 后写的盖在先写的上面（先 `bond` 后 `atom`）；有 `myth` 卡的那场底部 y > 720 留给它。
4. 可用元素见 `stories/types.ts` 的 `Cue`：通用的 `text`、`label`、`arrow`、`flow`、`pulse`、`sprite`、`shape`（可 `slide` 平移）、`meter`、`count`、`myth`，化学专用的 `atom`（原子/离子/电子，可带电荷、沿路线移动）、`bond`、`vessel`（烧杯/倒置烧瓶/倒置集气瓶，液面可涨落变色）、`particles`（气体分子乱飞、气泡上升，个数可增可减）、`formula`（方程式逐字打出）。

---

## 4. 视觉与前端工程规范

1. **全站统一浅色自然风（禁止硬编码暗黑/霓虹色）**
   - 页面背景、卡片、文字、边框、阴影统一使用 `public/theme/tokens.css` 中的 `--cv-*` 变量。
   - **元素周期表**：使用低饱和矿物色系（`src/config/categories.ts`），热力图小格子数值必须通过 `formatTileValue`（`src/utils/dom.ts`）格式化并保持纵向三行流式排布，严禁使用 `position: absolute` 造成数字与中文名重叠。
   - **3D 电子云**：保持浅色径向舞台 + 立体球体渐变（`radial-gradient`）+ 清晰轨道环，不要改回左黑右白的割裂布局。
2. **安全 HTML 模板（防 XSS）**
   - 渲染动态视图时必须使用 `src/learning/html.ts` 中的 `html` 标签模板与 `setHtml()`，默认对插值做 HTML 转义，不要直接拼接未转义的 `innerHTML`。
   - 会自己动的配图、动画：先出能直接看的静态 SVG，再在 `lesson.ts` 里挂载、离开文章时清理；离开视野就停，尊重「减少动态效果」，拖动要有键盘替代。
3. **课程顺序与先修关系约束（测试会校验）**
   - 每节课的 `prerequisites` 数组中所填的先修课 `slug`，在 `lessonPlan` 数组中的下标**必须排在当前课前面**（满足拓扑有序，由浅入深）。
   - 每节课必须包含：非空 `hook`（>15 字）、`objectives`、`task`、`takeaway`，以及 3 个选项的 `check` 概念题。

---

## 5. 验证与测试命令

每次修改课程或代码后，请依次运行以下命令确认无误（Windows 环境下建议单线程运行测试以节省内存）：

```bash
# 0. 只改了文章时，先单独查这几篇（快），看一眼动画联系表，再给改过的句子重新配音
npm run story:check -- <slug>
npm run story:frames -- <slug>
npm run voice -- <slug>

# 1. 代码规范检查
npm run lint

# 2. TypeScript 类型检查
npm exec -- tsc --noEmit

# 3. 单元测试与集成测试（单 worker 稳定运行）
npm run test -- --no-file-parallelism --maxWorkers=1

# 4. 生产构建验证
npm run build
```
