import { gql } from '@apollo/client'

export const EDIT_BUDGET = gql`
  mutation editBudget($params: EditBudgetInput!) {
    editBudget(params: $params) {
      id
      year
      month
      total
      currency
    }
  }
`
