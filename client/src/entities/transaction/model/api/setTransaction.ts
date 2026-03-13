import { apolloClient } from '@/shared/api/apollo'
import { SET_TRANSACTION } from '../graphql/SetTransaction.graphql.ts'
import type { TransactionBaseDTO, TransactionDTO } from '../types/transaction.dto.ts'

interface SetTransactionResponse {
  transaction: TransactionDTO
}

interface SetTransactionVariables {
  params: TransactionBaseDTO
}

export const setTransaction = async (transaction: TransactionBaseDTO) => {
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
