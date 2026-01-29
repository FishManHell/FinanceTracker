// import { useConfirm } from 'primevue/useconfirm'
//
// export function useConfirmActions() {
//   const confirm = useConfirm()
//
//   const confirmSaveChanges = <T>(row: T, onSave: (row: T) => void) => {
//     confirm.require({
//       message: 'Are you sure you want to save these changes?',
//       icon: 'pi pi-info-circle',
//       rejectProps: {
//         label: 'Cancel',
//         severity: 'danger',
//         outlined: true,
//       },
//       acceptProps: {
//         label: 'Save',
//         outlined: true,
//       },
//       accept: () => onSave(row),
//     })
//   }
//
//   const confirmDeleteBudget = <T>(id: T, onDelete: (id: T) => void) => {
//     confirm.require({
//       message: 'Are you sure you want to delete it?',
//       icon: 'pi pi-info-circle',
//       rejectProps: {
//         label: 'Cancel',
//         severity: 'danger',
//         outlined: true,
//       },
//       acceptProps: {
//         label: 'Delete',
//         severity: 'danger',
//         outlined: true,
//       },
//       accept: () => onDelete(id),
//     })
//   }
//
//   return {
//     confirmSaveChanges,
//     confirmDeleteBudget,
//   }
// }

import { ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'

export function useConfirmActions() {
  const confirm = useConfirm()
  const isLoading = ref(false)

  const confirmSaveChanges = (onSave: () => Promise<void>) => {
    confirm.require({
      message: 'Are you sure you want to save these changes?',
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

  const confirmDeleteBudget = (onDelete: () => Promise<void>) => {
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
    confirmSaveChanges,
    confirmDeleteBudget,
  }
}

