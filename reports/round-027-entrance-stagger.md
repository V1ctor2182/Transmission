# Round 027 — 动效②(收尾):买家信号 + AI feed stagger 入场

**档位**: 🟦 Standard(自动落库) · 程序 #2 动效升级 收尾

## 改了什么
完成"指挥台上线"入场编排:右侧实时买家信号列 + AI 工作流 feed 行**逐条 stagger 淡入上浮**。
- `.brow` / `.frow` 加 `browIn`(.32s cubic-bezier 淡入+7px 上浮,`both`),`animation-delay` 按行 index 错峰(买家 40ms/行、feed 50ms/行)。
- **keyed v-for(`:key="b.co"`)→ 只有新挂载的行才播放**:首屏全列入场;H3 下钻"全部→区域"时持久行不重播、被揭示的新行才滑入(强化"该区信号到达"的真实感),非每次点击都全列重刷。
- `prefers-reduced-motion` 关闭动画。纯入场,不复辟 T4 杀掉的假计数自动插入。

## 验收(动效门:静图不可判 → 功能自检)
- build ✓ · 机检 dashboard 零 pageErrors/newErrors ✓ · H3 golden-path 仍 PASS(下钻 rows=4)✓
- **stagger 实证**(抓帧):买家行 opacity @120ms = `[.78,.62,.37,.04,0,0,0,0]`(明显错峰淡入)→ @920ms = 全 `1`(落定)。
- 纯动效,静态终态图相同,以功能实证为闸门(driver 约定)。

## 截图
- reports/shots/r027-entrance-after.png(终态)

## 程序进度
- **#2 动效升级 = 完成**:① 地图 ping 接真信号(R025)② KPI count-up(R026)③ 买家/feed stagger 入场(R027)。AI feed「真·流入」刻意只做诚实入场,不做假自动插入。
- next: **#4 工程收尾**(bundle 分包 / Teleport / 删 eval shim 死代码 / CP5 渐变长尾),之后 **#3 H2 找客户 Hero**(feat 分支 + 暂停 review)。
