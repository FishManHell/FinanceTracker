import type { OnSavePayload, Validators } from '@/features/table-editor'
import type { UserDTO, UsersDTO } from '@/entities/administration'

export interface AdministrationTableProps {
  data: UsersDTO
  validators: Validators<UserDTO>
  onSave: (payload: OnSavePayload<UserDTO>) => void
  onDelete: (id: string) => void
  loading?: boolean
  isSkeleton?: boolean
}
