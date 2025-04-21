<template>
  <div
    v-if="user?.verified !== true && user !== null"
    class="w-full h-16 from-green-500 to-emerald-700 bg-gradient-to-r text-center flex items-center justify-center shadow-xl"
  >
    <p class="text-white">
      Your account is not verified. Please check your email for the verification link.
      <button
        @click="resendVerificationEmail"
        class="text-white font-semibold hover:underline ml-2"
      >
        Resend verification email
      </button>
    </p>
  </div>
  <div
    v-else
    class="w-full h-16 from-red-500 to-primary bg-gradient-to-r text-center flex items-center justify-center shadow-xl"
  >
    <p class="text-white">
      <strong>Warning: Beta Version</strong> - Not recommended for production. Report bugs or
      issues.
    </p>
  </div>
</template>

<script lang="ts" setup>
import { usePocketbaseStore } from '@/stores/usePocketbaseStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { toast } from 'vue-sonner';

const pocketbaseStore = usePocketbaseStore();
const { user } = storeToRefs(pocketbaseStore);
const { pocketbase } = pocketbaseStore;

const resendVerificationEmail = async () => {
  try {
    await pocketbase.collection('users').requestVerification(user.value!.email!);
    toast.success('Verification email sent! Please check your inbox and spam folder.');
  } catch {
    toast.error('Failed to send verification email. Please try again later.');
  }
};
</script>
