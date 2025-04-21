import { defineStore } from 'pinia';
import PocketBase, { type AuthRecord } from 'pocketbase';
import { computed, ref } from 'vue';

type ExtendedAuthRecord = AuthRecord & {
  name?: string;
  email?: string;
  avatar?: string;
  created: string;
  updated: string;
  emailVisibility: boolean;
  verified: boolean;
  metadata: {
    [key: string]: unknown;
  };
};

const pocketbase = new PocketBase('http://127.0.0.1:8090');
pocketbase.autoCancellation(false);

export const usePocketbaseStore = defineStore('pocketbase', () => {
  const user = ref<ExtendedAuthRecord | null>(null);

  if (pocketbase.authStore.isValid) {
    pocketbase
      .collection('users')
      .authRefresh()
      .then(() => {
        user.value = pocketbase.authStore.model as ExtendedAuthRecord;
      })
      .catch(() => {
        pocketbase.authStore.clear();
        user.value = null;
      });
  }
  pocketbase.authStore.onChange((token, record) => {
    user.value = record as ExtendedAuthRecord;
  }, true);

  const isAuthenticated = computed(() => user.value !== null);

  return { user, isAuthenticated, pocketbase };
});
