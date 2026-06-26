<!--
  Page — 情报中心 intel center
  Faithful extract from index (31).html (L1754-1825). NOT yet idiomatic Vue.
  REWRITE: convert onclick="fn(...)" → @click, lift state into <script setup>.
  AI-flavor audit: see REFACTOR-NOTES.md.
-->
<template>
      <div class="page" id="page-intel" style="padding:0;overflow:hidden">
        <div style="display:flex;flex-direction:column;height:100%;overflow:hidden">
          <!-- Filter Bar -->
          <div style="padding:16px 24px 12px;border-bottom:1px solid rgba(19,33,63,.06);flex-shrink:0;background:rgba(19,33,63,.01)">
            <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
              <div style="font-size:13px;font-weight:700;color:var(--t-primary);margin-right:4px">Global purchasing demand</div>
              <div style="font-size:11px;color:var(--t-muted);background:rgba(23,166,115,.08);border:1px solid rgba(23,166,115,.15);padding:2px 10px;border-radius:20px"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#17a673;box-shadow:0 0 6px rgba(23,166,115,.6);animation:pulse 2s infinite;margin-right:5px;vertical-align:middle"></span>Live · 98,241 new today</div>
              <div style="flex:1"></div>
              <!-- Search -->
              <div style="display:flex;align-items:center;gap:6px;background:rgba(19,33,63,.04);border:1px solid rgba(19,33,63,.07);border-radius:8px;padding:5px 12px">
                <svg viewBox="0 0 24 24" style="width:13px;height:13px;stroke:var(--t-muted);fill:none"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input id="intel-search" type="text" placeholder="Search buyers, products, countries…" oninput="renderIntelTable()" style="background:none;border:none;outline:none;font-size:12px;color:var(--t-primary);width:160px" />
              </div>
              <!-- Export -->
              <div onclick="toast('◆','Export data','Generating Excel report, one moment…')" style="font-size:11px;padding:5px 12px;border-radius:8px;background:rgba(19,33,63,.04);border:1px solid rgba(19,33,63,.07);color:var(--t-muted);cursor:pointer">Export</div>
            </div>
            <!-- Filter Pills -->
            <div style="display:flex;align-items:center;gap:8px;margin-top:10px;flex-wrap:wrap">
              <span style="font-size:11px;color:var(--t-muted)">Filter:</span>
              <!-- Region -->
              <select id="intel-filter-region" onchange="renderIntelTable()" style="font-size:11px;background:rgba(19,33,63,.04);border:1px solid rgba(19,33,63,.07);border-radius:7px;padding:4px 8px;color:var(--t-primary);cursor:pointer">
                <option value="">All regions</option>
                <option value="SE Asia">SE Asia</option>
                <option value="N. America">N. America</option>
                <option value="Oceania">Oceania</option>
                <option value="Europe">Europe</option>
                <option value="Middle East">Middle East</option>
              </select>
              <!-- Category -->
              <select id="intel-filter-cat" onchange="renderIntelTable()" style="font-size:11px;background:rgba(19,33,63,.04);border:1px solid rgba(19,33,63,.07);border-radius:7px;padding:4px 8px;color:var(--t-primary);cursor:pointer">
                <option value="">All categories</option>
                <option value="Mooncake">Mooncake</option>
                <option value="Coconut">Coconut</option>
                <option value="Pastry">Pastry</option>
                <option value="Gift">Gift sets</option>
              </select>
              <!-- Status -->
              <select id="intel-filter-status" onchange="renderIntelTable()" style="font-size:11px;background:rgba(19,33,63,.04);border:1px solid rgba(19,33,63,.07);border-radius:7px;padding:4px 8px;color:var(--t-primary);cursor:pointer">
                <option value="">All status</option>
                <option value="new">New</option>
                <option value="hot">Hot</option>
                <option value="locked">Locked</option>
              </select>
              <!-- Sort -->
              <select id="intel-sort" onchange="renderIntelTable()" style="font-size:11px;background:rgba(19,33,63,.04);border:1px solid rgba(19,33,63,.07);border-radius:7px;padding:4px 8px;color:var(--t-primary);cursor:pointer">
                <option value="time">Sort by time</option>
                <option value="score">Sort by match</option>
                <option value="amount">Sort by amount</option>
              </select>
              <div style="margin-left:auto;font-size:11px;color:var(--t-muted)">Showing <span id="intel-count" style="color:#1e5fd0;font-weight:700">0</span>  signals</div>
            </div>
          </div>
          <!-- Table -->
          <div style="flex:1;overflow-y:auto">
            <table style="width:100%;border-collapse:collapse">
              <thead>
                <tr style="background:rgba(19,33,63,.02);position:sticky;top:0;z-index:2">
                  <th style="padding:10px 24px;text-align:left;font-size:11px;font-weight:600;color:var(--t-muted);border-bottom:1px solid rgba(19,33,63,.06);white-space:nowrap">Country / Region</th>
                  <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--t-muted);border-bottom:1px solid rgba(19,33,63,.06)">Buyer</th>
                  <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--t-muted);border-bottom:1px solid rgba(19,33,63,.06)">Demand</th>
                  <th style="padding:10px 16px;text-align:center;font-size:11px;font-weight:600;color:var(--t-muted);border-bottom:1px solid rgba(19,33,63,.06);white-space:nowrap">Match</th>
                  <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--t-muted);border-bottom:1px solid rgba(19,33,63,.06);white-space:nowrap">Connect rate</th>
                  <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--t-muted);border-bottom:1px solid rgba(19,33,63,.06);white-space:nowrap">Lead ID</th>
                  <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--t-muted);border-bottom:1px solid rgba(19,33,63,.06);white-space:nowrap">Logged</th>
                  <th style="padding:10px 16px;text-align:center;font-size:11px;font-weight:600;color:var(--t-muted);border-bottom:1px solid rgba(19,33,63,.06)">Action</th>
                </tr>
              </thead>
              <tbody id="intel-table-body"></tbody>
            </table>
          </div>
        </div>
      </div>
</template>
