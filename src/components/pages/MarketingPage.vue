<!--
  Page — 营销队列 marketing
  Faithful extract from index (31).html (L1738-1752). NOT yet idiomatic Vue.
  REWRITE: convert onclick="fn(...)" → @click, lift state into <script setup>.
  AI-flavor audit: see REFACTOR-NOTES.md.
-->
<template>
      <div class="page" id="page-marketing" style="padding:0">
        <div class="mkt-layout">
          <div class="mkt-list-col">
            <div class="mkt-list-head">
              <div class="mkt-list-title">Marketing queue</div>
              <div class="mkt-pending-badge" id="mkt-pending-badge">7 pending</div>
            </div>
            <div id="mkt-list"></div>
          </div>
          <div class="mkt-review-col" id="mkt-review-col">
            <div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--t-muted);font-size:13px">← Select an email on the left to start</div>
          </div>
        </div>
      </div>

</template>
