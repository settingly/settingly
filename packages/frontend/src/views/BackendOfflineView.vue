<template>
  <div class="max-w-xl mx-auto text-lg py-12">
    <div class="flex flex-col items-center justify-center gap-3">
      <h1
        class="text-6xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary uppercase"
      >
        Offline
      </h1>
      <p class="text-center text-lg">
        Our servers are currently offline. Please check back later or contact support if you need
        immediate assistance.
        <br />
        <br />
        We’re attempting to reconnect and will redirect you to the homepage as soon as the server is
        back online.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePocketbaseStore } from '@/stores/usePocketbaseStore';
import { captureException } from '@sentry/vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

const { pocketbase } = usePocketbaseStore();
const router = useRouter();

onMounted(() => {
  const interval = setInterval(async () => {
    try {
      const health = await pocketbase.health.check();
      if (health.code === 200) {
        router.push('/projects');
        toast.success('Servers are back online! Redirecting...');
        clearInterval(interval);
      }
    } catch (error) {
      captureException(error, {
        extra: {
          message: 'Error checking Pocketbase health',
          error,
        },
      });
      return;
    }
  }, 5000);
});
</script>
