<template>
  <div>
    <FilesCardList v-if="typeof fileId === 'undefined'" />
    <div v-else class="max-w-2xl mx-auto p-4">
      <FilesDetailsForm />
    </div>
  </div>
</template>

<script setup lang="ts">
const fileId = useCurrentFileId();

watch(
  () => useFilesStore().currentFile,
  (newFile) => {
    if (newFile) {
      useHead({
        title: `Settingly - ${useFilesStore().currentFile?.name} (File)`,
      });
    }
  },
  { immediate: true }
);

watch(
  () => useProjectsStore().currentProject,
  (newProject) => {
    if (newProject && !useFilesStore().currentFile) {
      useHead({
        title: `Settingly - ${
          useProjectsStore().currentProject?.name
        } (Project)`,
      });
    }
  },
  { immediate: true }
);
</script>
