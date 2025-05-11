import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { usePocketbaseStore } from '@/stores/usePocketbaseStore';

const accountRoutes: RouteRecordRaw[] = [
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/SignUpView.vue'),
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('@/views/ResetPasswordView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/views/AccountView.vue'),
  },
];

const projectsRoutes: RouteRecordRaw[] = [
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/projects/ProjectsListView.vue'),
  },

  {
    path: '/projects/:projectId/settings',
    name: 'project settings',
    component: () => import('@/views/projects/ProjectSettingsView.vue'),
  },
  {
    path: '/projects/:projectId/files',
    name: 'files',
    component: () => import('@/views/projects/files/FilesListView.vue'),
  },
  {
    path: '/projects/:projectId/files/:fileId',
    name: 'update file',
    component: () => import('@/views/projects/files/UpdateFileView.vue'),
  },
];

const utilRoutes: RouteRecordRaw[] = [
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
  },
  {
    path: '/offline',
    name: 'offline',
    component: () => import('../views/BackendOfflineView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...accountRoutes, ...projectsRoutes, ...utilRoutes],
});

router.beforeEach((to) => {
  if (to.path === '/') {
    return { name: 'projects' };
  }

  const isProtectedRoute = to.path.startsWith('/projects') || to.path.startsWith('/account');
  const { isAuthenticated } = usePocketbaseStore();

  if (isProtectedRoute && !isAuthenticated) {
    return { name: 'login' };
  }
});

export default router;
