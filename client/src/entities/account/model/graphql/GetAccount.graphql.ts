import { gql } from '@apollo/client'

export const ACCOUNT_BASE_FIELDS = gql`
  fragment AccountBaseFields on Account {
    type
    description
  }
`

export const GET_ACCOUNTS_SELECT = gql`
  query GetAccountsSelect {
    accounts {
      ...AccountBaseFields
    }
  }
  ${ACCOUNT_BASE_FIELDS}
`

export const GET_ACCOUNTS_FULL = gql`
  query GetAccountsFull {
    accounts {
      ...AccountBaseFields
      currency
      amount
    }
  }
  ${ACCOUNT_BASE_FIELDS}
`
