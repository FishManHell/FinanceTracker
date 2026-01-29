import { ObjectId } from 'mongodb'
import { BaseBudgetFields } from './budget.base.js'

export interface Budget extends BaseBudgetFields{
  _id: ObjectId;
  userId: ObjectId;
  createdAt: Date;
}