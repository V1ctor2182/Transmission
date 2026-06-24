<!--
  真实世界地图热力图(替代手绘低多边形大陆)。
  数据:@svg-maps/world(256 国真实轮廓,viewBox 1010x666)。
  Phosphor:暖近黑陆地 + 极淡琥珀描边 + 琥珀 sonar 热点。
-->
<script setup>
import world from '@svg-maps/world'
defineProps({
  hotspots: { type: Array, default: () => [] },  // [{ x, y, label, hot, region }] in 1010x666 viewBox
  active: { type: String, default: null }          // selected region key → highlight that spot, dim others
})
defineEmits(['hotspot'])
</script>

<template>
  <svg class="wh" :viewBox="world.viewBox" preserveAspectRatio="xMidYMid meet" role="img" aria-label="全球商机热力图">
    <g class="wh-land">
      <path v-for="c in world.locations" :key="c.id" :d="c.path" />
    </g>
    <g v-for="(h, i) in hotspots" :key="i" :transform="`translate(${h.x},${h.y})`"
       class="wh-spot" :class="{ hot: h.hot, sel: active && active === h.region, dim: active && active !== h.region }"
       :role="h.region ? 'button' : null" :tabindex="h.region ? 0 : null"
       @click="h.region && $emit('hotspot', h)" @keydown.enter="h.region && $emit('hotspot', h)">
      <circle v-if="h.region" class="wh-hit" cx="0" cy="0" r="15" />
      <circle class="wh-ping" :class="{ hot: h.hot }" cx="0" cy="0" r="4"
              :style="h.dur ? { animationDuration: h.dur + 's', animationDelay: h.delay + 's' } : null" />
      <circle class="wh-dot" :class="{ hot: h.hot }" cx="0" cy="0" r="3.2" />
      <text v-if="h.label" class="wh-lbl" x="0" y="-9">{{ h.label }}</text>
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
/* clickable hotspots (H3) */
.wh-spot[role="button"] { cursor: pointer; outline: none; }
.wh-hit { fill: transparent; }
.wh-spot[role="button"]:hover .wh-dot, .wh-spot.sel .wh-dot { r: 4.6; }
.wh-spot[role="button"]:focus-visible .wh-dot { stroke: var(--brand2, #1e5fd0); stroke-width: 1.5; }
.wh-spot.sel .wh-ping { animation-duration: 1.4s; stroke-width: 1.6; stroke: var(--brand2, #1e5fd0); }
.wh-spot.sel .wh-lbl { fill: var(--brand2, #1e5fd0); }
.wh-spot.dim { opacity: .32; transition: opacity .2s; }
.wh-lbl {
  fill: var(--t-primary, #13213f);
  font: 600 11px 'JetBrains Mono', monospace;
  text-anchor: middle; paint-order: stroke;
  stroke: rgba(244, 247, 252, .85); stroke-width: 3px;
}
@media (prefers-reduced-motion: reduce) { .wh-ping { animation: none } }
</style>
