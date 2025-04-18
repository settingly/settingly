<template>
  <form class="rounded-lg border shadow-sm overflow-hidden my-6">
    <div class="flex flex-row justify-between items-center p-6 pb-2">
      <div class="flex flex-col space-y-1.5">
        <h3 class="text-xl font-semibold tracking-tight">{{ title }}</h3>
        <p class="text-sm">
          {{ subtitle }}
        </p>
      </div>
      <slot name="title-action" />
    </div>

    <div
      class="p-6 space-y-4"
      :class="{ 'filter blur-sm pointer-events-none': blurred }"
    >
      <slot />
    </div>

    <!-- Form Actions -->
    <div
      v-if="!isSubmitting"
      class="p-6 pt-0 flex justify-end gap-2"
      :class="{ 'filter blur-sm pointer-events-none': blurred }"
    >
      <NuxtLink
        v-if="showCancelButton"
        :to="cancelButtonRoute || '/_'"
        class="button-ghost"
      >
        Cancel
      </NuxtLink>
      <button
        :disabled="isSubmitting"
        type="submit"
        class="button"
        v-if="
          typeof showSubmitButton !== 'undefined' && showSubmitButton !== false
        "
      >
        {{ submitButtonText }}
      </button>
    </div>
    <div v-else-if="!hideSpinner" class="p-6 pt-0 flex justify-end gap-2">
      <SharedSpinner />
    </div>
  </form>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  subtitle: string;
  isSubmitting: boolean;
  submitButtonText?: string;
  showSubmitButton?: boolean;
  showCancelButton?: boolean;
  cancelButtonRoute?: string;
  hideSpinner?: boolean;
  blurred?: boolean;
}>();

onMounted(() => {
  !props.showCancelButton &&
    props.cancelButtonRoute &&
    props.cancelButtonRoute.length > 0 &&
    console.warn(
      "cancelButtonRoute will not be used because showCancelButton is false"
    );

  !props.showSubmitButton &&
    props.submitButtonText &&
    props.submitButtonText.length > 0 &&
    console.warn(
      "submitButtonText will not be used because showSubmitButton is false"
    );
});
</script>
