import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import { usePocketbaseStore } from '@/stores/usePocketbaseStore';

const COMMON_SPECIAL_CHARACTERS = '!@#$%^&*()_§+{}[]:;<>,.?~\\/-';
const PASSWORD_REGEX = new RegExp(
  `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[${COMMON_SPECIAL_CHARACTERS}]).{8,}$`,
);

// password regex explanation:
// ^ - start of string
// (?=.*[a-z]) - at least one lowercase letter
// (?=.*[A-Z]) - at least one uppercase letter
// (?=.*\\d) - at least one digit
// (?=.*[${COMMON_SPECIAL_CHARACTERS}]) - at least one special character
// .{8,} - at least 8 characters long
// $ - end of string

export default function useSignUpForm() {
  const email = ref<string>('');
  const password = ref<string>('');
  const passwordConfirm = ref<string>('');
  const isSubmitting = ref<boolean>(false);

  const { pocketbase } = usePocketbaseStore();
  const router = useRouter();

  const submit = async () => {
    isSubmitting.value = true;

    if (password.value.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      isSubmitting.value = false;
      return;
    }

    if (password.value !== passwordConfirm.value) {
      toast.error('Passwords do not match.');
      isSubmitting.value = false;
      return;
    }

    try {
      await pocketbase.collection('users').create({
        email: email.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value,
      });

      await pocketbase.collection('users').requestVerification(email.value);
      await router.push('/login');

      toast.success('Registration successful! Please check your email to verify your account.');
    } catch {
      toast.error('Registration failed. Please try again.');
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    email,
    password,
    passwordConfirm,
    isSubmitting,
    submit,
  };
}
