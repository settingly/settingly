export default function useCurrentFileId() {
  const route = useRoute();

  return computed(() => {
    const file = route.query.file as string | string[] | undefined;

    if (!file) {
      return undefined;
    }

    return typeof file === "string" ? file : file.at(0);
  });
}
