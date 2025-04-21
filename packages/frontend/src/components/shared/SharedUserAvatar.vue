<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        @click.stop
        class="bg-gradient-to-tr from-primary to-secondary p-3 rounded-full shadow-xl hover:cursor-pointer"
      >
        <UserIcon class="w-7 h-7 text-white" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
      >
        <div class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <RouterLink
              to="/account"
              :class="[
                active ? 'bg-gray-200 ' : '',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm text-dark',
              ]"
            >
              <User2Icon :active="active" class="mr-2 h-5 w-5 text-primary" aria-hidden="true" />
              Account
            </RouterLink>
          </MenuItem>
        </div>
        <div class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <button
              type="button"
              @click="logOut"
              :class="[
                active ? 'bg-gray-200 ' : '',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm text-dark',
              ]"
            >
              <LogOutIcon :active="active" class="mr-2 h-5 w-5 text-primary" aria-hidden="true" />
              Log Out
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script lang="ts" setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { LogOutIcon, User2Icon, UserIcon } from 'lucide-vue-next';

import { usePocketbaseStore } from '@/stores/usePocketbaseStore';

const { logOut } = usePocketbaseStore();
</script>
