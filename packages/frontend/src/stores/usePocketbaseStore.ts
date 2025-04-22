import { identifyUmamiSession } from '@jaseeey/vue-umami-plugin';
import { defineStore } from 'pinia';
import PocketBase, { type AuthRecord } from 'pocketbase';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

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

const pocketbase = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);
pocketbase.autoCancellation(false);

export const usePocketbaseStore = defineStore('pocketbase', () => {
  const user = ref<ExtendedAuthRecord | null>(null);
  const router = useRouter();

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
    if (record) {
      user.value = record as ExtendedAuthRecord;
      identifyUmamiSession({
        userId: record.id,
        email: record.email,
      });
    }
  }, true);

  const isAuthenticated = computed(() => user.value !== null);

  const logOut = async () => {
    pocketbase.authStore.clear();

    user.value = null;
    await router.push('/login');
  };

  return { user, isAuthenticated, pocketbase, logOut };
});
