import { gql } from '@apollo/client'

export const GET_BUDGET = gql`
  query GetBudget($year: Int!, $month: Int!) {
    getBudget(year: $year, month: $month) {
      year
      month
      budget
      spent
      remaining
    }
  }
`
