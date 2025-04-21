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
    <LayoutWarningBanner />

    <main class="flex-grow">
      <RouterView />
    </main>

    <LayoutFooter />

    <!-- <LayoutFooter /> -->
  </div>
</template>

<script setup lang="ts">
import { Toaster } from 'vue-sonner';
import LayoutNavbar from './components/layout/LayoutNavbar.vue';
import LayoutFooter from './components/layout/LayoutFooter.vue';
import LayoutWarningBanner from './components/layout/LayoutWarningBanner.vue';
import SharedConfirmDialog from './components/shared/SharedConfirmDialog.vue';
import { useConfirm } from './composables/utils/useConfirm';

const { isOpen, title, message, handleCancel, handleConfirm } = useConfirm();
</script>
