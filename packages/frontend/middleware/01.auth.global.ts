const isProtectedRoute = createRouteMatcher(["/_(.*)"]);

export default defineNuxtRouteMiddleware((to) => {
  const { userId } = useAuth();

  if (!userId.value && isProtectedRoute(to)) {
    return navigateTo("/signin");
  }
});
