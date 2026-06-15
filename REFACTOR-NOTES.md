# 改造建议 — 去掉「AI 味」

> 这份笔记只**诊断 + 建议**，不替你重写（按你的要求）。
> 行号都指原始 `index (31).html`；在 `public/legacy-app.js` 里按函数名/常量名搜索即可定位。

---

## 0. 全局 AI 味（七个最重的，先改这些性价比最高）

| # | 病症 | 现状 | 建议 |
|---|---|---|---|
| 1 | **Emoji 当图标** | KPI 用 🌐📡🤝📨、积分 💎、通知 🔔、问候 👋、扫描步骤 🌐📊🎯✨、反馈 🧠 | 全删。侧边栏已经是一套 feather 描边 SVG —— 统一到**一套**图标（Phosphor / Tabler），数据卡用「小图标 + 标签」或干脆只留数字。Emoji 是最一眼的 AI tell。 |
| 2 | **发光 / 脉冲 / 光球 到处都是** | 登录页三个 blur 光球 + 粒子 canvas、logo `logoPulse` 发光、`.kpi-card-glow`、各种 `pulse`/`ringExpand`/`pulseGlow` | 动效要「有意义」才留：地图实时打点、数字滚动可留；纯装饰的呼吸光晕全砍。redesign 规范明确点名 neon glow。 |
| 3 | **渐变 everything** | 按钮、logo 块、头像、进度条全是品牌渐变；个别渐变文字 | 实心色为主。渐变只保留在 1 处品牌符号（logo mark）。其余按钮用实心 `--accent` + 深色字（已在 polish 层修过对比度）。 |
| 4 | **假大数 + 处处 ▲x.x%** | 2,847,392 / 98,241 / 2.8M+，每张卡都挂「▲3.2% 较昨日」 | 要么接真数据，要么把数字调成可信的「脏」值并去掉一半涨跌徽标。每个指标都在涨 = 演示假象。 |
| 5 | **营销腔文案塞进工具里** | 「AI 驱动的 B2B 拓客引擎」「全球商机智能平台」「✨ 生成专属拓客模型」 | 工具内用动词短句，别用 landing page 口号。「找客户」「今天 12 条高匹配」就够了。 |
| 6 | **N 等分卡片行** | 4 张等宽 KPI 卡是最通用的 AI dashboard 布局 | 打破对称：1 个主指标放大 + 其余做小号 inline；或 KPI 配 sparkline。 |
| 7 | **「实时」徽标 + 脉冲绿点泛滥** | `.panel-live`、`.icp-status-dot`、live-stats 绿点到处闪 | 绿点只在真表示「在线/实时」语义处用一个，别当装饰。 |

> 注意：多色数据语义色（cyan/green/amber/red）在 dashboard 里是**功能性**的，**别**当 AI tell 删——
> 它们用于区分数据类别，是合理的。要砍的是「装饰性」的发光和渐变，不是信息色。

---

## 1. LoginScreen.vue  （原 L906-977）

**AI 味最重的一屏。** 三个浮动渐变光球 + 全屏粒子 canvas（`reg-particle-canvas`）+ 居中玻璃卡 + 底部脉冲「实时在线」虚荣计数 + 「AI 驱动的 B2B 拓客引擎」副标 —— 这就是教科书级「AI SaaS 登录页」。

建议：
- 砍掉 `login-orb1/2/3` 和粒子 canvas。背景换成**静态**的深海色 + 极轻噪点（polish 层已有 grain）。
- 改**非对称**布局：左侧品牌 + 一句真实价值主张（不要口号），右侧表单。别再居中玻璃卡。
- 底部三个滚动大数（2,847,392 全球商机…）属于虚荣指标，删掉或换成一句可信的状态。
- 关联逻辑：`doLogin`、`startScan`（扫描遮罩 `reg-scan-overlay`）。重写时把「登录→输网址 modal→扫描动画」做成真实首启流程，别为演示而演示。

## 2. OnboardingScreen.vue  （原 L978-1021）

全屏世界地图 + 飞线弧光 + 自动播放的「章节」幻灯 + 52px 渐变大标题。**这屏的地图恰恰是你的品牌内核**（"live global pulse"），值得留；但要去掉「炫技 demo」感。

建议：
- 地图保留并强化（它就是卖点）。但**砍掉自动轮播的多章节叙事**和满屏烟花弧线，节制到 1-2 条有信息量的轨迹。
- 大标题别用渐变 + 居中，换成左对齐、实色、display 字体（Bricolage 已配好）。
- 关联逻辑：`runOnboarding / initMapCanvas / drawMap / launchArc / advanceOb / showObChapter / startObCounter`（canvas，重写时整体搬进一个 `useOnboardingMap` composable，用 `<canvas ref>` 而非 getElementById）。

## 3. DashboardPage.vue  （原 L1085-1350）

问候「早上好，Liu Wei 👋」+ 4 张 emoji+发光 KPI 卡 + 「全球商机热力图 实时」+ 右栏。通用 dashboard 模板。

建议：
- KPI：去 emoji、去 `kpi-card-glow`；数字已是 JetBrains Mono（polish 层），加迷你 sparkline 比「▲3.2%」更有信息量。
- 把地图（`night-map-canvas`）提为视觉主角，而不是和 KPI 抢戏的一个 tile。
- 关联逻辑：`renderAiReport / renderTodayTodo / setPf`（热力图筛选）。canvas 同样进 composable。

## 4. LeadsPage.vue  （原 L1423-1683，最大一屏 269 行）

「ICP Agent · 自动找客户」：实时任务计数 `taskFoundCount` + 滚动 live feed + 地区/行业多选下拉（`RG_COUNTRIES`）+ 客户表。功能其实很扎实，AI 味主要在**话术**和**满屏「正在 AI 分析…」的伪进度**。

建议：
- 砍掉为演示而跳动的 `startTaskFoundCounter / startTaskLiveFeed`（数字乱涨）——或只在真有后台任务时显示。
- 关联逻辑很多：`renderIcpAgent / showLeadsView / renderCustTable / enrichOne / addToEdm / RG_* 一整套下拉`。重写时这是最该拆成**多个子组件 + composable** 的一屏（筛选器 / 结果表 / 详情抽屉）。

## 5. MarketingPage.vue  （原 L1738-1752）

邮件审批队列 + A/B 变体。本体很短，渲染靠 JS（`renderMktList / selectMktItem / selectVariant / approveEmail`）。

建议：成功提示别用感叹号/✅；审批/拒绝按钮已有 polish 的按压反馈。把 `EMAIL_VARIANTS / MKT_ITEMS` 数据抽到 `data/`。

## 6. IntelPage.vue  （原 L1754-1825）

筛选栏（搜索/导出/地区/行业/状态/排序 pills）+ 表格（`renderIntelTable / INTEL_TABLE_DATA`）。这屏相对克制，是全站最「像真工具」的一屏，可作为其它屏的基调参照。

建议：表格行别用 `border-t + border-b` 双线（如有）；保持单细线。导出/筛选用统一图标。

## 7. WhatsAppPage.vue  （原 L1684-1737）

「商机中心」聊天 UI：联系人列表 + 对话 + 快捷 chip（`renderWaContacts / renderWaChat / sendWaMsg / WA_*`）。聊天气泡的打字动画（`typingBounce`）是合理的反馈动效，可留。

建议：把 `WA_CONTACTS / WA_CHATS / WA_CHIPS` 抽到 `data/`；联系人/对话拆两个子组件。

## 8. PoolPage.vue  （原 L1351-1422）

客户池表格 + 详情（`renderPoolPage / renderPoolTable / showPoolDetail / CPOOL_DATA / CUST_DATA`）。和 Leads 表格逻辑重叠不少。

建议：重写时**和 Leads 的客户表合并成一个可复用 `<CustomerTable>`**，避免两套渲染逻辑。

## 9. AiBubble / AppModals / ToastHost （原 L1831-1929）

- AiBubble：浮动 AI 助手（`toggleAi / rotateAiMsg / aiAction`）。轮播话术 `AI_MSGS` 偏「AI 腔」，精简。
- AppModals：`modal-connect / modal-unlock / feedback-modal`。建联/解锁/反馈。`showModal/closeModal` 用 display 切换 —— 重写成 `v-if` + `<Teleport to="body">`。
- ToastHost：`toast(icon,title,sub)` 单例。重写成一个 toast store（数组 + `<TransitionGroup>`）。

---

## 重写时的机械替换配方

1. **`onclick="fn(a,b)"` → `@click="fn(a,b)"`**，函数从 `legacy-app.js` 搬进 `<script setup>` 或 composable。改完即可删 `main.js` 里的 shim 段。
2. **`onclick="setPf(this)"`（传 this）** → `@click="setPf($event.currentTarget)"` 或直接用响应式状态替掉 DOM 类切换。
3. **`getElementById(...).innerHTML = ...` 渲染函数** → `<template>` + `v-for` + 响应式数组。
4. **`.screen.active` / `.page.on` 的 id 类切换** → `currentScreen` / `currentPage` ref + `v-if` / `<component :is>`，删掉 `navTo` 的 id juggling。
5. **canvas（地图/粒子）** → `<canvas ref>` + `onMounted`/`onUnmounted` 的 composable，别再 getElementById；动画循环记得 `cancelAnimationFrame` 清理。
6. **`setInterval` 计数器**（`startActivityFeed / startTaskFoundCounter / actIntervalId / taskFeedInterval`）→ 组件卸载时清。

## 数据抽取接缝表（搬进 `src/data/`，纯数据无依赖）

| 常量 | 原行号 | 归属 |
|---|---|---|
| `LEADS` | 1935 | leads |
| `WA_CONTACTS / WA_CHATS / WA_CHIPS` | 1947 / 1956 / 1977 | whatsapp |
| `INTEL_DATA / INTEL_CENTER_CARDS / INTEL_TABLE_DATA` | 1983 / 2055 / 3937 | intel |
| `MKT_ITEMS / EMAIL_VARIANTS` | 1998 / 2008 | marketing |
| `AI_MSGS / AI_REPORT_ITEMS / AI_DAILY_ITEMS / TODAY_TODOS` | 2062 / 2669 / 3910 / 2676 | ai / dashboard |
| `MAP_REGIONS / CITY_LIGHTS / CONTINENTS` | 2218 / 2234 / 2263 | onboarding+dashboard 地图 |
| `OB_CHAPTERS_MAP / OB_CONTENTS / OB_DURATIONS_MAP` | 2286 / 2296 / 2411 | onboarding |
| `ICP_BUYERS / ICP_EDM_POOL / RG_COUNTRIES` | 2754 / 2766 / 3531 | leads |
| `CPOOL_DATA / CUST_DATA / LIVE_CUSTOMERS / POOL_SOURCE_MAP` | 2776 / 2974 / 2908 / 3173 | pool |
| `NEW_ACTIVITIES` | 4126 | dashboard 活动流 |

> 这些数据是纯数组/对象，最适合第一步先抽出来——抽完逻辑函数就只剩行为，拆起来清爽很多。
