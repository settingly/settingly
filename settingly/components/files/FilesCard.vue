<template>
  <NuxtLink
    :to="`/_/${file.projectId}?file=${file._id}`"
    class="block rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md max-w-md"
  >
    <!-- Card Header -->
    <div class="flex flex-col space-y-1.5 p-6">
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-semibold tracking-tight">{{ file.name }}</h3>
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import {
  BracesIcon,
  ClockIcon,
  DiamondIcon,
  GitGraph,
  InfoIcon,
} from "lucide-vue-next";

const props = defineProps<{ file: File_ }>();

defineEmits(["update:enabled"]);
</script>
