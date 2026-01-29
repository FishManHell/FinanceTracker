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


export interface BudgetState {
  currency: string;
  date: Date
}


export type Budgets = BaseBudgetWIthId[]
