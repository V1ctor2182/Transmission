<!--
  Screen 1 — login (T1: rewritten, de-slopped).
  Removed: 3 decorative orbs, particle canvas, bottom vanity counters, "AI 驱动的拓客引擎" slogan.
  Now: asymmetric two-column (brand/value left, form right), honest copy, <script setup> + v-model.
  Kept for the legacy flow: id="s-register".active, class .login-btn, and the
  #website-modal-overlay / #reg-scan-overlay markup (doLogin/startScan still drive them).
-->
<script setup>
import { ref } from 'vue'

const email = ref('liu.wei@wanqianfood.com')
const password = ref('demo1234')

// Login → website-modal → scan flow still lives in legacy-app.js during the
// migration; call through to the globals (no inline onclick / eval shim needed).
const login = () => window.doLogin?.()
const startScan = () => window.startScan?.()
</script>

<template>
  <div class="screen active login-split" id="s-register">
    <!-- LEFT · brand + value -->
    <section class="lg-brand">
      <div class="lg-logo">
        <span class="lg-mark"><img src="/logo-mark.svg" alt="TRANS·MISSION" /></span>
        TRANS·<em>MISSION</em>
      </div>
      <div class="lg-sign" style="font-size:11px;letter-spacing:.42em;color:var(--t-muted);margin-top:-14px;margin-bottom:6px">创 拾 觅 深</div>
      <h1>全球买家的需求，<br/>此刻就在眼前。</h1>
      <p>把分散在各国的采购信号汇成一块可观察的大盘。你不再逐条搜索市场，而是看着它流动，先一步联系。</p>
      <div class="lg-foot">华南区销售工作台 · 万仟糕饼</div>
    </section>

    <!-- RIGHT · form -->
    <section class="lg-formwrap">
      <div class="lg-card">
        <h2>欢迎回来</h2>
        <p class="lg-sub">登录继续你的拓客工作台</p>

        <label class="lg-field">
          <span>邮箱地址</span>
          <input type="email" id="login-email" v-model="email" placeholder="you@company.com" @keydown.enter="login"/>
        </label>
        <label class="lg-field">
          <span>密码</span>
          <input type="password" id="login-password" v-model="password" placeholder="••••••••" @keydown.enter="login"/>
        </label>

        <button class="login-btn" @click="login">登录工作台</button>
        <div class="lg-hint">演示账号已预填，直接登录即可。</div>
      </div>
    </section>
  </div>

  <!-- WEBSITE INPUT MODAL (post-login) — ids preserved for the legacy flow -->
  <div id="website-modal-overlay">
    <div class="wm-card">
      <div class="wm-logo"><img src="/logo-mark.svg" alt="TRANS·MISSION" /></div>
      <div class="wm-title">告诉我们你的产品</div>
      <div class="wm-sub">输入官网地址，我们会分析你的产品，匹配全球采购需求并给出市场进入建议。</div>
      <div class="wm-input-wrap">
        <input class="wm-input" id="wm-url-input" type="text" placeholder="输入官网地址，如 wanqianfood.com" value="wanqianfood.com" autocomplete="off"/>
      </div>
      <div class="wm-hint">你的信息仅用于生成专属分析报告，不会对外分享。</div>
      <button class="wm-btn" @click="startScan">
        <svg viewBox="0 0 24 24"><path d="m5 12 14 0M12 5l7 7-7 7"/></svg>
        开始全球市场分析
      </button>
      <div class="wm-features">
        <div class="wm-feat"><div class="wm-feat-dot" style="background:#1e5fd0"></div>全球商机匹配</div>
        <div class="wm-feat"><div class="wm-feat-dot" style="background:#1f8fd6"></div>竞争格局分析</div>
        <div class="wm-feat"><div class="wm-feat-dot" style="background:#17a673"></div>市场进入策略</div>
      </div>
    </div>
  </div>

  <!-- SCAN OVERLAY — ids preserved for the legacy flow -->
  <div id="reg-scan-overlay">
    <div class="rso-logo"><svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>
    <div class="rso-title">正在分析 <em id="rso-domain">wanqianfood.com</em></div>
    <div class="rso-status" id="rso-status">正在连接全球商机数据库…</div>
    <div class="rso-steps">
      <div class="rso-step" id="rso-s0"><div class="rso-step-icon"></div><div><div class="rso-step-text">扫描官网与产品信息</div><div class="rso-step-sub">识别主营产品、市场定位、品牌调性</div></div></div>
      <div class="rso-step" id="rso-s1"><div class="rso-step-icon"></div><div><div class="rso-step-text">匹配全球 2.8M+ 采购需求</div><div class="rso-step-sub">正在过滤高匹配度商机…</div></div></div>
      <div class="rso-step" id="rso-s2"><div class="rso-step-icon"></div><div><div class="rso-step-text">分析目标市场与竞争格局</div><div class="rso-step-sub">识别差异化机会与进入路径</div></div></div>
      <div class="rso-step" id="rso-s3"><div class="rso-step-icon"></div><div><div class="rso-step-text">生成专属拓客模型</div><div class="rso-step-sub">构建个性化 ICP 评分与外呼策略</div></div></div>
    </div>
    <div class="rso-progress"><div class="rso-progress-fill" id="rso-progress-fill"></div></div>
    <div class="rso-pct" id="rso-pct">0%</div>
  </div>
</template>

<style scoped>
/* override the global #s-register centering for an asymmetric split */
#s-register.login-split{
  flex-direction:row; align-items:stretch; justify-content:stretch;
  width:100vw; height:100vh; overflow:hidden;
}

/* LEFT brand panel */
.lg-brand{
  flex:1.15; min-width:0; padding:56px 64px; display:flex; flex-direction:column;
  border-right:1px solid var(--card-border);
  background:
    radial-gradient(900px 500px at 18% 12%, rgba(31,143,214,.10), transparent 60%),
    radial-gradient(700px 460px at 90% 100%, rgba(30,95,200,.08), transparent 60%),
    var(--bg);
}
.lg-logo{display:flex; align-items:center; gap:11px; font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:20px; letter-spacing:-.02em}
.lg-logo em{font-style:normal; color:var(--brand)}
.lg-mark{width:40px; height:34px; display:grid; place-items:center}
.lg-mark img{width:100%; height:100%; object-fit:contain; display:block}
.lg-brand h1{
  margin-top:auto; font-family:'Bricolage Grotesque',sans-serif; font-weight:800;
  font-size:clamp(34px,3.4vw,52px); line-height:1.06; letter-spacing:-.03em; color:var(--t-primary);
}
.lg-brand p{margin-top:20px; max-width:46ch; font-size:16px; line-height:1.65; color:var(--t-sec)}
.lg-foot{margin-top:auto; padding-top:28px; font-family:'JetBrains Mono',monospace; font-size:12px; letter-spacing:.04em; color:var(--t-muted)}

/* RIGHT form */
.lg-formwrap{flex:.85; min-width:380px; display:flex; align-items:center; justify-content:center; padding:40px; background:var(--bg2)}
.lg-card{width:100%; max-width:360px}
.lg-card h2{font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:28px; letter-spacing:-.02em}
.lg-sub{margin-top:6px; font-size:14px; color:var(--t-muted)}
.lg-field{display:block; margin-top:20px}
.lg-field span{display:block; font-size:12px; font-weight:500; color:var(--t-sec); margin-bottom:7px}
.lg-field input{
  width:100%; background:var(--card); border:1px solid var(--card-border); border-radius:10px;
  padding:12px 14px; font-size:14px; color:var(--t-primary); transition:.18s ease;
}
.lg-field input:focus{outline:none; border-color:rgba(31,143,214,.5); box-shadow:0 0 0 3px rgba(31,143,214,.12)}
.lg-field input::placeholder{color:var(--t-muted)}
.login-btn{
  width:100%; margin-top:26px; border:none; border-radius:10px; padding:13px;
  font-family:'Geist',sans-serif; font-size:14px; font-weight:700; letter-spacing:.01em;
  color:#ffffff; background:var(--brand); cursor:pointer; transition:.18s ease;
  box-shadow:0 0 0 1px rgba(31,143,214,.4), 0 10px 28px -12px var(--brand);
}
.login-btn:hover{filter:brightness(1.07); transform:translateY(-1px)}
.login-btn:active{transform:translateY(1px) scale(.99)}
.lg-hint{margin-top:16px; text-align:center; font-size:12px; color:var(--t-muted)}

@media(max-width:880px){
  #s-register.login-split{flex-direction:column}
  .lg-brand{flex:none; padding:32px 28px; border-right:none; border-bottom:1px solid var(--card-border)}
  .lg-brand h1{font-size:30px; margin-top:24px}
  .lg-formwrap{flex:1; min-width:0}
}
</style>
