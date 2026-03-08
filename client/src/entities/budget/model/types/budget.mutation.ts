import type { BudgetDTO } from './budget.dto'
import type { BudgetPatchUI } from './budget.ui'

export interface EditBudgetResponse {
  editBudget: BudgetDTO
}

export type BudgetUpdateDTO = Partial<Omit<BudgetDTO, 'id'>>

export interface EditBudgetInputUI {
  id: string
  update: BudgetPatchUI
}

export interface EditBudgetInputDTO {
  id: string
  update: BudgetUpdateDTO
}

export interface EditBudgetParamsDTO {
  params: EditBudgetInputDTO
}
