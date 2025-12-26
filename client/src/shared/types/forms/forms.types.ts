export interface FormError {
  message: string
}

export type ErrorCollection<TForm> = Partial<Record<keyof TForm, FormError[]>>
