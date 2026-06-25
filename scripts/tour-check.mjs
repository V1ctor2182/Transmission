// 新手引导 tour 检查 harness —— 走完所有步骤,断言每步 spotlight 命中目标(无跳过/无错)。
//   node scripts/tour-check.mjs
// 帧 → .review/tour-s1 (侧栏) / tour-leads / tour-intel / tour-wa / tour-pool / tour-last.
import { createServer } from 'node:http'
import { readFile, mkdir, stat } from 'node:fs/promises'
import { extname, join, resolve } from 'node:path'
import { chromium } from 'playwright'

const PORT = 5313, DIST = resolve('dist'), REVIEW = resolve('.review')
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
const grab = { 1:'tour-s1', 7:'tour-leads', 8:'tour-intel', 9:'tour-wa', 11:'tour-pool', 12:'tour-last' }
try {
  const page = await browser.newPage({ viewport:{ width:1440, height:900 } })
  page.on('pageerror', e => out.errors.push(String(e)))
  await page.goto(`http://localhost:${PORT}/`, { waitUntil:'networkidle' })
  await page.evaluate(`enterApp(); navTo('dashboard',0)`).catch(()=>{})
  await page.waitForTimeout(400)
  await page.evaluate(`window.startTour && startTour()`).catch(()=>{})
  await page.waitForTimeout(450)

  const total = await page.evaluate(`document.querySelector('.tour-card .tour-step')?.textContent.match(/\\/\\s*(\\d+)/)?.[1]`).catch(()=>null)
  const N = parseInt(total, 10) || 12
  out.steps.push(['总步数读到', N >= 10, `N=${N}`])

  for (let s = 1; s <= N; s++) {
    // 每步:spotlight 必须可见(display:block = 目标命中,未跳过)
    const spotShown = await page.locator('.tour-spot').evaluate(el => getComputedStyle(el).display !== 'none').catch(()=>false)
    const stepTxt = await page.locator('.tour-card .tour-step').innerText().catch(()=> '')
    const titleTxt = await page.locator('.tour-card .tour-title').innerText().catch(()=> '')
    out.steps.push([`步 ${s} spotlight 命中 + 有标题`, spotShown && titleTxt.length > 0, `step="${stepTxt}" title="${titleTxt}"`])
    if (grab[s]) await page.screenshot({ path: join(REVIEW, `${grab[s]}.png`) })
    if (s < N) { await page.locator('.tour-btn:not(.ghost)').click({ force:true }); await page.waitForTimeout(420) }
  }
  // 完成后引导关闭
  await page.locator('.tour-btn:not(.ghost)').click({ force:true }).catch(()=>{})
  await page.waitForTimeout(250)
  const closed = await page.locator('.tour-card').count()
  out.steps.push(['完成后引导关闭', closed === 0, `cards=${closed}`])

  out.frames = Object.values(grab).map(n => `.review/${n}.png`)
  out.pass = out.steps.every(s => s[1]) && out.errors.length === 0
} finally { await browser.close(); server.close() }
console.log('\n__TOUR__ ' + JSON.stringify(out, null, 2))
process.exit(out.pass ? 0 : 1)
