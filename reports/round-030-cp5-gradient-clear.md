# Round 030 — CP5 渐变清零(剩余 amber 渐变填充)

**档位**: 🟦 Standard(自动落库) · 程序 #4 工程收尾 / CP5 收口

## 改了什么
清掉所有仍在渲染的 amber 渐变填充 → flat 实心(B7 已 !important 覆盖的按钮基类 + 语义绿/rgba 双色 tint 不动):
- `.wa-send`(whatsapp 发送键)渐变 → `var(--brand)` + svg 图标 `#fff`→`#1a1305` 深 ink(与 FAB/B7 主按钮一致)
- `.icp-person-av`(leads 人物头像)渐变圆 → flat 琥珀 + 文字深 ink
- `.variant-conf-fill`(marketing 置信进度条)渐变 → flat
- `.ob-action-num` / `.ob-progress-fill`(引导)渐变 → flat
- `.toast-bar`(toast 倒计时条)渐变 → flat
- `.rso-progress-fill`(扫描覆盖层进度)渐变 → flat

## 验收
- build ✓ · H3 golden-path PASS ✓ · 机检 whatsapp/leads/marketing 零 pageErrors/newErrors ✓
- 肉眼复核 whatsapp:发送键现为 flat 琥珀 + 深 ink 图标,联系人/对话/情报面板无回退。
- 多为低可见度(引导/toast/进度条),与已验证的去渐变 pattern 同源;以 build+golden+屏检为闸门。

## 进度
- **CP5 配色/渐变残留清扫 = 完成**(R022 FAB / R028 logo marks / R030 剩余渐变填充)。全站 `linear-gradient` 仅剩:B7 已覆盖为 flat 的按钮基类(死规则,无害)、`.btn-approve`/`.icp-task-btn.auto` 语义绿 rgba 双色 tint(非 slop)、背景 orb 的 `radial-gradient`(氛围光,非填充 slop)。
- **#4 工程收尾余**:Teleport(T9)、删 eval shim 死代码(T11)—— 较高风险,需谨慎逐个验证不破显隐/不丢内联 onclick。
- 之后:**#3 H2 找客户 Hero**(feat 分支 + 暂停 review)。
