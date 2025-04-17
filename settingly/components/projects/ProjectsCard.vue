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
      <div class="flex items-center justify-center w-12 h-12 rounded-lg">
        <NuxtLink
          class="mr-4 mt-4 block icon-button-wrapper"
          :to="`/_/${project._id}/settings`"
        >
          <Settings class="w-4 h-4" />
        </NuxtLink>
      </div>
    </div>

    <!-- Card Footer -->
    <div class="flex flex-col gap-2 sm:justify-between p-6 pt-4 border-t">
      <div class="flex items-center gap-2 text-sm">
        <FolderIcon class="h-4 w-4" />
        <span>Configurations: {{ project.files.length }}</span>
      </div>
      <div class="flex items-center gap-2 text-sm">
        <UsersIcon class="h-4 w-4" />
        <span>Last Use: 2 minutes ago</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { FolderIcon, UsersIcon, Settings } from "lucide-vue-next";

const { user } = useUser();

defineProps<{
  project: Project;
}>();

// Run immediately and on user changes
</script>
