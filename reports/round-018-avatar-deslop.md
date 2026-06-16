# Round 018 — CP4 avatar 收敛(WhatsApp + 侧栏)

**档位**: 🟦 Standard(自动落库)
**方向**: 组件级去 AI 味 · 优先序②通用模板组件 CP4 · 首战 avatar 纯色圆

## 改了什么
把"彩色圆 avatar"这个最典型的 AI-SaaS demo 元素收敛到终端风:
- **WhatsApp 联系人头像**(6 个)+ 聊天头部头像:原本是 `linear-gradient(c.color, c.color+aa)` 冷杂色圆(蓝 #1e40af / 深绿 #065f46 / 棕 #7c2d12 / 藏蓝 #1e3a5f / 紫 #4a1d96 / 青 #134e4a)—— 违反单一 amber 锁。改成统一终端风:`.wa-av` 扁平中性面(`rgba(255,248,235,.05)` + 1px 描边)+ mono 首字母 + 圆角方(10px);**选中联系人** + **聊天头部**(`#wa-chat-av`)给 amber 染色作为唯一强调。移除三处内联冷渐变(renderWaContacts、selectWaContact 的 chat-av setter、WhatsAppPage.vue 头部 markup)。
- **侧栏用户头像 `.sb-av`**(全屏可见,左下):`linear-gradient(#f5b73d,#6b78ff)` amber→**紫 iris** 渐变 → 扁平 amber 淡填充 + 描边 + mono 圆角方。去掉紫色竞争色。

> 颜色从来不是信息通道(原色与数据无映射),去掉不损失辨识;首字母 + 名称 + mono 国家码徽标(DE/SG/AE/BR/JP/US)承担区分;amber 选中态比"彩圆 vs amber 边框"旧冲突更清晰。

## 验收
- build ✓ · 机检 whatsapp + dashboard/leads/pool/intel/marketing 六屏 pass,零 pageErrors/newErrors
- 跨屏抽查:`.sb-av` 改动影响全屏侧栏 → dashboard 肉眼确认左下头像已 amber 方、其它无带崩
- delta 3/3 **KEEP**(对比 av-crop before/after + 全屏):冷杂色圆 → 统一中性方 + amber 选中;adversarial critic 确认辨识度/形状一致性/对比度均无回退

## 截图
- before: reports/shots/r018-av-before.png(冷杂色圆)
- after: reports/shots/r018-av-after.png(中性方 + amber 选中)

## 残留(写回 BACKLOG)
- CP4 续:leads 数据源彩色方块字母 logo 瓦片、icp-person-av(amber 渐变圆,属 amber 家族较轻)、进度条、badge pill。
- CP5:`.ai-bubble-toggle`/`.modal-btn.primary`/login 系列 `linear-gradient(brand,brand2)` + glow box-shadow(amber 家族内渐变,B7 部分处理过);toggle svg #fff 冷白。
