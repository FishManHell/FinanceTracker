import type { ComponentCell } from './types/column.types.ts'

export function isComponentCell(value: unknown): value is ComponentCell {
  return typeof value === 'object' && value !== null && 'component' in value && !!value.component
}
