<template>
  <button @click="isCreatingNewProject = true" class="button">New Project</button>
  <SharedDialog
    @close="isCreatingNewProject = false"
    :open="isCreatingNewProject"
    title="Create New Project"
  >
    <form @submit.prevent="async () => await submit()" class="space-y-4">
      <FormsInput
        v-model="projectName"
        type="text"
        placeholder="Enter project name"
        label="Project Name"
        required
      />

      <p class="text-xs text-body leading-tight -mt-2">Allowed Characters: a-z, A-Z, 0-9, -, _</p>

      <FormsInput
        v-model="description"
        type="text"
        placeholder="Enter project description"
        label="Description (Optional)"
      />

      <div class="flex flex-row justify-end gap-2">
        <button v-if="!isSubmitting" class="button-ghost" @click="isCreatingNewProject = false">
          Cancel
        </button>
        <button v-if="!isSubmitting" class="button" type="submit">Create</button>
        <SharedSpinner v-if="isSubmitting" />
      </div></form
  ></SharedDialog>
</template>

<script setup lang="ts">
import useCreateProjectForm from '@/composables/projects/useCreateProjectForm';
import FormsInput from '../forms/FormsInput.vue';
import SharedDialog from '../shared/SharedDialog.vue';
import { ref } from 'vue';
import SharedSpinner from '../shared/SharedSpinner.vue';

const isCreatingNewProject = ref<boolean>(false);

const { projectName, description, isSubmitting, submit } =
  useCreateProjectForm(isCreatingNewProject);
</script>
