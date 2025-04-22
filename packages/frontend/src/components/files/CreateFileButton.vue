<template>
  <button @click="isCreatingNewFile = true" class="button">New File</button>
  <SharedDialog
    title="Create New File"
    :open="isCreatingNewFile"
    @close="
      isCreatingNewFile = false;
      reset();
    "
  >
    <form @submit.prevent="submit" class="space-y-3">
      <FormsInput
        type="text"
        placeholder="Enter file name"
        label="File Name"
        required
        v-model="name"
      />
      <p class="text-xs text-gray-500 -mt-2">Allowed Characters: a-z, A-Z, 0-9, -, _</p>
      <FormsInput
        type="text"
        placeholder="Enter file description"
        label="Description (Optional)"
        v-model="description"
      />

      <div class="mt-6 flex flex-row-reverse items-center gap-2">
        <button v-if="!isSubmitting" class="button" type="submit">Create</button>
        <button v-if="!isSubmitting" class="button-ghost" type="button">Cancel</button>
        <SharedSpinner v-if="isSubmitting" />
      </div>
    </form>
  </SharedDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormsInput from '../forms/FormsInput.vue';
import SharedDialog from '../shared/SharedDialog.vue';
import SharedSpinner from '../shared/SharedSpinner.vue';

import useCreateFileForm from '@/composables/files/useCreateFileForm';

const isCreatingNewFile = ref(false);

const { name, description, isSubmitting, reset, submit } = useCreateFileForm(isCreatingNewFile);
</script>
