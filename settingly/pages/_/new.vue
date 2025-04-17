<template>
  <div class="max-w-2xl mx-auto p-4">
    <FormsBase
      @submit.prevent="submit"
      title="New Project"
      subtitle="Create a new project to start managing your configurations and settings."
      :is-submitting="isSubmitting"
      submit-button-text="Create Project"
      :show-cancel-button="true"
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
    </FormsBase>
  </div>
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

const { user } = useUser();
</script>
