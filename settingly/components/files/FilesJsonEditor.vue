<template>
  <div class="space-y-4">
    <textarea
      v-model="configString"
      @input="updateFromJson"
      class="w-full h-96 p-3 font-mono text-sm rounded-md border border-input focus:border-primary focus:ring-1 focus:ring-primary"
      spellcheck="false"
    >
    </textarea>

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
        <button
          @click="format"
          type="button"
          class="icon-button-wrapper"
          aria-label="Format JSON"
        >
          <SignatureIcon class="h-4 w-4" />
        </button>
      </div>

      <div class="flex flex-row gap-3 items-center">
        <button
          @click="resetToUnsaved"
          type="button"
          class="button bg-error hover:bg-error/90"
        >
          Reset
        </button>
        <button
          @click="save"
          type="button"
          class="button bg-success hover:bg-success/90"
        >
          Save
        </button>
      </div>
    </div>

    <div v-if="jsonError" class="text-sm text-red-500">
      {{ jsonError }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CopyIcon, SignatureIcon } from "lucide-vue-next";
import { toast } from "vue-sonner";
import * as v from "valibot";
import {
  CreateFileContentVersionSchema,
  UpdateFileSchema,
} from "~/shared/schemas/files";

const { refetchFiles } = useFilesStore();
const { currentFile } = storeToRefs(useFilesStore());

const jsonError = ref("");
const configString = ref(ref(JSON.stringify({}, null, 2)));

function format() {
  try {
    const parsed = JSON.parse(configString.value);
    configString.value = JSON.stringify(parsed, null, 2);
    jsonError.value = "";
    toast.success("JSON formatted successfully");
  } catch (e: any) {
    jsonError.value = "Invalid JSON: " + e.message;
  }
}

// Update the config when JSON changes
const updateFromJson = () => {
  try {
    const parsed = JSON.parse(configString.value);
    jsonError.value = "";
  } catch (e: any) {
    jsonError.value = "Invalid JSON: " + e.message;
  }
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(configString.value).then(() => {
    toast.success("Copied to clipboard");
  });
};

const resetToUnsaved = () => {
  if (currentFile.value) {
    confirm("Are you sure you want to reset the file to its unsaved state?") &&
      (configString.value = getNewestFileVersion(currentFile.value).content);
  }
};

const save = async () => {
  if (currentFile.value) {
    // format the JSON before saving
    let formattedJson = "";

    try {
      const parsed = JSON.parse(configString.value);
      formattedJson = JSON.stringify(parsed, null, 2);
    } catch (e: any) {
      toast.error("Invalid JSON: " + e.message);
      return;
    }

    if (getNewestFileVersion(currentFile.value).content === formattedJson) {
      toast.info("No changes detected");
      return;
    }

    try {
      const body = v.parse(UpdateFileSchema, {
        content: formattedJson,
      });

      await $fetch<File_>(`/api/v1/files/${currentFile.value._id}`, {
        method: "PATCH",
        body,
      });
      toast.success("File updated successfully");

      await refetchFiles();
    } catch (e: any) {
      toast.error(e.message);
    }
  }
};

watch(
  () => currentFile.value,
  (newFile) => {
    if (newFile) {
      configString.value = getNewestFileVersion(newFile).content;
    }
  },
  { immediate: true, deep: true }
);
</script>
