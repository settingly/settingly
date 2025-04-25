<template>
  <div class="max-w-xl mx-auto text-lg py-12">
    <div class="flex flex-col items-center justify-center gap-3">
      <h1
        class="text-7xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
      >
        404
      </h1>
      <p class="text-center text-lg">
        Page not found: <br />
        {{ path }}
      </p>
      <RouterLink :to="homeRoute" class="button"> Back to home </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const { path } = useRoute();

const homeRoute = computed(() => {
  if (path.startsWith('/projects')) {
    return '/projects';
  } else if (path.startsWith('/docs')) {
    return '/docs';
  } else {
    return '/';
  }
});

useHead({
  title: 'Page not found - Settingly',
  meta: [
    {
      name: 'description',
      content: 'Page not found',
    },
  ],
});
</script>
