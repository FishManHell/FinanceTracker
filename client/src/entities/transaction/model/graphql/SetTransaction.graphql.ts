import { gql } from '@apollo/client'

export const SET_TRANSACTION = gql`
  mutation SetTransaction($params: TransactionInput!) {
    setTransaction(params: $params) {
      date
      amount
      category
      type
      currency
      description
    }
  }
`
