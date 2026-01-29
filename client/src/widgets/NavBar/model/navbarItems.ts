import { AppRouters, RoutePaths } from '@/shared/config/router'
import { ADMIN_ROLES, ALL_ROLES } from '@/shared/config/roles'
import type { NavbarItemProps } from './types.ts'

export const navbarItems: NavbarItemProps[] = [
  { separator: true },
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    route: RoutePaths[AppRouters.DASHBOARD],
    roles: ALL_ROLES,
  },
  {
    label: 'Budget Manage',
    icon: 'pi pi-chart-pie',
    route: RoutePaths[AppRouters.MANAGE_BUDGET],
    roles: ALL_ROLES,
  },
  {
    label: 'Administration',
    icon: 'pi pi-user',
    route: RoutePaths[AppRouters.ADMINISTRATION],
    roles: ADMIN_ROLES,
  },
  {
    label: 'Settings',
    icon: 'pi pi-cog',
    route: '/',
    roles: ADMIN_ROLES,
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
  },
]
