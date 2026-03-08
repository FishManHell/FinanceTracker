import { apolloClient } from '@/shared/api/apollo'
import { EDIT_BUDGET } from '../graphql/EditBudget.graphql.ts'
import type {
  EditBudgetInputDTO,
  EditBudgetParamsDTO,
  EditBudgetResponse,
} from '../types/budget.mutation.ts'

export const editBudget = async (params: EditBudgetInputDTO) => {
  try {
    const { data } = await apolloClient.mutate<EditBudgetResponse, EditBudgetParamsDTO>({
      mutation: EDIT_BUDGET,
      variables: { params },
    })
    if (!data) {
      throw new Error('No data returned from editBudget')
    }

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
