# Round 026 — 动效②:KPI 进工作台 count-up

**档位**: 🟦 Standard(自动落库) · 程序 #2 动效升级

## 改了什么
进入工作台时,4 个 KPI(全球商机/今日新增/已建联/EDM 触达)从 0 **一次性 count-up** 到真实终值 —— 指挥台「上线」入场感,非循环、非假计数。
- `IntersectionObserver` 观察 `.kpis`,**仅当工作台变可见时触发一次**(disconnect),与 legacy 页面显隐解耦,不依赖 navTo 钩子。
- rAF + easeOutCubic,1s;终帧**精确还原原始字符串**(保格式)。IO 不支持则静默显示终值(优雅降级)。
- 仅 DashboardPage,纯入场动效。

## 验收(动效门:静图不可判 → 功能自检)
- build ✓ · 机检 dashboard 零 pageErrors/newErrors ✓ · H3 golden-path 仍 PASS ✓
- **count-up 实证**(mid vs final 抓帧):300ms 中间帧 = `1,907,925 / 65,827 / 860 / 2,578`(easeOut 行进中),终值 = `2,847,392 / 98,241 / 1,284 / 3,847`(精确、逗号格式正确)。动效确实在跑且落点准确。
- 纯动效,静态 before/after 图(均为 1400ms 后终态)相同,故不走 3-critic 视觉 delta,以功能实证为闸门(driver 约定)。

## 截图
- reports/shots/r026-kpi-after.png(终态)

## 残留 / 续(写回 BACKLOG)
- 动效②续:AI 工作流 feed「有意义的逐条流入」(注意:T4 当初杀掉的是**假计数自动插入**,重做必须真·motivated,不复辟假动);买家信号列 stagger 入场。
- 之后转 ④工程收尾,最后 ③H2 找客户 Hero(feat 分支+暂停)。
