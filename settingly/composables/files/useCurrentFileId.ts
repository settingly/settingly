export default function useCurrentFileId() {
  const route = useRoute();

  return computed(() => {
    const fileId = route.params.fileId;

    if (!fileId) {
      return undefined;
    }

    return fileId.at(0);
  });
}
