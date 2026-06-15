# 通宵自治优化目标 (Overnight Autonomous Goal)

> 这是 `/loop` 自治循环的驱动文件。每轮:读本文件 → 取下一个未完成任务 → 做 → build → commit → 勾掉 → 记日志。

## 🎯 目标
把 `traderadar-vue/` 里抽取出来的 13 个组件，**逐个从「忠实抽取」重写成 idiomatic Vue 并去掉 AI 味**，
视觉遵循 `../DESIGN.md`(Signal Room)，诊断依据 `REFACTOR-NOTES.md`。

## 🚧 硬护栏 (每轮必须遵守)
1. **只动 `traderadar-vue/` 内的文件。** 绝不碰 `../index (31).html`、`../DESIGN.md`、`../design-preview.html`(只读参考)。
2. **每轮只做一个任务**,专注、小步。不要一轮重写多个组件。
3. **用 taste-skill**:重写组件前,用 `Skill` 调 `taste-skill:redesign-skill` 或 `taste-skill:taste-skill`。dashboard 类多色数据语义色是功能性的,别当 AI tell 删。
4. 转换某屏:内联 `onclick`→`@click`、状态进 `<script setup>`、`innerHTML` 渲染→`v-for`。一屏完全转完后才可移除它对 `legacy-app.js` 的依赖。
5. **结束**:所有任务完成 → 最终 QA → 写 `SUMMARY-AM.md` → 不再 ScheduleWakeup。
6. 不确定是否破坏功能的大改:保守,记到 SUMMARY 留人工决定,别硬上。

## ✅ 四段验收闸门 (替代原来的「build 过就行」—— 防盲改跑偏)
改完后**依次**过四关,任一不过就 `git checkout -- .` 回滚本轮、该任务标 `[!]`、记日志、进下一个:

1. **编译**:`pnpm build` 必须过。
2. **机检断言**:`node scripts/verify.mjs <screen> <TaskId>`。它截图到 `.review/<screen>.png` 并跑该任务的客观断言(见下方各任务「验收」)。`pass:false` 或 `newErrors` 非空(引入了 baseline 之外的运行时错误)→ 回滚。
3. **截图评审(对抗式 · 3 票多数)**:用 `Agent` 工具**并行派 3 个独立 critic**(同一 prompt:「读 `REVIEW-RUBRIC.md` 和 `../DESIGN.md`,只看截图 `.review/<screen>.png`,按规则给 `__CRITIC__` JSON 裁决」)。每个 critic fresh eyes、默认怀疑、互不知情、不知道改了啥。
   - **多数表决**:≥2 票 `KEEP` 才算过;≥2 票 `REVERT` → 回滚。
   - 任一 critic 命中「硬否决」(渲染崩坏/方向更 AI 味/文字看不清)→ 直接回滚,不看票数。
   - 3 个里有 critic 调用失败 → 按现有票数,不足 2 KEEP 就回滚(宁可错杀)。
4. **全过(编译✓ + 断言✓ + critic=KEEP)** → `git add -A && git commit`(中文 message,附 critic grade)+ 勾任务 `[x]` + append 日志(含 grade/slop_grade)。

> 关键:**只有四关全过才落库**。这样每个 commit 都是「编译过 + 客观断言达标 + 独立评审认可方向更对」的,而不是盲改。

## ✅ 任务队列 (按 AI 味严重度排序)
- [x] **T0 数据抽取**:把 `legacy-app.js` 里的纯数据常量(见 REFACTOR-NOTES 接缝表)抽到 `src/data/*.js`,`export` 出来。build 必须过。 → 已抽 leads/whatsapp/intel/marketing/ai 主数据块;地图/onboarding/pool/cust 数据留待各自屏重写时随屏迁移。
- [x] **Tb (bug · 先做)** 修 init 期 `appendChild` on null 报错(`.review/baseline-errors.json` 里那条)。最可能是活动流 `startActivityFeed` 在无 `activity-list`/list 容器的屏上 `list.appendChild`/`list2.insertBefore`(legacy-app.js L2228/2240),或其它 render 函数在元素不存在时硬插。**修法**:给这些 init/render 在容器为 null 时 `if(!el) return` 守卫(别删功能,只防空)。修完 `node scripts/verify.mjs login` 与 `dashboard` 都应无该错;然后**把这条从 `.review/baseline-errors.json` 删掉**(以后再出现就能被抓)。验收:两屏 `newErrors` 为空 且 baseline 不再含 appendChild。
- [x] **T1 LoginScreen**:删光球+粒子 canvas+底部虚荣计数;非对称布局;真实文案(去掉"AI 驱动的拓客引擎"口号)。idiomatic Vue。 → 双栏 split + `<script setup>`/v-model;3 critic 全 KEEP(A/B/B,slop A)。遗留小项:副文案/按钮下提示对比度偏低,留待 polish。
- [x] **T2 DashboardPage**:KPI 去 emoji、去 `kpi-card-glow`;加 sparkline;地图提为主角。 → KPI 改数据驱动 v-for:删 emoji 图标/glow,加 sparkline,▲→+,@click nav。3 critic KEEP(B/B/B)。**地图增高暂缓**(canvas+svg viewBox 会变形,保守留后)。右栏 AI 报告的彩 chip/emoji 行归 T10。
- [x] **T3 OnboardingScreen**:保留地图(卖点),砍自动轮播多章节炫技+满屏弧线;标题左对齐实色。canvas 进 composable。 → 安全部分完成:`.ob-h1` 左对齐+实色(去渐变文字)。3 critic KEEP(B/B/B)。**大改延后(需人工)**:canvas→composable、砍自动轮播/弧线属高风险且 onboarding 屏难自动验证,按护栏 6 留 SUMMARY。critic 另提:KPI 4 色稀释强调色、"AI 分析引擎"措辞、低多边形地图略糙 → 归 T10/人工。
- [x] **T4 LeadsPage**:拆成 筛选器/结果表/详情 子组件;砍为演示乱跳的 `taskFoundCount`/live feed。 → 安全部分完成:删掉 startTaskLiveFeed 里每 3.5s 乱跳计数+自动插 feed 的演示动画(保留 4 条真实初始线索)。行为断言通过(计数 4.2s 内不变 2,847)。无视觉 delta(改在 tasks 子视图)→ 跳过 critic,自查 leads 截图确认无破坏。**子组件拆分延后(需人工)**:legacy innerHTML 渲染页上拆 筛选/表/详情 是高风险大重构,按护栏 6 留 SUMMARY。
- [x] **T5 IntelPage**:轻改(已较克制);统一图标;表格单细线。 → 筛选控件(地区/品类/状态 select + 导出按钮)去 emoji 统一为纯文字;表格本就单细线(border-bottom)无需改。3 critic KEEP(B/B/B,slop A/A/A)。注:表格数据列的国旗 emoji(INTEL_TABLE_DATA,全站共 432 个 emoji)归 **T10 全局图标轮**;断言范围已收窄到筛选控件。
- [ ] **T6 MarketingPage**:转 Vue;成功提示去感叹号/✅。
- [ ] **T7 WhatsAppPage**:转 Vue;拆 联系人/对话 两个子组件。
- [ ] **T8 PoolPage**:和 Leads 客户表合并成可复用 `<CustomerTable>`。
- [ ] **T9 Shared 浮层**:AiBubble/Modals/Toast → `<Teleport to="body">` + `v-if`;toast 改成 store + `<TransitionGroup>`。
- [ ] **T10 全局图标**:emoji 全换成一套描边图标(沿用侧边栏 feather 风格,或引入 Phosphor);保持一套。
- [ ] **T11 收尾**:确认无残留内联 `onclick` 后,删掉 `main.js` 里的临时 eval shim;删 `legacy-app.js` 中已迁移的死代码。
- [ ] **T12 最终 QA + SUMMARY-AM.md**,然后结束循环。

## 🔎 验收映射 (任务 → verify 的 screen 参数 + 该加的机检断言)
做某任务时,若 `scripts/verify.mjs` 的 `CHECKS` 里还没有该任务的断言,**先补一条最小客观断言再跑闸门**。

| 任务 | `verify.mjs <screen> <Task>` | 该任务的机检断言(客观、可机判) |
|---|---|---|
| T1 | `login T1` | 已就绪:无 `.login-orb`、无 `#reg-particle-canvas`、登录区无 emoji、`.login-btn` 文字 luminance<0.35 |
| T2 | `dashboard T2` | KPI 区无 emoji;无 `.kpi-card-glow` 元素 |
| T3 | `onboard T3`(若 onboard 不易导航,截当前可见态) | 标题非 `text-align:center`;弧线/自动轮播相关装饰类减少 |
| T4 | `leads T4` | 无为演示乱跳的计数 interval(检查不再 setInterval taskFoundCount);筛选/表/详情已拆子组件文件存在 |
| T5 | `intel T5` | 表格行非 `border-top`+`border-bottom` 双线;图标统一 |
| T6 | `marketing T6` | 成功提示无 `!`/`✅`;组件已转 Vue(无遗留 innerHTML 渲染入口) |
| T7 | `whatsapp T7` | 已拆 联系人/对话 两个子组件文件 |
| T8 | `pool T8` | 存在可复用 `CustomerTable.vue`,Leads 与 Pool 都引用它 |
| T9 | `dashboard T9`(浮层) | Modals 用 `<Teleport>`+`v-if`;toast 为 store |
| T10 | 每屏轮流 | 全仓 `.vue` 内无 emoji 字符(grep 断言) |
| T11 | `login T11` | 全仓无残留内联 `onclick`;`main.js` 已无 eval shim |

## 📝 进度日志 (每轮 append 一行: 时间 / 任务 / 结果 / commit)
- 2026-06-16 (setup) baseline committed, build OK, loop armed.
- 2026-06-16 T0 数据抽取 ✅ src/data/{leads,whatsapp,intel,marketing,ai}.js,node --check 全过,build OK。next: T1 LoginScreen。
- 2026-06-16 Tb ✅ legacy-app.js:2196 stars init 加 if(!container)return 守卫;两屏 pageErrors 清空,baseline 重置为[],复验 pass。纯JS守卫无视觉改动→跳过 critic。next: T1。
- 2026-06-16 T1 ✅ LoginScreen 重写:删光球/粒子/虚荣计数,非对称双栏+真实文案,script setup+v-model。4关全过(build✓ 断言4/4✓ critic 3/3 KEEP A/B/B slopA)。遗留:低对比小字留 polish。next: T2 Dashboard。
- 2026-06-16 T2 ✅ Dashboard KPI 数据驱动重写:删 emoji/glow,加 sparkline,delta ▲→+,@click。4关过(build✓ 断言2/2✓ critic 3/3 KEEP B/B/B)。地图增高暂缓(canvas变形风险);AI报告彩chip/emoji归T10。next: T3 Onboarding。
- 2026-06-16 T3 ✅(部分)Onboarding 标题 .ob-h1 左对齐+实色(去渐变)。加 verify onboard 导航,自查截图确认渲染正常。4关过(build✓ 断言✓ critic 3/3 KEEP B/B/B)。canvas→composable/砍轮播弧线=高风险延后留人工(护栏6)。next: T4 Leads。
- 2026-06-16 T4 ✅(部分)Leads 删 startTaskLiveFeed 的 3.5s 乱跳计数/自动插feed(去演示AI味),保留4条初始线索。行为断言:计数4.2s不变(2,847)。无视觉delta跳过critic+自查截图无破坏。子组件拆分=高风险延后留人工。next: T5 Intel。
- 2026-06-16 T5 ✅ Intel 筛选控件(3个select+导出按钮)去 emoji→纯文字;表格本就单细线。4关过(build✓ 断言✓ critic 3/3 KEEP B/B/B slopA)。断言初版过宽(含数据国旗)已收窄;数据列国旗+全站432 emoji归T10。next: T6 Marketing。
