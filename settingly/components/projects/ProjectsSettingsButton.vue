<template>
  <SharedProtect permission="org:projects:update">
    <div class="flex items-center justify-center w-12 h-12 rounded-lg">
      <NuxtLink
        class="block icon-button-wrapper"
        :to="`/_/${project?._id || ''}/settings`"
      >
        <SettingsIcon class="w-4 h-4" />
      </NuxtLink>
    </div>
  </SharedProtect>
</template>

<script lang="ts" setup>
import { SettingsIcon } from "lucide-vue-next";

defineProps<{
  project?: Project;
}>();
</script>
