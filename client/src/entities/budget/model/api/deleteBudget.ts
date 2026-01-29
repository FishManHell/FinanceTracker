import { apolloClient } from '@/shared/api/apollo'
import { DELETE_BUDGET } from '../graphql/DeleteBudget.graphql.ts'

interface DeleteBudgetResponse {
  deleteBudget: boolean
}

interface DeleteBudgetParams {
  params: {
    id: string
  }
}

export const deleteBudget = async (id: string) => {
  try {
    const { data } = await apolloClient.mutate<DeleteBudgetResponse, DeleteBudgetParams>({
      mutation: DELETE_BUDGET,
      variables: {params: {id}}
    })

    if (!data?.deleteBudget) {
      throw new Error('Failed to delete budget')
    }

    return data.deleteBudget
  } catch (error) {
    console.error('Error in deleteBudget:', error)
    throw error
  }
}
