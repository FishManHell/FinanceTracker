import { createColumns } from '@/shared/lib/table'
import type { UserDTO } from '@/shared/types'
import { EditTextCell } from '@/shared/ui/EditTextCell'
import { EditSelectCell } from '@/shared/ui/EditSelectCell'

export const createUserColumns = (
  canEditUserRole: (user: UserDTO) => boolean
) => createColumns<UserDTO>()([
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
      editor: (row: UserDTO) => {
        return canEditUserRole(row) ? EditSelectCell : null
      },
      options: ['admin', 'user', 'developer', 'super_admin'] as const,
    },
  ])
