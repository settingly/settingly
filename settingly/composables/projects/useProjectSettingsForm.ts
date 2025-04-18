import { toast } from "vue-sonner";

export default function useProjectSettingsForm() {
  const projectsStore = useProjectsStore();
  const { currentProject } = storeToRefs(projectsStore);

  const name = ref<string | undefined>(undefined);
  const description = ref<string | undefined>(undefined);
  const isSubmitting = ref(false);

  watch(
    () => currentProject.value,
    (newProject) => {
      if (!newProject) return;

      if (name.value === undefined) name.value = newProject.name;
      if (description.value === undefined)
        description.value = newProject.description;
    }
  );

  const submit = async () => {
    isSubmitting.value = true;

    try {
      await $fetch(`/api/v1/projects/${currentProject.value?._id}`, {
        method: "PATCH",
        body: {
          name: name.value,
          description: description.value,
        },
        onResponse: async ({ response }) => {
          if (response.ok) {
            isSubmitting.value = false;
            toast.success("Project updated successfully!");

            await projectsStore.refetch(true);
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

  return {
    submit,
    name,
    description,
    isSubmitting,
  };
}
