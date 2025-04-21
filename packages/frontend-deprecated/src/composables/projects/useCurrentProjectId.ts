import { computed } from 'vue';
import { useRoute } from 'vue-router';

/**
 *
 * @deprecated Use `useRoute` directly instead.
 */
export default function useCurrentProjectId() {
  return computed(() => {
    const route = useRoute();
    if (!route || !route.params) {
      return undefined;
    }

    const projectId = route.params.projectId;

    if (!projectId) {
      return undefined;
    }

    return typeof projectId === 'string' ? projectId : projectId[0];
  });
}
