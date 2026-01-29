import { gql } from '@apollo/client'

export const SET_BUDGET = gql`
  mutation SetBudget($params: BaseBudgetInput!) {
    newBudget(params: $params) {
      year
      month
      total
      currency
    }
  }
`
