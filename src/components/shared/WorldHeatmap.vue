<!--
  真实世界地图热力图(替代手绘低多边形大陆)。
  数据:@svg-maps/world(256 国真实轮廓,viewBox 1010x666)。
  Phosphor:暖近黑陆地 + 极淡琥珀描边 + 琥珀 sonar 热点。
-->
<script setup>
import { computed, ref } from 'vue'
import world from '@svg-maps/world'
const props = defineProps({
  hotspots: { type: Array, default: () => [] },  // [{ x, y, label, hot, region }] in 1010x666 viewBox
  active: { type: String, default: null }          // selected region key → highlight that spot, dim others
})
defineEmits(['hotspot'])

// viewBox 尺寸(reticle 十字线铺满地图用)
const [, , VBW, VBH] = world.viewBox.split(' ').map(Number)

// 雷达准星 HUD:鼠标在地图上移动 → 十字准星 + 真实经纬读数(信号台/任务控制台交互感)。
// 闲置(无悬停)时整组不渲染 → 静态画面零额外装饰,绝不影响截图高级感。
const cursor = ref(null)   // { x, y, lat, lon, locked, region, label } in viewBox units
const svgRef = ref(null)
const SNAP = 42            // 磁吸半径(viewBox 单位 ≈ 23 屏幕 px):指针靠近热点 → 准星吸附锁定
function onMove (e) {
  const svg = svgRef.value, ctm = svg && svg.getScreenCTM()
  if (!ctm) return
  const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY
  const p = pt.matrixTransform(ctm.inverse())
  // 磁吸 snap-to-target:吸附到最近的可点热点(游戏锁定感 + 更易点中)
  let lock = null, best = SNAP
  for (const h of props.hotspots) {
    if (!h.region) continue
    const d = Math.hypot(h.x - p.x, h.y - p.y)
    if (d < best) { best = d; lock = h }
  }
  const x = lock ? lock.x : p.x, y = lock ? lock.y : p.y
  // 等距圆柱近似:位置 → 真实经纬(非造假数据,反映指针实际所在)
  const lon = x / VBW * 360 - 180, lat = 90 - y / VBH * 180
  // 锁定时的真实情报读数(买家数 + 最高匹配;count/topMatch 由 hotspot 数据带入)
  const intel = lock && lock.count != null
    ? `${lock.count} live ${lock.count === 1 ? 'buyer' : 'buyers'}${lock.topMatch ? ` · top ${lock.topMatch}%` : ''}`
    : null
  cursor.value = {
    x, y, locked: !!lock, region: lock ? lock.region : null, label: lock ? lock.label : null, intel,
    lon: `${Math.abs(lon).toFixed(0)}°${lon >= 0 ? 'E' : 'W'}`,
    lat: `${Math.abs(lat).toFixed(0)}°${lat >= 0 ? 'N' : 'S'}`,
  }
}
const onLeave = () => { cursor.value = null }

// 活的贸易/信号网络:从枢纽(hot 区)向其它区画航线弧,信号沿线流动(= transmission)。
const arcs = computed(() => {
  const hs = props.hotspots
  if (hs.length < 2) return []
  const hub = hs.find(h => h.hot) || hs[0]
  return hs.filter(h => h !== hub).map((h, i) => {
    const mx = (hub.x + h.x) / 2, my = (hub.y + h.y) / 2
    const lift = Math.min(Math.hypot(h.x - hub.x, h.y - hub.y) * 0.32, 120)
    return { d: `M${hub.x},${hub.y} Q${mx},${my - lift} ${h.x},${h.y}`, key: h.region || h.label || i, delay: (i * 0.55).toFixed(2) }
  })
})
</script>

<template>
  <svg ref="svgRef" class="wh" :viewBox="world.viewBox" preserveAspectRatio="xMidYMid meet"
       role="img" aria-label="Global demand heatmap" @mousemove="onMove" @mouseleave="onLeave">
    <g class="wh-land">
      <path v-for="c in world.locations" :key="c.id" :d="c.path" />
    </g>
    <!-- 贸易/信号网络:航线弧 + 沿线流动的信号 -->
    <g class="wh-arcs">
      <path v-for="a in arcs" :key="a.key" class="wh-arc" :d="a.d" pathLength="100" />
      <path v-for="a in arcs" :key="'f'+a.key" class="wh-arc-flow" :d="a.d" pathLength="100" :style="{ animationDelay: a.delay + 's' }" />
    </g>
    <g v-for="(h, i) in hotspots" :key="i" :transform="`translate(${h.x},${h.y})`"
       class="wh-spot" :class="{ hot: h.hot, sel: active && active === h.region, dim: active && active !== h.region, snap: cursor && cursor.locked && cursor.region === h.region }"
       :role="h.region ? 'button' : null" :tabindex="h.region ? 0 : null"
       @click="h.region && $emit('hotspot', h)" @keydown.enter="h.region && $emit('hotspot', h)">
      <circle v-if="h.region" class="wh-hit" cx="0" cy="0" r="15" />
      <circle class="wh-ping" :class="{ hot: h.hot }" cx="0" cy="0" r="4"
              :style="h.dur ? { animationDuration: h.dur + 's', animationDelay: h.delay + 's' } : null" />
      <circle class="wh-ring" cx="0" cy="0" r="9" />
      <!-- 目标锁定角括号(hover/选中:game targeting reticle)-->
      <g v-if="h.region" class="wh-lock">
        <path d="M-11,-6.5 L-11,-11 L-6.5,-11" />
        <path d="M6.5,-11 L11,-11 L11,-6.5" />
        <path d="M11,6.5 L11,11 L6.5,11" />
        <path d="M-6.5,11 L-11,11 L-11,6.5" />
      </g>
      <circle class="wh-dot" :class="{ hot: h.hot }" cx="0" cy="0" r="3.2" />
      <text v-if="h.label" class="wh-lbl" x="0" y="-9">{{ h.label }}</text>
    </g>
    <!-- 雷达准星 HUD(跟随指针:十字 + 真实经纬读数;靠近热点磁吸锁定)-->
    <g v-if="cursor" class="wh-reticle" :class="{ locked: cursor.locked }">
      <line class="wh-cross" :x1="cursor.x" y1="0" :x2="cursor.x" :y2="VBH" />
      <line class="wh-cross" x1="0" :y1="cursor.y" :x2="VBW" :y2="cursor.y" />
      <circle class="wh-retic-ring" :cx="cursor.x" :cy="cursor.y" r="9" />
      <circle class="wh-retic-dot" :cx="cursor.x" :cy="cursor.y" r="1.6" />
      <template v-if="cursor.locked">
        <text class="wh-coord wh-coord-title" :x="cursor.x + 12" :y="cursor.y - 11">{{ cursor.label }}</text>
        <text v-if="cursor.intel" class="wh-coord wh-intel" :x="cursor.x + 12" :y="cursor.y + 2">{{ cursor.intel }}</text>
      </template>
      <text v-else class="wh-coord" :x="cursor.x + 12" :y="cursor.y - 10">{{ cursor.lat }} {{ cursor.lon }}</text>
    </g>
  </svg>
</template>

<style scoped>
.wh { width: 100%; height: 100%; display: block; }
.wh-land path {
  fill: #dde7f3;
  stroke: rgba(31, 143, 214, .14);
  stroke-width: .5;
  vector-effect: non-scaling-stroke;
}
.wh-dot { fill: var(--brand, #1f8fd6); }
.wh-dot.hot { fill: var(--brand-azure, #2f9fe0); }
.wh-ping {
  fill: none;
  stroke: var(--acc-line, rgba(31, 143, 214, .42));
  stroke-width: 1; vector-effect: non-scaling-stroke;
  animation: wh-ping 2.6s ease-out infinite;
}
.wh-ping.hot { stroke: rgba(47, 159, 224, .55); }
@keyframes wh-ping { 0% { r: 3; opacity: .85 } 100% { r: 15; opacity: 0 } }
/* 贸易/信号网络弧 */
.wh-arcs { pointer-events: none; }
.wh-arc { fill: none; stroke: rgba(31,143,214,.16); stroke-width: 1; vector-effect: non-scaling-stroke; stroke-linecap: round; }
.wh-arc-flow { fill: none; stroke: var(--brand-azure, #2f9fe0); stroke-width: 1.7; vector-effect: non-scaling-stroke;
  stroke-linecap: round; stroke-dasharray: 4 100; animation: wh-flow 2.8s linear infinite; }
@keyframes wh-flow { from { stroke-dashoffset: 104 } to { stroke-dashoffset: 4 } }
/* clickable hotspots (H3) */
.wh-spot[role="button"] { cursor: pointer; outline: none; }
.wh-hit { fill: transparent; }
/* hover 响应环(交互感)*/
.wh-ring { fill: none; stroke: var(--brand, #1f8fd6); stroke-width: 1.2; vector-effect: non-scaling-stroke;
  opacity: 0; pointer-events: none; transition: opacity .18s; }
.wh-spot[role="button"]:hover .wh-ring, .wh-spot.sel .wh-ring { opacity: .8; }
.wh-spot[role="button"]:hover .wh-dot, .wh-spot.sel .wh-dot { r: 5; }
.wh-spot[role="button"]:hover .wh-lbl { fill: var(--brand2, #1e5fd0); }
.wh-spot[role="button"]:focus-visible .wh-dot { stroke: var(--brand2, #1e5fd0); stroke-width: 1.5; }
.wh-spot.sel .wh-ping { animation-duration: 1.4s; stroke-width: 1.6; stroke: var(--brand2, #1e5fd0); }
.wh-spot.sel .wh-lbl { fill: var(--brand2, #1e5fd0); }
/* 目标锁定角括号:平时隐;hover 淡入;选中=锁定 snap-in(放大 1.5→1)*/
.wh-lock path { fill: none; stroke: var(--brand-azure, #2f9fe0); stroke-width: 1.4;
  vector-effect: non-scaling-stroke; stroke-linecap: round; stroke-linejoin: round; }
.wh-lock { transform-box: fill-box; transform-origin: center; opacity: 0; transition: opacity .18s; }
.wh-spot[role="button"]:hover .wh-lock, .wh-spot.snap .wh-lock { opacity: .9; }
.wh-spot.sel .wh-lock { opacity: 1; stroke: var(--brand2, #1e5fd0); animation: wh-lock-in .42s cubic-bezier(.2,.85,.2,1); }
.wh-spot.sel .wh-lock path { stroke: var(--brand2, #1e5fd0); }
@keyframes wh-lock-in { from { transform: scale(1.5); opacity: 0 } to { transform: scale(1); opacity: 1 } }
.wh-spot.dim { opacity: .32; transition: opacity .2s; }
.wh-lbl {
  fill: var(--t-primary, #13213f);
  font: 600 11px 'JetBrains Mono', monospace;
  text-anchor: middle; paint-order: stroke;
  stroke: rgba(244, 247, 252, .85); stroke-width: 3px;
}
/* 雷达准星 HUD(交互感 + 任务控制台游戏感;pointer-events 关,绝不挡热点点击)*/
.wh-reticle { pointer-events: none; }
.wh-cross { stroke: var(--brand-azure, #2f9fe0); stroke-width: .6; vector-effect: non-scaling-stroke; opacity: .3; }
.wh-retic-ring { fill: none; stroke: var(--brand-azure, #2f9fe0); stroke-width: 1; vector-effect: non-scaling-stroke; opacity: .75; }
.wh-retic-dot { fill: var(--brand-azure, #2f9fe0); }
.wh-coord {
  fill: var(--brand2, #1e5fd0);
  font: 600 10px 'JetBrains Mono', monospace; letter-spacing: .03em;
  paint-order: stroke; stroke: rgba(244, 247, 252, .85); stroke-width: 3px;
}
/* 磁吸锁定:准星滑向热点(transition)+ 十字让位 + ring 收紧成 royal 锁定环 */
.wh-retic-ring, .wh-retic-dot { transition: cx .12s ease-out, cy .12s ease-out; }
.wh-reticle.locked .wh-cross { opacity: .14; }
.wh-reticle.locked .wh-retic-ring { stroke: var(--brand2, #1e5fd0); stroke-width: 1.6; opacity: 1; }
.wh-reticle.locked .wh-retic-dot { fill: var(--brand2, #1e5fd0); }
.wh-reticle.locked .wh-coord { fill: var(--brand2, #1e5fd0); }
/* 锁定情报读数:标题(区域)+ 副行(实时买家·最高匹配,真实数据)*/
.wh-coord-title { font-weight: 700; }
.wh-intel { fill: var(--t-sec, #4a5d7e); font-size: 9px; letter-spacing: .02em; }
@media (prefers-reduced-motion: reduce) { .wh-ping, .wh-arc-flow, .wh-lock { animation: none } }
</style>
