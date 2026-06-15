// Visual-verification harness for the overnight loop.
//   node scripts/verify.mjs <screen> [taskId]
// Serves the built dist/, drives system Chrome (via Playwright channel:'chrome',
// no browser download), navigates to <screen>, writes .review/<screen>.png, and
// runs the machine-checkable assertions registered for [taskId].
// Exit 0 = assertions passed (or none registered). Exit 1 = assertion failure.
// Prints a JSON verdict on the last line for the loop/critic to parse.

import { createServer } from 'node:http'
import { readFile, mkdir, stat } from 'node:fs/promises'
import { extname, join, resolve } from 'node:path'
import { chromium } from 'playwright'

const SCREEN = process.argv[2] || 'login'
const TASK = process.argv[3] || ''
const PORT = 5310
const DIST = resolve('dist')
const REVIEW = resolve('.review')

const MIME = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css',
  '.svg':'image/svg+xml', '.png':'image/png', '.json':'application/json', '.woff2':'font/woff2' }

// screen -> how to make it visible (legacy app uses global fns + id toggling)
const NAV = {
  login:    null,
  dashboard:`enterApp(); navTo('dashboard',0)`,
  leads:    `enterApp(); navTo('leads',1)`,
  marketing:`enterApp(); navTo('marketing',2)`,
  intel:    `enterApp(); navTo('intel',3)`,
  whatsapp: `enterApp(); navTo('whatsapp',4)`,
  pool:     `enterApp(); navTo('pool',5)`,
}

// ── machine-checkable assertions per task (run in the page) ──
const EMOJI = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}\u{FE0F}]/u
const CHECKS = {
  T1: async (page) => {
    const out = []
    const noOrb = await page.locator('.login-orb').count()
    out.push(['no .login-orb', noOrb === 0, `count=${noOrb}`])
    const noCanvas = await page.locator('#reg-particle-canvas').count()
    out.push(['no #reg-particle-canvas', noCanvas === 0, `count=${noCanvas}`])
    const txt = await page.locator('#s-register').innerText().catch(() => '')
    out.push(['no emoji in login text', !EMOJI.test(txt), EMOJI.test(txt) ? 'emoji found' : 'clean'])
    // login button text must be dark (contrast fix on light cyan accent)
    const lum = await page.evaluate(() => {
      const b = document.querySelector('.login-btn'); if (!b) return null
      const c = getComputedStyle(b).color.match(/\d+/g).map(Number)
      return (0.2126*c[0] + 0.7152*c[1] + 0.0722*c[2]) / 255
    })
    out.push(['login-btn ink is dark (lum<0.35)', lum != null && lum < 0.35, `lum=${lum}`])
    return out
  },
}

async function serveDist () {
  try { await stat(join(DIST, 'index.html')) }
  catch { throw new Error('dist/ missing — run `pnpm build` first') }
  const server = createServer(async (req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0])
    if (p === '/' || p.endsWith('/')) p += 'index.html'
    try {
      const buf = await readFile(join(DIST, p))
      res.writeHead(200, { 'content-type': MIME[extname(p)] || 'application/octet-stream' })
      res.end(buf)
    } catch { res.writeHead(404); res.end('nf') }
  })
  await new Promise(r => server.listen(PORT, r))
  return server
}

const server = await serveDist()
await mkdir(REVIEW, { recursive: true })
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const verdict = { screen: SCREEN, task: TASK, shot: `.review/${SCREEN}.png`, assertions: [], pass: true }
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  const errors = []
  page.on('pageerror', e => errors.push(String(e)))
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' })
  if (NAV[SCREEN]) { await page.evaluate(NAV[SCREEN]).catch(() => {}) }
  await page.waitForTimeout(1400) // let fonts + entrance animations settle
  await page.screenshot({ path: join(REVIEW, `${SCREEN}.png`) })
  // Only NEW runtime errors (beyond the known baseline) should fail a task.
  let baseline = []
  try { baseline = JSON.parse(await readFile(join(REVIEW, 'baseline-errors.json'), 'utf8')) } catch {}
  const newErrors = errors.filter(e => !baseline.some(b => e.includes(b) || b.includes(e)))
  verdict.pageErrors = errors
  verdict.newErrors = newErrors
  if (process.env.WRITE_BASELINE) {
    const merged = [...new Set([...baseline, ...errors])]
    await (await import('node:fs/promises')).writeFile(join(REVIEW, 'baseline-errors.json'), JSON.stringify(merged, null, 2))
  }
  const checks = CHECKS[TASK]
  if (checks) {
    const results = await checks(page)
    verdict.assertions = results.map(([name, ok, detail]) => ({ name, ok, detail }))
    verdict.pass = results.every(r => r[1]) && newErrors.length === 0
  } else {
    verdict.pass = newErrors.length === 0
  }
} finally {
  await browser.close()
  server.close()
}
console.log('\n__VERDICT__ ' + JSON.stringify(verdict))
process.exit(verdict.pass ? 0 : 1)
