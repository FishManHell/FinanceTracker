import type { User } from '@/shared/types'

export type UserDTO = User & {id: string};
export type UsersDTO = UserDTO[];
