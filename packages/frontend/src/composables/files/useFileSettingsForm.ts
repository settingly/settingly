import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { toast } from 'vue-sonner';
import { useConfirm } from '../utils/useConfirm';
import { useRouter } from 'vue-router';
import { usePocketbaseStore } from '@/stores/usePocketbaseStore';
import { useProjectsStore } from '@/stores/useProjectsStore';
import { trackUmamiEvent } from '@jaseeey/vue-umami-plugin';
import useCurrentProjectStore from '@/stores/useCurrentProjectStore';
import type { File_ } from '@/types/files';

export default function useFileSettingsForm() {
  const { confirmDialog } = useConfirm();
  const { pocketbase } = usePocketbaseStore();
  const router = useRouter();
  const { project, currentFile, files } = storeToRefs(useCurrentProjectStore());
  const { projects } = storeToRefs(useProjectsStore());

  const isSubmitting = ref(false);
  const isDeleting = ref(false);
  const name = ref<string>(currentFile.value?.name || '');
  const description = ref<string>(currentFile.value?.description || '');

  const submit = async () => {
    isSubmitting.value = true;

    try {
      const updatedFile = await pocketbase
        .collection('files')
        .update<File_>(currentFile.value?.id || '', {
          name: name.value,
          description: description.value,
        });

      toast.success('File updated successfully');

      trackUmamiEvent('update_file', {
        fileId: currentFile.value?.id,
        fileName: name.value,
        fileDescription: description.value,
        projectId: project.value?.id,
      });

      files.value = files.value.map((file) => {
        if (file.id === updatedFile.id) {
          return updatedFile;
        }
        return file;
      });
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

      trackUmamiEvent('delete_file', {
        fileId: currentFile.value?.id,
        fileName: currentFile.value?.name,
        fileDescription: currentFile.value?.description,
        projectId: project.value?.id,
      });

      files.value = files.value.filter((file) => file.id !== currentFile.value?.id);
      projects.value = projects.value.map((p) => {
        if (project.value!.id === p?.id) {
          return {
            ...p,
            fileCount: p.fileCount - 1,
          };
        }
        return p;
      });
      await router.push(`/projects/${project.value?.id}/files`);
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
