<template>
  <footer
    class="flex items-center justify-between bg-gray-200/70 py-4 px-8 border-t border-gray-200"
  >
    <p>
      &copy; {{ new Date().getFullYear() }}
      <a href="https://adfectatio.de" target="_blank" class="text-primary hover:underline"
        >Adfectatio</a
      >. Released under the
      <a
        href="https://github.com/adfectatio/settingly/blob/main/LICENSE"
        target="_blank"
        class="text-primary hover:underline"
        >MIT</a
      >
      License.
    </p>
    <img :src="logo" width="75" height="75" alt="Settingly Logo" class="block" />
  </footer>
</template>

<script lang="ts" setup>
import logo from '@/assets/logo.png';
</script>
