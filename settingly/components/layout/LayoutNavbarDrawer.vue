<template>
  <div>
    <div
      v-if="open"
      @click="open = false"
      class="fixed inset-0 backdrop-blur-sm bg-black/30 transition-opacity"
    ></div>
  </div>
  <div
    v-if="open"
    class="absolute right-0 top-0 bg-white min-h-screen w-72 z-10 shadow-xl p-4 flex flex-col justify-between"
  >
    <ul class="space-y-4 lg:flex lg:space-y-0 lg:space-x-8">
      <template v-for="(item, index) in navLinkItems" :key="index">
        <li v-if="item !== null">
          <a
            v-if="item.to"
            :href="item.to"
            class="flex flex-row items-center gap-2 text-base font-medium text-dark hover:text-primary whitespace-nowrap"
          >
            <component :is="item.icon" class="w-5 h-5 !text-inherit" />
            <span>{{ item.text }}</span>
          </a>
        </li>
      </template>
    </ul>
    <div>
      <div
        class="hidden sm:flex flex-col space-y-2 items-center"
        v-if="!isSignedIn"
      >
        <SignInButton class="button w-full">Sign in</SignInButton>
        <SignUpButton class="button w-full">Sign Up</SignUpButton>
      </div>
      <div
        class="hidden sm:flex space-x-4 items-center"
        v-else-if="isDashboardRoute"
      >
        <OrganizationSwitcher />
        <UserButton />
      </div>
      <NuxtLink v-else to="/_" class="button">Dashboard</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  navLinks: Array<{
    text: string;
    to?: string;
    icon: any;
  }>;
  open: boolean;
}>();
</script>
