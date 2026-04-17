import { apolloClient } from '@/shared/api/apollo'
import { GET_TRANSACTIONS } from '../graphql/GetTransactions.graphql.ts'
import { stripTypename } from '@/shared/lib/graphql'
import type {
  GetTransactionsParams,
  GetTransactionsResponse,
} from '../types/transaction.mutation.ts'

export const getTransactions = async (params: GetTransactionsParams) => {
  const { data } = await apolloClient.query<GetTransactionsResponse, GetTransactionsParams>({
    query: GET_TRANSACTIONS,
    variables: params,
    fetchPolicy: 'no-cache',
  })

  const transactions = data?.transactions
  if (!transactions) {
    throw new Error('Transactions not found')
  }
  return stripTypename(transactions)
}
