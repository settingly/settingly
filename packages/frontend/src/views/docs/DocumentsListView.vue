<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-24">
    <div class="flex flex-row justify-between items-center mb-12">
      <h1 class="text-4xl font-semibold">Documentation</h1>
    </div>

    <div class="bg-orange-500/60 text-white rounded-xl border border-orange-600 p-4 max-w-xl mb-8">
      Self-hosting documentation for Settingly is coming soon! We appreciate your patience as we
      work to release it. In the meantime, feel free to use Settingly as a service.
    </div>

    <div class="prose">
      <h2>What is Settingly?</h2>
      <p>
        Settingly is a lightweight platform for storing and managing configuration data. It provides
        a simple solution that easily integrates into your existing workflows, making it perfect for
        developers and teams seeking an easy-to-use configuration management tool.
        <br />
        <br />
        Settingly is fully open-source and self-hostable, giving you the freedom to run it on your
        own infrastructure or use it as a service. We are committed to open-source principles and
        data privacy, ensuring Settingly is accessible for anyone to use and customize.
      </p>

      <h2>Key Features</h2>
      <ul>
        <li v-for="(keyFeature, index) in keyFeatures" :key="index">
          <strong> {{ keyFeature.name }}:</strong> {{ keyFeature.description }}
        </li>
      </ul>

      <h2>Coming Soon</h2>
      <p>
        Settingly is constantly evolving, and we're working hard to bring you new features and
        improvements. Some of the upcoming features include:
      </p>
      <ul>
        <li v-for="(comingSoon, index) in comingSoons" :key="index">
          <strong> {{ comingSoon.name }}:</strong> {{ comingSoon.description }}
        </li>
      </ul>

      <h2>Who is Settingly for?</h2>
      <p>
        Settingly is <strong> not </strong> designed for large-scale projects or enterprise-level
        applications. It is intended for developers and teams who need a simple, efficient solution
        for configuration storage. If you're looking for a lightweight, easy-to-use tool to manage
        your configuration data, Settingly is the right choice for you.
      </p>
    </div>
    <hr class="my-16" />
    <div class="flex flex-col space-y-12">
      <div v-for="(category, i1) in categories" :key="i1" class="flex flex-col">
        <h2 class="text-2xl font-semibold mb-4">
          {{ category.name }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          <RouterLink
            v-for="(page, i2) in category.pages"
            :key="i2"
            :to="`/docs/${category.slug}/${page.slug}`"
            class="card"
          >
            <div class="flex flex-col space-y-1.5 p-6">
              <h3 class="text-xl font-semibold tracking-tight">
                {{ page.name }}
              </h3>
              <p class="text-sm">{{ page.description }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import categories from '@/docs.config';
import { useHead } from '@unhead/vue';
import { ref } from 'vue';

const keyFeatures = ref([
  {
    name: 'JSON-based configuration storage',
    description: 'Store and manage your configuration data in a structured JSON format.',
  },
  {
    name: 'RESTful API',
    description:
      'Settingly is designed to be simple and easy to use, with a focus on providing a straightforward RESTful API for developers.',
  },
]);

const comingSoons = ref([
  {
    name: 'Versioning',
    description: 'Easily track and revert changes to your configuration data.',
  },
  {
    name: 'End-to-End Encryption',
    description: 'Encrypt your configuration data to ensure data privacy.',
  },
  {
    name: 'Self-Hosting',
    description: 'Run Settingly on your own infrastructure',
  },
]);

useHead({
  title: 'Documentation - Settingly',
});
</script>
