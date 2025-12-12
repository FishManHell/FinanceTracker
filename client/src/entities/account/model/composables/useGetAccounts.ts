import type { DocumentNode } from 'graphql'
import { useGraphqlQuery } from '@/shared/lib/hooks'
import type { Accounts } from '../types/account.type.ts'
import type { UseQueryOptions } from '@tanstack/vue-query'
import { getAccounts } from '../api/getAccounts.ts'

export function useGetAccounts(graphqlDefs: DocumentNode, options?: Omit<UseQueryOptions<Accounts, Error>, 'queryFn' | 'queryKey'>) {
  return useGraphqlQuery<Accounts>({
    queryKey: ['accounts'],
    queryFn: async () => getAccounts(graphqlDefs),
    ...options,
  })
}
