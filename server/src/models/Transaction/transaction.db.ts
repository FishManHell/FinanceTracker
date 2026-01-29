import { ObjectId } from "mongodb";
import { BaseTransactionFields } from "./transaction.base.js";
import { TransactionAccount } from "./transaction.account.js";

export interface Transaction extends BaseTransactionFields {
  _id: ObjectId;
  userId: ObjectId;
  accountId: ObjectId;
  createdAt: Date;
}

export interface TransactionWithAccount extends Transaction {
  account: TransactionAccount;
}
