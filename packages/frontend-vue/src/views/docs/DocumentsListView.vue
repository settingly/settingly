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
        Settingly is a platform providing server-side utilities, primarily focused on storage and
        logging solutions. We prioritize simplicity, data privacy, and performance.
        <br />
        <br />
        Settingly is fully open-source and self-hostable, giving you the freedom to run it on your
        own infrastructure or use it as a service. We are committed to open-source principles and
        data privacy, ensuring Settingly is accessible for anyone to use and customize.
      </p>

      <h2>Key Features</h2>
      <ul>
        <li>
          <strong> JSON-based configuration storage </strong>: Store and manage your configuration
          data in a structured JSON format.
        </li>
        <li>
          <strong> Simplicity </strong>: Settingly is designed to be simple and easy to use, with a
          focus on providing a straightforward RESTful API for developers.
        </li>
        <li>
          <strong> That's a bit little, isn't it? </strong>
          Yes, it is. Settingly is in its early stages (released in April 2025). Your early adoption
          and feedback will drive our platform's evolution.
        </li>
      </ul>

      <h2>Who is Settingly for?</h2>
      <p>
        Settingly is <strong> not </strong> designed for large-scale projects or enterprise-level
        applications. It is intended for developers and teams who need a simple, efficient solution
        for configuration storage and logging. If you're looking for a lightweight, easy-to-use tool
        to manage your configuration data, Settingly is the right choice for you.
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

useHead({
  title: 'Settingly - Documentation',
});
</script>
