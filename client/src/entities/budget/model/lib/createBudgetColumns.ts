import type { BudgetUI } from '../types/budget.ui.ts'
import { EditNumberCell } from '@/shared/ui/EditNumberCell'
import { EditSelectCell } from '@/shared/ui/EditSelectCell'
import { EditMonthCell } from '@/shared/ui/EditMonthCell'
import  { createColumns } from '@/shared/lib/table'
import { formatYearMonth } from '@/helpers/date.ts'

export const createBudgetColumns = createColumns<BudgetUI>()([
  {
    field: 'date',
    header: 'Date',
    editor: EditMonthCell,
    formatter: (value) => formatYearMonth(value),
  },
  {
    field: 'total',
    header: 'Total',
    editor: EditNumberCell,
  },
  {
    field: 'currency',
    header: 'Currency',
    editor: EditSelectCell,
    options: ['USD', 'EUR', 'ILS'] as const,
  },
])
