import { toast } from "vue-sonner";

export default defineNuxtRouteMiddleware(async (to) => {
  const { refetchFiles } = useFilesStore();

  const fileId = to.params.fileId?.at(0) as string;
  const projectId = useCurrentProjectId();

  await refetchFiles();

  const { files } = storeToRefs(useFilesStore());

  if (!files.value.find((file: File_) => file._id === fileId)) {
    toast.warning("The file you are looking for does not exist");
    return navigateTo(`/_/${projectId.value}`);
  }
});
