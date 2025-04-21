<template>
  <footer class="flex items-center justify-between bg-gray-100 py-4 px-8 border-t border-gray-200">
    <ul class="flex flex-row items-center gap-4">
      <li><RouterLink to="/legal/imprint">Imprint</RouterLink></li>
      <li><RouterLink to="/legal/privacy">Privacy</RouterLink></li>
      <li><RouterLink to="/legal/terms">Terms</RouterLink></li>
      <li><RouterLink to="/legal/cookies">Cookies</RouterLink></li>
    </ul>
    <img :src="logo" width="75" height="75" alt="Logo" class="block" />
  </footer>
</template>

<script lang="ts" setup>
import logo from '@/assets/logo.png';
</script>
