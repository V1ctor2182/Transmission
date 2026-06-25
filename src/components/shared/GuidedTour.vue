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
  { page:'dashboard', sel:'.sidebar',                  pos:'right',  title:'导航 · 你的拓客流水线', desc:'左侧在 工作台 / 找客户 / 情报中心 / WhatsApp / 营销 / 客户池 之间切换 —— 一条完整的出海拓客流程从左到右。' },
  { page:'dashboard', sel:'#page-dashboard .cc-todos', pos:'bottom', title:'今日待办 · 先看这', desc:'每天进来第一眼看这行:最紧急的跟进、待审批、待解锁,红点是逾期。点任意一条直达对应屏。' },
  { page:'dashboard', sel:'#page-dashboard .map-pane', pos:'right',  title:'全球商机热力图', desc:'实时把各国采购需求画成热力图,点亮的是你的目标市场。点地图上的热点,可下钻该区域的实时买家。' },
  { page:'dashboard', sel:'#page-dashboard .kpis',     pos:'top',    title:'核心指标', desc:'全球商机总数、今日新增需求、已建联采购商、触达人数 —— 一眼看清全局态势与增长。' },
  { page:'dashboard', sel:'#page-dashboard .brow',     pos:'left',   title:'实时买家信号 · 一键建联', desc:'右侧是实时进来的买家。点每行的「建联」,就把这个买家物化成 WhatsApp 联系人并自动生成开场白 —— 直接开聊。' },
  { page:'dashboard', sel:'#page-dashboard .tasks-pane',pos:'left',  title:'AI 工作流', desc:'AI 在后台自动做的事:搜线索、回消息、生成邮件。每条都带行动按钮,点了直达去处理。' },
  // —— 逐屏走完整条流水线 ——
  { page:'leads',     sel:'#page-leads .icp-ds-grid',     pos:'bottom', title:'找客户 · AI 自动获客', desc:'按你的 ICP,从 28 个全球数据源(Google / LinkedIn / 海关数据…)自动搜买家、补全联系方式。下达一次任务,它每天替你找。' },
  { page:'intel',     sel:'#intel-table-body',            pos:'top',    title:'情报中心 · 全球采购需求', desc:'谁在买、买什么、匹配度、建联成功率一目了然。深度情报(直线电话 / 采购负责人邮箱 / 历史采购额)可一键解锁。' },
  { page:'whatsapp',  sel:'#intel-scroll',                pos:'left',   title:'建联对话 · AI 话术助攻', desc:'把买家变成真实 WhatsApp 联系人。右侧自动汇总客户情报与最佳跟进时机,AI 话术建议帮你开口、报价、谈判。' },
  { page:'marketing', sel:'#page-marketing .mkt-list-col',pos:'right',  title:'营销队列 · 批量个性化邮件', desc:'AI 为每个买家生成针对性邮件,你只需审批、批量发出 —— 不用一封封写。' },
  { page:'pool',      sel:'#page-pool #pool-table',       pos:'top',    title:'客户池 · 跟进总览', desc:'所有客户的跟进状态一处总览:逾期跟进、无回复、已回复分类清楚 —— 进来就知道今天该催谁。' },
  { page:'dashboard', sel:'.tb-help',                     pos:'bottom', title:'就这些 · 开始拓客', desc:'随时点右上角「?」重看引导。现在,去工作台看你的第一批买家,一键建联吧。' },
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
function start () { active.value = true; i.value = 0; show() }
function next ()  { if (i.value < steps.length - 1) { i.value++; show() } else end() }
function prev ()  { if (i.value > 0) { i.value--; show() } }
function end ()   { active.value = false; spot.value = { display:'none' } }
onMounted(() => { window.startTour = start })
</script>

<template>
  <div v-if="active" class="tour">
    <div class="tour-spot" :style="spot"></div>
    <div class="tour-card" :style="card">
      <div class="tour-step">新手引导 · {{ i + 1 }} / {{ steps.length }}</div>
      <div class="tour-title">{{ cur.title }}</div>
      <div class="tour-desc">{{ cur.desc }}</div>
      <div class="tour-foot">
        <span class="tour-skip" @click="end">跳过</span>
        <span class="tour-sp"></span>
        <button v-if="i > 0" class="tour-btn ghost" @click="prev">上一步</button>
        <button class="tour-btn" @click="next">{{ i === steps.length - 1 ? '完成' : '下一步 →' }}</button>
      </div>
    </div>
  </div>
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
</style>
