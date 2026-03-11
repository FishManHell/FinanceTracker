import type { Ref } from 'vue'
import type { UserDTO, UsersDTO } from '@/shared/types'
import type { Validators } from '@/features/table-editor'

export function createUserValidators(data: Ref<UsersDTO | undefined>): Validators<UserDTO> {
  return {
    username: (row, value) => {
      const trimmed = value?.trim()

      if (!trimmed) return 'Username is required'

      const isDuplicate = data.value?.some(({ id, username }) => {
        return id !== row.id && username?.toLowerCase() === trimmed.toLowerCase()
      })

      if (isDuplicate) return 'Username already exists'

      return null
    },
  }
}
