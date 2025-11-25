import { gql } from '@apollo/client'
import { AUTH_PAYLOAD_FRAGMENT } from './Fragments.ts'

export const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ...AuthPayloadFields
    }
  }
  ${AUTH_PAYLOAD_FRAGMENT}
`;
