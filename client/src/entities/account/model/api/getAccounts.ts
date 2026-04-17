import { apolloClient } from '@/shared/api/apollo'
import type { Accounts } from '../types/account.type.ts'
import { stripTypename } from '@/shared/lib/graphql'
import { GET_ACCOUNTS_SELECT } from '@/entities/account'

interface GetAccountResponse {
  accounts: Accounts
}

export const getAccounts = async () => {
  const { data } = await apolloClient.query<GetAccountResponse>({
    query: GET_ACCOUNTS_SELECT,
  })

  if (!data?.accounts) throw new Error('Accounts not found')
  return stripTypename(data.accounts)
}
