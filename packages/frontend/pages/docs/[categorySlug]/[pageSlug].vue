<template>
  <div class="max-w-xl mx-auto text-lg py-12">
    <div v-if="page">
      <ContentRenderer :value="page" class="prose" />
    </div>
    <div v-else class="flex flex-col items-center justify-center gap-3">
      <h1
        class="text-7xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
      >
        404
      </h1>
      <p class="text-center text-lg">
        Page not found: <br />
        {{ useRoute().fullPath }}
      </p>
      <NuxtLink to="/" class="button"> Back to home </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { fetchPage, categories } = await useCategories();
const page = fetchPage(
  useRoute().params.categorySlug as string,
  useRoute().params.pageSlug as string
);
</script>
