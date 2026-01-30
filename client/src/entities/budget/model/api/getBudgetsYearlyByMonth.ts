import { apolloClient } from '@/shared/api/apollo'
import { GetBudgetsYearlyByMonthGraphql } from '@/entities/budget/model/graphql/GetBudgetsYearlyByMonth.graphql.ts'
import { stripTypename } from '@/shared/lib/graphql'

interface GetBudgetsYearlyByMonth {
  month: number;
  budget: number;
  budgetCurrency: string | null;
  expenseCurrency: string | null;
  expense: number;
}

interface GetBudgetsYearlyByMonthResponse {
  budgetsYearlyByMonth: GetBudgetsYearlyByMonth[]
}

export const getBudgetsYearlyByMonth = async (year: number) => {
  try {
    const { data } = await apolloClient.query<GetBudgetsYearlyByMonthResponse, { year: number }>({
      query: GetBudgetsYearlyByMonthGraphql,
      variables: { year },
    })

    if (!data?.budgetsYearlyByMonth) {
      throw new Error('Failed to get budget')
    }

    return stripTypename(data.budgetsYearlyByMonth)
  } catch (error) {
    console.log(error)
  }
}
