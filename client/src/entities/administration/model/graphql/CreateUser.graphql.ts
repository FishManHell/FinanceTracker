import { gql } from '@apollo/client'
import { ADMINISTRATION_FRAGMENT } from './Fragments.graphql'


export const CREATE_USER = gql`
  mutation CreateUser($params: CreateUserInput!) {
    createUser(params: $params) {
      ...AdministrationFragment
    }
  }
  ${ADMINISTRATION_FRAGMENT}
`
