import type { ToastServiceMethods } from 'primevue'

interface ShowSuccessToastOptions {
  toast: ToastServiceMethods
  summary: string
  detail?: string
  life?: number
}

export function showSuccessToast({ toast, summary, detail, life = 3000 }: ShowSuccessToastOptions) {
  toast.add({
    severity: 'success',
    summary,
    detail,
    life,
  })
}
