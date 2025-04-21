<template>
  <nav class="flex w-full items-center bg-white border-b border-gray-200">
    <div class="container mx-auto">
      <div class="relative flex items-center justify-between">
        <NuxtLink to="/">
          <img :src="logo" alt="logo" width="100" height="100" class="block" />
        </NuxtLink>
        <div class="flex items-center justify-between w-full">
          <div>
            <button
              @click="toggleNavbar"
              ref="dropdownButtonRef"
              id="navbarToggler"
              class="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg px-3 py-1 focus:ring-2 focus:ring-primary lg:hidden"
            >
              <span class="block w-7 h-0.5 bg-gray-800 my-1"></span>
              <span class="block w-7 h-0.5 bg-gray-800 my-1"></span>
              <span class="block w-7 h-0.5 bg-gray-800 my-1"></span>
            </button>
            <div
              class="max-w-xs rounded-lg bg-white p-5 w-auto shadow-none lg:block hidden"
            >
              <ul class="space-x-8 flex flex-row">
                <template v-for="(item, index) in navLinkItems" :key="index">
                  <li
                    v-if="item !== null"
                    class="flex flex-row gap-2 items-center text-gray-600 hover:text-gray-800"
                  >
                    <component :is="item.icon" class="w-5 h-5 !text-inherit" />
                    <NuxtLink
                      v-if="item.to"
                      :target="item.target"
                      :to="item.to"
                      class="block text-base font-medium !text-inherit whitespace-nowrap"
                    >
                      {{ item.text }}
                    </NuxtLink>
                  </li>
                </template>
              </ul>
            </div>
          </div>
          <div class="hidden lg:block">
            <div
              class="hidden sm:flex space-x-4 items-center"
              v-if="!isSignedIn"
            >
              <SignInButton
                class="text-base font-medium text-gray-600 hover:text-primary"
                >Sign in</SignInButton
              >
              <SignUpButton class="button">Sign Up</SignUpButton>
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
      </div>
    </div>
    <SharedDialog title="Navigation" :open="open" @close="open = false">
      <p class="text-xs text-gray-500 max-w-md mb-6">
        Explore the most important sections of our application. Use the links
        below to navigate.
      </p>
      <ul class="space-y-2">
        <template v-for="(item, index) in navLinkItems" :key="index">
          <li v-if="item !== null" class="flex flex-row items-center gap-2">
            <component :is="item.icon" class="w-5 h-5 !text-inherit" />
            <NuxtLink
              v-if="item.to"
              :href="item.to"
              class="block text-base text-gray-800 hover:text-gray-600 whitespace-nowrap"
            >
              {{ item.text }}
            </NuxtLink>
          </li>
        </template>
      </ul>
      <div class="border-t-2 border-gray-200 pt-6 mt-6">
        <div class="flex space-x-4 items-center" v-if="!isSignedIn">
          <SignInButton
            class="text-base font-medium text-gray-600 hover:text-primary w-full button-ghost"
            >Sign in</SignInButton
          >
          <SignUpButton class="button w-full">Sign Up</SignUpButton>
        </div>
        <div
          class="flex justify-between space-x-4 items-center"
          v-else-if="isDashboardRoute"
        >
          <OrganizationSwitcher />
          <UserButton />
        </div>
        <NuxtLink v-else to="/_" class="button w-full block text-center"
          >Dashboard</NuxtLink
        >
      </div>
    </SharedDialog>
  </nav>
</template>

<script setup lang="ts">
import logo from "@/assets/media/images/logo.png";
import {
  BookIcon,
  CodeXmlIcon,
  CompassIcon,
  DownloadIcon,
  HelpingHandIcon,
  RocketIcon,
} from "lucide-vue-next";

const { isSignedIn } = useAuth();

const open = ref(false);
const dropdownButtonRef = ref<HTMLButtonElement | null>(null);

const route = useRoute();
const isDashboardRoute = computed(() => /^\/_/.test(route.path));

const toggleNavbar = () => {
  open.value = !open.value;
};

const navLinkItems = computed(() => {
  if (isDashboardRoute.value) {
    const currentProjectId = useCurrentProjectId();

    return [
      { text: "Projects", to: "/_", icon: RocketIcon },
      currentProjectId.value
        ? {
            text: `Project Overview`,
            to: `/_/${currentProjectId.value}`,
            icon: CompassIcon,
            target: "_self",
          }
        : null,
      {
        text: "Documentation",
        to: "/docs",
        icon: BookIcon,
        target: "_self",
      },
      {
        text: "Feedback",
        to: "javascript:void(0)",
        icon: HelpingHandIcon,
        target: "_self",
      },
    ];
  } else {
    return [
      { text: "Documentation", to: "/docs", icon: BookIcon },
      {
        text: "Installation",
        to: "/docs/installation/installation-overview",
        icon: DownloadIcon,
        target: "_self",
      },
      {
        text: "Source Code",
        to: "https://github.com/settingly/settingly",
        target: "_blank",
        icon: CodeXmlIcon,
      },
    ];
  }
});
</script>
