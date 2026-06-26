# Round 094 · 🟦 Standard · target-acquired 确认脉冲(承 R090-093,完成 targeting 反馈闭环)

- 时间:2026-06-26 / 档:Standard(自动落库) / 分支:main
- backlog 来源:R093 残留顶项「锁定时热点 ping 同步一闪(target-acquired 脉冲反馈)」

## 做了什么
WorldHeatmap.vue 给每个可点热点加**一次性确认脉冲**:磁吸锁定(`.snap`)或点击选中(`.sel`)瞬间,放出一道快速扩散环(r 4→18,opacity .75→0,.5s)。
- 区别于持续的 ambient `wh-ping`(慢循环):这是**绑真实交互的一次性确认**(target acquired),给锁定动作即时正反馈 = 游戏 targeting 手感 + 成就感。
- 闭合 R090-093 的 targeting 链:scan(准星)→ 磁吸 snap → **锁定确认一闪** → 读情报 → 点击下钻。
- **零 slop**:静态 idle 完全不变(脉冲仅交互瞬间);单 royal 细环;reduce-motion 关。

## 验收
- build ✓ · h1(visible=true)✓ · h3(rows=4 建联不破)✓ · i18n pass:true ✓
- **脉冲实测**(瞬时动效,以 computed animation 验,§5 纯动效闸门):Playwright 鼠标近热点 → spot `.snap`=true 且 `.wh-acq` `animationName=wh-acquire-*`(scoped);点击后 `.sel .wh-acq` 同样 `animationName=wh-acquire-*` → 磁吸/选中均触发确认脉冲
- 两北极星自检:① 视觉=一次性克制扩散环,idle 无痕,敢进 PDF → KEEP;② 产品=锁定即时确认反馈(成就感/游戏感)→ KEEP

## 截图
- 纯瞬时动效,无信息量静帧;锁定态外观见 [r093 lock 截图](shots/r093-map-lock-intel.png);本轮变更经 computed `animationName` 验证(见上)

## 残留 → backlog(焦点观察:targeting 系统已较成熟,下轮起考虑「广度」)
- 情报行加最新信号时间(buyers sub 的 2m/14m ago)— 产品价值
- 全图克制雷达扫掠 / 轻微视差倾斜 — 纯 tech 氛围(slop 风险,谨慎)
- **广度候选**:把同套交互雷达语言用到 LeadsPage 地图 / FRA 地图(一致性);或转其它屏审计
- ⚠️ 收敛观察:R090-094 连 5 轮深耕 dashboard 地图(均按用户地图指令、每轮真值),若再 2 轮只剩微polish,发 digest 问是否拓宽

## commit / push
main · 见下一条 commit hash
