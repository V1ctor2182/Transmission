# Round 020 — CP4 续:客户池 badge pill 去胶囊

**档位**: 🟦 Standard(自动落库)
**方向**: 组件级去 AI 味 · 优先序②CP4 通用模板组件 · badge pill 状态徽标

## 改了什么
客户池表格每行两个圆角填充胶囊(典型 AI-SaaS pill)→ 终端风,语义色保留:
- **状态列**(逐期跟进/无回复/已回复/待跟进):原 `border-radius:10px` 填充 bg + border 胶囊 → **终端 LED 风**:`6px 方点(radius:2px)+ 彩色标签`,无填充无边框。方点既作语义色锚点、又对齐列、保持可扫读。
- **来源列**(精准建联/WhatsApp/搜索推送/海关数据):原 `border-radius:10px` 圆角胶囊 → 方角扁平 tag(`border-radius:4px`,tint 由 18→14 更淡)。
- 仅改 renderPoolTable 两处内联渲染;语义红/琥珀/绿全保留。

## 验收
- build ✓ · 机检 pool pass,零 pageErrors/newErrors
- 跨屏抽查:dashboard/leads/whatsapp/intel 四屏零新错(共享 legacy bundle,仅动 renderPoolTable 内联串)
- delta 3/3 **KEEP**(对比 cp-status before/after + 全屏):填充圆角胶囊 → LED 方点+标签 / 方角 tag;adversarial critic 专查"去填充是否变弱/可扫读性"——确认方点恢复硬锚点、语义色双重承载(点+字)、列对齐不散、来源/状态不混淆;匹配度/跟进进度/操作列/对齐全程未动

## 截图
- before: reports/shots/r020-pill-before.png(填充圆角胶囊)
- after: reports/shots/r020-pill-after.png(LED 方点+标签 / 方角 tag)

## 残留(写回 BACKLOG)
- CP4 续:同款状态胶囊在 renderPoolCards(1389/1510,休眠卡片视图)、intel 卡(2079,情报屏)仍是圆角 pill —— 下次扫 intel 屏时一并收;市场分析 T1-T4 标签(433)`border-radius:20px` pill。
- CP4 续:icp-person-av amber 渐变圆;进度条 .variant-conf-fill(marketing)gradient 填充。
- CP5:`.ai-bubble-toggle`/`.modal-btn.primary`/login 系列 gradient+glow;toggle svg #fff 冷白。
