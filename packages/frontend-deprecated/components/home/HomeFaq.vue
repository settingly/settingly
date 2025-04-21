<script setup lang="ts">
import { CircleHelpIcon } from "lucide-vue-next";
import { ref } from "vue";

interface FAQ {
  id: number;
  header: string;
  text: string;
}

const faqs = ref<FAQ[]>([
  {
    id: 1,
    header: "Is Settingly free to use?",
    text: "At this time, Settingly is free to use. We are working on a paid plan that will be available in the future.",
  },
  {
    id: 2,
    header: "How does Settingly stand out from other tools?",
    text: "Nowadays, many tools out there are overly complex and hard to use. Settingly is designed be as simple as possible, while still being powerful.",
  },
  {
    id: 3,
    header: "Can I self-host Settingly?",
    text: "Yes, Settingly is open-source and can be self-hosted. You can find the source code on GitHub.",
  },
  {
    id: 4,
    header: "How can I support Settingly?",
    text: "You can support Settingly by starring the GitHub repository, contributing to the project or donating to the project.",
  },
]);
</script>

<template>
  <section
    class="relative z-20 overflow-hidden bg-white pt-20 pb-8 lg:pt-[120px] lg:pb-[50px]"
  >
    <div class="container mx-auto">
      <div class="flex flex-wrap -mx-4">
        <div class="w-full px-4">
          <div class="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
            <span class="block mb-2 text-lg font-semibold text-primary">
              FAQ
            </span>
            <h2 class="text-dark text-3xl font-bold sm:text-[40px]/[48px]">
              Frequently ask questions
            </h2>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap -mx-4">
        <template :key="faq.id" v-for="faq in faqs">
          <div class="w-full px-4 lg:w-1/2">
            <div class="mb-12 flex lg:mb-[70px]">
              <div
                class="bg-primary mr-4 flex h-[50px] w-full max-w-[50px] items-center justify-center rounded-xl text-white sm:mr-6 sm:h-[60px] sm:max-w-[60px]"
              >
                <CircleHelpIcon class="h-8 w-8 !text-white" />
              </div>

              <div class="w-full">
                <h3
                  class="mb-6 text-xl font-semibold text-dark sm:text-2xl lg:text-xl xl:text-2xl"
                >
                  {{ faq.header }}
                </h3>
                <p class="text-base leading-relaxed text-body">
                  {{ faq.text }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>
