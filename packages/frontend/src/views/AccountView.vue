<template>
  <div class="max-w-2xl mx-auto p-4">
    <FormsBase
      title="Your Account"
      subtitle="Manage your Settingly account. But please don't leave us 🥺"
    >
      <FormsInput v-model="email" type="email" placeholder="Email" label="Email Address" />
      <div class="flex flex-row justify-end">
        <button v-if="!isChangingEmail" class="button" type="button" @click="changeEmail">
          Change Email
        </button>
        <SharedSpinner v-else />
      </div>

      <hr />

      <div
        class="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-0 justify-between mb-8 lg:mb-3"
      >
        <p class="text-sm">Change your password by requesting a password reset link.</p>
        <button
          class="button bg-error"
          type="button"
          @click="resetPassword"
          v-if="!isResettingPassword"
        >
          Reset Password
        </button>
        <SharedSpinner v-else />
      </div>
      <div class="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-0 justify-between">
        <p class="text-sm">Delete your account. This action is irreversible.</p>
        <button class="button bg-error" @click="deleteAccount" type="button">Delete Account</button>
      </div>
    </FormsBase>
  </div>
</template>

<script setup lang="ts">
import FormsBase from '@/components/forms/FormsBase.vue';
import FormsInput from '@/components/forms/FormsInput.vue';
import SharedSpinner from '@/components/shared/SharedSpinner.vue';
import useAccountSettingsForm from '@/composables/auth/useAccountSettingsForm';
import { usePocketbaseStore } from '@/stores/usePocketbaseStore';
import { useHead } from '@unhead/vue';
import { storeToRefs } from 'pinia';

const { email, changeEmail, isChangingEmail, deleteAccount, isResettingPassword, resetPassword } =
  useAccountSettingsForm();

const { user } = storeToRefs(usePocketbaseStore());

useHead({
  title: user.value?.email + ' - Settingly',
});
</script>
