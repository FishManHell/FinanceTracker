import type { Component } from 'vue'
import type { ColumnConfig } from './types/column.types.ts'

export const getPermissionRow = <T extends { id: string }>(row: T, originalRow: T | null): T => {
  if (!originalRow) return row
  if (row.id !== originalRow.id) return row

  return originalRow
}

export const getEditor = <T>(col: ColumnConfig<T>, row: T): Component | null => {
  if (!col.editor) return null

  if (typeof col.editor === 'function') {
    return (col.editor as (row: T) => Component | null)(row)
  }

  return col.editor
}

export const resolveValue = <T>(col: ColumnConfig<T>, row: T): unknown => {
  const value = row[col.field]

  if (!col.formatter) {
    return value
  }

  const formatter = col.formatter as (value: unknown, row: T) => unknown
  return formatter(value, row)
}
