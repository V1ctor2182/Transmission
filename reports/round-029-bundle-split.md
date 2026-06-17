# Round 029 — #4 工程收尾:bundle 分包

**档位**: 🟦 Standard(自动落库) · 程序 #4 工程收尾

## 改了什么
`vite.config.js` 加 `build.rollupOptions.output.manualChunks`:
- `@svg-maps/world`(256 国真实轮廓数据,最大单块)→ 独立 `worldmap` chunk
- `node_modules`(vue 等运行时)→ `vendor` chunk
- 应用代码留主 `index` chunk
- `chunkSizeWarningLimit: 1300` 静音对 worldmap 这一块静态数据的通用告警

## 效果(before → after)
| chunk | before | after |
|---|---|---|
| 应用主包 index.js | **1,410 KB**(一坨) | **86.6 KB**(gzip 21.8) |
| vendor(vue) | — | 70.6 KB(gzip 28) |
| worldmap(地图数据) | — | 1,231 KB(gzip 402,独立缓存) |

应用代码从 1.4MB 砍到 ~86KB,首屏 JS 解析负担大降;vue 与地图数据各自独立缓存,改应用代码不再让用户重下地图。build 告警消除。

## 验收(纯 build 配置,无视觉 delta → build+golden 闸门)
- build ✓ 无 chunk 告警 · H3 golden-path PASS ✓ · 机检 dashboard 零 pageErrors/newErrors ✓
- 无视觉改动,不走 critic。

## 残留 / next
- 后续可选:worldmap 做 dynamic import 懒加载(登录/引导不需要地图),但需处理工作台首帧地图占位,排进 backlog 不急。
- CP5 余:`.wa-send`/`.icp-person-av`/进度条 `.variant-conf-fill` 等渐变。
- #4 余:Teleport(T9)、删 eval shim 死代码(T11)—— 需谨慎逐个验证不破页面显隐。
- 之后:**#3 H2 找客户 Hero**(feat 分支 + 暂停 review)。
