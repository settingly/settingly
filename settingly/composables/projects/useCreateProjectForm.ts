import { toast } from "vue-sonner";

export default function useCreateProjectForm() {
  const projectName = ref("");
  const description = ref("");

  const isSubmitting = ref(false);

  const { user } = useUser();
  const { organization } = useOrganization();

  const selectedOrganizationId = ref(
    organization.value ? organization.value.id : user.value?.id
  );

  watch([organization, user], ([newOrganization, newUser]) => {
    selectedOrganizationId.value = newOrganization
      ? newOrganization.id
      : newUser?.id;
  });
  const organizationId = computed({
    get: () => {
      return selectedOrganizationId.value;
    },
    set: (value) => {
      selectedOrganizationId.value = value;
    },
  });

  const submit = async () => {
    isSubmitting.value = true;

    try {
      await $fetch("/api/v1/projects", {
        method: "POST",
        body: {
          name: projectName.value,
          description: description.value,
          organization: {
            id: organizationId.value,
            type: getOrganizationType(organizationId.value as string),
          } as ProjectOrganization,
        },
        onResponse: async ({ response }) => {
          if (response.ok) {
            isSubmitting.value = false;
            toast.success("Project created successfully!");
            await useProjectsStore().refetchProjects(true);

            projectName.value = "";
            description.value = "";
            selectedOrganizationId.value = organization.value
              ? organization.value.id
              : user.value?.id;
          }
        },
      });
    } catch (error) {
      isSubmitting.value = false;
      toast.error(
        parseReadableServerError(
          (error as Error).message || "Failed to create project"
        )
      );
    }
  };

  const organizationOptions = computed(() => {
    const realOrganizations = user.value?.organizationMemberships.map((org) => {
      return {
        label: org.organization.name,
        value: org.organization.id,
        isOrganization: true,
      };
    });

    const userOrganization = {
      label: "Personal",
      value: user.value?.id as string,
      isOrganization: false,
    };

    return [...(realOrganizations ?? []), userOrganization];
  });

  return {
    projectName,
    description,
    isSubmitting,
    organizationId,
    organizationOptions,
    submit,
  };
}
