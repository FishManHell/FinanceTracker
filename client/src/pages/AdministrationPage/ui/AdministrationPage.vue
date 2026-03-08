<script setup lang="ts">
import { type Ref } from 'vue'
import {
  useDeleteUser,
  useEditUser,
  useGetUsers,
  type UserDTO,
  type UsersDTO,
} from '@/entities/administration'
import { AdministrationTable } from '@/features/AdministrationTable'
import type { OnSavePayload, Validators } from '@/features/table-editor'

const { mutate: onMutateEditUser, isPending: isEditPending } = useEditUser()
const { mutate: onMutateDeleteUser, isPending: isDeletePending } = useDeleteUser()
const { data, isFetching } = useGetUsers()

const onSave = ({ id, update }: OnSavePayload<UserDTO>) => onMutateEditUser({ id, update });
const onDelete = (id: string) => onMutateDeleteUser({ id });

const validators = createValidators(data)

function createValidators(data: Ref<UsersDTO | undefined>): Validators<UserDTO> {
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
</script>

<template>
  <AdministrationTable
    :isSkeleton="isFetching"
    :loading="isEditPending || isDeletePending"
    :data="data ?? []"
    :validators="validators"
    :on-save="onSave"
    :on-delete="onDelete"
  />
</template>
