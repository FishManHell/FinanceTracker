<script setup lang="ts">
import cls from './ProfileCard.module.scss'
import { computed, ref, toRef, useId } from 'vue'
import { Button, Image, InputText, Tag } from 'primevue'
import { useToast } from 'primevue/usetoast'
import { SectionCard } from '@/shared/ui/SectionCard'
import { getRoleLabel, roleSeverityMap } from '@/entities/administration'
import { ProfileAvatarUpload } from '@/features/ProfileAvatarUpload'
import { useUpdateProfile } from '@/entities/user'
import { useProfileForm } from '../model/composables/useProfileForm'
import type { AvatarUploadState, ProfileCardProps } from '../model/types.ts'
import { showErrorToast } from '@/shared/lib/helpers'

const props = defineProps<ProfileCardProps>()

const fieldId = useId()

const toast = useToast()
const { mutate: updateProfile, isPending: isProfileUpdating } = useUpdateProfile()

const isEditing = ref(false)

const {
  form,
  isDirty,
  isAvatarUploadBlocked,
  startEditing,
  cancelEditing,
  setAvatar,
  setAvatarUploadState,
} = useProfileForm({
  username: toRef(props, 'username'),
  avatar: toRef(props, 'avatar'),
  isEditing,
})

const displayUsername = computed(() => {
  if (!isEditing.value) return props.username
  return form.value.username.trim() || props.username
})

const avatarSrc = computed(() => isEditing.value ? form.value.avatar : props.avatar)

const handleAvatarChange = (url: string | null) => setAvatar(url)

const handleAvatarStateChange = (state: AvatarUploadState) => setAvatarUploadState(state)

function saveProfile() {
  const username = form.value.username.trim()

  if (!username) {
    showErrorToast({
      toast,
      summary: 'Validation error',
      detail: 'Username is required.',
    })
    return
  }

  if (isAvatarUploadBlocked.value) {
    showErrorToast({
      toast,
      summary: 'Avatar upload is not finished',
      detail: 'Finish avatar upload or cancel it before saving the profile.',
      life: 3500,
    })
    return
  }

  if (!isDirty.value) return

  updateProfile(
    { username, avatar: form.value.avatar },
    { onSuccess: () => isEditing.value = false },
  )
}
</script>

<template>
  <SectionCard
    title="Profile"
    :class="cls.profile_card"
    :buttonLabel="!isEditing ? 'Edit Profile' : undefined"
    buttonIcon="pi pi-plus"
    @button-click="startEditing"
  >
    <div :class="cls.profile_card">
      <div :class="cls.header">
        <div :class="cls.avatar_wrapper">
          <Image
            v-if="avatarSrc"
            :src="avatarSrc"
            alt="Profile avatar"
            :class="cls.avatar_image"
            preview
          />
          <div v-else :class="cls.avatar_placeholder">
            {{ displayUsername.slice(0, 2).toUpperCase() }}
          </div>
        </div>

        <div :class="cls.main_info">
          <h2 :class="cls.username">{{ displayUsername }}</h2>
          <p :class="cls.email">{{ email }}</p>
          <Tag :value="getRoleLabel(role)" :severity="roleSeverityMap[role]" />
        </div>
      </div>

      <div :class="cls.form_grid">
        <div :class="cls.field">
          <label :class="cls.label" :for="`${fieldId}-username`">Username</label>
          <InputText
            :id="`${fieldId}-username`"
            v-model="form.username"
            fluid
            :disabled="!isEditing || isProfileUpdating"
          />
        </div>

        <div :class="cls.field">
          <label :class="cls.label" :for="`${fieldId}-email`">Email</label>
          <InputText :id="`${fieldId}-email`" :modelValue="email" fluid disabled />
        </div>

        <div :class="cls.field">
          <label :class="cls.label" :for="`${fieldId}-role`">Role</label>
          <InputText :id="`${fieldId}-role`" :modelValue="getRoleLabel(role)" fluid disabled />
        </div>

        <div :class="cls.field">
          <label :class="cls.label">Avatar</label>
          <ProfileAvatarUpload
            :initial-avatar="props.avatar"
            :disabled="!isEditing || isProfileUpdating"
            @change="handleAvatarChange"
            @state-change="handleAvatarStateChange"
          />
        </div>
      </div>

      <div v-if="isEditing" :class="cls.actions">
        <Button label="Save" :loading="isProfileUpdating" @click="saveProfile" />
        <Button
          label="Cancel"
          severity="secondary"
          outlined
          :disabled="isProfileUpdating"
          @click="cancelEditing"
        />
      </div>
    </div>
  </SectionCard>
</template>
