<template>
  <button @click="isCreatingNewProject = true" class="button">
    New Project
  </button>
  <SharedDialog
    @close="isCreatingNewProject = false"
    :open="isCreatingNewProject"
    title="Create New Project"
  >
    <form @submit.prevent="submit" class="space-y-4">
      <FormsInput
        v-model="projectName"
        type="text"
        placeholder="Enter project name"
        label="Project Name"
        required
      />

      <FormsInput
        v-model="description"
        type="text"
        placeholder="Enter project description"
        label="Description (Optional)"
      />

      <FormsSingleSelect
        label="Organization"
        :options="organizationOptions"
        v-model="organizationId"
      />
      <div class="flex flex-row justify-end gap-2">
        <button class="button-ghost" @click="isCreatingNewProject = false">
          Cancel
        </button>
        <button class="button" type="submit">Create</button>
      </div>
    </form></SharedDialog
  >
</template>

<script setup lang="ts">
const {
  projectName,
  description,
  organizationId,
  isSubmitting,
  organizationOptions,
  submit,
} = useCreateProjectForm();

const isCreatingNewProject = ref<boolean>(false);
</script>
