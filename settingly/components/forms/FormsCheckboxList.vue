<template>
  <fieldset>
    <label class="block text-sm font-medium text-gray-800">
      {{ label }}
    </label>
    <div class="mt-2 flex flex-col gap-1">
      <div
        v-for="option in options"
        :key="option.toLowerCase()"
        class="flex items-center"
      >
        <input
          v-model="currentValue"
          type="checkbox"
          :id="option"
          :value="option.toLowerCase()"
          class="h-4 w-4 text-primary border-gray-300 rounded accent-primary"
        />
        <label :for="option" class="ml-2 block text-sm text-gray-700">{{
          option
        }}</label>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps<{
  options: string[];
  label: string;
  modelValue?: string[];
}>();

const emit = defineEmits(["update:modelValue"]);

const currentValue = ref<string[]>(props.modelValue || []);

watch(currentValue, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>
