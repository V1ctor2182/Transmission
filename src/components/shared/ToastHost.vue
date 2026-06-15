<!--
  Shared — toast notification host
  Faithful extract from index (31).html (L1921-1929). NOT yet idiomatic Vue.
  REWRITE: convert onclick="fn(...)" → @click, lift state into <script setup>.
  AI-flavor audit: see REFACTOR-NOTES.md.
-->
<template>
<!-- TOAST -->
<div class="toast" id="toast">
  <div class="toast-icon" id="toast-icon">✅</div>
  <div class="toast-body">
    <div class="toast-title" id="toast-title"></div>
    <div class="toast-sub" id="toast-sub"></div>
  </div>
  <div class="toast-bar"></div>
</div>
</template>
