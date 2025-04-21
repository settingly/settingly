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
    const { files } = useFilesStore();

    if (
      useCurrentFileId().value &&
      !files.find((file) => file._id === useCurrentFileId().value)
    ) {
      navigateTo(`/_/${useCurrentProjectId().value}`);
    }

    if (newFile) {
      useHead({
        title: `Settingly - ${useFilesStore().currentFile?.name} (File)`,
      });
    }
  },
  { immediate: true, deep: true }
);

watch(
  () => useProjectsStore().currentProject,
  async (newProject) => {
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
