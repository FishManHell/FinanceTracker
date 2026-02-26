import { useRowEditing, useRowSave, useRowValidation } from '@/features/table-editor'
import type { EditableTableOptions } from '@/features/table-editor/types/editableTable.types.ts'

export function useEditableTable<T extends { id: string }>(
  options: EditableTableOptions<T>
) {
  const editing = useRowEditing<T>()

  const validation = useRowValidation<T>({
    validators: options.validators,
  })

  const saver = useRowSave<T>({
    onSave: options.onSave,
  })

  const saveRow = (row: T) => {
    validation.validateRow(row)

    if (validation.hasErrors(row.id)) return { success: false }

    return saver.saveRow(row, editing.originalRow.value, false)
  }

  return { ...editing, ...validation, ...saver, saveRow }
}
