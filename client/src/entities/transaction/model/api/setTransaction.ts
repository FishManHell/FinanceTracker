import { apolloClient } from '@/shared/api/apollo'
import { SET_TRANSACTION } from '../graphql/SetTransaction.graphql.ts'
import type { TransactionWithoutType, Transaction } from '../types/transaction.type.ts'

interface SetTransactionResponse {
  transaction: Transaction
}

interface SetTransactionVariables {
  params: TransactionWithoutType
}

export const setTransaction = async (transaction: TransactionWithoutType) => {
  try {
    const { data } = await apolloClient.mutate<SetTransactionResponse, SetTransactionVariables>({
      mutation: SET_TRANSACTION,
      variables: { params: transaction },
    })

    if (!data?.transaction) {
      throw new Error('Failed to set transaction')
    }

    return data.transaction
  } catch (error) {
    throw error
  }
}
