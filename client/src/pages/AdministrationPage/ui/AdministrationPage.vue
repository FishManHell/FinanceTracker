<script setup lang="ts">
import { computed } from 'vue'
import { useDeleteUser, useEditUser, useGetUsers } from '@/entities/administration'
import { AdministrationTable, createUserValidators } from '@/features/AdministrationTable'
import type { OnSavePayload } from '@/features/table-editor'
import type { UserDTO } from '@/shared/types'
import { useTableLoading } from '@/shared/lib/hooks'
import { createSkeletonRows, filterSkeletonRows } from '@/shared/lib/table'

const { mutate: onMutateEditUser, isPending: isEditing } = useEditUser()
const { mutate: onMutateDeleteUser, isPending: isDeleting } = useDeleteUser()
const { data, isFetching, isLoading } = useGetUsers()

const actionLoading = computed(() => isEditing.value || isDeleting.value)

const {
  rows: users,
  cellLoading,
  tableLoading,
} = useTableLoading<UserDTO>({
  data,
  isFetching,
  isLoading,
  actionLoading,
  skeletonFactory: createSkeletonRows,
})

const tableUsers = computed(() => filterSkeletonRows(users.value))

const onSave = ({ id, update }: OnSavePayload<UserDTO>) => onMutateEditUser({ id, update })
const onDelete = (id: string) => onMutateDeleteUser({ id })

const validators = createUserValidators(data)
</script>

<template>
  <AdministrationTable
    :isSkeleton="cellLoading"
    :loading="tableLoading"
    :data="tableUsers"
    :validators="validators"
    :on-save="onSave"
    :on-delete="onDelete"
  />
</template>
