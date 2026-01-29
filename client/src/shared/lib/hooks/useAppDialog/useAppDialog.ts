import { useDialog } from 'primevue/usedialog'
import type { Component } from 'vue'

export function useAppDialog() {
  const dialog = useDialog()

  const openFormDialog = <T>(
    component: Component,
    header: string,
    data?: T
  ) => {
    dialog.open(component, {
      props: {
        header,
        modal: true,
        style: {
          width: '100%',
          maxWidth: '800px',
          textAlign: 'center',
        },
      },
      data
    })
  }

  return { openFormDialog }
}
