import { usePocketbaseStore } from '@/stores/usePocketbaseStore';
import { trackUmamiEvent } from '@jaseeey/vue-umami-plugin';
import { ClientResponseError } from 'pocketbase';
import { onMounted, ref } from 'vue';
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
      if (error instanceof ClientResponseError && error.status === 403) {
        toast.error('Please verify your email address');
      } else {
        toast.error('Invalid email or password');
      }
    } finally {
      isSubmitting.value = false;
    }
  };

  onMounted(() => {
    if (pocketbase.authStore.isValid) {
      router.push('/projects');
    }
  });

  return {
    email,
    password,
    isSubmitting,
    submit,
  };
}
