import type { Component } from 'vue'

export interface ColumnConfig<T> {
  field: keyof T
  header: string
  editor?: Component | ((row: T) => Component | null)
  options?: string[]
  formatter?: (value: T[keyof T], row: T) => unknown
}
