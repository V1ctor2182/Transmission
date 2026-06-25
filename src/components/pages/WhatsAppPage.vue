<!--
  Page — 商机中心 WhatsApp
  Faithful extract from index (31).html (L1684-1737). NOT yet idiomatic Vue.
  REWRITE: convert onclick="fn(...)" → @click, lift state into <script setup>.
  AI-flavor audit: see REFACTOR-NOTES.md.
-->
<template>
      <div class="page" id="page-whatsapp" style="padding:0">
        <div class="wa-layout">
          <!-- Contact list -->
          <div class="wa-col">
            <div class="wa-col-head">
              <div class="wa-col-title">Conversations</div>
              <div class="wa-col-sub">6 active chats</div>
            </div>
            <div class="wa-search-wrap">
              <input class="wa-search-input" placeholder="Search contacts…"/>
            </div>
            <div class="wa-contact-list" id="wa-contact-list"></div>
          </div>
          <!-- Chat -->
          <div class="wa-col">
            <div class="wa-chat-head">
              <div class="wa-av" style="font-size:14px" id="wa-chat-av">K</div>
              <div>
                <div class="wa-chat-name" id="wa-chat-name">Klaus Weber</div>
                <div class="wa-chat-status" id="wa-chat-status">● Online</div>
              </div>
              <div class="wa-chat-tools">
                <div class="wa-tool" onclick="toast('◆','Voice call','Calling Klaus Weber…')"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
                <div class="wa-tool" onclick="toast('◆','Profile','Opening Klaus Weber's full profile…')"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
                <div class="wa-tool" onclick="toast('◆','Mark important','Klaus Weber marked as important')"><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
              </div>
            </div>
            <div class="wa-messages" id="wa-messages"></div>
            <div class="wa-ai-bar">
              <div class="wa-ai-label"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm-1-5h2v2h-2zm0-8h2v6h-2z"/></svg>AI script suggestions</div>
              <div class="wa-chips" id="wa-chips"></div>
            </div>
            <div class="wa-input-bar">
              <input class="wa-input" id="wa-input" placeholder="Type a message…"/>
              <div class="wa-send" onclick="sendWaMsg()"><svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></div>
            </div>
          </div>
          <!-- Intel panel -->
          <div class="wa-col">
            <div class="wa-col-head">
              <div class="wa-col-title">Buyer intel</div>
              <div class="wa-col-sub">Live AI analysis</div>
            </div>
            <!-- Link to Customer Pool -->
            <div id="wa-link-bar" style="padding:10px 14px;border-bottom:1px solid rgba(19,33,63,.05);display:flex;align-items:center;justify-content:space-between;gap:8px">
              <div style="font-size:11px;color:var(--t-muted);line-height:1.4">Current chat: <span id="wa-link-name" style="color:var(--t-primary);font-weight:600">Klaus Weber</span></div>
              <div id="wa-link-btn" onclick="linkWaToPool()" style="font-size:11px;font-weight:600;color:#1e5fd0;background:rgba(31,143,214,.12);border:1px solid rgba(31,143,214,.25);border-radius:8px;padding:5px 10px;cursor:pointer;white-space:nowrap;transition:.2s" onmouseover="this.style.background='rgba(31,143,214,.22)'" onmouseout="this.style.background='rgba(31,143,214,.12)'">Link to pool</div>
            </div>
            <div class="intel-scroll" id="intel-scroll"></div>
          </div>
        </div>
      </div>

      <!-- MARKETING PAGE -->
</template>
