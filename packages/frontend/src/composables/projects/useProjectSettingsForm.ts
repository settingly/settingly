import { useProjectsStore } from '@/stores/useProjectsStore';
import { storeToRefs } from 'pinia';
import { toast } from 'vue-sonner';
import { useConfirm } from '../utils/useConfirm';
import { onMounted, ref, watch } from 'vue';
import { usePocketbaseStore } from '@/stores/usePocketbaseStore';
import { useRouter } from 'vue-router';
import { useTokensStore } from '@/stores/useTokensStore';

export default function useProjectSettingsForm() {
  const projectsStore = useProjectsStore();
  const { currentProject } = storeToRefs(projectsStore);
  const { confirmDialog } = useConfirm();
  const { pocketbase } = usePocketbaseStore();
  const tokensStore = useTokensStore();
  const router = useRouter();

  const name = ref<string | undefined>(undefined);
  const description = ref<string | undefined>(undefined);
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
      await pocketbase.collection('projects').update(currentProject.value!.id, {
        name: name.value,
        description: description.value,
      });
      toast.success('Project updated successfully!');
      await projectsStore.fetchProjects();
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
      await pocketbase.collection('projects').delete(currentProject.value!.id);
      isDeleting.value = false;
      toast.success('Project deleted successfully!');
      await projectsStore.fetchProjects();
      router.push('/projects');
    } catch (error) {
      isDeleting.value = false;
      toast.error((error as Error).message || 'Failed to delete project');
    }
  };

  watch(
    () => currentProject.value,
    async (newProject) => {
      if (!newProject) return;

      if (name.value === undefined) name.value = newProject.name;
      if (description.value === undefined) description.value = newProject.description;

      await tokensStore.fetchTokens();
    },
    { immediate: true },
  );

  onMounted(async () => {
    await projectsStore.fetchProjects();
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
