<!--
  新手引导 / 交互式 tutorial。点「下一步」逐块高亮讲清每个功能干什么,最快理解整个产品。
  零 AI 味:干净 spotlight(navy 调暗 + azure 描边)+ azure 提示卡 + navy 字,不是俗气轮播。
  内容真实解释每个功能;由 TopBar 的「引导」入口 window.startTour() 触发。
  分轮扩展:steps 数组逐屏加(本轮:工作台 6 步)。
-->
<script setup>
import { ref, nextTick, onMounted } from 'vue'

// 每步:page(先 navTo 哪屏)· sel(高亮目标)· title/desc(真实功能解释)· pos(卡片相对目标的方位)
const steps = [
  { page:'dashboard', sel:'.sidebar',                  pos:'right',  title:'Navigation · your outreach pipeline', desc:'Switch between Workspace / Find buyers / Intel / WhatsApp / Marketing / Customer pool — one full export-outreach flow, left to right.' },
  { page:'dashboard', sel:'#page-dashboard .cc-todos', pos:'bottom', title:'Today\'s tasks · start here', desc:'Your first glance each day: the most urgent follow-ups, approvals and unlocks — a red dot means overdue. Click any row to jump to its screen.' },
  { page:'dashboard', sel:'#page-dashboard .map-pane', pos:'right',  title:'Global demand heatmap', desc:'Live purchasing demand mapped by country — the lit hotspots are your target markets. Click a hotspot to drill into that region\'s live buyers.' },
  { page:'dashboard', sel:'#page-dashboard .kpis',     pos:'top',    title:'Core metrics', desc:'Total global demand, new today, buyers contacted, people reached — your whole position and growth at a glance.' },
  { page:'dashboard', sel:'#page-dashboard .brow',     pos:'left',   title:'Live buyer signals · connect in one click', desc:'Buyers arrive in real time on the right. Hit Connect on any row to turn that buyer into a WhatsApp contact with an auto-drafted opener — start chatting right away.' },
  { page:'dashboard', sel:'#page-dashboard .tasks-pane',pos:'left',  title:'AI workflow', desc:'What AI runs in the background: finding leads, replying, drafting emails. Each item has an action button that takes you straight there.' },
  // —— 逐屏走完整条流水线 ——
  { page:'leads',     sel:'#page-leads .icp-ds-grid',     pos:'bottom', title:'Find buyers · AI lead-gen', desc:'By your ICP, AI searches buyers and fills in contacts across 28 global sources (Google / LinkedIn / customs data…). Set a task once and it hunts for you daily.' },
  { page:'intel',     sel:'#intel-table-body',            pos:'top',    title:'Intel center · global demand', desc:'Who\'s buying, what, match score and connect rate at a glance. Deep intel (direct line / buyer email / past spend) unlocks in one click.' },
  { page:'whatsapp',  sel:'#intel-scroll',                pos:'left',   title:'Outreach chat · AI script assist', desc:'Turn buyers into real WhatsApp contacts. The right panel sums up their intel and best follow-up timing; AI script tips help you open, quote and negotiate.' },
  { page:'marketing', sel:'#page-marketing .mkt-list-col',pos:'right',  title:'Marketing queue · personalized at scale', desc:'AI drafts a tailored email per buyer — you just approve and send in bulk, no writing them one by one.' },
  { page:'pool',      sel:'#page-pool #pool-table',       pos:'top',    title:'Customer pool · follow-up overview', desc:'Every client\'s follow-up status in one place — overdue, no reply, replied, all sorted — so you know who to chase today.' },
  { page:'dashboard', sel:'.tb-help',                     pos:'bottom', title:'That\'s it · start reaching out', desc:'Click the "?" at the top-right anytime to replay this tour. Now head to Workspace, see your first buyers, and connect in one click.' },
]

const active = ref(false)
const i = ref(0)
const cur = ref(steps[0])
const spot = ref({ display:'none' })
const card = ref({})

async function show () {
  const s = steps[i.value]; cur.value = s
  if (s.page && window.navTo) window.navTo(s.page)
  await nextTick()
  await new Promise(r => setTimeout(r, 200))            // 等屏渲染
  const el = document.querySelector(s.sel)
  if (!el) return next()                                // 目标缺失则跳过
  const r = el.getBoundingClientRect(), pad = 6, CW = 300, gap = 14
  spot.value = { display:'block', left:(r.left-pad)+'px', top:(r.top-pad)+'px', width:(r.width+pad*2)+'px', height:(r.height+pad*2)+'px' }
  let left, top
  if (s.pos === 'right')      { left = r.right + gap;       top = r.top }
  else if (s.pos === 'left')  { left = r.left - CW - gap;   top = r.top }
  else if (s.pos === 'top')   { left = r.left;              top = r.top - 168 }
  else                        { left = r.left;              top = r.bottom + gap }
  left = Math.max(16, Math.min(left, window.innerWidth - CW - 16))
  top  = Math.max(16, Math.min(top,  window.innerHeight - 172))
  card.value = { left:left+'px', top:top+'px' }
}
// 首访提示(让新用户/demo 发现引导;localStorage 记忆,不重复打扰)
const SEEN_KEY = 'tm_tour_seen'
const nudge = ref(false)
function markSeen () { try { localStorage.setItem(SEEN_KEY, '1') } catch {} }
function start () { nudge.value = false; markSeen(); active.value = true; i.value = 0; show() }
function next ()  { if (i.value < steps.length - 1) { i.value++; show() } else end() }
function prev ()  { if (i.value > 0) { i.value--; show() } }
function end ()   { active.value = false; spot.value = { display:'none' }; markSeen() }
function showNudge () { try { if (localStorage.getItem(SEEN_KEY)) return } catch {} nudge.value = true }
function dismissNudge () { nudge.value = false; markSeen() }
// 键盘驱动(demo 演示更顺):→/Enter/空格 下一步,← 上一步,Esc 退出
function onKey (e) {
  if (!active.value) return
  if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); next() }
  else if (e.key === 'ArrowLeft') { prev() }
  else if (e.key === 'Escape') { end() }
}
onMounted(() => { window.startTour = start; window.__tourNudge = showNudge; window.addEventListener('keydown', onKey) })
</script>

<template>
  <div v-if="active" class="tour" @click.self="next">
    <div class="tour-spot" :style="spot"></div>
    <div class="tour-card" :style="card">
      <div class="tour-step">Guided tour · {{ i + 1 }} / {{ steps.length }}</div>
      <div class="tour-title">{{ cur.title }}</div>
      <div class="tour-desc">{{ cur.desc }}</div>
      <div class="tour-foot">
        <span class="tour-skip" @click="end">Skip</span>
        <span class="tour-sp"></span>
        <button v-if="i > 0" class="tour-btn ghost" @click="prev">Back</button>
        <button class="tour-btn" @click="next">{{ i === steps.length - 1 ? 'Done' : 'Next →' }}</button>
      </div>
      <div class="tour-prog"><div class="tour-prog-fill" :style="{ width: ((i + 1) / steps.length * 100) + '%' }"></div></div>
      <div class="tour-hint">← → or click anywhere · Esc to exit</div>
    </div>
  </div>

  <!-- 首访提示:底部居中,不挡任何可点元素;自带「开始引导」 -->
  <transition name="tn-pop">
    <div v-if="nudge" class="tour-nudge">
      <div class="tour-step">Guided tour</div>
      <div class="tour-title">First time at TRANS·MISSION?</div>
      <div class="tour-desc">Take 30 seconds to see how it finds you global buyers and connects in one click.</div>
      <div class="tour-foot">
        <span class="tour-skip" @click="dismissNudge">No thanks</span>
        <span class="tour-sp"></span>
        <button class="tour-btn" @click="start">Start tour →</button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.tour{ position:fixed; inset:0; z-index:600; pointer-events:auto }   /* 拦截 app 交互,引导期间只点卡片 */
.tour-spot{ position:fixed; border:2px solid var(--brand); border-radius:10px;
  box-shadow:0 0 0 9999px rgba(13,27,62,.55); pointer-events:none;
  transition:left .28s cubic-bezier(.22,.61,.36,1),top .28s cubic-bezier(.22,.61,.36,1),width .28s,height .28s }
.tour-card{ position:fixed; width:300px; background:var(--bg2); border:1px solid var(--card-border);
  border-radius:12px; box-shadow:var(--shadow); padding:16px 18px; pointer-events:auto; transition:left .2s,top .2s }
.tour-step{ font:600 10px 'JetBrains Mono',monospace; letter-spacing:.06em; color:var(--brand); margin-bottom:7px }
.tour-title{ font-family:'Bricolage Grotesque',sans-serif; font-size:16px; font-weight:800; color:var(--t-primary); margin-bottom:6px }
.tour-desc{ font-size:13px; line-height:1.6; color:var(--t-sec); margin-bottom:14px }
.tour-foot{ display:flex; align-items:center; gap:8px }
.tour-skip{ font-size:12px; color:var(--t-muted); cursor:pointer; transition:.15s }
.tour-skip:hover{ color:var(--t-sec) }
.tour-sp{ flex:1 }
.tour-btn{ background:var(--brand); color:var(--ink); border:none; border-radius:8px; padding:7px 16px;
  font:700 12px 'Geist',sans-serif; cursor:pointer; transition:.15s }
.tour-btn:hover{ filter:brightness(1.06) }
.tour-btn.ghost{ background:transparent; border:1px solid var(--card-border); color:var(--t-sec) }
.tour-prog{ height:3px; background:rgba(31,143,214,.12); border-radius:2px; margin-top:14px; overflow:hidden }
.tour-prog-fill{ height:100%; background:var(--brand); border-radius:2px; transition:width .3s cubic-bezier(.22,.61,.36,1) }
.tour-hint{ margin-top:8px; font-size:10px; color:var(--t-muted); letter-spacing:.02em; text-align:center }
/* 首访提示卡(底部居中,自带「开始引导」,不挡可点元素)*/
.tour-nudge{ position:fixed; bottom:22px; left:50%; transform:translateX(-50%); width:320px; z-index:590; pointer-events:auto;
  background:var(--bg2); border:1px solid var(--card-border); border-top:2px solid var(--brand);
  border-radius:12px; box-shadow:var(--shadow); padding:14px 18px }
.tn-pop-enter-active{ transition:opacity .28s, transform .28s cubic-bezier(.22,.61,.36,1) }
.tn-pop-enter-from{ opacity:0; transform:translateX(-50%) translateY(10px) }
</style>
