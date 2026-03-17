import { gql } from '@apollo/client'

export const ACCOUNT_FRAGMENT = gql`
  fragment AccountBaseFields on Account {
    type
    description
  }
`
