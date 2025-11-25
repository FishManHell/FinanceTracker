import type { UserCredentials } from './user.ts'

export interface IAuthPayload extends Omit<UserCredentials, "password"> {
  email: string;
  role: string;
  token: string
}
