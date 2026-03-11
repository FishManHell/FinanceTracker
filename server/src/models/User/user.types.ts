import { ObjectId } from 'mongodb'

export const Roles = {
  DEVELOPER: "developer",
  USER: "user",
  ADMIN: "admin",
  SUPERADMIN: "super_admin",
} as const;

export type Role = typeof Roles[keyof typeof Roles];

export interface UserDocument {
  _id: ObjectId;
  username: string;
  password: string;
  email: string;
  role: Role;
  avatar: string | null;
}

export interface UserDTO {
  id: string;
  username: string;
  email: string;
  role: Role;
  avatar: string | null;
}

export type UsersDTO = UserDTO[]

export type CreateUserDTO = Omit<UserDTO, 'id'>
export type UpdateUserDTO = Partial<Omit<UserDTO, 'id'>>