<template>
  <div>
    <FilesCardList v-if="typeof fileId === 'undefined'" />
    <div v-else class="max-w-2xl mx-auto p-4">
      <FilesDetailsForm />
    </div>
  </div>
</template>

<script setup lang="ts">
const fileId = useCurrentFileId();
</script>
