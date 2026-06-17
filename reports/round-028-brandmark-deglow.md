# Round 028 — CP5 长尾:品牌 logo marks 去渐变去 glow

**档位**: 🟦 Standard(自动落库) · 程序 #4 工程收尾(CP5 长尾起步)

## 改了什么
统一全部品牌 logo 标记到 flat 实心琥珀 + 去 glow(与已去 slop 的 FAB R022 / sb-av R018 / 按钮 B7 一致):
- `.login-logo-mark`、`.wm-logo`(欢迎弹窗)、`.rso-logo`(分析扫描覆盖层)、`.sb-logo`(侧栏)、`.ob-final-logo`(引导终页):`linear-gradient(135deg,brand,brand2)` → `var(--brand)` 实心,去掉 `box-shadow:0 0 30~40px / 0 8px 24px` 琥珀 glow 光晕。
- `.rso-logo` 的 `logoPulse` 动画从「glow box-shadow 脉冲」改为「scale/opacity 脉冲」(扫描态仍有动感,但不是发光晕)。

## 验收
- build ✓ · 机检 login + dashboard 零 pageErrors/newErrors ✓ · H3 golden-path 仍 PASS ✓
- delta 3/3 **KEEP**(login before/after):**critic 实测 login 两图逐像素相同** —— 40px logo 在近黑面板上 glow 本就微不可察,故 login 静态 delta≈0;改动的真实可见处在 `.rso-logo` 扫描覆盖层的强脉冲 glow(0 0 60px)+ 全 marks 渐变→flat 统一。无回退、无新 slop,方向贴 DESIGN.md。

## 截图
- before/after: reports/shots/r028-login-*.png(两图等同,见上说明)

## 残留(CP5 续)
- `.wa-send`(whatsapp 发送键 amber 渐变)、`.icp-person-av` amber 渐变圆、进度条 `.variant-conf-fill`/`.rso-progress-fill`/`.ob-progress-fill` 渐变填充(多用 --cyan 别名=amber,slop 轻)、`.ob-action-num` 渐变。
- #4 续:bundle 分包(降 1.4MB 警告)、Teleport(T9)、删 eval shim 死代码(T11)。next 优先 bundle 分包(纯 build 配置,高确定低风险)。
