<template>
  <div class="max-w-2xl mx-auto p-4">
    <FormsBase
      :blurred="false"
      @submit.prevent="submit"
      title="Settings"
      subtitle="Configure and customize your project settings to match your
        requirements."
      :is-submitting="isSubmitting"
      :show-submit-button="false"
      :show-cancel-button="false"
      :hide-spinner="true"
    >
      <template #title-action>
        <button
          class="icon-button-wrapper"
          type="button"
          @click="deleteProject"
        >
          <TrashIcon class="w-4 h-4" style="color: #dc2626 !important" />
        </button>
      </template>

      <FormsInput
        v-model="name"
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

      <p class="text-xs text-gray-500 max-w-md">
        Due to security reasons, the project organization cannot be changed
        after the project has been created. If you need to change the
        organization, please contact us at
        <NuxtLink
          to="mailto:support@settingly.xyz"
          class="text-primary hover:underline"
        >
          support@settingly.xyz</NuxtLink
        >.
      </p>

      <div v-if="!isSubmitting" class="pt-0 flex justify-end gap-2">
        <NuxtLink :to="'/_'" class="button-ghost"> Cancel </NuxtLink>
        <button :disabled="isSubmitting" type="submit" class="button">
          Save
        </button>
      </div>
      <div v-else class="flex justify-end">
        <SharedSpinner />
      </div>

      <div class="mt-6">
        <div>
          <h3 class="block text-sm font-medium text-gray-700">Access Tokens</h3>
          <p class="text-xs text-gray-500 max-w-md">
            Please ensure the confidentiality of the access token, as it is
            critical for authenticating your requests to the API.
          </p>
        </div>

        <ProjectsAccessTokensTable />
        <ProjectsCreateAccessTokenButton />
      </div>
    </FormsBase>
  </div>
</template>

<script setup lang="ts">
import { Trash, TrashIcon } from "lucide-vue-next";

const { name, description, isSubmitting, submit, deleteProject } =
  useProjectSettingsForm();
</script>
