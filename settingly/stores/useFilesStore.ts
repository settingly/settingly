export const useFilesStore = defineStore("files", () => {
  const files = ref<File_[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const currentProjectId = useCurrentProjectId();
  const currentFileId = useCurrentFileId();

  const currentFile = computed(() => {
    return files.value.find((file) => file._id === currentFileId.value);
  });

  async function fetchFiles(projectId: string = "") {
    isLoading.value = true;
    try {
      const files_ = await $fetch<File_[]>("/api/v1/files", {
        method: "GET",
        params: {
          projectId: currentProjectId.value || projectId,
        },
      });
      files.value = files_;
    } catch (err) {
      error.value = `Failed to fetch files: ${(err as Error).message}`;
    }

    isLoading.value = false;
  }

  watch(
    () => currentProjectId.value,
    async (newProjectId, oldProjectId) => {
      if (newProjectId) {
        await fetchFiles();
      } else {
        files.value = [];
        error.value = null;
        isLoading.value = false;
      }
    },
    { immediate: true }
  );

  return {
    files,
    refetchFiles: fetchFiles,
    isLoading,
    error,
    currentFile,
  };
});
