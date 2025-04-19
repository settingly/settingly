import { toast } from "vue-sonner";

export default function useProjectSettingsForm() {
  const projectsStore = useProjectsStore();
  const { currentProject } = storeToRefs(projectsStore);
  const { confirmDialog } = useConfirm();

  const name = ref<string | undefined>(undefined);
  const description = ref<string | undefined>(undefined);
  const isSubmitting = ref(false);
  const isDeleting = ref(false);

  const submit = async () => {
    isSubmitting.value = true;

    try {
      await $fetch(`/api/v1/internal/projects/${currentProject.value?._id}`, {
        method: "PATCH",
        body: {
          name: name.value,
          description: description.value,
        },
        onResponse: async ({ response }) => {
          if (response.ok) {
            isSubmitting.value = false;
            toast.success("Project updated successfully!");

            await projectsStore.refetchProjects(true);
          }
        },
      });
    } catch (error) {
      isSubmitting.value = false;
      toast.error(
        parseReadableServerError(
          (error as Error).message || "Failed to update project"
        )
      );
    }
  };

  const deleteProject = async () => {
    isDeleting.value = true;

    const isConfirmed = await confirmDialog(
      "Are you sure you want to delete this project? This action cannot be undone.",
      "Delete Project"
    );

    if (!isConfirmed) {
      isDeleting.value = false;
      return;
    }

    try {
      await $fetch(`/api/v1/internal/projects/${currentProject.value?._id}`, {
        method: "DELETE",
        onResponse: async ({ response }) => {
          if (response.ok) {
            isDeleting.value = false;
            toast.success("Project deleted successfully!");

            await projectsStore.refetchProjects(true);

            await navigateTo("/_");
          }
        },
      });
    } catch (error) {
      isDeleting.value = false;
      toast.error(
        parseReadableServerError(
          (error as Error).message || "Failed to delete project"
        )
      );
    }
  };

  watch(
    () => currentProject.value,
    (newProject) => {
      if (!newProject) return;

      if (name.value === undefined) name.value = newProject.name;
      if (description.value === undefined)
        description.value = newProject.description;
    }
  );

  onMounted(async () => {
    await projectsStore.refetchProjects(true);
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
