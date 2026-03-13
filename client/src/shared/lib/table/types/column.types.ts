import type { Component } from 'vue'

export type ComponentCell = {
  component: Component
  props?: Record<string, unknown>
}

export type ColumnConfig<T> = {
  [K in keyof T]: {
    field: K
    header: string
    editor?: Component | ((row: T) => Component | null)
    options?: string[]
    formatter?: (value: T[K], row: T) => unknown | ComponentCell
  }
}[keyof T]
