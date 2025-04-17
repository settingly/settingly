<template>
  <footer
    class="flex items-center justify-between bg-gray-100 py-4 px-8 border-t border-gray-200"
  >
    <ul class="flex flex-row items-center gap-4">
      <li><a href="#contact">Imprint</a></li>
      <li><a href="#privacy">Privacy</a></li>
      <li><a href="#privacy">Terms</a></li>
      <li><a href="#privacy">Cookies</a></li>
    </ul>
    <img :src="logo" width="75" height="75" alt="Logo" class="block" />
  </footer>
</template>

<script lang="ts" setup>
import logo from "@/assets/media/images/logo.png";
</script>
