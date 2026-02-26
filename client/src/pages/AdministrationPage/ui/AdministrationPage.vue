<script setup lang="ts">
import { type Ref } from 'vue'
import { useEditUser, useGetUsers, type UserWithId } from '@/entities/administration'
import { AdministrationTable } from '@/features/AdministrationTable'
import type { OnSavePayload, Validators } from '@/features/table-editor'

const { mutate: onMutateEditUser } = useEditUser()
const { data, isFetching } = useGetUsers()

function onSave({ id, update, original }: OnSavePayload<UserWithId>) {
  onMutateEditUser({ id, update, original })
}

const validators = createValidators(data)

function createValidators(data: Ref<UserWithId[] | undefined>): Validators<UserWithId> {
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
    :loading="isFetching"
    :data="data ?? []"
    :validators="validators"
    :on-save="onSave"
  />
</template>
