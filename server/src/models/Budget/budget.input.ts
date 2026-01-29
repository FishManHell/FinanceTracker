import { BaseBudgetFields } from './budget.base.js'

export interface BudgetParams<Args> {
  params: Args;
}

export interface EditBudgetInput {
  id: string
  update: BaseBudgetFields
}

export type EditBudgetParams = BudgetParams<EditBudgetInput>

export type SetBudgetParams = BudgetParams<BaseBudgetFields>;

export type DeleteBudgetParams = BudgetParams<{ id: string }>;