import type { User } from '@/shared/types'

export type UserWithId = User & { id: string }

export type UsersWithId = UserWithId[]
