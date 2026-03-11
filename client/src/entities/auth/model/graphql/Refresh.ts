import { gql } from '@apollo/client'
import { AUTH_PAYLOAD_FRAGMENT } from '../graphql/Fragments.ts'

export const REFRESH_QUERY = gql`
  query Refresh {
    refresh {
      ...AuthPayloadFields
    }
  }
  ${AUTH_PAYLOAD_FRAGMENT}
`
