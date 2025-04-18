<template>
  <TransitionRoot appear :show="open" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <div class="flex flex-row items-center justify-between">
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-700"
                >
                  {{ title }}
                </DialogTitle>
                <div v-if="titleAction" class="flex items-center">
                  <button
                    @click="emit('titel-action-clicked')"
                    class="icon-button-wrapper"
                  >
                    <component
                      :is="titleAction?.icon"
                      :class="titleAction?.style"
                    />
                  </button>
                </div>
              </div>
              <div class="mt-2">
                <slot />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const { open } = defineProps<{
  title: string;
  open: boolean;
  titleAction?: {
    icon: object;
    style?: string;
  };
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "titel-action-clicked"): void;
}>();

function closeModal() {
  emit("close");
}
</script>
