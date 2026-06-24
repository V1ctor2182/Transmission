# Delta Rubric — 「前后对比」闸门标准(Standard/Utility 轮的 critic 用)

> 取代旧的「绝对质量」评审。critic 看**两张图:改前 `before` + 改后 `after`**,只判一件事:
> **这次改动是不是『净改进或中性、且没引入新问题』?** 是 → KEEP;引入了**新的**回退/破坏/slop → REVERT。
> fresh eyes、不知道改了什么代码,只看两张图的差异。

## 核心原则
- **判 delta,不判完美。** 屏里**改前就有、改后还在**的问题(既有 emoji、既有 iris、既有布局问题)**不是 REVERT 理由** —— 它们是单独的 backlog 项,本轮不背锅。
- **只抓本轮新引入的**:after 比 before **多**了什么坏东西?(新 slop、新破坏、对比度变差、颜色更乱、元素错位、动效变假…)
- 净改进 / 看不出差别(中性)→ **KEEP**。

## REVERT 的充分条件(任一,且必须是 after 相对 before 新出现的)
1. **新 regression**:after 里某处明显比 before 差(渲染崩、错位、文字看不清、对比度跌破可读)。
2. **新 slop**:after 引入了 before 没有的 AI 味(假进度/空转计数/紫蓝 AI 渐变/为动而动/新 emoji 装饰/竞争品牌色)。slop 定义见 `REVIEW-RUBRIC.md`。
3. **方向更偏**:after 比 before 更偏离 `../DESIGN.md`(Phosphor)。

## 不构成 REVERT(明确豁免)
- before 和 after **都有**的既有问题(本轮没碰的 emoji/iris/旧布局)。
- 纯主观「还能更好」但没变差。
- 改动范围外的区域。

## 输出(严格 JSON,最后一行)
```
__DELTA__ {"verdict":"KEEP|REVERT","regression":"none|<具体新问题>","better":"after 相对 before 改进了什么","new_slop":["after 新引入的 slop,或空"]}
```
- `verdict=REVERT` 仅当 `regression` 非 none 或 `new_slop` 非空(且确属本轮新引入)。
- **不确定某问题是不是本轮新引入 → 默认它是既有的 → KEEP**(疑罪从无,别误杀好改动)。
