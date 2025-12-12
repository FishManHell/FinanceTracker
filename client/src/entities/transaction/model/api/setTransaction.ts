import type { Transaction } from '@/entities/transaction';
import { apolloClient } from '@/shared/api/apollo'
import { SET_TRANSACTION } from '../graphql/SetTransaction.graphql.ts'

interface SetTransactionResponse {
  setTransaction: Transaction
}

interface SetTransactionVariables {
  params: Transaction
}

export const setTransaction = async (transaction: Transaction) => {
  try {
    const { data } = await apolloClient.mutate<SetTransactionResponse, SetTransactionVariables>({
      mutation: SET_TRANSACTION,
      variables: {
        params: transaction
      },
    })

    if (!data?.setTransaction) {
      throw new Error('Failed to set transaction')
    }

    return data.setTransaction;
  } catch (error) {
    throw error
  }
}
