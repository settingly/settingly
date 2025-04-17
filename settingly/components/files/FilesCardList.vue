<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-24">
    <div class="flex flex-row justify-between mb-12">
      <div>
        <h1 class="text-4xl font-semibold">{{ currentProject?.name }}</h1>
        <p class="max-w-2xl text-sm mt-4">
          {{ currentProject?.description }}
        </p>
      </div>

      <div class="flex flex-row items-center gap-4">
        <div
          class="relative bottom-8 left-6 flex flex-row"
          v-if="!isLoading && files.length === 0"
        >
          <p
            class="text-primary font-semibold max-w-36 text-center relative bottom-3"
          >
            Why don't you create a new file?
          </p>
          <ArrowBigRightIcon class="w-12 h-12 rotate-45 !text-primary" />
        </div>
        <FilesNewFileButton />

        <NuxtLink
          :to="`/_/${currentProject?._id}/settings`"
          class="icon-button-wrapper"
        >
          <SettingsIcon class="w-4 h-4" />
        </NuxtLink>
      </div>
    </div>

    <div
      v-if="!error && !isLoading && files.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full"
    >
      <FilesCard v-for="(file, index) in files" :file="file" :key="index" />
    </div>
    <div
      v-else-if="!error && !isLoading && files.length === 0"
      class="flex flex-col items-center justify-center w-full h-96 gap-2"
    >
      <p class="w-full text-center text-lg">
        This project doesn't have any files yet.
      </p>
      <p class="w-full text-center text-lg">
        To create a new file, click the "New File" button in the top right
        corner.
      </p>
    </div>
    <div
      v-else-if="error && !isLoading && files.length > 0"
      class="flex flex-col items-center justify-center w-full h-96 gap-2"
    >
      <p class="w-full text-center text-lg text-error">
        Oops! Something went wrong while loading your files:
      </p>
      <p class="w-full text-center text-lg text-error">
        {{ error }}
      </p>
    </div>

    <div
      v-else
      class="flex flex-col items-center justify-center w-full h-96 gap-6"
    >
      <p class="w-full text-center text-lg">Your files are being loaded...</p>

      <SharedSpinner />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowBigRightIcon, SettingsIcon } from "lucide-vue-next";

const { currentProject } = storeToRefs(useProjectsStore());
const { files, isLoading, error } = storeToRefs(useFilesStore());
</script>
