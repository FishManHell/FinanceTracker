import { useGraphqlQuery } from '@/shared/lib/hooks'
import { computed, type MaybeRef, unref } from 'vue'
import { getBudgetsYearlyByMonth } from '../api/getBudgetsYearlyByMonth'

export const useGetBudgetsYearlyByMonth = (year: MaybeRef<number>) => {
  return useGraphqlQuery({
    queryKey: computed(() => ['budgetsYearlyByMonth', unref(year)]),
    queryFn: async () => getBudgetsYearlyByMonth(unref(year)),
    refetchOnWindowFocus: false,
  })
}
