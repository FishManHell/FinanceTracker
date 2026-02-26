import { useGraphqlQuery } from '@/shared/lib/hooks'
import { getUsers } from '../api/getUsers.ts'
import type { UsersWithId } from '../types/administration.types'

export function useGetUsers() {
  return useGraphqlQuery<UsersWithId>({
    queryKey: ['users'],
    queryFn: async () => getUsers(),
  })
}
