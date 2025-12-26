export interface Account {
  type: string
  description: string
}

export interface Transaction {
  date: Date;
  amount: number;
  category: string;
  type: string;
  currency: string;
  description: string;
  account: Account
}

export interface TransactionMonthly {
  month: number;
  total: number;
  currency: string;
}

export type TransactionsMonthly = TransactionMonthly[]

export type Transactions = Transaction[]

export type TransactionWithoutType = Omit<Transaction, "type">
