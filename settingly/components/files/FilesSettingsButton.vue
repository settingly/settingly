<template>
  <button class="icon-button-wrapper" @click="isUpdatingFile = true">
    <SettingsIcon class="w-4 h-4" />
  </button>
  <SharedDialog
    :title="`Update File: ${currentFile?.name}`"
    :open="isUpdatingFile"
    @close="isUpdatingFile = false"
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
        <button v-if="!isSubmitting" class="button" type="submit">Save</button>
        <button v-if="!isSubmitting" class="button-ghost">Cancel</button>
        <SharedSpinner v-if="isSubmitting" />
      </div>
    </form>
  </SharedDialog>
</template>

<script setup lang="ts">
import { SettingsIcon } from "lucide-vue-next";

const { currentFile } = storeToRefs(useFilesStore());

const isUpdatingFile = ref<boolean>(false);
</script>
