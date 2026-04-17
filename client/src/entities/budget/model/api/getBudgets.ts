import { apolloClient } from '@/shared/api/apollo'
import { GET_BUDGETS } from '../graphql/GetBudgets.graphql.ts'
import { stripTypename } from '@/shared/lib/graphql'
import type { BudgetsDTO } from '../types/budget.dto.ts'

interface GetBudgetsResponse {
  budgets: BudgetsDTO
}

export const getBudgets = async () => {
  const { data } = await apolloClient.query<GetBudgetsResponse>({
    query: GET_BUDGETS,
    fetchPolicy: 'no-cache',
  })

  if (!data?.budgets) {
    throw new Error('Failed to get budgets')
  }

  return stripTypename(data.budgets)
}
