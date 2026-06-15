# 通宵自治优化目标 (Overnight Autonomous Goal)

> 这是 `/loop` 自治循环的驱动文件。每轮:读本文件 → 取下一个未完成任务 → 做 → build → commit → 勾掉 → 记日志。

## 🎯 目标
把 `traderadar-vue/` 里抽取出来的 13 个组件，**逐个从「忠实抽取」重写成 idiomatic Vue 并去掉 AI 味**，
视觉遵循 `../DESIGN.md`(Signal Room)，诊断依据 `REFACTOR-NOTES.md`。

## 🚧 硬护栏 (每轮必须遵守)
1. **只动 `traderadar-vue/` 内的文件。** 绝不碰 `../index (31).html`、`../DESIGN.md`、`../design-preview.html`(它们是只读参考)。
2. **每轮只做一个任务**，专注、小步。不要一轮重写多个组件。
3. **build 是闸门**:改完跑 `pnpm build`。
   - 通过 → `git add -A && git commit -m "..."`(描述性中文 message),然后在下方勾掉任务 + 记一行日志。
   - 失败 → `git checkout -- .` 回滚本轮改动,在日志记下失败原因,该任务标记 `[!]` 跳过,进入下一个。
4. **用 taste-skill**:重写组件前,用 `Skill` 调 `taste-skill:redesign-skill`(改造现有)或 `taste-skill:taste-skill`(去 slop 标准)。dashboard 类多色数据语义色是功能性的,别当 AI tell 删。
5. 转换某屏前,该屏的内联 `onclick` 改 `@click`、状态进 `<script setup>`、`innerHTML` 渲染改 `v-for`。一屏完全转完后,才可移除它对 `legacy-app.js` 的依赖。
6. **所有任务完成后**:做一次最终 QA(`pnpm build` + 通读视觉一致性),写 `SUMMARY-AM.md` 总结今晚所有改动,然后**结束循环**(不再 ScheduleWakeup)。
7. 任何不确定是否会破坏功能的大改:保守处理,记到 SUMMARY 里留给人工决定,不要硬上。

## ✅ 任务队列 (按 AI 味严重度排序)
- [x] **T0 数据抽取**:把 `legacy-app.js` 里的纯数据常量(见 REFACTOR-NOTES 接缝表)抽到 `src/data/*.js`,`export` 出来。build 必须过。 → 已抽 leads/whatsapp/intel/marketing/ai 主数据块;地图/onboarding/pool/cust 数据留待各自屏重写时随屏迁移。
- [ ] **T1 LoginScreen**:删光球+粒子 canvas+底部虚荣计数;非对称布局;真实文案(去掉"AI 驱动的拓客引擎"口号)。idiomatic Vue。
- [ ] **T2 DashboardPage**:KPI 去 emoji、去 `kpi-card-glow`;加 sparkline;地图提为主角。
- [ ] **T3 OnboardingScreen**:保留地图(卖点),砍自动轮播多章节炫技+满屏弧线;标题左对齐实色。canvas 进 composable。
- [ ] **T4 LeadsPage**:拆成 筛选器/结果表/详情 子组件;砍为演示乱跳的 `taskFoundCount`/live feed。
- [ ] **T5 IntelPage**:轻改(已较克制);统一图标;表格单细线。
- [ ] **T6 MarketingPage**:转 Vue;成功提示去感叹号/✅。
- [ ] **T7 WhatsAppPage**:转 Vue;拆 联系人/对话 两个子组件。
- [ ] **T8 PoolPage**:和 Leads 客户表合并成可复用 `<CustomerTable>`。
- [ ] **T9 Shared 浮层**:AiBubble/Modals/Toast → `<Teleport to="body">` + `v-if`;toast 改成 store + `<TransitionGroup>`。
- [ ] **T10 全局图标**:emoji 全换成一套描边图标(沿用侧边栏 feather 风格,或引入 Phosphor);保持一套。
- [ ] **T11 收尾**:确认无残留内联 `onclick` 后,删掉 `main.js` 里的临时 eval shim;删 `legacy-app.js` 中已迁移的死代码。
- [ ] **T12 最终 QA + SUMMARY-AM.md**,然后结束循环。

## 📝 进度日志 (每轮 append 一行: 时间 / 任务 / 结果 / commit)
- 2026-06-16 (setup) baseline committed, build OK, loop armed.
- 2026-06-16 T0 数据抽取 ✅ src/data/{leads,whatsapp,intel,marketing,ai}.js,node --check 全过,build OK。next: T1 LoginScreen。
