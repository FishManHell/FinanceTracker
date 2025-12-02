import type { MenuItem } from 'primevue/menuitem'
import { Roles } from '@/shared/config/roles'

export interface NavbarItemProps extends MenuItem {
  route?: string;
  roles?: Roles[];
}
