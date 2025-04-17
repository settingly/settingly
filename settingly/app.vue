<template>
  <Toaster :rich-colors="true" />
  <div class="font-yaldevi" id="nuxt">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { Toaster } from "vue-sonner";

const { organization } = useOrganization();

watch(
  () => organization.value,
  async (newValue, oldValue) => {
    if (typeof oldValue !== "undefined" && oldValue?.id != newValue?.id) {
      await navigateTo("/_");
    }
  }
);
</script>
