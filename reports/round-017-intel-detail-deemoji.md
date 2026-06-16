# Round 017 — CP-intel-detail 详情卡去 emoji

**档位**: 🟦 Standard(自动落库)
**方向**: 组件级去 AI 味 · 优先序①Emoji 装饰 · CP-intel-detail

## 改了什么
WhatsApp 右侧「客户情报」详情面板(`#intel-scroll`,点联系人后由 `renderIntelPanel` 注入)整卡去 emoji,全部换扁平终端元素:
- **跟进提醒/AI 建议标题** `⏰`/`💡` → 扁平描边 bell / bulb SVG(`.follow-up-ico`,amber)。
- **公司国别** `🇩🇪 德国`/`🇸🇬 新加坡` → 数据拆出 `flag` 字段,渲染用 `ccBadge(flag)` mono 国家码(DE/SG)+ 纯国名,与全站一致。
- **基础信息 + 深度情报行图标** `🏢📅💰🛒` / `📞📧📊🎯` → 新建 `IROW_ICON` 扁平 stroke-SVG 查找表(biz/cal/rev/cart/phone/mail/chart/target),数据 `icon` 字段改语义 key,渲染 `<svg>${IROW_ICON[key]}</svg>`。`.intel-row-icon svg` 描边样式。
- **解锁遮罩** `🔒` → 扁平挂锁 SVG(`.intel-lock-icon svg`)。
- **生成邮件 toast** `✉️` → `◆`。
- **顺手(CP4/CP5 边角)**:`.intel-co-av` 头像去冷蓝渐变 `linear-gradient(#1e40af,#3b82f6)` → amber 淡填充+描边+mono 字母、圆→12px 圆角方(去竞争冷色,贴 Phosphor)。

## 验收
- build ✓ · 机检 whatsapp/intel/dashboard/pool/leads 五屏 pass,零 pageErrors/newErrors
- **harness 改进**:`scripts/verify.mjs` whatsapp NAV 增 `selectWaContact(0)`,详情面板初始即渲染(原来空白,emoji 截不到)。反映真实使用。
- 跨屏抽查:intel 列表/dashboard/pool/leads 未被 INTEL_DATA/全局 IROW_ICON 改动带崩
- delta 3/3 **KEEP**(对比 intel-crop before/after):彩色 emoji + 冷蓝渐变头像 → 统一 amber 扁平 stroke 图标 + mono DE 徽标 + amber 方头像;图标小尺寸清晰、语义贴合、对齐无回退

## 截图
- before: reports/shots/r017-intel-before.png
- after: reports/shots/r017-intel-after.png

## 残留(写回 BACKLOG)
- CP5:`.ai-bubble-toggle`/`.modal-btn.primary` 仍 linear-gradient + glow、toggle svg #fff 冷白;WhatsApp 聊天头像 `wa-chat-av` 仍 `linear-gradient(c.color,...)` 冷彩(R012 selectWaContact 设的内联色)。
- CP4:其它 avatar 纯色圆/进度条/badge pill — leads 数据源彩色方块字母瓦片仍在。
