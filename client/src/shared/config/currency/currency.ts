import type { SelectOption } from '@/shared/types'
import { CURRENCIES, type Currency } from '../../types/currency/currency.ts'

export const currencyOptions: SelectOption<Currency>[] = [
  { label: 'USD', value: CURRENCIES.USD },
  { label: 'EUR', value: CURRENCIES.EUR },
  { label: 'ILS', value: CURRENCIES.ILS },
]
