<!--
  Page — 工作台 dashboard · 多窗格指挥台 (R012)
  地图常驻为主角 + KPI 条 + AI 工作流 feed + 右侧实时买家整列。
  布局取自 ../../../layout-preview.html,配色换 Phosphor 令牌(cyan 已退役)。
  注:旧的 #ai-daily-report / #ai-report-list / #today-todo-list 面板已并入本页
  数据驱动的 feed/buyers,legacy 渲染器有 if(!el) return 守卫,不会报错。
-->
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import WorldHeatmap from '../shared/WorldHeatmap.vue'
const nav = (p) => window.navTo?.(p)

// 地图热点 = 万仟出海战略的四级目标市场(T1 东南亚首选→T2 北美→T3 澳洲/欧洲)。
// region = 下钻分组键;东南亚为核心市场,标 hot。
const mapHotspots = [
  { x: 778, y: 398, label: '东南亚 · 512K', hot: true, region: '东南亚' },  // T1 首选(3300万华侨)
  { x: 250, y: 246, label: '北美 · 188K',   region: '北美' },                // T2 重点
  { x: 852, y: 470, label: '澳洲 · 77K',    region: '澳洲' },                // T3 布局
  { x: 516, y: 182, label: '欧洲 · 96K',    region: '欧洲' },                // T3 布局
]
const kpis = [
  { label: '全球商机总数', value: '2,847,392', delta: '+3.2% 较昨日',  hot: false, page: 'intel',     spark: [12,14,13,16,18,17,21,24] },
  { label: '今日新增需求', value: '98,241',    delta: '+12.7% 较昨日', hot: true,  page: 'intel',     spark: [8,9,11,10,13,15,19,23] },
  { label: '已建联采购商', value: '1,284',     delta: '+5.1% 本月',    hot: false, page: 'whatsapp',  spark: [20,21,22,24,25,27,29,31] },
  { label: 'EDM 触达人数', value: '3,847',     delta: '+8.9% 本月',    hot: false, page: 'marketing', spark: [14,15,17,16,19,22,24,28] },
]
function sparkPath (d) {
  const w = 72, h = 18, max = Math.max(...d), min = Math.min(...d), rng = (max - min) || 1
  return d.map((v, i) => `${i ? 'L' : 'M'}${(i / (d.length - 1) * w).toFixed(1)},${(h - (v - min) / rng * h).toFixed(1)}`).join(' ')
}
// AI 工作流实时 feed(承接旧「AI 今日工作报告」的意义)
const feed = [
  { tone: 'acc',  html: 'AI 搜索引擎新推送 <b>23 条</b>东南亚超市采购线索', at: '刚刚',   page: 'intel',     action: '查看线索' },
  { tone: 'up',   html: '<b>Fairprice Group</b> 回复了产品目录请求，建议跟进', at: '2分钟',  page: 'whatsapp',  action: '去跟进' },
  { tone: 'hot',  html: 'AI 已自动生成 <b>7 封</b>个性化邮件，待审批',        at: '8分钟',  page: 'marketing', action: '去审批' },
  { tone: 'iris', html: '情报中心更新<b>德国</b>市场季度采购报告',            at: '14分钟', page: 'intel',     action: '看报告' },
  { tone: 'acc',  html: 'ICP Agent 识别出 <b>5 家</b>高匹配新目标客户',        at: '27分钟', page: 'leads',     action: '查看客户' },
]
// 今日待办(卖方「该做什么」= 明确下一步;真实条目,urgent 优先,点击直达对应屏)
const todos = [
  { urgent: true,  text: 'Klaus Weber 等待报价回复', at: '已等待 2 小时', page: 'whatsapp' },
  { urgent: false, text: '7 封邮件待审批发送',       at: '营销队列',     page: 'marketing' },
  { urgent: false, text: 'T&T Supermarket 3 天无沟通', at: '建议今日跟进', page: 'pool' },
  { urgent: false, text: 'Asian Grocery Pty 逾期跟进', at: '已 5 天',      page: 'whatsapp' },
]
// 实时买家信号(右侧常驻整列)= 万仟报告点名的真实华人超市渠道(Fairprice/NTUC·Cold
// Storage·Jaya Grocer 东南亚 / 99 Ranch·T&T 北美 / Asian Grocery 澳),需求为粽子/月饼/节庆礼盒。
// region 对应地图热点;flag/country/need 喂给建联对话上下文。东南亚为核心,占比最大。
const buyers = [
  { cc: 'SG', co: 'Fairprice Group',     mt: 96, sub: '新加坡 · 2分钟前',  val: '$188,400', region: '东南亚', country: '新加坡',   flag: '🇸🇬', need: '中秋精品月饼礼盒' },
  { cc: 'MY', co: 'Jaya Grocer Bhd',     mt: 93, sub: '马来西亚 · 14分钟前', val: '$142,000', region: '东南亚', country: '马来西亚', flag: '🇲🇾', need: '精品月饼批发' },
  { cc: 'SG', co: 'Cold Storage',        mt: 88, sub: '新加坡 · 38分钟前',  val: '$96,500',  region: '东南亚', country: '新加坡',   flag: '🇸🇬', need: '高端节庆礼盒' },
  { cc: 'TH', co: 'Central Food Hall',   mt: 82, sub: '泰国 · 1小时前',    val: '$77,800',  mid: true, region: '东南亚', country: '泰国', flag: '🇹🇭', need: '节庆礼品盒' },
  { cc: 'CA', co: 'T&T Supermarket',     mt: 91, sub: '加拿大 · 2小时前',  val: '$204,000', region: '北美',   country: '加拿大',   flag: '🇨🇦', need: '月饼礼盒年度采购' },
  { cc: 'US', co: '99 Ranch Market',     mt: 89, sub: '美国 · 2小时前',    val: '$331,500', region: '北美',   country: '美国',     flag: '🇺🇸', need: '中式糕点年度采购' },
  { cc: 'AU', co: 'Asian Grocery Pty',   mt: 84, sub: '澳大利亚 · 4小时前', val: '$120,400', mid: true, region: '澳洲', country: '澳大利亚', flag: '🇦🇺', need: '高端粽子礼盒' },
  { cc: 'GB', co: 'Wing Yip Foods',      mt: 85, sub: '英国 · 5小时前',    val: '£96,200',  mid: true, region: '欧洲', country: '英国', flag: '🇬🇧', need: '亚洲节庆食品年度进口' },
]

// 每区实时买家信号数 → 驱动地图热点的脉冲节奏(信号越多,ping 越快;非装饰性恒定脉冲)
const regionCount = buyers.reduce((m, b) => (m[b.region] = (m[b.region] || 0) + 1, m), {})
const liveHotspots = mapHotspots.map((h, i) => {
  const n = regionCount[h.region] || 0
  return { ...h, count: n, dur: Math.max(1.5, 3.4 - n * 0.45).toFixed(2), delay: (i * 0.35).toFixed(2) }
})

const activeRegion = ref(null)
const onHotspot = (h) => { activeRegion.value = activeRegion.value === h.region ? null : h.region }
const shownBuyers = computed(() => activeRegion.value ? buyers.filter(b => b.region === activeRegion.value) : buyers)
const connect = (b) => window.connectBuyer?.(b.co, b.country, b.flag, b.region, b.val, b.need, b.mt)

// KPI 进入工作台时一次性 count-up(指挥台「上线」入场,真实终值,非循环)
const kpiNums = kpis.map(k => parseInt(k.value.replace(/[^0-9]/g, ''), 10))
const kpiDisplay = ref(kpis.map(k => k.value))
let counted = false
function runCountUp () {
  if (counted) return; counted = true
  const dur = 1000, fmt = n => Math.round(n).toLocaleString('en-US')
  let t0 = null
  const frame = (t) => {
    if (t0 === null) t0 = t
    const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3)
    kpiDisplay.value = kpiNums.map(n => fmt(n * e))
    if (p < 1) requestAnimationFrame(frame)
    else kpiDisplay.value = kpis.map(k => k.value)  // 精确还原原始格式
  }
  requestAnimationFrame(frame)
}
let kpiIO = null
onMounted(() => {
  const el = document.querySelector('#page-dashboard .kpis')
  if (!el || !('IntersectionObserver' in window)) return
  kpiIO = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) { runCountUp(); kpiIO.disconnect() }
  }, { threshold: 0.2 })
  kpiIO.observe(el)
})
onBeforeUnmount(() => kpiIO && kpiIO.disconnect())
</script>

<template>
  <div class="page on dash-cc" id="page-dashboard">
    <div class="cc-bar">
      <div class="cc-greet">早上好，<em>Liu Wei</em></div>
      <div class="cc-sub">今天是 2026年6月14日 · 今日新增 98,241 条采购需求，已为您筛选 <span class="cc-link" @click="nav('intel')">12 条高匹配商机 →</span></div>
    </div>
    <div class="cc-todos" role="list" aria-label="今日待办">
      <span class="cc-todos-lbl">今日待办</span>
      <button class="todo-chip" :class="{ urgent: t.urgent }" v-for="(t, i) in todos" :key="i" @click="nav(t.page)" role="listitem">
        <span class="td-dot"></span><span class="td-text">{{ t.text }}</span><span class="td-at">{{ t.at }}</span>
      </button>
    </div>

    <div class="ws">
      <!-- MAP (hero, always on) -->
      <section class="pane map-pane">
        <div class="pane-h">
          <span class="t">全球商机热力图</span>
          <span class="live"><i></i>LIVE</span>
          <span class="sp"></span>
          <div class="seg">
            <b class="on" onclick="setPf(this)">全部</b>
            <b onclick="setPf(this)">食品</b>
            <b onclick="setPf(this)">东南亚</b>
            <b onclick="setPf(this)">北美</b>
          </div>
        </div>
        <div class="pane-b">
          <div class="cc-map"><WorldHeatmap :hotspots="liveHotspots" :active="activeRegion" @hotspot="onHotspot" /></div>
          <div class="map-stat">
            <div>2,847,392<span>全球商机</span></div>
            <div>98,241<span>今日新增</span></div>
            <div>4<span>目标市场</span></div>
          </div>
          <div class="map-hint" v-if="!activeRegion">点击地图热点,下钻该区域实时买家</div>
        </div>
      </section>

      <!-- KPI strip -->
      <section class="kpi-pane">
        <div class="kpis">
          <div class="kpi" :class="{ h: k.hot }" v-for="(k, i) in kpis" :key="k.label" @click="nav(k.page)">
            <div class="l">{{ k.label }}</div>
            <div class="v">{{ kpiDisplay[i] }}</div>
            <div class="kfoot">
              <span class="d">{{ k.delta }}</span>
              <svg class="spark" viewBox="0 0 72 18" preserveAspectRatio="none" aria-hidden="true">
                <path :d="sparkPath(k.spark)" fill="none" stroke-width="1.6" vector-effect="non-scaling-stroke" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <!-- AI 工作流 feed -->
      <section class="pane tasks-pane">
        <div class="pane-h"><span class="t">AI 工作流</span><span class="sp"></span><span class="live"><i></i>运行中</span></div>
        <div class="pane-b">
          <div class="feed">
            <div class="frow" v-for="(f, i) in feed" :key="i" @click="nav(f.page)"
                 :style="{ animationDelay: (i * 0.05).toFixed(2) + 's' }">
              <span class="fd" :class="f.tone"></span>
              <span class="ft" v-html="f.html"></span>
              <span class="fmeta"><span class="faction">{{ f.action }}</span><span class="fa">{{ f.at }}</span></span>
            </div>
          </div>
        </div>
      </section>

      <!-- BUYERS (live, full height) -->
      <section class="pane buyers-pane">
        <div class="pane-h">
          <span class="t">实时买家信号</span>
          <span class="live"><i></i>{{ activeRegion ? activeRegion : '4 市场' }}</span>
          <span class="sp"></span>
          <button v-if="activeRegion" class="region-clear" @click="activeRegion = null">{{ shownBuyers.length }} 个 · 全部 ✕</button>
          <div v-else class="seg"><b class="on">匹配度</b><b>时间</b></div>
        </div>
        <div class="pane-b">
          <div class="brow" v-for="(b, i) in shownBuyers" :key="b.co" @click="connect(b)"
               :style="{ animationDelay: (i * 0.04).toFixed(2) + 's' }">
            <div class="co"><span class="cc mono">{{ b.cc }}</span>{{ b.co }}</div>
            <div class="mt mono" :class="{ mid: b.mid }">{{ b.mt }}</div>
            <div class="bsub mono">{{ b.sub }}</div>
            <div class="val mono">{{ b.val }}</div>
            <button class="bconnect" @click.stop="connect(b)" title="一键建联">
              <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>建联
            </button>
          </div>
          <div class="bempty" v-if="!shownBuyers.length">
            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <div>{{ activeRegion }} 区域暂无活跃买家信号</div>
            <button class="region-clear" @click="activeRegion = null">看全部区域</button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* 令牌桥:把 preview 的 Signal-Room 名映射到 Phosphor 全局令牌(cyan 退役) */
.dash-cc{
  --acc:var(--brand); --acc-soft:rgba(31,143,214,.13); --acc-line:rgba(31,143,214,.34);
  --hot:var(--brand-azure); --up:var(--green); --iris:#1e5fd0;
  --s1:var(--bg2); --s2:var(--bg3); --bd:var(--card-border); --bd2:rgba(19,33,63,.14);
  --t1:var(--t-primary); --t2:var(--t-sec); --t3:var(--t-muted);
  --pane-r:12px;
}
/* 覆盖全局 .page 的 padding/overflow,让指挥台铺满内容区。
   display 必须 gate 在 .on 上,否则 .page.dash-cc 的特异性高过 .page{display:none},
   会导致离开工作台后 dashboard 仍铺在其它页面后面(R012 修)。 */
.page.dash-cc{ padding:14px; overflow:hidden; flex-direction:column; gap:12px }
.page.dash-cc.on{ display:flex }
.mono{ font-family:'JetBrains Mono',monospace; font-variant-numeric:tabular-nums }

.cc-bar{ flex-shrink:0; display:flex; align-items:baseline; gap:14px }
.cc-greet{ font-size:18px; font-weight:600; color:var(--t1) }
.cc-greet em{ font-style:normal; color:var(--brand) }
.cc-sub{ font-size:12px; color:var(--t3); overflow:hidden; text-overflow:ellipsis; white-space:nowrap }
.cc-link{ color:var(--brand); font-weight:600; cursor:pointer; transition:.15s }
.cc-link:hover{ color:var(--brand2); text-decoration:underline }
/* 今日待办 chip-strip(明确下一步:真实任务,urgent 优先,点击直达) */
.cc-todos{ flex-shrink:0; display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-top:10px }
.cc-todos-lbl{ font-size:11px; font-weight:700; letter-spacing:.04em; color:var(--t3); margin-right:2px }
.todo-chip{ display:inline-flex; align-items:center; gap:7px; padding:5px 11px; border-radius:8px;
  background:var(--bg2); border:1px solid var(--bd); cursor:pointer; transition:.15s; font-family:inherit }
.todo-chip:hover{ border-color:var(--acc-line); background:var(--acc-soft); transform:translateY(-1px) }
.todo-chip.urgent{ border-color:rgba(229,72,77,.3); background:rgba(229,72,77,.05) }
.td-dot{ width:6px; height:6px; border-radius:2px; background:var(--acc); flex-shrink:0 }
.todo-chip.urgent .td-dot{ background:var(--red) }
.td-text{ font-size:12px; font-weight:600; color:var(--t1); white-space:nowrap }
.td-at{ font:500 10.5px 'JetBrains Mono',monospace; color:var(--t3); white-space:nowrap }

/* 多窗格工作区网格 */
.ws{ flex:1; min-height:0; display:grid; gap:12px;
  grid-template-columns:1.55fr 1fr;
  grid-template-rows:minmax(0,1.5fr) auto minmax(0,1fr);
  grid-template-areas:"map buyers" "kpi buyers" "tasks buyers"; }
.map-pane{ grid-area:map } .kpi-pane{ grid-area:kpi } .tasks-pane{ grid-area:tasks } .buyers-pane{ grid-area:buyers }

/* 面板(终端窗口) */
.pane{ background:var(--s1); border:1px solid var(--bd); border-radius:var(--pane-r); overflow:hidden;
  display:flex; flex-direction:column; min-height:0; box-shadow:inset 0 1px 0 rgba(19,33,63,.04) }
.pane-h{ height:34px; flex-shrink:0; display:flex; align-items:center; gap:9px; padding:0 13px;
  border-bottom:1px solid var(--bd); background:rgba(19,33,63,.015) }
.pane-h .t{ font-size:12px; font-weight:600; letter-spacing:.01em; color:var(--t1) }
.pane-h .live{ font:600 10px/1 'JetBrains Mono',monospace; letter-spacing:.12em; color:var(--acc);
  display:flex; align-items:center; gap:5px; text-transform:uppercase }
.pane-h .live i{ width:5px; height:5px; border-radius:50%; background:var(--acc); box-shadow:0 0 7px var(--acc); animation:cc-pulse 1.8s infinite }
.pane-h .sp{ flex:1 }
.pane-h .seg{ display:flex; gap:2px; background:var(--s2); border-radius:7px; padding:2px }
.pane-h .seg b{ font:500 10.5px 'Geist',sans-serif; color:var(--t3); padding:3px 8px; border-radius:5px; cursor:pointer; transition:.15s }
.pane-h .seg b.on{ background:var(--acc-soft); color:var(--acc) }
.pane-b{ flex:1; min-height:0; overflow:auto; position:relative }
.pane-b::-webkit-scrollbar{ width:5px } .pane-b::-webkit-scrollbar-thumb{ background:rgba(19,33,63,.1); border-radius:3px }
@keyframes cc-pulse{ 0%,100%{opacity:1} 50%{opacity:.4} }

/* MAP pane */
.cc-map{ position:absolute; inset:0 }
.cc-map :deep(svg){ width:100%; height:100% }
.map-stat{ position:absolute; left:14px; bottom:12px; display:flex; gap:18px; pointer-events:none }
.map-stat div{ font:700 18px 'JetBrains Mono',monospace; font-variant-numeric:tabular-nums; color:var(--acc) }
.map-stat div span{ display:block; font:500 10px 'Geist',sans-serif; color:var(--t3); margin-top:2px }

/* KPI strip (no pane chrome — metrics breathe) */
.kpi-pane{ min-height:0 }
.kpis{ display:grid; grid-template-columns:repeat(4,1fr); gap:12px; height:100% }
.kpi{ background:var(--s1); border:1px solid var(--bd); border-radius:var(--pane-r); padding:12px 15px;
  display:flex; flex-direction:column; justify-content:center; cursor:pointer; transition:.15s }
.kpi:hover{ border-color:var(--bd2); transform:translateY(-1px) }
.kpi .l{ font-size:11px; color:var(--t3) }
.kpi .v{ font:700 26px 'JetBrains Mono',monospace; font-variant-numeric:tabular-nums; letter-spacing:-.02em; margin:3px 0; color:var(--t1) }
.kpi.h .v{ color:var(--hot) }
.kfoot{ display:flex; align-items:center; justify-content:space-between; gap:8px }
.kpi .d{ font:500 11px 'JetBrains Mono',monospace; color:var(--up) }
.kpi.h .d{ color:var(--hot) }
.kpi .spark{ width:64px; height:18px; flex-shrink:0; opacity:.8; stroke:var(--up) }
.kpi.h .spark{ stroke:var(--hot) }

/* AI 工作流 feed */
.feed{ padding:6px 0 }
.frow{ display:flex; gap:10px; align-items:flex-start; padding:9px 13px; cursor:pointer; transition:.12s;
  animation:browIn .32s cubic-bezier(.22,.61,.36,1) both }
.frow:hover{ background:var(--s2) }
.frow .fd{ width:6px; height:6px; border-radius:50%; margin-top:5px; flex-shrink:0 }
.frow .fd.acc{ background:var(--acc) } .frow .fd.up{ background:var(--up) }
.frow .fd.hot{ background:var(--hot) } .frow .fd.iris{ background:var(--iris) }
.frow .ft{ font-size:12px; color:var(--t2); line-height:1.5 }
.frow .ft :deep(b){ color:var(--t1); font-weight:600 }
.frow .fmeta{ margin-left:auto; display:flex; flex-direction:column; align-items:flex-end; gap:3px; flex-shrink:0 }
.frow .faction{ display:inline-flex; align-items:center; border:1px solid var(--acc-line); background:var(--acc-soft);
  color:var(--brand2,#1e5fd0); border-radius:6px; padding:2px 8px; font:600 10.5px 'Geist',sans-serif;
  white-space:nowrap; opacity:.72; transition:.15s }
.frow:hover .faction{ opacity:1; background:var(--brand); color:#ffffff; border-color:var(--brand) }
.frow .fa{ font:500 10px 'JetBrains Mono',monospace; color:var(--t3); white-space:nowrap }

/* 买家行 */
.buyers-pane .pane-b{ padding:0 }
.brow{ display:grid; grid-template-columns:1fr auto auto; gap:4px 10px; padding:11px 13px;
  grid-template-areas:"co mt connect" "bsub val connect"; align-items:center;
  border-bottom:1px solid var(--bd); cursor:pointer; transition:.12s;
  animation:browIn .32s cubic-bezier(.22,.61,.36,1) both }
@keyframes browIn{ from{ opacity:0; transform:translateY(7px) } to{ opacity:1; transform:none } }
@media (prefers-reduced-motion:reduce){ .brow{ animation:none } }
.brow:hover{ background:var(--s2) }
.brow .co{ grid-area:co; font-weight:600; font-size:12.5px; color:var(--t1); display:flex; align-items:center }
.brow .mt{ grid-area:mt; font:700 12px 'JetBrains Mono',monospace; color:var(--acc); text-align:right }
.brow .mt.mid{ color:var(--hot) }
.brow .bsub{ grid-area:bsub; font:500 11px 'JetBrains Mono',monospace; color:var(--t3) }
.brow .val{ grid-area:val; font:500 11px 'JetBrains Mono',monospace; color:var(--t2); text-align:right }
.cc{ display:inline-block; min-width:22px; padding:1px 4px; margin-right:8px; border-radius:4px;
  background:var(--s2); border:1px solid var(--bd); color:var(--t2);
  font:700 9.5px 'JetBrains Mono',monospace; letter-spacing:.04em; text-align:center }
/* 一键建联(行内常驻:默认低调可见=明确下一步,hover/选区时点亮) */
.brow .bconnect{ grid-area:connect; align-self:center; display:inline-flex; align-items:center; gap:4px;
  border:1px solid var(--acc-line); background:var(--acc-soft); color:var(--brand2,#1e5fd0);
  border-radius:7px; padding:5px 9px; font:600 11px 'Geist',sans-serif; cursor:pointer;
  white-space:nowrap; opacity:.72; transition:.15s }
.brow:hover .bconnect, .brow:focus-within .bconnect{ opacity:1 }
.brow .bconnect:hover{ background:var(--brand); color:#ffffff; border-color:var(--brand) }
.brow .bconnect:active{ transform:translateY(1px) scale(.98) }
.brow .bconnect svg{ width:13px; height:13px; stroke:currentColor; fill:none; stroke-width:1.8 }
/* 区域筛选 / 清除 */
.region-clear{ font:600 10.5px 'Geist',sans-serif; color:var(--acc); background:var(--acc-soft);
  border:1px solid var(--acc-line); border-radius:6px; padding:3px 9px; cursor:pointer; transition:.15s; white-space:nowrap }
.region-clear:hover{ background:var(--brand); color:#ffffff; border-color:var(--brand) }
/* 地图下钻提示 */
.map-hint{ position:absolute; right:14px; bottom:12px; font:500 10.5px 'Geist',sans-serif; color:var(--t3);
  pointer-events:none; background:rgba(255,255,255,.82); border:1px solid var(--bd); border-radius:7px; padding:4px 9px }
/* 空区域态 */
.bempty{ display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px;
  padding:48px 20px; text-align:center; color:var(--t3) }
.bempty svg{ width:30px; height:30px; stroke:var(--t-muted); fill:none; stroke-width:1.6; opacity:.5 }
.bempty div{ font-size:12px }
</style>
