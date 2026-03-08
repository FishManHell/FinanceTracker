import { useGraphqlQuery } from '@/shared/lib/hooks'
import { getUsers } from '../api/getUsers.ts'
import type { UsersDTO } from '../types/administration.dto'

export function useGetUsers() {
  return useGraphqlQuery<UsersDTO>({
    queryKey: ['users'],
    queryFn: async () => getUsers(),
  })
}
