<!--
  Screen 3 — main app shell. Hand-composed to reproduce the original nesting:
    #s-app > nav.sidebar + .main( header.topbar + .content( pages... ) )
  The pages are absolutely positioned (.page{position:absolute;inset:0}); the
  legacy navTo() toggles `.page.on` by id, so render order is irrelevant.

  REWRITE: drive the visible page with a reactive ref + <component :is> instead
  of the .page.on class toggling. Sidebar item active-state likewise.
-->
<script setup>
import SidebarNav from '../app/SidebarNav.vue'
import TopBar from '../app/TopBar.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import LeadsPage from '../pages/LeadsPage.vue'
import MarketingPage from '../pages/MarketingPage.vue'
import IntelPage from '../pages/IntelPage.vue'
import WhatsAppPage from '../pages/WhatsAppPage.vue'
import PoolPage from '../pages/PoolPage.vue'
</script>

<template>
  <div class="screen" id="s-app">
    <SidebarNav />
    <div class="main">
      <TopBar />
      <div class="content">
        <DashboardPage />
        <LeadsPage />
        <MarketingPage />
        <IntelPage />
        <WhatsAppPage />
        <PoolPage />
      </div>
    </div>
  </div>
</template>
