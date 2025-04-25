<template>
  <div class="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 my-24">
    <FormsBase title="Log In" subtitle="Welcome back!" @submit="submit">
      <FormsInput :required="true" label="Email" placeholder="Email address" v-model="email" />
      <FormsInput
        :required="true"
        label="Password"
        placeholder="Password"
        type="password"
        v-model="password"
      />

      <div class="flex flex-row justify-between items-center -mt-2">
        <p class="text-body text-xs">
          Don't have an account?
          <RouterLink to="/signup" class="hover:underline text-dark"> Sign up </RouterLink>
        </p>
        <RouterLink to="/reset-password" class="text-body text-xs hover:underline">
          Forgot your password?
        </RouterLink>
      </div>

      <button v-if="!isSubmitting" type="submit" class="button w-full">Log In</button>
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
import useLogInForm from '@/composables/auth/useLogInForm';
import { useHead } from '@unhead/vue';

const { password, email, submit, isSubmitting } = useLogInForm();

useHead({
  title: 'Log In - Settingly',
  meta: [
    {
      name: 'description',
      content: 'Log in to your Settingly account',
    },
  ],
});
</script>
