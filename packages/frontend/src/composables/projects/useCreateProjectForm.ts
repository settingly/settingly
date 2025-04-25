import { usePocketbaseStore } from '@/stores/usePocketbaseStore';
import { useProjectsStore } from '@/stores/useProjectsStore';
import type { Project } from '@/types/projects';
import { trackUmamiEvent } from '@jaseeey/vue-umami-plugin';
import { storeToRefs } from 'pinia';
import { ClientResponseError } from 'pocketbase';
import { ref, type Ref } from 'vue';
import { toast } from 'vue-sonner';

export default function useCreateProjectForm(dialogCloser?: Ref<boolean, boolean>) {
  const projectName = ref('');
  const description = ref('');
  const isSubmitting = ref(false);

  const pocketbaseStore = usePocketbaseStore();
  const { user } = storeToRefs(pocketbaseStore);
  const { projects } = storeToRefs(useProjectsStore());

  const submit = async () => {
    isSubmitting.value = true;

    if (!projectName.value.match(/^[a-zA-Z0-9_-]+$/)) {
      toast.error('Project name can only contain letters, numbers, underscores, and dashes.');
      isSubmitting.value = false;
      return;
    }

    try {
      const createdProject = await pocketbaseStore.pocketbase
        .collection('projects')
        .create<Project>({
          name: projectName.value,
          description: description.value,
          user: user.value?.id,
        });

      trackUmamiEvent('create_project', {
        projectName: projectName.value,
        projectDescription: description.value,
        userId: user.value?.id,
        userEmail: user.value?.email,
      });

      toast.success('Project created successfully!');
      if (dialogCloser) {
        dialogCloser.value = false;
      }
      projectName.value = '';
      description.value = '';

      projects.value.push(createdProject);
    } catch (error) {
      if (
        error instanceof ClientResponseError &&
        error.response.data.name.code == 'validation_not_unique'
      ) {
        toast.error('Project name already exists');
        return;
      }
      toast.error((error as Error).message || 'Failed to create project');
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    projectName,
    description,
    isSubmitting,
    submit,
  };
}
