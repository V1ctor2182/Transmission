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
