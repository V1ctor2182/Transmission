# Round 019 — CP4 续:leads 数据源 logo 瓦片去多彩

**档位**: 🟦 Standard(自动落库)
**方向**: 组件级去 AI 味 · 优先序②CP4 通用模板组件 · 用户点名"leads 数据源 tile"

## 改了什么
找客户/ICP Agent 面板的 **~22 个数据源彩色方块字母 logo 瓦片** —— 原本每个一种品牌色(Google 蓝 #4285f4 / 领英蓝 #0077b5 / 紫 #720e9e / 红 #e63946 / 橙 #ff6b35 / 青 #00b4d8 / 粉 #ec4899 / teal…),一堆撞色 confetti,违反单一 amber 锁、典型 AI-SaaS demo 外观。
- `.icp-ds-logo` 基类改终端风:扁平中性面 `rgba(255,248,235,.06)` + 1px 描边 + mono 字母 + 次级文字色;**删掉全部 20 条 `.icp-ds-logo.<x>{background:...}` 品牌色变体**(类名留在 markup 里无害,统一回落基类)。

> 瓦片颜色纯装饰、不编码数据,去掉不损失信息;每行的来源名(Google · 高级搜索…)承担识别。

## 验收
- build ✓ · 机检 leads pass,零 pageErrors/newErrors
- 作用域确认:`.icp-ds-logo` 仅 LeadsPage 使用(grep),纯 CSS 改动,跨屏零风险
- delta 3/3 **KEEP**(对比 ds-crop before/after + 全屏):撞色 confetti → 统一中性 mono 瓦片;adversarial critic 确认 20px mono 字母仍清晰、对比度落在次级文字区间(刻意去强调,非破损)、不与行文字粘连;3 列网格/来源名/列标题/下方任务配置区全程未动

## 截图
- before: reports/shots/r019-ds-before.png(撞色品牌瓦片)
- after: reports/shots/r019-ds-after.png(统一中性 mono 瓦片)

## 残留(写回 BACKLOG)
- CP4 续:icp-person-av(amber 渐变圆,amber 家族较轻);进度条(.variant-conf-fill / pool 跟进进度条 / icp 任务进度);badge pill(各屏状态徽标圆角 pill)。
- CP5:`.ai-bubble-toggle`/`.modal-btn.primary`/login 系列 `linear-gradient(brand,brand2)` + glow box-shadow;toggle svg #fff 冷白;"已连接"绿点 glow box-shadow(语义绿,低优)。
