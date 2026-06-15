import { createApp } from 'vue'
import './styles/index.css'
import App from './App.vue'

createApp(App).mount('#app')

/* ─────────────────────────────────────────────────────────────────────────
   ⚠ TEMPORARY MIGRATION BRIDGE — delete once handlers become @click.

   The extracted markup still carries the original inline handlers
   (onclick="navTo('leads',1)", onclick="setPf(this)", ...). Vue does NOT
   execute string on* attributes, so this shim re-implements inline-handler
   semantics: `this` = the element, `event` = the click event, and the
   handler body runs in global scope where legacy-app.js defined the
   functions. A MutationObserver re-wires nodes that the legacy innerHTML
   renderers inject at runtime.

   This is throwaway glue. As you rewrite each screen into idiomatic Vue,
   convert its on* attributes to @click / @input and remove its reliance on
   the global functions — the shim then simply finds nothing left to wire.
   ───────────────────────────────────────────────────────────────────────── */
const INLINE_EVENTS = ['click', 'mouseover', 'mouseout', 'input', 'change', 'keydown', 'keyup']

function wire(el) {
  for (const evt of INLINE_EVENTS) {
    const attr = 'on' + evt
    if (!el.hasAttribute || !el.hasAttribute(attr) || el['__wired_' + evt]) continue
    el['__wired_' + evt] = true
    const handlerCode = el.getAttribute(attr)
    el.addEventListener(evt, function (event) {
      // Direct eval: `this` = the element, `event` = the event, and any bare
      // identifier (navTo, setPf, ...) resolves to the global from legacy-app.js.
      try { eval(handlerCode) }
      catch (err) { console.warn('[legacy handler]', handlerCode, err) }
    })
  }
}

function scan(root) {
  if (!root || !root.querySelectorAll) return
  if (root.hasAttribute) wire(root)
  root.querySelectorAll('[onclick],[onmouseover],[onmouseout],[oninput],[onchange],[onkeydown],[onkeyup]').forEach(wire)
}

requestAnimationFrame(() => {
  scan(document.body)
  new MutationObserver(muts => {
    for (const m of muts) m.addedNodes.forEach(scan)
  }).observe(document.body, { childList: true, subtree: true })
})
