<!--
  Screen 1 — login + website-URL modal + AI scan overlay
  Faithful extract from index (31).html (L906-977). NOT yet idiomatic Vue.
  REWRITE: convert onclick="fn(...)" → @click, lift state into <script setup>.
  AI-flavor audit: see REFACTOR-NOTES.md.
-->
<template>
<div class="screen active" id="s-register" style="align-items:center;justify-content:center">
  <canvas id="reg-particle-canvas"></canvas>
  <div class="login-orb login-orb1"></div>
  <div class="login-orb login-orb2"></div>
  <div class="login-orb login-orb3"></div>
  <div class="login-card">
    <div class="login-logo">
      <div class="login-logo-mark"><svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>
      <div class="login-logo-name">Trade<em>Radar</em></div>
    </div>
    <div class="login-tagline">
      <h2>欢迎回来</h2>
      <p>全球商机智能平台 · AI 驱动的 B2B 拓客引擎</p>
    </div>
    <div class="login-field">
      <label>邮箱地址</label>
      <input type="email" placeholder="your@company.com" value="liu.wei@wanqianfood.com" id="login-email"/>
    </div>
    <div class="login-field">
      <label>密码</label>
      <input type="password" placeholder="••••••••" value="demo1234" id="login-password"/>
    </div>
    <button class="login-btn" onclick="doLogin()">登录工作台</button>
    <div class="login-demo-hint">演示账号已预填 &nbsp;·&nbsp; <a onclick="doLogin()">直接点击登录</a></div>
  </div>
  <div class="login-live-stats">
    <div class="login-stat"><div class="login-stat-val" style="color:#5ee6d9"><span class="login-stat-dot"></span>2,847,392</div><div class="login-stat-label">全球商机实时在线</div></div>
    <div class="login-stat"><div class="login-stat-val" style="color:#22d3ee">98,241</div><div class="login-stat-label">今日新增采购需求</div></div>
    <div class="login-stat"><div class="login-stat-val" style="color:#34d399">1,284</div><div class="login-stat-label">已建联采购商</div></div>
  </div>
</div>

<!-- WEBSITE INPUT MODAL (post-login) -->
<div id="website-modal-overlay">
  <div class="wm-card">
    <div class="wm-logo"><svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>
    <div class="wm-title">告诉 AI 你的产品</div>
    <div class="wm-sub">输入官网地址，AI 将立即分析您的产品，生成全球市场拓展报告并为您匹配精准商机</div>
    <div class="wm-input-wrap">
      <input class="wm-input" id="wm-url-input" type="text" placeholder="输入官网地址，如 wanqianfood.com" value="wanqianfood.com" autocomplete="off"/>
    </div>
    <div class="wm-hint">🔒 您的信息仅用于生成专属分析报告，不会对外分享</div>
    <button class="wm-btn" onclick="startScan()">
      <svg viewBox="0 0 24 24"><path d="m5 12 14 0M12 5l7 7-7 7"/></svg>
      开始 AI 全球市场分析
    </button>
    <div class="wm-features">
      <div class="wm-feat"><div class="wm-feat-dot" style="background:#5ee6d9"></div>全球商机匹配</div>
      <div class="wm-feat"><div class="wm-feat-dot" style="background:#22d3ee"></div>竞争格局分析</div>
      <div class="wm-feat"><div class="wm-feat-dot" style="background:#34d399"></div>市场进入策略</div>
    </div>
  </div>
</div>

<!-- SCAN OVERLAY -->
<div id="reg-scan-overlay">
  <div class="rso-logo"><svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>
  <div class="rso-title">AI 正在分析 <em id="rso-domain">wanqianfood.com</em></div>
  <div class="rso-status" id="rso-status">正在连接全球商机数据库…</div>
  <div class="rso-steps">
    <div class="rso-step" id="rso-s0"><div class="rso-step-icon">🌐</div><div><div class="rso-step-text">扫描官网与产品信息</div><div class="rso-step-sub">识别主营产品、市场定位、品牌调性</div></div></div>
    <div class="rso-step" id="rso-s1"><div class="rso-step-icon">📊</div><div><div class="rso-step-text">匹配全球 2.8M+ 采购需求</div><div class="rso-step-sub">正在过滤高匹配度商机…</div></div></div>
    <div class="rso-step" id="rso-s2"><div class="rso-step-icon">🎯</div><div><div class="rso-step-text">分析目标市场与竞争格局</div><div class="rso-step-sub">识别差异化机会与进入路径</div></div></div>
    <div class="rso-step" id="rso-s3"><div class="rso-step-icon">✨</div><div><div class="rso-step-text">生成专属拓客模型</div><div class="rso-step-sub">构建个性化 ICP 评分与外呼策略</div></div></div>
  </div>
  <div class="rso-progress"><div class="rso-progress-fill" id="rso-progress-fill"></div></div>
  <div class="rso-pct" id="rso-pct">0%</div>
</div>

<!-- ════════════════════════════════════════
     SCREEN 2: ONBOARDING MAP ANALYSIS
════════════════════════════════════════ -->
</template>
