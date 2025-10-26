import { Document } from 'mongoose'

export type IUserDocument = IUser & Document;

export interface IUser {
  username: string;
  password: string;
  email: string;
}