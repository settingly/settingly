<template>
  <NuxtLink
    :to="`/_/${project._id}`"
    class="block rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md max-w-md"
  >
    <!-- Card Header -->
    <div class="flex flex-row justify-between">
      <div>
        <div class="flex flex-col space-y-1.5 p-6 pb-2">
          <h3 class="text-xl font-semibold tracking-tight">
            {{ project.name }}
          </h3>
          <p class="text-sm">{{ project.description }}</p>
        </div>
      </div>
      <div class="mt-1 mr-1">
        <ProjectsSettingsButton :project="project" />
      </div>
    </div>

    <!-- Card Footer -->
    <div class="flex flex-col gap-2 sm:justify-between p-6 pt-4 border-t">
      <div class="flex items-center gap-2 text-sm">
        <FolderIcon class="h-4 w-4" />
        <span>Files Count: {{ project.filesCount || 0 }}</span>
      </div>
      <div class="flex items-center gap-2 text-sm">
        <UsersIcon class="h-4 w-4" />
        <span
          >Created At:
          {{ new Date(project.createdAt).toLocaleDateString() }}</span
        >
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { FolderIcon, UsersIcon, Settings } from "lucide-vue-next";

defineProps<{
  project: Project;
}>();

// Run immediately and on user changes
</script>
