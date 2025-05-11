<template>
  <SharedConfirmDialog
    :open="isOpen"
    :title="title"
    :message="message"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  />
  <Toaster :rich-colors="true" />
  <div class="flex flex-col min-h-screen font-yaldevi" v-if="isDesktop">
    <LayoutNavbar />

    <main class="flex-grow">
      <RouterView />
    </main>

    <LayoutFooter />
  </div>
  <div class="flex flex-col min-h-screen font-yaldevi justify-center items-center" v-else>
    <div class="text-center mx-3">
      <span
        class="text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-primary to-secondary"
        >Sorry</span
      >
      <p class="text-lg mt-3">
        Settingly is only available on desktop. Please visit our website on a desktop device to use
        Settingly.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Toaster } from 'vue-sonner';
import LayoutNavbar from './components/layout/LayoutNavbar.vue';
import LayoutFooter from './components/layout/LayoutFooter.vue';
import SharedConfirmDialog from './components/shared/SharedConfirmDialog.vue';
import { useConfirm } from './composables/utils/useConfirm';
import { usePocketbaseStore } from './stores/usePocketbaseStore';
import { onMounted, onUnmounted, ref } from 'vue';
import { captureException } from '@sentry/vue';
import { useRouter } from 'vue-router';

const isDesktop = ref(false);

const { isOpen, title, message, handleCancel, handleConfirm } = useConfirm();
const { pocketbase } = usePocketbaseStore();
const router = useRouter();

function handleResize() {
  isDesktop.value = window.innerWidth > 1024;
}

onMounted(async () => {
  window.addEventListener('resize', handleResize);
  handleResize();

  if (!isDesktop.value) return;

  try {
    await pocketbase.health.check();
  } catch (error) {
    await router.push('/offline');
    captureException(error, {
      extra: {
        message: 'Error checking Pocketbase health',
        error,
      },
    });
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
