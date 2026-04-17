import { apolloClient } from '@/shared/api/apollo'
import type { RefreshResponse } from '../types/storeTypes.ts'
import { REFRESH_QUERY } from '../graphql/Refresh.ts'
import type { UserDTO } from '@/shared/types'
import { stripTypename } from '@/shared/lib/graphql'

export const refresh = async (): Promise<UserDTO> => {
  const { data } = await apolloClient.query<RefreshResponse>({
    query: REFRESH_QUERY,
    fetchPolicy: 'network-only',
  })

  if (!data?.refresh) throw new Error('No data returned from refresh')

  return stripTypename(data.refresh)
}
