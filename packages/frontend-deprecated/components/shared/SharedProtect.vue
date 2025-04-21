<template>
  <Protect
    v-if="isInOrganization"
    :condition="
      (has) => {
        if (group === 'org:member') {
          return has({ role: 'org:member' }) || has({ role: 'org:admin' });
        } else {
          return has({ role: group });
        }
      }
    "
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
  group: "org:member" | "org:admin";
  fallback?: string;
}>();

const isInOrganization = computed(() => {
  return (
    organizationData.isLoaded.value &&
    organizationData.organization.value !== null
  );
});
</script>
