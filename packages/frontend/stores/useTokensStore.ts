import { toast } from "vue-sonner";

export const useTokensStore = defineStore("tokens", () => {
  const tokens = ref<Token[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const currentProjectId = useCurrentProjectId();

  async function fetchTokens() {
    if (!currentProjectId.value) return;
    isLoading.value = true;
    try {
      tokens.value = await $fetch<Token[]>(
        `/api/v1/internal/projects/${currentProjectId.value}/tokens`
      );
      error.value = null;
    } catch (err) {
      error.value = `Failed to fetch tokens: ${(err as Error).message}`;
    } finally {
      isLoading.value = false;
    }
  }

  async function deleteToken(tokenId: string) {
    if (!currentProjectId.value) return;
    isLoading.value = true;
    try {
      await $fetch(
        `/api/v1/internal/projects/${currentProjectId.value}/tokens/${tokenId}`,
        { method: "DELETE" }
      );
      tokens.value = tokens.value.filter((t) => t._id !== tokenId);
      error.value = null;
    } catch (err) {
      error.value = `Failed to delete token: ${(err as Error).message}`;
    } finally {
      isLoading.value = false;
    }
  }

  watch(
    () => currentProjectId.value,
    async (newId) => {
      if (newId) {
        await fetchTokens();
      } else {
        tokens.value = [];
        error.value = null;
        isLoading.value = false;
      }
    },
    { immediate: true }
  );

  return {
    tokens,
    refetchTokens: fetchTokens,
    isLoading,
    error,
    deleteToken,
  };
});
