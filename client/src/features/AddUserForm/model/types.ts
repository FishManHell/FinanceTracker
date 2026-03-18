import { Roles } from '@/shared/config/roles'

export interface AddUserFormValues {
  username: string
  email: string
  password: string
  role: Roles
}

export interface CreateUserPayload extends AddUserFormValues {
  avatar: null
}
