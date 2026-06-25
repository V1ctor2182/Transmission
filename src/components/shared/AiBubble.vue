<!--
  Shared — floating AI assistant bubble
  Faithful extract from index (31).html (L1831-1850). NOT yet idiomatic Vue.
  REWRITE: convert onclick="fn(...)" → @click, lift state into <script setup>.
  AI-flavor audit: see REFACTOR-NOTES.md.
-->
<template>
<div class="ai-bubble" id="ai-bubble" style="display:none">
  <div class="ai-bubble-panel" id="ai-panel">
    <div class="ai-bubble-head">
      <div class="ai-bubble-av"><svg viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="11" rx="2"/><path d="M12 8V4M9 4h6"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/></svg></div>
      <div class="ai-bubble-name">TR Assistant</div>
      <div class="ai-bubble-status">● Online</div>
    </div>
    <div class="ai-bubble-msg" id="ai-msg"><strong>Today:</strong> Klaus Weber viewed your brochure yesterday — send a quote follow-up today for a strong close.</div>
    <div class="ai-quick-btns">
      <div class="ai-quick-btn" onclick="aiAction('draft')"><svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>Draft follow-up email</div>
      <div class="ai-quick-btn" onclick="aiAction('leads')"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>Launch ICP Agent</div>
      <div class="ai-quick-btn" onclick="aiAction('whatsapp')"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>View pending replies</div>
    </div>
    <div class="ai-rotate-btn" onclick="rotateAiMsg()">Another tip ↻</div>
  </div>
  <div class="ai-bubble-toggle" onclick="toggleAi()">
    <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm-1-5h2v2h-2zm0-8h2v6h-2z"/></svg>
  </div>
</div>

</template>
