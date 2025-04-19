<template>
  <Protect
    v-if="isInOrganization"
    :permission="permission"
    :fallback="fallback"
  >
    <slot></slot>
  </Protect>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const organizationData = useOrganization();

defineProps<{
  permission: string;
  fallback?: string;
}>();

const isInOrganization = computed(() => {
  return (
    organizationData.isLoaded.value &&
    organizationData.organization.value !== null
  );
});
</script>
