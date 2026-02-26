import { ref } from 'vue'

export function useRowEditing<T extends { id: string }>() {
  const editingRows = ref<T[]>([])
  const originalRow = ref<T | null>(null)

  const isRowEditing = (id: string) => {
    return editingRows.value.some((r) => r.id === id)
  }

  const startEdit = (row: T) => {
    editingRows.value = [row]
    originalRow.value = structuredClone(row)
  }

  const cancelEdit = () => {
    editingRows.value = []
  }

  return {
    editingRows,
    originalRow,
    isRowEditing,
    startEdit,
    cancelEdit,
  }
}
