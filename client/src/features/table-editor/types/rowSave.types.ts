type UpdatePayload<T> = {
  [K in keyof Omit<T, 'id'>]: T[K]
}

export interface OnSavePayload<T> {
  id: string
  update: UpdatePayload<T>
  original: T
}

export interface UseRowSaveOptions<T> {
  onSave: (payload: OnSavePayload<T>) => void
}

export type SaveRow<T> = (row: T, originalRow: T | null, validationHasErrors: boolean) => { success: boolean }
