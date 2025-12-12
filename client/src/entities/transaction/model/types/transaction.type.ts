interface Account {
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
