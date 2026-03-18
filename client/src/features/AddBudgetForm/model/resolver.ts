import { yupResolver } from '@primevue/forms/resolvers/yup'
import * as yup from 'yup'
import { CURRENCIES, type Currency } from '@/shared/types'

export const addBudgetFormResolver = yupResolver(
  yup.object({
    date: yup.date().required('Date is required'),
    total: yup
      .number()
      .typeError('Total is required')
      .required('Total is required')
      .moreThan(0, 'Total must be greater than 0'),
    currency: yup
      .mixed<Currency>()
      .oneOf(Object.values(CURRENCIES), 'Currency is required')
      .required('Currency is required'),
  }),
)
