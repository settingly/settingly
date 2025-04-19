<template>
  <div
    class="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md my-24"
  >
    <!-- Card Header -->
    <div class="flex flex-row justify-between p-6 pb-3">
      <div class="flex flex-col space-y-1.5">
        <h3 class="text-xl font-semibold tracking-tight">
          {{ currentFile?.name }}
        </h3>
      </div>
      <div>
        <FilesSettingsButton />
      </div>
    </div>

    <!-- Tabs -->
    <div class="border-b px-6">
      <div class="flex space-x-4">
        <button
          @click="activeTab = 'json'"
          class="py-2 px-1 text-sm font-medium relative -mb-px"
          :class="
            activeTab === 'json'
              ? 'text-primary border-b-2 border-primary'
              : ' hover:text-foreground'
          "
        >
          JSON Editor
        </button>
        <button
          @click="activeTab = 'ui'"
          class="py-2 px-1 text-sm font-medium relative -mb-px"
          :class="
            activeTab === 'ui'
              ? 'text-primary border-b-2 border-primary'
              : ' hover:text-foreground'
          "
        >
          UI Editor
        </button>
        <button
          @click="activeTab = 'api'"
          class="py-2 px-1 text-sm font-medium relative -mb-px"
          :class="
            activeTab === 'api'
              ? 'text-primary border-b-2 border-primary'
              : ' hover:text-foreground'
          "
        >
          API Reference
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="p-6">
      <!-- UI Tree Editor -->
      <div v-if="activeTab === 'ui'" class="space-y-4">
        <div
          class="flex flex-row items-center gap-3 bg-primary/50 p-4 rounded-md border border-primary text-primary"
        >
          <SofaIcon class="h-16 w-16 !text-white" />
          <p class="text-white">
            This feature is currently under development. Please check back later
            for updates. In the meantime, sit back on the sofa and relax!
          </p>
        </div>
      </div>

      <!-- JSON Editor -->
      <FilesJsonEditor v-if="activeTab === 'json'" />

      <!-- API Reference -->
      <div v-if="activeTab === 'api'" class="space-y-4">
        <p class="text-tdark"></p>

        <h4 class="text-lg font-semibold">API Status</h4>
        <ul>
          <li class="flex flex-row items-center gap-2">
            <BracesIcon class="h-4 w-4 text-success" />
            <span class="text-sm">
              Rest API (<i>/api/files/...</i>): Available</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  SofaIcon,
  SettingsIcon,
  CloudIcon,
  Brackets,
  BracesIcon,
} from "lucide-vue-next";

const { currentFile } = storeToRefs(useFilesStore());

const activeTab = ref("json");
</script>
