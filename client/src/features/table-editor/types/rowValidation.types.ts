export type FieldValidator<T, K extends keyof T> = (row: T, value: T[K]) => string | null

export type Validators<T> = { [K in keyof T]?: FieldValidator<T, K> }

export type ValidationErrors<T> = Partial<Record<string, Partial<Record<keyof T, string>>>>
export type ValidationRowError<T> = Partial<Record<keyof T, string>>

export interface UseRowValidationOptions<T> {
  validators: Validators<T>
}
