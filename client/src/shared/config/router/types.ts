import type { RouteRecordRaw } from 'vue-router'

export enum AppRouters {
  APP_ROUTE = 'app_route',
  SIGN_IN = 'sign_in',
  SIGN_UP = 'sign_up',
  DASHBOARD = 'dashboard',
  ADMINISTRATION = 'administration',
  PROFILE = 'profile',
  REDIRECT = "redirect",
}

export const RoutePaths = {
  [AppRouters.APP_ROUTE]: '/',
  [AppRouters.SIGN_IN]: '/sign_in',
  [AppRouters.SIGN_UP]: '/sign_up',
  [AppRouters.DASHBOARD]: '/dashboard',
  [AppRouters.ADMINISTRATION]: '/administration',
  [AppRouters.PROFILE]: '/profile',
  [AppRouters.REDIRECT]: "/:pathMatch(.*)*"
} as const

export type AppRouteRecord<K extends AppRouters> = RouteRecordRaw & {
  name: K;
  path: (typeof RoutePaths)[K];
};

export type RoutesType = AppRouteRecord<AppRouters>[]
