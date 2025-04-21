import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SignUpView from '@/views/SignUpView.vue';
import LoginView from '@/views/LoginView.vue';
import ResetPasswordView from '@/views/ResetPasswordView.vue';
import { usePocketbaseStore } from '@/stores/usePocketbaseStore';
import ProjectsListView from '@/views/projects/ProjectsListView.vue';
import UpdateFileView from '@/views/projects/files/UpdateFileView.vue';
import FilesListView from '@/views/projects/files/FilesListView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import ProjectSettingsView from '@/views/projects/ProjectSettingsView.vue';
import ImprintView from '@/views/legal/ImprintView.vue';
import PrivacyView from '@/views/legal/PrivacyView.vue';
import SingleDocumentView from '@/views/docs/SingleDocumentView.vue';
import DocumentsListView from '@/views/docs/DocumentsListView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => NotFoundView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => NotFoundView,
    },
    {
      path: '/legal/imprint',
      name: 'imprint',
      component: () => ImprintView,
    },
    {
      path: '/legal/privacy',
      name: 'privacy',
      component: () => PrivacyView,
    },
    {
      path: '/',
      name: 'home',
      component: () => HomeView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => SignUpView,
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => ResetPasswordView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => LoginView,
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => ProjectsListView,
    },
    {
      path: '/projects/:projectId/settings',
      name: 'project settings',
      component: () => ProjectSettingsView,
    },
    {
      path: '/projects/:projectId/files',
      name: 'files',
      component: () => FilesListView,
    },
    {
      path: '/projects/:projectId/files/:fileId',
      name: 'update file',
      component: () => UpdateFileView,
    },
    {
      path: '/docs',
      name: 'docs home',
      component: () => DocumentsListView,
    },
    {
      path: '/docs/:categorySlug/:pageSlug',
      name: 'docs page',
      component: () => SingleDocumentView,
    },
  ],
});

router.beforeEach((to) => {
  // as regexes
  const isProtectedRoute = to.path.startsWith('/projects');
  const { isAuthenticated } = usePocketbaseStore();

  if (isProtectedRoute && !isAuthenticated) {
    return { name: 'login' };
  }
});

export default router;
