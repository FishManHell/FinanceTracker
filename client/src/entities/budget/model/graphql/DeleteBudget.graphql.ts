import { gql } from '@apollo/client'

export const DELETE_BUDGET = gql`
  mutation DeleteBudget($params: DeleteBudgetInput!) {
    deleteBudget(params: $params)
  }
`
