# loop-prompt — 直接复制下面整段,粘进对话发送即可启动 rebrand loop

> 权威流程在 `traderadar-vue/docs/loop-procedure.md`。这段 prompt 只是入口,loop 每轮会去读那个文件。
> 第一轮(R1)会开 `feat/rebrand-transmission` 分支、做令牌反相+批量替换+更名,**做完截图暂停等你定调色彩**,不自动铺开。

---

/loop 持续把 TradeRadar 改造成 TRANS·MISSION 的视觉:信号蓝 + 亮色,去 match ../logo.jpg,并全站更名 TradeRadar/Trade Radar → TRANS·MISSION(创拾觅深 作中文署名)。**每轮严格按 /Users/victor/work/创拾觅深/traderadar-vue/docs/loop-procedure.md 执行**(它是本次权威流程,取代旧 Phosphor amber/暗色方向;../DESIGN.md、../CLAUDE.md 里 amber/cyan/暗色的说法全部作废,只读不碰)。流程:读 docs/loop-procedure.md + LOOP-STATE.md + BACKLOG.md → 审计 → 按 backlog 排序取顶。

**推进顺序**:① 先做 **R1(大件)= tokens.css 令牌反相 + 按 procedure §3 字面量批量替换表 perl 扫 27 文件 + 全站更名**;走 `git checkout -b feat/rebrand-transmission`;build + 机检 + 逐屏肉眼扫(login/工作台/找客户/情报/whatsapp/客户池/营销/首启)+ golden(node scripts/h2-golden.mjs、scripts/h3-golden.mjs)+ 截图;**做完 commit + push origin feat/rebrand-transmission,然后暂停等人工 review 色彩方向,本轮不 ScheduleWakeup。** ② 定调后,逐屏精修(清亮色反相残留的暗底假设/对比度、地图 azure 信号化、logo marks 用 --brand-grad 复刻 TM 渐变、按钮 azure+白字、modal/toast 遮罩减淡)= Standard 自动,每轮 ScheduleWakeup(600)。

**亮色调色板基调**(细节见 procedure §3):浅冷底 #f4f7fc + 白卡 #ffffff + 深 navy 字 #13213f + azure 强调 #1f8fd6 + 亮 azure #2f9fe0(信号/品牌)+ TM 渐变 linear-gradient(135deg,#16306e,#2f9fe0)(仅品牌标记/hero)。批量替换关键技巧:`255,248,235→19,33,63`(高 alpha=深字、低 alpha=淡填充,一条搞定)。

**每轮闸门**:截 before(node scripts/verify.mjs <screen> 然后 cp .review/<screen>.png .review/<screen>-before.png)→ 改 → 截 after(务必刷新)→ build + 机检零错 + 跨屏视觉抽查 + golden(h2/h3 改后仍 PASS)+ 3 critic 读 docs/DELTA-RUBRIC.md 判两轴【品牌契合:更像 logo 的亮底/azure 信号/navy 厚重】+【回退/slop:有没有新回退、亮色对比度坏没、有没有把前 30 轮去掉的 glow/渐变 slop 用蓝色请回来】,≥2/3 KEEP 过;纯色/纯动效静图难判时以 build+golden+机检+逻辑自检为闸门并在报告注明。过 → Standard 自动 commit + push origin <分支> +(非 R1)ScheduleWakeup(600)。

**写报告**:截图拷 reports/shots/r<NNN>-*.png,写 reports/round-<NNN>-*.md,更新 reports/INDEX.md + LOOP-STATE.md,git commit + push。

**红线**:只动 traderadar-vue/;不碰 ../ 下只读参考(../DESIGN.md、../logo.jpg、../原型-单页app/、../设计预览/、../商务资料/);保住前 30 轮去 AI 味成果(换蓝 ≠ 把 glow/渐变/撞色 slop 用蓝色请回来,亮色下尤其克制 glow,只点 hero/LIVE/关键信号);亮色深字浅底要够对比(WCAG AA);「活」必须挣来不许假 %;文案腔调除"更名 TRANS·MISSION"外暂不动。每轮 push 到 GitHub(V1ctor2182/Transmission)。
