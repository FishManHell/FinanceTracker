import type { BudgetUI } from '../types/budget.ui.ts'
import { EditNumberCell } from '@/shared/ui/EditNumberCell'
import { EditSelectCell } from '@/shared/ui/EditSelectCell'
import { EditMonthCell } from '@/shared/ui/EditMonthCell'
import type { ColumnConfig } from '@/shared/lib/table'
import { formatYearMonth } from '@/helpers/date.ts'

export const createBudgetColumns: ColumnConfig<BudgetUI>[] = [
  {
    field: 'date',
    header: 'Date',
    editor: EditMonthCell,
    formatter: (value) => formatYearMonth(value as Date),
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
    options: ['USD', 'EUR', 'ILS'],
  },
]
