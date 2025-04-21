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

const pocketbase = new PocketBase('http://127.0.0.1:8090');
pocketbase.autoCancellation(false);

export const usePocketbaseStore = defineStore('pocketbase', () => {
  const user = ref<ExtendedAuthRecord | null>(null);
  const requestsSent = ref(0);
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
    user.value = record as ExtendedAuthRecord;
  }, true);

  pocketbase.afterSend = async () => {
    requestsSent.value++;

    if (requestsSent.value > 10) {
      await pocketbase.collection('users').authRefresh();
    }
  };

  const isAuthenticated = computed(() => user.value !== null);

  const logOut = async () => {
    pocketbase.authStore.clear();
    await pocketbase.collection('users').authRefresh();

    user.value = null;
    await router.push('/login');
  };

  return { user, isAuthenticated, pocketbase, logOut };
});
