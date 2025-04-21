import useCurrentProjectId from '@/composables/projects/useCurrentProjectId';
import type { Token } from '@/types/tokens';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { toast } from 'vue-sonner';
import { usePocketbaseStore } from './usePocketbaseStore';
import { useConfirm } from '@/composables/utils/useConfirm';

export const useTokensStore = defineStore('tokens', () => {
  const tokens = ref<Token[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const currentProjectId = useRoute().params.projectId as string;
  const { pocketbase } = usePocketbaseStore();
  const { confirmDialog } = useConfirm();

  async function fetchTokens() {
    if (!currentProjectId) return;
    isLoading.value = true;
    try {
      tokens.value = await pocketbase.send<Token[]>(
        `/api/internal/projects/${currentProjectId}/tokens`,
        {
          method: 'GET',
        },
      );
      error.value = null;
    } catch (err) {
      error.value = `Failed to fetch tokens: ${(err as Error).message}`;
    } finally {
      isLoading.value = false;
    }
  }

  async function deleteToken(tokenId: string) {
    if (!currentProjectId) return;
    isLoading.value = true;

    if (
      !(await confirmDialog(
        'Are you sure you want to delete this token? This action cannot be undone.',
      ))
    ) {
      isLoading.value = false;
      return;
    }

    try {
      await pocketbase.collection('tokens').delete(tokenId);
      tokens.value = tokens.value.filter((t) => t.id !== tokenId);
      toast.success('Token deleted successfully');
    } catch (err) {
      toast.error(`Failed to delete token: ${(err as Error).message || 'Unknown error'}`);
    } finally {
      isLoading.value = false;
    }
  }

  watch(
    () => currentProjectId,
    async (newId) => {
      if (newId) {
        await fetchTokens();
      } else {
        tokens.value = [];
        error.value = null;
        isLoading.value = false;
      }
    },
    { immediate: true },
  );

  return {
    tokens,
    refetchTokens: fetchTokens,
    isLoading,
    error,
    deleteToken,
  };
});
