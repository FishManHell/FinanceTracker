import { ref } from 'vue'
import { useQueryClient } from '@tanstack/vue-query'
import { useDeleteBudget, useEditBudget } from '@/entities/budget'
import { useConfirmActions } from '@/shared/lib/hooks'
import type { BudgetWithDate, UseEditBudgetReturn } from './types.ts'

export function useEditBudgetManagement(): UseEditBudgetReturn {
  const { mutate: onMutateEditBudget } = useEditBudget()
  const { mutate: onMutateDeleteBudget } = useDeleteBudget()
  const { confirmDeleteBudget, confirmSaveChanges } = useConfirmActions()

  const editingRows = ref<BudgetWithDate[]>([])
  const originalRow = ref<BudgetWithDate | null>(null)
  const queryClient = useQueryClient()

  const onStartEdit = (row: BudgetWithDate) => {
    editingRows.value = [row]
    originalRow.value = JSON.parse(JSON.stringify(row))
  }

  const onCancelEdit = () => (editingRows.value = [])

  const applyBudgetUpdate = (updated: BudgetWithDate) => {
    const { currency, id, total, date } = updated
    onMutateEditBudget({
      id,
      update: {
        currency,
        total,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
      },
    })
  }

  const saveRowChanges = (row: BudgetWithDate) => {
    if (!originalRow.value) return

    const isChanged = JSON.stringify(originalRow.value) !== JSON.stringify(row)

    if (!isChanged) {
      editingRows.value = []
      return
    }

    const year = row.date.getFullYear()
    const month = row.date.getMonth() + 1

    queryClient.setQueryData(['budgets'], (old: BudgetWithDate[]) =>
      old.map((b) => (b.id === row.id ? { ...row, year, month } : b)),
    )

    applyBudgetUpdate(row)
    editingRows.value = []
  }

  const onSave = (row: BudgetWithDate) => {
    confirmSaveChanges(async () => saveRowChanges(row))
  }
  const onDelete = (id: string) => {
    confirmDeleteBudget(async () => onMutateDeleteBudget(id))
  }

  const isRowEditing = (id: string) => {
    return editingRows.value.some((r) => r.id === id)
  }

  return {
    editingRows,
    onStartEdit,
    onCancelEdit,
    onSave,
    onDelete,
    isRowEditing,
  }
}
