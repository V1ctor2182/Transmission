# BACKLOG — 活的候选池(loop 每轮排序取顶)

> loop 每轮**审计**会往这里加新候选(去重),**排序**按 影响×把握÷风险、Hero 加权。
> 档位:🟥Hero(放大模式,提分支+暂停)· 🟦Standard(清理,自动)· ⬜Utility(机械,自动)。
> 状态:`[ ]`待办 `[~]`进行中(Hero 分支待 review) `[x]`完成 `[!]`跳过/受阻。

## 当前方向(重要)
项目刚定了**大改**:视觉 → Phosphor(amber/暖黑,cyan 退役)· 布局 → 多窗格指挥台 · 首启旅程重设计。
真 app 现在还是旧的 cyan/侧边栏。所以 backlog 的大头是**把新设计落地** + 打磨 3 个 Hero 体验,而不只是清理旧的。

## 🟦 基建(安全、自动、先做 —— 高影响低风险)
- [x] **B1 Phosphor 全局换色**(round 001):品牌 cyan→amber 全站替换完成。
- [x] **B2 暖黑底 + 边框暖白化**(round 001):底色/文字/边框暖化完成。
- [x] **B3 次级数据色收编**(round 002):cyan(#22d3ee/#67e8f9/#9beae0)+ teal 绿(#34d399)全清。余 `--amber #fbbf24` 属 amber 家族,暂留。
- [x] **B4 夜地图调暖**(round 002):大陆冷蓝→暖近黑,热点 cyan→amber。
- [x] 🔴 **B5 dashboard 去 emoji(T10 子项,最高优)**(round 002 critic 发现):AI 报告面板满是 emoji(💎建联徽标/🌐/🔍/📣/🤝/💬…)→ 换描边图标或文字。**它在挡 dashboard 评分,先做。** 影响:高。风险:中。
- [x] 🔴 **B6 iris 强调色收掉**(round 002 critic 发现):AI 报告「98,241 条需求」用 iris-blue、「今日待办」标题 iris → DESIGN.md 说 iris 仅结构色,改 amber/文字。影响:中。风险:低。
- [x] 🔴 **B7 按钮去 AI 味(全局按钮系统 · 用户 2026-06-16 点名)**:现在按钮是「渐变填充 + 发光 box-shadow + 大圆角」三件套(`.login-btn`/`.wm-btn`/`.btn-connect`/`.btn-approve`/`.wm-btn` 等的 `linear-gradient(...)` + `box-shadow:0 ... var(--brand)`)。改成 **Phosphor 仪表级**:① 主按钮 = 实心 `--accent` 琥珀 + 深 ink(`#1a1305`),去渐变;② 次按钮 = 扁平 `--surface` + 1px 描边,无填充;③ 去掉所有 glow 光晕 box-shadow,最多极淡的 inset 高光;④ 统一圆角 10px;⑤ 保留 `:active` 物理按压、`:focus-visible` 环。**定义一套按钮类、全屏复用**,别每处各写一套。分屏分轮验(每屏 before/after delta)。影响:高(按钮到处都是)。风险:中。
- [ ] 🟦 **T10-flags 国旗统一(跨屏)**:leads/intel/whatsapp/数据里的国旗 emoji(🇸🇬🇲🇾🇺🇸…)→ 统一成**两字母 mono 国家码徽标**(终端风,如 SG/MY/US)或去掉(行里多已有国家名)。一次性扫所有数据数组。影响:中。风险:低。
- [ ] **T10 全局 emoji 统一**(~400 个:国旗/状态/图标)→ 一套描边图标或纯文字。分屏分轮做。影响:大。风险:中(量大)。

## 🟥 Hero(放大模式 · 提 `feat/` 分支 + 暂停等 review)
- [ ] **H1 AI 分析首启落地**:把 `journey-preview` 的「入口 + 指挥台自我拼装」实装。要做拼装编排动效(地图逐区点亮/KPI count-up/买家流入),真数据驱动、无假 %。序列截图 + 黄金路径 `输网址→拼装→ready`。
- [ ] **H2 找客户/ICP 体验包装**:买家**带匹配理由**流入(来源+理由可见)、enrich「锁→解锁联系方式」揭示。红线:不准假计数(已删),分数必须有可见理由。
- [~] **H3 实时商机/建联 golden path**(R023,分支 feat/hero-realtime-signals,⏸ 待 review):热点可点→下钻该区买家→一键建联→把买家物化为真实 WhatsApp 联系人(信号 seed 对话+情报)。golden-path 脚本端到端 PASS,delight 3/3 KEEP(wow A/A/B)。**未 merge。** 余:环境 ping/热点量级标签仍装饰性(单列候选「ping 接真信号」);建联键 hover 才显形。
- [ ] **HX 黄金 demo 路径节奏**:整条 `输网址→分析→工作台→找到买家→建联` 端到端的节奏打磨(常驻任务,每隔几轮回看一次)。

## 🔴 组件级 AI 味审计(用户 2026-06-16「还是有很多 component 都很有 ai 味」· R013+ 优先)
> R012 后跨屏视觉抽查发现,布局成型但组件内部仍重 AI 味。最重 → 最轻:
- [x] 🔴 **CP1 客户池 pool 去 AI 味(最重)**(R013 完成):① 国旗 emoji 🇺🇸🇸🇬🇲🇾… → 复用 `ccBadge()`/FLAG2CC mono 国家码;② `🤖 AI 批量跟进`/`🤖 AI 跟进`/`💬` emoji 按钮 → 扁平 SVG 或纯文字。影响:高。风险:低。
- [x] 🟦 **CP-bubble 浮层去 emoji**(R016 完成):① 右下角欢迎卡 toast `🎉`→`◆`(全站一致);② AI 助手气泡 `🤖`→扁平描边 SVG + av 去渐变 + 面板冷蓝底→暖黑;③ 解锁弹窗 `⚡`/`🚀`→扁平锁/无限 SVG。影响:低。风险:低。
- [x] 🔴 **CP2 whatsapp 去 emoji**(R014 完成:⏰→扁平时钟 SVG + toast 💡/💬→◆):`🛡️ 跟进提醒`、`⚡ AI 话术建议` 等标注 emoji → 扁平 SVG/文字标签。影响:中。风险:低。
- [x] 🟦 **CP3 leads 地区标签**(R015 完成:国家 chip 国旗→mono 码 .rg-cc + 下拉 ccBadge + 大洲标签去 emoji):`🇸🇬 新加坡 ✕` 国旗 emoji → mono 码或去 emoji;✕ 关闭按钮样式收敛。数据源彩色方块字母 logo 偏通用,留观察。影响:中。风险:低。
- [x] 🟦 **CP-intel-detail intel 详情卡 emoji**(R017 完成):WhatsApp 右侧客户情报详情面板(renderIntelPanel)⏰💡/🇩🇪🇸🇬/🏢📅💰🛒/📞📧📊🎯/🔒 → 扁平 stroke-SVG(IROW_ICON 查找表 + bell/bulb/lock SVG)+ ccBadge mono 国家码 + ✉️toast→◆;顺手 intel-co-av 冷蓝渐变头像→amber mono 方。影响:中。风险:低。
- [~] 🔴 **CP4 通用模板组件收敛(用户点名)**:avatar 纯色圆 / 彩色方块字母 logo 瓦片 / 千篇一律进度条 / badge pill —— 长得像任意 AI SaaS demo。收敛到终端风(方/极简边框/mono/去多彩)。逐屏 critic 判。影响:中。风险:中。
  - [x] **CP4-av WhatsApp + 侧栏头像**(R018):冷杂色圆 avatar + 侧栏紫渐变 → 统一中性圆角方 + mono 首字母 + amber 选中态。
  - [x] **CP4-ds leads 数据源 logo 瓦片**(R019):~22 撞色品牌方块字母 logo → 统一中性 mono 瓦片(删 20 条品牌色变体)。
  - [x] **CP4-pill 客户池 badge pill**(R020):状态填充圆角胶囊→LED 方点+标签、来源圆角胶囊→方角 tag(renderPoolTable)。
  - [x] **CP4-pill 情报中心 badge pill + 🔒**(R021):intel 状态胶囊(2079)→LED 方点+标签;锁定行 🔒 emoji→扁平挂锁 SVG。
  - [ ] CP4 续(低优):休眠 renderPoolCards(1389/1510)、市场分析 T 标签(433 radius20)仍圆角 pill;icp-person-av amber 渐变圆;进度条 .variant-conf-fill gradient。
- [~] 🔴 **CP5 配色/渐变残留清扫(用户点名)**:全屏扫剩余 `linear-gradient(` 填充 / `box-shadow` 发光 / 紫蓝(#6b78ff iris / purple)残留色,收到 Phosphor 暖金近黑。grep 驱动 + 逐屏视觉复核。影响:中。风险:低。
  - [x] **CP5-fab 浮动 FAB**(R022):.ai-bubble-toggle 渐变+琥珀 glow+冷白图标 → 实心琥珀+暗投影+深 ink。
  - [ ] CP5 续(低频/登录引导):`.wa-send` amber 渐变;logo marks(login/wm/rso/ob-final)渐变+glow 底;`.icp-person-av` amber 渐变圆;进度条 .variant-conf-fill/.rso-progress-fill/.ob-progress-fill 渐变填充。

> **用户 2026-06-16 方向(AskUserQuestion)**:AI 味重点 = ①Emoji 装饰(先扫,CP1/CP2/CP3) ②通用模板组件(CP4) ③配色/渐变残留(CP5)。文案腔调暂不动。loop 按此序推进。

## 🟦 Standard(清理 · 自动)
- [x] **多窗格 AppShell 落地**(R012):dashboard 重排为 layout-preview 指挥台网格(地图 hero+KPI 条+AI工作流 feed+右侧实时买家整列),用户验收满意已 merge。修了一处 display 特异性回归(R012-fix)。其它屏暂沿用 `.page` 单页,后续按需。
- [ ] **T8 Pool**:客户表抽成可复用 `CustomerTable.vue`,Leads 与 Pool 共用。
- [ ] **T9 浮层**:Modals/Toast → `<Teleport>`+`v-if` / toast store。
- [ ] critic 历史遗留 polish:登录副文案对比度 · 营销批准 CTA 权重弱 · WhatsApp cyan 气泡对比度 · 欢迎卡片偏营销腔。

## 🟦 收尾(等迁移差不多了再做)
- [ ] **T11**:确认无残留内联 `onclick` 后,删 `main.js` 的 eval shim + `legacy-app.js` 死代码。

> loop 启动时大概率先做 B1/B2(Phosphor 换色,安全高影响),再推进多窗格 + Hero。Hero 都会停下等你。
