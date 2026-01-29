import { apolloClient } from '@/shared/api/apollo'
import { SET_BUDGET } from '../graphql/SetBudget.graphql.ts'
import type { BaseBudget, BaseBudgetWIthId } from '../type/budget.type.ts'
import { stripTypename } from '@/shared/lib/graphql'

interface SetBudgetResponse {
  newBudget: BaseBudgetWIthId
}

interface SetBudgetParams {
  params: BaseBudget
}

export const setBudget = async (params: BaseBudget) => {
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
