<template>
  <div class="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 my-24">
    <FormsBase
      title="Reset your password"
      subtitle="Enter your email and we'll send you a link to reset your password."
      @submit="submit"
    >
      <FormsInput
        :required="true"
        label="Email"
        placeholder="Email address"
        v-model="email"
        class="-mt-3"
      />
      <div class="flex flex-row justify-end items-center -mt-2">
        <p class="text-body text-xs">
          Remembered your password?
          <RouterLink to="/login" class="hover:underline text-dark"> Log in </RouterLink>
        </p>
      </div>
      <button v-if="!isSubmitting" type="submit" class="button w-full">Reset your password</button>
      <div v-else class="flex flex-row items-center justify-center">
        <SharedSpinner />
      </div>
    </FormsBase>
  </div>
</template>

<script setup lang="ts">
import FormsBase from '@/components/forms/FormsBase.vue';
import FormsInput from '@/components/forms/FormsInput.vue';
import SharedSpinner from '@/components/shared/SharedSpinner.vue';
import useResetPasswordForm from '@/composables/auth/useResetPasswordForm';
import { useHead } from '@unhead/vue';

const { isSubmitting, submit, email } = useResetPasswordForm();

useHead({
  title: 'Reset your password - Settingly',
  meta: [
    {
      name: 'description',
      content: 'Reset your password',
    },
  ],
});
</script>
