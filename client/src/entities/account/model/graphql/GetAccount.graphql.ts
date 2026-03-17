import { gql } from '@apollo/client'
import { ACCOUNT_FRAGMENT } from './Fragments.graphql'

export const GET_ACCOUNTS_SELECT = gql`
  query GetAccountsSelect {
    accounts {
      ...AccountBaseFields
    }
  }
  ${ACCOUNT_FRAGMENT}
`

export const GET_ACCOUNTS_FULL = gql`
  query GetAccountsFull {
    accounts {
      ...AccountBaseFields
      currency
      amount
    }
  }
  ${ACCOUNT_FRAGMENT}
`
