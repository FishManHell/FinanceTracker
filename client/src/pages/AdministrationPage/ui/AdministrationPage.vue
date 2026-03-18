<script setup lang="ts">
import { computed, onUnmounted } from 'vue'
import {
  administrationQueryKeys,
  useDeleteUser,
  useEditUser,
  useGetUsers,
} from '@/entities/administration'
import { AdministrationTable, createUserValidators } from '@/features/AdministrationTable'
import type { OnSavePayload } from '@/features/table-editor'
import type { UserDTO } from '@/shared/types'
import { useAppDialog, useTableLoading } from '@/shared/lib/hooks'
import { removeQueries } from '@/shared/lib/vue-query'
import { useQueryClient } from '@tanstack/vue-query'
import { PageHeader } from '@/shared/ui/PageHeader'
import { SectionCard } from '@/shared/ui/SectionCard'
import { AddUserForm } from '@/features/AddUserForm'

const queryClient = useQueryClient()
const { openFormDialog } = useAppDialog()
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

const openAddNewUserFormDialog = () => {
  openFormDialog(AddUserForm, 'Add New User')
}
const onSave = ({ id, update }: OnSavePayload<UserDTO>) => onMutateEditUser({ id, update })
const onDelete = (id: string) => onMutateDeleteUser({ id })

const validators = createUserValidators(data)

onUnmounted(() => {
  removeQueries(queryClient, [administrationQueryKeys.users])
})
</script>

<template>
  <div class="administration_page">
    <PageHeader title="Administration" />
    <SectionCard
      title="Users"
      buttonLabel="New User"
      buttonIcon="pi pi-plus"
      :on-button-click="openAddNewUserFormDialog"
    >
      <AdministrationTable
        :isSkeleton="cellLoading"
        :loading="tableLoading"
        :data="data ?? []"
        :validators="validators"
        :on-save="onSave"
        :on-delete="onDelete"
      />
    </SectionCard>
  </div>
</template>

<style lang="scss" scoped>
.administration_page {
  width: 100%;
}
</style>
