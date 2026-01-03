export interface Budget {
  year: number;
  month: number;
  total: number;
  currency: string;
  spent: number;
  remaining: number;
}


export interface BudgetState {
  currency: string;
  year: number;
  month: number;
}
