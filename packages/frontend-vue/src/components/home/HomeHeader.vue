<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full mt-24 mb-24">
    <h1
      class="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary text-[6rem] lg:text-[7rem] font-barriecito"
    >
      Settingly
    </h1>
    <h2 class="text-2xl max-w-xl text-center">
      Streamline, control, and elevate your server-side utilities – all in one smart platform.
    </h2>
    <div class="mt-6 grid grid-rows-1 grid-cols-2 gap-5">
      <RouterLink class="button-fancy text-xl text-center flex flex-row items-center" to="#">
        Upvote
      </RouterLink>
      <RouterLink
        target="_blank"
        to="https://www.paypal.com/donate/?hosted_button_id=K95L2SCMBJQDE"
        class="button-fancy text-xl text-center"
        >Donate</RouterLink
      >
    </div>
  </div>
</template>
