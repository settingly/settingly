import * as v from "valibot";
import { toast } from "vue-sonner";
import { UpdateFileSchema } from "~/shared/schemas/files";

export default function useFileSettingsForm() {
  const filesStore = useFilesStore();
  const isSubmitting = ref(false);
  const isDeleting = ref(false);

  const { confirmDialog } = useConfirm();

  const { currentFile } = storeToRefs(filesStore);

  const name = ref<string>(currentFile.value?.name || "");
  const enabledEndpoints = ref<("rest" | "graphql")[]>(
    currentFile.value?.enabledEndpoints || []
  );

  watch(
    () => currentFile.value,
    (newFile) => {
      name.value = newFile?.name || "";
      enabledEndpoints.value = newFile?.enabledEndpoints || [];
    },
    { deep: true }
  );

  const submit = async () => {
    isSubmitting.value = true;

    try {
      const body = v.parse(UpdateFileSchema, {
        name: name.value,
        enabledEndpoints: enabledEndpoints.value,
      });

      await $fetch<File_>(
        `/api/v1/internal/projects/${currentFile.value?.projectId}/files/${currentFile.value?._id}`,
        {
          method: "PATCH",
          body: body,
        }
      );

      toast.success("File updated successfully");

      await filesStore.refetchFiles();
    } catch (error) {
      toast.error(
        `Failed to update file: ${parseReadableServerError(
          (error as Error).message
        )}`
      );
    } finally {
      isSubmitting.value = false;
    }
  };

  const deleteFile = async () => {
    isDeleting.value = true;

    if (
      !(await confirmDialog(
        `Are you sure you want to delete the file "${name.value}"? This action cannot be undone.`
      ))
    ) {
      toast.info("File deletion cancelled");
      isDeleting.value = false;
      return;
    }

    try {
      await $fetch<File_>(
        `/api/v1/internal/projects/${currentFile.value?.projectId}/files/${currentFile.value?._id}`,
        {
          method: "DELETE",
        }
      );

      toast.success("File deleted successfully");

      await filesStore.refetchFiles();
      await navigateTo(`/_/${useCurrentProjectId().value}`);
    } catch (error) {
      toast.error(`Failed to delete file: ${(error as Error).message}`);
    } finally {
      isDeleting.value = false;
    }
  };

  return {
    currentFile,
    name,
    enabledEndpoints,
    isSubmitting,
    submit,
    isDeleting,
    deleteFile,
  };
}
