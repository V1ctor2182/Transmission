/* ─────────────────────────────────────────────────────────────
   FAITHFUL extract of the original <script> (index (31).html L1932-4187).
   Loaded as a CLASSIC script so its functions stay global — the
   extracted templates still call them via inline onclick during the
   migration. REWRITE TARGET: move each section into composables and
   convert handlers to @click. See REFACTOR-NOTES.md.
   ───────────────────────────────────────────────────────────── */
// ═══════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════
const LEADS = [
  {id:0,flag:'🇸🇬',country:'Singapore',company:'Fairprice Group',product:'高端节庆礼盒采购',score:96,color:'#1f8fd6',tags:['节庆食品','紧急','高匹配'],insight:'AI 分析：<strong>中秋节前 3 个月</strong>是该采购商最活跃的采购窗口，建议本周内完成首次建联。'},
  {id:1,flag:'🇲🇾',country:'Malaysia',company:'Jaya Grocer',product:'精品月饼礼盒批发',score:93,color:'#1f8fd6',tags:['月饼','新商机'],insight:'AI 分析：该采购商去年同期采购量 <strong>同比增长 34%</strong>，今年预算预计上调，优先级高。'},
  {id:2,flag:'🇺🇸',country:'USA',company:'99 Ranch Market',product:'中式糕点年度供应',score:89,color:'#17a673',tags:['华人超市','北美'],insight:'AI 分析：该连锁超市在 <strong>洛杉矶、旧金山</strong> 共 56 家门店，节庆礼盒年采购额约 $120 万。'},
  {id:3,flag:'🇹🇭',country:'Thailand',company:'Central Food Hall',product:'椰子酥礼盒进口',score:87,color:'#c8860a',tags:['椰子酥','东南亚'],insight:'AI 分析：泰国华人人口 <strong>700 万+</strong>，中式节庆食品需求强劲，该采购商为当地最大连锁超市。'},
  {id:4,flag:'🇦🇺',country:'Australia',company:'Asian Grocery Pty',product:'节庆礼品盒采购',score:84,color:'#1e5fd0',tags:['澳洲','礼品'],insight:'AI 分析：澳洲华人社区 <strong>120 万+</strong>，悉尼、墨尔本节庆礼盒需求稳定，该采购商有稳定复购记录。'},
  {id:5,flag:'🇮🇩',country:'Indonesia',company:'Transmart Carrefour',product:'中式糕点系列',score:82,color:'#e5484d',tags:['印尼','新商机'],insight:'AI 分析：印尼华人 <strong>1000 万+</strong>，是东南亚最大华人市场，节庆食品渗透率仍有较大提升空间。'},
  {id:6,flag:'🇨🇦',country:'Canada',company:'T&T Supermarket',product:'月饼礼盒年度采购',score:91,color:'#1f8fd6',tags:['月饼','北美','高匹配'],insight:'AI 分析：T&T 是北美最大亚裔超市连锁，<strong>温哥华、多伦多</strong>门店月饼年采购量约 $80 万。'},
  {id:7,flag:'🇳🇿',country:'New Zealand',company:'Asian Food Centre',product:'节庆礼盒进口',score:79,color:'#17a673',tags:['新西兰','澳洲'],insight:'AI 分析：新西兰华人社区集中在奥克兰，该采购商为当地最大华人食品专营商，年采购额约 $30 万。'},
  {id:8,flag:'🇸🇬',country:'Singapore',company:'Cold Storage',product:'高端礼盒系列',score:88,color:'#1f8fd6',tags:['新加坡','高端','紧急'],insight:'AI 分析：Cold Storage 是新加坡高端超市连锁，<strong>目标客群与万仟高端礼盒定位高度吻合</strong>。'},
];

const WA_CONTACTS = [
  {id:0,name:'Klaus Weber',company:'Weber Import GmbH',country:'🇩🇪',av:'K',color:'#1e40af',last:"Sure, we'll confirm the quote tomorrow",time:'now',unread:2,status:'online'},
  {id:1,name:'Rajesh Kumar',company:'Kumar Foods Pte',country:'🇸🇬',av:'R',color:'#065f46',last:'Please send the product catalog',time:'10 min',unread:1,status:'online'},
  {id:2,name:'Ahmed Al-Rashid',company:'Al-Rashid Trading',country:'🇦🇪',av:'A',color:'#7c2d12',last:'Received, reviewing now',time:'1 h',unread:0,status:'offline'},
  {id:3,name:'Carlos Silva',company:'Silva Distribuidora',country:'🇧🇷',av:'C',color:'#1e3a5f',last:"We're very interested in mooncakes",time:'Yesterday',unread:0,status:'offline'},
  {id:4,name:'Yuki Tanaka',company:'Tanaka Foods Co.',country:'🇯🇵',av:'Y',color:'#4a1d96',last:'Can we negotiate on price?',time:'Yesterday',unread:0,status:'offline'},
  {id:5,name:'Sarah Chen',company:'Chen Family Imports',country:'🇺🇸',av:'S',color:'#134e4a',last:'Thank you, looking forward to working together',time:'2 days ago',unread:0,status:'offline'},
];

const WA_CHATS = {
  0: [
    {type:'in',text:'Hello! I am Klaus Weber from Weber Import GmbH in Germany. We specialize in importing Asian foods and are very interested in your festive gift-box range.',time:'09:15'},
    {type:'out',text:'Hello Klaus! Thanks for reaching out. Our festive gift-box range includes premium coconut pastry and fine mooncakes, all meeting EU food-safety standards. Which products are you most interested in?',time:'09:22'},
    {type:'in',text:'Mainly mooncake gift boxes and coconut pastry. We have a steady Chinese-community channel in Germany with strong demand before Mid-Autumn each year. What is your minimum order quantity?',time:'09:35'},
    {type:'out',text:'MOQ is 500 boxes for mooncakes and 300 boxes for coconut pastry. We offer custom packaging and can add German labelling. Shall I send a detailed quote?',time:'09:40'},
    {type:'in',text:'Yes, please send the quote. Also, do you hold EU food-safety certification? That is important for our import.',time:'09:52'},
    {type:'follow',text:'Follow-up: Klaus Weber is waiting for the quote — reply within 2 hours to keep the negotiation warm.'},
  ],
  1: [
    {type:'in',text:'Hello! I am Rajesh from Kumar Foods Singapore. We are interested in your festival gift boxes for the Chinese New Year season.',time:'10:05'},
    {type:'out',text:'Hi Rajesh! Great to connect. Our CNY gift boxes are very popular in Singapore. We have premium coconut pastry and mooncake sets. What quantity are you looking for?',time:'10:12'},
    {type:'in',text:'We need around 2000 boxes for CNY. Can you send me your product catalog with pricing?',time:'10:18'},
  ],
  2: [
    {type:'in',text:'السلام عليكم، أنا أحمد من شركة الراشد للتجارة. نحن مهتمون باستيراد الحلويات الصينية.',time:'11:30'},
    {type:'out',text:'وعليكم السلام أحمد! يسعدنا التعاون معكم. لدينا مجموعة متنوعة من الحلويات الصينية التقليدية. هل يمكنك إخبارنا بالمزيد عن متطلباتكم؟',time:'11:45'},
    {type:'in',text:'نريد تفاصيل عن صناديق الهدايا الخاصة بالأعياد الصينية. شكراً.',time:'12:00'},
  ],
};

const WA_CHIPS = {
  0: ['We hold EC 852/2004 EU food-safety certification and can provide full documents','Preparing a detailed quote for you — expect it within 2 hours, please hold','We offer German-language custom packaging and can print your brand logo on the box'],
  1: ['The product catalog is ready with full specs and pricing — sending it now','We have partner warehousing in Singapore for 3-5 day fast delivery','20% off for 2000+ boxes — for the CNY peak we suggest ordering 3 months ahead'],
  2: ['We can provide Arabic product documentation and Halal certification','Our festive gift boxes are well suited to the Ramadan and Eid market','Happy to set up a video call to walk through our line and terms'],
};

// flat stroke-SVG inner markup for intel-row icons (terminal style, no emoji)
const IROW_ICON = {
  biz:'<path d="M4 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16"/><path d="M12 21V9a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v12"/><path d="M7 7h2M7 11h2M7 15h2M16 12h1M16 16h1"/>',
  cal:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  rev:'<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9v6M18 9v6"/>',
  cart:'<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.4 12.4a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L20.5 8H6"/>',
  phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.66A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>',
  chart:'<path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6"/><rect x="12" y="8" width="3" height="10"/><rect x="17" y="5" width="3" height="13"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  bulb:'<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V18h6v-1.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"/>'
};

const INTEL_DATA = {
  0: {
    name:'Klaus Weber',company:'Weber Import GmbH',country:'Germany',flag:'🇩🇪',score:88,
    basic:[{icon:'biz',key:'Company size',val:'50-100 staff'},{icon:'cal',key:'Founded',val:'2008'},{icon:'rev',key:'Annual revenue',val:'€5M+'},{icon:'cart',key:'Buying frequency',val:'Quarterly'}],
    locked:[{icon:'phone',key:'Direct line',val:'+49 30 XXXX XXXX'},{icon:'mail',key:'Buyer email',val:'k.weber@weber-import.de'},{icon:'chart',key:'Past spend',val:'€1.2M/yr'},{icon:'target',key:'Decision cycle',val:'2-3 weeks'}],
    followup:{ico:'bell',title:'Follow-up',text:'Klaus Weber viewed the product brochure 3 times yesterday — today is the best time to follow up. Send a full quote with EU certification documents.',btn:'Draft follow-up email'}
  },
  1: {
    name:'Rajesh Kumar',company:'Kumar Foods Pte Ltd',country:'Singapore',flag:'🇸🇬',score:93,
    basic:[{icon:'biz',key:'Company size',val:'20-50 staff'},{icon:'cal',key:'Founded',val:'2015'},{icon:'rev',key:'Annual revenue',val:'SGD 3M+'},{icon:'cart',key:'Buying frequency',val:'Monthly'}],
    locked:[{icon:'phone',key:'Direct line',val:'+65 9XXX XXXX'},{icon:'mail',key:'Buyer email',val:'rajesh@kumarfoods.sg'},{icon:'chart',key:'Past spend',val:'SGD 800K/yr'},{icon:'target',key:'Decision cycle',val:'1-2 weeks'}],
    followup:{ico:'bulb',title:'AI suggestion',text:'Rajesh is waiting for the product catalog — send it within 1 hour and include Singapore local warehousing info to strengthen your edge.',btn:'Send product catalog'}
  }
};

const MKT_ITEMS = [
  {id:0,flag:'🇸🇬',name:'Klaus Weber',company:'Weber Import GmbH',product:'Mooncake gift boxes · Europe',score:88,status:'pending'},
  {id:1,flag:'🇲🇾',name:'Rajesh Kumar',company:'Kumar Foods Pte',product:'Coconut pastry boxes · Singapore',score:93,status:'pending'},
  {id:2,flag:'🇺🇸',name:'Sarah Chen',company:'Chen Family Imports',product:'Festive gift boxes · N. America',score:89,status:'pending'},
  {id:3,flag:'🇦🇺',name:'James Wong',company:'Asian Grocery Pty',product:'Premium mooncakes · Oceania',score:84,status:'pending'},
  {id:4,flag:'🇹🇭',name:'Somchai Patel',company:'Central Food Hall',product:'Coconut pastry · Thailand',score:87,status:'pending'},
  {id:5,flag:'🇨🇦',name:'Emily Zhang',company:'T&T Supermarket',product:'Festive gift boxes · Canada',score:91,status:'approved'},
  {id:6,flag:'🇮🇩',name:'Budi Santoso',company:'Transmart Carrefour',product:'Chinese pastry · Indonesia',score:82,status:'pending'},
];

const EMAIL_VARIANTS = {
  0: [
    {hook:'Cultural angle',subject:'Authentic Zhangpu flavor — festive nostalgia for Germany\'s Chinese community',conf:92,body:`Dear Mr. Klaus Weber,

Hello! This is Liu Wei from Wanqian Foods.

I noticed that Weber Import GmbH has years of experience in Germany's Chinese-food market, with steady demand for festive gift boxes.

Founded in 1991 and rooted in Zhangpu for 35 years, Wanqian is a flagship brand for authentic Zhangpu-style pastry. Our premium festive gift-box range — especially the coconut pastry boxes and fine mooncakes — is widely recognized across Southeast Asia's Chinese market.

For the European market, we offer:
• Compliance with EC 852/2004 EU food-safety standards
• Bilingual German/English custom packaging
• Minimum order of 500 boxes, mixed orders supported

I'd love to explore a possible partnership with you.

Liu Wei | Wanqian Foods · International Business`},
    {hook:'Data-driven',subject:'Germany\'s Chinese festive-food market: a $2.3M sourcing opportunity',conf:87,body:`Mr. Klaus Weber,

Hello!

Per our market data, Germany's Chinese community (~210,000 people) spends about $2.3M a year on festive foods, with authentic Chinese pastry taking a steadily rising share.

As the largest festive-pastry producer in the Zhangpu region (15,000 tonnes annual capacity), Wanqian can give your company a stable, high-quality supply.

Our partners include well-known chains such as Fairprice in Singapore and Jaya Grocer in Malaysia, all of whom rate our quality highly.

Could we schedule a 15-minute video call this week?

Liu Wei`},
    {hook:'Festive timing',subject:'90 days to Mid-Autumn: catch the European Chinese gift-box window',conf:85,body:`Mr. Klaus Weber,

Mid-Autumn is 90 days away — the prime window for European Chinese festive-food sourcing.

This time last year we exported over 50,000 festive gift boxes for European clients. Capacity is planned ahead this year, but premium slots are limited.

Wanqian's fine mooncake boxes (4 flavors, incl. classic lotus-seed and a low-sugar line) and coconut pastry boxes (a Zhangpu specialty, exclusive recipe) are the two most popular products in Europe's Chinese community.

If you're interested, I'd suggest confirming an indicative quantity this week so we can reserve capacity for you.

Looking forward to your reply!

Liu Wei | Wanqian Foods`},
  ]
};

const INTEL_CENTER_CARDS = [
  {id:0,icon:'🇸🇬',bg:'rgba(31,143,214,.08)',title:'Singapore festive gift-box demand',sub:'Fairprice Group · updated today',badge:'new',badgeText:'New',rows:[{label:'Demand volume',val:'5,000-8,000 boxes'},{label:'Target products',val:'Mooncake & coconut pastry'},{label:'Budget',val:'SGD 15-25/box'},{label:'Delivery',val:'45 days before Mid-Autumn'}],locked:false},
  {id:1,icon:'🇲🇾',bg:'rgba(31,143,214,.06)',title:'Malaysia mooncake wholesaler',sub:'Jaya Grocer · updated today',badge:'new',badgeText:'New',rows:[{label:'Demand volume',val:'3,000-5,000 boxes'},{label:'Target products',val:'Premium mooncake boxes'},{label:'Budget',val:'MYR 45-80/box'},{label:'Delivery',val:'60 days before Dragon Boat'}],locked:false},
  {id:2,icon:'🇺🇸',bg:'rgba(23,166,115,.06)',title:'N. America Chinese-supermarket buy',sub:'99 Ranch Market · updated yesterday',badge:'locked',badgeText:'Deep intel',rows:[{label:'Demand volume',val:'██████ boxes'},{label:'Annual contract',val:'$██████'},{label:'Decision maker',val:'██████'},{label:'Contact',val:'██████'}],locked:true},
  {id:3,icon:'🇦🇺',bg:'rgba(30,95,200,.06)',title:'Oceania Chinese-community buy',sub:'Asian Grocery Pty · 2 days ago',badge:'locked',badgeText:'Deep intel',rows:[{label:'Demand volume',val:'██████ boxes'},{label:'Annual contract',val:'$██████'},{label:'Decision maker',val:'██████'},{label:'Contact',val:'██████'}],locked:true},
];

const AI_MSGS = [
  'Today: <strong>Klaus Weber</strong> viewed your brochure yesterday — send a quote follow-up today for a strong close.',
  "Signal: Singapore's <strong>Fairprice Group</strong> just posted a festive-gift-box demand — match <strong style=\"color:#17a673\">96</strong>. Connect first.",
  'Queue: <strong>7 emails</strong> await your approval, 3 high-priority — clear them today.',
  "Follow-up: it's been over 7 days since <strong>Carlos Silva</strong> — message today before the deal cools.",
];

// ═══════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════
let currentPage = 'dashboard';
let currentWaContact = 0;
let currentMktItem = null;
let currentVariant = 0;
let aiMsgIdx = 0;
let credits = 47;
let intelUnlockTarget = null;
let intelPanelUnlockTarget = null;
const unlockedIntel = {};
let obSlide = 0;
let obTimer = null;
let pendingCount = 7;
let connectTarget = null;
let actIdx = 0;
let actIntervalId = null;

// ═══════════════════════════════════════════════════════
// LOGIN + WEBSITE MODAL + SCAN FLOW
// ═══════════════════════════════════════════════════════

// — Login page background particles
(function initLoginParticles() {
  const canvas = document.getElementById('reg-particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  const COLORS = ['rgba(31,143,214,','rgba(31,143,214,','rgba(30,95,200,','rgba(23,166,115,'];
  for (let i = 0; i < 80; i++) {
    particles.push({ x:Math.random()*1920, y:Math.random()*1080, vx:(Math.random()-.5)*.35, vy:(Math.random()-.5)*.35, r:Math.random()*1.4+.4, c:COLORS[Math.floor(Math.random()*COLORS.length)], a:Math.random()*.4+.1 });
  }
  function draw() {
    ctx.clearRect(0,0,W,H);
    particles.forEach(p => {
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=W; if(p.x>W)p.x=0; if(p.y<0)p.y=H; if(p.y>H)p.y=0;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=p.c+p.a+')'; ctx.fill();
    });
    for(let i=0;i<particles.length;i++) for(let j=i+1;j<particles.length;j++) {
      const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y;
      const d=Math.sqrt(dx*dx+dy*dy);
      if(d<110){ ctx.beginPath(); ctx.strokeStyle='rgba(31,143,214,'+(0.07*(1-d/110))+')'; ctx.lineWidth=.5; ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y); ctx.stroke(); }
    }
    requestAnimationFrame(draw);
  }
  draw();
  // Enter key on login
  document.addEventListener('keydown', e => { if(e.key==='Enter' && document.getElementById('s-register').classList.contains('active')) doLogin(); });
})();

function doLogin() {
  const btn = document.querySelector('.login-btn');
  if(btn) { btn.textContent = 'Signing in…'; btn.style.opacity='.7'; }
  setTimeout(() => {
    // show website modal
    const modal = document.getElementById('website-modal-overlay');
    if(modal) {
      modal.style.display='flex';
      modal.style.opacity='0';
      modal.style.transition='opacity .4s ease';
      requestAnimationFrame(() => { modal.style.opacity='1'; });
      const inp = document.getElementById('wm-url-input');
      if(inp) inp.addEventListener('keydown', e => { if(e.key==='Enter') startScan(); });
    }
    if(btn) { btn.textContent='Sign in'; btn.style.opacity='1'; }
  }, 900);
}

function startScan() {
  const domain = (document.getElementById('wm-url-input') || {value:'wanqianfood.com'}).value.trim() || 'wanqianfood.com';
  // hide modal
  const modal = document.getElementById('website-modal-overlay');
  if(modal) { modal.style.opacity='0'; setTimeout(()=>modal.style.display='none',400); }

  // The redesigned self-assembling analysis screen (FirstRunAnalysis.vue) — registered
  // on App mount as window.__showAnalysis. (Replaced the old fake-scan/chapter overlay;
  // that dead path referenced #reg-scan-overlay/#s-onboard, both removed — see R076/R080.)
  if (window.__showAnalysis) window.__showAnalysis(domain);
}

function goStep(n) {} // legacy stub
function startAnalysis() { startScan(); }

// ═══════════════════════════════════════════════════════
// ONBOARDING MAP ANIMATION ENGINE
// ═══════════════════════════════════════════════════════

// World map simplified paths (Mercator projection, normalized 0-1)
// Each region: [id, name, color, cx, cy, points...]
const MAP_REGIONS = [
  // China (origin)
  { id:'cn', name:'中国·漳州', cx:0.735, cy:0.355, color:'#1e5fd0', radius:6, glow:true },
  // Southeast Asia
  { id:'sea', name:'东南亚', cx:0.76, cy:0.48, color:'#17a673', radius:5 },
  // North America
  { id:'na', name:'北美', cx:0.19, cy:0.30, color:'#1e5fd0', radius:5 },
  // Australia
  { id:'au', name:'澳洲', cx:0.82, cy:0.65, color:'#1f8fd6', radius:5 },
  // Europe
  { id:'eu', name:'欧洲', cx:0.50, cy:0.22, color:'#1e5fd0', radius:4 },
  // Middle East
  { id:'me', name:'中东', cx:0.575, cy:0.37, color:'#c8860a', radius:3.5 },
];

// City light clusters [x, y, intensity]
const CITY_LIGHTS = [
  // East Asia
  [0.735,0.31,1.0],[0.745,0.325,0.9],[0.76,0.30,0.8],[0.78,0.315,0.7],[0.72,0.34,0.8],
  [0.755,0.355,1.0],[0.77,0.345,0.7],[0.74,0.295,0.6],[0.79,0.30,0.6],[0.71,0.32,0.5],
  // SE Asia
  [0.755,0.445,0.9],[0.76,0.465,0.8],[0.77,0.48,0.9],[0.745,0.46,0.7],[0.78,0.50,0.7],
  [0.765,0.495,0.6],[0.74,0.49,0.6],[0.785,0.47,0.5],[0.75,0.51,0.5],
  // South Asia
  [0.665,0.40,0.8],[0.675,0.415,0.7],[0.685,0.40,0.6],[0.66,0.425,0.6],[0.695,0.42,0.5],
  // Europe
  [0.48,0.20,0.9],[0.50,0.19,0.9],[0.52,0.20,0.8],[0.505,0.215,0.8],[0.49,0.225,0.7],
  [0.515,0.195,0.7],[0.475,0.215,0.6],[0.535,0.205,0.6],[0.46,0.22,0.5],[0.545,0.215,0.5],
  [0.525,0.225,0.6],[0.49,0.235,0.5],[0.555,0.22,0.5],[0.47,0.19,0.5],
  // North America
  [0.175,0.275,0.9],[0.19,0.28,0.9],[0.205,0.285,0.8],[0.165,0.285,0.8],[0.22,0.275,0.7],
  [0.185,0.295,0.7],[0.195,0.265,0.7],[0.155,0.295,0.6],[0.215,0.295,0.6],[0.175,0.305,0.5],
  [0.145,0.285,0.5],[0.23,0.285,0.5],[0.20,0.305,0.5],
  // Australia
  [0.815,0.635,0.8],[0.825,0.645,0.8],[0.835,0.64,0.7],[0.82,0.655,0.7],[0.81,0.645,0.6],
  [0.84,0.635,0.5],[0.805,0.655,0.5],[0.845,0.645,0.5],
  // Middle East
  [0.565,0.355,0.7],[0.575,0.365,0.7],[0.585,0.36,0.6],[0.56,0.37,0.6],[0.59,0.37,0.5],
  // Africa
  [0.505,0.44,0.5],[0.515,0.455,0.5],[0.495,0.46,0.4],[0.525,0.445,0.4],[0.505,0.47,0.4],
  // South America
  [0.28,0.52,0.6],[0.29,0.535,0.6],[0.275,0.54,0.5],[0.285,0.52,0.5],[0.30,0.525,0.5],
];

// Continent outlines (simplified polygons, normalized 0-1)
const CONTINENTS = [
  // North America
  { color:'rgba(31,143,214,0.12)', points:[[0.08,0.12],[0.22,0.10],[0.30,0.14],[0.32,0.22],[0.28,0.32],[0.22,0.40],[0.18,0.44],[0.15,0.42],[0.12,0.36],[0.08,0.28],[0.06,0.20]] },
  // South America
  { color:'rgba(31,143,214,0.10)', points:[[0.23,0.43],[0.30,0.41],[0.34,0.46],[0.33,0.56],[0.30,0.66],[0.26,0.70],[0.22,0.66],[0.20,0.56],[0.21,0.48]] },
  // Europe
  { color:'rgba(30,95,200,0.14)', points:[[0.43,0.14],[0.55,0.12],[0.58,0.16],[0.56,0.24],[0.52,0.28],[0.47,0.28],[0.43,0.24],[0.42,0.18]] },
  // Africa
  { color:'rgba(200,134,10,0.10)', points:[[0.45,0.28],[0.56,0.26],[0.60,0.32],[0.58,0.46],[0.54,0.58],[0.50,0.62],[0.46,0.58],[0.43,0.46],[0.43,0.36]] },
  // Asia (main)
  { color:'rgba(31,143,214,0.13)', points:[[0.57,0.12],[0.80,0.10],[0.90,0.16],[0.92,0.26],[0.86,0.36],[0.80,0.42],[0.74,0.46],[0.68,0.44],[0.62,0.38],[0.58,0.30],[0.56,0.22]] },
  // SE Asia peninsula
  { color:'rgba(23,166,115,0.12)', points:[[0.72,0.40],[0.78,0.40],[0.80,0.46],[0.79,0.54],[0.76,0.56],[0.73,0.52],[0.71,0.46]] },
  // Australia
  { color:'rgba(31,143,214,0.12)', points:[[0.79,0.58],[0.88,0.56],[0.92,0.62],[0.90,0.70],[0.84,0.74],[0.78,0.72],[0.76,0.66],[0.77,0.60]] },
];

let obMapCanvas, obMapCtx, obMapW, obMapH;
let obArcs = []; // active flying arcs
let obMapAnimFrame;
let obCurrentChapter = 0;
let obVisibleRegions = new Set(['cn']);

const OB_CHAPTERS_MAP = [
  { title:'正在扫描产品信息与官网…', mapFocus:'cn' },
  { title:'Chapter 01 · 全球烘焙市场格局', mapFocus:'world' },
  { title:'Chapter 02 · 出海竞争格局分析', mapFocus:'sea' },
  { title:'Chapter 03 · 核心优势与差异化定位', mapFocus:'cn' },
  { title:'Chapter 04 · 全球目标市场分级策略', mapFocus:'world' },
  { title:'Chapter 05 · 战略总结与行动建议', mapFocus:'world' },
  { title:'分析完成 · 专属工作台已就绪', mapFocus:'world' },
];

const OB_CONTENTS = [
  // Chapter 0: scanning
  `<div style="padding:32px 28px;height:100%;display:flex;flex-direction:column;justify-content:center">
    <div style="font-size:10px;letter-spacing:.12em;color:#1f8fd6;text-transform:uppercase;margin-bottom:16px">TRANS·MISSION · AI 分析引擎</div>
    <div style="font-size:30px;font-weight:800;line-height:1.25;margin-bottom:12px">正在为<br/><span style="background:linear-gradient(135deg,#1e5fd0,#1f8fd6);-webkit-background-clip:text;-webkit-text-fill-color:transparent">万仙糕饼</span><br/>建立全球拓客模型</div>
    <div style="font-size:13px;color:rgba(19,33,63,.55);line-height:1.7;margin-bottom:28px">AI 正在扫描官网与产品信息，结合全球 2.8M+ 采购数据库，生成专属市场分析报告…</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div style="background:rgba(31,143,214,.1);border:1px solid rgba(31,143,214,.2);border-radius:12px;padding:14px">
        <div style="font-size:22px;font-weight:800;color:#1e5fd0" id="ob-counter">0</div>
        <div style="font-size:11px;color:rgba(19,33,63,.4);margin-top:4px">正在扫描商机数</div>
      </div>
      <div style="background:rgba(31,143,214,.08);border:1px solid rgba(31,143,214,.15);border-radius:12px;padding:14px">
        <div style="font-size:22px;font-weight:800;color:#1f8fd6">4</div>
        <div style="font-size:11px;color:rgba(19,33,63,.4);margin-top:4px">目标市场</div>
      </div>
      <div style="background:rgba(23,166,115,.08);border:1px solid rgba(23,166,115,.15);border-radius:12px;padding:14px">
        <div style="font-size:22px;font-weight:800;color:#17a673">400+</div>
        <div style="font-size:11px;color:rgba(19,33,63,.4);margin-top:4px">可出海 SKU</div>
      </div>
      <div style="background:rgba(200,134,10,.08);border:1px solid rgba(200,134,10,.15);border-radius:12px;padding:14px">
        <div style="font-size:22px;font-weight:800;color:#c8860a">35年</div>
        <div style="font-size:11px;color:rgba(19,33,63,.4);margin-top:4px">品牌沉淠</div>
      </div>
    </div>
  </div>`,

  // Chapter 1: Global market
  `<div style="padding:28px;height:100%;display:flex;flex-direction:column;overflow-y:auto">
    <div style="font-size:10px;letter-spacing:.12em;color:#1f8fd6;text-transform:uppercase;margin-bottom:12px">Chapter 01 · 全球烘焙市场格局</div>
    <div style="font-size:24px;font-weight:800;line-height:1.3;margin-bottom:10px">全球烘焙市场<br/><span style="color:#1e5fd0">高速增长</span></div>
    <div style="font-size:12px;color:rgba(19,33,63,.5);line-height:1.7;margin-bottom:20px">6000万海外华人构成中式糕点出海的核心消费基盘。亚太地区以最高速度领跑全球烘焙市场。</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px">
      <div style="background:rgba(31,143,214,.1);border:1px solid rgba(31,143,214,.2);border-radius:10px;padding:12px"><div style="font-size:18px;font-weight:800;color:#1e5fd0">5240亿</div><div style="font-size:10px;color:rgba(19,33,63,.4);margin-top:3px">2025全球市场规模</div></div>
      <div style="background:rgba(31,143,214,.08);border:1px solid rgba(31,143,214,.15);border-radius:10px;padding:12px"><div style="font-size:18px;font-weight:800;color:#1f8fd6">8785亿</div><div style="font-size:10px;color:rgba(19,33,63,.4);margin-top:3px">2035年预测规模</div></div>
      <div style="background:rgba(23,166,115,.08);border:1px solid rgba(23,166,115,.15);border-radius:10px;padding:12px"><div style="font-size:18px;font-weight:800;color:#17a673">6000万+</div><div style="font-size:10px;color:rgba(19,33,63,.4);margin-top:3px">全球华人华侨人口</div></div>
      <div style="background:rgba(200,134,10,.08);border:1px solid rgba(200,134,10,.15);border-radius:10px;padding:12px"><div style="font-size:18px;font-weight:800;color:#c8860a">95.2%</div><div style="font-size:10px;color:rgba(19,33,63,.4);margin-top:3px">椒子出口同比增速</div></div>
    </div>
    <div style="font-size:11px;color:rgba(19,33,63,.35);margin-bottom:8px">目标市场优先级</div>
    ${[{f:'🇸🇬',n:'东南亚',g:'6.6%',p:'3300万+',c:'#17a673',l:'首选'},{f:'🇺🇸',n:'北美',g:'4.2%',p:'530万+',c:'#1e5fd0',l:'重点'},{f:'🇦🇺',n:'澳洲',g:'4.0%',p:'120万+',c:'#1f8fd6',l:'重点'},{f:'🇬🇧',n:'欧洲',g:'3.8%',p:'215万+',c:'#1e5fd0',l:'布局'}].map(r=>`
    <div style="display:flex;align-items:center;gap:10px;padding:9px 12px;background:rgba(19,33,63,.03);border-radius:8px;margin-bottom:6px;border-left:2px solid ${r.c}">
      <span style="font-size:16px">${r.f}</span>
      <span style="font-size:13px;font-weight:600;flex:1">${r.n}</span>
      <span style="font-size:12px;color:${r.c};font-weight:700">${r.g}</span>
      <span style="font-size:10px;color:rgba(19,33,63,.35)">${r.p}</span>
      <span style="font-size:10px;background:${r.c}22;color:${r.c};padding:2px 8px;border-radius:20px;font-weight:600">${r.l}</span>
    </div>`).join('')}
  </div>`,

  // Chapter 2: Competition
  `<div style="padding:28px;height:100%;display:flex;flex-direction:column;overflow-y:auto">
    <div style="font-size:10px;letter-spacing:.12em;color:#1f8fd6;text-transform:uppercase;margin-bottom:12px">Chapter 02 · 出海竞争格局</div>
    <div style="font-size:24px;font-weight:800;line-height:1.3;margin-bottom:10px">竞争格局：<br/><span style="color:#1f8fd6">万仙的差异化机会</span></div>
    <div style="font-size:12px;color:rgba(19,33,63,.5);line-height:1.7;margin-bottom:18px">海外中式烘焙市场呈现三足鼎立格局，万仙需以差异化定位突破发力。</div>
    ${[{d:'品牌知名度',v:'待建立，差异化突破',c:'#1e5fd0'},{d:'产品特色',v:'漳浦风味 · 高端节庆礼盒',c:'#17a673'},{d:'产品宽度',v:'400+ SKU，全场景覆盖',c:'#1f8fd6'},{d:'价格定位',v:'中高价 · 高端礼品线',c:'#c8860a'},{d:'供应链',v:'双基地 · 待建出口体系',c:'#1e5fd0'}].map((r,i)=>`
    <div style="display:flex;gap:12px;align-items:flex-start;padding:10px 12px;background:rgba(19,33,63,.03);border-radius:8px;margin-bottom:8px;border:1px solid rgba(19,33,63,.06);animation:fadeInUp .4s ease ${i*.1}s both">
      <div style="width:3px;height:36px;background:${r.c};border-radius:2px;flex-shrink:0;margin-top:2px"></div>
      <div><div style="font-size:11px;color:rgba(19,33,63,.4);margin-bottom:3px">${r.d}</div><div style="font-size:13px;font-weight:600;color:#fff">${r.v}</div></div>
    </div>`).join('')}
  </div>`,

  // Chapter 3: Strengths
  `<div style="padding:28px;height:100%;display:flex;flex-direction:column;overflow-y:auto">
    <div style="font-size:10px;letter-spacing:.12em;color:#1f8fd6;text-transform:uppercase;margin-bottom:12px">Chapter 03 · 核心优势</div>
    <div style="font-size:24px;font-weight:800;line-height:1.3;margin-bottom:10px">四大核心资产<br/><span style="color:#17a673">构建差异化竞争壁垒</span></div>
    <div style="font-size:12px;color:rgba(19,33,63,.5);line-height:1.7;margin-bottom:20px">以漳浦饼文化 IP、高端节庆礼盒和双基地供应为出海三大核心资产。</div>
    ${[{i:'文',t:'漳浦饼文化 IP',d:'380年漳浦饼文化深厚积淠，“正宗漳浦风味”是海外市场稀缺的品牌差异化标签',c:'#1e5fd0'},{i:'🎁',t:'高端节庆礼盒',d:'椒子礼盒、精品月饼礼盒为核心，高客单价、节庆场景强需求、复购率高',c:'#17a673'},{i:'🔗',t:'双基地供应保障',d:'近万亩产能基地，7000m²标准厂房，具备充足扩大出口产能的基础条件',c:'#1f8fd6'},{i:'🏅',t:'35年品牌背书',d:'1991年创立，每日新鲜烘焙的品质承诺，各类食品管理体系认证',c:'#1e5fd0'}].map((p,i)=>`
    <div style="display:flex;gap:14px;align-items:flex-start;padding:12px;background:rgba(19,33,63,.03);border-radius:10px;margin-bottom:10px;border:1px solid rgba(19,33,63,.06);animation:fadeInUp .4s ease ${i*.12}s both">
      <div style="width:36px;height:36px;background:${p.c}22;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">${p.i}</div>
      <div><div style="font-size:13px;font-weight:700;margin-bottom:4px">${p.t}</div><div style="font-size:11px;color:rgba(19,33,63,.45);line-height:1.6">${p.d}</div></div>
    </div>`).join('')}
  </div>`,

  // Chapter 4: Strategy
  `<div style="padding:28px;height:100%;display:flex;flex-direction:column;overflow-y:auto">
    <div style="font-size:10px;letter-spacing:.12em;color:#1f8fd6;text-transform:uppercase;margin-bottom:12px">Chapter 04 · 全球市场分级策略</div>
    <div style="font-size:24px;font-weight:800;line-height:1.3;margin-bottom:10px">四级递进策略<br/><span style="color:#c8860a">以最低风险实现最大覆盖</span></div>
    ${[{l:'T1 · 优先进入',t:'🇸🇬 东南亚华人聚集市场',d:'新加坡、马来西亚、泰国、印尼，华人 3300万+，节庆消费需求旺盛',tm:'12-18 个月内进入',c:'#17a673'},{l:'T2 · 重点布局',t:'🇺🇸 北美华人社区市场',d:'纽约、洛杉矶、温哥华、多伦多，华人 530万+，消费能力强',tm:'18-36 个月内进入',c:'#1e5fd0'},{l:'T3 · 战略备选',t:'🇦🇺 澳洲/新西兰·欧洲',d:'悉尼、墨尔本、伦敦，华人 335万+，节庆礼品市场稳定',tm:'2-4 年内进入',c:'#1f8fd6'},{l:'T4 · 长期拓展',t:'🌏 本土化渗透：东南亚主流市场',d:'越南、菲律宾、缅甸，开发当地化口味创新产品线',tm:'4 年以上',c:'#1e5fd0'}].map((t,i)=>`
    <div style="padding:12px 14px;background:rgba(19,33,63,.03);border-radius:10px;margin-bottom:10px;border-left:3px solid ${t.c};animation:fadeInUp .4s ease ${i*.12}s both">
      <div style="font-size:10px;color:${t.c};font-weight:700;letter-spacing:.06em;margin-bottom:4px">${t.l}</div>
      <div style="font-size:13px;font-weight:700;margin-bottom:5px">${t.t}</div>
      <div style="font-size:11px;color:rgba(19,33,63,.45);line-height:1.6;margin-bottom:6px">${t.d}</div>
      <div style="font-size:10px;color:rgba(19,33,63,.3)">⏱ ${t.tm}</div>
    </div>`).join('')}
  </div>`,

  // Chapter 5: Actions
  `<div style="padding:28px;height:100%;display:flex;flex-direction:column;overflow-y:auto">
    <div style="font-size:10px;letter-spacing:.12em;color:#1f8fd6;text-transform:uppercase;margin-bottom:12px">Chapter 05 · 战略总结与行动建议</div>
    <div style="font-size:24px;font-weight:800;line-height:1.3;margin-bottom:10px">5 项近期<br/><span style="color:#f472b6">优先行动</span></div>
    ${['启动新加坡、马来西亚食品进口合规认证，完成高端椒子礼盒和月饼礼盒的出口包装本地化设计','接触东南亚华人食品分销商，以端午节椒子礼盒为切入产品，启动限批 B2B 出口合作','在 Lazada、Shopee、亚马逊开设官方旗舰店，以节庆礼盒为主力 SKU，配合中秋/端午节点重点投放','与海外华人 KOL 建立合作，以“漳浦糕饼文化”为内容主线，在节庆前 1-2 个月启动品牌传播','参加 Bakery China 2026 等行业出海展会，建立行业出海资源网络，寻找东南亚落地品牌合作伙伴'].map((a,i)=>`
    <div style="display:flex;gap:12px;align-items:flex-start;padding:10px 12px;background:rgba(19,33,63,.03);border-radius:8px;margin-bottom:8px;animation:fadeInUp .4s ease ${i*.1}s both">
      <div style="width:22px;height:22px;background:linear-gradient(135deg,#1f8fd6,#1e5fd0);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;margin-top:1px">${i+1}</div>
      <div style="font-size:12px;color:rgba(19,33,63,.65);line-height:1.65">${a}</div>
    </div>`).join('')}
  </div>`,

  // Chapter 6: Final CTA
  `<div style="padding:32px 28px;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center">
    <div style="width:56px;height:56px;background:linear-gradient(135deg,#1f8fd6,#1e5fd0);border-radius:16px;display:flex;align-items:center;justify-content:center;margin-bottom:20px">
      <svg viewBox="0 0 24 24" style="width:28px;height:28px;stroke:#fff;fill:none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
    </div>
    <div style="font-size:11px;letter-spacing:.12em;color:#1f8fd6;text-transform:uppercase;margin-bottom:12px">分析完成 · 专属工作台已就绪</div>
    <div style="font-size:28px;font-weight:800;line-height:1.3;margin-bottom:12px">为万仙糕饼锁定<br/><span style="background:linear-gradient(135deg,#1e5fd0,#1f8fd6);-webkit-background-clip:text;-webkit-text-fill-color:transparent">2,847 个高价値商机</span></div>
    <div style="font-size:12px;color:rgba(19,33,63,.5);line-height:1.7;margin-bottom:24px">AI 已完成全球市场分析，为您精准筛选出与节庆礼盒高度匹配的采购商，涵盖东南亚、北美、澳洲三大核心市场。</div>
    <div style="display:flex;gap:16px;margin-bottom:24px">
      <div style="text-align:center"><div style="font-size:24px;font-weight:800;color:#1e5fd0">2,847</div><div style="font-size:10px;color:rgba(19,33,63,.4)">精准商机</div></div>
      <div style="width:1px;background:rgba(19,33,63,.1)"></div>
      <div style="text-align:center"><div style="font-size:24px;font-weight:800;color:#1f8fd6">98,241</div><div style="font-size:10px;color:rgba(19,33,63,.4)">今日新增需求</div></div>
      <div style="width:1px;background:rgba(19,33,63,.1)"></div>
      <div style="text-align:center"><div style="font-size:24px;font-weight:800;color:#17a673">94%</div><div style="font-size:10px;color:rgba(19,33,63,.4)">匹配准确率</div></div>
    </div>
    <button onclick="enterApp()" style="background:linear-gradient(135deg,#1f8fd6,#1e5fd0);border:none;border-radius:12px;padding:14px 32px;font-size:14px;font-weight:700;color:#fff;cursor:pointer;letter-spacing:.04em">进入我的专属工作台 →</button>
  </div>`,
];

const OB_DURATIONS_MAP = [3500, 6000, 5500, 5500, 6000, 5500, 0];

function runOnboarding() {
  obSlide = 0;
  initMapCanvas();
  showObChapter(0);
  scheduleNext();
}

function initMapCanvas() {
  obMapCanvas = document.getElementById('ob-map-canvas');
  if (!obMapCanvas) return;
  obMapCtx = obMapCanvas.getContext('2d');
  function resizeMap() {
    const parent = obMapCanvas.parentElement;
    obMapW = obMapCanvas.width = parent.clientWidth;
    obMapH = obMapCanvas.height = parent.clientHeight;
  }
  resizeMap();
  window.addEventListener('resize', resizeMap);
  // Build dots row
  const dotsRow = document.getElementById('ob-dots-row');
  if(dotsRow) {
    dotsRow.innerHTML = OB_CHAPTERS_MAP.map((_,i) => `<div id="ob-dot-${i}" style="width:6px;height:6px;border-radius:50%;background:${i===0?'#1e5fd0':'rgba(19,33,63,.2)'};transition:.3s"></div>`).join('');
  }
  drawMap();
}

function drawMap() {
  if (!obMapCtx) return;
  const ctx = obMapCtx;
  const W = obMapW, H = obMapH;
  ctx.clearRect(0,0,W,H);

  // Background
  const bg = ctx.createRadialGradient(W*.5, H*.5, 0, W*.5, H*.5, W*.7);
  bg.addColorStop(0, '#ffffff');
  bg.addColorStop(1, '#050810');
  ctx.fillStyle = bg;
  ctx.fillRect(0,0,W,H);

  // Draw continents
  CONTINENTS.forEach(cont => {
    ctx.beginPath();
    cont.points.forEach(([px,py],i) => {
      const x = px*W, y = py*H;
      i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    });
    ctx.closePath();
    ctx.fillStyle = cont.color;
    ctx.fill();
    ctx.strokeStyle = cont.color.replace(/,[\d.]+\)$/, ',.3)');
    ctx.lineWidth = .5;
    ctx.stroke();
  });

  // Draw city lights
  CITY_LIGHTS.forEach(([lx,ly,intensity]) => {
    const x = lx*W, y = ly*H;
    const isActive = obVisibleRegions.has('world') || isNearActiveRegion(lx, ly);
    const alpha = isActive ? intensity * .85 : intensity * .25;
    const r = isActive ? intensity * 1.8 + .4 : .6;
    const grd = ctx.createRadialGradient(x,y,0,x,y,r*3);
    grd.addColorStop(0, `rgba(255,240,180,${alpha})`);
    grd.addColorStop(.4, `rgba(255,200,100,${alpha*.5})`);
    grd.addColorStop(1, 'rgba(255,150,50,0)');
    ctx.beginPath();
    ctx.arc(x,y,r*3,0,Math.PI*2);
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x,y,r*.5,0,Math.PI*2);
    ctx.fillStyle = `rgba(255,255,220,${alpha})`;
    ctx.fill();
  });

  // Draw region markers
  MAP_REGIONS.forEach(reg => {
    if (!obVisibleRegions.has(reg.id) && !obVisibleRegions.has('world')) return;
    const x = reg.cx*W, y = reg.cy*H;
    const pulse = .5 + .5*Math.sin(Date.now()*.002 + reg.cx*10);
    // Glow ring
    const grd = ctx.createRadialGradient(x,y,0,x,y,reg.radius*4);
    grd.addColorStop(0, reg.color+'55');
    grd.addColorStop(1, reg.color+'00');
    ctx.beginPath();
    ctx.arc(x,y,reg.radius*4,0,Math.PI*2);
    ctx.fillStyle = grd;
    ctx.fill();
    // Pulse ring
    ctx.beginPath();
    ctx.arc(x,y,reg.radius*(1+pulse*1.5),0,Math.PI*2);
    ctx.strokeStyle = reg.color+(Math.round((1-pulse)*.4*255).toString(16).padStart(2,'0'));
    ctx.lineWidth = 1;
    ctx.stroke();
    // Core dot
    ctx.beginPath();
    ctx.arc(x,y,reg.radius,0,Math.PI*2);
    ctx.fillStyle = reg.color;
    ctx.fill();
    // Label
    ctx.font = 'bold 10px Inter, sans-serif';
    ctx.fillStyle = 'rgba(19,33,63,.8)';
    ctx.textAlign = 'center';
    ctx.fillText(reg.name, x, y - reg.radius - 6);
  });

  // Draw arcs
  obArcs = obArcs.filter(arc => {
    arc.progress += arc.speed;
    if (arc.progress >= 1) return false;
    drawArc(ctx, arc, W, H);
    return true;
  });

  requestAnimationFrame(drawMap);
}

function isNearActiveRegion(lx, ly) {
  for (const reg of MAP_REGIONS) {
    if (!obVisibleRegions.has(reg.id)) continue;
    const dx = lx - reg.cx, dy = ly - reg.cy;
    if (Math.sqrt(dx*dx+dy*dy) < .12) return true;
  }
  return false;
}

function drawArc(ctx, arc, W, H) {
  const x1 = arc.x1*W, y1 = arc.y1*H;
  const x2 = arc.x2*W, y2 = arc.y2*H;
  const mx = (x1+x2)/2, my = (y1+y2)/2 - Math.sqrt((x2-x1)**2+(y2-y1)**2)*.35;
  const p = arc.progress;
  // Draw trail
  const steps = 40;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = (p - .3 + .3*(i/steps)) < 0 ? 0 : Math.min(p, p - .3 + .3*(i/steps));
    if (t <= 0) continue;
    const bt = getBezier(x1,y1,mx,my,x2,y2,t);
    const alpha = (i/steps) * .7;
    if (i === 0) ctx.moveTo(bt.x, bt.y);
    else ctx.lineTo(bt.x, bt.y);
  }
  ctx.strokeStyle = arc.color+'88';
  ctx.lineWidth = 1.2;
  ctx.stroke();
  // Draw head
  const head = getBezier(x1,y1,mx,my,x2,y2,p);
  const grd = ctx.createRadialGradient(head.x,head.y,0,head.x,head.y,5);
  grd.addColorStop(0, arc.color);
  grd.addColorStop(1, arc.color+'00');
  ctx.beginPath();
  ctx.arc(head.x,head.y,5,0,Math.PI*2);
  ctx.fillStyle = grd;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(head.x,head.y,2,0,Math.PI*2);
  ctx.fillStyle = '#fff';
  ctx.fill();
}

function getBezier(x1,y1,mx,my,x2,y2,t) {
  const x = (1-t)**2*x1 + 2*(1-t)*t*mx + t**2*x2;
  const y = (1-t)**2*y1 + 2*(1-t)*t*my + t**2*y2;
  return {x,y};
}

function launchArc(fromId, toId, color) {
  const from = MAP_REGIONS.find(r=>r.id===fromId);
  const to = MAP_REGIONS.find(r=>r.id===toId);
  if (!from || !to) return;
  obArcs.push({ x1:from.cx, y1:from.cy, x2:to.cx, y2:to.cy, color, progress:0, speed:.008 });
}

function scheduleNext() {
  if(obSlide >= OB_DURATIONS_MAP.length-1) return;
  obTimer = setTimeout(() => { advanceOb(); }, OB_DURATIONS_MAP[obSlide]);
}

function advanceOb() {
  if(obSlide >= OB_CHAPTERS_MAP.length-1) return;
  obSlide++;
  showObChapter(obSlide);
  scheduleNext();
}

function showObChapter(n) {
  // Update header
  const chapterEl = document.getElementById('ob-chapter-text');
  if(chapterEl) chapterEl.textContent = OB_CHAPTERS_MAP[n].title;
  // Update progress
  const prog = document.getElementById('ob-progress');
  if(prog) prog.style.width = ((n/(OB_CHAPTERS_MAP.length-1))*100)+'%';
  // Update dots
  OB_CHAPTERS_MAP.forEach((_,i) => {
    const dot = document.getElementById('ob-dot-'+i);
    if(dot) dot.style.background = i===n ? '#1e5fd0' : i<n ? '#17a673' : 'rgba(19,33,63,.2)';
  });
  // Update next button
  const btn = document.getElementById('ob-next-btn');
  if(btn) btn.textContent = n >= OB_CHAPTERS_MAP.length-1 ? '进入工作台 →' : '下一章 →';
  if(btn) btn.onclick = n >= OB_CHAPTERS_MAP.length-1 ? enterApp : advanceOb;
  // Render content with fade
  const area = document.getElementById('ob-content-area');
  if(area) {
    area.style.opacity='0';
    area.style.transform='translateY(12px)';
    area.style.transition='opacity .4s ease, transform .4s ease';
    setTimeout(() => {
      area.innerHTML = OB_CONTENTS[n] || '';
      area.style.opacity='1';
      area.style.transform='translateY(0)';
      // Start counter for chapter 0
      if(n===0) startObCounter();
    }, 300);
  }
  // Map actions per chapter
  obVisibleRegions = new Set(['cn']);
  if(n===0) { /* just China */ }
  if(n===1) { obVisibleRegions = new Set(['cn','sea','na','au','eu','me']); }
  if(n===2) { obVisibleRegions = new Set(['cn','sea']); launchArc('cn','sea','#17a673'); setTimeout(()=>launchArc('cn','sea','#17a673'),1200); setTimeout(()=>launchArc('cn','sea','#17a673'),2400); }
  if(n===3) { obVisibleRegions = new Set(['cn']); }
  if(n===4) {
    obVisibleRegions = new Set(['cn','sea','na','au','eu']);
    setTimeout(()=>launchArc('cn','sea','#17a673'), 300);
    setTimeout(()=>launchArc('cn','na','#1e5fd0'), 1200);
    setTimeout(()=>launchArc('cn','au','#1f8fd6'), 2100);
    setTimeout(()=>launchArc('cn','eu','#1e5fd0'), 3000);
  }
  if(n===5) {
    obVisibleRegions = new Set(['cn','sea','na','au','eu','me']);
    setTimeout(()=>launchArc('cn','sea','#17a673'), 200);
    setTimeout(()=>launchArc('cn','na','#1e5fd0'), 800);
    setTimeout(()=>launchArc('cn','au','#1f8fd6'), 1400);
  }
  if(n===6) {
    obVisibleRegions = new Set(['cn','sea','na','au','eu','me']);
    setTimeout(()=>launchArc('cn','sea','#17a673'), 200);
    setTimeout(()=>launchArc('cn','na','#1e5fd0'), 600);
    setTimeout(()=>launchArc('cn','au','#1f8fd6'), 1000);
    setTimeout(()=>launchArc('cn','eu','#1e5fd0'), 1400);
  }
}

function startObCounter() {
  const el = document.getElementById('ob-counter');
  if(!el) return;
  let count = 0;
  const target = 2847392;
  const step = Math.ceil(target/100);
  const iv = setInterval(() => {
    count = Math.min(count+step, target);
    el.textContent = count.toLocaleString();
    if(count>=target) clearInterval(iv);
  }, 30);
}

// ─── AI Today Report & Todo ───
const AI_REPORT_ITEMS = [
  {icon:'🔍', color:'#1e5fd0', label:'新增全球线索', value:'147 条', sub:'来自搜索引擎、海关数据、LinkedIn', page:'leads'},
  {icon:'📣', color:'#17a673', label:'AI 营销发送', value:'23 封邮件', sub:'已送达 23 家潜在买家，平均打开率 61%', page:'marketing'},
  {icon:'🤝', color:'#1f8fd6', label:'新增建联客户', value:'8 家', sub:'Fairprice、Jaya Grocer 等已回复', page:'leads'},
  {icon:'💬', color:'#c8860a', label:'WhatsApp 新消息', value:'5 条', sub:'Klaus Weber 回复了报价，T&T 询问交期', page:'whatsapp'},
];

const TODAY_TODOS = [
  {icon:'⚠️', color:'#e5484d', urgent:true, text:'Klaus Weber 等待报价回复', sub:'WhatsApp · 已等待 2 小时', page:'whatsapp'},
  {icon:'✉️', color:'#1e5fd0', urgent:false, text:'7 封邮件待审批发送', sub:'营销队列 · 建议今日处理', page:'marketing'},
  {icon:'🔔', color:'#c8860a', urgent:false, text:'T&T Supermarket 3 天无沟通', sub:'客户池 · 建议今日跟进', page:'pool'},
  {icon:'📋', color:'#1f8fd6', urgent:false, text:'147 条新线索待处理', sub:'找客户 · 今日新增，建议寻找联系人', page:'leads'},
  {icon:'🇦🇺', color:'#1e5fd0', urgent:false, text:'Asian Grocery Pty 5 天无沟通', sub:'WhatsApp 商机 · 逾期跟进', page:'whatsapp'},
];

function renderAiReport() {
  const el = document.getElementById('ai-report-list');
  if(!el) return;
  el.innerHTML = AI_REPORT_ITEMS.map(item => `
    <div onclick="navTo('${item.page}')" style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:8px;cursor:pointer;transition:.15s;border:1px solid rgba(19,33,63,.04)" onmouseover="this.style.background='rgba(19,33,63,.04)'" onmouseout="this.style.background=''">
      <div style="width:4px;height:34px;border-radius:3px;background:${item.color};flex-shrink:0;opacity:.85"></div>
      <div style="flex:1;min-width:0">
        <div style="font-size:11px;color:var(--t-muted)">${item.label}</div>
        <div style="font-size:13px;font-weight:700;color:${item.color}">${item.value}</div>
        <div style="font-size:10px;color:var(--t-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${item.sub}</div>
      </div>
      <div style="font-size:10px;color:var(--t-muted)">→</div>
    </div>
  `).join('');
}

function renderTodayTodo() {
  const el = document.getElementById('today-todo-list');
  if(!el) return;
  el.innerHTML = TODAY_TODOS.map(item => `
    <div onclick="navTo('${item.page}')" style="display:flex;align-items:center;gap:10px;padding:7px 10px;border-radius:8px;cursor:pointer;transition:.15s;border:1px solid ${item.urgent ? 'rgba(229,72,77,.15)' : 'rgba(19,33,63,.04)'}" onmouseover="this.style.background='rgba(19,33,63,.04)'" onmouseout="this.style.background=''">
      <div style="width:7px;height:7px;border-radius:50%;background:${item.color};flex-shrink:0;margin:0 3px"></div>
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;font-weight:600;color:${item.urgent ? '#e5484d' : 'var(--t-primary)'}">${item.text}</div>
        <div style="font-size:10px;color:var(--t-muted)">${item.sub}</div>
      </div>
      ${item.urgent ? '<div style="font-size:9px;font-weight:700;color:#e5484d;background:rgba(229,72,77,.12);padding:2px 6px;border-radius:4px;flex-shrink:0">紧急</div>' : '<div style="font-size:10px;color:var(--t-muted)">→</div>'}
    </div>
  `).join('');
}

function enterApp() {
  clearTimeout(obTimer);
  // #s-onboard removed in R076 (dead OnboardingScreen) — guard so enterApp never aborts here
  document.getElementById('s-onboard')?.classList.remove('active');
  document.getElementById('s-app').classList.add('active');
  document.getElementById('ai-bubble').style.display = 'block';
  renderIcpAgent();
  renderWaContacts();
  selectWaContact(0);
  renderMktList();
  renderAiReport();
  renderTodayTodo();
  renderAiDailyReport();
  renderPoolPage();
  setTimeout(() => toast('◆','Welcome to TRANS·MISSION','AI searched 147 global leads, sent 23 marketing emails, and lined up 5 tasks for you today'), 800);
  setTimeout(() => { if(window.__tourNudge) window.__tourNudge(); }, 1500);
}

// ═══════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════
const PAGE_NAMES = {dashboard:'Workspace',leads:'Find buyers',marketing:'Marketing',intel:'Intel center',whatsapp:'Deals',pool:'Customer pool'};
const PAGE_SUBS = {dashboard:"Today's deals overview",leads:'ICP Agent · auto buyer discovery',marketing:'Email approval queue',intel:'Global purchasing intel · live',whatsapp:'WhatsApp conversations',pool:'All customer follow-up status'};
const PAGE_IDX = {dashboard:0,leads:1,marketing:2,intel:3,whatsapp:4,pool:5};

function navTo(page, idx) {
  currentPage = page;
  const realIdx = (idx !== undefined) ? idx : (PAGE_IDX[page] !== undefined ? PAGE_IDX[page] : 0);
  document.querySelectorAll('.page').forEach(p => p.classList.remove('on'));
  document.getElementById('page-'+page).classList.add('on');
  document.querySelectorAll('.sb-item').forEach((s,i) => s.classList.toggle('on', i===realIdx));
  document.getElementById('tb-page').textContent = PAGE_NAMES[page];
  document.getElementById('tb-sub').textContent = PAGE_SUBS[page];
  if(page === 'pool') renderPoolPage();
  if(page === 'intel') renderIntelTable();
}

// ── H3 一键建联:把仪表盘上看到的实时买家信号,直接落成可对话的真实联系人 ──
// 同一买家(按公司名)去重复用,不造重复联系人;把触发热点的采购信号物化为对话首条 + AI 话术。
function connectBuyer(co, country, flag, region, val, need, score) {
  let id = WA_CONTACTS.findIndex(c => c.company === co || c.name === co);
  if (id === -1) {
    id = WA_CONTACTS.length;
    WA_CONTACTS.push({ id, name: co, company: co, country: flag || '🌐', av: (co||'·')[0],
      color: '#1f8fd6', last: need ? ('Sourcing ' + need) : 'New buying signal', time: 'now', unread: 1, status: 'online' });
    WA_CHATS[id] = [
      { type: 'in', text: `Hi, we are ${co} (${country}). We are sourcing a supplier for ${need || 'relevant products'}, with an estimated spend of about ${val} this quarter. We'd like to learn about your supply capacity and pricing.`, time: 'now' },
      { type: 'follow', text: `Follow-up: ${co} just sent a buying signal of about ${val} from ${country} — reply within 30 minutes to get ahead.` },
    ];
    WA_CHIPS[id] = [
      `We can share a full catalog and quote for ${need || 'relevant products'}, with custom packaging available`,
      'We hold EU / Halal and other food-safety certifications, with full documents available',
      'Happy to set up a video call to walk through our line and terms, and we can send samples',
    ];
    INTEL_DATA[id] = {
      name: co, company: need || co, country: country, flag: flag, score: score || 88,
      basic: [
        { icon: 'biz',  key: 'Region', val: country + ' · ' + region },
        { icon: 'cart', key: 'Demand', val: need || '—' },
        { icon: 'rev',  key: 'Quarter spend', val: val },
        { icon: 'cal',  key: 'Signal time', val: 'just now' },
      ],
      locked: [
        { icon: 'phone',  key: 'Direct line', val: '+•• ••• ••• •••' },
        { icon: 'mail',   key: 'Buyer email', val: '••••@' + co.toLowerCase().replace(/[^a-z]/g,'').slice(0,8) + '.com' },
        { icon: 'chart',  key: 'Past spend', val: '████ / yr' },
        { icon: 'target', key: 'Decision cycle', val: '██ weeks' },
      ],
      followup: { ico: 'bell', title: 'Connect window', text: `${co}'s buying signal just fired — match ${score || 88}. Send an opener with your quote and certifications now for the best conversion.`, btn: 'Draft a personalized opener' },
    };
  } else {
    WA_CONTACTS[id].unread = 0;
  }
  navTo('whatsapp', PAGE_IDX.whatsapp);
  renderWaContacts();
  selectWaContact(id);
  toast('◆', 'Connected · ' + co, `${country} · ${val} buying signal → chat opened, AI scripts ready`);
}

// ═══════════════════════════════════════════════════════
// LEADS
// ═══════════════════════════════════════════════════════
// ICP AGENT DATA
const ICP_BUYERS = [
  {id:0,flag:'🇸🇬',country:'Singapore',company:'Fairprice Group',product:'高端节庆礼盒采购',score:96,source:'Customs data',enriched:true,email:'procurement@fairprice.com.sg',phone:'+65 6XXX XXXX'},
  {id:1,flag:'🇲🇾',country:'Malaysia',company:'Jaya Grocer',product:'精品月饼礼盒批发',score:93,source:'LinkedIn',enriched:true,email:'buying@jayagrocer.com',phone:'+60 3-XXXX XXXX'},
  {id:2,flag:'🇺🇸',country:'USA',company:'99 Ranch Market',product:'中式糕点年度供应',score:89,source:'Global directory',enriched:true,email:'imports@99ranch.com',phone:'+1 626-XXX-XXXX'},
  {id:3,flag:'🇹🇭',country:'Thailand',company:'Central Food Hall',product:'椰子酥礼盒进口',score:87,source:'Customs data',enriched:false,email:'',phone:''},
  {id:4,flag:'🇦🇺',country:'Australia',company:'Asian Grocery Pty',product:'节庆礼品盒采购',score:84,source:'Global directory',enriched:false,email:'',phone:''},
  {id:5,flag:'🇮🇩',country:'Indonesia',company:'Transmart Carrefour',product:'中式糕点系列',score:82,source:'LinkedIn',enriched:true,email:'category@transmart.co.id',phone:'+62 21-XXXX-XXXX'},
  {id:6,flag:'🇨🇦',country:'Canada',company:'T&T Supermarket',product:'月饼礼盒年度采购',score:91,source:'Customs data',enriched:true,email:'procurement@tnt-supermarket.ca',phone:'+1 604-XXX-XXXX'},
  {id:7,flag:'🇦🇪',country:'UAE',company:'Al Madina Group',product:'进口食品采购',score:78,source:'招投标数据',enriched:false,email:'',phone:''},
  {id:8,flag:'🇬🇧',country:'UK',company:'Wing Yip Foods',product:'亚洲食品年度进口',score:85,source:'Global directory',enriched:true,email:'buying@wingyip.co.uk',phone:'+44 121-XXX-XXXX'},
];

const ICP_EDM_POOL = [
  {id:0,flag:'🇸🇬',company:'Fairprice Group',country:'Singapore',product:'高端节庆礼盒',score:96,selected:true},
  {id:1,flag:'🇲🇾',company:'Jaya Grocer',country:'Malaysia',product:'精品月饼礼盒',score:93,selected:true},
  {id:2,flag:'🇺🇸',company:'99 Ranch Market',country:'USA',product:'中式糕点年度供应',score:89,selected:true},
  {id:3,flag:'🇨🇦',company:'T&T Supermarket',country:'Canada',product:'月饼礼盒年度采购',score:91,selected:false},
  {id:4,flag:'🇮🇩',company:'Transmart Carrefour',country:'Indonesia',product:'中式糕点系列',score:82,selected:false},
  {id:5,flag:'🇬🇧',company:'Wing Yip Foods',country:'UK',product:'亚洲食品年度进口',score:85,selected:true},
];

// ─── Customer Pool Data ───
const CPOOL_DATA = [
  {
    group: 'Search-pushed',
    icon: '🔍',
    items: [
      {id:1, name:'Fairprice Group', status:'replied', statusText:'Followed up 2× · replied', flag:'🇸🇬'},
      {id:2, name:'Jaya Grocer', status:'no-reply', statusText:'Followed up 3× · no reply', flag:'🇲🇾'},
      {id:3, name:'99 Ranch Market', status:'replied', statusText:'Followed up 1× · replied', flag:'🇺🇸'},
      {id:7, name:'Transmart Carrefour', status:'pending', statusText:'Pushed · to follow up', flag:'🇮🇩'},
      {id:10, name:'Asian Food Mart', status:'pending', statusText:'Pushed · to follow up', flag:'🇳🇿'},
    ]
  },
  {
    group: 'Direct-connect',
    icon: '🎯',
    items: [
      {id:6, name:'T&T Supermarket', status:'overdue', statusText:'3 days quiet · follow up', flag:'🇨🇦'},
      {id:9, name:'Wing Yip Foods', status:'replied', statusText:'Followed up 4× · replied', flag:'🇬🇧'},
      {id:11, name:'Rustan Supercenters', status:'no-reply', statusText:'Followed up 2× · no reply', flag:'🇵🇭'},
    ]
  },
  {
    group: 'WhatsApp',
    icon: '💬',
    items: [
      {id:4, name:'Central Food Hall', status:'replied', statusText:'New message yesterday', flag:'🇹🇭'},
      {id:5, name:'Asian Grocery Pty', status:'overdue', statusText:'5 days quiet · follow up', flag:'🇦🇺'},
      {id:12, name:'Big C Vietnam', status:'no-reply', statusText:'Followed up 1× · no reply', flag:'🇻🇳'},
    ]
  },
  {
    group: 'Customs-matched',
    icon: '🚢',
    items: [
      {id:8, name:'Al Madina Group', status:'pending', statusText:'Matched · to contact', flag:'🇦🇪'},
    ]
  }
];

function renderCpool(filter) {
  const el = document.getElementById('cpool-list');
  if(!el) return;
  let html = '';
  CPOOL_DATA.forEach(g => {
    let items = g.items;
    if(filter && filter !== 'all') items = items.filter(i => i.status === filter);
    if(!items.length) return;
    html += `<div style="font-size:10px;font-weight:700;color:var(--t-muted);text-transform:uppercase;letter-spacing:.5px;padding:6px 4px 3px">${g.icon} ${g.group}</div>`;
    items.forEach(item => {
      const dotColor = {replied:'#17a673',overdue:'#e5484d','no-reply':'#c8860a',pending:'#6b7280'}[item.status]||'#6b7280';
      html += `<div class="cpool-item" onclick="highlightCustRow(${item.id})" style="padding:7px 8px;border-radius:8px;cursor:pointer;transition:.15s;background:rgba(19,33,63,.02);border:1px solid rgba(19,33,63,.04);margin-bottom:2px" onmouseover="this.style.background='rgba(31,143,214,.08)'" onmouseout="this.style.background='rgba(19,33,63,.02)'">
        <div style="font-size:12px;font-weight:600;color:var(--t-primary);margin-bottom:3px">${item.flag} ${item.name}</div>
        <div style="display:flex;align-items:center;gap:5px">
          <div style="width:6px;height:6px;border-radius:50%;background:${dotColor};flex-shrink:0"></div>
          <span style="font-size:10px;color:var(--t-muted)">${item.statusText}</span>
        </div>
      </div>`;
    });
  });
  el.innerHTML = html || '<div style="padding:16px;text-align:center;font-size:12px;color:var(--t-muted)">No buyers</div>';
  // Update total badge
  const allItems = CPOOL_DATA.flatMap(g=>g.items);
  const badge = document.getElementById('cpool-total-badge');
  if(badge) badge.textContent = allItems.length;
}

function filterCpool(el, filter) {
  document.querySelectorAll('.cpool-filter').forEach(f=>f.classList.remove('on'));
  el.classList.add('on');
  renderCpool(filter === 'all' ? null : filter);
}

function linkWaToPool() {
  const name = document.getElementById('wa-link-name')?.textContent || 'this contact';
  // Check if already in pool
  const exists = CPOOL_DATA.some(g => g.items.some(i => i.name.includes(name.split(' ')[0])));
  const btn = document.getElementById('wa-link-btn');
  if(exists) {
    btn.textContent = '✓ Linked to pool';
    btn.style.color = '#17a673';
    btn.style.borderColor = 'rgba(23,166,115,.3)';
    btn.style.background = 'rgba(23,166,115,.08)';
    showToast('✓ Linked','This chat is now tracked in the pool','success');
  } else {
    // Add to pool
    CPOOL_DATA[2].items.push({id:99, name:name, status:'active', statusText:'Just linked · to follow up', flag:'💬'});
    btn.textContent = '✓ Linked to pool';
    btn.style.color = '#17a673';
    btn.style.borderColor = 'rgba(23,166,115,.3)';
    btn.style.background = 'rgba(23,166,115,.08)';
    renderCpool();
    showToast('🔗 Linked',`${name} added to the pool — follow up on the Customer pool page`,'success');
  }
}

function highlightCustRow(id) {
  // Scroll to and highlight the customer row in the main table
  renderCustTable('all');
  setTimeout(() => {
    const rows = document.querySelectorAll('.icp-cust-row');
    rows.forEach(r => r.style.background = '');
    // Find row by index matching CUST_DATA order
    const idx = CUST_DATA.findIndex(c => c.id === id);
    if(idx >= 0 && rows[idx]) {
      rows[idx].style.background = 'rgba(30,95,200,.12)';
      rows[idx].scrollIntoView({behavior:'smooth', block:'center'});
      setTimeout(() => { rows[idx].style.background = ''; }, 2000);
    }
  }, 50);
}

function renderIcpAgent() {
  // Default: show datasource view
  showLeadsView('datasource');
  renderCustTable('all');
  renderCpool();
}

function showLeadsView(view) {
  const views = ['datasource','tasks','customers'];
  views.forEach(v => {
    const el = document.getElementById('leads-view-'+v);
    if(el) el.style.display = (v === view) ? 'flex' : 'none';
  });
  if(view === 'tasks') {
    startTaskFoundCounter();
    startTaskLiveFeed();
  }
}

let taskFoundCount = 2847;
let taskFeedInterval = null;
const LIVE_CUSTOMERS = [
  {flag:'🇸🇬',company:'FairMart Singapore',country:'Singapore',source:'LinkedIn',score:91},
  {flag:'🇺🇸',company:'Pacific Asian Foods',country:'USA',source:'Google',score:88},
  {flag:'🇦🇺',company:'Eastern Grocers Pty',country:'Australia',source:'Customs data',score:85},
  {flag:'🇲🇾',company:'Aeon Superstore',country:'Malaysia',source:'Store Leads',score:83},
  {flag:'🇨🇦',company:'T&T Foods Canada',country:'Canada',source:'Global directory',score:90},
  {flag:'🇬🇧',company:'Wing Tai Imports',country:'UK',source:'LinkedIn',score:79},
  {flag:'🇳🇿',company:'Asian Delights NZ',country:'New Zealand',source:'Google',score:76},
  {flag:'🇦🇪',company:'Dubai Asian Market',country:'UAE',source:'Business DB',score:81},
];
let liveFeedIdx = 0;

function startTaskFoundCounter() {
  const el = document.getElementById('task-found-count');
  if(!el) return;
  let n = taskFoundCount;
  el.textContent = n.toLocaleString();
}

function startTaskLiveFeed() {
  const feed = document.getElementById('task-live-feed');
  if(!feed) return;
  feed.innerHTML = '';
  // Show 4 initial items
  for(let i=0;i<4;i++) {
    const c = LIVE_CUSTOMERS[i % LIVE_CUSTOMERS.length];
    feed.innerHTML += buildFeedItem(c, i);
  }
  liveFeedIdx = 4;
  // T4: 停掉每 3.5s 乱跳计数 + 自动插入 feed 的演示动画(典型 AI 味)。
  // 保留上面 4 条真实初始线索;计数显示静态真实值,不再无意义自增。
  if(taskFeedInterval) clearInterval(taskFeedInterval);
  taskFeedInterval = null;
}

function buildFeedItem(c, delay) {
  const now = new Date();
  const timeStr = now.getHours()+':'+(now.getMinutes()<10?'0':'')+now.getMinutes();
  return `<div style="display:flex;align-items:center;gap:12px;padding:10px 12px;background:rgba(19,33,63,.03);border:1px solid rgba(19,33,63,.05);border-radius:8px;transition:all .4s ease;cursor:pointer" onclick="showLeadsView('customers')">
    <div style="font-size:20px">${c.flag}</div>
    <div style="flex:1">
      <div style="font-size:12px;font-weight:600;color:var(--t-primary)">${c.company}</div>
      <div style="font-size:10px;color:var(--t-muted)">${c.country} · Source: ${c.source}</div>
    </div>
    <div style="display:flex;align-items:center;gap:8px">
      <div style="font-size:11px;font-weight:700;color:#1e5fd0">${c.score}</div>
      <div style="font-size:9px;color:var(--t-muted)">${timeStr}</div>
      <div style="width:6px;height:6px;border-radius:50%;background:#17a673;animation:pulse 2s infinite"></div>
    </div>
  </div>`;
}

// ─── Customer table data (GTM-engine core: find → enrich → EDM) ───
const CUST_DATA = [
  {id:1,flag:'🇸🇬',company:'Fairprice Group',country:'Singapore',industry:'Supermarket chain',desc:"Singapore's largest supermarket chain with 400+ stores and over SGD 2bn annual procurement, long importing premium foods from across Asia.",website:'www.fairprice.com.sg',employees:'22,000+',founded:'1973',contacts:[{name:'David Tan',title:'Procurement Director',linkedin:true},{name:'Sarah Lim',title:'Import Manager',linkedin:true}],news:['Just wrapped 2025 Asia food-expo sourcing','Expanding its Chinese pastry line'],source:'Search engine',score:96,status:'enriched',email:'procurement@fairprice.com.sg',phone:'+65 6XXX XXXX',edm:false,selected:false,expanded:false},
  {id:2,flag:'🇲🇾',company:'Jaya Grocer',country:'Malaysia',industry:'Premium grocer',desc:'Malaysian upmarket grocery brand focused on imported fine foods, 80+ stores across KL and Selangor, targeting upper-middle consumers.',website:'www.jayagrocer.com',employees:'5,000+',founded:'2011',contacts:[{name:'Kevin Wong',title:'Procurement Director',linkedin:true},{name:'Priya Nair',title:'Import Specialist',linkedin:false}],news:['Opened 3 flagship stores with an Asian fine-foods section','Sourcing a 2026 Chinese pastry supplier'],source:'LinkedIn',score:93,status:'enriched',email:'buying@jayagrocer.com',phone:'+60 3-XXXX XXXX',edm:true,selected:false,expanded:false},
  {id:3,flag:'🇺🇸',company:'99 Ranch Market',country:'USA',industry:'Asian supermarket',desc:'Largest Asian supermarket chain in the US, serving the Chinese community, 60+ stores across CA/TX/WA, importing over USD 500m of Chinese food yearly.',website:'www.99ranch.com',employees:'8,000+',founded:'1984',contacts:[{name:'Michael Chen',title:'Merchandising Director',linkedin:true},{name:'Lisa Wang',title:'Import Lead',linkedin:true}],news:['Plans 5 new stores in the Northeast','Expanding its Asian fine-foods budget'],source:'Global directory',score:89,status:'enriched',email:'imports@99ranch.com',phone:'+1 626-XXX-XXXX',edm:false,selected:false,expanded:false},
  {id:4,flag:'🇹🇭',company:'Central Food Hall',country:'Thailand',industry:'Department-store grocer',desc:"Premium food hall under Thailand's Central Pattana, in Bangkok's top malls, focused on imported fine foods and gifts.",website:'www.centralfoodhall.com',employees:'3,000+',founded:'2008',contacts:[{name:'Somchai P.',title:'Import Director',linkedin:false},{name:'Nattaya K.',title:'Buyer',linkedin:true}],news:['New store opening, Asian section up 30%','Running 2026 Chinese festive-food sourcing'],source:'Customs data',score:87,status:'pending',email:'',phone:'',edm:false,selected:false,expanded:false},
  {id:5,flag:'🇦🇺',company:'Asian Grocery Pty',country:'Australia',industry:'Asian food retail',desc:"Australia's largest Asian-food retailer, 120+ stores across Sydney/Melbourne/Brisbane, long importing Chinese, Vietnamese and Thai foods.",website:'www.asiangrocery.com.au',employees:'4,500+',founded:'1995',contacts:[{name:'James Wu',title:'CEO',linkedin:true},{name:'Helen Zhang',title:'Procurement Director',linkedin:true}],news:['Still seeking a Chinese pastry supplier','Plans to add more Chinese brands in 2026'],source:'Global directory',score:84,status:'pending',email:'',phone:'',edm:false,selected:false,expanded:false},
  {id:6,flag:'🇨🇦',company:'T&T Supermarket',country:'Canada',industry:'Asian supermarket',desc:"Canada's largest Asian supermarket chain (Loblaw group), 30+ stores in Toronto and Vancouver, importing over CAD 300m of Chinese food yearly.",website:'www.tnt-supermarket.com',employees:'6,000+',founded:'1993',contacts:[{name:'Raymond Ho',title:'VP Procurement',linkedin:true},{name:'Cindy Liu',title:'Import Manager',linkedin:true}],news:['Opening a new store in Alberta','Seeking a new Chinese pastry supplier'],source:'Customs data',score:91,status:'enriched',email:'procurement@tnt-supermarket.ca',phone:'+1 604-XXX-XXXX',edm:true,selected:false,expanded:false},
  {id:7,flag:'🇮🇩',company:'Transmart Carrefour',country:'Indonesia',industry:'Hypermarket',desc:"One of Indonesia's largest supermarket chains, partnered with Carrefour, 130+ stores nationwide, importing over USD 150m of Asian food yearly.",website:'www.transmart.co.id',employees:'35,000+',founded:'1998',contacts:[{name:'Budi Santoso',title:'Merchandising Director',linkedin:true},{name:'Dewi Rahayu',title:'Import Specialist',linkedin:false}],news:['Sourcing at the 2026 Asia food-import expo','Optimizing its Chinese-food supplier mix'],source:'LinkedIn',score:82,status:'enriched',email:'category@transmart.co.id',phone:'+62 21-XXXX-XXXX',edm:false,selected:false,expanded:false},
  {id:8,flag:'🇦🇪',company:'Al Madina Group',country:'UAE',industry:'Imported-food retail',desc:'A major UAE imported-food retailer with supermarkets in Dubai and Abu Dhabi, importing Asian and Middle-Eastern foods.',website:'www.almadinagroup.ae',employees:'2,000+',founded:'2001',contacts:[{name:'Ahmed Al Rashid',title:'Procurement Director',linkedin:false},{name:'Fatima Hassan',title:'Import Specialist',linkedin:true}],news:['Expanding Asian-food import channels','Plans to add a Chinese pastry line'],source:'Business DB',score:78,status:'pending',email:'',phone:'',edm:false,selected:false,expanded:false},
  {id:9,flag:'🇬🇧',company:'Wing Yip Foods',country:'UK',industry:'Asian food distribution',desc:"The UK's largest Asian-food distributor, supplying Chinese restaurants and grocers nationwide, importing over GBP 50m of Chinese food yearly.",website:'www.wingyip.co.uk',employees:'1,200+',founded:'1970',contacts:[{name:'William Yip',title:'Procurement Director',linkedin:true},{name:'Emma Clarke',title:'Import Manager',linkedin:true}],news:['Opening a new round of Asian-supplier search','Opening a new London distribution warehouse'],source:'Global directory',score:85,status:'enriched',email:'buying@wingyip.co.uk',phone:'+44 121-XXX-XXXX',edm:false,selected:false,expanded:false},
  {id:10,flag:'🇳🇿',company:'Asian Food Mart',country:'New Zealand',industry:'Asian food retail',desc:'A major New Zealand Asian-food retailer, 25 stores in Auckland and Wellington, importing Chinese and Korean foods.',website:'www.asianfoodmart.co.nz',employees:'800+',founded:'2003',contacts:[{name:'Tony Zhang',title:'CEO',linkedin:true},{name:'Mary Kim',title:'Procurement Manager',linkedin:false}],news:['Plans to add more Chinese bakery products','Opening a new round of Asian-supplier search'],source:'Search engine',score:76,status:'pending',email:'',phone:'',edm:false,selected:false,expanded:false},
  {id:11,flag:'🇵🇭',company:'Rustan Supercenters',country:'Philippines',industry:'Premium department store',desc:"The Philippines' largest premium department-store group, 50+ stores in Manila and Cebu, long importing premium Asian foods and gifts.",website:'www.rustans.com.ph',employees:'12,000+',founded:'1952',contacts:[{name:'Donnie Tantoco',title:'Group VP Procurement',linkedin:true},{name:'Maria Santos',title:'Import Manager',linkedin:true}],news:['New store opening with an upgraded Asian section','Seeking a new Chinese pastry supplier'],source:'LinkedIn',score:80,status:'enriched',email:'import@rustan.com.ph',phone:'+63 2-XXXX-XXXX',edm:false,selected:false,expanded:false},
  {id:12,flag:'🇻🇳',company:'Big C Vietnam',country:'Vietnam',industry:'Supermarket chain',desc:"Vietnam's largest foreign-invested supermarket chain, 230+ stores nationwide, importing over USD 200m of Asian food yearly and seeking Chinese pastry suppliers.",website:'www.bigc.vn',employees:'18,000+',founded:'1998',contacts:[{name:'Nguyen Van Minh',title:'Procurement Director',linkedin:true},{name:'Tran Thi Lan',title:'Import Specialist',linkedin:false}],news:['Running a 2026 national sourcing tour','Plans to add more Chinese pastry products'],source:'Customs data',score:83,status:'enriched',email:'buying@bigc.vn',phone:'+84 28-XXXX-XXXX',edm:false,selected:false,expanded:false},
];
let custFilter = 'all';
let feedbackTarget = null;

function renderCustTable(filter) {
  custFilter = filter;
  const list = document.getElementById('icp-cust-list');
  if(!list) return;
  let data = CUST_DATA;
  if(filter === 'pending') data = CUST_DATA.filter(c => c.status === 'pending');
  else if(filter === 'enriched') data = CUST_DATA.filter(c => c.status === 'enriched');
  else if(filter === 'edm') data = CUST_DATA.filter(c => c.edm);
  list.innerHTML = data.map((c,i) => `
    <div class="icp-cust-row-wrap">
      <div class="icp-cust-row ${c.selected?'selected':''}" style="animation-delay:${i*0.04}s" onclick="toggleExpandCust(${c.id},event)">
        <div><input type="checkbox" ${c.selected?'checked':''} onclick="event.stopPropagation();toggleCustRow(${c.id})"></div>
        <div>
          <div class="icp-cust-company"><span class="icp-cust-flag">${c.flag}</span>${c.company}</div>
          <div class="icp-cust-country">${c.country} · ${c.industry}</div>
        </div>
        <div class="icp-cust-demand" style="font-size:11px;color:var(--t-muted);line-height:1.5">${c.desc.substring(0,42)}…</div>
        <div><span class="icp-cust-source">${c.source}</span></div>
        <div class="icp-cust-score">${c.score}</div>
        <div class="icp-cust-contact ${c.status}">${c.status==='enriched'?'<span style="color:#17a673">✓ Found</span><br><span style="font-size:9px;color:var(--t-muted)">'+c.email+'</span>':'<span style="color:#c8860a">Pending</span>'}</div>
        <div class="icp-cust-ops">
          ${c.status==='pending'?`<div class="icp-op-btn enrich" onclick="event.stopPropagation();enrichOne(${c.id})">&#x1F50D; Find contacts</div>`:''}
          ${!c.edm?`<div class="icp-op-btn edm" onclick="event.stopPropagation();addToEdm(${c.id})">📣 Market for me</div>`:'<div class="icp-op-btn" style="color:#17a673;border-color:rgba(23,166,115,.2)">✓ Marketed</div>'}
          <div class="icp-op-btn feedback" onclick="event.stopPropagation();openFeedback(${c.id})">⚠ Flag mismatch</div>
        </div>
      </div>
      ${c.expanded ? `
      <div class="icp-cust-card">
        <div class="icp-card-left">
          <div class="icp-card-section">
            <div class="icp-card-label">🏢 About</div>
            <div class="icp-card-text">${c.desc}</div>
          </div>
          <div class="icp-card-row">
            <div class="icp-card-kv"><span class="icp-kv-label">🌐 Website</span><a href="https://${c.website}" target="_blank" style="color:#1e5fd0">${c.website}</a></div>
            <div class="icp-card-kv"><span class="icp-kv-label">👥 Employees</span>${c.employees}</div>
            <div class="icp-card-kv"><span class="icp-kv-label">📅 Founded</span>${c.founded}</div>
          </div>
          <div class="icp-card-section">
            <div class="icp-card-label">📰 Recent news</div>
            ${c.news.map(n=>`<div class="icp-card-news">· ${n}</div>`).join('')}
          </div>
        </div>
        <div class="icp-card-right">
          <div class="icp-card-section">
            <div class="icp-card-label">👤 Key contacts</div>
            ${c.contacts.map(p=>`
              <div class="icp-card-person">
                <div class="icp-person-av">${p.name[0]}</div>
                <div>
                  <div class="icp-person-name">${p.name}</div>
                  <div class="icp-person-title">${p.title}</div>
                </div>
                ${p.linkedin?'<div class="icp-person-li">in</div>':''}
              </div>
            `).join('')}
          </div>
          <div class="icp-card-actions">
            ${c.status==='pending'?`<div class="icp-card-btn enrich" onclick="enrichOne(${c.id})">🔍 Find contacts</div>`:''}
            ${!c.edm?`<div class="icp-card-btn edm" onclick="addToEdm(${c.id})">📣 Market for me</div>`:'<div class="icp-card-btn" style="opacity:.5">✓ In marketing</div>'}
          </div>
        </div>
      </div>
      ` : ''}
    </div>
  `).join('');
}

function toggleExpandCust(id, e) {
  if(e && e.target.tagName==='INPUT') return;
  const c = CUST_DATA.find(x=>x.id===id);
  if(c) { c.expanded = !c.expanded; renderCustTable(custFilter); }
}

function openFeedback(id) {
  feedbackTarget = id;
  const c = CUST_DATA.find(x=>x.id===id);
  const modal = document.getElementById('feedback-modal');
  if(modal) {
    document.getElementById('feedback-company').textContent = c ? c.company : '';
    document.getElementById('feedback-input').value = '';
    document.getElementById('feedback-result').style.display='none';
    document.getElementById('feedback-form').style.display='block';
    modal.style.display='flex';
  }
}

function submitFeedback() {
  const reason = document.getElementById('feedback-input').value.trim();
  if(!reason) { toast('◆','Please enter a reason',''); return; }
  document.getElementById('feedback-form').style.display='none';
  document.getElementById('feedback-result').style.display='flex';
  setTimeout(() => {
    document.getElementById('feedback-modal').style.display='none';
    toast('◆','Company brain auto-tuned',`ICP match model adjusted from your feedback — future buyers will be more accurate`);
  }, 2200);
}

function toggleCustRow(id) {
  const c = CUST_DATA.find(x => x.id===id);
  if(c) { c.selected = !c.selected; renderCustTable(custFilter); }
}

function toggleAllCust(cb) {
  CUST_DATA.forEach(c => c.selected = cb.checked);
  renderCustTable(custFilter);
}

function setCf(el, filter) {
  document.querySelectorAll('.icp-cf').forEach(e => e.classList.remove('on'));
  el.classList.add('on');
  renderCustTable(filter);
}

function enrichOne(id) {
  const c = CUST_DATA.find(x => x.id===id);
  if(!c) return;
  toast('◆','Enriching contacts',`AI is fetching contacts for ${c.company} from Hunter / Apollo…`);
  setTimeout(() => {
    c.status = 'enriched';
    c.email = `contact@${c.company.toLowerCase().replace(/\s+/g,'')}.com`;
    c.phone = '+XX XXXX-XXXX';
    renderCustTable(custFilter);
    toast('◆','Enrich complete',`Got email and phone for ${c.company}`);
  }, 1800);
}

function enrichSelected() {
  const pending = CUST_DATA.filter(c => c.selected && c.status==='pending');
  if(pending.length===0) { toast('◆','No buyers to enrich','Select buyers with status Pending first'); return; }
  toast('◆',`Enriching ${pending.length} buyers`,`AI is fetching contacts from Hunter / Apollo / Clearbit…`);
  setTimeout(() => {
    pending.forEach(c => { c.status='enriched'; c.email=`contact@${c.company.toLowerCase().replace(/\s+/g,'')}.com`; c.phone='+XX XXXX-XXXX'; });
    renderCustTable(custFilter);
    toast('◆',`Enrich complete`,`Got contacts for ${pending.length} buyers`);
  }, 2000);
}

function addToEdm(id) {
  const c = CUST_DATA.find(x => x.id===id);
  if(!c) return;
  if(c.status==='pending') { toast('◆','Enrich contacts first',`${c.company} has no contacts yet — cannot add to EDM`); return; }
  c.edm = true;
  renderCustTable(custFilter);
  toast('◆',`${c.company} added to EDM queue`,`AI will draft a personalized email — approve it in Marketing queue to send`);
}

function pushSelectedToEdm() {
  const sel = CUST_DATA.filter(c => c.selected && c.status==='enriched' && !c.edm);
  if(sel.length===0) { toast('◆','No buyers to push','Select enriched buyers not yet in EDM'); return; }
  sel.forEach(c => c.edm = true);
  renderCustTable(custFilter);
  toast('◆',`Pushed ${sel.length} buyers to Marketing queue`,`AI is drafting personalized emails — approve them in Marketing queue to send`);
  setTimeout(() => navTo('marketing'), 1400);
}

// ═══════════════════════════════════════════════════════
// CUSTOMER POOL PAGE
// ═══════════════════════════════════════════════════════
let poolCurrentFilter = 'all';
let poolCurrentSort = 'score';

// Enrich CPOOL_DATA with score from CUST_DATA
function getPoolScore(name) {
  const c = CUST_DATA.find(x => x.company.includes(name.split(' ')[0]) || name.includes(x.company.split(' ')[0]));
  return c ? c.score : 80;
}

function getPoolFollowCount(name) {
  const text = CPOOL_DATA.flatMap(g=>g.items).find(i=>i.name===name)?.statusText || '';
  const m = text.match(/(\d+)\s*×/);
  return m ? parseInt(m[1]) : 0;
}

function getPoolLastActivity(name) {
  const statusText = CPOOL_DATA.flatMap(g=>g.items).find(i=>i.name===name)?.statusText || '';
  if(statusText.includes('Just linked') || statusText.includes('now')) return 'now';
  if(statusText.includes('yesterday')) return 'yesterday';
  const m = statusText.match(/(\d+)\s*days?/);
  return m ? m[1]+'d ago' : '—';
}

const POOL_SOURCE_MAP = {
  'Search-pushed': {color:'#1e5fd0', icon:'🔍'},
  'Direct-connect': {color:'#1f8fd6', icon:'🎯'},
  'WhatsApp': {color:'#17a673', icon:'💬'},
  'Customs-matched': {color:'#c8860a', icon:'🚢'},
};

function renderPoolPage() {
  const allItems = CPOOL_DATA.flatMap(g => g.items.map(i => ({...i, group: g.group})));
  const replied = allItems.filter(i=>i.status==='replied').length;
  const overdue = allItems.filter(i=>i.status==='overdue').length;
  const noReply = allItems.filter(i=>i.status==='no-reply').length;
  const pending = allItems.filter(i=>i.status==='pending').length;
  const total = allItems.length;
  const el = (id) => document.getElementById(id);
  if(el('pstat-all-n')) el('pstat-all-n').textContent = total;
  if(el('pstat-replied-n')) el('pstat-replied-n').textContent = replied;
  if(el('pstat-overdue-n')) el('pstat-overdue-n').textContent = overdue;
  if(el('pstat-noreply-n')) el('pstat-noreply-n').textContent = noReply;
  if(el('pstat-pending-n')) el('pstat-pending-n').textContent = pending;
  if(el('sb-pool-badge')) el('sb-pool-badge').textContent = total;
  renderPoolTable();
}

function poolTabFilter(tabEl, status) {
  poolCurrentFilter = status;
  document.querySelectorAll('.pool-tab').forEach(t => t.classList.remove('on'));
  if(tabEl) tabEl.classList.add('on');
  renderPoolTable();
}

function renderPoolTable() {
  const tbody = document.getElementById('pool-table-body');
  if(!tbody) return;
  const search = (document.getElementById('pool-search')?.value || '').toLowerCase();
  const sortBy = document.getElementById('pool-sort')?.value || 'status';
  const filterSource = document.getElementById('pool-filter-source')?.value || '';
  let allItems = CPOOL_DATA.flatMap(g => g.items.map(i => ({...i, group: g.group})));
  // Filter by tab
  if(poolCurrentFilter !== 'all') allItems = allItems.filter(i => i.status === poolCurrentFilter);
  // Filter by source
  if(filterSource) allItems = allItems.filter(i => i.group === filterSource);
  // Search
  if(search) allItems = allItems.filter(i => i.name.toLowerCase().includes(search) || (i.flag||'').includes(search) || i.group.toLowerCase().includes(search));
  // Sort
  const statusOrder = {overdue:0,'no-reply':1,replied:2,pending:3};
  if(sortBy === 'status') allItems.sort((a,b) => (statusOrder[a.status]??9) - (statusOrder[b.status]??9));
  else if(sortBy === 'score') allItems.sort((a,b) => getPoolScore(b.name) - getPoolScore(a.name));
  else if(sortBy === 'name') allItems.sort((a,b) => a.name.localeCompare(b.name));
  else if(sortBy === 'time') allItems.sort((a,b) => {
    const ta = getPoolLastActivity(a.name); const tb = getPoolLastActivity(b.name);
    return ta.localeCompare(tb);
  });
  const statusCfg = {
    replied:    {color:'#17a673', bg:'rgba(23,166,115,.1)',  border:'rgba(23,166,115,.2)',  label:'Replied'},
    overdue:    {color:'#e5484d', bg:'rgba(229,72,77,.1)', border:'rgba(229,72,77,.2)', label:'Overdue'},
    'no-reply': {color:'#c8860a', bg:'rgba(200,134,10,.1)',  border:'rgba(200,134,10,.2)',  label:'No reply'},
    pending:    {color:'#6b7280', bg:'rgba(107,114,128,.1)', border:'rgba(107,114,128,.2)', label:'To follow up'},
  };
  if(!allItems.length) {
    tbody.innerHTML = `<tr><td colspan="7" style="padding:40px;text-align:center;color:var(--t-muted);font-size:13px">No matching buyers</td></tr>`;
    return;
  }
  tbody.innerHTML = allItems.map(item => {
    const sc = statusCfg[item.status] || statusCfg.pending;
    const si = POOL_SOURCE_MAP[item.group] || {color:'#1e5fd0', icon:'📂'};
    const score = getPoolScore(item.name);
    const followCount = getPoolFollowCount(item.name);
    const lastAct = getPoolLastActivity(item.name);
    const scoreColor = score >= 90 ? '#17a673' : score >= 80 ? '#1e5fd0' : '#c8860a';
    const progPct = Math.min(100, followCount * 20 + 10);
    return `<tr class="pool-tr" onclick="showPoolDetail('${item.name}')">
      <td style="padding:12px 20px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="flex-shrink:0">${ccBadge(item.flag)}</div>
          <div>
            <div style="font-size:13px;font-weight:600;color:var(--t-primary)">${item.name}</div>
            <div style="font-size:11px;color:var(--t-muted);margin-top:1px">${item.group === 'Search-pushed' ? 'Search' : item.group === 'Direct-connect' ? 'Direct' : item.group === 'WhatsApp' ? 'WhatsApp' : 'Customs'}</div>
          </div>
        </div>
      </td>
      <td style="padding:12px">
        <span style="font-size:11px;color:${si.color};background:${si.color}14;padding:2px 7px;border-radius:4px">${item.group}</span>
      </td>
      <td style="padding:12px;text-align:center">
        <span style="display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:600;color:${sc.color}"><span style="width:6px;height:6px;border-radius:2px;background:${sc.color};flex-shrink:0"></span>${sc.label}</span>
      </td>
      <td style="padding:12px;text-align:center">
        <span style="font-size:13px;font-weight:700;color:${scoreColor}">${score}</span>
        <span style="font-size:10px;color:var(--t-muted)"></span>
      </td>
      <td style="padding:12px;min-width:120px">
        <div style="display:flex;align-items:center;gap:6px">
          <div style="flex:1;height:4px;background:rgba(19,33,63,.08);border-radius:2px;overflow:hidden">
            <div style="height:100%;width:${progPct}%;background:${sc.color};border-radius:2px"></div>
          </div>
          <span style="font-size:10px;color:var(--t-muted);white-space:nowrap">${followCount}×</span>
        </div>
      </td>
      <td style="padding:12px;font-size:11px;color:var(--t-muted);white-space:nowrap">${lastAct}</td>
      <td style="padding:12px;text-align:center">
        <div style="display:flex;gap:4px;justify-content:center">
          <div onclick="event.stopPropagation();poolFollowUp('${item.name}')" style="font-size:10px;padding:3px 8px;border-radius:6px;background:rgba(31,143,214,.1);color:#1e5fd0;border:1px solid rgba(31,143,214,.2);cursor:pointer">AI follow-up</div>
          <div onclick="event.stopPropagation();openPoolWhatsApp('${item.name}')" title="Send WhatsApp" style="font-size:10px;padding:3px 7px;border-radius:6px;background:rgba(23,166,115,.08);color:#17a673;border:1px solid rgba(23,166,115,.2);cursor:pointer;display:flex;align-items:center"><svg viewBox="0 0 24 24" style="width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
        </div>
      </td>
    </tr>`;
  }).join('');
  // 进入即填充:无选中时自动选最紧急客户(默认按状态排序,逾期在首),避免半屏空态
  if(!selectedPoolItem && allItems.length) showPoolDetail(allItems[0].name);
}

let selectedPoolItem = null;
function showPoolDetail(name) {
  selectedPoolItem = name;
  // Highlight row
  document.querySelectorAll('.pool-tr').forEach(r => r.classList.remove('selected'));
  const rows = document.querySelectorAll('.pool-tr');
  rows.forEach(r => { if(r.querySelector('td div div')?.textContent === name) r.classList.add('selected'); });
  const item = CPOOL_DATA.flatMap(g=>g.items.map(i=>({...i,group:g.group}))).find(i=>i.name===name);
  const cust = CUST_DATA.find(c=>c.company===name);
  const panel = document.getElementById('pool-detail-content');
  if(!panel || !item) return;
  const sc = {replied:{color:'#17a673',label:'Replied'},overdue:{color:'#e5484d',label:'Overdue'},'no-reply':{color:'#c8860a',label:'No reply'},pending:{color:'#6b7280',label:'To follow up'}}[item.status]||{color:'#6b7280',label:'To follow up'};
  const si = POOL_SOURCE_MAP[item.group]||{color:'#1e5fd0',icon:'📂'};
  const score = getPoolScore(name);
  const followCount = getPoolFollowCount(name);
  const lastAct = getPoolLastActivity(name);
  const contacts = cust?.contacts || [];
  const hasContact = cust?.status === 'enriched';
  panel.innerHTML = `
    <div style="border-bottom:1px solid rgba(19,33,63,.06);padding-bottom:16px;margin-bottom:16px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
        <div style="flex-shrink:0">${ccBadge(item.flag)}</div>
        <div style="flex:1">
          <div style="font-size:15px;font-weight:700;color:var(--t-primary);margin-bottom:4px">${name}</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <span style="font-size:10px;color:${si.color};background:${si.color}18;padding:2px 7px;border-radius:8px">${item.group}</span>
            <span style="font-size:10px;color:${sc.color};background:${sc.color}18;padding:2px 7px;border-radius:8px">${sc.label}</span>
          </div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <div style="background:rgba(19,33,63,.03);border-radius:8px;padding:10px">
          <div style="font-size:10px;color:var(--t-muted);margin-bottom:2px">Match</div>
          <div style="font-size:20px;font-weight:800;color:#1e5fd0">${score}<span style="font-size:11px;font-weight:400;color:var(--t-muted)"></span></div>
        </div>
        <div style="background:rgba(19,33,63,.03);border-radius:8px;padding:10px">
          <div style="font-size:10px;color:var(--t-muted);margin-bottom:2px">Follow-ups</div>
          <div style="font-size:20px;font-weight:800;color:#1f8fd6">${followCount}<span style="font-size:11px;font-weight:400;color:var(--t-muted)"></span></div>
        </div>
      </div>
    </div>
    <div style="margin-bottom:16px">
      <div style="font-size:11px;font-weight:700;color:var(--t-muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Follow-up progress</div>
      <div style="height:6px;background:rgba(19,33,63,.06);border-radius:3px;overflow:hidden;margin-bottom:6px">
        <div style="height:100%;width:${Math.min(100,followCount*20+10)}%;background:${sc.color};border-radius:3px"></div>
      </div>
      <div style="font-size:11px;color:var(--t-muted)">Last active: ${lastAct} · ${item.statusText||'no record'}</div>
    </div>
    ${hasContact ? `
    <div style="margin-bottom:16px">
      <div style="font-size:11px;font-weight:700;color:var(--t-muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Contact</div>
      ${contacts.map(c=>`
        <div style="background:rgba(19,33,63,.03);border-radius:8px;padding:10px;margin-bottom:6px">
          <div style="font-size:12px;font-weight:600;color:var(--t-primary)">${c.name}</div>
          <div style="font-size:11px;color:var(--t-muted);margin-top:2px">${c.title}</div>
          ${cust.email ? `<div style="font-size:10px;color:#1e5fd0;margin-top:4px">✉️ ${cust.email}</div>` : ''}
          ${cust.phone ? `<div style="font-size:10px;color:#17a673;margin-top:2px">📞 ${cust.phone}</div>` : ''}
        </div>
      `).join('')}
    </div>` : `
    <div style="margin-bottom:16px;background:rgba(200,134,10,.05);border:1px solid rgba(200,134,10,.15);border-radius:8px;padding:12px">
      <div style="font-size:11px;color:#c8860a;font-weight:600;margin-bottom:4px">No contact yet</div>
      <div style="font-size:11px;color:var(--t-muted)">Enrich this buyer on the Find-buyers page</div>
    </div>`}
    <div style="display:flex;flex-direction:column;gap:8px">
      <div onclick="poolFollowUp('${name}')" style="background:rgba(31,143,214,.12);border:1px solid rgba(31,143,214,.2);border-radius:9px;padding:10px;font-size:12px;font-weight:600;color:#1e5fd0;cursor:pointer;text-align:center">Draft AI follow-up</div>
      <div onclick="openPoolWhatsApp('${name}')" style="background:rgba(23,166,115,.08);border:1px solid rgba(23,166,115,.2);border-radius:9px;padding:10px;font-size:12px;font-weight:600;color:#17a673;cursor:pointer;text-align:center;display:flex;align-items:center;justify-content:center;gap:7px"><svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>Send WhatsApp message</div>
      <div onclick="navTo('leads')" style="background:rgba(19,33,63,.04);border:1px solid rgba(19,33,63,.07);border-radius:9px;padding:10px;font-size:12px;font-weight:600;color:var(--t-muted);cursor:pointer;text-align:center">View full buyer profile</div>
    </div>
  `;
}

function poolFilter(status) {
  poolCurrentFilter = status;
  // Highlight active stat card
  ['all','replied','overdue','noreply'].forEach(s => {
    const el = document.getElementById('pstat-'+s);
    if(!el) return;
    el.style.opacity = (status === s || (status==='no-reply' && s==='noreply') || (status==='all' && s==='all')) ? '1' : '0.55';
  });
  renderPoolCards();
}

function poolFilterSource(group) {
  poolCurrentFilter = 'source:'+group;
  renderPoolCards();
}

function setPoolSort(el, sort) {
  poolCurrentSort = sort;
  document.querySelectorAll('.pool-sort-btn').forEach(b => b.classList.remove('on'));
  el.classList.add('on');
  renderPoolCards();
}

function renderPoolCards() {
  const container = document.getElementById('pool-cards');
  if(!container) return;
  const search = (document.getElementById('pool-search')?.value || '').toLowerCase();
  let allItems = CPOOL_DATA.flatMap(g => g.items.map(i => ({...i, group: g.group})));
  // Filter
  if(poolCurrentFilter === 'all') { /* no filter */ }
  else if(poolCurrentFilter.startsWith('source:')) {
    const grp = poolCurrentFilter.replace('source:','');
    allItems = allItems.filter(i => i.group === grp);
  } else {
    allItems = allItems.filter(i => i.status === poolCurrentFilter);
  }
  // Search
  if(search) allItems = allItems.filter(i => i.name.toLowerCase().includes(search) || (i.flag||'').includes(search));
  // Sort
  if(poolCurrentSort === 'score') allItems.sort((a,b) => getPoolScore(b.name) - getPoolScore(a.name));
  else if(poolCurrentSort === 'name') allItems.sort((a,b) => a.name.localeCompare(b.name));
  else if(poolCurrentSort === 'status') {
    const order = {overdue:0,'no-reply':1,replied:2,pending:3};
    allItems.sort((a,b) => (order[a.status]??9) - (order[b.status]??9));
  }
  if(!allItems.length) {
    container.innerHTML = '<div style="padding:40px;text-align:center;color:var(--t-muted);font-size:13px">No matching buyers</div>';
    return;
  }
  const statusCfg = {
    replied: {color:'#17a673', bg:'rgba(23,166,115,.1)', border:'rgba(23,166,115,.2)', label:'Replied'},
    overdue: {color:'#e5484d', bg:'rgba(229,72,77,.1)', border:'rgba(229,72,77,.2)', label:'Overdue'},
    'no-reply': {color:'#c8860a', bg:'rgba(200,134,10,.1)', border:'rgba(200,134,10,.2)', label:'No reply'},
    pending: {color:'#6b7280', bg:'rgba(107,114,128,.1)', border:'rgba(107,114,128,.2)', label:'To follow up'},
  };
  const sourceInfo = (group) => POOL_SOURCE_MAP[group] || {color:'#1e5fd0', icon:'📂'};
  container.innerHTML = allItems.map(item => {
    const sc = statusCfg[item.status] || statusCfg.pending;
    const si = sourceInfo(item.group);
    const score = getPoolScore(item.name);
    const followCount = getPoolFollowCount(item.name);
    const lastAct = getPoolLastActivity(item.name);
    const custData = CUST_DATA.find(c => c.company === item.name);
    const hasContact = custData && custData.status === 'enriched';
    const email = custData?.email || '';
    const contacts = custData?.contacts || [];
    return `
    <div style="background:var(--card);border:1px solid var(--card-border);border-radius:var(--radius);padding:16px 18px;cursor:pointer;transition:.2s;position:relative" onmouseover="this.style.borderColor='rgba(19,33,63,.12)'" onmouseout="this.style.borderColor='var(--card-border)'" onclick="openPoolDetail('${item.name}')">
      <!-- Top Row -->
      <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:12px">
        <div style="flex-shrink:0">${ccBadge(item.flag)}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:14px;font-weight:700;color:var(--t-primary);margin-bottom:3px">${item.name}</div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
            <span style="font-size:10px;color:${si.color};background:${si.color}18;padding:2px 7px;border-radius:8px">${item.group}</span>
            <span style="font-size:10px;color:${sc.color};background:${sc.bg};border:1px solid ${sc.border};padding:2px 7px;border-radius:8px">${sc.label}</span>
          </div>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <div style="font-size:18px;font-weight:800;color:#1e5fd0">${score}<span style="font-size:10px;font-weight:400;color:var(--t-muted)"></span></div>
          <div style="font-size:9px;color:var(--t-muted);margin-top:1px">Match</div>
        </div>
      </div>
      <!-- Progress Bar -->
      <div style="margin-bottom:10px">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px">
          <span style="font-size:10px;color:var(--t-muted)">Follow-up progress</span>
          <span style="font-size:10px;color:var(--t-muted)">Followed up ${followCount}× · last active: ${lastAct}</span>
        </div>
        <div style="height:4px;background:rgba(19,33,63,.06);border-radius:2px;overflow:hidden">
          <div style="height:100%;width:${Math.min(100, followCount*20+10)}%;background:${sc.color};border-radius:2px;transition:.3s"></div>
        </div>
      </div>
      <!-- Bottom Row -->
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div style="display:flex;align-items:center;gap:10px">
          ${hasContact ? `<span style="font-size:10px;color:#17a673">✓ Contact found</span>` : `<span style="font-size:10px;color:var(--t-muted)">No contact yet</span>`}
          ${contacts.length ? `<span style="font-size:10px;color:var(--t-muted)">· ${contacts[0].name} (${contacts[0].title})</span>` : ''}
        </div>
        <div style="display:flex;gap:6px">
          <div onclick="event.stopPropagation();poolFollowUp('${item.name}')" style="font-size:10px;padding:4px 10px;border-radius:7px;background:rgba(31,143,214,.12);color:#1e5fd0;border:1px solid rgba(31,143,214,.2);cursor:pointer;transition:.15s" onmouseover="this.style.background='rgba(31,143,214,.2)'" onmouseout="this.style.background='rgba(31,143,214,.12)'">AI follow-up</div>
          <div onclick="event.stopPropagation();openPoolWhatsApp('${item.name}')" style="font-size:10px;padding:4px 10px;border-radius:7px;background:rgba(23,166,115,.08);color:#17a673;border:1px solid rgba(23,166,115,.2);cursor:pointer;transition:.15s;display:flex;align-items:center;gap:5px" onmouseover="this.style.background='rgba(23,166,115,.15)'" onmouseout="this.style.background='rgba(23,166,115,.08)'"><svg viewBox="0 0 24 24" style="width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>Message</div>
        </div>
      </div>
    </div>`;
  }).join('');
}

function openPoolDetail(name) {
  const c = CUST_DATA.find(x => x.company === name);
  if(c) {
    // Navigate to leads page and expand that customer
    navTo('leads');
    setTimeout(() => {
      showLeadsView('customers');
      c.expanded = true;
      renderCustTable('all');
      setTimeout(() => {
        const rows = document.querySelectorAll('.icp-cust-row');
        const idx = CUST_DATA.findIndex(x=>x.id===c.id);
        if(idx>=0 && rows[idx]) rows[idx].scrollIntoView({behavior:'smooth',block:'center'});
      }, 100);
    }, 50);
  } else {
    toast('◆', name, 'Click to view buyer details');
  }
}

function poolFollowUp(name) {
  toast('◆','AI follow-up started',`Drafting a personalized follow-up for ${name}, to be sent via WhatsApp or email`);
}

function openPoolWhatsApp(name) {
  navTo('whatsapp');
  setTimeout(() => {
    const contacts = document.querySelectorAll('.wa-contact');
    contacts.forEach(c => {
      if(c.textContent.includes(name.split(' ')[0])) c.click();
    });
  }, 100);
}

function poolBatchFollowUp() {
  const overdue = CPOOL_DATA.flatMap(g=>g.items).filter(i=>i.status==='overdue'||i.status==='no-reply');
  toast('◆','AI bulk follow-up started',`Drafting follow-ups for ${overdue.length} buyers — approve them in the Marketing queue to send`);
  setTimeout(() => navTo('marketing'), 1600);
}

function autoExecute() {
  const enriched = CUST_DATA.filter(c => c.selected && c.status==='enriched');
  if(enriched.length===0) { toast('◆','Select enriched buyers first','Tick buyers that already have contacts, then run autopilot'); return; }
  toast('◆','AI autopilot started',`Skipping approval — drafting and sending personalized emails to ${enriched.length} buyers`);
  setTimeout(() => toast('◆',`${enriched.length} emails sent`,`~${Math.round(enriched.length*0.3)} buyers expected to reply · avg 2.3 days`), 2500);
}

function submitIcpTask() {
  const daily = document.getElementById('icp-daily')?.value || 50;
  const days = document.getElementById('icp-days')?.value || 30;
  toast('◆','Task launched','AI is starting the global data-source search…');
  setTimeout(() => {
    showLeadsView('tasks');
    toast('◆','ICP Agent started',`Searching across 28 sources · ${daily} buyers/day for ${days} days`);
  }, 800);
}

function toggleDataSources() {
  const panel = document.getElementById('icp-datasource-panel');
  if(panel) panel.classList.toggle('open');
}

function toggleCh(el) { el.classList.toggle('on'); }
function toggleRg(el) { el.classList.toggle('on'); }

// ═══════════════════════════════════════════════════════
// REGION SELECTOR — 二级地区选择器
// ═══════════════════════════════════════════════════════
const RG_COUNTRIES = [
  // 东南亚
  {flag:'🇸🇬',name:'Singapore',cont:'sea'},
  {flag:'🇲🇾',name:'Malaysia',cont:'sea'},
  {flag:'🇹🇭',name:'Thailand',cont:'sea'},
  {flag:'🇮🇩',name:'Indonesia',cont:'sea'},
  {flag:'🇵🇭',name:'Philippines',cont:'sea'},
  {flag:'🇻🇳',name:'Vietnam',cont:'sea'},
  {flag:'🇲🇲',name:'Myanmar',cont:'sea'},
  {flag:'🇰🇭',name:'Cambodia',cont:'sea'},
  {flag:'🇱🇦',name:'Laos',cont:'sea'},
  {flag:'🇧🇳',name:'Brunei',cont:'sea'},
  // 北美
  {flag:'🇺🇸',name:'USA',cont:'na'},
  {flag:'🇨🇦',name:'Canada',cont:'na'},
  {flag:'🇲🇽',name:'Mexico',cont:'na'},
  // 欧洲
  {flag:'🇬🇧',name:'UK',cont:'eu'},
  {flag:'🇩🇪',name:'Germany',cont:'eu'},
  {flag:'🇫🇷',name:'France',cont:'eu'},
  {flag:'🇮🇹',name:'Italy',cont:'eu'},
  {flag:'🇪🇸',name:'Spain',cont:'eu'},
  {flag:'🇳🇱',name:'Netherlands',cont:'eu'},
  {flag:'🇧🇪',name:'Belgium',cont:'eu'},
  {flag:'🇵🇱',name:'Poland',cont:'eu'},
  {flag:'🇸🇪',name:'Sweden',cont:'eu'},
  {flag:'🇨🇿',name:'Switzerland',cont:'eu'},
  // 大洋洲
  {flag:'🇦🇺',name:'Australia',cont:'oc'},
  {flag:'🇳🇿',name:'New Zealand',cont:'oc'},
  // 中东
  {flag:'🇦🇪',name:'UAE',cont:'me'},
  {flag:'🇸🇦',name:'Saudi Arabia',cont:'me'},
  {flag:'🇰🇼',name:'Kuwait',cont:'me'},
  {flag:'🇮🇱',name:'Israel',cont:'me'},
  {flag:'🇹🇷',name:'Turkey',cont:'me'},
  {flag:'🇪🇬',name:'Egypt',cont:'me'},
  // 东亚
  {flag:'🇯🇵',name:'Japan',cont:'ea'},
  {flag:'🇰🇷',name:'South Korea',cont:'ea'},
  {flag:'🇨🇳',name:'Mainland China',cont:'ea'},
  {flag:'🇭🇰',name:'Hong Kong',cont:'ea'},
  {flag:'🇹🇼',name:'Taiwan',cont:'ea'},
  // 南美
  {flag:'🇧🇷',name:'Brazil',cont:'sa'},
  {flag:'🇦🇷',name:'Argentina',cont:'sa'},
  {flag:'🇨🇱',name:'Chile',cont:'sa'},
  {flag:'🇨🇴',name:'Colombia',cont:'sa'},
  {flag:'🇵🇪',name:'Peru',cont:'sa'},
  // 非洲
  {flag:'🇳🇬',name:'Nigeria',cont:'af'},
  {flag:'🇿🇦',name:'South Africa',cont:'af'},
  {flag:'🇰🇪',name:'Kenya',cont:'af'},
  {flag:'🇪🇹',name:'Ethiopia',cont:'af'},
  {flag:'🇬🇭',name:'Ghana',cont:'af'},
];

let rgCurrentCont = 'all';

function showRgDropdown() {
  const dd = document.getElementById('rg-dropdown');
  if(!dd) return;
  dd.style.display = 'block';
  renderRgCountryList();
  // 点击外部关闭
  setTimeout(() => {
    document.addEventListener('click', closeRgDropdownOutside, {once:true});
  }, 50);
}

function closeRgDropdownOutside(e) {
  const dd = document.getElementById('rg-dropdown');
  const input = document.getElementById('rg-search-input');
  if(dd && !dd.contains(e.target) && e.target !== input) {
    dd.style.display = 'none';
  } else {
    // 如果点击在内部，重新监听
    document.addEventListener('click', closeRgDropdownOutside, {once:true});
  }
}

function selectContinent(el) {
  document.querySelectorAll('.rg-cont-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  rgCurrentCont = el.dataset.cont;
  renderRgCountryList();
}

function filterRgDropdown() {
  const dd = document.getElementById('rg-dropdown');
  if(dd) dd.style.display = 'block';
  renderRgCountryList();
}

function renderRgCountryList() {
  const list = document.getElementById('rg-country-list');
  if(!list) return;
  const search = (document.getElementById('rg-search-input')?.value || '').trim().toLowerCase();
  const selectedNames = getSelectedRgNames();
  let countries = RG_COUNTRIES;
  if(rgCurrentCont !== 'all') countries = countries.filter(c => c.cont === rgCurrentCont);
  if(search) countries = countries.filter(c => c.name.includes(search) || c.name.toLowerCase().includes(search));
  if(!countries.length) {
    list.innerHTML = `<div style="padding:16px;text-align:center;font-size:12px;color:var(--t-muted)">No matching country</div>`;
    return;
  }
  list.innerHTML = countries.map(c => {
    const isSel = selectedNames.includes(c.name);
    return `<div class="rg-country-item${isSel?' selected':''}" onclick="toggleRgCountry('${c.name}','${c.flag}',this)">
      ${ccBadge(c.flag)}
      <span>${c.name}</span>
    </div>`;
  }).join('');
}

function getSelectedRgNames() {
  return Array.from(document.querySelectorAll('#region-selected-tags .rg-tag')).map(t => t.dataset.country);
}

function toggleRgCountry(name, flag, el) {
  const tags = document.getElementById('region-selected-tags');
  const existing = tags?.querySelector(`[data-country="${name}"]`);
  if(existing) {
    existing.remove();
  } else {
    const tag = document.createElement('div');
    tag.className = 'rg-tag';
    tag.dataset.country = name;
    tag.dataset.flag = flag;
    tag.innerHTML = `<span class="rg-cc">${FLAG2CC[flag]||'··'}</span>${name} <span onclick="removeRgTag(this.parentElement)" style="margin-left:4px;cursor:pointer;opacity:.6;font-size:10px">×</span>`;
    tags?.appendChild(tag);
  }
  updateRgCount();
  renderRgCountryList();
}

function removeRgTag(tagEl) {
  tagEl.remove();
  updateRgCount();
  renderRgCountryList();
}

function clearAllRgTags() {
  const tags = document.getElementById('region-selected-tags');
  if(tags) tags.innerHTML = '';
  updateRgCount();
  renderRgCountryList();
}

function updateRgCount() {
  const count = document.querySelectorAll('#region-selected-tags .rg-tag').length;
  const el = document.getElementById('rg-count');
  if(el) el.textContent = count;
}

function updateIcpDescCount(textarea) {
  const count = textarea.value.length;
  const el = document.getElementById('icp-desc-count');
  if(el) {
    el.textContent = count;
    el.style.color = count > 180 ? '#e5484d' : count > 100 ? '#c8860a' : 'var(--t-muted)';
  }
  if(count > 200) textarea.value = textarea.value.substring(0, 200);
}
function toggleAutoUnlock(el) {
  el.classList.toggle('on');
  const label = document.getElementById('icp-toggle-label');
  if(label) label.textContent = el.classList.contains('on') ? 'On — AI auto-enriches email and phone' : 'Off — unlock contacts manually';
}

// ═══════════════════════════════════════════════════════
// WHATSAPP
// ═══════════════════════════════════════════════════════
function renderWaContacts() {
  const list = document.getElementById('wa-contact-list');
  if(!list) return;
  list.innerHTML = WA_CONTACTS.map((c,i) => `
    <div class="wa-contact ${i===0?'on':''}" id="wa-c-${c.id}" onclick="selectWaContact(${c.id})">
      <div class="wa-av">${c.av}</div>
      <div class="wa-contact-info">
        <div class="wa-contact-name">${ccBadge(c.country)}${c.name}</div>
        <div class="wa-contact-last">${c.last}</div>
      </div>
      <div class="wa-contact-right">
        <div class="wa-time">${c.time}</div>
        ${c.unread ? `<div class="wa-unread">${c.unread}</div>` : ''}
      </div>
    </div>
  `).join('');
}

function selectWaContact(id) {
  currentWaContact = id;
  document.querySelectorAll('.wa-contact').forEach(c => c.classList.remove('on'));
  document.getElementById('wa-c-'+id).classList.add('on');
  const c = WA_CONTACTS[id];
  document.getElementById('wa-chat-av').textContent = c.av;
  document.getElementById('wa-chat-name').textContent = c.name;
  document.getElementById('wa-chat-status').textContent = c.status === 'online' ? '● Online' : '○ Offline';
  document.getElementById('wa-chat-status').style.color = c.status === 'online' ? 'var(--green)' : 'var(--t-muted)';
  const linkName = document.getElementById('wa-link-name');
  if (linkName) linkName.textContent = c.name;
  renderWaChat(id);
  renderIntelPanel(id);
}

function renderWaChat(id) {
  const msgs = WA_CHATS[id] || [];
  const container = document.getElementById('wa-messages');
  container.innerHTML = `<div class="wa-date-sep">Today</div>` + msgs.map(m => {
    if(m.type === 'follow') return `<div class="wa-follow-alert"><svg viewBox="0 0 24 24" style="width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:1.8;flex-shrink:0;vertical-align:-2px;margin-right:6px"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>${m.text}</div>`;
    return `<div class="wa-msg ${m.type}"><div class="wa-bubble">${m.text}</div><div class="wa-msg-time">${m.time}</div></div>`;
  }).join('');
  container.scrollTop = container.scrollHeight;

  // Chips
  const chips = WA_CHIPS[id] || [];
  document.getElementById('wa-chips').innerHTML = chips.map(c => `<div class="wa-chip" onclick="useChip(this,'${c.replace(/'/g,"\\'")}')">${c.substring(0,28)}…</div>`).join('');
}

function useChip(el, text) {
  document.getElementById('wa-input').value = text;
  document.querySelectorAll('.wa-chip').forEach(c => c.style.opacity = '0.5');
  el.style.opacity = '1';
  el.style.background = 'rgba(31,143,214,0.2)';
  toast('◆','AI script inserted','Hit send, or keep editing');
}

function sendWaMsg() {
  const input = document.getElementById('wa-input');
  const text = input.value.trim();
  if(!text) return;
  const container = document.getElementById('wa-messages');
  const msgEl = document.createElement('div');
  msgEl.className = 'wa-msg out';
  msgEl.innerHTML = `<div class="wa-bubble">${text}</div><div class="wa-msg-time">now ✓✓</div>`;
  container.appendChild(msgEl);
  input.value = '';
  container.scrollTop = container.scrollHeight;
  // Simulate reply
  const typingEl = document.createElement('div');
  typingEl.className = 'wa-typing';
  typingEl.innerHTML = '<div class="wa-typing-dot"></div><div class="wa-typing-dot"></div><div class="wa-typing-dot"></div>';
  setTimeout(() => {
    container.appendChild(typingEl);
    container.scrollTop = container.scrollHeight;
  }, 800);
  const replies = ["Sure, we'll confirm the quote tomorrow.", 'Thank you! I will get back to you shortly.', 'Got it, one moment — I need to check our stock.', 'This price looks reasonable, we can discuss further.'];
  const reply = replies[Math.floor(Math.random()*replies.length)];
  setTimeout(() => {
    typingEl.remove();
    const replyEl = document.createElement('div');
    replyEl.className = 'wa-msg in';
    replyEl.innerHTML = `<div class="wa-bubble">${reply}</div><div class="wa-msg-time">now</div>`;
    container.appendChild(replyEl);
    container.scrollTop = container.scrollHeight;
    toast('◆','Reply received',`${WA_CONTACTS[currentWaContact].name}: ${reply.substring(0,30)}…`);
  }, 2500);
}

function renderIntelPanel(id) {
  const d = INTEL_DATA[id] || INTEL_DATA[0];
  const scroll = document.getElementById('intel-scroll');
  const irow = r => `<div class="intel-row"><div class="intel-row-icon"><svg viewBox="0 0 24 24">${IROW_ICON[r.icon]||''}</svg></div><div class="intel-row-key">${r.key}</div><div class="intel-row-val">${r.val}</div></div>`;
  scroll.innerHTML = `
    <div class="follow-up-alert">
      <div class="follow-up-title"><svg viewBox="0 0 24 24" class="follow-up-ico">${IROW_ICON[d.followup.ico]||''}</svg>${d.followup.title}</div>
      <div class="follow-up-text">${d.followup.text}</div>
      <button class="follow-up-btn" onclick="toast('◆','Drafting follow-up email','AI is drafting a personalized follow-up for ${d.name}…')">${d.followup.btn}</button>
    </div>
    <div class="intel-company-card">
      <div class="intel-co-av">${d.name[0]}</div>
      <div class="intel-co-name">${d.name}</div>
      <div class="intel-co-sub">${d.company} · ${ccBadge(d.flag)}${d.country}</div>
      <div class="intel-score-badge">ICP match ${d.score}</div>
    </div>
    <div class="intel-section">
      <div class="intel-section-title">Basics</div>
      ${d.basic.map(irow).join('')}
    </div>
    <div class="intel-section">
      <div class="intel-section-title">Deep intel</div>
      ${unlockedIntel[id]
        ? d.locked.map(irow).join('')
        : `<div class="intel-blur-section">
        <div class="intel-blur">
          ${d.locked.map(irow).join('')}
        </div>
        <div class="intel-lock-overlay" onclick="openPanelUnlock()">
          <div class="intel-lock-icon"><svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg></div>
          <div class="intel-lock-text">Unlock deep intel</div>
          <div class="intel-lock-price">¥29 each / ¥99 monthly</div>
        </div>
      </div>`}
    </div>
  `;
}

// ═══════════════════════════════════════════════════════
// MARKETING
// ═══════════════════════════════════════════════════════
function renderMktList() {
  const list = document.getElementById('mkt-list');
  if(!list) return;
  list.innerHTML = MKT_ITEMS.map(m => `
    <div class="mkt-item ${m.id===0?'on':''}" id="mkt-i-${m.id}" onclick="selectMktItem(${m.id})">
      <div class="mkt-item-top">
        ${ccBadge(m.flag)}
        <div class="mkt-item-name">${m.name}</div>
        <div class="mkt-item-score">${m.score}</div>
      </div>
      <div class="mkt-item-product">${m.product}</div>
      <div class="mkt-item-status ${m.status}">${m.status==='pending'?'Pending':'Approved'}</div>
    </div>
  `).join('');
  selectMktItem(0);
}

function selectMktItem(id) {
  currentMktItem = id;
  currentVariant = 0;
  document.querySelectorAll('.mkt-item').forEach(m => m.classList.remove('on'));
  const el = document.getElementById('mkt-i-'+id);
  if(el) el.classList.add('on');
  const item = MKT_ITEMS[id];
  const variants = EMAIL_VARIANTS[0] || EMAIL_VARIANTS[0];
  const col = document.getElementById('mkt-review-col');
  col.innerHTML = `
    <div class="mkt-review-head">
      <div class="mkt-review-name">${ccBadge(item.flag)}${item.name} · ${item.company}</div>
      <div class="mkt-review-meta"><span>${item.product}</span><span>ICP match ${item.score}</span></div>
    </div>
    <div class="variants-label">AI generated 3 opener variants — pick the best to approve and send</div>
    <div class="variants-row">
      ${variants.map((v,i) => `
        <div class="variant-card ${i===0?'on':''}" id="vc-${i}" onclick="selectVariant(${i})">
          <div class="variant-hook">${v.hook}</div>
          <div class="variant-subject">${v.subject}</div>
          <div class="variant-conf">
            <div class="variant-conf-bar"><div class="variant-conf-fill" style="width:${v.conf}%"></div></div>
            <div class="variant-conf-num">${v.conf}%</div>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="email-preview" id="email-preview">
      <div class="email-subject" id="email-subject">${variants[0].subject}</div>
      <div class="email-body" id="email-body">${variants[0].body}</div>
      <div class="approved-stamp" id="approved-stamp">Approved · sent</div>
    </div>
    <div class="email-actions">
      <div class="btn-approve" onclick="approveEmail(${id})">Approve and send</div>
      <div class="btn-edit" onclick="toast('◆','Edit mode','Email editing is coming soon')">Edit</div>
      <div class="btn-reject" onclick="rejectEmail(${id})">✕ Reject</div>
    </div>
  `;
}

function selectVariant(i) {
  currentVariant = i;
  document.querySelectorAll('.variant-card').forEach((v,j) => v.classList.toggle('on', j===i));
  const v = (EMAIL_VARIANTS[0])[i];
  document.getElementById('email-subject').textContent = v.subject;
  document.getElementById('email-body').textContent = v.body;
}

function approveEmail(id) {
  const stamp = document.getElementById('approved-stamp');
  stamp.classList.add('show');
  MKT_ITEMS[id].status = 'approved';
  const statusEl = document.querySelector(`#mkt-i-${id} .mkt-item-status`);
  if(statusEl) { statusEl.textContent = 'Approved'; statusEl.className = 'mkt-item-status approved'; }
  pendingCount = Math.max(0, pendingCount-1);
  document.getElementById('mkt-pending-badge').textContent = pendingCount + ' pending';
  toast('◆','Email approved','Adding to the send queue — out within 5 minutes');
}

function rejectEmail(id) {
  toast('◆','Email rejected','AI will generate new variants');
  setTimeout(() => selectMktItem(id), 500);
}

// ═══════════════════════════════════════════════════════
// AI DAILY REPORT (Dashboard right panel)
// ═══════════════════════════════════════════════════════
const AI_DAILY_ITEMS = [
  {icon:'🔍', color:'#1e5fd0', label:'Global lead search', value:'147 new leads', detail:'From search engines, customs data, LinkedIn', page:'leads'},
  {icon:'📣', color:'#17a673', label:'AI marketing sent', value:'23 emails', detail:'Delivered to 23 buyers · avg open rate 61%', page:'marketing'},
  {icon:'🤝', color:'#1f8fd6', label:'New connected buyers', value:'8', detail:'Fairprice, Jaya Grocer and others replied', page:'pool'},
  {icon:'💬', color:'#c8860a', label:'New WhatsApp messages', value:'5', detail:'Klaus Weber replied on pricing, T&T asked about lead time', page:'whatsapp'},
  {icon:'🌐', color:'#2f9fe0', label:'Intel center update', value:'98,241 demands', detail:'Global purchasing demand synced live', page:'intel'},
];

function renderAiDailyReport() {
  const el = document.getElementById('ai-daily-report');
  if(!el) return;
  el.innerHTML = AI_DAILY_ITEMS.map(item => `
    <div onclick="navTo('${item.page}')" style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:8px;cursor:pointer;transition:.15s;border:1px solid rgba(19,33,63,.04)" onmouseover="this.style.background='rgba(19,33,63,.04)'" onmouseout="this.style.background=''">
      <div style="width:4px;height:36px;border-radius:3px;background:${item.color};flex-shrink:0;opacity:.85"></div>
      <div style="flex:1;min-width:0">
        <div style="font-size:11px;color:var(--t-muted)">${item.label}</div>
        <div style="font-size:13px;font-weight:700;color:${item.color}">${item.value}</div>
        <div style="font-size:10px;color:var(--t-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${item.detail}</div>
      </div>
      <svg viewBox="0 0 24 24" style="width:12px;height:12px;stroke:var(--t-muted);fill:none;flex-shrink:0"><polyline points="9 18 15 12 9 6"/></svg>
    </div>
  `).join('');
}

// ═══════════════════════════════════════════════════════
// INTEL CENTER TABLE
// ═══════════════════════════════════════════════════════
const INTEL_TABLE_DATA = [
  {id:0, flag:'🇸🇬', country:'Singapore', region:'SE Asia', buyer:'Fairprice Group', need:'Festive gift-box sourcing', cat:'Mooncake', score:96, contactRate:72, leadId:'TR-2406-0001', status:'new', time:'2026-06-14 09:12', unlocked:true},
  {id:1, flag:'🇲🇾', country:'Malaysia', region:'SE Asia', buyer:'Jaya Grocer', need:'Premium mooncake gift-box wholesale', cat:'Mooncake', score:93, contactRate:68, leadId:'TR-2406-0002', status:'new', time:'2026-06-14 09:08', unlocked:true},
  {id:2, flag:'🇹🇭', country:'Thailand', region:'SE Asia', buyer:'Central Food Hall', need:'Coconut pastry gift-box import', cat:'Coconut', score:87, contactRate:61, leadId:'TR-2406-0003', status:'hot', time:'2026-06-14 09:05', unlocked:false},
  {id:3, flag:'🇦🇺', country:'Australia', region:'Oceania', buyer:'Asian Grocery Pty', need:'Festive gift-set sourcing', cat:'Gift', score:84, contactRate:55, leadId:'TR-2406-0004', status:'locked', time:'2026-06-14 09:02', unlocked:false},
  {id:4, flag:'🇺🇸', country:'USA', region:'N. America', buyer:'99 Ranch Market', need:'Annual Chinese pastry supply', cat:'Pastry', score:89, contactRate:64, leadId:'TR-2406-0005', status:'locked', time:'2026-06-14 08:55', unlocked:false},
  {id:5, flag:'🇨🇦', country:'Canada', region:'N. America', buyer:'T&T Supermarket', need:'Annual mooncake gift-box buy', cat:'Mooncake', score:91, contactRate:70, leadId:'TR-2406-0006', status:'hot', time:'2026-06-14 08:49', unlocked:true},
  {id:6, flag:'🇮🇩', country:'Indonesia', region:'SE Asia', buyer:'Transmart Carrefour', need:'Chinese pastry range', cat:'Pastry', score:82, contactRate:58, leadId:'TR-2406-0007', status:'new', time:'2026-06-14 08:42', unlocked:false},
  {id:7, flag:'🇬🇧', country:'UK', region:'Europe', buyer:'Wing Yip Group', need:'Annual Asian-food sourcing', cat:'Gift', score:79, contactRate:52, leadId:'TR-2406-0008', status:'new', time:'2026-06-14 08:36', unlocked:false},
  {id:8, flag:'🇩🇪', country:'Germany', region:'Europe', buyer:'Asia Markt GmbH', need:'Chinese festive-gift import', cat:'Gift', score:76, contactRate:48, leadId:'TR-2406-0009', status:'locked', time:'2026-06-14 08:22', unlocked:false},
  {id:9, flag:'🇦🇪', country:'UAE', region:'Middle East', buyer:'Al Madina Group', need:'Imported food sourcing', cat:'Pastry', score:78, contactRate:51, leadId:'TR-2406-0010', status:'new', time:'2026-06-14 08:07', unlocked:false},
  {id:10, flag:'🇫🇷', country:'France', region:'Europe', buyer:'Paris Store', need:'Asian-food retail sourcing', cat:'Gift', score:72, contactRate:44, leadId:'TR-2406-0011', status:'new', time:'2026-06-14 07:15', unlocked:false},
  {id:11, flag:'🇵🇭', country:'Philippines', region:'SE Asia', buyer:'Robinsons Supermarket', need:'Festive gift-box wholesale', cat:'Mooncake', score:80, contactRate:56, leadId:'TR-2406-0012', status:'new', time:'2026-06-14 06:28', unlocked:false},
  {id:12, flag:'🇻🇳', country:'Vietnam', region:'SE Asia', buyer:'Vinmart+', need:'Chinese pastry import', cat:'Pastry', score:75, contactRate:49, leadId:'TR-2406-0013', status:'hot', time:'2026-06-14 05:44', unlocked:false},
  {id:13, flag:'🇳🇿', country:'New Zealand', region:'Oceania', buyer:'Countdown NZ', need:'Asian-food range', cat:'Pastry', score:71, contactRate:42, leadId:'TR-2406-0014', status:'locked', time:'2026-06-14 04:58', unlocked:false},
  {id:14, flag:'🇰🇷', country:'South Korea', region:'SE Asia', buyer:'Lotte Mart', need:'Chinese festive-gift sourcing', cat:'Gift', score:83, contactRate:60, leadId:'TR-2406-0015', status:'new', time:'2026-06-14 03:22', unlocked:false},
];

// 国旗 emoji → 两字母 mono 国家码(终端风,去 emoji);跨屏复用。
const FLAG2CC = {'🇸🇬':'SG','🇲🇾':'MY','🇹🇭':'TH','🇺🇸':'US','🇦🇺':'AU','🇫🇷':'FR','🇮🇩':'ID','🇰🇷':'KR','🇩🇪':'DE','🇬🇧':'GB','🇨🇦':'CA','🇪🇺':'EU','🇦🇪':'AE','🇻🇳':'VN','🇳🇿':'NZ','🇵🇭':'PH','🇯🇵':'JP','🇨🇳':'CN','🇧🇷':'BR','🇮🇳':'IN','🇮🇹':'IT','🇪🇸':'ES','🇲🇽':'MX'};
const ccBadge = f => `<span style="font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700;letter-spacing:.05em;color:var(--t-sec);background:rgba(19,33,63,.05);border:1px solid var(--card-border);border-radius:4px;padding:1px 5px;margin-right:7px">${FLAG2CC[f]||'··'}</span>`;

function renderIntelTable() {
  const tbody = document.getElementById('intel-table-body');
  if(!tbody) return;
  const search = (document.getElementById('intel-search')?.value || '').toLowerCase();
  const filterRegion = document.getElementById('intel-filter-region')?.value || '';
  const filterCat = document.getElementById('intel-filter-cat')?.value || '';
  const filterStatus = document.getElementById('intel-filter-status')?.value || '';
  const sortBy = document.getElementById('intel-sort')?.value || 'time';
  let data = [...INTEL_TABLE_DATA];
  if(filterRegion) data = data.filter(d => d.region === filterRegion);
  if(filterCat) data = data.filter(d => d.cat.includes(filterCat));
  if(filterStatus) data = data.filter(d => d.status === filterStatus);
  if(search) data = data.filter(d => d.buyer.toLowerCase().includes(search) || d.country.includes(search) || d.need.includes(search) || d.cat.includes(search));
  if(sortBy === 'score') data.sort((a,b) => b.score - a.score);
  else if(sortBy === 'amount') data.sort((a,b) => b.id - a.id);
  const countEl = document.getElementById('intel-count');
  if(countEl) countEl.textContent = data.length;
  const statusCfg = {
    new:    {color:'#1f8fd6', bg:'rgba(31,143,214,.08)',  border:'rgba(31,143,214,.2)',  label:'New'},
    hot:    {color:'#e5484d', bg:'rgba(229,72,77,.08)', border:'rgba(229,72,77,.2)', label:'Hot'},
    locked: {color:'#6b7280', bg:'rgba(107,114,128,.08)', border:'rgba(107,114,128,.2)', label:'Locked'},
  };
  if(!data.length) {
    tbody.innerHTML = `<tr><td colspan="8" style="padding:40px;text-align:center;color:var(--t-muted);font-size:13px">No matching demand</td></tr>`;
    return;
  }
  tbody.innerHTML = data.map(d => {
    const sc = statusCfg[d.status] || statusCfg.new;
    const scoreColor = d.score >= 90 ? '#17a673' : d.score >= 80 ? '#1e5fd0' : '#c8860a';
    const isLocked = !d.unlocked;
    // 采购商显示：未解锁则隐藏名称，显示马赛克字符
    const buyerDisplay = isLocked
      ? `<div style="font-size:13px;font-weight:600;color:var(--t-muted);letter-spacing:2px;filter:blur(4px);user-select:none">████████</div><div style="font-size:10px;color:var(--t-muted);margin-top:3px;display:flex;align-items:center;gap:4px"><svg viewBox="0 0 24 24" style="width:11px;height:11px;stroke:#c8860a;fill:none;stroke-width:2;flex-shrink:0"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>Unlock buyer</div>`
      : `<div style="font-size:13px;font-weight:600;color:var(--t-primary)">${d.buyer}</div>`;
    // 建联成功率颜色
    const crColor = d.contactRate >= 65 ? '#17a673' : d.contactRate >= 50 ? '#c8860a' : '#e5484d';
    return `<tr class="intel-tr" style="cursor:pointer" onclick="${isLocked ? "openIntelUnlock("+d.id+")" : "toast('◆','\u5efa\u8054\u5df2\u542f\u52a8','AI \u6b63\u5728\u4e3a ${d.buyer} \u751f\u6210\u4e2a\u6027\u5316\u5f00\u573a\u767d\u2026')"}">\n      <td style="padding:12px 24px;white-space:nowrap">
        ${ccBadge(d.flag)}
        <span style="font-size:12px;color:var(--t-primary)">${d.country}</span>
        <div style="font-size:10px;color:var(--t-muted);margin-top:1px">${d.region}</div>
        <div style="margin-top:4px;display:inline-flex;align-items:center;gap:4px;font-size:10px;font-weight:600;color:${sc.color}"><span style="width:5px;height:5px;border-radius:2px;background:${sc.color};flex-shrink:0"></span>${sc.label}</div>
      </td>
      <td style="padding:12px 16px">${buyerDisplay}</td>
      <td style="padding:12px 16px">
        <div style="font-size:12px;color:var(--t-primary)">${d.need}</div>
        <div style="font-size:10px;color:var(--t-muted);margin-top:2px">${d.cat}</div>
      </td>
      <td style="padding:12px 16px;text-align:center">
        <div style="display:inline-flex;align-items:center;gap:4px">
          <div style="width:36px;height:4px;background:rgba(19,33,63,.08);border-radius:2px;overflow:hidden">
            <div style="height:100%;width:${d.score}%;background:${scoreColor};border-radius:2px"></div>
          </div>
          <span style="font-size:12px;font-weight:700;color:${scoreColor}">${d.score}</span>
        </div>
      </td>
      <td style="padding:12px 16px;white-space:nowrap">
        <span style="font-size:12px;font-weight:600;color:${crColor}">${d.contactRate}%</span>
        <div style="width:48px;height:3px;background:rgba(19,33,63,.06);border-radius:2px;overflow:hidden;margin-top:4px">
          <div style="height:100%;width:${d.contactRate}%;background:${crColor};border-radius:2px"></div>
        </div>
      </td>
      <td style="padding:12px 16px;font-size:11px;color:var(--t-muted);font-family:monospace;white-space:nowrap">${d.leadId}</td>
      <td style="padding:12px 16px;font-size:11px;color:var(--t-muted);white-space:nowrap">${d.time}</td>
      <td style="padding:12px 16px;text-align:center" onclick="event.stopPropagation()">
        ${isLocked
          ? `<div onclick="openIntelUnlock(${d.id})" style="font-size:10px;padding:5px 12px;border-radius:7px;background:rgba(200,134,10,.08);color:#c8860a;border:1px solid rgba(200,134,10,.2);cursor:pointer;white-space:nowrap">Unlock</div>`
          : `<div onclick="toast('◆','Outreach started','AI is drafting a personalized opener for ${d.buyer}…')" style="font-size:10px;padding:5px 12px;border-radius:7px;background:rgba(31,143,214,.1);color:#1e5fd0;border:1px solid rgba(31,143,214,.2);cursor:pointer;white-space:nowrap">Connect</div>`
        }
      </td>
    </tr>`;
  }).join('');
}

// ═══════════════════════════════════════════════════════
// INTEL CENTER (legacy, kept for compatibility)
// ═══════════════════════════════════════════════════════
function renderIntelCenter() {
  const grid = document.getElementById('intel-center-grid');
  grid.innerHTML = INTEL_CENTER_CARDS.map((c,i) => `
    <div class="intel-big-card" style="animation-delay:${i*0.1}s">
      <div class="intel-big-top">
        <div class="intel-big-icon" style="background:${c.bg};font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:700;color:var(--t-primary)">${FLAG2CC[c.icon]||c.icon}</div>
        <div><div class="intel-big-title">${c.title}</div><div class="intel-big-sub">${c.sub}</div></div>
        <div class="intel-big-badge ${c.badge}">${c.badgeText}</div>
      </div>
      ${c.locked ? `
        <div class="intel-blur-section">
          <div class="intel-blur-content">
            ${c.rows.map(r => `<div class="intel-data-row"><div class="intel-data-label">${r.label}</div><div class="intel-data-val">${r.val}</div></div>`).join('')}
          </div>
          <div class="intel-lock-overlay" onclick="showModal('modal-unlock')">
            <div class="intel-lock-icon">🔒</div>
            <div class="intel-lock-text">Unlock deep intel</div>
            <div class="intel-lock-price">¥29 / ¥99 monthly</div>
          </div>
        </div>
      ` : `
        ${c.rows.map(r => `<div class="intel-data-row"><div class="intel-data-label">${r.label}</div><div class="intel-data-val">${r.val}</div></div>`).join('')}
        <button style="width:100%;margin-top:12px;background:rgba(31,143,214,.1);border:1px solid rgba(31,143,214,.2);border-radius:8px;padding:8px;font-size:12px;font-weight:700;color:var(--brand2);cursor:pointer;" onclick="toast('◆','Connected','AI is drafting a personalized opener for this buyer…')">Connect now</button>
      `}
    </div>
  `).join('');
}

// ═══════════════════════════════════════════════════════
// MODALS & UNLOCK
// ═══════════════════════════════════════════════════════
function showModal(id) { document.getElementById(id).classList.add('show'); }
function closeModal(id) { document.getElementById(id).classList.remove('show'); }
function selectUnlock(el) { document.querySelectorAll('.unlock-opt').forEach(o => o.classList.remove('on')); el.classList.add('on'); }
function openIntelUnlock(id) { intelUnlockTarget = id; showModal('modal-unlock'); }
function openPanelUnlock() { intelPanelUnlockTarget = currentWaContact; showModal('modal-unlock'); }
function confirmUnlock() {
  closeModal('modal-unlock');
  if(intelPanelUnlockTarget != null) {
    const id = intelPanelUnlockTarget; intelPanelUnlockTarget = null;
    const c = INTEL_DATA[id];
    if(c && !unlockedIntel[id]) {
      unlockedIntel[id] = true;
      credits = Math.max(0, credits - 1);
      const cv = document.getElementById('credits-val'); if(cv) cv.textContent = credits;
      renderIntelPanel(id);
      toast('◆','Deep intel unlocked',`${c.name}'s phone/email/spend now shown · ${credits} connect credits left`);
      return;
    }
  }
  if(intelUnlockTarget != null) {
    const row = INTEL_TABLE_DATA.find(d => d.id === intelUnlockTarget);
    intelUnlockTarget = null;
    if(row && !row.unlocked) {
      row.unlocked = true;
      if(row.status === 'locked') row.status = 'new';
      credits = Math.max(0, credits - 1);
      const cv = document.getElementById('credits-val'); if(cv) cv.textContent = credits;
      renderIntelTable();
      toast('◆','Intel unlocked',`Full purchasing intel for ${row.buyer} now shown · ${credits} connect credits left`);
      return;
    }
  }
  toast('◆','Intel unlocked','Full contacts and purchase records now shown');
}

// ═══════════════════════════════════════════════════════
// AI BUBBLE
// ═══════════════════════════════════════════════════════
function toggleAi() {
  const panel = document.getElementById('ai-panel');
  panel.classList.toggle('open');
}
function rotateAiMsg() {
  aiMsgIdx = (aiMsgIdx+1) % AI_MSGS.length;
  document.getElementById('ai-msg').innerHTML = AI_MSGS[aiMsgIdx];
}
function aiAction(type) {
  toggleAi();
  if(type==='draft') { navTo('marketing'); toast('◆','Drafting follow-up email','AI is drafting a personalized follow-up for Klaus Weber…'); }
  else if(type==='leads') navTo('leads');
  else if(type==='whatsapp') navTo('whatsapp');
}

// ═══════════════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════════════
let toastTimer = null;
function toast(icon, title, sub) {
  const t = document.getElementById('toast');
  document.getElementById('toast-icon').textContent = icon;
  document.getElementById('toast-title').textContent = title;
  document.getElementById('toast-sub').innerHTML = sub || '';
  t.classList.remove('show');
  void t.offsetWidth;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3800);
}

// ═══════════════════════════════════════════════════════
// MISC
// ═══════════════════════════════════════════════════════
function setPf(el) { document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('on')); el.classList.add('on'); }

// Stars background
(function() {
  const container = document.getElementById('reg-stars');
  if (!container) return; // guard: #reg-stars absent in this build → no-op
  for(let i=0;i<80;i++) {
    const s = document.createElement('div');
    s.className = 'reg-star';
    s.style.left = Math.random()*100+'%';
    s.style.top = Math.random()*100+'%';
    s.style.setProperty('--d', (2+Math.random()*4)+'s');
    s.style.setProperty('--delay', (Math.random()*4)+'s');
    s.style.setProperty('--op', (0.3+Math.random()*0.5).toString());
    container.appendChild(s);
  }
})();

// Activity feed auto-refresh

const NEW_ACTIVITIES = [
  {dot:'#1e5fd0',text:'AI 搜索引擎新推送 <strong>23 条</strong>东南亚超市采购线索',time:'刚刚'},
  {dot:'#17a673',text:'<strong>Fairprice Group</strong> 回复了产品目录请求，建议跟进',time:'刚刚'},
  {dot:'#c8860a',text:'AI 已自动发送 <strong>7 封</strong>个性化邮件，待审批',time:'刚刚'},
  {dot:'#1f8fd6',text:'<strong>Klaus Weber</strong> 在 WhatsApp 回复了报价单',time:'刚刚'},
  {dot:'#1e5fd0',text:'AI 海关数据匹配到 <strong>18 条</strong>新加坡进口商线索',time:'刚刚'},
  {dot:'#e5484d',text:'<strong>T&T Supermarket</strong> 3 天无沟通，已触发跟进提醒',time:'刚刚'},
];
function startActivityFeed() {
  const list = document.getElementById('activity-list');
  if(!list) return;
  // Clear any existing items to avoid duplicates
  list.innerHTML = '';
  // Add initial items
  const initItems = [
    {dot:'#17a673',text:'<strong>Klaus Weber</strong> 在 WhatsApp 回复了报价单',time:'刚刚'},
    {dot:'#1f8fd6',text:'AI 为 <strong>Rajesh Kumar</strong> 生成了 3 份个性化邮件',time:'2分钟'},
    {dot:'#c8860a',text:'新增 🇸🇬 新加坡节庆礼盒采购需求，匹配度 <strong style="color:#17a673">96分</strong>',time:'5分钟'},
    {dot:'#1f8fd6',text:'<strong>Ahmed Al-Rashid</strong> 打开了您发送的产品手册',time:'12分钟'},
    {dot:'#1e5fd0',text:'新增 🇲🇾 马来西亚月饼采购需求，标记为 🔥 热门',time:'18分钟'},
    {dot:'#e5484d',text:'<strong>Carlos Silva</strong> 的跟进提醒已触发，建议今日联系',time:'25分钟'},
  ];
  initItems.forEach(a => {
    const item = document.createElement('div');
    item.className = 'act-item';
    item.innerHTML = `<div class="act-dot" style="background:${a.dot}"></div><div class="act-text">${a.text}</div><div class="act-time">${a.time}</div>`;
    list.appendChild(item);
  });
  if(actIntervalId) clearInterval(actIntervalId);
  actIntervalId = setInterval(() => {
    const list2 = document.getElementById('activity-list');
    if(!list2) return;
    const a = NEW_ACTIVITIES[actIdx % NEW_ACTIVITIES.length];
    actIdx++;
    const item = document.createElement('div');
    item.className = 'act-item';
    item.style.animation = 'slideRight .4s ease';
    item.innerHTML = `<div class="act-dot" style="background:${a.dot}"></div><div class="act-text">${a.text}</div><div class="act-time">${a.time}</div>`;
    list2.insertBefore(item, list2.firstChild);
    if(list2.children.length > 8) list2.removeChild(list2.lastChild);
  }, 7000);
}


/* DOM-dependent listeners — deferred until Vue has mounted the markup. */
window.__initLegacyApp = function(){
// Click outside modal to close
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', e => { if(e.target === m) m.classList.remove('show'); });
});

// Keyboard: Enter to send WA
document.addEventListener('keydown', e => {
  if(e.key === 'Enter' && document.activeElement.id === 'wa-input') sendWaMsg();
});

// Cursor-tracked spotlight on KPI cards (Spotlight Border Card).
// Delegated + transform-free: only writes two CSS custom props, no layout work.
document.addEventListener('pointermove', e => {
  const card = e.target.closest && e.target.closest('.kpi-card');
  if(!card) return;
  const r = card.getBoundingClientRect();
  card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
  card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
}, {passive:true});
};
