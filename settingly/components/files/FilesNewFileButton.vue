<template>
  <button @click="isCreatingNewFile = true" class="button">New File</button>
  <SharedDialog
    title="Create New File"
    :open="isCreatingNewFile"
    @close="isCreatingNewFile = false"
  >
    <form @submit.prevent="submit">
      <FormsInput
        type="text"
        placeholder="Enter file name"
        label="File Name"
        required
        v-model="fileName"
      />

      <p class="text-xs mt-2 text-gray-500">
        Allowed Characters: a-z, A-Z, 0-9, -, _
      </p>

      <FormsCheckboxList
        class="mt-4"
        label="Enabled Endpoints"
        :options="['Rest', 'GraphQL']"
        v-model="enabledEndpoints"
      />

      <div class="mt-6 flex flex-row-reverse items-center gap-2">
        <button v-if="!isSubmitting" class="button" type="submit">
          Create
        </button>
        <button v-if="!isSubmitting" class="button-ghost">Cancel</button>
        <SharedSpinner v-if="isSubmitting" />
      </div>
    </form>
  </SharedDialog>
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";
import * as v from "valibot";
import { CreateFileSchema } from "~/shared/schemas/files";

const isCreatingNewFile = ref(false);

const { fileName, enabledEndpoints, isSubmitting, submit } =
  useCreateFileForm();

function useCreateFileForm() {
  const fileName = ref("");
  const enabledEndpoints = ref<string[]>([]);
  const isSubmitting = ref(false);

  const { currentProject } = storeToRefs(useProjectsStore());
  const { refetch: refetchProjects } = useProjectsStore();
  const { refetchFiles } = useFilesStore();

  const submit = async () => {
    isSubmitting.value = true;

    try {
      const body = v.parse(CreateFileSchema, {
        name: fileName.value,
        projectId: currentProject.value?._id,
        enabledEndpoints: enabledEndpoints.value,
      });

      await $fetch<File_>("/api/v1/files", {
        method: "POST",
        body,
      })
        .then(async () => {
          isSubmitting.value = false;
          isCreatingNewFile.value = false;

          toast.success("File created successfully!");

          fileName.value = "";
          enabledEndpoints.value = [];

          await refetchFiles();
        })
        .catch((error) => {
          isSubmitting.value = false;

          toast.error((error as Error).message);
        });
    } catch (error) {
      isSubmitting.value = false;

      toast.error((error as Error).message);
    }
  };

  onMounted(async () => {
    await refetchProjects(true);
  });

  return {
    fileName,
    enabledEndpoints,
    isSubmitting,
    submit,
  };
}
</script>
