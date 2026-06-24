# Loop Procedure — TRANS·MISSION 品牌改造(暖琥珀暗色 → 信号蓝**亮色** + 更名)

> 品牌改造专用 loop 的**权威流程文件**。本次方向**取代**旧 Phosphor 暖琥珀暗色方向。
> loop 每轮先读本文件,再读 LOOP-STATE.md / BACKLOG.md。
> ../DESIGN.md / ../CLAUDE.md 说的 amber/cyan/暗色 **全部作废**,以本文件 + tokens.css 为准(那俩只读旧参考,红线不碰)。

## 0. 目标(已和用户确认)
把整个 app 从 **Phosphor 暖琥珀 / 暖黑暗色** 改成 **TRANS·MISSION 信号蓝 / 亮色**,匹配 `../logo.jpg`,并**全站更名 TradeRadar → TRANS·MISSION**。
- ✅ **亮色**(镜像 logo 白底:浅冷底 + 深 navy 字 + azure 信号强调)
- ✅ **更名 TRANS·MISSION**(login/sidebar/welcome/title/欢迎卡等所有 "TradeRadar" / "Trade Radar" → "TRANS·MISSION";"创拾觅深" 作中文署名)
- ⚠️ **亮色是「反相」不是「换色相」**:旧的浅色文字(`rgba(255,248,235,…)`)要变成**深 navy 文字**,旧暖黑底要变成**浅底**。这比暗色换肤工作量大、逐屏对比度要全调。

## 1. 品牌读取(from logo.jpg)
- TM 字母组合 = **深 royal navy → 亮 azure 渐变** + **轨道 swoosh 弧**(传输/信号/动感)+ 节点圆点。字标深 navy,白底。
- 气质:干净、科技、企业级、有信号流动感。蓝色光谱,无暖色。
- 母题:① 发光的 azure 信号 ② 轨道/传输弧 ③ 深 navy 厚重 + azure 点亮的对比 ④ **白底通透**(亮色版的关键气质)。

## 2. 设计基调(已定)
- **亮色**:浅冷底,深 navy 字,azure 强调。参考 logo 白底 + navy 字标 + azure monogram。
- **品牌渐变**:logo 本身是渐变。**渐变只留给品牌标记 / hero / 信号元素**;主按钮 = **实心 azure + 白字**(保住前 30 轮去渐变/去 glow 成果,别滑回 SaaS slop)。
- **glow 尺度**:亮色下 glow 要更克制(白底上发光易脏)。信号感主要靠 **azure 实色 + 轨道母题**,glow 只在 hero/LIVE 极淡点缀。
- 字体不变(Bricolage / Geist / JetBrains Mono);data 数字仍 tabular mono。

## 3. 调色板 + tokens 映射(R1 核心,single source of truth = `src/styles/tokens.css`)
> 亮色反相。R1 改 tokens.css 值 + 新增令牌;再按字面量表批量替换全站。

| token | 旧(暖暗) | 新(信号蓝 · 亮) | 角色 |
|---|---|---|---|
| `--bg`  | `#0b0a07` | `#f4f7fc` | 页面浅冷底 |
| `--bg2` | `#13110b` | `#ffffff` | 卡 / 面板(白) |
| `--bg3` | `#1c1810` | `#e9f0f9` | 抬升 / hover / 次层 |
| `--card`| `rgba(255,248,235,.04)` | `#ffffff` | 卡底 |
| `--card-border` | `rgba(255,248,235,.07)` | `#dbe5f2` | 冷浅边 |
| `--brand` | `#f5b73d` | `#1f8fd6` | **主强调 azure**(白底上略压深一点以保可读) |
| `--brand2`| `#ffd27a` | `#1e5fd0` | royal,强调/hover |
| `--brand-navy`(新) | — | `#16306e` | 深 navy,标题/字标/厚重 |
| `--brand-azure`(新) | — | `#2f9fe0` | 亮 azure,信号/点亮(同 logo monogram 亮支) |
| `--brand-grad`(新) | — | `linear-gradient(135deg,#16306e,#2f9fe0)` | TM 渐变,**仅品牌标记/hero/信号** |
| `--ink`(新) | (旧 `#1a1305`) | `#ffffff` | azure 实心按钮上的**白**字 |
| `--cyan` | `#f5b73d`(别名) | `#1f8fd6` | 并入 --brand |
| `--t-primary` | `rgba(255,248,235,.92)` | `#13213f` | 深 navy 主文字 |
| `--t-sec` | `…,.55` | `#4a5d7e` | 次文字 |
| `--t-muted`| `…,.28` | `#8497b5` | 弱文字 |
| `--green` | `#7bd47b` | `#17a673` | 正向(压深以在白底可读) |
| `--red`   | `#f87171` | `#e5484d` | 负向 |
| `--amber` | `#fbbf24` | `#c8860a` | **仅 warning 语义**(白底压深) |
| `--purple`| `#6b78ff` | `#1e5fd0` | iris 收成 royal |
| `--shadow`| `0 8px 32px rgba(0,0,0,.4)` | `0 10px 30px rgba(20,50,110,.10)` | 柔和冷阴影 |

**字面量批量替换表**(R1 机械扫 27 文件,exact-match;**关键技巧**:`255,248,235→19,33,63` 一条搞定——高 alpha=深 navy 文字、低 alpha=极淡 navy 填充,亮色下都成立):
`#f5b73d→#1f8fd6` · `#ffd27a→#1e5fd0` · `245,183,61→31,143,214` · `255,210,122→30,95,200`
`255,248,235→19,33,63` · `#0b0a07→#f4f7fc` · `#13110b→#ffffff` · `#1c1810→#e9f0f9` · `#1a1305→#ffffff`
> ⚠️ 批量替换后**必逐屏肉眼**:有些 `rgba(0,0,0,…)` 阴影/遮罩在亮色下要减淡;有些"浅字on暗底"的对比假设会翻;modal overlay `rgba(0,0,0,.6)` → 改 `rgba(20,40,80,.35)` 之类。

## 4. 推进策略与轮次
- **R1(大件,首轮,走 `feat/rebrand-transmission` 分支 + 暂停等用户定调)= 令牌反相 + 字面量批量替换 + 更名**:
  改 tokens.css 全部值 + 新增令牌 → `perl -pi` 批量替换字面量 → 全站 "TradeRadar"/"Trade Radar"→"TRANS·MISSION" → build → **逐屏肉眼扫**(login/工作台/找客户/情报/whatsapp/池/营销/首启)+ golden(h2/h3)。
  这轮覆盖最大,但亮色反相后**很多屏会有对比度/暗底假设残留**,正常,记进 backlog 后续逐屏修。**改完截图暂停给用户看色彩方向**。
- **R2+(逐屏精修,定调后自动)**:每屏 before/after:
  - 残留暗底假设(深色卡/浅字on深、内联 `rgba(0,0,0)` 阴影过重)→ 调成亮色。
  - 没被精确替换命中的暖色/渐变/glow 变体 → 收成蓝。
  - **地图**:暖近黑大陆 → 浅冷大陆 + azure 信号热点;ping/LIVE 极淡 azure;热力配色亮色化。
  - **logo marks**:login/sidebar/welcome → `--brand-grad` 复刻 TM 渐变(品牌标记可渐变),或把 `../logo.jpg` 拷 `public/` 直接用图。
  - **按钮系统**(polish.css):主按钮实心 azure + 白字;hover 极淡;次按钮白底描边。保去 slop。
  - **信号母题**(可选后期):轨道 swoosh 动效呼应 logo;克制。
- 顺序:R1 →(定调)→ login → 工作台 → 找客户/情报/whatsapp/池/营销 → 首启 → 母题动效。

## 5. 每轮闸门(loop-v2 + 品牌轴)
- 截 before → 改 → 截 after(刷新)。**build + 机检零错 + 跨屏抽查 + golden(h2/h3 改后仍 PASS)**。
- **3 critic 读 docs/DELTA-RUBRIC.md**,判两轴:① **品牌契合**(更像 logo:亮底/azure 信号/navy 厚重)② **回退/slop**(新回退?亮色对比度坏没?把去掉的 glow/渐变 slop 用蓝色请回来没?)。≥2/3 KEEP 过。
- 纯色/纯动效静图难判时,以 build+golden+机检+逻辑自检为闸门并注明。
- 过 → 自动落库 commit + push origin <分支> + `ScheduleWakeup(600)`。**R1 例外:暂停等 review,不 ScheduleWakeup。**

## 6. 红线
- 只动 `traderadar-vue/`。不碰 `../index (31).html` / `../DESIGN.md` / `../*preview*.html` / `../*.pdf`(只读)。
- **保住前 30 轮去 AI 味成果**:换蓝 ≠ 把 glow/渐变/撞色 slop 用蓝色请回来;亮色下尤其克制 glow。
- **亮色对比度是新风险**:深 navy 字 on 浅底要够对比(WCAG AA);azure 强调别太浅以致看不清。
- 「活」必须挣来,不许假 %。每轮 push GitHub(V1ctor2182/Transmission)。

## 7. Rebrand backlog(每轮排序取顶)
- [ ] **R1 令牌反相 + 字面量批量替换 + 更名 TRANS·MISSION**(大件,feat 分支 + 暂停)
- [ ] login 亮色品牌化(TM 渐变 mark + 白底 + navy 字)
- [ ] 工作台 dashboard:暗底残留→亮、地图 azure 信号化、KPI/feed/买家对比度
- [ ] 找客户 / 情报 / whatsapp / 客户池 / 营销 逐屏精修(暗底假设清理)
- [ ] 首启 FirstRunAnalysis 亮色蓝信号化
- [ ] 按钮系统 azure + 白字(polish.css,保去 slop)
- [ ] modal/toast overlay 亮色化(rgba(0,0,0) 遮罩减淡)
- [ ] 信号母题动效(轨道 swoosh,可选)
- [ ] logo 实图接入 public/(可选)

## 8. /loop 启动指令(用户 review 本文件 OK 后再用)
```
/loop 持续改造 TradeRadar→TRANS·MISSION 视觉:信号蓝 + 亮色,匹配 ../logo.jpg。每轮严格按
traderadar-vue/docs/loop-procedure.md:读 docs/loop-procedure.md + LOOP-STATE.md + BACKLOG.md → 排序取顶
(先 R1 令牌反相+字面量批量替换+更名=大件走 feat/rebrand-transmission 分支,做完截图暂停等 review;
定调后逐屏精修自动)→ 截 before → 改 → 截 after(刷新)→ build+机检零错+跨屏抽查+golden(h2/h3)+
3 critic 判【品牌契合 logo:亮底/azure/navy】与【回退/slop+亮色对比度】两轴,≥2/3 KEEP→落库 push origin。
红线:只动 traderadar-vue/、保去 AI 味成果、亮色克制 glow、深字浅底够对比、不碰 ../*、不造假。
写报告 reports/round-<NNN>.md + 截图 reports/shots/ + 更新 INDEX/LOOP-STATE,push GitHub。
```
