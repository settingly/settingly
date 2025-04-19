<template>
  <button class="icon-button-wrapper" @click="isUpdatingFile = true">
    <SettingsIcon class="w-4 h-4" />
  </button>
  <SharedDialog
    :title="`Update File: ${currentFile?.name}`"
    :open="isUpdatingFile"
    @close="isUpdatingFile = false"
  >
    <template #title-action>
      <button type="button" class="icon-button-wrapper" @click="deleteFile">
        <TrashIcon class="w-4 h-4 !text-error" />
      </button>
    </template>

    <form
      @submit.prevent="
        submit().then(() => {
          isUpdatingFile = false;
        })
      "
    >
      <FormsInput
        type="text"
        placeholder="Enter file name"
        label="File Name"
        v-model="name"
        required
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

      <p
        class="text-xs text-error max-w-md mt-2"
        v-if="enabledEndpoints.length === 0"
      >
        It looks like neither the Rest nor GraphQL endpoints are enabled for
        this file. This means that the file will not be accessible via any
        endpoint.
      </p>

      <br />

      <div class="flex flex-row justify-end mt-6 gap-2">
        <div class="flex flex-row items-center gap-2">
          <button v-if="!isSubmitting" class="button-ghost">Cancel</button>
          <button v-if="!isSubmitting" class="button" type="submit">
            Save
          </button>

          <SharedSpinner v-if="isSubmitting" />
        </div>
      </div>
    </form>
  </SharedDialog>
</template>

<script setup lang="ts">
import { SettingsIcon, TrashIcon } from "lucide-vue-next";

const { currentFile } = storeToRefs(useFilesStore());

const { isSubmitting, name, enabledEndpoints, submit, isDeleting, deleteFile } =
  useFileSettingsForm();

const isUpdatingFile = ref<boolean>(false);
</script>
