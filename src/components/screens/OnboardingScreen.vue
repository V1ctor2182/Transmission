<!--
  Screen 2 — onboarding world-map analysis
  Faithful extract from index (31).html (L978-1021). NOT yet idiomatic Vue.
  REWRITE: convert onclick="fn(...)" → @click, lift state into <script setup>.
  AI-flavor audit: see REFACTOR-NOTES.md.
-->
<template>
<div class="screen" id="s-onboard" style="flex-direction:column;background:#0b0a07">
  <!-- Top progress bar -->
  <div style="position:absolute;top:0;left:0;right:0;height:2px;background:rgba(255,248,235,.06);z-index:20">
    <div id="ob-progress" style="height:100%;background:linear-gradient(90deg,#f5b73d,#22d3ee);width:0%;transition:width 1s ease"></div>
  </div>
  <!-- Top bar -->
  <div style="position:absolute;top:0;left:0;right:0;height:52px;display:flex;align-items:center;padding:0 28px;z-index:20;border-bottom:1px solid rgba(255,248,235,.05)">
    <div style="display:flex;align-items:center;gap:10px">
      <div style="width:28px;height:28px;background:linear-gradient(135deg,#f5b73d,#ffd27a);border-radius:8px;display:flex;align-items:center;justify-content:center">
        <svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:#fff;fill:none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
      </div>
      <span style="font-family:'Bricolage Grotesque',sans-serif;font-size:14px;font-weight:800">Trade<span style="color:#ffd27a">Radar</span></span>
    </div>
    <div style="flex:1"></div>
    <div id="ob-chapter-text" style="font-size:11px;color:rgba(255,248,235,.4);letter-spacing:.08em;text-transform:uppercase">正在分析…</div>
    <div style="flex:1"></div>
    <div onclick="enterApp()" style="font-size:12px;color:rgba(255,248,235,.3);cursor:pointer;transition:.2s" onmouseover="this.style.color='rgba(255,248,235,.6)'" onmouseout="this.style.color='rgba(255,248,235,.3)'">跳过 →</div>
  </div>

  <!-- MAIN SPLIT LAYOUT -->
  <div style="display:flex;width:100%;height:100%;padding-top:52px">
    <!-- LEFT: Map Canvas -->
    <div style="flex:1;position:relative;overflow:hidden;border-right:1px solid rgba(255,248,235,.05)">
      <canvas id="ob-map-canvas" style="width:100%;height:100%;display:block"></canvas>
      <!-- Map overlay labels (injected by JS) -->
      <div id="ob-map-labels" style="position:absolute;inset:0;pointer-events:none"></div>
    </div>
    <!-- RIGHT: Content Panel -->
    <div style="width:440px;flex-shrink:0;overflow:hidden;position:relative;display:flex;flex-direction:column">
      <!-- Chapter slides -->
      <div id="ob-content-area" style="flex:1;overflow:hidden;position:relative"></div>
      <!-- Bottom nav -->
      <div style="padding:16px 28px;border-top:1px solid rgba(255,248,235,.05);display:flex;align-items:center;gap:8px">
        <div id="ob-dots-row" style="display:flex;gap:6px"></div>
        <div style="flex:1"></div>
        <button id="ob-next-btn" onclick="advanceOb()" style="background:linear-gradient(135deg,#f5b73d,#ffd27a);border:none;border-radius:8px;padding:8px 18px;font-size:12px;font-weight:700;color:#fff;cursor:pointer;transition:.2s">下一章 →</button>
      </div>
    </div>
  </div>
</div>

<!-- ════════════════════════════════════════
     SCREEN 3: MAIN APP
════════════════════════════════════════ -->
</template>
