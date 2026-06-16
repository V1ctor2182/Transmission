<!--
  Page — 工作台 dashboard
  Faithful extract from index (31).html (L1085-1350). NOT yet idiomatic Vue.
  REWRITE: convert onclick="fn(...)" → @click, lift state into <script setup>.
  AI-flavor audit: see REFACTOR-NOTES.md.
-->
<script setup>
import WorldHeatmap from '../shared/WorldHeatmap.vue'
// 工作台 KPI:数据驱动,去 emoji 图标/发光,数字配迷你 sparkline,delta 用 + 不用 ▲。
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
  { label: '全球商机总数', value: '2,847,392', delta: '+3.2% 较昨日',  color: 'var(--brand2)', page: 'intel',     spark: [12,14,13,16,18,17,21,24] },
  { label: '今日新增需求', value: '98,241',    delta: '+12.7% 较昨日', color: 'var(--hot)',    page: 'intel',     spark: [8,9,11,10,13,15,19,23] },
  { label: '已建联采购商', value: '1,284',     delta: '+5.1% 本月',    color: 'var(--green)',  page: 'whatsapp',  spark: [20,21,22,24,25,27,29,31] },
  { label: 'EDM 触达人数', value: '3,847',     delta: '+8.9% 本月',    color: 'var(--amber)',  page: 'marketing', spark: [14,15,17,16,19,22,24,28] },
]
function sparkPath (d) {
  const w = 72, h = 22, max = Math.max(...d), min = Math.min(...d), rng = (max - min) || 1
  return d.map((v, i) => `${i ? 'L' : 'M'}${(i / (d.length - 1) * w).toFixed(1)},${(h - (v - min) / rng * h).toFixed(1)}`).join(' ')
}
</script>

<template>
      <div class="page on" id="page-dashboard">
        <div class="dash-header">
          <div class="dash-greeting">早上好，<em>Liu Wei</em></div>
          <div class="dash-date">今天是 2026年6月14日 · 今日新增 98,241 条采购需求，已为您筛选 12 条高匹配商机</div>
        </div>
        <div class="kpi-grid">
          <div class="kpi-card" v-for="k in kpis" :key="k.label" @click="nav(k.page)">
            <div class="kpi-label">{{ k.label }}</div>
            <div class="kpi-value" :style="{ color: k.color }">{{ k.value }}</div>
            <div class="kpi-foot">
              <span class="kpi-delta">{{ k.delta }}</span>
              <svg class="kpi-spark" viewBox="0 0 72 24" preserveAspectRatio="none" aria-hidden="true">
                <path :d="sparkPath(k.spark)" :stroke="k.color" fill="none" stroke-width="1.6" vector-effect="non-scaling-stroke"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="dash-grid">
          <!-- Night map -->
          <div class="panel">
            <div class="panel-head">
              <div class="panel-title">全球商机热力图</div>
              <div class="panel-live">实时</div>
              <div class="panel-spacer"></div>
              <div class="panel-filter">
                <div class="pf-btn on" onclick="setPf(this)">全部</div>
                <div class="pf-btn" onclick="setPf(this)">食品</div>
                <div class="pf-btn" onclick="setPf(this)">东南亚</div>
                <div class="pf-btn" onclick="setPf(this)">北美</div>
              </div>
            </div>
            <div class="map-container">
              <div class="night-map" style="height:280px">
                <WorldHeatmap :hotspots="mapHotspots" />
              </div>
            </div>
          </div>
          <!-- AI Today Work Report -->
          <div class="panel">
            <div class="panel-head">
              <div class="panel-title">AI 今日工作报告</div>
              <div style="font-size:10px;color:var(--t-muted);margin-left:auto">06月14日 · 09:31 更新</div>
            </div>
            <div id="ai-daily-report" style="display:flex;flex-direction:column;gap:6px;padding:4px 0"></div>
          </div>
        </div>
        <div class="dash-bottom">
          <!-- AI Today Report -->
          <div class="mini-panel" style="flex:1.2">
            <div class="mini-title" style="color:#ffd27a">
              <svg viewBox="0 0 24 24" style="width:14px;height:14px"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm-1-5h2v2h-2zm0-8h2v6h-2z"/></svg>
              AI 今日工作报告
              <span style="margin-left:auto;font-size:10px;font-weight:400;color:var(--t-muted)">06月14日 更新于 09:31</span>
            </div>
            <div id="ai-report-list" style="display:flex;flex-direction:column;gap:8px;margin-top:4px"></div>
          </div>
          <!-- Today Todo -->
          <div class="mini-panel" style="flex:1.6">
            <div class="mini-title" style="color:#ffd27a">
              <svg viewBox="0 0 24 24" style="width:14px;height:14px"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              今日待办
              <span style="margin-left:auto;font-size:10px;color:var(--t-muted);font-weight:400">5 项</span>
            </div>
            <div id="today-todo-list" style="display:flex;flex-direction:column;gap:6px;margin-top:4px"></div>
          </div>
        </div>
      </div>

      <!-- CUSTOMER POOL PAGE -->
</template>

<style scoped>
.kpi-foot{ display:flex; align-items:center; justify-content:space-between; gap:8px; margin-top:8px }
.kpi-delta{ font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--green) }
.kpi-spark{ width:72px; height:22px; flex-shrink:0; opacity:.85 }
</style>
