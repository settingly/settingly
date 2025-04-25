import useCurrentProjectStore from '@/stores/useCurrentProjectStore';
import { usePocketbaseStore } from '@/stores/usePocketbaseStore';
import { trackUmamiEvent } from '@jaseeey/vue-umami-plugin';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { toast } from 'vue-sonner';
import { useConfirm } from '../utils/useConfirm';

export default function useUpdateTokenForm(onDeleted?: () => void) {
  const { pocketbase } = usePocketbaseStore();
  const { tokens, project } = storeToRefs(useCurrentProjectStore());
  const { confirmDialog } = useConfirm();

  const isDeleting = ref(false);

  const deleteToken = async (tokenId: string) => {
    isDeleting.value = true;

    if (
      !(await confirmDialog(
        'Are you sure you want to delete this token? This action cannot be undone.',
      ))
    ) {
      isDeleting.value = false;
      return;
    }

    try {
      await pocketbase.collection('tokens').delete(tokenId);

      trackUmamiEvent('delete_token', {
        tokenId,
        projectId: project.value?.id,
      });

      tokens.value = tokens.value.filter((t) => t.id !== tokenId);

      onDeleted?.();

      toast.success('Token deleted successfully');
    } catch (err) {
      toast.error(`Failed to delete token: ${(err as Error).message || 'Unknown error'}`);
    } finally {
      isDeleting.value = false;
    }
  };

  return {
    deleteToken,
    isDeleting,
  };
}
