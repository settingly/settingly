<template>
  <div class="flex flex-col items-center justify-center w-full mt-24 mb-24">
    <h1
      class="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary text-[6rem] lg:text-[7rem] font-barriecito"
    >
      Settingly
    </h1>
    <h2 class="lg:text-2xl text-lg max-w-xl text-center text-dark">
      Changing settings in your apps should be effortless. Settingly makes it easy to change stuff
      in your apps after shipping.
    </h2>
    <div class="mt-6 grid grid-rows-1 grid-cols-2 gap-5">
      <a
        target="_blank"
        href="https://www.producthunt.com/products/settingly"
        class="button flex items-center font-semibold"
        to="#"
      >
        Get Started
      </a>
      <RouterLink
        to="/docs"
        class="flex items-center font-semibold text-sm hover:translate-x-0.5 transition-all text-dark"
        >Read the docs
        <ArrowRightIcon class="ml-2 w-4 h-4" />
      </RouterLink>
    </div>
    <div class="min-w-full lg:min-w-[800px] border border-gray-200 p-6 rounded-xl mt-10 shadow-xl">
      <JsonFileEditor :mocked="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightIcon } from 'lucide-vue-next';
import JsonFileEditor from '../files/JsonFileEditor.vue';
</script>
