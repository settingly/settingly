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
                  <li
                    v-if="item !== null"
                    class="flex flex-row gap-2 items-center text-gray-600 hover:text-gray-800"
                  >
                    <component :is="item.icon" class="w-5 h-5 !text-inherit" />
                    <RouterLink
                      v-if="item.to"
                      :target="item.target"
                      :to="item.to"
                      class="block text-base font-medium !text-inherit whitespace-nowrap"
                    >
                      {{ item.text }}
                    </RouterLink>
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
            <div class="hidden sm:flex space-x-4 items-center" v-else-if="isProjectsRoute">
              <SharedUserAvatar />
            </div>
            <RouterLink v-else to="/projects" class="button">Projects</RouterLink>
          </div>
        </div>
      </div>
    </div>
    <SharedDialog title="Navigation" :open="open" @close="open = false">
      <p class="text-xs text-gray-500 max-w-md mb-6">
        Explore the most important sections of our application. Use the links below to navigate.
      </p>
      <ul class="space-y-2">
        <template v-for="(item, index) in navLinkItems" :key="index">
          <li v-if="item !== null" class="flex flex-row items-center gap-2">
            <component :is="item.icon" class="w-5 h-5 !text-inherit" />
            <RouterLink
              v-if="item.to"
              :to="item.to"
              class="block text-base text-gray-800 hover:text-gray-600 whitespace-nowrap"
            >
              {{ item.text }}
            </RouterLink>
          </li>
        </template>
      </ul>

      <div class="border-t-2 border-gray-200 pt-6 mt-6">
        <div class="flex space-x-4 items-center" v-if="!isAuthenticated">
          <RouterLink to="/login" class="text-base font-medium text-gray-600 hover:text-primary">
            Log in
          </RouterLink>
          <RouterLink to="/signup" class="button">Sign Up</RouterLink>
        </div>
        <div class="flex justify-between space-x-4 items-center" v-else-if="isProjectsRoute">
          <SharedUserAvatar />
        </div>
        <RouterLink v-else to="/projects" class="button w-full block text-center"
          >Projects</RouterLink
        >
      </div>
    </SharedDialog>
  </nav>
</template>

<script setup lang="ts">
import logo from '@/assets/logo.png';
import useCurrentProjectId from '@/composables/projects/useCurrentProjectId';
import {
  BookIcon,
  CodeXmlIcon,
  CompassIcon,
  DownloadIcon,
  HelpingHandIcon,
  RocketIcon,
} from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import SharedDialog from '../shared/SharedDialog.vue';
import SharedUserAvatar from '../shared/SharedUserAvatar.vue';
import { usePocketbaseStore } from '@/stores/usePocketbaseStore';
import { storeToRefs } from 'pinia';

const { isAuthenticated } = storeToRefs(usePocketbaseStore());

const open = ref(false);
const dropdownButtonRef = ref<HTMLButtonElement | null>(null);

const route = useRoute();
const isProjectsRoute = computed(() => route.path.startsWith('/projects'));

const toggleNavbar = () => {
  open.value = !open.value;
};

const navLinkItems = computed(() => {
  if (isProjectsRoute.value) {
    const currentProjectId = useCurrentProjectId();

    return [
      { text: 'Projects', to: '/projects', icon: RocketIcon },
      currentProjectId.value
        ? {
            text: `Project Overview`,
            to: `/projects/${currentProjectId.value}`,
            icon: CompassIcon,
            target: '_self',
          }
        : null,
      {
        text: 'Documentation',
        to: '/docs',
        icon: BookIcon,
        target: '_self',
      },
      {
        text: 'Feedback',
        to: 'javascript:void(0)',
        icon: HelpingHandIcon,
        target: '_self',
      },
    ];
  } else {
    return [
      { text: 'Documentation', to: '/docs', icon: BookIcon },
      {
        text: 'Installation',
        to: '/docs/installation/installation-overview',
        icon: DownloadIcon,
        target: '_self',
      },
      {
        text: 'Source Code',
        to: 'https://github.com/settingly/settingly',
        target: '_blank',
        icon: CodeXmlIcon,
      },
    ];
  }
});
</script>
