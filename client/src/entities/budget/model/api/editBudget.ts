import type { BaseBudget, BudgetWithId } from '../type/budget.type.ts'
import { apolloClient } from '@/shared/api/apollo'
import { EDIT_BUDGET } from '../graphql/EditBudget.graphql.ts'


interface EditBudgetResponse {
  editBudget: BudgetWithId
}

interface EditBudgetInput {
  id: string
  update: BaseBudget
}

interface EditBudgetParams {
  params: EditBudgetInput
}


export const editBudget = async (params: EditBudgetInput) => {
  try {
    const { data } = await apolloClient.mutate<EditBudgetResponse, EditBudgetParams>({
      mutation: EDIT_BUDGET,
      variables: {params}
    })

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
