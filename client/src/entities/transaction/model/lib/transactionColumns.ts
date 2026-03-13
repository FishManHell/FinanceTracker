import { createColumns } from '@/shared/lib/table'
import { Tag } from 'primevue'
import type { TransactionDTO } from '../types/transaction.dto.ts'

export const transactionColumns = createColumns<TransactionDTO>()([
  {
    field: 'type',
    header: 'Type',
    formatter: (value) => ({
      component: Tag,
      props: {
        value,
        severity: value === 'income' ? 'success' : 'danger',
      },
    }),
  },
  {
    field: 'account',
    header: 'Account',
    formatter: (value) =>
      `${value.type.charAt(0).toUpperCase() + value.type.slice(1)} - ${value.description}`,
  },
  {
    field: 'category',
    header: 'Category',
  },
  {
    field: 'date',
    header: 'Date',
    formatter: (value) => new Date(value).toLocaleDateString(),
  },
  {
    field: 'amount',
    header: 'Amount',
    formatter: (value) => ({
      component: Tag,
      props: {
        value,
        severity: value > 0 ? 'success' : 'danger',
      },
    }),
  },
  {
    field: 'currency',
    header: 'Currency',
  },
])

