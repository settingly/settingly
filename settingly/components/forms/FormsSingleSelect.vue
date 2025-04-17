<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>

    <select
      v-model="selectedValue"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-gray-900 text-sm font-medium p-2 border"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
        :selected="index === selectedIndex"
        @click="selectedValue = option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  options: {
    type: Array<{
      label: string;
      value: string | number;
    }>,
    default: () => [],
  },
  selectedIndex: {
    type: Number,
    default: 0,
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "Label",
  },

  required: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: () => Math.random().toString(36).substring(2, 10),
  },
});

const emit = defineEmits(["update:modelValue"]);

const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
