export interface BudgetDTO {
  id: string
  year: number
  month: number
  total: number
  currency: string
}

export interface BudgetDetailsDTO extends BudgetDTO {
  spent: number
  remaining: number
}

export type CreateBudgetDTO = Omit<BudgetDTO, 'id'>

export type BudgetsDTO = BudgetDTO[]
