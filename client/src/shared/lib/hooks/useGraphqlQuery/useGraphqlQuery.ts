import { useQuery, type UseQueryOptions } from '@tanstack/vue-query'

type UseGraphqlQueryOptions<TData> = UseQueryOptions<TData, Error>

export function useGraphqlQuery<TData>(options: UseGraphqlQueryOptions<TData>) {
  return useQuery<TData>(options)
}
