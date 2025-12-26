import type { TransactionFormData } from './types.ts'
import type { ErrorCollection } from '@/shared/types'
import type { FormResolverOptions } from '@primevue/forms'

export const resolver = ({ values }: FormResolverOptions) => {
  const errors: ErrorCollection<TransactionFormData> = {};

  for (const valueKey in values) {
    const value = values[valueKey as keyof TransactionFormData]
    if (value === undefined || value === null || value === '' || (Array.isArray(value) && !value.length)) {
      errors[valueKey as keyof TransactionFormData] = [{ message: `${valueKey} is required` }]
    }
  }
  return { values, errors }
}
