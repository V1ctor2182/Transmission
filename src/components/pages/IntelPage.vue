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
              <div style="font-size:13px;font-weight:700;color:var(--t-primary);margin-right:4px">全球采购需求</div>
              <div style="font-size:11px;color:var(--t-muted);background:rgba(23,166,115,.08);border:1px solid rgba(23,166,115,.15);padding:2px 10px;border-radius:20px"><span style="color:#17a673">●</span> 实时 · 今日新增 98,241 条</div>
              <div style="flex:1"></div>
              <!-- Search -->
              <div style="display:flex;align-items:center;gap:6px;background:rgba(19,33,63,.04);border:1px solid rgba(19,33,63,.07);border-radius:8px;padding:5px 12px">
                <svg viewBox="0 0 24 24" style="width:13px;height:13px;stroke:var(--t-muted);fill:none"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input id="intel-search" type="text" placeholder="搜索采购商、产品、国家…" oninput="renderIntelTable()" style="background:none;border:none;outline:none;font-size:12px;color:var(--t-primary);width:160px" />
              </div>
              <!-- Export -->
              <div onclick="toast('◆','导出数据','正在生成 Excel 报表，请稍候…')" style="font-size:11px;padding:5px 12px;border-radius:8px;background:rgba(19,33,63,.04);border:1px solid rgba(19,33,63,.07);color:var(--t-muted);cursor:pointer">导出</div>
            </div>
            <!-- Filter Pills -->
            <div style="display:flex;align-items:center;gap:8px;margin-top:10px;flex-wrap:wrap">
              <span style="font-size:11px;color:var(--t-muted)">筛选：</span>
              <!-- Region -->
              <select id="intel-filter-region" onchange="renderIntelTable()" style="font-size:11px;background:rgba(19,33,63,.04);border:1px solid rgba(19,33,63,.07);border-radius:7px;padding:4px 8px;color:var(--t-primary);cursor:pointer">
                <option value="">全部地区</option>
                <option value="东南亚">东南亚</option>
                <option value="北美">北美</option>
                <option value="澳洲">澳洲</option>
                <option value="欧洲">欧洲</option>
                <option value="中东">中东</option>
              </select>
              <!-- Category -->
              <select id="intel-filter-cat" onchange="renderIntelTable()" style="font-size:11px;background:rgba(19,33,63,.04);border:1px solid rgba(19,33,63,.07);border-radius:7px;padding:4px 8px;color:var(--t-primary);cursor:pointer">
                <option value="">全部品类</option>
                <option value="月饼">月饼礼盒</option>
                <option value="椰子">椰子礼盒</option>
                <option value="糕点">糕点类</option>
                <option value="礼品">礼品套装</option>
              </select>
              <!-- Status -->
              <select id="intel-filter-status" onchange="renderIntelTable()" style="font-size:11px;background:rgba(19,33,63,.04);border:1px solid rgba(19,33,63,.07);border-radius:7px;padding:4px 8px;color:var(--t-primary);cursor:pointer">
                <option value="">全部状态</option>
                <option value="new">新增</option>
                <option value="hot">热门</option>
                <option value="locked">需解锁</option>
              </select>
              <!-- Sort -->
              <select id="intel-sort" onchange="renderIntelTable()" style="font-size:11px;background:rgba(19,33,63,.04);border:1px solid rgba(19,33,63,.07);border-radius:7px;padding:4px 8px;color:var(--t-primary);cursor:pointer">
                <option value="time">按时间排序</option>
                <option value="score">按匹配度排序</option>
                <option value="amount">按采购量排序</option>
              </select>
              <div style="margin-left:auto;font-size:11px;color:var(--t-muted)">共 <span id="intel-count" style="color:#1e5fd0;font-weight:700">0</span> 条需求</div>
            </div>
          </div>
          <!-- Table -->
          <div style="flex:1;overflow-y:auto">
            <table style="width:100%;border-collapse:collapse">
              <thead>
                <tr style="background:rgba(19,33,63,.02);position:sticky;top:0;z-index:2">
                  <th style="padding:10px 24px;text-align:left;font-size:11px;font-weight:600;color:var(--t-muted);border-bottom:1px solid rgba(19,33,63,.06);white-space:nowrap">国家 / 地区</th>
                  <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--t-muted);border-bottom:1px solid rgba(19,33,63,.06)">采购商</th>
                  <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--t-muted);border-bottom:1px solid rgba(19,33,63,.06)">采购需求</th>
                  <th style="padding:10px 16px;text-align:center;font-size:11px;font-weight:600;color:var(--t-muted);border-bottom:1px solid rgba(19,33,63,.06);white-space:nowrap">匹配度</th>
                  <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--t-muted);border-bottom:1px solid rgba(19,33,63,.06);white-space:nowrap">建联成功率</th>
                  <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--t-muted);border-bottom:1px solid rgba(19,33,63,.06);white-space:nowrap">线索编号</th>
                  <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--t-muted);border-bottom:1px solid rgba(19,33,63,.06);white-space:nowrap">需求时间</th>
                  <th style="padding:10px 16px;text-align:center;font-size:11px;font-weight:600;color:var(--t-muted);border-bottom:1px solid rgba(19,33,63,.06)">操作</th>
                </tr>
              </thead>
              <tbody id="intel-table-body"></tbody>
            </table>
          </div>
        </div>
      </div>
</template>
