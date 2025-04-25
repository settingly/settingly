import type { Project } from '@/types/projects';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { usePocketbaseStore } from './usePocketbaseStore';
import { useRoute } from 'vue-router';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const { pocketbase } = usePocketbaseStore();

  const fetchProjects = async () => {
    try {
      isLoading.value = true;

      projects.value = await pocketbase.collection('projects').getFullList<Project>();
    } catch (err) {
      error.value = `Failed to fetch projects: ${(err as Error).message}`;
    } finally {
      isLoading.value = false;
    }
  };

  (async () => {
    await fetchProjects();
  })();

  return {
    projects,
    isLoading,
    error,
  };
});
