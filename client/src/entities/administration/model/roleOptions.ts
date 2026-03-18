import { Roles } from '@/shared/config/roles'
import type { SelectOption } from '@/shared/types'

export const roleOptions: SelectOption<Roles>[] = [
  { label: 'Super Admin', value: Roles.SUPERADMIN },
  { label: 'Admin', value: Roles.ADMIN },
  { label: 'Developer', value: Roles.DEVELOPER },
  { label: 'User', value: Roles.USER },
]

export const roleSeverityMap: Record<Roles, 'danger' | 'warn' | 'info' | 'success'> = {
  [Roles.SUPERADMIN]: 'danger',
  [Roles.ADMIN]: 'warn',
  [Roles.DEVELOPER]: 'info',
  [Roles.USER]: 'success',
}

export const getRoleLabel = (role: Roles) => {
  return roleOptions.find((option) => option.value === role)?.label ?? role
}
