import { TransactionWithoutType } from "./transaction.base.js";
import { TransactionAccount } from "./transaction.account.js";

interface TransactionArgsWithAccountFields extends TransactionWithoutType {
  account: TransactionAccount;
}

export interface TransactionParams {
  params: TransactionArgsWithAccountFields
}