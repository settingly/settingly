<template>
  <table class="min-w-full mt-4 divide-y divide-gray-200 mb-2">
    <thead class="bg-gray-50" v-if="accessTokens.length">
      <tr>
        <th
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Name
        </th>

        <th
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Permissions
        </th>

        <th
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Created
        </th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-100">
      <tr
        v-for="(row, index) in accessTokens"
        @click="tokenToUpdate = row"
        :key="index"
        class="hover:bg-gray-200 hover:cursor-pointer"
      >
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {{ row.name }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          <div
            class="bg-secondary text-white rounded-md max-w-16 py-0.5 flex flex-row items-center justify-center gap-2"
          >
            <EyeIcon class="h-4 w-4 inline-block text-white" />
            <span> Click </span>
          </div>
        </td>

        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {{ row.createdAt.toLocaleDateString() }}
        </td>
      </tr>
    </tbody>
    <SharedDialog
      title="Update Token"
      :open="tokenToUpdate !== null"
      @close="tokenToUpdate = null"
    >
      <form class="flex flex-col gap-4">
        <FormsInput
          id="tokenName"
          label="Token Name"
          type="text"
          placeholder="Enter token name"
          class="mt-4"
          required
        />
        <fieldset>
          <legend class="block text-sm font-medium text-gray-800">
            Select Permissions
          </legend>
          <div class="mt-2 flex flex-col gap-1">
            <div
              v-for="permission in ACCESS_TOKEN_PERMISSIONS"
              class="flex items-center"
            >
              <input
                id="readOnly"
                type="checkbox"
                name="permission"
                value="read-only"
                class="h-4 w-4 text-primary border-gray-300 rounded accent-primary"
              />
              <label for="readOnly" class="ml-2 block text-sm text-gray-700">{{
                permission
              }}</label>
            </div>
          </div>
        </fieldset>
        <div class="flex flex-row gap-3">
          <button type="submit" class="button">Create</button>
          <button
            type="button"
            class="button-ghost"
            @click="tokenToUpdate = null"
          >
            Cancel
          </button>
        </div>
      </form>
    </SharedDialog>
  </table>
</template>

<script setup lang="ts">
import { EyeIcon } from "lucide-vue-next";

const tokenToUpdate = ref<AccessToken | null>(null);

// const { tokenName } = useUpdateTokenForm();

const accessTokens: AccessToken[] = [
  // {
  //   name: "Project Tree",
  //   partialToken: "abc123",
  //   permissions: ACCESS_TOKEN_PERMISSIONS.slice(0, 2),
  //   lastUsed: new Date(),
  //   createdAt: new Date(),
  // },
  // {
  //   name: "Project Appledasdasdasd",
  //   partialToken: "def456",
  //   permissions: ACCESS_TOKEN_PERMISSIONS.slice(2),
  //   lastUsed: new Date(),
  //   createdAt: new Date(),
  // },
];
</script>
