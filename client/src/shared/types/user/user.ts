import { Roles } from '@/shared/config/roles'

export interface Credentials {
  username: string
  password: string
}

export interface User {
  email: string
  role: Roles
  username: string
  avatar: string | null
}

export type UserDTO = User & { id: string }
export type UsersDTO = UserDTO[]
