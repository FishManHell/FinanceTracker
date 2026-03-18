import { gql } from '@apollo/client'

export const ADMINISTRATION_FRAGMENT = gql`
  fragment AdministrationFragment on User {
    id
    username
    email
    role
    avatar
  }
`
