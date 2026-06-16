<!--
  Page — 工作台 dashboard · 多窗格指挥台 (R012)
  地图常驻为主角 + KPI 条 + AI 工作流 feed + 右侧实时买家整列。
  布局取自 ../../../layout-preview.html,配色换 Phosphor 令牌(cyan 已退役)。
  注:旧的 #ai-daily-report / #ai-report-list / #today-todo-list 面板已并入本页
  数据驱动的 feed/buyers,legacy 渲染器有 if(!el) return 守卫,不会报错。
-->
<script setup>
import WorldHeatmap from '../shared/WorldHeatmap.vue'
const nav = (p) => window.navTo?.(p)

// 真实世界地图热点(viewBox 1010x666 上的近似地理坐标)
const mapHotspots = [
  { x: 250, y: 246, label: '北美 · 512K', hot: true },
  { x: 516, y: 182, label: '欧洲 · 96K' },
  { x: 600, y: 286, label: '中东 · 64K' },
  { x: 778, y: 398, label: '新加坡 · 188K' },
  { x: 852, y: 470, label: '澳洲 · 77K' },
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
  { tone: 'acc',  html: 'AI 搜索引擎新推送 <b>23 条</b>东南亚超市采购线索', at: '刚刚',   page: 'intel' },
  { tone: 'up',   html: '<b>Fairprice Group</b> 回复了产品目录请求，建议跟进', at: '2分钟',  page: 'whatsapp' },
  { tone: 'hot',  html: 'AI 已自动生成 <b>7 封</b>个性化邮件，待审批',        at: '8分钟',  page: 'marketing' },
  { tone: 'iris', html: '情报中心更新<b>德国</b>市场季度采购报告',            at: '14分钟', page: 'intel' },
  { tone: 'acc',  html: 'ICP Agent 识别出 <b>5 家</b>高匹配新目标客户',        at: '27分钟', page: 'leads' },
]
// 实时买家信号(右侧常驻整列)
const buyers = [
  { cc: 'DE', co: 'Nordwind Foods GmbH', mt: 96, sub: '德国 · 2分钟前',   val: '€420,000' },
  { cc: 'SG', co: 'Lim Heng Trading',    mt: 91, sub: '新加坡 · 14分钟前', val: '$188,400' },
  { cc: 'US', co: 'Pacific Gourmet Inc', mt: 84, sub: '美国 · 31分钟前',  val: '$512,750', mid: true },
  { cc: 'FR', co: 'Saveur Atlantique',   mt: 79, sub: '法国 · 1小时前',   val: '€96,200',  mid: true },
  { cc: 'MY', co: 'Jaya Grocer Bhd',     mt: 88, sub: '马来西亚 · 1小时前', val: '$142,000' },
  { cc: 'US', co: '99 Ranch Market',     mt: 87, sub: '美国 · 2小时前',   val: '$331,500' },
  { cc: 'TH', co: 'Central Food Hall',   mt: 82, sub: '泰国 · 3小时前',   val: '$77,800',  mid: true },
  { cc: 'ID', co: 'Transmart Carrefour', mt: 80, sub: '印尼 · 4小时前',   val: '$120,400', mid: true },
]
</script>

<template>
  <div class="page on dash-cc" id="page-dashboard">
    <div class="cc-bar">
      <div class="cc-greet">早上好，<em>Liu Wei</em></div>
      <div class="cc-sub">今天是 2026年6月14日 · 今日新增 98,241 条采购需求，已为您筛选 12 条高匹配商机</div>
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
          <div class="cc-map"><WorldHeatmap :hotspots="mapHotspots" /></div>
          <div class="map-stat">
            <div>2,847,392<span>全球商机</span></div>
            <div>98,241<span>今日新增</span></div>
            <div>5<span>区域火热</span></div>
          </div>
        </div>
      </section>

      <!-- KPI strip -->
      <section class="kpi-pane">
        <div class="kpis">
          <div class="kpi" :class="{ h: k.hot }" v-for="k in kpis" :key="k.label" @click="nav(k.page)">
            <div class="l">{{ k.label }}</div>
            <div class="v">{{ k.value }}</div>
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
            <div class="frow" v-for="(f, i) in feed" :key="i" @click="nav(f.page)">
              <span class="fd" :class="f.tone"></span>
              <span class="ft" v-html="f.html"></span>
              <span class="fa">{{ f.at }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- BUYERS (live, full height) -->
      <section class="pane buyers-pane">
        <div class="pane-h">
          <span class="t">实时买家信号</span>
          <span class="live"><i></i>5 区域</span>
          <span class="sp"></span>
          <div class="seg"><b class="on">匹配度</b><b>时间</b></div>
        </div>
        <div class="pane-b">
          <div class="brow" v-for="(b, i) in buyers" :key="i" @click="nav('whatsapp')">
            <div class="co"><span class="cc mono">{{ b.cc }}</span>{{ b.co }}</div>
            <div class="mt mono" :class="{ mid: b.mid }">{{ b.mt }}</div>
            <div class="bsub mono">{{ b.sub }}</div>
            <div class="val mono">{{ b.val }}</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* 令牌桥:把 preview 的 Signal-Room 名映射到 Phosphor 全局令牌(cyan 退役) */
.dash-cc{
  --acc:var(--brand); --acc-soft:rgba(245,183,61,.13); --acc-line:rgba(245,183,61,.34);
  --hot:#ff7a3d; --up:var(--green); --iris:#6b78ff;
  --s1:var(--bg2); --s2:var(--bg3); --bd:var(--card-border); --bd2:rgba(255,248,235,.14);
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

/* 多窗格工作区网格 */
.ws{ flex:1; min-height:0; display:grid; gap:12px;
  grid-template-columns:1.55fr 1fr;
  grid-template-rows:minmax(0,1.5fr) auto minmax(0,1fr);
  grid-template-areas:"map buyers" "kpi buyers" "tasks buyers"; }
.map-pane{ grid-area:map } .kpi-pane{ grid-area:kpi } .tasks-pane{ grid-area:tasks } .buyers-pane{ grid-area:buyers }

/* 面板(终端窗口) */
.pane{ background:var(--s1); border:1px solid var(--bd); border-radius:var(--pane-r); overflow:hidden;
  display:flex; flex-direction:column; min-height:0; box-shadow:inset 0 1px 0 rgba(255,248,235,.04) }
.pane-h{ height:34px; flex-shrink:0; display:flex; align-items:center; gap:9px; padding:0 13px;
  border-bottom:1px solid var(--bd); background:rgba(255,248,235,.015) }
.pane-h .t{ font-size:12px; font-weight:600; letter-spacing:.01em; color:var(--t1) }
.pane-h .live{ font:600 10px/1 'JetBrains Mono',monospace; letter-spacing:.12em; color:var(--acc);
  display:flex; align-items:center; gap:5px; text-transform:uppercase }
.pane-h .live i{ width:5px; height:5px; border-radius:50%; background:var(--acc); box-shadow:0 0 7px var(--acc); animation:cc-pulse 1.8s infinite }
.pane-h .sp{ flex:1 }
.pane-h .seg{ display:flex; gap:2px; background:var(--s2); border-radius:7px; padding:2px }
.pane-h .seg b{ font:500 10.5px 'Geist',sans-serif; color:var(--t3); padding:3px 8px; border-radius:5px; cursor:pointer; transition:.15s }
.pane-h .seg b.on{ background:var(--acc-soft); color:var(--acc) }
.pane-b{ flex:1; min-height:0; overflow:auto; position:relative }
.pane-b::-webkit-scrollbar{ width:5px } .pane-b::-webkit-scrollbar-thumb{ background:rgba(255,248,235,.1); border-radius:3px }
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
.frow{ display:flex; gap:10px; align-items:flex-start; padding:9px 13px; cursor:pointer; transition:.12s }
.frow:hover{ background:var(--s2) }
.frow .fd{ width:6px; height:6px; border-radius:50%; margin-top:5px; flex-shrink:0 }
.frow .fd.acc{ background:var(--acc) } .frow .fd.up{ background:var(--up) }
.frow .fd.hot{ background:var(--hot) } .frow .fd.iris{ background:var(--iris) }
.frow .ft{ font-size:12px; color:var(--t2); line-height:1.5 }
.frow .ft :deep(b){ color:var(--t1); font-weight:600 }
.frow .fa{ margin-left:auto; font:500 10px 'JetBrains Mono',monospace; color:var(--t3); white-space:nowrap; flex-shrink:0 }

/* 买家行 */
.buyers-pane .pane-b{ padding:0 }
.brow{ display:grid; grid-template-columns:1fr auto; gap:4px 10px; padding:11px 13px;
  border-bottom:1px solid var(--bd); cursor:pointer; transition:.12s }
.brow:hover{ background:var(--s2) }
.brow .co{ font-weight:600; font-size:12.5px; color:var(--t1); display:flex; align-items:center }
.brow .mt{ font:700 12px 'JetBrains Mono',monospace; color:var(--acc); text-align:right }
.brow .mt.mid{ color:var(--hot) }
.brow .bsub{ font:500 11px 'JetBrains Mono',monospace; color:var(--t3) }
.brow .val{ font:500 11px 'JetBrains Mono',monospace; color:var(--t2); text-align:right }
.cc{ display:inline-block; min-width:22px; padding:1px 4px; margin-right:8px; border-radius:4px;
  background:var(--s2); border:1px solid var(--bd); color:var(--t2);
  font:700 9.5px 'JetBrains Mono',monospace; letter-spacing:.04em; text-align:center }
</style>
