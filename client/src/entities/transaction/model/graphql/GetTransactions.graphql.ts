import { gql } from '@apollo/client'
import { TRANSACTION_FRAGMENT, ACCOUNT_FRAGMENT } from './Fragments.graphql.ts'

export const GET_TRANSACTIONS = gql`
  query GetTransactions($year: Int!, $month: Int!) {
    transactions(year: $year, month: $month) {
      ...TransactionFields
      ...AccountFields
    }
  }
  ${TRANSACTION_FRAGMENT}
  ${ACCOUNT_FRAGMENT}
`
