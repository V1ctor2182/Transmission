# TradeRadar — Vue 拆分版（重写工作区）

把原来的单文件 `index (31).html`（4190 行，内联 CSS+JS）拆成了 Vite + Vue 项目骨架，供逐屏重写。
**原文件没有改动**，仍可作为运行参考。

## 运行

```bash
cd traderadar-vue
pnpm install
pnpm dev        # 浏览器自动打开
```

## 目录结构

```
README.md                    本文件
LOOP-STATE.md                持续 loop 的台账（每轮状态落盘）
BACKLOG.md                   候选池（loop 每轮排序取顶）
docs/                        流程 / 规范 / 历史文档
  loop-procedure.md          ← 当前方向：TRANS·MISSION 信号蓝亮色品牌改造（权威流程）
  loop-prompt.md             直接复制即可启动 rebrand loop 的 /loop 整段
  HERO-FEATURES.md           三个 Hero 体验规格
  DELTA-RUBRIC.md            Standard 轮 critic 评判标尺
  DELIGHT-RUBRIC.md          Hero 轮 delight 评判标尺
  archive/                   历史文档（OVERNIGHT-GOAL · SUMMARY-AM · REFACTOR-NOTES · REVIEW-RUBRIC）
reports/                     每轮报告 + 截图（INDEX.md 倒序目录，round-NNN-*.md，shots/）
scripts/                     verify.mjs（截图机检）· h2-golden.mjs · h3-golden.mjs（黄金路径）
public/
  legacy-app.js              原 <script> 的忠实抽取（经典全局脚本）。重写时逐段拆掉。
src/
  main.js                    挂载 App + 临时「内联 onclick 桥接」shim（重写后删除）
  App.vue                    根：按原 <body> 顺序渲染三个屏 + 全局浮层
  styles/
    index.css                按顺序 @import 全部分片（polish 最后）
    tokens.css               reset + :root 设计令牌（**single source of truth**：换色先改这里）
    login / onboarding / app-shell / dashboard / leads /
    whatsapp / marketing / intel / ai-bubble / modals / toast / polish .css
  components/
    screens/  LoginScreen · OnboardingScreen · AppShell
    app/      SidebarNav · TopBar
    pages/    Dashboard · Leads · Marketing · Intel · WhatsApp · Pool
    shared/   AiBubble · AppModals · ToastHost
```

每个 `.vue` 顶部注释标了**原始行号区间**和重写提示。CSS 暂时是全局的（按原文件 section 切分），
重写某屏时把对应 `.css` 内容搬进该 SFC 的 `<style scoped>` 即可。

## 这是「脚手架」，不是成品

- 抽取出来的模板**保留了原始内联 `onclick`**。Vue 不会执行字符串 `on*` 属性，所以
  `main.js` 里有一段临时 shim 用事件委托 + `eval` 复刻内联处理器语义，让它**当下能点能跑**。
- 重写每一屏时：把 `onclick="fn()"` 改成 `@click`，状态搬进 `<script setup>`，
  `innerHTML` 渲染函数改成模板 + `v-for`。改完那一屏，shim 自然就没有可接管的节点了，最后整段删掉。

## 当前方向 → [docs/loop-procedure.md](./docs/loop-procedure.md)

正在做的是 **TRANS·MISSION 品牌改造**（暖琥珀暗色 → 信号蓝亮色 + 更名），流程与调色板都在那里；
直接启动用 [docs/loop-prompt.md](./docs/loop-prompt.md)。
历史的「AI 味」诊断 / 迁移笔记见 [docs/archive/REFACTOR-NOTES.md](./docs/archive/REFACTOR-NOTES.md)。
