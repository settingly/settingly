import * as v from "valibot";
import { toast } from "vue-sonner";
import { UpdateFileSchema } from "~/shared/schemas/files";

export default function useUpdateFileForm() {
  const filesStore = useFilesStore();
  const isSubmitting = ref(false);

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
        id: currentFile.value?._id,
        name: name.value,
        enabledEndpoints: enabledEndpoints.value,
      });

      await $fetch<File_>("/api/v1/files/update", {
        method: "PATCH",
        body: body,
      });

      toast.success("File updated successfully");

      await filesStore.refetchFiles();
    } catch (error) {
      toast.error(`Failed to update file: ${(error as Error).message}`);
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    currentFile,
    name,
    enabledEndpoints,
    isSubmitting,
    submit,
  };
}
