<template>
  <nav class="flex w-full items-center bg-white border-b border-gray-200">
    <div class="container mx-auto">
      <div class="relative flex items-center justify-center lg:justify-between min-h-20 text-lg">
        <div class="flex flex-row items-center gap-8">
          <RouterLink to="/projects" class="lg:block hidden">
            <img :src="logo" alt="logo" width="100" height="100" />
          </RouterLink>

          <ul v-if="isAuthenticated" class="flex flex-row gap-8 text-body">
            <li>
              <RouterLink
                to="/projects"
                class="flex flex-row items-center justify-center gap-2 hover:text-primary"
              >
                <GalleryVerticalEndIcon class="text-inherit" />
                Projects
              </RouterLink>
            </li>

            <li>
              <RouterLink
                v-if="'projectId' in route.params"
                :to="`/projects/${project?.id}/files`"
                class="flex flex-row items-center justify-center gap-2 hover:text-primary"
              >
                <PlayIcon class="text-inherit" />
                Files ({{ project?.name }})
              </RouterLink>
            </li>
          </ul>
        </div>

        <ul class="flex flex-row gap-8 text-body" v-if="!isAuthenticated">
          <li>
            <RouterLink
              to="/login"
              class="flex flex-row items-center justify-center gap-2 hover:text-primary"
            >
              <LogInIcon class="text-inherit" />
              Log in
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/signup"
              class="flex flex-row items-center justify-center gap-2 hover:text-primary"
            >
              <PlayIcon class="text-inherit" />
              Sign up
            </RouterLink>
          </li>
        </ul>
        <ul class="flex flex-row gap-8 text-body" v-else>
          <li>
            <button class="flex flex-row items-center justify-center gap-2 hover:text-primary">
              Preferences
            </button>
          </li>

          <li>
            <button
              @click="logOut"
              class="flex flex-row items-center justify-center gap-2 hover:text-primary"
            >
              Log out
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import logo from '@/assets/logo.png';
import { GalleryVerticalEndIcon, LogInIcon, PlayIcon } from 'lucide-vue-next';
import { usePocketbaseStore } from '@/stores/usePocketbaseStore';
import { storeToRefs } from 'pinia';
import useCurrentProjectStore from '@/stores/useCurrentProjectStore';
import { useRoute } from 'vue-router';

const route = useRoute();

const { isAuthenticated } = storeToRefs(usePocketbaseStore());
const { logOut } = usePocketbaseStore();
const { project } = storeToRefs(useCurrentProjectStore());
</script>
