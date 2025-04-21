import type { File_, FileVersion } from '@/types/files';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { usePocketbaseStore } from './usePocketbaseStore';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

export const useFilesStore = defineStore('files', () => {
  const files = ref<File_[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const { pocketbase } = usePocketbaseStore();
  const route = useRoute();

  const currentFile = computed(() => {
    return files.value.find((file) => file.id === route.params.fileId);
  });

  async function fetchFiles() {
    isLoading.value = true;
    try {
      files.value = await pocketbase.collection('files').getFullList<File_>();

      files.value.forEach(async (file) => {
        const fileVersions = await pocketbase
          .collection('file_versions')
          .getFirstListItem<FileVersion>(`file="${file.id}"`);

        file.fileVersions = [fileVersions];
      });
    } catch (err) {
      error.value = `Failed to fetch files: ${(err as Error).message}`;
    }

    isLoading.value = false;
  }

  return {
    files,
    fetchFiles,
    isLoading,
    error,
    currentFile,
  };
});
