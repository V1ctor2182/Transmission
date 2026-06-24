<!--
  Shared — connect / unlock / feedback modals
  Faithful extract from index (31).html (L1851-1919). NOT yet idiomatic Vue.
  REWRITE: convert onclick="fn(...)" → @click, lift state into <script setup>.
  AI-flavor audit: see REFACTOR-NOTES.md.
-->
<template>
<!-- MODALS -->
<div class="modal-overlay" id="modal-connect">
  <div class="modal">
    <div class="modal-close" onclick="closeModal('modal-connect')">✕</div>
    <div class="modal-icon">🤝</div>
    <div class="modal-title" id="mc-title">确认建立联系</div>
    <div class="modal-sub" id="mc-sub">AI 将为您生成个性化开场白，通过 WhatsApp 或邮件发送</div>
    <div class="modal-info" id="mc-info"></div>
    <div class="modal-cost">消耗 <strong>1 次</strong>建联次数（剩余 47 次）</div>
    <div class="modal-actions">
      <div class="modal-btn ghost" onclick="closeModal('modal-connect')">取消</div>
      <div class="modal-btn primary" onclick="confirmConnect()">确认建联</div>
    </div>
  </div>
</div>

<div class="modal-overlay" id="modal-unlock">
  <div class="modal">
    <div class="modal-close" onclick="closeModal('modal-unlock')">✕</div>
    <div class="modal-icon">🔓</div>
    <div class="modal-title">解锁深度情报</div>
    <div class="modal-sub">获取该采购商的完整联系方式、历史采购记录和决策链路</div>
    <div class="unlock-opts">
      <div class="unlock-opt on" onclick="selectUnlock(this)">
        <div class="unlock-opt-icon"><svg viewBox="0 0 24 24"><path d="M7 11V7a5 5 0 0 1 10 0v4"/><rect x="5" y="11" width="14" height="10" rx="2"/></svg></div>
        <div class="unlock-opt-name">单条解锁</div>
        <div class="unlock-opt-desc">解锁当前这条情报的全部深度信息</div>
        <div class="unlock-opt-price">¥29</div>
      </div>
      <div class="unlock-opt" onclick="selectUnlock(this)">
        <div class="unlock-opt-icon"><svg viewBox="0 0 24 24"><path d="M6.5 8.5a3.5 3.5 0 1 0 0 7c2 0 3-1.5 5.5-3.5s3.5-3.5 5.5-3.5a3.5 3.5 0 1 1 0 7c-2 0-3-1.5-5.5-3.5S8.5 8.5 6.5 8.5z"/></svg></div>
        <div class="unlock-opt-name">月度无限</div>
        <div class="unlock-opt-desc">本月无限解锁所有情报，含 AI 分析报告</div>
        <div class="unlock-opt-price">¥99/月</div>
      </div>
    </div>
    <div class="modal-actions">
      <div class="modal-btn ghost" onclick="closeModal('modal-unlock')">取消</div>
      <div class="modal-btn primary" onclick="confirmUnlock()">立即解锁</div>
    </div>
  </div>
</div>

<!-- FEEDBACK MODAL -->
<div class="modal-overlay" id="feedback-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(8px);align-items:center;justify-content:center;z-index:300">
  <div class="modal" style="max-width:420px;width:90%">
    <div class="modal-close" onclick="document.getElementById('feedback-modal').style.display='none'">✕</div>
    <div class="modal-icon">⚠️</div>
    <div class="modal-title">反馈不精准</div>
    <div class="modal-sub">公司：<span id="feedback-company" style="color:#1e5fd0"></span></div>
    <div id="feedback-form">
      <div style="margin:16px 0 8px;font-size:12px;color:var(--t-muted)">请告诉我们不精准的原因，将帮助 AI 自动优化企业大脑：</div>
      <textarea id="feedback-input" placeholder="例如：该公司主要做内销，不做进口 / 规模太小 / 行业不符合…" style="width:100%;height:90px;background:rgba(19,33,63,.05);border:1px solid rgba(19,33,63,.1);border-radius:8px;padding:10px;color:#e2e8f0;font-size:12px;resize:none;margin-bottom:16px;box-sizing:border-box"></textarea>
      <div class="modal-actions">
        <div class="modal-btn ghost" onclick="document.getElementById('feedback-modal').style.display='none'">取消</div>
        <div class="modal-btn primary" onclick="submitFeedback()">提交反馈</div>
      </div>
    </div>
    <div id="feedback-result" style="display:none;flex-direction:column;align-items:center;padding:24px 0;gap:12px">
      <div style="font-size:40px">🧠</div>
      <div style="font-size:15px;font-weight:600;color:#e2e8f0">已自动优化企业大脑</div>
      <div style="font-size:12px;color:var(--t-muted);text-align:center">感谢反馈！AI 已更新 ICP 匹配模型，<br>后续推送的客户将更符合您的目标客户画像</div>
      <div style="display:flex;gap:8px;margin-top:4px">
        <div style="width:8px;height:8px;border-radius:50%;background:#17a673;animation:pulse 1s infinite"></div>
        <div style="font-size:11px;color:#17a673">模型优化中…</div>
      </div>
    </div>
  </div>
</div>
</template>
