# Critic Rubric — 截图评审标准

> 给「独立 critic agent」用。它**只看 `.review/<screen>.png` 截图 + 本文件 + `../DESIGN.md`**,
> 不看代码、不知道改了什么(对抗式:fresh eyes、默认怀疑)。方法论源自 gstack `/design-review`。

## 任务
对照 `../DESIGN.md`(Signal Room 设计系统)评这张截图,判断这一轮改动是**改好了还是改差了/跑偏了**,
给一个**二元裁决**:`KEEP`(保留)或 `REVERT`(回滚)。宁可错杀,不可放进 AI-slop。

## 评分(A–F,每项从 A 起,每个高影响问题降一级,中影响降半级)
1. **视觉层级**:有没有清晰焦点?眯眼测试(squint test)还能看出主次吗?信息噪声?
2. **排版**:字体 ≤3 种?层级清晰?正文行宽 45–75 字?用的是 DESIGN.md 指定的 Bricolage/Geist/JetBrains Mono,**不是** Inter/Roboto/system?
3. **颜色对比**:调色板克制(≤ DESIGN.md 令牌)?正文对比度够(WCAG AA 4.5:1)?**只有一个品牌强调色 Signal Cyan**?深色面有层次?
4. **间距布局**:8px 网格节奏?对齐?圆角层级一致?有呼吸感(不是挤成一坨,也不是空荡)?
5. **交互态**(截图能看到的):按钮/输入有可见态?按钮文字在浅青底上是**深色**(对比够)?

## 🚫 AI-slop 黑名单(命中任一高影响项 → 倾向 REVERT)
- 紫色/靛蓝渐变光晕、neon 外发光当装饰
- **什么都居中**的对称布局(尤其登录/hero)
- 满屏一模一样的圆角气泡卡、装饰性模糊色球(blobs)
- emoji 当图标
- 千篇一律的「三等分图标卡」首屏
- 营销废话文案(「AI 驱动」「赋能」「一站式智能」)、口号体
- system-ui/Inter 当主字体
- 假大数 + 每个指标都挂 ▲x.x%

## 硬否决(instant REVERT)
- 截图大面积空白/错位/元素叠压/明显渲染崩坏
- 比 DESIGN.md 方向明显更「通用 SaaS」了(方向跑偏 = 比改之前更 AI 味)
- 文字看不清(对比不足、压在杂乱背景上)

## 输出格式(严格 JSON,最后一行)
```
__CRITIC__ {"verdict":"KEEP|REVERT","grade":"A-F","slop_grade":"A-F","reasons":["..."],"slop_hits":["..."],"vs_design_md":"更接近/更偏离 Signal Room 方向"}
```
- `verdict=REVERT` 的条件:命中任一硬否决,或 slop_grade ≤ C,或方向比改前更 AI 味。
- 不确定时 → `REVERT`(默认怀疑)。reasons 要具体,指出截图里**哪个像素级证据**。
