import { useQuery, type UseQueryOptions } from '@tanstack/vue-query'

type UseGraphqlQueryOptions<TQueryFnData, TQueryData = TQueryFnData> = UseQueryOptions<
  TQueryFnData,
  Error,
  TQueryData
>

export function useGraphqlQuery<TQueryFnData, TQueryData = TQueryFnData>(
  options: UseGraphqlQueryOptions<TQueryFnData, TQueryData>,
) {
  return useQuery<TQueryFnData, Error, TQueryData>(options)
}
