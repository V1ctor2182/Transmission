# Round 086 · 🟦 闸门加固 · 一条命令全站 i18n 门(scripts/i18n-check.mjs)+ 补 3 个未覆盖态验证

- 时间:2026-06-26
- 档位:🟦 Standard(`main`;cron 1min)
- 分支:`main`
- backlog 来源项:承 R085(verify.mjs 加渲染中文守卫,但需逐屏 16 次启动,慢且端口冲突)。本轮把守卫做成**一条命令全站门**。

## 做了什么
- **新增 `scripts/i18n-check.mjs`**:复用**单 server + 单 browser**,逐屏 reload+navigate,扫 `document.body.innerText`(只含可见文字)CJK,allowlist `创拾觅深`,任一屏命中即 `exit 1` + 打印表格/JSON。
- **覆盖 17 屏/态**,含 R085 逐屏守卫**没跑到的 3 个**:`leads-tasks`(任务视图)· `leads-customers`(客户表 R071 译过但从未渲染验证)· `connectm`(建联确认弹窗)。
- 比 R085 的「16 次 node 启动」(R085 实测会端口冲突/卡)**快且稳**(单进程 ~15s,无端口冲突)。

## 结果:全 17 态 0 可见中文
`✓ login dashboard leads leads-tasks leads-customers marketing intel whatsapp pool feedback leadsrg unlockm connectm intelunlock waunlock tour nudge` → 全 `[]`,`__I18N__ pass:true`。
- **新验证点**:leads 任务/客户子视图(R070/R071 译,此前从未实拍验证)确认全英文。connect 弹窗(R075)确认英文。

## 验收
- **build** 无需(仅加测试脚本,不动 app)· **i18n-check** exit 0(17 态全绿)· **h1** ✓ · **h3**(rows=4)✓ · **tour-check** ✓
- **两北极星裁决**:产品 —— 全站英文从「逐屏手动扫」升级为「一条命令 CI 门 + 更广覆盖」,leads 子视图补验;视觉无变。**KEEP。**
- 红线:纯测试工具,不碰 app 代码/数据。

## 用法(写入 loop 工具箱)
- `node scripts/i18n-check.mjs` → 全站可见中文 = 0 的硬门(exit 1 即有漏译)。配合 verify.mjs 逐屏 chinese 字段(R085)双保险。

## 残留 / 收敛
- **★ ①全站英文 完成且双闸门守住(R085 逐屏 + R086 一键全站);②③ Signal-Room 各两轮;T11 死代码全清。三焦点 + 清理均收口。**
- 下一步候选(均非用户显式焦点,价值/风险待定):§8b 产品轴(数字解读/空态)· 逐屏视觉微精修 · 移动端 · 或等用户给新方向。**接近收敛,下轮若无高价值在焦点内项,发 digest 问方向。**

## commit / 分支 / push
- commit on `main` · push origin main。**cron 1min 起搏,不 ScheduleWakeup。**
