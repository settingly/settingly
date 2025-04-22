<template>
  <RouterLink :to="`/projects/${project.id}/files`" class="card">
    <!-- Card Header -->
    <div class="flex flex-row justify-between">
      <div>
        <div class="flex flex-col space-y-1.5 p-6 pb-2">
          <h3 class="text-xl font-semibold tracking-tight">
            {{ project.name }}
          </h3>
          <p class="text-sm text-body min-h-6">{{ project.description }}</p>
        </div>
      </div>
      <div class="mt-1 mr-1">
        <ProjectsSettingsButton :project="project" />
      </div>
    </div>

    <!-- Card Footer -->
    <div class="flex flex-col gap-2 sm:justify-between p-6 pt-4 border-t border-gray-300">
      <div class="flex items-center gap-2 text-sm">
        <FolderIcon class="h-4 w-4" />
        <span class="text-body">Files Count: {{ filesCount || 0 }}</span>
      </div>
      <div class="flex items-center gap-2 text-sm">
        <UsersIcon class="h-4 w-4" />
        <span class="text-body"
          >Created At: {{ new Date(project.created).toLocaleDateString() }}</span
        >
      </div>
    </div>
  </RouterLink>
</template>

<script lang="ts" setup>
import { FolderIcon, UsersIcon } from 'lucide-vue-next';
import ProjectsSettingsButton from './ProjectSettingsButton.vue';
import type { Project } from '@/types/projects';

defineProps<{
  project: Project;
  filesCount: number;
}>();
</script>
