import { gql } from '@apollo/client'
import { ACCOUNT_FRAGMENT } from './Fragments.graphql'

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount($params: CreateAccountInput!) {
    createAccount(params: $params) {
      ...AccountBaseFields
      currency
      amount
    }
  }
  ${ACCOUNT_FRAGMENT}
`
