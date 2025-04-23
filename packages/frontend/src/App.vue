<template>
  <SharedConfirmDialog
    :open="isOpen"
    :title="title"
    :message="message"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  />
  <Toaster :rich-colors="true" />
  <div class="flex flex-col min-h-screen font-yaldevi">
    <LayoutNavbar />

    <main class="flex-grow">
      <RouterView />
    </main>

    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
import { Toaster } from 'vue-sonner';
import LayoutNavbar from './components/layout/LayoutNavbar.vue';
import LayoutFooter from './components/layout/LayoutFooter.vue';
import SharedConfirmDialog from './components/shared/SharedConfirmDialog.vue';
import { useConfirm } from './composables/utils/useConfirm';
import { usePocketbaseStore } from './stores/usePocketbaseStore';
import { onMounted } from 'vue';
import { captureException } from '@sentry/vue';
import { useRouter } from 'vue-router';

const { isOpen, title, message, handleCancel, handleConfirm } = useConfirm();
const { pocketbase } = usePocketbaseStore();
const router = useRouter();

onMounted(async () => {
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
</script>
