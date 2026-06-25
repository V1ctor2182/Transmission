// H1 first-run golden-path harness — drives the opening "AI 分析 → 指挥台拼装"
// flow end to end and asserts the chain works with zero page errors.
//   node scripts/h1-golden.mjs
// Flow: 登录 → 网址弹窗 → startScan → FirstRunAnalysis 逐件拼装到 settle → 进入工作台 → 工作台。
// Frames → .review/h1-t0 (FRA 拼装中) / t1 (settle 就绪) / t2 (工作台).
import { createServer } from 'node:http'
import { readFile, mkdir, stat } from 'node:fs/promises'
import { extname, join, resolve } from 'node:path'
import { chromium } from 'playwright'

const PORT = 5312, DIST = resolve('dist'), REVIEW = resolve('.review')
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

  // STEP 1: 登录 → 网址弹窗
  await page.evaluate(`window.doLogin && doLogin()`).catch(()=>{})
  await page.waitForTimeout(1100)
  const modalShown = await page.locator('#website-modal-overlay.show, #website-modal-overlay[style*="flex"]').count()
  out.steps.push(['登录后网址弹窗出现', modalShown > 0, `count=${modalShown}`])

  // STEP 2: startScan → FirstRunAnalysis 拼装
  await page.evaluate(`window.startScan && startScan()`).catch(()=>{})
  await page.waitForTimeout(2600)
  const fraMounted = await page.locator('.fra').count()
  out.steps.push(['FirstRunAnalysis 已挂载(拼装中)', fraMounted > 0, `count=${fraMounted}`])
  await page.screenshot({ path: join(REVIEW,'h1-t0.png') })

  // STEP 3: 等到 settle/就绪 + 潜在采购额 count-up 滚完(动画 ~5.3s + 0.9s 数字滚入)
  await page.waitForTimeout(4400)
  await page.screenshot({ path: join(REVIEW,'h1-t1.png') })
  const settle = await page.locator('.fra-settle').count()
  out.steps.push(['settle 就绪条出现', settle > 0, `count=${settle}`])
  const buyers = await page.locator('.fra-brow.on').count()
  out.steps.push(['买家全部流入(4)', buyers === 4, `rows=${buyers}`])
  const kpiTop = await page.locator('.fra-kv').first().innerText().catch(()=> '')
  out.steps.push(['KPI count-up 到终值(2,847,392)', kpiTop.replace(/[^0-9]/g,'') === '2847392', `kpi="${kpiTop}"`])
  const pipe = await page.locator('.fra-settle .pipeline').innerText().catch(()=> '')
  out.steps.push(['settle 显真实潜在采购额($)', /\$[\d,]+/.test(pipe) && pipe.replace(/[^0-9]/g,'') === '865900', `pipeline="${pipe}"`])

  // STEP 4: 进入工作台 → enterApp → dashboard
  await page.locator('.fra-enter').click({ force:true })
  await page.waitForTimeout(1200)
  await page.screenshot({ path: join(REVIEW,'h1-t2.png') })
  const fraGone = await page.locator('.fra').count()
  out.steps.push(['进入后 FRA 卸载', fraGone === 0, `count=${fraGone}`])
  const dash = await page.locator('#page-dashboard.dash-cc').count()
  out.steps.push(['工作台已渲染', dash > 0, `count=${dash}`])
  const todos = await page.locator('#page-dashboard .cc-todos .todo-chip').count()
  out.steps.push(['今日待办 chip 在工作台(有事做)', todos > 0, `count=${todos}`])

  out.frames = ['.review/h1-t0.png','.review/h1-t1.png','.review/h1-t2.png']
  out.pass = out.steps.every(s => s[1]) && out.errors.length === 0
} finally { await browser.close(); server.close() }
console.log('\n__GOLDEN__ ' + JSON.stringify(out, null, 2))
process.exit(out.pass ? 0 : 1)
