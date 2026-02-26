import type { QueryClient } from '@tanstack/vue-query'
import type { UserWithId, UsersWithId } from '../types/administration.types'

export function updateUserCache(
  queryClient: QueryClient,
  updatedUser: UserWithId | null,
  originalUser?: UserWithId | null,
) {
  queryClient.setQueryData<UsersWithId>(['users'], (users = []) =>
    users.map((user) => {
      const targetId = updatedUser?.id ?? originalUser?.id
      if (user.id !== targetId) return user
      return updatedUser ?? originalUser ?? user
    }),
  )
}
