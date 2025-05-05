<script setup lang="ts">
import HomeFeaturesList from '@/components/home/HomeFeaturesList.vue';
import HomeHeader from '@/components/home/HomeHeader.vue';
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
    <HomeFeaturesList />
    <hr />
  </div>
</template>
