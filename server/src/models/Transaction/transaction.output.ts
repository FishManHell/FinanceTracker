import { BaseTransactionFields } from "./transaction.base.js";

export interface CreatedTransactionResponse extends BaseTransactionFields {
  id: string;
}

export interface MonthlyTransactionSummary {
  month: number;
  total: number;
  currency: string;
}