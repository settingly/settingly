import useCurrentProjectId from '@/composables/projects/useCurrentProjectId';
import type { Project } from '@/types/projects';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { usePocketbaseStore } from './usePocketbaseStore';
import { useRoute } from 'vue-router';

type ProjectResponse = Project & {
  filesCount: number;
};

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<ProjectResponse[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const { pocketbase } = usePocketbaseStore();

  const fetchProjects = async () => {
    try {
      isLoading.value = true;

      projects.value = (await pocketbase.collection('projects').getFullList()) as ProjectResponse[];

      projects.value = await Promise.all(
        projects.value.map(async (project) => {
          const filesCount = await pocketbase.collection('files').getList(0, 1, {
            filter: `project = "${project.id}"`,
          });

          return {
            ...project,
            filesCount: filesCount.totalItems,
          };
        }),
      );
    } catch (err) {
      error.value = `Failed to fetch projects: ${(err as Error).message}`;
    } finally {
      isLoading.value = false;
    }
  };

  const route = useRoute();
  const currentProject = computed(() => {
    return projects.value.find((p) => {
      return p.id === route.params.projectId;
    });
  });

  return {
    projects,
    currentProject,
    isLoading,
    error,
    fetchProjects,
  };
});
