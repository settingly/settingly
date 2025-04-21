<template>
  <Toaster :rich-colors="true" />
  <SharedConfirmDialog
    :open="isOpen"
    :title="title"
    :message="message"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  />

  <div class="font-yaldevi" id="nuxt">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { Toaster } from "vue-sonner";

const { organization } = useOrganization();

const { isOpen, title, message, handleConfirm, handleCancel } = useConfirm();

watch(
  () => organization.value,
  async (newValue, oldValue) => {
    if (typeof oldValue !== "undefined" && oldValue?.id != newValue?.id) {
      await navigateTo("/_");
    }
  }
);
</script>
