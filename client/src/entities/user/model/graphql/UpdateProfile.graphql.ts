import { gql } from '@apollo/client'

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($params: UpdateProfileInput!) {
    updateProfile(params: $params) {
      id
      username
      avatar
      email
      role
    }
  }
`
