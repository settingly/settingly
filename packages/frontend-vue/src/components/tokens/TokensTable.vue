<template>
  <table class="min-w-full mt-4 divide-y divide-gray-200 mb-2">
    <thead class="bg-gray-50" v-if="tokens.length">
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Name
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Last Used
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Expiration
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          More Info
        </th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-100">
      <tr v-for="token in tokens" :key="token.id">
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {{ token.name }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {{ token.lastUsed.length ? new Date(token.lastUsed).toLocaleDateString() : 'Never' }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {{ new Date(token.expirationDate).toLocaleDateString() }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          <button class="flex items-center gap-1" @click="toView = token" type="button">
            <EyeIcon class="w-4 h-4 !text-primary" />
            <span class="text-primary">View</span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <SharedDialog :title="toView?.name ?? 'Token'" :open="!!toView" @close="toView = null">
    <template #title-action>
      <button
        class="icon-button-wrapper"
        @click="async () => await deleteToken(toView!.id).then(() => (toView = null))"
      >
        <TrashIcon class="w-4 h-4 !text-error" />
      </button>
    </template>
    <div class="flex flex-col gap-4 -mt-2">
      <p class="text-xs text-gray-500 max-w-80 leading-tight">
        For security, token name and permissions are uneditable after creation. Create a new token
        to change these.
      </p>
      <div>
        <div class="block text-sm font-medium text-gray-800">Responsibilities</div>
        <ul class="list-inside list-disc">
          <li
            v-for="responsibility in toView?.responsibilities"
            :key="responsibility"
            class="text-sm text-gray-700"
          >
            {{ prettifyMachineString(responsibility) }}
          </li>
        </ul>
      </div>
      <div class="flex justify-end gap-3">
        <button class="button" @click="toView = null">Close</button>
      </div>
    </div>
  </SharedDialog>
</template>

<script setup lang="ts">
import { EyeIcon, TrashIcon } from 'lucide-vue-next';
import SharedDialog from '../shared/SharedDialog.vue';
import { ref } from 'vue';
import type { Token } from '@/types/tokens';
import { useTokensStore } from '@/stores/useTokensStore';
import { storeToRefs } from 'pinia';
import prettifyMachineString from '@/utils/prettify-machine-string';

const toView = ref<Token | null>(null);

const tokensStore = useTokensStore();
const { tokens } = storeToRefs(tokensStore);

async function deleteToken(id: string) {
  await tokensStore.deleteToken(id);
}
</script>
