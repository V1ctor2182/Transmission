<!--
  Page — 工作台 dashboard
  Faithful extract from index (31).html (L1085-1350). NOT yet idiomatic Vue.
  REWRITE: convert onclick="fn(...)" → @click, lift state into <script setup>.
  AI-flavor audit: see REFACTOR-NOTES.md.
-->
<script setup>
// 工作台 KPI:数据驱动,去 emoji 图标/发光,数字配迷你 sparkline,delta 用 + 不用 ▲。
const nav = (p) => window.navTo?.(p)
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
                <canvas id="night-map-canvas" style="width:100%;height:100%;display:block;border-radius:10px"></canvas>
                <!-- Overlay SVG for hotspot markers only -->
                <svg id="night-map-svg" viewBox="0 0 960 280" xmlns="http://www.w3.org/2000/svg" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none">
                  <defs>
                    <filter id="hotGlow" x="-200%" y="-200%" width="500%" height="500%">
                      <feGaussianBlur stdDeviation="10" result="blur"/>
                      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    <radialGradient id="seaGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stop-color="rgba(245,183,61,0.3)"/>
                      <stop offset="100%" stop-color="rgba(245,183,61,0)"/>
                    </radialGradient>
                    <radialGradient id="naGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stop-color="rgba(34,211,238,0.25)"/>
                      <stop offset="100%" stop-color="rgba(34,211,238,0)"/>
                    </radialGradient>
                    <radialGradient id="euGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stop-color="rgba(107,120,255,0.22)"/>
                      <stop offset="100%" stop-color="rgba(107,120,255,0)"/>
                    </radialGradient>
                    <radialGradient id="auGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stop-color="rgba(52,211,153,0.2)"/>
                      <stop offset="100%" stop-color="rgba(52,211,153,0)"/>
                    </radialGradient>
                  </defs>
                  <!-- Deep space ocean -->
                  <rect width="960" height="500" fill="url(#nmBg)"/>
                  <!-- Subtle latitude/longitude grid -->
                  <g stroke="rgba(245,183,61,0.05)" stroke-width="0.4" fill="none">
                    <line x1="0" y1="83" x2="960" y2="83"/><line x1="0" y1="166" x2="960" y2="166"/>
                    <line x1="0" y1="250" x2="960" y2="250"/><line x1="0" y1="333" x2="960" y2="333"/><line x1="0" y1="416" x2="960" y2="416"/>
                    <line x1="96" y1="0" x2="96" y2="500"/><line x1="192" y1="0" x2="192" y2="500"/><line x1="288" y1="0" x2="288" y2="500"/>
                    <line x1="384" y1="0" x2="384" y2="500"/><line x1="480" y1="0" x2="480" y2="500"/><line x1="576" y1="0" x2="576" y2="500"/>
                    <line x1="672" y1="0" x2="672" y2="500"/><line x1="768" y1="0" x2="768" y2="500"/><line x1="864" y1="0" x2="864" y2="500"/>
                  </g>

                  <!-- ═══ CONTINENTS — detailed Natural Earth-style paths ═══ -->
                  <!-- North America -->
                  <path d="M68,35 L95,28 L130,22 L168,20 L200,24 L228,30 L248,38 L262,50 L268,65 L272,82 L268,100 L258,118 L248,138 L240,158 L232,178 L222,198 L210,218 L198,235 L185,248 L172,258 L158,264 L144,262 L130,255 L116,244 L102,228 L90,210 L80,190 L72,168 L65,146 L60,122 L58,98 L60,75 L64,55Z" fill="#0b1830" stroke="rgba(245,183,61,0.2)" stroke-width="0.7"/>
                  <!-- Central America -->
                  <path d="M172,258 L185,248 L195,255 L200,268 L196,280 L188,285 L178,280 L172,270Z" fill="#0b1830" stroke="rgba(245,183,61,0.15)" stroke-width="0.5"/>
                  <!-- South America -->
                  <path d="M175,288 L195,278 L218,272 L238,278 L250,292 L256,312 L258,335 L255,360 L248,385 L238,408 L224,428 L208,442 L192,448 L176,442 L162,428 L150,408 L142,382 L138,355 L138,328 L142,305 L150,292Z" fill="#0b1830" stroke="rgba(245,183,61,0.12)" stroke-width="0.7"/>
                  <!-- Greenland -->
                  <path d="M268,8 L295,5 L318,8 L330,18 L328,32 L315,40 L298,42 L280,38 L268,28Z" fill="#0a1525" stroke="rgba(245,183,61,0.1)" stroke-width="0.5"/>
                  <!-- UK & Ireland -->
                  <path d="M388,38 L398,32 L408,35 L412,45 L408,55 L398,58 L388,52Z" fill="#0e1c32" stroke="rgba(107,120,255,0.2)" stroke-width="0.5"/>
                  <!-- Europe main -->
                  <path d="M408,28 L445,20 L478,18 L505,24 L522,35 L528,50 L524,68 L515,85 L502,98 L488,108 L472,115 L455,118 L438,115 L422,108 L410,95 L402,80 L400,62 L402,45Z" fill="#0e1c32" stroke="rgba(107,120,255,0.25)" stroke-width="0.7"/>
                  <!-- Scandinavia -->
                  <path d="M438,8 L458,5 L472,10 L480,22 L472,32 L458,38 L445,35 L436,25Z" fill="#0e1c32" stroke="rgba(107,120,255,0.15)" stroke-width="0.5"/>
                  <!-- Africa -->
                  <path d="M408,118 L440,110 L472,108 L502,112 L525,122 L540,140 L548,162 L550,188 L548,215 L542,242 L532,268 L518,292 L502,315 L485,335 L468,350 L450,358 L432,355 L415,342 L402,322 L392,298 L385,272 L382,245 L382,218 L385,190 L390,162 L396,140Z" fill="#0b1830" stroke="rgba(245,183,61,0.12)" stroke-width="0.7"/>
                  <!-- Madagascar -->
                  <path d="M548,268 L558,262 L565,272 L562,292 L552,298 L544,290 L542,278Z" fill="#0b1830" stroke="rgba(245,183,61,0.1)" stroke-width="0.4"/>
                  <!-- Middle East -->
                  <path d="M528,78 L562,70 L592,68 L618,75 L632,90 L638,108 L632,128 L618,145 L600,155 L578,158 L555,152 L538,140 L528,122 L525,102Z" fill="#0e1c32" stroke="rgba(251,191,36,0.18)" stroke-width="0.6"/>
                  <!-- India -->
                  <path d="M600,128 L635,122 L658,130 L668,148 L665,172 L655,198 L640,222 L622,238 L605,242 L590,235 L578,218 L572,195 L572,168 L578,148Z" fill="#0e1c32" stroke="rgba(251,191,36,0.15)" stroke-width="0.6"/>
                  <!-- Russia / Central Asia -->
                  <path d="M430,8 L520,5 L600,8 L665,12 L720,15 L770,18 L815,22 L848,30 L868,42 L872,58 L862,75 L845,90 L822,102 L795,112 L765,118 L732,120 L698,118 L665,112 L635,105 L608,98 L582,90 L558,80 L538,68 L522,55 L510,42 L498,30 L478,22 L455,15 L432,12Z" fill="#0d1b30" stroke="rgba(52,211,153,0.15)" stroke-width="0.7"/>
                  <!-- China / East Asia -->
                  <path d="M638,58 L692,48 L738,45 L778,50 L808,60 L828,75 L835,92 L830,110 L818,125 L800,138 L778,148 L752,155 L725,158 L698,155 L672,148 L648,138 L630,125 L622,108 L622,90 L628,72Z" fill="#0e1c32" stroke="rgba(52,211,153,0.2)" stroke-width="0.7"/>
                  <!-- Japan -->
                  <path d="M828,68 L842,62 L852,68 L855,80 L848,90 L838,95 L828,90 L822,80Z" fill="#0e1c32" stroke="rgba(52,211,153,0.2)" stroke-width="0.5"/>
                  <!-- Korea -->
                  <path d="M808,80 L820,75 L828,80 L828,92 L820,98 L810,95 L805,88Z" fill="#0e1c32" stroke="rgba(52,211,153,0.15)" stroke-width="0.4"/>
                  <!-- Southeast Asia -->
                  <path d="M658,148 L698,142 L732,145 L758,155 L775,170 L782,190 L778,212 L765,232 L748,248 L728,258 L708,262 L688,255 L670,240 L658,220 L650,198 L648,175Z" fill="#0e1c32" stroke="rgba(245,183,61,0.25)" stroke-width="0.7"/>
                  <!-- Indonesia (Sumatra/Java) -->
                  <path d="M668,258 L705,252 L738,255 L758,265 L762,278 L748,285 L718,282 L688,275 L668,268Z" fill="#0e1c32" stroke="rgba(245,183,61,0.15)" stroke-width="0.5"/>
                  <!-- Philippines -->
                  <path d="M768,168 L782,162 L792,168 L795,182 L788,195 L775,198 L765,192 L762,178Z" fill="#0e1c32" stroke="rgba(245,183,61,0.15)" stroke-width="0.4"/>
                  <!-- Australia -->
                  <path d="M738,305 L782,295 L822,292 L858,298 L882,312 L895,332 L898,358 L892,385 L878,408 L858,425 L832,435 L805,435 L778,425 L755,408 L740,385 L730,358 L728,330Z" fill="#0b1830" stroke="rgba(34,211,238,0.15)" stroke-width="0.7"/>
                  <!-- New Zealand -->
                  <path d="M898,368 L908,360 L915,368 L912,382 L902,388 L895,380Z" fill="#0b1830" stroke="rgba(34,211,238,0.1)" stroke-width="0.4"/>

                  <!-- ═══ CITY LIGHT DOTS — dense warm amber glow ═══ -->
                  <!-- North America East Coast (dense) -->
                  <g fill="rgba(255,210,80,0.55)" filter="url(#cityGlow)">
                    <circle cx="155" cy="108" r="2.2"/><circle cx="162" cy="112" r="1.8"/><circle cx="148" cy="115" r="1.5"/><circle cx="170" cy="105" r="1.6"/><circle cx="142" cy="120" r="1.3"/><circle cx="158" cy="122" r="1.4"/><circle cx="168" cy="118" r="1.2"/><circle cx="145" cy="128" r="1.1"/><circle cx="155" cy="132" r="1.3"/>
                    <!-- NA West Coast -->
                    <circle cx="88" cy="128" r="1.8"/><circle cx="82" cy="135" r="1.5"/><circle cx="78" cy="142" r="1.3"/><circle cx="92" cy="138" r="1.2"/>
                    <!-- NA Midwest -->
                    <circle cx="128" cy="108" r="1.6"/><circle cx="138" cy="112" r="1.4"/><circle cx="118" cy="115" r="1.2"/><circle cx="132" cy="118" r="1.1"/><circle cx="122" cy="122" r="1"/>
                    <!-- NA South -->
                    <circle cx="138" cy="138" r="1.5"/><circle cx="148" cy="142" r="1.3"/><circle cx="128" cy="145" r="1.1"/><circle cx="158" cy="140" r="1.2"/>
                    <!-- Canada -->
                    <circle cx="145" cy="88" r="1.3"/><circle cx="162" cy="82" r="1.2"/><circle cx="175" cy="88" r="1.1"/>
                  </g>
                  <!-- Europe (very dense) -->
                  <g fill="rgba(255,215,90,0.6)" filter="url(#cityGlow)">
                    <circle cx="425" cy="48" r="2"/><circle cx="438" cy="44" r="1.8"/><circle cx="448" cy="50" r="2.2"/><circle cx="460" cy="46" r="1.6"/><circle cx="470" cy="52" r="1.8"/><circle cx="480" cy="48" r="1.5"/><circle cx="490" cy="55" r="1.4"/><circle cx="455" cy="58" r="1.6"/><circle cx="465" cy="62" r="1.5"/><circle cx="445" cy="65" r="1.4"/><circle cx="475" cy="60" r="1.3"/><circle cx="432" cy="58" r="1.5"/><circle cx="442" cy="70" r="1.3"/><circle cx="452" cy="72" r="1.2"/><circle cx="462" cy="68" r="1.4"/><circle cx="472" cy="75" r="1.2"/><circle cx="435" cy="75" r="1.1"/><circle cx="485" cy="68" r="1.3"/><circle cx="495" cy="72" r="1.1"/><circle cx="505" cy="65" r="1.2"/><circle cx="415" cy="62" r="1.3"/><circle cx="418" cy="75" r="1.1"/>
                  </g>
                  <!-- East Asia / China (very dense) -->
                  <g fill="rgba(255,210,75,0.5)" filter="url(#cityGlow)">
                    <circle cx="728" cy="78" r="2.5"/><circle cx="740" cy="72" r="2"/><circle cx="752" cy="80" r="2.2"/><circle cx="762" cy="75" r="1.8"/><circle cx="772" cy="82" r="1.6"/><circle cx="782" cy="78" r="1.5"/><circle cx="720" cy="88" r="1.8"/><circle cx="732" cy="92" r="2"/><circle cx="745" cy="88" r="1.8"/><circle cx="758" cy="92" r="1.6"/><circle cx="768" cy="88" r="1.5"/><circle cx="778" cy="95" r="1.4"/><circle cx="710" cy="98" r="1.6"/><circle cx="722" cy="102" r="1.8"/><circle cx="735" cy="98" r="1.6"/><circle cx="748" cy="102" r="1.5"/><circle cx="760" cy="98" r="1.4"/><circle cx="770" cy="105" r="1.3"/><circle cx="700" cy="108" r="1.5"/><circle cx="712" cy="112" r="1.6"/><circle cx="725" cy="108" r="1.5"/><circle cx="738" cy="112" r="1.4"/><circle cx="750" cy="108" r="1.3"/>
                    <!-- Japan -->
                    <circle cx="835" cy="72" r="2.2"/><circle cx="842" cy="78" r="1.8"/><circle cx="848" cy="72" r="1.6"/><circle cx="838" cy="82" r="1.5"/><circle cx="845" cy="85" r="1.3"/>
                    <!-- Korea -->
                    <circle cx="812" cy="82" r="1.8"/><circle cx="818" cy="88" r="1.5"/><circle cx="822" cy="82" r="1.4"/>
                  </g>
                  <!-- Southeast Asia (medium dense) -->
                  <g fill="rgba(255,215,80,0.5)" filter="url(#cityGlow)">
                    <circle cx="695" cy="178" r="1.8"/><circle cx="705" cy="185" r="1.6"/><circle cx="715" cy="178" r="1.5"/><circle cx="688" cy="192" r="1.4"/><circle cx="700" cy="198" r="1.6"/><circle cx="712" cy="192" r="1.5"/><circle cx="722" cy="198" r="1.4"/><circle cx="695" cy="208" r="1.3"/><circle cx="708" cy="212" r="1.5"/><circle cx="720" cy="208" r="1.4"/><circle cx="732" cy="215" r="1.6"/><circle cx="742" cy="210" r="1.3"/><circle cx="705" cy="225" r="1.4"/><circle cx="718" cy="228" r="1.8"/><circle cx="728" cy="222" r="1.3"/><circle cx="738" cy="228" r="1.2"/>
                  </g>
                  <!-- India -->
                  <g fill="rgba(255,210,70,0.45)" filter="url(#cityGlow)">
                    <circle cx="618" cy="148" r="1.8"/><circle cx="628" cy="155" r="1.6"/><circle cx="638" cy="148" r="1.5"/><circle cx="648" cy="155" r="1.4"/><circle cx="622" cy="165" r="1.5"/><circle cx="632" cy="170" r="1.6"/><circle cx="642" cy="165" r="1.4"/><circle cx="652" cy="172" r="1.3"/><circle cx="625" cy="182" r="1.4"/><circle cx="635" cy="188" r="1.5"/><circle cx="645" cy="182" r="1.3"/><circle cx="628" cy="198" r="1.3"/><circle cx="638" cy="205" r="1.4"/>
                  </g>
                  <!-- Middle East -->
                  <g fill="rgba(255,215,80,0.4)" filter="url(#cityGlow)">
                    <circle cx="558" cy="95" r="1.5"/><circle cx="568" cy="102" r="1.3"/><circle cx="578" cy="95" r="1.4"/><circle cx="590" cy="102" r="1.2"/><circle cx="600" cy="95" r="1.3"/><circle cx="610" cy="102" r="1.1"/><circle cx="565" cy="112" r="1.2"/><circle cx="575" cy="118" r="1.3"/><circle cx="585" cy="112" r="1.2"/>
                  </g>
                  <!-- Australia -->
                  <g fill="rgba(255,210,70,0.4)" filter="url(#cityGlow)">
                    <circle cx="808" cy="368" r="1.8"/><circle cx="818" cy="375" r="1.5"/><circle cx="798" cy="375" r="1.4"/><circle cx="825" cy="368" r="1.3"/><circle cx="790" cy="368" r="1.2"/><circle cx="812" cy="385" r="1.3"/><circle cx="800" cy="388" r="1.2"/><circle cx="835" cy="358" r="1.3"/><circle cx="845" cy="365" r="1.1"/>
                  </g>
                  <!-- South America -->
                  <g fill="rgba(255,210,70,0.38)" filter="url(#cityGlow)">
                    <circle cx="195" cy="308" r="1.6"/><circle cx="205" cy="315" r="1.4"/><circle cx="188" cy="318" r="1.3"/><circle cx="200" cy="325" r="1.2"/><circle cx="192" cy="332" r="1.1"/><circle cx="208" cy="322" r="1.2"/>
                    <!-- Buenos Aires -->
                    <circle cx="192" cy="398" r="1.5"/><circle cx="200" cy="402" r="1.3"/><circle cx="185" cy="402" r="1.2"/>
                  </g>

                  <!-- HOT ZONES — glowing halos for target markets -->
                  <!-- Southeast Asia HOTZONE -->
                  <circle cx="718" cy="215" r="45" fill="url(#seaGrad)" opacity="0.8">
                    <animate attributeName="r" values="40;55;40" dur="4s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.8;0.4;0.8" dur="4s" repeatCount="indefinite"/>
                  </circle>
                  <!-- North America HOTZONE -->
                  <circle cx="152" cy="118" r="40" fill="url(#naGrad)" opacity="0.7">
                    <animate attributeName="r" values="35;50;35" dur="5s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.7;0.3;0.7" dur="5s" repeatCount="indefinite"/>
                  </circle>
                  <!-- Europe HOTZONE -->
                  <circle cx="455" cy="58" r="32" fill="url(#euGrad)" opacity="0.6">
                    <animate attributeName="r" values="28;42;28" dur="4.5s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.6;0.25;0.6" dur="4.5s" repeatCount="indefinite"/>
                  </circle>

                  <!-- HOTSPOT MARKERS — key cities -->
                  <!-- Singapore -->
                  <circle cx="718" cy="228" r="5" fill="#f5b73d" filter="url(#hotGlow)">
                    <animate attributeName="r" values="4;12;4" dur="2.5s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="1;0.2;1" dur="2.5s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="718" cy="228" r="4" fill="#ffd27a"/>
                  <text x="718" y="218" text-anchor="middle" font-size="9" fill="#9beae0" font-family="Geist,sans-serif" font-weight="700">新加坡</text>
                  <text x="718" y="244" text-anchor="middle" font-size="8" fill="rgba(165,180,252,0.6)" font-family="Geist,sans-serif">3300万华人</text>

                  <!-- New York -->
                  <circle cx="152" cy="108" r="4.5" fill="#22d3ee" filter="url(#hotGlow)">
                    <animate attributeName="r" values="3;11;3" dur="3s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="1;0.2;1" dur="3s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="152" cy="108" r="3.5" fill="#67e8f9"/>
                  <text x="152" y="98" text-anchor="middle" font-size="9" fill="#67e8f9" font-family="Geist,sans-serif" font-weight="700">北美</text>
                  <text x="152" y="124" text-anchor="middle" font-size="8" fill="rgba(103,232,249,0.6)" font-family="Geist,sans-serif">530万华人</text>

                  <!-- London/Europe -->
                  <circle cx="448" cy="52" r="4" fill="#6b78ff" filter="url(#hotGlow)">
                    <animate attributeName="r" values="3;10;3" dur="3.5s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="1;0.2;1" dur="3.5s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="448" cy="52" r="3" fill="#aab2ff"/>
                  <text x="448" y="42" text-anchor="middle" font-size="9" fill="#aab2ff" font-family="Geist,sans-serif" font-weight="700">欧洲</text>
                  <text x="448" y="68" text-anchor="middle" font-size="8" fill="rgba(196,181,253,0.6)" font-family="Geist,sans-serif">215万华人</text>

                  <!-- Sydney -->
                  <circle cx="808" cy="368" r="3.5" fill="#34d399" filter="url(#hotGlow)">
                    <animate attributeName="r" values="2.5;9;2.5" dur="4s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="1;0.2;1" dur="4s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="808" cy="368" r="2.8" fill="#6ee7b7"/>
                  <text x="808" y="358" text-anchor="middle" font-size="9" fill="#6ee7b7" font-family="Geist,sans-serif" font-weight="700">澳洲</text>
                  <text x="808" y="384" text-anchor="middle" font-size="8" fill="rgba(110,231,183,0.6)" font-family="Geist,sans-serif">120万华人</text>

                  <!-- KL -->
                  <circle cx="700" cy="215" r="3" fill="#fbbf24" filter="url(#hotGlow)">
                    <animate attributeName="r" values="2;8;2" dur="3.2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="1;0.2;1" dur="3.2s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="700" cy="215" r="2.5" fill="#fcd34d"/>

                  <!-- Bangkok -->
                  <circle cx="690" cy="200" r="2.8" fill="#fbbf24" filter="url(#hotGlow)">
                    <animate attributeName="r" values="2;7;2" dur="2.8s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="1;0.2;1" dur="2.8s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="690" cy="200" r="2.2" fill="#fcd34d"/>

                  <!-- Connection arcs -->
                  <g stroke="rgba(245,183,61,0.12)" stroke-width="0.8" fill="none" stroke-dasharray="4,6">
                    <path d="M152,108 Q300,60 448,52"/>
                    <path d="M448,52 Q580,40 718,228"/>
                    <path d="M718,228 Q763,298 808,368"/>
                  </g>

                  <!-- Floating labels -->
                  <text x="480" y="490" text-anchor="middle" font-size="9" fill="rgba(245,183,61,0.3)" font-family="Geist,sans-serif" letter-spacing="3">TRADERADAR · GLOBAL OPPORTUNITY MAP</text>
                </svg>
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
            <div class="mini-title" style="color:#6b78ff">
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
