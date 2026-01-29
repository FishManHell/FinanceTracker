import { BaseBudgetFields } from './budget.base.js'

export interface BudgetResponse extends BaseBudgetFields {
  id: string
}

export type EditBudgetResponse = BudgetResponse
export type SetBudgetResponse = BudgetResponse
export type GetBudgetsResponse = BudgetResponse

export interface GetBudgetResponse extends BaseBudgetFields {
  total: number;
  remaining: number;
  spent: number;
}