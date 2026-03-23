import { apolloClient } from '@/shared/api/apollo'
import { stripTypename } from '@/shared/lib/graphql'
import { CREATE_ACCOUNT } from '../graphql/CreateAccount.graphql'
import type { AccountDTO } from '@/entities/transaction'

interface CreateAccountInput {
  type: string;
  description: string;
  currency: string;
  amount: number;
}

export const createAccount = async (params: CreateAccountInput): Promise<AccountDTO> => {
  try {
    const { data } = await apolloClient.mutate<
      { createAccount: AccountDTO },
      { params: CreateAccountInput }
    >({
      mutation: CREATE_ACCOUNT,
      variables: { params },
    })

    if (!data) throw new Error('Account not found')

    return stripTypename(data.createAccount)
  } catch (error) {
    console.error(error)
    throw error
  }
}
