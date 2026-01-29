import { useQuery, type UseQueryOptions } from '@tanstack/vue-query'

type UseGraphqlQueryOptions<TQueryFnData> = UseQueryOptions<TQueryFnData, Error>

export function useGraphqlQuery<TQueryFnData>(options: UseGraphqlQueryOptions<TQueryFnData>) {
  return useQuery<TQueryFnData>(options)
}
