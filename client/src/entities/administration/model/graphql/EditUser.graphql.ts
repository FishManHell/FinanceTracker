import { gql } from '@apollo/client'
import { ADMINISTRATION_FRAGMENT } from './Fragments.graphql'

export const EDIT_USER = gql`
  mutation EditUser($params: UpdateUserInput!) {
    updatedUser(params: $params) {
      ...AdministrationFragment
    }
  }
  ${ADMINISTRATION_FRAGMENT}
`
