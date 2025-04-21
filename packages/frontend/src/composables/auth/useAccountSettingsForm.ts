import { useConfirm } from '@/composables/utils/useConfirm';
import { usePocketbaseStore } from '@/stores/usePocketbaseStore';
import { trackUmamiEvent } from '@jaseeey/vue-umami-plugin';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

export default function useAccountSettingsForm() {
  const { pocketbase } = usePocketbaseStore();
  const { user } = storeToRefs(usePocketbaseStore());
  const { confirmDialog } = useConfirm();
  const router = useRouter();

  const email = ref(user.value?.email);
  const isChangingEmail = ref(false);

  const isResettingPassword = ref(false);

  const changeEmail = async () => {
    isChangingEmail.value = true;

    if (!email.value?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Please enter a valid email address.');
      isChangingEmail.value = false;
      return;
    }

    if (email.value === user.value?.email) {
      toast.error('Please enter a new email address.');
      isChangingEmail.value = false;
      return;
    }

    try {
      await pocketbase.collection('users').requestEmailChange(email.value!);

      toast.success('Email change request sent. Please check your inbox.');
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      isChangingEmail.value = false;
    }
  };

  const deleteAccount = async () => {
    if (
      !(await confirmDialog(
        'Are you sure you want to delete your account? This action is irreversible.',
      ))
    ) {
      return;
    }

    try {
      trackUmamiEvent('delete_account', {});
      await pocketbase.collection('users').delete(user.value!.id);
      pocketbase.authStore.clear();

      toast.success('Account deleted successfully.');
      await router.push('/login');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const resetPassword = async () => {
    isResettingPassword.value = true;
    try {
      await pocketbase.collection('users').requestPasswordReset(email.value!);
      toast.success('Password reset request sent. Please check your inbox.');
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      isResettingPassword.value = false;
    }
  };

  return {
    email,
    isChangingEmail,
    changeEmail,
    deleteAccount,
    resetPassword,
    isResettingPassword,
  };
}
