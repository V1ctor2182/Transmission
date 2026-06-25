// H3 golden-path harness — drives the connected money-shot end to end and
// captures a 3-frame sequence + asserts the chain works with zero page errors.
//   node scripts/h3-golden.mjs
// Frames → .review/h3-t0 (dashboard) / t1 (region drill-down) / t2 (WhatsApp opened).
import { createServer } from 'node:http'
import { readFile, mkdir, stat } from 'node:fs/promises'
import { extname, join, resolve } from 'node:path'
import { chromium } from 'playwright'

const PORT = 5311, DIST = resolve('dist'), REVIEW = resolve('.review')
const MIME = { '.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.json':'application/json','.woff2':'font/woff2' }

await stat(join(DIST,'index.html')).catch(() => { throw new Error('dist/ missing — run pnpm build') })
const server = createServer(async (req,res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/' || p.endsWith('/')) p += 'index.html'
  try { const buf = await readFile(join(DIST,p)); res.writeHead(200,{'content-type':MIME[extname(p)]||'application/octet-stream'}); res.end(buf) }
  catch { res.writeHead(404); res.end('nf') }
})
await new Promise(r => server.listen(PORT,r))
await mkdir(REVIEW,{recursive:true})
const browser = await chromium.launch({ channel:'chrome', headless:true })
const out = { steps: [], errors: [], pass: true }
try {
  const page = await browser.newPage({ viewport:{ width:1440, height:900 } })
  page.on('pageerror', e => out.errors.push(String(e)))
  await page.goto(`http://localhost:${PORT}/`, { waitUntil:'networkidle' })
  await page.evaluate(`enterApp(); navTo('dashboard',0)`).catch(()=>{})
  await page.waitForTimeout(1200)
  await page.screenshot({ path: join(REVIEW,'h3-t0.png') })

  // STEP 1: click the 东南亚 hotspot (region drill-down)
  const spot = page.locator('.wh-spot[role="button"]').filter({ hasText: 'SE Asia' })
  const spotCount = await spot.count()
  out.steps.push(['东南亚 hotspot present', spotCount > 0, `count=${spotCount}`])
  await spot.first().click({ force:true })
  await page.waitForTimeout(700)
  await page.screenshot({ path: join(REVIEW,'h3-t1.png') })
  // after drill-down: buyer panel should show only 东南亚 buyers (4) + the clear chip
  const shown = await page.locator('#page-dashboard .brow').count()
  const hasClear = await page.locator('#page-dashboard .region-clear').count()
  out.steps.push(['drill-down filters buyers (东南亚=4)', shown === 4, `rows=${shown}`])
  out.steps.push(['region-clear chip shown', hasClear > 0, `count=${hasClear}`])

  // STEP 2: 一键建联 on the first shown buyer → WhatsApp opens with that conversation
  const firstCo = await page.locator('#page-dashboard .brow .co').first().innerText()
  await page.locator('#page-dashboard .brow .bconnect').first().click({ force:true })
  await page.waitForTimeout(900)
  await page.screenshot({ path: join(REVIEW,'h3-t2.png') })
  const waOn = await page.locator('#page-whatsapp.on').count()
  out.steps.push(['WhatsApp page opened', waOn > 0, `on=${waOn}`])
  const chatName = await page.locator('#wa-chat-name').innerText().catch(()=> '')
  const buyerCo = firstCo.replace(/^[A-Z]{2}/,'').trim()
  out.steps.push(['chat header = the buyer I connected', chatName.includes(buyerCo) || buyerCo.includes(chatName), `chat="${chatName}" buyer="${buyerCo}"`])
  const chatTxt = await page.locator('#wa-messages, .wa-messages, #wa-chat-body').innerText().catch(()=> '')
  const chipTxt = await page.locator('#wa-chips').innerText().catch(()=> '')
  out.steps.push(['conversation seeded (inbound signal)', /sourcing|supplier|pricing|quote/i.test(chatTxt), `len=${chatTxt.length}`])
  out.steps.push(['AI script chips present', chipTxt.trim().length > 0, `len=${chipTxt.length}`])

  out.frames = ['.review/h3-t0.png','.review/h3-t1.png','.review/h3-t2.png']
  out.pass = out.steps.every(s => s[1]) && out.errors.length === 0
} finally { await browser.close(); server.close() }
console.log('\n__GOLDEN__ ' + JSON.stringify(out, null, 2))
process.exit(out.pass ? 0 : 1)
