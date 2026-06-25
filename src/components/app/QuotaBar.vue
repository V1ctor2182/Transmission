<!--
  顶部配额条 + 配额充值下拉(老板 index (33).html 的两个新模块,移植 + Phosphor 化)。
  原版用 emoji 图标 / 紫蓝 indigo+cyan+green 多彩数字 / 紫色按钮 / navy 面板 —— 全是要去的 AI 味。
  这里只保留结构与交互,换成:扁平 SVG 图标(无 emoji)、单一琥珀强调色 + mono 数字、
  Phosphor 暖金近黑面板、扁平充值按钮。数字在用量 ≥80% 上限时转红(挣来的预警信号,非装饰)。
-->
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const open = ref(false)
// 扁平描边图标(currentColor,stroke 1.8,和全站一致)
const ICONS = {
  leads:   '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  edm:     '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
  connect: '<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5"/>',
  track:   '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
}
const quotas = [
  { key: 'leads',   label: '精准客户',   used: 10,  total: 1000,  unit: '个', desc: 'AI 搜索推送的高匹配采购商数量' },
  { key: 'edm',     label: '营销触达',   used: 847, total: 10000, unit: '封', desc: 'EDM 邮件和 WhatsApp 营销发送量' },
  { key: 'connect', label: '精准建联',   used: 3,   total: 10,    unit: '次', desc: 'AI 生成个性化开场白并主动建联' },
  { key: 'track',   label: 'AI 自动跟踪', used: 5,   total: 20,    unit: '个', desc: '每 3 天更新客户社媒动态，捕捉最新信号' },
]
const fmt = (n) => n.toLocaleString('en-US')
const near = (q) => q.used / q.total >= 0.8   // ≥80% → 预警转红

function toggle () { open.value = !open.value }
function recharge (q) {
  window.toast?.('◆', `充值${q.label}`, `将为您充值 ${fmt(q.total)} ${q.unit}${q.label}，请在充值页面完成支付`)
  open.value = false
}
function onDocClick (e) { if (!e.target.closest('.tb-quota-bar')) open.value = false }
onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
</script>

<template>
  <div class="tb-quota-bar">
    <button
      v-for="q in quotas" :key="q.key"
      class="q-item" :title="q.label" @click="toggle"
    >
      <svg class="q-ico" viewBox="0 0 24 24" v-html="ICONS[q.key]" aria-hidden="true" />
      <span class="q-meta">
        <span class="q-label">{{ q.label }}</span>
        <span class="q-num"><span class="q-used mono" :class="{ near: near(q) }">{{ fmt(q.used) }}</span><span class="q-total mono">/{{ fmt(q.total) }}</span></span>
      </span>
    </button>

    <!-- 配额充值下拉 -->
    <div class="quota-dd" :class="{ open }" role="dialog" aria-label="配额充值">
      <div class="qdd-title">
        <svg viewBox="0 0 24 24" class="qdd-bolt" aria-hidden="true"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>
        配额充值
        <button class="qdd-close" @click="open = false">关闭</button>
      </div>
      <div class="qdd-grid">
        <div class="qr-item" v-for="q in quotas" :key="q.key">
          <svg class="qr-ico" viewBox="0 0 24 24" v-html="ICONS[q.key]" aria-hidden="true" />
          <div class="qr-name">{{ q.label }}</div>
          <div class="qr-desc">{{ q.desc }}</div>
          <div class="qr-remaining mono">已用 <b :class="{ near: near(q) }">{{ fmt(q.used) }}</b> / {{ fmt(q.total) }}</div>
          <button class="qr-btn" @click="recharge(q)">+ 充值{{ q.label }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mono{ font-family:'JetBrains Mono',monospace; font-variant-numeric:tabular-nums }
.tb-quota-bar{ display:flex; align-items:center; gap:6px; position:relative }

/* ── 配额条目 ── */
.q-item{ display:flex; align-items:center; gap:7px; cursor:pointer;
  background:rgba(19,33,63,.04); border:1px solid var(--card-border); border-radius:8px;
  padding:5px 10px; white-space:nowrap; transition:.18s; color:inherit }
.q-item:hover{ background:rgba(19,33,63,.07); border-color:rgba(19,33,63,.14) }
.q-item:active{ transform:translateY(1px) }
.q-ico{ width:15px; height:15px; stroke:var(--t-muted); fill:none; stroke-width:1.8; flex-shrink:0 }
.q-item:hover .q-ico{ stroke:var(--brand) }
.q-meta{ display:flex; flex-direction:column; gap:1px; align-items:flex-start }
.q-label{ font-size:10px; color:var(--t-muted); line-height:1 }
.q-num{ line-height:1 }
.q-used{ font-weight:700; font-size:12px; color:var(--brand) }
.q-used.near{ color:var(--red) }
.q-total{ font-size:10px; color:var(--t-muted) }

/* ── 充值下拉 ── */
.quota-dd{ position:absolute; top:calc(100% + 8px); right:0; width:340px; z-index:200;
  background:var(--bg2); border:1px solid var(--card-border); border-radius:12px; padding:16px;
  box-shadow:var(--shadow); display:none }
.quota-dd.open{ display:block }
.qdd-title{ display:flex; align-items:center; gap:7px; font-size:12px; font-weight:700; color:var(--t-primary); margin-bottom:12px }
.qdd-bolt{ width:14px; height:14px; stroke:var(--brand); fill:none; stroke-width:1.8 }
.qdd-close{ margin-left:auto; font-size:10px; color:var(--t-muted); background:none; border:none; cursor:pointer; transition:.15s }
.qdd-close:hover{ color:var(--t-primary) }
.qdd-grid{ display:grid; grid-template-columns:1fr 1fr; gap:8px }
.qr-item{ background:rgba(19,33,63,.04); border:1px solid var(--card-border); border-radius:10px; padding:12px; transition:.18s }
.qr-item:hover{ border-color:rgba(31,143,214,.35); background:rgba(31,143,214,.06) }
.qr-ico{ width:18px; height:18px; stroke:var(--brand); fill:none; stroke-width:1.7; margin-bottom:7px }
.qr-name{ font-size:11px; font-weight:700; color:var(--t-primary); margin-bottom:2px }
.qr-desc{ font-size:10px; color:var(--t-muted); margin-bottom:7px; line-height:1.45 }
.qr-remaining{ font-size:10px; color:var(--t-muted); margin-bottom:8px }
.qr-remaining b{ font-weight:700; color:var(--brand) }
.qr-remaining b.near{ color:var(--red) }
.qr-btn{ display:block; width:100%; font-size:10px; padding:5px 10px; border-radius:6px; cursor:pointer; transition:.15s;
  background:rgba(31,143,214,.12); border:1px solid rgba(31,143,214,.3); color:var(--brand2); text-align:center }
.qr-btn:hover{ background:rgba(31,143,214,.2) }
.qr-btn:active{ transform:translateY(1px) }
</style>
