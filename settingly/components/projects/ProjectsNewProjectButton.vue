<template>
  <button @click="isCreatingNewProject = true" class="button">
    New Project
  </button>
  <SharedDialog
    @close="isCreatingNewProject = false"
    :open="isCreatingNewProject"
    title="Create New Project"
  >
    <form
      @submit.prevent="
        async () => await submit().then(() => (isCreatingNewProject = false))
      "
      class="space-y-4"
    >
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
        <button
          v-if="!isSubmitting"
          class="button-ghost"
          @click="isCreatingNewProject = false"
        >
          Cancel
        </button>
        <button v-if="!isSubmitting" class="button" type="submit">
          Create
        </button>
        <SharedSpinner v-if="isSubmitting" />
      </div></form
  ></SharedDialog>
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
