# Round 021 — CP4 续:情报中心 badge pill 去胶囊 + 🔒 残留

**档位**: 🟦 Standard(自动落库)
**方向**: 组件级去 AI 味 · 优先序②CP4 badge pill(+ ①emoji 残留)

## 改了什么
情报中心(renderIntelTable)表格两处:
- **状态徽标**(新增/热门/需解锁):原 `border-radius:20px` 填充 bg + border 圆角胶囊 → **终端 LED 风**:5px 方点(radius:2px)+ 彩色标签,无填充。与上轮客户池 R020 同款,跨屏一致。
- **锁定行 🔒 emoji**:`<span style="color:#f59e0b">🔒</span>解锁查看采购商` → 扁平琥珀描边挂锁 SVG(11px)。审计中发现的 emoji 残留(优先①),顺手清掉。
- 语义色(琥珀=新增/红=热门/灰=需解锁)全保留;仅改 renderIntelTable 两处内联渲染。

## 验收
- build ✓ · 机检 intel pass,零 pageErrors/newErrors
- 跨屏抽查:dashboard/pool/leads/whatsapp 四屏零新错(共享 legacy bundle,仅动 renderIntelTable)
- delta 3/3 **KEEP**(对比 it-crop + it-row before/after + 全屏):填充圆角胶囊→LED 方点+标签、🔒 emoji→扁平琥珀挂锁;adversarial critic 确认方点语义色可辨(琥珀/红/灰)、标签文字承载可扫读、挂锁 11px 清晰读作锁且琥珀色不刺眼;匹配度/建联成功率进度条/线索编号/按钮/对齐全程未动

## 截图
- before: reports/shots/r021-intel-before.png(填充圆角胶囊)
- after: reports/shots/r021-intel-after.png(LED 方点+标签)+ r021-intel-lock-after.png(扁平挂锁)

## 残留(写回 BACKLOG)
- CP4 badge pill 收尾:休眠 renderPoolCards(1389/1510)、市场分析 T1-T4 标签(433 radius20)仍圆角 pill —— 休眠/低频屏,低优。
- CP4 续:icp-person-av amber 渐变圆;进度条 .variant-conf-fill(marketing)gradient 填充。
- CP5:`.ai-bubble-toggle`/`.modal-btn.primary`/login 系列 gradient+glow;toggle svg #fff 冷白。
- **收敛提示**:R016-R021 连续 6 轮组件级去 AI 味均 3/3 KEEP;CP4/CP5 主力点将尽,建议下轮起评估转 Hero(H2 找客户/H3 实时商机,需 feat/ 分支 + 暂停 review)或 CP5 收尾。
