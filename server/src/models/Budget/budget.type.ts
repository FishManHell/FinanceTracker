import { ObjectId } from 'mongodb'

export interface Budget {
  _id: ObjectId;
  userId: ObjectId;
  year: number;
  month: number;
  totalBudget: number;
  currency: string;
  createdAt: Date;
}