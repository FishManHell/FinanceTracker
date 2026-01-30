import { gql } from '@apollo/client'

export const GetBudgetsYearlyByMonthGraphql = gql`
query GetBudgetsYearlyByMonth($year: Int!) {
  budgetsYearlyByMonth(year: $year) {
    month
    budget
    expense
    expenseCurrency
    budgetCurrency
  }
}
`
