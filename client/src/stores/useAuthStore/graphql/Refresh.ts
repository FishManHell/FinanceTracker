import { gql } from '@apollo/client'

export const REFRESH_QUERY = gql`
  query Refresh {
    refresh {
      username
      email
      role
    }
  }
`;
