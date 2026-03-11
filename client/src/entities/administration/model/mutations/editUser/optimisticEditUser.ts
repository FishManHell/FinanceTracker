import type { QueryClient } from '@tanstack/vue-query'
import type { EditUserInput } from '../../types/administration.mutation.ts'
import { usePatchRowCache } from '@/shared/lib/hooks'
import type { UserDTO, UsersDTO } from '@/shared/types'

interface OptimisticEditUserOptions {
  queryClient: QueryClient
  variables: EditUserInput;
}

export async function optimisticEditUser(options: OptimisticEditUserOptions) {
  const { queryClient, variables } = options

  await queryClient.cancelQueries({ queryKey: ['users'] })

  const previousUsers = queryClient.getQueryData<UsersDTO>(['users'])

  usePatchRowCache<UserDTO>(queryClient, ['users'], {
    ...variables.update,
    id: variables.id,
  })

  return { previousUsers }
}
