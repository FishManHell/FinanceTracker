import { ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'

export function useConfirmActions() {
  const confirm = useConfirm()
  const isLoading = ref(false)

  const confirmSave = (onSave: () => Promise<void>) => {
    confirm.require({
      message: 'Confirm save?',
      icon: 'pi pi-info-circle',

      rejectProps: {
        label: 'Cancel',
        severity: 'danger',
        outlined: true,
      },

      acceptProps: {
        label: 'Save',
        outlined: true,
        loading: isLoading.value,
      },

      accept: async () => {
        try {
          isLoading.value = true
          await onSave()
        } finally {
          isLoading.value = false
          confirm.close()
        }
      },
    })
  }

  const confirmDelete = (onDelete: () => Promise<void>) => {
    confirm.require({
      message: 'Are you sure you want to delete it?',
      icon: 'pi pi-info-circle',

      rejectProps: {
        label: 'Cancel',
        severity: 'danger',
        outlined: true,
      },

      acceptProps: {
        label: 'Delete',
        severity: 'danger',
        outlined: true,
        loading: isLoading.value,
      },

      accept: async () => {
        try {
          isLoading.value = true
          await onDelete()
        } finally {
          isLoading.value = false
          confirm.close()
        }
      },
    })
  }

  return {
    confirmSave,
    confirmDelete,
  }
}

