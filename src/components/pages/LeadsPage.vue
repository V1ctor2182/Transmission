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
              <div style="font-size:20px;font-weight:700;color:#e2e8f0;letter-spacing:-.3px">AI 自动找客户</div>
              <div style="font-size:13px;color:var(--t-muted);margin-top:4px">已接入 <strong style="color:#5ee6d9">28</strong> 个全球数据源，AI 每日自动搜索并匹配潜在买家</div>
            </div>
            <div style="display:flex;gap:10px;align-items:center">
              <div class="icp-task-btn secondary" style="display:flex;align-items:center;gap:6px" onclick="showLeadsView('tasks')">📋 查看任务 <span style="background:#2dd6c6;color:#fff;font-size:9px;padding:1px 5px;border-radius:8px;font-weight:700">1</span></div>
              <div class="icp-task-btn primary" onclick="submitIcpTask()">⚡ 下达任务</div>
            </div>
          </div>

          <!-- Data Sources Full Display -->
          <div style="background:var(--card);border:1px solid var(--card-border);border-radius:var(--radius);padding:24px">
            <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:18px;display:flex;align-items:center;gap:8px">
              <span style="width:8px;height:8px;border-radius:50%;background:#34d399;display:inline-block;box-shadow:0 0 6px #34d399"></span>
              已连接 28 个全球数据源
              <span style="font-size:11px;color:var(--t-muted);font-weight:400;margin-left:4px">实时在线，每日自动更新</span>
            </div>
            <div class="icp-ds-grid">
              <div>
                <div class="icp-ds-col-title">🔍 数据搜索</div>
                <div class="icp-ds-item"><span class="icp-ds-logo g">G</span>Google · 高级搜索</div>
                <div class="icp-ds-item"><span class="icp-ds-logo g">G</span>Google Map · 地图搜索</div>
                <div class="icp-ds-item"><span class="icp-ds-logo y">Y</span>雅虎 · 搜索引擎</div>
                <div class="icp-ds-item"><span class="icp-ds-logo li">in</span>领英 · 社媒数据搜索</div>
                <div class="icp-ds-item"><span class="icp-ds-logo hg">海</span>海关 · 交易记录搜索</div>
                <div class="icp-ds-item"><span class="icp-ds-logo sl">SL</span>Store Leads · 电商卖家</div>
                <div class="icp-ds-item"><span class="icp-ds-logo oc">Oc</span>Ocean.io · 交易记录</div>
                <div class="icp-ds-item"><span class="icp-ds-logo ow">Ow</span>Owler · 竞对手搜索</div>
                <div class="icp-ds-item"><span class="icp-ds-logo pl">PL</span>Predictleads · 客户搜索</div>
              </div>
              <div>
                <div class="icp-ds-col-title">🏢 补全公司</div>
                <div class="icp-ds-item"><span class="icp-ds-logo rr">RR</span>Rocket Reach · 公司信息</div>
                <div class="icp-ds-item"><span class="icp-ds-logo ha">H</span>Harmonic.ai · 公司信息</div>
                <div class="icp-ds-item"><span class="icp-ds-logo ap">A</span>Apollo · 公司信息</div>
                <div class="icp-ds-item"><span class="icp-ds-logo lm">LM</span>LeadMagic · 公司信息</div>
                <div class="icp-ds-item"><span class="icp-ds-logo dg">Dg</span>Datagma · 公司信息</div>
                <div class="icp-ds-item"><span class="icp-ds-logo cb">Cb</span>Clearbit · 公司信息</div>
                <div class="icp-ds-item"><span class="icp-ds-logo gd">Gd</span>Glassdoor · 公司信息</div>
                <div class="icp-ds-item"><span class="icp-ds-logo ow">Ow</span>Owler · 公司信息</div>
                <div class="icp-ds-item"><span class="icp-ds-logo wa">WA</span>官网分析 · 官网信息</div>
              </div>
              <div>
                <div class="icp-ds-col-title">📞 联系人获取</div>
                <div class="icp-ds-item"><span class="icp-ds-logo hu">Hu</span>Hunter · 查找联系人</div>
                <div class="icp-ds-item"><span class="icp-ds-logo hu">Hu</span>Hunter · 邮筱验证</div>
                <div class="icp-ds-item"><span class="icp-ds-logo ap">A</span>Apollo · 查找联系人</div>
                <div class="icp-ds-item"><span class="icp-ds-logo ps">Ps</span>Prospeo · 工作邮筱</div>
                <div class="icp-ds-item"><span class="icp-ds-logo cb">Cb</span>Clearbit · 查找联系人</div>
                <div class="icp-ds-item"><span class="icp-ds-logo pd">PD</span>People Data Labs</div>
                <div class="icp-ds-item"><span class="icp-ds-logo co">CO</span>ContactOut · 电话</div>
                <div class="icp-ds-item"><span class="icp-ds-logo dg">Dg</span>Datagma · 联系人信息</div>
                <div class="icp-ds-item"><span class="icp-ds-logo lm">LM</span>LeadMagic · 工作邮筱</div>
              </div>
            </div>
          </div>

          <!-- Task Config -->
          <div style="background:var(--card);border:1px solid var(--card-border);border-radius:var(--radius);padding:20px 24px">
            <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:16px">配置搜索任务</div>
            <div class="icp-task-form" style="margin:0">
              <div class="icp-form-row" style="align-items:flex-start">
                <div class="icp-form-label" style="padding-top:8px">拓展地区</div>
                <div style="flex:1">
                  <!-- 已选国家 Tags -->
                  <div id="region-selected-tags" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px">
                    <div class="rg-tag" data-country="新加坡" data-flag="🇸🇬">🇸🇬 新加坡 <span onclick="removeRgTag(this.parentElement)" style="margin-left:4px;cursor:pointer;opacity:.6;font-size:10px">×</span></div>
                    <div class="rg-tag" data-country="马来西亚" data-flag="🇲🇾">🇲🇾 马来西亚 <span onclick="removeRgTag(this.parentElement)" style="margin-left:4px;cursor:pointer;opacity:.6;font-size:10px">×</span></div>
                    <div class="rg-tag" data-country="澳大利亚" data-flag="🇦🇺">🇦🇺 澳大利亚 <span onclick="removeRgTag(this.parentElement)" style="margin-left:4px;cursor:pointer;opacity:.6;font-size:10px">×</span></div>
                    <div class="rg-tag" data-country="加拿大" data-flag="🇨🇦">🇨🇦 加拿大 <span onclick="removeRgTag(this.parentElement)" style="margin-left:4px;cursor:pointer;opacity:.6;font-size:10px">×</span></div>
                  </div>
                  <!-- 搜索框 + 添加按鈕 -->
                  <div style="position:relative;display:flex;align-items:center;gap:8px">
                    <div style="position:relative;flex:1">
                      <svg viewBox="0 0 24 24" style="position:absolute;left:10px;top:50%;transform:translateY(-50%);width:13px;height:13px;stroke:var(--t-muted);fill:none"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                      <input id="rg-search-input" type="text" placeholder="搜索添加国家，如 日本、英国…" oninput="filterRgDropdown()" onfocus="showRgDropdown()" style="width:100%;padding:7px 12px 7px 30px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:8px;font-size:12px;color:#e2e8f0;outline:none" />
                      <!-- 下拉面板 -->
                      <div id="rg-dropdown" style="display:none;position:absolute;top:calc(100% + 4px);left:0;right:0;background:#121a28;border:1px solid rgba(255,255,255,.1);border-radius:10px;z-index:100;max-height:320px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.5)">
                        <!-- 洲选择导航 -->
                        <div id="rg-continent-nav" style="display:flex;gap:0;border-bottom:1px solid rgba(255,255,255,.06);overflow-x:auto">
                          <div class="rg-cont-tab active" data-cont="all" onclick="selectContinent(this)">全部</div>
                          <div class="rg-cont-tab" data-cont="sea" onclick="selectContinent(this)">🌏 东南亚</div>
                          <div class="rg-cont-tab" data-cont="na" onclick="selectContinent(this)">🇺🇸 北美</div>
                          <div class="rg-cont-tab" data-cont="eu" onclick="selectContinent(this)">🇪🇺 欧洲</div>
                          <div class="rg-cont-tab" data-cont="oc" onclick="selectContinent(this)">🇦🇺 大洋洲</div>
                          <div class="rg-cont-tab" data-cont="me" onclick="selectContinent(this)">🇦🇪 中东</div>
                          <div class="rg-cont-tab" data-cont="ea" onclick="selectContinent(this)">🇯🇵 东亚</div>
                          <div class="rg-cont-tab" data-cont="sa" onclick="selectContinent(this)">🇧🇷 南美</div>
                          <div class="rg-cont-tab" data-cont="af" onclick="selectContinent(this)">🇳🇬 非洲</div>
                        </div>
                        <!-- 国家列表 -->
                        <div id="rg-country-list" style="overflow-y:auto;max-height:240px;padding:6px"></div>
                      </div>
                    </div>
                    <div onclick="clearAllRgTags()" style="font-size:11px;padding:6px 12px;border-radius:8px;background:rgba(248,113,113,.08);border:1px solid rgba(248,113,113,.2);color:#f87171;cursor:pointer;white-space:nowrap;flex-shrink:0">清空</div>
                  </div>
                  <div style="font-size:10px;color:var(--t-muted);margin-top:6px">已选 <span id="rg-count" style="color:#5ee6d9;font-weight:700">4</span> 个国家/地区</div>
                </div>
              </div>
              <div class="icp-form-row">
                <div class="icp-form-label">每日搜索</div>
                <div class="icp-num-input"><input type="number" id="icp-daily" value="50" min="10" max="500"><span>个 / 天</span></div>
                <div class="icp-form-label" style="margin-left:24px">持续天数</div>
                <div class="icp-num-input"><input type="number" id="icp-days" value="30" min="1" max="90"><span>天</span></div>
                <div class="icp-form-label" style="margin-left:24px">自动寻找联系人</div>
                <div class="icp-toggle-wrap">
                  <div class="icp-toggle on" id="icp-auto-toggle" onclick="toggleAutoUnlock(this)"><div class="icp-toggle-knob"></div></div>
                  <span class="icp-toggle-label" id="icp-toggle-label">已开启</span>
                </div>
              </div>
              <!-- 描述获客任务 -->
              <div class="icp-form-row" style="align-items:flex-start">
                <div class="icp-form-label" style="padding-top:10px">描述获客
                  <div style="font-size:9px;font-weight:400;color:var(--t-muted);margin-top:2px">optional</div>
                </div>
                <div style="flex:1;position:relative">
                  <textarea id="icp-task-desc" rows="3" placeholder="用自然语言描述你的获客目标，如：我想找 30 家美国加州的甜品公司 CEO" style="width:100%;padding:10px 14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:10px;font-size:12px;color:#e2e8f0;outline:none;resize:vertical;min-height:72px;line-height:1.6;font-family:inherit;transition:.2s" onfocus="this.style.borderColor='rgba(45,214,198,.5)'" onblur="this.style.borderColor='rgba(255,255,255,.08)'" oninput="updateIcpDescCount(this)"></textarea>
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-top:5px">
                    <div style="font-size:10px;color:var(--t-muted)">AI 将根据描述自动优化搜索策略和关键词</div>
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
              <div onclick="showLeadsView('datasource')" style="cursor:pointer;color:var(--t-muted);font-size:13px;display:flex;align-items:center;gap:4px">← 返回</div>
              <div style="font-size:18px;font-weight:700;color:#e2e8f0">执行中的任务</div>
            </div>
            <div class="icp-task-btn primary" onclick="submitIcpTask()">+ 新建任务</div>
          </div>

          <!-- Active Task Card with glow ring -->
          <div id="active-task-card" style="background:var(--card);border:1px solid rgba(45,214,198,.3);border-radius:var(--radius);padding:24px;position:relative;overflow:hidden">
            <!-- Animated glow ring -->
            <div style="position:absolute;top:-40px;right:-40px;width:160px;height:160px;border-radius:50%;background:radial-gradient(circle,rgba(45,214,198,.18) 0%,transparent 70%);animation:pulseGlow 3s ease-in-out infinite"></div>
            <div style="position:absolute;top:-20px;right:-20px;width:100px;height:100px;border-radius:50%;border:1.5px solid rgba(45,214,198,.25);animation:ringExpand 3s ease-in-out infinite"></div>
            <div style="position:absolute;top:0;right:0;width:140px;height:140px;border-radius:50%;border:1px solid rgba(94,230,217,.12);animation:ringExpand 3s ease-in-out infinite .8s"></div>

            <div style="display:flex;align-items:flex-start;gap:16px;position:relative;z-index:1">
              <div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#2dd6c6,#5ee6d9);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;box-shadow:0 0 20px rgba(45,214,198,.4)">🔍</div>
              <div style="flex:1">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
                  <div style="font-size:15px;font-weight:700;color:#e2e8f0">每天自动找客户 · 东南亚 + 北美 + 澳洲</div>
                  <div style="font-size:10px;font-weight:700;color:#34d399;background:rgba(52,211,153,.12);padding:2px 8px;border-radius:10px;border:1px solid rgba(52,211,153,.2)">♻️ 执行中</div>
                </div>
                <div style="font-size:12px;color:var(--t-muted);margin-bottom:12px">所有已接入数据源 · 50 个/天 · 已执行 14 天 / 30 天 · 自动寻找联系人已开启</div>
                <div style="display:flex;gap:24px">
                  <div style="text-align:center">
                    <div style="font-size:22px;font-weight:800;color:#5ee6d9" id="task-found-count">0</div>
                    <div style="font-size:10px;color:var(--t-muted)">已找到客户</div>
                  </div>
                  <div style="text-align:center">
                    <div style="font-size:22px;font-weight:800;color:#34d399">487</div>
                    <div style="font-size:10px;color:var(--t-muted)">已找到联系人</div>
                  </div>
                  <div style="text-align:center">
                    <div style="font-size:22px;font-weight:800;color:#fbbf24">23</div>
                    <div style="font-size:10px;color:var(--t-muted)">已进入营销队列</div>
                  </div>
                  <div style="text-align:center">
                    <div style="font-size:22px;font-weight:800;color:#22d3ee">16</div>
                    <div style="font-size:10px;color:var(--t-muted)">剩余天数</div>
                  </div>
                </div>
              </div>
              <div style="display:flex;gap:8px;flex-shrink:0">
                <div class="icp-task-btn secondary" onclick="showLeadsView('customers')">👥 查看客户</div>
                <div class="icp-task-btn" style="background:rgba(248,113,113,.1);border-color:rgba(248,113,113,.3);color:#f87171" onclick="toast('⏸️','任务已暂停','可在任务列表重新启动')">⏸ 暂停</div>
              </div>
            </div>

            <!-- Progress bar -->
            <div style="margin-top:16px;position:relative;z-index:1">
              <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--t-muted);margin-bottom:6px">
                <span>任务进度</span><span>14 / 30 天 (47%)</span>
              </div>
              <div style="height:4px;background:rgba(255,255,255,.06);border-radius:2px;overflow:hidden">
                <div style="width:47%;height:100%;background:linear-gradient(90deg,#2dd6c6,#5ee6d9);border-radius:2px"></div>
              </div>
            </div>
          </div>

          <!-- Real-time incoming customers -->
          <div style="background:var(--card);border:1px solid var(--card-border);border-radius:var(--radius);padding:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
              <div style="display:flex;align-items:center;gap:8px">
                <span style="width:7px;height:7px;border-radius:50%;background:#34d399;display:inline-block;animation:pulse 2s infinite"></span>
                <span style="font-size:13px;font-weight:600;color:#e2e8f0">实时推送的客户</span>
                <span style="font-size:11px;color:var(--t-muted)">AI 每分钟自动搜索并推送</span>
              </div>
              <div class="icp-task-btn secondary" onclick="showLeadsView('customers')">查看全部 →</div>
            </div>
            <div id="task-live-feed" style="display:flex;flex-direction:column;gap:8px"></div>
          </div>

        </div><!-- end view-tasks -->

        <!-- VIEW C: Customer List -->
        <div id="leads-view-customers" style="flex:1;overflow-y:auto;padding:20px 24px;display:none;flex-direction:column;gap:16px">

          <!-- Header -->
          <div style="display:flex;align-items:center;justify-content:space-between">
            <div style="display:flex;align-items:center;gap:10px">
              <div onclick="showLeadsView('tasks')" style="cursor:pointer;color:var(--t-muted);font-size:13px">← 返回任务</div>
              <div style="font-size:18px;font-weight:700;color:#e2e8f0">已推送客户 <span style="font-size:13px;font-weight:400;color:#5ee6d9">2,847</span></div>
            </div>
            <div style="display:flex;gap:8px">
              <div class="icp-task-btn secondary" onclick="enrichSelected()">🔍 寻找联系人</div>
              <div class="icp-task-btn auto" onclick="pushSelectedToEdm()">📣 帮我营销</div>
              <div class="icp-task-btn primary" onclick="autoExecute()">🤖 AI 全自动</div>
            </div>
          </div>

          <!-- Filters -->
          <div style="display:flex;gap:8px">
            <div class="icp-cf on" onclick="setCf(this,'all')">全部</div>
            <div class="icp-cf" onclick="setCf(this,'pending')">待找联系人</div>
            <div class="icp-cf" onclick="setCf(this,'enriched')">已找到联系人</div>
            <div class="icp-cf" onclick="setCf(this,'edm')">已营销</div>
          </div>

          <!-- Customer Table -->
          <div class="icp-cust-table">
            <div class="icp-cust-thead">
              <div class="icp-th check"><input type="checkbox" id="cust-select-all" onchange="toggleAllCust(this)"></div>
              <div class="icp-th">公司 / 国家</div>
              <div class="icp-th">公司简介</div>
              <div class="icp-th">数据来源</div>
              <div class="icp-th">匹配度</div>
              <div class="icp-th">联系方式</div>
              <div class="icp-th">操作</div>
            </div>
            <div id="icp-cust-list"></div>
          </div>

        </div><!-- end view-customers -->

        </div><!-- end right main content -->

      </div><!-- end page-leads -->

      <!-- WHATSAPP PAGE -->
</template>
