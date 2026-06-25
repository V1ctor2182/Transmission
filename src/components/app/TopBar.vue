<!--
  App chrome — top bar (breadcrumb / quota / credits / search)
  Faithful extract from index (31).html (L1064-1081). NOT yet idiomatic Vue.
  QuotaBar (顶部配额条 + 充值下拉)移植自老板 index (33).html,已 Phosphor 化。
  REWRITE: convert onclick="fn(...)" → @click, lift state into <script setup>.
  AI-flavor audit: see REFACTOR-NOTES.md.
-->
<script setup>
import QuotaBar from './QuotaBar.vue'
</script>

<template>
    <header class="topbar">
      <div class="tb-breadcrumb"><strong id="tb-page">工作台</strong> <span style="color:var(--t-muted);margin:0 6px">/</span> <span id="tb-sub">今日商机概览</span></div>
      <div class="tb-spacer"></div>
      <QuotaBar />
      <div class="tb-credits" onclick="toast('◆','建联次数','当前剩余 <strong>'+(document.getElementById('credits-val')?.textContent||'47')+' 次</strong>建联次数,解锁深度情报 / 一键建联各消耗 1 次')">
        <svg viewBox="0 0 24 24" style="width:13px;height:13px;stroke:var(--brand);fill:none;stroke-width:1.7;flex-shrink:0"><path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20M9 3 7 9l5 12 5-12-2-6"/></svg><span class="tb-credits-val" id="credits-val">47</span><span style="font-size:11px;color:var(--t-muted)">建联次数</span>
      </div>
      <div class="tb-search">
        <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input placeholder="搜索产品、国家、买家…"/>
      </div>
      <div class="tb-icon tb-help" onclick="window.startTour&&window.startTour()" title="新手引导">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      </div>
      <div class="tb-icon" onclick="toast('◆','通知','Klaus Weber 回复了报价单 · 新增德国商机 · 7封邮件待审批')">
        <svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        <div class="notif-dot"></div>
      </div>
      <div class="tb-icon" onclick="toast('◆','Liu Wei','万仟糕饼 · 华南区销售总监 · 已登录')">
        <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </div>
    </header>
</template>
