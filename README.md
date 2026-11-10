# ChemVerse · 化学奇遇记

「奇遇记」系列的化学篇：小念和爸爸一问一答，从生活里看得见的现象出发，由浅入深讲懂化学原理。非商业学习项目。

- **首页**：3D 小星球上的小念和爸爸，8 个主题（物质与原子、元素周期表、结构、典型物质、反应、溶液、能量、工业与生活）。
- **问题文章**：左边是小念 × 爸爸的图文聊天（周期表、电子层、原子大小、能转的晶体模型等配图），右边是带配音的讲解动画。
- **🧪 3D 实验台**：25 个三维实验，「看懂原理」由小念和爸爸配音自动演示，「自由实验台」是给孩子动手的简洁版。
- **元素周期表**：118 种元素、原子模型、性质热力图与分类筛选，嵌在周期表主题的文章里。

不设解锁、倒计时或完成度；唯一的记录是问题卡上的「⭐ 看过」，只存在本机浏览器里。

## 本地运行

需要 Node.js >= 18.18。

```shell
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

推到 `main` 后，`.github/workflows/pages.yml` 会检查、测试、构建并发布到 GitHub Pages（仓库 Settings → Pages 的 Source 选「GitHub Actions」）：<https://handsondad.github.io/chemverse/>。

构建产物在 `dist`，也可以部署到任意静态服务器，或使用现有 Dockerfile（`nginx.conf` 开启 gzip，`assets/` 下带哈希的文件长期缓存）。页面采用 hash 路由，相对资源地址兼容子路径部署。所有课件、封面、配音和 3D 运行代码都在本地，不依赖外部站点；需要通过 HTTP 服务访问，不支持直接双击 `index.html`。

写文章、配音的工具（`story:*`、`voice`）和协作规范见 `AGENTS.md` 与 `.cursor/skills/chemverse-explainer/`。

## 目录

- `src/learning/`：页面、课程数据（`curriculum.ts`）、问答文章（`stories/`）、配图、讲解动画与配音。
- `src/series/`：「奇遇记」系列共用的角色、头像和首页 3D 小星球。
- `src/modules/`：元素周期表、原子模型、热力图。
- `public/lessons/`：3D 实验课件（`courses/`）、封面（`covers/`）及其许可文件 `LICENSE`、`THIRD_PARTY_NOTICES.md`。
- `public/theme/`：全站设计变量 `tokens.css`，以及注入课件的主题 `lesson.css` 与适配脚本 `lesson-adapter.js`。
- `public/voice/`：小念和爸爸的配音（edge-tts 生成）。
- `tests/`：自动化测试。

## 参考与致谢

**3D 实验课件参考并改编自 [铜匠实验室（作者：铜匠十点睡觉）](https://lab.tongjiang.app)**（上游仓库 [smithjohn78390/tongjiang-lab](https://github.com/smithjohn78390/tongjiang-lab)）。25 节化学课件、封面与课程目录采用 [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)：仅限非商业使用，须保留署名、许可链接和修改说明，商用需另行取得权利人许可。许可原文见 `public/lessons/LICENSE`；课件内打包的 three.js 适用 MIT，见 `public/lessons/THIRD_PARTY_NOTICES.md`。分发或部署时请一并保留这两个文件和本节说明。

改动说明：只在每个课件的 `</head>` 前加入 `public/theme/lesson.css` 与 `lesson-adapter.js` 两个链接，课件里的实验脚本、三维场景和物质颜色不变。适配脚本换上全站的浅色手写风，加入「看懂原理」自动演示、小念和爸爸的语音讲解、简化版「自由实验台」和窄屏视图，并清掉给老师看的教材引注；课件目录页 `courses/index.html` 由导入脚本重新生成。重新导入上游课件：

```powershell
node .\scripts\import-lessons.mjs 'C:\path\to\upstream-lab'
```

其他来源：元素周期表改自 [SeanWong17/Future-Style-Periodic-Table](https://github.com/SeanWong17/Future-Style-Periodic-Table)；角色模型为 CC0，见 `public/models/CREDITS.md`。

课件和文章是教学模拟，不代替实验规范。涉及有毒气体、强酸碱、高温、活泼金属的实验不要自行模仿，真实实验须在专业教师指导下进行。
