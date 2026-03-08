import type { User } from '@/shared/types'
import type { UserDTO } from './administration.dto.ts'

export interface EditUserResponse {
  updatedUser: UserDTO
}

export type EditUserPatch = Partial<User>

export interface EditUserInput {
  id: string
  update: EditUserPatch
}

export interface EditUserParams {
  params: EditUserInput
}

export interface DeleteUserInput {
  id: string
}

export interface DeleteUserParams {
  params: DeleteUserInput
}

export interface DeleteUserResponse {
  deleteUser: boolean
}
