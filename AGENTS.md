# AGENTS.md — ChemVerse 化学视界 Agent 协作与课程扩展指南

本文档面向参与 **ChemVerse（化学视界）** 的所有编码 Agent。修改代码、调整样式或新增化学课程前，请先阅读并遵守以下规范。

---

## 1. 产品定位与核心设计哲学（必读）

1. **是“互动化学探索馆”，不是“刷课打卡监工平台”**
   - 核心目标是**用生活中的化学现象点燃好奇心，由浅入深看懂化学原理**。
   - **禁止**引入强制解锁、倒计时催促、百分比完成度焦虑条、或者类似考试/刷题平台的生硬话术。
   - 学习记录统一以轻量化的**「探索足迹」**呈现（仅保存在本地 `localStorage`），强调“随时从任意感兴趣的现象切入”。
2. **双轨探索体系（纵向认知阶梯 × 横向生活与工业主题）**
   - **纵向 7 章（`units`）**：`foundations`（物质与原子）→ `structure`（分子与化学键）→ `substances`（元素及化合物）→ `reactions`（反应与平衡）→ `solutions`（溶液与离子）→ `energy`（化学与电能）→ `industry`（工业与生活）。各章内部按**“直觉现象 → 单一变化 → 综合工程”**由浅入深排列。
   - **横向 5 大主题（`themes`）**：`kitchen`（一粒食盐的奇幻漂流）、`magic`（光、色彩与奇妙现象）、`control`（保鲜、汽水与控制变化）、`energy`（电子的旅行：发电、生锈与充电）、`civilization`（撑起现代文明的基石）。把日常小事一路串联到真实现代工厂。
3. **每节课必须从「生活中的化学（`hook`）」出发**
   - 任何课程都不能一上来堆砌考纲定义。必须先用一个日常可见的悬念提问（如“为什么牛奶要放冰箱？”、“为什么洁厕灵绝不能和 84 消毒液混用？”、“暖宝宝和铁生锈是一个原理吗？”）引导用户进入探索。
4. **3D 实验默认「看懂原理」，随时可切「自由实验台」**
   - 复杂实验先通过「看懂原理（`watch`）」自动演示步骤、现象与结论，降低操作门槛；用户想自己动手时可一键切到「自由实验台（`lab`）」。

---

## 2. 目录结构与关键文件

- `src/learning/curriculum.ts`：**课程与目录的唯一数据源**（定义 7 个章节 `units`、5 大生活主题 `themes`、以及所有课程列表 `lessonPlan`）。
- `src/learning/catalog.ts`：将 `curriculum.ts` 与 `src/data/lessons.json` 合并，提供章节过滤、主题过滤、全文搜索与随机推荐。
- `src/learning/native.ts`：内置轻量交互模型渲染器（支持 2D 粒子/原子/化学键 SVG 模型，以及通用的 `cards` 步进揭秘互动卡）。
- `src/learning/pages/`：页面视图（`home.ts` 首页、`path.ts` 双轨路径、`courses.ts` 现象与课程目录、`lesson.ts` 单课三步闭环、`progress.ts` 探索足迹）。
- `public/theme/tokens.css`：**全站唯一颜色与设计变量源**（浅色纸白底 `#f5f4ef` + 纯白卡片 `#ffffff` + 深绿强调色 `#1f6b55`）。
- `public/theme/lesson.css` & `public/theme/lesson-adapter.js`：注入到独立 3D 课件 iframe 中的浅色主题适配与「看懂原理」自动演示控制器。
- `src/learning/element-theme.css` & `src/modules/`：元素周期表、热力图防遮挡数值胶囊（`formatTileValue`）及全浅色立体 3D 电子云弹窗。

---

## 3. 如何新增一节化学课（可扩展规范）

系统已解除课程数量硬编码，统计与导航会自动根据 `src/learning/curriculum.ts` 中的 `lessonPlan` 动态计算。新增课程支持以下 **3 种形态**：

### 形态 A：新增「趣味揭秘步进卡」（最轻量，无需写 3D/SVG 代码）
当你发现一个有趣的日常化学现象（如“自热火锅为什么加冷水就能沸腾”、“切洋葱为什么会流泪”、“可乐加曼妥思为什么喷发”），只需在 `src/learning/curriculum.ts` 的 `lessonPlan` 中追加一项配置并填写 `cards` 数组，系统会自动生成「宏观现象 ⇄ 微观解释」步进交互界面：

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

### 形态 B：新增「2D 交互模型课」（SVG / Canvas 原生组件）
1. 在 `src/learning/curriculum.ts` 的 `LessonPlan['native']` 联合类型中声明新模型标识，并在 `lessonPlan` 中添加课程条目。
2. 在 `src/learning/native.ts` 的 `mountNative` 中挂载对应的交互渲染函数。
3. 颜色需使用 `var(--cv-*)` 设计变量或与浅色背景协调的配色。

### 形态 C：新增「3D 互动实验课件」（独立 HTML 课件）
1. 将课件 HTML 放入 `public/lessons/tongjiang/courses/<slug>.html`，封面放入 `public/lessons/tongjiang/covers/<slug>.webp`。
2. 在课件 `</head>` 前注入共享主题与适配器：
   ```html
   <link rel="stylesheet" href="../../../theme/lesson.css">
   <script defer src="../../../theme/lesson-adapter.js"></script>
   ```
3. 在 `src/learning/curriculum.ts` 中添加条目（可直接通过 `file: 'courses/<slug>.html'` 和 `cover: 'covers/<slug>.webp'` 指定资源路径，或在 `src/data/lessons.json` 中登记）。
4. **版权红线**：`public/lessons/tongjiang/` 下的第三方原始课件脚本与许可文件（CC BY-NC 4.0）严禁篡改，所有样式与交互适配统一在 `public/theme/lesson.css` 和 `public/theme/lesson-adapter.js` 中完成。

---

## 4. 视觉与前端工程规范

1. **全站统一浅色自然风（禁止硬编码暗黑/霓虹色）**
   - 页面背景、卡片、文字、边框、阴影统一使用 `public/theme/tokens.css` 中的 `--cv-*` 变量。
   - **元素周期表**：使用低饱和矿物色系（`src/config/categories.ts`），热力图小格子数值必须通过 `formatTileValue`（`src/utils/dom.ts`）格式化并保持纵向三行流式排布，严禁使用 `position: absolute` 造成数字与中文名重叠。
   - **3D 电子云**：保持浅色径向舞台 + 立体球体渐变（`radial-gradient`）+ 清晰轨道环，不要改回左黑右白的割裂布局。
2. **安全 HTML 模板（防 XSS）**
   - 渲染动态视图时必须使用 `src/learning/html.ts` 中的 `html` 标签模板与 `setHtml()`，默认对插值做 HTML 转义，不要直接拼接未转义的 `innerHTML`。
3. **课程顺序与先修关系约束（测试会校验）**
   - 每节课的 `prerequisites` 数组中所填的先修课 `slug`，在 `lessonPlan` 数组中的下标**必须排在当前课前面**（满足拓扑有序，由浅入深）。
   - 每节课必须包含：非空 `hook`（>15 字）、`objectives`、`task`、`takeaway`，以及 3 个选项的 `check` 概念题。

---

## 5. 验证与测试命令

每次修改课程或代码后，请依次运行以下命令确认无误（Windows 环境下建议单线程运行测试以节省内存）：

```bash
# 1. 代码规范检查
npm run lint

# 2. TypeScript 类型检查
npm exec -- tsc --noEmit

# 3. 单元测试与集成测试（单 worker 稳定运行）
npm run test -- --no-file-parallelism --maxWorkers=1

# 4. 生产构建验证
npm run build
```
