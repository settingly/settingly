<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-8 lg:my-24">
    <div class="flex flex-col gap-3 lg:gap-0 md:flex-row justify-between mb-12">
      <div>
        <h1 class="text-4xl font-semibold">{{ project?.name }}</h1>
        <p class="max-w-2xl text-sm mt-4">
          {{ project?.description }}
        </p>
      </div>

      <div class="flex flex-row items-center gap-4">
        <CreateFileButton />

        <ProjectSettingsButton :project="project!" />
      </div>
    </div>

    <div
      v-if="!errors.files && !loaders.files && files.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full"
    >
      <FileCard v-for="(file, index) in files" :file="file" :key="index" />
    </div>
    <div
      v-else-if="!errors.files && !loaders.files && files.length === 0"
      class="flex flex-col items-center justify-center w-full h-96 gap-2"
    >
      <p class="w-full text-center text-lg">This project doesn't have any files yet.</p>
      <p class="w-full text-center text-lg">
        To create a new file, click the "New File" button in the top right corner.
      </p>
    </div>
    <div
      v-else-if="errors.files && !loaders.files && files.length > 0"
      class="flex flex-col items-center justify-center w-full h-96 gap-2"
    >
      <p class="w-full text-center text-lg text-error">
        Oops! Something went wrong while loading your files:
      </p>
      <p class="w-full text-center text-lg text-error">
        {{ errors.files }}
      </p>
    </div>

    <div v-else class="flex flex-col items-center justify-center w-full h-96 gap-6">
      <p class="w-full text-center text-lg">Your files are being loaded...</p>

      <SharedSpinner />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useProjectsStore } from '@/stores/useProjectsStore';
import FileCard from '@/components/files/FileCard.vue';
import ProjectSettingsButton from '@/components/projects/ProjectSettingsButton.vue';
import SharedSpinner from '@/components/shared/SharedSpinner.vue';
import CreateFileButton from '@/components/files/CreateFileButton.vue';
import useCurrentProjectStore from '@/stores/useCurrentProjectStore';

const { project, files, errors, loaders } = storeToRefs(useCurrentProjectStore());
const { projects } = storeToRefs(useProjectsStore());
const route = useRoute();
const router = useRouter();

watch(projects, () => {
  if (!projects.value.some((p) => p.id === route.params.projectId)) {
    router.push({ name: 'projects' });
  }
});

useHead(() => ({
  title: project.value ? `${project.value.name} - Settingly Files` : 'Loading Project...',
}));
</script>
