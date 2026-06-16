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

// H1 (feat branch): the redesigned "AI 分析" first-run. Triggerable for review;
// final wiring = startScan() shows this instead of the old fake-scan overlay.
const showAnalysis = ref(false)
onMounted(() => {
  window.__initLegacyApp && window.__initLegacyApp()
  window.__showAnalysis = () => { showAnalysis.value = true }
})
</script>

<template>
  <LoginScreen />
  <OnboardingScreen />
  <AppShell />
  <AiBubble />
  <AppModals />
  <ToastHost />
  <FirstRunAnalysis v-if="showAnalysis" domain="wanqianfood.com" @done="showAnalysis = false" />
</template>
