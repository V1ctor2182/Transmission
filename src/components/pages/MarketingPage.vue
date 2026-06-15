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
              <div class="mkt-list-title">营销队列</div>
              <div class="mkt-pending-badge" id="mkt-pending-badge">7 待审批</div>
            </div>
            <div id="mkt-list"></div>
          </div>
          <div class="mkt-review-col" id="mkt-review-col">
            <div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--t-muted);font-size:13px">← 选择左侧邮件开始审批</div>
          </div>
        </div>
      </div>

</template>
