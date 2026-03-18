import { createColumns } from '@/shared/lib/table'
import type { UserDTO } from '@/shared/types'
import { EditTextCell } from '@/shared/ui/EditTextCell'
import { EditSelectCell } from '@/shared/ui/EditSelectCell'
import Tag from 'primevue/tag'
import { getRoleLabel, roleOptions, roleSeverityMap } from '@/entities/administration'

export const createUserColumns = (canEditUserRole: (user: UserDTO) => boolean) =>
  createColumns<UserDTO>()([
    {
      field: 'id',
      header: 'ID',
    },
    {
      field: 'username',
      header: 'Username',
      editor: EditTextCell,
    },
    {
      field: 'email',
      header: 'Email',
    },
    {
      field: 'role',
      header: 'Role',
      formatter: (value) => ({
        component: Tag,
        props: {
          value: getRoleLabel(value),
          severity: roleSeverityMap[value],
        },
      }),
      editor: (row: UserDTO) => {
        return canEditUserRole(row) ? EditSelectCell : null
      },
      options: roleOptions,
    },
  ])
