<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-24">
    <div class="flex flex-row justify-between items-center mb-12">
      <h1 class="text-4xl font-semibold">Documentation</h1>
    </div>

    <div class="flex flex-col space-y-12">
      <div v-for="category in categories" class="flex flex-col">
        <h2 class="text-2xl font-semibold mb-4">
          {{ category.name }}
        </h2>
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full"
        >
          <NuxtLink
            v-for="(page, index) in category.pages"
            :key="index"
            :to="`/docs/${page.stem}`"
            class="block rounded-lg border shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md max-w-md"
          >
            <div class="flex flex-col space-y-1.5 p-6">
              <h3 class="text-xl font-semibold tracking-tight">
                {{ page.title }}
              </h3>
              <p class="text-sm">{{ page.description }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: pages } = await useAsyncData(() =>
  queryCollection("content").all()
);

const categories = computed(() => {
  return [...new Set(pages.value?.map((page) => page.stem.split("/")[0]))].map(
    (categoryName) => {
      return {
        name: categoryName
          ? categoryName?.at(0)?.toUpperCase() + categoryName?.slice(1)
          : "",
        slug: categoryName,
        pages: pages.value?.filter((page) => {
          return page.stem.startsWith(categoryName + "/");
        }),
      };
    }
  );
});
</script>
