<!--
  App chrome — left icon sidebar
  Faithful extract from index (31).html (L1023-1061). NOT yet idiomatic Vue.
  REWRITE: convert onclick="fn(...)" → @click, lift state into <script setup>.
  AI-flavor audit: see REFACTOR-NOTES.md.
-->
<template>
  <nav class="sidebar">
    <div class="sb-logo" onclick="navTo('dashboard',0)">
      <img src="/logo-mark.png" alt="TRANS·MISSION" />
    </div>
    <div class="sb-item on" id="sb-0" onclick="navTo('dashboard',0)">
      <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
      <div class="sb-tip">工作台</div>
    </div>
    <div class="sb-item" id="sb-1" onclick="navTo('leads',1)">
      <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <div class="sb-badge">12</div>
      <div class="sb-tip">找客户</div>
    </div>
    <div class="sb-item" id="sb-2" onclick="navTo('marketing',2)">
      <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
      <div class="sb-badge">7</div>
      <div class="sb-tip">营销队列</div>
    </div>
    <div class="sb-item" id="sb-3" onclick="navTo('intel',3)">
      <svg viewBox="0 0 24 24"><path d="M1 6s4-2 11-2 11 2 11 2v12s-4-2-11-2S1 18 1 18V6z"/><path d="M12 4v16"/></svg>
      <div class="sb-tip">情报中心</div>
    </div>
    <div class="sb-item" id="sb-4" onclick="navTo('whatsapp',4)">
      <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      <div class="sb-badge">3</div>
      <div class="sb-tip">商机中心</div>
    </div>
    <div class="sb-item" id="sb-5" onclick="navTo('pool',5)">
      <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      <div class="sb-badge" id="sb-pool-badge">12</div>
      <div class="sb-tip">客户池</div>
    </div>
    <div class="sb-spacer"></div>
    <div class="sb-item" onclick="toast('⚙️','设置','功能开发中，敬请期待')">
      <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      <div class="sb-tip">设置</div>
    </div>
    <div class="sb-av">L</div>
  </nav>
</template>
