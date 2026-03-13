import type { ColumnConfig } from './types/column.types.ts'

export function createColumns<T>() {
  return <C extends readonly ColumnConfig<T>[]>(cols: C) => cols
}
