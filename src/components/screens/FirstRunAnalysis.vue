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
const statusText = ['Connecting to the global demand database…', 'Reading your site — identifying products & positioning…', 'Matching against 2.8M+ global purchasing signals…', 'Locating hot regions, building your buyer list…', 'Analysis complete · your market is locked in']
const steps = ['Connect', 'Identify', 'Match', 'Locate', 'Complete']   // 拼装进度脊(随 stage 逐段点亮,真实阶段非假 %)
const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// 真数据(揭示出来的,不是装饰)。坐标 + 量级与工作台地图一致(万仟出海剧本:东南亚 T1 最热)。
const hotspots = [
  { x: 778, y: 398, label: 'SE Asia · 512K', hot: true, region: 'SE' },  // T1 首选,与工作台一致
  { x: 250, y: 246, label: 'N. America · 188K', region: 'NA' },
  { x: 516, y: 182, label: 'Europe · 96K', region: 'EU' },
  { x: 852, y: 470, label: 'Oceania · 77K', region: 'OC' },
]
const kpis = [
  { label: 'Global demand',   target: 2847392, color: 'var(--brand)' },
  { label: 'New today',       target: 98241,  color: 'var(--hot)' },
  { label: 'Hot regions',     target: 4,       color: 'var(--brand)' },
  { label: 'High-match leads', target: 12,    color: 'var(--green)' },
]
// 与工作台「实时买家信号」一致 = 万仟剧本点名的真实华人超市渠道(开头揭示的就是稍后落到工作台的买家)
const buyers = [
  { co: 'Fairprice Group',   cc: 'SG', mt: 96, val: '$188,400', region: 'SE' },
  { co: 'Jaya Grocer Bhd',   cc: 'MY', mt: 93, val: '$142,000', region: 'SE' },
  { co: 'T&T Supermarket',   cc: 'CA', mt: 91, val: '$204,000', region: 'NA' },
  { co: '99 Ranch Market',   cc: 'US', mt: 89, val: '$331,500', region: 'NA' },
]

const kpiShown = ref([0, 0, 0, 0])     // count-up 当前值
const kpiOn = ref([false, false, false, false])  // 逐个点亮(拼装感)
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
  if (reduce) { stage.value = 4; kpis.forEach((k, i) => { kpiShown.value[i] = k.target; kpiOn.value[i] = true }); hotN.value = hotspots.length; buyerN.value = buyers.length; pipelineShown.value = pipelineTotal; return }
  const at = (ms, fn) => timers.push(setTimeout(fn, ms))
  at(400,  () => { stage.value = 1 })
  // KPI 逐个点亮 + count-up(左→右,拼装感)
  at(1400, () => { stage.value = 2 })
  kpis.forEach((k, i) => at(1400 + i * 180, () => { kpiOn.value[i] = true; countUp(i, k.target, 1200) }))
  // 热点逐区锁定(一个一个亮,非批量)—— 东南亚(热)先,再北美/欧洲/澳洲
  hotspots.forEach((h, i) => at(2000 + i * 340, () => { hotN.value = i + 1 }))
  at(3000, () => { stage.value = 3 })
  at(3300, () => { const iv = setInterval(() => { if (buyerN.value < buyers.length) buyerN.value++; else clearInterval(iv) }, 450); timers.push(iv) })
  at(5300, () => { stage.value = 4; countUpPipeline() })   // settle:潜在采购额数字滚入(希望高潮)
})
onUnmounted(() => timers.forEach(t => { clearTimeout(t); clearInterval(t) }))

const done = computed(() => stage.value >= 4)
// 买家流入时,聚光其来源区域(地图随到货响应:hot regions → buyers from them);完成后清空,settle 时各区平权
const streamingRegion = computed(() => (done.value || buyerN.value === 0) ? null : buyers[buyerN.value - 1].region)
// 首批买家潜在采购额(真实求和这几个买家的 val,非编造)。当前数据均为 USD。
const pipelineTotal = buyers.reduce((s, b) => s + parseInt(b.val.replace(/[^0-9]/g, ''), 10), 0)
const pipelineShown = ref(0)
const pipeline = computed(() => '$' + pipelineShown.value.toLocaleString('en-US'))
function countUpPipeline (ms = 900) {
  if (reduce) { pipelineShown.value = pipelineTotal; return }
  const t0 = performance.now()
  const step = (now) => {
    const p = Math.min(1, (now - t0) / ms)
    pipelineShown.value = Math.round(pipelineTotal * (1 - Math.pow(1 - p, 3)))  // ease-out
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}
</script>

<template>
  <div class="fra">
    <!-- status bar (cycling text, NO fake %) -->
    <div class="fra-status">
      <img class="fra-brand" src="/logo-mark.svg" alt="TRANS·MISSION" />
      <span class="fra-spin" :class="{ done }"></span>
      <span class="fra-txt">{{ done ? 'Analysis complete ·' : 'Analyzing' }} <b>{{ domain }}</b></span>
      <span class="fra-step">{{ statusText[stage] }}</span>
      <span class="fra-sp"></span>
      <span class="fra-skip" @click="emit('done')">{{ done ? 'Enter workspace →' : 'Skip →' }}</span>
    </div>

    <!-- 拼装进度脊:5 阶段逐段点亮(mission-control assembly,真实 stage 驱动);完成时一道「全锁定」收束扫光 -->
    <div class="fra-pipe" :class="{ locked: done }">
      <template v-for="(lbl, i) in steps" :key="lbl">
        <div class="fra-pstep" :class="{ done: i < stage, active: i === stage }"><span class="fra-pdot"></span>{{ lbl }}</div>
        <div v-if="i < steps.length - 1" class="fra-pline" :class="{ done: i < stage }"></div>
      </template>
    </div>

    <div class="fra-ws">
      <!-- MAP — hotspots light up region by region -->
      <section class="fra-pane fra-map">
        <div class="fra-ph"><span>Global demand heatmap</span><i class="fra-live"></i></div>
        <div class="fra-mapbody">
          <div class="fra-grid"></div>
          <div v-if="!done" class="fra-scan"></div>
          <WorldHeatmap :hotspots="hotspots.slice(0, hotN)" :highlight="streamingRegion" />
          <div class="fra-mapstat">{{ hotN }}/{{ hotspots.length }} regions locked</div>
        </div>
      </section>

      <!-- KPIs count up -->
      <section class="fra-kpis">
        <div v-for="(k, i) in kpis" :key="k.label" class="fra-kpi" :class="{ on: kpiOn[i] }">
          <div class="fra-kl">{{ k.label }}</div>
          <div class="fra-kv mono" :style="{ color: k.color }">{{ kpiShown[i] ? fmt(kpiShown[i]) : '—' }}</div>
        </div>
      </section>

      <!-- buyers stream in -->
      <section class="fra-pane fra-buyers">
        <div class="fra-ph"><span>Live buyer signals</span><i class="fra-live"></i><span class="fra-found mono">{{ buyerN }} found</span></div>
        <div class="fra-blist">
          <div v-for="(b, i) in buyers" :key="b.co" class="fra-brow" :class="{ on: i < buyerN }">
            <span class="fra-cc mono">{{ b.cc }}</span>
            <span class="fra-co">{{ b.co }}</span>
            <span class="fra-mt mono" :class="{ mid: b.mt < 85 }">{{ b.mt }}</span>
            <span class="fra-val mono">{{ b.val }}</span>
          </div>
          <div v-if="buyerN < buyers.length" class="fra-finding mono">finding more buyers…</div>
        </div>
      </section>
    </div>

    <!-- settle: summary + enter -->
    <transition name="fra-fade">
      <div v-if="done" class="fra-settle">
        Locked in <b class="mono">2,847,392</b> opportunities for <b>{{ domain }}</b> · <b class="mono">12</b> high-match · first <b class="mono">{{ buyers.length }}</b> buyers worth <b class="mono pipeline">{{ pipeline }}</b> in potential purchasing
        <button class="fra-enter" @click="emit('done')">Enter workspace</button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fra{position:fixed;inset:0;z-index:30;display:flex;flex-direction:column;background:var(--bg);overflow:hidden}
.fra-status{height:52px;flex-shrink:0;display:flex;align-items:center;gap:14px;padding:0 20px;border-bottom:1px solid var(--card-border);background:linear-gradient(90deg,rgba(31,143,214,.1),transparent 40%)}
.fra-brand{height:22px;width:auto;flex-shrink:0;display:block}
.fra-spin{width:15px;height:15px;border:2px solid var(--acc-line,rgba(31,143,214,.34));border-top-color:var(--brand);border-radius:50%;animation:fra-rot 1s linear infinite}
.fra-spin.done{animation:none;border:none;background:var(--brand);position:relative}
@keyframes fra-rot{to{transform:rotate(360deg)}}
.fra-txt{font-size:14px;font-weight:600}.fra-txt b{font-family:var(--f-m,'JetBrains Mono',monospace);color:var(--brand)}
.fra-step{font:500 13px var(--f-m,'JetBrains Mono',monospace);color:var(--brand);opacity:.9;transition:.3s}
.fra-sp{flex:1}
.fra-skip{font-size:12px;color:var(--t-muted);cursor:pointer;transition:.2s}.fra-skip:hover{color:var(--t-sec)}

/* 拼装进度脊(stage 逐段点亮,真实阶段;mission-control / 游戏进度感) */
.fra-pipe{position:relative;overflow:hidden;flex-shrink:0;display:flex;align-items:center;gap:10px;padding:9px 20px;border-bottom:1px solid var(--card-border);background:rgba(31,143,214,.02)}
/* 完成「全锁定」收束:一道 azure 扫光掠过整条脊(systems locked,一次性) */
.fra-pipe.locked::after{content:'';position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(90deg,transparent,rgba(31,143,214,.22) 45%,rgba(47,159,224,.28) 50%,transparent 55%);
  transform:translateX(-100%);animation:fra-pipe-sweep .9s cubic-bezier(.4,0,.2,1) 1}
@keyframes fra-pipe-sweep{to{transform:translateX(100%)}}
.fra-pstep{display:flex;align-items:center;gap:6px;font:600 11px var(--f-m,'JetBrains Mono',monospace);letter-spacing:.02em;color:var(--t-muted);transition:color .3s;white-space:nowrap}
.fra-pstep .fra-pdot{width:6px;height:6px;border-radius:50%;background:currentColor;opacity:.4;transition:.3s}
.fra-pstep.done{color:var(--brand)}
.fra-pstep.done .fra-pdot{opacity:1;background:var(--brand)}
.fra-pstep.active{color:var(--brand2)}
.fra-pstep.active .fra-pdot{opacity:1;background:var(--brand2);box-shadow:0 0 7px var(--brand2);animation:fra-pulse 1.2s infinite}
.fra-pline{flex:1;height:1px;background:var(--card-border);transition:background .45s}
.fra-pline.done{background:var(--brand)}

.fra-ws{flex:1;min-height:0;padding:14px;display:grid;gap:12px;grid-template-columns:1.55fr 1fr;grid-template-rows:1.5fr auto;grid-template-areas:"map buyers" "kpi buyers"}
.fra-map{grid-area:map}.fra-kpis{grid-area:kpi}.fra-buyers{grid-area:buyers}
.fra-pane{background:var(--card,#ffffff);border:1px solid var(--card-border);border-radius:12px;overflow:hidden;display:flex;flex-direction:column;min-height:0}
.fra-ph{height:34px;flex-shrink:0;display:flex;align-items:center;gap:9px;padding:0 13px;border-bottom:1px solid var(--card-border);font-size:12px;font-weight:600}
.fra-live{width:5px;height:5px;border-radius:50%;background:var(--brand);box-shadow:0 0 7px var(--brand);animation:fra-pulse 1.6s infinite}
@keyframes fra-pulse{0%,100%{opacity:1}50%{opacity:.4}}
.fra-found{margin-left:auto;font-size:11px;color:var(--t-sec)}

.fra-mapbody{flex:1;position:relative;background:radial-gradient(60% 70% at 30% 38%,rgba(31,143,214,.12),transparent 60%),linear-gradient(180deg,#ffffff,#eef3fa)}
.fra-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(19,33,63,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(19,33,63,.03) 1px,transparent 1px);background-size:44px 44px}
/* 雷达扫描扇区(分析中转,呼应 Signal Room;克制 .14 azure,完成即移除)*/
/* radar sweep: bright leading edge → trailing afterglow (proper sonar sweep, echoes login orbit) */
.fra-scan{position:absolute;inset:0;pointer-events:none;
  background:conic-gradient(from 0deg at 50% 50%, rgba(31,143,214,.20), rgba(31,143,214,.05) 24deg, transparent 64deg);
  animation:fra-scan-rot 3.2s linear infinite}
@keyframes fra-scan-rot{to{transform:rotate(360deg)}}
@media(prefers-reduced-motion:reduce){.fra-scan{display:none}}
.fra-hot{position:absolute;width:9px;height:9px;border-radius:50%;background:var(--t-muted);opacity:.3;transition:opacity .5s,background .5s}
.fra-hot.on{background:var(--brand);opacity:1;box-shadow:0 0 12px var(--brand)}
.fra-hot.on.hot{background:var(--hot);box-shadow:0 0 12px var(--hot)}
.fra-hot.on::after{content:'';position:absolute;inset:-7px;border:1px solid var(--acc-line,rgba(31,143,214,.34));border-radius:50%;animation:fra-ping 2.4s infinite}
@keyframes fra-ping{0%{transform:scale(.4);opacity:.8}100%{transform:scale(1);opacity:0}}
.fra-hl{position:absolute;top:-25px;left:50%;transform:translateX(-50%);white-space:nowrap;font:600 10px var(--f-m,monospace);color:var(--t-primary);background:rgba(255,255,255,.85);border:1px solid var(--card-border);padding:3px 6px;border-radius:5px;opacity:0;transition:.4s}
.fra-hot.on .fra-hl{opacity:1}
.fra-mapstat{position:absolute;left:14px;bottom:12px;font:700 13px var(--f-m,monospace);color:var(--brand)}

.fra-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.fra-kpi{background:var(--card,#ffffff);border:1px solid var(--card-border);border-radius:12px;padding:13px 15px;display:flex;flex-direction:column;justify-content:center;opacity:.35;transform:translateY(6px);transition:opacity .45s,transform .45s cubic-bezier(.22,.61,.36,1)}
.fra-kpi.on{opacity:1;transform:none;animation:fra-lock .6s ease-out}
/* "signal locked" pulse — azure edge bar flashes as data drops into the slot (tied to real lock event) */
@keyframes fra-lock{0%{box-shadow:inset 0 2px 0 var(--brand)}100%{box-shadow:inset 0 0 0 transparent}}
.fra-kl{font-size:11px;color:var(--t-muted)}
.fra-kv{font:700 24px var(--f-m,monospace);letter-spacing:-.02em;margin-top:3px}
.mono{font-family:var(--f-m,'JetBrains Mono',monospace);font-variant-numeric:tabular-nums}

.fra-buyers .fra-blist{flex:1;overflow:hidden}
.fra-brow{display:grid;grid-template-columns:auto 1fr auto;gap:3px 9px;align-items:center;padding:10px 13px;border-bottom:1px solid var(--card-border);opacity:0;transform:translateY(-6px);transition:.35s}
.fra-brow.on{opacity:1;transform:none;animation:fra-sig .6s ease-out}
@keyframes fra-sig{0%{box-shadow:inset 3px 0 0 var(--brand)}100%{box-shadow:inset 0 0 0 transparent}}
.fra-cc{grid-row:span 2;font-size:10px;font-weight:700;color:var(--t-sec);background:rgba(19,33,63,.05);border:1px solid var(--card-border);border-radius:4px;padding:1px 5px}
.fra-co{font-size:12.5px;font-weight:600}
.fra-mt{font:700 12px var(--f-m,monospace);color:var(--brand);text-align:right}.fra-mt.mid{color:var(--hot)}
.fra-val{grid-column:2/4;font:500 11px var(--f-m,monospace);color:var(--t-muted)}
.fra-finding{padding:10px 13px;font-size:11px;color:var(--t-muted);opacity:.6}

.fra-settle{flex-shrink:0;display:flex;align-items:center;justify-content:center;gap:20px;padding:16px;border-top:1px solid var(--card-border);font-size:14px;background:rgba(31,143,214,.04)}
.fra-settle b{color:var(--t-primary)}.fra-settle b.mono{color:var(--brand)}
.fra-settle b.pipeline{color:var(--green);font-size:15px}
.fra-enter{background:var(--brand);color:#ffffff;border:none;border-radius:10px;padding:11px 26px;font:700 14px var(--f-u,sans-serif);cursor:pointer;transition:.18s}
.fra-enter:hover{filter:brightness(1.08);transform:translateY(-1px)}
.fra-enter:active{transform:translateY(1px) scale(.99)}
.fra-fade-enter-active{transition:.5s}.fra-fade-enter-from{opacity:0;transform:translateY(10px)}

@media(prefers-reduced-motion:reduce){.fra-spin,.fra-live,.fra-hot.on::after,.fra-kpi.on,.fra-brow.on,.fra-pstep.active .fra-pdot,.fra-pipe.locked::after{animation:none}.fra-pipe.locked::after{display:none}.fra-brow,.fra-kpi,.fra-hl{transition:none}}
</style>
