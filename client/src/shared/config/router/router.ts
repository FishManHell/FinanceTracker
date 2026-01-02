import { createRouter, createWebHistory } from 'vue-router'
import { DashboardPage } from '@/pages/DashboardPage'
import { LoginPage } from '@/pages/SignInPage'
import { RegisterPage } from '@/pages/SignUpPage'
import { AppLayout } from '@/app'
import { AdministrationPage } from '@/pages/AdministrationPage'
import { ADMIN_ROLES, ALL_ROLES, Roles } from '@/shared/config/roles'
import { AppRouters, RoutePaths, type RoutesType } from './types.ts'
import { ProfilePage } from '@/pages/ProfilePage'
import { refresh } from '@/entities/auth'
import { userStore } from "@/entities/user";
import { sessionStore } from "@/entities/auth"

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    roles?: Roles[]
  }
}

function isAuthenticated(): boolean {
  const session_store = sessionStore();
  return session_store.isAuthenticated
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

router.beforeEach(async (to) => {
  const session_store = sessionStore();
  const user_store = userStore();
  const isAuth = session_store.isAuthenticated
  const user = user_store.user

  if (to.meta.requiresAuth) {
    if (!isAuth) {
      await refresh()
    }

    if (!isAuth) {
      return { name: AppRouters.SIGN_IN }
    }
  }
  if (to.meta.roles && user?.role && !to.meta.roles.includes(user.role)) {
    return { name: AppRouters.DASHBOARD }
  }

  if (to.name === AppRouters.SIGN_IN && isAuth) {
    return { name: AppRouters.DASHBOARD }
  }
  return true
})
