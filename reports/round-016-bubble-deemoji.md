# Round 016 — CP-bubble 欢迎气泡/浮层去 emoji

**档位**: 🟦 Standard(自动落库)
**方向**: 组件级去 AI 味 · 优先序①Emoji 装饰 · CP-bubble 收尾

## 改了什么
浮动/浮层类残留 emoji 三处一次清掉:
1. **欢迎卡(可见)** — `legacy-app.js:807` 初始化 toast `'🎉'` → `'◆'`。右下角「欢迎使用 TradeRadar」卡现与全站 ◆ 系统一致(配额条同款)。
2. **AI 助手气泡头像** — `AiBubble.vue` `🤖` → 扁平描边机器人 SVG;`.ai-bubble-av` 去渐变(linear-gradient→琥珀淡填充+1px 描边);气泡面板冷蓝底 `rgba(10,14,26,.95)` → 暖黑 `rgba(19,17,11,.96)`(顺手收一处 Phosphor 冷色违规)。
3. **解锁弹窗图标** — `AppModals.vue` 单条解锁 `⚡`→扁平锁 SVG、月度无限 `🚀`→扁平无限符 SVG;`.unlock-opt-icon` 改 flex+SVG 描边,选中态描边转 `--brand`。

> AiBubble 面板 & 解锁弹窗默认 `display:none`,截图不可见;靠标准 SVG 标记保证。可见 delta = 欢迎卡 🎉→◆。

## 验收
- build ✓ · 机检 dashboard/leads/whatsapp 三屏 pass,无 pageErrors
- 跨屏抽查:leads/whatsapp 未被全局 toast 改动带崩
- delta 3/3 **KEEP**(对比 bubble-before/after):多彩 🎉 撞色 emoji → 扁平单色 ◆,贴 Phosphor mono-accent 锁;布局/地图/KPI/买家列表全程未动

## 截图
- before: reports/shots/r016-bubble-before.png
- after: reports/shots/r016-bubble-after.png

## 残留(写回 BACKLOG)
- CP-intel-detail:INTEL_DATA 详情/enrich 卡 emoji(🇩🇪🏢📅💰🛒📞📧📊🎯⏰)— 下一轮
- CP5:`.ai-bubble-toggle`/`.modal-btn.primary` 仍 linear-gradient + glow box-shadow、toggle svg stroke #fff 冷白 — 留 CP5 统一扫
