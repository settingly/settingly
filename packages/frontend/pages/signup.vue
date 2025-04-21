<template>
  <div class="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 my-24">
    <FormsBase
      title="Sign Up"
      subtitle="Create an account to get started."
      :is-submitting="false"
    >
      <FormsInput :required="true" label="Email" placeholder="Email address" />
      <FormsInput
        :required="true"
        label="Password"
        placeholder="Password"
        type="password"
      />
      <FormsInput
        :required="true"
        label="Confirm Password"
        placeholder=" Password"
        type="password"
      />

      <div class="mb-4 flex items-center">
        <input
          type="checkbox"
          id="tos"
          class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary"
          required
        />
        <label for="tos" class="ml-2 block text-sm text-body">
          I agree to the
          <NuxtLink to="/terms" class="text-primary hover:underline">
            Terms of Service
          </NuxtLink>
          and
          <NuxtLink to="/privacy" class="text-primary hover:underline">
            Privacy Policy
          </NuxtLink>
        </label>
      </div>

      <div class="flex flex-row justify-between items-center">
        <p class="text-body text-xs">
          Already have an account?
          <NuxtLink to="/signin" class="hover:underline text-dark">
            Sign in
          </NuxtLink>
        </p>
        <NuxtLink
          to="/reset-password"
          class="text-body text-xs hover:underline"
        >
          Forgot your password?
        </NuxtLink>
      </div>
      <button type="submit" class="button w-full">Sign Up</button>
    </FormsBase>
  </div>
</template>
