import type {
  BudgetUpdateDTO,
  EditBudgetInputDTO,
  EditBudgetInputUI,
} from '../types/budget.mutation.ts'

export function toEditBudgetDTO(input: EditBudgetInputUI): EditBudgetInputDTO {
  const { date, ...rest } = input.update

  const patch: BudgetUpdateDTO = rest

  if (date) {
    patch.year = date.getFullYear()
    patch.month = date.getMonth() + 1
  }

  return { id: input.id, update: patch }
}
