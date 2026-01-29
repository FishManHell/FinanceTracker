export type TransactionType = "income" | "expense";

export interface BaseTransactionFields {
  date: Date;
  amount: number;
  category: string;
  type: TransactionType;
  currency: string;
  description: string;
}

export type TransactionWithoutType = Omit<BaseTransactionFields, "type">;
