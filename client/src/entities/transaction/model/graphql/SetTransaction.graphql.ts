import { gql } from '@apollo/client'
import { TRANSACTION_FRAGMENT_WITHOUT_TYPE } from './Fragments.graphql.ts'

export const SET_TRANSACTION = gql`
  mutation SetTransaction($params: TransactionInput!) {
    transaction(params: $params) {
      ...TransactionFieldsWithoutType
    }
  }
  ${TRANSACTION_FRAGMENT_WITHOUT_TYPE}
`
