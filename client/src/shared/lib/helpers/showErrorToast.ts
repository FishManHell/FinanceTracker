import type { ToastServiceMethods } from 'primevue'

interface ShowErrorToastOptions {
  toast: ToastServiceMethods
  summary: string
  error?: Error
  life?: number
}

export function showErrorToast({ toast, summary, error, life = 3000 }: ShowErrorToastOptions) {
  toast.add({
    severity: 'error',
    summary,
    detail: error?.message,
    life,
  })
}
