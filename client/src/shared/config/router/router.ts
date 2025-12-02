import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore/useAuthStore.ts'
import { DashboardPage } from '@/pages/DashboardPage'
import { LoginPage } from '@/pages/SignInPage'
import { RegisterPage } from '@/pages/SignUpPage'
import { AppLayout } from '@/app'
import { AdministrationPage } from '@/pages/AdministrationPage'
import { ADMIN_ROLES, ALL_ROLES, Roles } from '@/shared/config/roles'
import { AppRouters, RoutePaths, type RoutesType } from './types.ts'
import { ProfilePage } from '@/pages/ProfilePage'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    roles?: Roles[]
  }
}

function isAuthenticated(): boolean {
  const authStore = useAuthStore()
  return authStore.isAuthenticated
}

const routes: RoutesType = [
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
    path: RoutePaths[AppRouters.APP_ROUTE],
    name: AppRouters.APP_ROUTE,
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: RoutePaths[AppRouters.DASHBOARD],
        name: AppRouters.DASHBOARD,
        component: DashboardPage,
        meta: { roles: ALL_ROLES },
      },
      {
        path: RoutePaths[AppRouters.ADMINISTRATION],
        name: AppRouters.ADMINISTRATION,
        component: AdministrationPage,
        meta: { roles: ADMIN_ROLES },
      },
      {
        path: RoutePaths[AppRouters.PROFILE],
        name: AppRouters.PROFILE,
        component: ProfilePage,
        meta: {roles: ALL_ROLES}
      },
    ],
  },

  {
    path: RoutePaths[AppRouters.REDIRECT],
    name: AppRouters.REDIRECT,
    redirect: () => {
      if (isAuthenticated()) {
        return { path: RoutePaths[AppRouters.DASHBOARD] }
      } else {
        return { path: RoutePaths[AppRouters.SIGN_IN] }
      }
    },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const user = authStore.user

  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      await authStore.restoreSession()
    }

    if (!authStore.isAuthenticated) {
      next({ name: AppRouters.SIGN_IN })
    }
  }
  if (to.meta.roles && user?.role && !to.meta.roles.includes(user.role)) {
    next({ name: AppRouters.DASHBOARD })
  }

  if (to.name === AppRouters.SIGN_IN && authStore.isAuthenticated) {
    next({ name: AppRouters.DASHBOARD })
  }
  next()
})
