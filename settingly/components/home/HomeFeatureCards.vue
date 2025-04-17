<script setup lang="ts">
import { BracesIcon, ServerIcon, SettingsIcon } from "lucide-vue-next";
import { ref } from "vue";

const servicesData = ref([
  {
    icon: SettingsIcon,
    title: "Configuration Storage",
    paragraph:
      "Empower your projects with seamless configuration management that scales with your business.",
    href: "/#",
  },
  {
    icon: BracesIcon,
    title: "REST & GraphQL API",
    paragraph:
      "Unlock powerful integration capabilities with our intuitive APIs that developers love to work with.",
    href: "/#",
  },
  {
    icon: ServerIcon,
    title: "Self-Hostable",
    paragraph:
      "Take full control of your data and infrastructure while reducing costs and increasing security.",
    href: "/#",
  },
]);
</script>

<template>
  <section
    class="pb-12 pt-20 lg:pb-[90px] lg:pt-[120px] flex items-center justify-center"
  >
    <div class="container">
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4">
          <div class="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-[90px]">
            <span class="mb-2 block text-lg font-semibold text-primary">
              Core Features
            </span>
            <h2
              class="mb-3 text-3xl font-bold leading-[1.2] text-dark sm:text-4xl md:text-[40px]"
            >
              Why Choose Settingly
            </h2>
            <p class="text-base text-body-color">
              Settingly supercharges your development workflow with powerful
              configuration management that's built for teams. Intuitive,
              flexible, and secure - everything you need to build better
              applications faster.
            </p>
          </div>
        </div>
      </div>
      <div class="-mx-4 flex flex-wrap">
        <template v-for="(service, index) in servicesData" :key="index">
          <div class="w-full m-auto px-4 md:w-1/2 lg:w-1/3">
            <div class="mb-8">
              <div
                class="mb-5 rounded-[22px] bg-gradient-to-t from-[#F7E8F3] to-[#DDDCF8] p-5"
              >
                <div
                  class="flex items-center justify-center rounded-[10px] bg-[linear-gradient(180deg,rgba(255,255,255,0.41)45.89%,rgba(255,255,255,0.00)100%)] pb-10 pt-5"
                >
                  <component
                    :is="service.icon"
                    class="text-primary/50 w-24 h-24 filter drop-shadow-[0_0_15px_rgba(252,153,58,1.2)]"
                  />
                </div>
              </div>
              <div class="text-center">
                <h3 class="mb-4 text-2xl font-bold text-dark">
                  {{ service.title }}
                </h3>
                <p class="mb-6 text-body-color">
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
