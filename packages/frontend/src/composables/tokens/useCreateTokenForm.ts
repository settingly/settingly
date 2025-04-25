import { toast } from 'vue-sonner';
import { ref } from 'vue';
import { usePocketbaseStore } from '@/stores/usePocketbaseStore';
import { useRoute } from 'vue-router';
import { trackUmamiEvent } from '@jaseeey/vue-umami-plugin';
import { storeToRefs } from 'pinia';
import useCurrentProjectStore from '@/stores/useCurrentProjectStore';
import type { Token } from '@/types/tokens';

export default function useCreateTokenForm() {
  const { pocketbase } = usePocketbaseStore();
  const route = useRoute();
  const { tokens } = storeToRefs(useCurrentProjectStore());

  const isSubmitting = ref(false);
  const responsibilities = ref<string[]>([]);
  const name = ref('');
  const generatedToken = ref<string | null>(null);
  const canViewGeneratedToken = ref(false);
  const wasCopied = ref(false);

  const submit = async () => {
    isSubmitting.value = true;

    if (!name.value.match(/^[a-zA-Z0-9_-]+$/)) {
      toast.error('Token name can only contain letters, numbers, underscores, and dashes.');
      return;
    }

    if (responsibilities.value.length === 0) {
      toast.error('Please select at least one responsibility.');
      return;
    }

    try {
      const response = await pocketbase.send<{
        secret: string;
        token: Token;
      }>(`/internal/projects/${route.params.projectId}/tokens`, {
        method: 'POST',
        body: {
          name: name.value,
          responsibilities: responsibilities.value,
        },
      });

      trackUmamiEvent('create_token', {
        tokenName: name.value,
        tokenResponsibilities: responsibilities.value,
        projectId: route.params.projectId,
      });

      generatedToken.value = response.secret;

      canViewGeneratedToken.value = false;
      isSubmitting.value = false;
      toast.success('Token created successfully!');

      tokens.value.push(response.token);
    } catch (error) {
      toast.error((error as Error).message || 'Failed to create token');
    } finally {
      isSubmitting.value = false;
    }
  };

  const copyToken = async () => {
    if (generatedToken.value) {
      await navigator.clipboard.writeText(generatedToken.value);
      wasCopied.value = true;
    }
  };

  const reset = () => {
    name.value = '';
    responsibilities.value = [];
    generatedToken.value = null;
    canViewGeneratedToken.value = false;
    wasCopied.value = false;
  };

  return {
    isSubmitting,
    responsibilities,
    name,
    submit,
    generatedToken,
    canViewGeneratedToken,
    copyToken,
    wasCopied,
    reset,
  };
}
