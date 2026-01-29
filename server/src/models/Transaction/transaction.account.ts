export const ACCOUNT_TYPES = [
  "card",
  "cash",
  "bank",
  "crypto",
  "investment"
] as const;

export type AccountType = typeof ACCOUNT_TYPES[number];

export interface TransactionAccount {
  type: AccountType;
  description: string;
}
