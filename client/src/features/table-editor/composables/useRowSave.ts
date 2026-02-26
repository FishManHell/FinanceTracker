import type { SaveRow, UseRowSaveOptions } from '../types/rowSave.types'
import { ref } from 'vue'

export function useRowSave<T extends { id: string }>(options: UseRowSaveOptions<T>) {
  const isSaving = ref(false)
  const saveRow: SaveRow<T> = (row, originalRow, validationHasErrors) => {
    if (isSaving.value) return { success: false }

    if (validationHasErrors || !originalRow) return { success: false }

    isSaving.value = true

    try {
      const { id, ...rest } = row

      const isChanged = JSON.stringify(originalRow) !== JSON.stringify(row)

      if (!isChanged) return { success: true }

      options.onSave({ id, update: rest, original: originalRow })

      return { success: true }
    } finally {
      isSaving.value = false
    }
  }
  return { saveRow, isSaving }
}
