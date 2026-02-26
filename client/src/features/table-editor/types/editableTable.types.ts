import type { Ref } from 'vue'
import type { OnSavePayload } from './rowSave.types'
import type { Validators } from "./rowValidation.types"

export interface EditableTableOptions<T extends { id: string }> {
  data: Ref<T[] | undefined>
  validators: Validators<T>
  onSave: (payload: OnSavePayload<T>) => void
}
