import { computed, ref, watch } from 'vue'
import {
  AVATAR_UPLOAD_STATE,
  type AvatarUploadState,
  type ProfileFormState,
  type UseProfileFormParams,
} from '../types.ts'

export function useProfileForm({ username, avatar, isEditing }: UseProfileFormParams) {
  const form = ref<ProfileFormState>({
    username: username.value,
    avatar: avatar.value,
  })

  const avatarUploadState = ref<AvatarUploadState>(AVATAR_UPLOAD_STATE.IDLE)

  const isDirty = computed(() => {
    return form.value.username.trim() !== username.value || form.value.avatar !== avatar.value
  })

  const isAvatarUploadBlocked = computed(() => {
    return (
      avatarUploadState.value === AVATAR_UPLOAD_STATE.SELECTED ||
      avatarUploadState.value === AVATAR_UPLOAD_STATE.UPLOADING
    )
  })

  function syncWithSource() {
    form.value = {
      username: username.value,
      avatar: avatar.value,
    }
    avatarUploadState.value = AVATAR_UPLOAD_STATE.IDLE
  }

  function startEditing() {
    syncWithSource()
    isEditing.value = true
  }

  function cancelEditing() {
    syncWithSource()
    isEditing.value = false
  }

  function setAvatar(url: string | null) {
    form.value.avatar = url
  }

  function setAvatarUploadState(state: AvatarUploadState) {
    avatarUploadState.value = state
  }

  watch(
    () => ({
      username: username.value,
      avatar: avatar.value,
    }),
    () => {
      if (!isEditing.value) {
        syncWithSource()
      }
    },
  )

  return {
    form,
    isDirty,
    avatarUploadState,
    isAvatarUploadBlocked,
    startEditing,
    cancelEditing,
    setAvatar,
    setAvatarUploadState,
  }
}
