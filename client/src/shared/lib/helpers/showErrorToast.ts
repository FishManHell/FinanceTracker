import type { ToastServiceMethods } from 'primevue'

interface ShowErrorToastOptions {
  toast: ToastServiceMethods
  summary: string
  detail?: string
  error?: Error
  life?: number
}

export function showErrorToast({
  toast,
  summary,
  detail,
  error,
  life = 3000,
}: ShowErrorToastOptions) {
  toast.add({
    severity: 'error',
    summary,
    detail: detail ?? error?.message,
    life,
  })
}
