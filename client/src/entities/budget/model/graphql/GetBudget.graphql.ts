import { gql } from '@apollo/client'

export const GET_BUDGET = gql`
  query GetBudget($year: Int!, $month: Int!) {
    budget(year: $year, month: $month) {
      year
      month
      total
      currency
      spent
      remaining
    }
  }
`
