import { gql } from '@apollo/client'

export const DELETE_USER = gql`
  mutation EditUser($params: DeleteUserInput!) {
    deleteUser(params: $params)
  }
`
