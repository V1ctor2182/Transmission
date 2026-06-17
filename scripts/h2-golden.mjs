// H2 golden-path harness — 找客户 ICP flow:
//   下达任务 → 买家带匹配理由到达 → 解锁联系方式(锁→揭示) → 一键建联 → WhatsApp
// 3-frame sequence + chain assertions, zero page errors.
//   node scripts/h2-golden.mjs   → .review/h2-t0 (results+reasons) / t1 (unlocked) / t2 (WhatsApp)
import { createServer } from 'node:http'
import { readFile, mkdir, stat } from 'node:fs/promises'
import { extname, join, resolve } from 'node:path'
import { chromium } from 'playwright'

const PORT = 5314, DIST = resolve('dist'), REVIEW = resolve('.review')
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
  await page.evaluate(`enterApp(); navTo('leads',1)`).catch(()=>{})
  await page.waitForTimeout(500)

  // STEP 1: 下达任务 → 进结果列表(买家带匹配理由)
  await page.evaluate(`submitIcpTask()`).catch(()=>{})
  await page.waitForTimeout(1000)
  await page.evaluate(`showLeadsView('customers')`).catch(()=>{})
  await page.waitForTimeout(600)
  await page.screenshot({ path: join(REVIEW,'h2-t0.png') })
  const rowCount = await page.locator('#icp-cust-list .icp-cust-row').count()
  const whyCount = await page.locator('#icp-cust-list .ic-why').count()
  const tagCount = await page.locator('#icp-cust-list .ic-tag').count()
  out.steps.push(['结果列表有买家行', rowCount > 0, `rows=${rowCount}`])
  out.steps.push(['每个买家带可见匹配理由 .ic-why', whyCount === rowCount && whyCount > 0, `why=${whyCount}/${rowCount}`])
  out.steps.push(['买家带匹配标签 .ic-tag', tagCount >= rowCount, `tags=${tagCount}`])
  const lockedBefore = await page.locator('#icp-cust-list .ic-contact-locked').count()
  out.steps.push(['存在锁定(待解锁)联系方式', lockedBefore > 0, `locked=${lockedBefore}`])

  // STEP 2: 解锁一个 pending 买家(Central Food Hall id=4)→ 锁打开露出邮箱
  const beforeUnlocked = await page.locator('#icp-cust-list .ic-contact-unlocked').count()
  await page.evaluate(`enrichOne(4)`).catch(()=>{})
  await page.waitForTimeout(1900)  // enrich 1.5s + reveal
  await page.screenshot({ path: join(REVIEW,'h2-t1.png') })
  const afterUnlocked = await page.locator('#icp-cust-list .ic-contact-unlocked').count()
  out.steps.push(['解锁后已揭示联系方式 +1', afterUnlocked === beforeUnlocked + 1, `unlocked ${beforeUnlocked}→${afterUnlocked}`])
  const lockedAfter = await page.locator('#icp-cust-list .ic-contact-locked').count()
  out.steps.push(['锁定数 -1', lockedAfter === lockedBefore - 1, `locked ${lockedBefore}→${lockedAfter}`])

  // STEP 3: 从结果一键建联 → WhatsApp 打开该买家对话
  await page.evaluate(`connectFromLead(4)`).catch(()=>{})
  await page.waitForTimeout(900)
  await page.screenshot({ path: join(REVIEW,'h2-t2.png') })
  const waOn = await page.locator('#page-whatsapp.on').count()
  out.steps.push(['WhatsApp 页打开', waOn > 0, `on=${waOn}`])
  const chatName = await page.locator('#wa-chat-name').innerText().catch(()=> '')
  out.steps.push(['聊天头 = Central Food Hall', chatName.includes('Central Food Hall'), `chat="${chatName}"`])
  const chips = await page.locator('#wa-chips').innerText().catch(()=> '')
  out.steps.push(['AI 话术 chips 就绪', chips.trim().length > 0, `len=${chips.length}`])

  out.frames = ['.review/h2-t0.png','.review/h2-t1.png','.review/h2-t2.png']
  out.pass = out.steps.every(s => s[1]) && out.errors.length === 0
} finally { await browser.close(); server.close() }
console.log('\n__H2GOLDEN__ ' + JSON.stringify(out, null, 2))
process.exit(out.pass ? 0 : 1)
