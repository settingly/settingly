<template>
  <div v-if="page" class="max-w-4xl mx-auto text-lg py-12 px-3">
    <component :is="page.content" class="prose max-w-none" />
  </div>
  <NotFoundView v-else />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import NotFoundView from '../NotFoundView.vue';
import categories from '@/docs.config';

const route = useRoute();
const categorySlug = route.params.categorySlug as string;
const pageSlug = route.params.pageSlug as string;

import { computed } from 'vue';
import { useHead } from '@unhead/vue';

const category = computed(() => {
  return categories.find((category) => category.slug === categorySlug);
});

const page = computed(() => {
  if (!category.value) return null;
  return category.value.pages.find((page) => page.slug === pageSlug) || null;
});

useHead({
  title: `${page.value ? page.value.name : 'Not Found'} - Settingly`,
});
</script>
