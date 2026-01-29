import { gql } from '@apollo/client'

export const GET_BUDGETS = gql`
  query GetBudgets {
    budgets {
      id
      year
      month
      total
      currency
    }
  }
`
