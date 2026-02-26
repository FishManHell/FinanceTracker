export interface BaseBudget {
  year: number;
  month: number;
  total: number;
  currency: string;
}


export interface BudgetDetails extends BaseBudget {
  spent: number
  remaining: number
}

export interface BudgetWithId extends BaseBudget {
  id: string
}

export interface BudgetWithDate extends BudgetWithId {
  date: Date
}

export type BudgetsWithDate = BudgetWithDate[]
export type Budgets = BudgetWithId[]
