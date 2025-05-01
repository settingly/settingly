<template>
  <div class="space-y-4">
    <textarea
      v-model="configString"
      @input="updateFromJson"
      class="w-full h-96 p-3 font-mono text-sm rounded-md border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary resize-none"
      spellcheck="false"
    >
    </textarea>

    <p class="text-xs text-body -mt-5">
      Do not store sensitive information in configuration files.
    </p>

    <div class="flex flex-row justify-between">
      <div class="flex flex-row gap-3 items-center">
        <button
          @click="copyToClipboard"
          type="button"
          class="icon-button-wrapper"
          aria-label="Copy to clipboard"
        >
          <CopyIcon class="h-4 w-4" />
        </button>
        <button @click="format" type="button" class="icon-button-wrapper" aria-label="Format JSON">
          <SignatureIcon class="h-4 w-4" />
        </button>
      </div>

      <div class="flex flex-row gap-3 items-center">
        <button @click="resetToUnsaved" type="button" class="button bg-error hover:bg-error/90">
          Reset
        </button>
        <button
          v-if="!isSaving"
          @click="save"
          type="button"
          class="button bg-success hover:bg-success/90"
        >
          Save
        </button>
        <SharedSpinner v-if="isSaving" />
      </div>
    </div>

    <div v-if="jsonError" class="text-sm text-red-500">
      {{ jsonError }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import useJsonFileEditor from '@/composables/files/useJsonFileEditor';
import { CopyIcon, SignatureIcon } from 'lucide-vue-next';
import SharedSpinner from '../shared/SharedSpinner.vue';

const { mocked } = defineProps({
  mocked: {
    type: Boolean,
    default: false,
  },
});

const {
  jsonError,
  resetToUnsaved,
  save,
  format,
  copyToClipboard,
  configString,
  updateFromJson,
  isSaving,
} = useJsonFileEditor(mocked);
</script>
