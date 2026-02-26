import { gql } from '@apollo/client'

export const EDIT_USER = gql`
  mutation EditUser($params: EditUserInput!) {
    updatedUser(params: $params) {
      id
      username
      email
      role
      avatar
    }
  }
`
