import { gql } from '@apollo/client'

export const ACCOUNT_FRAGMENT = gql`
  fragment AccountFields on Transaction {
    account {
      type
      description
    }
  }
`

export const TRANSACTION_FRAGMENT = gql`
  fragment TransactionFields on Transaction {
    date
    amount
    category
    type
    currency
    description
  }
`

export const TRANSACTION_FRAGMENT_WITHOUT_TYPE = gql`
  fragment TransactionFieldsWithoutType on Transaction {
    date
    amount
    category
    currency
    description
  }
`
