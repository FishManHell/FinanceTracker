import type { OnSavePayload, Validators } from '@/features/table-editor'
import type { UserDTO, UsersDTO } from '@/shared/types'

export interface AdministrationTableProps {
  data: UsersDTO
  validators: Validators<UserDTO>
  onSave: (payload: OnSavePayload<UserDTO>) => void
  onDelete: (id: string) => void
  loading?: boolean
  isSkeleton?: boolean
}
