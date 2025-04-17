export default function useCurrentProjectId() {
  const route = useRoute();

  return computed(() => {
    const projectId = route.params.projectId;

    if (!projectId) {
      return undefined;
    }

    return projectId.at(0);
  });
}
