<!--
  Root. Renders the three screens + global overlays in the SAME source order
  as the original <body>, so the legacy screen-switching (which toggles
  `.screen.active` by id) keeps working unchanged.

  REWRITE: replace the by-id class toggling with a reactive `currentScreen`
  ref and <component :is> or v-if. That removes the whole `navTo`/`enterApp`
  id-juggling layer.
-->
<script setup>
import { onMounted, ref } from 'vue'
import LoginScreen from './components/screens/LoginScreen.vue'
import OnboardingScreen from './components/screens/OnboardingScreen.vue'
import AppShell from './components/screens/AppShell.vue'
import AiBubble from './components/shared/AiBubble.vue'
import AppModals from './components/shared/AppModals.vue'
import ToastHost from './components/shared/ToastHost.vue'
import FirstRunAnalysis from './components/screens/FirstRunAnalysis.vue'
import GuidedTour from './components/shared/GuidedTour.vue'

// H1: redesigned "AI 分析" first-run. startScan() triggers it (replaces the old
// fake-scan overlay + onboarding chapters); "进入工作台" → enterApp().
const showAnalysis = ref(false)
const analysisDomain = ref('wanqianfood.com')
function finishAnalysis () {
  showAnalysis.value = false
  window.enterApp && window.enterApp()
}
onMounted(() => {
  window.__initLegacyApp && window.__initLegacyApp()
  window.__showAnalysis = (d) => { if (d) analysisDomain.value = d; showAnalysis.value = true }
})
</script>

<template>
  <LoginScreen />
  <OnboardingScreen />
  <AppShell />
  <AiBubble />
  <AppModals />
  <ToastHost />
  <FirstRunAnalysis v-if="showAnalysis" :domain="analysisDomain" @done="finishAnalysis" />
  <GuidedTour />
</template>
