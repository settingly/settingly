<template>
  <RouterLink :to="`/projects/${file.project}/files/${file.id}`" class="card">
    <!-- Card Header -->
    <div class="flex flex-row justify-between items-start space-y-1.5 p-6">
      <div>
        <h3 class="text-xl font-semibold tracking-tight">{{ file.name }}</h3>
        <p class="body text-sm">
          {{ file.description }}
        </p>
      </div>
    </div>
  </RouterLink>
</template>

<script lang="ts" setup>
import type { File_ } from '@/types/files';

defineProps<{ file: File_ }>();
</script>
