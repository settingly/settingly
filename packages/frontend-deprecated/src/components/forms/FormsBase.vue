<template>
  <form
    class="rounded-lg border border-body/20 shadow-sm overflow-hidden my-6"
    @submit.prevent="handleSubmit"
  >
    <div class="flex flex-row justify-between items-center p-6 pb-2">
      <div class="flex flex-col space-y-1.5">
        <h3 class="text-xl font-semibold tracking-tight">{{ title }}</h3>
        <p class="text-sm">
          {{ subtitle }}
        </p>
      </div>
      <slot name="title-action" />
    </div>

    <div class="p-6 space-y-4">
      <slot />
    </div>
  </form>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle: string;
}>();

const emit = defineEmits(['submit']);

const handleSubmit = (event: Event) => {
  event.preventDefault();
  emit('submit');
};
</script>
