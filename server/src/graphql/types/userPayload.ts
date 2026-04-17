import { Role } from '#models/User/user.types.js'

export type UserPayload = {
  username: string;
  id: string;
  role: Role
};