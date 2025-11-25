import { gql } from '@apollo/client'
import { AUTH_PAYLOAD_FRAGMENT } from './Fragments.ts'

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ...AuthPayloadFields
    }
  }
  ${AUTH_PAYLOAD_FRAGMENT}
`;
