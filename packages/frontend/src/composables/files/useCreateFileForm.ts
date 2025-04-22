import { useFilesStore } from '@/stores/useFilesStore';
import { usePocketbaseStore } from '@/stores/usePocketbaseStore';

import { ref, type Ref } from 'vue';
import { toast } from 'vue-sonner';
import { ClientResponseError } from 'pocketbase';
import { useProjectsStore } from '@/stores/useProjectsStore';
import { storeToRefs } from 'pinia';

export default function useCreateFileForm(dialogCloser: Ref<boolean, boolean>) {
  const name = ref('');
  const description = ref('');
  const isSubmitting = ref(false);

  const { fetchFiles } = useFilesStore();
  const { pocketbase } = usePocketbaseStore();
  const { currentProject } = storeToRefs(useProjectsStore());

  const submit = async () => {
    isSubmitting.value = true;

    try {
      const createdFile = await pocketbase.collection('files').create({
        name: name.value,
        description: description.value,
        project: currentProject.value?.id,
      });

      await pocketbase.collection('file_versions').create({
        file: createdFile.id,
        content: {
          hello: 'world',
        },
      });

      toast.success('File created successfully!');
      if (dialogCloser) {
        dialogCloser.value = false;
      }
      reset();

      await fetchFiles();
    } catch (error) {
      if (
        error instanceof ClientResponseError &&
        error.response.data.name.code == 'validation_not_unique'
      ) {
        toast.error('File name already exists');
        return;
      }
      toast.error((error as Error).message || 'Failed to create file');
    } finally {
      isSubmitting.value = false;
    }
  };

  const reset = () => {
    name.value = '';
    description.value = '';
    isSubmitting.value = false;
  };

  return {
    name,
    description,
    isSubmitting,
    submit,
    reset,
  };
}
