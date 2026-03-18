import type { BudgetDTO } from './budget.dto'
import type { Currency } from '@/shared/types'

export interface BudgetUI extends BudgetDTO {
  date: Date
}

export type BudgetsUI = BudgetUI[]

export type BudgetPatchUI = Partial<Omit<BudgetUI, 'id'>>

export interface CreateBudgetInputUI {
  date: Date
  total: number
  currency: Currency
}
