import { ObjectId } from 'mongodb'

export interface DefAccount {
  date: Date;
  amount: number;
  category: string;
  type: string;
  currency: string;
  description: string;
}

export interface Transaction extends DefAccount {
  _id: ObjectId;
  userId: ObjectId;
  accountId: ObjectId;
  createdAt: Date;
}

export type DefAccountWithoutType = Omit<DefAccount, "type">
