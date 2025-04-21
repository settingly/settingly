<template>
  <fieldset>
    <label class="block text-sm font-medium text-gray-800" v-if="label">
      {{ label }}
    </label>
    <div class="mt-2 flex flex-col gap-1">
      <div v-for="option in options" :key="option.toLowerCase()" class="flex items-center">
        <input
          v-model="currentValue"
          type="checkbox"
          :id="option"
          :value="option.toLowerCase()"
          class="h-4 w-4 text-primary border-gray-300 rounded accent-primary"
        />
        <label :for="option" class="ml-2 block text-sm text-gray-700">
          {{ prettifyMachineString(option) }}
        </label>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import prettifyMachineString from '@/utils/prettify-machine-string';
import { defineProps, defineEmits, ref, watch } from 'vue';

interface Props {
  options: string[];
  label?: string;
  modelValue?: string[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
}>();

const currentValue = ref<string[]>(props.modelValue ?? []);

watch(currentValue, (newVal) => {
  emit('update:modelValue', newVal);
});

watch(
  () => props.modelValue,
  (newVal) => {
    currentValue.value = newVal ?? [];
  },
);
</script>
