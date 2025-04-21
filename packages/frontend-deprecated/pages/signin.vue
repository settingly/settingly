<template>
  <div class="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 my-24">
    <FormsBase
      title="Sign In"
      subtitle="Welcome back! Nice to see you again."
      :is-submitting="false"
    >
      <FormsInput :required="true" label="Email" placeholder="Email address" />
      <FormsInput
        :required="true"
        label="Password"
        placeholder="Password"
        type="password"
      />

      <div class="flex flex-row justify-end items-center">
        <NuxtLink
          to="/reset-password"
          class="text-body text-xs hover:underline"
        >
          Forgot your password?
        </NuxtLink>
      </div>
      <button type="submit" class="button w-full">Sign In</button>
    </FormsBase>
  </div>
</template>
