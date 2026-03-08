import { apolloClient } from '@/shared/api/apollo'
import { SET_BUDGET } from '../graphql/SetBudget.graphql.ts'
import { stripTypename } from '@/shared/lib/graphql'
import type { BudgetDTO, CreateBudgetDTO } from '../types/budget.dto.ts'

export interface SetBudgetResponse {
  newBudget: BudgetDTO
}

interface SetBudgetParams {
  params: CreateBudgetDTO
}

export const setBudget = async (params: CreateBudgetDTO): Promise<BudgetDTO> => {
  try {
    const { data } = await apolloClient.mutate<SetBudgetResponse, SetBudgetParams>({
      mutation: SET_BUDGET,
      variables: { params },
    })

    if (!data?.newBudget) {
      throw new Error('Failed to get new budget')
    }

    return stripTypename(data.newBudget)
  } catch (error) {
    console.error('Error in setBudget:', error)
    throw error
  }
}
