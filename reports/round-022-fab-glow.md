# Round 022 — CP5:浮动 FAB 去渐变去 glow

**档位**: 🟦 Standard(自动落库)
**方向**: 组件级去 AI 味 · 优先序③CP5 配色/渐变残留

## 改了什么
右下角浮动按钮 `.ai-bubble-toggle`(AI 助手 FAB,**每个 app 屏都可见**)—— B7(R003)建按钮系统时漏掉了它,仍是渐变+glow+冷白三件套:
- `background:linear-gradient(135deg,brand,brand2)` → 实心 `var(--brand)`(去渐变)
- `box-shadow:0 4px 20px rgba(245,183,61,.4)` 琥珀光晕 → `0 8px 22px -8px rgba(0,0,0,.55)` 暖黑投影(去 glow,留浮起景深)
- svg `stroke:#fff` 冷白 → `#1a1305` 深 ink(与 B7 主按钮一致)
- hover `scale(1.08)` → `translateY(-1px)+brightness(1.08)`(与 B7 物理按压一致)

## 验收
- build ✓ · 机检 dashboard pass,零 pageErrors/newErrors
- 跨屏抽查:pool/leads/whatsapp/intel 四屏零新错(FAB 全屏可见,CSS-only 改 .ai-bubble-toggle)
- delta 3/3 **KEEP**(对比 fab-crop before/after + 全屏 dashboard):渐变+琥珀光晕+冷白图标 → 实心琥珀+暖黑投影+深 ink 图标;adversarial critic 确认仍清晰读作浮动按钮(实心琥珀 dark 上高对比、暗投影保景深)、深 ink 图标对比反而强于旧白图标;dashboard 其余(地图/KPI/工作流/买家列)像素不变

## 截图
- before: reports/shots/r022-fab-before.png(渐变+琥珀光晕+白图标)
- after: reports/shots/r022-fab-after.png(实心琥珀+暗投影+深 ink)

## 残留(写回 BACKLOG)
- CP5 续:`.wa-send`(whatsapp 发送键 amber 渐变,无 glow);logo marks `.login-logo-mark/.wm-logo/.rso-logo/.ob-final-logo` 渐变+glow box-shadow(B7 只改了 svg ink,底仍渐变);`.icp-person-av` amber 渐变圆;进度条 `.variant-conf-fill`/`.rso-progress-fill`/`.ob-progress-fill` 渐变填充。多在登录/引导屏,低频。
- **收敛**:R016-R022 连续 7 轮组件级去 AI 味全 3/3 KEEP。CP4/CP5 已到长尾零碎(剩多在登录/引导/休眠视图)。**强烈建议下轮起转 Hero**(H2 找客户/H3 实时商机 golden path,体验跃迁,走 feat/ 分支+暂停 review),或由用户指定方向;纯清理线边际递减明显。
