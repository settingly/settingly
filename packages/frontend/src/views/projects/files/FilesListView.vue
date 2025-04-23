<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-8 lg:my-24">
    <div class="flex flex-col gap-3 lg:gap-0 md:flex-row justify-between mb-12">
      <div>
        <h1 class="text-4xl font-semibold">{{ currentProject?.name }}</h1>
        <p class="max-w-2xl text-sm mt-4">
          {{ currentProject?.description }}
        </p>
      </div>

      <div class="flex flex-row items-center gap-4">
        <CreateFileButton />

        <ProjectsSettingsButton :project="currentProject!" />
      </div>
    </div>

    <div
      v-if="!error && !isLoading && filteredFiles.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full"
    >
      <FileCard v-for="(file, index) in filteredFiles" :file="file" :key="index" />
    </div>
    <div
      v-else-if="!error && !isLoading && filteredFiles.length === 0"
      class="flex flex-col items-center justify-center w-full h-96 gap-2"
    >
      <p class="w-full text-center text-lg">This project doesn't have any files yet.</p>
      <p class="w-full text-center text-lg">
        To create a new file, click the "New File" button in the top right corner.
      </p>
    </div>
    <div
      v-else-if="error && !isLoading && filteredFiles.length > 0"
      class="flex flex-col items-center justify-center w-full h-96 gap-2"
    >
      <p class="w-full text-center text-lg text-error">
        Oops! Something went wrong while loading your files:
      </p>
      <p class="w-full text-center text-lg text-error">
        {{ error }}
      </p>
    </div>

    <div v-else class="flex flex-col items-center justify-center w-full h-96 gap-6">
      <p class="w-full text-center text-lg">Your files are being loaded...</p>

      <SharedSpinner />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFilesStore } from '@/stores/useFilesStore';
import { useHead } from '@unhead/vue';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useProjectsStore } from '@/stores/useProjectsStore';
import FileCard from '@/components/files/FileCard.vue';
import ProjectsSettingsButton from '@/components/projects/ProjectSettingsButton.vue';
import SharedSpinner from '@/components/shared/SharedSpinner.vue';
import CreateFileButton from '@/components/files/CreateFileButton.vue';

const filesStore = useFilesStore();
const projectsStore = useProjectsStore();

const { fetchFiles } = filesStore;
const { fetchProjects } = projectsStore;
const { currentProject } = storeToRefs(projectsStore);
const { files, isLoading, error } = storeToRefs(filesStore);
const router = useRouter();

const filteredFiles = computed(() => {
  return files.value.filter((file) => file.project === currentProject.value!.id);
});

onMounted(async () => {
  await fetchProjects();
  await fetchFiles();

  if (!currentProject.value) {
    router.push('/projects');
  }
});

useHead({
  title: 'Settingly - Files',
});
</script>
