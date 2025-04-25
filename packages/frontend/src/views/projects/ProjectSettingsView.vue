<template>
  <div class="max-w-2xl mx-auto p-4">
    <FormsBase
      :blurred="false"
      @submit="submit"
      title="Settings"
      subtitle="Configure and customize your project settings to match your
        requirements."
      :is-submitting="isSubmitting"
      :show-submit-button="false"
      :show-cancel-button="false"
      :hide-spinner="true"
    >
      <template #title-action>
        <button class="icon-button-wrapper" type="button" @click="deleteProject">
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

      <div v-if="!isSubmitting" class="pt-0 flex justify-end gap-2">
        <RouterLink :to="'/_'" class="button-ghost"> Cancel </RouterLink>
        <button :disabled="isSubmitting" type="submit" class="button">Save</button>
      </div>
      <div v-else class="flex justify-end">
        <SharedSpinner />
      </div>

      <div class="mt-6">
        <div>
          <h3 class="block text-sm font-medium text-gray-700">Tokens</h3>
          <p class="text-xs text-gray-500 max-w-md leading-tight">
            Please ensure the confidentiality of the token, as it is critical for authenticating
            your requests to the API.
          </p>
        </div>

        <TokensTable />
        <CreateTokenButton />
      </div>
    </FormsBase>
  </div>
</template>

<script setup lang="ts">
import FormsBase from '@/components/forms/FormsBase.vue';
import FormsInput from '@/components/forms/FormsInput.vue';
import SharedSpinner from '@/components/shared/SharedSpinner.vue';
import CreateTokenButton from '@/components/tokens/CreateTokenButton.vue';
import TokensTable from '@/components/tokens/TokensTable.vue';
import useProjectSettingsForm from '@/composables/projects/useProjectSettingsForm';
import useCurrentProjectStore from '@/stores/useCurrentProjectStore';
import { useHead } from '@unhead/vue';
import { TrashIcon } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';

const { name, description, isSubmitting, submit, deleteProject } = useProjectSettingsForm();
const { project } = storeToRefs(useCurrentProjectStore());

useHead(() => ({
  title: `${project.value?.name} - Settingly Project Settings`,
}));
</script>
