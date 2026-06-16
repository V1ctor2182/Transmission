# BACKLOG — 活的候选池(loop 每轮排序取顶)

> loop 每轮**审计**会往这里加新候选(去重),**排序**按 影响×把握÷风险、Hero 加权。
> 档位:🟥Hero(放大模式,提分支+暂停)· 🟦Standard(清理,自动)· ⬜Utility(机械,自动)。
> 状态:`[ ]`待办 `[~]`进行中(Hero 分支待 review) `[x]`完成 `[!]`跳过/受阻。

## 当前方向(重要)
项目刚定了**大改**:视觉 → Phosphor(amber/暖黑,cyan 退役)· 布局 → 多窗格指挥台 · 首启旅程重设计。
真 app 现在还是旧的 cyan/侧边栏。所以 backlog 的大头是**把新设计落地** + 打磨 3 个 Hero 体验,而不只是清理旧的。

## 🟦 基建(安全、自动、先做 —— 高影响低风险)
- [x] **B1 Phosphor 全局换色**(round 001):品牌 cyan→amber 全站替换完成。
- [x] **B2 暖黑底 + 边框暖白化**(round 001):底色/文字/边框暖化完成。
- [x] **B3 次级数据色收编**(round 002):cyan(#22d3ee/#67e8f9/#9beae0)+ teal 绿(#34d399)全清。余 `--amber #fbbf24` 属 amber 家族,暂留。
- [x] **B4 夜地图调暖**(round 002):大陆冷蓝→暖近黑,热点 cyan→amber。
- [ ] 🔴 **B5 dashboard 去 emoji(T10 子项,最高优)**(round 002 critic 发现):AI 报告面板满是 emoji(💎建联徽标/🌐/🔍/📣/🤝/💬…)→ 换描边图标或文字。**它在挡 dashboard 评分,先做。** 影响:高。风险:中。
- [ ] 🔴 **B6 iris 强调色收掉**(round 002 critic 发现):AI 报告「98,241 条需求」用 iris-blue、「今日待办」标题 iris → DESIGN.md 说 iris 仅结构色,改 amber/文字。影响:中。风险:低。
- [x] 🔴 **B7 按钮去 AI 味(全局按钮系统 · 用户 2026-06-16 点名)**:现在按钮是「渐变填充 + 发光 box-shadow + 大圆角」三件套(`.login-btn`/`.wm-btn`/`.btn-connect`/`.btn-approve`/`.wm-btn` 等的 `linear-gradient(...)` + `box-shadow:0 ... var(--brand)`)。改成 **Phosphor 仪表级**:① 主按钮 = 实心 `--accent` 琥珀 + 深 ink(`#1a1305`),去渐变;② 次按钮 = 扁平 `--surface` + 1px 描边,无填充;③ 去掉所有 glow 光晕 box-shadow,最多极淡的 inset 高光;④ 统一圆角 10px;⑤ 保留 `:active` 物理按压、`:focus-visible` 环。**定义一套按钮类、全屏复用**,别每处各写一套。分屏分轮验(每屏 before/after delta)。影响:高(按钮到处都是)。风险:中。
- [ ] **T10 全局 emoji 统一**(~400 个:国旗/状态/图标)→ 一套描边图标或纯文字。分屏分轮做。影响:大。风险:中(量大)。

## 🟥 Hero(放大模式 · 提 `feat/` 分支 + 暂停等 review)
- [ ] **H1 AI 分析首启落地**:把 `journey-preview` 的「入口 + 指挥台自我拼装」实装。要做拼装编排动效(地图逐区点亮/KPI count-up/买家流入),真数据驱动、无假 %。序列截图 + 黄金路径 `输网址→拼装→ready`。
- [ ] **H2 找客户/ICP 体验包装**:买家**带匹配理由**流入(来源+理由可见)、enrich「锁→解锁联系方式」揭示。红线:不准假计数(已删),分数必须有可见理由。
- [ ] **H3 实时商机/建联 golden path**:热力图→点热点→该区买家→一键建联→WhatsApp(话术已清)。每个 ping 对应真信号。
- [ ] **HX 黄金 demo 路径节奏**:整条 `输网址→分析→工作台→找到买家→建联` 端到端的节奏打磨(常驻任务,每隔几轮回看一次)。

## 🟦 Standard(清理 · 自动)
- [ ] **多窗格 AppShell 落地**:把 `AppShell.vue` 从侧栏+单页改成 `layout-preview` 的窗格网格;Dashboard 先改成指挥台,其它屏逐步用同一 pane 语言。(大,可能拆多轮;涉及 Hero 屏的部分按 Hero 走分支。)
- [ ] **T8 Pool**:客户表抽成可复用 `CustomerTable.vue`,Leads 与 Pool 共用。
- [ ] **T9 浮层**:Modals/Toast → `<Teleport>`+`v-if` / toast store。
- [ ] critic 历史遗留 polish:登录副文案对比度 · 营销批准 CTA 权重弱 · WhatsApp cyan 气泡对比度 · 欢迎卡片偏营销腔。

## 🟦 收尾(等迁移差不多了再做)
- [ ] **T11**:确认无残留内联 `onclick` 后,删 `main.js` 的 eval shim + `legacy-app.js` 死代码。

> loop 启动时大概率先做 B1/B2(Phosphor 换色,安全高影响),再推进多窗格 + Hero。Hero 都会停下等你。
