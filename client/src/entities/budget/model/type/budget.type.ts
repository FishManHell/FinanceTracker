import type { DatePickerModelValue } from '@/entities/budget/model/store/budget.store.ts'

export interface Budget {
  year: number;
  month: number;
  total: number;
  currency: string;
  spent: number;
  remaining: number;
}


export interface BudgetState {
  date: DatePickerModelValue
  currency: string
}
