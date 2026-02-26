import { reactive } from 'vue'
import type {
  UseRowValidationOptions,
  ValidationErrors,
  ValidationRowError,
} from '../types/rowValidation.types'

export function useRowValidation<T extends { id: string }>(options: UseRowValidationOptions<T>) {
  const validationErrors = reactive<ValidationErrors<T>>({})

  function validateField<K extends keyof T>(row: T, field: K, value: T[K]) {
    const validator = options.validators[field]

    if (!validator) return

    const errorMessage = validator(row, value)

    const rowErrors: ValidationRowError<T> = validationErrors[row.id] ?? (validationErrors[row.id] = {})

    if (errorMessage) rowErrors[field] = errorMessage
    else delete rowErrors[field]

    if (Object.keys(rowErrors).length === 0) delete validationErrors[row.id]
  }

  function validateRow(row: T) {
    (Object.keys(options.validators) as Array<keyof T>).forEach((field) => {
      validateField(row, field, row[field])
    })
  }

  const hasErrors = (rowId: string) => !!validationErrors[rowId]

  const getFirstError = (rowId: string) => {
    const rowErrors = validationErrors[rowId]
    if (!rowErrors) return null

    return Object.values(rowErrors)[0] ?? null
  }

  return {
    validationErrors,
    validateField,
    validateRow,
    hasErrors,
    getFirstError,
  }
}
