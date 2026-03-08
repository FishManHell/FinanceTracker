import { useGetUsers } from "./model/composables/useGetUsers.ts";
import { useEditUser } from './model/composables/useEditUser.ts'
import { useDeleteUser } from './model/composables/useDeleteUser.ts'
import type { UserDTO, UsersDTO } from "./model/types/administration.dto.ts"

export { useGetUsers, useEditUser, useDeleteUser }
export type { UserDTO, UsersDTO }
