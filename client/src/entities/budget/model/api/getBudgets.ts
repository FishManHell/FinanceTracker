import { apolloClient } from '@/shared/api/apollo'
import { GET_BUDGETS } from '../graphql/GetBudgets.graphql.ts'
import type { Budgets } from '../type/budget.type.ts'
import { stripTypename } from '@/shared/lib/graphql'

interface GetBudgetsResponse {
  budgets: Budgets
}

export const getBudgets = async () => {
  try {
    const { data } = await apolloClient.query<GetBudgetsResponse>({
      query: GET_BUDGETS,
      fetchPolicy: 'no-cache',
    })

    if (!data?.budgets) {
      throw new Error('Failed to get budgets')
    }

    return stripTypename(data.budgets)
  } catch (error) {
    console.error('Error in getBudgets:', error)
    throw error
  }
}
