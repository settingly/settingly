<template>
  <div class="flex items-center justify-center w-12 h-12 rounded-lg">
    <RouterLink class="block icon-button-wrapper" :to="`/projects/${project?.id}/settings`">
      <SettingsIcon class="w-4 h-4" />
    </RouterLink>
  </div>
</template>

<script lang="ts" setup>
import type { Project } from '@/types/projects';
import { SettingsIcon } from 'lucide-vue-next';

defineProps<{
  project?: Project;
}>();
</script>
