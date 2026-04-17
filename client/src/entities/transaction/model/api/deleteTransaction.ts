import { apolloClient } from '@/shared/api/apollo'
import { DELETE_TRANSACTION } from '../graphql/DeleteTransaction.graphql'
import type {
  DeleteTransactionResponse,
} from '../types/transaction.mutation'


export const deleteTransaction = async (id: string) => {
  const { data } = await apolloClient.mutate<DeleteTransactionResponse, { id: string }>({
    mutation: DELETE_TRANSACTION,
    variables: { id },
  })
  if (!data) {
    throw new Error('No data returned from delete transaction')
  }
  return data.deleteTransaction
}
