<script setup lang="ts">
import { computed } from 'vue'
import { useDeleteUser, useEditUser, useGetUsers } from '@/entities/administration'
import { AdministrationTable, createUserValidators } from '@/features/AdministrationTable'
import type { OnSavePayload } from '@/features/table-editor'
import type { UserDTO } from '@/shared/types'
import { useTableLoading } from '@/shared/lib/hooks'

const { mutate: onMutateEditUser, isPending: isEditing } = useEditUser()
const { mutate: onMutateDeleteUser, isPending: isDeleting } = useDeleteUser()
const { data, isFetching, isLoading } = useGetUsers()

const actionLoading = computed(() => isEditing.value || isDeleting.value)

const { cellLoading, tableLoading } = useTableLoading<UserDTO>({
  data,
  isFetching,
  isLoading,
  actionLoading,
})

const onSave = ({ id, update }: OnSavePayload<UserDTO>) => onMutateEditUser({ id, update })
const onDelete = (id: string) => onMutateDeleteUser({ id })

const validators = createUserValidators(data)
</script>

<template>
  <AdministrationTable
    :isSkeleton="cellLoading"
    :loading="tableLoading"
    :data="data ?? []"
    :validators="validators"
    :on-save="onSave"
    :on-delete="onDelete"
  />
</template>
