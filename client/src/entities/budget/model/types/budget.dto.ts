import type { Currency } from '@/shared/types'

export interface BudgetDTO {
  id: string
  year: number
  month: number
  total: number
  currency: Currency
}

export interface BudgetDetailsDTO extends BudgetDTO {
  spent: number
  remaining: number
}

export type CreateBudgetDTO = Omit<BudgetDTO, 'id'>

export type BudgetsDTO = BudgetDTO[]
