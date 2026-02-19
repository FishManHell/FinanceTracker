import { type BaseBudgetWIthId } from '@/entities/budget'
import type { Ref } from 'vue'

export interface BudgetWithDate extends BaseBudgetWIthId {
  date: Date
}

export interface UseEditBudgetReturn {
  editingRows: Ref<BudgetWithDate[]>
  onStartEdit: (row: BudgetWithDate) => void
  onCancelEdit: () => void
  onSave: (row: BudgetWithDate) => void
  onDelete: (id: string) => void
  isRowEditing: (id: string) => boolean
}
