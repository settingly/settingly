<script setup lang="ts">
import FormsBase from '@/components/forms/FormsBase.vue';
import FormsInput from '@/components/forms/FormsInput.vue';
import SharedSpinner from '@/components/shared/SharedSpinner.vue';
import useSignUpForm from '@/composables/auth/useSignUpForm';

const { password, passwordConfirm, email, submit, isSubmitting } = useSignUpForm();
</script>

<template>
  <div class="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 my-24">
    <FormsBase title="Sign Up" subtitle="Create an account to get started." @submit="submit">
      <FormsInput :required="true" label="Email" placeholder="Email address" v-model="email" />

      <p class="text-body text-xs -mt-3">
        We recommend using an email address that can be shared with your team.
      </p>

      <FormsInput
        :required="true"
        label="Password"
        placeholder="Password"
        type="password"
        v-model="password"
      />
      <FormsInput
        :required="true"
        label="Confirm Password"
        placeholder=" Password"
        type="password"
        v-model="passwordConfirm"
      />

      <div class="flex flex-row justify-between items-center -mt-2">
        <p class="text-body text-xs">
          Already have an account?
          <RouterLink to="/login" class="hover:underline text-dark"> Log in </RouterLink>
        </p>
        <RouterLink to="/reset-password" class="text-body text-xs hover:underline">
          Forgot your password?
        </RouterLink>
      </div>
      <div class="mb-4 flex items-center">
        <input
          type="checkbox"
          id="tos"
          class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary hover:cursor-pointer"
          required
        />
        <label for="tos" class="ml-2 block text-sm text-body">
          I agree to the
          <a
            href="https://github.com/settingly/settingly/blob/main/LICENSE"
            target="_blank"
            class="text-primary hover:underline"
          >
            License Agreement
          </a>
          and
          <RouterLink to="/legal/privacy" class="text-primary hover:underline">
            Privacy Policy
          </RouterLink>
        </label>
      </div>
      <button v-if="!isSubmitting" type="submit" class="button w-full">Sign Up</button>
      <div v-else class="flex flex-row items-center justify-center">
        <SharedSpinner />
      </div>
    </FormsBase>
  </div>
</template>
