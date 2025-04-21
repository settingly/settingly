<template>
  <button
    @click="
      () => {
        reset();
        isCreatingNewToken = true;
      }
    "
    type="button"
    class="text-primary flex flex-row gap-1 items-center"
  >
    <PlusCircleIcon class="w-4 h-4 !text-primary" />
    <span class="text-sm"> Create New Token </span>
  </button>
  <SharedDialog
    title="Create New Token"
    :open="isCreatingNewToken"
    @close="onClose"
  >
    <form
      v-if="generatedToken === null"
      class="flex flex-col gap-4"
      @submit.prevent="submit"
    >
      <FormsInput
        id="tokenName"
        label="Token Name"
        type="text"
        placeholder="Enter token name"
        class="mt-4"
        required
        v-model="name"
      />

      <FormsCheckboxList
        label="Select Permissions"
        :options="TOKEN_PERMISSIONS"
        v-model="permissions"
      />
      <div class="flex flex-row gap-3">
        <button type="submit" class="button">Create</button>
        <button
          type="button"
          class="button-ghost"
          @click="isCreatingNewToken = false"
        >
          Cancel
        </button>
      </div>
    </form>
    <div v-else>
      <p class="text-xs text-gray-500 max-w-md">
        This is your new token. You can only see it once, so store it safely. It
        will be valid for 90 days.
      </p>
      <div class="mt-6">
        <label :for="id" class="block text-sm font-medium text-gray-700">
          Token
        </label>
        <input
          v-model="generatedToken"
          :type="canViewGeneratedToken ? 'text' : 'password'"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-gray-900 text-sm font-medium p-2 border"
        />
        <button
          @click="canViewGeneratedToken = !canViewGeneratedToken"
          class="text-primary flex flex-row gap-1 items-center mt-2"
        >
          <component
            :is="canViewGeneratedToken ? EyeOffIcon : EyeIcon"
            class="w-4 h-4 text-primary"
          />
          <span class="text-sm">
            {{ canViewGeneratedToken ? "Hide" : "Show" }} Token</span
          >
        </button>
        <div class="mt-6 flex flex-row justify-between">
          <button @click="isCreatingNewToken = false" class="button">
            Done
          </button>
          <div class="flex flex-row items-center gap-2">
            <p v-if="wasCopied" class="text-success text-xs">
              Token copied to clipboard!
            </p>
            <button
              type="button"
              @click="copyToken"
              class="icon-button-wrapper"
            >
              <CopyIcon class="w-4 h-4 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </SharedDialog>
</template>

<script setup lang="ts">
import { CopyIcon, PlusCircleIcon, EyeOffIcon, EyeIcon } from "lucide-vue-next";

const isCreatingNewToken = ref(false);

function onClose() {
  isCreatingNewToken.value = false;
  setTimeout(() => {
    reset();
  }, 300);
}

const {
  generatedToken,
  canViewGeneratedToken,
  copyToken,
  wasCopied,
  reset,
  permissions,
  submit,
  name,
} = useCreateTokenForm();
</script>
