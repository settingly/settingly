import type { File_, FileVersion } from '@/types/files';
import type { Project } from '@/types/projects';
import { defineStore, storeToRefs } from 'pinia';
import { computed, reactive, ref, watch } from 'vue';
import { usePocketbaseStore } from './usePocketbaseStore';
import { useRoute } from 'vue-router';
import type { Token } from '@/types/tokens';

type Errors = {
  project: string | null;
  files: string | null;
  tokens: string | null;
};

const errorsDefaults = {
  project: null,
  files: null,
  tokens: null,
};

const loadersDefaults = {
  project: false,
  files: false,
  tokens: false,
};

export default defineStore('currentProject', () => {
  const { pocketbase } = usePocketbaseStore();
  const { user } = storeToRefs(usePocketbaseStore());
  const route = useRoute();

  // State
  const project = ref<Project | null>(null);
  const files = ref<File_[]>([]);
  const fileVersions = ref<FileVersion[]>([]);
  const tokens = ref<Token[]>([]);

  const loaders = reactive(loadersDefaults);

  const errors = reactive<Errors>(errorsDefaults);

  const fetchProject = async (projectId: string) => {
    loaders.project = true;
    try {
      project.value = await pocketbase.collection('projects').getOne<Project>(projectId);
      errors.project = null;
    } catch (error) {
      errors.project = (error as Error).message;
    } finally {
      loaders.project = false;
    }
  };

  const fetchTokens = async (projectId: string) => {
    loaders.tokens = true;
    try {
      tokens.value = await pocketbase.send<Token[]>(`/internal/projects/${projectId}/tokens`, {
        method: 'GET',
      });
      errors.tokens = null;
    } catch (err) {
      errors.tokens = (err as Error).message;
    } finally {
      loaders.tokens = false;
    }
  };

  const fetchFiles = async (projectId: string) => {
    loaders.files = true;
    try {
      const files_ = await pocketbase.collection('files').getFullList({
        filter: `project="${projectId}"`,
        expand: 'file_versions_via_file',
      });
      files.value = files_.map((file) => {
        const versions = file.expand?.['file_versions_via_file'] || [];

        return {
          collectionId: file.collectionId,
          collectionName: file.collectionName,
          id: file.id,
          name: file.name,
          description: file.description,
          created: file.created,
          updated: file.updated,
          project: file.project,
          versions: versions.map((v: FileVersion) => ({
            ...v,
            content: v.content,
            created: v.created,
            updated: v.updated,
          })),
        };
      });
      errors.files = null;
    } catch (error) {
      errors.files = (error as Error).message;
    } finally {
      loaders.files = false;
    }
  };

  const reset = () => {
    project.value = null;
    files.value = [];
    fileVersions.value = [];
    tokens.value = [];

    Object.assign(errors, reactive(errorsDefaults));
    Object.assign(loaders, reactive(loadersDefaults));
  };

  const currentFile = computed(() => {
    const fileId = route.params.fileId;

    if (!fileId) {
      return null;
    }

    return files.value.find((file) => file.id === fileId);
  });

  watch(
    () => [route.fullPath, route.params.projectId],
    async ([newFullPath, newProjectId], [oldFullPath, oldProjectId]) => {
      if (typeof newProjectId === 'undefined') {
        return;
      }

      const hasChangedProjectId = newProjectId !== oldProjectId;

      const newSections = ['/files', '/functions', '/logging'];
      const hasChangedSub = newSections.some(
        (section) => oldFullPath.includes(section) !== newFullPath.includes(section),
      );

      if (hasChangedProjectId) {
        reset();
        await fetchProject(newProjectId as string);
        await fetchTokens(newProjectId as string);
        await fetchFiles(newProjectId as string);
      } else if (hasChangedSub) {
        if (newFullPath.includes('/files')) {
          await fetchFiles(newProjectId as string);
        }
      }
    },
  );

  watch(
    () => user,
    (newUser) => {
      if (newUser.value === null) {
        reset();
      }
    },
  );
  (async () => {
    const projectId = route.params.projectId as string;
    if (projectId) {
      reset();
      await fetchProject(projectId);
      await fetchTokens(projectId);
      await fetchFiles(projectId);
    }
  })();

  return {
    project,
    files,
    fileVersions,
    errors,
    loaders,
    currentFile,
    tokens,
    reset,
  };
});
