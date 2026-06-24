# Loop Procedure — TRANS·MISSION 品牌改造(暖琥珀暗色 → 信号蓝**亮色** + 更名)

> 品牌改造专用 loop 的**权威流程文件**。本次方向**取代**旧 Phosphor 暖琥珀暗色方向。
> loop 每轮先读本文件,再读 LOOP-STATE.md / BACKLOG.md。
> ../DESIGN.md / ../CLAUDE.md 说的 amber/cyan/暗色 **全部作废**,以本文件 + tokens.css 为准(那俩只读旧参考,红线不碰)。

## ★ 北极星(高于一切,每轮每个组件都按这个判):零 AI 味 + 高级感
换蓝、改亮、更名都只是**手段**;**目标是做出高端、克制、有质感的界面** —— 像高端金融终端 / Linear / Stripe 那种精致 B2B,绝不是又一个 AI 生成的模板。
- **零 AI 味**:无 emoji 装饰 · 无通用模板组件(撞色 avatar 圆 / pill / 彩块瓦片)· 无「渐变填充 + glow 光晕 + 大圆角」三件套 · 无假数据/假 %/空转计数 · 无炫技无意义动效。**前 30 轮已清掉的,绝不用蓝色请回来。**
- **高级感**:单一强调色 + 大量克制留白 · 精准对齐网格 · 精致字体层级(data 数字用 tabular mono)· 微妙而非张扬的动效 · 真实内容 · 一致光源的克制阴影 · 信息密度高但有呼吸感。
- **自检标准**:每张截图问自己 —— **「这个画面敢不敢直接放进给大客户的预售方案 PDF(../商务资料/全球本地化…预售.pdf)?」** 敢 = 高级;有一处 AI 味就不敢,继续抠。
- **这是持续 loop**:backlog 清完 ≠ 结束 —— 继续逐屏审计 AI 味、抠细节(间距/对齐/层级/微动效)提精致度,直到整站都达到这个水准。每轮都把新发现的「不够高级 / 有 AI 味」写回 backlog。

## ☆ 每轮闭环(loop-v2 经验:读状态 → 审计 → 排序 → 执行 → 验收 → 落库 → 收敛)
1. **读状态**:本文件 + LOOP-STATE.md + BACKLOG.md。
2. **审计**:截当前/相邻屏对照 `../logo.jpg` + 北极星标准,**把新发现的「AI 味 / 不够高级 / 暗底残留 / 对比度不足」去重写进 BACKLOG**(审计本身就在喂 backlog,所以 loop 永远有活、越跑越精)。
3. **排序取顶**:按 **影响 × 把握 ÷ 风险** 排,跳过 done/冷却项。R1(令牌总换)永远第一;之后大屏(login/工作台)优先于小屏。
4. **执行一项(分档)**:
   - 🟥 **大件**(R1 令牌反相+更名):走 `feat/rebrand-transmission` 分支,做完**暂停等 review**,不 ScheduleWakeup。
   - 🟦 **Standard**(逐屏精修、地图、按钮系统):四段闸门过 → 自动落库。
   - ⬜ **Utility**(纯机械批量替换 / 纯 build 配置):机检过 → 自动落库。
5. **验收(§5 闸门)** → **落库 + 报告(§6)**。
6. **收敛检查**:连续 K=3 轮只挖到低价值 / 无肉眼可见提升 → 发 digest 问用户方向并降 cadence;build + 机检 + golden **永远绿,绝不落 regression**。

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
- 截 before → 改 → 截 after(刷新)。**截图主要 crop 到改动区域**(前后 delta 一眼看清,别只丢全屏),另留一张全屏做跨屏 sanity。**build + 机检零错 + 跨屏抽查 + golden(h2/h3 改后仍 PASS)**。
- **3 critic 读 docs/DELTA-RUBRIC.md**,判两轴:① **品牌契合**(更像 logo:亮底/azure 信号/navy 厚重)② **高级感 / 零 AI 味**(够不够高级 ——「敢进预售 PDF 吗」?有没有新 AI 味 / 把去掉的 glow·渐变·撞色 slop 用蓝色请回来?亮色对比度坏没?)。≥2/3 KEEP 过。
- 纯色/纯动效静图难判时,以 build+golden+机检+逻辑自检为闸门并注明。
- 过 → 自动落库 commit + push origin <分支> + `ScheduleWakeup(600)`。**R1 例外:暂停等 review,不 ScheduleWakeup。**

## 6. 落库 + 报告(每轮必做 —— 过闸门后立刻按序做完,别跳)
1. **截图归档**:把本轮截图从 `.review/` 拷到 `reports/shots/r<NNN>-*.png`(轮号命名,不覆盖历史)。**优先存改动区域的 before/after crop**(看清 delta)+ 一张全屏;Hero 加序列帧。
2. **写报告** `reports/round-<NNN>-<task>.md`(模板见下)。
3. **更新台账**:`reports/INDEX.md` 顶部加一行(倒序,最新在上)+ `LOOP-STATE.md` 轮次日志 append 一条(时间/档/做了什么/闸门结果/残留/next)。
4. **落库**:`git add -A && git commit` → `git push origin <分支>`(R1 在 `feat/rebrand-transmission`;定调后逐屏精修轮在该分支或 main,视 review 结果)。
5. 非 R1 轮:末尾 `ScheduleWakeup(600)` 排下一轮;**R1 暂停等 review,不 ScheduleWakeup。**

### 报告模板 `reports/round-<NNN>-<task>.md`
```markdown
# Round <NNN> · <档> · <任务(如:R1 令牌反相+更名 / login 亮色品牌化)>
- 时间 / 档位 / 分支 / backlog 来源项
- **做了什么**:1-3 句(改了哪些令牌 / 字面量 / 组件 / 文案更名)
- **验收**:build ✓ · 机检 <零错?> · golden h2/h3 <PASS?> · 3 critic 两轴(品牌契合 logo + 回退/slop+对比度)<grades + 裁决 ≥2/3 KEEP?>
- **截图**:![before](shots/r<NNN>-<screen>-before.png) ![after](shots/r<NNN>-<screen>-after.png) <Hero 加三帧>
- **残留 → backlog**:这轮没收干净的(暗底假设残留 / 对比度不足 / 未命中的暖色渐变)写回 §8
- commit / 分支 / push
```
> 报告 = 永久可查的轮次记录(带前后图),换 context / 会话也能接上进度。**每轮都写。**
> 纯色 / 纯动效静图难判时,报告里**注明用 build+golden+机检+逻辑自检做的闸门**(同 §5)。

## 7. 红线
- 只动 `traderadar-vue/`。不碰 ../ 下只读参考(`../DESIGN.md`、`../logo.jpg`、`../原型-单页app/`、`../设计预览/`、`../商务资料/`)。
- **保住前 30 轮去 AI 味成果**:换蓝 ≠ 把 glow/渐变/撞色 slop 用蓝色请回来;亮色下尤其克制 glow。
- **亮色对比度是新风险**:深 navy 字 on 浅底要够对比(WCAG AA);azure 强调别太浅以致看不清。
- 「活」必须挣来,不许假 %。每轮 push GitHub(V1ctor2182/Transmission)。

## 8. Rebrand backlog(每轮排序取顶)
- [~] **R1 令牌反相 + 字面量批量替换 + 更名 TRANS·MISSION**(R031,分支 `feat/rebrand-transmission`,⏸ 待 review 定调):tokens.css 全反相 + 13 条字面量批量替(残留=0)+ 全站更名 + 创拾觅深署名。build✓ 机检 9 屏零错✓ golden h3✓。**未 merge。**
  - [x] R032:① `.toast` 深块→白卡 + 冷阴影 + azure ◆;② `.wh-land` 暖近黑→浅冷大陆 + azure 信号/ping + navy 标签白 halo;③ 地图提示 chip `rgba(11,10,7,.5)`→浅磨砂。
  - 残留(续修):③ src 内仍有 `rgba(0,0,0,…)` 遮罩(modal overlay 等)逐屏减淡;④ **带空格 rgb 漏替**(批量表只命中无空格):`rgba(245, 183, 61,…)`/`rgba(255, 248, 235,…)` 在 `modals.css`、`FirstRunAnalysis.vue` 残留(6 处)→ 补扫含空格变体;⑤ **暖橙 `--hot:#ff7a3d`**(DashboardPage KPI/spark/feed)冷色主题里违反单一 azure 锁 → 定调收蓝 or 保留热度语义(动 KPI 语义色,单独一轮 critic)。
- [ ] login 亮色品牌化(TM 渐变 mark + 白底 + navy 字)
- [ ] 工作台 dashboard:暗底残留→亮、地图 azure 信号化、KPI/feed/买家对比度
- [~] 找客户 / 情报 / whatsapp / 客户池 / 营销 逐屏精修(暗底假设清理)。R035:39 处 #e2e8f0/#cbd5e1 暗主题浅字→navy(隐形文字对比修复)。R036:营销屏国旗 emoji→ccBadge(emoji→mono 全站收官)。余:逐屏继续抠 AI 味/对比细节。
- [x] 首启 FirstRunAnalysis 亮色蓝信号化(R034:.fra-mapbody 暗近黑→浅冷+azure 辉光 + .fra-hl chip 浅化;浅大陆与工作台一致)。余:首启动效(逐区点亮/count-up/买家流入)hero 节奏专轮。
- [ ] 按钮系统 azure + 白字(polish.css,保去 slop)
- [x] modal/toast overlay 亮色化(toast R032 · modal/网址弹窗/AI 气泡 R033:深块→白卡 + 浓黑遮罩→冷遮罩 rgba(20,40,80,.35) + primary/wm-btn 蓝渐变→实心 azure)。残留:通用解锁卡未单截 / modal-cost amber / rso hero 渐变可换 --brand-grad。
- [ ] 信号母题动效(轨道 swoosh,可选)
- [ ] logo 实图接入 public/(可选)

## 9. /loop 启动指令(用户 review 本文件 OK 后再用)
```
/loop 持续改造 TradeRadar→TRANS·MISSION 视觉:信号蓝 + 亮色,匹配 ../logo.jpg,全站更名 TRANS·MISSION。
**北极星高于一切:零 AI 味 + 高级感**——目标是高端克制有质感的 B2B(像金融终端/Linear/Stripe),不是 AI 模板;
每张截图自检「敢不敢进大客户预售 PDF」;前 30 轮去掉的 emoji/渐变/glow/撞色 slop 绝不用蓝色请回来。
每轮严格按 traderadar-vue/docs/loop-procedure.md 闭环:读 docs/loop-procedure.md + LOOP-STATE.md + BACKLOG.md
→ 审计(对照 logo+北极星,新发现的 AI 味/不够高级 去重写回 BACKLOG)→ 影响×把握÷风险 排序取顶
(R1 令牌反相+批量替换+更名=大件走 feat/rebrand-transmission 分支,做完暂停等 review;定调后逐屏精修自动)
→ 截 before → 改 → 截 after(**主要 crop 改动区域**+留一张全屏)→ build+机检零错+跨屏抽查+golden(h2/h3)+
3 critic 判【品牌契合 logo:亮底/azure/navy】与【高级感/零AI味+对比度】两轴 ≥2/3 KEEP → 落库 push origin。
红线:只动 traderadar-vue/、亮色克制 glow、深字浅底够对比、不碰 ../ 只读参考、不造假%。
写报告 reports/round-<NNN>.md + 截图 reports/shots/ + 更新 INDEX/LOOP-STATE,push GitHub;非 R1 末尾 ScheduleWakeup(600)。
```

## 10. 教训 / 坑(踩到就 append,后轮别重蹈)
- **亮色反相**:批量替换后**必逐屏肉眼** —— `rgba(0,0,0,…)` 阴影/遮罩在白底要减淡;「浅字 on 暗底」的对比假设会翻(深色卡里的浅字会糊)。
- **R012 旧教训仍适用**:布局类 `display` 覆盖必须 gate 在显隐类(`.on`)上;**机检无 JS 错 ≠ 无视觉回归**,跨屏视觉抽查必做。
- **换蓝 ≠ 请回 slop**:亮色下 glow 易显脏,信号感靠 azure 实色 + 轨道母题,不靠到处发光(北极星)。
- **单一强调色锁**:azure 是唯一品牌色;绿/红/amber 仅作语义(正向/负向/warning),别让它们变装饰撞色。
