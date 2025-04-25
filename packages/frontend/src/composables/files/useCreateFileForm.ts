import { usePocketbaseStore } from '@/stores/usePocketbaseStore';

import { ref, type Ref } from 'vue';
import { toast } from 'vue-sonner';
import { ClientResponseError } from 'pocketbase';
import { useProjectsStore } from '@/stores/useProjectsStore';
import { storeToRefs } from 'pinia';
import { trackUmamiEvent } from '@jaseeey/vue-umami-plugin';
import type { File_, FileVersion } from '@/types/files';
import useCurrentProjectStore from '@/stores/useCurrentProjectStore';

export default function useCreateFileForm(dialogCloser: Ref<boolean, boolean>) {
  const name = ref('');
  const description = ref('');
  const isSubmitting = ref(false);

  const { files, project } = storeToRefs(useCurrentProjectStore());
  const { projects } = storeToRefs(useProjectsStore());
  const { pocketbase } = usePocketbaseStore();

  const submit = async () => {
    isSubmitting.value = true;

    try {
      const createdFile = await pocketbase.collection('files').create<File_>({
        name: name.value,
        description: description.value,
        project: project.value?.id,
      });

      const createdVersion = await pocketbase.collection('file_versions').create<FileVersion>({
        file: createdFile.id,
        content: {
          hello: 'world',
        },
      });

      files.value.push({
        ...createdFile,
        versions: [createdVersion],
      });

      projects.value = projects.value.map((p) => {
        if (project.value!.id === p?.id) {
          return {
            ...p,
            fileCount: p.fileCount + 1,
          };
        }
        return p;
      });

      trackUmamiEvent('create_file', {
        fileId: createdFile.id,
        fileName: createdFile.name,
        fileDescription: createdFile.description,
        projectId: project.value?.id,
        projectName: project.value?.name,
      });

      toast.success('File created successfully!');

      if (dialogCloser) {
        dialogCloser.value = false;
      }
      reset();
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
