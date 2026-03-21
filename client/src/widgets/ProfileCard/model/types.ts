import type { Ref } from 'vue'
import { Roles } from '@/shared/config/roles'

export interface ProfileCardProps {
  username: string
  email: string
  role: Roles
  avatar: string | null
}

export interface ProfileFormState {
  username: string
  avatar: string | null
}

export interface UseProfileFormParams {
  username: Ref<string>
  avatar: Ref<string | null>
  isEditing: Ref<boolean>
}

export const AVATAR_UPLOAD_STATE = {
  IDLE: 'idle',
  SELECTED: 'selected',
  UPLOADING: 'uploading',
  UPLOADED: 'uploaded',
  ERROR: 'error',
} as const

export type AvatarUploadState = (typeof AVATAR_UPLOAD_STATE)[keyof typeof AVATAR_UPLOAD_STATE]
