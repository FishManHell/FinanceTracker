import { apolloClient } from '@/shared/api/apollo'
import { GET_TRANSACTIONS } from '../graphql/GetTransactions.graphql.ts'
import { stripTypename } from '@/shared/lib/graphql'
import type { Transactions } from '../types/transaction.type.ts'

export interface GetTransactionsParams {
  year: number;
  month: number;
}

interface GetTransactionsResponse {
  transactions: Transactions
}

export const getTransactions = async (params: GetTransactionsParams) => {
  try {
    const { data } = await apolloClient.query<GetTransactionsResponse, GetTransactionsParams>({
      query: GET_TRANSACTIONS,
      variables: params,
    })

    const transactions = data?.transactions;
    if (!transactions) {
      throw new Error('Transactions not found')
    }

    return stripTypename(transactions)
  } catch (error) {
    console.error("getTransactions", error)
    throw error
  }
}
