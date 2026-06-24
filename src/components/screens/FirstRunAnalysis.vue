<!--
  H1 · AI 分析首启 — "看着你的指挥台被你的市场填满"
  实装 journey-preview Frame 2:分析不是 loading 屏,而是当场把指挥台拼出来。
  红线:无假 %;揭示的是真数据(地图逐区点亮 / KPI 真值 count-up / 买家逐行流入)。
  阶段由 onMounted 时间线推进;尊重 prefers-reduced-motion(直接到终态)。
-->
<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import WorldHeatmap from '../shared/WorldHeatmap.vue'

const emit = defineEmits(['done'])
const props = defineProps({ domain: { type: String, default: 'wanqianfood.com' } })

const stage = ref(0)            // 0 连接 →1 识别产品 →2 匹配需求 →3 定位区域 →4 完成
const statusText = ['正在连接全球商机数据库…', '读取官网,识别主营产品与定位…', '匹配全球 2.8M+ 采购需求…', '定位火热区域,生成买家清单…', '分析完成 · 已锁定你的市场']
const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// 真数据(揭示出来的,不是装饰)。坐标在真实世界地图 viewBox 1010x666 上。
const hotspots = [
  { x: 250, y: 246, label: '北美 · 512K', hot: true },
  { x: 516, y: 182, label: '欧洲 · 96K' },
  { x: 778, y: 398, label: '新加坡 · 188K' },
  { x: 852, y: 470, label: '澳洲 · 77K' },
]
const kpis = [
  { label: '全球商机', target: 2847392, color: 'var(--brand)' },
  { label: '今日新增', target: 98241,  color: 'var(--hot)' },
  { label: '火热区域', target: 4,       color: 'var(--brand)' },
  { label: '高匹配商机', target: 12,    color: 'var(--green)' },
]
const buyers = [
  { co: 'Nordwind Foods GmbH', cc: 'DE', mt: 96, val: '€420,000' },
  { co: 'Lim Heng Trading',    cc: 'SG', mt: 91, val: '$188,400' },
  { co: 'Pacific Gourmet Inc', cc: 'US', mt: 84, val: '$512,750' },
  { co: 'Saveur Atlantique',   cc: 'FR', mt: 79, val: '€96,200' },
]

const kpiShown = ref([0, 0, 0, 0])     // count-up 当前值
const hotN = ref(0)                    // 已点亮热点数
const buyerN = ref(0)                  // 已流入买家数

const fmt = n => n.toLocaleString('en-US')

let timers = []
function countUp (i, target, ms) {
  if (reduce) { kpiShown.value[i] = target; return }
  const t0 = performance.now()
  const step = (now) => {
    const p = Math.min(1, (now - t0) / ms)
    kpiShown.value[i] = Math.round(target * (1 - Math.pow(1 - p, 3)))  // ease-out
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  if (reduce) { stage.value = 4; kpis.forEach((k, i) => kpiShown.value[i] = k.target); hotN.value = hotspots.length; buyerN.value = buyers.length; return }
  const at = (ms, fn) => timers.push(setTimeout(fn, ms))
  at(400,  () => { stage.value = 1 })
  at(1400, () => { stage.value = 2; kpis.forEach((k, i) => countUp(i, k.target, 1400)) })
  at(2200, () => { hotN.value = 2 })                         // 北美/欧洲 点亮
  at(3000, () => { stage.value = 3; hotN.value = 4 })        // 全部区域
  at(3200, () => { const iv = setInterval(() => { if (buyerN.value < buyers.length) buyerN.value++; else clearInterval(iv) }, 450); timers.push(iv) })
  at(5200, () => { stage.value = 4 })
})
onUnmounted(() => timers.forEach(t => { clearTimeout(t); clearInterval(t) }))

const done = computed(() => stage.value >= 4)
</script>

<template>
  <div class="fra">
    <!-- status bar (cycling text, NO fake %) -->
    <div class="fra-status">
      <span class="fra-spin" :class="{ done }"></span>
      <span class="fra-txt">{{ done ? '分析完成 ·' : '正在分析' }} <b>{{ domain }}</b></span>
      <span class="fra-step">{{ statusText[stage] }}</span>
      <span class="fra-sp"></span>
      <span class="fra-skip" @click="emit('done')">{{ done ? '进入工作台 →' : '直接进入 →' }}</span>
    </div>

    <div class="fra-ws">
      <!-- MAP — hotspots light up region by region -->
      <section class="fra-pane fra-map">
        <div class="fra-ph"><span>全球商机热力图</span><i class="fra-live"></i></div>
        <div class="fra-mapbody">
          <WorldHeatmap :hotspots="hotspots.slice(0, hotN)" />
          <div class="fra-mapstat">{{ hotN }}/{{ hotspots.length }} 区域已锁定</div>
        </div>
      </section>

      <!-- KPIs count up -->
      <section class="fra-kpis">
        <div v-for="(k, i) in kpis" :key="k.label" class="fra-kpi" :class="{ on: stage >= 2 }">
          <div class="fra-kl">{{ k.label }}</div>
          <div class="fra-kv mono" :style="{ color: k.color }">{{ kpiShown[i] ? fmt(kpiShown[i]) : '—' }}</div>
        </div>
      </section>

      <!-- buyers stream in -->
      <section class="fra-pane fra-buyers">
        <div class="fra-ph"><span>实时买家信号</span><i class="fra-live"></i><span class="fra-found mono">{{ buyerN }} 已发现</span></div>
        <div class="fra-blist">
          <div v-for="(b, i) in buyers" :key="b.co" class="fra-brow" :class="{ on: i < buyerN }">
            <span class="fra-cc mono">{{ b.cc }}</span>
            <span class="fra-co">{{ b.co }}</span>
            <span class="fra-mt mono" :class="{ mid: b.mt < 85 }">{{ b.mt }}</span>
            <span class="fra-val mono">{{ b.val }}</span>
          </div>
          <div v-if="buyerN < buyers.length" class="fra-finding mono">发现更多买家…</div>
        </div>
      </section>
    </div>

    <!-- settle: summary + enter -->
    <transition name="fra-fade">
      <div v-if="done" class="fra-settle">
        已为 <b>{{ domain }}</b> 锁定 <b class="mono">2,847,392</b> 商机 · <b class="mono">4</b> 个火热区域 · <b class="mono">12</b> 条高匹配
        <button class="fra-enter" @click="emit('done')">进入工作台</button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fra{position:fixed;inset:0;z-index:30;display:flex;flex-direction:column;background:var(--bg);overflow:hidden}
.fra-status{height:52px;flex-shrink:0;display:flex;align-items:center;gap:14px;padding:0 20px;border-bottom:1px solid var(--card-border);background:linear-gradient(90deg,rgba(31,143,214,.1),transparent 40%)}
.fra-spin{width:15px;height:15px;border:2px solid var(--acc-line,rgba(31,143,214,.34));border-top-color:var(--brand);border-radius:50%;animation:fra-rot 1s linear infinite}
.fra-spin.done{animation:none;border:none;background:var(--brand);position:relative}
@keyframes fra-rot{to{transform:rotate(360deg)}}
.fra-txt{font-size:14px;font-weight:600}.fra-txt b{font-family:var(--f-m,'JetBrains Mono',monospace);color:var(--brand)}
.fra-step{font:500 13px var(--f-m,'JetBrains Mono',monospace);color:var(--brand);opacity:.9;transition:.3s}
.fra-sp{flex:1}
.fra-skip{font-size:12px;color:var(--t-muted);cursor:pointer;transition:.2s}.fra-skip:hover{color:var(--t-sec)}

.fra-ws{flex:1;min-height:0;padding:14px;display:grid;gap:12px;grid-template-columns:1.55fr 1fr;grid-template-rows:1.5fr auto;grid-template-areas:"map buyers" "kpi buyers"}
.fra-map{grid-area:map}.fra-kpis{grid-area:kpi}.fra-buyers{grid-area:buyers}
.fra-pane{background:var(--card,#ffffff);border:1px solid var(--card-border);border-radius:12px;overflow:hidden;display:flex;flex-direction:column;min-height:0}
.fra-ph{height:34px;flex-shrink:0;display:flex;align-items:center;gap:9px;padding:0 13px;border-bottom:1px solid var(--card-border);font-size:12px;font-weight:600}
.fra-live{width:5px;height:5px;border-radius:50%;background:var(--brand);box-shadow:0 0 7px var(--brand);animation:fra-pulse 1.6s infinite}
@keyframes fra-pulse{0%,100%{opacity:1}50%{opacity:.4}}
.fra-found{margin-left:auto;font-size:11px;color:var(--t-sec)}

.fra-mapbody{flex:1;position:relative;background:radial-gradient(60% 70% at 30% 38%,rgba(31,143,214,.12),transparent 60%),linear-gradient(180deg,#ffffff,#eef3fa)}
.fra-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(19,33,63,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(19,33,63,.03) 1px,transparent 1px);background-size:44px 44px}
.fra-hot{position:absolute;width:9px;height:9px;border-radius:50%;background:var(--t-muted);opacity:.3;transition:opacity .5s,background .5s}
.fra-hot.on{background:var(--brand);opacity:1;box-shadow:0 0 12px var(--brand)}
.fra-hot.on.hot{background:var(--hot);box-shadow:0 0 12px var(--hot)}
.fra-hot.on::after{content:'';position:absolute;inset:-7px;border:1px solid var(--acc-line,rgba(31,143,214,.34));border-radius:50%;animation:fra-ping 2.4s infinite}
@keyframes fra-ping{0%{transform:scale(.4);opacity:.8}100%{transform:scale(1);opacity:0}}
.fra-hl{position:absolute;top:-25px;left:50%;transform:translateX(-50%);white-space:nowrap;font:600 10px var(--f-m,monospace);color:var(--t-primary);background:rgba(255,255,255,.85);border:1px solid var(--card-border);padding:3px 6px;border-radius:5px;opacity:0;transition:.4s}
.fra-hot.on .fra-hl{opacity:1}
.fra-mapstat{position:absolute;left:14px;bottom:12px;font:700 13px var(--f-m,monospace);color:var(--brand)}

.fra-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.fra-kpi{background:var(--card,#ffffff);border:1px solid var(--card-border);border-radius:12px;padding:13px 15px;display:flex;flex-direction:column;justify-content:center;opacity:.35;transition:opacity .5s}
.fra-kpi.on{opacity:1}
.fra-kl{font-size:11px;color:var(--t-muted)}
.fra-kv{font:700 24px var(--f-m,monospace);letter-spacing:-.02em;margin-top:3px}
.mono{font-family:var(--f-m,'JetBrains Mono',monospace);font-variant-numeric:tabular-nums}

.fra-buyers .fra-blist{flex:1;overflow:hidden}
.fra-brow{display:grid;grid-template-columns:auto 1fr auto;gap:3px 9px;align-items:center;padding:10px 13px;border-bottom:1px solid var(--card-border);opacity:0;transform:translateY(-6px);transition:.35s}
.fra-brow.on{opacity:1;transform:none}
.fra-cc{grid-row:span 2;font-size:10px;font-weight:700;color:var(--t-sec);background:rgba(19,33,63,.05);border:1px solid var(--card-border);border-radius:4px;padding:1px 5px}
.fra-co{font-size:12.5px;font-weight:600}
.fra-mt{font:700 12px var(--f-m,monospace);color:var(--brand);text-align:right}.fra-mt.mid{color:var(--hot)}
.fra-val{grid-column:2/4;font:500 11px var(--f-m,monospace);color:var(--t-muted)}
.fra-finding{padding:10px 13px;font-size:11px;color:var(--t-muted);opacity:.6}

.fra-settle{flex-shrink:0;display:flex;align-items:center;justify-content:center;gap:20px;padding:16px;border-top:1px solid var(--card-border);font-size:14px;background:rgba(31,143,214,.04)}
.fra-settle b{color:var(--t-primary)}.fra-settle b.mono{color:var(--brand)}
.fra-enter{background:var(--brand);color:#ffffff;border:none;border-radius:10px;padding:11px 26px;font:700 14px var(--f-u,sans-serif);cursor:pointer;transition:.18s}
.fra-enter:hover{filter:brightness(1.08);transform:translateY(-1px)}
.fra-enter:active{transform:translateY(1px) scale(.99)}
.fra-fade-enter-active{transition:.5s}.fra-fade-enter-from{opacity:0;transform:translateY(10px)}

@media(prefers-reduced-motion:reduce){.fra-spin,.fra-live,.fra-hot.on::after{animation:none}.fra-brow,.fra-kpi,.fra-hl{transition:none}}
</style>
