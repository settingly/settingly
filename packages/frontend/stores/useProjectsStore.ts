export const useProjectsStore = defineStore("projects", () => {
  const projects = ref<Project[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const lastOrgId = ref<string | null>(null);

  const { organization } = useOrganization();
  const route = useRoute();

  const fetchProjects = async (force: boolean = false) => {
    const orgId = organization.value?.id ?? null;
    if (orgId === lastOrgId.value && !force) return;

    try {
      isLoading.value = true;
      lastOrgId.value = orgId;

      projects.value = await $fetch<Project[]>("/api/v1/internal/projects");
    } catch (err) {
      error.value = `Failed to fetch projects: ${(err as Error).message}`;
      lastOrgId.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  watch(
    () => organization.value?.id,
    async (_) => fetchProjects(),
    { immediate: true }
  );

  const currentProject = computed(() => {
    const id = useCurrentProjectId().value;
    return projects.value.find((p) => p._id === id);
  });

  return {
    projects,
    currentProject,
    isLoading,
    error,
    refetchProjects: fetchProjects,
  };
});
