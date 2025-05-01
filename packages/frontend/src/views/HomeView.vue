<script setup lang="ts">
import HomeHeader from '@/components/home/HomeHeader.vue';
import HomeServicesList from '@/components/home/HomeServicesList.vue';
</script>

<template>
  <div>
    <div
      class="w-full h-16 from-red-500 to-primary bg-gradient-to-r text-center flex items-center justify-center shadow-xl"
    >
      <p class="text-white">
        <strong>Warning: Beta Version </strong>- Not recommended for production. Report bugs or
        issues.
      </p>
    </div>
    <HomeHeader />
    <hr />

    <hr />
    <HomeServicesList />
    <hr />
  </div>
</template>
