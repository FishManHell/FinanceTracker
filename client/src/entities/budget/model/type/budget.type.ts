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

export interface BaseBudgetWIthId extends BaseBudget {
  id: string
}

export type Budgets = BaseBudgetWIthId[]
