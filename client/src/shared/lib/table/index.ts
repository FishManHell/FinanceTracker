import type { ColumnConfig, ComponentCell } from "./types/column.types.ts"
import { getEditor, getPermissionRow, resolveValue } from './tableEditorUtils.ts'
import { createColumns } from "./createColumns.ts"
import { isComponentCell } from "./isComponentCell.ts"
import { resolveRowsWithSkeleton } from "./lib/resolveRowsWithSkeleton.ts"

export type { ColumnConfig, ComponentCell }

export {
  getEditor,
  getPermissionRow,
  createColumns,
  isComponentCell,
  resolveValue,
}


export { resolveRowsWithSkeleton }
