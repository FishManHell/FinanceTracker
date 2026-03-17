import { useGraphqlQuery } from '@/shared/lib/hooks'
import type { Accounts } from '../types/account.type.ts'
import { getAccounts as queryFn } from '../api/getAccounts.ts'

export function useGetAccounts() {
  return useGraphqlQuery<Accounts>({
    queryKey: ['accounts'],
    queryFn,
  })
}
