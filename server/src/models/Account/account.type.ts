import { ObjectId } from 'mongodb'

export interface Account {
  _id: ObjectId;
  userId: ObjectId;
  type: string
  amount: number
  currency: string
  description: string
}