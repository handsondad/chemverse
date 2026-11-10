# 页面风格与系列规矩

化学奇遇记是「奇遇记」系列的一员，和「身体奇遇记」（bodyverse）同一对小念和爸爸、同一套暖色手写风。

## 结构（不要加层）

首页 `#home` → 主题 `#topic/<unit>` → 问题文章 `#q/<slug>`，外加首页第 9 张卡「🧪 3D 实验台」`#labs` → 单个实验 `#lab/<slug>`。没有顶栏、侧栏、地图、测验、进度条。唯一的记录是本地的「⭐ 看过」。

- **主题**就是 `curriculum.ts` 的 `units`：`emoji`、`title`、`kidHook`（小念说）、`dadLens`（爸爸说）、`color`。主题页按 入门 / 进阶 / 综合 分组。
- **文章**：左聊天、右动画（和 bodyverse 一样）；只有元素周期表主题是一栏 780px 图文。文章里没有实验台入口。
- **实验台**：只放真正的 3D 课件，在 `#labs` 按主题分组；揭秘卡、周期表不算。实验页页首「📖 先听爸爸讲」回到文章。

## 视觉

- 颜色只用 `public/theme/tokens.css` 的 `--cv-*` 变量：奶油底 `#fff8f0`、白卡片、浅橙描边、暖棕文字；化学的强调色是深绿 `--cv-accent: #1f6b55`（测试会校验，别改）。
- 字体：`'Comic Neue', 'Ma Shan Zheng'` 手写体，正文继承即可，不用另设；只有周期表的小格子用雅黑（太小的手写字看不清）。
- 大圆角（卡片 24px、按钮全圆）、2–3px 浅色描边、轻阴影、轻轻的弹跳动效；尊重「减少动态效果」。
- 新样式写进 `src/learning/learning.css`，选择器以 `.learning-app` 下的类为准；`styles.css` 给所有元素设了雅黑和 `margin: 0`，要覆盖时注意优先级。
- 动态 HTML 一律用 `src/learning/html.ts` 的 `html` 模板和 `setHtml()`（默认转义），`raw()` 只给自己生成的 SVG。
- 配图是暖白底的小卡片（`.fig`），会动的配图（晶体）用浅奶油径向底、柔和的球体渐变和越远越淡的景深，不加阴影和描边；橙色 `#f08c00` / `#e8590c` 只用来点出「看这里」。
- 页面里任何会自己动的东西（动画、晶体自转、小星球）离开视野就停，「减少动态效果」时不自己动。

## 小念和爸爸的形象

- 名字、配色、身高、头身比在 `src/series/characters.ts`，SVG 头像在 `src/series/avatar.ts`，3D 小星球在 `src/series/duo-stage.ts`，模型是 `public/models/character.glb`（CC0）。
- 这些和 bodyverse 保持一模一样。要改长相，两个仓库一起改。

## 扩展到新领域（物理奇遇记、地理奇遇记……）

1. 整个复制 `src/series/` 和 `public/models/`，不要改里面的角色。
2. 写一个 `<领域>/home-planet.ts`：调用 `mountDuo(host, { label, decorate, onTap })`，在 `decorate(kit)` 里用 `kit.plant(obj, x, z)` 把领域道具立在星球上（化学是烧瓶、晶体、分子，见 `src/learning/home-planet.ts`）；`kit.onFrame` 做小动画。镜头只看得见星球顶上一圈，道具放在 |x| ≤ 1.3 的地方。
3. 首页先用 `canUseWebGL()`（`src/series/webgl.ts`）判断，再动态 `import()` 星球模块，这样 three.js 不进首屏包。
4. 换掉 `tokens.css` 里的强调色，其余暖色变量保持一致，系列看起来才像一家。
5. 复用文章骨架：`Story` 类型、追问链规矩（`rules.ts`）、配图机制（`figures.ts` 换成领域自己的图）、动画引擎（`film/`）。

## 第三方课件

`public/lessons/tongjiang/` 下的 3D 课件是 CC BY-NC 4.0，原文件不许改；样式和交互适配只在 `public/theme/lesson.css` 和 `public/theme/lesson-adapter.js` 里做。

实验台要和文章看起来是一家：「看懂原理」说明卡也是小念问、爸爸答的两个气泡（同样的气泡色、头像、手写体），说明卡里不出现给老师看的教材引注；天空和雾刷成奶油暖色。改说明卡时只动这两个文件和 `src/learning/pages/lab.ts`，别把课件里会变色的东西（火焰、指示剂、溶液）也调色，颜色本身就是现象。
