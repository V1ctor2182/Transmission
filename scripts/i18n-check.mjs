// i18n gate — sweeps every screen/state for VISIBLE Chinese in one shot.
//   node scripts/i18n-check.mjs
// Reuses ONE server + ONE browser (reload + navigate per screen), scans
// document.body.innerText (visible text only — ignores hidden modals + JS data
// keys like region:'东南亚' that regionLabel maps to English). Allowlist: the
// intentional 创拾觅深 brand signature. Exit 1 if any screen shows Chinese.
// Complements verify.mjs's per-screen guard (R085) with full one-command coverage.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, resolve } from 'node:path'
import { chromium } from 'playwright'

const PORT = 5312, DIST = resolve('dist')
const MIME = { '.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.json':'application/json','.woff2':'font/woff2' }
const ALLOW = ['创拾觅深']   // intentional brand signature on the login panel

const NAV = {
  login:            null,
  dashboard:        `enterApp(); navTo('dashboard',0)`,
  leads:            `enterApp(); navTo('leads',1)`,
  'leads-tasks':    `enterApp(); navTo('leads',1); if(window.showLeadsView)showLeadsView('tasks')`,
  'leads-customers':`enterApp(); navTo('leads',1); if(window.showLeadsView)showLeadsView('customers'); if(window.renderCustTable)renderCustTable('all')`,
  marketing:        `enterApp(); navTo('marketing',2); if(window.renderMktList)renderMktList()`,
  intel:            `enterApp(); navTo('intel',3)`,
  whatsapp:         `enterApp(); navTo('whatsapp',4); if(window.renderWaContacts)renderWaContacts(); if(window.selectWaContact)selectWaContact(0)`,
  pool:             `enterApp(); navTo('pool',5)`,
  feedback:         `enterApp(); navTo('leads',1); if(window.showLeadsView)showLeadsView('customers'); if(window.renderCustTable)renderCustTable('all'); if(window.openFeedback)openFeedback(1)`,
  leadsrg:          `enterApp(); navTo('leads',1); if(window.showRgDropdown)showRgDropdown()`,
  unlockm:          `enterApp(); navTo('intel',3); var m=document.getElementById('modal-unlock'); if(m)m.classList.add('show')`,
  connectm:         `enterApp(); navTo('dashboard',0); var m=document.getElementById('modal-connect'); if(m)m.classList.add('show')`,
  intelunlock:      `enterApp(); navTo('intel',3); if(window.openIntelUnlock)openIntelUnlock(4); if(window.confirmUnlock)confirmUnlock()`,
  waunlock:         `enterApp(); navTo('whatsapp',4); if(window.selectWaContact)selectWaContact(0); if(window.openPanelUnlock)openPanelUnlock(); if(window.confirmUnlock)confirmUnlock()`,
  tour:             `enterApp(); navTo('dashboard',0); if(window.startTour)startTour()`,
  nudge:            `enterApp(); navTo('dashboard',0); try{localStorage.removeItem('tm_tour_seen')}catch(e){}; if(window.__tourNudge)__tourNudge()`,
}

await stat(join(DIST, 'index.html')).catch(() => { throw new Error('dist/ missing — run npm run build') })
const server = createServer(async (req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/' || p.endsWith('/')) p += 'index.html'
  try { const b = await readFile(join(DIST, p)); res.writeHead(200, { 'content-type': MIME[extname(p)] || 'application/octet-stream' }); res.end(b) }
  catch { res.writeHead(404); res.end('nf') }
})
await new Promise(r => server.listen(PORT, r))
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const out = {}; let failed = 0
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  for (const [name, nav] of Object.entries(NAV)) {
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' })
    if (nav) await page.evaluate(nav).catch(() => {})
    await page.waitForTimeout(700)
    const hits = await page.evaluate(() => ((document.body.innerText || '').match(/[一-鿿]+/g) || [])).catch(() => [])
    const bad = [...new Set(hits)].filter(s => !ALLOW.some(a => a.includes(s) || s.includes(a)))
    out[name] = bad
    if (bad.length) failed++
    console.log(`${bad.length ? '✗' : '✓'} ${name.padEnd(18)} ${bad.length ? JSON.stringify(bad) : ''}`)
  }
} finally { await browser.close(); server.close() }
console.log(`\n__I18N__ ${JSON.stringify({ pass: failed === 0, screens: out })}`)
process.exit(failed === 0 ? 0 : 1)
