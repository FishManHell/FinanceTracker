import type { CreateBudgetDTO } from '../types/budget.dto.ts'
import type { CreateBudgetInputUI } from '../types/budget.ui.ts'

export function toCreateBudgetDTO(input: CreateBudgetInputUI): CreateBudgetDTO {
  return {
    year: input.date.getFullYear(),
    month: input.date.getMonth() + 1,
    total: input.total,
    currency: input.currency,
  }
}
