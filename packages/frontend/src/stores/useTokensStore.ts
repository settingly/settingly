import type { Token } from '@/types/tokens';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { toast } from 'vue-sonner';
import { usePocketbaseStore } from './usePocketbaseStore';
import { useConfirm } from '@/composables/utils/useConfirm';

export const useTokensStore = defineStore('tokens', () => {
  const tokens = ref<Token[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const route = useRoute();
  const { pocketbase } = usePocketbaseStore();
  const { confirmDialog } = useConfirm();

  async function fetchTokens() {
    const currentProjectId = route.params.projectId as string;
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
    const currentProjectId = route.params.projectId as string;
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

  return {
    tokens,
    fetchTokens,
    isLoading,
    error,
    deleteToken,
  };
});
