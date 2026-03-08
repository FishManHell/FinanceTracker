import { apolloClient } from '@/shared/api/apollo'
import { GET_BUDGET } from '../graphql/GetBudget.graphql.ts'
import { stripTypename } from '@/shared/lib/graphql'
import type { BudgetDetailsDTO } from '../types/budget.dto.ts'

interface GetBudgetResponse {
  budget: BudgetDetailsDTO
}

interface GetBudgetVariables {
  year: number;
  month: number;
}


export const getBudget = async (params: GetBudgetVariables) => {
  try {
    const { data } = await apolloClient.query<GetBudgetResponse, GetBudgetVariables>({
      query: GET_BUDGET,
      variables: params,
      fetchPolicy: 'network-only',
    })

    if (!data?.budget) {
      throw new Error('Failed to get budget')
    }

    return stripTypename(data.budget)
  } catch (error) {
    console.error('Error in getBudget:', error)
    throw error
  }
}
