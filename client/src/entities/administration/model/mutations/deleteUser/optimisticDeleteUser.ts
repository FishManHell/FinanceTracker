import type { QueryClient } from '@tanstack/vue-query'
import type { DeleteUserInput } from '../../types/administration.mutation'
import type { UsersDTO } from '@/shared/types'

interface OptimisticDeleteUserOptions {
  queryClient: QueryClient
  variables: DeleteUserInput
}

export async function optimisticDeleteUser(options: OptimisticDeleteUserOptions) {
  const { variables, queryClient } = options

  await queryClient.cancelQueries({ queryKey: ['users'] })

  const previousUsers = queryClient.getQueryData<UsersDTO>(['users'])

  queryClient.setQueryData<UsersDTO>(['users'], (rows = []) => {
    return rows.filter((row) => row.id !== variables.id)
  })

  return { previousUsers }
}
