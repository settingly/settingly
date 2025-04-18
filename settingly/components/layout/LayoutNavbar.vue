<template>
  <header class="flex w-full items-center bg-white border-b border-gray-200">
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
            <nav
              :class="{ hidden: !open }"
              id="navbarCollapse"
              class="absolute right-4 top-full w-full max-w-xs rounded-lg bg-white p-5 shadow-lg lg:static lg:block lg:w-auto lg:shadow-none"
            >
              <ul class="space-y-4 lg:flex lg:space-y-0 lg:space-x-8">
                <template v-for="(item, index) in navLinkItems" :key="index">
                  <li v-if="item !== null">
                    <a
                      v-if="item.to"
                      :href="item.to"
                      class="block text-base font-medium text-gray-800 hover:text-gray-600 whitespace-nowrap"
                    >
                      {{ item.text }}
                    </a>
                  </li>
                </template>
              </ul>
            </nav>
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
  </header>
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
  if (isDashboardRoute) {
    const currentProjectId = useCurrentProjectId();

    return [
      { text: "Projects", to: "/_", icon: RocketIcon },
      currentProjectId.value
        ? {
            text: `Project Overview`,
            to: `/_/${currentProjectId.value}`,
            icon: CompassIcon,
          }
        : null,
      {
        text: "Documentation",
        to: "/docs",
        icon: BookIcon,
      },
      {
        text: "Feedback",
        to: "javascript:void(0)",
        icon: HelpingHandIcon,
      },
    ];
  } else {
    return [
      { text: "Documentation", to: "javascript:void(0)", icon: BookIcon },
      { text: "Installation", to: "javascript:void(0)", icon: DownloadIcon },
      { text: "Source Code", to: "javascript:void(0)", icon: CodeXmlIcon },
    ];
  }
});

const handleClickOutside = (event: MouseEvent) => {
  if (
    dropdownButtonRef.value &&
    !dropdownButtonRef.value.contains(event.target as Node)
  ) {
    open.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
