<template>
  <nav class="flex w-full items-center bg-white border-b border-gray-200">
    <div class="container mx-auto">
      <div class="relative flex items-center justify-between">
        <RouterLink to="/">
          <img :src="logo" alt="logo" width="100" height="100" class="block" />
        </RouterLink>
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
            <div class="max-w-xs rounded-lg bg-white p-5 w-auto shadow-none lg:block hidden">
              <ul class="space-x-8 flex flex-row">
                <template v-for="(item, index) in navLinkItems" :key="index">
                  <li v-if="item !== null" class="">
                    <RouterLink
                      v-if="item.to && item.routed"
                      :target="item.target"
                      :to="item.to"
                      class="text-base font-medium whitespace-nowrap flex flex-row gap-2 items-center text-gray-600 hover:text-gray-800"
                    >
                      <component :is="item.icon" class="w-5 h-5 !text-inherit" />
                      {{ item.text }}
                    </RouterLink>
                    <a
                      v-else
                      :href="item.to"
                      :target="item.target"
                      class="text-base font-medium whitespace-nowrap flex flex-row gap-2 items-center text-gray-600 hover:text-gray-800"
                      ><component :is="item.icon" class="w-5 h-5 !text-inherit" />{{ item.text }}
                    </a>
                  </li>
                </template>
              </ul>
            </div>
          </div>
          <div class="hidden lg:block">
            <div class="hidden sm:flex space-x-4 items-center" v-if="!isAuthenticated">
              <RouterLink
                to="/login"
                class="text-base font-medium text-gray-600 hover:text-primary"
              >
                Log in
              </RouterLink>
              <RouterLink to="/signup" class="button">Sign Up</RouterLink>
            </div>
            <RouterLink
              v-else
              to="/projects"
              class="hidden sm:flex flex-row space-x-4 items-center border-gray-300 bg-primary border rounded-full pl-10 text-white"
            >
              <span>Projects</span>
              <SharedUserAvatar />
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <Transition name="fade">
      <div v-if="open" class="fixed inset-0 bg-black/50 z-40" @click="open = false"></div>
    </Transition>

    <!-- Drawer -->
    <Transition name="slide-left">
      <div
        @click="open = false"
        v-if="open"
        :class="[
          'fixed top-0 bottom-0 w-full max-w-3xs bg-white z-50 shadow-lg overflow-auto right-0 ',
        ]"
      >
        <div class="pb-4 pt-3 pl-4 pr-6 flex flex-col justify-between h-full">
          <!-- Header -->
          <div>
            <div class="flex items-center justify-between mb-4 pb-2 border-b border-gray-300">
              <img :src="logo" alt="logo" width="50" height="50" class="block" />

              <button
                @click="open = false"
                class="p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <span class="block w-7 h-0.5 bg-gray-800 my-1"></span>
                <span class="block w-7 h-0.5 bg-gray-800 my-1"></span>
                <span class="block w-7 h-0.5 bg-gray-800 my-1"></span>
              </button>
            </div>

            <!-- Content -->

            <ul class="space-y-3 flex flex-col items-end text-xl">
              <li v-for="(item, index) in navLinkItems" :key="index">
                <RouterLink
                  v-if="item.to && item.routed"
                  :target="item.target"
                  :to="item.to"
                  class="font-medium whitespace-nowrap flex flex-row gap-2 items-center text-gray-600 hover:text-gray-800"
                >
                  <component :is="item.icon" class="w-5 h-5 !text-inherit" />
                  {{ item.text }}
                </RouterLink>
                <a
                  v-else
                  :href="item.to"
                  :target="item.target"
                  class="font-medium whitespace-nowrap flex flex-row gap-2 items-center text-gray-600 hover:text-gray-800"
                  ><component :is="item.icon" class="w-5 h-5 !text-inherit" />{{ item.text }}
                </a>
              </li>
            </ul>
          </div>

          <div class="pt-6 border-t border-gray-200 text-lg">
            <div class="flex flex-col items-center space-y-2" v-if="!isAuthenticated">
              <RouterLink to="/login" class="button w-full text-center text-lg">
                Log in
              </RouterLink>
              <RouterLink to="/signup" class="button w-full text-center text-lg"
                >Sign up</RouterLink
              >
            </div>
            <div v-else class="flex flex-col space-y-2 items-center">
              <RouterLink to="/projects" class="button text-center w-full block text-lg"
                >Projects</RouterLink
              >
              <RouterLink to="/account" class="button text-center w-full text-lg"
                >Account</RouterLink
              ><button class="button text-center w-full text-lg" @click="logOut">Log Out</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import logo from '@/assets/logo.png';
import { BookIcon, CodeXmlIcon, HelpingHandIcon } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import SharedUserAvatar from '../shared/SharedUserAvatar.vue';
import { usePocketbaseStore } from '@/stores/usePocketbaseStore';
import { storeToRefs } from 'pinia';

const { isAuthenticated } = storeToRefs(usePocketbaseStore());

const open = ref(false);
const dropdownButtonRef = ref<HTMLButtonElement | null>(null);

const { logOut } = usePocketbaseStore();

const toggleNavbar = () => {
  open.value = !open.value;
};

const navLinkItems = computed(() => {
  return [
    { text: 'Documentation', to: '/docs', icon: BookIcon, target: '_self', routed: true },
    {
      text: 'Source Code',
      to: 'https://github.com/settingly/settingly',
      target: '_blank',
      icon: CodeXmlIcon,
      routed: false,
    },
    {
      text: 'Feedback',
      to: 'mailto:feedback@settingly.xyz',
      icon: HelpingHandIcon,
      target: '_self',
      routed: false,
    },
  ];
});
</script>

<style scoped>
/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(-100%);
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(100%);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: #3b82f6;
  }
}
</style>
