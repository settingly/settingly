import { ref } from 'vue';
import { toast } from 'vue-sonner';
import { useRouter } from 'vue-router';
import { usePocketbaseStore } from '@/stores/usePocketbaseStore';

export default function useResetPasswordForm() {
  const isSubmitting = ref(false);
  const email = ref('');

  const { pocketbase } = usePocketbaseStore();
  const router = useRouter();

  const submit = async () => {
    isSubmitting.value = true;

    try {
      await pocketbase.collection('users').requestPasswordReset(email.value);

      router.push('/login');
      toast.success('Password reset email sent successfully. Please check your inbox.');
    } catch {
      toast.error('An error occurred while sending the password reset email. Please try again.');
    } finally {
      isSubmitting.value = false;
    }

    isSubmitting.value = false;
  };

  return {
    isSubmitting,
    submit,
    email,
  };
}
