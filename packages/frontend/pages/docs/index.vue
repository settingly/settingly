<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-24">
    <div class="flex flex-row justify-between items-center mb-12">
      <h1 class="text-4xl font-semibold">Documentation</h1>
    </div>

    <div class="prose">
      <h2>What is Settingly?</h2>
      <p>
        Settingly is a platform offering various server-side utilities for
        storage, for example a simple cache, configuration storage and logging.
        We prioritize data privacy, simplicity, and performance.
      </p>
      <h2>Key Features</h2>
      <ul>
        <li>
          <strong> JSON-based configuration storage </strong>: Store and manage
          your configuration data in a structured JSON format.
        </li>
        <li>
          <strong> RESTful API </strong>: Access and manipulate your data using
          a simple RESTful API.
        </li>
        <li>
          <strong> Projects & Organizations </strong>: Organize your data into
          projects and manage them within organizations.
        </li>
      </ul>
    </div>
    <hr class="my-16" />
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
            :to="`/docs/${category.slug}/${page.meta.slug}`"
            class="card"
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
const { categories } = await useCategories();
</script>
