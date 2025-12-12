import { apolloClient } from '@/shared/api/apollo'
import type { Accounts } from '../types/account.type.ts'
import type { DocumentNode } from 'graphql'
import { stripTypename } from '@/shared/lib/graphql'

interface GetAccountResponse {
  accounts: Accounts
}

export const getAccounts = async (query: DocumentNode) => {
  try {
    const { data } = await apolloClient.query<GetAccountResponse>({ query });

    if (!data?.accounts) throw new Error('Accounts not found');

    return stripTypename(data.accounts)
  } catch (error) {
    console.error("getAccounts error", error)
    throw new Error('Failed to fetch accounts')
  }
}
