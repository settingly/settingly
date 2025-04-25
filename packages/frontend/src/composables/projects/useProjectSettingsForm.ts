import { useProjectsStore } from '@/stores/useProjectsStore';
import { storeToRefs } from 'pinia';
import { toast } from 'vue-sonner';
import { useConfirm } from '../utils/useConfirm';
import { onMounted, ref, watch } from 'vue';
import { usePocketbaseStore } from '@/stores/usePocketbaseStore';
import { useRouter } from 'vue-router';
import { trackUmamiEvent } from '@jaseeey/vue-umami-plugin';
import useCurrentProjectStore from '@/stores/useCurrentProjectStore';
import type { Project } from '@/types/projects';

export default function useProjectSettingsForm() {
  const { confirmDialog } = useConfirm();
  const { project } = storeToRefs(useCurrentProjectStore());
  const { reset: resetProject } = useCurrentProjectStore();
  const { projects } = storeToRefs(useProjectsStore());
  const { pocketbase } = usePocketbaseStore();
  const router = useRouter();

  const name = ref<null | string>(project.value?.name || null);
  const description = ref<null | string>(project.value?.description || null);
  const isSubmitting = ref(false);
  const isDeleting = ref(false);

  const submit = async () => {
    isSubmitting.value = true;

    if (!name.value?.match(/^[a-zA-Z0-9_-]+$/)) {
      toast.error('Project name can only contain letters, numbers, underscores, and dashes.');
      isSubmitting.value = false;
      return;
    }

    try {
      const updatedProject = await pocketbase
        .collection('projects')
        .update<Project>(project.value!.id, {
          name: name.value,
          description: description.value,
        });
      toast.success('Project updated successfully!');

      projects.value = projects.value.map((p) => {
        if (p.id === project.value?.id) {
          return updatedProject;
        }
        return p;
      });

      project.value = updatedProject;
    } catch (error) {
      toast.error((error as Error).message || 'Failed to update project');
    } finally {
      isSubmitting.value = false;
    }
  };

  const deleteProject = async () => {
    isDeleting.value = true;

    const isConfirmed = await confirmDialog(
      'Are you sure you want to delete this project? This action cannot be undone.',
      'Delete Project',
    );

    if (!isConfirmed) {
      isDeleting.value = false;
      return;
    }

    try {
      await pocketbase.collection('projects').delete(project.value!.id);
      isDeleting.value = false;
      toast.success('Project deleted successfully!');

      trackUmamiEvent('delete_project', {
        projectId: project.value?.id,
        projectName: project.value?.name,
        projectDescription: project.value?.description,
      });

      projects.value = projects.value.filter((p) => p.id !== project.value?.id);
      resetProject();

      router.push('/projects');
    } catch (error) {
      isDeleting.value = false;
      toast.error((error as Error).message || 'Failed to delete project');
    }
  };

  watch(project, (newProject) => {
    if (!newProject) {
      return;
    }
    name.value = newProject?.name || null;
    description.value = newProject?.description || null;
  });

  return {
    submit,
    name,
    description,
    isSubmitting,
    isDeleting,
    deleteProject,
  };
}
