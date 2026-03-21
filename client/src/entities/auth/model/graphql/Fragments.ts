import { gql } from '@apollo/client'

export const AUTH_PAYLOAD_FRAGMENT = gql`
  fragment AuthPayloadFields on User {
    id
    username
    email
    role,
    avatar
  }
`;
