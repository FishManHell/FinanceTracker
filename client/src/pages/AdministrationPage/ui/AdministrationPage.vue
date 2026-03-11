<script setup lang="ts">
import { useDeleteUser, useEditUser, useGetUsers} from '@/entities/administration'
import { AdministrationTable, createUserValidators } from '@/features/AdministrationTable'
import type { OnSavePayload } from '@/features/table-editor'
import type { UserDTO } from '@/shared/types'

const { mutate: onMutateEditUser, isPending: isEditPending } = useEditUser()
const { mutate: onMutateDeleteUser, isPending: isDeletePending } = useDeleteUser()
const { data, isFetching } = useGetUsers()

const onSave = ({ id, update }: OnSavePayload<UserDTO>) => onMutateEditUser({ id, update })
const onDelete = (id: string) => onMutateDeleteUser({ id })

const validators = createUserValidators(data)
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
