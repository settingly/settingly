<template>
  <div class="max-w-2xl mx-auto p-4">
    <div class="card hover:shadow-md my-8 lg:my-24">
      <!-- Card Header -->
      <div class="flex flex-row justify-between p-6 pb-3">
        <div class="flex flex-col space-y-1.5">
          <h3 class="text-xl font-semibold tracking-tight">
            {{ currentFile?.name }}
          </h3>
          <p class="text-sm text-body -mt-1">
            {{ currentFile?.description }}
          </p>
        </div>
        <div><FileSettingsButton /></div>
      </div>

      <!-- Tabs -->
      <div class="border-b border-gray-300 px-6">
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
          <!-- <button
            @click="activeTab = 'ui'"
            class="py-2 px-1 text-sm font-medium relative -mb-px"
            :class="
              activeTab === 'ui'
                ? 'text-primary border-b-2 border-primary'
                : ' hover:text-foreground'
            "
          >
            UI Editor
          </button> -->
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
        <!-- <div v-if="activeTab === 'ui'" class="space-y-4">
          <div
            class="flex flex-row items-center gap-3 bg-primary/50 p-4 rounded-md border border-primary text-primary"
          >
            <SofaIcon class="h-16 w-16 !text-white" />
            <p class="text-white">
              This feature is currently under development. Please check back later for updates. In
              the meantime, sit back on the sofa and relax!
            </p>
          </div>
        </div> -->

        <!-- JSON Editor -->
        <JsonFileEditor v-if="activeTab === 'json'" />

        <!-- API Reference -->
        <div v-if="activeTab === 'api'" class="space-y-4">
          <h3 class="font-semibold text-dark text-lg">Fetching Config Files</h3>
          <p>
            You can find information about the API endpoints for fetching configuration files on
            <RouterLink
              to="/docs/api-reference/fetching-config-files"
              class="text-primary hover:underline"
              >this page</RouterLink
            >.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import FileSettingsButton from '@/components/files/FileSettingsButton.vue';
import JsonFileEditor from '@/components/files/JsonFileEditor.vue';
import useCurrentProjectStore from '@/stores/useCurrentProjectStore';
import { useRoute, useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';

const { currentFile, files, project } = storeToRefs(useCurrentProjectStore());

const route = useRoute();
const router = useRouter();

watch(files, () => {
  if (!files.value.some((file) => file.id === route.params.fileId)) {
    router.push(`/projects/${route.params.projectId}/files`);
  }
});

useHead(() => ({
  title: `${currentFile.value?.name}.json - ${project.value?.name} - Settingly Files`,
}));

const activeTab = ref<string>('json');
</script>
