# Round 049 · 🟦 产品轴 · TopBar 建联次数实时化 + Vue 反馈层去 emoji 收尾

- 时间:2026-06-25
- 档位:🟦 Standard(产品北极星轴 微调收尾;cron 1min 起搏,不 ScheduleWakeup)
- 分支:`feat/rebrand-transmission`
- backlog 来源项:审计 TopBar 发现 ——(a)建联次数 toast 硬编码「剩余 47 次」,但 R044/R046 已让 `credits` 动态扣减 → **过期/错误的数字**(看不懂/不一致);(b)R043 去 emoji 只扫了 legacy-app.js,**Vue 组件里还有 9 处 emoji toast**(TopBar 💎🔔👤、SidebarNav ⚙️、WhatsAppPage 📞📋⭐、IntelPage 📥、LeadsPage ⏸️)。

## 做了什么
1. **建联次数实时化 + 可读**(产品:数字可读性 / 不留过期数):`tb-credits` toast 硬编码「47」→ 读**实时** `#credits-val.textContent`(R044/R046 解锁后会扣减),并补一句「解锁深度情报 / 一键建联各消耗 1 次」说明这数字对卖方意味着什么。
2. **Vue 反馈层去 emoji 收尾**(视觉:无 emoji):9 处 Vue toast 首参 emoji → `◆`(ASCII 安全 `\x{25c6}`,残留=0)。配合 R043(legacy 33 处)= **全站 toast 反馈零 emoji**。

## 验收
- **build** ✓(1.01s)· **机检** dashboard/whatsapp/leads/intel 全 `newErrors:[]` ✓
- **golden h3** ✓ PASS(errors:[])
- 反馈层 emoji grep 残留=0;credits toast 代码读 live `credits-val`(非硬编码)。
- **两北极星裁决**:产品 —— 建联次数不再过期/不一致(解锁后显真实剩余)+ 解释用途(可读)✓;视觉 —— 全站 toast 单一 ◆ azure,零 emoji ✓。toast 多为瞬态,按 §5 以 build+机检+golden+grep-clean+逻辑为闸门。**KEEP。**

## 残留 → backlog(§8b 尾声渐近)
- 「7 封邮件待审批」等待办文案内嵌计数仍静态(可后续接 MKT_ITEMS pending 动态算,真实挣来)。
- 通知 bell 仍是静态 toast 摘要(非真实面板,低优)。
- **收敛**:数字一致性 + 去 emoji 收尾后,产品轴可做的高/中价值项基本见底;再 1-2 轮低价值则按 §6 发 digest(merge main?)。

## commit / 分支 / push
- commit on `feat/rebrand-transmission` · push origin。**cron 1min 起搏,不 ScheduleWakeup。**
