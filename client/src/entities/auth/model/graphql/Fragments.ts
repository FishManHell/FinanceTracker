import { gql } from '@apollo/client'

export const AUTH_PAYLOAD_FRAGMENT = gql`
  fragment AuthPayloadFields on AuthPayload {
    id
    username
    email
    role,
    avatar
  }
`;
