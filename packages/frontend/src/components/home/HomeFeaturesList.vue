<script setup lang="ts">
import { DatabaseIcon, KeyIcon, SettingsIcon } from 'lucide-vue-next';
import { ref } from 'vue';

const servicesData = ref([
  {
    icon: SettingsIcon,
    title: ' Configurations',
    paragraph:
      'Configuration sharing between microservices made easy. Store and manage your configurations effortlessly.',
    to: '/#',
    soon: false,
  },
  {
    icon: KeyIcon,
    title: 'End-to-End Encryption',
    paragraph:
      'Securely store and manage your configurations. Our end-to-end encryption ensures data privacy.',

    to: '/#',
    soon: true,
  },
  {
    icon: DatabaseIcon,
    title: 'Self-Hostable',
    paragraph:
      "End-to-end isn't enough for you? We offer self-hosting options for your configurations.",

    to: '/#',
    soon: true,
  },
]);
</script>

<template>
  <section
    class="px-4 lg:px-0 pb-12 pt-20 lg:pb-[90px] lg:pt-[120px] flex items-center justify-center"
  >
    <div class="container">
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4">
          <div class="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-[90px]">
            <span class="mb-2 block text-lg font-semibold text-primary"> Our Features </span>
            <h2 class="mb-3 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">
              What Settingly Offers
            </h2>
            <p class="text-base text-body-color">
              Settingly enhances your development with configuration management that makes your
              development process efficient and seamless.
            </p>
          </div>
        </div>
      </div>
      <div class="-mx-4 flex flex-wrap">
        <template v-for="(service, index) in servicesData" :key="index">
          <div class="w-full m-auto px-4 md:w-1/2 lg:w-1/3">
            <div class="mb-8">
              <div class="mb-5 rounded-[22px] bg-gradient-to-t from-[#F7E8F3] to-[#DDDCF8] p-5">
                <div
                  class="flex items-center justify-center rounded-[10px] bg-[linear-gradient(180deg,rgba(255,255,255,0.41)45.89%,rgba(255,255,255,0.00)100%)] pb-10 pt-5"
                >
                  <component :is="service.icon" class="!text-primary/90 w-24 h-24" />
                </div>
              </div>
              <div class="text-center">
                <p class="text-base text-primary">
                  <span v-if="service.soon">Coming Soon</span>
                  <span v-else> Try it Now </span>
                </p>
                <h3
                  class="mb-4 text-2xl font-bold"
                  :class="{ 'blur-sm select-none': service.soon }"
                >
                  {{ service.title }}
                </h3>

                <p class="mb-6 text-body-color" :class="{ 'blur-sm select-none': service.soon }">
                  {{ service.paragraph }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>
