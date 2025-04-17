<template>
  <div class="max-w-2xl mx-auto p-4">
    <FilesDetailsForm
      name="Advanced Settings"
      description="Configure application settings with the tree editor"
      v-model:config="appConfig"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const appConfig = ref({
  enabled: true,
  settings: {
    api: {
      endpoint: "https://api/v1.example.com",
      timeout: 30,
      retries: 3,
    },
    features: {
      darkMode: true,
      notifications: {
        email: true,
        push: false,
      },
    },
  },
});
</script>
