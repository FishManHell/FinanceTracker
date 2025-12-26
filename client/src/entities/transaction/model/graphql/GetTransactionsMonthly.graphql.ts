import { gql } from '@apollo/client'

export const GET_TRANSACTIONS_MONTHLY = gql`
  query GetTransactionsMonthly($year: Int!) {
    transactionsMonthly(year: $year) {
      month
      total,
      currency
    }
  }
`
