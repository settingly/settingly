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
      <SharedProtect permission="org:files:delete">
        <button type="button" class="icon-button-wrapper" @click="deleteFile">
          <TrashIcon class="w-4 h-4 !text-error" />
        </button>
      </SharedProtect>
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

const { isSubmitting, name, submit, isDeleting, deleteFile } =
  useFileSettingsForm();

const isUpdatingFile = ref<boolean>(false);
</script>
