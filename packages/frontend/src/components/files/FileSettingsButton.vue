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
      <button v-if="!isDeleting" type="button" class="icon-button-wrapper" @click="deleteFile">
        <TrashIcon class="w-4 h-4 !text-error" />
      </button>
      <SharedSpinner v-if="isDeleting" />
    </template>

    <form
      @submit.prevent="
        submit().then(() => {
          isUpdatingFile = false;
        })
      "
      class="space-y-3"
    >
      <FormsInput
        type="text"
        placeholder="Enter file name"
        label="File Name"
        v-model="name"
        required
      />
      <p class="text-xs text-gray-500 -mt-2">Allowed Characters: a-z, A-Z, 0-9, -, _</p>

      <FormsInput
        type="text"
        placeholder="Enter description"
        label="Description (Optional)"
        v-model="description"
        required
      />

      <br />

      <div class="flex flex-row justify-end -mt-3 gap-2">
        <div class="flex flex-row items-center gap-2">
          <button v-if="!isSubmitting" class="button-ghost" type="button">Cancel</button>
          <button v-if="!isSubmitting" class="button" type="submit">Save</button>

          <SharedSpinner v-if="isSubmitting" />
        </div>
      </div>
    </form>
  </SharedDialog>
</template>

<script setup lang="ts">
import { SettingsIcon, TrashIcon } from 'lucide-vue-next';
import SharedDialog from '../shared/SharedDialog.vue';
import SharedSpinner from '../shared/SharedSpinner.vue';
import FormsInput from '../forms/FormsInput.vue';
import { storeToRefs } from 'pinia';
import { useFilesStore } from '@/stores/useFilesStore';
import useFileSettingsForm from '@/composables/files/useFileSettingsForm';
import { ref } from 'vue';

const { currentFile } = storeToRefs(useFilesStore());

const { isSubmitting, name, submit, isDeleting, deleteFile, description } = useFileSettingsForm();

const isUpdatingFile = ref<boolean>(false);
</script>
