import type { EditableTableOptions } from '../types/editableTable.types'
import { useRowEditing } from './useRowEditing'
import { useRowValidation } from './useRowValidation'
import { useRowSave } from './useRowSave'

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
