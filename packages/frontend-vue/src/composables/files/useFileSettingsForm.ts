import { useFilesStore } from '@/stores/useFilesStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { toast } from 'vue-sonner';
import { useConfirm } from '../utils/useConfirm';
import { useRouter } from 'vue-router';
import useCurrentProjectId from '../projects/useCurrentProjectId';
import { usePocketbaseStore } from '@/stores/usePocketbaseStore';
import { useProjectsStore } from '@/stores/useProjectsStore';

export default function useFileSettingsForm() {
  const filesStore = useFilesStore();
  const { confirmDialog } = useConfirm();
  const { currentFile } = storeToRefs(filesStore);
  const { pocketbase } = usePocketbaseStore();
  const { fetchProjects } = useProjectsStore();
  const router = useRouter();

  const isSubmitting = ref(false);
  const isDeleting = ref(false);
  const name = ref<string>(currentFile.value?.name || '');
  const description = ref<string>(currentFile.value?.description || '');

  const submit = async () => {
    isSubmitting.value = true;

    try {
      await pocketbase.collection('files').update(currentFile.value?.id || '', {
        name: name.value,
        description: description.value,
      });

      toast.success('File updated successfully');

      await filesStore.fetchFiles();
    } catch (error) {
      toast.error(`Failed to update file: ${(error as Error).message}`);
    } finally {
      isSubmitting.value = false;
    }
  };

  const deleteFile = async () => {
    isDeleting.value = true;

    if (
      !(await confirmDialog(
        `Are you sure you want to delete the file "${name.value}"? This action cannot be undone.`,
      ))
    ) {
      isDeleting.value = false;
      return;
    }

    try {
      await pocketbase.collection('files').delete(currentFile.value?.id || '');

      toast.success('File deleted successfully');

      await router.push(`/projects/${currentFile.value?.project}/files`);
      await filesStore.fetchFiles();
      await fetchProjects();
    } catch (error) {
      toast.error(`Failed to delete file: ${(error as Error).message}`);
    } finally {
      isDeleting.value = false;
    }
  };

  watch(
    () => currentFile.value,
    (newFile) => {
      name.value = newFile?.name || '';
      description.value = newFile?.description || '';
    },
    { deep: true },
  );

  onMounted(() => {
    if (!currentFile.value) {
      router.push(`/projects/${useCurrentProjectId().value}/files`);
    }
  });

  return {
    currentFile,
    name,
    isSubmitting,
    submit,
    isDeleting,
    deleteFile,
    description,
  };
}
