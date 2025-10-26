import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore.ts'
import { DashboardPage } from '@/pages/DashboardPage'
import { LoginPage } from '@/pages/SignInPage'
import { RegisterPage } from '@/pages/SignUpPage'

function isAuthenticated(): boolean {
  const authStore = useAuthStore();
  return authStore.isAuthenticated;
}

export enum AppRouters {
  SIGN_IN = 'sign_in',
  SIGN_UP = 'sign_up',
  DASHBOARD = 'dashboard',
  REDIRECT = "redirect",
}

export const RoutePaths = {
  [AppRouters.SIGN_IN]: '/sign_in',
  [AppRouters.SIGN_UP]: '/sign_up',
  [AppRouters.DASHBOARD]: '/dashboard',
  [AppRouters.REDIRECT]: "/:pathMatch(.*)*"
} as const

type AppRouteRecord<K extends AppRouters> = RouteRecordRaw & {
  name: K;
  path: (typeof RoutePaths)[K];
};

const routes:AppRouteRecord<AppRouters>[] = [
  {
    path: RoutePaths[AppRouters.SIGN_IN],
    name: AppRouters.SIGN_IN,
    component: LoginPage,
    meta: { requiresAuth: false },
  },
  {
    path: RoutePaths[AppRouters.SIGN_UP],
    name: AppRouters.SIGN_UP,
    component: RegisterPage,
    meta: { requiresAuth: false },
  },
  {
    path: RoutePaths[AppRouters.DASHBOARD],
    name: AppRouters.DASHBOARD,
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: RoutePaths[AppRouters.REDIRECT],
    name: AppRouters.REDIRECT,
    redirect: () => {
      if (isAuthenticated()) {
        return { path: RoutePaths[AppRouters.DASHBOARD] };
      } else {
        return { path: RoutePaths[AppRouters.SIGN_IN] };
      }
    },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: AppRouters.SIGN_IN });
  } else if (to.name === AppRouters.SIGN_IN && authStore.isAuthenticated) {
    next({ name: AppRouters.DASHBOARD });
  } else {
    next();
  }
});
