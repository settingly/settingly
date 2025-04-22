import { usePocketbaseStore } from '@/stores/usePocketbaseStore';
import { trackUmamiEvent } from '@jaseeey/vue-umami-plugin';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

export default function useLogInForm() {
  const email = ref<string>('');
  const password = ref<string>('');
  const isSubmitting = ref<boolean>(false);

  const { pocketbase } = usePocketbaseStore();
  const router = useRouter();

  const submit = async () => {
    isSubmitting.value = true;

    try {
      await pocketbase.collection('users').authWithPassword(email.value, password.value);
      await pocketbase.collection('users').authRefresh();

      await router.push('/projects');
      trackUmamiEvent('login', {});
    } catch (error) {
      toast.error('Failed to log in. Please check your credentials.');
      trackUmamiEvent('login_failed', error as Error);
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    email,
    password,
    isSubmitting,
    submit,
  };
}
