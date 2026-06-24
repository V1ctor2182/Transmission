<!--
  Page — 客户池 customer pool
  Faithful extract from index (31).html (L1351-1422). NOT yet idiomatic Vue.
  REWRITE: convert onclick="fn(...)" → @click, lift state into <script setup>.
  AI-flavor audit: see REFACTOR-NOTES.md.
-->
<template>
      <div class="page" id="page-pool" style="padding:0;overflow:hidden">
        <div id="pool-page-inner" style="display:flex;height:100%;overflow:hidden">

          <!-- LEFT: List Panel -->
          <div style="flex:1;display:flex;flex-direction:column;overflow:hidden;border-right:1px solid rgba(19,33,63,.06)">
            <!-- Topbar -->
            <div style="padding:14px 20px 10px;border-bottom:1px solid rgba(19,33,63,.05);flex-shrink:0">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
                <!-- Status filter tabs -->
                <div style="display:flex;gap:4px;flex:1">
                  <div class="pool-tab on" id="ptab-all" onclick="poolTabFilter(this,'all')"><span id="pstat-all-n">12</span> 全部</div>
                  <div class="pool-tab" id="ptab-replied" onclick="poolTabFilter(this,'replied')"><span id="pstat-replied-n">4</span> 已回复</div>
                  <div class="pool-tab overdue" id="ptab-overdue" onclick="poolTabFilter(this,'overdue')"><span id="pstat-overdue-n">2</span> 逐期跟进</div>
                  <div class="pool-tab warn" id="ptab-noreply" onclick="poolTabFilter(this,'no-reply')"><span id="pstat-noreply-n">3</span> 无回复</div>
                  <div class="pool-tab" id="ptab-pending" onclick="poolTabFilter(this,'pending')"><span id="pstat-pending-n">3</span> 待跟进</div>
                </div>
                <div onclick="poolBatchFollowUp()" style="font-size:11px;padding:5px 12px;border-radius:8px;background:rgba(31,143,214,.12);border:1px solid rgba(31,143,214,.2);color:#1e5fd0;cursor:pointer;white-space:nowrap">AI 批量跟进</div>
                <div onclick="navTo('leads')" style="font-size:11px;padding:5px 12px;border-radius:8px;background:rgba(19,33,63,.04);border:1px solid rgba(19,33,63,.07);color:var(--t-muted);cursor:pointer;white-space:nowrap">找客户</div>
              </div>
              <div style="display:flex;align-items:center;gap:8px">
                <div style="display:flex;align-items:center;gap:6px;flex:1;background:rgba(19,33,63,.04);border:1px solid rgba(19,33,63,.07);border-radius:8px;padding:5px 12px">
                  <svg viewBox="0 0 24 24" style="width:13px;height:13px;stroke:var(--t-muted);fill:none"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  <input id="pool-search" type="text" placeholder="搜索客户、国家、来源…" oninput="renderPoolTable()" style="background:none;border:none;outline:none;font-size:12px;color:var(--t-primary);flex:1" />
                </div>
                <select id="pool-sort" onchange="renderPoolTable()" style="font-size:11px;background:rgba(19,33,63,.04);border:1px solid rgba(19,33,63,.07);border-radius:7px;padding:5px 8px;color:var(--t-primary);cursor:pointer">
                  <option value="status">按状态</option>
                  <option value="score">按匹配度</option>
                  <option value="name">按名称</option>
                  <option value="time">按最近活跃</option>
                </select>
                <select id="pool-filter-source" onchange="renderPoolTable()" style="font-size:11px;background:rgba(19,33,63,.04);border:1px solid rgba(19,33,63,.07);border-radius:7px;padding:5px 8px;color:var(--t-primary);cursor:pointer">
                  <option value="">全部来源</option>
                  <option value="搜索推送客户">搜索推送</option>
                  <option value="精准建联客户">精准建联</option>
                  <option value="WhatsApp 商机">WhatsApp</option>
                  <option value="海关数据匹配">海关数据</option>
                </select>
              </div>
            </div>
            <!-- Table -->
            <div style="flex:1;overflow-y:auto">
              <table style="width:100%;border-collapse:collapse" id="pool-table">
                <thead>
                  <tr style="background:rgba(19,33,63,.02);position:sticky;top:0;z-index:2">
                    <th style="padding:9px 20px;text-align:left;font-size:11px;font-weight:600;color:var(--t-muted);border-bottom:1px solid rgba(19,33,63,.06)">客户</th>
                    <th style="padding:9px 12px;text-align:left;font-size:11px;font-weight:600;color:var(--t-muted);border-bottom:1px solid rgba(19,33,63,.06)">来源</th>
                    <th style="padding:9px 12px;text-align:center;font-size:11px;font-weight:600;color:var(--t-muted);border-bottom:1px solid rgba(19,33,63,.06)">状态</th>
                    <th style="padding:9px 12px;text-align:center;font-size:11px;font-weight:600;color:var(--t-muted);border-bottom:1px solid rgba(19,33,63,.06)">匹配度</th>
                    <th style="padding:9px 12px;text-align:left;font-size:11px;font-weight:600;color:var(--t-muted);border-bottom:1px solid rgba(19,33,63,.06)">跟进进度</th>
                    <th style="padding:9px 12px;text-align:left;font-size:11px;font-weight:600;color:var(--t-muted);border-bottom:1px solid rgba(19,33,63,.06)">最近活跃</th>
                    <th style="padding:9px 12px;text-align:center;font-size:11px;font-weight:600;color:var(--t-muted);border-bottom:1px solid rgba(19,33,63,.06)">操作</th>
                  </tr>
                </thead>
                <tbody id="pool-table-body"></tbody>
              </table>
            </div>
          </div>

          <!-- RIGHT: Detail Panel -->
          <div id="pool-detail-panel" style="width:320px;flex-shrink:0;display:flex;flex-direction:column;overflow:hidden;background:rgba(19,33,63,.01)">
            <div id="pool-detail-content" style="flex:1;overflow-y:auto;padding:20px">
              <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:12px;color:var(--t-muted)">
                <svg viewBox="0 0 24 24" style="width:40px;height:40px;stroke:rgba(19,33,63,.15);fill:none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                <div style="font-size:12px;color:rgba(19,33,63,.2)">点击左侧客户查看详情</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- LEADS PAGE (ICP AGENT) -->
</template>
