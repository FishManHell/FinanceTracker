import type { OnSavePayload, Validators } from '@/features/table-editor'
import type { UserWithId } from '@/entities/administration'

export interface AdministrationTableProps {
  data: UserWithId[]
  validators: Validators<UserWithId>
  onSave: (payload: OnSavePayload<UserWithId>) => void
  loading?: boolean
}
