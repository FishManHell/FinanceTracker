export interface Account {
  type: string
  amount: number
  currency: string
  description: string
}

export type Accounts = Account[]
