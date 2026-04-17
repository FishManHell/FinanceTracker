import { apolloClient } from '@/shared/api/apollo'
import type { TransactionsMonthlyDTO } from '../types/transaction.dto.ts'
import { GET_TRANSACTIONS_MONTHLY } from '../graphql/GetTransactionsMonthly.graphql.ts'
import { stripTypename } from '@/shared/lib/graphql'

interface GetTransactionsMonthlyResponse {
  transactionsMonthly: TransactionsMonthlyDTO
}

export const getTransactionsMonthly = async (year: number) => {
  const { data } = await apolloClient.query<GetTransactionsMonthlyResponse, { year: number }>({
    query: GET_TRANSACTIONS_MONTHLY,
    variables: { year },
  })

  const transactionsMonthly = data?.transactionsMonthly

  if (!transactionsMonthly) {
    throw new Error('TransactionsMonthly not found')
  }

  return stripTypename(transactionsMonthly)
}
