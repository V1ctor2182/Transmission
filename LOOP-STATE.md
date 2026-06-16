# LOOP-STATE — 持续 loop 的台账(context 会重置,状态必须落盘)

## 配置(已确认)
- **模式**:分层双模式。Hero=放大(序列截图+黄金路径+delight rubric,提 `feat/` 分支**暂停等人工**);Standard/Utility=四段闸门**自动落库**。
- **cadence**:600s(10min/轮)。
- **作用域**:只动 `traderadar-vue/`。绝不碰 `../index (31).html`、`../DESIGN.md`、`../design-preview.html`、`../*preview*.html`(只读参考)。
- **方向**:落地 Phosphor + 多窗格指挥台 + 重设计的首启旅程,并打磨 3 个 Hero;同时继续去 AI 味。
- **红线**:「活」必须挣来(真数据/真意义),包装里不许造新 AI 味。

## 每轮流程(审计→排序→执行→验收→checkpoint→收敛检查)
1. 读 `BACKLOG.md` + 本文件;**审计**:截 1-2 区域图对照 `DESIGN.md`/`HERO-FEATURES.md`,新候选去重写入 backlog。
2. **排序**取顶(影响×把握÷风险,Hero 加权,跳过 done/冷却项)。
3. **执行**一项(分档投入)。Hero 前先 `Skill` 调 taste-skill。
4. **验收(闸门改成「前后 delta」)**:
   - **改之前**先截 before:`node scripts/verify.mjs <screen>` → `cp .review/<screen>.png .review/<screen>-before.png`。
   - 做改动 → 再截 after:`node scripts/verify.mjs <screen> [Task]`(= `.review/<screen>.png`)。
   - Standard/Utility:build + 机检断言 + **3 critic 读 `DELTA-RUBRIC.md`,同时看 before 和 after 两张图,判「有没有新引入的回退/slop」**(≥2 KEEP 过;既有 slop 不算回退,排 backlog)。
   - Hero:序列截图(`verify.mjs <screen> <Task> seq`)+ 黄金路径 + 3 critic 读 `DELIGHT-RUBRIC.md`。
5. **checkpoint**:Standard/Utility 过了 `git commit` 自动落库;**Hero 过了 `git checkout -b feat/hero-xxx` + commit + 暂停**(本轮**不**再 ScheduleWakeup,留言等人工 review/merge)。
6. **写报告(每轮必做)**:把本轮截图从 `.review/` 拷到 `reports/shots/r<NNN>-*.png`(轮号命名不覆盖),写 `reports/round-<NNN>-<task>.md`(模板见下),更新 `reports/INDEX.md` 顶部一行,连截图一起 `git commit`。Hero 轮报告顶部加 `⏸ 需要你 REVIEW` + 3 帧序列 + delight 裁决 + 分支名。
7. **收敛检查**:连续 K=3 轮只挖到低价值 → 发 digest 问方向并降速;build+机检+(Hero)黄金路径必须永远绿,绝不落 regression。
8. 非 Hero 轮:末尾 `ScheduleWakeup(600)` 排下一轮。Hero 轮:**不**排,等人工。

## 报告模板 `reports/round-<NNN>-<task>.md`
```markdown
# Round <NNN> · <档> · <任务>
<若 Hero:> ⏸ **需要你 REVIEW** — 分支 `feat/hero-xxx`,满意就 `git merge`。
- 时间 / 档位 / backlog 来源项
- **做了什么**:1-3 句
- **验收**:build ✓ · 机检 <断言结果> · critic/delight <grades + 裁决>
- **截图**:
  ![](shots/r<NNN>-<screen>.png)
  <Hero:三帧> ![t0](shots/r<NNN>-<screen>-t0.png) ![t1](...-t1.png) ![t2](...-t2.png)
- **commit/分支** · **backlog 变化**(新增/完成了哪些)
```

## Done 台账(已完成,别重复碰除非发现 regression)
- v1(旧 cyan/侧栏 app 去 AI 味):T0 数据抽取 · Tb appendChild 修复 · T1 登录重写 · T2 KPI · T3 Onboarding 标题 · T4 砍 Leads 假计数 · T5 Intel 去 emoji · T6 Marketing 去✅ · T7 WhatsApp 去💬。
- 设计:Phosphor + 多窗格 + 首启旅程 已定稿(DESIGN.md / *preview*.html)。

## 轮次日志(每轮 append:时间 / 档 / 任务 / 结果 / commit 或 分支)
- (v2 未启动 —— 等用户最终 GO) → 已 GO,启动。
- 2026-06-16 R001 🟦 Phosphor 全局换色(B1/B2)✅ build✓ 机检✓ critic 3/3 KEEP A/A/A−。自动落库。报告 reports/round-001。新增候选 B3(次级色)/B4(地图暖化)。next: 排序后大概率 B4/B3 或多窗格。
- 2026-06-16 R002 🟦 地图暖化+彻底去cyan(B4+B3)。build✓机检✓。critic 2轮均2/3 REVERT(理由=屏内既有emoji/iris slop,非本轮回退)→操作员override落库(净改进无regression)。新增高优 B5(dashboard去emoji)/B6(iris收掉)。教训:emoji/iris重的屏要先清再做色彩。next: B5。
- 2026-06-16 用户点名:按钮很有 AI 味 → 新增 B7(全局按钮去渐变/去 glow,改 Phosphor 仪表级),设为高优,排在 dashboard emoji(B5)同级或更前。
- 2026-06-16 R003 🟦 B7 按钮去 AI 味(用户点名)。polish.css 集中一套 Phosphor 仪表级按钮:主按钮去渐变/去 glow/深 ink。delta 闸门首次实战 3/3 KEEP(regression none)。自动落库。余:marketing CTA 权重 + .btn 类彻底重构留后。next: B5 dashboard 去 emoji。
- 2026-06-16 R004 🟦 B5 dashboard 去 emoji。AI报告/待办/积分 emoji → 彩色 accent bar/点 + SVG钻石。机检渲染后 emoji clean。delta 3/3 KEEP。自动落库。next: B6 iris 收掉。
- 2026-06-16 R005 🟦 B6 iris 收掉。dashboard 4处 iris→暖色(标题/98241/待办行/欧洲热点)。delta 3/3 KEEP。**dashboard 全清里程碑**(无cyan/emoji/iris/渐变按钮)。自动落库。next 大头:多窗格布局 / T10 其它屏 / Hero。
- 2026-06-16 R006 🟦 T10-leads。leads 按钮/标题前导 emoji 去掉 + ICP头部🔍渐变glow图标→扁平SVG。delta 3/3 KEEP。自动落库。新增 T10-flags(跨屏国旗→mono国家码)。next: intel/whatsapp 去 emoji 或 T10-flags 或多窗格。
- 2026-06-16 R007 🟦 T10-flags起步:intel 国旗→mono国家码徽标(SG/MY…),加全局 FLAG2CC+ccBadge 助手(跨屏复用)。delta 3/3 KEEP。自动落库。next: 用 ccBadge 清 leads/whatsapp 国旗,或其它屏 emoji,或多窗格。
- 2026-06-16 R008 🟦 whatsapp 国旗→mono码(复用ccBadge,FLAG2CC补BR等)+去🔗按钮emoji。delta 3/3 KEEP。自动落库。next: 收敛检查—连续多轮小清理,考虑转多窗格布局或起第一个Hero。
- 2026-06-16 R009 🟥 HERO H1 AI分析首启。FirstRunAnalysis.vue:状态循环/地图逐区点亮/KPI count-up/买家流入,无假%。Hero门:build✓ 序列3帧✓ delight 3/3 KEEP(wow B/A/A earned A/A/A)。**提分支 feat/hero-first-run + 暂停等人工 review,不自动merge,本轮不 ScheduleWakeup。**
- 2026-06-16 H1 merged→main + 接入真实流程:startScan() 现在触发 FirstRunAnalysis(替代旧假扫描+章节),进入工作台→enterApp。黄金路径端到端通过(modal✓ analysis✓ app✓ 零错误)。
- 2026-06-16 R010 🟦 热力图接真实世界地图(@svg-maps/world,WorldHeatmap.vue),dashboard 假大陆→真地图。delta 3/3 KEEP。教训:漏刷after图致误判,刷新重跑。自动落库。next: FirstRunAnalysis真地图 / 多窗格。
- 2026-06-16 R011 🟦 FirstRunAnalysis 地图复用 WorldHeatmap 真实世界地图(逐区点亮保留)。dashboard+首启同一套真地图。delta 3/3 KEEP。自动落库。next: 多窗格 AppShell 布局(大件,reviewed 分支)。
- 2026-06-16 R012 🟧 多窗格指挥台布局落地(dashboard→layout-preview 网格:地图 hero + KPI 条 + AI工作流 feed + 右侧实时买家整列,窄图标栏/TopBar 保留)。build✓ 机检零错✓ delta 3/3 KEEP(critic 还指出去掉了旧 AI feed 重复)。**提分支 feat/layout-command-center,暂停等人工 review,未 merge,本轮不 ScheduleWakeup。**
- 2026-06-16 R012-fix 🔧 修 R012 回归:.page.dash-cc{display:flex} 特异性高过 .page{display:none},致离开工作台后 dashboard 铺在其它页面后面。改成 display gate 在 .on 上。机检+视觉复核 leads/marketing 干净。教训:布局类 display 覆盖必须 gate 在显隐类上;机检无 JS 错≠无视觉回归,跨屏视觉抽查必须做。
- 2026-06-16 用户验收 R012 满意→merge main。新方向:组件级去 AI 味,重点序=①emoji 装饰(CP1 pool/CP2 wa/CP3 leads,先)②通用模板组件 avatar/logo瓦片/进度条/pill(CP4)③配色渐变残留(CP5)。文案腔调暂不动。next R013: CP1 客户池去 emoji(国旗→ccBadge mono 码 + 🤖/💬→扁平)。
