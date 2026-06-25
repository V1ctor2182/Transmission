<!--
  Page — 找客户 ICP agent / leads
  Faithful extract from index (31).html (L1423-1683). NOT yet idiomatic Vue.
  REWRITE: convert onclick="fn(...)" → @click, lift state into <script setup>.
  AI-flavor audit: see REFACTOR-NOTES.md.
-->
<template>
      <div class="page page-leads-layout" id="page-leads" style="padding:0">

        <!-- Main Content Views (full width, no customer pool sidebar) -->
        <div style="flex:1;display:flex;flex-direction:column;overflow:hidden">

        <!-- VIEW A: Data Source + Task Config (default) -->
        <div id="leads-view-datasource" style="flex:1;overflow-y:auto;padding:24px 28px;display:flex;flex-direction:column;gap:20px">

          <!-- Header -->
          <div style="display:flex;align-items:flex-start;justify-content:space-between">
            <div>
              <div style="font-size:20px;font-weight:700;color:var(--t-primary);letter-spacing:-.3px">AI auto lead-gen</div>
              <div style="font-size:13px;color:var(--t-muted);margin-top:4px">Connected: <strong style="color:#1e5fd0">28</strong> global data sources · AI searches and matches buyers daily</div>
            </div>
            <div style="display:flex;gap:10px;align-items:center">
              <div class="icp-task-btn secondary" style="display:flex;align-items:center;gap:6px" onclick="showLeadsView('tasks')">View tasks <span style="background:#1f8fd6;color:#fff;font-size:9px;padding:1px 5px;border-radius:8px;font-weight:700">1</span></div>
              <div class="icp-task-btn primary" onclick="submitIcpTask()">Launch task</div>
            </div>
          </div>

          <!-- Data Sources Full Display -->
          <div style="background:var(--card);border:1px solid var(--card-border);border-radius:var(--radius);padding:24px">
            <div style="font-size:13px;font-weight:600;color:var(--t-primary);margin-bottom:18px;display:flex;align-items:center;gap:8px">
              <span style="width:8px;height:8px;border-radius:50%;background:#17a673;display:inline-block;box-shadow:0 0 6px #17a673"></span>
              28 global data sources connected
              <span style="font-size:11px;color:var(--t-muted);font-weight:400;margin-left:4px">Live · auto-updated daily</span>
            </div>
            <div class="icp-ds-grid">
              <div>
                <div class="icp-ds-col-title">Data search</div>
                <div class="icp-ds-item"><span class="icp-ds-logo g">G</span>Google · Advanced search</div>
                <div class="icp-ds-item"><span class="icp-ds-logo g">G</span>Google Map · Map search</div>
                <div class="icp-ds-item"><span class="icp-ds-logo y">Y</span>Yahoo · Search engine</div>
                <div class="icp-ds-item"><span class="icp-ds-logo li">in</span>LinkedIn · Social data</div>
                <div class="icp-ds-item"><span class="icp-ds-logo hg">Cu</span>Customs · Trade records</div>
                <div class="icp-ds-item"><span class="icp-ds-logo sl">SL</span>Store Leads · E-com sellers</div>
                <div class="icp-ds-item"><span class="icp-ds-logo oc">Oc</span>Ocean.io · Trade records</div>
                <div class="icp-ds-item"><span class="icp-ds-logo ow">Ow</span>Owler · Competitor search</div>
                <div class="icp-ds-item"><span class="icp-ds-logo pl">PL</span>Predictleads · Buyer search</div>
              </div>
              <div>
                <div class="icp-ds-col-title">Company enrich</div>
                <div class="icp-ds-item"><span class="icp-ds-logo rr">RR</span>Rocket Reach · Company info</div>
                <div class="icp-ds-item"><span class="icp-ds-logo ha">H</span>Harmonic.ai · Company info</div>
                <div class="icp-ds-item"><span class="icp-ds-logo ap">A</span>Apollo · Company info</div>
                <div class="icp-ds-item"><span class="icp-ds-logo lm">LM</span>LeadMagic · Company info</div>
                <div class="icp-ds-item"><span class="icp-ds-logo dg">Dg</span>Datagma · Company info</div>
                <div class="icp-ds-item"><span class="icp-ds-logo cb">Cb</span>Clearbit · Company info</div>
                <div class="icp-ds-item"><span class="icp-ds-logo gd">Gd</span>Glassdoor · Company info</div>
                <div class="icp-ds-item"><span class="icp-ds-logo ow">Ow</span>Owler · Company info</div>
                <div class="icp-ds-item"><span class="icp-ds-logo wa">WA</span>Site analysis · Site info</div>
              </div>
              <div>
                <div class="icp-ds-col-title">Contact lookup</div>
                <div class="icp-ds-item"><span class="icp-ds-logo hu">Hu</span>Hunter · Find contacts</div>
                <div class="icp-ds-item"><span class="icp-ds-logo hu">Hu</span>Hunter · Email verify</div>
                <div class="icp-ds-item"><span class="icp-ds-logo ap">A</span>Apollo · Find contacts</div>
                <div class="icp-ds-item"><span class="icp-ds-logo ps">Ps</span>Prospeo · Work email</div>
                <div class="icp-ds-item"><span class="icp-ds-logo cb">Cb</span>Clearbit · Find contacts</div>
                <div class="icp-ds-item"><span class="icp-ds-logo pd">PD</span>People Data Labs</div>
                <div class="icp-ds-item"><span class="icp-ds-logo co">CO</span>ContactOut · Phone</div>
                <div class="icp-ds-item"><span class="icp-ds-logo dg">Dg</span>Datagma · Contact info</div>
                <div class="icp-ds-item"><span class="icp-ds-logo lm">LM</span>LeadMagic · Work email</div>
              </div>
            </div>
          </div>

          <!-- Task Config -->
          <div style="background:var(--card);border:1px solid var(--card-border);border-radius:var(--radius);padding:20px 24px">
            <div style="font-size:13px;font-weight:600;color:var(--t-primary);margin-bottom:16px">Configure search task</div>
            <div class="icp-task-form" style="margin:0">
              <div class="icp-form-row" style="align-items:flex-start">
                <div class="icp-form-label" style="padding-top:8px">Target regions</div>
                <div style="flex:1">
                  <!-- 已选国家 Tags -->
                  <div id="region-selected-tags" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px">
                    <div class="rg-tag" data-country="Singapore" data-flag="🇸🇬"><span class="rg-cc">SG</span>Singapore <span onclick="removeRgTag(this.parentElement)" style="margin-left:4px;cursor:pointer;opacity:.6;font-size:10px">×</span></div>
                    <div class="rg-tag" data-country="Malaysia" data-flag="🇲🇾"><span class="rg-cc">MY</span>Malaysia <span onclick="removeRgTag(this.parentElement)" style="margin-left:4px;cursor:pointer;opacity:.6;font-size:10px">×</span></div>
                    <div class="rg-tag" data-country="Australia" data-flag="🇦🇺"><span class="rg-cc">AU</span>Australia <span onclick="removeRgTag(this.parentElement)" style="margin-left:4px;cursor:pointer;opacity:.6;font-size:10px">×</span></div>
                    <div class="rg-tag" data-country="Canada" data-flag="🇨🇦"><span class="rg-cc">CA</span>Canada <span onclick="removeRgTag(this.parentElement)" style="margin-left:4px;cursor:pointer;opacity:.6;font-size:10px">×</span></div>
                  </div>
                  <!-- 搜索框 + 添加按鈕 -->
                  <div style="position:relative;display:flex;align-items:center;gap:8px">
                    <div style="position:relative;flex:1">
                      <svg viewBox="0 0 24 24" style="position:absolute;left:10px;top:50%;transform:translateY(-50%);width:13px;height:13px;stroke:var(--t-muted);fill:none"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                      <input id="rg-search-input" type="text" placeholder="Search to add a country, e.g. Japan, UK…" oninput="filterRgDropdown()" onfocus="showRgDropdown()" style="width:100%;padding:7px 12px 7px 30px;background:rgba(19,33,63,.04);border:1px solid rgba(19,33,63,.1);border-radius:8px;font-size:12px;color:var(--t-primary);outline:none" />
                      <!-- 下拉面板 -->
                      <div id="rg-dropdown" style="display:none;position:absolute;top:calc(100% + 4px);left:0;right:0;background:#e9f0f9;border:1px solid rgba(19,33,63,.1);border-radius:10px;z-index:100;max-height:320px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.5)">
                        <!-- 洲选择导航 -->
                        <div id="rg-continent-nav" style="display:flex;gap:0;border-bottom:1px solid rgba(19,33,63,.06);overflow-x:auto">
                          <div class="rg-cont-tab active" data-cont="all" onclick="selectContinent(this)">All</div>
                          <div class="rg-cont-tab" data-cont="sea" onclick="selectContinent(this)">SE Asia</div>
                          <div class="rg-cont-tab" data-cont="na" onclick="selectContinent(this)">N. America</div>
                          <div class="rg-cont-tab" data-cont="eu" onclick="selectContinent(this)">Europe</div>
                          <div class="rg-cont-tab" data-cont="oc" onclick="selectContinent(this)">Oceania</div>
                          <div class="rg-cont-tab" data-cont="me" onclick="selectContinent(this)">Middle East</div>
                          <div class="rg-cont-tab" data-cont="ea" onclick="selectContinent(this)">E. Asia</div>
                          <div class="rg-cont-tab" data-cont="sa" onclick="selectContinent(this)">S. America</div>
                          <div class="rg-cont-tab" data-cont="af" onclick="selectContinent(this)">Africa</div>
                        </div>
                        <!-- 国家列表 -->
                        <div id="rg-country-list" style="overflow-y:auto;max-height:240px;padding:6px"></div>
                      </div>
                    </div>
                    <div onclick="clearAllRgTags()" style="font-size:11px;padding:6px 12px;border-radius:8px;background:rgba(229,72,77,.08);border:1px solid rgba(229,72,77,.2);color:#e5484d;cursor:pointer;white-space:nowrap;flex-shrink:0">Clear</div>
                  </div>
                  <div style="font-size:10px;color:var(--t-muted);margin-top:6px">Selected <span id="rg-count" style="color:#1e5fd0;font-weight:700">4</span> countries/regions</div>
                </div>
              </div>
              <div class="icp-form-row">
                <div class="icp-form-label">Daily search</div>
                <div class="icp-num-input"><input type="number" id="icp-daily" value="50" min="10" max="500"><span>/ day</span></div>
                <div class="icp-form-label" style="margin-left:24px">Duration</div>
                <div class="icp-num-input"><input type="number" id="icp-days" value="30" min="1" max="90"><span>days</span></div>
                <div class="icp-form-label" style="margin-left:24px">Auto-find contacts</div>
                <div class="icp-toggle-wrap">
                  <div class="icp-toggle on" id="icp-auto-toggle" onclick="toggleAutoUnlock(this)"><div class="icp-toggle-knob"></div></div>
                  <span class="icp-toggle-label" id="icp-toggle-label">On</span>
                </div>
              </div>
              <!-- Describe target任务 -->
              <div class="icp-form-row" style="align-items:flex-start">
                <div class="icp-form-label" style="padding-top:10px">Describe target
                  <div style="font-size:9px;font-weight:400;color:var(--t-muted);margin-top:2px">optional</div>
                </div>
                <div style="flex:1;position:relative">
                  <textarea id="icp-task-desc" rows="3" placeholder="Describe your target in plain words, e.g. find 30 dessert-company CEOs in California, USA" style="width:100%;padding:10px 14px;background:rgba(19,33,63,.04);border:1px solid rgba(19,33,63,.08);border-radius:10px;font-size:12px;color:var(--t-primary);outline:none;resize:vertical;min-height:72px;line-height:1.6;font-family:inherit;transition:.2s" onfocus="this.style.borderColor='rgba(31,143,214,.5)'" onblur="this.style.borderColor='rgba(19,33,63,.08)'" oninput="updateIcpDescCount(this)"></textarea>
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-top:5px">
                    <div style="font-size:10px;color:var(--t-muted)">AI tunes search strategy and keywords from your description</div>
                    <div style="font-size:10px;color:var(--t-muted)"><span id="icp-desc-count">0</span> / 200</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div><!-- end view-datasource -->

        <!-- VIEW B: Task Execution Detail -->
        <div id="leads-view-tasks" style="flex:1;overflow-y:auto;padding:28px 32px;display:none;flex-direction:column;gap:20px">

          <!-- Header -->
          <div style="display:flex;align-items:center;justify-content:space-between">
            <div style="display:flex;align-items:center;gap:10px">
              <div onclick="showLeadsView('datasource')" style="cursor:pointer;color:var(--t-muted);font-size:13px;display:flex;align-items:center;gap:4px">← Back</div>
              <div style="font-size:18px;font-weight:700;color:var(--t-primary)">Active tasks</div>
            </div>
            <div class="icp-task-btn primary" onclick="submitIcpTask()">+ New task</div>
          </div>

          <!-- Active Task Card with glow ring -->
          <div id="active-task-card" style="background:var(--card);border:1px solid rgba(31,143,214,.3);border-radius:var(--radius);padding:24px;position:relative;overflow:hidden">
            <!-- Animated glow ring -->
            <div style="position:absolute;top:-40px;right:-40px;width:160px;height:160px;border-radius:50%;background:radial-gradient(circle,rgba(31,143,214,.18) 0%,transparent 70%);animation:pulseGlow 3s ease-in-out infinite"></div>
            <div style="position:absolute;top:-20px;right:-20px;width:100px;height:100px;border-radius:50%;border:1.5px solid rgba(31,143,214,.25);animation:ringExpand 3s ease-in-out infinite"></div>
            <div style="position:absolute;top:0;right:0;width:140px;height:140px;border-radius:50%;border:1px solid rgba(30,95,200,.12);animation:ringExpand 3s ease-in-out infinite .8s"></div>

            <div style="display:flex;align-items:flex-start;gap:16px;position:relative;z-index:1">
              <div style="width:44px;height:44px;border-radius:12px;background:var(--card);border:1px solid var(--card-border);display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:var(--brand);fill:none;stroke-width:1.8"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></div>
              <div style="flex:1">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
                  <div style="font-size:15px;font-weight:700;color:var(--t-primary)">Daily auto lead-gen · SE Asia + N. America + Oceania</div>
                  <div style="font-size:10px;font-weight:700;color:#17a673;background:rgba(23,166,115,.12);padding:2px 8px;border-radius:10px;border:1px solid rgba(23,166,115,.2)">♻️ Running</div>
                </div>
                <div style="font-size:12px;color:var(--t-muted);margin-bottom:12px">All connected sources · 50/day · 14 of 30 days · auto-find contacts on</div>
                <div style="display:flex;gap:24px">
                  <div style="text-align:center">
                    <div style="font-size:22px;font-weight:800;color:#1e5fd0" id="task-found-count">0</div>
                    <div style="font-size:10px;color:var(--t-muted)">Buyers found</div>
                  </div>
                  <div style="text-align:center">
                    <div style="font-size:22px;font-weight:800;color:#17a673">487</div>
                    <div style="font-size:10px;color:var(--t-muted)">Contacts found</div>
                  </div>
                  <div style="text-align:center">
                    <div style="font-size:22px;font-weight:800;color:#c8860a">23</div>
                    <div style="font-size:10px;color:var(--t-muted)">In marketing queue</div>
                  </div>
                  <div style="text-align:center">
                    <div style="font-size:22px;font-weight:800;color:#1f8fd6">16</div>
                    <div style="font-size:10px;color:var(--t-muted)">Days left</div>
                  </div>
                </div>
              </div>
              <div style="display:flex;gap:8px;flex-shrink:0">
                <div class="icp-task-btn secondary" onclick="showLeadsView('customers')">👥 View buyers</div>
                <div class="icp-task-btn" style="background:rgba(229,72,77,.1);border-color:rgba(229,72,77,.3);color:#e5484d" onclick="toast('◆','Task paused','Restart it from the task list')">⏸ Pause</div>
              </div>
            </div>

            <!-- Progress bar -->
            <div style="margin-top:16px;position:relative;z-index:1">
              <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--t-muted);margin-bottom:6px">
                <span>Task progress</span><span>14 / 30 days (47%)</span>
              </div>
              <div style="height:4px;background:rgba(19,33,63,.06);border-radius:2px;overflow:hidden">
                <div style="width:47%;height:100%;background:linear-gradient(90deg,#1f8fd6,#1e5fd0);border-radius:2px"></div>
              </div>
            </div>
          </div>

          <!-- Real-time incoming customers -->
          <div style="background:var(--card);border:1px solid var(--card-border);border-radius:var(--radius);padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
              <div style="display:flex;align-items:center;gap:8px">
                <span style="width:7px;height:7px;border-radius:50%;background:#17a673;display:inline-block;animation:pulse 2s infinite"></span>
                <span style="font-size:13px;font-weight:600;color:var(--t-primary)">Live incoming buyers</span>
                <span style="font-size:11px;color:var(--t-muted)">AI searches and pushes every minute</span>
              </div>
              <div class="icp-task-btn secondary" onclick="showLeadsView('customers')">View all →</div>
            </div>
            <div id="task-live-feed" style="display:flex;flex-direction:column;gap:8px"></div>
          </div>

        </div><!-- end view-tasks -->

        <!-- VIEW C: Customer List -->
        <div id="leads-view-customers" style="flex:1;overflow-y:auto;padding:20px 24px;display:none;flex-direction:column;gap:16px">

          <!-- Header -->
          <div style="display:flex;align-items:center;justify-content:space-between">
            <div style="display:flex;align-items:center;gap:10px">
              <div onclick="showLeadsView('tasks')" style="cursor:pointer;color:var(--t-muted);font-size:13px">← Back to tasks</div>
              <div style="font-size:18px;font-weight:700;color:var(--t-primary)">Buyers pushed <span style="font-size:13px;font-weight:400;color:#1e5fd0">2,847</span></div>
            </div>
            <div style="display:flex;gap:8px">
              <div class="icp-task-btn secondary" onclick="enrichSelected()">Find contacts</div>
              <div class="icp-task-btn auto" onclick="pushSelectedToEdm()">📣 Market for me</div>
              <div class="icp-task-btn primary" onclick="autoExecute()">🤖 AI autopilot</div>
            </div>
          </div>

          <!-- Filters -->
          <div style="display:flex;gap:8px">
            <div class="icp-cf on" onclick="setCf(this,'all')">All</div>
            <div class="icp-cf" onclick="setCf(this,'pending')">Need contacts</div>
            <div class="icp-cf" onclick="setCf(this,'enriched')">Contacts found</div>
            <div class="icp-cf" onclick="setCf(this,'edm')">Marketed</div>
          </div>

          <!-- Customer Table -->
          <div class="icp-cust-table">
            <div class="icp-cust-thead">
              <div class="icp-th check"><input type="checkbox" id="cust-select-all" onchange="toggleAllCust(this)"></div>
              <div class="icp-th">Company / Country</div>
              <div class="icp-th">Profile</div>
              <div class="icp-th">Source</div>
              <div class="icp-th">Match</div>
              <div class="icp-th">Contact</div>
              <div class="icp-th">Action</div>
            </div>
            <div id="icp-cust-list"></div>
          </div>

        </div><!-- end view-customers -->

        </div><!-- end right main content -->

      </div><!-- end page-leads -->

      <!-- WHATSAPP PAGE -->
</template>
