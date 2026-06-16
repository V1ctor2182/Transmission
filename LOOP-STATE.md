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
4. **验收**:Standard/Utility 走 `verify.mjs` 四段;Hero 走 序列截图(`verify.mjs <screen> <Task> seq`)+ 黄金路径 + 3 critic 读 `DELIGHT-RUBRIC.md`。
5. **checkpoint**:Standard/Utility 过了 `git commit` 自动落库;**Hero 过了 `git checkout -b feat/hero-xxx` + commit + 暂停**(本轮**不**再 ScheduleWakeup,留言等人工 review/merge)。
6. **收敛检查**:连续 K=3 轮只挖到低价值 → 发 digest 问方向并降速;build+机检+(Hero)黄金路径必须永远绿,绝不落 regression。
7. 非 Hero 轮:末尾 `ScheduleWakeup(600)` 排下一轮。

## Done 台账(已完成,别重复碰除非发现 regression)
- v1(旧 cyan/侧栏 app 去 AI 味):T0 数据抽取 · Tb appendChild 修复 · T1 登录重写 · T2 KPI · T3 Onboarding 标题 · T4 砍 Leads 假计数 · T5 Intel 去 emoji · T6 Marketing 去✅ · T7 WhatsApp 去💬。
- 设计:Phosphor + 多窗格 + 首启旅程 已定稿(DESIGN.md / *preview*.html)。

## 轮次日志(每轮 append:时间 / 档 / 任务 / 结果 / commit 或 分支)
- (v2 未启动 —— 等用户最终 GO)
